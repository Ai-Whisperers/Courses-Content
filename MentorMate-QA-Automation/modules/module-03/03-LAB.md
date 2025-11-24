# Module 3: Accessing Private Repositories - Hands-On Lab

**Duration**: 2 hours
**Format**: Integrated hands-on lab
**Difficulty**: Intermediate

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

This comprehensive lab simulates a real-world scenario: you're joining a new team and need to quickly understand their codebase to identify testing opportunities. You'll use GitHub CLI and AI to explore a private repository, analyze it, and create a complete testing strategy.

### Learning Objectives

By completing this lab, you will:
- Set up and authenticate GitHub CLI from scratch
- Explore and clone private repositories
- Use AI to rapidly understand unfamiliar codebases
- Create comprehensive project documentation
- Identify testing gaps and opportunities
- Generate a prioritized test plan
- Implement sample tests following project conventions

### Prerequisites

- GitHub account with access to at least one organization
- Computer with administrator rights (to install software)
- Completion of Module 01 and Module 02
- Basic understanding of at least one programming language
- Claude Code CLI installed

---

## Lab Scenario

**Your Role:** QA Engineer (first day)

**Situation:** You've just joined the QA team at TechCorp. Your manager says:

> "Welcome! We have a legacy API service called `customer-service` that handles customer data. It's been in production for 2 years but has minimal test coverage. We've had some production incidents recently. Your first task: analyze the codebase, identify testing gaps, and create a test plan. You have 2 hours for the initial assessment."

**Your Mission:**
1. Get access to the repository
2. Understand what the service does
3. Analyze the current test coverage
4. Identify critical testing gaps
5. Create a prioritized test plan
6. Implement 2-3 sample tests
7. Document your findings

---

## Part 1: Setup and Access (20 minutes)

### Step 1.1: Install GitHub CLI (5 minutes)

**Choose your platform:**

#### Windows:
```powershell
# Using WinGet (Windows 10+)
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
# Add GitHub CLI repository
sudo apt update
sudo apt install gh

# Verify installation
gh --version
```

**Expected Output:**
```
gh version 2.40.0 (or newer)
```

**Troubleshooting:**
- **Windows:** If WinGet is not available, download from https://cli.github.com
- **macOS:** If Homebrew is not installed: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **Linux:** If `gh` not found, follow manual installation: https://github.com/cli/cli/blob/trunk/docs/install_linux.md

**Deliverable:** ✅ Screenshot showing `gh --version` output

---

### Step 1.2: Authenticate with GitHub (10 minutes)

**Start authentication:**
```bash
gh auth login
```

**Follow the interactive prompts:**

**Prompt 1: Where do you use GitHub?**
```
? Where do you use GitHub?
> GitHub.com
  GitHub Enterprise Server
```
**Choose:** `GitHub.com` (press Enter)

**Prompt 2: Protocol preference?**
```
? What is your preferred protocol for Git operations?
> HTTPS
  SSH
```
**Choose:** `HTTPS` (press Enter)

**Prompt 3: Authentication method?**
```
? How would you like to authenticate GitHub CLI?
> Login with a web browser
  Paste an authentication token
```
**Choose:** `Login with a web browser` (press Enter)

**Complete browser authentication:**
1. **Copy the one-time code** displayed in terminal (e.g., `ABCD-1234`)
2. **Press Enter** - browser will open to https://github.com/login/device
3. **Paste the code** in the browser
4. **Click "Authorize GitHub CLI"**
5. **Wait for success message** in browser and terminal

**Verify authentication:**
```bash
gh auth status
```

**Expected Output:**
```
github.com
  ✓ Logged in to github.com as [YourUsername]
  ✓ Git operations for github.com configured to use https protocol
  ✓ Token: gho_************************************
  ✓ Token scopes: repo, read:org, workflow
```

**Deliverable:** ✅ Screenshot showing successful `gh auth status`

---

### Step 1.3: Grant Organization Access (5 minutes)

**If working with organization repositories:**

