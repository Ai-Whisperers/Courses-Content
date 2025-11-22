---
name: playwright-helper
description: Help with Playwright E2E testing including selectors, waits, assertions, and Page Object Model patterns. Use when working with Playwright tests or browser automation.
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Playwright Helper Skill

## Best Practices

### Locator Strategies (in order of preference)
1. `data-testid` attributes
2. Role-based: `getByRole('button', { name: 'Submit' })`
3. Text-based: `getByText('Welcome')`
4. Label-based: `getByLabel('Email')`
5. CSS selectors (last resort)

### Page Object Model

```typescript
// pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getError(): Promise<string> {
    return this.errorMessage.textContent() ?? '';
  }
}
```

### Waiting Strategies

```typescript
// Wait for navigation
await page.waitForURL('/dashboard');

// Wait for element
await expect(locator).toBeVisible();

// Wait for network
await page.waitForResponse(resp => resp.url().includes('/api/'));

// Wait for load state
await page.waitForLoadState('networkidle');
```

### Assertions

```typescript
// Element assertions
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Expected');
await expect(locator).toHaveValue('input value');

// Page assertions
await expect(page).toHaveURL('/expected-path');
await expect(page).toHaveTitle('Page Title');

// Soft assertions (continue on failure)
await expect.soft(locator).toHaveText('Text');
```

### Test Fixtures

```typescript
// fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login.page';

export const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});
```

### API Testing

```typescript
test('API request', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: { email: 'test@test.com', password: 'pass' }
  });

  expect(response.ok()).toBeTruthy();
  const json = await response.json();
  expect(json.token).toBeDefined();
});
```

## Common Commands

```bash
# Run tests
npx playwright test

# Run specific test
npx playwright test login.spec.ts

# UI mode
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Generate test code
npx playwright codegen localhost:3000

# Show report
npx playwright show-report
```
