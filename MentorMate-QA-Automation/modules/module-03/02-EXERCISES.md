# Module 3: Accessing Private Repositories - Exercises

**Duration**: 2.5 hours
**Format**: 4 Progressive Exercises
**Difficulty**: Intermediate

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

This module includes four hands-on exercises that build upon each other:

1. **Setup and Authentication** (30 min) - Get GitHub CLI working
2. **Codebase Analysis** (45 min) - Analyze a private repository
3. **Testing Analysis** (45 min) - Identify testing opportunities
4. **CLAUDE.md Creation** (30 min) - Document findings for AI

**Total Time:** 2.5 hours
**Prerequisites:** Module 01 & 02 completed, GitHub account with organization access

---

## Exercise 1: Setup and Authentication

**Duration:** 30 minutes
**Objective:** Install GitHub CLI and authenticate with your organization

### Learning Goals

- Install GitHub CLI on your platform
- Authenticate with GitHub.com
- Grant organization access
- Verify successful authentication
- List accessible repositories

---

### Part 1: Installation (10 minutes)

**Task:** Install GitHub CLI on your operating system

#### Windows:
```powershell
# Using WinGet
winget install --id GitHub.cli

# Verify installation
gh --version
```

#### macOS:
```bash
# Using Homebrew
brew install gh

# Verify installation
gh --version
```

#### Linux (Ubuntu/Debian):
```bash
# Install GitHub CLI
sudo apt update
sudo apt install gh

# Verify installation
gh --version
```

**Expected Output:**
```
gh version 2.x.x (yyyy-mm-dd)
```

**Deliverable:** Screenshot showing successful installation and version

---

### Part 2: Authentication (15 minutes)

**Task:** Authenticate with GitHub and grant organization access

**Step 1: Start authentication**
```bash
gh auth login
```

**Step 2: Answer prompts**
- **Where do you use GitHub?** → `GitHub.com`
- **What is your preferred protocol?** → `HTTPS`
- **How would you like to authenticate?** → `Login with a web browser`

**Step 3: Complete browser authentication**
1. Copy the one-time code displayed
2. Press Enter to open browser
3. Paste code at https://github.com/login/device
4. Click "Authorize GitHub CLI"

**Step 4: Verify authentication**
```bash
gh auth status
```

**Expected Output:**
```
github.com
  ✓ Logged in to github.com as YourUsername
  ✓ Git operations configured to use https
  ✓ Token: gho_****
```

**Step 5: Grant organization access**
- Visit: https://github.com/settings/tokens
- Click on your GitHub CLI token
- Under "Organization access", click "Grant" next to your organization
- Or run: `gh auth refresh -s read:org`

**Deliverable:** Screenshot showing successful `gh auth status` output

---

### Part 3: Repository Access (5 minutes)

**Task:** Verify you can list organization repositories

**List your personal repos:**
```bash
gh repo list --limit 5
```

**List organization repos:**
```bash
gh repo list YOUR-ORG-NAME --limit 10
```

**Get detailed information:**
```bash
gh repo list YOUR-ORG-NAME --json name,description,isPrivate,primaryLanguage --limit 10
```

**Expected Output:** List of repositories from your organization

**If you see "not found" errors:**
- Organization access not granted (return to Part 2, Step 5)
- You're not a member of the organization (ask admin)
- Typo in organization name

**Deliverable:** Screenshot showing list of organization repositories

---

### Grading Rubric - Exercise 1

| Criterion | Points | Description |
|-----------|--------|-------------|
| GitHub CLI installed | 25 | Version command works correctly |
| Authentication successful | 35 | `gh auth status` shows logged in |
| Organization access verified | 30 | Can list organization repos |
| Documentation quality | 10 | Screenshots clear and complete |
| **Total** | **100** | |

**Passing Score:** 70 points

---

## Exercise 2: Codebase Analysis

**Duration:** 45 minutes
**Objective:** Use AI to analyze an unfamiliar private repository

