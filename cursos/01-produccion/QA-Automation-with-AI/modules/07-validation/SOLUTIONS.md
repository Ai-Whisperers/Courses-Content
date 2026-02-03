# Module 7 Solutions: Test Validation and Quality Assurance

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Identify Weak Assertions

**Sample Issues Found:**

1. **Test: "creates a user"**
   - **Issue**: `expect(user).toBeDefined()` is too weak
   - **Fix**: `expect(user.id).toMatch(/^usr_/); expect(user.email).toBe('john@test.com');`
   - **Severity**: High

2. **Test: "creates a user"**
   - **Issue**: `expect(user.id).toBeTruthy()` doesn't verify actual value
   - **Fix**: `expect(user.id).toEqual(expect.any(String));`
   - **Severity**: High

3. **Test: "handles duplicate email"**
   - **Issue**: Using try/catch instead of `expect().rejects.toThrow()`
   - **Fix**: `await expect(userService.createUser(...)).rejects.toThrow('Email already exists');`
   - **Severity**: Medium

4. **Test: "handles duplicate email"**
   - **Issue**: `expect(error).toBeDefined()` doesn't verify error message
   - **Fix**: `expect(error.message).toContain('Email already exists');`
   - **Severity**: High

5. **Test: "validates email format"**
   - **Issue**: Using `.catch()` instead of proper async error handling
   - **Fix**: `await expect(userService.createUser({...})).rejects.toThrow('Invalid email');`
   - **Severity**: Medium

6. **Test: "returns user by id"**
   - **Issue**: `expect(user).not.toBeNull()` doesn't verify actual data
   - **Fix**: `expect(user).toMatchObject({ id: 1, name: expect.any(String) });`
   - **Severity**: High

7. **Test: "handles not found"**
   - **Issue**: `expect(user).toBeFalsy()` is ambiguous (could be null, undefined, false)
   - **Fix**: `expect(user).toBeNull();` or `expect(user).toBeUndefined();`
   - **Severity**: Medium

---

## Quiz Answer Key

### Multiple Choice Answers

1. **c** - Meaningful assertions test actual behavior
2. **b** - Mutation testing changes code to find weak tests
3. **a** - Flaky tests have non-deterministic behavior
4. **b** - Coverage should be 80%+ for good quality
5. **c** - Weak assertions don't verify actual values

### True/False Answers

6. **True** - AI tests need quality review
7. **False** - `toBeDefined()` is weak; use specific assertions
8. **True** - Tests should be independent
9. **False** - Shared state causes test failures
10. **True** - Mutation testing finds weak tests

---

## Common Student Mistakes

1. **Accepting Weak Assertions** - Replace with specific value checks
2. **Missing Error Tests** - Add tests for all error scenarios
3. **Not Isolating Tests** - Use beforeEach/afterEach
4. **Ignoring Coverage Gaps** - Add tests for uncovered lines
5. **Not Running Mutation Tests** - Run mutations to find gaps

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Issue Identification | 30 | Find 5+ issues, correct severity |
| Test Improvements | 30 | Fix issues, strengthen assertions |
| Mutation Testing | 25 | Identify gaps, suggest tests |
| Coverage Analysis | 15 | Improve to 85%+ coverage |
| **Total** | **100** | |

**Passing**: 70+ points
