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

> **Try It Now (2 min)**
> 
> Check if your project has CI already:
> ```bash
> ls -la .github/workflows/
> ```
> 
> - See YAML files? You have CI! Read one to understand what runs.
> - Empty or "no such file"? You'll create one in this module.
> 
> **Bonus:** If you have CI, check your last 5 runs: `gh run list --limit 5`

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

## Common Mistakes

Avoid these frequent errors when setting up CI/CD:

### 1. Not Caching Dependencies
**Wrong**: `npm install` runs fresh on every CI build, taking 3+ minutes.
**Why it fails**: Slow pipelines discourage running tests. Developers stop waiting for CI feedback.
**Correct**: Always cache `node_modules` or use `actions/setup-node` with cache. Builds should start fast.

### 2. Running All Tests on Every Change
**Wrong**: 30-minute full E2E suite runs on every commit.
**Why it fails**: Slow feedback loop. Developers push code and context-switch. When tests fail 30 minutes later, they've forgotten what they changed.
**Correct**: Run fast tests (unit) on every commit. Run slow tests (E2E) on PR merge or nightly.

### 3. No Quality Gates
**Wrong**: Tests run but don't block merge. "We'll fix it later."
**Why it fails**: Technical debt accumulates. "Later" never comes. Eventually tests are ignored entirely.
**Correct**: Make tests a required check for merge. No exceptions. Red tests = blocked PR.

### 4. Ignoring CI Failures
**Wrong**: "CI failed again, just re-run it." (for the 3rd time)
**Why it fails**: You're training yourself to ignore failures. Real bugs get ignored alongside flaky tests.
**Correct**: Every CI failure deserves investigation. If flaky, fix the flakiness. If real failure, fix the bug.

### 5. Secrets in YAML Files
**Wrong**: Hardcoding API keys or passwords in workflow files.
**Why it fails**: Security disaster. Anyone with repo access sees your secrets. They end up in git history forever.
**Correct**: Use GitHub Secrets. Reference with `${{ secrets.MY_SECRET }}`. Never commit credentials.

### 6. No Test Artifacts
**Wrong**: E2E tests fail in CI but you can't see what happened.
**Why it fails**: Debugging CI failures is impossible without screenshots, videos, or logs.
**Correct**: Always upload test artifacts (screenshots, traces, reports) on failure. Use `if: always()` to capture even on crash.

### 7. Pre-commit Hooks That Are Too Slow
**Wrong**: Pre-commit runs full test suite (5 minutes per commit).
**Why it fails**: Developers bypass hooks with `--no-verify`. The safety net disappears.
**Correct**: Pre-commit should run in <30 seconds. Lint changed files only. Run full tests in CI, not locally.

### 8. Not Testing the CI Pipeline Itself
**Wrong**: CI workflow unchanged for months. You assume it still works.
**Why it fails**: Dependencies update, actions deprecate, caches expire. Your CI silently degrades.
**Correct**: Periodically review and test your CI pipeline. Update action versions. Verify caching works.

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes
