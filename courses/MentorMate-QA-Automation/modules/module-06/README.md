# Module 6: Test Implementation with AI - Presentation Slides

**Duration**: 8 hours (including exercises)
**Total Slides**: 55

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Slide 1 of 55: Title Slide

# Module 6: Test Implementation with AI

**From Test Plans to Production-Ready Code**

Instructor: [Your Name]
Duration: 8 hours

---

## Slide 2 of 55: Learning Objectives

By the end of this module, you will be able to:

- Generate comprehensive unit tests with proper mocking
- Create API integration tests with database verification
- Build E2E tests using Playwright and Page Object Model
- Debug failing tests with AI assistance
- Achieve 90%+ code coverage efficiently

---

## Slide 3 of 55: Module Agenda

1. **From Test Plan to Code** (45 min)
2. **Unit Test Generation** (90 min)
3. **Integration Test Implementation** (90 min)
4. **E2E Test Development** (90 min)
5. **Debugging with AI** (45 min)
6. **Test Utilities and Helpers** (30 min)
7. **Hands-On Exercises** (240 min)

---

## Slide 4 of 55: Section 1 - From Test Plan to Code

# Part 1: The Implementation Workflow

**Transforming plans into executable tests**

---

## Slide 5 of 55: The Complete Workflow

```
Test Plan
    ↓
Select Test Case (by priority)
    ↓
Generate Code with AI
    ↓
Review Quality
    ↓
Refine (add edge cases, strengthen assertions)
    ↓
Run Tests
    ↓
Debug Failures
    ↓
Commit
    ↓
Repeat
```

---

## Slide 6 of 55: Selecting What to Implement First

**Priority Order:**

1. **P0 Tests** - Critical path, blocking issues
2. **Tests for New/Changed Code** - Highest risk
3. **Tests for Bug-Prone Areas** - Historical issues
4. **Tests That Unblock Others** - Dependencies

**Strategy**: Maximize risk reduction per hour invested

---

## Slide 7 of 55: The Testing Pyramid

```
      ┌───────────┐
      │    E2E    │  Few (10-20 scenarios)
      │  (Slow)   │  Full user journeys
      ├───────────┤
      │Integration│  Some (50-100 tests)
      │ (Medium)  │  API + Database
      ├───────────┤
      │   Unit    │  Many (100-500 tests)
      │  (Fast)   │  Business logic
      └───────────┘
```

**Rule**: More unit tests, fewer E2E tests

---

## Slide 8 of 55: Test Quality Criteria

Every test should be:

✅ **Fast** - Unit tests <100ms, Integration <1s
✅ **Isolated** - No dependencies on other tests
✅ **Repeatable** - Same result every time
✅ **Self-validating** - Clear pass/fail
✅ **Timely** - Written with or before code

**FIRST** principle

---

## Slide 9 of 55: Section 2 - Unit Test Generation

# Part 2: Generating Unit Tests

**Testing individual units in isolation**

---

## Slide 10 of 55: What Are Unit Tests?

**Definition**: Tests that verify a single "unit" of code in isolation

**Characteristics**:
- Fast (milliseconds)
- No external dependencies
- Test one thing
- Use mocks for dependencies

**Example Units**: Functions, methods, classes

---

## Slide 11 of 55: The AAA Pattern

```javascript
test('should create user with valid data', async () => {
  // ARRANGE - Set up test data and mocks
  const userData = { name: 'Test', email: 'test@test.com' };
  mockDb.create.mockResolvedValue({ id: '123', ...userData });

  // ACT - Execute the function being tested
  const result = await userService.createUser(userData);

  // ASSERT - Verify the results
  expect(result.id).toBe('123');
  expect(mockDb.create).toHaveBeenCalledWith(userData);
});
```

---

## Slide 12 of 55: Basic Unit Test Prompt

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

---

## Slide 13 of 55: Advanced Unit Test Prompt

