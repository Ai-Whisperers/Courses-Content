# AI Prompt Library for QA Automation

This library contains tested, effective prompts for common QA automation tasks.

---

## How to Use

1. Copy the prompt template
2. Replace `[placeholders]` with your specific values
3. Add any additional context needed
4. Iterate based on results

---

## Test Planning Prompts

### Generate Comprehensive Test Plan

```
Create a comprehensive test plan for [feature/module name].

**Context**:
- Files: [list relevant files]
- Dependencies: [list dependencies]
- Related features: [list related features]

**Include**:

1. **Test Objectives**
   - What we're validating
   - Risk areas to prioritize

2. **Test Scope**
   - In scope
   - Out of scope
   - Assumptions

3. **Test Categories**
   - Unit tests
   - Integration tests
   - E2E tests
   - Security tests
   - Performance tests

4. **Test Cases** (for each category)
   | ID | Description | Preconditions | Steps | Expected | Priority |
   |----|-------------|---------------|-------|----------|----------|

5. **Test Data Requirements**
   - Valid data sets
   - Invalid data sets
   - Edge case data

6. **Environment Requirements**
   - Setup instructions
   - Dependencies
   - Configuration

Output as Markdown with tables.
```

### Generate Test Coverage Matrix

```
Create a test coverage matrix for [module/service name].

Show:
- Rows: Functions/Features
- Columns: Unit | Integration | E2E | Security | Performance
- Cells: Covered | Partial | Missing | N/A

For missing coverage:
- Explain why it's needed
- Estimate effort (hours)
- Assign priority (P0-P3)

Format as a Markdown table with a summary section.
```

### Identify Test Gaps

```
Analyze the existing tests for [file/module] and identify gaps.

Check for:
1. Missing happy path tests
2. Missing error cases
3. Missing edge cases
4. Missing boundary tests
5. Missing security tests
6. Uncovered code paths

For each gap:
- Describe what's missing
- Explain the risk
- Provide a test case outline
- Assign priority

Output as a prioritized list.
```

---

## Test Implementation Prompts

### Generate Unit Tests

```
Generate [framework] unit tests for [function/class name].

Source code:
```[language]
[paste code here]
```

Requirements:
- Test all public methods
- Cover happy path scenarios
- Cover error scenarios
- Cover edge cases: [list specific edges]
- Mock these dependencies: [list dependencies]
- Use [specific patterns/utilities]

Test naming convention: [your convention]

Include:
- Descriptive test names
- AAA pattern (Arrange, Act, Assert)
- Proper setup/teardown
- Comments for complex tests
```

### Generate Integration Tests

```
Generate integration tests for [API endpoint/service].

Endpoint/Service: [description]

Dependencies:
- Database: [yes/no, if yes which]
- External APIs: [list them]
- Other services: [list them]

Test scenarios:
1. [Scenario 1]
2. [Scenario 2]
3. [Scenario 3]

Requirements:
- Use [test framework]
- [Mock/Real] database
- [Mock/Real] external services
- Clean up after each test
- Use fixtures for test data

Format: One test file with describe blocks per scenario.
```

### Generate E2E Tests

```
Generate Playwright E2E tests for [user flow].

Flow description:
[Describe the user journey step by step]

Page elements:
- [element]: [selector]
- [element]: [selector]

Test scenarios:
1. Happy path: [description]
2. Error case: [description]
3. Edge case: [description]

Requirements:
- Use Page Object Model
- Use data-testid selectors
- Include visual assertions where appropriate
- Test on [browsers]
- Handle loading states

Output: Separate files for page objects and tests.
```

### Generate Test Data Factories

```
Create test data factories for [entity/model name].

Model definition:
```[language]
[paste model/interface here]
```

Generate factories that:
- Create valid default instances
- Allow field overrides
- Generate realistic fake data
- Support batch creation
- Handle relationships to: [related entities]

Use [faker library] for fake data.

Include factories for:
- Valid instances
- Invalid instances (for each validation rule)
- Edge case instances
```

---

## Test Debugging Prompts

### Debug Failing Test

```
This test is failing. Help me debug it.

**Test code**:
```[language]
[paste test code]
```

**Error message**:
```
[paste error]
```

**Source code being tested**:
```[language]
[paste relevant source code]
```

**Environment**:
- Framework: [test framework]
- Version: [version]
- OS: [operating system]

Please:
1. Explain why the test is failing
2. Identify if it's a test issue or code issue
3. Provide the fix
4. Suggest how to prevent this type of failure
```

### Fix Flaky Test

```
This test is flaky (passes sometimes, fails sometimes).

**Test code**:
```[language]
[paste test code]
```

**Failure pattern**:
- Fails approximately [X]% of the time
- Fails more often [condition: locally/in CI/specific time]

**Error when it fails**:
```
[paste error]
```

Please:
1. Identify likely causes of flakiness
2. Suggest specific fixes
3. Provide the corrected test code
4. Explain how to verify the fix worked
```

### Improve Test Coverage

