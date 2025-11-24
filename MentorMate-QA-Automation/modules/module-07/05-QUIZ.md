# Module 7 Quiz: Test Validation and Quality Assurance

**Time Limit**: 20 minutes
**Passing Score**: 70% (28/40 points)
**Total Points**: 40

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- Answer all questions to the best of your ability
- For multiple choice, select the single best answer
- For true/false, mark your answer clearly
- For short answer, be specific and concise
- For the practical question, provide code and explanations

---

## Section 1: Multiple Choice (2 points each)

### Question 1
What is mutation testing?

**a)** Testing code mutations in genetic algorithms
**b)** Introducing small bugs to see if tests catch them
**c)** Testing different versions of code
**d)** Random testing approaches

**Your Answer**: _____

---

### Question 2
What is a mutation score?

**a)** Number of tests passed
**b)** Percentage of mutations caught by tests
**c)** Code coverage percentage
**d)** Number of bugs found

**Your Answer**: _____

---

### Question 3
Which is NOT a quality indicator for tests?

**a)** Assertion specificity
**b)** Test isolation
**c)** Number of lines of test code
**d)** Edge case coverage

**Your Answer**: _____

---

### Question 4
What does 100% code coverage guarantee?

**a)** All bugs are found
**b)** All code paths are executed
**c)** All edge cases are tested
**d)** Tests are production-ready

**Your Answer**: _____

---

### Question 5
How do you identify flaky tests?

**a)** They always fail
**b)** They pass/fail inconsistently
**c)** They are slow
**d)** They have weak assertions

**Your Answer**: _____

---

## Section 2: True/False (1 point each)

### Question 6
High code coverage always means high-quality tests.

- [ ] True
- [ ] False

**Your Answer**: _____

---

### Question 7
Mutation testing helps identify weak assertions.

- [ ] True
- [ ] False

**Your Answer**: _____

---

### Question 8
`expect(result).toBe(true)` is stronger than `expect(result).toBeTruthy()`.

- [ ] True
- [ ] False

**Your Answer**: _____

---

### Question 9
Tests should be reviewed for quality like production code.

- [ ] True
- [ ] False

**Your Answer**: _____

---

### Question 10
A test that verifies "not undefined" is sufficient for most cases.

- [ ] True
- [ ] False

**Your Answer**: _____

---

## Section 3: Short Answer (5 points each)

### Question 11
List four indicators of weak test assertions.

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
4. _____________________________________________

---

### Question 12
Given this test, what mutations would NOT be caught?

```javascript
test('calculates tax', () => {
  const result = calculateTax(100);
  expect(result).toBeDefined();
  expect(typeof result).toBe('number');
});
```

List 3 mutations that would survive (not be caught by the test):

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

---

### Question 13
Write a quality review checklist for AI-generated tests (5 items).

- [ ] _____________________________________________
- [ ] _____________________________________________
- [ ] _____________________________________________
- [ ] _____________________________________________
- [ ] _____________________________________________

---

## Section 4: Practical Application (10 points)

### Question 14
Analyze these tests for quality issues and provide fixes.

```javascript
// Test 1
test('validates email', () => {
  const result = validateEmail('test@test.com');
  expect(result).toBeTruthy();
});

// Test 2
test('handles errors', () => {
  try {
    processOrder(null);
  } catch (e) {
    expect(e).toBeDefined();
  }
});

// Test 3
test('creates order', async () => {
  const order = await createOrder(user, items);
  expect(order.id).toBeTruthy();
  expect(order.status).toBeDefined();
});
```

**For each test, identify the issue and provide a fix:**

#### Test 1: Email Validation
**Issue**:
_____________________________________________
_____________________________________________

**Fix (write improved test code)**:
```javascript
// Your improved test here








```

---

#### Test 2: Error Handling
**Issue**:
_____________________________________________
_____________________________________________

**Fix (write improved test code)**:
```javascript
// Your improved test here








```

---

#### Test 3: Order Creation
**Issue**:
_____________________________________________
_____________________________________________

**Fix (write improved test code)**:
```javascript
// Your improved test here








```

---

## Answer Key

*(For instructor use)*

---