**Method 1: Via Web (Recommended)**
1. Visit: https://github.com/settings/tokens
2. Find your GitHub CLI token (usually named "GitHub CLI")
3. Click on the token name
4. Scroll to "Organization access"
5. Click "Grant" next to your organization
6. Click "Authorize"

**Method 2: Via Command**
```bash
gh auth refresh -s read:org,repo
```

**Verify organization access:**
```bash
# List your organizations
gh api user/orgs --jq '.[].login'

# List repos in organization (replace YOUR-ORG)
gh repo list YOUR-ORG --limit 5
```

**Expected:** You should see a list of repositories

**If you don't have organization access:**
- Use a personal repository for this lab
- Or use a practice organization like RealWorld examples
- Or create a private repository specifically for practice

**Deliverable:** ✅ Screenshot showing organization repo list

---

## Part 2: Repository Exploration (30 minutes)

### Step 2.1: Discover Repositories (5 minutes)

**List available repositories:**
```bash
# List repos in your organization
gh repo list YOUR-ORG --limit 30 --json name,description,primaryLanguage,isPrivate

# Or list your personal repos
gh repo list --limit 20
```

**Choose a repository for analysis:**
- Prefer: Backend API or service repository
- Should have: At least 1000+ lines of code
- Should be: Active (updated within 6 months)
- Should be: Unfamiliar to you

**For this lab, we'll use placeholder: `YOUR-ORG/customer-service`**
(Replace with your actual organization and repository name)

**View repository details before cloning:**
```bash
gh repo view YOUR-ORG/customer-service
```

**Deliverable:** ✅ Record the repository you chose: `[ORG/REPO-NAME]`

---

### Step 2.2: Clone and Initial Exploration (10 minutes)

**Clone the repository:**
```bash
# Create a workspace directory
mkdir -p ~/qa-workspace
cd ~/qa-workspace

# Clone the repository
gh repo clone YOUR-ORG/customer-service

# Navigate into it
cd customer-service
```

**Perform initial exploration:**
```bash
# View README
cat README.md

# List directory structure
ls -la

# View package/dependency file
cat package.json     # Node.js
cat requirements.txt # Python
cat pom.xml         # Java
cat Gemfile         # Ruby
cat go.mod          # Go

# Find test files
find . -name "*.test.*" -o -name "*.spec.*" -o -name "*_test.*" | head -20

# Count files by type
echo "JavaScript files: $(find . -name '*.js' -not -path '*/node_modules/*' | wc -l)"
echo "TypeScript files: $(find . -name '*.ts' -not -path '*/node_modules/*' | wc -l)"
echo "Python files: $(find . -name '*.py' | wc -l)"

# View recent commits
git log --oneline --graph -10
```

**Document initial observations:**
Create file: `initial-observations.md`

```markdown
# Initial Observations: [Repo Name]

**Date:** [Date]
**Time Spent:** 10 minutes

## Quick Facts
- **Language:** [Primary language]
- **Total Files:** [approximate count]
- **Test Files Found:** [count]
- **Last Updated:** [from git log]
- **README Quality:** [Good/Fair/Poor/None]

## First Impressions
[What stands out? Organized? Well-documented? Complex?]

## Questions
[What questions do you have after initial look?]
```

**Deliverable:** ✅ `initial-observations.md` file

---

### Step 2.3: AI-Assisted Deep Dive (15 minutes)

**Start Claude Code:**
```bash
# Ensure you're in the repository directory
pwd

# Start Claude
claude
```

**Execute this analysis sequence:**

**Prompt 1: High-Level Overview**
```
I just joined a team and need to understand this codebase quickly. Please analyze and provide:

1. **Project Purpose**
   - What does this service/application do? (1-2 sentences)
   - Who are the users or consumers?
   - What business problem does it solve?

2. **Architecture**
   - Overall architecture style (monolith/microservice/serverless/etc.)
   - Main components and their responsibilities
   - How components interact
   - Create a simple text-based architecture diagram

3. **Tech Stack**
   - Primary language and version
   - Framework(s) used
   - Database/storage systems
   - External dependencies or services
   - Build and package management tools

4. **Entry Points**
   - Main application entry file
   - How the application starts
   - Configuration approach
   - Key environment variables needed

Keep it concise but comprehensive. I'll ask follow-up questions.
```

