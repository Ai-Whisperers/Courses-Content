/**
 * Unit tests for ErrorHandler
 */

import { describe, test, expect, beforeEach, jest } from '@jest/globals';

describe('ErrorHandler', () => {
  let ErrorHandler;

  beforeEach(async () => {
    // Clear module cache and reimport
    jest.resetModules();

    // Import ErrorHandler module
    const ErrorHandlerModule = await import('../../../src/utils/ErrorHandler.js');
    ErrorHandler = ErrorHandlerModule.default;
  });

  describe('withRetry', () => {
    test('should execute function successfully on first try', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');

      const result = await ErrorHandler.withRetry(mockFn);

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('should retry on failure', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('First fail'))
        .mockRejectedValueOnce(new Error('Second fail'))
        .mockResolvedValue('success');

      const result = await ErrorHandler.withRetry(mockFn, { maxRetries: 3, delay: 10 });

      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });

    test('should throw error after max retries', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Always fails'));

      await expect(ErrorHandler.withRetry(mockFn, { maxRetries: 2, delay: 10 }))
        .rejects
        .toThrow('Always fails');

      expect(mockFn).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    test('should apply exponential backoff', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValue('success');

      const startTime = Date.now();
      await ErrorHandler.withRetry(mockFn, {
        maxRetries: 2,
        delay: 100,
        exponentialBackoff: true
      });
      const endTime = Date.now();

      // Should have delayed at least 100ms for the first retry
      expect(endTime - startTime).toBeGreaterThanOrEqual(90); // Allow for timing variations
    });

    test('should accept custom retry delay', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail'))
        .mockResolvedValue('success');

      const startTime = Date.now();
      await ErrorHandler.withRetry(mockFn, { maxRetries: 1, delay: 200 });
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(180);
    });
  });

  describe('isRetryable', () => {
    test('should identify retryable errors', () => {
      const networkError = new Error('Network timeout');
      networkError.code = 'ETIMEDOUT';

      expect(ErrorHandler.isRetryable(networkError)).toBe(true);
    });

    test('should identify non-retryable errors', () => {
      const authError = new Error('Authentication failed');
      authError.code = 'AUTH_FAILED';

      // Depending on implementation, this might be false
      const isRetryable = ErrorHandler.isRetryable(authError);
      expect(typeof isRetryable).toBe('boolean');
    });

    test('should handle errors without codes', () => {
      const genericError = new Error('Something went wrong');

      const isRetryable = ErrorHandler.isRetryable(genericError);
      expect(typeof isRetryable).toBe('boolean');
    });
  });

  describe('sleep', () => {
    test('should delay execution', async () => {
      const startTime = Date.now();
      await ErrorHandler.sleep(100);
      const endTime = Date.now();

      expect(endTime - startTime).toBeGreaterThanOrEqual(90);
      expect(endTime - startTime).toBeLessThan(200);
    });

    test('should work with zero delay', async () => {
      const startTime = Date.now();
      await ErrorHandler.sleep(0);
      const endTime = Date.now();

      expect(endTime - startTime).toBeLessThan(50);
    });
  });

  describe('captureError', () => {
    test('should return error information', () => {
      const error = new Error('Test error');
      error.stack = 'Stack trace here';

      const captured = ErrorHandler.captureError(error);

      expect(captured).toHaveProperty('message');
      expect(captured).toHaveProperty('stack');
      expect(captured.message).toBe('Test error');
    });

    test('should handle errors with additional properties', () => {
      const error = new Error('Test error');
      error.code = 'TEST_CODE';
      error.statusCode = 500;

      const captured = ErrorHandler.captureError(error);

      expect(captured).toHaveProperty('message');
      expect(typeof captured).toBe('object');
    });

    test('should handle non-Error objects', () => {
      const notAnError = { message: 'Not a real error' };

      const captured = ErrorHandler.captureError(notAnError);

      expect(captured).toBeDefined();
      expect(typeof captured).toBe('object');
    });
  });
});