### Learning Goals

- Clone private repositories using `gh`
- Use AI to understand codebase architecture
- Identify key components and patterns
- Document findings comprehensively

---

### Part 1: Repository Selection (5 minutes)

**Task:** Choose a repository to analyze

**Option A: Use organization repository (Recommended)**
```bash
# List repos sorted by recent activity
gh repo list YOUR-ORG --sort updated --limit 20

# Choose one you're unfamiliar with
```

**Option B: Use practice repository**
```bash
# RealWorld example app (if you have access)
gh repo view gothinkster/realworld
```

**Selection Criteria:**
- Repository you haven't worked with before
- Contains backend or full-stack code
- Has at least 1000+ lines of code
- Active (updated within last 6 months)

**Deliverable:** Record repository name (ORG/repo-name)

---

### Part 2: Clone and Initial Exploration (10 minutes)

**Task:** Clone repository and explore structure

**Clone the repository:**
```bash
gh repo clone YOUR-ORG/repo-name
cd repo-name
```

**Manual exploration:**
```bash
# View README
cat README.md

# List directory structure
ls -la

# Count files by type
find . -name "*.js" | wc -l
find . -name "*.py" | wc -l
find . -name "*.ts" | wc -l

# Find test files
find . -name "*.test.*" -o -name "*.spec.*"

# View package dependencies
cat package.json   # Node.js
cat requirements.txt   # Python
cat Gemfile   # Ruby
cat pom.xml   # Java
```

**Deliverable:** Notes on initial observations (language, structure, test files)

---

### Part 3: AI-Assisted Analysis (25 minutes)

**Task:** Use Claude to analyze the codebase comprehensively

**Step 1: Start Claude**
```bash
# Ensure you're in repository directory
pwd

# Start Claude Code
claude
```

**Step 2: High-level overview prompt**
```
I'm new to this codebase. Please analyze it and provide:

1. **Project Purpose**
   - What does this application do? (1-2 sentences)
   - Who are the target users?
   - What problem does it solve?

2. **Architecture Overview**
   - Is it a monolith or microservices?
   - What are the main components?
   - How do components interact?
   - Create a simple architecture diagram (Mermaid or text)

3. **Tech Stack**
   - Primary language and version
   - Frameworks and libraries
   - Database and storage systems
   - External services or APIs
   - Build tools and package managers

4. **Entry Points**
   - Main application file
   - API endpoints or entry points
   - Key configuration files
   - Environment setup requirements

Keep the analysis high-level. I'll ask follow-up questions for details.
```

**Step 3: Directory structure prompt**
```
Analyze the directory structure and explain:

1. What each top-level directory contains
2. The purpose of key subdirectories
3. Where different types of code live:
   - Business logic
   - API routes/controllers
   - Data models/entities
   - Utilities/helpers
   - Tests
   - Configuration
   - Static assets

4. Any unusual or interesting organizational patterns
5. Which directories are most important for understanding the system?
```

**Step 4: Code patterns prompt**
```
Identify the coding patterns and conventions used:

1. **Architecture Patterns**
   - Design patterns (MVC, Repository, etc.)
   - Dependency injection approach
   - Error handling strategy
   - Logging patterns

2. **Code Style**
   - Naming conventions (files, functions, variables)
   - Code organization principles
   - Comment style
   - Any linting/formatting tools configured?

3. **Testing Patterns (if any)**
   - Test file organization
   - Testing framework
   - Mocking/stubbing approach
   - Test data management
```

**Step 5: Dependency analysis prompt**
```
Analyze the project dependencies:

1. List the 10 most important dependencies with their purposes
2. What testing frameworks are included?
3. What development tools are configured? (linting, formatting, etc.)
4. Are there any deprecated or outdated dependencies?
5. Any security-sensitive dependencies to be aware of?
```

**Deliverable:** Comprehensive analysis document (see template below)

---

### Part 4: Document Findings (5 minutes)

**Task:** Create a structured analysis document