**Wait for response, then continue...**

**Prompt 2: Directory Structure**
```
Explain the directory structure in detail:

1. List all top-level directories and their purposes
2. For the main source directory:
   - Where is business logic?
   - Where are API routes/endpoints?
   - Where are data models?
   - Where are utilities/helpers?
   - Where are tests?
3. Any unusual organization patterns?
4. Which directories are most critical for understanding the system?
```

**Prompt 3: Current Testing Status**
```
Analyze the current testing situation:

1. **What exists:**
   - How many test files?
   - Where are they located?
   - What testing framework/library is used?
   - What types of tests? (unit/integration/e2e)
   - How do you run tests?

2. **Test coverage:**
   - Approximately what percentage is covered?
   - What's well-tested?
   - What's poorly tested or not tested?

3. **Test quality:**
   - Are tests well-organized?
   - Good examples to follow?
   - Any test utilities or helpers?
   - Common patterns used?

Be specific with file paths and examples.
```

**Prompt 4: Critical Flows**
```
Identify the critical paths and workflows in this application:

1. What are the main user/API flows?
2. What are the most important features?
3. What functionality is business-critical?
4. What could cause the most damage if it broke?
5. What external integrations exist?

For each critical flow, tell me if it has tests.
```

**Deliverable:** ✅ Copy all AI responses to `ai-analysis.md` file

---

## Part 3: Testing Gap Analysis (30 minutes)

### Step 3.1: Identify Testing Gaps (15 minutes)

**Continue with Claude:**

**Prompt: Comprehensive Testing Gap Analysis**
```
I need to create a test plan. Please analyze testing gaps:

1. **Critical Gaps (High Risk)**
   - What critical functionality lacks tests?
   - What could cause production incidents if broken?
   - What business logic is untested?
   - What API endpoints lack tests?
   - What database operations are untested?

2. **Integration Gaps**
   - External API calls not tested/mocked?
   - Database interactions not tested?
   - File system operations not tested?
   - Authentication/authorization not tested?
   - Email/notification systems not tested?

3. **Edge Case Gaps**
   - Error handling not tested?
   - Boundary conditions not checked?
   - Invalid input not tested?
   - Race conditions not considered?
   - Timeout/retry logic not tested?

4. **Risk Assessment**
   For each gap, assess:
   - Risk level (Critical/High/Medium/Low)
   - Likelihood of failure
   - Impact if failure occurs
   - Current mitigation (if any)

Organize findings by risk level.
```

**Prompt: Prioritized Test Recommendations**
```
Based on the gaps identified, create a prioritized test plan:

**P0 - Critical (Must Test Immediately)**
List 5-8 test scenarios that are:
- Highest risk
- Most likely to catch serious bugs
- Protect critical functionality
- For each: describe scenario, test type, estimated effort (hours)

**P1 - High Priority (Should Test Soon)**
List 5-8 important test scenarios

**P2 - Medium Priority (Nice to Have)**
List 5-8 additional test scenarios

For each test:
- Test name/description
- What it tests
- Why it's important
- Test type (unit/integration/e2e)
- Estimated effort
- Success criteria

Total effort should be realistic (e.g., 20-40 hours total).
```

**Create:** `testing-gaps.md`

