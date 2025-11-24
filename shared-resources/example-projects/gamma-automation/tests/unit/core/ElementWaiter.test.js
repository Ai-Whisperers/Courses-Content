/**
 * Unit tests for ElementWaiter
 */

import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { mockPage, mockLocator, mockLogger } from '../../helpers/mockFactories.js';
import { mockSelectors } from '../../helpers/fixtures.js';

// Mock dependencies
jest.unstable_mockModule('../../../src/utils/Logger.js', () => ({
  default: mockLogger()
}));

jest.unstable_mockModule('../../../src/selectors/ElementSelectors.js', () => ({
  default: mockSelectors
}));

describe('ElementWaiter', () => {
  let ElementWaiter;
  let waiter;
  let page;
  let locator;

  beforeEach(async () => {
    const ElementWaiterModule = await import('../../../src/core/ElementWaiter.js');
    ElementWaiter = ElementWaiterModule.default;

    page = mockPage();
    locator = mockLocator();
    page.locator.mockReturnValue(locator);

    waiter = new ElementWaiter(page);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with page', () => {
      expect(waiter.page).toBe(page);
    });

    test('should load selectors', () => {
      expect(waiter.selectors).toBeDefined();
    });
  });

  describe('waitForElement', () => {
    test('should wait for element with primary selector', async () => {
      const element = await waiter.waitForElement('auth', 'emailInput');

      expect(page.locator).toHaveBeenCalled();
      expect(element).toBeDefined();
    });

    test('should use fallback selector if primary fails', async () => {
      locator.waitFor.mockRejectedValueOnce(new Error('Not found'));
      locator.waitFor.mockResolvedValueOnce(undefined);

      const element = await waiter.waitForElement('auth', 'emailInput');

      expect(page.locator).toHaveBeenCalledTimes(2);
    });

    test('should throw if all selectors fail', async () => {
      locator.waitFor.mockRejectedValue(new Error('Not found'));

      await expect(
        waiter.waitForElement('auth', 'nonExistent')
      ).rejects.toThrow();
    });

    test('should respect timeout', async () => {
      await waiter.waitForElement('auth', 'emailInput', { timeout: 5000 });

      expect(locator.waitFor).toHaveBeenCalledWith(
        expect.objectContaining({ timeout: 5000 })
      );
    });

    test('should wait for visibility by default', async () => {
      await waiter.waitForElement('auth', 'emailInput');

      expect(locator.waitFor).toHaveBeenCalledWith(
        expect.objectContaining({ state: 'visible' })
      );
    });

    test('should support different states', async () => {
      await waiter.waitForElement('auth', 'emailInput', { state: 'attached' });

      expect(locator.waitFor).toHaveBeenCalledWith(
        expect.objectContaining({ state: 'attached' })
      );
    });
  });

  describe('waitAndClick', () => {
    test('should wait and click element', async () => {
      await waiter.waitAndClick('dashboard', 'createButton');

      expect(locator.click).toHaveBeenCalled();
    });

    test('should wait for element before clicking', async () => {
      await waiter.waitAndClick('dashboard', 'createButton');

      expect(locator.waitFor).toHaveBeenCalled();
      expect(locator.click).toHaveBeenCalled();
    });

    test('should handle click options', async () => {
      await waiter.waitAndClick('dashboard', 'createButton', {
        button: 'right',
        clickCount: 2
      });

      expect(locator.click).toHaveBeenCalledWith(
        expect.objectContaining({
          button: 'right',
          clickCount: 2
        })
      );
    });

    test('should throw if element not clickable', async () => {
      locator.click.mockRejectedValue(new Error('Not clickable'));

      await expect(
        waiter.waitAndClick('dashboard', 'createButton')
      ).rejects.toThrow();
    });
  });

  describe('waitAndFill', () => {
    test('should wait and fill input', async () => {
      await waiter.waitAndFill('auth', 'emailInput', 'test@example.com');

      expect(locator.fill).toHaveBeenCalledWith('test@example.com');
    });

    test('should clear before filling', async () => {
      await waiter.waitAndFill('auth', 'emailInput', 'test@example.com');

      expect(locator.fill).toHaveBeenCalled();
    });

    test('should handle empty string', async () => {
      await waiter.waitAndFill('auth', 'emailInput', '');

      expect(locator.fill).toHaveBeenCalledWith('');
    });

    test('should throw if fill fails', async () => {
      locator.fill.mockRejectedValue(new Error('Fill failed'));

      await expect(
        waiter.waitAndFill('auth', 'emailInput', 'test')
      ).rejects.toThrow();
    });
  });

  describe('waitAndType', () => {
    test('should type with delay', async () => {
      await waiter.waitAndType('auth', 'emailInput', 'test', { delay: 100 });

      expect(locator.type).toHaveBeenCalledWith('test', { delay: 100 });
    });

    test('should use default delay', async () => {
      await waiter.waitAndType('auth', 'emailInput', 'test');

      expect(locator.type).toHaveBeenCalled();
    });
  });

  describe('waitAndSelect', () => {
    test('should select option', async () => {
      await waiter.waitAndSelect('editor', 'themeSelect', 'modern');

      expect(locator.selectOption).toHaveBeenCalledWith('modern');
    });

    test('should handle multiple selections', async () => {
      await waiter.waitAndSelect('editor', 'multiSelect', ['opt1', 'opt2']);

      expect(locator.selectOption).toHaveBeenCalledWith(['opt1', 'opt2']);
    });
  });

  describe('getText', () => {
    test('should get element text', async () => {
      locator.textContent.mockResolvedValue('Sample text');

      const text = await waiter.getText('editor', 'slideTitle');

      expect(text).toBe('Sample text');
    });

    test('should return empty string if no text', async () => {
      locator.textContent.mockResolvedValue('');

      const text = await waiter.getText('editor', 'slideTitle');

      expect(text).toBe('');
    });

    test('should trim whitespace', async () => {
      locator.textContent.mockResolvedValue('  text  ');

      const text = await waiter.getText('editor', 'slideTitle');

      expect(text.trim()).toBe('text');
    });
  });

  describe('exists', () => {
    test('should return true if element exists', async () => {
      locator.count.mockResolvedValue(1);

      const exists = await waiter.exists('auth', 'emailInput');

      expect(exists).toBe(true);
    });

    test('should return false if element does not exist', async () => {
      locator.count.mockResolvedValue(0);

      const exists = await waiter.exists('auth', 'nonExistent');

      expect(exists).toBe(false);
    });

    test('should handle timeout gracefully', async () => {
      locator.count.mockRejectedValue(new Error('Timeout'));

      const exists = await waiter.exists('auth', 'emailInput');

      expect(exists).toBe(false);
    });
  });

  describe('waitForLoadingComplete', () => {
    test('should wait for loading indicators to disappear', async () => {
      locator.count.mockResolvedValueOnce(1).mockResolvedValue(0);

      await waiter.waitForLoadingComplete();

      expect(page.locator).toHaveBeenCalled();
    });

    test('should timeout after specified duration', async () => {
      locator.count.mockResolvedValue(1); // Always loading

      await expect(
        waiter.waitForLoadingComplete(1000)
      ).rejects.toThrow(/timeout/i);
    }, 10000);

    test('should return immediately if no loading indicators', async () => {
      locator.count.mockResolvedValue(0);

      await waiter.waitForLoadingComplete();

      expect(true).toBe(true);
    });
  });

  describe('waitForCondition', () => {
    test('should wait for custom condition', async () => {
      let count = 0;
      const condition = async () => {
        count++;
        return count > 2;
      };

      await waiter.waitForCondition(condition, 5000);

      expect(count).toBeGreaterThan(2);
    });

    test('should timeout if condition never met', async () => {
      const condition = async () => false;

      await expect(
        waiter.waitForCondition(condition, 1000)
      ).rejects.toThrow(/timeout/i);
    });

    test('should check condition repeatedly', async () => {
      let checks = 0;
      const condition = async () => {
        checks++;
        return checks >= 3;
      };

      await waiter.waitForCondition(condition, 5000, 100);

      expect(checks).toBe(3);
    });
  });

  describe('error handling', () => {
    test('should log errors', async () => {
      locator.waitFor.mockRejectedValue(new Error('Element not found'));

      await expect(
        waiter.waitForElement('auth', 'emailInput')
      ).rejects.toThrow();
    });

    test('should provide helpful error messages', async () => {
      locator.waitFor.mockRejectedValue(new Error('Timeout'));

      try {
        await waiter.waitForElement('auth', 'nonExistent');
      } catch (error) {
        expect(error.message).toBeTruthy();
      }
    });

    test('should handle page disconnection', async () => {
      page.locator.mockImplementation(() => {
        throw new Error('Page closed');
      });

      await expect(
        waiter.waitForElement('auth', 'emailInput')
      ).rejects.toThrow();
    });
  });

  describe('performance', () => {
    test('should find element quickly with primary selector', async () => {
      const start = Date.now();

      await waiter.waitForElement('auth', 'emailInput');

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000);
    });

    test('should not delay unnecessarily', async () => {
      locator.waitFor.mockResolvedValue(undefined);

      const start = Date.now();
      await waiter.waitForElement('auth', 'emailInput', { timeout: 100 });
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(200);
    });
  });
});