**Create file:** `repository-analysis.md`

**Template:**
```markdown
# Repository Analysis: [Repo Name]

**Analyzed by:** [Your Name]
**Date:** [Date]
**Repository:** [ORG/repo-name]

## Executive Summary
[2-3 sentence overview of what you learned]

## Project Purpose
[What the application does, who uses it, what problem it solves]

## Architecture

### Type
[Monolith/Microservices/Serverless/etc.]

### Components
[List main components and their responsibilities]

### Diagram
```
[Architecture diagram - can be text-based or Mermaid]
```

## Tech Stack

### Languages & Frameworks
- Primary Language: [e.g., Python 3.9]
- Framework: [e.g., Django 4.0]
- Additional Languages: [if any]

### Database & Storage
- Database: [e.g., PostgreSQL]
- Caching: [e.g., Redis]
- File Storage: [e.g., S3]

### External Services
- [List APIs, third-party services]

### Build Tools
- Package Manager: [e.g., npm, pip]
- Build Tool: [e.g., webpack, setuptools]
- Task Runner: [e.g., Makefile, npm scripts]

## Directory Structure

| Directory | Purpose |
|-----------|---------|
| `/src` | [Description] |
| `/tests` | [Description] |
| `/config` | [Description] |
| ... | ... |

## Entry Points
- Main File: `[path/to/main.py]`
- Configuration: `[path/to/config]`
- API Endpoints: `[path/to/routes]`

## Code Patterns

### Architecture Patterns
[MVC, Repository Pattern, etc.]

### Naming Conventions
- Files: [snake_case, camelCase, etc.]
- Functions: [naming pattern]
- Classes: [naming pattern]

### Error Handling
[How errors are handled]

## Dependencies

### Critical Dependencies
1. [dependency-1] - [purpose]
2. [dependency-2] - [purpose]
...

### Testing Dependencies
[List testing frameworks and tools]

### Development Tools
[Linters, formatters, etc.]

## Testing Status
- **Current Coverage:** [percentage if known, or "Unknown"]
- **Test Framework:** [e.g., Jest, pytest]
- **Test Files:** [count and locations]

## Key Insights
1. [Important finding 1]
2. [Important finding 2]
3. [Important finding 3]

## Questions/Unknowns
[Anything unclear or requiring follow-up]
```

**Deliverable:** Completed `repository-analysis.md` file

---

### Grading Rubric - Exercise 2

| Criterion | Points | Description |
|-----------|--------|-------------|
| Repository cloned successfully | 10 | Proper use of `gh repo clone` |
| High-level analysis | 25 | Project purpose, architecture, tech stack |
| Directory structure analysis | 20 | Understanding of code organization |
| Code patterns identified | 20 | Conventions, patterns, style |
| Dependency analysis | 15 | Understanding of dependencies |
| Documentation quality | 10 | Clear, organized, complete |
| **Total** | **100** | |

**Passing Score:** 70 points

---

## Exercise 3: Testing Analysis

**Duration:** 45 minutes
**Objective:** Identify testing opportunities and gaps in the repository

### Learning Goals

- Analyze existing test coverage
- Identify critical untested paths
- Prioritize testing opportunities
- Create actionable test recommendations

---

### Part 1: Current Testing Status (15 minutes)

**Task:** Analyze existing tests with AI assistance

**Prompt for Claude:**
```
I need to understand the current testing situation for this project.

1. **Existing Tests**
   - How many test files are there?
   - Where are they located?
   - What types of tests exist? (unit, integration, e2e)
   - What's being tested currently?
   - Approximately what percentage of code has tests?

2. **Testing Framework**
   - What testing framework is used?
   - What assertion library?
   - Any mocking/stubbing libraries?
   - How are tests run? (command)
   - Is there a CI/CD pipeline running tests?

3. **Test Quality**
   - Are tests well-organized?
   - Do tests follow consistent patterns?
   - Are there good examples to follow?
   - Any test utilities or helpers?

Please provide specific file paths and examples.
```

