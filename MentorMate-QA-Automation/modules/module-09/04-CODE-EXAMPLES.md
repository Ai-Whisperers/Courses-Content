# Module 9: CI/CD Integration - Code Examples

**Purpose**: Reference collection of all code examples from Module 9

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [GitHub Actions Workflows](#github-actions-workflows)
2. [Pre-commit Hooks](#pre-commit-hooks)
3. [Quality Gates](#quality-gates)
4. [Test Reporting](#test-reporting)
5. [Performance Optimization](#performance-optimization)
6. [Troubleshooting Scripts](#troubleshooting-scripts)

---

## GitHub Actions Workflows

### Example 1: Basic Test Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

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

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

**Usage**: Basic workflow for running tests on every commit

---

### Example 2: Multi-Stage Pipeline

```yaml
# .github/workflows/multi-stage.yml
name: Multi-Stage Pipeline

on: [push, pull_request]

jobs:
  # Stage 1: Lint
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

  # Stage 2: Unit Tests (runs after lint)
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

  # Stage 3: Integration Tests (runs after lint)
  integration-tests:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:integration

  # Stage 4: E2E (runs after unit and integration)
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
```

**Usage**: Organized pipeline with dependencies

---

### Example 3: Matrix Build (Multiple Environments)

```yaml
# .github/workflows/matrix.yml
name: Matrix Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node: [18, 20]
        # Creates 6 jobs: 3 OS × 2 Node versions

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: 'npm'

      - run: npm ci

      - run: npm test

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.os }}-node${{ matrix.node }}
          path: test-results/
```

**Usage**: Test across multiple operating systems and Node versions

---

### Example 4: Playwright E2E with Services

```yaml
# .github/workflows/e2e-full.yml
name: E2E Tests with Backend

on: [push, pull_request]

jobs:
  e2e:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Seed test data
        run: npm run db:seed

      - name: Start backend server
        run: npm run start:test &
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

**Usage**: Full-stack E2E testing with database and backend

---

### Example 5: Sharded E2E Tests

```yaml
# .github/workflows/sharded-e2e.yml
name: Sharded E2E Tests

on: [push, pull_request]

jobs:
  # Run tests across 4 shards
  e2e:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Cache Playwright browsers
        uses: actions/cache@v3
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run Playwright tests (Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - name: Upload blob report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1

  # Merge all shard reports
  merge-reports:
    if: always()
    needs: [e2e]
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Download all blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge into HTML report
        run: npx playwright merge-reports --reporter html ./all-blob-reports

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 14
```

**Usage**: Parallel E2E test execution with report merging

---

### Example 6: Selective Testing Based on Changes

```yaml
# .github/workflows/selective-testing.yml
name: Selective Testing

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Needed to get changed files

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Get changed files
        id: changed
        uses: tj-actions/changed-files@v35
        with:
          files: |
            src/**
            tests/**

      - name: Run tests for changed files only (PRs)
        if: github.event_name == 'pull_request' && steps.changed.outputs.any_changed == 'true'
        run: |
          echo "Changed files: ${{ steps.changed.outputs.all_changed_files }}"
          npm test -- --findRelatedTests ${{ steps.changed.outputs.all_changed_files }}

      - name: Run all tests (main branch)
        if: github.ref == 'refs/heads/main'
        run: npm test -- --coverage

      - name: Run quick smoke tests (no changes)
        if: steps.changed.outputs.any_changed != 'true'
        run: npm run test:smoke
```

**Usage**: Intelligent test selection based on file changes

---

## Pre-commit Hooks

### Example 7: Basic Pre-commit Hook

```bash
#!/usr/bin/env sh
# .husky/pre-commit

. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run lint-staged
npx lint-staged

echo "✅ Pre-commit checks passed"
```

**Usage**: Run linting and formatting on staged files

---

### Example 8: Comprehensive Pre-commit Hook

```bash
#!/usr/bin/env sh
# .husky/pre-commit

. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Pre-commit checks starting..."

# 1. Run lint-staged (lint + format staged files)
echo "📝 Linting and formatting staged files..."
npx lint-staged || {
  echo "❌ Linting failed. Fix errors and try again."
  exit 1
}

# 2. Run tests for changed files
echo "🧪 Running tests for changed files..."
git diff --cached --name-only --diff-filter=ACMR | grep '\.test\.\(js\|ts\)$' | xargs -I {} npm test -- {} --bail --passWithNoTests || {
  echo "❌ Tests failed. Fix failing tests and try again."
  exit 1
}

# 3. Check for console.log statements (optional)
echo "🔍 Checking for console.log statements..."
git diff --cached --name-only --diff-filter=ACMR | grep '\.\(js\|ts\)$' | xargs -I {} sh -c 'grep -n "console\.log" {} && echo "⚠️  Found console.log in {}" || true'

# 4. Check for TODO comments in staged code
echo "📋 Checking for TODO comments..."
git diff --cached --name-only --diff-filter=ACMR | grep '\.\(js\|ts\)$' | xargs grep -n "TODO" && echo "⚠️  Found TODO comments. Consider addressing before commit." || true

echo "✅ All pre-commit checks passed!"
```

**Usage**: Comprehensive checks before allowing commit

---

### Example 9: Pre-push Hook with Coverage

```bash
#!/usr/bin/env sh
# .husky/pre-push

. "$(dirname -- "$0")/_/husky.sh"

echo "🚀 Pre-push checks starting..."

# Get the branch being pushed
current_branch=$(git rev-parse --abbrev-ref HEAD)

echo "📦 Branch: $current_branch"

# 1. Run unit tests
echo "🧪 Running unit tests..."
npm run test:unit || {
  echo "❌ Unit tests failed. Fix failing tests before pushing."
  exit 1
}

# 2. Check coverage threshold
echo "📊 Checking code coverage..."
npm run test:unit -- --coverage --silent --coverageThreshold='{"global":{"lines":80,"branches":75,"functions":80,"statements":80}}' || {
  echo "❌ Coverage below threshold. Add more tests."
  exit 1
}

# 3. Check for merge conflicts markers (shouldn't be there)
echo "🔍 Checking for merge conflict markers..."
if git diff-index --check HEAD --; then
  echo "✅ No merge conflict markers found"
else
  echo "❌ Merge conflict markers found. Resolve conflicts before pushing."
  exit 1
fi

# 4. Prevent accidental push to main (optional safeguard)
if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
  read -p "⚠️  You're pushing to $current_branch. Are you sure? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Push cancelled."
    exit 1
  fi
fi

echo "✅ All pre-push checks passed! Pushing..."
```

**Usage**: Comprehensive pre-push validation

---

### Example 10: Commit Message Validation

```bash
#!/usr/bin/env sh
# .husky/commit-msg

. "$(dirname -- "$0")/_/husky.sh"

commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# Conventional Commits pattern
pattern="^(feat|fix|docs|style|refactor|perf|test|chore|revert)(\(.+\))?: .{1,50}"

if ! echo "$commit_msg" | grep -Eq "$pattern"; then
  echo "❌ Invalid commit message format!"
  echo ""
  echo "Commit message must follow Conventional Commits format:"
  echo "  <type>(<scope>): <subject>"
  echo ""
  echo "Types: feat, fix, docs, style, refactor, perf, test, chore, revert"
  echo ""
  echo "Examples:"
  echo "  feat(auth): add login functionality"
  echo "  fix(api): handle null response in user service"
  echo "  test(users): add registration edge cases"
  echo "  docs(readme): update installation instructions"
  echo ""
  exit 1
fi

# Check subject line length
subject_line=$(echo "$commit_msg" | head -n 1)
if [ ${#subject_line} -gt 72 ]; then
  echo "⚠️  Commit message subject is too long (${#subject_line} chars, max 72)"
  echo "Consider shortening: $subject_line"
  exit 1
fi

echo "✅ Commit message format valid"
```

**Usage**: Enforce Conventional Commits format

---

### Example 11: lint-staged Configuration

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --bail --findRelatedTests --passWithNoTests"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.css": [
      "stylelint --fix",
      "prettier --write"
    ],
    "*.{png,jpg,jpeg,gif,svg}": [
      "imagemin-lint-staged"
    ]
  }
}
```

**Usage**: Configure lint-staged for different file types

---

## Quality Gates

### Example 12: Coverage Threshold Gate

```yaml
      - name: Check coverage threshold
        run: |
          # Install tools
          sudo apt-get install -y jq bc

          # Extract coverage from summary
          LINES=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          BRANCHES=$(cat coverage/coverage-summary.json | jq '.total.branches.pct')
          FUNCTIONS=$(cat coverage/coverage-summary.json | jq '.total.functions.pct')
          STATEMENTS=$(cat coverage/coverage-summary.json | jq '.total.statements.pct')

          echo "📊 Coverage Report:"
          echo "  Lines: $LINES%"
          echo "  Branches: $BRANCHES%"
          echo "  Functions: $FUNCTIONS%"
          echo "  Statements: $STATEMENTS%"

          # Check thresholds
          THRESHOLD=80
          FAILED=0

          if (( $(echo "$LINES < $THRESHOLD" | bc -l) )); then
            echo "❌ Line coverage $LINES% is below $THRESHOLD%"
            FAILED=1
          fi

          if (( $(echo "$BRANCHES < 75" | bc -l) )); then
            echo "❌ Branch coverage $BRANCHES% is below 75%"
            FAILED=1
          fi

          if (( $(echo "$FUNCTIONS < $THRESHOLD" | bc -l) )); then
            echo "❌ Function coverage $FUNCTIONS% is below $THRESHOLD%"
            FAILED=1
          fi

          if (( $(echo "$STATEMENTS < $THRESHOLD" | bc -l) )); then
            echo "❌ Statement coverage $STATEMENTS% is below $THRESHOLD%"
            FAILED=1
          fi

          if [ $FAILED -eq 1 ]; then
            echo ""
            echo "Coverage requirements not met. Please add more tests."
            exit 1
          fi

          echo "✅ All coverage thresholds met!"
```

---

### Example 13: No Skipped Tests Gate

```yaml
      - name: Check for skipped tests
        run: |
          # Run tests and capture JSON output
          npm test -- --json --outputFile=test-results.json || true

          # Check for skipped/pending tests
          PENDING=$(cat test-results.json | jq '.numPendingTests')
          TODO=$(cat test-results.json | jq '.numTodoTests')

          if [ "$PENDING" -gt 0 ] || [ "$TODO" -gt 0 ]; then
            echo "❌ Found $PENDING skipped and $TODO todo tests"
            echo ""
            echo "Skipped tests are not allowed on main branch."
            echo "Either implement or remove them."
            exit 1
          fi

          echo "✅ No skipped tests"
```

---

### Example 14: Test Duration Gate

```yaml
      - name: Check test performance
        run: |
          START=$(date +%s)
          npm test
          END=$(date +%s)
          DURATION=$((END - START))

          echo "⏱️  Test duration: ${DURATION}s"

          # Warn if over 5 minutes
          if [ $DURATION -gt 300 ]; then
            echo "⚠️  Tests took ${DURATION}s (exceeds 5 minute target)"
            echo ""
            echo "Slowest tests:"
            npm test -- --verbose | grep -E "PASS|FAIL" | sort -t ' ' -k3 -nr | head -10

            # Don't fail, just warn
          else
            echo "✅ Tests completed within target time"
          fi
```

---

## Test Reporting

### Example 15: GitHub Step Summary

```yaml
      - name: Generate test summary
        if: always()
        run: |
          echo "# 🧪 Test Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY

          # Parse test results
          npm test -- --json --outputFile=results.json || true

          TOTAL=$(jq '.numTotalTests' results.json)
          PASSED=$(jq '.numPassedTests' results.json)
          FAILED=$(jq '.numFailedTests' results.json)
          SKIPPED=$(jq '.numPendingTests' results.json)

          # Calculate percentage
          if [ $TOTAL -gt 0 ]; then
            PASS_PCT=$(echo "scale=1; $PASSED * 100 / $TOTAL" | bc)
          else
            PASS_PCT=0
          fi

          echo "## Summary" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Metric | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| Total | $TOTAL |" >> $GITHUB_STEP_SUMMARY
          echo "| ✅ Passed | $PASSED ($PASS_PCT%) |" >> $GITHUB_STEP_SUMMARY
          echo "| ❌ Failed | $FAILED |" >> $GITHUB_STEP_SUMMARY
          echo "| ⏭️ Skipped | $SKIPPED |" >> $GITHUB_STEP_SUMMARY

          # Add failed tests if any
          if [ $FAILED -gt 0 ]; then
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "## ❌ Failed Tests" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            cat results.json | jq -r '.testResults[].assertionResults[] | select(.status=="failed") | "- \(.fullName)"' >> $GITHUB_STEP_SUMMARY
          fi
```

---

### Example 16: PR Comment with Test Results

```yaml
      - name: Comment PR with results
        if: github.event_name == 'pull_request' && always()
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));

            const total = results.numTotalTests;
            const passed = results.numPassedTests;
            const failed = results.numFailedTests;
            const passRate = ((passed / total) * 100).toFixed(1);

            let body = `## 🧪 Test Results\n\n`;
            body += `| Metric | Value |\n`;
            body += `|--------|-------|\n`;
            body += `| Total | ${total} |\n`;
            body += `| ✅ Passed | ${passed} (${passRate}%) |\n`;
            body += `| ❌ Failed | ${failed} |\n\n`;

            if (failed > 0) {
              body += `### Failed Tests\n\n`;
              const failedTests = results.testResults
                .flatMap(r => r.assertionResults)
                .filter(a => a.status === 'failed');

              failedTests.forEach(test => {
                body += `- **${test.fullName}**\n`;
                body += `  \`\`\`\n${test.failureMessages.join('\n')}\`\`\`\n\n`;
              });
            }

            // Find and update existing comment or create new
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
            });

            const botComment = comments.find(c =>
              c.user.type === 'Bot' && c.body.includes('🧪 Test Results')
            );

            if (botComment) {
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id,
                body: body
              });
            } else {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: body
              });
            }
```

---

## Performance Optimization

### Example 17: Complete Caching Setup

```yaml
      - name: Setup Node.js with caching
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Cache Playwright browsers
        uses: actions/cache@v3
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            playwright-${{ runner.os }}-

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps

      - name: Cache build output
        uses: actions/cache@v3
        with:
          path: |
            .next
            build
            dist
          key: build-${{ runner.os }}-${{ hashFiles('src/**') }}
          restore-keys: |
            build-${{ runner.os }}-
```

---

## Troubleshooting Scripts

### Example 18: Debug CI Environment

```yaml
      - name: Debug CI environment
        run: |
          echo "=== System Info ==="
          uname -a
          echo ""

          echo "=== Node.js Version ==="
          node --version
          npm --version
          echo ""

          echo "=== Environment Variables ==="
          env | sort
          echo ""

          echo "=== Disk Space ==="
          df -h
          echo ""

          echo "=== Memory ==="
          free -h
          echo ""

          echo "=== Network ==="
          curl -I https://registry.npmjs.org
          echo ""

          echo "=== Git Info ==="
          git --version
          git log -1 --oneline
          git status
```

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
