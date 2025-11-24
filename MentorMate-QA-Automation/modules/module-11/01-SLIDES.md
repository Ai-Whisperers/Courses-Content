# Module 11: Advanced Testing Strategies
## Slides for Sunday 4 - Part 1

---

## Slide 1: Module 11 Overview

**Advanced Testing Strategies**
- Visual Regression Testing
- Accessibility Testing
- Cross-Platform Testing
- Security Testing Integration
- Test Stability & Optimization
- Reporting & Analytics

*Taking your automation to enterprise-grade quality*

---

## Slide 2: Why Advanced Testing?

**Basic automation is not enough**

Modern applications require:
- Visual consistency across releases
- Accessibility for all users
- Cross-browser/device compatibility
- Security compliance
- Reliable, fast test execution
- Actionable test reports

---

## Slide 3: The Testing Pyramid Extended

```
        /\
       /  \  E2E + Visual + A11y
      /    \
     /------\  API + Security
    /        \
   /----------\  Unit + Component
  /____________\
```

**Advanced testing adds layers to the pyramid**

---

## Slide 4: Visual Regression Testing

**What is it?**
Automatically comparing screenshots to detect unintended visual changes.

**Why it matters:**
- CSS changes can break layouts
- Third-party updates affect appearance
- Cross-browser rendering differences
- Catches issues code tests miss

---

## Slide 5: Visual Testing Tools

| Tool | Type | Best For |
|------|------|----------|
| Playwright Snapshots | Built-in | Quick comparisons |
| Percy | Cloud service | Team collaboration |
| Applitools | AI-powered | Smart comparison |
| BackstopJS | Open source | CSS regression |

---

## Slide 6: Playwright Visual Comparisons

```javascript
import { test, expect } from '@playwright/test';

test('homepage visual test', async ({ page }) => {
  await page.goto('https://example.com');

  // Full page screenshot comparison
  await expect(page).toHaveScreenshot('homepage.png');
});

test('component visual test', async ({ page }) => {
  await page.goto('https://example.com');

  // Element screenshot comparison
  const header = page.locator('header');
  await expect(header).toHaveScreenshot('header.png');
});
```

---

## Slide 7: Handling Dynamic Content

**Problem:** Timestamps, ads, animations cause false failures

**Solutions:**
```javascript
// Mask dynamic elements
await expect(page).toHaveScreenshot({
  mask: [page.locator('.timestamp'), page.locator('.ad-banner')]
});

// Wait for animations
await page.waitForTimeout(500);

// Disable animations
await page.addStyleTag({
  content: '*, *::before, *::after { animation: none !important; }'
});
```

---

## Slide 8: Accessibility Testing Overview

**Why accessibility matters:**
- 15% of world population has disabilities
- Legal requirements (ADA, Section 508)
- Better UX for everyone
- SEO benefits

**WCAG 2.1 Levels:**
- **A** - Minimum accessibility
- **AA** - Standard compliance (most common)
- **AAA** - Highest accessibility

---

## Slide 9: Common Accessibility Issues

| Issue | Impact | Fix |
|-------|--------|-----|
| Missing alt text | Screen readers can't describe images | Add descriptive alt attributes |
| Low color contrast | Hard to read for low vision | Use 4.5:1 ratio minimum |
| No keyboard navigation | Can't use without mouse | Add tabindex, focus states |
| Missing form labels | Can't identify input purpose | Associate labels with inputs |
| No skip links | Must tab through everything | Add "skip to content" link |

---

## Slide 10: Automated A11y Testing with axe-core

```javascript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('https://example.com');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Slide 11: Playwright Accessibility Assertions

```javascript
// Check element is accessible by role
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

// Check element has accessible name
await expect(page.locator('input')).toHaveAccessibleName('Email');

// Check element has accessible description
await expect(page.locator('input')).toHaveAccessibleDescription('Enter your email');