```
Generate comprehensive unit tests for [class/module].

Source code:
```[language]
[paste code]
```

Include:
1. Setup/Teardown with shared fixtures
2. Happy Path Tests (normal operations)
3. Error Handling (invalid inputs, exceptions)
4. Edge Cases (boundary values, empty/null)
5. State Tests (before/after, side effects)

Mock these: [dependencies]
Test naming: [convention]
Coverage target: [percentage]
```

---

## Slide 14 of 55: Example: UserService Tests

```javascript
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
    it('should create user with valid data', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'SecurePass123'
      };
      mockDb.create.mockResolvedValue({ id: '123', ...validData });

      const result = await service.createUser(validData);

      expect(result.id).toBe('123');
      expect(mockDb.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: validData.email })
      );
    });
  });
});
```

---

## Slide 15 of 55: When to Mock

**Mock These:**
- Database calls
- API/HTTP requests
- File system operations
- External services (email, payment)
- Time/Date functions
- Random number generators

**Don't Mock:**
- The code being tested
- Simple utilities (unless slow)
- Value objects
- Data structures

---

## Slide 16 of 55: Mocking Strategies

**1. Return Values**
```javascript
mockService.getData.mockResolvedValue({ id: 1, name: 'Test' });
```

**2. Throw Errors**
```javascript
mockService.getData.mockRejectedValue(new Error('Not found'));
```

**3. Custom Implementation**
```javascript
mockService.process.mockImplementation((data) => {
  return data.length > 0 ? 'success' : 'empty';
});
```

**4. Call Tracking**
```javascript
expect(mockService.save).toHaveBeenCalledWith(expectedData);
expect(mockService.save).toHaveBeenCalledTimes(1);
```

---

## Slide 17 of 55: Strong vs Weak Assertions

**Weak (❌):**
```javascript
expect(user).toBeDefined();
expect(user).toBeTruthy();
expect(result.length).toBeGreaterThan(0);
```

**Strong (✅):**
```javascript
expect(user).toMatchObject({
  id: expect.any(Number),
  email: 'test@example.com',
  createdAt: expect.any(Date)
});
expect(result).toEqual([1, 2, 3]);
```

---

## Slide 18 of 55: Section 3 - Integration Test Implementation

# Part 3: Integration Tests

**Testing components working together**

---

## Slide 19 of 55: What Are Integration Tests?

**Definition**: Tests that verify multiple components working together

**Characteristics**:
- Slower than unit tests (<1s each)
- Use real dependencies (database, etc.)
- Test interactions between components
- Verify end-to-end data flow

**Example**: API endpoint + database + business logic

---

## Slide 20 of 55: Integration Test Scope

```
┌─────────────────────────────────┐
│       API Endpoint Handler      │
│              ↓↑                 │
│       Business Logic Layer      │ ← All tested together
│              ↓↑                 │
│         Database Layer          │
└─────────────────────────────────┘

Mocked:
- External APIs
- Email services
- Payment gateways
```

---

## Slide 21 of 55: API Integration Test Prompt

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

---

## Slide 22 of 55: Example: API Integration Test

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
});
```

---

## Slide 23 of 55: Test Database Setup

**Options:**

1. **Separate Test Database**
   ```javascript
   const db = knex({
     client: 'postgresql',
     connection: process.env.TEST_DATABASE_URL
   });
   ```

2. **In-Memory Database**
   ```javascript
   const db = knex({
     client: 'sqlite3',
     connection: ':memory:'
   });
   ```

3. **Docker Container**
   ```bash
   docker run -d -p 5433:5432 postgres:14
   ```

**Best Practice**: Use same DB type as production

---

## Slide 24 of 55: Database Test Patterns

**Pattern 1: Truncate After Each Test**
```javascript
afterEach(async () => {
  await db('users').truncate();
});
```

**Pattern 2: Transaction Rollback**
```javascript
beforeEach(async () => {
  await db.raw('BEGIN');
});
afterEach(async () => {
  await db.raw('ROLLBACK');
});
```

**Pattern 3: Fresh Database**
```javascript
beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
```

---

## Slide 25 of 55: Testing API Responses

**Test the full response:**

```javascript
const response = await request(app)
  .post('/api/users')
  .send(userData);

