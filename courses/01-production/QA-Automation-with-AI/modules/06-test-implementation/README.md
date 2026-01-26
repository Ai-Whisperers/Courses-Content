# Module 6: Implementing Tests with AI

## Duration: 8 hours

## Learning Objectives

By the end of this module, you will be able to:
- Generate unit tests from test plans
- Create integration tests for APIs
- Build E2E tests with Playwright
- Debug failing tests with AI assistance

---

## 6.1 From Test Plan to Code

### Implementation Workflow

```
Test Plan → Select Test Case → Generate Code → Review → Refine → Run → Commit
```

### Selecting What to Implement First

1. P0 tests (critical path)
2. Tests for new/changed code
3. Tests for bug-prone areas
4. Tests that unblock others

---

## 6.2 Generating Unit Tests

### Basic Unit Test Prompt

```
Generate [framework] unit tests for this function:

```[language]
[paste function code]
```

Requirements:
- Test happy path
- Test error cases
- Test edge cases
- Mock dependencies: [list]
- Use descriptive test names
- Follow AAA pattern
```

### Advanced Unit Test Prompt

```
Generate comprehensive unit tests for [class/module].

Source code:
```[language]
[paste code]
```

Include:
1. **Setup/Teardown**
   - Shared fixtures
   - Mock configuration
   - Cleanup

2. **Happy Path Tests**
   - Normal operations
   - Valid inputs
   - Expected outputs

3. **Error Handling**
   - Invalid inputs
   - Missing data
   - Exception scenarios

4. **Edge Cases**
   - Boundary values
   - Empty/null
   - Maximum values

5. **State Tests**
   - Before/after state
   - Side effects
   - Event emissions

Mock these: [dependencies]
Test naming: [convention]
Coverage target: [percentage]
```

### Example: User Service Tests

```javascript
// Prompt result for UserService

describe('UserService', () => {
  let service;
  let mockDb;

  beforeEach(() => {
    mockDb = {
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    };
    service = new UserService(mockDb);
  });

  describe('createUser', () => {
    const validData = {
      email: 'test@example.com',
      password: 'SecurePass123'
    };

    it('should create user with valid data', async () => {
      mockDb.create.mockResolvedValue({ id: '123', ...validData });

      const result = await service.createUser(validData);

      expect(result.id).toBe('123');
      expect(mockDb.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: validData.email })
      );
    });

    it('should throw for invalid email', async () => {
      await expect(
        service.createUser({ ...validData, email: 'invalid' })
      ).rejects.toThrow('Invalid email');
    });

    // ... more tests
  });
});
```

---

## 6.3 Generating Integration Tests

### API Integration Test Prompt

```
Generate integration tests for this API endpoint:

Endpoint: [METHOD] [path]
Handler: [file location]
Dependencies: [database, services, etc.]

Test scenarios:
1. Success case with valid request
2. Validation errors (400)
3. Authentication errors (401)
4. Authorization errors (403)
5. Not found errors (404)
6. Server errors (500)

Requirements:
- Use [supertest/httpx/etc]
- Real database (test DB)
- Clean up after each test
- Test response structure
- Test side effects (DB changes)
```

### Example: API Integration Test

```javascript
const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('POST /api/users', () => {
  beforeEach(async () => {
    await db.migrate.latest();
  });

  afterEach(async () => {
    await db('users').truncate();
  });

  it('should create user and return 201', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'SecurePass123'
      })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      email: 'test@example.com'
    });

    // Verify database
    const user = await db('users')
      .where('email', 'test@example.com')
      .first();
    expect(user).toBeDefined();
  });

  it('should return 400 for invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'invalid',
        password: 'SecurePass123'
      })
      .expect(400);

    expect(response.body.error).toContain('email');
  });
});
```

---

## 6.4 Generating E2E Tests

### Playwright E2E Prompt

```
Generate Playwright E2E tests for [user flow].

Flow: [describe step by step]

Page elements:
- [element]: data-testid="[id]"
- [element]: data-testid="[id]"

Requirements:
- Use Page Object Model
- Use data-testid selectors
- Test happy path
- Test error states
- Include visual assertions
- Handle loading states
- Test on [browsers]
```

### Example: Login E2E Test

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="login-btn"]');
  }

  async expectError(message: string) {
    await expect(
      this.page.locator('[data-testid="error"]')
    ).toHaveText(message);
  }
}

// tests/login.spec.ts
test.describe('Login', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@test.com', 'password123');

    await expect(page).toHaveURL('/dashboard');
  });

  test('invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@test.com', 'wrong');

    await loginPage.expectError('Invalid credentials');
  });
});
```

---

## 6.5 Debugging Failing Tests

### Debug Prompt Template

```
This test is failing:

**Test code**:
```[language]
[test code]
```

**Error**:
```
[error message and stack trace]
```

**Source code**:
```[language]
[relevant source code]
```

Please:
1. Explain why it's failing
2. Is it a test bug or code bug?
3. Provide the fix
4. Explain how to prevent this
```

### Common Issues and Fixes

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Timeout | Async not awaited | Add await |
| Undefined | Mock not set up | Configure mock |
| Wrong value | Logic error | Check implementation |
| Flaky | Race condition | Add proper waits |

---

## 6.6 Test Helpers and Utilities

### Generating Test Utilities

```
Create test utilities for this project:

1. **Factories**
   - User factory
   - [Other model] factory
   - With relationship support

2. **Fixtures**
   - Database seeding
   - Common test data

3. **Helpers**
   - Authentication helper
   - API request helper
   - Assertion helpers

4. **Mocks**
   - External API mocks
   - Service mocks

Use [faker/factory library] for data generation.
```

---

## 6.7 Hands-On Exercises

### Exercise 6.1: Unit Tests

**Objective**: Implement unit tests from test plan

**Steps**:
1. Select 3 functions from your test plan
2. Generate unit tests for each
3. Review for quality
4. Run and fix any issues
5. Check coverage

**Deliverable**: Unit tests with 80%+ coverage

**Time**: 90 minutes

---

### Exercise 6.2: Integration Tests

**Objective**: Create API integration tests

**Steps**:
1. Select 2 API endpoints
2. Generate integration tests
3. Set up test database
4. Run tests
5. Verify database changes

**Deliverable**: Working integration tests

**Time**: 90 minutes

---

### Exercise 6.3: E2E Tests

**Objective**: Build E2E tests with Playwright

**Steps**:
1. Select a user flow
2. Create Page Objects
3. Generate test scenarios
4. Run across browsers
5. Add visual tests

**Deliverable**: E2E test suite

**Time**: 90 minutes

---

## Knowledge Check

1. What's the workflow from test plan to code?
2. What should unit test prompts include?
3. How do integration tests differ from unit tests?
4. What is Page Object Model?
5. How do you debug a failing test with AI?

---

## Summary

In this module, you learned:
- How to generate unit tests
- How to create integration tests
- How to build E2E tests
- How to debug failures
- How to create test utilities

---

## Next Steps

Proceed to **Module 7: Test Validation and Quality Assurance** to review and improve your tests.

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
