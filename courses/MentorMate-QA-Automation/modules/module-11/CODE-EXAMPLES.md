# Module 11: Advanced Testing Strategies
## Code Examples

---

## Example 1: Complete Visual Test Suite

```typescript
// tests/visual/visual.config.ts
export const visualConfig = {
  // Threshold for pixel differences
  maxDiffPixels: 100,

  // Percentage threshold
  threshold: 0.2,

  // Animation settings
  animations: 'disabled',

  // Mask selectors for dynamic content
  dynamicSelectors: [
    '.timestamp',
    '.ad-banner',
    '.user-avatar',
    '[data-dynamic]',
  ],
};

// tests/visual/pages.visual.spec.ts
import { test, expect } from '@playwright/test';
import { visualConfig } from './visual.config';

test.describe('Visual Regression Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Disable animations for consistent screenshots
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `,
    });
  });

  test('homepage visual test', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: visualConfig.maxDiffPixels,
      mask: visualConfig.dynamicSelectors.map(s => page.locator(s)),
    });
  });

  test('login page visual test', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveScreenshot('login.png', {
      maxDiffPixels: visualConfig.maxDiffPixels,
    });
  });

  test('product list visual test', async ({ page }) => {
    await page.goto('/products');
    await page.waitForSelector('.product-card');

    // Screenshot specific component
    const productGrid = page.locator('.product-grid');
    await expect(productGrid).toHaveScreenshot('product-grid.png');
  });

  test('responsive visual test', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
    });
  });
});
```

---

## Example 2: Comprehensive Accessibility Testing

```typescript
// tests/a11y/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Custom matcher for better error messages
const expectNoViolations = (results: any) => {
  if (results.violations.length > 0) {
    const violationMessages = results.violations.map((v: any) => {
      return `${v.id}: ${v.description}\n` +
        `Impact: ${v.impact}\n` +
        `Elements: ${v.nodes.map((n: any) => n.html).join(', ')}`;
    }).join('\n\n');

    throw new Error(`Accessibility violations found:\n\n${violationMessages}`);
  }
};