// Status code
expect(response.status).toBe(201);

// Headers
expect(response.headers['content-type'])
  .toMatch(/application\/json/);

// Body structure
expect(response.body).toMatchObject({
  id: expect.any(Number),
  email: userData.email
});

// No sensitive data leaked
expect(response.body.password).toBeUndefined();
```

---

## Slide 26 of 55: Section 4 - E2E Test Development

# Part 4: End-to-End Testing

**Testing complete user journeys**

---

## Slide 27 of 55: What Are E2E Tests?

**Definition**: Tests that verify complete user workflows through the UI

**Characteristics**:
- Slowest (seconds per test)
- No mocking (test real system)
- Browser automation
- Full stack integration

**Example**: Login → Browse products → Add to cart → Checkout → Verify order

---

## Slide 28 of 55: Why Playwright?

**Advantages:**
- Fast and reliable
- Auto-waiting (no manual waits)
- Multiple browser support
- Great debugging tools
- TypeScript support
- Mobile emulation

**Others:** Cypress, Selenium, Puppeteer

---

## Slide 29 of 55: Page Object Model (POM)

**Concept**: Separate page interactions from test logic

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
```

---

## Slide 30 of 55: Page Object Benefits

**Without POM:**
```typescript
test('login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.fill('#password', 'pass');
  await page.click('button[type="submit"]');
  // Repeated in every test
});
```

**With POM:**
```typescript
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@test.com', 'pass');
  // Reusable, maintainable
});
```

**Benefits**: Reusability, maintenance, readability

---

## Slide 31 of 55: Playwright E2E Prompt

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

---

## Slide 32 of 55: E2E Test Example

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@test.com', 'password123');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toHaveText('Dashboard');
  });

  test('invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong@test.com', 'wrong');

    await loginPage.expectError('Invalid credentials');
    await expect(page).toHaveURL('/login');
  });
});
```

---

## Slide 33 of 55: Selector Best Practices

**Priority (best to worst):**

1. **data-testid** ✅
   ```typescript
   page.locator('[data-testid="login-button"]')
   ```

2. **ARIA labels** ✅
   ```typescript
   page.getByRole('button', { name: 'Login' })
   ```

3. **Text content** ⚠️
   ```typescript
   page.getByText('Login')
   ```

4. **CSS classes** ❌
   ```typescript
   page.locator('.btn-primary')  // Fragile
   ```

5. **XPath** ❌❌
   ```typescript
   page.locator('//div[@class="form"]/button[1]')  // Very fragile
   ```

---

## Slide 34 of 55: Handling Loading States

**Problem:** Flaky tests from race conditions

**Solution:** Playwright auto-waits

```typescript
// ✅ Waits automatically for element to be actionable
await page.click('[data-testid="submit"]');

// ✅ Waits for condition
await page.waitForLoadState('networkidle');

// ✅ Wait for specific element
await page.waitForSelector('[data-testid="results"]');

