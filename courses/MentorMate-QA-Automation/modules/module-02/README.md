# Module 2: Context Engineering - Presentation Slides

**Duration**: 4 hours (including exercises)
**Total Slides**: 40

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Slide 1 of 40: Title Slide

# Module 2: Context Engineering

**Learning to Communicate Effectively with AI**

Instructor: [Your Name]
Duration: 4 hours

---

## Slide 2 of 40: Learning Objectives

By the end of this module, you will be able to:

- Understand the context hierarchy in AI interactions
- Create effective CLAUDE.md project files
- Write prompts that produce accurate results
- Apply iterative refinement techniques

---

## Slide 3 of 40: Module Agenda

1. **The Context Hierarchy** (45 min)
2. **Creating CLAUDE.md Files** (45 min)
3. **Effective Prompting** (60 min)
4. **Iterative Refinement** (30 min)
5. **Hands-On Exercises** (60 min)

---

## Slide 4 of 40: Section 1 - The Context Hierarchy

# Part 1: Understanding Context

**Why context matters in AI interactions**

---

## Slide 5 of 40: Why Context Matters

AI responses are only as good as the context provided:

```
Poor Context → Vague Response → Multiple Iterations → Wasted Time

Good Context → Accurate Response → Fewer Iterations → Efficient Work
```

**Key Insight**: Time spent on context = Time saved on iterations

---

## Slide 6 of 40: The Three Levels of Context

```
┌─────────────────────────────────────┐
│     PROJECT LEVEL (Persistent)      │
│  CLAUDE.md, settings, conventions   │
├─────────────────────────────────────┤
│     SESSION LEVEL (Temporary)       │
│  Files read, conversation history   │
├─────────────────────────────────────┤
│      PROMPT LEVEL (Immediate)       │
│  Specific question, code snippets   │
└─────────────────────────────────────┘
```

**Hierarchy**: Project → Session → Prompt

---

## Slide 7 of 40: Level 1 - Project Context

**Information that applies to the entire project**

What to include:
- Tech stack
- Coding conventions
- Testing requirements
- Architecture patterns

**Where**: CLAUDE.md, .claude/settings.local.json

**Persistence**: Permanent (stays across all sessions)

---

## Slide 8 of 40: Level 2 - Session Context

**Information gathered during a conversation**

What it includes:
- Files Claude has read
- Previous messages
- Established understanding
- Decisions made in the session

**How**: Claude automatically maintains this

**Persistence**: Temporary (lasts only for the current conversation)

---

## Slide 9 of 40: Level 3 - Prompt Context

**Information specific to the current request**

What to include:
- Relevant code snippets
- Expected output format
- Specific constraints
- Immediate requirements

**Where**: Your message to Claude

**Persistence**: Single interaction only

---

## Slide 10 of 40: Context Hierarchy in Action

**Example Flow**:

1. **Project Context**: "We use Jest for testing, 80% coverage required"
2. **Session Context**: "We've been working on the user service"
3. **Prompt Context**: "Generate tests for the createUser function with these scenarios..."

Result: Claude has full picture to generate appropriate tests

---

## Slide 11 of 40: Section 2 - Creating CLAUDE.md Files

# Part 2: Project Configuration

**Setting up persistent context**

---

## Slide 12 of 40: What is CLAUDE.md?

A project-level configuration file that tells Claude:

- What the project does
- How it's structured
- Your conventions and preferences
- Special instructions

**Think of it as**: A README for AI, not humans

---

## Slide 13 of 40: File Location

Place `CLAUDE.md` in your project root:

```
your-project/
├── CLAUDE.md          ← Here
├── src/
├── tests/
└── package.json
```

Claude automatically reads this file when starting a session

---

## Slide 14 of 40: CLAUDE.md Template Structure

```markdown
# Project: [Project Name]

## Overview
[Brief description of what this project does]

## Tech Stack
- [Language/Framework]
- [Testing Framework]
- [Other key technologies]

## Architecture
[Brief description of architecture]
[Key directories and their purposes]

## Code Conventions
- [Naming conventions]
- [File organization]
- [Coding patterns to follow]

## Testing Requirements
- [Test framework and patterns]
- [Coverage expectations]
- [Naming conventions for tests]

## Important Files
- [Key file 1] - [purpose]
- [Key file 2] - [purpose]

## Current Focus
[What you're currently working on]
[Any specific instructions for this session]
```

---

## Slide 15 of 40: Template Section: Overview

```markdown
## Overview
Full-stack e-commerce platform with product catalog,
shopping cart, checkout, and admin dashboard.
```

**Tips**:
- Keep it to 2-3 sentences
- Focus on what, not how
- Include the business purpose

---

## Slide 16 of 40: Template Section: Tech Stack

```markdown
## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL with Prisma ORM
- Testing: Jest + React Testing Library + Playwright
- CI/CD: GitHub Actions
```

**Tips**:
- List major technologies only
- Include versions for key dependencies
- Organize by category

---

## Slide 17 of 40: Template Section: Architecture

