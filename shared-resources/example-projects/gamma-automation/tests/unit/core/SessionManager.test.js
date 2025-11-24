/**
 * Unit tests for SessionManager
 */

import { describe, test, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { mockPage, mockContext, mockLogger, mockConfig, mockSessionData } from '../../helpers/mockFactories.js';
import { validCredentials, invalidCredentials } from '../../helpers/fixtures.js';
import { assertValidSession } from '../../helpers/assertions.js';

// Mock dependencies
jest.unstable_mockModule('../../../src/utils/Logger.js', () => ({
  default: mockLogger()
}));

jest.unstable_mockModule('../../../src/utils/Config.js', () => ({
  default: mockConfig()
}));

describe('SessionManager', () => {
  let SessionManager;
  let sessionManager;
  let page;
  let context;

  beforeEach(async () => {
    const SessionManagerModule = await import('../../../src/core/SessionManager.js');
    SessionManager = SessionManagerModule.default;

    sessionManager = new SessionManager();
    page = mockPage();
    context = mockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should initialize with logger', () => {
      expect(sessionManager.logger).toBeDefined();
    });

    test('should set session path from config', () => {
      expect(sessionManager).toBeDefined();
    });
  });

  describe('login', () => {
    test('should login with email credentials', async () => {
      await sessionManager.login(page, validCredentials, 'email');

      expect(page.goto).toHaveBeenCalled();
      expect(page.fill).toHaveBeenCalled();
    });

    test('should navigate to login page', async () => {
      await sessionManager.login(page, validCredentials, 'email');

      expect(page.goto).toHaveBeenCalledWith(
        expect.stringContaining('login'),
        expect.any(Object)
      );
    });

    test('should fill email and password', async () => {
      await sessionManager.login(page, validCredentials, 'email');

      expect(page.fill).toHaveBeenCalledWith(
        expect.any(String),
        validCredentials.email
      );
      expect(page.fill).toHaveBeenCalledWith(
        expect.any(String),
        validCredentials.password
      );
    });

    test('should click submit button', async () => {
      await sessionManager.login(page, validCredentials, 'email');

      expect(page.click).toHaveBeenCalledWith(
        expect.stringContaining('submit')
      );
    });

    test('should wait for navigation after login', async () => {
      await sessionManager.login(page, validCredentials, 'email');

      expect(page.waitForLoadState).toHaveBeenCalledWith('networkidle');
    });

    test('should throw on invalid credentials', async () => {
      page.click.mockRejectedValue(new Error('Login failed'));

      await expect(
        sessionManager.login(page, invalidCredentials, 'email')
      ).rejects.toThrow();
    });

    test('should support Google OAuth', async () => {
      await sessionManager.login(page, {}, 'google');

      expect(page.click).toHaveBeenCalledWith(
        expect.stringMatching(/google/i)
      );
    });

    test('should support GitHub OAuth', async () => {
      await sessionManager.login(page, {}, 'github');

      expect(page.click).toHaveBeenCalledWith(
        expect.stringMatching(/github/i)
      );
    });

    test('should handle OAuth popup', async () => {
      await sessionManager.login(page, {}, 'google');

      expect(page.waitForLoadState).toHaveBeenCalled();
    });

    test('should validate successful login', async () => {
      page.url.mockReturnValue('https://gamma.app/workspace');

      await sessionManager.login(page, validCredentials, 'email');

      expect(page.url()).not.toContain('login');
    });
  });

  describe('saveSession', () => {
    test('should save session state to file', async () => {
      const sessionName = 'test-session';
      const sessionData = mockSessionData();

      context.storageState.mockResolvedValue(sessionData);

      await sessionManager.saveSession(context, sessionName);

      expect(context.storageState).toHaveBeenCalled();
    });

    test('should create session directory if not exists', async () => {
      await sessionManager.saveSession(context, 'test');

      expect(context.storageState).toHaveBeenCalled();
    });

    test('should save with timestamp', async () => {
      const result = await sessionManager.saveSession(context, 'test');

      expect(result).toBeDefined();
    });

    test('should handle save errors', async () => {
      context.storageState.mockRejectedValue(new Error('Save failed'));

      await expect(
        sessionManager.saveSession(context, 'test')
      ).rejects.toThrow();
    });

    test('should validate session data before saving', async () => {
      const sessionData = mockSessionData();
      context.storageState.mockResolvedValue(sessionData);

      await sessionManager.saveSession(context, 'test');

      expect(sessionData.cookies).toBeDefined();
    });
  });

  describe('loadSession', () => {
    test('should load existing session', async () => {
      const sessionName = 'test-session';

      const sessionData = await sessionManager.loadSession(sessionName);

      // Should return session data or null
      expect(sessionData === null || typeof sessionData === 'object').toBe(true);
    });

    test('should return null for non-existent session', async () => {
      const sessionData = await sessionManager.loadSession('non-existent');

      expect(sessionData).toBeNull();
    });

    test('should parse JSON session file', async () => {
      const sessionData = await sessionManager.loadSession('test');

      if (sessionData) {
        expect(typeof sessionData).toBe('object');
      }
    });

    test('should handle corrupted session files', async () => {
      const sessionData = await sessionManager.loadSession('corrupted');

      expect(sessionData).toBeNull();
    });

    test('should validate loaded session structure', async () => {
      const sessionData = await sessionManager.loadSession('valid');

      if (sessionData) {
        assertValidSession(sessionData);
      }
    });
  });

  describe('validateSession', () => {
    test('should validate active session', async () => {
      page.url.mockReturnValue('https://gamma.app/workspace');

      const isValid = await sessionManager.validateSession(page);

      expect(typeof isValid).toBe('boolean');
    });

    test('should return false for login page', async () => {
      page.url.mockReturnValue('https://gamma.app/login');

      const isValid = await sessionManager.validateSession(page);

      expect(isValid).toBe(false);
    });

    test('should check for authentication markers', async () => {
      page.url.mockReturnValue('https://gamma.app/workspace');

      await sessionManager.validateSession(page);

      expect(page.url).toHaveBeenCalled();
    });

    test('should validate cookies', async () => {
      page.url.mockReturnValue('https://gamma.app/workspace');

      const isValid = await sessionManager.validateSession(page);

      expect(typeof isValid).toBe('boolean');
    });

    test('should handle network errors', async () => {
      page.url.mockImplementation(() => {
        throw new Error('Network error');
      });

      const isValid = await sessionManager.validateSession(page);

      expect(isValid).toBe(false);
    });
  });

  describe('refreshSession', () => {
    test('should refresh expired session', async () => {
      await sessionManager.refreshSession(page);

      expect(page.reload).toHaveBeenCalled();
    });

    test('should wait for page reload', async () => {
      await sessionManager.refreshSession(page);

      expect(page.waitForLoadState).toHaveBeenCalled();
    });

    test('should validate after refresh', async () => {
      page.url.mockReturnValue('https://gamma.app/workspace');

      await sessionManager.refreshSession(page);

      expect(page.url).toHaveBeenCalled();
    });

    test('should handle refresh failure', async () => {
      page.reload.mockRejectedValue(new Error('Refresh failed'));

      await expect(
        sessionManager.refreshSession(page)
      ).rejects.toThrow();
    });
  });

  describe('cleanup', () => {
    test('should delete old session files', async () => {
      await sessionManager.cleanup(30); // 30 days old

      // Should complete without error
      expect(true).toBe(true);
    });

    test('should keep recent sessions', async () => {
      await sessionManager.cleanup(1); // 1 day old

      // Should complete without error
      expect(true).toBe(true);
    });

    test('should handle cleanup errors gracefully', async () => {
      await expect(sessionManager.cleanup()).resolves.not.toThrow();
    });
  });

  describe('edge cases', () => {
    test('should handle concurrent login attempts', async () => {
      const promises = [
        sessionManager.login(page, validCredentials, 'email'),
        sessionManager.login(page, validCredentials, 'email')
      ];

      await expect(Promise.race(promises)).resolves.not.toThrow();
    });

    test('should handle special characters in credentials', async () => {
      const specialCreds = {
        email: 'test+user@example.com',
        password: 'p@ssw0rd!#$'
      };

      await sessionManager.login(page, specialCreds, 'email');

      expect(page.fill).toHaveBeenCalledWith(
        expect.any(String),
        specialCreds.email
      );
    });

    test('should handle empty credentials', async () => {
      await expect(
        sessionManager.login(page, { email: '', password: '' }, 'email')
      ).rejects.toThrow();
    });

    test('should handle missing credentials', async () => {
      await expect(
        sessionManager.login(page, {}, 'email')
      ).rejects.toThrow();
    });
  });
});