// ❌ Don't use arbitrary waits
await page.waitForTimeout(5000);  // Bad!
```

---

## Slide 35 of 55: Section 5 - Debugging with AI

# Part 5: Debugging Failing Tests

**Using AI to fix test failures**

---

## Slide 36 of 55: The Debug Prompt Template

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

---

## Slide 37 of 55: Common Failure Patterns

| Issue | Symptom | Likely Cause | Fix |
|-------|---------|--------------|-----|
| **Timeout** | Test hangs then fails | Async not awaited | Add `await` |
| **Undefined** | Cannot read property of undefined | Mock not set up | Configure mock |
| **Wrong value** | Expected X but got Y | Logic error | Check implementation |
| **Flaky** | Passes/fails randomly | Race condition | Use proper waits |
| **Not found** | Element not found | Wrong selector | Check data-testid |

---

## Slide 38 of 55: Example: Debugging Async Issues

**Failing Test:**
```javascript
test('creates user', async () => {
  const user = userService.createUser(data);  // Missing await!
  expect(user.id).toBeDefined();  // user is a Promise
});
```

**Error:**
```
TypeError: Cannot read property 'id' of undefined
```

**AI Diagnosis:**
"The test is missing `await` before the async function call. `user` is a Promise, not the resolved value."

**Fix:**
```javascript
const user = await userService.createUser(data);
```

---

## Slide 39 of 55: Example: Debugging Mock Issues

**Failing Test:**
```javascript
test('fetches user', async () => {
  const user = await userService.getUser('123');
  expect(user.name).toBe('Test');
});
```

**Error:**
```
TypeError: Cannot read property 'name' of undefined
```

**AI Diagnosis:**
"The mock for the database `findById` method is not set up. The service is calling the real (unmocked) database which returns undefined."

**Fix:**
```javascript
mockDb.findById.mockResolvedValue({ id: '123', name: 'Test' });
```

---

## Slide 40 of 55: Section 6 - Test Utilities and Helpers

# Part 6: Building Test Infrastructure

**Reusable testing utilities**

---

## Slide 41 of 55: Types of Test Utilities

**1. Factories** - Generate test data
```javascript
const user = userFactory({ email: 'custom@test.com' });
```

**2. Fixtures** - Predefined test data
```javascript
const { adminUser, regularUser } = fixtures.users;
```

**3. Helpers** - Common operations
```javascript
const token = await authHelper.login(user);
```

**4. Mocks** - Reusable mock configurations
```javascript
const mockEmailService = createEmailServiceMock();
```

---

## Slide 42 of 55: Factory Example

```javascript
// factories/userFactory.js
const { faker } = require('@faker-js/faker');

function userFactory(overrides = {}) {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: 'SecurePass123!',
    createdAt: new Date(),
    ...overrides
  };
}

// Usage
const user = userFactory({ email: 'specific@test.com' });
```

---

## Slide 43 of 55: Test Helper Example

```javascript
// helpers/authHelper.js
const request = require('supertest');

async function loginAsUser(app, userData) {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: userData.email,
      password: userData.password
    });

  return response.body.token;
}

async function authenticatedRequest(app, method, url, token) {
  return request(app)
    [method](url)
    .set('Authorization', `Bearer ${token}`);
}

module.exports = { loginAsUser, authenticatedRequest };
```

---

## Slide 44 of 55: Generating Test Utilities Prompt

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

## Slide 45 of 55: Test Organization

```
tests/
├── unit/
│   ├── services/
│   │   ├── userService.test.js
│   │   └── orderService.test.js
│   └── utils/
│       └── validation.test.js
├── integration/
│   ├── api/
│   │   ├── users.test.js
│   │   └── orders.test.js
│   └── database/
│       └── migrations.test.js
├── e2e/
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   └── DashboardPage.ts
│   └── specs/
│       ├── auth.spec.ts
│       └── checkout.spec.ts
└── helpers/
    ├── factories/
    ├── fixtures/
    └── mocks/
```

---

## Slide 46 of 55: Best Practices Summary

**DO:**
✅ Write tests with descriptive names
✅ Follow AAA pattern
✅ Use specific assertions
✅ Mock external dependencies in unit tests
✅ Clean up after each test
✅ Keep tests independent
✅ Test edge cases and errors

**DON'T:**
❌ Test multiple things in one test
❌ Use arbitrary timeouts
❌ Share state between tests
❌ Mock everything (integration tests)
❌ Use weak assertions (toBeDefined)
❌ Commit commented-out tests

---

## Slide 47 of 55: Coverage Goals

**By Test Type:**

| Test Type | Target Coverage | Speed | What to Test |
|-----------|----------------|-------|--------------|
| **Unit** | 80-100% | <100ms | Business logic, utilities |
| **Integration** | 70-90% | <1s | API endpoints, DB operations |
| **E2E** | Critical paths | <30s | Key user journeys |

**Balance:** High unit coverage, strategic integration/E2E

---

## Slide 48 of 55: The AI Test Generation Workflow

```
1. Define Requirements
   ↓
