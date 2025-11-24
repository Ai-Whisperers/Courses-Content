# Module 6 Quiz: Test Implementation with AI

**Time Limit**: 20 minutes
**Passing Score**: 70% (28/40 points)
**Total Points**: 40

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- Answer all questions to the best of your ability
- For code questions, write your answers in the provided space
- Multiple choice questions have only one correct answer
- True/False questions require checking one box
- Short answer questions should be concise (2-3 sentences)

---

## Section 1: Multiple Choice (2 points each)

### Question 1
What does the AAA pattern stand for in testing?

a) Assert, Act, Arrange
b) Arrange, Act, Assert
c) Act, Assert, Arrange
d) Arrange, Assert, Act

---

### Question 2
When should you use mocks in unit tests?

a) Never, always use real dependencies
b) Only for database calls
c) For all external dependencies (APIs, databases, services)
d) Only when tests are slow

---

### Question 3
What is the main difference between a mock and a stub?

a) They are exactly the same thing
b) Mocks verify behavior/calls, stubs provide predefined responses
c) Stubs are only for databases
d) Mocks are slower than stubs

---

### Question 4
Which is the best test name?

a) `test1()`
b) `testCreateUser()`
c) `should create user with valid data and return user ID`
d) `test_function()`

---

### Question 5
What is the testing pyramid recommendation?

a) More E2E tests, fewer unit tests
b) Equal numbers of all test types
c) Many unit tests, some integration tests, few E2E tests
d) Only E2E tests are needed

---

## Section 2: True/False (1 point each)

### Question 6
Unit tests should be fast, typically under 100ms each.

- [ ] True
- [ ] False

---

### Question 7
Integration tests should mock all external dependencies including the database.

- [ ] True
- [ ] False

---

### Question 8
Each test should test multiple unrelated things to save time.

- [ ] True
- [ ] False

---

### Question 9
`expect(user).toBeDefined()` is a strong, specific assertion.

- [ ] True
- [ ] False

---

### Question 10
Tests should be independent and runnable in any order.

- [ ] True
- [ ] False

---

### Question 11
E2E tests should use Page Object Model for better maintainability.

- [ ] True
- [ ] False

---

### Question 12
It's acceptable to have flaky tests as long as they pass most of the time.

- [ ] True
- [ ] False

---

## Section 3: Short Answer (5 points each)

### Question 13
List four types of dependencies that should be mocked in unit tests.

1. _______________________________
2. _______________________________
3. _______________________________
4. _______________________________

---

### Question 14
Explain the difference between unit tests, integration tests, and E2E tests. (2-3 sentences)

__________________________________________________________________
__________________________________________________________________
__________________________________________________________________
__________________________________________________________________

---

### Question 15
Transform this weak test into a strong one with specific assertions:

**Original:**
```javascript
test('creates user', async () => {
  const user = await createUser({ name: 'Test', email: 'test@test.com' });
  expect(user).toBeDefined();
});
```

**Your improved version:**
```javascript
test('creates user', async () => {
  // Write improved test here






});
```

---

## Section 4: Practical (10 points)

### Question 16
You receive this AI-generated test. Identify **4 issues** and provide the **fixed version**.

```javascript
let userId;

test('create and get user', async () => {
  const user = await userService.create({ name: 'Test' });
  userId = user.id;

  const fetched = await userService.get(userId);
  expect(fetched).toBeTruthy();

  await userService.delete(userId);
});

test('update user', async () => {
  await userService.update(userId, { name: 'Updated' });
  const user = await userService.get(userId);
  expect(user.name).toBe('Updated');
});
```

**Issues (2.5 points each):**

1. _______________________________________________________________

2. _______________________________________________________________

3. _______________________________________________________________

4. _______________________________________________________________

**Fixed tests (5 points total):**

```javascript
// Write fixed version here




















```

---

# Answer Key

*(For instructor use only)*

---

## Section 1: Multiple Choice

### Question 1: **b**
Arrange, Act, Assert
- Arrange: Set up test data and mocks
- Act: Execute the function being tested
- Assert: Verify the results

### Question 2: **c**
For all external dependencies (APIs, databases, services)
- Unit tests should be isolated and fast
- Mocking external dependencies ensures independence
- Real dependencies = integration tests

