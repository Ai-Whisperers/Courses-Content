# Module 12: Advanced Playwright Techniques

## Duration: 4 hours

## Learning Objectives

By the end of this module, you will be able to:
- Intercept and mock network requests for isolated testing
- Implement global authentication patterns
- Create visual regression tests
- Use advanced selectors and locator strategies
- Handle complex UI patterns (modals, iframes, shadow DOM)
- Optimize test performance and reliability

---

## 12.1 Network Interception & Mocking

### Why Mock Network Requests?

- **Speed**: No waiting for real API responses
- **Reliability**: Tests don't fail due to backend issues
- **Control**: Test specific scenarios (errors, edge cases)
- **Isolation**: Test UI behavior independently

### Basic Request Interception

```typescript
test('mocks API response', async ({ page }) => {
  // Intercept requests matching pattern
  await page.route('**/api/users', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Test User', email: 'test@example.com' }
      ])
    });
  });

  await page.goto('/users');
  await expect(page.getByText('Test User')).toBeVisible();
});
```

### Common Mocking Patterns

| Scenario | Implementation |
|----------|----------------|
| Success response | `route.fulfill({ status: 200, body: data })` |
| Error response | `route.fulfill({ status: 500 })` |
| Slow response | `await new Promise(r => setTimeout(r, 3000))` before fulfill |
| Abort request | `route.abort()` |
| Modify response | `route.fetch()` then modify data |

### Mocking Error States

```typescript
test('handles server error gracefully', async ({ page }) => {
  await page.route('**/api/data', route =>
    route.fulfill({ status: 500, body: 'Internal Server Error' })
  );

  await page.goto('/dashboard');
  await expect(page.getByText('Something went wrong')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
});
```

---

## 12.2 Global Authentication

### The Problem

Running login steps before every test is slow and repetitive.

### Solution: Storage State

Login once, save browser state, reuse in all tests.

### Setup Project for Auth

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    // Setup project - runs first, saves auth state
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/
    },
    // Main tests - use saved auth state
    {
      name: 'chromium',
      use: {
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    }
  ]
});
```

### Auth Setup File

```typescript
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for authentication to complete
  await expect(page).toHaveURL('/dashboard');

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
```

### Using Auth in Tests

```typescript
// tests/dashboard.spec.ts
test('shows user dashboard', async ({ page }) => {
  // Already logged in via storageState
  await page.goto('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();
});
```

---

## 12.3 Visual Regression Testing

### What is Visual Testing?

Comparing screenshots to detect unintended visual changes.

### Basic Screenshot Comparison

```typescript
test('homepage looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

### First Run

Creates baseline screenshots in `tests/__snapshots__/`.

### Subsequent Runs

Compares current state to baseline. Test fails if differences found.

### Handling Dynamic Content

```typescript
test('profile page visual test', async ({ page }) => {
  await page.goto('/profile');

  // Mask dynamic content
  await expect(page).toHaveScreenshot('profile.png', {
    mask: [
      page.locator('.timestamp'),
      page.locator('.user-avatar')
    ]
  });
});
```

### Screenshot Options

```typescript
await expect(page).toHaveScreenshot('page.png', {
  fullPage: true,              // Capture full scrollable page
  maxDiffPixels: 100,          // Allow small differences
  maxDiffPixelRatio: 0.01,     // Allow 1% difference
  threshold: 0.2,              // Per-pixel threshold
  animations: 'disabled',      // Stop animations
  mask: [page.locator('.ad')]  // Hide elements
});
```

---

## 12.4 Advanced Selectors

### Filtering Locators

```typescript
// Find visible submit button (not hidden one)
await page.getByRole('button', { name: 'Submit' })
  .filter({ hasText: 'Submit' })
  .click();

// Find row containing specific text
await page.getByRole('row')
  .filter({ hasText: 'John Doe' })
  .getByRole('button', { name: 'Edit' })
  .click();
```

### Chaining Locators

```typescript
// Complex nested selection
const productCard = page.locator('.product-card')
  .filter({ hasText: 'iPhone' });

await productCard.getByRole('button', { name: 'Add to Cart' }).click();
await expect(productCard.getByText('Added!')).toBeVisible();
```

### nth Matching

```typescript
// First, second, last item
await page.getByRole('listitem').first().click();
await page.getByRole('listitem').nth(2).click();
await page.getByRole('listitem').last().click();
```

---

## 12.5 Handling Complex UI Patterns

### Modals and Dialogs

```typescript
test('handles confirmation dialog', async ({ page }) => {
  // Listen for dialog before triggering it
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Are you sure?');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Item deleted')).toBeVisible();
});
```

### iFrames

```typescript
test('interacts with iframe', async ({ page }) => {
  await page.goto('/page-with-iframe');

  // Get frame by name or URL
  const frame = page.frameLocator('iframe[name="payment"]');

  // Interact within frame
  await frame.getByLabel('Card Number').fill('4242424242424242');
  await frame.getByRole('button', { name: 'Pay' }).click();
});
```

### Shadow DOM

```typescript
test('handles shadow DOM', async ({ page }) => {
  // Playwright pierces shadow DOM automatically
  await page.locator('custom-element').getByText('Click me').click();

  // Or explicitly
  await page.locator('custom-element >> shadow=.inner-button').click();
});
```

---

## 12.6 Performance Optimization

### Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  workers: 4,           // Run 4 workers in parallel
  fullyParallel: true,  // Parallelize tests within files
});
```

### Reduce Wait Times

```typescript
// Bad: Fixed timeout
await page.waitForTimeout(3000);

// Good: Wait for specific condition
await expect(page.getByText('Loaded')).toBeVisible();
```

### Reuse Browser Context

```typescript
// tests/shopping.spec.ts
test.describe('Shopping cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
  });

  test('add item', async ({ page }) => { /* ... */ });
  test('remove item', async ({ page }) => { /* ... */ });
  test('checkout', async ({ page }) => { /* ... */ });
});
```

---

## Key Takeaways

1. **Network mocking** enables reliable, fast, isolated tests
2. **Global authentication** saves time across test suites
3. **Visual testing** catches UI regressions automatically
4. **Advanced selectors** handle complex DOM structures
5. **Performance optimization** reduces CI pipeline time

---

## Next Steps

- Complete the [Exercise](EXERCISE.md) to practice advanced techniques
- Take the [Quiz](QUIZ.md) to verify your understanding
- Continue to the [Final Project](../10-final-project/) to apply all skills
