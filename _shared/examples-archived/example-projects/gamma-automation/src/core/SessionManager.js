import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Config from '../utils/Config.js';
import Logger from '../utils/Logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Session management class
 * Handles authentication, session persistence, and validation
 */
class SessionManager {
  constructor() {
    this.logger = Logger.child('SessionManager');
    this.sessionPath = Config.get('session.sessionPath');
    this.ensureSessionDirectory();
  }

  /**
   * Ensure session directory exists
   */
  async ensureSessionDirectory() {
    const sessionDir = path.join(process.cwd(), this.sessionPath);
    try {
      await fs.mkdir(sessionDir, { recursive: true });
    } catch (error) {
      this.logger.error('Failed to create session directory', error);
    }
  }

  /**
   * Handle multiple authentication methods
   * @param {Page} page - Playwright page instance
   * @param {Object} credentials - Login credentials
   * @param {string} method - Authentication method ('email', 'google', 'github')
   * @returns {Promise<boolean>} Success status
   */
  async login(page, credentials, method = 'email') {
    try {
      this.logger.info('Starting login process', { method });

      const baseUrl = Config.get('gamma.baseUrl');
      await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });

      switch (method) {
        case 'email':
          await this._loginWithEmail(page, credentials);
          break;
        case 'google':
          await this._loginWithGoogle(page, credentials);
          break;
        case 'github':
          await this._loginWithGithub(page, credentials);
          break;
        default:
          throw new Error(`Unknown authentication method: ${method}`);
      }

      // Wait for login to complete
      await page.waitForURL('**/workspace**', { timeout: 30000 });

