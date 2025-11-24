import Logger from '../utils/Logger.js';
import Config from '../utils/Config.js';
import { getSelectorArray } from '../selectors/ElementSelectors.js';

/**
 * Smart waiting strategies for UI elements
 * Handles dynamic content loading and timeouts
 */
class ElementWaiter {
  constructor(page) {
    this.page = page;
    this.logger = Logger.child('ElementWaiter');
    this.defaultTimeout = Config.get('automation.actionTimeout', 10000);
  }

  /**
   * Wait for element with fallback selectors
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {Object} options - Wait options
   * @returns {Promise<Locator>} Element locator
   */
  async waitForElement(category, name, options = {}) {
    const timeout = options.timeout || this.defaultTimeout;
    const state = options.state || 'visible';
    const selectors = getSelectorArray(category, name);

    this.logger.debug('Waiting for element', {
      category,
      name,
      selectorsCount: selectors.length,
      timeout
    });

    let lastError;

    for (let i = 0; i < selectors.length; i++) {
      const selector = selectors[i];
      try {
        this.logger.debug(`Trying selector ${i + 1}/${selectors.length}`, { selector });

        const locator = this.page.locator(selector);
        await locator.waitFor({ state, timeout: timeout / selectors.length });

        this.logger.debug('Element found', { selector, attempt: i + 1 });
        return locator;
      } catch (error) {
        lastError = error;
        this.logger.debug(`Selector ${i + 1} failed`, { selector, error: error.message });
      }
    }

    this.logger.error('All selectors failed', {
      category,
      name,
      tried: selectors.length,
      error: lastError.message
    });

    throw new Error(
      `Element not found: ${category}.${name}. Tried ${selectors.length} selectors.`
    );
  }

  /**
   * Wait for element and click
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {Object} options - Click options
   */
  async waitAndClick(category, name, options = {}) {
    try {
      const element = await this.waitForElement(category, name, options);
      await element.click(options.clickOptions || {});
      this.logger.debug('Element clicked', { category, name });
    } catch (error) {
      this.logger.error('Click failed', { category, name, error: error.message });
      throw error;
    }
  }

  /**
   * Wait for element and fill text
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {string} text - Text to fill
   * @param {Object} options - Fill options
   */
  async waitAndFill(category, name, text, options = {}) {
    try {
      const element = await this.waitForElement(category, name, options);
      await element.fill(text);
      this.logger.debug('Element filled', { category, name, textLength: text.length });
    } catch (error) {
      this.logger.error('Fill failed', { category, name, error: error.message });
      throw error;
    }
  }

  /**
   * Wait for element and type text (with delay)
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {string} text - Text to type
   * @param {Object} options - Type options
   */
  async waitAndType(category, name, text, options = {}) {
    try {
      const element = await this.waitForElement(category, name, options);
      await element.type(text, { delay: options.delay || 50 });
      this.logger.debug('Text typed', { category, name, textLength: text.length });
    } catch (error) {
      this.logger.error('Type failed', { category, name, error: error.message });
      throw error;
    }
  }

  /**
   * Wait for element and select option
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {string|string[]} values - Values to select
   * @param {Object} options - Select options
   */
  async waitAndSelect(category, name, values, options = {}) {
    try {
      const element = await this.waitForElement(category, name, options);
      await element.selectOption(values);
      this.logger.debug('Option selected', { category, name, values });
    } catch (error) {
      this.logger.error('Select failed', { category, name, error: error.message });
      throw error;
    }
  }

  /**
   * Wait for navigation after action
   * @param {Function} action - Action to perform
   * @param {Object} options - Navigation options
   */
  async waitForNavigation(action, options = {}) {
    try {
      await Promise.all([
        this.page.waitForNavigation(options),
        action()
      ]);
      this.logger.debug('Navigation completed');
    } catch (error) {
      this.logger.error('Navigation failed', { error: error.message });
      throw error;
    }
  }

  /**
   * Wait for loading indicator to disappear
   * @param {number} timeout - Maximum wait time
   */
  async waitForLoadingComplete(timeout = 30000) {
    try {
      const selectors = getSelectorArray('status', 'loadingIndicator');

      for (const selector of selectors) {
        try {
          const loader = this.page.locator(selector);
          await loader.waitFor({ state: 'hidden', timeout: 1000 });
          this.logger.debug('Loading complete', { selector });
          return;
        } catch {
          // Try next selector
        }
      }

      // If no loader found, assume loaded
      this.logger.debug('No loading indicator found, assuming loaded');
    } catch (error) {
      this.logger.warn('Error waiting for loading', { error: error.message });
    }
  }

  /**
   * Wait for text to appear on page
   * @param {string} text - Text to wait for
   * @param {Object} options - Wait options
   */
  async waitForText(text, options = {}) {
    try {
      const timeout = options.timeout || this.defaultTimeout;
      await this.page.waitForSelector(`text=${text}`, { timeout });
      this.logger.debug('Text found', { text });
    } catch (error) {
      this.logger.error('Text not found', { text, error: error.message });
      throw error;
    }
  }

  /**
   * Wait for URL to match pattern
   * @param {string|RegExp} pattern - URL pattern
   * @param {number} timeout - Maximum wait time
   */
  async waitForURL(pattern, timeout = 30000) {
    try {
      await this.page.waitForURL(pattern, { timeout });
      this.logger.debug('URL matched', { pattern: pattern.toString() });
    } catch (error) {
      this.logger.error('URL pattern not matched', {
        pattern: pattern.toString(),
        currentURL: this.page.url(),
        error: error.message
      });
      throw error;
    }
  }

  /**
   * Wait for multiple elements
   * @param {Array} elements - Array of {category, name} objects
   * @param {Object} options - Wait options
   * @returns {Promise<Locator[]>} Array of locators
   */
  async waitForMultiple(elements, options = {}) {
    const locators = [];

    for (const { category, name } of elements) {
      const locator = await this.waitForElement(category, name, options);
      locators.push(locator);
    }

    return locators;
  }

  /**
   * Wait with custom condition
   * @param {Function} condition - Condition function that returns boolean
   * @param {Object} options - Wait options
   */
  async waitForCondition(condition, options = {}) {
    const timeout = options.timeout || this.defaultTimeout;
    const interval = options.interval || 500;
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        const result = await condition();
        if (result) {
          this.logger.debug('Condition met');
          return result;
        }
      } catch (error) {
        // Condition not met yet
      }
      await this.sleep(interval);
    }

    throw new Error('Condition timeout exceeded');
  }

  /**
   * Sleep utility
   * @private
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if element exists (doesn't wait)
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @returns {Promise<boolean>}
   */
  async exists(category, name) {
    try {
      const selectors = getSelectorArray(category, name);
      for (const selector of selectors) {
        const count = await this.page.locator(selector).count();
        if (count > 0) {
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Get element text content
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {Object} options - Wait options
   * @returns {Promise<string>}
   */
  async getText(category, name, options = {}) {
    const element = await this.waitForElement(category, name, options);
    return await element.textContent();
  }

  /**
   * Get element attribute
   * @param {string} category - Selector category
   * @param {string} name - Selector name
   * @param {string} attribute - Attribute name
   * @param {Object} options - Wait options
   * @returns {Promise<string>}
   */
  async getAttribute(category, name, attribute, options = {}) {
    const element = await this.waitForElement(category, name, options);
    return await element.getAttribute(attribute);
  }
}

export default ElementWaiter;
