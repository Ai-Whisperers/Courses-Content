# Core Module 2: Context Engineering & Prompt Mastery
## FPUNA Summer 2026 - Week 2

**Duration**: 1 week (10 hours total)  
**Tool Focus**: OpenCode  
**Prerequisites**: Module 1 completed

---

## Module Overview

Context is the foundation of effective AI-augmented development. In this module, you'll master the art of providing the right context to OpenCode, enabling it to generate accurate, production-ready code that matches your project's conventions and requirements.

### Learning Objectives

By the end of this week, you will be able to:

1. **Understand** the three-level context hierarchy in OpenCode
2. **Create** effective `.opencode` project configuration files
3. **Write** prompts that produce accurate, context-aware results
4. **Apply** iterative refinement techniques for better outputs
5. **Design** context strategies for different project types

---

## Why Context Engineering Matters

```
❌ Poor Context → Vague Code → Multiple Iterations → Frustration
✅ Good Context → Accurate Code → Fewer Iterations → Productivity
```

### Real-World Impact

| Without Context | With Context |
|----------------|-------------|
| Generic solutions that don't match your stack | Solutions tailored to your exact tech stack |
| Code that violates your conventions | Code that follows your team's style |
| Incomplete implementations | Complete, production-ready implementations |
| 10+ iterations to get it right | 1-2 iterations for perfect code |

---

## 2.1 The Three-Level Context Hierarchy

OpenCode operates at three distinct context levels. Understanding and mastering each level is crucial for effective AI-augmented development.

### Level 1: Project Context (Persistent)

**What it is**: Persistent information that applies to your entire project

**Stored in**: `.opencode` file in project root

**Contains**:
- Project description and goals
- Technology stack and versions
- Architectural patterns
- Coding conventions and style guides
- Testing requirements
- Security considerations
- Build and deployment information

**Lifespan**: Permanent (until you modify it)

**Example Use Cases**:
- "What's our tech stack?"
- "What testing framework do we use?"
- "What are our code conventions?"

---

### Level 2: Session Context (Temporary)

**What it is**: Information accumulated during your current conversation

**Maintained by**: OpenCode automatically

**Contains**:
- Files you've asked OpenCode to read
- Previous messages in the conversation
- Established understanding from the session
- Recent code changes discussed

**Lifespan**: Current session only (resets when you start a new conversation)

**Example Use Cases**:
- "Continue improving the function we just created"
- "Apply the same pattern to the user service"
- "Fix the issue we discussed earlier"

---

### Level 3: Prompt Context (Immediate)

**What it is**: Specific information you provide in your current message

**Provided in**: Your message to OpenCode

**Contains**:
- Code snippets to analyze or improve
- Specific requirements for the task
- Expected output format
- Constraints and boundaries
- Error messages to debug

**Lifespan**: Single message only

**Example Use Cases**:
- "Generate tests for this function: [paste code]"
- "Review this API endpoint for security issues"
- "Debug this error: [paste error message]"

---

### Visual Representation

```
┌────────────────────────────────────────────────┐
│         PROJECT CONTEXT (Persistent)           │
│                                                 │
│    .opencode configuration file                │
│    - Tech stack                                │
│    - Conventions                               │
│    - Architecture                              │
│                                                 │
├────────────────────────────────────────────────┤
│         SESSION CONTEXT (Temporary)            │
│                                                 │
│    OpenCode's memory of this conversation      │
│    - Files read                                │
│    - Previous messages                         │
│    - Established understanding                 │
│                                                 │
├────────────────────────────────────────────────┤
│          PROMPT CONTEXT (Immediate)            │
│                                                 │
│    Your current message                        │
│    - Code snippets                             │
│    - Specific requirements                     │
│    - Expected format                           │
│                                                 │
└────────────────────────────────────────────────┘
```

---

## 2.2 Creating `.opencode` Configuration Files

### What is `.opencode`?

The `.opencode` file is your project's "instruction manual" for OpenCode. It provides persistent context that OpenCode references in every interaction, ensuring consistency and accuracy across all AI-generated code.

**Think of it as**: Your project's DNA that OpenCode reads to understand how to work with your codebase.

