import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment-specific configuration
const ENV = process.env.TEST_ENV || 'dev';
dotenv.config({ path: `./environments/${ENV}.env` });

/**
 * Playwright Configuration
 * Based on best practices from 50+ analyzed repositories
 *
 * Features:
 * - Multi-environment support (dev, qa, staging, prod)
 * - Multi-browser testing (Chrome, Firefox, WebKit, Edge, Mobile)
 * - Comprehensive reporting (HTML, Allure, JSON)
 * - Artifact collection (screenshots, videos, traces)
 * - CI/CD optimized settings
 */
export default defineConfig({
  // Test directory
  testDir: './tests',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],

  // Timeouts
  timeout: 60 * 1000, // 60 seconds per test
  expect: {
    timeout: 10 * 1000, // 10 seconds for assertions
  },

  // Execution
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Fail on test.only in CI
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI
  workers: process.env.CI ? 1 : undefined, // Parallel workers

  // Reporters
  reporter: [
    ['list'], // Console output
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['json', {
      outputFile: 'test-results/results.json'
    }],
    ['junit', {
      outputFile: 'test-results/junit.xml'
    }],
    // Uncomment for Allure
    // ['allure-playwright'],
  ],

  // Global settings for all projects
  use: {
    // Base URL from environment
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    // Browser settings
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,

    // Action settings
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // Browser projects
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    // Mobile devices
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },

    // API testing project (no browser)
    {
      name: 'api',
      use: {
        baseURL: process.env.API_URL || 'http://localhost:3000/api',
      },
      testMatch: '**/api/**/*.spec.ts',
    },
  ],

  // Output directories
  outputDir: 'test-results',

  // Web server (optional - start app before tests)
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },

  // Global setup/teardown
  // globalSetup: './global-setup.ts',
  // globalTeardown: './global-teardown.ts',
});