Use this template:
```markdown
# Testing Gap Analysis: [Repo Name]

**Analyzed by:** [Your Name]
**Date:** [Date]
**Repository:** [ORG/REPO]

## Executive Summary
[2-3 sentences summarizing the testing situation]

## Current State
- **Test Files:** [count]
- **Framework:** [name]
- **Estimated Coverage:** [percentage or "unknown"]
- **Overall Assessment:** [Good/Fair/Poor]

## Critical Gaps (P0 - High Risk)

### 1. [Gap Name]
- **Functionality:** [what is not tested]
- **Risk Level:** Critical
- **Likelihood of Failure:** [High/Medium/Low]
- **Impact if Failure:** [description]
- **Current Mitigation:** [None/Partial/...]

[Repeat for each critical gap]

## High Priority Gaps (P1)
[Similar structure]

## Medium Priority Gaps (P2)
[Similar structure]

## Integration Testing Gaps
- [ ] Database operations
- [ ] External API calls
- [ ] File system operations
- [ ] Authentication system
- [ ] Email/notifications
- [ ] Payment processing (if applicable)
- [ ] Third-party services

## Edge Cases Not Tested
- [ ] Error handling
- [ ] Invalid input
- [ ] Boundary conditions
- [ ] Timeout scenarios
- [ ] Concurrent access
- [ ] Network failures

## Risk Summary
| Risk Level | Count | Total Est. Hours |
|------------|-------|------------------|
| Critical   | [X]   | [Y]              |
| High       | [X]   | [Y]              |
| Medium     | [X]   | [Y]              |
| **Total**  | **[X]** | **[Y]**        |
```

**Deliverable:** ✅ Completed `testing-gaps.md`

---

### Step 3.2: Create Test Plan (15 minutes)

**Prompt for Claude:**
```
Create a detailed, actionable test plan based on the gaps identified.

**Test Plan Requirements:**
- Focus on the P0 (Critical) items
- Provide 10-15 specific test scenarios
- Each test should be clearly described
- Include acceptance criteria
- Estimate effort realistically
- Organize by feature/component

**For each test:**
- Test ID (e.g., TC001)
- Test Name
- Feature/Component being tested
- Test Type (Unit/Integration/E2E)
- Description (what the test does)
- Prerequisites (setup needed)
- Test Steps (Arrange/Act/Assert)
- Expected Result
- Estimated Effort (hours)

**Total effort should be achievable in 2-3 weeks.**
```

**Create:** `test-plan.md`

Template:
```markdown
# Test Plan: [Repo Name]

**Author:** [Your Name]
**Date:** [Date]
**Version:** 1.0
**Target:** [Repository Name]

## Overview

### Purpose
[Why we're creating these tests]

### Scope
**In Scope:**
- [What will be tested]

**Out of Scope:**
- [What won't be tested in this phase]

### Testing Approach
- **Framework:** [e.g., Jest, pytest, JUnit]
- **Test Types:** [Unit, Integration, E2E percentages]
- **Coverage Goal:** [target percentage]
- **Timeline:** [estimated completion]

## Test Environment

### Prerequisites
- [Software/tools needed]
- [Environment setup]
- [Test data requirements]

### Dependencies
- [External services]
- [Database setup]
- [Mock/stub requirements]

## Test Cases

### Priority: P0 - Critical

#### TC001: [Test Name]
- **Feature:** [Component/Feature name]
- **Type:** [Unit/Integration/E2E]
- **Description:** [What this test validates]
- **Prerequisites:** [What's needed]
- **Test Steps:**
  ```
  // Arrange
  [Setup code/description]

  // Act
  [Action to perform]

  // Assert
  [Expected outcomes]
  ```
- **Expected Result:** [What should happen]
- **Estimated Effort:** [X hours]
- **Priority:** P0

[Repeat for TC002, TC003, etc.]

### Priority: P1 - High
[Similar structure for P1 tests]

### Priority: P2 - Medium
[Similar structure for P2 tests]

## Test Data Requirements

### Test Users
[Test user accounts needed]

### Test Data Sets
[Sample data needed for tests]

### Mock Data
[External service mocks needed]

## Execution Plan

### Phase 1: Critical Tests (Week 1)
- [ ] TC001: [Test name]
- [ ] TC002: [Test name]
- [ ] TC003: [Test name]
**Estimated:** [X hours]

### Phase 2: High Priority (Week 2)
- [ ] TC004: [Test name]
- [ ] TC005: [Test name]
**Estimated:** [Y hours]

### Phase 3: Medium Priority (Week 3)
- [ ] TC006: [Test name]
- [ ] TC007: [Test name]
**Estimated:** [Z hours]

## Success Criteria

- [ ] All P0 tests implemented and passing
- [ ] Code coverage increased to [X]%
- [ ] No test failures in CI/CD
- [ ] All tests documented
- [ ] Test data properly managed

## Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| [Risk 1] | High | Medium | [How to mitigate] |

## Deliverables

1. Test suite with [X] tests implemented
2. Test documentation updated
3. CI/CD integration configured
4. Coverage report showing [Y]% coverage
5. Test execution report

## Approval

**Prepared by:** [Your Name]
**Reviewed by:** [TBD]
**Approved by:** [TBD]
```

