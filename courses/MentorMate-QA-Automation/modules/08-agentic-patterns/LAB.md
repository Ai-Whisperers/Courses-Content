# Module 8: Agentic Testing Patterns - Hands-On Lab

**Duration**: 2 hours
**Format**: Integrated hands-on project
**Difficulty**: Advanced

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

This comprehensive lab integrates all five agentic patterns into a real-world testing workflow. You'll build an automated test generation system for an e-commerce application that combines:

- **Prompt Chaining**: Multi-step test generation workflow
- **Reflection**: Quality improvement loops
- **RAG**: Pattern-consistent test generation
- **Parallelization**: Large-scale test creation
- **Tool Use (MCP)**: Context gathering from multiple sources

### Learning Objectives

By completing this lab, you will:
- Design and execute complex agentic workflows
- Integrate multiple patterns into cohesive systems
- Measure improvements from pattern usage
- Build production-ready test automation workflows
- Apply patterns to real-world scenarios

### Prerequisites

- Completed Modules 01-07
- Claude Code CLI installed
- Node.js 16+ and npm installed
- Git installed
- Basic understanding of all five patterns (from exercises)

---

## Lab Scenario

**Company**: TechMart E-Commerce Platform
**Challenge**: Launch in 2 weeks, need comprehensive test coverage
**Problem**: Manual testing would take 6 weeks
**Solution**: Build agentic testing system to generate tests in 2 days

**Modules to Test**:
1. User Authentication (`src/auth/`)
2. Product Catalog (`src/products/`)
3. Shopping Cart (`src/cart/`)
4. Payment Processing (`src/payments/`)
5. Order Management (`src/orders/`)

---

## Part 1: Project Setup (20 minutes)

### Step 1.1: Clone the Sample Project

```bash
# Clone the TechMart e-commerce project
git clone https://github.com/mentormate/techmart-ecommerce-sample
cd techmart-ecommerce-sample

# Or create a simplified version
mkdir techmart-ecommerce && cd techmart-ecommerce
npm init -y
npm install express mongoose bcrypt jsonwebtoken stripe
npm install -D jest supertest @types/jest
```

**Expected Output**: Project initialized with dependencies installed

**Troubleshooting**:
- If clone fails, use the manual setup commands
- If npm install fails, try `npm install --legacy-peer-deps`

---

### Step 1.2: Explore Project Structure

```bash
# View the directory structure
tree src

# Or manually explore
ls -R src/
```

**Expected Structure**:
```
src/
├── auth/
│   ├── AuthService.js
│   └── middleware/authMiddleware.js
├── products/
│   ├── ProductService.js
│   └── ProductController.js
├── cart/
│   ├── CartService.js
│   └── CartController.js
├── payments/
│   ├── PaymentService.js
│   └── PaymentController.js
└── orders/
    ├── OrderService.js
    └── OrderController.js
```

**Task**: Document your findings:
1. How many total files need testing?
2. What are the dependencies between modules?
3. Are there existing tests?
4. What testing framework should be used?

---

### Step 1.3: Create Lab Workspace

```bash
# Create workspace for lab outputs
mkdir lab-outputs
cd lab-outputs

mkdir knowledge-base
mkdir generated-tests
mkdir workflows
mkdir metrics

# Return to project root
cd ..
```

---

## Part 2: Build Test Knowledge Base (25 minutes)

### Step 2.1: Analyze Existing Code Patterns

If the project has existing tests (check `__tests__/` or `tests/`):

**Prompt**:
```
Analyze these existing test files and extract patterns.

Test Files:
[Paste 3-5 existing test files]

Extract:
1. Test structure patterns
2. Assertion patterns
3. Mocking patterns
4. Setup/teardown patterns
5. Naming conventions

Create knowledge base entries for each pattern.
```

If no existing tests, use these requirements:

**Prompt**:
```
Create a test pattern knowledge base for an Express/Node.js e-commerce application.

Stack:
- Express.js for API
- Mongoose for MongoDB
- Jest for testing
- Supertest for HTTP testing

Create patterns for:
1. API endpoint testing
2. Service layer unit testing
3. Authentication testing
4. Database mocking
5. Payment integration testing (mock Stripe)

Format as knowledge base entries with examples.
```

