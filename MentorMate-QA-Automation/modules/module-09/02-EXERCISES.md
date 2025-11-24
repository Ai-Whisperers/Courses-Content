# Module 9: CI/CD Integration - Exercises

**Total Time**: 2.5 hours
**Format**: Individual work with instructor review

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

This module contains five hands-on exercises designed to build your CI/CD skills incrementally:

1. **Exercise 9.1**: Basic CI Pipeline Setup (30 minutes)
2. **Exercise 9.2**: Pre-commit Hooks Configuration (30 minutes)
3. **Exercise 9.3**: Quality Gates Implementation (30 minutes)
4. **Exercise 9.4**: Automated Test Reporting (30 minutes)
5. **Exercise 9.5**: Performance Optimization (30 minutes)

---

## Exercise 9.1: Basic CI Pipeline Setup

**Objective**: Create a GitHub Actions workflow that runs tests on every push and pull request

**Duration**: 30 minutes

**Difficulty**: Intermediate

### Scenario

You have a Node.js project with Jest tests. You need to set up a CI pipeline that automatically runs tests whenever code is pushed to the repository or a pull request is created.

### Prerequisites

- GitHub repository (public or private)
- Project with existing tests
- Basic understanding of YAML syntax

### Steps

#### Step 1: Create Workflow Directory (2 minutes)

```bash
# In your project root
mkdir -p .github/workflows
cd .github/workflows
```

#### Step 2: Create Basic Workflow File (10 minutes)

Create `.github/workflows/test.yml`:

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
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test
```

#### Step 3: Add Coverage Reporting (5 minutes)

Enhance the workflow to generate and upload coverage:

```yaml
      - name: Run tests with coverage
        run: npm test -- --coverage --coverageReporters=lcov

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: false
```

#### Step 4: Commit and Push (3 minutes)

```bash
git add .github/workflows/test.yml
git commit -m "feat: add CI/CD pipeline"
git push origin main
```

#### Step 5: Verify Workflow Execution (10 minutes)

1. Go to your GitHub repository
2. Click "Actions" tab
3. Find your workflow run
4. Review the logs
5. Fix any errors that occur

### Deliverables

Submit:
- [ ] Working `.github/workflows/test.yml` file
- [ ] Screenshot of successful workflow run
- [ ] Brief description of what each step does

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Workflow Creation** (30 pts) | Complete, follows best practices | Complete, minor issues | Missing some steps | Incomplete or non-functional |
| **Configuration** (30 pts) | All triggers, caching, steps correct | Most correct, minor errors | Several configuration errors | Major issues |
| **Execution** (25 pts) | Runs successfully first time | Runs after minor fixes | Runs after major fixes | Does not run |
| **Documentation** (15 pts) | Clear explanation of all steps | Good explanation | Basic explanation | Poor or missing |

### Common Issues and Solutions

**Issue**: `npm ci` fails with "lockfile missing"
**Solution**: Ensure `package-lock.json` is committed

**Issue**: Tests fail in CI but pass locally
**Solution**: Check for environment differences, missing env vars

**Issue**: Workflow doesn't trigger
**Solution**: Verify YAML syntax, check branch names match

### Tips for Success

- Test your workflow on a separate branch first
- Use `npm ci` instead of `npm install` for CI (faster, more reliable)
- Enable caching to speed up subsequent runs
- Check the Actions tab frequently for feedback

---

## Exercise 9.2: Pre-commit Hooks Configuration

**Objective**: Configure pre-commit hooks to catch issues before they reach CI

**Duration**: 30 minutes

**Difficulty**: Beginner to Intermediate

### Scenario

Your team wants to catch linting and formatting issues before code is committed, saving CI resources and providing faster feedback to developers.

### Steps

#### Step 1: Install Husky and lint-staged (5 minutes)

```bash
# Install dependencies
npm install --save-dev husky lint-staged

# Initialize Husky
npx husky install

# Add prepare script (auto-installs for team members)
npm pkg set scripts.prepare="husky install"
```

#### Step 2: Configure lint-staged (10 minutes)

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.test.{js,ts}": [
      "jest --bail --findRelatedTests --passWithNoTests"
    ]
  }
}
```

#### Step 3: Create Pre-commit Hook (5 minutes)

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

This creates `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

#### Step 4: Create Pre-push Hook (5 minutes)

```bash
npx husky add .husky/pre-push "npm run test:unit"
```

Edit `.husky/pre-push` to add coverage check:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🧪 Running unit tests before push..."
npm run test:unit

echo "📊 Checking coverage..."
npm run test:coverage -- --coverageThreshold='{"global":{"lines":80}}'
```

#### Step 5: Test the Hooks (5 minutes)

