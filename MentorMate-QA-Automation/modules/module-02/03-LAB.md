# Module 2: Context Engineering - Hands-On Lab

**Duration**: 2 hours
**Format**: Integrated hands-on lab
**Difficulty**: Intermediate

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

This integrated lab combines all the skills from Module 2 into a single, comprehensive project. You'll set up a real project with proper context, write effective prompts, and use iterative refinement to generate production-quality tests.

### Learning Objectives

By completing this lab, you will:
- Set up project-level context using CLAUDE.md
- Write effective prompts for test generation
- Practice iterative refinement techniques
- Generate production-ready test suites
- Verify test quality and coverage

### Prerequisites

- Completion of Module 1 (AI Tools Setup)
- Claude Code CLI installed and configured
- Git installed
- Node.js 14+ installed
- Basic understanding of JavaScript and testing concepts

---

## Lab Scenario

You're joining a team working on the **RealWorld Conduit** application - a Medium.com clone. Your first assignment is to improve test coverage for the authentication module. The team wants you to:

1. Set up proper AI context for the project
2. Generate comprehensive tests for user registration
3. Generate tests for user login
4. Verify all tests pass and provide good coverage

---

## Part 1: Setup and Configuration (30 minutes)

### Step 1.1: Clone the Project

```bash
# Clone the repository
git clone https://github.com/gothinkster/node-express-realworld-example-app
cd node-express-realworld-example-app

# Install dependencies
npm install

# Verify the project runs
npm start
```

**Expected Output**: Server starts on port 3000

**Troubleshooting**:
- If port 3000 is busy, modify `app.js` to use a different port
- If dependencies fail, try `npm install --legacy-peer-deps`

---

### Step 1.2: Explore the Project Structure

Examine the following directories and files:

```bash
# View the project structure
ls -la

# Key directories to explore:
# - routes/api/      (API endpoints)
# - models/          (Database models)
# - middleware/      (Authentication, error handling)
# - config/          (Configuration files)
```

**Task**: Document the following in your notes:
1. What testing framework is currently used? (Check package.json)
2. Are there existing tests? (Look for a `test/` or `__tests__/` directory)
3. What database is used?
4. What authentication strategy is implemented?

---

### Step 1.3: Create CLAUDE.md

Create a comprehensive `CLAUDE.md` file in the project root.

**Template to use**:

```markdown
# Project: RealWorld Conduit API

## Overview
[Write 2-3 sentences describing what this application does]

## Tech Stack
- Runtime: Node.js [version from package.json]
- Framework: Express [version]
- Database: [which database?]
- Authentication: [JWT? Sessions?]
- Testing: [current testing framework]
- ORM: [Mongoose? Sequelize?]

## Architecture
[Describe the directory structure]
- `routes/api/` - [purpose]
- `models/` - [purpose]
- `middleware/` - [purpose]
- `config/` - [purpose]

## Code Conventions
[Document patterns you observe in the code]
- Export style: [module.exports or ES6?]
- Async handling: [callbacks, promises, async/await?]
- Error handling: [how are errors handled?]
- Naming: [conventions for files, functions, variables]

## Testing Requirements
- Framework: Jest (we're standardizing on Jest)
- Location: Create tests in `__tests__/` directory
- Naming: `[filename].test.js` for each source file
- Pattern: AAA (Arrange, Act, Assert)
- Mocking: Use jest.mock for external dependencies
- Coverage: Target 80% minimum
- Test naming: `should [expected behavior] when [condition]`

## Important Files
[List and describe key files for authentication]
- `routes/api/users.js` - [what's here?]
- `models/User.js` - [what's here?]
- `middleware/auth.js` - [what's here?]
- `config/passport.js` - [what's here?]

## Current Focus
Improving test coverage for the authentication module:
1. User registration functionality
2. User login functionality
3. JWT token generation and validation
4. Password hashing and verification

Generate tests that:
- Cover happy paths and error cases
- Test edge cases and boundary conditions
- Mock database operations
- Verify security requirements (password hashing, JWT)
- Follow our testing conventions
```

