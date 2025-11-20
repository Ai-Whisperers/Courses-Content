/**
 * Example: Well-structured Playwright E2E tests
 *
 * This file demonstrates best practices for AI-generated E2E tests:
 * - Page Object Model
 * - Data-testid selectors
 * - Clear test organization
 * - Proper assertions
 * - Visual regression testing
 * - Test isolation
 */

import { test, expect, Page } from '@playwright/test';

// ============================================
// PAGE OBJECTS
// ============================================

/**
 * Page Object for the Login page
 * Encapsulates selectors and actions for login functionality
 */
class LoginPage {
  private page: Page;

  // Selectors using data-testid (most reliable)
  private selectors = {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]',
    errorMessage: '[data-testid="error-message"]',
    forgotPasswordLink: '[data-testid="forgot-password-link"]',
    rememberMeCheckbox: '[data-testid="remember-me-checkbox"]',
    loadingSpinner: '[data-testid="loading-spinner"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  // Navigation
  async goto() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  // Actions
  async fillEmail(email: string) {
    await this.page.fill(this.selectors.emailInput, email);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.selectors.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.selectors.loginButton);
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async clickForgotPassword() {
    await this.page.click(this.selectors.forgotPasswordLink);
  }

  async toggleRememberMe() {
    await this.page.click(this.selectors.rememberMeCheckbox);
  }

  // Assertions
  async expectErrorMessage(message: string) {
    const errorElement = this.page.locator(this.selectors.errorMessage);
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText(message);
  }

  async expectNoErrorMessage() {
    const errorElement = this.page.locator(this.selectors.errorMessage);
    await expect(errorElement).not.toBeVisible();
  }

  async expectLoginButtonDisabled() {
    const button = this.page.locator(this.selectors.loginButton);
    await expect(button).toBeDisabled();
  }

  async expectLoginButtonEnabled() {
    const button = this.page.locator(this.selectors.loginButton);
    await expect(button).toBeEnabled();
  }

  async expectLoadingState() {
    const spinner = this.page.locator(this.selectors.loadingSpinner);
    await expect(spinner).toBeVisible();
  }

  // Getters for custom assertions
  getEmailInput() {
    return this.page.locator(this.selectors.emailInput);
  }

  getPasswordInput() {
    return this.page.locator(this.selectors.passwordInput);
  }
}

/**
 * Page Object for the Dashboard page
 * Used to verify successful login
 */
class DashboardPage {
  private page: Page;

  private selectors = {
    welcomeMessage: '[data-testid="welcome-message"]',
    userMenu: '[data-testid="user-menu"]',
    logoutButton: '[data-testid="logout-button"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async expectToBeVisible() {
    await expect(this.page).toHaveURL(/\/dashboard/);
    await expect(this.page.locator(this.selectors.welcomeMessage)).toBeVisible();
  }

  async expectWelcomeMessage(name: string) {
    const message = this.page.locator(this.selectors.welcomeMessage);
    await expect(message).toContainText(name);
  }

  async logout() {
    await this.page.click(this.selectors.userMenu);
    await this.page.click(this.selectors.logoutButton);
  }
}

// ============================================
// TEST DATA
// ============================================

const testUsers = {
  valid: {
    email: 'test@example.com',
    password: 'ValidPass123!',
    name: 'Test User'
  },
  invalid: {
    email: 'wrong@example.com',
    password: 'WrongPassword'
  }
};

// ============================================
// TESTS
// ============================================