```bash
# Make a change to a file
echo "// test" >> src/index.js

# Stage the file
git add src/index.js

# Try to commit (hook should run)
git commit -m "test: verify pre-commit hook"

# If successful, try to push (pre-push hook should run)
git push
```

### Deliverables

Submit:
- [ ] `package.json` with lint-staged configuration
- [ ] `.husky/pre-commit` hook file
- [ ] `.husky/pre-push` hook file
- [ ] Screenshots showing hooks running
- [ ] Brief explanation of each hook's purpose

### Grading Rubric (100 points)

| Criteria | Points | Description |
|----------|--------|-------------|
| **Husky Installation** | 20 pts | Correctly installed and initialized |
| **lint-staged Config** | 30 pts | Comprehensive, targets correct files |
| **Pre-commit Hook** | 20 pts | Runs linting and formatting |
| **Pre-push Hook** | 20 pts | Runs tests and coverage check |
| **Verification** | 10 pts | Evidence of hooks working |

### Common Issues and Solutions

**Issue**: Hooks don't execute
**Solution**: Ensure `.husky` directory is committed, run `chmod +x .husky/*`

**Issue**: Hook fails but commit still goes through
**Solution**: Check for `--no-verify` flag, ensure exit codes are correct

**Issue**: Hook is too slow
**Solution**: Use lint-staged to only check changed files

### Tips for Success

- Make hooks fast (< 30 seconds for pre-commit)
- Use lint-staged to only check staged files
- Pre-push can be slower (unit tests only, not full suite)
- Document hooks for team members

---

## Exercise 9.3: Quality Gates Implementation

**Objective**: Implement quality gates to prevent bad code from merging

**Duration**: 30 minutes

**Difficulty**: Intermediate

### Scenario

Your project needs to enforce minimum quality standards: 80% code coverage, zero skipped tests, and all tests passing before merging to main.

### Steps

#### Step 1: Add Coverage Threshold Check (10 minutes)

Add to `.github/workflows/test.yml`:

```yaml
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "Coverage: $COVERAGE%"

          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below 80% threshold"
            exit 1
          fi

          echo "✅ Coverage meets 80% threshold"
```

**Note**: Install `jq` and `bc` in workflow if needed:

```yaml
      - name: Install tools
        run: sudo apt-get install -y jq bc
```

#### Step 2: Add No-Skipped-Tests Check (8 minutes)

```yaml
      - name: Validate no skipped tests
        run: |
          SKIPPED=$(npm test -- --json 2>/dev/null | jq '.numPendingTests')

          if [ "$SKIPPED" -gt 0 ]; then
            echo "❌ Found $SKIPPED skipped tests"
            echo "Skipped tests are not allowed on main branch"
            exit 1
          fi

          echo "✅ No skipped tests"
```

#### Step 3: Add Performance Gate (7 minutes)

```yaml
      - name: Check test performance
        run: |
          START=$(date +%s)
          npm test
          END=$(date +%s)
          DURATION=$((END - START))

          echo "Test duration: ${DURATION}s"

          if [ $DURATION -gt 300 ]; then
            echo "⚠️ Tests took ${DURATION}s (exceeds 5 minute target)"
            echo "Consider optimizing slow tests"
            # Don't fail, just warn
          fi
```

#### Step 4: Configure Branch Protection (5 minutes)

In GitHub repository settings:

1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date
   - Select required checks: `test`, `lint`, `coverage`
4. Save changes

### Deliverables

Submit:
- [ ] Updated workflow with quality gates
- [ ] Screenshot of branch protection rules
- [ ] Documentation of each quality gate
- [ ] Test results showing gates in action

### Grading Rubric (100 points)

| Criteria | Points | Description |
|----------|--------|-------------|
| **Coverage Gate** | 30 pts | Correctly enforces 80% threshold |
| **Skipped Tests Gate** | 25 pts | Detects and blocks skipped tests |
| **Performance Gate** | 20 pts | Measures and reports test duration |
| **Branch Protection** | 15 pts | Properly configured in GitHub |
| **Documentation** | 10 pts | Clear explanation of each gate |

### Common Issues and Solutions

**Issue**: `jq: command not found`
**Solution**: Add installation step: `sudo apt-get install -y jq bc`

**Issue**: Coverage file not found
**Solution**: Ensure tests run with `--coverage` flag before checking

**Issue**: Branch protection prevents urgent fixes
**Solution**: Create "hotfix" branch with less strict rules, or enable admin bypass for emergencies

### AI Assistance Prompt

```
Review this quality gate implementation and suggest improvements:

[paste your workflow]

Consider:
1. Are the thresholds appropriate?
2. Should any gates be warnings vs failures?
3. Are there additional quality checks we should add?
4. How can we make the gates more maintainable?

Provide the improved YAML with explanations.
```

