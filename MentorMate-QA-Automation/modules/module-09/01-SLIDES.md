# Module 9: CI/CD Integration - Presentation Slides

**Duration**: 4 hours (including exercises)
**Total Slides**: 45

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Slide 1 of 45: Title Slide

# Module 9: CI/CD Integration

**Automating Testing in Continuous Delivery Pipelines**

Instructor: [Your Name]
Duration: 4 hours

---

## Slide 2 of 45: Learning Objectives

By the end of this module, you will be able to:

- Set up GitHub Actions for automated testing
- Configure pre-commit and pre-push hooks
- Implement quality gates for code protection
- Generate automated test reports
- Optimize test performance in CI environments

---

## Slide 3 of 45: Module Agenda

1. **CI/CD Fundamentals** (30 min)
2. **GitHub Actions Setup** (45 min)
3. **Pre-commit Hooks** (30 min)
4. **Test Reporting** (30 min)
5. **Performance Optimization** (30 min)
6. **Advanced Topics** (30 min)
7. **Hands-On Exercises** (75 min)

---

## Slide 4 of 45: Section 1 - CI/CD Fundamentals

# Part 1: Understanding CI/CD

**Why automate testing in your pipeline?**

---

## Slide 5 of 45: What is CI/CD?

**CI - Continuous Integration**:
- Automatically build and test code on every change
- Merge changes frequently (multiple times per day)
- Catch integration issues early

**CD - Continuous Delivery/Deployment**:
- Automatically deploy tested code
- Release frequently and reliably
- Reduce time from commit to production

**Goal**: Automate the path from code to production

---

## Slide 6 of 45: Why CI/CD for Testing?

**Without CI/CD:**
```
Developer commits → Tests forgotten → Bug reaches production
                        ↓
              Someone remembers tests
                        ↓
              Run manually (maybe)
                        ↓
              Oops, they fail
                        ↓
              Already merged!
```

**With CI/CD:**
```
Developer commits → CI runs automatically → Tests fail → Merge blocked
                         ↓
                    Tests pass → Merge allowed → Safe deployment
```

---

## Slide 7 of 45: The Testing Pipeline

```
┌─────────────────────────────────────────────────────┐
│  PUSH TO BRANCH                                     │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 1: Install & Build          (~1-2 min)      │
│  • Install dependencies                             │
│  • Cache for speed                                  │
│  • Build project                                    │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 2: Lint & Format            (~30 sec)       │
│  • ESLint, Prettier                                 │
│  • Fast feedback on code style                      │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 3: Unit Tests               (~2 min)        │
│  • Fast, isolated tests                             │
│  • Generate coverage report                         │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 4: Integration Tests        (~5 min)        │
│  • Database, APIs, services                         │
│  • More realistic scenarios                         │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 5: E2E Tests               (~10 min)        │
│  • Full user journeys                               │
│  • Browser automation                               │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  STAGE 6: Quality Gates                             │
│  • Coverage >= 80%?                                 │
│  • All tests passed?                                │
│  • No security issues?                              │
└──────────────┬──────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────┐
│  ✅ READY TO MERGE/DEPLOY                           │
└─────────────────────────────────────────────────────┘
```

**Total time**: ~15-20 minutes for full pipeline

---

## Slide 8 of 45: Key CI/CD Principles

1. **Build Once, Deploy Many**
   - Create artifact once, deploy to multiple environments

2. **Fail Fast**
   - Run fastest tests first
   - Stop on first failure (for dev branches)

3. **Keep It Green**
   - Main branch should always pass all tests
   - Fix failures immediately

4. **Automate Everything**
   - No manual steps in critical path
   - Reproducible builds

5. **Monitor and Improve**
   - Track pipeline performance
   - Continuously optimize

---

## Slide 9 of 45: Section 2 - GitHub Actions Setup

# Part 2: Building Your First Pipeline

**GitHub Actions for automated testing**

---

## Slide 10 of 45: What is GitHub Actions?

**GitHub's built-in CI/CD platform**

**Key Concepts:**
- **Workflows**: Automated processes defined in YAML
- **Events**: Triggers (push, pull_request, schedule)
- **Jobs**: Groups of steps that run on same runner
- **Steps**: Individual tasks (checkout, install, test)
- **Runners**: Virtual machines that execute jobs

**Location**: `.github/workflows/*.yml`

---

## Slide 11 of 45: Basic Workflow Structure

