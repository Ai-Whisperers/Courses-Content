# Module 1 Solutions: Introduction to AI-Assisted Development

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Initial Test Generation

**Sample Solution:**

The AI should generate comprehensive Jest tests covering all Calculator methods. A good response includes:

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

    test('adds mixed positive and negative', () => {
      expect(calc.add(5, -3)).toBe(2);
    });

    test('adds decimal numbers', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('adds zero', () => {
      expect(calc.add(0, 5)).toBe(5);
    });
  });

  describe('subtract', () => {
    test('subtracts two positive numbers', () => {
      expect(calc.subtract(5, 3)).toBe(2);
    });

    test('subtracts resulting in negative', () => {
      expect(calc.subtract(3, 5)).toBe(-2);
    });

    test('subtracts negative numbers', () => {
      expect(calc.subtract(-2, -3)).toBe(1);
    });

    test('subtracts decimal numbers', () => {
      expect(calc.subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(calc.multiply(3, 4)).toBe(12);
    });

    test('multiplies by zero', () => {
      expect(calc.multiply(5, 0)).toBe(0);
    });

    test('multiplies negative numbers', () => {
      expect(calc.multiply(-2, -3)).toBe(6);
    });

    test('multiplies mixed signs', () => {
      expect(calc.multiply(-2, 3)).toBe(-6);
    });

    test('multiplies decimal numbers', () => {
      expect(calc.multiply(0.5, 4)).toBe(2);
    });
  });

  describe('divide', () => {
    test('divides two positive numbers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    test('throws error for division by zero', () => {
      expect(() => calc.divide(10, 0)).toThrow('Division by zero');
    });

    test('divides resulting in decimal', () => {
      expect(calc.divide(5, 2)).toBe(2.5);
    });

    test('divides negative numbers', () => {
      expect(calc.divide(-10, 2)).toBe(-5);
    });

    test('divides by negative number', () => {
      expect(calc.divide(10, -2)).toBe(-5);
    });
  });

  describe('power', () => {
    test('raises to positive power', () => {
      expect(calc.power(2, 3)).toBe(8);
    });

    test('raises to power of zero', () => {
      expect(calc.power(5, 0)).toBe(1);
    });

    test('raises to power of one', () => {
      expect(calc.power(5, 1)).toBe(5);
    });

    test('raises to negative power', () => {
      expect(calc.power(2, -2)).toBe(0.25);
    });

    test('throws error for zero to negative power', () => {
      expect(() => calc.power(0, -1)).toThrow('Cannot raise zero to negative power');
    });

    test('raises decimal to power', () => {
      expect(calc.power(0.5, 2)).toBe(0.25);
    });
  });

  describe('sqrt', () => {
    test('calculates square root of positive number', () => {
      expect(calc.sqrt(16)).toBe(4);
    });

    test('calculates square root of decimal', () => {
      expect(calc.sqrt(0.25)).toBe(0.5);
    });

    test('calculates square root of zero', () => {
      expect(calc.sqrt(0)).toBe(0);
    });

    test('throws error for negative number', () => {
      expect(() => calc.sqrt(-4)).toThrow('Cannot calculate square root of negative number');
    });

    test('calculates square root of one', () => {
      expect(calc.sqrt(1)).toBe(1);
    });
  });

  describe('percentage', () => {
    test('calculates percentage of value', () => {
      expect(calc.percentage(100, 10)).toBe(10);
    });

    test('calculates 50% of value', () => {
      expect(calc.percentage(200, 50)).toBe(100);
    });

    test('calculates percentage with decimal', () => {
      expect(calc.percentage(100, 15.5)).toBe(15.5);
    });

    test('calculates zero percent', () => {
      expect(calc.percentage(100, 0)).toBe(0);
    });

    test('calculates 100 percent', () => {
      expect(calc.percentage(100, 100)).toBe(100);
    });
  });

  describe('history', () => {
    test('records operations in history', () => {
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
      expect(history[1]).toEqual({
        operation: 'multiply',
        a: 3,
        b: 4,
        result: 12
      });
    });

    test('returns copy of history, not reference', () => {
      calc.add(1, 2);
      const history1 = calc.getHistory();
      history1.push({ fake: 'entry' });

      const history2 = calc.getHistory();
      expect(history2).toHaveLength(1);
    });

    test('clears history', () => {
      calc.add(1, 2);
      calc.subtract(5, 3);
      expect(calc.getHistory()).toHaveLength(2);

      calc.clearHistory();
      expect(calc.getHistory()).toHaveLength(0);
    });

    test('getLastOperation returns last operation', () => {
      calc.add(1, 2);
      calc.multiply(3, 4);

      const lastOp = calc.getLastOperation();
      expect(lastOp.operation).toBe('multiply');
      expect(lastOp.result).toBe(12);
    });

    test('getLastOperation returns null for empty history', () => {
      expect(calc.getLastOperation()).toBeNull();
    });

    test('clears history multiple times', () => {
      calc.add(1, 2);
      calc.clearHistory();
      expect(calc.getHistory()).toHaveLength(0);

      calc.add(3, 4);
      calc.clearHistory();
      expect(calc.getHistory()).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    test('handles very large numbers', () => {
      const large = Number.MAX_VALUE;
      expect(calc.add(large, 0)).toBe(large);
    });

    test('handles very small numbers', () => {
      const small = Number.MIN_VALUE;
      expect(calc.add(small, 0)).toBe(small);
    });

    test('handles floating point precision', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('consecutive operations maintain history', () => {
      calc.add(1, 2);
      calc.multiply(3, 4);
      calc.divide(12, 2);

      expect(calc.getHistory()).toHaveLength(3);
    });
  });
});
```

**Grading Notes:**
- Tests should use `beforeEach` to create fresh Calculator instance (prevents shared state)
- All public methods should be tested
- Error cases should use specific error messages in assertions
- History tests should verify both content and isolation
- Edge cases like decimals, zero, and negative numbers should be included
- Partial credit if tests are missing edge cases but cover main functionality

---

### Part 2: Test Review

**Sample Issues Found:**

1. **Missing error message specificity**
   - Bad: `expect(() => calc.divide(10, 0)).toThrow()`
   - Good: `expect(() => calc.divide(10, 0)).toThrow('Division by zero')`

2. **Shared calculator instance**
   - Bad: `const calc = new Calculator();` outside describe block
   - Good: Use `beforeEach` to create fresh instance for each test

3. **Incomplete history testing**
   - Missing: Test that history returns a copy, not reference
   - Missing: Test clearing history multiple times

4. **Floating point precision**
   - Bad: `expect(calc.add(0.1, 0.2)).toBe(0.3)` (fails due to floating point)
   - Good: `expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3)`

5. **Missing edge cases**
   - Very large numbers (Number.MAX_VALUE)
   - Very small numbers (Number.MIN_VALUE)
   - Consecutive operations

6. **Vague test names**
   - Bad: "test power"
   - Good: "raises to positive power"

---

### Part 3: Test Improvement

**Sample Refinement Prompts:**

```
1. "Add specific error message assertions:
    - Division by zero: 'Division by zero'
    - Negative sqrt: 'Cannot calculate square root of negative number'
    - Zero to negative power: 'Cannot raise zero to negative power'"

