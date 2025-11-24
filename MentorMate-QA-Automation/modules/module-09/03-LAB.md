# Module 9: CI/CD Integration - Hands-On Lab

**Duration**: 1.5-2 hours
**Format**: Integrated hands-on lab
**Difficulty**: Intermediate to Advanced

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

This integrated lab combines all CI/CD skills from Module 9 into a comprehensive project. You'll build a production-ready CI/CD pipeline with multi-stage testing, quality gates, automated reporting, and performance optimization.

### Learning Objectives

By completing this lab, you will:
- Build a complete multi-stage CI/CD pipeline
- Implement pre-commit and pre-push hooks
- Configure quality gates and branch protection
- Generate automated test reports with AI analysis
- Optimize pipeline performance with caching and sharding
- Deploy to a preview environment for testing

### Prerequisites

- Completion of Modules 1-8
- GitHub repository with test suite
- Node.js project with Jest/Playwright tests
- Basic understanding of Git and GitHub

---

## Lab Scenario

You're the QA Lead at **CloudCart**, an e-commerce SaaS platform. The team is moving from manual testing to full CI/CD automation. Your task is to implement a comprehensive CI/CD pipeline that:

1. Runs automatically on every commit
2. Tests across multiple stages (lint → unit → integration → E2E)
3. Enforces quality standards (80% coverage, all tests pass)
4. Provides clear feedback on failures
5. Deploys preview environments for testing
6. Completes in under 10 minutes

---

## Part 1: Project Setup and Baseline (20 minutes)

### Step 1.1: Clone or Use Existing Project

**Option A - Use your existing project:**
```bash
cd your-test-project
```

**Option B - Clone sample project:**
```bash
git clone https://github.com/[sample-repo-url]
cd cloudcart-ci-lab
npm install
```

**Verify tests work locally:**
```bash
npm run lint
npm run test:unit
npm run test:integration
npm run test:e2e
```

---

### Step 1.2: Measure Baseline Performance

Run tests locally and record:

| Test Type | Duration | Pass/Fail | Coverage |
|-----------|----------|-----------|----------|
| Lint | _____ | _____ | N/A |
| Unit | _____ | _____ | ___% |
| Integration | _____ | _____ | N/A |
| E2E | _____ | _____ | N/A |
| **Total** | **_____** | **_____** | **____%** |

**Record in**: `lab-baseline.md`

---

### Step 1.3: Create Project Structure

```bash
mkdir -p .github/workflows
mkdir -p .husky
mkdir -p docs/ci-cd
```

---

## Part 2: Multi-Stage CI Pipeline (40 minutes)

### Step 2.1: Create Base Workflow (10 minutes)

Create `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # Stage 1: Lint and Format Check
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check formatting
        run: npx prettier --check "src/**/*.{js,ts,jsx,tsx}"

  # Stage 2: Unit Tests
  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: lint
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci

      - name: Run unit tests
        run: npm run test:unit -- --coverage --coverageReporters=json-summary --coverageReporters=lcov

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          fail_ci_if_error: false

      - name: Save coverage report
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/

  # Stage 3: Integration Tests
  integration-tests:
    name: Integration Tests
    runs-on: ubuntu-latest
    needs: lint
    timeout-minutes: 15

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

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci

      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

  # Stage 4: E2E Tests (Sharded)
  e2e-tests:
    name: E2E Tests (Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests]
    timeout-minutes: 20

    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci

      - name: Cache Playwright browsers
        uses: actions/cache@v3
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - name: Upload blob report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1
```

**Checkpoint**: Commit and push, verify workflow runs

```bash
git add .github/workflows/ci.yml
git commit -m "feat: add multi-stage CI pipeline"
git push
```

---

### Step 2.2: Add Report Merging Job (10 minutes)

Add to `.github/workflows/ci.yml`:

```yaml
  # Merge E2E Reports
  merge-e2e-reports:
    name: Merge E2E Reports
    if: always()
    needs: [e2e-tests]
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./all-blob-reports

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 14
```

---

### Step 2.3: Add Quality Gates (10 minutes)

