# Module 7: Test Validation and Quality Assurance - Exercises

**Total Time**: 2 hours
**Format**: Individual work with instructor review

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

This module contains four hands-on exercises designed to reinforce your understanding of test validation and quality assurance:

1. **Exercise 7.1**: Test Quality Review (30 minutes)
2. **Exercise 7.2**: Test Isolation Analysis (30 minutes)
3. **Exercise 7.3**: Coverage Quality Analysis (30 minutes)
4. **Exercise 7.4**: Mutation Testing (30 minutes)

Each exercise builds your skills in identifying and fixing common test quality issues.

---

## Exercise 7.1: Test Quality Review

**Objective**: Identify weak assertions and improve test quality

**Duration**: 30 minutes

**Difficulty**: Intermediate

### Scenario

You've received AI-generated tests for a UserService module. Your task is to review them against the quality checklist, identify issues, and provide fixes.

### Tests to Review

```javascript
describe('UserService', () => {
  describe('createUser', () => {
    test('creates a user', async () => {
      const user = await userService.createUser({
        name: 'John',
        email: 'john@test.com'
      });

      expect(user).toBeDefined();
      expect(user.id).toBeTruthy();
      expect(user.name).toBeTruthy();
    });

    test('handles duplicate email', async () => {
      await userService.createUser({ name: 'John', email: 'dup@test.com' });

      try {
        await userService.createUser({ name: 'Jane', email: 'dup@test.com' });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    test('validates email format', async () => {
      const result = await userService.createUser({
        name: 'Test',
        email: 'invalid-email'
      }).catch(e => e);

      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('getUser', () => {
    test('returns user by id', async () => {
      const user = await userService.getUser(1);
      expect(user).not.toBeNull();
    });

    test('handles not found', async () => {
      const user = await userService.getUser(9999);
      expect(user).toBeFalsy();
    });
  });

  describe('updateUser', () => {
    test('updates user information', async () => {
      const updated = await userService.updateUser(1, { name: 'Jane' });
      expect(updated).toBeDefined();
    });
  });
});
```

### Task 1: Apply Quality Checklist (15 minutes)

For each test, evaluate against the 8 quality criteria:

1. Meaningful Assertion
2. Correct Expected Value
3. Descriptive Name
4. Single Responsibility
5. Proper Isolation
6. Deterministic
7. Fast
8. Independent

Create a table documenting your findings:

| Test Name | Pass/Fail | Issues Found | Severity |
|-----------|-----------|--------------|----------|
| creates a user | | | |
| handles duplicate email | | | |
| ... | | | |

### Task 2: Identify Specific Issues (10 minutes)

For each failing test, document:
- **Issue Type**: (Weak assertion, missing validation, etc.)
- **Current Code**: [Problematic code snippet]
- **Why It's a Problem**: [Explanation]
- **Suggested Fix**: [Corrected code]

### Task 3: Write Improved Tests (5 minutes)

Rewrite at least 3 of the weakest tests to meet all quality criteria.

### Deliverables

Submit:
- ✓ Completed quality checklist table
- ✓ Detailed issue documentation (at least 5 issues)
- ✓ 3+ improved test implementations
- ✓ Brief summary of overall test quality

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Issue Identification** (30 pts) | Identifies 8+ issues accurately | Identifies 5-7 issues | Identifies 3-4 issues | < 3 issues identified |
| **Analysis Quality** (30 pts) | Clear, detailed explanations | Good explanations, minor gaps | Vague explanations | Poor or missing analysis |
| **Improved Tests** (30 pts) | All 3 tests meet 8 criteria | Tests meet most criteria | Tests improved but gaps remain | Minimal improvement |
| **Documentation** (10 pts) | Professional, well-organized | Good organization | Acceptable | Poor organization |

### Example Issue Documentation

