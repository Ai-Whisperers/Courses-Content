/**
 * General test helper utilities
 */

import { jest } from '@jest/globals';

/**
 * Wait for a condition to be true
 */
export async function waitForCondition(condition, timeout = 5000, interval = 100) {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return true;
    }
    await sleep(interval);
  }

  throw new Error('Condition not met within timeout');
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Mock a timer and advance it
 */
export function setupTimers() {
  jest.useFakeTimers();
}

export function teardownTimers() {
  jest.useRealTimers();
}

export function advanceTimers(ms) {
  jest.advanceTimersByTime(ms);
}

/**
 * Create a spy on a module
 */
export function spyOnModule(module, method) {
  return jest.spyOn(module, method);
}

/**
 * Capture console output
 */
export function captureConsole() {
  const original = { ...console };
  const captured = {
    log: [],
    info: [],
    warn: [],
    error: []
  };

  console.log = jest.fn((...args) => captured.log.push(args));
  console.info = jest.fn((...args) => captured.info.push(args));
  console.warn = jest.fn((...args) => captured.warn.push(args));
  console.error = jest.fn((...args) => captured.error.push(args));

  return {
    captured,
    restore: () => {
      Object.assign(console, original);
    }
  };
}

/**
 * Create a temporary directory for tests
 */
export async function createTempDir(prefix = 'test') {
  const fs = await import('fs/promises');
  const path = await import('path');
  const os = await import('os');

  const tempDir = path.join(os.tmpdir(), `${prefix}-${Date.now()}`);
  await fs.mkdir(tempDir, { recursive: true });

  return {
    path: tempDir,
    cleanup: async () => {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  };
}

/**
 * Mock environment variables
 */
export function mockEnv(envVars) {
  const original = { ...process.env };

  Object.assign(process.env, envVars);

  return {
    restore: () => {
      process.env = original;
    }
  };
}

/**
 * Create a mock response for network requests
 */
export function mockResponse(data, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: jest.fn().mockResolvedValue(data),
    text: jest.fn().mockResolvedValue(JSON.stringify(data)),
    headers: new Map()
  };
}

/**
 * Run multiple tests with different parameters
 */
export function testMatrix(testFn, matrix) {
  matrix.forEach(params => {
    const description = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ');

    test(description, () => testFn(params));
  });
}

/**
 * Suppress specific errors in tests
 */
export function suppressErrors(patterns) {
  const originalError = console.error;

  beforeAll(() => {
    console.error = jest.fn((...args) => {
      const message = args.join(' ');
      const shouldSuppress = patterns.some(pattern =>
        pattern instanceof RegExp ? pattern.test(message) : message.includes(pattern)
      );

      if (!shouldSuppress) {
        originalError(...args);
      }
    });
  });

  afterAll(() => {
    console.error = originalError;
  });
}

/**
 * Measure execution time
 */
export async function measureTime(fn) {
  const start = Date.now();
  const result = await fn();
  const duration = Date.now() - start;

  return { result, duration };
}

/**
 * Retry a function multiple times
 */
export async function retry(fn, attempts = 3, delay = 1000) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await sleep(delay);
    }
  }
}

/**
 * Create a mock file system
 */
export function mockFs() {
  const files = new Map();

  return {
    writeFile: jest.fn((path, content) => {
      files.set(path, content);
      return Promise.resolve();
    }),
    readFile: jest.fn((path) => {
      if (files.has(path)) {
        return Promise.resolve(files.get(path));
      }
      return Promise.reject(new Error('File not found'));
    }),
    exists: jest.fn((path) => {
      return Promise.resolve(files.has(path));
    }),
    mkdir: jest.fn(() => Promise.resolve()),
    rm: jest.fn((path) => {
      files.delete(path);
      return Promise.resolve();
    }),
    files
  };
}

/**
 * Generate random test data
 */
export function generateTestData(type, count = 1) {
  const generators = {
    string: () => `test-${Math.random().toString(36).substring(7)}`,
    number: () => Math.floor(Math.random() * 1000),
    email: () => `test${Math.random().toString(36).substring(7)}@example.com`,
    url: () => `https://example.com/${Math.random().toString(36).substring(7)}`,
    date: () => new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    boolean: () => Math.random() > 0.5
  };

  const generator = generators[type];
  if (!generator) {
    throw new Error(`Unknown generator type: ${type}`);
  }

  return count === 1 ? generator() : Array.from({ length: count }, generator);
}

/**
 * Deep clone an object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Compare objects deeply
 */
export function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Create a deferred promise
 */
export function createDeferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

/**
 * Mock Date.now
 */
export function mockDateNow(timestamp) {
  const original = Date.now;
  Date.now = jest.fn(() => timestamp);

  return {
    restore: () => {
      Date.now = original;
    }
  };
}

/**
 * Check if running in CI environment
 */
export function isCI() {
  return process.env.CI === 'true' || process.env.CONTINUOUS_INTEGRATION === 'true';
}

/**
 * Skip test if condition is true
 */
export function skipIf(condition, message) {
  return condition ? test.skip : test;
}

/**
 * Run test only if condition is true
 */
export function onlyIf(condition, message) {
  return condition ? test.only : test.skip;
}