```yaml
  # Quality Gates
  quality-gates:
    name: Quality Gates
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests, e2e-tests]
    if: always()

    steps:
      - uses: actions/checkout@v4

      - name: Download coverage report
        uses: actions/download-artifact@v4
        with:
          name: coverage-report
          path: coverage/

      - name: Install tools
        run: sudo apt-get install -y jq bc

      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "📊 Coverage: $COVERAGE%"

          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi

          echo "✅ Coverage meets 80% threshold"

      - name: Generate status report
        if: always()
        run: |
          echo "# 🎯 Quality Gate Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Gate | Status | Details |" >> $GITHUB_STEP_SUMMARY
          echo "|------|--------|---------|" >> $GITHUB_STEP_SUMMARY

          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE >= 80" | bc -l) )); then
            echo "| Coverage | ✅ Pass | $COVERAGE% (>= 80%) |" >> $GITHUB_STEP_SUMMARY
          else
            echo "| Coverage | ❌ Fail | $COVERAGE% (< 80%) |" >> $GITHUB_STEP_SUMMARY
          fi

          echo "| Lint | ✅ Pass | No errors |" >> $GITHUB_STEP_SUMMARY
          echo "| Unit Tests | ✅ Pass | All passed |" >> $GITHUB_STEP_SUMMARY
          echo "| Integration | ✅ Pass | All passed |" >> $GITHUB_STEP_SUMMARY
          echo "| E2E Tests | ✅ Pass | All shards complete |" >> $GITHUB_STEP_SUMMARY
```

---

### Step 2.4: Add AI Analysis for Failures (10 minutes)

**Note**: This requires setting up `ANTHROPIC_API_KEY` in GitHub Secrets.

```yaml
      - name: Analyze failures with AI
        if: failure()
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Create analysis prompt
          cat > analysis-prompt.txt <<'EOF'
          Analyze these CI/CD test failures and provide:

          1. Summary of what failed
          2. Most likely root causes (ranked)
          3. Specific action items to fix
          4. Whether this is a test issue or code issue

          Format as GitHub markdown with clear sections.
          EOF

          # Call Claude API
          curl -X POST https://api.anthropic.com/v1/messages \
            -H "x-api-key: $ANTHROPIC_API_KEY" \
            -H "anthropic-version: 2023-06-01" \
            -H "content-type: application/json" \
            -d '{
              "model": "claude-3-5-sonnet-20241022",
              "max_tokens": 2048,
              "messages": [{
                "role": "user",
                "content": "'"$(cat analysis-prompt.txt)"'"
              }]
            }' > ai-response.json

          # Extract and save analysis
          cat ai-response.json | jq -r '.content[0].text' > ai-analysis.md
          echo "AI analysis saved to ai-analysis.md"

      - name: Upload AI analysis
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: ai-failure-analysis
          path: ai-analysis.md
```

---

## Part 3: Pre-commit Hooks (15 minutes)

### Step 3.1: Install and Configure Husky

```bash
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
```

### Step 3.2: Configure lint-staged

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --bail --findRelatedTests --passWithNoTests"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

### Step 3.3: Create Hooks

```bash
# Pre-commit: Fast checks
npx husky add .husky/pre-commit "npx lint-staged"

# Pre-push: Unit tests
npx husky add .husky/pre-push "npm run test:unit"
```

Edit `.husky/pre-push` to add coverage check:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🧪 Running unit tests before push..."
npm run test:unit

echo "📊 Checking coverage threshold..."
npm run test:unit -- --coverage --coverageThreshold='{"global":{"lines":80}}'

echo "✅ All pre-push checks passed"
```

---

## Part 4: Branch Protection and Deployment (15 minutes)

### Step 4.1: Configure Branch Protection

In GitHub repository settings:

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - Select required checks:
     - `lint`
     - `unit-tests`
     - `integration-tests`
     - `e2e-tests (Shard 1/4)` through `(Shard 4/4)`
     - `quality-gates`
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
3. Save changes

**Document**: Take screenshot, add to `docs/ci-cd/branch-protection.png`

---

### Step 4.2: Add Preview Deployment (Optional)

Add to `.github/workflows/ci.yml`:

```yaml
  deploy-preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    needs: [quality-gates]
    if: github.event_name == 'pull_request' && success()

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - name: Deploy to Vercel/Netlify
        run: |
          echo "🚀 Deploying preview for PR #${{ github.event.pull_request.number }}"
          # Add your deployment command here
          # npx vercel --token ${{ secrets.VERCEL_TOKEN }}

      - name: Comment preview URL
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployed: https://preview-${{ github.event.pull_request.number }}.cloudcart.dev'
            })