```markdown
**Test**: "creates a user"
**Issue Type**: Weak Assertions
**Current Code**:
```javascript
expect(user).toBeDefined();
expect(user.id).toBeTruthy();
```
**Why It's a Problem**:
- `toBeDefined()` passes if user is any defined value (empty object, null, etc.)
- `toBeTruthy()` doesn't verify the actual ID format or validity
- Doesn't check if email, createdAt, or other fields exist
- Would pass even if user object is completely wrong

**Suggested Fix**:
```javascript
expect(user).toMatchObject({
  id: expect.stringMatching(/^usr_[a-zA-Z0-9]+$/),
  name: 'John',
  email: 'john@test.com',
  createdAt: expect.any(Date),
  status: 'active'
});
```
```

### Tips for Success

- Read each test carefully before evaluating
- Consider: "What bugs could slip through this test?"
- Be specific in your issue descriptions
- Test your improved versions mentally
- Focus on the most critical issues first

---

## Exercise 7.2: Test Isolation Analysis

**Objective**: Identify and fix test isolation problems

**Duration**: 30 minutes

**Difficulty**: Intermediate

### Scenario

The following test suite has isolation issues causing tests to fail when run in different orders or individually. Your job is to identify the problems and refactor for independence.

### Tests with Isolation Issues

```javascript
let testUser;
let testOrders = [];

describe('OrderService', () => {
  beforeAll(async () => {
    testUser = await createTestUser({
      id: 'test-user-1',
      email: 'test@example.com'
    });
  });

  test('creates order for user', async () => {
    const order = await orderService.create(testUser.id, [
      { productId: 1, quantity: 2, price: 29.99 }
    ]);

    expect(order.userId).toBe(testUser.id);
    expect(order.total).toBeGreaterThan(0);

    testOrders.push(order); // Store for next test
  });

  test('gets user orders', async () => {
    const orders = await orderService.getByUser(testUser.id);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0].id).toBe(testOrders[0].id);
  });

  test('adds item to existing order', async () => {
    const existingOrder = testOrders[0];
    await orderService.addItem(existingOrder.id, {
      productId: 2,
      quantity: 1,
      price: 19.99
    });

    const updated = await orderService.get(existingOrder.id);
    expect(updated.items.length).toBe(2);
  });

  test('calculates order total', async () => {
    const order = testOrders[0];
    expect(order.total).toBe(79.97); // 2*29.99 + 19.99
  });

  test('cancels order', async () => {
    await orderService.cancel(testOrders[0].id);
    const order = await orderService.get(testOrders[0].id);
    expect(order.status).toBe('cancelled');
  });

  test('empty cart after order', async () => {
    const cart = await cartService.get(testUser.id);
    expect(cart.items).toHaveLength(0);
  });

  afterAll(async () => {
    await deleteTestUser(testUser.id);
  });
});
```

### Task 1: Identify Isolation Issues (15 minutes)

For each test, identify:
1. **Shared State**: What state is shared with other tests?
2. **Dependencies**: Which other tests must run first?
3. **Side Effects**: What changes does this test make that affect others?
4. **Failure Impact**: If this test fails, which others will fail?

Create a dependency diagram showing test relationships.

### Task 2: Document Problems (10 minutes)

For each isolation issue found, document:
- **Test(s) Affected**
- **Type of Issue**: (Shared variable, order dependency, external state, etc.)
- **Symptom**: What fails and when?
- **Root Cause**: Why is this happening?

### Task 3: Refactor for Independence (5 minutes)

Rewrite at least 2 tests to be fully independent. Each test should:
- Create its own test data
- Not rely on other tests
- Clean up after itself
- Be runnable in any order

### Deliverables

Submit:
- ✓ Isolation issue analysis (at least 5 issues)
- ✓ Test dependency diagram
- ✓ Detailed problem documentation
- ✓ 2+ refactored independent tests

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Issue Identification** (25 pts) | Identifies all isolation issues | Identifies most issues | Misses some issues | Major issues missed |
| **Dependency Analysis** (25 pts) | Clear, accurate diagram | Good diagram, minor gaps | Basic diagram | Incomplete/incorrect |
| **Problem Documentation** (25 pts) | Thorough root cause analysis | Good analysis | Basic analysis | Superficial |
| **Refactored Tests** (25 pts) | Fully independent tests | Mostly independent | Some dependencies remain | Still dependent |

