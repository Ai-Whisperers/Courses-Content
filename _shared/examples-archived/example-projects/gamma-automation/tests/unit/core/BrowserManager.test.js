/**
 * Unit tests for BrowserManager
 */

import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { mockBrowser, mockContext, mockPlaywright, mockLogger, mockConfig } from '../../helpers/mockFactories.js';
import { browserOptions } from '../../helpers/fixtures.js';

// Mock dependencies
jest.unstable_mockModule('../../../src/utils/Logger.js', () => ({
  default: mockLogger()
}));

jest.unstable_mockModule('../../../src/utils/Config.js', () => ({
  default: mockConfig()
}));

jest.unstable_mockModule('playwright', () => mockPlaywright());

describe('BrowserManager', () => {
  let BrowserManager;
  let browserManager;
  let mockedPlaywright;
  let mockedLogger;
  let mockedConfig;

  beforeEach(async () => {
    // Import mocked modules
    const LoggerModule = await import('../../../src/utils/Logger.js');
    const ConfigModule = await import('../../../src/utils/Config.js');
    const playwrightModule = await import('playwright');

    mockedLogger = LoggerModule.default;
    mockedConfig = ConfigModule.default;
    mockedPlaywright = playwrightModule;

    // Import class under test
    const BrowserManagerModule = await import('../../../src/core/BrowserManager.js');
    BrowserManager = BrowserManagerModule.default;

    browserManager = new BrowserManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with default values', () => {
      expect(browserManager.browser).toBeNull();
      expect(browserManager.contexts).toEqual(new Map());
      expect(browserManager.pages).toEqual(new Map());
    });

    test('should create logger instance', () => {
      expect(mockedLogger.child).toHaveBeenCalledWith('BrowserManager');
    });
  });

  describe('launch', () => {
    test('should launch browser with default options', async () => {
      mockedConfig.get.mockImplementation((key) => {
        const config = {
          'browser.headless': true,
          'browser.viewport.width': 1920,
          'browser.viewport.height': 1080
        };
        return config[key];
      });

      await browserManager.launch();

      expect(mockedPlaywright.chromium.launch).toHaveBeenCalled();
      expect(browserManager.browser).not.toBeNull();
    });

    test('should launch browser with custom options', async () => {
      const customOptions = {
        headless: false,
        slowMo: 100
      };

      await browserManager.launch(customOptions);

      expect(mockedPlaywright.chromium.launch).toHaveBeenCalledWith(
        expect.objectContaining(customOptions)
      );
    });

    test('should log launch event', async () => {
      await browserManager.launch();

      expect(mockedLogger.info).toHaveBeenCalledWith(
        expect.stringContaining('launch')
      );
    });

    test('should handle launch failure', async () => {
      const error = new Error('Launch failed');
      mockedPlaywright.chromium.launch.mockRejectedValue(error);

      await expect(browserManager.launch()).rejects.toThrow('Launch failed');
      expect(mockedLogger.error).toHaveBeenCalled();
    });

    test('should not launch if already launched', async () => {
      await browserManager.launch();
      const firstBrowser = browserManager.browser;

      await browserManager.launch();
      const secondBrowser = browserManager.browser;

      expect(firstBrowser).toBe(secondBrowser);
      expect(mockedPlaywright.chromium.launch).toHaveBeenCalledTimes(1);
    });
  });

  describe('createContext', () => {
    beforeEach(async () => {
      await browserManager.launch();
    });

    test('should create new context', async () => {
      const { context, contextId } = await browserManager.createContext();

      expect(context).toBeDefined();
      expect(contextId).toBeDefined();
      expect(browserManager.contexts.has(contextId)).toBe(true);
    });

    test('should create context with session data', async () => {
      const sessionData = {
        cookies: [{ name: 'session', value: 'abc123' }]
      };

      const { context } = await browserManager.createContext(sessionData);

      expect(context).toBeDefined();
      expect(browserManager.browser.newContext).toHaveBeenCalledWith(
        expect.objectContaining({
          storageState: sessionData
        })
      );
    });

    test('should generate unique context IDs', async () => {
      const context1 = await browserManager.createContext();
      const context2 = await browserManager.createContext();

      expect(context1.contextId).not.toBe(context2.contextId);
    });

    test('should track multiple contexts', async () => {
      await browserManager.createContext();
      await browserManager.createContext();
      await browserManager.createContext();

      expect(browserManager.contexts.size).toBe(3);
    });

    test('should throw if browser not launched', async () => {
      browserManager.browser = null;

      await expect(browserManager.createContext()).rejects.toThrow();
    });
  });

  describe('createPage', () => {
    let context;

    beforeEach(async () => {
      await browserManager.launch();
      const result = await browserManager.createContext();
      context = result.context;
    });

    test('should create new page', async () => {
      const { page, pageId } = await browserManager.createPage(context);

      expect(page).toBeDefined();
      expect(pageId).toBeDefined();
      expect(browserManager.pages.has(pageId)).toBe(true);
    });

    test('should generate unique page IDs', async () => {
      const page1 = await browserManager.createPage(context);
      const page2 = await browserManager.createPage(context);

      expect(page1.pageId).not.toBe(page2.pageId);
    });

    test('should track multiple pages', async () => {
      await browserManager.createPage(context);
      await browserManager.createPage(context);
      await browserManager.createPage(context);

      expect(browserManager.pages.size).toBe(3);
    });
  });

  describe('healthCheck', () => {
    test('should return unhealthy if browser not launched', async () => {
      const health = await browserManager.healthCheck();

      expect(health.healthy).toBe(false);
      expect(health.browser).toBe(false);
    });

    test('should return healthy if browser connected', async () => {
      await browserManager.launch();

      const health = await browserManager.healthCheck();

      expect(health.healthy).toBe(true);
      expect(health.browser).toBe(true);
    });

    test('should include context and page counts', async () => {
      await browserManager.launch();
      await browserManager.createContext();
      const { context } = await browserManager.createContext();
      await browserManager.createPage(context);

      const health = await browserManager.healthCheck();

      expect(health.contexts).toBe(2);
      expect(health.pages).toBe(1);
    });

    test('should return unhealthy if browser disconnected', async () => {
      await browserManager.launch();
      browserManager.browser.isConnected.mockReturnValue(false);

      const health = await browserManager.healthCheck();

      expect(health.healthy).toBe(false);
    });
  });

  describe('screenshot', () => {
    let page;

    beforeEach(async () => {
      await browserManager.launch();
      const { context } = await browserManager.createContext();
      const result = await browserManager.createPage(context);
      page = result.page;
    });

    test('should capture screenshot', async () => {
      const path = await browserManager.screenshot(page, 'test');

      expect(page.screenshot).toHaveBeenCalled();
      expect(path).toContain('test');
      expect(path).toContain('.png');
    });

    test('should use fullPage by default', async () => {
      await browserManager.screenshot(page, 'test');

      expect(page.screenshot).toHaveBeenCalledWith(
        expect.objectContaining({
          fullPage: true
        })
      );
    });

    test('should accept custom options', async () => {
      await browserManager.screenshot(page, 'test', {
        fullPage: false,
        type: 'jpeg'
      });

      expect(page.screenshot).toHaveBeenCalledWith(
        expect.objectContaining({
          fullPage: false,
          type: 'jpeg'
        })
      );
    });
  });

  describe('cleanup', () => {
    test('should close all pages', async () => {
      await browserManager.launch();
      const { context } = await browserManager.createContext();
      const page1 = await browserManager.createPage(context);
      const page2 = await browserManager.createPage(context);

      await browserManager.cleanup();

      expect(page1.page.close).toHaveBeenCalled();
      expect(page2.page.close).toHaveBeenCalled();
    });

    test('should close all contexts', async () => {
      await browserManager.launch();
      const context1 = await browserManager.createContext();
      const context2 = await browserManager.createContext();

      await browserManager.cleanup();

      expect(context1.context.close).toHaveBeenCalled();
      expect(context2.context.close).toHaveBeenCalled();
    });

    test('should close browser', async () => {
      await browserManager.launch();

      await browserManager.cleanup();

      expect(browserManager.browser.close).toHaveBeenCalled();
      expect(browserManager.browser).toBeNull();
    });

    test('should clear tracking maps', async () => {
      await browserManager.launch();
      await browserManager.createContext();

      await browserManager.cleanup();

      expect(browserManager.contexts.size).toBe(0);
      expect(browserManager.pages.size).toBe(0);
    });

    test('should handle cleanup errors gracefully', async () => {
      await browserManager.launch();
      browserManager.browser.close.mockRejectedValue(new Error('Close failed'));

      await expect(browserManager.cleanup()).resolves.not.toThrow();
      expect(mockedLogger.error).toHaveBeenCalled();
    });

    test('should be safe to call multiple times', async () => {
      await browserManager.launch();

      await browserManager.cleanup();
      await browserManager.cleanup();

      expect(mockedLogger.error).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    test('should handle rapid sequential operations', async () => {
      await browserManager.launch();

      const promises = Array.from({ length: 10 }, () =>
        browserManager.createContext()
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      expect(browserManager.contexts.size).toBe(10);
    });

    test('should handle context creation after partial cleanup', async () => {
      await browserManager.launch();
      const context1 = await browserManager.createContext();

      await context1.context.close();
      browserManager.contexts.delete(context1.contextId);

      const context2 = await browserManager.createContext();

      expect(context2.context).toBeDefined();
    });

    test('should maintain state across operations', async () => {
      await browserManager.launch();
      const initialBrowser = browserManager.browser;

      await browserManager.createContext();
      const middleBrowser = browserManager.browser;

      await browserManager.healthCheck();
      const finalBrowser = browserManager.browser;

      expect(initialBrowser).toBe(middleBrowser);
      expect(middleBrowser).toBe(finalBrowser);
    });
  });
});