test.describe('Accessibility Tests', () => {
  const pages = [
    { name: 'Homepage', url: '/' },
    { name: 'Login', url: '/login' },
    { name: 'Products', url: '/products' },
    { name: 'Contact', url: '/contact' },
  ];

  for (const pageInfo of pages) {
    test(`${pageInfo.name} should be accessible`, async ({ page }) => {
      await page.goto(pageInfo.url);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      expectNoViolations(results);
    });
  }

  test('form should have proper labels', async ({ page }) => {
    await page.goto('/login');

    // All inputs should have labels
    const inputs = await page.locator('input').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Input should have id and label, or aria-label
      const hasLabel = id && await page.locator(`label[for="${id}"]`).count() > 0;
      const hasAriaLabel = ariaLabel || ariaLabelledBy;

      expect(hasLabel || hasAriaLabel).toBeTruthy();
    }
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // Image should have alt text or role="presentation"
      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });

  test('focus should be visible', async ({ page }) => {
    await page.goto('/login');

    // Tab through focusable elements
    const focusableElements = page.locator(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const count = await focusableElements.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      await page.keyboard.press('Tab');

      // Get focused element
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;

        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          boxShadow: styles.boxShadow,
        };
      });

      // Should have visible focus indicator
      expect(
        focused?.outline !== 'none' ||
        focused?.boxShadow !== 'none'
      ).toBeTruthy();
    }
  });
});
```

---

## Example 3: Security Test Patterns

```typescript
// tests/security/security.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test.describe('Authentication Security', () => {
    test('should not expose sensitive data in URL', async ({ page }) => {
      await page.goto('/login');
      await page.fill('[data-testid="email"]', 'user@example.com');
      await page.fill('[data-testid="password"]', 'password123');
      await page.click('[data-testid="submit"]');

      // Password should never appear in URL
      expect(page.url()).not.toContain('password');
    });

    test('should clear password field on error', async ({ page }) => {
      await page.goto('/login');
      await page.fill('[data-testid="email"]', 'user@example.com');
      await page.fill('[data-testid="password"]', 'wrongpassword');
      await page.click('[data-testid="submit"]');

      await page.waitForSelector('.error-message');

      // Password field should be cleared
      const passwordValue = await page.inputValue('[data-testid="password"]');
      expect(passwordValue).toBe('');
    });

    test('should implement rate limiting', async ({ page }) => {
      await page.goto('/login');

      // Attempt multiple failed logins
      for (let i = 0; i < 5; i++) {
        await page.fill('[data-testid="email"]', 'user@example.com');
        await page.fill('[data-testid="password"]', 'wrong');
        await page.click('[data-testid="submit"]');
        await page.waitForTimeout(100);
      }

      // Should show rate limit message
      await expect(page.locator('.rate-limit-message')).toBeVisible();
    });

    test('should expire sessions after timeout', async ({ page, context }) => {
      // Login
      await page.goto('/login');
      await page.fill('[data-testid="email"]', 'user@example.com');
      await page.fill('[data-testid="password"]', 'password123');
      await page.click('[data-testid="submit"]');

      // Clear cookies to simulate session expiry
      await context.clearCookies();

      // Try to access protected page
      await page.goto('/dashboard');

      // Should redirect to login
      await expect(page).toHaveURL(/login/);
    });
  });

  test.describe('Input Validation', () => {
    test('should sanitize XSS attempts', async ({ page }) => {
      await page.goto('/search');

      const xssPayload = '<script>alert("XSS")</script>';
      await page.fill('[data-testid="search"]', xssPayload);
      await page.click('[data-testid="search-btn"]');

      // Script should not execute
      const alertTriggered = await page.evaluate(() => {
        return (window as any).xssTriggered || false;
      });
      expect(alertTriggered).toBeFalsy();

      // Content should be escaped
      const content = await page.content();
      expect(content).not.toContain('<script>alert');
    });

    test('should handle SQL injection attempts', async ({ request }) => {
      const response = await request.post('/api/search', {
        data: { query: "'; DROP TABLE users; --" },
      });

      // Should return 400 Bad Request
      expect(response.status()).toBe(400);
    });
  });

  test.describe('API Security', () => {
    test('should require authentication', async ({ request }) => {
      const response = await request.get('/api/user/profile');
      expect(response.status()).toBe(401);
    });

    test('should validate authorization', async ({ request }) => {
      // Get regular user token
      const loginResponse = await request.post('/api/login', {
        data: { email: 'user@example.com', password: 'password' },
      });
      const { token } = await loginResponse.json();

      // Try to access admin endpoint
      const response = await request.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(response.status()).toBe(403);
    });

    test('should not expose internal errors', async ({ request }) => {
      const response = await request.get('/api/user/999999999');

      // Should return generic error, not stack trace
      const body = await response.text();
      expect(body).not.toContain('stack');
      expect(body).not.toContain('at ');
    });
  });
});
```

---

## Example 4: Test Data Factory with Faker

```typescript
// utils/factories.ts
import { faker } from '@faker-js/faker';

// Types
interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

interface Product {
  name: string;
  price: number;
  description: string;
  category: string;
  sku: string;
  quantity: number;
}

interface Order {
  userId: string;
  products: Array<{ productId: string; quantity: number }>;
  status: string;
  total: number;
}

// User Factory
export const userFactory = {
  create: (overrides: Partial<User> = {}): User => ({
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number('###-###-####'),
    role: 'user',
    ...overrides,
  }),

  createAdmin: (): User => userFactory.create({ role: 'admin' }),

  createBatch: (count: number): User[] => {
    return Array.from({ length: count }, () => userFactory.create());
  },

  // Edge cases
  createWithLongName: (): User => userFactory.create({
    firstName: faker.lorem.words(20),
    lastName: faker.lorem.words(20),
  }),

  createWithSpecialChars: (): User => userFactory.create({
    firstName: "O'Brien-Müller",
    lastName: 'García',
    email: 'special+test@example.com',
  }),

  createWithEmoji: (): User => userFactory.create({
    firstName: 'Test 😀',
    lastName: 'User 🎉',
  }),
};

// Product Factory
export const productFactory = {
  create: (overrides: Partial<Product> = {}): Product => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    quantity: faker.number.int({ min: 1, max: 100 }),
    ...overrides,
  }),

  createOutOfStock: (): Product => productFactory.create({ quantity: 0 }),

  createExpensive: (): Product => productFactory.create({
    price: faker.number.float({ min: 10000, max: 100000, fractionDigits: 2 }),
  }),

  createBatch: (count: number): Product[] => {
    return Array.from({ length: count }, () => productFactory.create());
  },
};

