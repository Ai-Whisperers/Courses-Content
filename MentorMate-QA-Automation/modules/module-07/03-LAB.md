# Module 7: Test Validation and Quality Assurance - Hands-On Lab

**Duration**: 1.5 hours
**Format**: Integrated hands-on lab
**Difficulty**: Intermediate to Advanced

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

This comprehensive lab guides you through validating and improving an AI-generated test suite for a real-world e-commerce application. You'll apply all the techniques from Module 7 to transform passing tests into production-ready quality tests.

### Learning Objectives

By completing this lab, you will:
- Apply the 8-criteria quality checklist systematically
- Identify and fix weak assertions
- Resolve test isolation issues
- Perform mutation testing
- Analyze coverage quality
- Implement comprehensive improvements
- Verify production readiness

### Prerequisites

- Completion of Module 6 (Test Implementation)
- Understanding of JavaScript and Jest
- Claude Code CLI installed and configured
- Node.js 16+ installed
- Git installed

---

## Lab Scenario

You've inherited an e-commerce project with AI-generated tests. The tests all pass and show 87% coverage, but the team has concerns about quality. Your assignment:

1. Review the existing test suite
2. Identify quality issues
3. Apply mutation testing
4. Improve tests to production standards
5. Document your findings and improvements

---

## Part 1: Setup and Initial Review (20 minutes)

### Step 1.1: Get the Lab Code

Clone the lab repository:

```bash
# Clone the repository
git clone https://github.com/mentormate-qa/module-07-lab
cd module-07-lab

# Install dependencies
npm install

# Run tests to verify setup
npm test

# Check coverage
npm run test:coverage
```

**Expected Output**:
- All tests pass ✅
- Coverage: ~87%
- 24 tests total

**Troubleshooting**:
- If tests fail, run `npm install --legacy-peer-deps`
- If coverage command fails, ensure Jest is installed: `npm install --save-dev jest`

---

### Step 1.2: Explore the Project Structure

```
module-07-lab/
├── src/
│   ├── services/
│   │   ├── userService.js        # User management
│   │   ├── productService.js     # Product catalog
│   │   ├── orderService.js       # Order processing
│   │   └── paymentService.js     # Payment processing
│   └── utils/
│       ├── validation.js         # Input validation
│       └── calculations.js       # Price calculations
├── tests/
│   ├── userService.test.js       # User service tests
│   ├── productService.test.js    # Product service tests
│   ├── orderService.test.js      # Order service tests
│   └── paymentService.test.js    # Payment service tests
├── package.json
└── jest.config.js
```

**Task**: Review each test file briefly to understand what's being tested.

---

### Step 1.3: Run Initial Quality Assessment

Open `tests/userService.test.js` and review the tests:

```javascript
describe('UserService', () => {
  describe('createUser', () => {
    test('creates a user', async () => {
      const user = await userService.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });

      expect(user).toBeDefined();
      expect(user.id).toBeTruthy();
      expect(user.email).toBeTruthy();
    });

    test('handles duplicate email', async () => {
      await userService.createUser({
        name: 'John',
        email: 'duplicate@test.com',
        password: 'pass123'
      });

      try {
        await userService.createUser({
          name: 'Jane',
          email: 'duplicate@test.com',
          password: 'pass456'
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
```

**Initial Assessment**:
1. Do these tests meet the 8 quality criteria?
2. What issues do you see immediately?
3. What could break without failing these tests?

Document your initial observations.

---

## Part 2: Systematic Quality Review (30 minutes)

### Step 2.1: Apply the Quality Checklist

Create a spreadsheet or document with the following template:

| Test File | Test Name | ✓/✗ Meaningful Assertion | ✓/✗ Correct Value | ✓/✗ Descriptive Name | ✓/✗ Single Responsibility | ✓/✗ Isolation | ✓/✗ Deterministic | ✓/✗ Fast | ✓/✗ Independent | Issues Found | Severity |
|-----------|-----------|-------------------------|-------------------|---------------------|---------------------------|---------------|-------------------|----------|-----------------|--------------|----------|
| userService.test.js | creates a user | ✗ | ? | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Weak assertions | High |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

**Task**: Review all 24 tests and complete the checklist.

**Time**: 20 minutes