### Example Refactored Test

**Before** (dependent):
```javascript
test('gets user orders', async () => {
  const orders = await orderService.getByUser(testUser.id);
  expect(orders.length).toBeGreaterThan(0);
  expect(orders[0].id).toBe(testOrders[0].id);
});
```

**After** (independent):
```javascript
test('gets user orders', async () => {
  // Create test user
  const user = await createTestUser({
    email: 'ordertest@example.com'
  });

  // Create test order
  const order = await orderService.create(user.id, [
    { productId: 1, quantity: 1, price: 29.99 }
  ]);

  // Test retrieval
  const orders = await orderService.getByUser(user.id);
  expect(orders).toHaveLength(1);
  expect(orders[0].id).toBe(order.id);
  expect(orders[0].total).toBe(29.99);

  // Cleanup
  await orderService.delete(order.id);
  await deleteTestUser(user.id);
});
```

---

## Exercise 7.3: Coverage Quality Analysis

**Objective**: Analyze if coverage represents true testing quality

**Duration**: 30 minutes

**Difficulty**: Advanced

### Scenario

The following tests achieve 100% code coverage, but have significant quality gaps. Your task is to identify what's NOT being tested despite full coverage.

### Code Under Test

```javascript
function processPayment(amount, cardNumber, cvv) {
  // Validation
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (!cardNumber || cardNumber.length !== 16) {
    throw new Error('Invalid card number');
  }

  if (!cvv || cvv.length !== 3) {
    throw new Error('Invalid CVV');
  }

  // Luhn algorithm validation
  const isValidCard = validateLuhn(cardNumber);
  if (!isValidCard) {
    throw new Error('Card failed validation');
  }

  // Calculate fee based on card type
  const cardType = getCardType(cardNumber);
  let fee;

  if (cardType === 'visa') {
    fee = amount * 0.029;
  } else if (cardType === 'mastercard') {
    fee = amount * 0.032;
  } else if (cardType === 'amex') {
    fee = amount * 0.035;
  } else {
    fee = amount * 0.04;
  }

  const finalFee = Math.round(fee * 100) / 100;

  return {
    success: true,
    amount: amount,
    fee: finalFee,
    total: amount + finalFee,
    cardType: cardType
  };
}
```

### Tests with "100% Coverage"

```javascript
describe('processPayment', () => {
  test('processes visa payment', () => {
    const result = processPayment(100, '4111111111111111', '123');
    expect(result.success).toBe(true);
  });

  test('processes mastercard payment', () => {
    const result = processPayment(100, '5111111111111111', '123');
    expect(result.success).toBe(true);
  });

  test('processes amex payment', () => {
    const result = processPayment(100, '371111111111111', '123');
    expect(result.success).toBe(true);
  });

  test('processes other card', () => {
    const result = processPayment(100, '6011111111111111', '123');
    expect(result.success).toBe(true);
  });

  test('rejects invalid amount', () => {
    expect(() => processPayment(0, '4111111111111111', '123'))
      .toThrow('Invalid amount');
  });

  test('rejects invalid card', () => {
    expect(() => processPayment(100, '123', '123'))
      .toThrow('Invalid card number');
  });

  test('rejects invalid cvv', () => {
    expect(() => processPayment(100, '4111111111111111', '12'))
      .toThrow('Invalid CVV');
  });

  test('rejects card failing Luhn validation', () => {
    expect(() => processPayment(100, '1234567890123456', '123'))
      .toThrow('Card failed validation');
  });
});
```

### Task 1: Identify Missing Assertions (15 minutes)

