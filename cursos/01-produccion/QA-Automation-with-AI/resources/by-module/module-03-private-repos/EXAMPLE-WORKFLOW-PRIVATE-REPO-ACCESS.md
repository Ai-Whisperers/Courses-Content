# Example Workflow: Accessing Private Repos with AI

This document provides a complete, step-by-step example of how to use AI (Claude Code) to access, understand, document, and test a private repository.

---

## Scenario

You've joined a new team and need to quickly understand and contribute to a private codebase: `Ai-Whisperers/customer-feedback-app`

---

## Phase 1: Environment Setup

### Step 1.1: Install Required Tools

```powershell
# Install GitHub CLI (if not installed)
winget install GitHub.cli

# Install Claude Code (if not installed)
winget install Anthropic.ClaudeCode
```

### Step 1.2: Authenticate with GitHub

```bash
# Start authentication
gh auth login

# Follow prompts:
# 1. Select: GitHub.com
# 2. Select: HTTPS
# 3. Select: Login with a web browser
# 4. Copy the one-time code shown in terminal
# 5. Open: https://github.com/login/device
# 6. Enter the code
# 7. Authorize GitHub CLI
# 8. Grant access to your organization (Ai-Whisperers)

# Verify authentication
gh auth status
# Expected output:
# ✓ Logged in to github.com as YourUsername
# ✓ Token: *****
# ✓ Token scopes: ...
```

### Step 1.3: Verify Organization Access

```bash
# List organization repositories to confirm access
gh repo list Ai-Whisperers --limit 5

# Expected output:
# Ai-Whisperers/customer-feedback-app    private  2025-11-20
# Ai-Whisperers/analysis-engine          private  2025-11-04
# ...
```

---

## Phase 2: Clone and Explore the Repository

### Step 2.1: Clone the Repository

```bash
# Clone the private repository
gh repo clone Ai-Whisperers/customer-feedback-app

# Navigate to the project
cd customer-feedback-app

# Check the structure
ls -la
# or on Windows:
dir
```

### Step 2.2: Create Initial Context for AI

Create a `CLAUDE.md` file in the project root:

```markdown
# Project: Customer Feedback App

## Overview
This is a customer feedback analysis system using Kafka streaming and AI-powered sentiment analysis.

## Goals for this session
- Understand the architecture
- Document the main components
- Create a test plan
- Implement automated tests

## What I know so far
- Uses Docker + Kubernetes
- Uses Apache Kafka for streaming
- Has local NLP processing + optional GPT fallback

## What I need to learn
- Complete data flow
- All service components
- Testing approach
- Deployment process
```

### Step 2.3: Start Claude Code Session

```bash
# Start Claude Code
claude

# or start with a specific task
claude "Analyze this codebase and explain the architecture"
```

---

## Phase 3: AI-Assisted Codebase Exploration

### Step 3.1: High-Level Architecture Understanding

**Prompt to Claude:**
```
Please analyze this codebase and provide:

1. **System Overview**
   - What does this system do?
   - What problem does it solve?

2. **Architecture Diagram**
   - Create a Mermaid diagram showing all components
   - Show data flow between components
   - Include external dependencies

3. **Technology Stack**
   - List all frameworks and libraries
   - Explain why each was chosen (if apparent)

4. **File Structure**
   - Main directories and their purposes
   - Key configuration files

Start by reading the main README and key configuration files.
```

**Expected Claude Actions:**
1. Read README.md
2. Read docker-compose.yml
3. Read requirements.txt / package.json
4. Explore directory structure
5. Provide comprehensive analysis

### Step 3.2: Deep Dive into Components

**Prompt to Claude:**
```
Now let's understand each service in detail. For each service:

1. **Frontend Service**
   - Main purpose
   - Key files
   - User interactions

2. **Normalizer Service**
   - What data does it normalize?
   - Input/output formats
   - Kafka topics used

3. **Processor Service**
   - NLP processing pipeline
   - GPT fallback logic
   - Output format

4. **Aggregator Service**
   - What does it aggregate?
   - Storage mechanism
   - Query capabilities

Read the main files for each service and explain their implementation.
```

### Step 3.3: Identify Critical Code Paths

**Prompt to Claude:**
```
Identify the critical code paths in this application:

1. **User upload flow** - from file upload to processed results
2. **Real-time streaming flow** - Kafka message processing
3. **Error handling** - how failures are managed
4. **Security measures** - authentication, validation, sanitization

For each path:
- List the files involved
- Show the sequence of operations
- Highlight potential issues or risks
```

---

## Phase 4: Generate Documentation

### Step 4.1: Architecture Documentation

**Prompt to Claude:**
```
Generate complete architecture documentation for this project.

Create a file called ARCHITECTURE.md with:

## 1. System Overview
[Description of what the system does]

## 2. Architecture Diagram
[Mermaid diagram of components]

## 3. Component Details

### Frontend Service
- **Purpose**: [description]
- **Technologies**: [list]
- **Key Files**: [list with descriptions]
- **API Endpoints**: [list]

### Normalizer Service
[Same structure]

### Processor Service
[Same structure]

### Aggregator Service
[Same structure]

## 4. Data Flow
[Step-by-step data flow description]

## 5. Kafka Topics
[List all topics with purposes]

## 6. Configuration
[Key environment variables and their purposes]

## 7. External Dependencies
[List with versions and purposes]

Write this as a proper Markdown file ready to commit.
```