```yaml
name: Test Suite                    # Workflow name

on:                                 # When to run
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:                               # What to do
  test:
    runs-on: ubuntu-latest          # Where to run

    steps:                          # How to do it
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

---

## Slide 12 of 45: Workflow Triggers (Events)

**Common triggers:**

```yaml
# On push to specific branches
on:
  push:
    branches: [main, develop]

# On pull requests
on:
  pull_request:
    branches: [main]

# On schedule (cron)
on:
  schedule:
    - cron: '0 2 * * *'  # Every day at 2 AM

# Multiple events
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'  # Weekly
```

---

## Slide 13 of 45: Complete Test Workflow Example

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

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'              # Cache npm packages

      - name: Install dependencies
        run: npm ci                 # Use ci for reproducible builds

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm run test:unit -- --coverage

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
```

---

## Slide 14 of 45: Matrix Builds

**Test across multiple environments**

```yaml
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
      - run: npm ci
      - run: npm test
```

**Result**: Tests run on 6 different configurations in parallel

---

## Slide 15 of 45: Job Dependencies

**Run jobs in sequence or parallel**

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint

  unit-tests:
    needs: lint                    # Wait for lint to pass
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit

  integration-tests:
    needs: lint                    # Also waits for lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:integration

  e2e-tests:
    needs: [unit-tests, integration-tests]  # Wait for both
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

---

## Slide 16 of 45: E2E Tests with Playwright

```yaml
  e2e:
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()                 # Run even if tests fail
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Slide 17 of 45: Section 3 - Pre-commit Hooks

# Part 3: Catching Issues Before Push

**Git hooks with Husky and lint-staged**

---

## Slide 18 of 45: What are Git Hooks?

**Scripts that run automatically at Git lifecycle events**

**Common hooks:**
- `pre-commit` - Before creating commit
- `commit-msg` - After writing commit message
- `pre-push` - Before pushing to remote
- `post-merge` - After successful merge

**Use case**: Run quick checks before code leaves your machine

---

## Slide 19 of 45: Why Pre-commit Hooks?

**Shift left: Catch issues earlier**

```
Without hooks:
Commit → Push → CI runs → Tests fail → 10 min wasted

With hooks:
Commit → Hook catches issue → Fix → Commit → Push → CI passes
         ↑ 30 seconds      ↑         ↑       ↑
         Immediate         Local     Quick   Success
         feedback          fix       CI
```

**Benefits:**
- Faster feedback (seconds vs minutes)
- Save CI resources
- Enforce standards before push
- Better developer experience

---

## Slide 20 of 45: Husky Setup

**Husky**: Modern Git hooks manager

```bash
# Install Husky
npm install --save-dev husky

# Initialize Husky
npx husky install

# Add to package.json to auto-install for team
npm pkg set scripts.prepare="husky install"

# Create a pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

**Result**: Creates `.husky/pre-commit` file

---

## Slide 21 of 45: lint-staged Configuration

**Run linters only on staged files (fast!)**

```bash
# Install lint-staged
npm install --save-dev lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --fix",           // Fix linting issues
      "prettier --write"        // Format code
    ],
    "*.{json,md,yml}": [
      "prettier --write"
    ],
    "*.test.{js,ts}": [
      "jest --findRelatedTests --passWithNoTests"
    ]
  }
}
```

```bash
# Update pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

---

## Slide 22 of 45: Pre-commit Hook Example

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged
npx lint-staged

# Run unit tests for changed files
npm run test:unit -- --findRelatedTests --passWithNoTests
```

**What happens:**
1. You run `git commit`
2. Hook runs lint-staged
3. Lints and formats staged files
4. Runs tests for changed files
5. If all pass → commit succeeds
6. If any fail → commit blocked

---

## Slide 23 of 45: Pre-push Hook Example

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "Running tests before push..."

# Run full unit test suite
npm run test:unit

# Check coverage threshold
npm run test:coverage -- --coverageThreshold='{"global":{"lines":80}}'

# If tests fail, prevent push
```

**Use case**: More comprehensive checks before push

---

## Slide 24 of 45: Commit Message Validation

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# commit-msg hook
commit_msg=$(cat "$1")

# Check for Conventional Commits format
pattern="^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}"

if ! echo "$commit_msg" | grep -Eq "$pattern"; then
  echo "❌ Invalid commit message format"
  echo ""
  echo "Use: <type>(<scope>): <subject>"
  echo ""
  echo "Examples:"
  echo "  feat(auth): add login functionality"
  echo "  fix(api): handle null response"
  echo "  test(users): add registration tests"
  exit 1
fi
```

