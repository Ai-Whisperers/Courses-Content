# Module 9 Quiz: CI/CD Integration

**Time Limit**: 20 minutes
**Passing Score**: 70% (28+ points out of 40)
**Total Points**: 40

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- Answer all questions to the best of your ability
- Multiple choice questions have only ONE correct answer unless otherwise stated
- For short answer and practical questions, write clear, complete responses
- You may not use AI tools during the quiz
- You may reference the course materials

---

## Section A: Multiple Choice (2 points each)

### Question 1
What does CI stand for in CI/CD?

a) Code Integration
b) Continuous Integration
c) Centralized Infrastructure
d) Checked-In Implementation

**Answer**: _______

---

### Question 2
In a typical testing pipeline, which stage should run FIRST?

a) E2E tests
b) Integration tests
c) Unit tests
d) Linting/formatting

**Answer**: _______

---

### Question 3
What is the primary purpose of test sharding?

a) To organize tests by feature
b) To run tests in parallel across multiple machines
c) To split test files into smaller pieces
d) To separate unit and integration tests

**Answer**: _______

---

### Question 4
Which GitHub Actions trigger runs on every commit to any branch?

a) `on: push`
b) `on: push: branches: [main]`
c) `on: [push, pull_request]`
d) `on: schedule`

**Answer**: _______

---

### Question 5
What is a quality gate in CI/CD?

a) A security feature that prevents unauthorized access
b) A check that must pass before code can proceed to the next stage
c) A tool for measuring code quality scores
d) A feature for reviewing code changes

**Answer**: _______

---

### Question 6
Which tool is commonly used for managing Git hooks in Node.js projects?

a) Hooks.js
b) Git-hooks
c) Husky
d) Pre-commit

**Answer**: _______

---

### Question 7
What does `npm ci` do compared to `npm install`?

a) Installs packages faster with caching
b) Uses package-lock.json for reproducible builds
c) Installs only CI-specific packages
d) Checks for outdated dependencies

**Answer**: _______

---

### Question 8
Which caching strategy provides the MOST performance improvement?

a) Caching node_modules
b) Caching test results
c) Caching build artifacts
d) All of the above combined

**Answer**: _______

---

### Question 9
What is the purpose of `needs:` in a GitHub Actions job?

a) To specify required secrets
b) To define job dependencies (execution order)
c) To list required tools
d) To set environment variables

**Answer**: _______

---

### Question 10
Which is the BEST practice for pre-commit hooks?

a) Run the full test suite (including E2E)
b) Run only linting and formatting (fast checks)
c) Run all tests except E2E
d) Skip tests and only check syntax

**Answer**: _______

---

## Section B: True/False (1 point each)

### Question 11
Pre-push hooks should be slower than pre-commit hooks because they run less frequently.

**Answer**: [ ] True  [ ] False

---

### Question 12
A CI pipeline should always run ALL tests on EVERY commit, regardless of which files changed.

**Answer**: [ ] True  [ ] False

---

### Question 13
Branch protection rules can prevent code from being merged if CI checks fail.

**Answer**: [ ] True  [ ] False

---

### Question 14
Caching dependencies in CI can reduce build times by 50% or more.

**Answer**: [ ] True  [ ] False

---

### Question 15
It's acceptable to commit API keys and secrets to a private repository.

**Answer**: [ ] True  [ ] False

---

## Section C: Short Answer (5 points each)

### Question 16
List four quality gates that should be enforced in a CI/CD pipeline.

1. _____________________________________________

2. _____________________________________________

3. _____________________________________________

4. _____________________________________________

---

### Question 17
Explain the difference between `npm install` and `npm ci`, and why `npm ci` is preferred in CI environments.

```
[Write your answer here]








```

---

### Question 18
Your E2E tests take 40 minutes to run in CI. Describe three strategies to reduce this time to under 10 minutes.

Strategy 1:
```




```

Strategy 2:
```




```

Strategy 3:
```




```

---

## Section D: Practical Application (10 points)

### Question 19

You need to create a GitHub Actions workflow that:
1. Runs on push to `main` and on all pull requests
2. Uses Node.js 20
3. Caches npm dependencies
4. Runs linting before tests
5. Runs unit tests with coverage
6. Fails if coverage is below 80%

Write the complete workflow YAML:

```yaml
name:










```

---

## Answer Key

*(For instructor use only)*

---

### Section A: Multiple Choice (20 points total)

1. **b** - Continuous Integration
   *(2 points)*

2. **d** - Linting/formatting (fastest feedback)
   *(2 points)*

3. **b** - To run tests in parallel across multiple machines
   *(2 points)*

4. **a** - `on: push` (without branch restrictions)
   *(2 points)*

5. **b** - A check that must pass before code can proceed to the next stage
   *(2 points)*

6. **c** - Husky
   *(2 points)*

7. **b** - Uses package-lock.json for reproducible builds
   *(2 points)*

8. **d** - All of the above combined (multiple caching strategies)
   *(2 points)*

9. **b** - To define job dependencies (execution order)
   *(2 points)*

10. **b** - Run only linting and formatting (fast checks)
    *(2 points)*

---

### Section B: True/False (5 points total)

