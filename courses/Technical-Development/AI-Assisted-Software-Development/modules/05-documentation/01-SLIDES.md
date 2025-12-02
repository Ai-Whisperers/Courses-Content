# Module 5: AI for Testing & Debugging
## Presentation Slides

---

## Slide 1: Title

# AI for Testing & Debugging

**Module 5 of 8**

*80% Faster Tests, Smarter Debugging*

---

## Slide 2: Objectives

# What You'll Learn

1. Generate unit tests automatically
2. Create comprehensive test suites
3. Debug complex issues with AI
4. Achieve high code coverage
5. Identify edge cases

---

## Slide 3: The Testing Problem

# Why Testing Is Hard

- **Time-consuming** - Writing tests takes as long as code
- **Tedious** - Repetitive assertion patterns
- **Incomplete** - Edge cases often missed
- **Maintenance** - Tests need updates too

### AI Solution
- Generate 80% of tests automatically
- Identify edge cases you missed
- Focus on review, not writing

---

## Slide 4: AI Test Generation

# Using /tests Command

### Process
1. Select function or class
2. Open Copilot Chat
3. Type `/tests`
4. Review generated tests
5. Add edge cases manually

### Example
```javascript
// Select this function
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// /tests generates:
describe('divide', () => {
  test('divides two positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
  test('throws error for division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });
});
```

---

## Slide 5: Claude for Complex Tests

# Using Claude for Test Generation

### When to Use Claude
- Complex business logic
- Multiple test scenarios
- Integration tests
- Need for explanation

### Prompt Template
```
Generate comprehensive Jest tests for this function.

Include tests for:
- Happy path scenarios
- Edge cases (empty input, null, undefined)
- Error conditions
- Boundary values
- Type coercion issues

Use describe/it blocks with clear names.
Explain why each test case matters.

[paste code]
```

---

## Slide 6: Test Case Strategies

# AI Test Case Identification

### What AI Catches Well
- Null/undefined inputs
- Empty arrays/strings
- Zero values
- Negative numbers
- Type mismatches

### What You Should Add
- Domain-specific edge cases
- Business rule violations
- Real-world scenarios
- Performance edge cases

---

## Slide 7: Unit Test Patterns

# AAA Pattern

```javascript
describe('calculateTotal', () => {
  test('applies discount correctly', () => {
    // Arrange
    const items = [{ price: 100 }, { price: 50 }];
    const discount = 0.1;

    // Act
    const result = calculateTotal(items, discount);

    // Assert
    expect(result).toBe(135);
  });
});
```

### Ask AI for AAA Format
```
Generate tests using the Arrange-Act-Assert pattern
```

---

## Slide 8: Mock Generation

# AI-Generated Mocks

### Prompt
```
Generate Jest mocks for this service that depends on:
- Database connection
- External API
- Logger

Include mock implementations and reset functions.
```

### Output Example
```javascript
const mockDb = {
  query: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
});
```

---

## Slide 9: Debugging with AI

# AI-Assisted Debugging

### Process
1. Share error message and stack trace
2. Provide relevant code
3. Ask for analysis
4. Get fix suggestions

### Prompt Template
```
I'm getting this error:

[error message]

Stack trace:
[stack trace]

Here's the relevant code:
[code]

What's causing this and how do I fix it?
```

---

## Slide 10: Root Cause Analysis

# Finding Root Causes

### AI Analysis Prompt
```
This function sometimes returns wrong results:

[function code]

It fails when:
- [Describe when it fails]

Expected: [expected result]
Actual: [actual result]

Identify the root cause and explain why.
```

---

## Slide 11: Coverage Optimization

# Achieving High Coverage

### Step 1: Generate Report
```bash
npm test -- --coverage
```

### Step 2: Ask AI for Missing Tests
```
Here are uncovered lines from my coverage report:

[file]: lines 45-52, 78-85

Here's the code at those lines:
[code]

Generate tests to cover these lines.
```

---

## Slide 12: Live Demo

# Demo: Test Generation

### We'll Cover:
1. Generate tests with /tests
2. Use Claude for complex scenarios
3. Debug a tricky bug
4. Fill coverage gaps

---

## Slide 13: Best Practices

# Testing Best Practices

### Do
✅ Review all AI-generated tests
✅ Add domain-specific tests
✅ Test edge cases explicitly
✅ Maintain test quality
✅ Run tests before commit

### Don't
❌ Accept tests blindly
❌ Test implementation details
❌ Skip integration tests
❌ Ignore flaky tests
❌ Chase 100% coverage blindly

---

## Slide 14: Module Summary

# Module 5 Summary

### What We Covered
✅ AI test generation with /tests
✅ Claude for complex scenarios
✅ Debugging workflows
✅ Coverage optimization

### Key Skills
- Generate tests 80% faster
- Debug effectively with AI
- Achieve meaningful coverage

---

## Slide 15: Next Module

# Up Next: AI for Architecture

**Module 6 Preview:**
- System design with AI
- Technology selection
- Refactoring strategies
- Design patterns

---

*End of Module 5 Slides*