**Checkpoint**: Start Claude and verify your context:

```bash
claude "What are our testing requirements and current focus?"
```

Claude should reference your CLAUDE.md and explain the testing requirements.

---

### Step 1.4: Set Up Testing Infrastructure

Since the project may not have Jest configured, let's set it up:

```bash
# Install Jest and related dependencies
npm install --save-dev jest @types/jest supertest
```

Update `package.json` to add a test script:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "testMatch": ["**/__tests__/**/*.test.js"]
  }
}
```

Create the test directory:

```bash
mkdir -p __tests__
```

---

## Part 2: Generate Registration Tests (40 minutes)

### Step 2.1: Analyze the Registration Code

First, examine the user registration implementation:

```bash
# View the user registration route
cat routes/api/users.js

# View the User model
cat models/User.js
```

**Task**: In your notes, document:
1. What endpoint handles registration?
2. What validation is performed?
3. What fields are required?
4. How are passwords handled?
5. What does a successful response look like?

---

### Step 2.2: Initial Test Generation Prompt

Start Claude and use this initial prompt:

```
Generate Jest tests for the user registration endpoint in routes/api/users.js

I need tests that cover:
1. Successful user registration
2. Duplicate email handling
3. Missing required fields
4. Invalid email format

Use supertest for HTTP testing and mock the database operations.
```

**Task**: Review the generated tests. Note what's good and what needs improvement.

---

### Step 2.3: First Refinement

Based on your review, refine the tests:

```
Good start! Please improve by:

1. Add tests for password requirements:
   - Test minimum length
   - Test maximum length (if applicable)

2. Add edge cases:
   - Empty strings vs null values
   - Email with spaces
   - SQL injection attempts in email field

3. Structure improvements:
   - Group related tests in describe blocks
   - Add beforeEach/afterEach for setup/cleanup
   - Add comments explaining each test's purpose

4. Assertions:
   - Verify exact HTTP status codes
   - Check response structure matches API spec
   - Verify password is hashed (not stored plain text)
```

---

### Step 2.4: Second Refinement

Continue refining:

```
Almost there! Final improvements:

1. Add integration-style tests that verify:
   - User is actually created in database
   - JWT token is returned and is valid
   - Password hash uses bcrypt or similar

2. Add test helpers:
   - Create a factory function for generating valid user data
   - Add helper to generate invalid test cases
   - Add cleanup helper to remove test users

3. Error handling:
   - Verify correct error messages
   - Test error response format
   - Ensure sensitive info isn't leaked in errors
```

---

### Step 2.5: Save and Verify

Save the final tests to `__tests__/users.registration.test.js`

Run the tests:

```bash
npm test __tests__/users.registration.test.js
```

**Troubleshooting**:

**Problem**: Tests fail with database connection errors
**Solution**: Mock the database model in your tests

**Problem**: Tests fail with "Cannot find module"
**Solution**: Check import paths and ensure all dependencies are installed

**Problem**: Tests timeout
**Solution**: Add `jest.setTimeout(10000)` or increase timeout

---

## Part 3: Generate Login Tests (40 minutes)

### Step 3.1: Analyze the Login Code

Examine the login implementation:

```bash
# View the login endpoint
cat routes/api/users.js | grep -A 50 "login"

# Check authentication middleware
cat middleware/auth.js
```

**Task**: Document:
1. What endpoint handles login?
2. What credentials are required?
3. How is authentication verified?
4. What's returned on success?
5. What errors can occur?

---

### Step 3.2: Write an Effective Initial Prompt

Based on what you learned from Part 2, write a comprehensive initial prompt for login tests.

**Your prompt should include**:
- Context (what file, what function)
- Task (generate tests)
- Requirements (specific scenarios, mocking strategy)
- Format (structure, patterns, conventions)

**Example structure**:

```
Generate Jest tests for the user login endpoint in routes/api/users.js

Context:
- Endpoint: POST /api/users/login
- Authentication: [describe the auth mechanism]
- Response: [describe successful response]

