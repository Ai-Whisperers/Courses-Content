# QA Track Module 1: Advanced Playwright Testing with OpenCode
## FPUNA Summer 2026 - Week 4 (QA Automation Specialization)

**Duration**: 10 hours (Week 4 of program)  
**Tool Focus**: Playwright + OpenCode  
**Prerequisites**: Core Modules 1-6 completed

---

## Module Overview

Welcome to the QA Automation specialization track! Now that you've mastered OpenCode fundamentals, you'll apply those skills to become an expert in automated testing with Playwright. This module takes you from intermediate to advanced Playwright techniques, showing you how to use OpenCode to accelerate test creation and maintenance.

### Learning Objectives

By the end of this week, you will be able to:

1. **Master** advanced Playwright features for professional testing
2. **Generate** complex test suites with OpenCode
3. **Implement** network mocking for isolated, reliable tests
4. **Create** visual regression testing systems
5. **Optimize** test performance and CI/CD integration
6. **Build** reusable test utilities and fixtures
7. **Handle** complex UI patterns (modals, iframes, shadow DOM)

---

## Why Advanced Playwright Skills Matter

### The Professional Testing Reality

```
Basic Playwright:    Click buttons, fill forms
Advanced Playwright: Handle real-world complexity

Examples:
- Authentication across 50+ tests
- Mocking unreliable APIs
- Visual regression detection
- Performance optimization for CI
- Complex UI interactions
```

**Companies want**: QA engineers who can handle production-scale testing, not just tutorial examples.

---

## 1.1 Network Interception & API Mocking

### The Challenge of External Dependencies

**Problem**: Tests that depend on live APIs are:
- **Slow** - Wait for network requests
- **Flaky** - Fail when API is down
- **Incomplete** - Can't test error states easily
- **Expensive** - Use up API quotas

**Solution**: Mock network requests to test UI behavior in isolation.

---

### Understanding Network Mocking

```
Without Mocking:
Test → UI → Real API → Database → Response → UI Update

With Mocking:
Test → UI → Mocked API → Instant Response → UI Update
                ↑
          You control the response
```

**Benefits**:
- ⚡ Tests run 10x faster
- 🎯 Test exact scenarios (errors, edge cases)
- 🔒 No dependency on backend availability
- 💰 No API quota usage

---

### Basic Request Interception

```typescript
// tests/api-mocking.spec.ts
import { test, expect } from '@playwright/test';

test('displays user data from mocked API', async ({ page }) => {
  // Intercept requests to /api/users
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'María González',
          email: 'maria@fpuna.edu.py',
          role: 'admin'
        },
        {
          id: 2,
          name: 'Carlos Ramírez',
          email: 'carlos@fpuna.edu.py',
          role: 'user'
        }
      ])
    });
  });

  // Navigate to page that calls /api/users
  await page.goto('/users');

  // Verify UI shows mocked data
  await expect(page.getByText('María González')).toBeVisible();
  await expect(page.getByText('carlos@fpuna.edu.py')).toBeVisible();
});
```

---

### Mocking Different Response Scenarios

```typescript
// tests/api-error-handling.spec.ts

test('handles API server error gracefully', async ({ page }) => {
  // Mock 500 Internal Server Error
  await page.route('**/api/products', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Internal Server Error' })
    });
  });

  await page.goto('/products');

  // Verify error message is shown
  await expect(page.getByText('Unable to load products')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
});

test('handles API timeout/network error', async ({ page }) => {
  // Abort the request (simulates network failure)
  await page.route('**/api/products', route => route.abort('failed'));

  await page.goto('/products');
  await expect(page.getByText('Network error. Please check your connection.')).toBeVisible();
});

test('handles empty API response', async ({ page }) => {
  // Mock empty array
  await page.route('**/api/products', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([])
    });
  });

  await page.goto('/products');
  await expect(page.getByText('No products found')).toBeVisible();
});
```

---

### Conditional Mocking (Modify Real Responses)