// Check ARIA attributes
await expect(page.locator('[role="alert"]')).toHaveAttribute('aria-live', 'polite');
```

---

## Slide 12: Cross-Browser Testing

**Why test multiple browsers?**
- Different rendering engines
- Different JavaScript implementations
- Different default styles
- Market share coverage

**Playwright supports:**
- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)

---

## Slide 13: Playwright Multi-Browser Config

```javascript
// playwright.config.js
export default {
  projects: [
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
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
};
```

---

## Slide 14: Device Emulation

```javascript
import { test, devices } from '@playwright/test';

// Use predefined device
test.use(devices['iPhone 12']);

test('mobile layout test', async ({ page }) => {
  await page.goto('https://example.com');

  // Test mobile-specific behavior
  await expect(page.locator('.mobile-menu')).toBeVisible();
  await expect(page.locator('.desktop-nav')).toBeHidden();
});

// Custom viewport
test.use({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
});
```

---

## Slide 15: Cloud Testing Platforms

**When to use cloud platforms:**
- Real device testing needed
- Many browser/OS combinations
- Parallel execution at scale
- Geographic distribution

**Popular platforms:**
- BrowserStack
- Sauce Labs
- LambdaTest
- AWS Device Farm

---

## Slide 16: Security Testing Integration

**Security testing in automation:**
- Authentication flow testing
- Authorization checks
- Token management
- Input validation
- API security

**Not a replacement for:**
- Penetration testing
- Security audits
- Vulnerability assessments

---

## Slide 17: Authentication Testing Patterns

```javascript
// Test login security
test('should prevent brute force', async ({ page }) => {
  for (let i = 0; i < 5; i++) {
    await page.fill('#username', 'user');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');
  }

  // Should show lockout message
  await expect(page.locator('.lockout-message')).toBeVisible();
});

// Test session timeout
test('should expire inactive sessions', async ({ page }) => {
  await login(page);
  await page.waitForTimeout(SESSION_TIMEOUT);
  await page.reload();

  // Should redirect to login
  await expect(page).toHaveURL(/login/);
});
```

---

## Slide 18: Secrets Management

**Never hardcode credentials!**

```javascript
// BAD - Don't do this
const password = 'myPassword123';

// GOOD - Use environment variables
const password = process.env.TEST_PASSWORD;

// BETTER - Use secure vault
import { getSecret } from './vault';
const password = await getSecret('test-user-password');
```

**Storage options:**
- Environment variables
- GitHub Secrets
- HashiCorp Vault
- AWS Secrets Manager

---

## Slide 19: API Security Checks

```javascript
test('should require authentication', async ({ request }) => {
  // Request without token should fail
  const response = await request.get('/api/protected');
  expect(response.status()).toBe(401);
});

test('should validate authorization', async ({ request }) => {
  // User shouldn't access admin endpoints
  const response = await request.get('/api/admin/users', {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  expect(response.status()).toBe(403);
});

test('should validate input', async ({ request }) => {
  // SQL injection attempt
  const response = await request.post('/api/search', {
    data: { query: "'; DROP TABLE users; --" }
  });
  expect(response.status()).toBe(400);
});
```

---

## Slide 20: Test Flakiness

**What is a flaky test?**
A test that sometimes passes and sometimes fails without code changes.

**Common causes:**
- Race conditions
- Timing issues
- Test interdependence
- Environment differences
- Network variability

**Impact:**
- Erodes trust in test suite
- Wastes debugging time
- Delays deployments

---

## Slide 21: Fixing Flaky Tests

```javascript
// BAD - Arbitrary wait
await page.waitForTimeout(3000);

// GOOD - Wait for specific condition
await page.waitForSelector('.loaded');

// BETTER - Use auto-waiting assertions
await expect(page.locator('.data')).toBeVisible();

// BEST - Wait for network idle
await page.goto(url, { waitUntil: 'networkidle' });
```

**Best practices:**
- Use Playwright's auto-waiting
- Wait for specific conditions
- Isolate test data
- Reset state between tests

---

## Slide 22: Test Isolation

```javascript
// Each test gets fresh context
test.beforeEach(async ({ page }) => {
  // Clear storage
  await page.context().clearCookies();

  // Reset database (API call)
  await request.post('/api/test/reset');
});

// Use unique test data
test('create user', async ({ page }) => {
  const uniqueEmail = `test-${Date.now()}@example.com`;
  await page.fill('#email', uniqueEmail);
});

// Don't share state between tests
// Each test should be independent
```

---

## Slide 23: Parallel Execution

```javascript
// playwright.config.js
export default {
  // Run tests in parallel
  workers: 4, // Number of parallel workers

  // Or use percentage of CPUs
  workers: '50%',

  // Fully parallel (all tests)
  fullyParallel: true,

  // Retry failed tests
  retries: 2,
};
```

**Benefits:**
- Faster execution
- Better resource utilization
- Scalable CI/CD

---

## Slide 24: Test Data Management

**Strategies:**

| Strategy | Pros | Cons |
|----------|------|------|
| Fixtures | Consistent, version controlled | Can get stale |
| Factories | Fresh data each run | Slower setup |
| Seeding | Realistic data | Complex maintenance |
| Mocking | Fast, isolated | Less realistic |

```javascript
// Factory example
import { faker } from '@faker-js/faker';

function createUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
```

---

## Slide 25: Environment Configuration

```javascript
// playwright.config.js
export default {
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  projects: [
    {
      name: 'staging',
      use: {
        baseURL: 'https://staging.example.com',
      },
    },
    {
      name: 'production',
      use: {
        baseURL: 'https://example.com',
      },
    },
  ],
};
```

**Run specific environment:**
```bash
npx playwright test --project=staging
```

---

## Slide 26: Test Reporting

**Why good reports matter:**
- Quick identification of failures
- Trend analysis over time
- Communication with stakeholders
- Compliance documentation

**Report types:**
- HTML reports (built-in)
- Allure reports
- JUnit XML (CI integration)
- Custom dashboards

---

## Slide 27: Playwright HTML Report

```javascript
// playwright.config.js
export default {
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }],
  ],
};
```

**Generate report:**
```bash
npx playwright test
npx playwright show-report
```

**Features:**
- Test timeline
- Screenshots on failure
- Video recordings
- Trace viewer

---

## Slide 28: Allure Reports

```bash
# Install
npm install -D allure-playwright

