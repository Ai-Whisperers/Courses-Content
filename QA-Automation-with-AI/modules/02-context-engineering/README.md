# Module 2: Context Engineering

## Duration: 4 hours

## Learning Objectives

By the end of this module, you will be able to:
- Understand the context hierarchy in AI interactions
- Create effective CLAUDE.md project files
- Write prompts that produce accurate results
- Apply iterative refinement techniques

---

## 2.1 The Context Hierarchy

### Why Context Matters

AI responses are only as good as the context provided:

```
Poor Context → Vague Response → Multiple Iterations → Wasted Time
Good Context → Accurate Response → Fewer Iterations → Efficient Work
```

### The Three Levels of Context

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

### Level 1: Project Context

Information that applies to the entire project:
- Tech stack
- Coding conventions
- Testing requirements
- Architecture patterns

**Where**: CLAUDE.md, .claude/settings.local.json

### Level 2: Session Context

Information gathered during a conversation:
- Files Claude has read
- Previous messages
- Established understanding

**How**: Claude automatically maintains this

### Level 3: Prompt Context

Information specific to the current request:
- Relevant code snippets
- Expected output format
- Specific constraints

**Where**: Your message to Claude

---

## 2.2 Creating CLAUDE.md Files

### What is CLAUDE.md?

A project-level configuration file that tells Claude:
- What the project does
- How it's structured
- Your conventions and preferences
- Special instructions

### File Location

Place `CLAUDE.md` in your project root:

```
your-project/
├── CLAUDE.md          ← Here
├── src/
├── tests/
└── package.json
```

### Template Structure

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

### Example: E-Commerce Project

```markdown
# Project: ShopEasy E-Commerce Platform

## Overview
Full-stack e-commerce platform with product catalog, shopping cart, checkout, and admin dashboard.

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

### Example: Python Data Pipeline

```markdown
# Project: Customer Feedback Analyzer

## Overview
Data pipeline that processes customer feedback files, performs sentiment analysis, and generates reports.

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

## 2.3 Effective Prompting

### The Anatomy of a Good Prompt

```
[Context] + [Task] + [Requirements] + [Format] = Good Prompt
```

### Bad vs Good Prompts

#### Example 1: Test Generation

**Bad**:
```
Write tests for the user service
```

**Good**:
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

#### Example 2: Code Review

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

### Prompting Patterns

#### Pattern 1: Step-by-Step Instructions

```
I need to implement user authentication. Please:

1. First, analyze the current auth-related files
2. Then, list what's already implemented
3. Identify gaps compared to best practices
4. Finally, suggest specific improvements with code

Take each step one at a time.
```

#### Pattern 2: Example-Driven

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

#### Pattern 3: Constraints and Boundaries

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

### Common Prompting Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Too vague | Generic response | Add specifics |
| No examples | Wrong format | Provide sample output |
| Missing context | Assumptions wrong | Include relevant code |
| One giant prompt | Overwhelming | Break into steps |
| No constraints | Too broad | Set boundaries |

---

## 2.4 Iterative Refinement

### The Refinement Loop

```
Initial Prompt → Response → Review → Refine → Better Response → ...
```

### Refinement Techniques

#### Technique 1: Clarification

```
User: Write tests for the payment service

Claude: [generates tests]

User: Good start, but please also:
- Add tests for expired cards
- Include currency conversion tests
- Use our PaymentFactory for test data
```

#### Technique 2: Narrowing Scope

```
User: The tests are too comprehensive. Let's focus on:
- Just the processPayment function
- Only error cases
- Remove the integration tests for now
```

#### Technique 3: Format Adjustment

```
User: The tests are good but:
- Split each describe block into separate files
- Add JSDoc comments to each test
- Group by feature, not by function
```

#### Technique 4: Quality Improvement

```
User: Improve these tests by:
- Making assertions more specific
- Adding edge cases for boundary values
- Including setup/teardown for database state
```

### When to Start Fresh vs Refine

**Refine when**:
- Output is 70%+ correct
- Structure is right, details wrong
- Just need additions

**Start fresh when**:
- Fundamental misunderstanding
- Wrong approach entirely
- Simpler to re-explain

---

## 2.5 Hands-On Exercises

### Exercise 2.1: Create a CLAUDE.md

**Objective**: Create an effective CLAUDE.md for a sample project

**Steps**:

1. Clone a sample project:
   ```bash
   git clone https://github.com/gothinkster/node-express-realworld-example-app
   cd node-express-realworld-example-app
   ```

2. Explore the project structure

3. Create a CLAUDE.md file with:
   - Project overview
   - Tech stack
   - Architecture description
   - Code conventions
   - Testing requirements
   - Important files
   - Current focus (testing the authentication module)

4. Start Claude and verify it uses the context:
   ```
   claude "What are our testing requirements?"
   ```

**Expected Outcome**: Claude correctly references your CLAUDE.md

**Time**: 45 minutes

---

### Exercise 2.2: Prompt Improvement

**Objective**: Transform bad prompts into effective ones

**Task**: Improve these prompts:

1. "Write tests" → [Your improved version]

2. "Fix the bug" → [Your improved version]

3. "Document this code" → [Your improved version]

4. "Make it faster" → [Your improved version]

For each, include:
- Context
- Specific task
- Requirements
- Expected format

**Time**: 30 minutes

---

### Exercise 2.3: Iterative Test Generation

**Objective**: Practice iterative refinement

**Steps**:

1. Start with a simple prompt:
   ```
   Generate tests for user registration
   ```

2. Review the output and note issues

3. Refine with:
   ```
   Good, but also add:
   - Test for email already exists
   - Test for password too weak
   - Use our test helpers
   ```

4. Review and refine again:
   ```
   Split into separate describe blocks for:
   - Input validation
   - Business rules
   - Database operations
   ```

5. Continue until tests are production-ready

**Expected Outcome**: High-quality tests through iteration

**Time**: 45 minutes

---

## Knowledge Check

1. What are the three levels of context hierarchy?
2. What should a CLAUDE.md file contain?
3. What are the four components of a good prompt?
4. When should you start fresh vs refine?
5. How do you use the example-driven prompting pattern?

---

## Summary

In this module, you learned:

- The three-level context hierarchy
- How to create effective CLAUDE.md files
- Patterns for writing good prompts
- Techniques for iterative refinement
- Common mistakes to avoid

---

## Next Steps

Proceed to **Module 3: Accessing Private Repositories** to learn how to use AI with private codebases.

---

## Resources

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [CLAUDE.md Examples](../examples/claude-md/)
- [Prompt Library](../prompts/)