```typescript
test('modifies real API response', async ({ page }) => {
  await page.route('**/api/products', async (route) => {
    // Fetch the real response
    const response = await route.fetch();
    const json = await response.json();

    // Modify the data
    const modifiedData = json.map(product => ({
      ...product,
      price: product.price * 0.5  // Apply 50% discount
    }));

    // Return modified response
    await route.fulfill({
      response,
      json: modifiedData
    });
  });

  await page.goto('/products');
  // All prices should be 50% off
});
```

---

### Using OpenCode to Generate Mocking Code

**Prompt**:
```
Generate Playwright tests with API mocking for this scenario:

Page: /orders
API Endpoint: GET /api/orders
Expected Response: Array of order objects

Test scenarios:
1. Success: Display list of 3 orders
2. Error 500: Show error message
3. Empty: Show "No orders yet" message
4. Slow response (3 seconds): Show loading spinner

For each test:
- Mock the API appropriately
- Verify UI behavior
- Use TypeScript
- Follow Playwright best practices
```

**OpenCode Output**:
```typescript
import { test, expect } from '@playwright/test';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

test.describe('Orders Page API Integration', () => {
  test('displays list of orders successfully', async ({ page }) => {
    const mockOrders: Order[] = [
      {
        id: 'ORD-001',
        customer: 'Ana Martínez',
        total: 125000,
        status: 'completed',
        date: '2026-01-10'
      },
      {
        id: 'ORD-002',
        customer: 'José López',
        total: 89000,
        status: 'pending',
        date: '2026-01-12'
      },
      {
        id: 'ORD-003',
        customer: 'Laura Silva',
        total: 234000,
        status: 'completed',
        date: '2026-01-13'
      }
    ];

    await page.route('**/api/orders', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockOrders)
      });
    });

    await page.goto('/orders');

    // Verify all orders are displayed
    await expect(page.getByText('ORD-001')).toBeVisible();
    await expect(page.getByText('Ana Martínez')).toBeVisible();
    await expect(page.getByText('125.000 ₲')).toBeVisible();
  });

  test('shows error message on server error', async ({ page }) => {
    await page.route('**/api/orders', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Database connection failed' })
      });
    });

    await page.goto('/orders');

    await expect(page.getByRole('alert')).toContainText('Failed to load orders');
    await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
  });

  test('shows empty state when no orders', async ({ page }) => {
    await page.route('**/api/orders', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/orders');

    await expect(page.getByText('No orders yet')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Order' })).toBeVisible();
  });

  test('shows loading spinner during slow request', async ({ page }) => {
    await page.route('**/api/orders', async (route) => {
      // Simulate 3-second delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/orders');

    // Verify loading spinner appears
    await expect(page.getByTestId('loading-spinner')).toBeVisible();

    // Wait for data to load
    await expect(page.getByTestId('loading-spinner')).not.toBeVisible({ timeout: 5000 });
  });
});
```

---

## 1.2 Global Authentication Patterns

### The Authentication Problem

**Scenario**: You have 100 tests that require authentication.

**Naive Approach**:
```typescript
// ❌ BAD: Login before every test
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
});
```

**Problem**: 
- Each login takes 2-5 seconds
- 100 tests = 200-500 seconds wasted on login alone
- Slow CI/CD pipelines
- More opportunities for flakiness

---

### Solution: Storage State (Login Once, Reuse Everywhere)

**Concept**: 
1. Login once in a setup test
2. Save authentication state (cookies, localStorage)
3. Reuse that state in all other tests

**Time savings**: 200-500 seconds → 5 seconds

---

### Implementation Step-by-Step

#### Step 1: Configure Playwright for Auth

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    // Setup project - runs FIRST
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Authenticated tests - run AFTER setup
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use the saved authentication state
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'], // Wait for setup to complete
    },

    // Unauthenticated tests (for login page, public pages)
    {
      name: 'chromium-unauthenticated',
      use: {
        ...devices['Desktop Chrome'],
        // No storageState - starts logged out
      },
    },
  ],
});
```

---

#### Step 2: Create Authentication Setup File

```typescript
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate as standard user', async ({ page }) => {
  console.log('🔐 Setting up authentication...');

  // Navigate to login page
  await page.goto('/login');

  // Fill in credentials
  await page.getByLabel('Email').fill('test@fpuna.edu.py');
  await page.getByLabel('Password').fill('FPUNATest2026!');

  // Submit form
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for successful login
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();

  // Save authentication state
  await page.context().storageState({ path: authFile });

  console.log('✅ Authentication state saved');
});
```

---

#### Step 3: Create Folder Structure

```bash
# Create the auth directory
mkdir -p playwright/.auth

