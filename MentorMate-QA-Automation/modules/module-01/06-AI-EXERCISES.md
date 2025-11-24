# Module 01 - AI Exercises
## Hands-On Practice with AI-Assisted Testing

---

## Exercise 1: Calculator Tests with AI (90 minutes)

### Objective
Use AI to generate comprehensive tests for a calculator module, then review and improve them.

### Setup

**1. Create Project Structure**

```bash
mkdir calculator-ai-practice
cd calculator-ai-practice
npm init -y
npm install --save-dev jest
```

**2. Create the Source File**

Create `calculator.js`:

```javascript
/**
 * Calculator module with basic arithmetic operations
 */

class Calculator {
  constructor() {
    this.history = [];
  }

  add(a, b) {
    const result = a + b;
    this.history.push({ operation: 'add', a, b, result });
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.history.push({ operation: 'subtract', a, b, result });
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this.history.push({ operation: 'multiply', a, b, result });
    return result;
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    const result = a / b;
    this.history.push({ operation: 'divide', a, b, result });
    return result;
  }

  power(base, exponent) {
    if (exponent < 0 && base === 0) {
      throw new Error('Cannot raise zero to negative power');
    }
    const result = Math.pow(base, exponent);
    this.history.push({ operation: 'power', base, exponent, result });
    return result;
  }

  sqrt(n) {
    if (n < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    const result = Math.sqrt(n);
    this.history.push({ operation: 'sqrt', n, result });
    return result;
  }

  percentage(value, percent) {
    const result = (value * percent) / 100;
    this.history.push({ operation: 'percentage', value, percent, result });
    return result;
  }

  getHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }

  getLastOperation() {
    return this.history.length > 0
      ? this.history[this.history.length - 1]
      : null;
  }
}

module.exports = Calculator;
```

**3. Configure Jest**

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80
      }
    }
  }
}
```

---

### Part 1: Initial Test Generation (30 minutes)

**Prompt to Use with Claude:**

```
Generate comprehensive Jest tests for this Calculator class:

[paste the Calculator class code above]

Requirements:
- Test all public methods
- Include happy path tests
- Include error cases (division by zero, negative sqrt, zero to negative power)
- Include edge cases (decimals, very large numbers, zero)
- Test the history functionality
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Group related tests with describe blocks

Include tests for:
1. Basic operations (add, subtract, multiply, divide)
2. Advanced operations (power, sqrt, percentage)
3. History management (getHistory, clearHistory, getLastOperation)
4. Error handling
5. Edge cases
```

**Instructions:**
1. Start Claude: `claude`
2. Paste the prompt above
3. Save the generated tests to `calculator.test.js`
4. Run the tests: `npm test`
5. Note any failures or issues

---

### Part 2: Test Review (20 minutes)

Review the AI-generated tests using this checklist:

**Quality Checklist:**

- [ ] **Meaningful assertions** - Not just `toBeDefined()`
- [ ] **Descriptive test names** - Explains what's being tested
- [ ] **Each test is focused** - Tests one thing
- [ ] **Tests are isolated** - Don't depend on each other
- [ ] **Edge cases covered** - Zero, negative, decimals, large numbers
- [ ] **Error cases covered** - All throw statements tested
- [ ] **Setup/teardown used** - For history-related tests
- [ ] **No magic numbers** - Use clear values

**Common Issues to Look For:**

1. **Missing assertions**
   ```javascript
   // Bad
   test('adds numbers', () => {
     const calc = new Calculator();
     calc.add(1, 2);
   });

   // Good
   test('adds numbers', () => {
     const calc = new Calculator();
     expect(calc.add(1, 2)).toBe(3);
   });
   ```

2. **Shared state**
   ```javascript
   // Bad - shared calculator
   const calc = new Calculator();

   test('adds', () => {
     expect(calc.add(1, 2)).toBe(3);
   });

   test('history', () => {
     // History includes operations from previous test!
   });

   // Good - fresh instance
   describe('Calculator', () => {
     let calc;

     beforeEach(() => {
       calc = new Calculator();
     });
   });
   ```

3. **Incomplete error testing**
   ```javascript
   // Bad - doesn't check error message
   test('throws on division by zero', () => {
     expect(() => calc.divide(10, 0)).toThrow();
   });

   // Good - specific error
   test('throws on division by zero', () => {
     const calc = new Calculator();
     expect(() => calc.divide(10, 0)).toThrow('Division by zero');
   });
   ```

**Deliverable:** List of issues found with suggested improvements

---

### Part 3: Test Improvement (30 minutes)

Ask Claude to improve the tests based on your review:

**Improvement Prompt:**

```
I've reviewed these tests and found these issues:

[List your findings from Part 2]

Please improve the tests by:
1. Fixing the issues listed above
2. Adding any missing edge cases
3. Ensuring proper test isolation with beforeEach
4. Making assertions more specific
5. Adding comments for complex tests

Current tests:
[paste current tests]
```

**Additional Tests to Request (if missing):**

```
Add these specific tests:
1. Test with Number.MAX_VALUE (very large numbers)
2. Test with Number.MIN_VALUE (very small numbers)
3. Test with floating point precision (0.1 + 0.2)
4. Test consecutive operations
5. Test clearing history multiple times
```

**Run and verify:**
```bash
npm test
```

All tests should pass!

---

### Part 4: Coverage Analysis (15 minutes)

**Run coverage:**
```bash
npm run test:coverage
```

**Check the report:**
- Open `coverage/lcov-report/index.html`
- Look for red (uncovered) lines

**If coverage < 80%, ask Claude:**

```
Coverage report shows these uncovered lines:
[list uncovered line numbers]

Here's the source code for context:
[paste relevant sections]

Generate tests to cover these specific lines. Explain what each test covers.
```

**Deliverable:** Coverage report showing 80%+ coverage

---

### Part 5: Final Verification (15 minutes)

**Final Checklist:**

- [ ] All tests pass
- [ ] Coverage >= 80%
- [ ] No flaky tests (run 3 times)
- [ ] Tests are readable
- [ ] Tests are maintainable
- [ ] No test duplication
- [ ] Proper error messages

**Run multiple times:**
```bash
npm test
npm test
npm test
```

All three runs should pass with same results.

---

### Submission

**Files to Submit:**
1. `calculator.js` - Source file
2. `calculator.test.js` - Final tests
3. `notes.md` - Your review notes and improvements made

**Reflection Questions:**
1. What types of tests did AI generate well?
2. What did you have to fix or add manually?
3. What prompting techniques worked best?
4. How would you improve the process next time?

---

## Exercise 2: Playwright Test with AI (30 minutes)

### Objective
Generate a Playwright test for SauceDemo with AI assistance and verify it works.

### Setup

Use your existing `saucedemo-tests` project from Lab 3.

```bash
cd saucedemo-tests
claude
```

### Task

**Prompt for Claude:**

```
Generate a Playwright test for the SauceDemo shopping flow:

Test file: tests/shopping.spec.js

Test scenario:
1. Login with standard_user / secret_sauce
2. Add "Sauce Labs Backpack" to cart
3. Add "Sauce Labs Bike Light" to cart
4. Verify cart badge shows "2"
5. Click cart icon
6. Verify both items are in cart
7. Click checkout
8. Fill form: First Name="John", Last Name="Doe", Zip="12345"
9. Continue to overview page
10. Verify total price is correct
11. Click finish
12. Verify success message