```markdown
## Architecture
Monorepo with:
- `packages/web` - React frontend
- `packages/api` - Express backend
- `packages/shared` - Shared types and utilities
```

**Tips**:
- High-level structure only
- Key directories with purposes
- Architectural patterns (microservices, monolith, etc.)

---

## Slide 18 of 40: Template Section: Code Conventions

```markdown
## Code Conventions
- Use functional components with hooks
- Prefer named exports
- Use absolute imports from `@/`
- Follow Prettier and ESLint configs
- Commit messages: conventional commits format
```

**Tips**:
- List non-obvious conventions
- Include naming patterns
- Mention style tools (Prettier, ESLint)

---

## Slide 19 of 40: Template Section: Testing Requirements

```markdown
## Testing Requirements
- Jest for unit and integration tests
- Playwright for E2E tests
- Follow AAA pattern (Arrange, Act, Assert)
- Test naming: `test_<feature>_<scenario>_<expected>`
- Minimum 80% code coverage
- Mock external APIs, not database in integration tests
```

**This is critical for QA automation!**

---

## Slide 20 of 40: Template Section: Important Files

```markdown
## Important Files
- `packages/api/src/services/` - Business logic
- `packages/api/src/routes/` - API endpoints
- `packages/web/src/components/` - React components
- `packages/shared/src/types/` - TypeScript interfaces
```

**Tips**:
- List files Claude will frequently reference
- Include purpose for each
- Use paths relative to project root

---

## Slide 21 of 40: Template Section: Current Focus

```markdown
## Current Focus
Working on the checkout flow:
- Cart management
- Payment processing
- Order creation
- Email notifications

Generate tests that cover edge cases and error handling.
```

**Tips**:
- Update this regularly
- Be specific about current work
- Include special instructions

---

## Slide 22 of 40: Example: E-Commerce Project (Full)

```markdown
# Project: ShopEasy E-Commerce Platform

## Overview
Full-stack e-commerce platform with product catalog, shopping cart,
checkout, and admin dashboard.

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL with Prisma ORM
- Testing: Jest + React Testing Library + Playwright
- CI/CD: GitHub Actions

## Architecture
Monorepo with:
- `packages/web` - React frontend
- `packages/api` - Express backend
- `packages/shared` - Shared types and utilities

## Code Conventions
- Use functional components with hooks
- Prefer named exports
- Use absolute imports from `@/`
- Follow Prettier and ESLint configs
- Commit messages: conventional commits format

## Testing Requirements
- Jest for unit and integration tests
- Playwright for E2E tests
- Follow AAA pattern (Arrange, Act, Assert)
- Test naming: `test_<feature>_<scenario>_<expected>`
- Minimum 80% code coverage
- Mock external APIs, not database in integration tests

## Important Files
- `packages/api/src/services/` - Business logic
- `packages/api/src/routes/` - API endpoints
- `packages/web/src/components/` - React components
- `packages/shared/src/types/` - TypeScript interfaces

## Current Focus
Working on the checkout flow:
- Cart management
- Payment processing
- Order creation
- Email notifications

Generate tests that cover edge cases and error handling.
```

---

## Slide 23 of 40: Example: Python Data Pipeline

```markdown
# Project: Customer Feedback Analyzer

## Overview
Data pipeline that processes customer feedback files, performs
sentiment analysis, and generates reports.

## Tech Stack
- Python 3.11
- Pandas for data processing
- Transformers for sentiment analysis
- FastAPI for REST API
- pytest for testing
- Docker for containerization

## Architecture
Microservices architecture:
- `normalizer/` - Converts various file formats to standard schema
- `processor/` - NLP and sentiment analysis
- `aggregator/` - Stores and queries results
- `api/` - REST API for external access

## Code Conventions
- Type hints on all functions
- Docstrings for public functions
- Black for formatting
- isort for imports
- snake_case for functions and variables
- PascalCase for classes

## Testing Requirements
- pytest with fixtures
- Use conftest.py for shared fixtures
- Test naming: test_<function>_<scenario>
- Parametrize tests when possible
- 75% minimum coverage
- Use factories for test data

## Important Files
- `processor/main.py` - Main processing logic
- `normalizer/schemas.py` - Data schemas
- `aggregator/queries.py` - Database queries
- `conftest.py` - Shared test fixtures

## Current Focus
Improving test coverage for processor service:
- Sentiment analysis accuracy
- Edge cases in text processing
- Error handling for malformed input
```

---

## Slide 24 of 40: Section 3 - Effective Prompting

# Part 3: Writing Good Prompts

**The art and science of prompt engineering**

---

## Slide 25 of 40: The Anatomy of a Good Prompt

```
[Context] + [Task] + [Requirements] + [Format] = Good Prompt
```

**Context**: What Claude needs to know
**Task**: What you want done
**Requirements**: Specific constraints and criteria
**Format**: How you want the output structured

---

## Slide 26 of 40: Bad vs Good - Example 1: Test Generation

**Bad**:
```
Write tests for the user service
```