**Manual verification:**
```bash
# Find all test files
find . -name "*.test.*" -o -name "*.spec.*" | wc -l

# View test directory structure
ls -R tests/ __tests__/ test/

# Look for test scripts in package.json
cat package.json | grep -A 5 "scripts"

# Check for CI configuration
cat .github/workflows/*.yml
cat .gitlab-ci.yml
cat .travis.yml
```

**Deliverable:** Document current testing status (use template below)

---

### Part 2: Testing Gap Analysis (20 minutes)

**Task:** Identify what's NOT being tested

**Prompt for Claude:**
```
I need to identify testing gaps in this codebase.

1. **Critical Paths Without Tests**
   - What are the main user flows? (e.g., registration, checkout, etc.)
   - Which critical paths lack tests?
   - What core business logic is untested?
   - What API endpoints don't have tests?

2. **Edge Cases Not Covered**
   - Error handling not tested
   - Boundary conditions not checked
   - Invalid input scenarios missing
   - Authentication/authorization edge cases

3. **Integration Points Missing Tests**
   - Database interactions not tested
   - External API calls not mocked/tested
   - File system operations not tested
   - Third-party service integrations not tested

4. **Risk Assessment**
   - What's the risk of each gap?
   - What could break without tests?
   - What's the impact on users?

Organize by risk level (Critical/High/Medium/Low).
```

**Additional analysis prompt:**
```
For each of these components, tell me if they have tests:

1. Authentication system
2. User registration
3. Data validation
4. Payment processing (if applicable)
5. File upload/download (if applicable)
6. Email/notification system
7. Search functionality (if applicable)
8. Reporting/analytics (if applicable)

For components without tests, explain:
- What functionality they provide
- Why testing is important
- What could go wrong without tests
```

**Deliverable:** Testing gap analysis document (use template below)

---

### Part 3: Test Recommendations (10 minutes)

**Task:** Create prioritized list of testing recommendations

**Prompt for Claude:**
```
Based on the testing gaps identified, create a prioritized test plan:

1. **P0 - Critical (Must Have)**
   - Tests that MUST be written immediately
   - Critical paths and core functionality
   - High-risk areas without tests
   - Estimated effort in hours

2. **P1 - High Priority (Should Have)**
   - Important features that need tests soon
   - Moderate-risk areas
   - Estimated effort in hours

3. **P2 - Medium Priority (Nice to Have)**
   - Less critical features
   - Edge cases and corner cases
   - Estimated effort in hours

For each priority group:
- List specific test scenarios
- Suggest test types (unit/integration/e2e)
- Provide estimated effort
- Explain the value/benefit

Total estimated effort should not exceed 40 hours.
```

**Deliverable:** Prioritized test plan document (use template below)

---

### Part 4: Document Testing Analysis (5 minutes)

**Create file:** `testing-analysis.md`

