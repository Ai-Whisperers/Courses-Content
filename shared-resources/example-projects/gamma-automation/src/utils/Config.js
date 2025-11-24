import defaultConfig from '../../config/default.js';

/**
 * Configuration management class
 * Provides centralized access to application configuration
 */
class Config {
  constructor() {
    this.config = { ...defaultConfig };
    this.customConfig = {};
  }

  /**
   * Get configuration value by path
   * @param {string} path - Dot-notation path (e.g., 'gamma.baseUrl')
   * @param {*} defaultValue - Default value if path not found
   * @returns {*} Configuration value
   */
  get(path, defaultValue = null) {
    const keys = path.split('.');
    let value = this.config;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }

    return value;
  }

  /**
   * Set configuration value by path
   * @param {string} path - Dot-notation path
   * @param {*} value - Value to set
   */
  set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = this.config;

    for (const key of keys) {
      if (!(key in target)) {
        target[key] = {};
      }
      target = target[key];
    }

    target[lastKey] = value;
    this.customConfig[path] = value;
  }

  /**
   * Merge custom configuration
   * @param {Object} customConfig - Configuration object to merge
   */
  merge(customConfig) {
    this.config = this._deepMerge(this.config, customConfig);
  }

  /**
   * Get all configuration
   * @returns {Object} Complete configuration object
   */
  getAll() {
    return { ...this.config };
  }

  /**
   * Reset configuration to defaults
   */
  reset() {
    this.config = { ...defaultConfig };
    this.customConfig = {};
  }

  /**
   * Deep merge two objects
   * @private
   */
  _deepMerge(target, source) {
    const result = { ...target };

    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        result[key] = this._deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * Validate required configuration
   * @param {string[]} requiredPaths - Array of required configuration paths
   * @throws {Error} If required configuration is missing
   */
  validate(requiredPaths) {
    const missing = [];

    for (const path of requiredPaths) {
      if (this.get(path) === null) {
        missing.push(path);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
  }
}

// Export singleton instance
export default new Config();