**Focus Areas**:
- userService.test.js (8 tests)
- orderService.test.js (6 tests)
- paymentService.test.js (10 tests)

---

### Step 2.2: Categorize Issues

Group your findings by issue type:

**Issue Summary Template**:

```markdown
## Issue Summary

### High Severity (Fix Immediately)
1. **Weak Assertions** (Count: X)
   - Test: userService.test.js - "creates a user"
   - Problem: Only checks if defined
   - Impact: Could miss incorrect user data

2. **Missing Error Validation** (Count: X)
   - Test: paymentService.test.js - "processes payment"
   - Problem: Doesn't validate error messages
   - Impact: Wrong errors could pass

### Medium Severity (Should Fix)
...

### Low Severity (Nice to Have)
...

**Total Issues**: X High, Y Medium, Z Low
```

**Task**: Complete the issue categorization.

**Time**: 10 minutes

---

## Part 3: Mutation Testing (25 minutes)

### Step 3.1: Manual Mutation Testing

Choose the `paymentService.js` file for mutation testing:

```javascript
function processPayment(orderId, amount, cardNumber, cvv) {
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }

  if (!cardNumber || cardNumber.length !== 16) {
    throw new Error('Invalid card number');
  }

  const fee = amount * 0.029;
  const total = amount + fee;

  return {
    orderId: orderId,
    amount: amount,
    fee: parseFloat(fee.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    status: 'completed'
  };
}
```

**Task**: Create 10 mutations and test them.

**Mutation Table**:

| # | Line | Original | Mutation | Test Fails? | Which Test? | Status |
|---|------|----------|----------|-------------|-------------|--------|
| 1 | 2 | `amount <= 0` | `amount < 0` | No | None | SURVIVED |
| 2 | 2 | `amount <= 0` | `amount <= 1` | No | None | SURVIVED |
| 3 | 6 | `length !== 16` | `length < 16` | ? | ? | ? |
| 4 | 10 | `0.029` | `0.029` | ? | ? | ? |
| 5 | 10 | `amount * 0.029` | `amount + 0.029` | ? | ? | ? |
| ... | ... | ... | ... | ... | ... | ... |

**Time**: 15 minutes

---

### Step 3.2: Calculate Mutation Score

```
Mutation Score = (Mutations Caught / Total Mutations) × 100%

Mutations Created: ___
Mutations Caught: ___
Mutation Score: ___%
```

**Task**: Calculate the mutation score for paymentService tests.

**Target**: 80%+ mutation score

**Time**: 5 minutes

---

### Step 3.3: Improve Tests to Catch Mutations

For each surviving mutation, write a test that would catch it:

```javascript
// Example: Catching the `amount <= 0` → `amount < 0` mutation
test('rejects payment with exactly zero amount', () => {
  expect(() => processPayment('ORD-001', 0, '4111111111111111', '123'))
    .toThrow('Invalid amount');
});
```

**Task**: Write tests to achieve 80%+ mutation score.

**Time**: 5 minutes

---

## Part 4: Coverage Quality Analysis (15 minutes)

### Step 4.1: Review Coverage Report

Run coverage with details:

```bash
npm run test:coverage -- --verbose
```

**Task**: Identify covered lines with weak tests.

### Step 4.2: Analyze Payment Processing Coverage

The payment processing tests show 100% coverage:

```javascript
test('processes valid payment', () => {
  const result = processPayment('ORD-001', 100, '4111111111111111', '123');
  expect(result.status).toBe('completed');
});
```

**Questions to Answer**:
1. What values are NOT being verified? (List at least 5)
2. What edge cases are missing? (List at least 3)
3. What bugs could exist despite 100% coverage? (List at least 4)

**Time**: 10 minutes

---

### Step 4.3: Add Quality Coverage Tests

Write tests that verify actual behavior:

```javascript
test('calculates correct fee for payment', () => {
  const result = processPayment('ORD-001', 100, '4111111111111111', '123');

  expect(result).toMatchObject({
    orderId: 'ORD-001',
    amount: 100,
    fee: 2.90, // 100 * 0.029 = 2.90
    total: 102.90, // 100 + 2.90
    status: 'completed'
  });
});

test('rounds fee to 2 decimal places', () => {
  const result = processPayment('ORD-001', 33.33, '4111111111111111', '123');
  expect(result.fee).toBe(0.97); // 33.33 * 0.029 = 0.96657 → 0.97
  expect(result.total).toBe(34.30);
});
```

