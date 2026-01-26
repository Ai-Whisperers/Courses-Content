# Module 9 Solutions: CI/CD Integration

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: GitHub Actions Workflow

**Sample .github/workflows/test.yml:**

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run test:integration

      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - run: npx playwright install --with-deps
      - run: npm run test:e2e

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Grading Notes:**
- Should have proper caching
- Should run tests in sequence
- Should upload artifacts
- Should handle failures gracefully

---

### Part 2: Pre-commit Hooks

**Sample Configuration:**

```json
{
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "prettier --write"],
    "*.test.{js,ts}": ["jest --findRelatedTests"]
  }
}
```

**Grading Notes:**
- Should prevent commits with lint errors
- Should run related tests
- Should be properly configured

---

### Part 3: Test Reporting

**Sample Report Format:**

```markdown
## Test Results

### Summary
- Total: 150 tests
- Passed: 145 ✅
- Failed: 5 ❌
- Skipped: 0
- Duration: 2m 34s
- Coverage: 82%

### Failed Tests
1. **login.spec.ts** - "should handle invalid credentials"
   - Error: Timeout waiting for element
   - Likely cause: Slow API response
   - Fix: Increase timeout or mock API

### Coverage Gaps
- userService.js: 15-18 (error handling)
- orderService.js: 42-45 (edge case)

### Recommendations
- Fix 5 failing tests before merge
- Add tests for uncovered lines
```

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - GitHub Actions is GitHub's CI/CD platform
2. **c** - Cache dependencies to speed up builds
3. **b** - Lint-staged runs linting on staged files
4. **a** - Parallelize tests to reduce total time
5. **c** - Enforce coverage thresholds as quality gates

### True/False Answers

6. **True** - Pre-commit hooks prevent bad commits
7. **True** - Caching significantly speeds up CI
8. **False** - Should run all tests in CI
9. **True** - Artifacts preserve test results
10. **False** - Should enforce quality gates

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| GitHub Actions Setup | 30 | Proper workflow, caching, artifacts |
| Pre-commit Hooks | 25 | Correct configuration, working |
| Test Reporting | 25 | Clear format, actionable info |
| Performance | 15 | Optimized, parallel execution |
| Documentation | 5 | Clear explanation |
| **Total** | **100** | |

**Passing**: 70+ points