**Problems**:
- No context about the function
- No specific requirements
- No format specified
- Too vague

---

## Slide 27 of 40: Good Example: Test Generation

```
Generate Jest unit tests for the createUser function in src/services/user.ts

Function signature:
async function createUser(data: CreateUserDto): Promise<User>

Requirements:
- Test successful user creation
- Test duplicate email handling (should throw ConflictError)
- Test invalid email format (should throw ValidationError)
- Test missing required fields
- Mock the database calls using jest.mock
- Use factories for test data

Output format:
- Group tests with describe blocks
- Use beforeEach for common setup
- Include comments explaining each test
```

**Much better!** Claude has everything needed.

---

## Slide 28 of 40: Bad vs Good - Example 2: Code Review

**Bad**:
```
Review this code
```

**Good**:
```
Review the following authentication middleware for:
1. Security vulnerabilities (injection, OWASP top 10)
2. Error handling completeness
3. Performance issues
4. Code style consistency with our conventions

For each issue found:
- Severity (Critical/High/Medium/Low)
- Line number
- Description
- Suggested fix

```typescript
[paste code here]
```
```

---

## Slide 29 of 40: Prompting Pattern 1: Step-by-Step Instructions

```
I need to implement user authentication. Please:

1. First, analyze the current auth-related files
2. Then, list what's already implemented
3. Identify gaps compared to best practices
4. Finally, suggest specific improvements with code

Take each step one at a time.
```

**Use when**: Complex tasks that need sequential analysis

---

## Slide 30 of 40: Prompting Pattern 2: Example-Driven

```
Generate tests in this format:

Example:
```javascript
describe('calculateTax', () => {
  it('should calculate 10% tax on $100', () => {
    // Arrange
    const price = 100;
    const rate = 0.1;

    // Act
    const result = calculateTax(price, rate);

    // Assert
    expect(result).toBe(10);
  });
});
```

Now generate similar tests for the calculateDiscount function.
```

**Use when**: You want specific formatting or style

---

## Slide 31 of 40: Prompting Pattern 3: Constraints and Boundaries

```
Generate E2E tests for the login flow with these constraints:

DO:
- Use Playwright
- Use data-testid for selectors
- Include visual regression tests
- Test on Chrome only

DON'T:
- Use XPath selectors
- Include performance tests
- Test on mobile viewports

Focus on these scenarios:
1. Successful login
2. Invalid credentials
3. Account lockout
```

**Use when**: You need to set clear boundaries

---

## Slide 32 of 40: Common Prompting Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Too vague | Generic response | Add specifics |
| No examples | Wrong format | Provide sample output |
| Missing context | Assumptions wrong | Include relevant code |
| One giant prompt | Overwhelming | Break into steps |
| No constraints | Too broad | Set boundaries |

---

## Slide 33 of 40: Section 4 - Iterative Refinement

# Part 4: Improving Through Conversation

**Making good output great**

---

## Slide 34 of 40: The Refinement Loop

```
Initial Prompt → Response → Review → Refine → Better Response → ...
```

**Key Principle**: AI is a conversation, not a single command

**Goal**: Progressively improve output through dialogue

---

## Slide 35 of 40: Refinement Technique 1: Clarification

```
User: Write tests for the payment service

Claude: [generates tests]

User: Good start, but please also:
- Add tests for expired cards
- Include currency conversion tests
- Use our PaymentFactory for test data
```

**Pattern**: Start broad, then add specifics

---

## Slide 36 of 40: Refinement Technique 2: Narrowing Scope

```
User: The tests are too comprehensive. Let's focus on:
- Just the processPayment function
- Only error cases
- Remove the integration tests for now
```

**Pattern**: Reduce scope when overwhelmed

---

## Slide 37 of 40: Refinement Technique 3: Format Adjustment

```
User: The tests are good but:
- Split each describe block into separate files
- Add JSDoc comments to each test
- Group by feature, not by function
```

**Pattern**: Content is right, but structure needs changes

---

## Slide 38 of 40: Refinement Technique 4: Quality Improvement

```
User: Improve these tests by:
- Making assertions more specific
- Adding edge cases for boundary values
- Including setup/teardown for database state
```

**Pattern**: Enhance the quality and completeness

---

## Slide 39 of 40: When to Start Fresh vs Refine

**Refine when**:
- Output is 70%+ correct
- Structure is right, details wrong
- Just need additions

**Start fresh when**:
- Fundamental misunderstanding
- Wrong approach entirely
- Simpler to re-explain

**Rule of thumb**: If you're writing more correction than the original output, start fresh

---

## Slide 40 of 40: Summary and Next Steps

**What We Learned**:
- The three-level context hierarchy (Project → Session → Prompt)
- How to create effective CLAUDE.md files
- Patterns for writing good prompts
- Techniques for iterative refinement

**Next Steps**:
- Hands-on exercises (60 minutes)
- Practice creating CLAUDE.md files
- Transform bad prompts into good ones
- Experience iterative refinement

**Next Module**: Module 3 - Accessing Private Repositories

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