### Step 4.2: API Reference

**Prompt to Claude:**
```
Generate API reference documentation.

Create API-REFERENCE.md with:

## Frontend API

### POST /api/upload
**Description**: Upload feedback file for processing
**Request**:
- Content-Type: multipart/form-data
- Body: file (CSV/Excel)
**Response**:
- 200: { "jobId": "uuid", "status": "processing" }
- 400: { "error": "Invalid file format" }

[Continue for all endpoints]

## Internal APIs
[Document inter-service APIs]

Format with clear examples for each endpoint.
```

### Step 4.3: Setup Guide

**Prompt to Claude:**
```
Generate a comprehensive setup guide.

Create SETUP-GUIDE.md with:

## Prerequisites
[All required software with versions]

## Quick Start
[5-minute setup for demo]

## Development Setup
[Complete dev environment setup]

## Production Deployment
[Kubernetes deployment steps]

## Troubleshooting
[Common issues and solutions]

## Environment Variables
[Complete list with descriptions and example values]

Make it clear and easy to follow for new developers.
```

---

## Phase 5: Create Test Plan

### Step 5.1: Generate Comprehensive Test Plan

**Prompt to Claude:**
```
Create a comprehensive test plan for this application.

Generate TEST-PLAN.md with:

## 1. Test Strategy Overview
- Testing objectives
- Risk areas to prioritize
- Test types to implement

## 2. Unit Tests

### Normalizer Service
| Test ID | Description | Function | Priority |
|---------|-------------|----------|----------|
[Generate tests for each function]

### Processor Service
[Same format]

### Aggregator Service
[Same format]

## 3. Integration Tests
| Test ID | Description | Services Involved | Priority |
|---------|-------------|-------------------|----------|
[Generate integration test cases]

## 4. End-to-End Tests
| Test ID | User Story | Steps | Expected Result |
|---------|------------|-------|-----------------|
[Generate E2E test scenarios]

## 5. Performance Tests
[Load testing scenarios]

## 6. Security Tests
[Security test cases]

## 7. Test Data Requirements
[Required test fixtures and data]

## 8. Coverage Goals
[Target metrics]

Prioritize P0 tests for critical paths.
```

### Step 5.2: Identify Testing Gaps

**Prompt to Claude:**
```
Analyze the current test coverage (if any) and identify gaps.

1. List all existing tests
2. Calculate current coverage (estimate)
3. Identify untested code paths
4. Prioritize missing tests by risk
5. Estimate effort to reach 80% coverage

Create a TESTING-GAPS.md with actionable items.
```

---

## Phase 6: Implement Tests

### Step 6.1: Set Up Test Environment

**Prompt to Claude:**
```
Help me set up the test environment:

1. Create pytest.ini configuration
2. Create conftest.py with fixtures
3. Set up test database configuration
4. Configure Kafka test containers
5. Create mock services for external dependencies

Ensure tests can run in CI/CD pipeline.
```

### Step 6.2: Generate Unit Tests

**Prompt to Claude:**
```
Generate unit tests for the Processor Service.

Focus on the sentiment analysis function in processor/main.py:

Requirements:
- Use pytest
- Use fixtures for test data
- Mock Kafka consumer/producer
- Mock HuggingFace transformers
- Test cases:
  - Valid positive sentiment
  - Valid negative sentiment
  - Valid neutral sentiment
  - Empty input handling
  - Special characters handling
  - Long text truncation
  - GPT fallback trigger
  - GPT fallback failure handling

Create tests/test_processor.py with all tests.
```

### Step 6.3: Generate Integration Tests

**Prompt to Claude:**
```
Generate integration tests for the complete data pipeline.

Test the flow: Upload → Normalize → Process → Aggregate

Requirements:
- Use Docker Compose test environment
- Real Kafka (not mocked)
- Test database
- Test cases:
  - Complete happy path
  - Invalid file format
  - Malformed data handling
  - Kafka message ordering
  - Concurrent uploads
  - Service failure recovery

Create tests/integration/test_pipeline.py
```

### Step 6.4: Generate E2E Tests

**Prompt to Claude:**
```
Generate E2E tests for the frontend user flows.

Requirements:
- Use Playwright or Selenium
- Test against running application
- Test cases:
  - File upload success flow
  - View results flow
  - Export results flow
  - Error display for invalid file
  - Loading states

Create tests/e2e/test_frontend.py with Page Object Model.
```

---

## Phase 7: Validate and Refine

### Step 7.1: Review Generated Tests

