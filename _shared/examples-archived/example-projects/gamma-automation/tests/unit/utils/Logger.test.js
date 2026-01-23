/**
 * Unit tests for Logger
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs';
import path from 'path';

describe('Logger', () => {
  let Logger;
  const testLogDir = path.join(process.cwd(), 'logs');

  beforeEach(async () => {
    // Import Logger module
    const LoggerModule = await import('../../../src/utils/Logger.js');
    Logger = LoggerModule.default;
  });

  afterEach(() => {
    // Clean up test logs if needed
    // Note: Logger creates logs directory, so we don't delete it
  });

  describe('initialization', () => {
    test('should be a singleton instance', () => {
      expect(Logger).toBeDefined();
      expect(typeof Logger.getLogger).toBe('function');
    });

    test('should create logs directory if not exists', () => {
      expect(fs.existsSync(testLogDir)).toBe(true);
    });

    test('should have logging methods', () => {
      expect(typeof Logger.info).toBe('function');
      expect(typeof Logger.warn).toBe('function');
      expect(typeof Logger.error).toBe('function');
      expect(typeof Logger.debug).toBe('function');
    });
  });

  describe('getLogger', () => {
    test('should create logger for category', () => {
      const logger = Logger.getLogger('test-category');

      expect(logger).toBeDefined();
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.debug).toBe('function');
    });

    test('should return same logger for same category', () => {
      const logger1 = Logger.getLogger('same-category');
      const logger2 = Logger.getLogger('same-category');

      expect(logger1).toBe(logger2);
    });

    test('should create different loggers for different categories', () => {
      const logger1 = Logger.getLogger('category-1');
      const logger2 = Logger.getLogger('category-2');

      expect(logger1).not.toBe(logger2);
    });

    test('should use default category if none provided', () => {
      const logger = Logger.getLogger();

      expect(logger).toBeDefined();
    });

    test('should cache created loggers', () => {
      const category = 'cached-logger';
      Logger.getLogger(category);

      expect(Logger.loggers[category]).toBeDefined();
    });
  });

  describe('child logger', () => {
    test('should create child logger', () => {
      const child = Logger.child('test-child');

      expect(child).toBeDefined();
      expect(typeof child.info).toBe('function');
      expect(typeof child.warn).toBe('function');
      expect(typeof child.error).toBe('function');
      expect(typeof child.debug).toBe('function');
    });

    test('should create child logger with default metadata', () => {
      const defaultMeta = { userId: '123', requestId: 'abc' };
      const child = Logger.child('test-child', defaultMeta);

      expect(child).toBeDefined();
      // Child logger should have logging methods
      expect(typeof child.info).toBe('function');
    });

    test('should handle child logger info calls', () => {
      const child = Logger.child('test-child');

      // Should not throw
      expect(() => child.info('Test message')).not.toThrow();
    });

    test('should handle child logger error calls with Error object', () => {
      const child = Logger.child('test-child');
      const error = new Error('Test error');

      // Should not throw
      expect(() => child.error('Error occurred', error)).not.toThrow();
    });

    test('should handle child logger error calls with metadata', () => {
      const child = Logger.child('test-child');

      // Should not throw
      expect(() => child.error('Error occurred', { code: 'ERR001' })).not.toThrow();
    });
  });

  describe('logging methods', () => {
    test('should log info message', () => {
      // Should not throw
      expect(() => Logger.info('test', 'Info message')).not.toThrow();
    });

    test('should log info message with metadata', () => {
      expect(() => Logger.info('test', 'Info message', { key: 'value' })).not.toThrow();
    });

    test('should log warning message', () => {
      expect(() => Logger.warn('test', 'Warning message')).not.toThrow();
    });

    test('should log warning message with metadata', () => {
      expect(() => Logger.warn('test', 'Warning message', { key: 'value' })).not.toThrow();
    });

    test('should log error message', () => {
      expect(() => Logger.error('test', 'Error message')).not.toThrow();
    });

    test('should log error message with Error object', () => {
      const error = new Error('Test error');
      expect(() => Logger.error('test', 'Error occurred', error)).not.toThrow();
    });

    test('should log error message with metadata', () => {
      expect(() => Logger.error('test', 'Error occurred', { code: 'ERR001' })).not.toThrow();
    });

    test('should log debug message', () => {
      expect(() => Logger.debug('test', 'Debug message')).not.toThrow();
    });

    test('should log debug message with metadata', () => {
      expect(() => Logger.debug('test', 'Debug message', { key: 'value' })).not.toThrow();
    });
  });

  describe('logOperation', () => {
    test('should log successful operation', async () => {
      const operation = async () => {
        return 'success';
      };

      const result = await Logger.logOperation('test', 'test-operation', operation);

      expect(result).toBe('success');
    });

    test('should log operation timing', async () => {
      const operation = async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'done';
      };

      const result = await Logger.logOperation('test', 'timed-operation', operation);

      expect(result).toBe('done');
    });

    test('should log failed operation', async () => {
      const operation = async () => {
        throw new Error('Operation failed');
      };

      await expect(Logger.logOperation('test', 'failing-operation', operation))
        .rejects.toThrow('Operation failed');
    });

    test('should propagate operation errors', async () => {
      const customError = new Error('Custom error');
      const operation = async () => {
        throw customError;
      };

      await expect(Logger.logOperation('test', 'error-operation', operation))
        .rejects.toThrow(customError);
    });

    test('should return operation result', async () => {
      const expectedResult = { data: 'test', count: 42 };
      const operation = async () => expectedResult;

      const result = await Logger.logOperation('test', 'data-operation', operation);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('error handling', () => {
    test('should handle Error objects in error method', () => {
      const error = new Error('Test error');
      error.code = 'TEST_CODE';

      expect(() => Logger.error('test', 'Error with code', error)).not.toThrow();
    });

    test('should handle plain objects in error method', () => {
      const errorData = { message: 'Error', code: 500 };

      expect(() => Logger.error('test', 'Plain error', errorData)).not.toThrow();
    });

    test('should handle errors without messages', () => {
      const error = new Error();

      expect(() => Logger.error('test', 'Empty error', error)).not.toThrow();
    });
  });

  describe('logger categories', () => {
    test('should create loggers for different categories', () => {
      const categories = ['browser', 'session', 'automation', 'content'];

      categories.forEach(category => {
        const logger = Logger.getLogger(category);
        expect(logger).toBeDefined();
      });
    });

    test('should maintain separate logger instances per category', () => {
      const logger1 = Logger.getLogger('category-a');
      const logger2 = Logger.getLogger('category-b');
      const logger3 = Logger.getLogger('category-a'); // Same as logger1

      expect(logger1).not.toBe(logger2);
      expect(logger1).toBe(logger3);
    });
  });

  describe('metadata handling', () => {
    test('should accept empty metadata', () => {
      expect(() => Logger.info('test', 'Message', {})).not.toThrow();
    });

    test('should accept complex metadata', () => {
      const metadata = {
        user: { id: 1, name: 'Test' },
        request: { method: 'GET', path: '/api' },
        nested: { deep: { value: 42 } }
      };

      expect(() => Logger.info('test', 'Complex metadata', metadata)).not.toThrow();
    });

    test('should handle metadata with arrays', () => {
      const metadata = {
        items: [1, 2, 3],
        tags: ['a', 'b', 'c']
      };

      expect(() => Logger.info('test', 'Array metadata', metadata)).not.toThrow();
    });
  });
});
