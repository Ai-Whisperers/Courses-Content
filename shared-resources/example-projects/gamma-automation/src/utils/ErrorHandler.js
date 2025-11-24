import Config from './Config.js';
import Logger from './Logger.js';

/**
 * Error handling and recovery utility
 * Provides automatic retry mechanisms and graceful degradation
 */
class ErrorHandler {
  constructor() {
    this.logger = Logger.child('ErrorHandler');
    this.retryAttempts = Config.get('automation.retryAttempts', 3);
    this.retryDelay = Config.get('automation.retryDelay', 2000);
  }

  /**
   * Execute function with automatic retry
   * @param {Function} fn - Function to execute
   * @param {Object} options - Retry options
   * @returns {Promise<*>} Function result
   */
  async withRetry(fn, options = {}) {
    const maxAttempts = options.retryAttempts || this.retryAttempts;
    const delay = options.retryDelay || this.retryDelay;
    const context = options.context || 'operation';

    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        this.logger.debug(`Attempt ${attempt}/${maxAttempts}`, { context });
        const result = await fn();
        return result;
      } catch (error) {
        lastError = error;
        this.logger.warn(`Attempt ${attempt} failed`, {
          context,
          error: error.message,
          remaining: maxAttempts - attempt
        });

        if (attempt < maxAttempts) {
          await this.sleep(delay * attempt); // Exponential backoff
        }
      }
    }

    this.logger.error(`All ${maxAttempts} attempts failed`, {
      context,
      error: lastError.message
    });
    throw lastError;
  }

  /**
   * Wrap function with error boundary
   * @param {Function} fn - Function to wrap
   * @param {Function} fallback - Fallback function
   * @returns {Promise<*>} Function result or fallback result
   */
  async withFallback(fn, fallback) {
    try {
      return await fn();
    } catch (error) {
      this.logger.warn('Function failed, using fallback', {
        error: error.message
      });
      return await fallback(error);
    }
  }

  /**
   * Handle screenshot on error
   * @param {Page} page - Playwright page instance
   * @param {string} context - Error context
   */
  async captureError(page, context) {
    try {
      if (!Config.get('automation.screenshotOnError')) {
        return null;
      }

      const screenshotPath = Config.get('automation.screenshotPath');
      const timestamp = Date.now();
      const filename = `${screenshotPath}/error_${context}_${timestamp}.png`;

      await page.screenshot({ path: filename, fullPage: true });
      this.logger.info('Error screenshot captured', { filename, context });

      return filename;
    } catch (error) {
      this.logger.warn('Failed to capture error screenshot', {
        error: error.message
      });
      return null;
    }
  }

  /**
   * Sleep utility
   * @param {number} ms - Milliseconds to sleep
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if error is retryable
   * @param {Error} error - Error object
   * @returns {boolean}
   */
  isRetryable(error) {
    const retryablePatterns = [
      /timeout/i,
      /network/i,
      /connection/i,
      /ECONNREFUSED/i,
      /ETIMEDOUT/i,
      /502/,
      /503/,
      /504/
    ];

    return retryablePatterns.some(pattern => pattern.test(error.message));
  }

  /**
   * Create error with context
   * @param {string} message - Error message
   * @param {Object} context - Additional context
   * @returns {Error}
   */
  createError(message, context = {}) {
    const error = new Error(message);
    error.context = context;
    return error;
  }
}

export default new ErrorHandler();