// Order Factory
export const orderFactory = {
  create: (overrides: Partial<Order> = {}): Order => ({
    userId: faker.string.uuid(),
    products: [
      {
        productId: faker.string.uuid(),
        quantity: faker.number.int({ min: 1, max: 5 }),
      },
    ],
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
    total: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
    ...overrides,
  }),

  createPending: (): Order => orderFactory.create({ status: 'pending' }),
  createShipped: (): Order => orderFactory.create({ status: 'shipped' }),
};

// Address Factory
export const addressFactory = {
  create: () => ({
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    country: 'USA',
  }),

  createInternational: () => ({
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
  }),
};
```

---

## Example 5: Parallel Execution Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Parallel execution settings
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined, // 4 workers in CI, auto-detect locally

  // Retry settings
  retries: process.env.CI ? 2 : 0,

  // Timeout settings
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  // Reporter configuration
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results/junit.xml' }],
    process.env.CI ? ['github'] : ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Sharding for distributed execution
  // Run with: npx playwright test --shard=1/4
  // This divides tests into 4 shards

  projects: [
    // Setup project runs first
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Main test projects
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
  ],
});

// Example GitHub Actions workflow for parallel execution
/*
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shard }}/4
*/
```

---

## Example 6: Environment Configuration

```typescript
// config/environments.ts
export const environments = {
  local: {
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3001/api',
    timeout: 30000,
  },
  staging: {
    baseURL: 'https://staging.example.com',
    apiURL: 'https://api-staging.example.com',
    timeout: 60000,
  },
  production: {
    baseURL: 'https://example.com',
    apiURL: 'https://api.example.com',
    timeout: 60000,
  },
};

// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { environments } from './config/environments';

const env = process.env.TEST_ENV || 'local';
const config = environments[env as keyof typeof environments];

export default defineConfig({
  use: {
    baseURL: config.baseURL,
    extraHTTPHeaders: {
      'X-Test-Environment': env,
    },
  },
  timeout: config.timeout,

  // Environment-specific projects
  projects: [
    {
      name: `${env}-chromium`,
      use: {
        browserName: 'chromium',
        ...config,
      },
    },
  ],
});

// Usage:
// TEST_ENV=staging npx playwright test
// TEST_ENV=production npx playwright test
```

---

## Example 7: Allure Report Integration

```typescript
// tests/with-allure.spec.ts
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('E-commerce Checkout', () => {
  test('complete purchase flow @smoke @critical', async ({ page }) => {
    // Allure metadata
    await allure.epic('E-commerce');
    await allure.feature('Checkout');
    await allure.story('Complete Purchase');
    await allure.severity('critical');
    await allure.owner('QA Team');

    // Step 1: Add product
    await allure.step('Add product to cart', async () => {
      await page.goto('/products');
      await page.click('[data-testid="add-to-cart"]');
      await expect(page.locator('.cart-count')).toHaveText('1');
    });

    // Step 2: Go to cart
    await allure.step('Navigate to cart', async () => {
      await page.click('[data-testid="cart-icon"]');
      await expect(page).toHaveURL('/cart');
    });

    // Step 3: Checkout
    await allure.step('Complete checkout', async () => {
      await page.click('[data-testid="checkout-btn"]');
      await page.fill('[data-testid="card-number"]', '4111111111111111');
      await page.fill('[data-testid="expiry"]', '12/25');
      await page.fill('[data-testid="cvv"]', '123');
      await page.click('[data-testid="pay-btn"]');
    });

    // Step 4: Verify success
    await allure.step('Verify order confirmation', async () => {
      await expect(page.locator('.order-confirmation')).toBeVisible();
      await expect(page.locator('.order-number')).toBeVisible();
    });

    // Attach screenshot
    const screenshot = await page.screenshot();
    await allure.attachment('Order Confirmation', screenshot, 'image/png');
  });

  test('apply discount code @regression', async ({ page }) => {
    await allure.severity('normal');
    await allure.feature('Discounts');

    await page.goto('/cart');
    await page.fill('[data-testid="discount-code"]', 'SAVE10');
    await page.click('[data-testid="apply-discount"]');

    await expect(page.locator('.discount-applied')).toBeVisible();

    // Attach test data
    await allure.attachment(
      'Discount Code Used',
      'SAVE10',
      'text/plain'
    );
  });
});
```

---

## Example 8: Performance Monitoring