# Add to .gitignore (never commit auth tokens!)
echo "playwright/.auth/" >> .gitignore
```

---

#### Step 4: Use Authentication in Tests

```typescript
// tests/dashboard.spec.ts
import { test, expect } from '@playwright/test';

// This test runs with 'chromium' project (authenticated)
test('user can view dashboard', async ({ page }) => {
  // Already logged in! No login steps needed.
  await page.goto('/dashboard');

  await expect(page.getByText('Welcome back')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Profile' })).toBeVisible();
});

test('user can access settings', async ({ page }) => {
  // Still logged in from the same stored state
  await page.goto('/settings');

  await expect(page.getByText('Account Settings')).toBeVisible();
});
```

---

### Multiple User Roles

**Scenario**: You need to test different user roles (admin, user, guest).

**Solution**: Create multiple setup files and projects.

```typescript
// tests/auth.admin.setup.ts
setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@fpuna.edu.py');
  await page.getByLabel('Password').fill('AdminPass2026!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('/admin/dashboard');
  await page.context().storageState({ path: 'playwright/.auth/admin.json' });
});

// playwright.config.ts
projects: [
  {
    name: 'setup-admin',
    testMatch: /.*\.admin\.setup\.ts/,
  },
  {
    name: 'chromium-admin',
    use: {
      storageState: 'playwright/.auth/admin.json',
    },
    dependencies: ['setup-admin'],
  },
  {
    name: 'setup-user',
    testMatch: /.*\.user\.setup\.ts/,
  },
  {
    name: 'chromium-user',
    use: {
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup-user'],
  },
]
```

---

### Using OpenCode to Generate Auth Tests

**Prompt**:
```
Generate Playwright authentication setup for:

User Types:
1. Regular user (test@fpuna.edu.py / UserPass123!)
2. Admin user (admin@fpuna.edu.py / AdminPass123!)

Requirements:
- Create setup files for both user types
- Save storage state for reuse
- Create example tests using each role
- Include TypeScript types
- Follow Playwright best practices
```

---

## 1.3 Visual Regression Testing

### What is Visual Regression Testing?

**Definition**: Automatically comparing screenshots to detect unintended visual changes.

**Use Cases**:
- CSS changes breaking layout
- Font or color changes
- Responsive design issues
- Browser-specific rendering bugs

---

### How It Works

```
1. First Run (Baseline):
   - Take screenshots
   - Save as "golden" images
   - Store in __snapshots__ folder

2. Subsequent Runs:
   - Take new screenshots
   - Compare pixel-by-pixel with baseline
   - If different → Test fails
   - Review differences → Accept or reject
```

---

### Basic Visual Testing

```typescript
// tests/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  // Take screenshot and compare
  await expect(page).toHaveScreenshot('homepage.png');
});
```

**First run**:
```bash
npx playwright test --update-snapshots
# Creates: tests/visual/__snapshots__/homepage.spec.ts/homepage-chromium.png
```

**Subsequent runs**:
```bash
npx playwright test
# Compares current screenshot to saved baseline
# Fails if pixels differ
```

---

### Handling Dynamic Content

**Problem**: Timestamps, ads, random IDs change every run.

**Solution**: Mask dynamic elements.

```typescript
test('product page visual test', async ({ page }) => {
  await page.goto('/products/laptop-123');

  await expect(page).toHaveScreenshot('product-page.png', {
    // Mask elements that change
    mask: [
      page.locator('.timestamp'),        // "Updated 2 mins ago"
      page.locator('.random-ad'),        // Advertisement banner
      page.locator('.user-avatar'),      // Current user avatar
      page.locator('[data-test-id="csrf-token"]')
    ],
  });
});
```

---

### Screenshot Configuration Options

```typescript
await expect(page).toHaveScreenshot('page.png', {
  // Capture entire scrollable page
  fullPage: true,

  // Allow small differences (anti-aliasing, etc.)
  maxDiffPixels: 100,
  maxDiffPixelRatio: 0.01,  // 1% difference allowed

  // Per-pixel color difference threshold (0-1)
  threshold: 0.2,

  // Disable CSS animations for consistency
  animations: 'disabled',

  // Mask dynamic content
  mask: [page.locator('.dynamic-element')],

  // Scale (for high-DPI displays)
  scale: 'css',  // or 'device'
});
```

---

### Component-Level Visual Testing

```typescript
test('button component visual tests', async ({ page }) => {
  await page.goto('/styleguide');

  // Test primary button
  const primaryButton = page.getByRole('button', { name: 'Primary' });
  await expect(primaryButton).toHaveScreenshot('button-primary.png');

  // Test hover state
  await primaryButton.hover();
  await expect(primaryButton).toHaveScreenshot('button-primary-hover.png');

  // Test disabled state
  const disabledButton = page.getByRole('button', { name: 'Disabled' });
  await expect(disabledButton).toHaveScreenshot('button-disabled.png');
});
```

---

### Cross-Browser Visual Testing

```typescript
// playwright.config.ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