```
Coverage report shows low coverage for [file/module].

**Coverage summary**:
- Lines: [X]%
- Branches: [X]%
- Functions: [X]%

**Uncovered lines**: [list line numbers or ranges]

**Source code**:
```[language]
[paste relevant uncovered code]
```

Please:
1. Explain what each uncovered section does
2. Generate tests to cover these sections
3. Prioritize by risk/importance
4. Estimate the effort to achieve [target]% coverage
```

---

## Documentation Prompts

### Generate Architecture Documentation

```
Analyze this codebase and generate architecture documentation.

Create a document with:

## 1. System Overview
- Purpose and goals
- Key features
- Target users

## 2. Architecture Diagram
- Use Mermaid syntax
- Show all major components
- Show data flow
- Show external integrations

## 3. Component Details
For each component:
- Purpose
- Key files
- Dependencies
- API (if applicable)

## 4. Data Models
- Main entities
- Relationships
- Database schema

## 5. Technology Stack
- Languages and frameworks
- Libraries and tools
- Infrastructure

## 6. Deployment Architecture
- Environments
- CI/CD pipeline
- Monitoring

Format as Markdown suitable for a README.
```

### Generate API Documentation

```
Generate API reference documentation for [service/controller].

For each endpoint:

## [HTTP Method] [Path]

**Description**: [what it does]

**Authentication**: [required/optional/none]

**Request**:
- Headers: [list]
- Parameters: [list with types]
- Body: [schema with example]

**Response**:
- Success (200): [schema with example]
- Error (4xx): [schema with example]

**Example**:
```bash
curl -X [METHOD] [URL] ...
```

Include:
- Rate limiting info
- Pagination details
- Filtering/sorting options
```

### Generate Test Documentation

```
Generate documentation for the test suite.

Include:

## Test Suite Overview
- Testing philosophy
- Coverage goals
- Test types used

## Running Tests
- Prerequisites
- Commands for each test type
- Configuration options

## Test Structure
- Directory organization
- Naming conventions
- Shared utilities

## Writing New Tests
- Templates to follow
- Required assertions
- Mocking guidelines

## CI/CD Integration
- When tests run
- Failure handling
- Coverage reporting

## Troubleshooting
- Common issues
- Debug tips
```

---

## Code Review Prompts

### Review Generated Tests

```
Review these AI-generated tests for quality.

**Tests**:
```[language]
[paste tests]
```

Evaluate against:

1. **Correctness**
   - Do assertions test the right things?
   - Are expected values correct?

2. **Completeness**
   - Are all scenarios covered?
   - Are edge cases included?
   - Are error cases tested?

3. **Quality**
   - Are tests isolated?
   - Are they deterministic?
   - Are they maintainable?

4. **Style**
   - Do they follow conventions?
   - Are names descriptive?
   - Is code DRY?

For each issue:
- Location
- Severity (Critical/High/Medium/Low)
- Description
- Suggested fix
```

### Review Security

```
Review this code for security vulnerabilities.

**Code**:
```[language]
[paste code]
```

Check for:
- Injection vulnerabilities (SQL, XSS, command)
- Authentication/authorization issues
- Sensitive data exposure
- Input validation gaps
- OWASP Top 10 issues

For each finding:
- Severity (Critical/High/Medium/Low)
- OWASP category
- Location (line number)
- Description
- Remediation with code example
```

---

## CI/CD Prompts

### Generate GitHub Actions Workflow

```
Generate a GitHub Actions workflow for testing.

Requirements:
- Trigger on: [push/PR/schedule]
- Branches: [list]
- Steps:
  1. [Step 1]
  2. [Step 2]
  ...

Include:
- Matrix for [Node versions/OS/browsers]
- Caching for [npm/pip/etc]
- Coverage upload to [Codecov/Coveralls]
- Artifacts for [reports/screenshots]

Environment variables needed:
- [VAR1]: [description]
- [VAR2]: [description]

Output as complete workflow YAML file.
```

### Generate Test Report

```
Generate a test execution report from these results.

**Results**:
```
[paste test output]
```

Create a report with:

## Summary
- Total tests
- Passed/Failed/Skipped
- Coverage percentage
- Execution time

## Failed Tests
For each failure:
- Test name
- Failure reason
- Likely cause
- Suggested fix

## Coverage Gaps
- Uncovered areas
- Risk assessment
- Recommendations

## Performance Issues
- Slow tests (>1s)
- Optimization suggestions

## Recommendations
- Priority fixes
- Next steps

Format for [PR comment/Slack message/email].
```

---

## Quick Reference

### Test Generation Pattern
```
Generate [framework] [type] tests for [target]
[Paste code]
Requirements: [list]
Conventions: [naming, patterns]
Include: [specific scenarios]
```

### Debugging Pattern
```
[Describe issue]
Test: [paste]
Error: [paste]
Source: [paste]
Questions: [what you need to know]
```

### Review Pattern
```
Review [code type] for [criteria]
Code: [paste]
Check: [list of checks]
Format: [how to report findings]
```

---

*Update this library as you discover new effective prompts!*