Requirements:
[List all test scenarios]

Test Structure:
[Describe how tests should be organized]

Mocking:
[Specify what should be mocked]

Output format:
[Describe conventions to follow]
```

---

### Step 3.3: Iterative Refinement

Apply iterative refinement as needed. Consider:

1. **Security tests**:
   - Timing attack prevention
   - Rate limiting (if applicable)
   - JWT token validation

2. **Edge cases**:
   - Case sensitivity in email
   - Whitespace handling
   - Account lockout scenarios

3. **Error scenarios**:
   - Invalid credentials
   - User not found
   - Expired tokens (if applicable)

---

### Step 3.4: Save and Verify

Save tests to `__tests__/users.login.test.js`

Run all authentication tests:

```bash
npm test __tests__/users
```

---

## Part 4: Verification and Reporting (10 minutes)

### Step 4.1: Run Full Test Suite

Run all tests with coverage:

```bash
npm run test:coverage
```

### Step 4.2: Analyze Coverage Report

Review the coverage output:

```
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   XX.XX |    XX.XX |   XX.XX |   XX.XX |
 routes/api/users.js       |   XX.XX |    XX.XX |   XX.XX |   XX.XX | [lines]
---------------------------|---------|----------|---------|---------|-------------------
```

**Task**: Document:
- Statement coverage percentage
- Branch coverage percentage
- Which lines are not covered
- Why those lines might not be covered

---

### Step 4.3: Quality Checklist

Verify your tests meet quality standards:

**Test Coverage**:
- [ ] Happy path scenarios covered
- [ ] Error cases covered
- [ ] Edge cases covered
- [ ] Security scenarios covered

**Code Quality**:
- [ ] Tests are readable and well-commented
- [ ] No code duplication
- [ ] Proper use of describe/it blocks
- [ ] Meaningful test descriptions

**Best Practices**:
- [ ] Tests are independent (can run in any order)
- [ ] Proper setup and teardown
- [ ] Database operations are mocked
- [ ] External services are mocked
- [ ] Assertions are specific and meaningful

**Convention Compliance**:
- [ ] Follows naming conventions from CLAUDE.md
- [ ] Uses AAA pattern
- [ ] Located in correct directory
- [ ] Uses specified testing framework

---

## Lab Deliverables

Submit the following:

### 1. CLAUDE.md File
Complete project context file with all required sections

### 2. Test Files
- `__tests__/users.registration.test.js`
- `__tests__/users.login.test.js`

### 3. Lab Report
A markdown document (`lab-report.md`) containing:

#### Section A: Setup and Discovery (20 points)
- Project structure analysis
- Key technologies identified
- Current state of testing
- Challenges encountered

#### Section B: CLAUDE.md Analysis (20 points)
- Explanation of each section
- How it helps with test generation
- Testing requirements rationale

#### Section C: Prompt Engineering (30 points)
- Initial prompts used
- Refinement iterations for each test suite
- What worked well
- What needed improvement
- Lessons learned

#### Section D: Test Suite Overview (20 points)
- Total number of tests created
- Coverage achieved
- Test scenarios covered
- Edge cases identified

#### Section E: Reflection (10 points)
- What you learned about context engineering
- How iterative refinement improved results
- Best practices identified
- What you'd do differently next time

### 4. Coverage Report
Export and include your coverage report:
```bash
npm run test:coverage > coverage-report.txt
```

---

## Grading Rubric

### Total Points: 200

| Category | Points | Criteria |
|----------|--------|----------|
| **CLAUDE.md Quality** | 40 | Complete, accurate, follows template, includes all required sections |
| **Registration Tests** | 40 | Comprehensive coverage, good structure, follows conventions |
| **Login Tests** | 40 | Comprehensive coverage, security tests, error handling |
| **Test Quality** | 30 | Readable, maintainable, properly mocked, good assertions |
| **Coverage** | 20 | Meets 80% target, edge cases covered |
| **Lab Report** | 20 | Complete, thoughtful, demonstrates understanding |
| **Convention Compliance** | 10 | Follows naming, structure, and pattern conventions |

---

## Common Issues and Solutions

### Issue 1: Tests fail with module not found

**Symptoms**: `Cannot find module 'xxx'`

**Solutions**:
1. Verify the import path is correct
2. Check if the module is installed: `npm list [module-name]`
3. Install missing modules: `npm install --save-dev [module-name]`
4. Check if you need to use require() vs import

---

### Issue 2: Database connection errors

**Symptoms**: `Connection refused`, `Database not found`

**Solutions**:
1. Ensure you're mocking database calls:
   ```javascript
   jest.mock('../models/User');
   ```
2. Create a mock implementation:
   ```javascript
   User.findOne.mockResolvedValue(mockUser);
   User.create.mockResolvedValue(createdUser);
   ```
3. Use `beforeEach` to reset mocks:
   ```javascript
   beforeEach(() => {
     jest.clearAllMocks();
   });
   ```

---

### Issue 3: Async tests failing or timing out

**Symptoms**: `Timeout - Async callback was not invoked`

**Solutions**:
1. Use async/await properly:
   ```javascript
   it('should do something', async () => {
     const result = await someAsyncFunction();
     expect(result).toBe(expected);
   });
   ```
2. Increase timeout if needed:
   ```javascript
   jest.setTimeout(10000);
   ```
3. Ensure all promises are returned or awaited

---

### Issue 4: Tests pass but coverage is low

**Symptoms**: Coverage report shows <80%

**Solutions**:
1. Review uncovered lines in the coverage report
2. Add tests for error branches
3. Test edge cases and boundary conditions
4. Verify all code paths are exercised

---

### Issue 5: Claude generates wrong format

**Symptoms**: Tests don't match your conventions

**Solutions**:
1. Review your CLAUDE.md - is it specific enough?
2. Provide examples in your prompt
3. Use iterative refinement to correct the format
4. Be more explicit about format requirements

---

## Tips for Success

### Context Engineering Tips
1. **Be specific in CLAUDE.md**: Don't just say "use Jest", say "use Jest with these patterns: AAA, describe blocks, beforeEach setup"
2. **Update Current Focus**: Keep it relevant to what you're actually working on
3. **Include examples**: Show examples of test patterns you want to follow

### Prompting Tips
1. **Start broad, then narrow**: Initial prompt can be simple, then refine
2. **One concern per refinement**: Don't try to fix everything at once
3. **Reference your context**: "Based on our testing requirements in CLAUDE.md..."
4. **Be specific about changes**: "Add tests for X" not "make it better"

### Testing Tips
1. **Test one thing at a time**: Each test should verify one specific behavior
2. **Use descriptive names**: Test names should explain what's being tested and expected
3. **Mock external dependencies**: Database, APIs, file system, etc.
4. **Clean up after tests**: Use afterEach to reset state

### Iteration Tips
1. **Review before refining**: Actually look at what was generated
2. **Know when to start fresh**: If it's >50% wrong, start over
3. **Document your iterations**: Keep track of what you changed and why
4. **Stop when good enough**: Don't over-refine

---

## Extension Activities

If you complete the lab early, try these extensions:

### Extension 1: Middleware Tests
Generate tests for the authentication middleware in `middleware/auth.js`

### Extension 2: Integration Tests
Create end-to-end tests that don't mock the database (use a test database instead)

### Extension 3: Performance Tests
Add tests that verify response times are acceptable

### Extension 4: Security Audit
Generate tests specifically for security vulnerabilities (SQL injection, XSS, etc.)

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [RealWorld API Spec](https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints)

---

## Submission

Submit your lab through [your LMS/submission method]:

1. Zip file containing:
   - CLAUDE.md
   - `__tests__/` directory with all test files
   - lab-report.md
   - coverage-report.txt
   - package.json (showing your test configuration)

2. Name the zip file: `Module02-Lab-[YourName].zip`

3. Due date: [As specified by instructor]

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