**Task**: Write 3-5 quality coverage tests.

**Time**: 5 minutes

---

## Part 5: Implement Improvements (25 minutes)

### Step 5.1: Fix Weak Assertions

**Before**:
```javascript
test('creates a user', async () => {
  const user = await userService.createUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  });

  expect(user).toBeDefined();
  expect(user.id).toBeTruthy();
});
```

**After**:
```javascript
test('creates user with correct properties and format', async () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  };

  const user = await userService.createUser(userData);

  expect(user).toMatchObject({
    id: expect.stringMatching(/^usr_[a-zA-Z0-9]{8}$/),
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: expect.any(Date),
    status: 'active'
  });

  // Password should NOT be in response
  expect(user.password).toBeUndefined();
});
```

**Task**: Fix at least 5 tests with weak assertions.

**Time**: 15 minutes

---

### Step 5.2: Fix Error Handling Tests

**Before**:
```javascript
test('handles duplicate email', async () => {
  await userService.createUser({
    name: 'John',
    email: 'duplicate@test.com',
    password: 'pass123'
  });

  try {
    await userService.createUser({
      name: 'Jane',
      email: 'duplicate@test.com',
      password: 'pass456'
    });
  } catch (error) {
    expect(error).toBeDefined();
  }
});
```

**After**:
```javascript
test('rejects duplicate email with specific error', async () => {
  await userService.createUser({
    name: 'John',
    email: 'duplicate@test.com',
    password: 'pass123'
  });

  await expect(
    userService.createUser({
      name: 'Jane',
      email: 'duplicate@test.com',
      password: 'pass456'
    })
  ).rejects.toMatchObject({
    message: 'Email already exists',
    code: 'DUPLICATE_EMAIL',
    status: 400
  });
});
```

**Task**: Fix at least 3 error handling tests.

**Time**: 10 minutes

---

## Part 6: Validation and Documentation (15 minutes)

### Step 6.1: Run Full Test Suite

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Verify all pass
echo $?  # Should be 0
```

**Expected Results**:
- All tests pass ✅
- Coverage maintained or improved
- No flaky tests
- Tests run in < 5 seconds

---

### Step 6.2: Create Quality Report

Create `LAB-REPORT.md`:

```markdown
# Module 7 Lab - Test Validation Report

## Student: [Your Name]
## Date: [Date]

---

## Executive Summary

- **Tests Reviewed**: 24
- **Issues Found**: X High, Y Medium, Z Low
- **Issues Fixed**: A High, B Medium, C Low
- **Mutation Score**: Before: X%, After: Y%
- **Coverage**: Before: 87%, After: Z%

---

## Quality Assessment

### Initial State
[Describe the initial test quality]

### Issues Identified

#### High Severity
1. **Weak Assertions in User Creation**
   - Files: userService.test.js
   - Tests Affected: 3
   - Fix: Added specific property validation

[Continue for all issues...]

---

## Mutation Testing Results

### Payment Service Mutations

| Mutation | Before | After | Status |
|----------|--------|-------|--------|
| `amount <= 0` → `amount < 0` | SURVIVED | CAUGHT | FIXED |
| ... | ... | ... | ... |

**Mutation Score**: X% → Y% (Target: 80%)

---

## Coverage Quality

### Before
- Line Coverage: 87%
- Quality Issues: [List gaps]

### After
- Line Coverage: Z%
- Quality Improvements: [List improvements]

---

## Improvements Implemented

1. **Fixed Weak Assertions** (Count: X)
   - Example: [Code snippet]

2. **Enhanced Error Testing** (Count: Y)
   - Example: [Code snippet]

3. **Added Edge Cases** (Count: Z)
   - Example: [Code snippet]

---

## Lessons Learned

1. [Key insight 1]
2. [Key insight 2]
3. [Key insight 3]

---

## Recommendations

For this project:
1. [Recommendation 1]
2. [Recommendation 2]