      this.logger.info('Login successful');
      return true;
    } catch (error) {
      this.logger.error('Login failed', error);
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  /**
   * Login with email and password
   * @private
   */
  async _loginWithEmail(page, credentials) {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // These selectors will need to be updated based on actual Gamma UI
    await page.fill('input[type="email"], input[name="email"]', email);
    await page.fill('input[type="password"], input[name="password"]', password);
    await page.click('button[type="submit"], button:has-text("Sign in")');
  }

  /**
   * Login with Google OAuth
   * @private
   */
  async _loginWithGoogle(page, credentials) {
    // Click Google login button
    await page.click('button:has-text("Continue with Google")');

    // Handle Google OAuth popup
    const googlePopup = await page.waitForEvent('popup');
    await googlePopup.fill('input[type="email"]', credentials.email);
    await googlePopup.click('button:has-text("Next")');
    await googlePopup.fill('input[type="password"]', credentials.password);
    await googlePopup.click('button:has-text("Next")');
  }

  /**
   * Login with GitHub OAuth
   * @private
   */
  async _loginWithGithub(page, credentials) {
    // Click GitHub login button
    await page.click('button:has-text("Continue with GitHub")');

    // Handle GitHub OAuth popup
    const githubPopup = await page.waitForEvent('popup');
    await githubPopup.fill('input[name="login"]', credentials.username);
    await githubPopup.fill('input[name="password"]', credentials.password);
    await githubPopup.click('input[type="submit"]');
  }

  /**
   * Save session state for reuse
   * @param {BrowserContext} context - Browser context
   * @param {string} sessionName - Session identifier
   * @returns {Promise<string>} Path to saved session
   */
  async saveSession(context, sessionName = 'default') {
    try {
      const sessionFile = path.join(
        process.cwd(),
        this.sessionPath,
        `${sessionName}.json`
      );

      // Save storage state (cookies, localStorage, etc.)
      const storageState = await context.storageState();

      const sessionData = {
        ...storageState,
        timestamp: Date.now(),
        expiresAt: Date.now() + Config.get('session.sessionTimeout')
      };

      await fs.writeFile(sessionFile, JSON.stringify(sessionData, null, 2));

      this.logger.info('Session saved', { sessionName, path: sessionFile });
      return sessionFile;
    } catch (error) {
      this.logger.error('Failed to save session', error);
      throw new Error(`Session save failed: ${error.message}`);
    }
  }

  /**
   * Load existing session
   * @param {string} sessionName - Session identifier
   * @returns {Promise<Object|null>} Session data or null
   */
  async loadSession(sessionName = 'default') {
    try {
      const sessionFile = path.join(
        process.cwd(),
        this.sessionPath,
        `${sessionName}.json`
      );

      // Check if session file exists
      try {
        await fs.access(sessionFile);
      } catch {
        this.logger.info('No existing session found', { sessionName });
        return null;
      }

      // Load session data
      const data = await fs.readFile(sessionFile, 'utf-8');
      const sessionData = JSON.parse(data);

      // Check if session is expired
      if (sessionData.expiresAt < Date.now()) {
        this.logger.info('Session expired', { sessionName });
        await this.deleteSession(sessionName);
        return null;
      }

      this.logger.info('Session loaded', { sessionName });
      return sessionData;
    } catch (error) {
      this.logger.error('Failed to load session', error);
      return null;
    }
  }

  /**
   * Verify session validity
   * @param {Page} page - Playwright page instance
   * @returns {Promise<boolean>} Validity status
   */
  async validateSession(page) {
    try {
      const baseUrl = Config.get('gamma.baseUrl');

      // Navigate to a page that requires authentication
      await page.goto(`${baseUrl}/workspace`, { waitUntil: 'networkidle' });

      // Check if redirected to login
      const currentUrl = page.url();
      if (currentUrl.includes('/login')) {
        this.logger.info('Session invalid - redirected to login');
        return false;
      }

      // Check for authenticated UI elements
      const isAuthenticated = await page.locator('[data-authenticated="true"], .user-menu, .profile-button').count() > 0;

      this.logger.info('Session validation result', { isAuthenticated });
      return isAuthenticated;
    } catch (error) {
      this.logger.error('Session validation failed', error);
      return false;
    }
  }

  /**
   * Handle session refresh
   * @param {Page} page - Playwright page instance
   * @param {Object} credentials - Login credentials
   * @returns {Promise<boolean>} Success status
   */
  async refreshSession(page, credentials) {
    try {
      this.logger.info('Refreshing session');

      // Try to validate current session
      const isValid = await this.validateSession(page);

      if (isValid) {
        this.logger.info('Session still valid, no refresh needed');
        return true;
      }

      // Session invalid, re-login
      this.logger.info('Session invalid, logging in again');
      return await this.login(page, credentials);
    } catch (error) {
      this.logger.error('Session refresh failed', error);
      return false;
    }
  }

  /**
   * Delete session file
   * @param {string} sessionName - Session identifier
   */
  async deleteSession(sessionName = 'default') {
    try {
      const sessionFile = path.join(
        process.cwd(),
        this.sessionPath,
        `${sessionName}.json`
      );

      await fs.unlink(sessionFile);
      this.logger.info('Session deleted', { sessionName });
    } catch (error) {
      this.logger.debug('Session file not found or already deleted', { sessionName });
    }
  }

  /**
   * Get all saved sessions
   * @returns {Promise<string[]>} Array of session names
   */
  async listSessions() {
    try {
      const sessionDir = path.join(process.cwd(), this.sessionPath);
      const files = await fs.readdir(sessionDir);

      const sessions = files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));

      return sessions;
    } catch (error) {
      this.logger.error('Failed to list sessions', error);
      return [];
    }
  }

  /**
   * Clear all expired sessions
   */
  async clearExpiredSessions() {
    try {
      const sessions = await this.listSessions();
      let clearedCount = 0;

      for (const sessionName of sessions) {
        const sessionData = await this.loadSession(sessionName);
        if (!sessionData) {
          clearedCount++;
        }
      }

      this.logger.info('Expired sessions cleared', { count: clearedCount });
      return clearedCount;
    } catch (error) {
      this.logger.error('Failed to clear expired sessions', error);
      return 0;
    }
  }
}

export default SessionManager;