```

---

## Part 5: Documentation and Testing (20 minutes)

### Step 5.1: Create CI/CD Documentation

Create `docs/ci-cd/README.md`:

```markdown
# CI/CD Pipeline Documentation

## Overview

This project uses a multi-stage CI/CD pipeline that runs on every commit and pull request.

## Pipeline Stages

### 1. Lint & Format (< 5 min)
- ESLint checks
- Prettier formatting
- Fails fast on style issues

### 2. Unit Tests (< 10 min)
- Fast, isolated tests
- Coverage reporting
- Minimum 80% coverage required

### 3. Integration Tests (< 15 min)
- Database interactions
- API testing
- Service integration

### 4. E2E Tests (< 20 min)
- Sharded across 4 runners
- Full user journey testing
- Browser automation with Playwright

### 5. Quality Gates
- Coverage >= 80%
- All tests passing
- No lint errors

## Pre-commit Hooks

### Pre-commit
- Lints and formats staged files
- Runs tests for changed files
- Takes ~30 seconds

### Pre-push
- Runs full unit test suite
- Checks coverage threshold
- Takes ~2 minutes

## Branch Protection

The `main` branch is protected:
- Requires PR approval
- All CI checks must pass
- Branch must be up to date
- Conversations must be resolved

## Troubleshooting

### Tests fail in CI but pass locally
- Check environment variables
- Verify Node.js version matches
- Clear cache and retry

### Pipeline is slow
- Check cache hit rate
- Review test parallelization
- Identify slow tests

### Pre-commit hook fails
- Run `npm run lint:fix` to auto-fix
- Run `npx prettier --write .` to format
- Check test output for failures

## Optimization

Current optimizations:
- ✅ Dependency caching (saves ~2 min)
- ✅ Playwright browser caching (saves ~1 min)
- ✅ Test sharding (4× faster E2E)
- ✅ Selective testing on PRs

## Metrics

Target performance:
- Total pipeline: < 10 minutes
- Lint: < 5 minutes
- Unit tests: < 10 minutes
- Integration: < 15 minutes
- E2E (sharded): < 20 minutes (5 min per shard)

Current performance:
[Update after measuring]
```

---

### Step 5.2: Test the Complete Pipeline

#### Test 1: Happy Path

```bash
# Make a simple change
echo "// test comment" >> src/index.js

# Commit (pre-commit hook should run)
git add src/index.js
git commit -m "test: verify CI pipeline"

# Push (pre-push hook should run)
git push origin feature/test-ci

# Create PR and verify:
# - All stages run
# - All pass
# - Quality gates pass
# - Preview deployed
```

#### Test 2: Failure Scenarios

```bash
# Introduce linting error
echo "const x = 'missing semicolon'" >> src/index.js
git add src/index.js
git commit -m "test: verify lint failure"
# Should be caught by pre-commit hook