Despite 100% coverage, list:
1. **Values NOT Being Verified**: What return values are unchecked?
2. **Edge Cases Missed**: What boundary conditions aren't tested?
3. **Calculation Gaps**: What computations aren't validated?
4. **Error Message Gaps**: What error details aren't checked?

### Task 2: Analyze Potential Bugs (10 minutes)

For each gap, describe a bug that could exist without failing these tests:

| Gap | Potential Bug | Would Current Tests Catch It? |
|-----|---------------|-------------------------------|
| Fee amount not checked | Fee calculated wrong (0.029 → 0.29) | No |
| ... | ... | ... |

### Task 3: Write Quality Tests (5 minutes)

Write 3-5 additional tests that would catch real bugs despite having 100% coverage.

### Deliverables

Submit:
- ✓ Coverage quality analysis documenting gaps
- ✓ List of potential bugs (at least 8)
- ✓ 3-5 new tests with meaningful assertions
- ✓ Before/after coverage quality assessment

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Gap Identification** (30 pts) | Identifies 10+ gaps | Identifies 6-9 gaps | Identifies 3-5 gaps | < 3 gaps identified |
| **Bug Analysis** (30 pts) | Realistic, detailed bugs | Good bugs, minor gaps | Basic bugs | Unrealistic bugs |
| **New Tests** (30 pts) | Comprehensive, meaningful | Good coverage | Some gaps | Weak tests |
| **Assessment** (10 pts) | Clear before/after analysis | Good analysis | Basic analysis | Minimal analysis |

### Example Quality Test

```javascript
test('calculates correct Visa fee and total', () => {
  const result = processPayment(100, '4111111111111111', '123');

  expect(result).toMatchObject({
    success: true,
    amount: 100,
    fee: 2.90, // 100 * 0.029 = 2.90
    total: 102.90, // 100 + 2.90
    cardType: 'visa'
  });
});

test('rounds fee to 2 decimal places', () => {
  const result = processPayment(100.50, '4111111111111111', '123');
  expect(result.fee).toBe(2.91); // Rounded properly
  expect(result.total).toBe(103.41);
});

test('rejects negative amounts', () => {
  expect(() => processPayment(-10, '4111111111111111', '123'))
    .toThrow('Invalid amount');
});
```

---

## Exercise 7.4: Mutation Testing

**Objective**: Apply mutation testing to validate test effectiveness

**Duration**: 30 minutes

**Difficulty**: Advanced

### Scenario

You have a discount calculation function and tests. Apply manual mutation testing to determine if the tests are strong enough to catch bugs.

### Code Under Test

```javascript
function calculateDiscount(price, quantity, customerType) {
  if (price <= 0 || quantity <= 0) {
    throw new Error('Invalid input');
  }

  let discount = 0;

  // Volume discount
  if (quantity >= 10) {
    discount += 0.10; // 10%
  }

  // Customer type discount
  if (customerType === 'vip') {
    discount += 0.15; // 15%
  } else if (customerType === 'member') {
    discount += 0.05; // 5%
  }

  // Max discount 25%
  if (discount > 0.25) {
    discount = 0.25;
  }

  const subtotal = price * quantity;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return {
    subtotal: subtotal,
    discount: discount,
    discountAmount: discountAmount,
    total: total
  };
}
```

### Existing Tests

```javascript
describe('calculateDiscount', () => {
  test('calculates basic purchase', () => {
    const result = calculateDiscount(10, 1, 'regular');
    expect(result.total).toBe(10);
  });

  test('applies volume discount', () => {
    const result = calculateDiscount(10, 10, 'regular');
    expect(result.total).toBeLessThan(100);
  });

  test('applies VIP discount', () => {
    const result = calculateDiscount(10, 1, 'vip');
    expect(result.total).toBeLessThan(10);
  });

  test('rejects invalid price', () => {
    expect(() => calculateDiscount(0, 1, 'regular')).toThrow();
  });
});
```

### Task 1: Define Mutations (10 minutes)

Create a table of mutations to test:

| # | Location | Original | Mutation | Type |
|---|----------|----------|----------|------|
| 1 | Line 7 | `quantity >= 10` | `quantity > 10` | Boundary |
| 2 | Line 8 | `discount += 0.10` | `discount += 0.15` | Value |
| ... | ... | ... | ... | ... |

Create at least 15 mutations covering:
- Boundary conditions (`>=` → `>`, `<=` → `<`)
- Arithmetic operators (`+` → `-`, `*` → `/`)
- Constants (change discount percentages)
- Logic (change conditions)
- Return values (change calculations)

### Task 2: Test Each Mutation (15 minutes)

For each mutation, determine:
1. **Would Any Test Fail?** (Yes/No)
2. **Which Test Would Catch It?** (Test name or "None")
3. **Why/Why Not?** (Brief explanation)

### Task 3: Calculate Mutation Score (5 minutes)

- **Mutations Caught**: Count how many would fail at least one test
- **Total Mutations**: Total number of mutations
- **Mutation Score**: (Caught / Total) × 100%

If score < 80%, write additional tests to improve it.

### Deliverables

Submit:
- ✓ Complete mutation table (15+ mutations)
- ✓ Analysis of each mutation
- ✓ Mutation score calculation
- ✓ Additional tests to achieve 80%+ score (if needed)

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Mutation Variety** (20 pts) | 15+ diverse mutations | 10-14 mutations | 7-9 mutations | < 7 mutations |
| **Analysis Accuracy** (30 pts) | Correct predictions | Mostly correct | Some errors | Major errors |
| **Score Calculation** (20 pts) | Correct calculation | Minor errors | Calculation issues | Incorrect |
| **Improvement Tests** (30 pts) | Comprehensive tests | Good tests | Basic tests | Weak/missing tests |

### Example Mutation Analysis

| # | Location | Original | Mutation | Would Fail? | Which Test? | Explanation |
|---|----------|----------|----------|-------------|-------------|-------------|
| 1 | Line 7 | `quantity >= 10` | `quantity > 10` | ❌ No | None | Test uses quantity=10, both pass |
| 2 | Line 8 | `0.10` | `0.15` | ❌ No | None | Assertion is `toLessThan`, not exact value |
| 3 | Line 13 | `'vip'` | `'premium'` | ✅ Yes | VIP discount test | Would not apply VIP discount |

**Needed Test**:
```javascript
test('applies exactly 10% discount for 10 items', () => {
  const result = calculateDiscount(10, 10, 'regular');
  expect(result).toMatchObject({
    subtotal: 100,
    discount: 0.10,
    discountAmount: 10,
    total: 90
  });
});
```

---

## Submission Guidelines

### File Structure

```
module-07-exercises/
├── exercise-7.1-quality-review.md
├── exercise-7.1-improved-tests.js
├── exercise-7.2-isolation-analysis.md
├── exercise-7.2-refactored-tests.js
├── exercise-7.3-coverage-analysis.md
├── exercise-7.3-quality-tests.js
├── exercise-7.4-mutation-analysis.md
└── exercise-7.4-improved-tests.js
```

### Overall Grading

| Exercise | Points |
|----------|--------|
| 7.1 - Quality Review | 25 |
| 7.2 - Isolation Analysis | 25 |
| 7.3 - Coverage Quality | 25 |
| 7.4 - Mutation Testing | 25 |
| **Total** | **100** |

**Passing**: 70+ points

---

## Tips for Success

1. **Be Systematic**: Use checklists, don't rely on intuition
2. **Be Specific**: Vague analysis doesn't help
3. **Think Like an Attacker**: What bugs could slip through?
4. **Test Your Fixes**: Run your improved tests
5. **Document Thoroughly**: Explain your reasoning
6. **Ask for Help**: If stuck, ask the instructor

---

**Good luck! Remember: Quality tests are your first line of defense against bugs.**

[Back to Module Overview](./MODULE-OVERVIEW.md)
