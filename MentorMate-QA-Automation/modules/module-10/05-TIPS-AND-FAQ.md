# Module 10: Tips and FAQ
## Final Project Guidance and Troubleshooting

---

## Overview

This document provides practical tips, answers to common questions, and solutions to typical challenges you may encounter during your final project.

---

## Table of Contents

1. [Getting Started Tips](#getting-started-tips)
2. [AI Usage Best Practices](#ai-usage-best-practices)
3. [Time Management Strategies](#time-management-strategies)
4. [Quality Improvement Tips](#quality-improvement-tips)
5. [Technical Troubleshooting](#technical-troubleshooting)
6. [Frequently Asked Questions](#frequently-asked-questions)
7. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
8. [Emergency Strategies](#emergency-strategies)

---

## Getting Started Tips

### Choosing the Right Project

**Question:** Which project option should I choose?

**Answer:**
- **Choose Organization Project if:**
  - You have easy access to company code
  - You want immediate work value
  - You're comfortable with the tech stack
  - You have manager approval

- **Choose Open Source Project if:**
  - You want a public portfolio piece
  - You're comfortable learning new codebases
  - You want flexibility in tech choices
  - You want to contribute to community

- **Choose Provided Sample if:**
  - You want fastest setup time
  - You prefer known requirements
  - You're newer to testing
  - You want to focus on techniques over setup

### Week 1 Success Tips

**1. Invest in CLAUDE.md (45-60 minutes)**

Don't rush this step. A comprehensive CLAUDE.md pays dividends throughout the project.

**Good CLAUDE.md includes:**
```markdown
✓ Specific tech stack versions
✓ Project architecture with examples
✓ Testing conventions you'll follow
✓ Code patterns from the actual codebase
✓ Commands to run tests
✓ Examples of existing code style
```

**Template to start:**
```markdown
# [Project Name]

## Project Overview
[2-3 sentences about what it does]

## Tech Stack
- Language: [X version Y]
- Framework: [X version Y]
- Database: [X version Y]
- Testing: [Framework, version]

## Architecture
[Describe folder structure and key components]

## Testing Strategy
- Unit tests: [Location, naming, conventions]
- Integration tests: [How they're structured]
- E2E tests: [Framework, patterns]
- Coverage target: 75%+

## Commands
npm test
npm run test:unit
npm run test:coverage
```

**2. Verify Your Setup Works**

Before diving into test writing:
```bash
# Clone/fork the repo
# Install dependencies
# Run existing tests (if any)
# Verify you can generate coverage
# Push a test commit to verify git works
```

**3. Create Documentation Early**

Generate initial documentation while project is fresh:
- Use AI to create ARCHITECTURE.md from code exploration
- Generate API.md from endpoints/routes
- Create TESTING.md outlining your strategy

You can refine these later, but having drafts helps with understanding.

---

## AI Usage Best Practices

### Prompting Strategies

**Strategy 1: Context-Rich Prompts**

❌ **Bad Prompt:**
```
Generate unit tests for auth service
```

✓ **Good Prompt:**
```
I need unit tests for AuthService.register() method in my Node.js/Express app.

Context:
- Testing framework: Jest
- Following AAA pattern
- Mocking dependencies with jest.mock()

Method signature:
async register(userData: { email, password, firstName, lastName })

Method behavior:
- Validates email format
- Checks if email already exists (throw ConflictError)
- Hashes password with bcrypt
- Creates user in database
- Returns { user, token }

Dependencies to mock:
- User model (Sequelize)
- bcrypt
- jwt

Generate tests for:
1. Successful registration
2. Duplicate email
3. Invalid email format
4. Weak password
5. Database error

Follow existing test patterns in tests/unit/services/.
```

**Strategy 2: Iterative Refinement**

Don't expect perfection on first attempt. Build iteratively:

```
Round 1: "Generate basic structure for unit tests"
Round 2: "Add edge case tests for empty input"
Round 3: "Improve assertions to be more specific"
Round 4: "Add mocking for database transactions"
```

**Strategy 3: Show Examples**

Include examples in your prompts:

```
Generate integration tests following this pattern:

[Paste example of existing test]

Now create similar tests for [new feature].
```

### When AI Helps Most

**AI is Excellent for:**
- Generating test boilerplate and structure
- Creating mock setups
- Writing documentation
- Analyzing coverage gaps
- Suggesting edge cases
- Explaining unfamiliar code

**AI Needs Help with:**
- Project-specific assertions
- Business logic validation
- Choosing what to test
- Determining test priorities
- Knowing what's "good enough"

**Your Responsibility:**
- Review all AI output
- Write meaningful assertions
- Decide test priorities
- Ensure tests actually test something
- Verify tests can fail appropriately

### Documenting AI Usage

Keep track of effective prompts:

```markdown
# key-prompts.md

## Prompt 1: Generate Unit Tests for Auth Service
Worked well for generating test structure.
Had to refine assertions manually.

[Full prompt here]

## Prompt 2: Analyze Coverage Gaps
Asked AI to analyze coverage report and suggest missing tests.
Generated good list of untested scenarios.

[Full prompt here]
```

This helps with your presentation and future reference.

---

## Time Management Strategies

### The 3-Week Plan (Recommended)

**Week 1: Foundation (8-10 hours)**
```
Day 1-2 (3-4 hours):
  □ Choose project
  □ Clone/fork repo
  □ Set up environment
  □ Create CLAUDE.md
  □ Verify setup works

Day 3-4 (3-4 hours):
  □ Generate ARCHITECTURE.md
  □ Generate API.md
  □ Generate TESTING.md
  □ Review and refine docs

Day 5 (2 hours):
  □ Create test plan
  □ List 30+ test cases
  □ Prioritize tests
  □ Plan Week 2
```

**Week 2: Implementation (10-12 hours)**
```
Day 6 (2 hours):
  □ Finalize test plan
  □ Set up test structure
  □ Create fixtures/helpers

Day 7-8 (4-5 hours):
  □ Implement unit tests (15+)
  □ Cover 3+ modules
  □ All passing

Day 9 (2-3 hours):
  □ Implement integration tests (8+)
  □ Cover 4+ endpoints
  □ All passing

Day 10 (2-3 hours):
  □ Implement E2E tests (5+)
  □ Page Object Model
  □ Critical flows covered
```

**Week 3: Validation & Polish (6-8 hours)**
```
Day 11-12 (3-4 hours):
  □ Run coverage analysis
  □ Perform mutation testing
  □ Fix quality issues
  □ Create quality report

Day 13 (1-2 hours):
  □ Create GitHub Actions workflow
  □ Test pipeline locally
  □ Fix any CI issues
  □ Verify pipeline green

Day 14 (1-2 hours):
  □ Final documentation review
  □ Verify all deliverables
  □ Clean up code
  □ Practice presentation

Day 15 (1 hour):
  □ Record presentation
  □ Final submission check
  □ Submit project
```

### If You Only Have 1 Week

**Focus on Minimum Requirements:**

**Days 1-2 (6 hours):**
- Quick setup and CLAUDE.md
- Basic documentation
- Test plan with 30 cases

**Days 3-4 (8 hours):**
- Focus on P0 tests only
- 15 unit + 8 integration + 5 E2E
- Get them all passing

**Days 5-6 (4 hours):**
- Quick quality validation
- Simple CI/CD workflow
- Quality report

**Day 7 (2 hours):**
- Presentation
- Submit

**Note:** This is minimum viable. 3-week plan produces better quality.

### Time-Saving Tips

**1. Reuse and Adapt**
- Use templates from examples
- Adapt existing test patterns
- Don't reinvent the wheel

**2. Parallel Work**
- Generate docs while tests run
- Write presentation notes as you go
- Capture screenshots during development

**3. AI for Grunt Work**
- Let AI generate test boilerplate
- Use AI for documentation structure
- AI can analyze coverage gaps

**4. Know When to Stop**
- Don't over-test (80/20 rule)
- Good enough is good enough
- Focus on requirements, not perfection

**5. Ask for Help Early**
- Don't stay stuck for hours
- Post in forum
- Attend office hours
- Ask peers

---

## Quality Improvement Tips

### Achieving 75%+ Coverage

**Strategy 1: Focus on Services/Business Logic**

Business logic typically gives best coverage ROI:
```
High Value:
- Services (business logic)
- Controllers (request handling)
- Validators (input validation)
- Utils (helper functions)

Lower Value:
- Configuration files
- Constants
- Type definitions
- Build scripts
```

**Strategy 2: Use Coverage Report to Guide**

```bash
# Generate coverage report
npm run test:coverage

# Open coverage report
open coverage/lcov-report/index.html
```

Look for:
- Files with low coverage
- Uncovered branches (if/else)
- Untested functions

Ask AI:
```
I have low coverage in src/services/order.service.js.
Coverage report shows lines 45-60 are uncovered.

[Paste the code]

What test cases should I add to cover these lines?
```

**Strategy 3: Test Error Paths**

Often missed but easy coverage wins:
```javascript
// Test the error paths
it('should throw error when user not found', async () => {
  User.findByPk.mockResolvedValue(null);

  await expect(OrderService.create(userId, data))
    .rejects.toThrow(NotFoundError);
});

it('should throw error when insufficient stock', async () => {
  Product.findByPk.mockResolvedValue({ stock: 5 });

  await expect(OrderService.create(userId, { quantity: 10 }))
    .rejects.toThrow(BadRequestError);
});
```

**Strategy 4: Don't Chase 100%**

Some code isn't worth testing:
- Logger calls
- Configuration loading
- Development-only code
- Third-party integrations (mock instead)

Document why in your quality report:
```markdown
## Uncovered Code Analysis

**Logging Utility (2% uncovered)**
- Logger.info(), Logger.error() calls
- Rationale: Non-functional, tested separately

**Admin Features (3% uncovered)**
- Admin-only endpoints
- Rationale: Out of scope for this phase
```

### Writing Better Assertions

❌ **Weak Assertions:**
```javascript
expect(user).toBeTruthy();
expect(result.length).toBeGreaterThan(0);
expect(error).toBeDefined();
```

✓ **Strong Assertions:**
```javascript
expect(user).toEqual({
  id: expect.any(Number),
  email: 'test@example.com',
  firstName: 'John',
  role: 'user',
  createdAt: expect.any(Date)
});

expect(result).toHaveLength(3);
expect(result[0]).toHaveProperty('productId', 1);

expect(error).toBeInstanceOf(NotFoundError);
expect(error.message).toBe('User not found');
expect(error.statusCode).toBe(404);
```

### Mutation Testing Tips

**What is Mutation Testing?**

Tool changes your code ("mutates" it) and runs tests. If tests still pass, your tests aren't strong enough.

**Example:**
```javascript
// Original
if (stock > 0) {
  return true;
}

// Mutation 1: Changed operator
if (stock >= 0) {  // What if stock is exactly 0?
  return true;
}

// Mutation 2: Changed constant
if (stock > 1) {  // What if stock is 1?
  return true;
}
```

If your tests pass with these mutations, you're missing test cases!

**Running Mutation Testing:**

```bash
# Install Stryker (for JavaScript)
npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner

# Run mutation testing
npx stryker run

# For Python, use mutmut
pip install mutmut
mutmut run
```

**Interpreting Results:**

- **Killed:** Good! Your tests caught the mutation
- **Survived:** Bad! Your tests didn't catch it (add test)
- **Timeout:** Mutation caused infinite loop (usually OK)
- **No Coverage:** Code not covered by tests (add tests)

**Target:** 70%+ mutation score

**Fixing Surviving Mutants:**

```javascript
// Mutation survived: Changed > to >=
if (age > 18) { ... }

// Add specific boundary test
it('should reject age of exactly 18', () => {
  expect(validateAge(18)).toBe(false);
});

it('should accept age of 19', () => {
  expect(validateAge(19)).toBe(true);
});
```

### CI/CD Quality

**Common Pipeline Issues:**

**Issue 1: Tests Pass Locally, Fail in CI**

Causes:
- Environment differences
- Hardcoded paths
- Timing issues (race conditions)
- Database not set up

Solutions:
```yaml
# Set up test database
- name: Setup Database
  run: |
    npm run db:setup
    npm run migrate

# Use environment variables
- name: Run Tests
  env:
    NODE_ENV: test
    DATABASE_URL: postgres://localhost/test_db
  run: npm test
```

**Issue 2: Pipeline Too Slow**

Solutions:
- Run test types in parallel
- Cache dependencies
- Use matrix testing

```yaml
jobs:
  test:
    strategy:
      matrix:
        test-type: [unit, integration, e2e]
    steps:
      - run: npm run test:${{ matrix.test-type }}
```

**Issue 3: Flaky Tests**

Tests sometimes pass, sometimes fail:

```javascript
// ❌ Bad: Race condition
await button.click();
expect(modal).toBeVisible();

// ✓ Good: Wait for condition
await button.click();
await expect(modal).toBeVisible({ timeout: 5000 });
```

---

## Technical Troubleshooting

### Setup Issues

**Problem: Dependencies won't install**

```bash
# Clear cache
npm cache clean --force
# or
pip cache purge

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
# or
rm -rf venv
python -m venv venv
pip install -r requirements.txt
```

**Problem: Database connection fails**

Check:
1. Is database running? `pg_ctl status` or `brew services list`
2. Correct credentials in .env?
3. Database exists? `createdb your_db_name`
4. Correct port?

**Problem: Tests can't find modules**

```javascript
// Add to jest.config.js
module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  // or
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
```

### Testing Issues

**Problem: Mocks not working**

```javascript
// ❌ Wrong: Mocking after import
const User = require('./models/User');
jest.mock('./models/User');

// ✓ Correct: Mock before import
jest.mock('./models/User');
const User = require('./models/User');

// ✓ Also correct: Manual mock
jest.mock('./models/User', () => ({
  findByPk: jest.fn(),
  create: jest.fn()
}));
```

**Problem: Tests affect each other**

```javascript
// Add proper cleanup
beforeEach(async () => {
  // Reset database
  await User.destroy({ where: {} });
  // Clear mocks
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

**Problem: Async tests timing out**

```javascript
// ❌ Forgot to await
it('should create user', () => {
  const user = UserService.create(data);  // Missing await!
  expect(user.email).toBe('test@example.com');
});

// ✓ Proper async handling
it('should create user', async () => {
  const user = await UserService.create(data);
  expect(user.email).toBe('test@example.com');
});

// Or increase timeout for slow tests
it('should process large order', async () => {
  // test code
}, 10000); // 10 second timeout
```

**Problem: E2E tests flaky**

```javascript
// ❌ Bad: No waiting
await page.click('button');
expect(await page.textContent('.result')).toBe('Success');

// ✓ Good: Wait for elements
await page.click('button');
await page.waitForSelector('.result', { state: 'visible' });
expect(await page.textContent('.result')).toBe('Success');

// ✓ Better: Wait for network
await Promise.all([
  page.waitForResponse(res => res.url().includes('/api') && res.ok()),
  page.click('button')
]);
```

### Coverage Issues

**Problem: Coverage report not generating**

```bash
# Verify coverage tool installed
npm list nyc
# or
pip show coverage

# Check test command includes coverage
npm run test:coverage

# Try generating manually
npx nyc npm test
# or
python -m pytest --cov=src tests/
```

**Problem: Coverage stuck below 75%**

Strategy:
1. Generate coverage report
2. Open HTML report
3. Find files with low coverage
4. Look at uncovered lines (red)
5. Add tests for those lines

Ask AI:
```
My coverage is at 68%. Here are the uncovered lines:

[Paste code sections marked as uncovered]

What test cases should I add?
```

---

## Frequently Asked Questions

### Project Scope

**Q: Can I change projects after starting?**
A: Yes, but only in Week 1. After Week 1, stick with your choice to avoid wasting time.

**Q: Can I use a project in a different language than shown in examples?**
A: Yes! Python, JavaScript, TypeScript, Java, C# all fine. Just document your choice.

**Q: My project has 8 endpoints but 2 are very complex. Does that count?**
A: Yes, as long as there's enough to test. Quality over quantity.

**Q: Can I test a frontend application instead of backend API?**
A: Yes, but ensure you can do unit, integration, and E2E tests. Component tests, integration with mocked API, E2E user flows.

### Testing Requirements

**Q: Do I need exactly 15 unit, 8 integration, and 5 E2E tests?**
A: These are minimums. You can have more. What matters is coverage and quality.

**Q: What if my project doesn't have database?**
A: That's fine. Integration tests can test API integrations, file operations, or component integration instead.

**Q: Can I use a different testing framework than Jest?**
A: Yes! Mocha, Vitest, Pytest, JUnit, NUnit - all acceptable. Just document your choice.

**Q: Do screenshot/visual regression tests count toward requirements?**
A: Nice to have, but don't count toward the 28 required tests. Stick to unit/integration/E2E functional tests.

### AI Usage

**Q: How much AI usage is too much?**
A: AI should help, not replace your thinking. You should understand and be able to explain all code. Good rule: AI can generate structure, you write the critical logic and assertions.

**Q: Should I mention every time I used AI?**
A: No need to document every prompt. Document effective prompts and interesting AI interactions for your presentation.

**Q: Can I use AI to write my presentation script?**
A: AI can help structure it, but the content should be your genuine experience and reflections.

**Q: What if AI generates wrong tests?**
A: That's expected! Review critically, fix issues, and iterate. This shows your judgment, which is valuable.

### Quality & Coverage

**Q: What if I can't reach 75% coverage?**
A: Document why in quality report. If you've tested all critical paths, explain what's uncovered and why. Talk to instructor if stuck.

**Q: Is mutation testing required if I'm over 80% coverage?**
A: Yes, it's a deliverable. But 5 files minimum is enough. Focus on critical files.

**Q: My E2E tests are slow (2 minutes). Is that OK?**
A: Yes, E2E tests are typically slow. Under 5 minutes for 5 tests is acceptable. Document execution time.

**Q: Can I skip tests for utility functions if they're well covered by integration tests?**
A: Not ideal. Unit tests for utils are usually quick wins. But if integration tests truly cover them, document your reasoning.

### Submission

**Q: What if my video is slightly over 5 minutes?**
A: 5-6 minutes is OK. Over 6 minutes, edit it down. Quality > length.

**Q: Can I submit GitHub repo instead of ZIP?**
A: Yes, if your repo is accessible to instructors. Include link in submission notes.

**Q: What if I can't get CI/CD working?**
A: Document what you tried and where you got stuck. Partial credit for good attempt. Best to ask for help before submission.

**Q: Should I remove all console.logs before submitting?**
A: Development console.logs - yes. Intentional logging - no. Make sure your tests don't log noise.

### Time & Deadlines

**Q: Can I get an extension?**
A: Request before deadline with valid reason. Extension policy varies - check course platform.

**Q: What if I finish early?**
A: Great! Use extra time to:
- Exceed coverage targets
- Add more test cases
- Polish documentation
- Practice presentation
- Help classmates

**Q: I'm running out of time. What should I prioritize?**
A: See "Emergency Strategies" section below.

---

## Common Mistakes to Avoid

### Mistake 1: Skipping CLAUDE.md

**Why it's a mistake:**
Every prompt after this is less effective without good context.

**Impact:**
- 2-3x more iterations needed
- AI generates generic, not project-specific code
- More manual refinement required

**Solution:**
Invest 45-60 minutes upfront on comprehensive CLAUDE.md.

### Mistake 2: Writing Tests Without Plan

**Why it's a mistake:**
You test random things instead of important things.

**Impact:**
- Wasted effort on low-value tests
- Critical paths untested
- Poor coverage distribution

**Solution:**
Create test plan first. Prioritize P0 tests. Implement systematically.

### Mistake 3: Weak Assertions

**Why it's a mistake:**
Tests pass even when code is wrong.

**Impact:**
- False sense of security
- Bugs not caught
- Low mutation score

**Example:**
```javascript
// ❌ Bad
expect(user).toBeTruthy();

// ✓ Good
expect(user).toEqual({
  id: expect.any(Number),
  email: 'test@example.com',
  role: 'user'
});
```

### Mistake 4: Not Testing Edge Cases

**Why it's a mistake:**
Edge cases are where bugs hide.

**Impact:**
- Production bugs
- Low code coverage
- Missing scenarios

**Solution:**
For each function, test:
- Happy path
- Empty input
- Null/undefined
- Boundary values (0, max, min)
- Invalid input
- Error conditions

### Mistake 5: Leaving Quality Validation to End

**Why it's a mistake:**
Finding major issues on Day 14 is stressful.

**Impact:**
- No time to fix issues
- Rushed quality report
- Missed coverage targets

**Solution:**
- Check coverage after each test suite
- Run mutation testing on Day 12, not Day 14
- Validate as you go

### Mistake 6: Ignoring Flaky Tests

**Why it's a mistake:**
Flaky tests undermine confidence in test suite.

**Impact:**
- CI pipeline randomly fails
- Time wasted re-running tests
- Lower grade

**Solution:**
Fix flaky tests immediately. Usually:
- Add proper waits (E2E)
- Fix test isolation (unit/integration)
- Clean up state properly

### Mistake 7: Over-Engineering

**Why it's a mistake:**
Spending time on things that don't matter for grade.

**Examples:**
- Perfect test data builders
- Complex test harness
- Custom reporting tools
- Perfect CI/CD configuration

**Solution:**
Focus on requirements. Simple, working solution beats elegant, incomplete one.

### Mistake 8: Not Asking for Help

**Why it's a mistake:**
Staying stuck wastes precious time.

**Impact:**
- Hours lost on solvable problems
- Frustration and stress
- Missed deliverables

**Solution:**
- Stuck for 30 minutes? Google it
- Stuck for 1 hour? Post in forum
- Stuck for 2 hours? Attend office hours
- Still stuck? Email instructor

---

## Emergency Strategies

### "It's Day 10 and I'm Behind"

**Immediate Triage:**

1. **Assess What You Have** (15 min)
   - Count completed deliverables
   - Count passing tests
   - Check coverage percentage
   - List what's missing

2. **Prioritize Ruthlessly** (15 min)
   - Must have for 70%: All deliverables present, minimum tests, 75% coverage
   - Nice to have for 80%+: Extra tests, higher coverage, polish
   - Focus only on "must have"

3. **Execute Minimum Viable Plan** (Days 11-14)

**Day 11-12: Tests**
- Focus on P0 tests only
- Get to minimum counts (15+8+5)
- All passing - don't worry about perfect quality yet

**Day 13: Quality**
- Quick coverage check
- If below 75%, add targeted tests
- Run mutation testing on 5 files
- Quick quality report

**Day 14: Wrap Up**
- Basic CI/CD workflow (copy from examples)
- Review all docs (quick fixes only)
- Practice presentation

**Day 15: Submit**
- Record quick presentation
- Submit what you have

**Remember:** 70% passing grade is achievable even when behind. Perfect is the enemy of good.

### "My Tests Keep Failing"

**Systematic Debugging:**

1. **Isolate the Problem**
   ```bash
   # Run one test at a time
   npm test -- --testNamePattern="specific test name"

   # Add console.logs
   console.log('Expected:', expected);
   console.log('Actual:', actual);
   ```

2. **Check Common Issues**
   - Are you using `await` for async operations?
   - Are mocks set up before imports?
   - Are you clearing mocks between tests?
   - Is database cleaned before each test?

3. **Ask AI for Help**
   ```
   My test is failing with this error:
   [paste error]

   Here's my test:
   [paste test]

   Here's the code being tested:
   [paste code]

   What's wrong?
   ```

4. **Simplify**
   - Comment out most of test
   - Get simplest assertion passing
   - Add complexity back gradually

### "Coverage Stuck at 65%"

**Fast Coverage Boost:**

1. **Find Easy Wins**
   - Open coverage report HTML
   - Look for files with red lines
   - Focus on files with partial coverage (easier than 0%)

2. **Test Error Paths**
   Quick wins from error handling:
   ```javascript
   it('should throw error when...', async () => {
     await expect(func()).rejects.toThrow();
   });
   ```

3. **Test Validation**
   Another quick win:
   ```javascript
   it('should reject invalid email', () => {
     expect(() => validate('not-email')).toThrow();
   });
   ```

4. **Ask AI for Gap Analysis**
   ```
   Here's my coverage report:
   [paste uncovered lines]

   What test cases should I add to cover these lines?
   ```

5. **Consider What's Worth Testing**
   Some code is OK to leave uncovered:
   - Logger calls
   - Config files
   - Development-only code

   Document why in quality report.

### "CI/CD Pipeline Won't Work"

**Quick Fixes:**

1. **Test Locally First**
   ```bash
   # Simulate CI environment
   NODE_ENV=test npm test
   ```

2. **Use Minimal Workflow**
   Copy from examples and adjust minimally:
   ```yaml
   name: Tests
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm install
         - run: npm test
   ```

3. **Check Common Issues**
   - Environment variables set?
   - Database set up in CI?
   - Correct Node/Python version?
   - Dependencies installed?

4. **If Really Stuck**
   - Document what you tried
   - Include workflow file anyway
   - Show local test results
   - Explain blockers in quality report
   - Get partial credit

### "I Don't Know What to Present"

**5-Minute Presentation Structure:**

**Minute 1: Project Intro**
- "I chose [project] because..."
- "Key features: X, Y, Z"
- "Tech stack: A, B, C"

**Minutes 2-3: AI Workflow Demo**
- Screen share your CLAUDE.md
- Show one effective prompt you used
- Show the result AI generated
- Show how you refined it
- "This saved me X hours"

**Minute 4: Results**
- Show coverage report: "Achieved 82%"
- Show CI pipeline: "All tests passing"
- Show test count: "35 tests across 3 levels"
- Quick scroll through code

**Minute 5: Learnings**
- "What worked: [specific technique]"
- "What was challenging: [specific challenge]"
- "What I'd do differently: [specific improvement]"
- "Key takeaway: [one sentence]"

**Done!** This formula works every time.

---

## Getting Help Resources

### When You're Stuck

**Quick Questions:**
- Course Forum: #final-project
- Check FAQ section first
- Search for similar questions

**Technical Issues:**
- Stack Overflow for general errors
- GitHub Issues for tool-specific problems
- Course forum for project-specific help

**Planning & Strategy:**
- Office Hours: Wednesday 6-7 PM
- Email instructor: qa-training@mentormate.com
- Study groups with peers

**AI Assistance:**
- Use Claude/ChatGPT for:
  - Explaining errors
  - Suggesting test cases
  - Reviewing code
  - Analyzing coverage gaps

### How to Ask Good Questions

❌ **Bad Question:**
"My tests don't work. Help!"

✓ **Good Question:**
"My unit test for AuthService.register() is failing with error 'User.create is not a function'. I'm using jest.mock() to mock the User model. Here's my test code: [paste code]. What am I missing?"

**Include:**
1. What you're trying to do
2. What's happening instead
3. Error messages (full text)
4. Relevant code
5. What you've already tried

---

## Final Encouragement

### Remember

**You've Got This!**
- You've completed 9 modules
- You have all the skills needed
- AI is there to help
- Instructors are supportive
- Peers are resources

**It's OK to:**
- Ask for help
- Make mistakes
- Not be perfect
- Take breaks
- Adjust your approach

**Focus On:**
- Meeting requirements (70%+)
- Learning and growth
- Building portfolio piece
- Professional quality

**The Goal:**
Not perfection - demonstrating competence, growth, and ability to use AI tools effectively in real-world testing.

---

**You've got all the tools and knowledge. Now go build something great!**

---

## Quick Reference

### Emergency Contacts
- Forum: #final-project
- Office Hours: Wednesday 6-7 PM
- Email: qa-training@mentormate.com

### Key Deadlines
- Check course platform for submission deadline
- Office hours end 2 days before deadline
- No submissions after deadline (unless extension granted)

### Minimum Requirements for Passing (70%)
- ✓ All 7 deliverables present
- ✓ 28+ tests (15+8+5) all passing
- ✓ Coverage >= 75%
- ✓ CI/CD pipeline working
- ✓ Presentation complete
- ✓ Quality report submitted

### Where to Find Help
- Project Brief: 01-PROJECT-BRIEF.md
- Grading Rubric: 02-GRADING-RUBRIC.md
- Submission Guide: 03-SUBMISSION-GUIDE.md
- Examples: 04-EXAMPLE-PROJECTS.md
- This Document: 05-TIPS-AND-FAQ.md

---

**Good luck with your final project! We're excited to see what you create!**

---

*Tips and FAQ - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