---

## Exercise 9.4: Automated Test Reporting

**Objective**: Generate and publish automated test reports on every CI run

**Duration**: 30 minutes

**Difficulty**: Intermediate to Advanced

### Scenario

Your team needs visibility into test results without manually checking CI logs. Implement automated reporting that comments on PRs with test summaries, coverage changes, and failure details.

### Steps

#### Step 1: Add Test Result Summary (10 minutes)

Add to `.github/workflows/test.yml`:

```yaml
      - name: Generate test summary
        if: always()
        run: |
          echo "## 🧪 Test Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY

          # Run tests and capture JSON output
          npm test -- --json --outputFile=test-results.json || true

          TOTAL=$(jq '.numTotalTests' test-results.json)
          PASSED=$(jq '.numPassedTests' test-results.json)
          FAILED=$(jq '.numFailedTests' test-results.json)
          SKIPPED=$(jq '.numPendingTests' test-results.json)
          DURATION=$(jq '.testResults[0].perfStats.runtime' test-results.json)

          echo "| Metric | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| Total Tests | $TOTAL |" >> $GITHUB_STEP_SUMMARY
          echo "| ✅ Passed | $PASSED |" >> $GITHUB_STEP_SUMMARY
          echo "| ❌ Failed | $FAILED |" >> $GITHUB_STEP_SUMMARY
          echo "| ⏭️ Skipped | $SKIPPED |" >> $GITHUB_STEP_SUMMARY
          echo "| ⏱️ Duration | ${DURATION}ms |" >> $GITHUB_STEP_SUMMARY
```

#### Step 2: Add PR Comment with AI Analysis (10 minutes)

```yaml
      - name: Analyze test results with AI
        if: failure() && github.event_name == 'pull_request'
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Extract failure information
          FAILURES=$(cat test-results.json | jq -r '.testResults[].assertionResults[] | select(.status=="failed") | .fullName')

          # Create prompt for AI
          cat > prompt.txt <<EOF
          Analyze these test failures and provide:
          1. Summary of failures
          2. Likely root causes
          3. Suggested fixes

          Failed tests:
          $FAILURES
          EOF

          # Call AI (using Claude API)
          curl https://api.anthropic.com/v1/messages \
            -H "x-api-key: $ANTHROPIC_API_KEY" \
            -H "anthropic-version: 2023-06-01" \
            -H "content-type: application/json" \
            -d @- > analysis.json <<JSON
          {
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 1024,
            "messages": [{
              "role": "user",
              "content": "$(cat prompt.txt)"
            }]
          }
          JSON

          # Extract response
          cat analysis.json | jq -r '.content[0].text' > ai-analysis.md

      - name: Comment PR with analysis
        if: failure() && github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const analysis = fs.readFileSync('ai-analysis.md', 'utf8');

            const comment = `## 🤖 AI Test Failure Analysis\n\n${analysis}`;

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: comment
            });
```

#### Step 3: Add Coverage Report (10 minutes)

```yaml
      - name: Comment PR with coverage
        if: github.event_name == 'pull_request'
        uses: romeovs/lcov-reporter-action@v0.3.1
        with:
          lcov-file: ./coverage/lcov.info
          github-token: ${{ secrets.GITHUB_TOKEN }}
          delete-old-comments: true
```

### Deliverables

Submit:
- [ ] Updated workflow with reporting steps
- [ ] Sample PR comment with test results
- [ ] Sample AI analysis output
- [ ] Coverage report screenshot
- [ ] Documentation of reporting setup

### Grading Rubric (100 points)

| Criteria | Points | Description |
|----------|--------|-------------|
| **Test Summary** | 25 pts | Clear, comprehensive summary generated |
| **AI Analysis** | 30 pts | AI provides useful failure analysis |
| **PR Comments** | 25 pts | Reports appear correctly on PRs |
| **Coverage Report** | 15 pts | Coverage changes highlighted |
| **Documentation** | 5 pts | Setup process documented |

### Tips for Success

- Store API keys in GitHub Secrets (never commit them!)
- Test with intentional failures to verify reporting works
- Use `if: always()` to generate reports even when tests fail
- Delete old bot comments to avoid clutter

---

## Exercise 9.5: Performance Optimization

**Objective**: Optimize pipeline to run in under 10 minutes

**Duration**: 30 minutes

**Difficulty**: Advanced

### Scenario

Your current pipeline takes 20+ minutes to run. This is too slow for efficient development. Optimize using caching, sharding, and selective testing.

### Steps

#### Step 1: Measure Current Performance (5 minutes)

Record baseline metrics:
- Total pipeline duration: ______
- Time per job: ______
- Slowest test file: ______

#### Step 2: Implement Caching (8 minutes)

Already done in Step 2, but verify:

```yaml
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'        # Caches npm packages

      - name: Cache Playwright browsers
        uses: actions/cache@v3
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('package-lock.json') }}
```

#### Step 3: Implement Test Sharding (12 minutes)

Split E2E tests across multiple runners:

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
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run Playwright tests (Shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1
```

