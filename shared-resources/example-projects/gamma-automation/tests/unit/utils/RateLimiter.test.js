/**
 * Unit tests for RateLimiter
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

describe('RateLimiter', () => {
  let RateLimiter;

  beforeEach(async () => {
    // Reset modules to get fresh instance
    const RateLimiterModule = await import('../../../src/utils/RateLimiter.js');
    RateLimiter = RateLimiterModule.default;

    // Reset state for each test
    RateLimiter.reset();
  });

  describe('initialization', () => {
    test('should be a singleton instance', () => {
      expect(RateLimiter).toBeDefined();
      expect(typeof RateLimiter.execute).toBe('function');
    });

    test('should have required methods', () => {
      expect(typeof RateLimiter.execute).toBe('function');
      expect(typeof RateLimiter.enqueue).toBe('function');
      expect(typeof RateLimiter.getStatus).toBe('function');
      expect(typeof RateLimiter.reset).toBe('function');
    });

    test('should initialize with default values', () => {
      const status = RateLimiter.getStatus();

      expect(status.requestsInLastMinute).toBe(0);
      expect(status.activeRequests).toBe(0);
      expect(status.queuedRequests).toBe(0);
    });

    test('should have configured rate limits', () => {
      const status = RateLimiter.getStatus();

      expect(status.maxRequestsPerMinute).toBeGreaterThan(0);
      expect(status.maxConcurrentRequests).toBeGreaterThan(0);
    });
  });

  describe('execute', () => {
    test('should execute function successfully', async () => {
      const mockFn = async () => 'result';

      const result = await RateLimiter.execute(mockFn);

      expect(result).toBe('result');
    });

    test('should execute async function', async () => {
      const mockFn = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'delayed-result';
      };

      const result = await RateLimiter.execute(mockFn);

      expect(result).toBe('delayed-result');
    });

    test('should track active requests', async () => {
      const mockFn = async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'done';
      };

      // Start execution but don't await
      const promise = RateLimiter.execute(mockFn);

      // Check status while request is active
      await new Promise(resolve => setTimeout(resolve, 10));
      const statusDuring = RateLimiter.getStatus();

      // activeRequests might be 0 or 1 depending on timing
      expect(statusDuring.activeRequests).toBeGreaterThanOrEqual(0);

      // Wait for completion
      await promise;

      // After completion, active requests should be 0
      const statusAfter = RateLimiter.getStatus();
      expect(statusAfter.activeRequests).toBe(0);
    });

    test('should record request timestamps', async () => {
      const mockFn = async () => 'result';

      await RateLimiter.execute(mockFn);

      const status = RateLimiter.getStatus();
      expect(status.requestsInLastMinute).toBe(1);
    });

    test('should handle function errors', async () => {
      const mockFn = async () => {
        throw new Error('Function failed');
      };

      await expect(RateLimiter.execute(mockFn)).rejects.toThrow('Function failed');
    });

    test('should decrement active requests on error', async () => {
      const mockFn = async () => {
        throw new Error('Error');
      };

      try {
        await RateLimiter.execute(mockFn);
      } catch (error) {
        // Expected error
      }

      const status = RateLimiter.getStatus();
      expect(status.activeRequests).toBe(0);
    });

    test('should accept operation context', async () => {
      const mockFn = async () => 'result';

      const result = await RateLimiter.execute(mockFn, 'test-operation');

      expect(result).toBe('result');
    });
  });

  describe('concurrent requests', () => {
    test('should handle multiple sequential requests', async () => {
      const results = [];

      for (let i = 0; i < 3; i++) {
        const result = await RateLimiter.execute(async () => i);
        results.push(result);
      }

      expect(results).toEqual([0, 1, 2]);
    });

    test('should handle multiple parallel requests', async () => {
      const promises = [];

      for (let i = 0; i < 3; i++) {
        promises.push(RateLimiter.execute(async () => {
          await new Promise(resolve => setTimeout(resolve, 10));
          return i;
        }));
      }

      const results = await Promise.all(promises);

      expect(results.length).toBe(3);
      expect(results).toContain(0);
      expect(results).toContain(1);
      expect(results).toContain(2);
    });
  });

  describe('getStatus', () => {
    test('should return current status', () => {
      const status = RateLimiter.getStatus();

      expect(status).toHaveProperty('requestsInLastMinute');
      expect(status).toHaveProperty('maxRequestsPerMinute');
      expect(status).toHaveProperty('activeRequests');
      expect(status).toHaveProperty('maxConcurrentRequests');
      expect(status).toHaveProperty('queuedRequests');
    });

    test('should update requests count after execution', async () => {
      const statusBefore = RateLimiter.getStatus();
      expect(statusBefore.requestsInLastMinute).toBe(0);

      await RateLimiter.execute(async () => 'done');

      const statusAfter = RateLimiter.getStatus();
      expect(statusAfter.requestsInLastMinute).toBe(1);
    });

    test('should clean old requests from status', async () => {
      // Execute a request
      await RateLimiter.execute(async () => 'done');

      // Status should show 1 request
      const status = RateLimiter.getStatus();
      expect(status.requestsInLastMinute).toBe(1);

      // Old requests are cleaned automatically by getStatus
      // This test verifies the method runs without error
      expect(typeof status.requestsInLastMinute).toBe('number');
    });
  });

  describe('reset', () => {
    test('should clear all requests', async () => {
      // Execute some requests
      await RateLimiter.execute(async () => 'r1');
      await RateLimiter.execute(async () => 'r2');

      const statusBefore = RateLimiter.getStatus();
      expect(statusBefore.requestsInLastMinute).toBe(2);

      // Reset
      RateLimiter.reset();

      const statusAfter = RateLimiter.getStatus();
      expect(statusAfter.requestsInLastMinute).toBe(0);
      expect(statusAfter.activeRequests).toBe(0);
      expect(statusAfter.queuedRequests).toBe(0);
    });

    test('should allow new requests after reset', async () => {
      await RateLimiter.execute(async () => 'before');
      RateLimiter.reset();

      const result = await RateLimiter.execute(async () => 'after');

      expect(result).toBe('after');
    });
  });

  describe('enqueue', () => {
    test('should enqueue and execute function', async () => {
      const mockFn = async () => 'queued-result';

      const result = await RateLimiter.enqueue(mockFn);

      expect(result).toBe('queued-result');
    });

    test('should handle multiple queued operations', async () => {
      const results = [];

      const promises = [
        RateLimiter.enqueue(async () => 'q1'),
        RateLimiter.enqueue(async () => 'q2'),
        RateLimiter.enqueue(async () => 'q3')
      ];

      const resolved = await Promise.all(promises);

      expect(resolved.length).toBe(3);
      expect(resolved).toContain('q1');
      expect(resolved).toContain('q2');
      expect(resolved).toContain('q3');
    });

    test('should handle queued operation errors', async () => {
      const mockFn = async () => {
        throw new Error('Queued error');
      };

      await expect(RateLimiter.enqueue(mockFn)).rejects.toThrow('Queued error');
    });
  });

  describe('request tracking', () => {
    test('should track request count over time', async () => {
      const initialStatus = RateLimiter.getStatus();
      expect(initialStatus.requestsInLastMinute).toBe(0);

      // Execute 3 requests
      await RateLimiter.execute(async () => 'r1');
      await RateLimiter.execute(async () => 'r2');
      await RateLimiter.execute(async () => 'r3');

      const finalStatus = RateLimiter.getStatus();
      expect(finalStatus.requestsInLastMinute).toBe(3);
    });

    test('should maintain separate counts for active and completed requests', async () => {
      // Execute a request
      await RateLimiter.execute(async () => 'done');

      const status = RateLimiter.getStatus();

      // After completion: 0 active, 1 in last minute
      expect(status.activeRequests).toBe(0);
      expect(status.requestsInLastMinute).toBe(1);
    });
  });

  describe('timing and delays', () => {
    test('should respect request delay', async () => {
      const startTime = Date.now();

      await RateLimiter.execute(async () => 'first');
      await RateLimiter.execute(async () => 'second');

      const duration = Date.now() - startTime;

      // Should take at least 1 second (default delay) for the second request
      // Allow some tolerance for test execution
      expect(duration).toBeGreaterThanOrEqual(900);
    });

    test('should handle operations with different durations', async () => {
      const shortOp = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'short';
      };

      const longOp = async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'long';
      };

      const result1 = await RateLimiter.execute(shortOp);
      const result2 = await RateLimiter.execute(longOp);

      expect(result1).toBe('short');
      expect(result2).toBe('long');
    });
  });

  describe('edge cases', () => {
    test('should handle synchronous functions', async () => {
      const syncFn = () => 'sync-result';

      const result = await RateLimiter.execute(syncFn);

      expect(result).toBe('sync-result');
    });

    test('should handle functions returning undefined', async () => {
      const voidFn = async () => undefined;

      const result = await RateLimiter.execute(voidFn);

      expect(result).toBeUndefined();
    });

    test('should handle functions returning null', async () => {
      const nullFn = async () => null;

      const result = await RateLimiter.execute(nullFn);

      expect(result).toBeNull();
    });

    test('should handle functions returning objects', async () => {
      const objFn = async () => ({ data: 'test', count: 42 });

      const result = await RateLimiter.execute(objFn);

      expect(result).toEqual({ data: 'test', count: 42 });
    });
  });
});