---

### File Location

Place `.opencode` in your project root directory:

```
your-project/
├── .opencode          ← Place here
├── src/
├── tests/
├── package.json
└── README.md
```

---

### Universal Template

```markdown
# Project: [Project Name]

## Overview
[2-3 sentence description of what this project does and its main purpose]

## Technology Stack

### Frontend
- [Framework] - [Version]
- [State Management] - [Version]
- [Styling] - [Version]

### Backend
- [Runtime/Language] - [Version]
- [Framework] - [Version]
- [Database] - [Version]

### Testing
- [Unit Testing Framework] - [Version]
- [Integration Testing] - [Version]
- [E2E Testing Framework] - [Version]

### DevOps
- [CI/CD Platform]
- [Deployment Platform]
- [Monitoring Tools]

## Project Architecture

### Directory Structure
```
[Paste your project structure here]
```

### Key Directories
- `[directory name]` - [Purpose and what it contains]
- `[directory name]` - [Purpose and what it contains]

### Design Patterns
- [Pattern 1]: [How and where it's used]
- [Pattern 2]: [How and where it's used]

## Code Conventions

### Naming Conventions
- Files: [convention] (e.g., kebab-case, PascalCase)
- Functions: [convention] (e.g., camelCase)
- Variables: [convention]
- Constants: [convention]
- Classes: [convention]

### Code Style
- [Style rule 1]
- [Style rule 2]
- Formatter: [Tool name and config]
- Linter: [Tool name and config]

### Import Organization
- [Import rule 1]
- [Import rule 2]

### Comments and Documentation
- [When to comment]
- [Documentation style]

## Testing Requirements

### Unit Tests
- Framework: [Name]
- Location: [Where tests live]
- Naming: [Convention]
- Coverage: [Target percentage]

### Integration Tests
- Framework: [Name]
- Location: [Where tests live]
- Naming: [Convention]

### E2E Tests
- Framework: [Name]
- Location: [Where tests live]
- Naming: [Convention]

### Test Structure
- Pattern: [e.g., AAA - Arrange, Act, Assert]
- Mocking strategy: [When and how to mock]
- Test data: [How to generate test data]

## Important Files

- `[file path]` - [What it does and why it's important]
- `[file path]` - [What it does and why it's important]
- `[file path]` - [What it does and why it's important]

## Current Focus

[What you're currently working on]
[Specific areas that need attention]
[Any special instructions for this sprint/week]

## OpenCode Instructions

[Any specific instructions for how OpenCode should behave]
[Preferences for code generation]
[Things to always do or never do]
```

---

### Example 1: E-Commerce Platform (Full-Stack)

```markdown
# Project: MarketPlace Paraguay

## Overview
Full-stack e-commerce platform for Paraguayan artisans to sell their products online. Includes product catalog, shopping cart, payment processing with local payment providers, and admin dashboard.

## Technology Stack

### Frontend
- Next.js 14 - React framework with App Router
- TypeScript 5.2 - Type safety
- Tailwind CSS 3.4 - Styling
- Zustand - State management
- React Query - Server state management

### Backend
- Next.js API Routes - Backend endpoints
- Prisma 5.x - ORM
- PostgreSQL 16 - Database
- NextAuth.js - Authentication
- Stripe + Bancard - Payment processing

### Testing
- Vitest - Unit and integration tests
- React Testing Library - Component tests
- Playwright - E2E tests

### DevOps
- GitHub Actions - CI/CD
- Vercel - Deployment
- Sentry - Error tracking

## Project Architecture

### Directory Structure
```
marketplace-py/
├── app/              # Next.js 14 App Router
│   ├── (auth)/       # Auth pages
│   ├── (shop)/       # Shop pages
│   ├── admin/        # Admin dashboard
│   └── api/          # API routes
├── components/       # React components
│   ├── ui/           # Reusable UI components
│   ├── features/     # Feature-specific components
│   └── layouts/      # Layout components
├── lib/              # Utilities and helpers
│   ├── db/           # Database utilities
│   ├── auth/         # Auth utilities
│   └── validation/   # Zod schemas
├── prisma/           # Database schema
└── tests/            # All test files
    ├── unit/
    ├── integration/
    └── e2e/