### Question 3: **b**
Mocks verify behavior/calls, stubs provide predefined responses
- Mocks: Track how they're called (toHaveBeenCalledWith)
- Stubs: Return predetermined values (mockReturnValue)
- Both have their use cases

### Question 4: **c**
`should create user with valid data and return user ID`
- Descriptive name explains what's being tested
- Describes behavior, not implementation
- Easy to understand test purpose

### Question 5: **c**
Many unit tests, some integration tests, few E2E tests
- Unit tests are fast and cheap
- E2E tests are slow and expensive
- Balance speed with coverage

---

## Section 2: True/False

### Question 6: **True**
Unit tests should be fast (<100ms)
- Enables quick feedback loops
- Developers run them frequently
- Slow tests = developers skip running them

### Question 7: **False**
Integration tests should use real database
- Purpose is to test component interactions
- Use test database, not production
- Mock only external APIs/services

### Question 8: **False**
Each test should test one thing
- Single responsibility per test
- Easier to debug failures
- Clearer test intent

### Question 9: **False**
`toBeDefined()` is a weak assertion
- Doesn't verify actual values
- Use `toEqual()`, `toMatchObject()`, `toBe()`
- Check specific properties and values

### Question 10: **True**
Tests must be independent
- No shared state between tests
- Use beforeEach/afterEach for setup/cleanup
- Tests should pass in any order

### Question 11: **True**
Page Object Model improves E2E maintainability
- Separates page interactions from test logic
- Reusable page methods
- Easier to update when UI changes

### Question 12: **False**
Flaky tests are never acceptable
- Undermine confidence in test suite
- Hide real bugs
- Fix flaky tests immediately

---

## Section 3: Short Answer

### Question 13 (5 points, 1.25 each)

**Any four of these:**
- Database calls
- API/HTTP requests
- File system operations
- Email services
- Payment gateways
- External services
- Time/Date functions (use fake timers)
- Random number generators
- Third-party libraries

**Grading:**
- 1.25 points per correct answer
- Must be external dependencies
- Accept reasonable variations

---

### Question 14 (5 points)

**Model Answer:**
"Unit tests verify individual functions or classes in isolation with all dependencies mocked, running in milliseconds. Integration tests verify multiple components working together (like API + database) with real dependencies, running in under a second. E2E tests verify complete user workflows through the UI with no mocking, running in seconds to minutes."

**Grading Rubric:**
- Unit tests described correctly (1.5 pts)
  - Isolation mentioned
  - Mocking mentioned
- Integration tests described correctly (1.5 pts)
  - Multiple components
  - Real dependencies
- E2E tests described correctly (1.5 pts)
  - Complete workflows
  - UI interaction
- Clear distinctions made (0.5 pts)

**Accept variations that capture key concepts**

---

### Question 15 (5 points)

**Model Answer:**
```javascript
test('should create user with valid data and return user object', async () => {
  // Arrange
  const userData = { name: 'Test', email: 'test@test.com' };

  // Act
  const user = await createUser(userData);

  // Assert
  expect(user).toMatchObject({
    id: expect.any(String),
    name: 'Test',
    email: 'test@test.com',
    createdAt: expect.any(Date)
  });
  expect(user.password).toBeUndefined(); // No sensitive data
});
```

**Grading Rubric:**
- Descriptive test name (1 pt)
- AAA pattern visible (1 pt)
- Specific assertions with toMatchObject (2 pts)
- Checks multiple properties (1 pt)

**Partial credit:**
- 0.5 pts for improved name (even if not perfect)
- 1 pt for any specific assertion beyond toBeDefined
- Full credit if intent is clear

---

## Section 4: Practical

### Question 16 (10 points)

**Issues (2.5 points each):**

1. **Tests share state via userId variable**
   - Global variable creates dependency
   - Tests cannot run independently

2. **Second test depends on first test running**
   - If first test fails, second test breaks
   - Cannot run second test in isolation

3. **First test does multiple things**
   - Creates, gets, and deletes
   - Should be 3 separate tests
   - Hard to debug failures

4. **Weak assertion: toBeTruthy()**
   - Doesn't verify actual user data
   - Should check specific properties
   - Not checking error states

**Additional acceptable issues:**
- No describe block for organization
- No cleanup in afterEach
- Missing mock setup (if mocks needed)
- No error case testing

