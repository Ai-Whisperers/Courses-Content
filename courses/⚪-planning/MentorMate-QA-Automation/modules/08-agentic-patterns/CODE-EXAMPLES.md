# Module 8: Agentic Testing Patterns - Code Examples

**Reference Guide**: Complete examples for all agentic patterns

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [Prompt Chaining Examples](#1-prompt-chaining-examples)
2. [Reflection Pattern Examples](#2-reflection-pattern-examples)
3. [RAG Pattern Examples](#3-rag-pattern-examples)
4. [Parallelization Examples](#4-parallelization-examples)
5. [Tool Use (MCP) Examples](#5-tool-use-mcp-examples)
6. [Combined Pattern Examples](#6-combined-pattern-examples)
7. [Automation Scripts](#7-automation-scripts)

---

## 1. Prompt Chaining Examples

### Example 1.1: Basic 4-Step Test Generation Chain

#### Step 1: Analyze Code

**Prompt**:
```
Analyze this UserService class and list all testable units.

Code:
```javascript
class UserService {
  constructor(database, emailService) {
    this.db = database;
    this.emailService = emailService;
  }

  async createUser(userData) {
    const existingUser = await this.db.users.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.db.users.create({
      ...userData,
      password: hashedPassword
    });

    await this.emailService.sendWelcome(user.email);
    return user;
  }

  async updateUser(userId, updates) {
    const user = await this.db.users.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (updates.email && updates.email !== user.email) {
      const emailTaken = await this.db.users.findByEmail(updates.email);
      if (emailTaken) {
        throw new Error('Email already in use');
      }
    }

    return await this.db.users.update(userId, updates);
  }

  async deleteUser(userId) {
    const user = await this.db.users.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await this.db.users.delete(userId);
    await this.emailService.sendGoodbye(user.email);
    return true;
  }
}
```

For each method:
- Name and signature
- Parameters
- Return type
- Dependencies called
- Complexity: Low/Medium/High
- Risk level: Low/Medium/High
```

**Expected Output**:
```markdown
# Testable Units Analysis

## 1. createUser(userData)
- **Parameters**: userData (object with email, password, etc.)
- **Returns**: Promise<User>
- **Dependencies**:
  - database.users.findByEmail()
  - bcrypt.hash()
  - database.users.create()
  - emailService.sendWelcome()
- **Complexity**: Medium (multiple DB calls, validation)
- **Risk**: High (user creation is critical)

## 2. updateUser(userId, updates)
- **Parameters**: userId (string), updates (object)
- **Returns**: Promise<User>
- **Dependencies**:
  - database.users.findById()
  - database.users.findByEmail()
  - database.users.update()
- **Complexity**: Medium (conditional logic, validation)
- **Risk**: Medium (data integrity important)

## 3. deleteUser(userId)
- **Parameters**: userId (string)
- **Returns**: Promise<boolean>
- **Dependencies**:
  - database.users.findById()
  - database.users.delete()
  - emailService.sendGoodbye()
- **Complexity**: Low (straightforward flow)
- **Risk**: High (data deletion is irreversible)
```

---

#### Step 2: Plan Test Cases

**Prompt**:
```
Create detailed test cases for each testable unit.

Analysis from Step 1:
[Paste the output above]

For each method, define:
- Happy path test cases
- Error test cases
- Edge cases
- Required mocks
- Assertions needed

Format: TC-{Method}-{Number}: Description
```

**Expected Output**:
```markdown
# Test Case Plan

## createUser

### Happy Path
- TC-CREATE-01: Successfully creates user with valid data
- TC-CREATE-02: Hashes password before storing
- TC-CREATE-03: Sends welcome email after creation

### Error Cases
- TC-CREATE-04: Throws error when email already exists
- TC-CREATE-05: Handles database creation failure
- TC-CREATE-06: Handles email service failure

### Edge Cases
- TC-CREATE-07: Handles special characters in email
- TC-CREATE-08: Creates user with minimal required fields

### Mocks Needed
- database.users.findByEmail → null (no existing user)
- database.users.create → { id: '123', ...userData }
- emailService.sendWelcome → Promise.resolve()
- bcrypt.hash → 'hashed_password'

### Assertions
- Verify bcrypt.hash called with correct salt rounds
- Verify create called with hashed password
- Verify email service called with user email
- Verify returned user has all fields

---

## updateUser

### Happy Path
- TC-UPDATE-01: Successfully updates user fields
- TC-UPDATE-02: Updates email when new one is available

### Error Cases
- TC-UPDATE-03: Throws error when user not found
- TC-UPDATE-04: Throws error when new email is taken
- TC-UPDATE-05: Handles database update failure

### Edge Cases
- TC-UPDATE-06: Updates with same email (no validation needed)
- TC-UPDATE-07: Partial updates (only some fields)

### Mocks Needed
- database.users.findById → existing user or null
- database.users.findByEmail → null or existing user
- database.users.update → updated user

### Assertions
- Verify findById called with correct userId
- Verify email uniqueness checked only when email changes
- Verify update called with correct data

---

## deleteUser

### Happy Path
- TC-DELETE-01: Successfully deletes existing user
- TC-DELETE-02: Sends goodbye email

### Error Cases
- TC-DELETE-03: Throws error when user not found
- TC-DELETE-04: Handles email service failure gracefully

### Edge Cases
- TC-DELETE-05: Delete is idempotent (already deleted)

### Mocks Needed
- database.users.findById → existing user or null
- database.users.delete → Promise.resolve()
- emailService.sendGoodbye → Promise.resolve()

### Assertions
- Verify user existence checked
- Verify delete called with correct userId
- Verify goodbye email sent before delete confirms
```

---

#### Step 3: Implement Tests

**Prompt**:
```
Generate Jest tests implementing all planned test cases.

Test Plan:
[Paste Step 2 output]

Requirements:
- Use Jest testing framework
- Mock all dependencies
- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names matching TC IDs
- Group by method using describe blocks
- Include all error handling

Generate complete test file: UserService.test.js
```

**Expected Output**:
```javascript
// UserService.test.js
const UserService = require('./UserService');
const bcrypt = require('bcrypt');

jest.mock('bcrypt');

describe('UserService', () => {
  let userService;
  let mockDatabase;
  let mockEmailService;

  beforeEach(() => {
    mockDatabase = {
      users: {
        findByEmail: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    };

    mockEmailService = {
      sendWelcome: jest.fn(),
      sendGoodbye: jest.fn()
    };

    userService = new UserService(mockDatabase, mockEmailService);
  });

  describe('createUser', () => {
    const validUserData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };

    it('TC-CREATE-01: should successfully create user with valid data', async () => {
      // Arrange
      mockDatabase.users.findByEmail.mockResolvedValue(null);
      mockDatabase.users.create.mockResolvedValue({
        id: 'user-123',
        ...validUserData,
        password: 'hashed_password'
      });
      bcrypt.hash.mockResolvedValue('hashed_password');
      mockEmailService.sendWelcome.mockResolvedValue(true);

      // Act
      const result = await userService.createUser(validUserData);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe('user-123');
      expect(result.email).toBe(validUserData.email);
    });

    it('TC-CREATE-02: should hash password before storing', async () => {
      // Arrange
      mockDatabase.users.findByEmail.mockResolvedValue(null);
      mockDatabase.users.create.mockResolvedValue({ id: 'user-123' });
      bcrypt.hash.mockResolvedValue('hashed_password');
      mockEmailService.sendWelcome.mockResolvedValue(true);

      // Act
      await userService.createUser(validUserData);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockDatabase.users.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'hashed_password'
        })
      );
    });

    it('TC-CREATE-03: should send welcome email after creation', async () => {
      // Arrange
      mockDatabase.users.findByEmail.mockResolvedValue(null);
      mockDatabase.users.create.mockResolvedValue({
        id: 'user-123',
        email: validUserData.email
      });
      bcrypt.hash.mockResolvedValue('hashed_password');
      mockEmailService.sendWelcome.mockResolvedValue(true);

      // Act
      await userService.createUser(validUserData);

      // Assert
      expect(mockEmailService.sendWelcome).toHaveBeenCalledWith(validUserData.email);
    });

    it('TC-CREATE-04: should throw error when email already exists', async () => {
      // Arrange
      mockDatabase.users.findByEmail.mockResolvedValue({
        id: 'existing-user',
        email: validUserData.email
      });

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow('User already exists');
      expect(mockDatabase.users.create).not.toHaveBeenCalled();
    });

    it('TC-CREATE-05: should handle database creation failure', async () => {
      // Arrange
      mockDatabase.users.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed_password');
      mockDatabase.users.create.mockRejectedValue(new Error('Database error'));

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow('Database error');
      expect(mockEmailService.sendWelcome).not.toHaveBeenCalled();
    });

    // Additional test cases...
  });

  describe('updateUser', () => {
    const userId = 'user-123';
    const existingUser = {
      id: userId,
      email: 'old@example.com',
      name: 'Old Name'
    };

    it('TC-UPDATE-01: should successfully update user fields', async () => {
      // Arrange
      const updates = { name: 'New Name' };
      mockDatabase.users.findById.mockResolvedValue(existingUser);
      mockDatabase.users.update.mockResolvedValue({
        ...existingUser,
        ...updates
      });

      // Act
      const result = await userService.updateUser(userId, updates);

      // Assert
      expect(result.name).toBe('New Name');
      expect(mockDatabase.users.update).toHaveBeenCalledWith(userId, updates);
    });

    it('TC-UPDATE-02: should update email when new one is available', async () => {
      // Arrange
      const updates = { email: 'new@example.com' };
      mockDatabase.users.findById.mockResolvedValue(existingUser);
      mockDatabase.users.findByEmail.mockResolvedValue(null);
      mockDatabase.users.update.mockResolvedValue({
        ...existingUser,
        ...updates
      });

      // Act
      const result = await userService.updateUser(userId, updates);

      // Assert
      expect(result.email).toBe('new@example.com');
      expect(mockDatabase.users.findByEmail).toHaveBeenCalledWith('new@example.com');
    });

    it('TC-UPDATE-03: should throw error when user not found', async () => {
      // Arrange
      mockDatabase.users.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.updateUser(userId, { name: 'New' })).rejects.toThrow('User not found');
    });

    it('TC-UPDATE-04: should throw error when new email is taken', async () => {
      // Arrange
      const updates = { email: 'taken@example.com' };
      mockDatabase.users.findById.mockResolvedValue(existingUser);
      mockDatabase.users.findByEmail.mockResolvedValue({
        id: 'other-user',
        email: 'taken@example.com'
      });

      // Act & Assert
      await expect(userService.updateUser(userId, updates)).rejects.toThrow('Email already in use');
    });

    // Additional test cases...
  });

  describe('deleteUser', () => {
    const userId = 'user-123';
    const existingUser = {
      id: userId,
      email: 'test@example.com'
    };

    it('TC-DELETE-01: should successfully delete existing user', async () => {
      // Arrange
      mockDatabase.users.findById.mockResolvedValue(existingUser);
      mockDatabase.users.delete.mockResolvedValue(true);
      mockEmailService.sendGoodbye.mockResolvedValue(true);

      // Act
      const result = await userService.deleteUser(userId);

      // Assert
      expect(result).toBe(true);
      expect(mockDatabase.users.delete).toHaveBeenCalledWith(userId);
    });

    it('TC-DELETE-02: should send goodbye email', async () => {
      // Arrange
      mockDatabase.users.findById.mockResolvedValue(existingUser);
      mockDatabase.users.delete.mockResolvedValue(true);
      mockEmailService.sendGoodbye.mockResolvedValue(true);

      // Act
      await userService.deleteUser(userId);

      // Assert
      expect(mockEmailService.sendGoodbye).toHaveBeenCalledWith(existingUser.email);
    });

    it('TC-DELETE-03: should throw error when user not found', async () => {
      // Arrange
      mockDatabase.users.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.deleteUser(userId)).rejects.toThrow('User not found');
      expect(mockDatabase.users.delete).not.toHaveBeenCalled();
    });

    // Additional test cases...
  });
});
```

---

#### Step 4: Validate & Improve

**Prompt**:
```
Review these generated tests for quality issues.

Tests:
[Paste Step 3 output]

Check for:
1. Are all test cases from the plan implemented?
2. Do assertions verify the right things?
3. Are mocks properly configured?
4. Is error handling comprehensive?
5. Are test names descriptive?
6. Is AAA pattern followed consistently?

List any issues with severity (High/Medium/Low) and suggest improvements.
```

**Expected Output**:
```markdown
# Test Quality Review

## Issues Found

### HIGH Severity
None - tests look solid!

### MEDIUM Severity
1. **Missing Test Cases**: TC-CREATE-06 (email service failure) and TC-CREATE-07/08 (edge cases) from plan not implemented
   - **Fix**: Add these test cases

2. **Assertion Coverage**: Some tests only verify happy path, not side effects
   - Example: TC-CREATE-03 doesn't verify that create was called BEFORE email
   - **Fix**: Add call order verification

### LOW Severity
1. **Test Data**: Using hardcoded strings, could use test data factories
   - **Fix**: Extract to reusable constants or factory functions

2. **Cleanup**: No afterEach to clear mocks
   - **Fix**: Add `jest.clearAllMocks()` in afterEach

## Improvements Suggested

```javascript
// Add missing test cases
it('TC-CREATE-06: should handle email service failure gracefully', async () => {
  mockDatabase.users.findByEmail.mockResolvedValue(null);
  mockDatabase.users.create.mockResolvedValue({ id: 'user-123' });
  bcrypt.hash.mockResolvedValue('hashed_password');
  mockEmailService.sendWelcome.mockRejectedValue(new Error('Email service down'));

  // Should still return user even if email fails
  const result = await userService.createUser(validUserData);
  expect(result).toBeDefined();
});

// Add call order verification
it('TC-CREATE-03: should send welcome email after creation (improved)', async () => {
  mockDatabase.users.findByEmail.mockResolvedValue(null);
  mockDatabase.users.create.mockResolvedValue({ id: 'user-123', email: validUserData.email });
  bcrypt.hash.mockResolvedValue('hashed_password');
  mockEmailService.sendWelcome.mockResolvedValue(true);

  await userService.createUser(validUserData);

  // Verify order: create must be called before sendWelcome
  const createOrder = mockDatabase.users.create.mock.invocationCallOrder[0];
  const emailOrder = mockEmailService.sendWelcome.mock.invocationCallOrder[0];
  expect(createOrder).toBeLessThan(emailOrder);
});

// Add cleanup
afterEach(() => {
  jest.clearAllMocks();
});
```
```

---

### Example 1.2: E2E Test Generation Chain

**4-Step Chain for End-to-End Tests**:

#### Step 1: Analyze User Journey
```
Analyze this checkout flow and break it into testable user journeys.

Flow:
1. User adds items to cart
2. User proceeds to checkout
3. User enters shipping info
4. User enters payment info
5. User confirms order
6. User sees confirmation page

Output user stories and acceptance criteria for each step.
```

#### Step 2: Create Page Object Models
```
Create Page Object Models for these user journeys.

Journeys from Step 1:
[Paste output]

For each page, define:
- Selectors for elements
- Actions (click, type, etc.)
- Assertions/getters

Use Playwright conventions.
```

#### Step 3: Implement Test Cases
```
Generate Playwright tests using these Page Objects.

Page Objects from Step 2:
[Paste output]

Requirements:
- One test per user journey
- Setup: Login and seed data
- Teardown: Clean up orders
- Use data-testid for stability
```

#### Step 4: Add Error Scenarios
```
Enhance tests with error handling scenarios.

Current tests:
[Paste Step 3 output]

Add tests for:
- Invalid payment information
- Out of stock items
- Network failures
- Session timeouts

Use same Page Objects.
```

---

## 2. Reflection Pattern Examples

### Example 2.1: Basic Reflection Loop

**Initial Generation**:
```
Generate unit tests for this calculateDiscount function.

function calculateDiscount(price, discountCode) {
  if (!price || price <= 0) {
    throw new Error('Invalid price');
  }

  const discounts = {
    'SAVE10': 0.10,
    'SAVE20': 0.20,
    'VIP50': 0.50
  };

  const rate = discounts[discountCode] || 0;
  return price * (1 - rate);
}
```

**Initial Tests** (Before Reflection):
```javascript
describe('calculateDiscount', () => {
  it('applies 10% discount', () => {
    expect(calculateDiscount(100, 'SAVE10')).toBe(90);
  });

  it('throws error for invalid price', () => {
    expect(() => calculateDiscount(0, 'SAVE10')).toThrow();
  });
});
```

---

**Reflection Prompt**:
```
Review these tests against this rubric:

Tests:
[Paste initial tests]

Rubric:
1. Path Coverage (0-3): All code paths tested?
2. Edge Cases (0-3): Boundary values, special inputs?
3. Assertions (0-3): Specific, meaningful assertions?
4. Error Cases (0-3): All error conditions tested?

Score each criterion and identify gaps.
Total must be 10+ to pass.
```

**Critique Output**:
```markdown
# Test Quality Critique

## Scores

### 1. Path Coverage: 2/3
- ✓ Happy path tested (SAVE10)
- ✓ Error path tested (price = 0)
- ✗ Missing: Unknown discount code path
- ✗ Missing: No discount code provided

### 2. Edge Cases: 1/3
- ✗ Not testing negative prices
- ✗ Not testing all discount codes
- ✗ Not testing very large prices
- ✗ Not testing decimal prices

### 3. Assertions: 2/3
- ✓ Exact value assertions present
- ✗ Error message not verified in error test
- ✗ Only checking final result, not intermediate values

### 4. Error Cases: 1/3
- ✓ Zero price tested
- ✗ Negative price not tested
- ✗ Null/undefined price not tested
- ✗ Invalid discount code behavior not tested

**Total: 6/12 - NEEDS IMPROVEMENT**

## Gaps to Address
1. Test all discount codes (SAVE20, VIP50)
2. Test unknown/invalid discount codes
3. Test negative prices
4. Test null/undefined inputs
5. Verify error messages
6. Test edge case prices (0.01, very large numbers)
```

---

**Improvement Prompt**:
```
Improve these tests based on the critique.

Current tests:
[Paste tests]

Critique:
[Paste critique]

Generate improved tests addressing all 6 gaps identified.
Target: 11+ score.
```

**Improved Tests**:
```javascript
describe('calculateDiscount', () => {
  describe('happy path - valid discounts', () => {
    it('should apply 10% discount with SAVE10 code', () => {
      expect(calculateDiscount(100, 'SAVE10')).toBe(90);
    });

    it('should apply 20% discount with SAVE20 code', () => {
      expect(calculateDiscount(100, 'SAVE20')).toBe(80);
    });

    it('should apply 50% discount with VIP50 code', () => {
      expect(calculateDiscount(100, 'VIP50')).toBe(50);
    });

    it('should return original price with unknown discount code', () => {
      expect(calculateDiscount(100, 'INVALID')).toBe(100);
    });

    it('should return original price with no discount code', () => {
      expect(calculateDiscount(100, undefined)).toBe(100);
    });
  });

  describe('edge cases - prices', () => {
    it('should handle small decimal prices correctly', () => {
      expect(calculateDiscount(0.01, 'SAVE10')).toBeCloseTo(0.009, 3);
    });

    it('should handle large prices correctly', () => {
      expect(calculateDiscount(1000000, 'SAVE10')).toBe(900000);
    });

    it('should handle prices with many decimals', () => {
      expect(calculateDiscount(99.99, 'SAVE10')).toBeCloseTo(89.991, 2);
    });
  });

  describe('error cases - invalid prices', () => {
    it('should throw error with descriptive message for zero price', () => {
      expect(() => calculateDiscount(0, 'SAVE10'))
        .toThrow('Invalid price');
    });

    it('should throw error with descriptive message for negative price', () => {
      expect(() => calculateDiscount(-10, 'SAVE10'))
        .toThrow('Invalid price');
    });

    it('should throw error for null price', () => {
      expect(() => calculateDiscount(null, 'SAVE10'))
        .toThrow('Invalid price');
    });

    it('should throw error for undefined price', () => {
      expect(() => calculateDiscount(undefined, 'SAVE10'))
        .toThrow('Invalid price');
    });
  });

  describe('discount code cases', () => {
    it('should be case-sensitive for discount codes', () => {
      expect(calculateDiscount(100, 'save10')).toBe(100); // lowercase = no discount
    });

    it('should handle empty string discount code', () => {
      expect(calculateDiscount(100, '')).toBe(100);
    });
  });
});
```

---

**Second Reflection**:
```
Score the improved tests against the same rubric.

Improved Tests:
[Paste improved tests]

Rubric: [same as before]

Provide final scores and confirmation if 10+ achieved.
```

**Final Critique**:
```markdown
# Final Test Quality Review

## Scores

### 1. Path Coverage: 3/3
- ✓ All discount codes tested (SAVE10, SAVE20, VIP50)
- ✓ Unknown code path tested
- ✓ No code provided tested
- ✓ Error path tested thoroughly

### 2. Edge Cases: 3/3
- ✓ Small decimal prices (0.01)
- ✓ Large prices (1000000)
- ✓ Prices with many decimals (99.99)
- ✓ Case sensitivity tested
- ✓ Empty string tested

### 3. Assertions: 3/3
- ✓ Exact value assertions
- ✓ Error message verified
- ✓ Using toBeCloseTo for decimals appropriately

### 4. Error Cases: 3/3
- ✓ Zero price tested with message
- ✓ Negative price tested
- ✓ Null price tested
- ✓ Undefined price tested

**Total: 12/12 - EXCELLENT!**

✅ All gaps addressed
✅ Comprehensive coverage
✅ Production-ready quality
```

---

### Example 2.2: Complex Reflection with Custom Rubric

**Rubric for API Integration Tests**:
```markdown
## API Integration Test Quality Rubric (18 points)

### 1. HTTP Status Codes (0-3)
- 3: All relevant status codes tested (200, 201, 400, 401, 404, 500)
- 2: Main codes tested (200, 400, 404)
- 1: Only success code tested
- 0: No status code verification

### 2. Request Validation (0-3)
- 3: Headers, body, query params all verified
- 2: Body verified
- 1: Minimal verification
- 0: No request verification

### 3. Response Structure (0-3)
- 3: Complete schema validation
- 2: Key fields validated
- 1: Basic structure check
- 0: No structure validation

### 4. Authentication/Authorization (0-3)
- 3: Tests with/without auth, different roles
- 2: Tests with/without auth
- 1: Only authenticated tests
- 0: No auth testing

### 5. Error Responses (0-3)
- 3: Error message, code, and structure validated
- 2: Error message validated
- 1: Only status code checked
- 0: No error validation

### 6. Edge Cases (0-3)
- 3: Rate limiting, pagination, special characters
- 2: Some edge cases covered
- 1: Minimal edge cases
- 0: No edge cases

**Pass: 15/18 points**
```

Use this rubric with the reflection pattern for API test generation!

---

## 3. RAG Pattern Examples

### Example 3.1: Knowledge Base Entry Format

```markdown
## Pattern: Authentication Test Pattern

**Category**: Security Testing

**Description**:
Standard pattern for testing authentication endpoints with JWT tokens, including login, token validation, and protected route access.

**When to Use**:
- Testing /login or /auth endpoints
- Testing protected API routes
- Verifying JWT token generation and validation
- Testing authentication middleware

**Code Example**:

```javascript
describe('Authentication', () => {
  describe('POST /auth/login', () => {
    it('should return JWT token for valid credentials', async () => {
      const credentials = {
        email: 'user@example.com',
        password: 'correctPassword'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe(credentials.email);

      // Verify token is valid JWT
      const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('userId');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user@example.com', password: 'wrongPassword' })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Invalid credentials');
      expect(response.body).not.toHaveProperty('token');
    });

    it('should return 400 for missing credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user@example.com' }) // missing password
        .expect(400);

      expect(response.body.error).toContain('Password required');
    });

    it('should not reveal if email exists (security)', async () => {
      const wrongEmail = await request(app)
        .post('/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'anyPassword' });

      const wrongPassword = await request(app)
        .post('/auth/login')
        .send({ email: 'user@example.com', password: 'wrongPassword' });

      // Both should return same generic error message
      expect(wrongEmail.body.error).toBe(wrongPassword.body.error);
    });
  });

  describe('Protected Routes', () => {
    let authToken;

    beforeEach(async () => {
      // Get valid token
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user@example.com', password: 'password123' });

      authToken = response.body.token;
    });

    it('should access protected route with valid token', async () => {
      await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should reject protected route without token', async () => {
      await request(app)
        .get('/api/profile')
        .expect(401);
    });

    it('should reject protected route with invalid token', async () => {
      await request(app)
        .get('/api/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('should reject protected route with expired token', async () => {
      const expiredToken = jwt.sign(
        { userId: '123' },
        process.env.JWT_SECRET,
        { expiresIn: '-1h' } // Already expired
      );

      await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });
});
```

**Key Points**:
- Always test both valid and invalid credentials
- Verify token structure and validity
- Test all auth failure scenarios (missing, invalid, expired)
- Security: Don't reveal whether email exists
- Use `beforeEach` to get fresh tokens for protected route tests
- Set Authorization header as `Bearer {token}`

**Anti-Patterns** to Avoid:
- ✗ Don't hardcode tokens in tests
- ✗ Don't skip token expiration tests
- ✗ Don't reveal user existence in error messages
- ✗ Don't test only happy paths for auth (security critical!)
- ✗ Don't forget to test Authorization header variations (missing Bearer, etc.)

**Security Considerations**:
- Always test that unauthorized access is blocked
- Test token expiration thoroughly
- Verify error messages don't leak sensitive info
- Test rate limiting on login attempts (if implemented)
```

---

### Example 3.2: Using RAG in Generation

**Prompt with RAG**:
```
Generate tests for this new password reset endpoint using our authentication pattern.

Endpoint to test:
```javascript
router.post('/auth/reset-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    // Don't reveal if user exists
    return res.status(200).json({ message: 'If email exists, reset link sent' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  await emailService.sendPasswordReset(email, resetToken);

  res.json({ message: 'If email exists, reset link sent' });
});
```

Relevant pattern from knowledge base:
"""
[Paste Authentication Test Pattern from above]
"""

Follow the pattern exactly. Include:
- Same test structure (describe blocks)
- Similar assertions
- Security tests (don't reveal email existence)
- Token validation
- Error cases

Generate complete tests.
```

**Generated Tests** (Following Pattern):
```javascript
describe('POST /auth/reset-password', () => {
  describe('happy path', () => {
    it('should send reset email for valid email address', async () => {
      const email = 'existing@example.com';
      await User.create({ email, password: 'hashedPassword' });

      const response = await request(app)
        .post('/auth/reset-password')
        .send({ email })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('If email exists');

      // Verify email was sent
      expect(emailService.sendPasswordReset).toHaveBeenCalledWith(
        email,
        expect.any(String)
      );

      // Verify token was stored
      const user = await User.findOne({ email });
      expect(user.resetToken).toBeDefined();
      expect(user.resetTokenExpiry).toBeGreaterThan(Date.now());
    });
  });

  describe('error cases', () => {
    it('should return 400 for missing email', async () => {
      const response = await request(app)
        .post('/auth/reset-password')
        .send({}) // no email
        .expect(400);

      expect(response.body.error).toContain('Email required');
      expect(emailService.sendPasswordReset).not.toHaveBeenCalled();
    });
  });

  describe('security', () => {
    it('should not reveal if email exists (security)', async () => {
      // Existing email
      await User.create({ email: 'exists@example.com', password: 'hash' });

      const existingResponse = await request(app)
        .post('/auth/reset-password')
        .send({ email: 'exists@example.com' });

      // Non-existent email
      const nonExistentResponse = await request(app)
        .post('/auth/reset-password')
        .send({ email: 'nonexistent@example.com' });

      // Both should return same message
      expect(existingResponse.body.message).toBe(nonExistentResponse.body.message);
      expect(existingResponse.status).toBe(nonExistentResponse.status);
    });

    it('should generate unique reset tokens', async () => {
      await User.create({ email: 'user1@example.com', password: 'hash' });
      await User.create({ email: 'user2@example.com', password: 'hash' });

      await request(app)
        .post('/auth/reset-password')
        .send({ email: 'user1@example.com' });

      await request(app)
        .post('/auth/reset-password')
        .send({ email: 'user2@example.com' });

      const user1 = await User.findOne({ email: 'user1@example.com' });
      const user2 = await User.findOne({ email: 'user2@example.com' });

      expect(user1.resetToken).not.toBe(user2.resetToken);
    });

    it('should set token expiration time', async () => {
      await User.create({ email: 'user@example.com', password: 'hash' });

      const beforeRequest = Date.now();
      await request(app)
        .post('/auth/reset-password')
        .send({ email: 'user@example.com' });

      const user = await User.findOne({ email: 'user@example.com' });

      // Expiry should be ~1 hour from now
      const expectedExpiry = beforeRequest + 3600000;
      expect(user.resetTokenExpiry).toBeGreaterThan(beforeRequest);
      expect(user.resetTokenExpiry).toBeLessThan(expectedExpiry + 5000); // 5s tolerance
    });
  });
});
```

**Notice**: The generated tests follow the pattern's structure, naming, assertion style, and security considerations!

---

## 4. Parallelization Examples

### Example 4.1: Parallel Module Testing Strategy

**Scenario**: E-commerce app with 5 independent modules

**Parallel Prompt Set** (Execute simultaneously):

**Agent 1 - User Module**:
```
Generate Jest tests for UserService module.

Code: [UserService code]

Requirements:
- Framework: Jest
- Coverage: All public methods
- Mocks: Database, email service
- Naming: UserService.test.js
- Focus: CRUD operations, validation

Generate complete test file.
```

**Agent 2 - Product Module**:
```
Generate Jest tests for ProductService module.

Code: [ProductService code]

Requirements:
- Framework: Jest
- Coverage: All public methods
- Mocks: Database, image service
- Naming: ProductService.test.js
- Focus: Product management, search

Generate complete test file.
```

**Agent 3 - Cart Module**:
```
Generate Jest tests for CartService module.

Code: [CartService code]

Requirements:
- Framework: Jest
- Coverage: All public methods
- Mocks: Database, product service
- Naming: CartService.test.js
- Focus: Cart operations, calculations

Generate complete test file.
```

**Agent 4 - Payment Module**:
```
Generate Jest tests for PaymentService module.

Code: [PaymentService code]

Requirements:
- Framework: Jest
- Coverage: All public methods
- Mocks: Stripe API, database
- Naming: PaymentService.test.js
- Focus: Payment processing, refunds

Generate complete test file.
```

**Agent 5 - Order Module**:
```
Generate Jest tests for OrderService module.

Code: [OrderService code]

Requirements:
- Framework: Jest
- Coverage: All public methods
- Mocks: Database, payment service, email
- Naming: OrderService.test.js
- Focus: Order lifecycle, fulfillment

Generate complete test file.
```

---

### Example 4.2: Normalization After Parallel Generation

**Normalization Prompt**:
```
Normalize these 5 test files generated in parallel.

Files:
1. UserService.test.js: [paste]
2. ProductService.test.js: [paste]
3. CartService.test.js: [paste]
4. PaymentService.test.js: [paste]
5. OrderService.test.js: [paste]

Ensure:
1. Consistent naming: describe('ServiceName', ...) format
2. Extract shared test helpers to test-utils.js
3. No duplicate mock definitions
4. Same beforeEach/afterEach pattern
5. Consistent import style (require vs import)
6. No test name conflicts

Output:
- 5 normalized test files
- 1 test-utils.js with shared helpers
- List of changes made
```

**Output Example**:
```javascript
// test-utils.js (extracted common helpers)
const createMockDatabase = () => ({
  users: {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  },
  products: {
    findById: jest.fn(),
    search: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  },
  // ... other collections
});

const createMockEmailService = () => ({
  send: jest.fn(),
  sendWelcome: jest.fn(),
  sendOrderConfirmation: jest.fn()
});

const resetAllMocks = () => {
  jest.clearAllMocks();
};

module.exports = {
  createMockDatabase,
  createMockEmailService,
  resetAllMocks
};
```

```javascript
// UserService.test.js (normalized)
const UserService = require('./UserService');
const { createMockDatabase, createMockEmailService, resetAllMocks } = require('./test-utils');

describe('UserService', () => {
  let userService;
  let mockDb;
  let mockEmail;

  beforeEach(() => {
    mockDb = createMockDatabase();
    mockEmail = createMockEmailService();
    userService = new UserService(mockDb, mockEmail);
  });

  afterEach(() => {
    resetAllMocks();
  });

  // ... tests
});
```

---

## 5. Tool Use (MCP) Examples

### Example 5.1: MCP Configuration

**Complete .claude/mcp.json**:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "./src",
        "./tests"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}",
        "GITHUB_REPO": "owner/repo"
      }
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost:5432/testdb"
      ],
      "env": {
        "PGUSER": "${DB_USER}",
        "PGPASSWORD": "${DB_PASSWORD}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_TOKEN": "${SLACK_TOKEN}"
      }
    }
  }
}
```

---

### Example 5.2: Context-Gathering Workflow

**Multi-Tool Prompt**:
```
Generate comprehensive tests for the OrderService.processOrder() method using all available context tools.

Step 1: Use filesystem tool to read:
- src/services/OrderService.js
- src/services/PaymentService.js (dependency)

Step 2: Use github tool to:
- Get last 10 commits affecting OrderService.js
- Check if there are open issues related to orders

Step 3: Use postgres tool to:
- Query orders table schema
- Query order_items table schema

Step 4: Use slack tool to (if available):
- Search recent discussions about "order processing bugs"

Step 5: Based on all gathered context, generate tests that:
- Cover all methods found in source code
- Test any new features from recent commits
- Use correct DB column names from schema
- Address any bugs discussed in Slack/Issues
- Follow project conventions

Document what context was gathered and how it influenced the tests.
```

---

## 6. Combined Pattern Examples

### Example 6.1: All Patterns Together

**Enterprise Test Generation Workflow**:

```
# Phase 1: Tool Use (Context Gathering)
1. Read all service files (filesystem MCP)
2. Get recent commits (GitHub MCP)
3. Inspect DB schema (Postgres MCP)

# Phase 2: RAG (Retrieve Patterns)
4. Query knowledge base for relevant test patterns
5. Extract team conventions

# Phase 3: Prompt Chain (Planning)
Step 1: Analyze all services, list testable units
Step 2: Create comprehensive test plan
Step 3: Prioritize by risk/importance

# Phase 4: Parallelization (Generation)
6. For each service (in parallel):
   - Generate tests following RAG patterns
   - Include context from Phase 1
   - Follow plan from Phase 2

# Phase 5: Reflection (Quality)
7. For each test file:
   - Score against rubric
   - Improve if needed (max 3 iterations)

# Phase 6: Integration
8. Normalize all test files
9. Extract shared fixtures
10. Verify all tests pass
```

**Example Execution**:

```
Execute this enterprise test generation workflow for our e-commerce platform.

Context (Tool Use):
- 5 services: User, Product, Cart, Payment, Order
- Recent changes: Added partial refund support
- DB: PostgreSQL with tables [users, products, carts, payments, orders]

Knowledge Base (RAG):
[Include 3-4 relevant patterns]

Quality Rubric (Reflection):
[Include rubric with 15-point scale]

Execute all phases and document:
1. Context gathered (Phase 1-2)
2. Test plan (Phase 3)
3. Generated tests (Phase 4)
4. Quality scores and improvements (Phase 5)
5. Final integrated suite (Phase 6)
6. Metrics: time, coverage, quality scores
```

---

## 7. Automation Scripts

### Example 7.1: Chain Orchestrator Script

**Script**: `run-test-chain.js`
```javascript
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Orchestrates a 4-step prompt chain for test generation
 */
class TestGenerationChain {
  constructor(codeFile, outputDir) {
    this.codeFile = codeFile;
    this.outputDir = outputDir;
    this.outputs = {};
  }

  // Step 1: Analyze code
  async analyzeCode() {
    console.log('Step 1: Analyzing code...');

    const code = fs.readFileSync(this.codeFile, 'utf-8');

    const prompt = `
      Analyze this code and list all testable units.
      Code:
      ${code}

      For each unit provide:
      - Name, parameters, return type
      - Dependencies
      - Complexity and risk

      Output as JSON.
    `;

    // In real implementation, call Claude API here
    // For demo, simulate output
    const analysis = {
      units: [
        {
          name: 'createUser',
          params: ['userData'],
          returns: 'Promise<User>',
          dependencies: ['database', 'emailService'],
          complexity: 'medium',
          risk: 'high'
        }
        // ... more units
      ]
    };

    this.outputs.analysis = analysis;
    fs.writeFileSync(
      `${this.outputDir}/01-analysis.json`,
      JSON.stringify(analysis, null, 2)
    );

    console.log('✓ Analysis complete');
    return analysis;
  }

  // Step 2: Plan test cases
  async planTests() {
    console.log('Step 2: Planning test cases...');

    const prompt = `
      Create test cases for these units:
      ${JSON.stringify(this.outputs.analysis, null, 2)}

      For each unit define:
      - Happy path cases
      - Error cases
      - Edge cases

      Output as JSON.
    `;

    // Call Claude API
    const testPlan = {
      testCases: [
        {
          unit: 'createUser',
          cases: [
            { id: 'TC-01', type: 'happy', description: 'Creates user successfully' },
            { id: 'TC-02', type: 'error', description: 'Throws on duplicate email' }
            // ... more cases
          ]
        }
      ]
    };

    this.outputs.testPlan = testPlan;
    fs.writeFileSync(
      `${this.outputDir}/02-test-plan.json`,
      JSON.stringify(testPlan, null, 2)
    );

    console.log('✓ Test plan complete');
    return testPlan;
  }

  // Step 3: Generate tests
  async generateTests() {
    console.log('Step 3: Generating tests...');

    const prompt = `
      Generate Jest tests for this test plan:
      ${JSON.stringify(this.outputs.testPlan, null, 2)}

      Original code:
      ${fs.readFileSync(this.codeFile, 'utf-8')}

      Generate complete test file.
    `;

    // Call Claude API
    const testCode = `
      describe('UserService', () => {
        // ... generated tests
      });
    `;

    this.outputs.tests = testCode;
    fs.writeFileSync(`${this.outputDir}/03-generated-tests.js`, testCode);

    console.log('✓ Tests generated');
    return testCode;
  }

  // Step 4: Validate and improve
  async validateTests() {
    console.log('Step 4: Validating tests...');

    const prompt = `
      Review these tests for quality:
      ${this.outputs.tests}

      Check:
      - All test cases from plan implemented
      - Proper assertions
      - Good mocking
      - Error handling

      Provide issues and improvements.
    `;

    // Call Claude API
    const validation = {
      score: 8,
      issues: [
        { severity: 'medium', description: 'Missing TC-03 from plan' }
      ],
      improvements: '...'
    };

    this.outputs.validation = validation;
    fs.writeFileSync(
      `${this.outputDir}/04-validation.json`,
      JSON.stringify(validation, null, 2)
    );

    if (validation.score < 10) {
      console.log('⚠ Tests need improvement');
      // Could trigger improvement step here
    } else {
      console.log('✓ Tests validated - high quality!');
    }

    return validation;
  }

  // Run the entire chain
  async run() {
    console.log('=== Starting Test Generation Chain ===\n');

    try {
      await this.analyzeCode();
      await this.planTests();
      await this.generateTests();
      await this.validateTests();

      console.log('\n=== Chain Complete ===');
      console.log(`Results saved to: ${this.outputDir}`);

      return this.outputs;
    } catch (error) {
      console.error('Chain failed:', error);
      throw error;
    }
  }
}

// CLI Usage
if (require.main === module) {
  const [codeFile, outputDir = './chain-output'] = process.argv.slice(2);

  if (!codeFile) {
    console.error('Usage: node run-test-chain.js <code-file> [output-dir]');
    process.exit(1);
  }

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const chain = new TestGenerationChain(codeFile, outputDir);
  chain.run().catch(console.error);
}

module.exports = TestGenerationChain;
```

**Usage**:
```bash
node run-test-chain.js src/services/UserService.js ./test-output
```

---

### Example 7.2: Reflection Loop Runner

**Script**: `run-reflection-loop.js`
```javascript
#!/usr/bin/env node

const fs = require('fs');

/**
 * Runs reflection loop until quality threshold met
 */
class ReflectionLoop {
  constructor(testFile, rubricFile, maxIterations = 3) {
    this.testFile = testFile;
    this.rubric = JSON.parse(fs.readFileSync(rubricFile, 'utf-8'));
    this.maxIterations = maxIterations;
    this.threshold = this.rubric.threshold || 10;
  }

  async critique(tests) {
    console.log('Critiquing tests against rubric...');

    const prompt = `
      Review these tests against this rubric:

      Tests:
      ${tests}

      Rubric:
      ${JSON.stringify(this.rubric, null, 2)}

      Score each criterion and provide total.
      Identify specific gaps if score < ${this.threshold}.
    `;

    // Call Claude API
    const critique = {
      scores: {
        pathCoverage: 2,
        assertions: 2,
        mocking: 2,
        errorHandling: 1
      },
      total: 7,
      gaps: [
        'Missing edge case tests',
        'Weak error assertions'
      ]
    };

    return critique;
  }

  async improve(tests, critique) {
    console.log('Improving tests based on critique...');

    const prompt = `
      Improve these tests:

      Current tests:
      ${tests}

      Critique:
      ${JSON.stringify(critique, null, 2)}

      Address all gaps to achieve ${this.threshold}+ score.
    `;

    // Call Claude API
    const improvedTests = `
      // Improved test code
    `;

    return improvedTests;
  }

  async run() {
    console.log('=== Starting Reflection Loop ===\n');
    console.log(`Target score: ${this.threshold}`);
    console.log(`Max iterations: ${this.maxIterations}\n`);

    let tests = fs.readFileSync(this.testFile, 'utf-8');
    let iteration = 0;
    let score = 0;

    while (iteration < this.maxIterations) {
      iteration++;
      console.log(`\n--- Iteration ${iteration} ---`);

      const critique = await this.critique(tests);
      score = critique.total;

      console.log(`Score: ${score}/${this.rubric.maxScore}`);

      if (score >= this.threshold) {
        console.log('✓ Quality threshold met!');
        break;
      }

      console.log(`Gaps: ${critique.gaps.join(', ')}`);
      tests = await this.improve(tests, critique);

      // Save iteration results
      fs.writeFileSync(
        `${this.testFile}.iteration${iteration}`,
        tests
      );
    }

    if (score < this.threshold) {
      console.log(`\n⚠ Warning: Threshold not met after ${this.maxIterations} iterations`);
      console.log('Consider revising rubric or providing more specific guidance');
    }

    console.log('\n=== Reflection Complete ===');
    console.log(`Final score: ${score}/${this.rubric.maxScore}`);
    console.log(`Iterations: ${iteration}`);
    console.log(`Improvement: ${score - 7} points`); // Assuming initial was 7

    // Save final tests
    fs.writeFileSync(this.testFile, tests);

    return { score, iterations: iteration, tests };
  }
}

// CLI Usage
if (require.main === module) {
  const [testFile, rubricFile] = process.argv.slice(2);

  if (!testFile || !rubricFile) {
    console.error('Usage: node run-reflection-loop.js <test-file> <rubric-file>');
    process.exit(1);
  }

  const loop = new ReflectionLoop(testFile, rubricFile);
  loop.run().catch(console.error);
}

module.exports = ReflectionLoop;
```

**Usage**:
```bash
node run-reflection-loop.js tests/UserService.test.js rubric.json
```

---

## Summary

This code examples document provides:

✅ **Prompt Chaining**: Complete 4-step examples with actual prompts and outputs
✅ **Reflection Pattern**: Before/after examples with rubrics and improvement loops
✅ **RAG**: Knowledge base entry format and usage examples
✅ **Parallelization**: Multi-module generation and normalization strategies
✅ **Tool Use (MCP)**: Configuration examples and multi-tool workflows
✅ **Combined Patterns**: Enterprise-scale workflow integrating all patterns
✅ **Automation Scripts**: Runnable Node.js scripts for chain orchestration and reflection loops

Use these examples as templates for your own agentic testing workflows!

---

*Module 08 Code Examples - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