Playwright will generate separate baselines for each browser:
```
homepage-chromium.png
homepage-firefox.png
homepage-webkit.png
```

---

### Reviewing Visual Differences

When a visual test fails:

```bash
# Generate HTML report with visual diffs
npx playwright show-report

# Or open the diff image directly
open test-results/homepage-visual-regression-chromium/homepage-diff.png
```

**If the change is intentional**:
```bash
# Update baselines
npx playwright test --update-snapshots
```

---

## 1.4 Advanced Selectors & Locator Strategies

### Why Selectors Matter

**Bad selector**: Brittle, breaks on small changes
```typescript
page.locator('div.container > div:nth-child(2) > button.btn-primary')
```

**Good selector**: Resilient, semantic, user-focused
```typescript
page.getByRole('button', { name: 'Add to Cart' })
```

---

### Playwright Locator Hierarchy (Best → Worst)

1. **getByRole** - Semantic, accessible
2. **getByLabel** - For form fields
3. **getByPlaceholder** - For inputs without labels
4. **getByText** - For unique text content
5. **getByTestId** - For dynamic content
6. **CSS/XPath** - Last resort

---

### Filtering Locators

```typescript
// Multiple buttons with same text - filter by context
await page.getByRole('button', { name: 'Delete' })
  .filter({ hasText: 'Permanently' })
  .click();

// Find product card containing "iPhone" and click its "Buy" button
const productCard = page.locator('.product-card')
  .filter({ hasText: 'iPhone 15 Pro' });

await productCard.getByRole('button', { name: 'Add to Cart' }).click();
await expect(productCard.getByText('Added to cart')).toBeVisible();
```

---

### Chaining Locators

```typescript
// Navigate complex DOM structures
const userRow = page.getByRole('row').filter({ hasText: 'john@example.com' });
await userRow.getByRole('button', { name: 'Edit' }).click();

// Within a specific section
const sidebar = page.locator('aside.sidebar');
await sidebar.getByRole('link', { name: 'Settings' }).click();
```

---

### Working with Lists

```typescript
// First, second, last items
await page.getByRole('listitem').first().click();
await page.getByRole('listitem').nth(2).click();  // 3rd item (0-indexed)
await page.getByRole('listitem').last().click();

// Count items
const itemCount = await page.getByRole('listitem').count();
expect(itemCount).toBe(10);

// Iterate over items
const items = await page.getByRole('listitem').all();
for (const item of items) {
  const text = await item.textContent();
  console.log(text);
}
```

---

## 1.5 Handling Complex UI Patterns

### Browser Dialogs

```typescript
test('confirms deletion with dialog', async ({ page }) => {
  // Set up dialog handler BEFORE triggering it
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('Are you sure you want to delete');
    await dialog.accept();  // Click "OK"
    // or: await dialog.dismiss();  // Click "Cancel"
  });

  await page.getByRole('button', { name: 'Delete Account' }).click();

  // Dialog was handled automatically
  await expect(page.getByText('Account deleted successfully')).toBeVisible();
});
```