11. **True** - Pre-push can include unit tests (~2 min), pre-commit should be fast (<30 sec)
    *(1 point)*

12. **False** - Selective testing based on changes is more efficient
    *(1 point)*

13. **True** - Branch protection rules enforce CI requirements
    *(1 point)*

14. **True** - Caching can provide 50-70% time savings
    *(1 point)*

15. **False** - Never commit secrets, even to private repos. Use GitHub Secrets.
    *(1 point)*

---

### Section C: Short Answer (15 points total)

### Question 16 (5 points)

**Correct Answers** (any four of):
1. Code coverage >= 80%
2. All tests passing (100% pass rate)
3. No lint/ESLint errors
4. No security vulnerabilities
5. Build succeeds
6. No skipped tests (on main)
7. Performance benchmarks met
8. Documentation updated

**Grading**:
- 1.25 points for each valid quality gate (up to 4)
- Must be specific and enforceable
- Generic answers like "code quality" without specifics = 0.5 points

---

### Question 17 (5 points)

**Correct Answer should include**:

**npm install**:
- Installs dependencies from package.json
- May update package-lock.json
- Can install different versions if lock file is out of sync
- Slower, less predictable

**npm ci**:
- Uses package-lock.json exclusively
- Deletes node_modules before installing (clean install)
- Fails if package.json and lock file are out of sync
- Faster, reproducible, deterministic
- Designed for CI environments

**Why npm ci is preferred**:
- Guarantees exact same versions across all builds
- Prevents "works on my machine" issues
- Faster (skips validation steps)
- More reliable for automated environments

**Grading**:
- Explains npm install behavior (1 point)
- Explains npm ci behavior (2 points)
- Explains why npm ci is preferred for CI (2 points)
- Clear, concise writing (included in above)

---

### Question 18 (5 points)

**Acceptable Strategies** (any three):

**Strategy 1: Test Sharding**
- Split tests across multiple runners (e.g., 4 shards)
- Run in parallel
- 40 min / 4 shards = 10 minutes

**Strategy 2: Selective Testing**
- Run only tests affected by changed files on PRs
- Run full suite only on main branch
- Reduces test count by 70-90%

**Strategy 3: Caching**
- Cache Playwright browsers (~1-2 min saved)
- Cache dependencies (~2-3 min saved)
- Cache build artifacts

**Strategy 4: Optimize Slow Tests**
- Identify slowest tests
- Reduce wait times/timeouts
- Mock external services
- Use test data factories

**Strategy 5: Tiered Testing**
- Run critical tests on every commit
- Run full E2E suite nightly or on main only
- Use smoke tests for quick validation

**Grading** (5 points total):
- Each strategy: 1.5 points (must be valid and explain how it helps)
- If 3 strategies provided: 1.5 + 1.5 + 2 = 5 points
- Must include specific time savings or approach
- Generic answers like "make tests faster" = 0 points

---

### Section D: Practical Application (10 points)

### Question 19 (10 points)

**Correct Answer**:

```yaml
name: Test Pipeline

on:
  push:
    branches: [main]
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

      - name: Run tests with coverage
        run: npm test -- --coverage

      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80%"
            exit 1
          fi
```

**Grading Breakdown**:
- Correct triggers (push to main + PRs): 2 points
- Node.js 20 setup with caching: 2 points
- Proper dependency installation (npm ci): 1 point
- Lint before tests: 1.5 points
- Tests with coverage: 2 points
- Coverage threshold check: 1.5 points

**Partial Credit**:
- Minor YAML syntax errors: -0.5 points
- Missing cache but otherwise correct: -1 point
- Lint after tests (wrong order): -0.5 points
- Using npm install instead of npm ci: -0.5 points
- Missing sudo apt-get install jq bc: -0.5 points (acceptable if using different method)

**Common Mistakes to Penalize**:
- ❌ Using `on: push` without branch specification (runs on all branches): -1 point
- ❌ Not failing build when coverage below 80%: -1 point
- ❌ Running tests before lint (inefficient): -0.5 points
- ❌ Major YAML syntax errors (won't run): -3 points

---

## Scoring

**Section A (Multiple Choice)**: 20 points (10 questions × 2 points)
**Section B (True/False)**: 5 points (5 questions × 1 point)
**Section C (Short Answer)**: 15 points (3 questions × 5 points)
**Section D (Practical)**: 10 points (1 question)

**Total: 40 points**

**Passing: 28+ points (70%)**

---

## Score Ranges

| Score | Grade | Feedback |
|-------|-------|----------|
| 36-40 | A | Excellent understanding of CI/CD concepts |
| 32-35 | B | Good grasp with minor gaps |
| 28-31 | C | Passing, but review key concepts |
| 24-27 | D | Needs significant review |
| 0-23  | F | Must retake after review |

---

## Post-Quiz Review

**If you scored below 28 points**, review these topics:

- CI/CD pipeline stages and ordering
- GitHub Actions workflow syntax
- Quality gates and their purposes
- Pre-commit hooks best practices
- Optimization strategies (caching, sharding)
- Difference between npm install and npm ci

**Resources**:
- Re-read 01-SLIDES.md sections 2-5
- Review 04-CODE-EXAMPLES.md
- Practice writing workflows
- Complete missed exercises

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