---

## Slide 25 of 45: Section 4 - Test Reporting

# Part 4: Visualizing Test Results

**Automated reports and notifications**

---

## Slide 26 of 45: Why Automated Reports?

**Manual test result review is inefficient**

**Automated reports provide:**
- Summary of test execution
- Failed test details with root causes
- Coverage trends over time
- Performance metrics
- Historical comparison
- Immediate notifications

**Recipients**: Developers, QA team, stakeholders

---

## Slide 27 of 45: Basic Test Report Generation

**GitHub Actions Job Summary**

```yaml
      - name: Test Summary
        if: always()
        run: |
          echo "## Test Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Metric | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| Total Tests | $(npm test -- --json | jq '.numTotalTests') |" >> $GITHUB_STEP_SUMMARY
          echo "| Passed | $(npm test -- --json | jq '.numPassedTests') |" >> $GITHUB_STEP_SUMMARY
          echo "| Failed | $(npm test -- --json | jq '.numFailedTests') |" >> $GITHUB_STEP_SUMMARY
          echo "| Duration | $(npm test -- --json | jq '.time') ms |" >> $GITHUB_STEP_SUMMARY
```

**Appears in**: GitHub Actions run summary

---

## Slide 28 of 45: AI-Generated Test Report

**Use AI to analyze test results**

```
Analyze these test results and create a report:

[paste test output]

Generate a report with:

## Summary
- Total: X tests
- Passed: X (X%)
- Failed: X (X%)
- Duration: Xs

## Failed Tests
For each failure:
- Test name
- Error message
- Likely root cause
- Suggested fix

## Coverage Analysis
- Current coverage: X%
- Target: 80%
- Files below threshold
- Recommendations

## Performance
- Slowest tests (>1s)
- Optimization suggestions

## Action Items
Priority ordered list of what to fix

Format as markdown for GitHub PR comment.
```

---

## Slide 29 of 45: PR Comment with Results

```yaml
      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('test-report.md', 'utf8');

            // Find existing comment
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
            });

            const botComment = comments.find(comment =>
              comment.user.type === 'Bot' &&
              comment.body.includes('## Test Results')
            );

            if (botComment) {
              // Update existing comment
              await github.rest.issues.updateComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id,
                body: report
              });
            } else {
              // Create new comment
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.issue.number,
                body: report
              });
            }
```

---

## Slide 30 of 45: Coverage Reporting

**Codecov Integration**

```yaml
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: true
```

**Features:**
- Visual coverage reports
- Coverage trends over time
- PR coverage diff
- Branch coverage comparison
- Badges for README

---

## Slide 31 of 45: Allure Test Reports

**Rich, interactive test reports**

```yaml
      - name: Install Allure
        run: npm install -D allure-playwright

      - name: Run tests with Allure
        run: npx playwright test --reporter=line,allure-playwright

      - name: Generate Allure Report
        if: always()
        run: npx allure generate ./allure-results -o ./allure-report

      - name: Upload Allure Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report
          retention-days: 20
```

**Features:** Screenshots, videos, timelines, historical trends

---

## Slide 32 of 45: Section 5 - Performance Optimization

# Part 5: Faster Pipelines

**Caching, parallelization, and selective testing**

---

## Slide 33 of 45: Why Optimize?

**Slow pipelines hurt productivity**

```
20-minute pipeline × 20 commits/day = 6.6 hours wasted

Optimize to 5 minutes → 1.6 hours → Save 5 hours/day!
```

**Goals:**
- Faster feedback (happier developers)
- Lower costs (fewer runner minutes)
- More frequent commits (better CI practices)

---

## Slide 34 of 45: Optimization Strategy 1: Caching

**Cache dependencies to avoid re-downloading**

```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'              # Built-in caching!

      - name: Cache Playwright browsers
        uses: actions/cache@v3
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

      - name: Custom cache
        uses: actions/cache@v3
        with:
          path: |
            ~/.npm
            node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
```

**Impact**: 2-5x faster builds

---

## Slide 35 of 45: Optimization Strategy 2: Parallelization

**Test Sharding - Split tests across multiple runners**

```yaml
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
      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run Playwright tests (shard ${{ matrix.shardIndex }})
        run: |
          npx playwright test \
            --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1
```

**Impact**: N shards = N× faster (e.g., 4 shards = 4× speed)

---

