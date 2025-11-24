import { chromium } from 'playwright';
import Config from '../utils/Config.js';
import Logger from '../utils/Logger.js';

/**
 * Browser lifecycle management class
 * Handles browser launch, context creation, and cleanup
 */
class BrowserManager {
  constructor() {
    this.browser = null;
    this.contexts = new Map();
    this.logger = Logger.child('BrowserManager');
  }

  /**
   * Launch browser with optimal settings
   * @param {Object} options - Browser launch options
   * @returns {Promise<Browser>} Browser instance
   */
  async launch(options = {}) {
    try {
      const browserConfig = Config.get('browser');

      const launchOptions = {
        headless: options.headless !== undefined ? options.headless : browserConfig.headless,
        args: options.args || browserConfig.args,
        slowMo: options.slowMo !== undefined ? options.slowMo : browserConfig.slowMo,
        ...options
      };

      this.logger.info('Launching browser', {
        headless: launchOptions.headless,
        slowMo: launchOptions.slowMo
      });

      this.browser = await chromium.launch(launchOptions);

      this.logger.info('Browser launched successfully');
      return this.browser;
    } catch (error) {
      this.logger.error('Failed to launch browser', error);
      throw new Error(`Browser launch failed: ${error.message}`);
    }
  }

  /**
   * Create new browser context with session management
   * @param {Object} sessionData - Optional session data for restoration
   * @param {Object} options - Context options
   * @returns {Promise<BrowserContext>} Browser context instance
   */
  async createContext(sessionData = null, options = {}) {
    try {
      if (!this.browser) {
        await this.launch();
      }

      const browserConfig = Config.get('browser');
      const contextOptions = {
        viewport: options.viewport || browserConfig.viewport,
        userAgent: options.userAgent || browserConfig.userAgent,
        ignoreHTTPSErrors: true,
        javaScriptEnabled: true,
        ...options
      };

      // Restore session if provided
      if (sessionData && sessionData.cookies) {
        contextOptions.storageState = sessionData;
      }

      this.logger.info('Creating browser context');
      const context = await this.browser.newContext(contextOptions);

      // Store context reference
      const contextId = `context_${Date.now()}`;
      this.contexts.set(contextId, context);

      // Set up context event listeners
      this._setupContextListeners(context, contextId);

      this.logger.info('Browser context created', { contextId });
      return { context, contextId };
    } catch (error) {
      this.logger.error('Failed to create browser context', error);
      throw new Error(`Context creation failed: ${error.message}`);
    }
  }

  /**
   * Set up event listeners for browser context
   * @private
   * @param {BrowserContext} context - Browser context
   * @param {string} contextId - Context identifier
   */
  _setupContextListeners(context, contextId) {
    context.on('page', (page) => {
      this.logger.debug('New page created', { contextId, url: page.url() });
    });

    context.on('close', () => {
      this.logger.info('Context closed', { contextId });
      this.contexts.delete(contextId);
    });
  }

  /**
   * Create new page in context
   * @param {BrowserContext} context - Browser context
   * @returns {Promise<Page>} Page instance
   */
  async createPage(context) {
    try {
      const page = await context.newPage();

      // Set default timeout
      const timeout = Config.get('automation.navigationTimeout');
      page.setDefaultTimeout(timeout);
      page.setDefaultNavigationTimeout(timeout);

      // Set up page event listeners
      this._setupPageListeners(page);

      this.logger.debug('New page created');
      return page;
    } catch (error) {
      this.logger.error('Failed to create page', error);
      throw new Error(`Page creation failed: ${error.message}`);
    }
  }

  /**
   * Set up event listeners for page
   * @private
   * @param {Page} page - Page instance
   */
  _setupPageListeners(page) {
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.logger.debug('Page console error', { message: msg.text() });
      }
    });

    page.on('pageerror', (error) => {
      this.logger.debug('Page error', { error: error.message });
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        this.logger.debug('HTTP error response', {
          url: response.url(),
          status: response.status()
        });
      }
    });
  }

  /**
   * Close specific context
   * @param {string} contextId - Context identifier
   */
  async closeContext(contextId) {
    try {
      const context = this.contexts.get(contextId);
      if (context) {
        await context.close();
        this.contexts.delete(contextId);
        this.logger.info('Context closed', { contextId });
      }
    } catch (error) {
      this.logger.error('Failed to close context', error);
    }
  }

  /**
   * Handle browser cleanup
   */
  async cleanup() {
    try {
      this.logger.info('Starting browser cleanup');

      // Close all contexts
      for (const [contextId, context] of this.contexts.entries()) {
        try {
          await context.close();
          this.logger.debug('Context closed during cleanup', { contextId });
        } catch (error) {
          this.logger.warn('Error closing context', { contextId, error: error.message });
        }
      }
      this.contexts.clear();

      // Close browser
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.logger.info('Browser closed successfully');
      }
    } catch (error) {
      this.logger.error('Error during browser cleanup', error);
      throw error;
    }
  }

  /**
   * Monitor browser health
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    try {
      const isConnected = this.browser && this.browser.isConnected();
      const contextCount = this.contexts.size;

      const health = {
        healthy: isConnected,
        browserConnected: isConnected,
        activeContexts: contextCount,
        timestamp: new Date().toISOString()
      };

      this.logger.debug('Health check completed', health);
      return health;
    } catch (error) {
      this.logger.error('Health check failed', error);
      return {
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Take screenshot for debugging
   * @param {Page} page - Page instance
   * @param {string} name - Screenshot name
   * @returns {Promise<string>} Screenshot path
   */
  async takeScreenshot(page, name) {
    try {
      const screenshotPath = Config.get('automation.screenshotPath');
      const timestamp = Date.now();
      const filename = `${screenshotPath}/${name}_${timestamp}.png`;

      await page.screenshot({ path: filename, fullPage: true });
      this.logger.info('Screenshot captured', { filename });

      return filename;
    } catch (error) {
      this.logger.error('Failed to capture screenshot', error);
      throw error;
    }
  }

  /**
   * Check if browser is active
   * @returns {boolean}
   */
  isActive() {
    return this.browser !== null && this.browser.isConnected();
  }

  /**
   * Get active context count
   * @returns {number}
   */
  getContextCount() {
    return this.contexts.size;
  }
}

export default BrowserManager;