# Configure in playwright.config.js
reporter: [['allure-playwright']]

# Generate report
npx allure generate allure-results -o allure-report
npx allure open allure-report
```

**Features:**
- Beautiful dashboards
- Trend graphs
- Categories and suites
- Attachments

---

## Slide 29: Test Metrics & KPIs

**Key metrics to track:**

| Metric | Target | Why |
|--------|--------|-----|
| Pass rate | > 95% | Test reliability |
| Flakiness | < 5% | Test quality |
| Execution time | Decreasing | CI efficiency |
| Coverage | > 80% | Completeness |
| Defect escape rate | < 5% | Effectiveness |

---

## Slide 30: CI/CD Integration

```yaml
# GitHub Actions with reporting
- name: Run tests
  run: npx playwright test

- name: Upload report
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/

- name: Publish results
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Playwright Tests
    path: results.xml
    reporter: java-junit
```

---

## Slide 31: Advanced: Performance Testing

```javascript
test('page should load quickly', async ({ page }) => {
  const startTime = Date.now();

  await page.goto('https://example.com');

  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);

  // Check Core Web Vitals
  const metrics = await page.evaluate(() => {
    return JSON.stringify(performance.getEntriesByType('navigation'));
  });

  console.log('Performance metrics:', metrics);
});
```

---

## Slide 32: Advanced: Network Monitoring

```javascript
test('should make expected API calls', async ({ page }) => {
  const apiCalls = [];

  page.on('request', request => {
    if (request.url().includes('/api/')) {
      apiCalls.push(request.url());
    }
  });

  await page.goto('https://example.com');
  await page.click('.load-data');

  expect(apiCalls).toContain('/api/users');
  expect(apiCalls.length).toBeLessThan(10);
});
```

---

## Slide 33: Test Optimization Checklist

**Before running tests:**
- [ ] Remove unnecessary waits
- [ ] Parallelize independent tests
- [ ] Mock slow external services
- [ ] Use headless mode in CI

**During test development:**
- [ ] Keep tests focused and small
- [ ] Avoid test interdependence
- [ ] Use page objects for reusability
- [ ] Clean up test data

**After test runs:**
- [ ] Analyze slow tests
- [ ] Fix flaky tests immediately
- [ ] Review coverage gaps
- [ ] Update baselines

---

## Slide 34: Summary

**Advanced Testing Strategies:**

1. **Visual Testing** - Catch UI regressions automatically
2. **Accessibility** - Ensure inclusive applications
3. **Cross-Platform** - Verify everywhere users are
4. **Security** - Build security into testing
5. **Stability** - Create reliable, fast tests
6. **Reporting** - Communicate results effectively

---

## Slide 35: Next Steps

**Continue to Module 12:**
- AI-Assisted Test Generation
- Natural Language Processing for Tests
- Cloud Testing at Scale
- Future of QA Engineering

**Practice:**
- Complete Module 11 exercises
- Add advanced tests to your framework
- Pass Module 11 quiz

---

*Module 11 - Advanced Testing Strategies*
*MentorMate QA Automation Course*