**Prompt to Claude:**
```
Review all generated tests against these criteria:

1. **Assertion Quality**
   - Are assertions meaningful?
   - Do they test the right things?

2. **Edge Cases**
   - Are boundary conditions tested?
   - Are error cases covered?

3. **Isolation**
   - Is each test independent?
   - Is state properly cleaned up?

4. **Readability**
   - Are test names descriptive?
   - Is the purpose clear?

5. **Maintainability**
   - Are there magic numbers?
   - Is there code duplication?

For each issue found, provide a fix.
```

### Step 7.2: Run Tests and Fix Issues

```bash
# Run unit tests
pytest tests/test_processor.py -v

# If tests fail, ask Claude:
```

**Prompt to Claude:**
```
These tests are failing:

[paste error output]

Please:
1. Diagnose the issue
2. Determine if it's a test bug or code bug
3. Provide the fix
4. Explain what was wrong
```

### Step 7.3: Check Coverage

```bash
# Run with coverage
pytest --cov=processor --cov=normalizer --cov-report=html

# Ask Claude to analyze
```

**Prompt to Claude:**
```
Coverage report shows 65% coverage.

Uncovered lines:
- processor/main.py: 45-52, 78-85
- normalizer/main.py: 112-120

Generate tests to cover these lines and explain what they do.
```

---

## Phase 8: Document Everything

### Step 8.1: Update README

**Prompt to Claude:**
```
Update the project README with:

1. Testing section
   - How to run tests
   - Coverage targets
   - CI/CD integration

2. Development section
   - Setup instructions
   - Code style guide
   - Contribution process

3. Architecture section
   - Link to ARCHITECTURE.md
   - Quick overview diagram

Keep it concise but complete.
```

### Step 8.2: Create PR with All Changes

**Prompt to Claude:**
```
Help me create a PR with all the documentation and tests we generated.

1. Stage relevant files
2. Create commit with proper message
3. Create PR with:
   - Summary of changes
   - Testing performed
   - Documentation added
```

---

## Complete Session Transcript Example

Below is a condensed example of an actual Claude Code session:

```
User: I need to understand and test the customer-feedback-app repository.

Claude: I'll help you understand and create tests for this application. Let me start by exploring the codebase.

[Claude reads README.md, docker-compose.yml, and key source files]

Based on my analysis, this is a customer feedback analysis system with these components:

**Architecture:**
- Frontend: File upload interface
- Normalizer: Converts various file formats to standard schema
- Processor: NLP sentiment analysis + optional GPT enhancement
- Aggregator: Stores and queries results

[Claude generates Mermaid diagram]

The most critical path to test is the upload → process → results flow.

User: Generate a complete test plan.

Claude: I'll create a comprehensive test plan based on the architecture.

[Claude creates TEST-PLAN.md with 45 test cases prioritized by risk]

The P0 tests cover:
1. File upload validation
2. Kafka message processing
3. Sentiment analysis accuracy
4. Result aggregation

User: Implement the P0 unit tests.

Claude: I'll generate unit tests for the highest priority items.

[Claude creates tests/test_processor.py with 15 tests]
[Claude creates tests/test_normalizer.py with 12 tests]

Let me also create the test fixtures and configuration.

[Claude creates conftest.py with shared fixtures]
[Claude creates pytest.ini with proper configuration]

User: Run the tests and fix any issues.

Claude: Let me run the tests.

[Tests run, 2 failures detected]

The failures are due to:
1. Missing mock for Kafka producer
2. Incorrect assertion in sentiment test

[Claude fixes both issues and re-runs]

All 27 tests passing. Coverage at 72%.

User: What tests should I add to reach 80% coverage?

Claude: Based on the coverage report, these areas need tests:

1. GPT fallback error handling (lines 78-85)
2. Kafka connection retry logic (lines 45-52)
3. File format edge cases in normalizer

[Claude generates 8 additional tests]

With these tests, coverage should reach 82%.

User: Create a PR with all this work.

Claude: I'll create a comprehensive PR.

[Claude stages files, creates commit, pushes branch, creates PR]

PR created: https://github.com/Ai-Whisperers/customer-feedback-app/pull/42

Title: Add comprehensive test suite and documentation

Summary:
- Added architecture documentation
- Created test plan with 45 test cases
- Implemented 35 unit/integration tests
- Achieved 82% code coverage
- Added CI/CD test configuration
```

---

## Key Takeaways

1. **Start with Authentication** - Always verify GitHub CLI access before starting
2. **Create Context First** - CLAUDE.md helps AI understand your goals
3. **Explore Before Implementing** - Let AI map the codebase before writing tests
4. **Iterate on Quality** - Review, refine, and improve AI outputs
5. **Document as You Go** - Generate docs alongside tests
6. **Validate Everything** - Run tests, check coverage, fix issues

---

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| `gh auth` fails | Check internet, retry with `--web` flag |
| Can't access org repos | Request org access in GitHub settings |
| Claude generates wrong framework | Specify in CLAUDE.md |
| Tests won't run | Check dependencies in requirements.txt |
| Low coverage | Ask Claude to identify uncovered paths |
| Flaky tests | Request deterministic approaches |

---

*This workflow demonstrates the complete process of using AI to understand and test a private codebase, from initial access through documented, tested contributions.*
