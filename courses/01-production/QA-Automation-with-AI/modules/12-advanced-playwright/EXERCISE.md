# Exercise 12: Advanced Playwright & Visual AI

## Objective

Master advanced Playwright patterns including Network Interception, Global Authentication, and Visual AI Testing.

## Duration: 2.5 hours

---

## Part 1: Network Interception & Mocking (45 min)

### Task

Use Playwright to intercept network requests and mock responses. This allows testing UI behavior without relying on backend data or stability.

### Concept

Instead of waiting for the real API, we tell the browser: "When you ask for `/api/users`, use this JSON instead."

### Implementation

```typescript
test('mocks user data', async ({ page }) => {
  // Intercept the request
  await page.route('**/api/users', async route => {
    // Fulfill with mock data
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Mocked User', role: 'admin' }
      ])
    });
  });

  await page.goto('/users');
  await expect(page.getByText('Mocked User')).toBeVisible();
});
```

### Exercise

1. Create a test that mocks a **500 Server Error** response. Verify the UI shows a proper error message.
2. Create a test that mocks a **Slow Response** (latency). Verify the UI shows a loading spinner.
3. Create a test that mocks **Empty Data**. Verify the "No items found" state.

### Deliverable

- `tests/network-mocking.spec.ts` with the 3 scenarios above.

---

## Part 2: Global Authentication (45 min)

### Task

Implement "Login Once, Run Everywhere" to speed up tests.

### Concept

Logging in via UI for every test is slow. Instead, login once, save the "Storage State" (cookies/localStorage), and reuse it.

### Implementation

1. **Create Setup Test**:
   ```typescript
   // tests/auth.setup.ts
   import { test as setup } from '@playwright/test';

   setup('authenticate', async ({ page }) => {
     await page.goto('/login');
     await page.getByLabel('Email').fill('user@example.com');
     await page.getByLabel('Password').fill('password');
     await page.getByRole('button', { name: 'Sign in' }).click();
     await page.waitForURL('/dashboard');

     // Save state
     await page.context().storageState({ path: 'playwright/.auth/user.json' });
   });
   ```

2. **Configure Project**:
   ```typescript
   // playwright.config.ts
   projects: [
     {
       name: 'setup',
       testMatch: /.*\.setup\.ts/,
     },
     {
       name: 'e2e',
       use: {
         storageState: 'playwright/.auth/user.json',
       },
       dependencies: ['setup'],
     },
   ],
   ```

### Exercise

1. Implement the setup test for your application.
2. Create a test that assumes login (e.g., "Edit Profile").
3. Verify it runs without needing to log in again.

### Deliverable

- `tests/auth.setup.ts`
- Updated `playwright.config.ts`

---

## Part 3: Visual Regression & AI (45 min)

### Task

Implement visual testing to catch UI regressions that functional tests miss.

### Concept

Functional tests check *if* an element exists. Visual tests check *how* it looks (layout, color, font).

### Level 1: Playwright Snapshots (Basic)

```typescript
test('visual check', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    maxDiffPixels: 100 // Allow small noise
  });
});
```

### Level 2: Visual AI (Advanced Concept)

Tools like **Applitools** or **Percy** use AI to ignore dynamic content (like dates or ads) and focus on layout structure.

*Note: Since we can't easily install paid tools in this lab, we will simulate the concept.*

### Exercise

1. Create a visual test for the Login Page.
2. Run it once to generate the "Baseline".
3. Change the CSS (e.g., button color) in the app.
4. Run the test again and watch it fail.
5. Inspect the diff image.

### Deliverable

- `tests/visual.spec.ts`
- Screenshots of the failure diff.

---

## Part 4: Advanced Debugging (15 min)

### Task

Use the Trace Viewer to debug a complex failure.

### Exercise

1. Enable Tracing in config: `trace: 'on'`.
2. Run a test.
3. Open the trace: `npx playwright show-trace trace.zip`.
4. Explore the **Timeline**, **Network** tab, and **DOM Snapshots**.
5. Find the exact network call that happened before a click.

### Deliverable

- Screenshot of the Trace Viewer showing a specific network request.

---

## Submission

### Files
- `tests/network-mocking.spec.ts`
- `tests/auth.setup.ts`
- `tests/visual.spec.ts`
- `playwright.config.ts`

### Grading
| Criterion | Points |
|-----------|--------|
| Network Mocking scenarios | 30 |
| Global Auth implementation | 30 |
| Visual test execution | 20 |
| Debugging evidence | 20 |

---

*Good luck! These advanced patterns distinguish senior automation engineers.*