---

### Step 2.2: Organize Knowledge Base

Save the extracted/created patterns to `lab-outputs/knowledge-base/test-patterns.md`

**Required Sections**:
```markdown
# TechMart Test Pattern Knowledge Base

## Table of Contents
1. [API Endpoint Testing](#api-endpoint-testing)
2. [Service Unit Testing](#service-unit-testing)
3. [Authentication Testing](#authentication-testing)
4. [Database Mocking](#database-mocking)
5. [External Service Mocking](#external-service-mocking)
6. [Error Handling Testing](#error-handling-testing)

[Include at least 6 detailed patterns]
```

---

### Step 2.3: Validate Knowledge Base

Test one pattern to ensure it's useful:

**Prompt**:
```
Generate tests for this AuthService.login() method using our patterns.

Method:
[Paste login method code]

Relevant patterns:
"""
[Paste 2 relevant patterns from KB]
"""

Follow the patterns exactly.
```

**Verify**: Do the generated tests match the pattern style?

---

## Part 3: Design Master Workflow (20 minutes)

### Step 3.1: Create Workflow Diagram

Design a complete workflow combining all patterns.

**Template** (`lab-outputs/workflows/master-workflow.md`):

```markdown
# TechMart Agentic Testing Master Workflow

## Overview
Generate comprehensive test suite for all 5 modules using combined agentic patterns.

## Phase 1: Context Gathering (MCP Tool Use)
**Duration**: ~5 minutes
**Pattern**: Tool Use

### Steps:
1. Use filesystem MCP to read all source files
2. Use git MCP to check recent commits
3. Use postgres MCP to inspect database schema
4. Document all gathered context

**Output**: Context document with code, changes, schema

---

## Phase 2: Test Planning (Prompt Chain Step 1)
**Duration**: ~10 minutes
**Pattern**: Prompt Chaining

### Steps:
1. Analyze all modules and identify testable units
2. Categorize by priority (P0, P1, P2)
3. Identify dependencies between modules
4. Create test case outline for each module

**Output**: Comprehensive test plan

---

## Phase 3: Parallel Test Generation (Parallelization + RAG)
**Duration**: ~20 minutes
**Pattern**: Parallelization + RAG

### Steps:
1. For each module in parallel:
   a. Retrieve relevant patterns from KB (RAG)
   b. Generate tests following patterns
   c. Include context from Phase 1
2. Execute all 5 in parallel

**Output**: 5 test files (one per module)

---

## Phase 4: Quality Improvement (Reflection)
**Duration**: ~15 minutes per module
**Pattern**: Reflection

### Steps:
1. For each generated test file:
   a. Score against quality rubric
   b. Identify gaps
   c. Generate improvements
   d. Repeat until score >= threshold
2. Can be done in parallel

**Output**: High-quality test files

---

## Phase 5: Integration & Normalization (Prompt Chain Step 2)
**Duration**: ~10 minutes
**Pattern**: Prompt Chaining

### Steps:
1. Combine all test files
2. Resolve naming conflicts
3. Extract shared fixtures
4. Ensure consistent style
5. Verify all tests pass

**Output**: Integrated test suite

---

## Phase 6: Metrics & Validation
**Duration**: ~10 minutes

### Steps:
1. Run all tests
2. Generate coverage report
3. Compare to baseline metrics
4. Document improvements

**Output**: Metrics report
```

---

### Step 3.2: Create Quality Rubric

Design a rubric for the reflection loops.

**Save to** `lab-outputs/workflows/quality-rubric.md`:

```markdown
# Test Quality Rubric

## Scoring Criteria (15 points total)

### 1. Path Coverage (0-3 points)
- 3 = All code paths tested (success, errors, edge cases)
- 2 = Main paths tested
- 1 = Only happy path
- 0 = Incomplete

### 2. Assertion Quality (0-3 points)
- 3 = Specific assertions on all important values
- 2 = Good assertions, some generic
- 1 = Weak assertions
- 0 = Missing/incorrect assertions

### 3. Mock Usage (0-3 points)
- 3 = All dependencies properly mocked, verified
- 2 = Mocks present, some gaps
- 1 = Incomplete mocking
- 0 = No/incorrect mocks

### 4. Error Handling (0-3 points)
- 3 = All error scenarios tested with specific assertions
- 2 = Main error cases tested
- 1 = Minimal error testing
- 0 = No error testing

### 5. Security & Edge Cases (0-3 points)
- 3 = Security tests + comprehensive edge cases
- 2 = Some security/edge case coverage
- 1 = Minimal coverage
- 0 = None

**Pass Threshold**: 12/15 points
**Target**: 13+ points for production readiness
```

