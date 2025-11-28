# Module 11: Advanced Testing Strategies
## Exercises

---

## Exercise Overview

Complete these 10 exercises to practice advanced testing strategies. Each exercise builds on your existing test framework and adds enterprise-grade capabilities.

**Time Estimate:** 4-6 hours total
**Submission:** Add all code to your GitHub repository

---

## Exercise 1: Visual Regression Testing Setup (30 min)

**Objective:** Implement visual regression testing in your framework

**Tasks:**
1. Add visual snapshot tests to your login page
2. Create baseline screenshots
3. Test with intentional CSS change
4. Document the comparison process

**Deliverables:**
```javascript
// tests/visual/login.visual.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Page Visual Tests', () => {
  test('login form matches baseline', async ({ page }) => {
    await page.goto('/login');
    // TODO: Add visual comparison
  });

  test('error state matches baseline', async ({ page }) => {
    await page.goto('/login');
    // TODO: Trigger error and compare
  });
});
```

**Questions to answer:**
1. What threshold did you use for comparison?
2. How did you handle dynamic content?
3. What is your baseline update process?

---

## Exercise 2: Accessibility Audit (45 min)

**Objective:** Add accessibility testing to your framework

**Tasks:**
1. Install @axe-core/playwright
2. Create accessibility test for 3 pages
3. Document all violations found
4. Fix at least 2 violations
5. Re-run and verify fixes

**Deliverables:**
```javascript
// tests/a11y/pages.a11y.spec.js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('login page should be accessible', async ({ page }) => {
    await page.goto('/login');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // TODO: Assert no violations
  });
});
```

**Report format:**
| Page | Violations | Severity | Status |
|------|------------|----------|--------|
| Login | Missing alt | Serious | Fixed |

---

## Exercise 3: Cross-Browser Configuration (30 min)

**Objective:** Configure tests to run on multiple browsers

**Tasks:**
1. Update playwright.config.js with 3+ browser projects
2. Add mobile device emulation project
3. Run same test across all projects
4. Document any browser-specific issues

**Deliverables:**
- Updated playwright.config.js
- Test results from all browsers
- Documentation of differences found

**Configuration template:**
```javascript
// playwright.config.js
export default {
  projects: [
    // TODO: Add chromium
    // TODO: Add firefox
    // TODO: Add webkit
    // TODO: Add mobile device
  ],
};
```

---

## Exercise 4: Security Test Patterns (45 min)

**Objective:** Implement basic security tests

**Tasks:**
1. Create authentication security tests
2. Test for common vulnerabilities
3. Implement token management
4. Test authorization rules

**Deliverables:**
```javascript
// tests/security/auth.security.spec.js
import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
  test('should prevent SQL injection in login', async ({ page }) => {
    // TODO: Test SQL injection attempt
  });

  test('should lock account after failed attempts', async ({ page }) => {
    // TODO: Test brute force protection
  });

  test('should require auth for protected routes', async ({ request }) => {
    // TODO: Test API without auth token
  });

  test('should validate user permissions', async ({ request }) => {
    // TODO: Test authorization rules
  });
});
```

---

## Exercise 5: Flaky Test Analysis (30 min)

**Objective:** Identify and fix a flaky test

**Tasks:**
1. Run your test suite 10 times
2. Identify any tests that fail inconsistently
3. Analyze root cause
4. Implement fix
5. Verify fix works

**If no flaky tests exist:**
- Create an intentionally flaky test
- Document why it's flaky
- Fix it
- Document the solution

**Report template:**
```markdown
## Flaky Test Analysis

**Test Name:** [test name]
**Failure Rate:** [X/10 runs]

### Root Cause
[Explain why it was flaky]

### Solution
[Explain how you fixed it]

### Prevention
[How to prevent similar issues]
```

---

## Exercise 6: Test Data Factory (45 min)

**Objective:** Create a test data factory for consistent data generation

**Tasks:**
1. Install @faker-js/faker
2. Create factory functions for your entities
3. Use factories in 3+ tests
4. Document your data patterns

