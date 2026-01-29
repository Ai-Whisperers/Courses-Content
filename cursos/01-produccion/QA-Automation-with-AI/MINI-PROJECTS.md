# Mini-Projects

Build real skills through milestone projects between modules.

---

## Why Mini-Projects?

Research shows that **project-based learning** has 40% higher retention than passive learning. These mini-projects let you apply what you've learned before moving on.

**Rules:**
- Complete each mini-project before starting the next module section
- Time yourself - these should take 1-2 hours max
- Share your work in Discord for feedback

---

## Mini-Project 1: Document a Real Codebase

**Complete after:** Module 3 (Private Repos)

**Time estimate:** 1-2 hours

### The Challenge

Pick a real open-source project and use AI to document it.

### Steps

1. **Find a project** (choose one):
   - [Express.js example app](https://github.com/gothinkster/node-express-realworld-example-app)
   - [React TodoMVC](https://github.com/tastejs/todomvc/tree/master/examples/react)
   - Any small project you use at work (if allowed)

2. **Clone it locally:**
   ```bash
   git clone [url]
   cd [project]
   ```

3. **Create a CLAUDE.md file** with:
   - Project overview
   - Tech stack
   - Architecture description
   - Testing approach (existing or recommended)
   - Key files and their purposes

4. **Use Claude to generate:**
   - A high-level architecture diagram (as text/mermaid)
   - API documentation for main endpoints
   - Testing strategy recommendations

### Deliverables

- [ ] CLAUDE.md file (well-structured, accurate)
- [ ] Architecture overview (diagram or description)
- [ ] API documentation (if applicable)
- [ ] Testing recommendations (what should be tested)

### Success Criteria

Your documentation should be good enough that a new developer could:
- Understand the project in 10 minutes
- Know where to find key functionality
- Know what testing patterns to follow

---

## Mini-Project 2: Build a Test Suite

**Complete after:** Module 6 (Test Implementation)

**Time estimate:** 2-3 hours

### The Challenge

Build a complete test suite for a sample application using AI assistance.

### The Application

Use this sample e-commerce API (or similar):
- User registration/login
- Product listing
- Shopping cart
- Checkout

**Option A:** Use a public API like [FakeStoreAPI](https://fakestoreapi.com/)

**Option B:** Clone [this sample app](https://github.com/public-apis/public-apis) and test it

### Steps

1. **Set up test project:**
   ```bash
   mkdir ecommerce-tests
   cd ecommerce-tests
   npm init -y
   npm install -D @playwright/test jest
   ```

2. **Create CLAUDE.md** with testing requirements

3. **Use AI to generate:**
   - Unit tests for utility functions
   - Integration tests for API endpoints
   - E2E tests for critical user flows

4. **Review and refine** each generated test

5. **Run all tests** and fix any failures

### Deliverables

- [ ] At least 5 unit tests
- [ ] At least 3 integration tests
- [ ] At least 2 E2E tests (Playwright)
- [ ] All tests passing
- [ ] Test coverage report

### Success Criteria

- Tests follow AAA pattern (Arrange, Act, Assert)
- Tests have meaningful names
- Edge cases are covered
- Tests run in CI (bonus)

---

## Mini-Project 3: CI/CD Pipeline

**Complete after:** Module 9 (CI/CD Integration)

**Time estimate:** 2 hours

### The Challenge

Set up a complete CI/CD pipeline that runs your tests automatically.

### Steps

1. **Create a GitHub repository** for your test project from Mini-Project 2

2. **Use AI to generate:**
   - GitHub Actions workflow file
   - Test configuration for CI
   - Slack/Discord notification on failure (optional)

3. **Configure the pipeline to:**
   - Run on every push to main
   - Run on every pull request
   - Report test results
   - Fail if tests fail

4. **Test the pipeline:**
   - Create a PR with a passing test
   - Create a PR with a failing test
   - Verify the pipeline catches the failure

### Deliverables

- [ ] `.github/workflows/test.yml` file
- [ ] Pipeline runs on push and PR
- [ ] Test results visible in GitHub
- [ ] Failed tests block merge

### Success Criteria

- Pipeline runs in under 5 minutes
- Test results are easy to read
- Failures are obvious and actionable

---

## Sharing Your Work

### Discord

Post your mini-project results in the `#mini-projects` channel:

```
**Mini-Project [1/2/3] Complete!**

Repository: [link]
Time spent: [X hours]
What I learned: [1-2 sentences]
Biggest challenge: [1-2 sentences]
```

### Feedback

- Give feedback on others' projects
- Ask questions about approaches
- Share tips you discovered

---

## Bonus Challenges

Completed all three? Try these:

### Bonus 1: Mutation Testing
Add mutation testing to your test suite using Stryker. Can you achieve 80% mutation score?

### Bonus 2: Visual Regression
Add visual regression tests to your E2E suite. Use Playwright's screenshot comparison.

### Bonus 3: Performance Testing
Add performance tests that fail if response time exceeds thresholds.

### Bonus 4: Accessibility Testing
Add accessibility tests using axe-core. Ensure your test app is WCAG compliant.

---

*Mini-projects are where learning becomes real. Don't skip them.*