**Deliverable:** ✅ Completed `test-plan.md`

---

## Part 4: Documentation (20 minutes)

### Step 4.1: Create CLAUDE.md (15 minutes)

**Prompt for Claude:**
```
Based on everything we've analyzed, help me create a comprehensive CLAUDE.md file for this repository. This file will help AI tools (like you) generate better tests in the future.

Include:

1. **Project Overview**
   - Brief description
   - Tech stack
   - Architecture type

2. **Directory Structure**
   - Key directories and purposes
   - Where to find what

3. **Code Conventions**
   - File naming
   - Code style (formatting, indentation)
   - Function/class naming
   - Import organization

4. **Testing Guidelines**
   - Framework and tools
   - Test file location and naming
   - Test structure template
   - How to run tests
   - Coverage requirements

5. **Testing Patterns**
   - How to organize tests
   - Mock/stub approach
   - Test data management
   - Assertion style

6. **Commands**
   - Install dependencies
   - Run tests
   - Check coverage
   - Lint/format code

7. **AI Guidelines**
   - What to always include in tests
   - What to avoid
   - Examples of good tests (file paths)

Make it practical and specific to THIS project.
```

**Create:** `CLAUDE.md` in repository root

**Validate with Claude:**
```
Read the CLAUDE.md we just created. Then generate a sample test for [pick a simple function/component] following all the guidelines in CLAUDE.md.
```

**Review the generated test:**
- Does it follow naming conventions?
- Is the structure correct?
- Does it use the right framework?
- Are imports correct?

**If issues:** Update CLAUDE.md to be clearer

**Deliverable:** ✅ `CLAUDE.md` in repository root

---

### Step 4.2: Create Executive Summary (5 minutes)

**Create:** `executive-summary.md`

```markdown
# Repository Analysis: Executive Summary

**Analyst:** [Your Name]
**Date:** [Date]
**Repository:** [ORG/REPO]
**Time Invested:** 2 hours

## Repository Overview
[2-3 sentences about what this service does]

## Current Testing Status
- **Framework:** [name]
- **Test Files:** [count]
- **Estimated Coverage:** [percentage]
- **Assessment:** [Good/Fair/Poor]

## Key Findings

### Strengths
1. [Positive finding 1]
2. [Positive finding 2]
3. [Positive finding 3]

### Critical Gaps
1. **[Gap 1]** - [Brief description and risk]
2. **[Gap 2]** - [Brief description and risk]
3. **[Gap 3]** - [Brief description and risk]

## Recommendations

### Immediate Actions (This Sprint)
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

### Short-term Actions (Next 2-4 weeks)
1. [Recommendation 1]
2. [Recommendation 2]

### Long-term Actions (Next Quarter)
1. [Recommendation 1]
2. [Recommendation 2]

## Estimated Effort
- **P0 Tests:** [X hours]
- **P1 Tests:** [Y hours]
- **P2 Tests:** [Z hours]
- **Total:** [Total hours]

## Risk Assessment
**Current Risk Level:** [High/Medium/Low]
**With Recommended Tests:** [High/Medium/Low]

## Next Steps
1. Review this analysis with team
2. Prioritize test cases
3. Begin implementation phase
4. Set up continuous testing process

## Artifacts Generated
- [ ] Repository analysis document
- [ ] Testing gap analysis
- [ ] Detailed test plan
- [ ] CLAUDE.md for AI assistance
- [ ] Executive summary (this document)
```

**Deliverable:** ✅ `executive-summary.md`