2. Generate with AI (initial prompt)
   ↓
3. Review Output
   ↓
4. Refine (add edge cases, strengthen assertions)
   ↓
5. Run Tests
   ↓
6. Debug with AI (if failures)
   ↓
7. Verify Coverage
   ↓
8. Commit
```

**Key**: Iterative refinement produces best results

---

## Slide 49 of 55: Measuring Success

**Quality Indicators:**

📊 **Coverage:** 80%+ line coverage
⚡ **Speed:** Unit tests <5s total
🎯 **Reliability:** No flaky tests
📝 **Clarity:** Test names explain intent
🔧 **Maintainability:** Easy to update
✅ **Completeness:** Happy + error + edge cases

**Your goal:** All indicators green

---

## Slide 50 of 55: Common Mistakes to Avoid

**1. Testing Implementation Details**
❌ Testing private methods
✅ Testing public API behavior

**2. Brittle Selectors**
❌ `.class-name > div:nth-child(3)`
✅ `[data-testid="user-name"]`

**3. Missing Setup/Cleanup**
❌ Tests affect each other
✅ `beforeEach` and `afterEach` restore state

**4. Weak Assertions**
❌ `expect(result).toBeDefined()`
✅ `expect(result).toEqual({ id: 1, name: 'Test' })`

---

## Slide 51 of 55: Hands-On Exercise Preview

**Exercise 1: Unit Tests** (2 hours)
- Generate tests for OrderProcessor
- Comprehensive mocking
- 100% coverage

**Exercise 2: Integration Tests** (2 hours)
- Test Express API
- Database verification
- 90%+ coverage

**Exercise 3: E2E Tests** (2.5 hours)
- Build Page Objects
- Test user journeys
- Multiple browsers

---

## Slide 52 of 55: Lab Overview

**Integrated Lab** (3-4 hours):
1. Select features from your test plan
2. Implement unit tests (80%+ coverage)
3. Create integration tests for APIs
4. Build E2E tests for critical flows
5. Debug and refine all tests
6. Generate coverage report

**Deliverable:** Production-ready test suite

---

## Slide 53 of 55: Resources

**Documentation:**
- [Jest Docs](https://jestjs.io)
- [Playwright Docs](https://playwright.dev)
- [Testing Best Practices](https://testingjavascript.com)

**Tools:**
- Jest / Vitest (unit testing)
- Supertest (API testing)
- Playwright (E2E testing)
- Faker.js (test data)

**Course Materials:**
- 04-CODE-EXAMPLES.md
- Exercise solutions
- Lab starter code

---

## Slide 54 of 55: Key Takeaways

1. **Follow the workflow:** Plan → Generate → Review → Refine → Run → Debug
2. **Use the testing pyramid:** Many unit, some integration, few E2E
3. **Mock strategically:** External dependencies in unit tests only
4. **Write strong assertions:** Check exact values, not just existence
5. **Debug with AI:** Provide error + test + source code for fast fixes
6. **Build utilities:** Factories, helpers, and fixtures save time
7. **Aim for quality:** Coverage + speed + reliability + clarity

---

## Slide 55 of 55: Next Steps

**Immediate:**
- Complete Exercise 1 (Unit Tests)
- Complete Exercise 2 (Integration Tests)
- Complete Exercise 3 (E2E Tests)
- Work through the Integrated Lab

**After Module:**
- Module 07: Test Validation and Quality Assurance
- Apply to your projects
- Build your test utility library
- Achieve 90%+ coverage on new features

**Questions?**

---

*End of Slide Deck*

[Continue to Exercises →](./02-EXERCISES.md)
