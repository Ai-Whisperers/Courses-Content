# Module 11: Advanced Testing Strategies
## Hands-On Lab

---

## Lab Overview

In this lab, you'll implement advanced testing strategies in your existing framework. By the end, you'll have visual regression tests, accessibility tests, cross-browser configuration, and enhanced reporting.

**Duration:** 90 minutes
**Prerequisites:** Working Playwright framework with Page Object Model

---

## Lab Setup

### Verify Your Environment

```bash
# Check Playwright version
npx playwright --version

# Should be 1.40+ for all features
```

### Install Additional Dependencies

```bash
# Accessibility testing
npm install -D @axe-core/playwright

# Fake data generation
npm install -D @faker-js/faker

# Allure reporting
npm install -D allure-playwright
```

---

## Part 1: Visual Regression Testing (20 min)

### Step 1.1: Create Visual Test Directory

```bash
mkdir tests/visual
```

### Step 1.2: Create First Visual Test

Create `tests/visual/homepage.visual.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Tests', () => {
  test('full page screenshot', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Compare full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('header component screenshot', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header.png');
  });

  test('footer component screenshot', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png');
  });
});
```

### Step 1.3: Handle Dynamic Content

Create `tests/visual/login.visual.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Page Visual Tests', () => {
  test('login form appearance', async ({ page }) => {
    await page.goto('/login');

    // Mask dynamic elements (timestamps, ads)
    await expect(page).toHaveScreenshot('login-page.png', {
      mask: [
        page.locator('.timestamp'),
        page.locator('.dynamic-banner'),
      ],
    });
  });

  test('error state appearance', async ({ page }) => {
    await page.goto('/login');

    // Trigger error state
    await page.fill('[data-testid="email"]', 'invalid');
    await page.fill('[data-testid="password"]', 'wrong');
    await page.click('[data-testid="submit"]');

    // Wait for error to appear
    await page.waitForSelector('.error-message');

    await expect(page).toHaveScreenshot('login-error.png');
  });
});
```

### Step 1.4: Generate Baselines

```bash
# First run creates baseline screenshots
npx playwright test tests/visual --update-snapshots

# Subsequent runs compare against baselines
npx playwright test tests/visual
```

### Step 1.5: Configure Visual Test Settings

Add to `playwright.config.ts`:

```typescript
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
  // ... rest of config
});
```

---

## Part 2: Accessibility Testing (20 min)

### Step 2.1: Create Accessibility Test Directory

```bash
mkdir tests/a11y
```

### Step 2.2: Create Accessibility Test File

Create `tests/a11y/pages.a11y.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {

  test('homepage should have no violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('login page should have no violations', async ({ page }) => {
    await page.goto('/login');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/login');

    // Check that inputs have associated labels
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAccessibleName();

    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toHaveAccessibleName();
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Verify heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .options({ rules: { 'color-contrast': { enabled: true } } })
      .analyze();

    const contrastViolations = accessibilityScanResults.violations
      .filter(v => v.id === 'color-contrast');

    expect(contrastViolations).toEqual([]);
  });
});
```

### Step 2.3: Create Detailed A11y Report

Create `tests/a11y/detailed-audit.a11y.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('detailed accessibility audit', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();

  // Log violations for review
  if (results.violations.length > 0) {
    console.log('Accessibility Violations:');
    results.violations.forEach(violation => {
      console.log(`\n${violation.id}: ${violation.description}`);
      console.log(`Impact: ${violation.impact}`);
      console.log(`Help: ${violation.helpUrl}`);
      violation.nodes.forEach(node => {
        console.log(`  Element: ${node.html}`);
      });
    });
  }

  // Log passes for reference
  console.log(`\nPassed checks: ${results.passes.length}`);

  // Assert no critical/serious violations
  const seriousViolations = results.violations
    .filter(v => v.impact === 'critical' || v.impact === 'serious');

  expect(seriousViolations).toEqual([]);
});
```

### Step 2.4: Run Accessibility Tests

```bash
npx playwright test tests/a11y
```

---

## Part 3: Cross-Browser Configuration (15 min)

### Step 3.1: Update Playwright Config

Update `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },

    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
});
```

### Step 3.2: Run Tests on Specific Browser

```bash
# Run on all browsers
npx playwright test

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on mobile only
npx playwright test --project=mobile-chrome --project=mobile-safari
```

### Step 3.3: Create Browser-Specific Test

Create `tests/responsive/mobile.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Mobile-specific tests', () => {
  test('should show mobile menu on small screens', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    await page.goto('/');

    // Mobile menu should be visible
    await expect(page.locator('.mobile-menu-button')).toBeVisible();

    // Desktop nav should be hidden
    await expect(page.locator('.desktop-nav')).toBeHidden();
  });

  test('should have touch-friendly buttons', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    await page.goto('/');

    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();

      if (box) {
        // Minimum touch target size: 44x44 pixels
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
```

---

