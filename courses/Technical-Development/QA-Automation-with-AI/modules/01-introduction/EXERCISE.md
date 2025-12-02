# Exercise 1: Calculator Tests with AI

## Objective

Use AI to generate comprehensive tests for a calculator module, then review and improve them.

---

## Setup

### 1. Create Project Structure

```bash
mkdir calculator-project
cd calculator-project
npm init -y
npm install --save-dev jest
```

### 2. Create the Source File

Create `src/calculator.js`:

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

### 3. Configure Jest

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

## Part 1: Initial Test Generation (30 minutes)

### Task

Use Claude to generate initial tests for the Calculator class.

### Prompt to Use

```
Generate comprehensive Jest tests for this Calculator class:

[paste the Calculator class code]

Requirements:
- Test all public methods
- Include happy path tests
- Include error cases (division by zero, negative sqrt)
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

### Instructions

1. Start Claude: `claude`
2. Paste the prompt above
3. Save the generated tests to `src/calculator.test.js`
4. Run the tests: `npm test`
5. Note any failures or issues

### Deliverable

- `calculator.test.js` with initial AI-generated tests
- Notes on any test failures

---

## Part 2: Test Review (20 minutes)

### Task

Review the AI-generated tests against the quality checklist.

### Quality Checklist

Go through each test and check:

- [ ] **Assertions are meaningful** - Not just `toBeDefined()`
- [ ] **Test names are descriptive** - Explain what's being tested
- [ ] **Each test is focused** - Tests one thing
- [ ] **Tests are isolated** - Don't depend on each other
- [ ] **Edge cases covered** - Zero, negative, decimals, large numbers
- [ ] **Error cases covered** - All throw statements tested
- [ ] **Setup/teardown used** - For history-related tests
- [ ] **No magic numbers** - Use constants or clear values

### Common Issues to Look For

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
     expect(() => calc.divide(10, 0)).toThrow('Division by zero');
   });
   ```

### Deliverable

- List of issues found
- Suggested improvements for each

---

## Part 3: Test Improvement (30 minutes)

### Task

Improve the tests based on your review.

### Improvement Prompt

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

### Additional Tests to Request

If missing, ask Claude to add:

```
Add these specific tests:
1. Test with Number.MAX_VALUE (very large numbers)
2. Test with Number.MIN_VALUE (very small numbers)
3. Test with floating point precision (0.1 + 0.2)
4. Test history limit (what happens with 1000 operations?)
5. Test consecutive operations
6. Test clearing history multiple times
```

### Deliverable

- Updated `calculator.test.js` with improvements
- All tests passing

---

## Part 4: Coverage Analysis (15 minutes)

### Task

Analyze test coverage and fill gaps.

### Instructions

1. Run coverage: `npm run test:coverage`

2. Check the report:
   - Open `coverage/lcov-report/index.html`
   - Look for red (uncovered) lines

3. If coverage < 80%, ask Claude:

```
Coverage report shows these uncovered lines:
[list uncovered line numbers]

Here's the source code for context:
[paste relevant sections]

Generate tests to cover these specific lines. Explain what each test covers.
```

### Deliverable

- Coverage report showing 80%+ coverage
- Screenshot of coverage report

---

## Part 5: Final Review (15 minutes)

### Task

Do a final review of test quality.

### Final Checklist

- [ ] All tests pass
- [ ] Coverage >= 80%
- [ ] No flaky tests (run 3 times)
- [ ] Tests are readable
- [ ] Tests are maintainable
- [ ] No test duplication
- [ ] Proper error messages

### Run Multiple Times

```bash
npm test
npm test
npm test
```

All three runs should pass with same results.

---

## Submission

### Files to Submit

1. `src/calculator.js` - Source file
2. `src/calculator.test.js` - Final tests
3. `coverage-report.png` - Screenshot of coverage

### Reflection Questions

1. What types of tests did AI generate well?
2. What did you have to fix or add manually?
3. What prompting techniques worked best?
4. How would you improve the process next time?

---

## Example Solution Structure

Your final test file should look something like this:

```javascript
const Calculator = require('./calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(calc.add(-2, -3)).toBe(-5);
    });

    test('adds decimal numbers', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    // ... more add tests
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    test('throws error for division by zero', () => {
      expect(() => calc.divide(10, 0)).toThrow('Division by zero');
    });

    // ... more divide tests
  });

  describe('history', () => {
    test('records operations', () => {
      calc.add(1, 2);
      calc.multiply(3, 4);

      const history = calc.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0]).toEqual({
        operation: 'add',
        a: 1,
        b: 2,
        result: 3
      });
    });

    test('clears history', () => {
      calc.add(1, 2);
      calc.clearHistory();

      expect(calc.getHistory()).toHaveLength(0);
    });

    // ... more history tests
  });

  // ... more test groups
});
```

---

## Time Estimate

- Part 1: 30 minutes
- Part 2: 20 minutes
- Part 3: 30 minutes
- Part 4: 15 minutes
- Part 5: 15 minutes
- **Total: ~2 hours**

---

## Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Test Coverage | 25 | >= 80% line and branch coverage |
| Test Quality | 25 | Meaningful assertions, good isolation |
| Completeness | 20 | All methods tested, edge cases included |
| Code Style | 15 | Follows conventions, readable |
| Documentation | 15 | Proper comments, clear test names |

---

*Good luck! Remember, AI is your assistant - always review and improve its output.*