## Slide 36 of 45: Merge Sharded Reports

```yaml
  merge-reports:
    if: always()
    needs: [e2e]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4

      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge into HTML Report
        run: |
          npx playwright merge-reports \
            --reporter html \
            ./all-blob-reports

      - uses: actions/upload-artifact@v4
        with:
          name: html-report
          path: playwright-report
          retention-days: 14
```

---

## Slide 37 of 45: Optimization Strategy 3: Selective Testing

**Run only tests affected by changes**

```yaml
      - name: Get changed files
        id: changed
        uses: tj-actions/changed-files@v35
        with:
          files: |
            src/**
            tests/**

      - name: Run tests for changed files
        if: steps.changed.outputs.any_changed == 'true'
        run: |
          npm test -- \
            --findRelatedTests \
            ${{ steps.changed.outputs.all_changed_files }}

      - name: Run all tests on main branch
        if: github.ref == 'refs/heads/main'
        run: npm test
```

**Impact**: 3-10× fewer tests on PRs, full suite on main

---

## Slide 38 of 45: Optimization Strategy 4: Fail Fast

```yaml
jobs:
  test:
    strategy:
      fail-fast: true    # Stop all jobs on first failure
      matrix:
        node: [18, 20]
        os: [ubuntu-latest, windows-latest]

    # For main branch, run all combinations
    # For dev branches, stop on first failure
```

**Development branches**: Fail fast, save time
**Main branch**: Run all tests, ensure quality

---

## Slide 39 of 45: Section 6 - Quality Gates

# Part 6: Enforcing Standards

**Automated quality enforcement**

---

## Slide 40 of 45: What are Quality Gates?

**Checks that must pass before code can proceed**

**Common quality gates:**
- ✅ All tests passing (100%)
- ✅ Code coverage >= 80%
- ✅ No lint errors
- ✅ No security vulnerabilities
- ✅ Build succeeds
- ✅ Performance benchmarks met
- ✅ No skipped tests in critical paths

**Enforcement**: GitHub branch protection rules

---

## Slide 41 of 45: Coverage Threshold Gate

```yaml
      - name: Check coverage threshold
        run: |
          # Extract coverage percentage
          COVERAGE=$(cat coverage/coverage-summary.json | \
            jq '.total.lines.pct')

          echo "Coverage: $COVERAGE%"

          # Fail if below threshold
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi

          echo "✅ Coverage $COVERAGE% meets threshold"
```

---

## Slide 42 of 45: No Skipped Tests Gate

```yaml
      - name: Validate no skipped tests
        run: |
          # Get number of skipped tests
          SKIPPED=$(npm test -- --json 2>/dev/null | \
            jq '.numPendingTests')

          if [ "$SKIPPED" -gt 0 ]; then
            echo "❌ Found $SKIPPED skipped tests - not allowed in main"
            exit 1
          fi

          echo "✅ No skipped tests"
```

---

## Slide 43 of 45: Branch Protection Rules

**Configure in GitHub Settings → Branches**

```
✅ Require status checks to pass before merging
  ✅ lint
  ✅ unit-tests
  ✅ integration-tests
  ✅ e2e-tests
  ✅ coverage

✅ Require branches to be up to date before merging

✅ Require pull request reviews (1 approvals)

✅ Dismiss stale pull request approvals when new commits

✅ Do not allow bypassing the above settings
```

**Result**: Can't merge without passing all checks

---

## Slide 44 of 45: Advanced Topics

**Beyond the basics**

1. **AI Log Analysis**
   - Analyze failures with AI
   - Suggest root causes and fixes
   - Auto-create issues for failures

2. **Flaky Test Detection**
   - Re-run failed tests
   - Track flakiness over time
   - Quarantine flaky tests

3. **Performance Monitoring**
   - Track test duration trends
   - Alert on performance degradation
   - Identify slow tests

4. **Preview Environments**
   - Deploy PR to temporary environment
   - Run E2E tests against preview
   - Share preview URL in PR

---

## Slide 45 of 45: Summary and Next Steps

**What We Learned:**
- CI/CD pipeline stages for testing
- GitHub Actions workflows
- Pre-commit hooks with Husky
- Automated test reporting
- Performance optimization (caching, sharding, selective testing)
- Quality gates and enforcement

**Next Steps:**
- Hands-on exercises (2.5 hours)
- Build complete CI/CD pipeline
- Implement all optimization strategies
- Practice with real projects

**Next Module**: Module 10 - Final Project

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
