import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Config from './Config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Logger utility using Winston
 * Provides structured logging with file and console transports
 */
class Logger {
  constructor() {
    this.loggers = {};
    this.ensureLogDirectory();
  }

  /**
   * Ensure logs directory exists
   */
  ensureLogDirectory() {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  /**
   * Create or get a logger instance
   * @param {string} category - Logger category (e.g., 'browser', 'automation')
   * @returns {winston.Logger} Logger instance
   */
  getLogger(category = 'default') {
    if (this.loggers[category]) {
      return this.loggers[category];
    }

    const logConfig = Config.get('logging');
    const logLevel = logConfig.level || 'info';
    const logFile = logConfig.file || 'logs/gamma-automation.log';

    // Define log format
    const logFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
      winston.format.printf(({ timestamp, level, message, metadata, label }) => {
        let metaStr = '';
        if (metadata && Object.keys(metadata).length > 0) {
          metaStr = ` ${JSON.stringify(metadata)}`;
        }
        const categoryLabel = label ? `[${label}]` : '';
        return `${timestamp} ${level.toUpperCase()} ${categoryLabel} ${message}${metaStr}`;
      })
    );

    // Create transports
    const transports = [];

    // File transport
    transports.push(
      new winston.transports.File({
        filename: logFile,
        level: logLevel,
        maxsize: 10485760, // 10MB
        maxFiles: 5,
        tailable: true
      })
    );

    // Console transport
    if (logConfig.console !== false) {
      transports.push(
        new winston.transports.Console({
          level: logLevel,
          format: winston.format.combine(
            winston.format.colorize(),
            logFormat
          )
        })
      );
    }

    // Create logger
    const logger = winston.createLogger({
      level: logLevel,
      format: winston.format.combine(
        winston.format.label({ label: category }),
        logFormat
      ),
      transports,
      exitOnError: false
    });

    this.loggers[category] = logger;
    return logger;
  }

  /**
   * Log info message
   * @param {string} category - Logger category
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  info(category, message, meta = {}) {
    this.getLogger(category).info(message, meta);
  }

  /**
   * Log warning message
   * @param {string} category - Logger category
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  warn(category, message, meta = {}) {
    this.getLogger(category).warn(message, meta);
  }

  /**
   * Log error message
   * @param {string} category - Logger category
   * @param {string} message - Log message
   * @param {Error|Object} error - Error object or metadata
   */
  error(category, message, error = {}) {
    const meta = error instanceof Error ? { error: error.message, stack: error.stack } : error;
    this.getLogger(category).error(message, meta);
  }

  /**
   * Log debug message
   * @param {string} category - Logger category
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  debug(category, message, meta = {}) {
    this.getLogger(category).debug(message, meta);
  }

  /**
   * Create a child logger with additional context
   * @param {string} category - Logger category
   * @param {Object} defaultMeta - Default metadata for all logs
   * @returns {Object} Child logger with bound methods
   */
  child(category, defaultMeta = {}) {
    const logger = this.getLogger(category);
    return {
      info: (message, meta = {}) => logger.info(message, { ...defaultMeta, ...meta }),
      warn: (message, meta = {}) => logger.warn(message, { ...defaultMeta, ...meta }),
      error: (message, error = {}) => {
        const errorMeta = error instanceof Error
          ? { error: error.message, stack: error.stack }
          : error;
        logger.error(message, { ...defaultMeta, ...errorMeta });
      },
      debug: (message, meta = {}) => logger.debug(message, { ...defaultMeta, ...meta })
    };
  }

  /**
   * Log operation with timing
   * @param {string} category - Logger category
   * @param {string} operation - Operation name
   * @param {Function} fn - Function to execute
   * @returns {Promise<*>} Function result
   */
  async logOperation(category, operation, fn) {
    const startTime = Date.now();
    this.info(category, `Starting: ${operation}`);

    try {
      const result = await fn();
      const duration = Date.now() - startTime;
      this.info(category, `Completed: ${operation}`, { duration: `${duration}ms` });
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.error(category, `Failed: ${operation}`, {
        duration: `${duration}ms`,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }
}

// Export singleton instance
export default new Logger();