**Template:**
```markdown
# Testing Analysis: [Repo Name]

**Analyzed by:** [Your Name]
**Date:** [Date]
**Repository:** [ORG/repo-name]

## Current Testing Status

### Testing Framework
- **Framework:** [e.g., Jest, pytest, JUnit]
- **Assertion Library:** [e.g., expect, assert]
- **Mocking Library:** [e.g., jest.mock, unittest.mock]
- **Test Runner:** [command to run tests]

### Existing Tests
- **Total Test Files:** [count]
- **Test Locations:** [paths]
- **Test Types:**
  - Unit Tests: [count/percentage]
  - Integration Tests: [count/percentage]
  - E2E Tests: [count/percentage]
- **Estimated Coverage:** [percentage or "Unknown"]

### What's Currently Tested
[List main areas with tests]

### Test Quality
- Organization: [Good/Fair/Poor]
- Consistency: [Good/Fair/Poor]
- Documentation: [Good/Fair/Poor]
- Examples to Follow: [paths to good test files]

## Testing Gaps

### Critical Gaps (High Risk)
1. **[Feature/Component Name]**
   - Current Status: No tests
   - Functionality: [what it does]
   - Risk: [what could go wrong]
   - Impact: [user/business impact]

[Repeat for each critical gap]

### Important Gaps (Medium Risk)
[Similar structure]

### Minor Gaps (Low Risk)
[Similar structure]

## Integration Points Without Tests
- [ ] Database operations
- [ ] External API calls
- [ ] File system operations
- [ ] Email/notification system
- [ ] Authentication/authorization
- [ ] Payment processing
- [ ] Third-party services

## Prioritized Test Recommendations

### P0 - Critical (Must Have)
**Estimated Total: [X] hours**

1. **[Test Scenario Name]** - [Est. time]
   - **What:** [description]
   - **Why:** [importance]
   - **Type:** [Unit/Integration/E2E]
   - **Coverage:** [components/files covered]

[Repeat for each P0 test]

### P1 - High Priority (Should Have)
**Estimated Total: [Y] hours**

[Similar structure to P0]

### P2 - Medium Priority (Nice to Have)
**Estimated Total: [Z] hours**

[Similar structure to P0]

### Total Estimated Effort
**[X + Y + Z] hours**

## Recommended Approach

### Phase 1: Critical Tests (Week 1)
[List P0 tests to implement first]

### Phase 2: High Priority Tests (Week 2-3)
[List P1 tests]

### Phase 3: Medium Priority Tests (Week 4+)
[List P2 tests]

## Testing Strategy

### Test Type Distribution
- **Unit Tests:** [percentage]% - [rationale]
- **Integration Tests:** [percentage]% - [rationale]
- **E2E Tests:** [percentage]% - [rationale]

### Coverage Goals
- **Target Coverage:** [e.g., 80%]
- **Timeline:** [e.g., 3 months]
- **Milestones:**
  - Month 1: [goal]%
  - Month 2: [goal]%
  - Month 3: [goal]%

## Next Steps
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]

## Questions for Team
[Questions that need team input]
```

**Deliverable:** Completed `testing-analysis.md` file

---

### Grading Rubric - Exercise 3

| Criterion | Points | Description |
|-----------|--------|-------------|
| Current testing status documented | 20 | Framework, coverage, existing tests |
| Testing gaps identified | 30 | Comprehensive gap analysis |
| Risk assessment | 20 | Critical vs. nice-to-have prioritization |
| Test recommendations | 20 | Specific, actionable suggestions |
| Documentation quality | 10 | Clear, organized, complete |
| **Total** | **100** | |

**Passing Score:** 70 points

---

## Exercise 4: CLAUDE.md Creation

**Duration:** 30 minutes
**Objective:** Create project-specific context file for AI-assisted testing

### Learning Goals

- Synthesize analysis into AI-consumable format
- Document project conventions and patterns
- Create testing guidelines for AI
- Enable efficient AI-assisted test generation

---

### Part 1: Review Analysis (5 minutes)

**Task:** Review your previous analysis documents

**Files to review:**
- `repository-analysis.md` (Exercise 2)
- `testing-analysis.md` (Exercise 3)

**Extract key information:**
- Project purpose and architecture
- Tech stack and frameworks
- Code conventions and patterns
- Testing framework and approach
- Critical areas needing tests

---

### Part 2: Create CLAUDE.md (20 minutes)

**Task:** Create comprehensive CLAUDE.md file

**Location:** In the repository root directory

