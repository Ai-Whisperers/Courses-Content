# Module 7: Test Validation and Quality Assurance - Code Examples

**Reference Guide for Test Quality Patterns**

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [Weak vs. Strong Assertions](#1-weak-vs-strong-assertions)
2. [Missing Error Tests](#2-missing-error-tests)
3. [Shared State vs. Isolation](#3-shared-state-vs-isolation)
4. [Flaky vs. Deterministic Tests](#4-flaky-vs-deterministic-tests)
5. [Incorrect Mocks](#5-incorrect-mocks)
6. [Over-Testing vs. Behavior Testing](#6-over-testing-vs-behavior-testing)
7. [Mutation Testing Examples](#7-mutation-testing-examples)
8. [Coverage Quality Examples](#8-coverage-quality-examples)
9. [AI Review Prompts](#9-ai-review-prompts)
10. [Complete Before/After Suite](#10-complete-beforeafter-suite)

---

## 1. Weak vs. Strong Assertions

### Example 1.1: User Creation

**❌ BAD - Weak Assertions**
```javascript
test('creates user', async () => {
  const user = await createUser({
    name: 'John Doe',
    email: 'john@example.com'
  });

  // These pass for almost anything!
  expect(user).toBeDefined();
  expect(user.id).toBeTruthy();
  expect(user.name).toBeTruthy();
});
```

**What can slip through:**
- `user = {}` (empty object)
- `user = { id: 0, name: '' }` (falsy values)
- `user = { id: 'wrong', name: 123 }` (wrong types)
- Missing required fields
- Wrong email format

**✅ GOOD - Strong Assertions**
```javascript
test('creates user with correct properties and format', async () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  const user = await createUser(userData);

  // Verify structure, types, and values
  expect(user).toMatchObject({
    id: expect.stringMatching(/^usr_[a-zA-Z0-9]{8,}$/),
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: expect.any(Date),
    status: 'active'
  });

  // Verify what should NOT be there
  expect(user.password).toBeUndefined();
  expect(user.internalId).toBeUndefined();
});
```

---

### Example 1.2: Calculation Results

**❌ BAD - Weak Assertions**
```javascript
test('calculates total', () => {
  const total = calculateTotal(100, 0.1);

  // Too generic!
  expect(total).toBeGreaterThan(0);
  expect(typeof total).toBe('number');
});
```

**What can slip through:**
- Wrong calculation (could be 200, 50, 1000)
- Wrong formula (addition instead of multiplication)
- Precision issues (110.00001 instead of 110)

**✅ GOOD - Strong Assertions**
```javascript
test('calculates total as price plus 10% tax', () => {
  const price = 100;
  const taxRate = 0.1;
  const expectedTotal = 110; // 100 + (100 * 0.1)

  const total = calculateTotal(price, taxRate);

  expect(total).toBe(expectedTotal);
});

test('rounds total to 2 decimal places', () => {
  const total = calculateTotal(33.33, 0.1);

  expect(total).toBe(36.66);
  expect(total.toString()).toMatch(/^\d+\.\d{2}$/);
});
```

---

### Example 1.3: Array Results

**❌ BAD - Weak Assertions**
```javascript
test('returns search results', async () => {
  const results = await search('query');

  // Not specific enough!
  expect(results).toBeDefined();
  expect(Array.isArray(results)).toBe(true);
  expect(results.length).toBeGreaterThan(0);
});
```

**What can slip through:**
- Wrong items in array
- Wrong order
- Missing properties
- Wrong data types

**✅ GOOD - Strong Assertions**
```javascript
test('returns search results with correct structure and order', async () => {
  const results = await search('javascript');

  // Verify array structure
  expect(results).toBeInstanceOf(Array);
  expect(results).toHaveLength(3);

  // Verify first result in detail
  expect(results[0]).toMatchObject({
    id: expect.any(String),
    title: expect.stringContaining('javascript'),
    relevance: expect.any(Number),
    timestamp: expect.any(Date)
  });

  // Verify sorting (highest relevance first)
  expect(results[0].relevance).toBeGreaterThanOrEqual(results[1].relevance);
  expect(results[1].relevance).toBeGreaterThanOrEqual(results[2].relevance);
});
```

---

## 2. Missing Error Tests

### Example 2.1: Division Function

**❌ BAD - Only Happy Path**
```javascript
describe('divide', () => {
  test('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
});
```

**What's missing:**
- Division by zero
- Negative numbers
- Invalid inputs
- Edge cases

**✅ GOOD - Happy Path + Error Cases**
```javascript
describe('divide', () => {
  test('divides positive numbers correctly', () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(100, 4)).toBe(25);
    expect(divide(7, 2)).toBe(3.5);
  });

  test('handles division by zero with specific error', () => {
    expect(() => divide(10, 0)).toThrow(
      new Error('Division by zero is not allowed')
    );
  });

  test('handles negative numbers correctly', () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test('throws on invalid inputs', () => {
    expect(() => divide('10', 2)).toThrow('Invalid input: expected numbers');
    expect(() => divide(10, '2')).toThrow('Invalid input: expected numbers');
    expect(() => divide(null, 2)).toThrow('Invalid input: expected numbers');
  });

  test('handles very small divisors', () => {
    expect(divide(1, 0.001)).toBe(1000);
  });
});
```

---

### Example 2.2: User Registration

**❌ BAD - Incomplete Error Testing**
```javascript
test('handles invalid email', async () => {
  try {
    await registerUser({ email: 'invalid', password: 'pass123' });
  } catch (error) {
    expect(error).toBeDefined();
  }
});
```

**What's missing:**
- Error message validation
- Error code/type validation
- Multiple invalid formats
- HTTP status code

**✅ GOOD - Comprehensive Error Testing**
```javascript
describe('registerUser error handling', () => {
  test('rejects invalid email format with specific error', async () => {
    await expect(
      registerUser({ email: 'invalid', password: 'pass123' })
    ).rejects.toMatchObject({
      message: 'Invalid email format',
      code: 'INVALID_EMAIL',
      field: 'email',
      status: 400
    });
  });

  test('rejects multiple invalid email formats', async () => {
    const invalidEmails = [
      'missing-at',
      '@no-local',
      'no-domain@',
      'spaces in@email.com',
      'multiple@@at.com'
    ];

    for (const email of invalidEmails) {
      await expect(
        registerUser({ email, password: 'pass123' })
      ).rejects.toMatchObject({
        code: 'INVALID_EMAIL'
      });
    }
  });

  test('rejects weak password with detailed requirements', async () => {
    await expect(
      registerUser({ email: 'test@example.com', password: '123' })
    ).rejects.toMatchObject({
      message: 'Password must be at least 8 characters',
      code: 'WEAK_PASSWORD',
      field: 'password',
      requirements: {
        minLength: 8,
        requireUppercase: false,
        requireNumber: false
      }
    });
  });

  test('rejects duplicate email with conflict status', async () => {
    await registerUser({ email: 'existing@test.com', password: 'pass123' });

    await expect(
      registerUser({ email: 'existing@test.com', password: 'different456' })
    ).rejects.toMatchObject({
      message: 'Email already registered',
      code: 'DUPLICATE_EMAIL',
      status: 409
    });
  });
});
```

---

## 3. Shared State vs. Isolation

### Example 3.1: Shopping Cart

**❌ BAD - Shared State**
```javascript
// Tests affect each other!
const cart = new ShoppingCart();

test('adds item to cart', () => {
  cart.addItem({ id: 1, name: 'Book', price: 29.99 });
  expect(cart.itemCount).toBe(1);
});

test('calculates total', () => {
  // This test sees the item from previous test!
  expect(cart.total).toBe(29.99);
});

test('applies discount', () => {
  cart.applyDiscount(0.1);
  // This sees items and discounts from previous tests!
  expect(cart.total).toBe(26.99);
});

test('clears cart', () => {
  cart.clear();
  expect(cart.itemCount).toBe(0);
  // Now other tests will fail if run after this!
});
```

**Problems:**
- Tests must run in specific order
- One test failure breaks others
- Can't run tests in parallel
- Hard to debug

**✅ GOOD - Isolated Tests**
```javascript
describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    // Fresh cart for each test
    cart = new ShoppingCart();
  });

  test('adds item to empty cart', () => {
    cart.addItem({ id: 1, name: 'Book', price: 29.99 });

    expect(cart.itemCount).toBe(1);
    expect(cart.items[0]).toMatchObject({
      id: 1,
      name: 'Book',
      price: 29.99
    });
  });

  test('calculates total for single item', () => {
    cart.addItem({ id: 1, name: 'Book', price: 29.99 });

    expect(cart.total).toBe(29.99);
  });

  test('calculates total for multiple items', () => {
    cart.addItem({ id: 1, name: 'Book', price: 29.99 });
    cart.addItem({ id: 2, name: 'Pen', price: 9.99 });

    expect(cart.total).toBe(39.98);
  });

  test('applies discount to cart total', () => {
    cart.addItem({ id: 1, name: 'Book', price: 30.00 });
    cart.applyDiscount(0.1); // 10% discount

    expect(cart.total).toBe(27.00); // 30 - 3
    expect(cart.discount).toBe(0.1);
  });

  test('clears all items from cart', () => {
    cart.addItem({ id: 1, name: 'Book', price: 29.99 });
    cart.addItem({ id: 2, name: 'Pen', price: 9.99 });

    cart.clear();

    expect(cart.itemCount).toBe(0);
    expect(cart.total).toBe(0);
    expect(cart.items).toEqual([]);
  });
});
```

---

### Example 3.2: Database Tests

**❌ BAD - Shared Database State**
```javascript
describe('User database operations', () => {
  test('creates user', async () => {
    await db.users.create({ id: 1, name: 'John' });
    const user = await db.users.findById(1);
    expect(user.name).toBe('John');
  });

  test('updates user', async () => {
    // Assumes user from previous test exists!
    await db.users.update(1, { name: 'Jane' });
    const user = await db.users.findById(1);
    expect(user.name).toBe('Jane');
  });

  test('deletes user', async () => {
    await db.users.delete(1);
    const user = await db.users.findById(1);
    expect(user).toBeNull();
  });
});
```

**✅ GOOD - Isolated Database Tests**
```javascript
describe('User database operations', () => {
  let testUser;

  beforeEach(async () => {
    // Create fresh test user for each test
    testUser = await db.users.create({
      name: 'Test User',
      email: `test-${Date.now()}@example.com`
    });
  });

  afterEach(async () => {
    // Clean up after each test
    if (testUser) {
      await db.users.delete(testUser.id);
    }
  });

  test('creates user with correct properties', async () => {
    const newUser = await db.users.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    expect(newUser).toMatchObject({
      id: expect.any(Number),
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: expect.any(Date)
    });

    // Cleanup this test's user
    await db.users.delete(newUser.id);
  });

  test('updates existing user', async () => {
    await db.users.update(testUser.id, { name: 'Updated Name' });

    const updated = await db.users.findById(testUser.id);
    expect(updated.name).toBe('Updated Name');
    expect(updated.email).toBe(testUser.email); // Unchanged
  });

  test('deletes existing user', async () => {
    await db.users.delete(testUser.id);

    const deleted = await db.users.findById(testUser.id);
    expect(deleted).toBeNull();

    // Prevent afterEach from trying to delete again
    testUser = null;
  });
});
```

---

## 4. Flaky vs. Deterministic Tests

### Example 4.1: Async Operations

**❌ BAD - Flaky (Timing-Dependent)**
```javascript
test('shows success message after save', async () => {
  saveData();
  await sleep(1000); // Might not be enough time!
  expect(getSuccessMessage()).toBe('Saved successfully');
});

test('hides loading spinner', async () => {
  loadData();
  await sleep(500); // Different machine, different speed!
  expect(isSpinnerVisible()).toBe(false);
});
```

**Problems:**
- Arbitrary delays might be too short or unnecessarily long
- Depends on machine speed
- Network conditions affect timing
- CI/CD might have different timing

**✅ GOOD - Deterministic (Condition-Based)**
```javascript
test('shows success message after save completes', async () => {
  const savePromise = saveData();

  await waitFor(() => {
    expect(getSuccessMessage()).toBe('Saved successfully');
  }, { timeout: 5000 });

  // Verify the save actually completed
  await expect(savePromise).resolves.toBe(true);
});

test('hides loading spinner when data loads', async () => {
  expect(isSpinnerVisible()).toBe(false); // Initially hidden

  loadData();

  // Spinner should appear
  await waitFor(() => {
    expect(isSpinnerVisible()).toBe(true);
  });

  // Spinner should hide when done
  await waitFor(() => {
    expect(isSpinnerVisible()).toBe(false);
  }, { timeout: 5000 });
});
```

---

### Example 4.2: Random Values

**❌ BAD - Non-Deterministic**
```javascript
test('generates unique ID', () => {
  const id = generateUniqueId();
  expect(id).toBe('abc123xyz'); // Will fail on next run!
});

test('shuffles array randomly', () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = shuffle(arr);
  expect(shuffled).toEqual([3, 1, 5, 2, 4]); // Wrong order next time!
});

test('sets current timestamp', () => {
  const record = createRecord();
  expect(record.timestamp).toBe(1732464000000); // Wrong tomorrow!
});
```

**✅ GOOD - Deterministic**
```javascript
test('generates unique ID with correct format', () => {
  const id = generateUniqueId();

  // Check format, not specific value
  expect(id).toMatch(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}$/);
  expect(id.length).toBe(21);
});

test('shuffles array to different order', () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffle([...original]);

  // Verify all elements present
  expect(shuffled.sort()).toEqual(original.sort());

  // Verify it's actually shuffled (run multiple times)
  const isShuffled = !shuffled.every((val, idx) => val === original[idx]);
  expect(isShuffled).toBe(true);
});

test('sets timestamp to current time', () => {
  const beforeCreate = Date.now();
  const record = createRecord();
  const afterCreate = Date.now();

  // Check timestamp is within reasonable range
  expect(record.timestamp).toBeGreaterThanOrEqual(beforeCreate);
  expect(record.timestamp).toBeLessThanOrEqual(afterCreate);
});

// OR use mocking for full determinism
test('sets record timestamp (mocked)', () => {
  const mockDate = new Date('2025-11-24T10:00:00Z');
  jest.useFakeTimers().setSystemTime(mockDate);

  const record = createRecord();

  expect(record.timestamp).toBe(mockDate.getTime());

  jest.useRealTimers();
});
```

---

## 5. Incorrect Mocks

### Example 5.1: API Response Mismatch

**❌ BAD - Mock Doesn't Match Real API**
```javascript
// Real API returns: { data: { user: {...} }, meta: {...} }
// But mock returns just the user object:

jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'John'
  })
}));

test('displays user name', async () => {
  await loadUser(1);
  expect(getDisplayName()).toBe('John'); // Passes in test, fails in production!
});
```

**✅ GOOD - Mock Matches Real API**
```javascript
// Match the exact structure of real API
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({
    data: {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2025-11-24T10:00:00Z'
      }
    },
    meta: {
      timestamp: '2025-11-24T10:00:00Z',
      version: 'v1'
    }
  })
}));

test('displays user name from API response', async () => {
  await loadUser(1);
  expect(getDisplayName()).toBe('John Doe');
});
```

---

### Example 5.2: Mock Function Behavior

**❌ BAD - Oversimplified Mock**
```javascript
const mockDatabase = {
  query: jest.fn().mockResolvedValue([{ id: 1 }])
};

// This mock always returns the same thing,
// regardless of query parameters!

test('finds users by status', async () => {
  const activeUsers = await mockDatabase.query('SELECT * WHERE status = active');
  expect(activeUsers).toHaveLength(1); // Always 1, even if query changes!
});
```

**✅ GOOD - Mock Handles Different Inputs**
```javascript
const mockDatabase = {
  query: jest.fn().mockImplementation((sql) => {
    if (sql.includes('status = active')) {
      return Promise.resolve([
        { id: 1, name: 'Alice', status: 'active' },
        { id: 2, name: 'Bob', status: 'active' }
      ]);
    }
    if (sql.includes('status = inactive')) {
      return Promise.resolve([
        { id: 3, name: 'Charlie', status: 'inactive' }
      ]);
    }
    return Promise.resolve([]);
  })
};

test('finds active users', async () => {
  const activeUsers = await mockDatabase.query('SELECT * WHERE status = active');

  expect(activeUsers).toHaveLength(2);
  expect(activeUsers.every(u => u.status === 'active')).toBe(true);
});

test('finds inactive users', async () => {
  const inactiveUsers = await mockDatabase.query('SELECT * WHERE status = inactive');

  expect(inactiveUsers).toHaveLength(1);
  expect(inactiveUsers[0].status).toBe('inactive');
});
```

---

## 6. Over-Testing vs. Behavior Testing

### Example 6.1: Testing Implementation Details

**❌ BAD - Tests Implementation**
```javascript
class UserService {
  constructor() {
    this.users = new Map();
    this.idCounter = 0;
  }

  addUser(name) {
    this.idCounter++;
    const user = { id: this.idCounter, name };
    this.users.set(this.idCounter, user);
    return user;
  }
}

// BAD: Testing internal structure
test('uses Map for storage', () => {
  const service = new UserService();
  expect(service.users).toBeInstanceOf(Map);
});

test('increments idCounter', () => {
  const service = new UserService();
  service.addUser('John');
  expect(service.idCounter).toBe(1);
  service.addUser('Jane');
  expect(service.idCounter).toBe(2);
});
```

**Problems:**
- Tests break when implementation changes
- Doesn't verify actual behavior
- Tightly coupled to internal structure

**✅ GOOD - Tests Behavior**
```javascript
describe('UserService', () => {
  test('adds user and returns user object', () => {
    const service = new UserService();

    const user = service.addUser('John Doe');

    expect(user).toMatchObject({
      id: expect.any(Number),
      name: 'John Doe'
    });
  });

  test('assigns unique IDs to multiple users', () => {
    const service = new UserService();

    const user1 = service.addUser('John');
    const user2 = service.addUser('Jane');

    expect(user1.id).not.toBe(user2.id);
  });

  test('can retrieve added user', () => {
    const service = new UserService();

    const added = service.addUser('John');
    const retrieved = service.getUser(added.id);

    expect(retrieved).toEqual(added);
  });
});
```

---

## 7. Mutation Testing Examples

### Example 7.1: Discount Calculation

**Code Under Test:**
```javascript
function calculateDiscount(price, customerType) {
  if (price > 100 && customerType === 'vip') {
    return price * 0.20; // 20% discount
  }
  return 0;
}
```

**Weak Test:**
```javascript
test('calculates VIP discount', () => {
  const discount = calculateDiscount(150, 'vip');
  expect(discount).toBeGreaterThan(0);
});
```

**Mutation Analysis:**

| Mutation | Code | Test Result | Status |
|----------|------|-------------|--------|
| 1 | `price > 100` → `price >= 100` | Pass ❌ | SURVIVED |
| 2 | `price > 100` → `price > 99` | Pass ❌ | SURVIVED |
| 3 | `&& customerType === 'vip'` → `|| customerType === 'vip'` | Pass ❌ | SURVIVED |
| 4 | `0.20` → `0.10` | Pass ❌ | SURVIVED |
| 5 | `0.20` → `0.30` | Pass ❌ | SURVIVED |
| 6 | `return price * 0.20` → `return 0` | Fail ✅ | CAUGHT |

**Mutation Score**: 1/6 = 16.7% (Very Poor!)

**Strong Test:**
```javascript
describe('calculateDiscount', () => {
  test('applies 20% discount for VIP customers over $100', () => {
    expect(calculateDiscount(150, 'vip')).toBe(30); // 150 * 0.20
    expect(calculateDiscount(200, 'vip')).toBe(40); // 200 * 0.20
  });

  test('no discount for VIP customers at or below $100', () => {
    expect(calculateDiscount(100, 'vip')).toBe(0); // Boundary
    expect(calculateDiscount(50, 'vip')).toBe(0);
  });

  test('no discount for non-VIP customers', () => {
    expect(calculateDiscount(150, 'regular')).toBe(0);
    expect(calculateDiscount(200, 'member')).toBe(0);
  });

  test('no discount for non-VIP even over $100', () => {
    expect(calculateDiscount(150, 'regular')).toBe(0);
  });
});
```

**New Mutation Score**: 6/6 = 100% ✅

---

### Example 7.2: Input Validation

**Code Under Test:**
```javascript
function validateEmail(email) {
  if (!email || email.length === 0) {
    return false;
  }
  if (email.indexOf('@') === -1) {
    return false;
  }
  return true;
}
```

**Test:**
```javascript
test('validates email', () => {
  expect(validateEmail('test@example.com')).toBe(true);
  expect(validateEmail('invalid')).toBe(false);
});
```

**Mutations:**

| Mutation | Code | Caught? |
|----------|------|---------|
| 1 | `email.length === 0` → `email.length <= 0` | ✅ Yes |
| 2 | `email.length === 0` → `email.length < 0` | ✅ Yes |
| 3 | `email.indexOf('@') === -1` → `email.indexOf('@') < 0` | ❌ No (same behavior) |
| 4 | `email.indexOf('@') === -1` → `email.indexOf('@') <= -1` | ❌ No |
| 5 | `return true` → `return false` | ✅ Yes |
| 6 | Remove `if (!email...)` check | ❌ No (need null/undefined test) |

**Improvement:**
```javascript
describe('validateEmail', () => {
  test('accepts valid email formats', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  test('rejects emails without @', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('nodomain')).toBe(false);
  });

  test('rejects null and undefined', () => {
    expect(validateEmail(null)).toBe(false);
    expect(validateEmail(undefined)).toBe(false);
  });

  test('rejects empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
});
```

---

## 8. Coverage Quality Examples

### Example 8.1: 100% Coverage But Weak Tests

**Code:**
```javascript
function processPayment(amount, cardType) {
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }

  let fee;
  if (cardType === 'visa') {
    fee = amount * 0.029;
  } else if (cardType === 'mastercard') {
    fee = amount * 0.032;
  } else {
    fee = amount * 0.04;
  }

  return {
    amount: amount,
    fee: Math.round(fee * 100) / 100,
    total: amount + fee
  };
}
```

**Tests with 100% Coverage:**
```javascript
test('visa payment', () => {
  const result = processPayment(100, 'visa');
  expect(result.amount).toBeDefined();
});

test('mastercard payment', () => {
  const result = processPayment(100, 'mastercard');
  expect(result.amount).toBeDefined();
});

test('other card payment', () => {
  const result = processPayment(100, 'amex');
  expect(result.amount).toBeDefined();
});

test('invalid amount', () => {
  expect(() => processPayment(0, 'visa')).toThrow();
});
```

**Coverage**: 100% ✅
**Quality**: POOR ❌

**What's NOT tested despite 100% coverage:**
- Fee calculation correctness
- Total calculation correctness
- Rounding behavior
- Specific fee rates
- Negative amounts
- Error messages

**Quality Tests:**
```javascript
describe('processPayment', () => {
  describe('valid payments', () => {
    test('calculates Visa payment with 2.9% fee', () => {
      const result = processPayment(100, 'visa');

      expect(result).toEqual({
        amount: 100,
        fee: 2.90,
        total: 102.90
      });
    });

    test('calculates Mastercard payment with 3.2% fee', () => {
      const result = processPayment(100, 'mastercard');

      expect(result).toEqual({
        amount: 100,
        fee: 3.20,
        total: 103.20
      });
    });

    test('calculates other card payment with 4% fee', () => {
      const result = processPayment(100, 'amex');

      expect(result).toEqual({
        amount: 100,
        fee: 4.00,
        total: 104.00
      });
    });

    test('rounds fee to 2 decimal places', () => {
      const result = processPayment(33.33, 'visa');

      // 33.33 * 0.029 = 0.96657 → should round to 0.97
      expect(result.fee).toBe(0.97);
      expect(result.total).toBe(34.30);
    });
  });

  describe('invalid inputs', () => {
    test('rejects zero amount with specific error', () => {
      expect(() => processPayment(0, 'visa'))
        .toThrow('Invalid amount');
    });

    test('rejects negative amount', () => {
      expect(() => processPayment(-10, 'visa'))
        .toThrow('Invalid amount');
    });
  });
});
```

---

## 9. AI Review Prompts

### Prompt 9.1: Comprehensive Quality Review

```
Review these tests against production quality standards:

[Paste your tests here]

Evaluate each test against these 8 criteria:
1. Meaningful Assertion - Tests actual behavior, not just existence
2. Correct Expected Value - Verified independently, not copied from output
3. Descriptive Name - Clear what is being tested and why
4. Single Responsibility - Tests one thing
5. Proper Isolation - No shared state between tests
6. Deterministic - Same result every run
7. Fast - Runs quickly (< 100ms per test)
8. Independent - Can run in any order

For each test, provide:
- Test name
- Score (0-8) based on criteria met
- Issues found with severity (High/Medium/Low)
- Specific code that needs fixing
- Suggested improvement with code

Also identify:
- Missing edge cases
- Missing error scenarios
- Weak assertions
- Tests that could be combined or split

Format output as a table and detailed recommendations.
```

---

### Prompt 9.2: Mutation Testing Analysis

```
Help me perform mutation testing on this code:

Code under test:
```[language]
[paste code]
```

Existing tests:
```[language]
[paste tests]
```

Generate 15-20 mutations covering:
- Boundary conditions (>, >=, <, <=, ==, !=)
- Arithmetic operators (+, -, *, /)
- Logical operators (&&, ||, !)
- Constant values
- Return statements

For each mutation:
1. Mutation description
2. Original code
3. Mutated code
4. Would any test fail? (Yes/No)
5. If yes, which test would catch it?
6. If no, suggest a test to catch it

Calculate mutation score and provide recommendations.
```

---

### Prompt 9.3: Coverage Gap Analysis

```
Analyze coverage quality for this code:

Code:
```[language]
[paste code]
```

Tests (with "X% coverage"):
```[language]
[paste tests]
```

Despite the coverage percentage, identify:

1. **Values Not Verified**
   - What return values are unchecked?
   - What calculations aren't validated?
   - What properties aren't verified?

2. **Edge Cases Missed**
   - What boundary conditions aren't tested?
   - What extreme values aren't covered?
   - What unusual combinations aren't tried?

3. **Error Scenarios Missing**
   - What error paths aren't tested?
   - What error messages aren't validated?
   - What failure modes aren't covered?

4. **Potential Bugs**
   - What bugs could exist that tests wouldn't catch?
   - Provide specific examples of code changes that wouldn't fail tests

Generate additional tests to achieve true quality coverage.
```

---

### Prompt 9.4: Test Improvement

```
Improve these tests to production quality:

Current tests:
```[language]
[paste tests]
```

Issues identified:
1. [Issue 1]
2. [Issue 2]
...

Requirements:
- Fix all identified issues
- Strengthen weak assertions
- Add missing edge cases
- Ensure proper isolation
- Improve test names
- Add error scenario tests
- Follow the 8 quality criteria

Provide:
1. Improved test code
2. Explanation of changes made
3. What bugs the new tests would catch that old tests missed
```

---

## 10. Complete Before/After Suite

### Scenario: User Authentication Service

**BEFORE - AI Generated Tests (Poor Quality)**

```javascript
describe('AuthService', () => {
  test('login works', async () => {
    const result = await authService.login('user@test.com', 'password123');
    expect(result).toBeDefined();
  });

  test('login fails', async () => {
    try {
      await authService.login('user@test.com', 'wrong');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('registers user', async () => {
    const user = await authService.register('new@test.com', 'pass123');
    expect(user.id).toBeTruthy();
  });

  test('logout works', async () => {
    await authService.logout();
    expect(true).toBe(true);
  });
});
```

**Issues:**
- Weak assertions (toBeDefined, toBeTruthy)
- No validation of return structure
- Missing error message validation
- No edge cases
- Missing token validation
- No isolation (shared state)

---

**AFTER - Production Quality Tests**

```javascript
describe('AuthService', () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  afterEach(async () => {
    await authService.cleanup();
  });

  describe('login', () => {
    test('returns valid token for correct credentials', async () => {
      const result = await authService.login(
        'user@example.com',
        'validPassword123'
      );

      expect(result).toMatchObject({
        token: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/),
        expiresIn: 3600,
        user: {
          id: expect.any(String),
          email: 'user@example.com'
        }
      });
    });

    test('rejects login with incorrect password', async () => {
      await expect(
        authService.login('user@example.com', 'wrongPassword')
      ).rejects.toMatchObject({
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
        status: 401
      });
    });

    test('rejects login with non-existent email', async () => {
      await expect(
        authService.login('nonexistent@example.com', 'anyPassword')
      ).rejects.toMatchObject({
        message: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS',
        status: 401
      });
    });

    test('rejects login with invalid email format', async () => {
      await expect(
        authService.login('not-an-email', 'password123')
      ).rejects.toMatchObject({
        message: 'Invalid email format',
        code: 'INVALID_EMAIL',
        status: 400
      });
    });

    test('rejects login with empty password', async () => {
      await expect(
        authService.login('user@example.com', '')
      ).rejects.toMatchObject({
        message: 'Password required',
        code: 'MISSING_PASSWORD',
        status: 400
      });
    });

    test('rate limits login attempts', async () => {
      const email = 'user@example.com';

      // Make 5 failed attempts
      for (let i = 0; i < 5; i++) {
        await authService.login(email, 'wrong').catch(() => {});
      }

      // 6th attempt should be rate limited
      await expect(
        authService.login(email, 'wrong')
      ).rejects.toMatchObject({
        message: 'Too many login attempts',
        code: 'RATE_LIMIT_EXCEEDED',
        status: 429,
        retryAfter: expect.any(Number)
      });
    });
  });

  describe('register', () => {
    test('creates user with valid data', async () => {
      const userData = {
        email: `test-${Date.now()}@example.com`,
        password: 'SecurePass123!',
        name: 'Test User'
      };

      const result = await authService.register(userData);

      expect(result).toMatchObject({
        user: {
          id: expect.stringMatching(/^usr_[a-zA-Z0-9]+$/),
          email: userData.email,
          name: userData.name,
          createdAt: expect.any(Date),
          status: 'active'
        },
        token: expect.stringMatching(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/)
      });

      // Password should never be in response
      expect(result.user.password).toBeUndefined();
    });

    test('rejects registration with existing email', async () => {
      const email = `existing-${Date.now()}@example.com`;

      await authService.register({
        email,
        password: 'Pass123!',
        name: 'First User'
      });

      await expect(
        authService.register({
          email,
          password: 'Different456!',
          name: 'Second User'
        })
      ).rejects.toMatchObject({
        message: 'Email already registered',
        code: 'DUPLICATE_EMAIL',
        status: 409
      });
    });

    test('rejects weak password', async () => {
      await expect(
        authService.register({
          email: 'newuser@example.com',
          password: '123', // Too short
          name: 'Test User'
        })
      ).rejects.toMatchObject({
        message: 'Password does not meet requirements',
        code: 'WEAK_PASSWORD',
        status: 400,
        requirements: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumber: true
        }
      });
    });
  });

  describe('logout', () => {
    test('invalidates token after logout', async () => {
      const { token } = await authService.login(
        'user@example.com',
        'password123'
      );

      await authService.logout(token);

      // Token should no longer be valid
      await expect(
        authService.validateToken(token)
      ).rejects.toMatchObject({
        message: 'Token has been revoked',
        code: 'TOKEN_REVOKED',
        status: 401
      });
    });
  });
});
```

**Improvements Made:**
1. ✅ Strong assertions with exact structure validation
2. ✅ Error message and code validation
3. ✅ Edge cases covered (rate limiting, duplicates, validation)
4. ✅ Proper test isolation with beforeEach/afterEach
5. ✅ Descriptive test names
6. ✅ Token format validation
7. ✅ Security testing (password not in response)
8. ✅ Comprehensive error scenarios

---

**Use these examples as templates for your own test validation and improvement work!**

[Back to Module Overview](./MODULE-OVERVIEW.md)