---

## Part 4: Execute Workflow - Context Gathering (15 minutes)

### Step 4.1: Gather Code Context

**Option A**: If you have MCP configured, use tools:

```
Use available tools to gather context:

1. Read all service files in src/*/*.js
2. Get recent commits from last 30 days
3. If available, inspect database schema

Document all findings.
```

**Option B**: Manually gather and document:

```bash
# Read all service files
find src -name "*Service.js" -exec cat {} \;

# Check git log
git log --since="30 days ago" --oneline

# Document in lab-outputs/context/gathered-context.md
```

---

### Step 4.2: Document Context

Create `lab-outputs/context/gathered-context.md`:

```markdown
# Gathered Context for TechMart Testing

## Source Code Summary
### Auth Module
- AuthService.js: 5 methods (register, login, verifyToken, logout, resetPassword)
- Dependencies: bcrypt, jsonwebtoken, User model

### Product Module
[Document each module]

## Recent Changes (Last 30 Days)
- Commit abc123: Added password reset functionality
- Commit def456: Fixed cart quantity validation bug
[Document all relevant commits]

## Database Schema
### Users Table
- id (uuid)
- email (string, unique)
- passwordHash (string)
- role (enum: customer, admin)
[Document all tables]

## External Dependencies
- Stripe API for payments
- SendGrid for emails
- AWS S3 for product images
```

---

## Part 5: Execute Workflow - Test Planning (15 minutes)

### Step 5.1: Analyze and Plan

**Prompt** (Prompt Chain Step 1):
```
Analyze this e-commerce application and create a comprehensive test plan.

Context:
[Paste gathered-context.md]

For each module (Auth, Products, Cart, Payments, Orders):
1. List all testable units (functions/methods)
2. Categorize by priority:
   - P0: Critical (auth, payments)
   - P1: Important (cart, orders)
   - P2: Nice-to-have (product search)
3. Identify test scenarios for each unit:
   - Happy path
   - Error cases
   - Edge cases
   - Security scenarios
4. Note dependencies and mocking needs

Output structured test plan.
```

---

### Step 5.2: Document Test Plan

Save output to `lab-outputs/workflows/test-plan.md`

**Verify Plan**:
- [ ] All 5 modules covered
- [ ] Each method/function identified
- [ ] Priority assigned
- [ ] Test scenarios outlined
- [ ] Dependencies noted

---

## Part 6: Execute Workflow - Parallel Generation (30 minutes)

### Step 6.1: Generate Tests in Parallel

For **each of the 5 modules**, execute this prompt **simultaneously** (open 5 Claude conversations if possible, or do sequentially if needed):

**Prompt Template** (customize for each module):
```
Generate Jest tests for the [MODULE NAME] module.

Context:
[Paste relevant section from gathered-context.md]

Test Plan:
[Paste relevant section from test-plan.md]

Knowledge Base Patterns:
"""
[Paste 2-3 relevant patterns from KB]
"""

Requirements:
- Framework: Jest
- Use supertest for API tests
- Mock all external dependencies
- Follow patterns from knowledge base exactly
- Include all scenarios from test plan
- File name: [ModuleName].test.js

Generate complete test file.
```

**Execute for**:
1. Auth Module → `AuthService.test.js`
2. Product Module → `ProductService.test.js`
3. Cart Module → `CartService.test.js`
4. Payment Module → `PaymentService.test.js`
5. Order Module → `OrderService.test.js`

**Save** each to `lab-outputs/generated-tests/[module].test.js`

---

### Step 6.2: Track Generation Time

Document how long each module takes:

