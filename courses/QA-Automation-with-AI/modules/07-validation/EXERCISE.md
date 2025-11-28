# Exercise 7: Test Validation and Review

## Objective

Learn to validate AI-generated tests and improve their quality.

## Duration: 2 hours

---

## Scenario

You received AI-generated tests that need quality review. Your task is to identify issues and fix them.

---

## Part 1: Identify Weak Assertions (30 min)

### Task

Review these tests and identify weak assertions.

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
});
```

### Prompt

```
Analyze these tests for weak assertions and quality issues.

[Paste tests]

For each test, identify:
1. What is the assertion testing?
2. What could slip through this assertion?
3. What would be a stronger assertion?

Rate each test: Weak / Acceptable / Strong
```

### Deliverable

- Analysis document with identified issues
- Improved test version

---

## Part 2: Check Test Isolation (30 min)

### Task

Identify tests that may have isolation issues.

### Tests to Review

```javascript
let testUser;

describe('OrderService', () => {
  beforeAll(async () => {
    testUser = await createTestUser();
  });

  test('creates order for user', async () => {
    const order = await orderService.create(testUser.id, [
      { productId: 1, quantity: 2 }
    ]);

    expect(order.userId).toBe(testUser.id);
    testUser.lastOrderId = order.id; // Store for next test
  });

  test('gets user orders', async () => {
    const orders = await orderService.getByUser(testUser.id);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0].id).toBe(testUser.lastOrderId);
  });

  test('cancels order', async () => {
    await orderService.cancel(testUser.lastOrderId);
    const order = await orderService.get(testUser.lastOrderId);
    expect(order.status).toBe('cancelled');
  });

  test('empty cart after order', async () => {
    const cart = await cartService.get(testUser.id);
    expect(cart.items).toHaveLength(0);
  });
});
```

### Prompt

```
Analyze these tests for isolation issues.

[Paste tests]

Identify:
1. Shared state between tests
2. Test order dependencies
3. Tests that would fail if run alone
4. Tests that would fail if run in different order
5. Potential race conditions

Refactor to make each test independent.
```

### Deliverable

- Isolation analysis
- Refactored independent tests

---

## Part 3: Verify Coverage Quality (30 min)

### Task

Analyze if coverage represents true testing quality.

### Code Under Test

```javascript
function processPayment(amount, cardNumber, cvv) {
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (!cardNumber || cardNumber.length !== 16) {
    throw new Error('Invalid card number');
  }

  if (!cvv || cvv.length !== 3) {
    throw new Error('Invalid CVV');
  }

  // Luhn algorithm check
  const isValidCard = validateLuhn(cardNumber);
  if (!isValidCard) {
    throw new Error('Card failed validation');
  }

  // Process based on card type
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

  return {
    success: true,
    amount,
    fee: Math.round(fee * 100) / 100,
    total: amount + fee,
    cardType
  };
}
```

### Tests with "100% Coverage"

```javascript
test('processes visa payment', () => {
  const result = processPayment(100, '4111111111111111', '123');
  expect(result.success).toBe(true);
});

test('processes mastercard payment', () => {
  const result = processPayment(100, '5111111111111111', '123');
  expect(result.success).toBe(true);
});

test('processes amex payment', () => {
  const result = processPayment(100, '371111111111111', '1234');
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
```

### Prompt

```
These tests achieve 100% code coverage. Analyze what they're actually testing.

[Paste code and tests]

Identify:
1. What values are NOT being verified?
2. What edge cases are missed?
3. What could break without failing tests?
4. Where are assertions too weak?

Create additional tests that would catch real bugs.
```

### Deliverable

- Coverage quality analysis
- Additional tests for true coverage

---

## Part 4: Mutation Testing (30 min)

### Task

Apply manual mutation testing to evaluate test effectiveness.

### Exercise

For each mutation below, determine if the current tests would catch it:

```javascript
// Original
fee = amount * 0.029;

// Mutations to check:
// 1. fee = amount * 0.028;
// 2. fee = amount * 0.29;
// 3. fee = amount + 0.029;
// 4. fee = 0;
// 5. fee = amount;
```

```javascript
// Original
if (amount <= 0) {

// Mutations:
// 1. if (amount < 0) {
// 2. if (amount <= 1) {
// 3. if (amount == 0) {
// 4. if (amount >= 0) {
// 5. if (true) {
```

### Prompt

```
Analyze if these tests would catch these mutations:

[Paste tests]

Mutations:
[List mutations]

For each mutation:
1. Would any test fail?
2. Which test would catch it?
3. If not caught, what test would catch it?

Provide a "mutation score" (caught / total mutations).
```

### Deliverable

- Mutation analysis with score
- Additional tests to improve mutation score

---

## Submission

### Files

- `part1-assertion-analysis.md` - Weak assertion analysis and fixes
- `part2-isolation-analysis.md` - Isolation issues and refactoring
- `part3-coverage-analysis.md` - Coverage quality analysis
- `part4-mutation-analysis.md` - Mutation testing results
- `improved-tests.js` - All improved test code

### Grading

| Criterion | Points |
|-----------|--------|
| Assertion analysis | 25 |
| Isolation fixes | 25 |
| Coverage quality analysis | 25 |
| Mutation testing | 25 |

---

## Tips

- Always check what the assertion is actually verifying
- Tests should be independent - runnable in any order
- 100% coverage doesn't mean 100% tested
- Mutation testing reveals assertion quality

---

*Good luck!*
