/**
 * Unit tests for Config
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Config', () => {
  let Config;

  beforeEach(async () => {
    // Import Config module
    const ConfigModule = await import('../../../src/utils/Config.js');
    Config = ConfigModule.default;
  });

  describe('configuration loading', () => {
    test('should have default configuration', () => {
      expect(Config).toBeDefined();
      expect(typeof Config.get).toBe('function');
    });

    test('should retrieve configuration values', () => {
      const baseUrl = Config.get('gamma.baseUrl');
      expect(baseUrl).toBeDefined();
      expect(typeof baseUrl).toBe('string');
    });

    test('should handle nested configuration paths', () => {
      const timeout = Config.get('gamma.timeout');
      expect(timeout).toBeDefined();
      expect(typeof timeout).toBe('number');
    });

    test('should return undefined or null for non-existent keys', () => {
      const value = Config.get('nonexistent.key');
      expect(value == null).toBe(true); // undefined or null
    });
  });

  describe('configuration paths', () => {
    test('should support dot notation', () => {
      const value = Config.get('browser.headless');
      expect(typeof value).toBe('boolean');
    });

    test('should retrieve browser configuration', () => {
      const viewport = Config.get('browser.viewport');
      expect(viewport).toBeDefined();
      expect(viewport).toHaveProperty('width');
      expect(viewport).toHaveProperty('height');
    });

    test('should retrieve automation settings', () => {
      const retryAttempts = Config.get('automation.retryAttempts');
      expect(typeof retryAttempts).toBe('number');
      expect(retryAttempts).toBeGreaterThan(0);
    });

    test('should retrieve logging configuration', () => {
      const logLevel = Config.get('logging.level');
      expect(logLevel).toBeDefined();
      expect(typeof logLevel).toBe('string');
    });
  });

  describe('configuration defaults', () => {
    test('should have sensible default timeout', () => {
      const timeout = Config.get('gamma.timeout');
      expect(timeout).toBeGreaterThan(0);
      expect(timeout).toBeLessThanOrEqual(60000);
    });

    test('should have valid retry attempts', () => {
      const retryAttempts = Config.get('automation.retryAttempts');
      expect(retryAttempts).toBeGreaterThanOrEqual(1);
      expect(retryAttempts).toBeLessThanOrEqual(10);
    });

    test('should have valid viewport dimensions', () => {
      const viewport = Config.get('browser.viewport');
      expect(viewport.width).toBeGreaterThan(0);
      expect(viewport.height).toBeGreaterThan(0);
    });
  });
});