## Part 4: Test Data Factory (15 min)

### Step 4.1: Create Factories Directory

```bash
mkdir utils
```

### Step 4.2: Create Test Data Factory

Create `utils/factories.ts`:

```typescript
import { faker } from '@faker-js/faker';

export const userFactory = {
  create: (overrides = {}) => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12, memorable: true }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    ...overrides,
  }),

  createAdmin: () => userFactory.create({
    role: 'admin',
    email: `admin-${Date.now()}@test.com`,
  }),

  createWithLongName: () => userFactory.create({
    firstName: faker.lorem.words(10),
    lastName: faker.lorem.words(10),
  }),

  createWithSpecialChars: () => userFactory.create({
    firstName: "O'Brien-Smith",
    lastName: "José García",
  }),
};

export const productFactory = {
  create: (overrides = {}) => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    inStock: faker.datatype.boolean(),
    quantity: faker.number.int({ min: 0, max: 100 }),
    ...overrides,
  }),

  createOutOfStock: () => productFactory.create({
    inStock: false,
    quantity: 0,
  }),
};

export const addressFactory = {
  create: (overrides = {}) => ({
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    ...overrides,
  }),
};
```

### Step 4.3: Use Factory in Tests

```typescript
import { test, expect } from '@playwright/test';
import { userFactory, productFactory } from '../utils/factories';

test('register with generated user data', async ({ page }) => {
  const user = userFactory.create();

  await page.goto('/register');
  await page.fill('[data-testid="firstName"]', user.firstName);
  await page.fill('[data-testid="lastName"]', user.lastName);
  await page.fill('[data-testid="email"]', user.email);
  await page.fill('[data-testid="password"]', user.password);
  await page.click('[data-testid="submit"]');

  await expect(page).toHaveURL('/dashboard');
});

test('handle special characters in name', async ({ page }) => {
  const user = userFactory.createWithSpecialChars();

  await page.goto('/register');
  await page.fill('[data-testid="firstName"]', user.firstName);
  // ... rest of test
});
```

---

## Part 5: Allure Reporting (10 min)

### Step 5.1: Configure Allure Reporter

Update `playwright.config.ts`:

```typescript
export default defineConfig({
  reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
    }],
  ],
  // ... rest of config
});
```

### Step 5.2: Add Test Metadata

Create `tests/reporting/allure-example.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('User Management', () => {
  test('critical: user can login', async ({ page }) => {
    await allure.severity('critical');
    await allure.feature('Authentication');
    await allure.story('User Login');

    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('normal: user can update profile', async ({ page }) => {
    await allure.severity('normal');
    await allure.feature('User Profile');
    await allure.story('Profile Update');

    // ... test implementation
  });
});
```

### Step 5.3: Generate Allure Report

```bash
# Run tests
npx playwright test

# Generate report
npx allure generate allure-results -o allure-report --clean

# Open report
npx allure open allure-report
```

---

## Part 6: Performance Baseline (10 min)

### Step 6.1: Create Performance Tests

Create `tests/performance/load-times.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

const THRESHOLDS = {
  homepage: 3000,
  login: 2000,
  dashboard: 4000,
};

test.describe('Page Load Performance', () => {
  test('homepage loads within threshold', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    console.log(`Homepage loaded in ${loadTime}ms`);

    expect(loadTime).toBeLessThan(THRESHOLDS.homepage);
  });

  test('login page loads within threshold', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    console.log(`Login page loaded in ${loadTime}ms`);

    expect(loadTime).toBeLessThan(THRESHOLDS.login);
  });

  test('collect web vitals', async ({ page }) => {
    await page.goto('/');

    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      return {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
        domComplete: navigation.domComplete - navigation.fetchStart,
      };
    });

    console.log('Performance Metrics:', metrics);

    // Assert reasonable values
    expect(metrics.ttfb).toBeLessThan(500);
    expect(metrics.domInteractive).toBeLessThan(2000);
  });
});
```

---

## Lab Completion Checklist

- [ ] Visual regression tests created
- [ ] Baseline screenshots generated
- [ ] Accessibility tests running
- [ ] No critical a11y violations
- [ ] Cross-browser config set up
- [ ] Tests run on 3+ browsers
- [ ] Test data factory created
- [ ] Allure reporting configured
- [ ] Performance baselines established
- [ ] All tests passing

---

## Troubleshooting

### Visual Tests Failing
```bash
# Update baselines after intentional changes
npx playwright test --update-snapshots
```

### Accessibility Scan Errors
```bash
# Check axe-core version compatibility
npm list @axe-core/playwright
```

### Cross-Browser Issues
```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install webkit
```

---

## Next Steps

1. Run all tests: `npx playwright test`
2. Review reports: `npx playwright show-report`
3. Complete Module 11 exercises
4. Take Module 11 quiz

---

*Module 11 Lab - Advanced Testing Strategies*
*MentorMate QA Automation Course*