#### Step 4: Implement Selective Testing (5 minutes)

Run only affected tests on PRs:

```yaml
      - name: Get changed files
        id: changed
        uses: tj-actions/changed-files@v35
        with:
          files: |
            src/**
            tests/**

      - name: Run affected tests
        if: github.event_name == 'pull_request' && steps.changed.outputs.any_changed == 'true'
        run: |
          npm test -- --findRelatedTests ${{ steps.changed.outputs.all_changed_files }}

      - name: Run all tests on main
        if: github.ref == 'refs/heads/main'
        run: npm test
```

### Deliverables

Submit:
- [ ] Performance comparison (before/after)
- [ ] Optimized workflow file
- [ ] Screenshots of sharded test runs
- [ ] Analysis of performance gains
- [ ] Recommendations for further optimization

### Grading Rubric (100 points)

| Criteria | Points | Description |
|----------|--------|-------------|
| **Caching** | 20 pts | Properly configured, measurable impact |
| **Sharding** | 30 pts | Tests split correctly, run in parallel |
| **Selective Testing** | 25 pts | Only affected tests run on PRs |
| **Performance Gain** | 15 pts | Pipeline is significantly faster |
| **Analysis** | 10 pts | Clear explanation of optimizations |

### Success Metrics

**Target Improvements:**
- Reduce total pipeline time by 50%+
- E2E tests complete in <10 minutes
- Dependency install time <2 minutes (with cache)

### AI Optimization Prompt

```
Analyze this CI/CD pipeline and suggest performance optimizations:

[paste workflow]

Current performance:
- Total duration: 20 minutes
- E2E tests: 15 minutes (slowest)
- Unit tests: 3 minutes
- Dependency install: 2 minutes

Goals:
- Reduce to under 10 minutes total
- Minimize cost (GitHub Actions minutes)
- Maintain reliability

Provide specific YAML changes with explanations.
```

---

## Submission Guidelines

### For All Exercises

1. **File Organization**:
   ```
   module-09-exercises/
   ├── exercise-9-1/
   │   ├── .github/workflows/test.yml
   │   ├── screenshots/
   │   └── documentation.md
   ├── exercise-9-2/
   │   ├── package.json
   │   ├── .husky/
   │   └── documentation.md
   ├── exercise-9-3/
   │   ├── updated-workflow.yml
   │   ├── branch-protection-screenshot.png
   │   └── documentation.md
   ├── exercise-9-4/
   │   ├── workflow-with-reporting.yml
   │   ├── sample-pr-comment.png
   │   └── documentation.md
   └── exercise-9-5/
       ├── optimized-workflow.yml
       ├── performance-comparison.md
       └── documentation.md
   ```

2. **Documentation Format**:
   - Use markdown for all documentation
   - Include your name and date
   - Use code blocks for YAML/code
   - Add screenshots with captions

3. **Submission Method**:
   - Zip the `module-09-exercises` folder
   - Name: `Module09-Exercises-[YourName].zip`
   - Submit via [your LMS/submission method]
   - Due date: [as specified by instructor]

---

## Common Mistakes to Avoid

### Exercise 9.1 (Basic CI)
- ❌ Using `npm install` instead of `npm ci`
- ❌ Forgetting to commit package-lock.json
- ❌ Not using caching (slower builds)
- ❌ Incorrect YAML indentation (syntax errors)

### Exercise 9.2 (Pre-commit Hooks)
- ❌ Hooks too slow (>1 minute)
- ❌ Forgetting to make hooks executable
- ❌ Not testing hooks before committing
- ❌ Hooks checking all files instead of staged only

### Exercise 9.3 (Quality Gates)
- ❌ Gates too strict (blocking all merges)
- ❌ Gates too lenient (not catching issues)
- ❌ Missing error messages (unclear why failed)
- ❌ Not documenting gate purposes

### Exercise 9.4 (Reporting)
- ❌ Committing API keys to repo
- ❌ Reports generated but not accessible
- ❌ Too much noise in reports (not actionable)
- ❌ Reports not updated on new commits

### Exercise 9.5 (Optimization)
- ❌ Over-optimization (premature)
- ❌ Breaking reliability for speed
- ❌ Not measuring actual improvements
- ❌ Caching stale data

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Guide](https://github.com/okonet/lint-staged)
- [Playwright Sharding](https://playwright.dev/docs/test-sharding)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/best-practices-for-github-actions)

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