## Section 1: Multiple Choice

1. **b** - Introducing small bugs to see if tests catch them
2. **b** - Percentage of mutations caught by tests
3. **c** - Number of lines of test code
4. **b** - All code paths are executed (but doesn't guarantee quality)
5. **b** - They pass/fail inconsistently

**Section 1 Total: 10 points**

---

## Section 2: True/False

6. **False** - High coverage doesn't guarantee quality; assertions might be weak
7. **True** - Mutation testing reveals whether assertions actually catch bugs
8. **True** - `.toBe(true)` checks for exact value; `.toBeTruthy()` accepts many values
9. **True** - Tests are code and need the same quality standards
10. **False** - "Not undefined" is a very weak assertion that doesn't verify actual behavior

**Section 2 Total: 5 points**

---

## Section 3: Short Answer

### Question 11 (5 points - 1.25 each)
**Indicators of weak assertions (any 4 of these):**
- Only checks if defined/truthy
- Doesn't verify specific values
- Doesn't verify data types
- Doesn't verify error messages
- Doesn't check object structure
- Uses loose matchers (toBeTruthy vs toBe)
- Doesn't verify calculations
- Checks only for existence, not correctness

---

### Question 12 (5 points - 1.67 each)
**Mutations that would survive (any 3):**
- Return wrong value (return 0, return 999, etc.)
- Wrong tax rate (8% to 9%, 10% to 5%)
- Wrong calculation (addition instead of multiplication)
- Return negative value
- Return NaN (still a number)
- Change formula completely
- Use wrong input parameter

**Example answers:**
1. Changing tax rate from 10% to 5% - still returns a defined number
2. Returning 0 instead of calculated value - still defined and a number
3. Returning 1000 instead of correct calculation - still defined and a number

---

### Question 13 (5 points - 1 each)
**Quality checklist items (any 5):**
- [ ] Assertions are specific (not just toBeDefined or toBeTruthy)
- [ ] Error messages are verified (not just that error exists)
- [ ] Edge cases are covered (boundaries, nulls, empty values)
- [ ] Tests are isolated (no shared state between tests)
- [ ] Test names describe behavior (what and why)
- [ ] Mocks match real API responses
- [ ] Each test has one clear purpose
- [ ] Tests are deterministic (same result every time)
- [ ] Expected values are calculated independently
- [ ] Error codes/types are validated

**Section 3 Total: 15 points**

---

## Section 4: Practical Application

### Test 1: Email Validation (3.33 points)

**Issue** (1.5 points):
- `toBeTruthy()` accepts any truthy value, not just `true`
- Doesn't verify the function returns exactly `true` for valid emails
- Could pass if function returns 1, "yes", [], {}, etc.
- Doesn't test invalid email cases

**Fix** (1.83 points):
```javascript
test('validates email and returns true for valid format', () => {
  expect(validateEmail('test@test.com')).toBe(true);
  expect(validateEmail('user@example.org')).toBe(true);
});

test('rejects invalid email formats', () => {
  expect(validateEmail('invalid')).toBe(false);
  expect(validateEmail('missing@')).toBe(false);
  expect(validateEmail('@nodomain')).toBe(false);
  expect(validateEmail('')).toBe(false);
});
```

---

### Test 2: Error Handling (3.33 points)

**Issue** (1.5 points):
- Test passes even if no error is thrown (empty catch block)
- Doesn't verify error message or error type
- Doesn't verify error code or status
- Using try-catch is error-prone for async testing

**Fix** (1.83 points):
```javascript
test('throws specific error for null order', () => {
  expect(() => processOrder(null)).toThrow(
    new Error('Order data is required')
  );
});

// OR for async:
test('rejects null order with specific error', async () => {
  await expect(processOrder(null)).rejects.toMatchObject({
    message: 'Order data is required',
    code: 'INVALID_ORDER',
    status: 400
  });
});
```

---

### Test 3: Order Creation (3.34 points)

**Issue** (1.5 points):
- `toBeTruthy()` and `toBeDefined()` are too weak
- Doesn't verify actual ID format or value
- Doesn't verify status is a specific expected value
- Doesn't check other required order properties
- Missing verification of order details (user, items, total, etc.)

**Fix** (1.84 points):
```javascript
test('creates order with correct properties and format', async () => {
  const user = { id: 'usr_123', email: 'test@example.com' };
  const items = [
    { id: 'item_1', quantity: 2, price: 29.99 }
  ];

  const order = await createOrder(user, items);

  expect(order).toMatchObject({
    id: expect.stringMatching(/^ord_[a-zA-Z0-9]+$/),
    status: 'pending',
    userId: 'usr_123',
    items: expect.arrayContaining([
      expect.objectContaining({
        id: 'item_1',
        quantity: 2,
        price: 29.99
      })
    ]),
    total: 59.98,
    createdAt: expect.any(Date)
  });
});
```

**Section 4 Total: 10 points**

---

## Scoring Summary

| Section | Points Available | Points Earned |
|---------|------------------|---------------|
| Multiple Choice (5 questions) | 10 | _____ |
| True/False (5 questions) | 5 | _____ |
| Short Answer (3 questions) | 15 | _____ |
| Practical Application | 10 | _____ |
| **TOTAL** | **40** | **_____** |

---

## Grading Scale

| Score | Grade | Status |
|-------|-------|--------|
| 36-40 | A (90-100%) | Excellent |
| 32-35 | B (80-89%) | Very Good |
| 28-31 | C (70-79%) | **PASSING** |
| 24-27 | D (60-69%) | Below Passing |
| 0-23 | F (0-59%) | Failing |

**Minimum Passing Score**: 28/40 (70%)

---

## Detailed Rubric for Question 14

### Test 1 - Email Validation (3.33 points)

| Component | Excellent (Full Points) | Partial | Insufficient |
|-----------|------------------------|---------|--------------|
| **Issue Identification** (1.5 pts) | Identifies weak assertion and missing test cases | Identifies only assertion weakness OR missing cases | Generic or incorrect |
| **Fix Implementation** (1.83 pts) | Strong assertion + edge cases | Strong assertion only | Weak fix |

### Test 2 - Error Handling (3.33 points)

| Component | Excellent (Full Points) | Partial | Insufficient |
|-----------|------------------------|---------|--------------|
| **Issue Identification** (1.5 pts) | Identifies try-catch flaw and missing validation | Identifies one issue | Misses key problems |
| **Fix Implementation** (1.83 pts) | Uses expect().toThrow() or rejects + validates message | Uses better pattern but incomplete | Still flawed |

### Test 3 - Order Creation (3.34 points)

| Component | Excellent (Full Points) | Partial | Insufficient |
|-----------|------------------------|---------|--------------|
| **Issue Identification** (1.5 pts) | Identifies weak assertions and missing property checks | Identifies assertion weakness | Generic |
| **Fix Implementation** (1.84 pts) | Comprehensive toMatchObject with all properties | Some property validation | Minimal improvement |

---

## Common Mistakes to Avoid

**In Multiple Choice:**
- Don't confuse coverage with quality
- Mutation testing is about validating tests, not changing production code
- Number of test lines is not a quality indicator

**In True/False:**
- Coverage metrics alone don't guarantee quality
- Strong assertions require exact value matching

**In Short Answer:**
- Be specific (don't just say "bad assertions")
- Provide concrete examples when possible

**In Practical:**
- Don't just identify that something is wrong - explain WHY
- Improved tests should address the specific issues identified
- Use appropriate matchers (toBe vs toBeTruthy, toMatchObject, etc.)

---

## Study Tips for Retake

If you didn't pass:

1. **Review Module 7 Slides** - Focus on the 8 quality criteria
2. **Study Code Examples** - Before/after comparisons
3. **Practice Mutation Testing** - Understand how to identify surviving mutations
4. **Understand Assertions** - Learn the difference between weak and strong
5. **Review Lab Work** - Your hands-on experience is the best study guide

**Key Concepts to Master:**
- The 8-criteria quality checklist
- Weak vs. strong assertions
- Mutation testing purpose and calculation
- Coverage vs. quality
- Test isolation
- Error handling best practices

---

**End of Quiz**

[Back to Module Overview](./MODULE-OVERVIEW.md)