```

### Key Directories
- `app/` - Next.js App Router pages and API routes
- `components/ui/` - Shadcn UI components (reusable)
- `components/features/` - Feature-specific components (not reusable)
- `lib/` - Shared utilities, database helpers, validation schemas
- `prisma/` - Database schema and migrations

### Design Patterns
- **Server Components**: Use by default for better performance
- **Client Components**: Only when interactivity is needed (use 'use client')
- **API Route Handlers**: Follow REST conventions
- **Repository Pattern**: For database access (in `lib/db/`)

## Code Conventions

### Naming Conventions
- Files: kebab-case (e.g., `user-profile.tsx`)
- Components: PascalCase (e.g., `UserProfile`)
- Functions: camelCase (e.g., `getUserById`)
- Variables: camelCase (e.g., `isLoggedIn`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- Types/Interfaces: PascalCase with 'I' prefix for interfaces (e.g., `IUser`)

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use named exports (not default exports)
- Destructure props in components
- Use absolute imports with `@/` alias
- Formatter: Prettier (see .prettierrc)
- Linter: ESLint (see .eslintrc.json)

### Import Organization
1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and helpers
5. Types
6. Styles

### Comments and Documentation
- JSDoc comments for all exported functions
- Comment "why", not "what"
- Use TODO comments with JIRA ticket numbers
- Document complex algorithms

## Testing Requirements

### Unit Tests
- Framework: Vitest
- Location: `tests/unit/`
- Naming: `[filename].test.ts`
- Coverage: Minimum 80%
- Focus: Business logic, utilities, helpers

### Integration Tests
- Framework: Vitest + MSW for API mocking
- Location: `tests/integration/`
- Naming: `[feature].integration.test.ts`
- Test: Component + API interactions

### E2E Tests
- Framework: Playwright
- Location: `tests/e2e/`
- Naming: `[user-flow].spec.ts`
- Test: Critical user flows (checkout, registration, etc.)

### Test Structure
- Pattern: AAA (Arrange, Act, Assert)
- Mocking: Mock external APIs, NOT database in integration tests
- Test data: Use factories from `tests/factories/`
- Cleanup: Always clean up test data in afterEach hooks

## Important Files

- `app/layout.tsx` - Root layout with providers
- `lib/db/prisma.ts` - Prisma client singleton
- `lib/auth/auth-config.ts` - NextAuth configuration
- `lib/validation/schemas.ts` - Zod validation schemas
- `prisma/schema.prisma` - Database schema
- `middleware.ts` - Next.js middleware for auth

## Current Focus

**Sprint 3: Payment Integration**
- Integrating Bancard payment gateway (Paraguayan provider)
- Implementing payment flow with retry logic
- Adding payment webhook handlers
- Testing payment scenarios (success, failure, pending)

**Testing Priority**: 
- Unit tests for payment utility functions
- Integration tests for payment API routes
- E2E tests for complete checkout flow

## OpenCode Instructions

- Always use TypeScript with strict type checking
- Prefer Server Components unless client interactivity is required
- Include error handling in all async functions
- Follow the repository pattern for database access
- Generate tests alongside implementation code
- Use Zod for runtime validation
- Include JSDoc comments for complex functions
- When generating E2E tests, use data-testid attributes
```

---

### Example 2: Python Data Analysis Project

```markdown
# Project: Customer Feedback Analyzer

## Overview
Data processing pipeline that analyzes customer feedback from multiple sources (CSV, Excel, JSON), performs sentiment analysis using AI, and generates comprehensive reports with insights and recommendations.

## Technology Stack

### Core
- Python 3.11 - Programming language
- Pandas 2.1 - Data manipulation
- Polars 0.19 - High-performance dataframes
- Transformers 4.35 - NLP and sentiment analysis

### API
- FastAPI 0.104 - REST API framework
- Pydantic 2.5 - Data validation
- SQLAlchemy 2.0 - ORM

### Storage
- PostgreSQL 16 - Primary database
- Redis 7.2 - Caching layer

### Testing
- pytest 7.4 - Test framework
- pytest-asyncio - Async test support
- hypothesis - Property-based testing
- pytest-cov - Coverage reporting

### DevOps
- Docker - Containerization
- Docker Compose - Multi-container orchestration
- GitHub Actions - CI/CD
- Ruff - Linter and formatter

## Project Architecture

### Directory Structure
```
feedback-analyzer/
├── src/
│   ├── normalizer/      # Data normalization
│   ├── processor/       # NLP and analysis
│   ├── aggregator/      # Results storage
│   └── api/             # REST API
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── scripts/             # Utility scripts
├── docker/              # Docker configurations
└── docs/                # Documentation
```

### Key Directories
- `src/normalizer/` - Converts various file formats to standard schema
- `src/processor/` - Sentiment analysis and NLP processing
- `src/aggregator/` - Stores results and provides query interface
- `src/api/` - FastAPI endpoints for external access
- `tests/fixtures/` - Shared test fixtures and factories

### Design Patterns
- **Factory Pattern**: For creating test data (tests/factories/)
- **Repository Pattern**: For database access (src/*/repositories/)
- **Service Layer**: Business logic (src/*/services/)
- **Dependency Injection**: Using FastAPI's dependency system

## Code Conventions

### Naming Conventions
- Files: snake_case (e.g., `sentiment_analyzer.py`)
- Functions: snake_case (e.g., `analyze_sentiment`)
- Variables: snake_case (e.g., `feedback_data`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_BATCH_SIZE`)
- Classes: PascalCase (e.g., `FeedbackProcessor`)
- Private methods: Leading underscore (e.g., `_validate_data`)

### Code Style
- Type hints on ALL function signatures
- Docstrings for all public functions (Google style)
- Max line length: 120 characters
- Formatter: Ruff (configured in pyproject.toml)
- Linter: Ruff with strict settings
- Use f-strings for formatting
- Prefer dataclasses over dictionaries

### Import Organization (enforced by Ruff)
1. Standard library imports
2. Third-party imports
3. Local application imports
4. Relative imports

### Comments and Documentation
- Google-style docstrings for all public functions
- Type hints provide inline documentation
- Comment complex algorithms and business logic
- Use TODO comments with issue numbers

## Testing Requirements

### Unit Tests
- Framework: pytest
- Location: `tests/unit/`
- Naming: `test_[module]_[function]_[scenario].py`
- Coverage: Minimum 85%
- Focus: Individual functions and methods

### Integration Tests
- Framework: pytest + pytest-asyncio
- Location: `tests/integration/`
- Naming: `test_[feature]_integration.py`
- Test: Multiple components working together
- Use real database (test container)

### Property-Based Tests
- Framework: Hypothesis
- Location: `tests/property/`
- Use for: Data validation, edge cases

### Test Structure
- Pattern: AAA (Arrange, Act, Assert)
- Fixtures: Use conftest.py for shared fixtures
- Factories: Use factory_boy for test data generation
- Parametrize: Use @pytest.mark.parametrize for multiple scenarios
- Mocking: Mock external APIs, NOT internal services

### Test Data
- Use factories from `tests/factories/`
- Sample files in `tests/fixtures/files/`
- Always use meaningful test data (not "test1", "test2")

## Important Files

- `src/processor/sentiment.py` - Core sentiment analysis
- `src/normalizer/schemas.py` - Pydantic data schemas
- `src/api/main.py` - FastAPI application entry
- `conftest.py` - Shared pytest fixtures
- `pyproject.toml` - Project configuration
- `docker-compose.yml` - Local development environment

## Current Focus

**Milestone: Improve Test Coverage**
- Current coverage: 72%
- Target: 85%+
- Priority areas:
  1. `src/processor/sentiment.py` - sentiment analysis edge cases
  2. `src/normalizer/converters.py` - file format handling
  3. `src/api/endpoints/` - API error handling

**Testing Strategy**:
- Use Hypothesis for data validation functions
- Add integration tests for end-to-end flows
- Focus on error handling and edge cases

## OpenCode Instructions