**Deliverables:**
```javascript
// utils/factories.js
import { faker } from '@faker-js/faker';

export const userFactory = {
  create: (overrides = {}) => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    ...overrides,
  }),

  createAdmin: () => userFactory.create({ role: 'admin' }),
  createGuest: () => userFactory.create({ role: 'guest' }),
};

export const productFactory = {
  create: (overrides = {}) => ({
    // TODO: Define product fields
  }),
};
```

---

## Exercise 7: Environment Configuration (30 min)

**Objective:** Configure tests for multiple environments

**Tasks:**
1. Create environment-specific configurations
2. Add environment variables management
3. Run tests against staging config
4. Document switching process

**Deliverables:**
```javascript
// playwright.config.js
export default {
  projects: [
    {
      name: 'local',
      use: { baseURL: 'http://localhost:3000' },
    },
    {
      name: 'staging',
      use: { baseURL: process.env.STAGING_URL },
    },
    {
      name: 'production',
      use: { baseURL: process.env.PROD_URL },
    },
  ],
};
```

**Usage documentation:**
```bash
# Run against specific environment
npx playwright test --project=staging
```

---

## Exercise 8: Allure Reporting (45 min)

**Objective:** Set up Allure reports for your test suite

**Tasks:**
1. Install allure-playwright
2. Configure reporter
3. Add test metadata (severity, features)
4. Generate and view report
5. Screenshot the dashboard

**Deliverables:**
```javascript
// playwright.config.js
export default {
  reporter: [
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
    }],
  ],
};
```

```javascript
// Example test with metadata
import { test } from '@playwright/test';
import { allure } from 'allure-playwright';

test('critical user flow', async ({ page }) => {
  await allure.severity('critical');
  await allure.feature('Checkout');
  // ... test code
});
```

---

## Exercise 9: Performance Baseline (30 min)

**Objective:** Add basic performance testing to your framework

**Tasks:**
1. Measure page load times for 3 pages
2. Set performance thresholds
3. Fail tests that exceed thresholds
4. Document baseline metrics

**Deliverables:**
```javascript
// tests/performance/load-times.perf.spec.js
import { test, expect } from '@playwright/test';

const LOAD_TIME_THRESHOLD = 3000; // 3 seconds

test.describe('Performance Tests', () => {
  test('homepage loads within threshold', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    console.log(`Homepage loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(LOAD_TIME_THRESHOLD);
  });

  // TODO: Add more page load tests
});
```

---

## Exercise 10: Test Optimization Report (45 min)

**Objective:** Analyze and optimize your test suite

**Tasks:**
1. Run full test suite and measure time
2. Identify 3 slowest tests
3. Optimize each slow test
4. Re-run and compare times
5. Document optimizations

**Report template:**
```markdown
## Test Suite Optimization Report

### Before Optimization
- Total tests: [X]
- Total time: [X minutes]
- Slowest tests:
  1. [test name] - [time]
  2. [test name] - [time]
  3. [test name] - [time]

### Optimizations Applied
1. **[Test name]**
   - Issue: [describe]
   - Fix: [describe]
   - Time saved: [X seconds]

### After Optimization
- Total time: [X minutes]
- Improvement: [X%]

### Recommendations
- [Additional optimization ideas]
```

---

## Submission Checklist

- [ ] All 10 exercises completed
- [ ] Code committed to GitHub
- [ ] Tests passing in CI
- [ ] Documentation complete
- [ ] Reports generated and saved

---

## Grading Criteria

| Exercise | Points | Criteria |
|----------|--------|----------|
| Visual Regression | 10 | Working snapshots, handled dynamics |
| Accessibility | 10 | Tests run, violations documented |
| Cross-Browser | 10 | Multiple browsers configured |
| Security | 10 | 4+ security patterns implemented |
| Flaky Analysis | 10 | Root cause identified, fixed |
| Data Factory | 10 | Reusable factories created |
| Environments | 10 | Multiple envs configured |
| Allure Reports | 10 | Reports generating correctly |
| Performance | 10 | Baselines established |
| Optimization | 10 | Measurable improvements |

**Total: 100 points**
**Passing: 70 points**

---

*Module 11 Exercises*
*MentorMate QA Automation Course*
