/**
 * Jest setup file
 * Runs before each test file
 */

import { jest } from '@jest/globals';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise in tests

// Global test timeout
jest.setTimeout(30000);

// Mock console methods for cleaner test output (optional)
global.console = {
  ...console,
  // Uncomment to suppress logs during tests
  // log: jest.fn(),
  // info: jest.fn(),
  // debug: jest.fn(),
  warn: console.warn,
  error: console.error,
};

// Custom matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },

  toBeValidUrl(received) {
    try {
      new URL(received);
      return {
        message: () => `expected ${received} not to be a valid URL`,
        pass: true,
      };
    } catch {
      return {
        message: () => `expected ${received} to be a valid URL`,
        pass: false,
      };
    }
  },

  toHaveSlides(received, count) {
    const pass = Array.isArray(received.slides) && received.slides.length === count;
    if (pass) {
      return {
        message: () =>
          `expected presentation not to have ${count} slides`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected presentation to have ${count} slides but has ${received.slides?.length || 0}`,
        pass: false,
      };
    }
  }
});

// Global teardown for each test
afterEach(() => {
  // Clear all mocks
  jest.clearAllMocks();
});