test.describe('Login Page', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  // ==========================================
  // Visual and Layout Tests
  // ==========================================
  test.describe('Visual and Layout', () => {
    test('should display login form correctly', async ({ page }) => {
      // Verify all elements are visible
      await expect(loginPage.getEmailInput()).toBeVisible();
      await expect(loginPage.getPasswordInput()).toBeVisible();
      await loginPage.expectLoginButtonEnabled();
      await loginPage.expectNoErrorMessage();
    });

    test('should match visual snapshot', async ({ page }) => {
      // Visual regression test
      await expect(page).toHaveScreenshot('login-page.png', {
        maxDiffPixels: 100
      });
    });

    test('should have correct placeholder text', async ({ page }) => {
      await expect(loginPage.getEmailInput()).toHaveAttribute(
        'placeholder',
        'Enter your email'
      );
      await expect(loginPage.getPasswordInput()).toHaveAttribute(
        'placeholder',
        'Enter your password'
      );
    });
  });

  // ==========================================
  // Successful Login Tests
  // ==========================================
  test.describe('Successful Login', () => {
    test('should login with valid credentials and redirect to dashboard', async () => {
      // Arrange
      const { email, password, name } = testUsers.valid;

      // Act
      await loginPage.login(email, password);

      // Assert
      await dashboardPage.expectToBeVisible();
      await dashboardPage.expectWelcomeMessage(name);
    });

    test('should remember login when remember me is checked', async ({ page, context }) => {
      // Arrange
      const { email, password } = testUsers.valid;

      // Act
      await loginPage.toggleRememberMe();
      await loginPage.login(email, password);
      await dashboardPage.expectToBeVisible();

      // Close and reopen browser
      const cookies = await context.cookies();
      const newPage = await context.newPage();
      await newPage.goto('/dashboard');

      // Assert - should still be logged in
      const newDashboard = new DashboardPage(newPage);
      await newDashboard.expectToBeVisible();
    });

    test('should show loading state during login', async ({ page }) => {
      // Arrange
      const { email, password } = testUsers.valid;

      // Act
      await loginPage.fillEmail(email);
      await loginPage.fillPassword(password);
      await loginPage.clickLogin();

      // Assert - loading state appears briefly
      await loginPage.expectLoadingState();

      // Then redirects to dashboard
      await dashboardPage.expectToBeVisible();
    });
  });

  // ==========================================
  // Failed Login Tests
  // ==========================================
  test.describe('Failed Login', () => {
    test('should show error for invalid credentials', async () => {
      // Arrange
      const { email, password } = testUsers.invalid;

      // Act
      await loginPage.login(email, password);

      // Assert
      await loginPage.expectErrorMessage('Invalid email or password');
    });

    test('should show error for empty email', async () => {
      // Act
      await loginPage.fillPassword('somepassword');
      await loginPage.clickLogin();

      // Assert
      await loginPage.expectErrorMessage('Email is required');
    });

    test('should show error for empty password', async () => {
      // Act
      await loginPage.fillEmail('test@example.com');
      await loginPage.clickLogin();

      // Assert
      await loginPage.expectErrorMessage('Password is required');
    });

    test('should show error for invalid email format', async () => {
      // Arrange
      const invalidEmails = [
        'notanemail',
        'missing@domain',
        '@nodomain.com'
      ];

      for (const email of invalidEmails) {
        // Act
        await loginPage.goto(); // Reset form
        await loginPage.fillEmail(email);
        await loginPage.fillPassword('somepassword');
        await loginPage.clickLogin();

        // Assert
        await loginPage.expectErrorMessage('Please enter a valid email address');
      }
    });

    test('should clear error when user starts typing', async ({ page }) => {
      // Arrange - trigger an error
      await loginPage.login('wrong@example.com', 'wrongpass');
      await loginPage.expectErrorMessage('Invalid email or password');

      // Act - start typing
      await loginPage.fillEmail('new');

      // Assert - error should be cleared
      await loginPage.expectNoErrorMessage();
    });
  });

  // ==========================================
  // Account Security Tests
  // ==========================================
  test.describe('Account Security', () => {
    test('should lock account after 5 failed attempts', async () => {
      // Arrange
      const { email, password } = testUsers.invalid;

      // Act - attempt login 5 times
      for (let i = 0; i < 5; i++) {
        await loginPage.login(email, password);
        if (i < 4) {
          await loginPage.goto(); // Reset for next attempt
        }
      }

      // Assert
      await loginPage.expectErrorMessage(
        'Account locked. Please try again in 15 minutes.'
      );
    });

    test('should mask password input', async () => {
      // Assert
      await expect(loginPage.getPasswordInput()).toHaveAttribute('type', 'password');
    });
  });

  // ==========================================
  // Navigation Tests
  // ==========================================
  test.describe('Navigation', () => {
    test('should navigate to forgot password page', async ({ page }) => {
      // Act
      await loginPage.clickForgotPassword();

      // Assert
      await expect(page).toHaveURL(/\/forgot-password/);
    });

    test('should redirect to originally requested page after login', async ({ page }) => {
      // Arrange - try to access protected page
      await page.goto('/settings');

      // Should redirect to login
      await expect(page).toHaveURL(/\/login\?redirect=/);

      // Act - login
      await loginPage.login(testUsers.valid.email, testUsers.valid.password);

      // Assert - should redirect to originally requested page
      await expect(page).toHaveURL(/\/settings/);
    });
  });

  // ==========================================
  // Accessibility Tests
  // ==========================================
  test.describe('Accessibility', () => {
    test('should have proper labels for form fields', async () => {
      // Assert
      await expect(loginPage.getEmailInput()).toHaveAttribute('aria-label');
      await expect(loginPage.getPasswordInput()).toHaveAttribute('aria-label');
    });

    test('should focus email input on page load', async () => {
      // Assert
      await expect(loginPage.getEmailInput()).toBeFocused();
    });

    test('should navigate form with Tab key', async ({ page }) => {
      // Act & Assert
      await page.keyboard.press('Tab');
      await expect(loginPage.getPasswordInput()).toBeFocused();

      await page.keyboard.press('Tab');
      // Should focus remember me checkbox, then login button
    });

    test('should submit form with Enter key', async ({ page }) => {
      // Arrange
      await loginPage.fillEmail(testUsers.valid.email);
      await loginPage.fillPassword(testUsers.valid.password);

      // Act
      await page.keyboard.press('Enter');

      // Assert
      await dashboardPage.expectToBeVisible();
    });
  });
});

// ============================================
// ADDITIONAL TEST UTILITIES
// ============================================

/**
 * Custom test fixture for authenticated user
 * Use when testing pages that require authentication
 */
test.describe('Authenticated User Tests', () => {
  test.use({
    storageState: 'playwright/.auth/user.json'
  });

  test('should access protected pages when authenticated', async ({ page }) => {
    // This test runs with pre-authenticated state
    await page.goto('/dashboard');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.expectToBeVisible();
  });
});
