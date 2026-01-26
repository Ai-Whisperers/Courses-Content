# Module 9: CI/CD Integration

## Duration: 4 hours

## Learning Objectives

By the end of this module, you will be able to:
- Set up GitHub Actions for testing
- Configure pre-commit hooks
- Generate automated test reports
- Optimize test performance in CI

---

## 9.1 CI/CD for Testing

### Why CI/CD?

- Run tests automatically on every change
- Catch issues before merging
- Ensure consistent test execution
- Generate coverage reports
- Enforce quality gates

### CI/CD Pipeline Stages

```
Push → Install → Lint → Unit Tests → Integration Tests → E2E → Report → Deploy
```

---

## 9.2 GitHub Actions Setup

### Basic Test Workflow

```yaml
# .github/workflows/test.yml
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
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Advanced Workflow with Matrix

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [18, 20]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}

      - run: npm ci
      - run: npm test

  e2e:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 9.3 Pre-commit Hooks

### Setup with Husky

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

### Configuration

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.test.{js,ts}": [
      "jest --findRelatedTests --passWithNoTests"
    ]
  }
}
```

### Pre-push Hook for Full Tests

```bash
npx husky add .husky/pre-push "npm run test:unit"
```

---

## 9.4 Test Reports

### Generate AI Test Report

```
Generate a test execution report from these results:

```
[paste test output]
```

Include:

## Summary
- Total: X tests
- Passed: X
- Failed: X
- Skipped: X
- Duration: Xs
- Coverage: X%

## Failed Tests
For each failure:
- Test name
- Error message
- Likely cause
- Suggested fix

## Coverage Gaps
- Uncovered files
- Risk assessment

## Performance
- Slowest tests (>1s)
- Optimization suggestions

## Recommendations
- Critical fixes
- Improvements

Format for [PR comment / Slack / email].
```

### GitHub Actions Report Comment

```yaml
- name: Comment PR with results
  if: github.event_name == 'pull_request'
  uses: actions/github-script@v6
  with:
    script: |
      const fs = require('fs');
      const report = fs.readFileSync('test-report.md', 'utf8');
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: report
      });
```

---

## 9.5 Performance Optimization

### Caching Dependencies

```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Parallel Test Execution

```yaml
jobs:
  test:
    strategy:
      matrix:
        shard: [1, 2, 3, 4]

    steps:
      - run: npm test -- --shard=${{ matrix.shard }}/4
```

### Skip Unnecessary Tests

```yaml
- name: Get changed files
  id: changed
  uses: tj-actions/changed-files@v35

- name: Run related tests
  run: |
    npm test -- --findRelatedTests ${{ steps.changed.outputs.all_changed_files }}
```

---

## 9.6 Quality Gates

### Enforce Coverage Threshold

```yaml
- name: Check coverage threshold
  run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
    if (( $(echo "$COVERAGE < 80" | bc -l) )); then
      echo "Coverage $COVERAGE% is below 80% threshold"
      exit 1
    fi
```

### Required Checks

In GitHub repo settings:
1. Go to Settings → Branches
2. Add branch protection rule
3. Require status checks:
   - `test`
   - `e2e`
   - `coverage`

---

## 9.7 Hands-On Exercises

### Exercise 9.1: Basic CI Setup

**Objective**: Set up GitHub Actions test workflow

**Steps**:
1. Create `.github/workflows/test.yml`
2. Configure for your project
3. Add caching
4. Push and verify it runs
5. Fix any issues

**Deliverable**: Working CI pipeline

**Time**: 45 minutes

---

### Exercise 9.2: Pre-commit Hooks

**Objective**: Configure pre-commit testing

**Steps**:
1. Install husky and lint-staged
2. Configure lint-staged
3. Add pre-commit hook
4. Add pre-push hook
5. Test the workflow

**Deliverable**: Working git hooks

**Time**: 30 minutes

---

### Exercise 9.3: Test Reporting

**Objective**: Generate automated test reports

**Steps**:
1. Create report generation prompt
2. Add report to CI workflow
3. Comment on PRs
4. Send to Slack/email
5. Track metrics over time

**Deliverable**: Automated reporting system

**Time**: 45 minutes

---

## Knowledge Check

1. What are the main CI/CD pipeline stages?
2. How do you cache dependencies in GitHub Actions?
3. What is lint-staged?
4. How do you parallelize tests in CI?
5. What quality gates should you enforce?

---

## Summary

In this module, you learned:
- GitHub Actions test workflows
- Pre-commit hook configuration
- Automated test reporting
- Performance optimization
- Quality gate enforcement

---

## Next Steps

Proceed to **Module 10: Final Project** to apply everything you've learned.

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