- Always include type hints in function signatures
- Generate Google-style docstrings for all functions
- Use dataclasses with type hints instead of dictionaries
- Follow the repository pattern for database operations
- Generate pytest tests with clear AAA structure
- Use factories for test data (never hardcoded values)
- Include error handling with specific exception types
- When generating async code, include proper error handling
- Prefer composition over inheritance
- Use Pydantic models for validation
```

---

## 2.3 The Anatomy of Effective Prompts

### The Formula

```
[Context] + [Task] + [Requirements] + [Format] = Effective Prompt
```

### Component Breakdown

1. **Context**: What OpenCode needs to know
   - Relevant code
   - File locations
   - Current state

2. **Task**: What you want OpenCode to do
   - Action verb (generate, review, refactor, debug)
   - Specific target (function, class, module)

3. **Requirements**: Constraints and specifications
   - Must-haves
   - Must-not-haves
   - Edge cases to handle

4. **Format**: How you want the output
   - Code structure
   - Comment style
   - File organization

---

### Bad vs Good Examples

#### Example 1: Generate Tests

**❌ Bad Prompt**:
```
write tests
```

**Why it's bad**:
- No context about what to test
- No requirements
- No format specification
- OpenCode has to guess everything

---

**✅ Good Prompt**:
```
Generate pytest unit tests for the `process_feedback` function in `src/processor/sentiment.py`

Function to test:
async def process_feedback(feedback: FeedbackData) -> AnalysisResult

Requirements:
- Test successful analysis with valid feedback
- Test handling of empty feedback text
- Test handling of non-English text
- Test handling of very long text (>10000 chars)
- Test rate limiting behavior
- Mock the OpenAI API calls
- Use factories from tests/factories/feedback.py

Output format:
- File: tests/unit/processor/test_sentiment.py
- Structure: One test class per function
- Naming: test_[scenario]_[expected_result]
- Include docstrings explaining each test
- Use AAA pattern with comments
```

**Why it's good**:
- ✅ Specific function identified
- ✅ Clear requirements listed
- ✅ Testing scenarios specified
- ✅ Output format defined
- ✅ References existing factories

---

#### Example 2: Code Review

**❌ Bad Prompt**:
```
review this code
[paste 200 lines of code]
```

**Why it's bad**:
- No focus area
- Too much code at once
- No specific concerns
- No format for feedback

---

**✅ Good Prompt**:
```
Review the following authentication middleware for security issues:

Focus areas:
1. SQL injection vulnerabilities
2. Authentication bypass possibilities
3. Session management security
4. Error message information leakage
5. Rate limiting implementation

For each issue found, provide:
- Severity: Critical / High / Medium / Low
- Line number(s)
- Description of the vulnerability
- Specific code fix

Only include issues with High or Critical severity.

Code to review:
```typescript
[paste code here - max 50 lines]
```
```

**Why it's good**:
- ✅ Specific focus areas
- ✅ Clear output format
- ✅ Severity classification
- ✅ Limited code scope
- ✅ Actionable fixes requested

---

#### Example 3: Refactoring

**❌ Bad Prompt**:
```
make this better
```

**Why it's bad**:
- "Better" is subjective
- No specific goals
- No constraints
- No definition of success

---

**✅ Good Prompt**:
```
Refactor the `UserRepository` class to improve testability and maintainability

Current issues:
- Direct database calls in methods (hard to test)
- No dependency injection
- Mixed concerns (validation + data access)

Refactoring goals:
1. Extract validation logic to separate validator class
2. Inject database connection via constructor
3. Make all database methods mockable
4. Follow repository pattern strictly

Constraints:
- Don't change the public API (method signatures)
- Keep existing test coverage
- Use type hints for all parameters

Show:
1. The refactored class
2. The new validator class
3. How to update existing tests
```

**Why it's good**:
- ✅ Specific goals defined
- ✅ Problems identified
- ✅ Clear constraints
- ✅ Requests implementation plan
- ✅ Considers testing

---

## 2.4 Prompting Patterns for Common Tasks

### Pattern 1: Step-by-Step Implementation

**Use when**: Implementing complex features

**Template**:
```
I need to implement [feature]. Please work through this step-by-step:

