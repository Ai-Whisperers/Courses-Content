# Glossary

Key terms and definitions for AI-assisted test automation.

---

## A

### AAA Pattern
**Arrange, Act, Assert** - A test structure pattern where you first set up test data (Arrange), execute the code being tested (Act), then verify the results (Assert).

### Agentic Pattern
A design pattern for AI workflows where the AI acts as an autonomous agent, making decisions and taking actions to accomplish complex tasks.

### API (Application Programming Interface)
A set of protocols and tools for building software applications. In testing, usually refers to REST APIs that are tested with tools like Supertest.

### Assertion
A statement that checks if a condition is true. In tests, assertions verify expected outcomes. Example: `expect(result).toBe(5)`.

---

## B

### Boundary Value Analysis
A test design technique that focuses on testing at the edges of input ranges. For a field accepting 1-100, test 0, 1, 100, and 101.

### Branch Coverage
A coverage metric that measures whether each branch (true/false) of conditional statements has been executed.

---

## C

### CI/CD
**Continuous Integration/Continuous Deployment** - Practices of automatically building, testing, and deploying code changes.

### CLAUDE.md
A markdown file that provides project context to Claude, including tech stack, conventions, and testing requirements.

### Code Coverage
A metric showing the percentage of code executed during tests. Types include line coverage, branch coverage, and function coverage.

### Context Engineering
The practice of providing AI tools with relevant information to improve their outputs, including project structure, conventions, and examples.

---

## D

### Dependency
An external module or service that code relies on. In testing, dependencies are often mocked.

### Describe Block
A way to group related tests in Jest/Mocha. Example: `describe('UserService', () => { ... })`.

---

## E

### E2E (End-to-End) Test
A test that validates complete user workflows from start to finish, often using a browser automation tool like Playwright.

### Edge Case
A problem or situation that occurs only at the extreme boundaries of normal operating parameters.

### Equivalence Partitioning
A test design technique that divides input into groups (partitions) where all values in a group should behave the same way.

---

## F

### Fixture
Test data or setup that's shared across multiple tests. In pytest, fixtures are created with the `@pytest.fixture` decorator.

### Flaky Test
A test that sometimes passes and sometimes fails without code changes, often due to timing issues or test isolation problems.

---

## G

### GitHub Actions
A CI/CD platform integrated into GitHub for automating workflows like testing and deployment.

### GitHub CLI (gh)
A command-line tool for interacting with GitHub repositories, issues, and pull requests.

---

## H

### Happy Path
The default scenario with no exceptions or errors. Testing the happy path means testing when everything works correctly.

### Hook
In testing, functions that run before or after tests (e.g., `beforeEach`, `afterAll`). In CI, scripts that run at specific events.

---

## I

### Integration Test
A test that verifies how multiple components work together, such as an API endpoint with a database.

### Isolation
The practice of ensuring tests don't affect each other. Each test should be able to run independently.

### Iterative Refinement
The process of improving AI output through multiple rounds of feedback and regeneration.

---

## J

### Jest
A JavaScript testing framework by Facebook, commonly used for unit and integration testing.

### JWT (JSON Web Token)
A compact, URL-safe token format used for authentication and information exchange.

---

## L

### Lint/Linting
Static code analysis to flag programming errors, bugs, stylistic errors, and suspicious constructs.

### Locator
In Playwright/Selenium, a way to find elements on a page (e.g., by CSS selector, test ID, or text content).

---

## M

### Mock
A simulated object that mimics the behavior of real objects in controlled ways. Used to isolate the unit under test.

### Mutation Testing
A technique that introduces small changes (mutations) to code to verify that tests detect them.

---

## N

### Node.js
A JavaScript runtime that allows running JavaScript outside the browser, commonly used for backend development and tooling.

---

## P

### Page Object Model (POM)
A design pattern for E2E tests where each page is represented by a class with methods for interactions and selectors for elements.

### Parallelization
Running multiple tasks simultaneously. In testing, running multiple test files at once to reduce total execution time.

### Playwright
A browser automation framework by Microsoft for E2E testing, supporting Chromium, Firefox, and WebKit.

### Prompt
The input text given to an AI model. Effective prompts include context, task, requirements, and format.

### Prompt Chaining
Breaking a complex task into a sequence of simpler prompts, where each prompt builds on the previous output.

### pytest
A popular Python testing framework known for its simplicity and powerful features.

---

## Q

### Quality Gate
A checkpoint in CI/CD that code must pass to proceed. Examples: test pass rate, code coverage threshold.

---

## R

### RAG (Retrieval-Augmented Generation)
An AI pattern that retrieves relevant information from external sources before generating a response.

### Reflection Pattern
An agentic pattern where AI reviews and improves its own output through self-critique.

### Regression Test
A test that verifies previously working functionality still works after code changes.

---

## S

### Spy
A mock that records information about how it was called, useful for verifying interactions.

### Stub
A simple mock that returns predetermined responses without complex logic.

### Supertest
A library for testing HTTP servers in Node.js, commonly used with Express applications.

---

## T

### Test Case
A specific set of conditions and inputs used to test a particular aspect of code functionality.

### Test Double
A generic term for any object that stands in for a real object during testing (includes mocks, stubs, spies).

### Test Plan
A document describing the scope, approach, resources, and schedule of testing activities.

### Test Suite
A collection of test cases that are run together.

### TDD (Test-Driven Development)
A development approach where tests are written before the code that makes them pass.

---

## U

### Unit Test
A test that verifies a single unit of code (usually a function or class) in isolation from its dependencies.

---

## W

### Workflow
In GitHub Actions, a configurable automated process that runs one or more jobs. Defined in YAML files.

---

## Y

### YAML
A human-readable data serialization format used for configuration files, including GitHub Actions workflows.

---

## Common Abbreviations

| Abbreviation | Meaning |
|--------------|---------|
| AAA | Arrange, Act, Assert |
| API | Application Programming Interface |
| CI | Continuous Integration |
| CD | Continuous Deployment |
| CLI | Command Line Interface |
| E2E | End-to-End |
| JWT | JSON Web Token |
| POM | Page Object Model |
| PR | Pull Request |
| QA | Quality Assurance |
| RAG | Retrieval-Augmented Generation |
| TDD | Test-Driven Development |
| UI | User Interface |

---

*Refer back to this glossary whenever you encounter unfamiliar terms.*