```markdown
# Generation Time Tracking

- Auth Module: X minutes
- Product Module: X minutes
- Cart Module: X minutes
- Payment Module: X minutes
- Order Module: X minutes

**Total**: X minutes
**Average**: X minutes per module
```

---

## Part 7: Execute Workflow - Quality Improvement (25 minutes)

### Step 7.1: Reflect on Each Module

For **each generated test file**, run the reflection loop:

**Reflection Prompt**:
```
Review these tests against our quality rubric.

Tests:
[Paste generated test file]

Rubric:
[Paste quality-rubric.md]

Score each criterion (0-3) and explain.
Identify specific gaps.
Total score out of 15.

If score < 12, provide detailed improvement suggestions.
```

**Document** in `lab-outputs/metrics/[module]-reflection.md`:
- Initial score
- Issues identified
- Improvement suggestions

---

### Step 7.2: Improve Low-Scoring Tests

For any test file scoring < 12:

**Improvement Prompt**:
```
Improve these tests to address all critique points.

Current tests:
[Paste tests]

Critique:
[Paste reflection with specific gaps]

Generate improved version targeting 13+ score.
```

**Iterate** until score >= 12 (max 3 iterations per module)

---

### Step 7.3: Track Quality Improvements

Document in `lab-outputs/metrics/quality-improvements.md`:

```markdown
# Quality Improvement Tracking

## Auth Module
- Initial Score: 8/15
- Issues: Weak assertions, missing edge cases
- After Iteration 1: 11/15
- After Iteration 2: 13/15
- Final Score: 13/15

[Repeat for each module]

## Summary
- Modules improved: 3/5
- Average improvement: +5 points
- Iterations needed: Average 2.2
```

---

## Part 8: Execute Workflow - Integration (15 minutes)

### Step 8.1: Combine Test Files

**Normalization Prompt**:
```
Normalize and integrate these test files.

Test Files:
1. Auth: [Paste]
2. Products: [Paste]
3. Cart: [Paste]
4. Payments: [Paste]
5. Orders: [Paste]

Ensure:
1. Consistent naming conventions
2. Shared fixtures extracted to separate file
3. No duplicate mock definitions
4. Same import/require style
5. No test name conflicts
6. Alphabetical organization

Output:
- 5 normalized test files
- 1 shared fixtures file (test-helpers.js)
- Summary of changes made
```

---

### Step 8.2: Create Test Suite Structure

Organize the final tests:

```
tests/
├── __helpers__/
│   └── test-helpers.js
├── auth/
│   └── AuthService.test.js
├── products/
│   └── ProductService.test.js
├── cart/
│   └── CartService.test.js
├── payments/
│   └── PaymentService.test.js
└── orders/
    └── OrderService.test.js
```

Save all files to this structure in `lab-outputs/generated-tests/`

---

## Part 9: Validation & Metrics (15 minutes)

### Step 9.1: Run the Tests

```bash
# Copy generated tests to project
cp -r lab-outputs/generated-tests/* __tests__/

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

**Expected Output**: All tests should pass

**Troubleshooting**:
- If tests fail, check import paths
- Verify mocks are properly configured
- Ensure test data is valid

---

### Step 9.2: Analyze Coverage

```bash
# Generate coverage report
npm test -- --coverage --coverageReporters=text --coverageReporters=html

# View report
open coverage/index.html
```

**Document** in `lab-outputs/metrics/coverage-report.md`:
```markdown
# Coverage Report

## Overall
- Statements: X%
- Branches: X%
- Functions: X%
- Lines: X%

## By Module
- Auth: X% coverage
- Products: X% coverage
- Cart: X% coverage
- Payments: X% coverage
- Orders: X% coverage

## Gaps
[List any uncovered code and why]
```

---

### Step 9.3: Calculate Metrics

Compare to baseline (manual testing):

**Document** in `lab-outputs/metrics/final-metrics.md`:

```markdown
# TechMart Agentic Testing Metrics

## Time Comparison
### Manual Approach (Estimated)
- Test planning: 1 week
- Test implementation: 4 weeks
- Review and iterations: 1 week
- **Total: 6 weeks (240 hours)**