**Prompt for Claude:**
```
Based on the repository analysis and testing analysis, help me create a CLAUDE.md file that includes:

1. **Project Overview**
   - Concise project description (2-3 sentences)
   - Tech stack summary
   - Architecture type

2. **Directory Structure**
   - Key directories and their purposes
   - Where to find specific types of code

3. **Testing Guidelines**
   - Testing framework and tools
   - Where tests should be located
   - Test naming conventions
   - How to run tests
   - Coverage requirements

4. **Code Conventions**
   - File naming patterns
   - Function/class naming patterns
   - Code style (indentation, line length, etc.)
   - Import organization
   - Comment style

5. **Testing Patterns**
   - How to structure test files
   - Mock/stub approach
   - Test data management
   - Assertion style preferences

6. **Commands**
   - Install dependencies
   - Run all tests
   - Run specific tests
   - Check coverage
   - Lint code
   - Build/start application

7. **Important Context for AI**
   - What to always include in generated tests
   - What to avoid
   - Specific requirements or constraints
   - Examples of good existing tests (file paths)

Make it concise but comprehensive. Focus on information that will help AI generate better tests.
```

**Template:** (Fill in based on your analysis)

```markdown
# [Project Name] - AI Context

**Version:** 1.0
**Last Updated:** [Date]
**Maintained by:** [Your Name/Team]

## Project Overview

[2-3 sentence description of what this project does]

**Type:** [Web API / Full-stack / Library / CLI tool / etc.]
**Primary Language:** [Language & version]
**Framework:** [Framework & version]

## Tech Stack

### Backend
- Language: [e.g., Node.js 18]
- Framework: [e.g., Express 4.18]
- Database: [e.g., PostgreSQL 14]
- ORM: [e.g., Sequelize 6]

### Testing
- Framework: [e.g., Jest 29]
- Assertion: [e.g., expect (Jest)]
- Mocking: [e.g., jest.mock]
- Test Runner: `[command]`
- Coverage Tool: [e.g., Jest built-in]

### Development Tools
- Linter: [e.g., ESLint]
- Formatter: [e.g., Prettier]
- Type Checking: [e.g., TypeScript / JSDoc / None]

## Architecture

[Brief architecture description]

**Key Components:**
1. **[Component 1]** - [purpose]
2. **[Component 2]** - [purpose]
3. **[Component 3]** - [purpose]

## Directory Structure

```
/src
  /controllers     # [description]
  /models          # [description]
  /services        # [description]
  /utils           # [description]
  /middleware      # [description]
/tests
  /unit            # [description]
  /integration     # [description]
/config            # [description]
```

**Important Directories:**
- Source Code: `./src`
- Tests: `./tests` or `./__tests__`
- Configuration: `./config`
- Entry Point: `[path/to/main.file]`

## Code Conventions

### File Naming
- Source files: [e.g., camelCase.js, snake_case.py]
- Test files: [e.g., filename.test.js, test_filename.py]
- Configuration: [e.g., kebab-case.json]

### Code Style
- Indentation: [spaces/tabs, how many]
- Line Length: [max characters]
- Quotes: [single/double]
- Semicolons: [yes/no]
- Trailing Commas: [yes/no]

### Naming Conventions
- Functions: [e.g., camelCase, verbs]
- Classes: [e.g., PascalCase, nouns]
- Constants: [e.g., UPPER_SNAKE_CASE]
- Private members: [e.g., _prefixed, #private]

### Import Style
```[language]
// Preferred import order:
[example imports]
```

## Testing Guidelines

### Test File Organization
- **Location:** [where tests go]
- **Naming:** [pattern]
- **Structure:** [how to organize]

**Example:**
```
For: src/services/userService.js
Test: tests/unit/services/userService.test.js
```

### Test Structure
```[language]
describe('[Component Name]', () => {
  // Setup
  beforeEach(() => {
    // Initialize
  });

  // Test cases
  it('should [expected behavior]', async () => {
    // Arrange
    // Act
    // Assert
  });

  // Teardown
  afterEach(() => {
    // Cleanup
  });
});
```

### Test Naming
- Pattern: `should [expected behavior] when [condition]`
- Examples:
  - `should return 200 when user exists`
  - `should throw error when email is invalid`
  - `should create user when all fields are valid`

### Mocking & Stubbing
```[language]
// Preferred mocking approach
[example code]
```

### Test Data
- **Location:** [where test data files go]
- **Format:** [JSON/fixtures/factories]
- **Example:** [show example]

### Assertions
- **Style:** [e.g., expect-style, assert-style]
- **Examples:**
```[language]
expect(result).toBe(expected);
expect(result).toEqual(expected);
expect(fn).toThrow();
expect(array).toContain(item);
```

### Coverage Requirements
- **Minimum Coverage:** [e.g., 80%]
- **Critical Code:** [e.g., 95%]
- **Focus Areas:** [what must be tested]

## Commands

```bash
# Install dependencies
[command]