For future projects:
1. [Recommendation 1]
2. [Recommendation 2]
```

---

### Step 6.3: Use AI for Final Review

Use Claude to review your improvements:

```
Review these improved tests for quality:

[Paste your improved tests]

Evaluate against:
1. All 8 quality criteria met?
2. Mutation testing readiness
3. Edge cases covered
4. Error scenarios complete
5. Production readiness

Provide a score (1-10) and explain any remaining issues.
```

**Task**: Get AI review and address any remaining issues.

**Time**: 10 minutes

---

## Deliverables

Submit the following:

### Required Files

```
module-07-lab-submission/
├── LAB-REPORT.md                 # Your quality report
├── QUALITY-CHECKLIST.xlsx        # Completed checklist
├── MUTATION-ANALYSIS.md          # Mutation testing results
├── tests/
│   ├── userService.test.js       # Improved tests
│   ├── orderService.test.js      # Improved tests
│   └── paymentService.test.js    # Improved tests
└── screenshots/
    ├── coverage-before.png
    ├── coverage-after.png
    └── all-tests-passing.png
```

### Quality Standards

Your submission must demonstrate:
- ✓ Systematic application of 8-criteria checklist
- ✓ At least 10 issues identified and fixed
- ✓ Mutation score improved to 80%+
- ✓ All tests passing
- ✓ No flaky tests
- ✓ Coverage maintained or improved
- ✓ Professional documentation

---

## Grading Rubric

| Criteria | Excellent (90-100) | Good (75-89) | Satisfactory (60-74) | Needs Work (0-59) |
|----------|-------------------|--------------|----------------------|-------------------|
| **Quality Review** (25 pts) | Systematic, thorough analysis of all tests | Good analysis, minor gaps | Basic analysis | Incomplete |
| **Issue Identification** (20 pts) | 15+ issues found, well-documented | 10-14 issues found | 5-9 issues found | < 5 issues |
| **Improvements** (25 pts) | Comprehensive fixes, all criteria met | Good fixes, most criteria met | Basic fixes | Minimal fixes |
| **Mutation Testing** (15 pts) | 80%+ score, thorough analysis | 70-79% score | 60-69% score | < 60% score |
| **Documentation** (15 pts) | Professional, complete, insightful | Good documentation | Basic documentation | Incomplete |

**Total**: 100 points
**Passing**: 70 points (70%)

---

## Time Management Guide

| Activity | Time | Cumulative |
|----------|------|------------|
| Setup and Initial Review | 20 min | 20 min |
| Quality Review | 30 min | 50 min |
| Mutation Testing | 25 min | 75 min |
| Coverage Analysis | 15 min | 90 min |
| Implement Improvements | 25 min | 115 min |
| Validation and Documentation | 15 min | 130 min |

**Total**: 2 hours 10 minutes (buffer included)

---

## Troubleshooting

### Common Issues

**Tests fail after improvements**:
- Review test logic carefully
- Check that mocks are set up correctly
- Verify async/await usage
- Run tests individually to isolate issues

**Mutation score not improving**:
- Ensure assertions are specific
- Check all return values
- Add boundary tests
- Verify error messages

**Coverage drops after changes**:
- You might have removed tests (don't do this!)
- Ensure new tests run
- Check test configuration

**Flaky tests appear**:
- Review async operations
- Check for shared state
- Verify test isolation
- Remove timing dependencies

---

## Tips for Success

1. **Be Systematic**: Use the checklist, don't skip steps
2. **Document As You Go**: Don't wait until the end
3. **Test Incrementally**: Fix and verify one test at a time
4. **Use AI Wisely**: Get review feedback, but understand the changes
5. **Focus on High-Impact Issues**: Fix critical issues first
6. **Verify Everything**: Run tests after each change
7. **Be Thorough**: Quality is in the details

---

## Extension Challenges (Optional)

Want to go further? Try these:

1. **Automated Mutation Testing**: Set up Stryker and compare results
2. **Performance Testing**: Optimize slow tests
3. **Integration Tests**: Add integration test coverage
4. **CI Integration**: Set up quality gates in GitHub Actions
5. **Team Standards**: Create a test quality guide for your team

---

**You're now ready to ensure production-quality tests! Good luck!**

[Back to Module Overview](./MODULE-OVERVIEW.md)