1. First, analyze existing [related code/files]
2. Then, list what's already implemented
3. Identify what's missing
4. Propose an implementation approach
5. Finally, generate the code

Take it one step at a time and wait for my confirmation before proceeding.
```

**Example**:
```
I need to implement user authentication with JWT tokens. Please work through this step-by-step:

1. First, analyze the current auth-related files in src/auth/
2. Then, list what's already implemented
3. Identify what's missing compared to industry best practices
4. Propose an implementation approach with file structure
5. Finally, generate the authentication middleware code

Take it one step at a time and wait for my confirmation before proceeding.
```

---

### Pattern 2: Example-Driven Generation

**Use when**: You want consistent code style

**Template**:
```
Generate [code type] following this example format:

Example:
[paste example code]

Now generate similar code for [new scenario].
Maintain the same structure, naming conventions, and comment style.
```

**Example**:
```
Generate pytest tests following this example format:

Example:
```python
class TestUserService:
    """Tests for UserService class."""
    
    def test_create_user_with_valid_data_returns_user(self):
        """Test that creating a user with valid data returns a User object."""
        # Arrange
        user_data = UserFactory.build()
        service = UserService()
        
        # Act
        result = service.create_user(user_data)
        
        # Assert
        assert isinstance(result, User)
        assert result.email == user_data.email
```

Now generate similar tests for the ProductService.create_product method.
Maintain the same structure, naming conventions, and comment style.
```

---

### Pattern 3: Constraint-Based Generation

**Use when**: You need to enforce specific rules

**Template**:
```
Generate [code] with these constraints:

DO:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

DON'T:
- [Anti-pattern 1]
- [Anti-pattern 2]
- [Anti-pattern 3]

Focus on: [Specific scenarios]
```

**Example**:
```
Generate E2E tests for the checkout flow with these constraints:

DO:
- Use Playwright with TypeScript
- Use data-testid attributes for selectors
- Test on Chromium only
- Include setup and teardown hooks
- Use environment variables for test URLs

DON'T:
- Use XPath or CSS selectors
- Include visual regression tests
- Test on mobile viewports
- Hardcode URLs or credentials

Focus on:
1. Happy path: successful purchase
2. Error path: payment decline
3. Edge case: inventory sold out during checkout
```

---

### Pattern 4: Incremental Improvement

**Use when**: Refining existing code

**Template**:
```
The current implementation [description] has these issues:
- [Issue 1]
- [Issue 2]

Improve it by:
1. [Improvement 1]
2. [Improvement 2]
3. [Improvement 3]

Keep: [What should stay the same]
Change: [What should be different]
```

**Example**:
```
The current payment processing function works but has these issues:
- No retry logic for network failures
- Hardcoded timeout values
- Poor error messages
- No logging

Improve it by:
1. Add exponential backoff retry (max 3 attempts)
2. Use configurable timeouts from environment
3. Return descriptive error messages
4. Add structured logging with context

Keep: The function signature (API contract)
Change: Implementation details for reliability
```

---

## 2.5 Iterative Refinement Strategies

### The Refinement Process

```
Draft → Review → Refine → Improved Draft → Review → ... → Final
```

### When to Refine vs Start Fresh

| Scenario | Action | Reason |
|----------|--------|--------|
| Output is 70%+ correct | **Refine** | Faster to fix small issues |
| Structure is right, details wrong | **Refine** | Foundation is good |
| Missing pieces | **Refine** | Just add what's missing |
| Fundamental misunderstanding | **Start Fresh** | Cheaper to re-explain |
| Wrong approach entirely | **Start Fresh** | Foundation is flawed |
| More confusing than helpful | **Start Fresh** | Clearer to restart |

---

### Refinement Techniques

#### Technique 1: Additive Refinement

Add missing pieces without changing what exists.

**Example**:
```
User: Generate tests for the user service

OpenCode: [generates 5 basic tests]

User: Good start! Please also add:
- Test for duplicate email handling
- Test for password complexity requirements
- Test for user role assignment
- Use UserFactory for test data
```

---

#### Technique 2: Subtractive Refinement

Remove unnecessary parts and focus.

**Example**:
```
User: Generate comprehensive E2E tests for the entire application

