# Module 7 Quiz: Test Validation and Quality

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What is mutation testing?

a) Testing code mutations
b) Introducing bugs to see if tests catch them
c) Testing genetic algorithms
d) Random testing

---

### Question 2
What is a mutation score?

a) Number of tests passed
b) Percentage of mutations caught by tests
c) Code coverage percentage
d) Number of bugs found

---

### Question 3
Which is NOT a quality indicator for tests?

a) Assertion specificity
b) Test isolation
c) Number of lines of test code
d) Edge case coverage

---

### Question 4
What does 100% code coverage guarantee?

a) All bugs are found
b) All code paths are executed
c) All edge cases are tested
d) Nothing specific about quality

---

### Question 5
How do you identify flaky tests?

a) They always fail
b) They pass/fail inconsistently
c) They are slow
d) They have weak assertions

---

## True/False (1 point each)

### Question 6
High coverage always means high-quality tests.

- [ ] True
- [ ] False

---

### Question 7
Mutation testing helps identify weak assertions.

- [ ] True
- [ ] False

---

### Question 8
`expect(result).toBe(true)` is stronger than `expect(result).toBeTruthy()`.

- [ ] True
- [ ] False

---

### Question 9
Tests should be reviewed for quality like production code.

- [ ] True
- [ ] False

---

### Question 10
A test that verifies "not undefined" is sufficient for most cases.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List four indicators of weak test assertions.

1. _____________
2. _____________
3. _____________
4. _____________

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

List 3 mutations that would survive:

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

## Practical (10 points)

### Question 14
Analyze these tests for quality issues and provide fixes:

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

**Issues and fixes:**

Test 1:
- Issue: _____________________________________________
- Fix: _____________________________________________

Test 2:
- Issue: _____________________________________________
- Fix: _____________________________________________

Test 3:
- Issue: _____________________________________________
- Fix: _____________________________________________

---

## Answer Key

*(For instructor use)*

1. b
2. b
3. c
4. b
5. b
6. False
7. True
8. True
9. True
10. False

### Question 11 (5 points)
Any four of:
- Only checks if defined/truthy
- Doesn't verify specific values
- Missing type checks
- Doesn't verify error messages
- Doesn't check object properties
- Uses loose matchers (toBeTruthy vs toBe)
(1.25 points each)

### Question 12 (5 points)
Mutations that survive:
- Change tax rate (8% to 9%)
- Return wrong value (return 0)
- Return NaN (still a number)
- Wrong calculation (+ instead of *)
- Return negative value
(1.67 points each for any 3)

### Question 13 (5 points)
Quality checklist items:
- Assertions are specific (not just toBeDefined)
- Error messages are verified
- Edge cases are covered
- Tests are isolated (no shared state)
- Test names describe behavior
- Mocks are properly reset
- Each test has one purpose
(1 point each for any 5)

### Question 14 (10 points)

Test 1 (3 points):
- Issue: toBeTruthy doesn't verify it's actually true
- Fix: `expect(result).toBe(true)` or `expect(validateEmail('test@test.com')).toBe(true)`

Test 2 (4 points):
- Issue: Test passes even if no error is thrown; doesn't verify error message
- Fix:
```javascript
test('throws error for null order', () => {
  expect(() => processOrder(null)).toThrow('Order is required');
});
```

Test 3 (3 points):
- Issue: Weak assertions (toBeTruthy, toBeDefined), doesn't verify values
- Fix:
```javascript
expect(order).toMatchObject({
  id: expect.any(String),
  status: 'pending',
  userId: user.id
});
```

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