---

## Part 5: Implementation (20 minutes)

### Step 5.1: Implement Sample Tests (20 minutes)

**Task:** Implement 2-3 tests from your test plan

**Choose tests that:**
- Cover critical functionality
- Are relatively simple (can complete in 20 minutes)
- Demonstrate different test types
- Follow project conventions

**Prompt for Claude:**
```
Based on the CLAUDE.md and test plan, implement these tests:

1. **TC001:** [Test from your plan]
2. **TC002:** [Test from your plan]

Requirements:
- Follow all conventions in CLAUDE.md
- Include proper setup/teardown
- Cover happy path and error cases
- Add clear comments
- Use proper assertions
- Mock external dependencies

Generate complete, runnable test files.
```

**Steps:**
1. Have Claude generate the tests
2. Review the generated code
3. Create the test files in the correct locations
4. Verify tests follow conventions
5. Try to run the tests (if possible in lab time)

**Example test structure (adjust for your project):**

```javascript
// tests/unit/services/customerService.test.js

const { CustomerService } = require('../../../src/services/customerService');
const { CustomerRepository } = require('../../../src/repositories/customerRepository');

// Mock dependencies
jest.mock('../../../src/repositories/customerRepository');

describe('CustomerService', () => {
  let customerService;
  let mockCustomerRepository;

  beforeEach(() => {
    // Arrange: Set up mocks and service
    mockCustomerRepository = new CustomerRepository();
    customerService = new CustomerService(mockCustomerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCustomerById', () => {
    it('should return customer when customer exists', async () => {
      // Arrange
      const customerId = 'test-123';
      const expectedCustomer = {
        id: customerId,
        name: 'John Doe',
        email: 'john@example.com'
      };
      mockCustomerRepository.findById.mockResolvedValue(expectedCustomer);

      // Act
      const result = await customerService.getCustomerById(customerId);

      // Assert
      expect(result).toEqual(expectedCustomer);
      expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
      expect(mockCustomerRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw error when customer not found', async () => {
      // Arrange
      const customerId = 'nonexistent-123';
      mockCustomerRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(
        customerService.getCustomerById(customerId)
      ).rejects.toThrow('Customer not found');

      expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
    });

    it('should throw error when customerId is invalid', async () => {
      // Arrange
      const invalidId = '';

      // Act & Assert
      await expect(
        customerService.getCustomerById(invalidId)
      ).rejects.toThrow('Invalid customer ID');

      // Repository should not be called with invalid ID
      expect(mockCustomerRepository.findById).not.toHaveBeenCalled();
    });
  });
});
```

**If time permits, run the tests:**
```bash
# Install dependencies (if not already done)
npm install  # or pip install -r requirements.txt, etc.

# Run your new tests
npm test -- path/to/your/test.test.js

# Or run all tests
npm test
```

**Deliverable:** ✅ 2-3 test files created and documented

---

## Lab Deliverables

### Required Files

Create a folder: `module-03-lab-[yourname]` with:

```
module-03-lab-[yourname]/
├── screenshots/
│   ├── 01-gh-version.png
│   ├── 02-gh-auth-status.png
│   ├── 03-gh-repo-list.png
│   └── 04-tests-running.png (optional)
├── initial-observations.md
├── ai-analysis.md
├── testing-gaps.md
├── test-plan.md
├── CLAUDE.md
├── executive-summary.md
├── sample-tests/
│   ├── test1.test.js (or .py, .java, etc.)
│   ├── test2.test.js
│   └── test3.test.js (optional)
└── README.md (instructions for reviewer)
```

### README.md Template