Requirements:
- Use Page Object Model pattern
- Use data-test attributes for selectors
- Include proper wait conditions
- Add meaningful assertions
- Handle potential race conditions
- Use best practices for Playwright
```

### Verify and Improve

1. **Review the generated test**
   - Check for proper waits
   - Verify selectors are reliable
   - Ensure assertions are meaningful

2. **Run the test**
   ```bash
   npx playwright test tests/shopping.spec.js
   ```

3. **If it fails, ask Claude:**
   ```
   The test failed with this error:
   [paste error]

   Here's the test code:
   [paste test]

   Please fix the issue and explain what was wrong.
   ```

4. **Run until passing**
   ```bash
   npx playwright test tests/shopping.spec.js --headed
   ```

### Deliverable

- Working shopping flow test
- Notes on what needed to be fixed

---

## Exercise 3: Bug Finding with AI (20 minutes)

### Objective
Use AI to find bugs in existing test code.

### Setup

Create `buggy-test.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
  page.goto('https://www.saucedemo.com'); // Missing await

  const username = page.locator('#user-name');
  const password = page.locator('#password');
  const loginBtn = page.locator('#login-button');

  username.fill('standard_user'); // Missing await
  password.fill('secret_sauce'); // Missing await
  loginBtn.click(); // Missing await

  // Race condition - no wait
  expect(page.locator('.inventory_list')).toBeVisible();

  // Wrong assertion
  const products = page.locator('.inventory_item');
  expect(products).toHaveCount(6);

  // Brittle selector
  await page.click('text=Add to cart');

  // No verification of cart update
  await page.click('.shopping_cart_link');
});
```

### Task

Ask Claude:

```
Review this Playwright test and identify all bugs and issues:

[paste buggy test]

For each issue, explain:
1. What the problem is
2. Why it's a problem
3. How to fix it
4. Best practice recommendation
```

### Expected Issues

Claude should find:
1. Missing awaits (4 places)
2. Race condition in visibility check
3. Incorrect assertion (missing await)
4. Brittle text selector
5. Missing verification after cart action

### Deliverable

- List of all bugs found by AI
- Corrected version of the test

---

## Exercise 4: Test Data Generation (15 minutes)

### Objective
Use AI to generate realistic test data.

### Task

Ask Claude:

```
Generate a JSON file with 10 realistic test users for e-commerce testing.

Each user should have:
- username (unique, lowercase, 5-12 chars)
- email (valid format, various domains)
- password (mix of valid and edge cases)
- firstName (include international names)
- lastName (include hyphens, apostrophes)
- address (realistic US addresses)
- phone (various formats)
- valid (boolean - 5 valid, 5 with issues)

Include edge cases:
- Special characters in names
- Very long names
- Multiple word addresses
- Different phone formats
- SQL injection attempts in username
- XSS attempts in name fields
```

### Verify

Check the generated data for:
- [ ] Realistic values
- [ ] Good variety
- [ ] Edge cases included
- [ ] Security test cases included
- [ ] Proper JSON format

### Deliverable

- `test-data.json` file with 10 users
- Notes on how you'll use this data

---

## Grading Rubric

| Exercise | Points | Criteria |
|----------|--------|----------|
| Exercise 1 | 40 | Test quality, coverage, review notes |
| Exercise 2 | 25 | Working test, proper POM, good assertions |
| Exercise 3 | 20 | All bugs found, correct fixes |
| Exercise 4 | 15 | Realistic data, edge cases, variety |
| **Total** | **100** | |

**Passing: 70+ points**

---

## Tips for Success

1. **Be Specific in Prompts** - The more detail, the better output
2. **Iterate** - First output is rarely perfect
3. **Always Review** - AI makes mistakes
4. **Test Everything** - Don't trust without verification
5. **Learn** - Understand what AI generates
6. **Document** - Keep notes on what works

---

## Common AI Mistakes to Watch For

1. **Missing awaits** in async code
2. **Incorrect assertions** (wrong methods)
3. **Brittle selectors** (CSS over data-test)
4. **Missing edge cases**
5. **Incomplete error handling**
6. **Race conditions** (no waits)
7. **Shared state** in tests

---

**Remember:** AI is a tool to accelerate your work, not replace your thinking!
