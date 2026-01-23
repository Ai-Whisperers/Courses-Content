# Module 9 Quiz: CI/CD Integration

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What triggers a GitHub Actions workflow?

a) Only manual execution
b) Events like push, pull_request, or schedule
c) Only pull requests
d) Only merges to main

---

### Question 2
What is a quality gate in CI/CD?

a) A physical security measure
b) A check that must pass before code can proceed
c) A code review tool
d) A deployment script

---

### Question 3
Which is NOT a good quality gate?

a) Code coverage threshold
b) All tests passing
c) No lint errors
d) Developer's name in commit

---

### Question 4
What is the purpose of caching in CI/CD?

a) Store test results
b) Speed up builds by reusing dependencies
c) Hide sensitive data
d) Backup code

---

### Question 5
When should E2E tests run in a pipeline?

a) First, before anything else
b) After unit and integration tests pass
c) Only manually
d) Never in CI

---

## True/False (1 point each)

### Question 6
CI/CD pipelines should fail fast on errors.

- [ ] True
- [ ] False

---

### Question 7
All tests should run on every commit regardless of changes.

- [ ] True
- [ ] False

---

### Question 8
Pre-commit hooks run before code is pushed to remote.

- [ ] True
- [ ] False

---

### Question 9
Test reports should be generated even when tests fail.

- [ ] True
- [ ] False

---

### Question 10
Matrix builds test code across multiple environments.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List four quality gates you should include in a CI pipeline.

1. _____________
2. _____________
3. _____________
4. _____________

---

### Question 12
Explain the difference between CI and CD.

CI: _____________________________________________
_____________________________________________

CD: _____________________________________________
_____________________________________________

---

### Question 13
Write a GitHub Actions step that fails if coverage is below 80%.

```yaml




```

---

## Practical (10 points)

### Question 14
Create a GitHub Actions workflow that:
1. Runs on push to main and pull requests
2. Uses Node.js 20
3. Installs dependencies
4. Runs lint
5. Runs tests with coverage
6. Fails if coverage < 80%

```yaml
name: CI

on:


jobs:
  test:
    runs-on: ubuntu-latest
    steps:

```

---

## Answer Key

*(For instructor use)*

1. b
2. b
3. d
4. b
5. b
6. True
7. False (selective testing is more efficient)
8. True
9. True
10. True

### Question 11 (5 points)
Any four of:
- Test pass rate (100%)
- Code coverage threshold
- No lint errors
- No security vulnerabilities
- No skipped tests
- Build success
- Performance benchmarks
(1.25 points each)

### Question 12 (5 points)
CI (2.5 points):
- Continuous Integration
- Automatically build and test code on every change
- Catch issues early

CD (2.5 points):
- Continuous Delivery/Deployment
- Automatically deploy tested code
- Streamline release process

### Question 13 (5 points)
```yaml
- name: Check coverage
  run: |
    COVERAGE=$(npx jest --coverage --json | jq '.coverageMap.total.lines.pct')
    if (( $(echo "$COVERAGE < 80" | bc -l) )); then
      echo "Coverage $COVERAGE% is below 80%"
      exit 1
    fi
```
- Extracts coverage value (2 points)
- Compares to threshold (1.5 points)
- Fails with message (1.5 points)

### Question 14 (10 points)
```yaml
name: CI

on:
  push:
    branches: [main]
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

      - run: npm test -- --coverage

      - name: Check coverage
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            exit 1
          fi
```

Scoring:
- Correct triggers (2 points)
- Node setup (1.5 points)
- Dependencies (1.5 points)
- Lint (1.5 points)
- Tests with coverage (2 points)
- Coverage check (1.5 points)

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
