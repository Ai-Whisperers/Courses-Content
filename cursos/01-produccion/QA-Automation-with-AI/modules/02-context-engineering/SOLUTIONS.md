# Module 2 Solutions: Context Engineering

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Part 1: CLAUDE.md File

### Sample Solution

```markdown
# Project: TechShop E-Commerce Platform

## Overview
Full-featured e-commerce platform for selling electronics and tech accessories. Features include product catalog, user accounts, shopping cart, checkout with payment processing, and order management.

## Tech Stack
- **Frontend:** React 18 with TypeScript
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Playwright for E2E, Jest for unit/integration
- **CI/CD:** GitHub Actions

## Architecture
```
src/
├── components/     # React components
├── pages/          # Page components (Next.js style routing)
├── api/            # Backend API routes
├── services/       # Business logic
├── models/         # Database models (Prisma)
├── utils/          # Shared utilities
└── tests/          # Test files mirror src/ structure
```

## Code Conventions
- TypeScript strict mode enabled
- Functional components with hooks (no class components)
- Named exports for components
- Absolute imports using `@/` prefix
- ESLint + Prettier for formatting
- Conventional commits for git messages

## Testing Requirements
- **Framework:** Playwright for E2E, Jest for unit tests
- **Pattern:** Page Object Model for E2E tests
- **Coverage:** Minimum 80% for services, 60% overall
- **Naming:** `test_<feature>_<scenario>_<expected>`
- **Selectors:** Use `data-testid` attributes only
- **Parallelization:** All tests must support parallel execution
- **Mocking:** Mock external APIs, use test database for integration

## Important Files
- `src/services/auth.ts` - Authentication logic
- `src/services/cart.ts` - Shopping cart operations
- `src/services/checkout.ts` - Payment processing
- `prisma/schema.prisma` - Database schema
- `playwright.config.ts` - E2E test configuration

## Current Focus
Building test coverage for the checkout flow:
- Cart total calculations
- Discount code validation
- Payment gateway integration
- Order confirmation emails

When generating tests, focus on edge cases and error handling.
```

### Grading Rubric

| Criteria | Points | Notes |
|----------|--------|-------|
| Project description clear | 5 | Should explain what the project does |
| Tech stack complete | 5 | All major technologies listed |
| Architecture documented | 5 | Directory structure or diagram |
| Code conventions specified | 5 | Naming, formatting, patterns |
| Testing requirements detailed | 5 | Framework, patterns, coverage |
| Important files identified | 3 | Key files for testing focus |
| Current focus stated | 2 | What to prioritize |
| **Total** | **30** | |

---

## Part 2: Effective Prompts

### Exercise 2.1: Why Prompt B is Better

**Sample Answer (minimum 3 reasons):**

1. **Specifies the testing framework** - Prompt B says "Playwright test" so Claude knows exactly what syntax and patterns to use. Prompt A could generate tests in any framework.

2. **Lists specific test scenarios** - Prompt B enumerates exactly what to test (valid login, invalid login, empty fields). Prompt A leaves this entirely to Claude's interpretation.

3. **Specifies technical requirements** - Prompt B requires data-testid selectors and Page Object Model pattern. These are crucial for maintainability but Prompt A would likely get CSS selectors.

4. **Defines success/error states** - Prompt B asks for assertions on both success and error states. Prompt A might only test happy path.

5. **Sets clear boundaries** - The specific scenarios prevent Claude from generating too many or too few tests.

### Exercise 2.2: Shopping Cart Prompt

**Sample Solution:**

```
Generate Playwright E2E tests for shopping cart functionality with these requirements:

Context:
- E-commerce site with React frontend
- Cart persists in localStorage and syncs to backend when logged in
- Products have: id, name, price, quantity, maxQuantity

Test Scenarios:
1. Add item to empty cart
   - Verify cart icon updates
   - Verify item appears in cart drawer

2. Update item quantity
   - Increase quantity (verify total updates)
   - Decrease quantity to 0 (verify item removed)
   - Try to exceed maxQuantity (verify error message)

3. Remove item from cart
   - Verify item removed
   - Verify cart total recalculates

4. Cart persistence
   - Add items, refresh page, verify items remain
   - Add items logged out, login, verify cart merges

5. Edge cases
   - Add same item twice (should increase quantity)
   - Empty cart (verify "Your cart is empty" message)

Technical Requirements:
- Use Page Object Model with CartPage class
- Use data-testid selectors
- Include proper wait conditions before assertions
- Group with describe blocks by feature

Output format:
- Separate test file: cart.spec.ts
- Include CartPage class at top
- Comments explaining each test scenario
```

### Exercise 2.2: User Registration API Prompt

**Sample Solution:**