```typescript
// tests/performance/metrics.spec.ts
import { test, expect } from '@playwright/test';

interface PerformanceMetrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
}

test.describe('Performance Metrics', () => {
  test('collect Core Web Vitals', async ({ page }) => {
    // Inject web-vitals library
    await page.addInitScript(() => {
      (window as any).webVitals = {};
    });

    await page.goto('/');

    // Wait for page to be interactive
    await page.waitForLoadState('networkidle');

    // Collect metrics
    const metrics = await page.evaluate((): PerformanceMetrics => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      const fcp = paint.find(p => p.name === 'first-contentful-paint');

      return {
        ttfb: navigation.responseStart - navigation.requestStart,
        fcp: fcp ? fcp.startTime : 0,
        lcp: 0, // Would need PerformanceObserver for real LCP
        cls: 0, // Would need PerformanceObserver for real CLS
        fid: 0, // Would need user interaction for real FID
      };
    });

    console.log('Performance Metrics:', metrics);

    // Assert against thresholds (Google's recommendations)
    expect(metrics.ttfb).toBeLessThan(800); // < 800ms
    expect(metrics.fcp).toBeLessThan(1800); // < 1.8s
  });

  test('measure API response times', async ({ request }) => {
    const endpoints = [
      '/api/products',
      '/api/categories',
      '/api/featured',
    ];

    for (const endpoint of endpoints) {
      const startTime = Date.now();
      const response = await request.get(endpoint);
      const duration = Date.now() - startTime;

      console.log(`${endpoint}: ${duration}ms`);

      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(500); // API should respond in < 500ms
    }
  });

  test('check resource sizes', async ({ page }) => {
    const resources: Array<{ url: string; size: number }> = [];

    page.on('response', async response => {
      const headers = response.headers();
      const size = parseInt(headers['content-length'] || '0');

      if (size > 0) {
        resources.push({
          url: response.url(),
          size,
        });
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for large resources
    const largeResources = resources.filter(r => r.size > 500000); // > 500KB

    if (largeResources.length > 0) {
      console.log('Large resources found:');
      largeResources.forEach(r => {
        console.log(`  ${r.url}: ${(r.size / 1024).toFixed(2)}KB`);
      });
    }

    // Total page weight should be reasonable
    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    console.log(`Total page weight: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

    expect(totalSize).toBeLessThan(5 * 1024 * 1024); // < 5MB
  });
});
```

---

## Example 9: Flaky Test Detection

```typescript
// utils/flaky-detector.ts
import { test as base } from '@playwright/test';

// Custom test that tracks flakiness
export const test = base.extend({
  // Track test attempts
  testAttempt: async ({}, use, testInfo) => {
    const attempt = testInfo.retry + 1;
    console.log(`Test attempt: ${attempt}/${testInfo.project.retries + 1}`);
    await use(attempt);
  },
});

// tests/anti-flaky-patterns.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Anti-Flaky Patterns', () => {
  // BAD: Using arbitrary timeout
  test.skip('flaky: arbitrary wait', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForTimeout(3000); // DON'T DO THIS
    await expect(page.locator('.data')).toBeVisible();
  });

  // GOOD: Wait for specific condition
  test('stable: wait for condition', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for loading to complete
    await expect(page.locator('.loading')).toBeHidden();

    // Then check for data
    await expect(page.locator('.data')).toBeVisible();
  });

  // BAD: Test depends on order
  test.skip('flaky: depends on previous test', async ({ page }) => {
    // Assumes previous test created this user
    await page.goto('/users');
    await expect(page.locator('text=Test User')).toBeVisible();
  });

  // GOOD: Test is independent
  test('stable: creates own data', async ({ page, request }) => {
    // Create test data
    await request.post('/api/users', {
      data: { name: `Test User ${Date.now()}` },
    });

    await page.goto('/users');
    await expect(page.locator('.user-card').first()).toBeVisible();
  });

  // BAD: Race condition
  test.skip('flaky: race condition', async ({ page }) => {
    await page.goto('/form');
    await page.click('.submit');
    // Click might happen before form is ready
    await expect(page.locator('.success')).toBeVisible();
  });

  // GOOD: Verify element is ready
  test('stable: verify ready state', async ({ page }) => {
    await page.goto('/form');

    // Wait for form to be ready
    const submitButton = page.locator('.submit');
    await expect(submitButton).toBeEnabled();

    await submitButton.click();
    await expect(page.locator('.success')).toBeVisible();
  });

  // Network-related flakiness
  test('stable: handle network', async ({ page }) => {
    // Set up response handling before navigation
    const responsePromise = page.waitForResponse('/api/data');

    await page.goto('/dashboard');

    // Wait for specific API response
    const response = await responsePromise;
    expect(response.status()).toBe(200);

    // Now check UI
    await expect(page.locator('.data')).toBeVisible();
  });
});
```

---

## Example 10: CI/CD Integration

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3, 4]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test --shard=${{ matrix.shard }}/4

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report-${{ matrix.shard }}
          path: playwright-report/
          retention-days: 30

      - name: Upload test artifacts
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: test-artifacts-${{ matrix.shard }}
          path: |
            test-results/
            playwright-report/

  merge-reports:
    needs: test
    if: always()
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Download all reports
        uses: actions/download-artifact@v3
        with:
          path: all-reports

      - name: Merge reports
        run: |
          npx playwright merge-reports --reporter html ./all-reports

      - name: Upload merged report
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report-merged
          path: playwright-report/
```

