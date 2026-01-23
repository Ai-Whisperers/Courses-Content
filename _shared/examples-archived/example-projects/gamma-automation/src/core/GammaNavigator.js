import Logger from '../utils/Logger.js';
import Config from '../utils/Config.js';
import ElementWaiter from './ElementWaiter.js';
import ErrorHandler from '../utils/ErrorHandler.js';

/**
 * Gamma-specific navigation logic
 * Handles navigation between Gamma pages and state verification
 */
class GammaNavigator {
  constructor(page) {
    this.page = page;
    this.waiter = new ElementWaiter(page);
    this.logger = Logger.child('GammaNavigator');
    this.baseUrl = Config.get('gamma.baseUrl');
  }

  /**
   * Navigate to Gamma homepage
   */
  async goToHome() {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Navigating to home');
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle' });
      await this.waiter.waitForLoadingComplete();
      this.logger.info('Home page loaded');
    }, { context: 'navigate-home' });
  }

  /**
   * Navigate to workspace/dashboard
   */
  async goToWorkspace() {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Navigating to workspace');
      await this.page.goto(`${this.baseUrl}/workspace`, { waitUntil: 'networkidle' });
      await this.waiter.waitForLoadingComplete();

      // Verify we're on workspace
      const isWorkspace = await this.isOnWorkspace();
      if (!isWorkspace) {
        throw new Error('Failed to navigate to workspace');
      }

      this.logger.info('Workspace loaded');
    }, { context: 'navigate-workspace' });
  }

  /**
   * Navigate to create new presentation page
   * @param {string} method - Creation method ('blank', 'ai', 'template')
   */
  async goToCreate(method = 'ai') {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Starting presentation creation', { method });

      // Ensure we're on workspace
      await this.goToWorkspace();

      // Click create button
      await this.waiter.waitAndClick('dashboard', 'createButton');
      await this.waiter.waitForLoadingComplete();

      // Select creation method
      switch (method) {
        case 'ai':
        case 'text':
          await this.waiter.waitAndClick('dashboard', 'createFromText');
          break;
        case 'template':
          await this.waiter.waitAndClick('dashboard', 'createFromTemplate');
          break;
        case 'blank':
          await this.waiter.waitAndClick('dashboard', 'createPresentation');
          break;
        default:
          throw new Error(`Unknown creation method: ${method}`);
      }

      await this.waiter.waitForLoadingComplete();
      this.logger.info('Create page loaded', { method });
    }, { context: 'navigate-create' });
  }

  /**
   * Navigate to editor for existing presentation
   * @param {string} presentationId - Presentation ID
   */
  async goToEditor(presentationId) {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Navigating to editor', { presentationId });

      const url = `${this.baseUrl}/edit/${presentationId}`;
      await this.page.goto(url, { waitUntil: 'networkidle' });
      await this.waiter.waitForLoadingComplete();

      // Verify editor loaded
      const isEditor = await this.isInEditor();
      if (!isEditor) {
        throw new Error('Failed to load editor');
      }

      this.logger.info('Editor loaded');
    }, { context: 'navigate-editor' });
  }

  /**
   * Navigate to presentation list
   */
  async goToPresentations() {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Navigating to presentations list');

      await this.goToWorkspace();

      // Presentations should be visible on workspace
      await this.waiter.waitForElement('dashboard', 'presentationsList');

      this.logger.info('Presentations list loaded');
    }, { context: 'navigate-presentations' });
  }

  /**
   * Open theme/design panel
   */
  async openThemePanel() {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Opening theme panel');

      await this.waiter.waitAndClick('theme', 'themeButton');
      await this.waiter.waitForElement('theme', 'themeList');

      this.logger.info('Theme panel opened');
    }, { context: 'open-theme-panel' });
  }

  /**
   * Open export/share dialog
   */
  async openExportDialog() {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Opening export dialog');

      await this.waiter.waitAndClick('export', 'exportButton');
      await this.waiter.waitForElement('export', 'formatSelect');

      this.logger.info('Export dialog opened');
    }, { context: 'open-export-dialog' });
  }

  /**
   * Check if on workspace page
   * @returns {Promise<boolean>}
   */
  async isOnWorkspace() {
    try {
      const url = this.page.url();
      const hasWorkspace = url.includes('/workspace') || url.includes('/dashboard');
      const hasCreateButton = await this.waiter.exists('dashboard', 'createButton');

      return hasWorkspace || hasCreateButton;
    } catch {
      return false;
    }
  }

  /**
   * Check if in editor
   * @returns {Promise<boolean>}
   */
  async isInEditor() {
    try {
      const url = this.page.url();
      const hasEdit = url.includes('/edit') || url.includes('/editor');
      const hasSlideContainer = await this.waiter.exists('editor', 'slideContainer');

      return hasEdit || hasSlideContainer;
    } catch {
      return false;
    }
  }

  /**
   * Check if on login page
   * @returns {Promise<boolean>}
   */
  async isOnLogin() {
    try {
      const url = this.page.url();
      const hasLogin = url.includes('/login') || url.includes('/signin');
      const hasEmailInput = await this.waiter.exists('auth', 'emailInput');

      return hasLogin || hasEmailInput;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to be ready
   * @param {number} timeout - Maximum wait time
   */
  async waitForReady(timeout = 30000) {
    try {
      this.logger.debug('Waiting for page to be ready');

      // Wait for network to be idle
      await this.page.waitForLoadState('networkidle', { timeout });

      // Wait for any loading indicators to disappear
      await this.waiter.waitForLoadingComplete(timeout);

      this.logger.debug('Page ready');
    } catch (error) {
      this.logger.warn('Page ready check timed out', { error: error.message });
      // Don't throw, page might still be usable
    }
  }

  /**
   * Get current URL
   * @returns {string}
   */
  getCurrentURL() {
    return this.page.url();
  }

  /**
   * Go back in browser history
   */
  async goBack() {
    this.logger.info('Going back');
    await this.page.goBack({ waitUntil: 'networkidle' });
    await this.waitForReady();
  }

  /**
   * Reload current page
   */
  async reload() {
    this.logger.info('Reloading page');
    await this.page.reload({ waitUntil: 'networkidle' });
    await this.waitForReady();
  }

  /**
   * Check for error messages on page
   * @returns {Promise<string|null>} Error message or null
   */
  async getErrorMessage() {
    try {
      const errorText = await this.waiter.getText('status', 'errorMessage', { timeout: 1000 });
      return errorText;
    } catch {
      return null;
    }
  }

  /**
   * Check for success messages on page
   * @returns {Promise<string|null>} Success message or null
   */
  async getSuccessMessage() {
    try {
      const successText = await this.waiter.getText('status', 'successMessage', { timeout: 1000 });
      return successText;
    } catch {
      return null;
    }
  }

  /**
   * Close any open dialogs or modals
   */
  async closeDialogs() {
    try {
      const hasCloseButton = await this.waiter.exists('navigation', 'closeButton');
      if (hasCloseButton) {
        await this.waiter.waitAndClick('navigation', 'closeButton');
        await this.waiter.waitForLoadingComplete();
        this.logger.debug('Dialog closed');
      }
    } catch (error) {
      this.logger.debug('No dialog to close or error closing', { error: error.message });
    }
  }

  /**
   * Take screenshot for debugging
   * @param {string} name - Screenshot name
   * @returns {Promise<string>} Screenshot path
   */
  async screenshot(name) {
    const screenshotPath = Config.get('automation.screenshotPath');
    const timestamp = Date.now();
    const filename = `${screenshotPath}/nav_${name}_${timestamp}.png`;

    await this.page.screenshot({ path: filename, fullPage: true });
    this.logger.info('Screenshot captured', { filename });

    return filename;
  }
}

export default GammaNavigator;
