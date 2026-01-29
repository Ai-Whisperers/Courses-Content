# Module 12 Solutions: Advanced Playwright Techniques

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Network Mocking

**Sample Network Interception:**

```typescript
test('mocks API and tests error handling', async ({ page }) => {
  // Mock successful response
  await page.route('**/api/users', async route => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, name: 'Test User', email: 'test@example.com' }
        ])
      });
    }
  });

  await page.goto('/users');
  await expect(page.getByText('Test User')).toBeVisible();
});

test('handles API errors gracefully', async ({ page }) => {
  // Mock error response
  await page.route('**/api/users', route =>
    route.fulfill({ status: 500, body: 'Server Error' })
  );

  await page.goto('/users');
  await expect(page.getByText('Something went wrong')).toBeVisible();
});

test('handles slow API responses', async ({ page }) => {
  await page.route('**/api/data', async route => {
    await new Promise(r => setTimeout(r, 3000));
    await route.fulfill({ status: 200, body: '{}' });
  });

  await page.goto('/dashboard');
  await expect(page.getByText('Loading...')).toBeVisible();
  await expect(page.getByText('Data loaded')).toBeVisible({ timeout: 5000 });
});
```

**Grading Notes:**
- Should mock multiple scenarios
- Should test both success and error
- Should handle timing properly
- Should verify UI responses

---

### Part 2: Global Authentication

**Sample Auth Setup:**

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    {
      name: 'chromium',
      use: {
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    }
  ]
});

// tests/auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});

// tests/dashboard.spec.ts
test('shows authenticated dashboard', async ({ page }) => {
  // Already logged in via storageState
  await page.goto('/dashboard');
  await expect(page.getByText('Welcome')).toBeVisible();
});
```

**Grading Notes:**
- Should set up auth once
- Should reuse across tests
- Should save and restore state
- Should be efficient

---

### Part 3: Visual Regression Testing

**Sample Visual Tests:**

```typescript
test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled'
  });
});

test('profile page with masked dynamic content', async ({ page }) => {
  await page.goto('/profile');
  await expect(page).toHaveScreenshot('profile.png', {
    mask: [
      page.locator('.timestamp'),
      page.locator('.user-avatar')
    ]
  });
});

test('modal dialog visual test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open Modal' }).click();
  await expect(page.locator('.modal')).toHaveScreenshot('modal.png');
});
```

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - Network mocking enables isolated, fast tests
2. **c** - Storage state saves authentication between tests
3. **b** - Visual regression tests detect UI changes
4. **a** - Filtering locators handles complex selectors
5. **c** - Page.route() intercepts network requests

### True/False Answers

6. **True** - Network mocking speeds up tests
7. **True** - Visual tests catch unintended changes
8. **False** - Should use getByRole for accessibility
9. **True** - Masking hides dynamic content
10. **False** - Should use proper waits, not timeouts

---

## Common Student Mistakes

1. **Not Mocking Network** - Tests depend on real API
2. **Repeating Login** - Inefficient, slow tests
3. **Brittle Selectors** - Tests break with UI changes
4. **No Visual Tests** - Miss UI regressions
5. **Ignoring Accessibility** - Use getByRole instead of CSS

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Network Mocking | 25 | Multiple scenarios, proper setup |
| Authentication | 25 | Efficient, reusable, working |
| Visual Testing | 25 | Proper masking, baseline setup |
| Advanced Selectors | 15 | Robust, accessible |
| Documentation | 10 | Clear explanation |
| **Total** | **100** | |

**Passing**: 70+ points