**Fixed Tests (5 points total):**

```javascript
describe('UserService', () => {
  let testUser;

  beforeEach(async () => {
    // Create user for tests that need it
    testUser = await userService.create({
      name: 'Test User',
      email: 'test@example.com'
    });
  });

  afterEach(async () => {
    // Clean up after each test
    if (testUser) {
      await userService.delete(testUser.id);
    }
  });

  test('should create user with valid data', async () => {
    const userData = { name: 'New User', email: 'new@example.com' };

    const user = await userService.create(userData);

    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'New User',
      email: 'new@example.com'
    });

    // Clean up the extra user
    await userService.delete(user.id);
  });

  test('should get user by ID', async () => {
    const fetched = await userService.get(testUser.id);

    expect(fetched).toMatchObject({
      id: testUser.id,
      name: 'Test User',
      email: 'test@example.com'
    });
  });

  test('should update user name', async () => {
    await userService.update(testUser.id, { name: 'Updated Name' });

    const user = await userService.get(testUser.id);

    expect(user.name).toBe('Updated Name');
    expect(user.email).toBe('test@example.com'); // Unchanged
  });
});
```

**Grading for Fixed Tests (5 points):**
- Uses beforeEach/afterEach (1 pt)
- Tests are independent (1 pt)
- One purpose per test (1 pt)
- Strong assertions (1.5 pts)
- Organization with describe (0.5 pts)

**Partial credit:**
- 2 pts if shows understanding but incomplete
- 3 pts if most issues fixed
- 4 pts if all issues fixed but minor issues remain
- 5 pts if exemplary solution

---

## Scoring Summary

| Section | Points Available | Questions |
|---------|------------------|-----------|
| Multiple Choice | 10 | 5 questions × 2 pts |
| True/False | 7 | 7 questions × 1 pt |
| Short Answer | 15 | 3 questions × 5 pts |
| Practical | 10 | 1 question × 10 pts |
| **Total** | **40** | |

**Passing Score: 28 points (70%)**

---

## Score Ranges

| Score | Grade | Performance |
|-------|-------|-------------|
| 36-40 | A | Excellent understanding |
| 32-35 | B | Good understanding |
| 28-31 | C | Satisfactory (Pass) |
| 24-27 | D | Needs improvement |
| 0-23 | F | Insufficient understanding |

---

## Common Mistakes

### Mistake 1: Confusing AAA Pattern
**Student writes:** "Assert, Act, Arrange"
**Correct order:** Arrange → Act → Assert
**Mnemonic:** "Set up, Do it, Check it"

### Mistake 2: Over-Mocking in Integration Tests
**Student says:** "Mock everything including database"
**Correct:** "Integration tests use real database (test DB)"
**Reason:** Purpose is to test interactions

### Mistake 3: Accepting Flaky Tests
**Student says:** "Flaky tests are ok if they pass 80%"
**Correct:** "Flaky tests are never acceptable"
**Reason:** Undermines confidence, hides bugs

### Mistake 4: Weak Assertions
**Student writes:** `expect(result).toBeDefined()`
**Better:** `expect(result).toMatchObject({ id: 1, name: 'Test' })`
**Reason:** Specific checks catch more bugs

---

## Review Suggestions by Score Range

### If score < 60% (24 points):
1. Review Module 6 slides completely
2. Work through all exercises again
3. Study code examples section
4. Practice with additional test cases
5. Attend office hours for help

### If score 60-70% (24-28 points):
1. Review sections you scored poorly on
2. Practice writing more tests
3. Focus on test quality (assertions)
4. Review AAA pattern examples

### If score 70-85% (28-34 points):
1. Good understanding, minor gaps
2. Practice advanced scenarios
3. Review debugging techniques
4. Work on test organization

### If score > 85% (34+ points):
1. Excellent understanding!
2. Help classmates
3. Try bonus challenges
4. Apply to real projects

---

## Retake Policy

- Unlimited retakes allowed
- Must wait 24 hours between attempts
- New questions each time (from question bank)
- Highest score counts
- Must pass quiz to proceed to Module 7

---

**Good luck!** 🚀

---

*Module 6 Quiz - Version 1.0*
*MentorMate QA Automation Course*
*Last Updated: November 2025*