2. "Use beforeEach to create fresh Calculator instance for each test
    to prevent shared state between tests"

3. "Add floating point precision tests:
    - Use toBeCloseTo() for decimal operations
    - Test 0.1 + 0.2 = 0.3
    - Test division results with decimals"

4. "Add edge case tests:
    - Very large numbers (Number.MAX_VALUE)
    - Very small numbers (Number.MIN_VALUE)
    - Consecutive operations (3+ operations in sequence)"

5. "Improve test names to be more descriptive:
    - Instead of 'test power', use 'raises to positive power'
    - Instead of 'test history', use 'records operations in history'"

6. "Add test for history isolation:
    - Verify getHistory() returns a copy, not reference
    - Modify returned array and verify original unchanged"
```

---

### Part 4: Coverage Analysis

**Sample Coverage Report Findings:**

If coverage is below 80%, likely uncovered lines:

1. **Power function edge case** - Line 62-64 (zero to negative power)
   - Solution: Add test `expect(() => calc.power(0, -1)).toThrow(...)`

2. **Sqrt negative number** - Line 71-73
   - Solution: Add test `expect(() => calc.sqrt(-4)).toThrow(...)`

3. **History return value** - Line 85-86 (spread operator)
   - Solution: Verify test calls `getHistory()` and checks result

4. **getLastOperation null case** - Line 93-96
   - Solution: Add test with empty history: `expect(calc.getLastOperation()).toBeNull()`

**Coverage Target**: 80%+ across all metrics (lines, branches, functions)

---

### Part 5: Final Review Checklist

**Expected Results:**

- ✅ All tests pass (run 3 times with consistent results)
- ✅ Coverage >= 80% (lines, branches, functions)
- ✅ No flaky tests (same results on repeated runs)
- ✅ Tests are readable with clear names
- ✅ Tests are maintainable (DRY, no duplication)
- ✅ Proper error messages in assertions
- ✅ Good test isolation (beforeEach setup)

**Common Issues to Fix:**

1. Tests failing intermittently → Check for shared state
2. Coverage gaps → Add tests for error paths
3. Floating point failures → Use `toBeCloseTo()`
4. Vague test names → Make them describe what's being tested

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - Claude Code has longer context window and stronger reasoning
2. **b** - Hallucination means generating plausible but incorrect code
3. **b** - Security-critical code should NOT be generated without review
4. **b** - `claude` command starts a session
5. **b** - AAA pattern (Arrange, Act, Assert)

### True/False Answers

6. **True** - Always review AI-generated code
7. **False** - Claude Code supports many languages
8. **True** - More context produces better results
9. **False** - Always review database schemas
10. **True** - Claude Code can execute commands and read files

### Short Answer Rubrics

**Question 11 (5 points)** - AI Strengths and Weaknesses

Valid "does well" (pick any 3):
- Boilerplate code generation
- Test scaffolding and common test patterns
- Code documentation and comments
- Code explanation and analysis
- Refactoring common patterns
- Creating standard implementations

Valid "struggles with" (pick any 3):
- Security-critical code (authentication, encryption)
- Novel algorithms and unique business logic
- Current APIs and recent frameworks
- Your specific project preferences
- Performance-critical code
- Compliance and regulatory requirements

**Question 12 (5 points)** - Why Review AI Tests

Should mention (2 points each):
- AI can hallucinate and generate incorrect assertions
- Tests might miss edge cases or error scenarios
- Security implications of untested code paths
- Floating point precision issues
- Test isolation and shared state problems

**Question 13 (5 points)** - Context Levels

Should explain:
- **Project context** (2 points): CLAUDE.md, persistent across sessions, applies to entire project
- **Prompt context** (2 points): Specific question, immediate, includes code snippets
- **Differentiation** (1 point): Project context is reusable, prompt context is one-time

**Question 14 (10 points)** - Email Validation Prompt

Good prompt should include:

```
Generate Jest unit tests for the validateEmail function.