```
Generate Jest integration tests for the user registration API endpoint.

Endpoint: POST /api/users/register
Request body: { email: string, password: string, name: string }
Success response: 201 { user: { id, email, name }, token: string }
Error responses:
- 400 for validation errors
- 409 for duplicate email

Test Scenarios:

1. Success cases:
   - Valid registration returns 201 with user and token
   - Password is not included in response
   - Token is valid JWT

2. Validation errors (400):
   - Missing email
   - Invalid email format
   - Missing password
   - Password too short (< 8 chars)
   - Password missing uppercase
   - Missing name
   - Name too short (< 2 chars)

3. Conflict errors (409):
   - Email already registered
   - Email case-insensitive (Test@email.com = test@email.com)

4. Edge cases:
   - Email with leading/trailing spaces (should trim)
   - Very long valid inputs (boundary testing)
   - SQL injection attempt in email field
   - XSS attempt in name field

Technical Requirements:
- Use supertest for HTTP calls
- Use factory functions for test data
- Clean up created users in afterEach
- Mock email service (don't send real emails)
- Group tests with describe blocks by category

Output format:
- Include test data factories at top
- Use async/await syntax
- Include setup/teardown hooks
```

---

## Part 3: Iterative Refinement

### Exercise 3.1: Issues with Sample Test

**Sample Answer (minimum 5 issues):**

1. **Uses CSS selectors** - `#username`, `#password`, and `button` are fragile. Should use `data-testid` selectors.

2. **No wait conditions** - The test doesn't wait for the page to load or for elements to be ready before interacting.

3. **Vague test name** - "login test" doesn't describe what's being tested. Should be "should redirect to dashboard after successful login".

4. **Hardcoded credentials** - `'user'` and `'pass'` should come from test fixtures or environment variables.

5. **No negative assertions** - Only tests happy path. No verification of what happens with wrong credentials.

6. **No error handling** - If any step fails, we won't know why. Should have more specific assertions.

7. **No cleanup** - Doesn't handle state before/after (is user already logged in?).

8. **Button selector too generic** - `button` could match multiple buttons on the page.

9. **Missing Page Object Model** - Selectors and actions should be in a LoginPage class for reusability.

10. **No explicit wait before URL check** - Navigation might not complete instantly.

### Exercise 3.2: Refinement Prompts

**Sample Refinement Prompts:**

```
1. "Replace CSS selectors with data-testid selectors. Use:
   - [data-testid='username-input']
   - [data-testid='password-input']
   - [data-testid='login-button']"

2. "Add proper wait conditions:
   - Wait for login form to be visible before filling
   - Wait for navigation to complete after clicking
   - Add timeout handling"

3. "Rename the test to be descriptive:
   'should redirect to dashboard after successful login with valid credentials'"

4. "Extract credentials to a test fixture or constant:
   const TEST_USER = { username: 'testuser', password: 'TestPass123!' }"

5. "Wrap selectors in a LoginPage class following Page Object Model pattern"

6. "Add assertion for error state:
   - Verify error message appears for invalid credentials
   - Verify user stays on login page"
```

### Exercise 3.3: Final Improved Version

**Sample Solution:**

```typescript
import { test, expect } from '@playwright/test';

// Page Object
class LoginPage {
  constructor(private page) {}

  async goto() {
    await this.page.goto('/login');
    await this.page.waitForSelector('[data-testid="login-form"]');
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-testid="username-input"]', username);
    await this.page.fill('[data-testid="password-input"]', password);
    await this.page.click('[data-testid="login-button"]');
  }

  async getErrorMessage() {
    const error = this.page.locator('[data-testid="error-message"]');
    return error.textContent();
  }
}

// Test Data
const VALID_USER = {
  username: process.env.TEST_USERNAME || 'testuser',
  password: process.env.TEST_PASSWORD || 'TestPass123!'
};

const INVALID_USER = {
  username: 'wronguser',
  password: 'wrongpass'
};

// Tests
test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    // Act
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    // Assert
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    // Act
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);

    // Assert
    await expect(page).toHaveURL('/login');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid username or password');
  });

  test('should show validation error for empty fields', async ({ page }) => {
    // Act
    await loginPage.login('', '');

    // Assert
    await expect(page.locator('[data-testid="username-error"]')).toHaveText('Username is required');
    await expect(page.locator('[data-testid="password-error"]')).toHaveText('Password is required');
  });
});
```

---

## Quiz Answer Key

See QUIZ.md for the full answer key with explanations.

---

## Common Student Mistakes

1. **Too brief CLAUDE.md** - Students often write 1-2 sentences per section. Encourage more detail, especially in Testing Requirements.

2. **Forgetting edge cases** - Prompts often only cover happy path. Push for error scenarios.

3. **Not using Page Object Model** - Even when specified, students skip it to save time. Emphasize maintainability.

4. **Vague refinement prompts** - "Make it better" doesn't help. Teach specific, actionable refinements.

5. **Not testing the tests** - Students submit tests without running them. Require passing tests for full credit.