### Agentic Approach (Actual)
- Setup: 20 minutes
- Knowledge base: 25 minutes
- Workflow design: 20 minutes
- Context gathering: 15 minutes
- Test planning: 15 minutes
- Parallel generation: 30 minutes
- Quality improvement: 25 minutes
- Integration: 15 minutes
- Validation: 15 minutes
- **Total: 3 hours**

**Time Savings: 237 hours (98.75%)**

## Quality Metrics
- Test coverage: X%
- Average quality score: 13.2/15
- Tests passing: 100%
- Bugs found: 0 (tests catch them)

## Pattern Effectiveness
- Prompt Chaining: Reduced complexity, improved structure
- Reflection: Improved average score from 8.4 → 13.2 (+57%)
- RAG: 100% consistency with team patterns
- Parallelization: 5x faster than sequential (30 min vs 150 min)
- Tool Use: Complete context improved accuracy

## ROI Calculation
- Time invested in setup: 3 hours
- Time saved on this project: 237 hours
- **ROI: 79x**

For recurring use (quarterly releases):
- Time per quarter: 3 hours (vs 240)
- Annual savings: 948 hours
- **Annual ROI: 316x**
```

---

## Part 10: Documentation & Reflection (10 minutes)

### Step 10.1: Document the Workflow

Create `lab-outputs/WORKFLOW-DOCUMENTATION.md`:

```markdown
# TechMart Agentic Testing Workflow - Documentation

## Purpose
Automated test generation system combining 5 agentic patterns for comprehensive, high-quality test coverage.

## Patterns Used
1. **Tool Use (MCP)**: Gather context from code, git, database
2. **Prompt Chaining**: Break generation into structured phases
3. **RAG**: Ensure pattern consistency across all tests
4. **Parallelization**: Generate tests for 5 modules simultaneously
5. **Reflection**: Iteratively improve quality to meet threshold

## Workflow Steps
[Document each phase from master-workflow.md]

## Results Achieved
- Tests generated: 5 complete test files
- Coverage: X%
- Quality score: 13.2/15 average
- Time: 3 hours vs 240 hours manual
- ROI: 79x

## Lessons Learned
[Document insights gained]

## Reusability
This workflow can be reused for:
- New feature testing
- Regression test expansion
- Other microservices in company
- Similar e-commerce projects