OpenCode: [generates 50 tests covering everything]

User: This is too much. Let's narrow down to:
- Only the user registration flow
- Only happy path and one error scenario
- Remove setup/teardown for now
```

---

#### Technique 3: Format Refinement

Keep the logic, change the presentation.

**Example**:
```
User: [receives working code]

User: The code works but needs formatting improvements:
- Split into smaller functions (max 20 lines each)
- Add JSDoc comments to each function
- Group related functions into separate files
- Use more descriptive variable names
```

---

#### Technique 4: Quality Refinement

Improve code quality without changing functionality.

**Example**:
```
User: [receives working tests]

User: Improve these tests by:
- Adding more specific assertions (check exact values, not just types)
- Including edge cases (boundary values)
- Adding setup/teardown for database state
- Using more realistic test data
```

---

## Week 2 Practical Exercises

### Exercise 2.1: Create Your Project's `.opencode` File

**Objective**: Create an effective `.opencode` file for your capstone project

**Time**: 60 minutes

**Steps**:

1. **Choose or create a project** (options):
   - Use your existing project
   - Clone a starter template: [link to templates]
   - Start a new project from scratch

2. **Analyze your project**:
   - What is the tech stack?
   - What are the main directories?
   - What conventions do you follow?
   - What testing framework do you use?

3. **Create `.opencode` file** in project root with:
   - Project overview
   - Complete tech stack
   - Directory structure and purpose
   - Code conventions
   - Testing requirements
   - Important files
   - Current focus

4. **Test your configuration**:
   - Open OpenCode in your project
   - Ask: "What are our testing requirements?"
   - Verify OpenCode references your `.opencode` file

**Success Criteria**:
- ✅ `.opencode` file exists in project root
- ✅ Contains all required sections
- ✅ OpenCode correctly uses the context
- ✅ Specific to your project (not generic)

---

### Exercise 2.2: Prompt Transformation Challenge

**Objective**: Transform vague prompts into effective ones

**Time**: 45 minutes

**Instructions**: For each bad prompt, write an improved version using the formula: [Context] + [Task] + [Requirements] + [Format]

**Prompts to improve**:

1. **Bad**: "Write tests for the API"
   
   **Your improved version**: [Write here]

2. **Bad**: "Fix the bug in the authentication"
   
   **Your improved version**: [Write here]

3. **Bad**: "Make the code better"
   
   **Your improved version**: [Write here]

4. **Bad**: "Add error handling"
   
   **Your improved version**: [Write here]

5. **Bad**: "Document this function"
   
   **Your improved version**: [Write here]

**Success Criteria**:
- ✅ Each improved prompt has all 4 components
- ✅ Specific and actionable
- ✅ Clear output format specified
- ✅ Includes relevant constraints

---

### Exercise 2.3: Iterative Test Generation

**Objective**: Practice iterative refinement to create production-ready tests

**Time**: 90 minutes

**Scenario**: You need to create comprehensive tests for a user registration function.

**Steps**:

1. **Start with a minimal prompt**:
   ```
   Generate tests for user registration
   ```

2. **Review the output** and identify:
   - What's missing?
   - What's not quite right?
   - What could be improved?

3. **First refinement** - Add more requirements:
   ```
   Good start! Please also add:
   - Test for duplicate email
   - Test for weak password
   - Test for missing required fields
   - Use UserFactory for test data
   ```

4. **Second refinement** - Improve structure:
   ```
   Better! Now let's improve the organization:
   - Group tests into describe blocks:
     * Input Validation
     * Business Rules
     * Database Operations
   - Add setup/teardown hooks
   - Use more descriptive test names
   ```

5. **Final refinement** - Polish:
   ```
   Almost there! Final improvements:
   - Add comments explaining complex assertions
   - Include edge cases (empty strings, special characters)
   - Add performance check (registration should complete in <100ms)
   ```

**Success Criteria**:
- ✅ Tests cover all scenarios
- ✅ Well-organized structure
- ✅ Clear and descriptive names
- ✅ Production-ready quality
- ✅ Achieved through iteration (not one prompt)

---

### Exercise 2.4: Context Hierarchy Challenge

**Objective**: Understand when to use each context level

**Time**: 30 minutes

**Instructions**: For each scenario, identify which context level(s) to use and explain why.

**Scenarios**:

1. **Scenario**: You want OpenCode to follow your team's naming conventions for all generated code.
   
   **Context Level**: [Your answer]
   
   **Why**: [Explanation]

2. **Scenario**: You want to debug a specific error message you just encountered.
   
   **Context Level**: [Your answer]
   
   **Why**: [Explanation]

3. **Scenario**: You want to continue refactoring the function you discussed 3 messages ago.
   
   **Context Level**: [Your answer]
   
   **Why**: [Explanation]

4. **Scenario**: You want OpenCode to know what testing framework your entire project uses.
   
   **Context Level**: [Your answer]
   
   **Why**: [Explanation]

5. **Scenario**: You want to generate tests for a specific function you just pasted.
   
   **Context Level**: [Your answer]
   
   **Why**: [Explanation]

**Success Criteria**:
- ✅ Correct context level identified for each scenario
- ✅ Clear explanation of reasoning
- ✅ Understanding of when each level is appropriate

---

## Knowledge Check Quiz

Test your understanding of context engineering:

1. **What are the three levels of context in OpenCode?**
   - a) File, Function, Variable
   - b) Project, Session, Prompt
   - c) Local, Global, Universal
   - d) Basic, Intermediate, Advanced

2. **Where should you place the `.opencode` configuration file?**
   - a) In the `.opencode/` directory
   - b) In the project root
   - c) In the `config/` directory
   - d) Anywhere in the project

3. **What are the four components of an effective prompt?**
   - a) Greeting, Question, Thanks, Signature
   - b) Context, Task, Requirements, Format
   - c) Input, Process, Output, Feedback
   - d) Problem, Solution, Test, Deploy

4. **When should you start fresh instead of refining?**
   - a) When output is 70% correct
   - b) When structure is right but details are wrong
   - c) When there's a fundamental misunderstanding
   - d) When you need to add missing pieces

5. **Which prompting pattern is best for implementing complex features?**
   - a) Example-Driven
   - b) Constraint-Based
   - c) Step-by-Step
   - d) Format-Specific

**Answer Key**: [1-b, 2-b, 3-b, 4-c, 5-c]

---

## Week 2 Summary

This week, you mastered context engineering for OpenCode:

### Key Concepts
- ✅ Three-level context hierarchy (Project, Session, Prompt)
- ✅ `.opencode` configuration files for persistent context
- ✅ The anatomy of effective prompts
- ✅ Four common prompting patterns
- ✅ Iterative refinement strategies

### Skills Developed
- ✅ Create comprehensive project configurations
- ✅ Write specific, actionable prompts
- ✅ Refine outputs through iteration
- ✅ Choose the appropriate context level for each task

### Practical Applications
- ✅ Your project now has a complete `.opencode` file
- ✅ You can generate accurate, context-aware code
- ✅ You understand how to refine outputs efficiently
- ✅ You can troubleshoot context-related issues

---

## Next Steps

**Next Week**: Module 3 - Working with Private Repositories

You'll learn how to:
- Authenticate OpenCode with GitHub
- Grant access to private repositories
- Document existing codebases
- Navigate and understand large projects with AI assistance

---

## Additional Resources

### Official Documentation
- [OpenCode Context Guide](https://opencode.dev/docs/context)
- [Prompt Engineering Best Practices](https://opencode.dev/docs/prompting)

### Community Resources
- [`.opencode` Templates Repository](https://github.com/opencode/templates)
- [Prompting Patterns Collection](https://github.com/opencode/patterns)

### Video Tutorials
- [Context Engineering Masterclass](https://youtube.com/watch?v=...)
- [Building Effective .opencode Files](https://youtube.com/watch?v=...)

---

**Module Status**: ✅ Week 2 Complete

**Next Module**: [Module 3: Working with Private Repositories](./CORE-MODULE-03-DRAFT.md)