# Run all tests
[command]

# Run specific test file
[command]

# Run tests in watch mode
[command]

# Run tests with coverage
[command]

# Run linter
[command]

# Fix linting issues
[command]

# Format code
[command]

# Type check (if applicable)
[command]

# Start dev server
[command]

# Build for production
[command]
```

## Critical Testing Areas

**Must test:**
1. [Feature 1] - [why critical]
2. [Feature 2] - [why critical]
3. [Feature 3] - [why critical]

**Focus on:**
- Authentication and authorization
- Data validation
- Error handling
- API endpoint responses
- Database operations
- [other critical areas]

## Common Patterns

### Error Handling
```[language]
// Standard error handling pattern
[example code]
```

### Async Operations
```[language]
// How to handle async code
[example code]
```

### Database Mocking
```[language]
// How to mock database calls
[example code]
```

## Examples of Good Tests

**Reference these for style and patterns:**
- `[path/to/good/test1.test.js]` - [why it's good]
- `[path/to/good/test2.test.js]` - [why it's good]

## AI Test Generation Guidelines

### Always Include
- Proper imports
- describe/it blocks with clear names
- Setup and teardown
- Arrange-Act-Assert structure
- Error case tests
- Edge case coverage
- Type checking (if TypeScript)

### Never Include
- Hardcoded credentials
- Real API calls (mock them)
- Real database operations (mock them)
- console.log statements
- Commented-out code
- TODO comments (unless necessary)

### Test Coverage Priorities
1. **P0 (Critical):** [list areas]
2. **P1 (High):** [list areas]
3. **P2 (Medium):** [list areas]

## Dependencies

### Critical Dependencies
- `[dependency-1]` - [purpose, version]
- `[dependency-2]` - [purpose, version]

### Testing Dependencies
- `[test-dep-1]` - [purpose, version]
- `[test-dep-2]` - [purpose, version]

## Known Issues / Gotchas

1. **[Issue 1]:** [description and workaround]
2. **[Issue 2]:** [description and workaround]

## Additional Notes

[Any other important information for AI or developers]

## Questions?

Contact: [your contact info or team channel]
Documentation: [link to additional docs]
```

**Deliverable:** Completed `CLAUDE.md` file in repository root

---

### Part 3: Validate CLAUDE.md (5 minutes)

**Task:** Test that CLAUDE.md provides useful context

**Test with Claude:**
```
Read the CLAUDE.md file and then:

1. Generate a test for [specific component]
2. Ensure it follows all the conventions documented
3. Verify it includes proper structure and patterns
```

**Checklist:**
- [ ] Test follows naming conventions
- [ ] Test uses correct file structure
- [ ] Test includes proper imports
- [ ] Test follows assertion style
- [ ] Test includes setup/teardown
- [ ] Test covers edge cases

**If issues found:** Update CLAUDE.md to clarify

**Deliverable:** Validation notes showing CLAUDE.md works correctly

---

### Grading Rubric - Exercise 4

| Criterion | Points | Description |
|-----------|--------|-------------|
| Project overview | 15 | Clear, concise project description |
| Directory structure | 15 | Comprehensive directory explanation |
| Code conventions | 20 | Detailed style and naming guidelines |
| Testing guidelines | 30 | Complete testing instructions |
| Commands documented | 10 | All necessary commands included |
| AI-specific guidelines | 10 | Clear do's and don'ts for AI |
| **Total** | **100** | |