# Introduce test failure
# Edit a test to fail
git add tests/
git commit -m "test: verify test failure"
git push
# Should fail in CI, trigger AI analysis
```

#### Test 3: Coverage Failure

```bash
# Add code without tests (reduce coverage)
# Push and verify quality gate fails
```

---

### Step 5.3: Measure Final Performance

Re-run performance measurements:

| Test Type | Duration | Pass/Fail | Coverage | Change |
|-----------|----------|-----------|----------|--------|
| Lint | _____ | _____ | N/A | _____ |
| Unit | _____ | _____ | ___% | _____ |
| Integration | _____ | _____ | N/A | _____ |
| E2E (sharded) | _____ | _____ | N/A | _____ |
| **Total** | **_____** | **_____** | **____%** | **_____** |

**Goal**: Pipeline under 10 minutes

---

## Lab Deliverables

Submit the following:

### 1. Complete CI/CD Pipeline
- [ ] `.github/workflows/ci.yml` (multi-stage workflow)
- [ ] All stages working (lint, unit, integration, E2E)
- [ ] Test sharding implemented
- [ ] Quality gates enforced

### 2. Pre-commit Hooks
- [ ] `.husky/pre-commit` configured
- [ ] `.husky/pre-push` configured
- [ ] `lint-staged` configuration in package.json
- [ ] Evidence of hooks working (screenshot)

### 3. Branch Protection
- [ ] Screenshot of branch protection rules
- [ ] Evidence of protection working (blocked merge screenshot)

### 4. Documentation
- [ ] `docs/ci-cd/README.md` (pipeline documentation)
- [ ] `lab-baseline.md` (initial performance)
- [ ] `lab-final.md` (final performance and analysis)
- [ ] `lab-report.md` (comprehensive lab report)

### 5. Lab Report

Create `lab-report.md` with:

#### Section A: Pipeline Architecture (20 points)
- Diagram of pipeline stages
- Explanation of stage dependencies
- Rationale for stage order
- Estimated duration per stage

#### Section B: Quality Gates (20 points)
- Description of each quality gate
- Threshold values and justification
- How gates are enforced
- Evidence of gates working

#### Section C: Optimization Strategies (25 points)
- Caching implementation and impact
- Sharding configuration and speedup
- Selective testing approach
- Performance metrics (before/after)

#### Section D: Hooks and Local Development (15 points)
- Pre-commit hook functionality
- Pre-push hook functionality
- Developer experience improvements
- Edge cases handled

#### Section E: Challenges and Solutions (10 points)
- Problems encountered
- Solutions implemented
- Lessons learned
- Future improvements

#### Section F: Reflection (10 points)
- What worked well
- What was challenging
- How CI/CD improves QA process
- Real-world applicability

---

## Grading Rubric

### Total Points: 200

| Category | Points | Criteria |
|----------|--------|----------|
| **Pipeline Implementation** | 50 | All stages working, properly ordered, sharding implemented |
| **Quality Gates** | 30 | Coverage, tests, lint enforced correctly |
| **Pre-commit Hooks** | 25 | Fast, effective, proper configuration |
| **Branch Protection** | 20 | Properly configured, evidence of enforcement |
| **Performance Optimization** | 30 | Measurable improvements, under 10 min target |
| **Documentation** | 25 | Complete, clear, accurate |
| **Lab Report** | 20 | Thoughtful analysis, demonstrates understanding |

**Passing**: 140+ points (70%)

---

## Common Issues and Solutions

### Issue 1: Sharded tests not running

**Symptoms**: Only shard 1 runs, others skipped

**Solutions**:
1. Check matrix syntax in workflow
2. Verify `fail-fast: false` is set
3. Check Playwright sharding syntax
4. Review job dependencies

---

### Issue 2: Quality gate fails unexpectedly

**Symptoms**: Coverage shows as 0% or NaN

**Solutions**:
1. Verify coverage files are generated
2. Check artifact upload/download
3. Ensure `jq` is installed
4. Validate JSON structure

---

### Issue 3: Pre-commit hook too slow

**Symptoms**: Commits take >1 minute

**Solutions**:
1. Use lint-staged (only check staged files)
2. Remove slow checks from pre-commit
3. Move comprehensive checks to pre-push
4. Cache test results

---

### Issue 4: Branch protection prevents urgent fixes

**Symptoms**: Can't merge critical hotfix

**Solutions**:
1. Create `hotfix` branch with relaxed rules
2. Enable admin bypass (use sparingly)
3. Fix in separate PR, merge when passing
4. Review why checks failed

---

## Extension Activities

If you complete early:

### Extension 1: Slack/Discord Notifications
Add notifications for failures to team chat

### Extension 2: Allure Reporting
Implement rich HTML test reports with Allure

### Extension 3: Flaky Test Detection
Add retry logic and track flaky tests

### Extension 4: Cost Optimization
Analyze runner minute usage, optimize further

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Playwright Sharding](https://playwright.dev/docs/test-sharding)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

---

## Submission

1. Zip your project directory:
   ```bash
   # Exclude node_modules
   zip -r module-09-lab-[YourName].zip . -x "node_modules/*" ".git/*"
   ```

2. Include:
   - All workflow files
   - Hook configurations
   - Documentation
   - Lab report
   - Screenshots

3. Submit via [your LMS/submission method]

4. Due date: [As specified by instructor]

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