---

## Example 11: Custom Reporter

```typescript
// reporters/custom-reporter.ts
import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  private passed = 0;
  private failed = 0;
  private skipped = 0;
  private startTime = Date.now();

  onTestEnd(test: TestCase, result: TestResult) {
    switch (result.status) {
      case 'passed':
        this.passed++;
        console.log(`✅ ${test.title}`);
        break;
      case 'failed':
        this.failed++;
        console.log(`❌ ${test.title}`);
        if (result.error) {
          console.log(`   Error: ${result.error.message}`);
        }
        break;
      case 'skipped':
        this.skipped++;
        console.log(`⏭️ ${test.title}`);
        break;
    }
  }

  onEnd(result: FullResult) {
    const duration = Date.now() - this.startTime;
    const total = this.passed + this.failed + this.skipped;

    console.log('\n' + '='.repeat(50));
    console.log('Test Results Summary');
    console.log('='.repeat(50));
    console.log(`Total:    ${total}`);
    console.log(`Passed:   ${this.passed} ✅`);
    console.log(`Failed:   ${this.failed} ❌`);
    console.log(`Skipped:  ${this.skipped} ⏭️`);
    console.log(`Duration: ${(duration / 1000).toFixed(2)}s`);
    console.log(`Status:   ${result.status.toUpperCase()}`);
    console.log('='.repeat(50));
  }
}

export default CustomReporter;

// Usage in playwright.config.ts:
// reporter: [['./reporters/custom-reporter.ts']]
```

---

## Example 12: Test Hooks and Fixtures

```typescript
// fixtures/test-fixtures.ts
import { test as base, expect } from '@playwright/test';
import { userFactory } from '../utils/factories';

// Define custom fixtures
type MyFixtures = {
  authenticatedPage: any;
  testUser: any;
  apiClient: any;
};

export const test = base.extend<MyFixtures>({
  // Create test user before each test
  testUser: async ({ request }, use) => {
    const user = userFactory.create();

    // Create user via API
    const response = await request.post('/api/users', {
      data: user,
    });
    const createdUser = await response.json();

    // Use the user in test
    await use(createdUser);

    // Cleanup after test
    await request.delete(`/api/users/${createdUser.id}`);
  },

  // Pre-authenticated page
  authenticatedPage: async ({ page, testUser, request }, use) => {
    // Login via API
    const response = await request.post('/api/login', {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    });
    const { token } = await response.json();

    // Set auth cookie
    await page.context().addCookies([{
      name: 'auth-token',
      value: token,
      domain: 'localhost',
      path: '/',
    }]);

    await use(page);
  },

  // API client with auth
  apiClient: async ({ request, testUser }, use) => {
    const response = await request.post('/api/login', {
      data: {
        email: testUser.email,
        password: testUser.password,
      },
    });
    const { token } = await response.json();

    const client = {
      get: (url: string) => request.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      post: (url: string, data: any) => request.post(url, {
        headers: { Authorization: `Bearer ${token}` },
        data,
      }),
    };

    await use(client);
  },
});

export { expect };

// Usage in tests:
// import { test, expect } from './fixtures/test-fixtures';
//
// test('authenticated user can view dashboard', async ({ authenticatedPage }) => {
//   await authenticatedPage.goto('/dashboard');
//   await expect(authenticatedPage.locator('h1')).toHaveText('Dashboard');
// });
```

---

*Module 11 Code Examples*
*MentorMate QA Automation Course*
