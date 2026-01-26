# Module 7: Test Validation and Quality Assurance

## Duration: 4 hours

## Learning Objectives

By the end of this module, you will be able to:
- Review AI-generated tests for quality
- Identify and fix common test issues
- Apply mutation testing
- Analyze and improve coverage

---

## 7.1 Why Validate AI-Generated Tests?

### Common AI Test Issues

1. **Weak assertions** - `toBeDefined()` instead of actual checks
2. **Missing edge cases** - Only tests happy path
3. **Incorrect mocks** - Mock returns wrong data
4. **Flaky tests** - Non-deterministic behavior
5. **Over-testing** - Testing implementation, not behavior
6. **Under-testing** - Missing error scenarios

> **Try It Now (2 min)**
> 
> Spot the weak assertion:
> ```javascript
> test('creates user', async () => {
>   const user = await createUser({ email: 'test@example.com' });
>   expect(user).toBeDefined();  // Is this enough?
> });
> ```
> 
> **Answer:** No! `toBeDefined()` only checks the variable isn't undefined. The user could have wrong data. Better: `expect(user.email).toBe('test@example.com')`

---

## 7.2 Test Quality Checklist

### The Essential Review

For each test, verify:

- [ ] **Meaningful Assertion** - Tests actual behavior
- [ ] **Correct Expected Value** - Not just copied from output
- [ ] **Descriptive Name** - Explains what and why
- [ ] **Single Responsibility** - Tests one thing
- [ ] **Proper Isolation** - No shared state
- [ ] **Deterministic** - Same result every time
- [ ] **Fast** - Runs quickly
- [ ] **Independent** - Can run in any order

### Prompt for Quality Review

```
Review these tests against quality standards:

```[language]
[paste tests]
```

Check each test for:
1. Meaningful assertions (not just toBeDefined)
2. Correct expected values
3. Edge case coverage
4. Error handling tests
5. Proper isolation
6. Determinism
7. Clarity

For each issue found:
- Test name
- Issue type
- Current code
- Suggested fix
- Severity (High/Medium/Low)
```

---

## 7.3 Common Issues and Fixes

### Issue 1: Weak Assertions

```javascript
// BAD
test('creates user', async () => {
  const user = await createUser(data);
  expect(user).toBeDefined(); // Weak!
});

// GOOD
test('creates user with correct data', async () => {
  const user = await createUser(data);
  expect(user.id).toMatch(/^usr_/);
  expect(user.email).toBe(data.email);
  expect(user.createdAt).toBeInstanceOf(Date);
});
```

### Issue 2: Missing Error Tests

```javascript
// BAD - Only happy path
describe('divide', () => {
  test('divides numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
});

// GOOD - Includes error case
describe('divide', () => {
  test('divides numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('throws on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });
});
```

### Issue 3: Shared State

```javascript
// BAD - Tests affect each other
const calc = new Calculator();

test('adds', () => {
  calc.add(5); // Changes state
});

test('gets total', () => {
  expect(calc.total).toBe(5); // Depends on previous test!
});

// GOOD - Fresh state each test
describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('adds', () => {
    calc.add(5);
    expect(calc.total).toBe(5);
  });
});
```

### Issue 4: Flaky Tests

```javascript
// BAD - Depends on timing
test('shows message after delay', async () => {
  showDelayedMessage();
  await sleep(1000); // Flaky!
  expect(getMessage()).toBe('Hello');
});

// GOOD - Waits for condition
test('shows message after delay', async () => {
  showDelayedMessage();
  await waitFor(() => {
    expect(getMessage()).toBe('Hello');
  });
});
```

---

## 7.4 Mutation Testing

### What is Mutation Testing?

Mutation testing changes your code slightly and checks if tests catch it:

- Change `>` to `>=`
- Change `true` to `false`
- Remove a line
- Change return value

If tests still pass → you have a gap!

### Generate Mutations Prompt

```
Generate mutations to test the quality of these tests:

Source code:
```[language]
[source code]
```

Tests:
```[language]
[tests]
```

For each mutation:
1. Describe the change
2. Location (line number)
3. Which test should catch it
4. If no test catches it, suggest one
```

### Example Mutations

| Mutation | Line | Expected Test | Caught? |
|----------|------|---------------|---------|
| Change `>` to `>=` | 15 | boundary test | No |
| Remove null check | 23 | null input test | Yes |
| Return empty array | 31 | result length test | No |

---

## 7.5 Coverage Analysis

### Understanding Coverage

- **Line coverage**: Lines executed
- **Branch coverage**: Decision paths taken
- **Function coverage**: Functions called

### Analyzing Gaps

```
Coverage shows these uncovered lines:
- [file]: lines [numbers]

Source code:
```[language]
[uncovered code]
```

Please:
1. Explain what these lines do
2. Why they might be uncovered
3. Generate tests to cover them
4. Are they worth testing?
```