---

### iFrames

```typescript
test('fills payment form in iframe', async ({ page }) => {
  await page.goto('/checkout');

  // Locate the iframe
  const paymentFrame = page.frameLocator('iframe[name="stripe-payment"]');

  // Interact within the iframe
  await paymentFrame.getByLabel('Card Number').fill('4242 4242 4242 4242');
  await paymentFrame.getByLabel('Expiry').fill('12/25');
  await paymentFrame.getByLabel('CVC').fill('123');
  await paymentFrame.getByRole('button', { name: 'Pay Now' }).click();

  // Back in main page
  await expect(page.getByText('Payment successful')).toBeVisible();
});
```

---

### Shadow DOM

```typescript
test('interacts with web component', async ({ page }) => {
  await page.goto('/custom-components');

  // Playwright pierces shadow DOM automatically
  await page.locator('my-custom-dropdown').getByText('Option 2').click();

  // Or explicitly pierce shadow root
  await page.locator('my-custom-dropdown >> shadow=.dropdown-menu >> text=Option 2').click();
});
```

---

### File Uploads

```typescript
test('uploads file', async ({ page }) => {
  await page.goto('/upload');

  // Upload single file
  await page.getByLabel('Upload file').setInputFiles('path/to/file.pdf');

  // Upload multiple files
  await page.getByLabel('Upload files').setInputFiles([
    'file1.jpg',
    'file2.jpg',
    'file3.jpg'
  ]);

  // Clear file input
  await page.getByLabel('Upload file').setInputFiles([]);
});
```

---

## 1.6 Performance Optimization & CI/CD Integration

### Test Execution Speed Matters

**Slow tests** = Slow feedback = Developers don't run them

**Goal**: Sub-5-minute test suite execution

---

### Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  // Run tests in parallel
  workers: process.env.CI ? 2 : 4,  // Fewer workers on CI (limited resources)
  fullyParallel: true,  // Parallelize tests within files

  // Fail fast on CI
  maxFailures: process.env.CI ? 10 : undefined,
});
```

---

### Avoid Fixed Waits

```typescript
// ❌ BAD: Fixed timeout (waste time)
await page.waitForTimeout(3000);  // Always waits 3 seconds
await page.click('button');