```markdown
# Module 03 Lab Submission

**Student:** [Your Name]
**Date:** [Date]
**Repository Analyzed:** [ORG/REPO]

## Lab Summary
[2-3 sentences about what you accomplished]

## Files Included

### Documentation
- `initial-observations.md` - First impressions after cloning
- `ai-analysis.md` - Complete AI analysis responses
- `testing-gaps.md` - Gap analysis with risk assessment
- `test-plan.md` - Detailed test plan with 10-15 test cases
- `CLAUDE.md` - Project context file for AI
- `executive-summary.md` - Executive summary for stakeholders

### Test Implementation
- `sample-tests/` - Contains 2-3 implemented tests

### Screenshots
- GitHub CLI installation verification
- Authentication verification
- Repository access verification
- (Optional) Tests running

## Key Findings

### Critical Gaps Identified
1. [Gap 1]
2. [Gap 2]
3. [Gap 3]

### Tests Implemented
1. **[Test 1 Name]** - [What it tests]
2. **[Test 2 Name]** - [What it tests]
3. **[Test 3 Name]** - [What it tests]

## Time Breakdown
- Setup & Authentication: [X] minutes
- Repository Exploration: [X] minutes
- Testing Gap Analysis: [X] minutes
- Documentation: [X] minutes
- Implementation: [X] minutes
- **Total:** ~2 hours

## Challenges Faced
[Any difficulties and how you solved them]

## What I Learned
[Key takeaways from this lab]

## Questions for Instructor
[Any questions or clarifications needed]
```

---

## Grading Rubric

| Category | Weight | Criteria | Points |
|----------|--------|----------|--------|
| **Setup & Access** | 10% | GitHub CLI installed, authenticated, org access | /10 |
| **Repository Exploration** | 15% | Initial observations, AI analysis comprehensive | /15 |
| **Gap Analysis** | 25% | Testing gaps identified, risk assessed, prioritized | /25 |
| **Test Plan** | 20% | Detailed, actionable, realistic test plan | /20 |
| **Documentation** | 15% | CLAUDE.md and executive summary quality | /15 |
| **Implementation** | 10% | Sample tests follow conventions, run correctly | /10 |
| **Professionalism** | 5% | Organization, clarity, completeness | /5 |
| **Total** | **100%** | | **/100** |

### Detailed Grading Criteria

**Setup & Access (10 points)**
- GitHub CLI installed and version verified (3 pts)
- Authentication successful with token (4 pts)
- Organization access granted and verified (3 pts)

**Repository Exploration (15 points)**
- Initial observations documented (3 pts)
- High-level analysis comprehensive (4 pts)
- Directory structure understood (3 pts)
- Code patterns identified (3 pts)
- Current testing status documented (2 pts)

**Gap Analysis (25 points)**
- Critical gaps identified (8 pts)
- Risk assessment thorough (6 pts)
- Integration gaps covered (4 pts)
- Edge cases identified (4 pts)
- Prioritization clear and justified (3 pts)

**Test Plan (20 points)**
- Test cases well-defined (6 pts)
- Clear acceptance criteria (4 pts)
- Realistic effort estimates (3 pts)
- Good coverage of critical functionality (4 pts)
- Organized and actionable (3 pts)

**Documentation (15 points)**
- CLAUDE.md comprehensive and useful (8 pts)
- Executive summary clear and professional (5 pts)
- All sections complete (2 pts)

**Implementation (10 points)**
- Tests follow project conventions (3 pts)
- Tests are complete and runnable (3 pts)
- Good coverage (happy path + errors) (2 pts)
- Proper mocking/setup (2 pts)

**Professionalism (5 points)**
- Files organized logically (2 pts)
- Documentation clear and well-written (2 pts)
- README helpful for reviewer (1 pt)

**Passing Grade:** 70/100

---

## Troubleshooting Guide

### Common Issues

#### Issue 1: GitHub CLI Installation Fails
**Symptoms:** Installation command errors, `gh not found`
**Solutions:**
- Windows: Download manual installer from https://cli.github.com
- Mac: Update Homebrew: `brew update && brew upgrade`
- Linux: Try snap: `sudo snap install gh`

#### Issue 2: Authentication Browser Doesn't Open
**Symptoms:** Browser doesn't open after pressing Enter
**Solutions:**
- Copy the URL manually: https://github.com/login/device
- Try: `gh auth login --web`
- Use token authentication instead