## Next Steps
- Integrate into CI/CD pipeline
- Schedule quarterly test updates
- Train team on workflow
- Build custom tooling for automation
```

---

### Step 10.2: Personal Reflection

Answer these questions in `lab-outputs/REFLECTION.md`:

1. **What was most challenging about combining patterns?**
2. **Which pattern provided the most value?**
3. **What would you do differently next time?**
4. **How confident are you in the generated tests?**
5. **Would you use this approach in your work? Why/why not?**
6. **What pattern combinations were most effective?**
7. **What improvements could be made to the workflow?**

---

## Deliverables

### Required Files

Submit all files in this structure:

```
lab-outputs/
├── knowledge-base/
│   └── test-patterns.md
├── workflows/
│   ├── master-workflow.md
│   └── quality-rubric.md
├── context/
│   └── gathered-context.md
├── generated-tests/
│   ├── __helpers__/
│   │   └── test-helpers.js
│   ├── auth/
│   │   └── AuthService.test.js
│   ├── products/
│   │   └── ProductService.test.js
│   ├── cart/
│   │   └── CartService.test.js
│   ├── payments/
│   │   └── PaymentService.test.js
│   └── orders/
│       └── OrderService.test.js
├── metrics/
│   ├── auth-reflection.md
│   ├── products-reflection.md
│   ├── cart-reflection.md
│   ├── payments-reflection.md
│   ├── orders-reflection.md
│   ├── quality-improvements.md
│   ├── coverage-report.md
│   └── final-metrics.md
├── WORKFLOW-DOCUMENTATION.md
└── REFLECTION.md
```

---

## Grading Rubric (100 points)

| Criteria | Points | Excellent | Good | Needs Improvement |
|----------|--------|-----------|------|-------------------|
| **Knowledge Base** | 10 | 6+ patterns, well-organized | 4-5 patterns | < 4 patterns |
| **Workflow Design** | 15 | Complete, integrates all patterns | Mostly complete | Incomplete |
| **Context Gathering** | 10 | Comprehensive context | Basic context | Minimal context |
| **Test Generation** | 20 | All 5 modules, high quality | 4-5 modules, good quality | < 4 modules |
| **Quality Improvement** | 15 | Reflection improves all tests | Some improvement | Minimal improvement |
| **Integration** | 10 | Clean, normalized, consistent | Mostly integrated | Poor integration |
| **Tests Pass** | 10 | All tests pass, good coverage | Most pass | Many fail |
| **Metrics** | 10 | Complete metrics with analysis | Basic metrics | Minimal metrics |
| **Documentation** | 10 | Thorough, clear, insightful | Good documentation | Sparse documentation |

**Total**: 100 points
**Passing**: 70 points

---

## Common Challenges & Solutions

### Challenge 1: Tests Don't Pass
**Problem**: Generated tests have errors or fail
**Solution**:
- Check import paths are correct
- Verify mocks are properly configured
- Ensure test data matches expected formats
- Run tests individually to isolate failures

### Challenge 2: Reflection Doesn't Improve Quality
**Problem**: Score doesn't increase after iterations
**Solution**:
- Review rubric - is it achievable?
- Be more specific in critique about what's missing
- Provide examples in improvement prompt
- Lower threshold if necessary (11 instead of 12)

### Challenge 3: Tests Are Inconsistent
**Problem**: Each module has different style
**Solution**:
- Strengthen knowledge base patterns
- Ensure RAG retrieves same patterns for all
- Add thorough normalization step
- Use more specific prompts about consistency

### Challenge 4: Time Runs Over
**Problem**: Lab taking more than 2 hours
**Solution**:
- Do parallelization sequentially if needed
- Limit reflection to 2 iterations max
- Focus on 3 modules instead of 5 (still valid)
- Prioritize quality over quantity

### Challenge 5: Knowledge Base Too Generic
**Problem**: RAG doesn't improve consistency
**Solution**:
- Make KB more project-specific
- Include complete, runnable examples
- Test KB with one module first
- Refine before using for all modules

---

## Success Criteria

**You've successfully completed the lab when:**

✅ Knowledge base created with 6+ patterns
✅ Complete workflow designed integrating all patterns
✅ Context gathered from multiple sources
✅ Tests generated for all 5 modules
✅ Reflection improved quality (average 12+ score)
✅ All tests integrated and normalized
✅ Tests pass with good coverage (70%+)
✅ Metrics documented showing improvements
✅ Complete documentation submitted
✅ Personal reflection completed

---

## Bonus Challenges (Optional)

### Bonus 1: Automate the Workflow (2-3 hours)
Write a script that executes the entire workflow:
```javascript
// run-agentic-workflow.js
// Orchestrates all phases automatically
```

**Recognition**: Showcase in class

### Bonus 2: Add More Modules (1 hour)
Extend to test:
- User profiles module
- Notifications module
- Admin dashboard module

### Bonus 3: CI/CD Integration (1 hour)
Create GitHub Actions workflow that:
- Runs your agentic workflow on new features
- Generates tests automatically
- Creates PR with tests

---

## Lab Support

### Checkpoints

**Checkpoint 1** (After Part 3): Instructor reviews workflow design
**Checkpoint 2** (After Part 6): Instructor reviews one generated test
**Checkpoint 3** (After Part 9): Instructor reviews metrics

### Getting Help

- Slack: #qa-course-lab-help
- Office Hours: Thursday 6-7 PM
- Emergency: Email qa-training@mentormate.com

### Time Extensions

If you need more time:
- Document your progress at 2-hour mark
- Continue at your pace
- Submit when complete (within 1 week)
- Partial credit available for incomplete work

---

## Next Steps After Lab

1. **Apply to Your Work**
   - Choose one real project
   - Build knowledge base
   - Execute workflow
   - Measure results

2. **Share Your Experience**
   - Present metrics to class
   - Share workflow improvements
   - Help teammates adopt patterns

3. **Continue Learning**
   - Module 09: CI/CD Integration
   - Automate your workflows
   - Build custom tooling

---

**Good luck with the lab! This is where theory meets practice.**

---

*Module 08 Lab - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