### Coverage Goals

| Type | Minimum | Good | Excellent |
|------|---------|------|-----------|
| Lines | 70% | 80% | 90% |
| Branches | 65% | 75% | 85% |
| Functions | 80% | 90% | 95% |

---

## 7.6 Improving Test Quality

### Improvement Workflow

1. Run tests → Pass
2. Check coverage → Identify gaps
3. Run mutation tests → Find weak tests
4. Review test quality → Check assertions
5. Improve → Add/fix tests
6. Repeat

### Prompt for Improvements

```
Improve these tests:

Current tests:
```[language]
[tests]
```

Issues identified:
1. [Issue 1]
2. [Issue 2]

Please:
1. Fix the identified issues
2. Strengthen weak assertions
3. Add missing edge cases
4. Ensure proper isolation
5. Improve test names
```

---

## 7.7 Hands-On Exercises

### Exercise 7.1: Test Review

**Objective**: Review AI-generated tests for quality

**Steps**:
1. Take tests from Module 6
2. Apply the quality checklist
3. Identify at least 5 issues
4. Document with suggested fixes
5. Implement fixes

**Deliverable**: Review report + fixed tests

**Time**: 60 minutes

---

### Exercise 7.2: Mutation Testing

**Objective**: Apply mutation testing

**Steps**:
1. Select a module with tests
2. Generate 10 mutations
3. Run tests against mutations
4. Identify tests that miss mutations
5. Add tests to catch them

**Deliverable**: Mutation report + new tests

**Time**: 45 minutes

---

### Exercise 7.3: Coverage Improvement

**Objective**: Improve coverage from 70% to 85%

**Steps**:
1. Run coverage report
2. Identify uncovered code
3. Generate tests for gaps
4. Review test quality
5. Achieve 85% coverage

**Deliverable**: 85%+ coverage report

**Time**: 45 minutes

---

## Knowledge Check

1. What are common issues with AI-generated tests?
2. What should meaningful assertions check?
3. What is mutation testing?
4. What causes flaky tests?
5. What are good coverage targets?

---

## Summary

In this module, you learned:
- How to review test quality
- How to fix common issues
- How to apply mutation testing
- How to analyze coverage
- How to improve tests systematically

---

## Next Steps

Proceed to **Module 8: Applying Agentic Patterns to Testing** to level up your AI usage.

---

## Common Mistakes

Avoid these frequent errors when validating test quality:

### 1. Skipping Review Because Tests Pass
**Wrong**: "All tests are green, we're good!"
**Why it fails**: Passing tests don't mean good tests. A test that asserts nothing always passes. Weak assertions pass but don't catch bugs.
**Correct**: Review test quality independently of pass/fail status. Ask: "Would this test fail if the code were broken?"

### 2. Trusting Coverage Numbers Blindly
**Wrong**: "We have 90% coverage, our testing is complete."
**Why it fails**: Coverage measures execution, not quality. You can execute every line without asserting anything meaningful.
**Correct**: Use coverage to find gaps, but verify that covered code has meaningful assertions. Mutation testing reveals the truth.

### 3. Ignoring Mutation Testing Results
**Wrong**: "Mutation testing is too slow/complex, we'll skip it."
**Why it fails**: Mutation testing is the only way to know if your tests actually detect bugs. Without it, you're guessing.
**Correct**: Run mutation testing at least on critical modules. If mutants survive (tests don't catch them), your tests need strengthening.

### 4. Fixing Tests by Weakening Assertions
**Wrong**: Test fails, so you change `expect(result).toBe(5)` to `expect(result).toBeDefined()`.
**Why it fails**: You've hidden the bug instead of fixing it. The test passes but the code is still broken.
**Correct**: When a test fails, investigate. Is the test wrong or the code? Fix the actual problem, not the symptom.

### 5. Not Reviewing AI-Generated Tests
**Wrong**: AI generated 50 tests, they all pass, ship it.
**Why it fails**: AI tests often have weak assertions, miss edge cases, or test implementation details. They look complete but aren't.
**Correct**: Review every AI-generated test. Check: meaningful assertions? Edge cases? Proper isolation? No redundancy?

### 6. Over-Relying on Happy Path Tests
**Wrong**: "We test that login works. That's enough."
**Why it fails**: Happy paths usually work because developers test them manually. Bugs hide in error paths, edge cases, and unexpected inputs.
**Correct**: For every happy path test, add 3+ negative tests: wrong password, missing fields, expired session, network failure.

### 7. Not Fixing Flaky Tests Immediately
**Wrong**: "That test fails sometimes, just re-run CI."
**Why it fails**: Flaky tests destroy trust. Eventually the team ignores all test failures. Real bugs slip through.
**Correct**: Treat flakiness as a critical bug. Fix or delete flaky tests immediately. Zero tolerance.

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