#### Issue 3: Can't See Organization Repos
**Symptoms:** `gh repo list ORG` returns empty or error
**Solutions:**
- Visit https://github.com/settings/tokens
- Grant organization access to token
- Run: `gh auth refresh -s read:org,repo`
- Verify org membership: `gh api user/orgs`

#### Issue 4: Clone is Very Slow
**Symptoms:** Clone takes forever
**Solutions:**
- Use shallow clone: `gh repo clone ORG/REPO -- --depth=1`
- Check network connection
- Try different network (not on VPN)

#### Issue 5: Claude Can't Read Files
**Symptoms:** Claude says "file not found"
**Solutions:**
- Verify directory: `pwd`
- List files: `ls -la`
- Restart Claude from repo root
- Use absolute paths: `/read /full/path/to/file`

#### Issue 6: No Time to Implement Tests
**Symptoms:** Running out of time
**Solutions:**
- Prioritize documentation (worth more points)
- Implement just 1-2 simple tests
- Focus on test plan quality
- You can submit without running tests

---

## Extension Activities

**If you finish early or want extra challenge:**

### Challenge 1: Coverage Analysis
- Install coverage tool
- Run existing tests with coverage
- Generate coverage report
- Compare with your estimates
- Update test plan based on data

### Challenge 2: CI/CD Integration
- Find CI/CD configuration file
- Understand current test automation
- Propose improvements
- Create sample GitHub Actions workflow

### Challenge 3: Test Data Strategy
- Design test data management approach
- Create sample fixtures/factories
- Document test data guidelines
- Implement test data helpers

### Challenge 4: Additional Tests
- Implement 3-5 more tests from your plan
- Focus on different test types
- Include integration tests
- Add E2E test if possible

---

## Submission Instructions

### Packaging Your Work

**Option 1: ZIP File**
```bash
cd ..
zip -r module-03-lab-yourname.zip module-03-lab-yourname/
```

**Option 2: Git Repository**
```bash
cd module-03-lab-yourname
git init
git add .
git commit -m "Module 03 Lab Submission"
# Push to your repo
```

**Option 3: Cloud Storage**
- Upload folder to Google Drive / Dropbox
- Share link with instructor
- Ensure link permissions allow viewing

### Submission Checklist

Before submitting, verify:
- [ ] All required files present
- [ ] Screenshots clear and labeled
- [ ] Documentation complete (no TODO/TBD left)
- [ ] README.md filled out
- [ ] File names follow convention
- [ ] No sensitive data (passwords, tokens) included
- [ ] Total package size reasonable (<50MB)

### Submission Deadline

**Submit by:** [Date/Time specified by instructor]
**Submit to:** [LMS/Email/Platform specified by instructor]
**Late Policy:** [Check with instructor]

---

## Post-Lab Reflection

After completing the lab, reflect on:

### What I Learned
1. [Key learning 1]
2. [Key learning 2]
3. [Key learning 3]

### What Surprised Me
[Unexpected findings or insights]

### What I'd Do Differently
[If starting over, what would you change?]

### How I'll Apply This
[How will you use these skills in real work?]

### Questions I Still Have
[Unclear concepts to follow up on]

---

## Additional Resources

### Documentation
- [GitHub CLI Manual](https://cli.github.com/manual)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- Testing framework docs (Jest, pytest, JUnit, etc.)

### Example Repositories
- [RealWorld Conduit](https://github.com/gothinkster/realworld)
- [TodoMVC](https://github.com/tastejs/todomvc)
- [Microsoft TypeScript Samples](https://github.com/microsoft/TypeScript)

### Videos
- GitHub CLI Quickstart
- AI-Assisted Code Analysis
- Test Planning Best Practices

---

**Congratulations on completing the Module 03 Lab!**

You now have hands-on experience:
- ✅ Setting up GitHub CLI
- ✅ Accessing private repositories
- ✅ Using AI for rapid codebase analysis
- ✅ Identifying testing gaps
- ✅ Creating comprehensive test plans
- ✅ Documenting for AI assistance

**These skills directly translate to real-world QA engineering work!**

---

*Module 03 Lab - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
