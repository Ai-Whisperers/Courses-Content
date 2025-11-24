import Config from './Config.js';
import Logger from './Logger.js';

/**
 * Rate limiting utility to avoid detection
 * Controls request frequency and concurrent operations
 */
class RateLimiter {
  constructor() {
    this.logger = Logger.child('RateLimiter');
    this.maxRequestsPerMinute = Config.get('rateLimiting.maxRequestsPerMinute', 30);
    this.maxConcurrentRequests = Config.get('rateLimiting.maxConcurrentRequests', 5);
    this.requestDelay = Config.get('rateLimiting.requestDelay', 1000);

    this.requests = [];
    this.activeRequests = 0;
    this.queue = [];
  }

  /**
   * Execute function with rate limiting
   * @param {Function} fn - Function to execute
   * @param {string} context - Operation context
   * @returns {Promise<*>} Function result
   */
  async execute(fn, context = 'operation') {
    await this.checkRateLimit();
    await this.waitForSlot();

    this.activeRequests++;
    this.recordRequest();

    try {
      this.logger.debug('Executing rate-limited operation', {
        context,
        active: this.activeRequests,
        queueSize: this.queue.length
      });

      const result = await fn();
      return result;
    } finally {
      this.activeRequests--;
      this.processQueue();
    }
  }

  /**
   * Check if rate limit allows new request
   * @private
   */
  async checkRateLimit() {
    this.cleanOldRequests();

    while (this.requests.length >= this.maxRequestsPerMinute) {
      const oldestRequest = this.requests[0];
      const waitTime = 60000 - (Date.now() - oldestRequest);

      if (waitTime > 0) {
        this.logger.debug('Rate limit reached, waiting', {
          waitTime: `${waitTime}ms`,
          requests: this.requests.length
        });
        await this.sleep(waitTime);
      }

      this.cleanOldRequests();
    }
  }

  /**
   * Wait for available concurrent slot
   * @private
   */
  async waitForSlot() {
    while (this.activeRequests >= this.maxConcurrentRequests) {
      await this.sleep(100);
    }

    // Add delay between requests
    if (this.requestDelay > 0) {
      await this.sleep(this.requestDelay);
    }
  }

  /**
   * Record new request timestamp
   * @private
   */
  recordRequest() {
    this.requests.push(Date.now());
  }

  /**
   * Clean requests older than 1 minute
   * @private
   */
  cleanOldRequests() {
    const oneMinuteAgo = Date.now() - 60000;
    this.requests = this.requests.filter(timestamp => timestamp > oneMinuteAgo);
  }

  /**
   * Add operation to queue
   * @param {Function} fn - Function to queue
   * @returns {Promise<*>}
   */
  enqueue(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processQueue();
    });
  }

  /**
   * Process queued operations
   * @private
   */
  async processQueue() {
    if (this.queue.length === 0) {
      return;
    }

    if (this.activeRequests < this.maxConcurrentRequests) {
      const { fn, resolve, reject } = this.queue.shift();

      this.execute(fn)
        .then(resolve)
        .catch(reject);
    }
  }

  /**
   * Get current rate limit status
   * @returns {Object}
   */
  getStatus() {
    this.cleanOldRequests();

    return {
      requestsInLastMinute: this.requests.length,
      maxRequestsPerMinute: this.maxRequestsPerMinute,
      activeRequests: this.activeRequests,
      maxConcurrentRequests: this.maxConcurrentRequests,
      queuedRequests: this.queue.length
    };
  }

  /**
   * Reset rate limiter state
   */
  reset() {
    this.requests = [];
    this.activeRequests = 0;
    this.queue = [];
    this.logger.info('Rate limiter reset');
  }

  /**
   * Sleep utility
   * @private
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new RateLimiter();