**Passing Score:** 70 points

---

## Overall Exercise Grading

### Module 3 Exercise Summary

| Exercise | Weight | Focus Area |
|----------|--------|------------|
| Exercise 1: Setup & Authentication | 15% | GitHub CLI configuration |
| Exercise 2: Codebase Analysis | 30% | AI-assisted repository exploration |
| Exercise 3: Testing Analysis | 35% | Gap analysis and recommendations |
| Exercise 4: CLAUDE.md Creation | 20% | Context documentation |
| **Total** | **100%** | |

**Module Passing:** 70% overall

---

## Submission Instructions

### What to Submit

Create a folder: `module-03-[yourname]` containing:

```
module-03-[yourname]/
├── screenshots/
│   ├── gh-installed.png
│   ├── gh-auth-status.png
│   └── gh-repo-list.png
├── repository-analysis.md
├── testing-analysis.md
└── CLAUDE.md
```

### Submission Checklist

- [ ] All screenshots captured and named correctly
- [ ] `repository-analysis.md` complete with all sections
- [ ] `testing-analysis.md` includes prioritized recommendations
- [ ] `CLAUDE.md` tested with AI and works correctly
- [ ] All files in single folder
- [ ] Folder zipped or uploaded to submission system

### Submission Format

**Option 1:** Zip file
```bash
zip -r module-03-[yourname].zip module-03-[yourname]/
```

**Option 2:** Git repository
```bash
git init
git add .
git commit -m "Module 03 exercises completed"
git push origin main
```

**Option 3:** Cloud storage (Google Drive, Dropbox)
- Create folder
- Upload all files
- Share link with instructor

---

## Tips for Success

### Time Management
- Don't spend too much time on any single part
- Exercise 3 (Testing Analysis) is weighted most heavily
- If stuck, move on and come back later
- Use time estimates as guidelines

### Working with AI
- Be specific in your prompts
- Ask follow-up questions for clarification
- Don't accept first response if incomplete
- Save good prompts for reuse

### Documentation
- Write as you go, not at the end
- Use templates provided
- Be specific and concrete
- Include examples where possible

### Common Pitfalls
- Forgetting to grant organization access
- Not being in repository directory when starting Claude
- Analysis too high-level (not enough detail)
- CLAUDE.md too generic (add project-specific details)

---

## Troubleshooting

### Issue: Can't install GitHub CLI
**Solution:**
- Windows: Try manual installer from https://cli.github.com
- Mac: Update Homebrew first: `brew update`
- Linux: Check your distro's package manager documentation

### Issue: Authentication fails
**Solution:**
- Try incognito browser window
- Disable VPN/proxy temporarily
- Use `gh auth login --web` for device code flow

### Issue: Can't see organization repos
**Solution:**
- Visit https://github.com/settings/tokens
- Click on token → Grant organization access
- Or run: `gh auth refresh -s read:org,repo`

### Issue: Claude can't read files
**Solution:**
- Verify you're in repository directory: `pwd`
- List files to confirm: `ls -la`
- Restart Claude from repository root

### Issue: Repository too large for analysis
**Solution:**
- Clone with shallow history: `gh repo clone ORG/REPO -- --depth=1`
- Focus on specific directories
- Analyze in sections, not all at once

---

## Additional Resources

### GitHub CLI Documentation
- Official Manual: https://cli.github.com/manual
- Authentication Guide: https://cli.github.com/manual/gh_auth_login
- Repository Commands: https://cli.github.com/manual/gh_repo

### Video Tutorials
- GitHub CLI Quickstart
- Authentication Walkthrough
- AI-Assisted Code Analysis

### Example Files
- Sample `repository-analysis.md`
- Sample `testing-analysis.md`
- Sample `CLAUDE.md` files

---

**Ready to start? Begin with Exercise 1!**

**Questions?** Post in #qa-course-module-3 or ask during office hours.

---

*Module 03 Exercises - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
