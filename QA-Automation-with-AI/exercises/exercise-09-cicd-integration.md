# Exercise 9: CI/CD Integration

## Objective

Set up a complete CI/CD pipeline for automated testing with AI-assisted quality gates.

## Duration: 2 hours

---

## Prerequisites

- GitHub account
- Repository with tests from previous exercises
- Basic YAML knowledge

---

## Part 1: Basic Test Pipeline (30 min)

### Task

Create a GitHub Actions workflow that runs tests on every push.

### Steps

1. Create `.github/workflows/test.yml`:

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm test -- --coverage --coverageReporters=text --coverageReporters=lcov

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
```

2. Use AI to explain each section:

```
Explain this GitHub Actions workflow step by step:

[Paste workflow]

For each section explain:
- What it does
- Why it's needed
- What happens if removed
```

### Deliverable

- Working workflow file
- Documentation of each section

---

## Part 2: Quality Gates (30 min)

### Task

Add quality gates to prevent bad code from merging.

### Steps

1. Add coverage threshold check:

```yaml
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/lcov.info | grep -Po 'LF:\K\d+' | awk '{s+=$1} END {print s}')
          COVERED=$(cat coverage/lcov.info | grep -Po 'LH:\K\d+' | awk '{s+=$1} END {print s}')
          PERCENT=$((COVERED * 100 / COVERAGE))
          echo "Coverage: $PERCENT%"
          if [ $PERCENT -lt 80 ]; then
            echo "Coverage $PERCENT% is below 80% threshold"
            exit 1
          fi
```

2. Add test result validation:

```yaml
      - name: Validate no skipped tests
        run: |
          SKIPPED=$(npm test -- --json 2>/dev/null | jq '.numPendingTests')
          if [ "$SKIPPED" -gt 0 ]; then
            echo "Found $SKIPPED skipped tests - not allowed"
            exit 1
          fi
```

3. Add timing gate:

```yaml
      - name: Check test performance
        run: |
          START=$(date +%s)
          npm test
          END=$(date +%s)
          DURATION=$((END - START))
          if [ $DURATION -gt 300 ]; then
            echo "Tests took ${DURATION}s - exceeds 5 minute limit"
            exit 1
          fi
```

### Prompt

```
Review this CI/CD pipeline and suggest additional quality gates:

[Paste workflow]

Consider:
1. Code quality checks
2. Security scanning
3. Performance limits
4. Documentation requirements
5. Dependency checks

For each suggestion, provide the YAML implementation.
```

### Deliverable

- Workflow with quality gates
- AI-suggested improvements

---

## Part 3: Test Reporting (30 min)

### Task

Add detailed test reporting to PRs.

### Steps

1. Add test reporter:

```yaml
      - name: Test Report
        uses: dorny/test-reporter@v1
        if: success() || failure()
        with:
          name: Jest Tests
          path: coverage/junit.xml
          reporter: jest-junit
```

2. Update Jest config:

```json
{
  "reporters": [
    "default",
    ["jest-junit", {
      "outputDirectory": "coverage",
      "outputName": "junit.xml"
    }]
  ]
}
```

3. Add coverage comment to PR:

```yaml
      - name: Coverage Report
        uses: romeovs/lcov-reporter-action@v0.3.1
        if: github.event_name == 'pull_request'
        with:
          lcov-file: ./coverage/lcov.info
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

4. Add summary:

```yaml
      - name: Test Summary
        if: always()
        run: |
          echo "## Test Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Metric | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| Tests | $(npm test -- --json 2>/dev/null | jq '.numTotalTests') |" >> $GITHUB_STEP_SUMMARY
          echo "| Passed | $(npm test -- --json 2>/dev/null | jq '.numPassedTests') |" >> $GITHUB_STEP_SUMMARY
          echo "| Failed | $(npm test -- --json 2>/dev/null | jq '.numFailedTests') |" >> $GITHUB_STEP_SUMMARY
```

### Deliverable

- Workflow with reporting
- Sample PR with reports

---

## Part 4: Multiple Test Types (30 min)

### Task

Create separate jobs for different test types.

### Implementation

```yaml
name: Complete Test Suite

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  unit-tests:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: codecov/codecov-action@v3

  integration-tests:
    runs-on: ubuntu-latest
    needs: lint
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  deploy-preview:
    runs-on: ubuntu-latest
    needs: [e2e-tests]
    if: github.event_name == 'pull_request'
    steps:
      - run: echo "Deploy preview environment"
```

### Prompt

```
Optimize this CI/CD pipeline for speed and cost:

[Paste workflow]

Suggest:
1. Caching strategies
2. Parallel execution opportunities
3. Conditional job execution
4. Resource optimization
5. Matrix strategies

Provide the optimized YAML.
```

### Deliverable

- Complete multi-job workflow
- Optimized version with AI suggestions

---

## Submission

### Files

- `.github/workflows/test.yml` - Basic workflow
- `.github/workflows/complete.yml` - Full pipeline
- `ci-documentation.md` - Explanation of each component
- `optimization-notes.md` - AI optimization suggestions

### Grading

| Criterion | Points |
|-----------|--------|
| Basic pipeline works | 25 |
| Quality gates implemented | 25 |
| Reporting configured | 25 |
| Multi-job workflow | 25 |

---

## Bonus Challenge

1. Add scheduled nightly full test run
2. Implement test flakiness detection
3. Add Slack/email notifications
4. Create deployment gate based on test results

---

*Good luck!*