Function:
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

Test Scenarios:
1. Valid emails:
   - simple@example.com
   - user.name@example.co.uk
   - user+tag@example.com

2. Invalid emails:
   - missing@domain (no TLD)
   - @example.com (no local part)
   - user@.com (no domain)
   - user name@example.com (space in local)
   - user@domain (no TLD)

3. Edge cases:
   - Empty string
   - Very long email
   - Special characters

Requirements:
- Use describe blocks to group tests
- Use beforeEach if needed
- Test both valid and invalid cases
- Use clear, descriptive test names
```

Scoring:
- Clear task description (2 points)
- Specific test scenarios (4 points)
- Expected format/requirements (2 points)
- Prompt structure and clarity (2 points)

---

## Common Student Mistakes

1. **Shared Calculator Instance**
   - **Mistake**: Creating calculator outside describe block
   - **Why it's wrong**: History from previous tests affects later tests
   - **Fix**: Use `beforeEach(() => { calc = new Calculator(); })`

2. **Floating Point Assertions**
   - **Mistake**: `expect(0.1 + 0.2).toBe(0.3)` fails
   - **Why it's wrong**: JavaScript floating point precision issues
   - **Fix**: Use `toBeCloseTo()` for decimal comparisons

3. **Vague Error Assertions**
   - **Mistake**: `expect(() => calc.divide(10, 0)).toThrow()`
   - **Why it's wrong**: Doesn't verify correct error message
   - **Fix**: `expect(() => calc.divide(10, 0)).toThrow('Division by zero')`

4. **Missing Edge Cases**
   - **Mistake**: Only testing happy path (positive numbers)
   - **Why it's wrong**: Doesn't catch bugs in edge cases
   - **Fix**: Add tests for zero, negative, decimals, very large/small numbers

5. **Not Running Tests**
   - **Mistake**: Submitting tests without running them
   - **Why it's wrong**: Tests might have syntax errors or fail
   - **Fix**: Always run `npm test` before submitting

6. **Incomplete History Testing**
   - **Mistake**: Only testing that history records operations
   - **Why it's wrong**: Doesn't verify isolation or clearing
   - **Fix**: Test getHistory() returns copy, clearHistory() works, getLastOperation() edge cases

7. **Ignoring Coverage Gaps**
   - **Mistake**: Submitting with < 80% coverage
   - **Why it's wrong**: Untested code paths might have bugs
   - **Fix**: Run `npm run test:coverage` and add tests for red lines

8. **Weak Test Names**
   - **Mistake**: "test 1", "test add", "test error"
   - **Why it's wrong**: Doesn't explain what's being tested
   - **Fix**: "adds two positive numbers", "throws error for division by zero"

9. **Not Using AAA Pattern**
   - **Mistake**: Tests without clear Arrange, Act, Assert sections
   - **Why it's wrong**: Hard to understand what's being tested
   - **Fix**: Add comments or structure: setup → action → verification

10. **Copying AI Output Verbatim**
    - **Mistake**: Not reviewing or improving AI-generated tests
    - **Why it's wrong**: AI might miss scenarios or have errors
    - **Fix**: Always review, test, and improve AI output

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Test Coverage | 25 | >= 80% line and branch coverage |
| Test Quality | 25 | Meaningful assertions, proper isolation, good names |
| Completeness | 20 | All methods tested, edge cases included, error cases covered |
| Code Style | 15 | Follows conventions, readable, uses beforeEach |
| Documentation | 15 | Clear test names, comments for complex tests |
| **Total** | **100** | |

**Passing**: 70+ points

---

## Teaching Notes

- **Emphasize review**: This module teaches that AI is a tool, not a replacement
- **Show hallucinations**: Demonstrate how AI can generate plausible but wrong code
- **Practice iteration**: Have students refine AI output multiple times
- **Celebrate improvements**: Show how iteration makes tests better
- **Connect to next module**: This sets up context engineering in Module 2