// ✅ GOOD: Wait for condition (proceeds as soon as ready)
await page.getByRole('button', { name: 'Submit' }).click();
// Implicit wait - proceeds when element is actionable
```

---

### Reuse Browser Contexts

```typescript
test.describe('Shopping cart', () => {
  test.beforeEach(async ({ page }) => {
    // Setup runs once per test (reuses browser context)
    await page.goto('/shop');
    await page.getByRole('button', { name: 'Add Item' }).click();
  });

  test('can increase quantity', async ({ page }) => { /* ... */ });
  test('can remove item', async ({ page }) => { /* ... */ });
  test('can apply coupon', async ({ page }) => { /* ... */ });
});
```

---

## Week 4 Practical Exercises

### Exercise 1.1: API Mocking Suite (90 minutes)

**Objective**: Create comprehensive API mocking tests

**Scenario**: You're testing an e-commerce product listing page that fetches data from `/api/products`.

**Tasks**:

1. **Setup** (10 min):
   - Create `tests/products-api.spec.ts`
   - Define Product interface

2. **Test Success Scenario** (20 min):
   - Mock successful API response with 5 products
   - Verify all products display correctly
   - Check prices, images, names

3. **Test Error Scenarios** (30 min):
   - 500 Server Error - verify error message
   - 404 Not Found - verify "no products" state
   - Network timeout - verify loading behavior
   - Empty array - verify empty state

4. **Test Edge Cases** (20 min):
   - Product with missing image
   - Product with very long name
   - Product with price = 0

5. **Use OpenCode** (10 min):
   - Generate additional test cases with OpenCode
   - Add tests for search/filter functionality

**Deliverable**:
- Complete test file with 10+ test cases
- All tests passing
- TypeScript types defined

---

### Exercise 1.2: Authentication Setup (75 minutes)

**Objective**: Implement global authentication for your capstone project

**Tasks**:

1. **Configure Playwright** (15 min):
   - Update `playwright.config.ts`
   - Add setup and authenticated projects

2. **Create Auth Setup** (20 min):
   - Create `tests/auth.setup.ts`
   - Implement login flow
   - Save storage state

3. **Create Authenticated Tests** (25 min):
   - Create 3 tests that require authentication
   - Verify they use stored auth state
   - Measure time savings vs manual login

4. **Add Admin Role** (15 min):
   - Create `tests/auth.admin.setup.ts`
   - Add admin-specific tests

**Deliverable**:
- Working authentication system
- 5+ authenticated tests
- Timing comparison document

---

### Exercise 1.3: Visual Regression Suite (60 minutes)

**Objective**: Create visual regression tests for key pages

**Tasks**:

1. **Setup Visual Tests** (10 min):
   - Create `tests/visual/` directory
   - Configure screenshot options

2. **Create Page Tests** (30 min):
   - Homepage visual test
   - Product page visual test
   - Checkout page visual test
   - Mask dynamic elements

3. **Component Tests** (15 min):
   - Button states (normal, hover, disabled)
   - Form inputs
   - Modal dialogs

4. **Generate Baselines** (5 min):
   - Run with `--update-snapshots`
   - Review generated images

**Deliverable**:
- 5+ visual regression tests
- Baseline screenshots
- Documentation of masked elements

---

## Knowledge Check Quiz

1. **Why is API mocking important in automated testing?**
   a) It makes tests run slower
   b) It requires more setup code
   c) It makes tests faster and more reliable
   d) It's only needed for integration tests

2. **What does `route.fulfill()` do in Playwright?**
   a) Completes a database transaction
   b) Mocks an API response
   c) Submits a form
   d) Closes the browser

3. **What is storage state used for?**
   a) Saving test results
   b) Storing screenshots
   c) Reusing authentication across tests
   d) Caching page content

4. **When should you update visual regression baselines?**
   a) After every test run
   b) Never
   c) When intentional UI changes are made
   d) Only on Fridays

5. **Which locator is most resilient?**
   a) `page.locator('div > button:nth-child(2)')`
   b) `page.locator('#btn-123')`
   c) `page.getByRole('button', { name: 'Submit' })`
   d) `page.locator('.btn.btn-primary')`

**Answer Key**: [1-c, 2-b, 3-c, 4-c, 5-c]

---

## Week 4 Summary

This week, you mastered:

### Key Concepts
- ✅ Network interception and API mocking
- ✅ Global authentication with storage state
- ✅ Visual regression testing
- ✅ Advanced selectors and locators
- ✅ Complex UI pattern handling
- ✅ Test performance optimization

### Skills Developed
- ✅ Mock any API for isolated testing
- ✅ Implement efficient authentication patterns
- ✅ Catch visual bugs automatically
- ✅ Write resilient, maintainable selectors
- ✅ Handle real-world UI complexity
- ✅ Optimize for CI/CD pipelines

### Practical Applications
- ✅ Can test without backend dependencies
- ✅ Can run 100+ tests in minutes
- ✅ Can detect unintended UI changes
- ✅ Ready for production-scale test automation

---

## Next Week: Module 2 - AI-Powered Test Generation

**Week 5 Preview**:
- Generating complete test suites with OpenCode
- Data-driven testing at scale
- Test maintenance strategies
- Dealing with flaky tests
- Refactoring test code

---

## Additional Resources

### Playwright Documentation
- [Network Interception](https://playwright.dev/docs/network)
- [Authentication](https://playwright.dev/docs/auth)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)

### OpenCode Patterns
- [Test Generation Patterns](https://opencode.dev/docs/testing)
- [Mocking Strategies](https://opencode.dev/docs/api-mocking)

### Practice Projects
- [E-Commerce Test Suite Example](https://github.com/fpuna-summer-2026/qa-examples)
- [Banking App Tests](https://github.com/fpuna-summer-2026/banking-tests)

---

**Module Status**: ✅ Week 4 Complete

**Next Module**: [QA Track Module 2 - AI-Powered Test Generation](./QA-TRACK-MODULE-02.md)
