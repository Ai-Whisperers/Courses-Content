# AI Tools Configuration Guide

Complete reference for setting up AI coding assistants with project-specific configurations.

---

## Quick Comparison

| Tool | Config Folder | Main Context File | Ignore File | Commands |
|------|---------------|-------------------|-------------|----------|
| **Cursor** | `.cursor/` | `.cursor/rules/*.mdc` | `.cursorignore` | N/A |
| **Claude Code** | `.claude/` | `CLAUDE.md` | Permissions in settings | `/` commands |
| **GitHub Copilot** | `.github/` | `copilot-instructions.md` | Content Exclusion | N/A |
| **Gemini** | `.gemini/` | `GEMINI.md` | N/A | `/` commands |

---

## Table of Contents

1. [Cursor AI](#cursor-ai)
2. [Claude Code](#claude-code)
3. [GitHub Copilot](#github-copilot)
4. [Gemini](#gemini)
5. [Universal Setup Template](#universal-setup-template)

---

## Cursor AI

### Overview

Cursor is a VS Code fork with built-in AI capabilities. It uses `.cursor/` directory for project-specific configuration.

### Configuration Files

```
project-root/
├── .cursor/
│   ├── index.mdc              # Main rules file (always applied)
│   └── rules/
│       ├── code-style.mdc     # Coding standards
│       ├── testing.mdc        # Test conventions
│       └── security.mdc       # Security rules
├── .cursorignore              # Files to exclude from AI
└── .cursorindexingignore      # Files to exclude from indexing only
```

### Rule File Format (.mdc)

```markdown
---
description: Brief description of this rule
globs: src/**/*.ts               # Optional: file patterns
alwaysApply: false               # true = always include
---

# Rule Title

Your instructions here in markdown format.

- Specific guideline 1
- Specific guideline 2

Reference files with @filename.ts syntax.
```

### Example Rules

**Main Rules (.cursor/index.mdc):**

```markdown
---
description: Core project standards
alwaysApply: true
---

# Project Standards

## Tech Stack
- Node.js 20+ with TypeScript
- Jest for unit tests
- Playwright for E2E tests

## Code Style
- Use 2-space indentation
- Prefer async/await over promises
- Always include type annotations

## Testing Requirements
- Write tests for all new features
- Minimum 80% coverage
- Use AAA pattern (Arrange, Act, Assert)
```

**Testing Rules (.cursor/rules/testing.mdc):**

```markdown
---
description: Testing conventions and patterns
globs: **/*.test.ts,**/*.spec.ts
---

# Testing Standards

- Use descriptive test names: `should_doThing_when_condition`
- Mock external dependencies
- One assertion concept per test
- Reset state in beforeEach

## Example

```typescript
describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user with valid data', async () => {
    // Arrange
    const userData = { name: 'Test', email: 'test@test.com' };

    // Act
    const result = await userService.create(userData);

    // Assert
    expect(result.id).toBeDefined();
  });
});
```
```

### Ignore Files

**.cursorignore** - Blocks AI access AND indexing:

```gitignore
# Sensitive files
.env
.env.*
secrets/
*.key
credentials.json

# Dependencies
node_modules/
venv/

# Build output
dist/
build/
coverage/

# Logs
*.log
logs/
```

**.cursorindexingignore** - Blocks indexing only (AI can still access if referenced):

```gitignore
**/node_modules/**
**/.git/**
dist/**
*.lock
```

### Global Settings

Location: `Cursor Settings → Rules → User Rules`

```
Respond in clear, professional English.
Prefer modern ES6+ syntax.
Always suggest TypeScript types.
Include error handling in examples.
```

### Best Practices

1. **Organize by concern** - Separate rules for frontend, backend, testing
2. **Keep under 500 lines** - Split large rule sets
3. **Use glob patterns** - Only load relevant rules
4. **Version control** - Commit `.cursor/` to git
5. **Security** - Use `.cursorignore` for sensitive files (best-effort, not guaranteed)

---

## Claude Code

### Overview

Claude Code is Anthropic's CLI tool. It uses `.claude/` directory and `CLAUDE.md` files for context.

### Configuration Files

```
project-root/
├── .claude/
│   ├── settings.json          # Project settings (commit)
│   ├── settings.local.json    # Personal settings (gitignore)
│   └── commands/              # Custom slash commands
├── CLAUDE.md                  # Project context (commit)
└── src/
    └── CLAUDE.md              # Subdirectory context (optional)
```

**Global location:** `~/.claude/`

### Settings File (settings.json)

```json
{
  "model": "sonnet",
  "permissions": {
    "allow": [
      "Read(.)",
      "Edit(.)",
      "Bash(npm test)",
      "Bash(npm run lint)"
    ],
    "ask": [
      "Bash(npm install *)",
      "Bash(git *)"
    ],
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(secrets/**)",
      "Bash(curl:*)",
      "Bash(wget:*)"
    ]
  },
  "environment": {
    "NODE_ENV": "development"
  }
}
```

### Context File (CLAUDE.md)

```markdown
# Project Context

## Overview
E-commerce API for managing users, products, and orders.

## Tech Stack
- Node.js 20 with Express
- PostgreSQL database
- Jest for testing
- TypeScript strict mode

## Project Structure
- `/src/controllers` - Route handlers
- `/src/services` - Business logic
- `/src/models` - Database models
- `/tests` - Test files

## Coding Standards
- Use async/await for all async operations
- Handle errors explicitly (no silent catches)
- Include JSDoc comments for public functions
- Use snake_case for database columns

## Testing Requirements
- Framework: Jest with supertest
- Coverage target: 80%
- Pattern: AAA (Arrange, Act, Assert)
- Mock external services (database, email)

## Commands
- `npm test` - Run all tests
- `npm run test:coverage` - Run with coverage
- `npm run lint` - Run linter
- `npm run build` - Build project

## Important Files
- `/src/config/database.ts` - Database configuration
- `/src/middleware/auth.ts` - Authentication middleware
- `/tests/fixtures/` - Test data factories

@./docs/api-reference.md
@./docs/database-schema.md
```

### Permission Rules

**Precedence:** DENY > ASK > ALLOW

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",           // Block specific file
      "Read(.env.*)",         // Block pattern
      "Read(secrets/**)",     // Block directory
      "Bash(curl:*)",         // Block command
      "Bash(rm -rf:*)"        // Block dangerous command
    ],
    "ask": [
      "Bash(npm install *)",  // Prompt for installs
      "Bash(git push *)",     // Prompt for git push
      "Edit(package.json)"    // Prompt for package changes
    ],
    "allow": [
      "Read(.)",              // Allow all reads (except denied)
      "Edit(.)",              // Allow all edits
      "Bash(npm test)",       // Allow test command
      "Bash(npm run *)"       // Allow npm scripts
    ]
  }
}
```

### Custom Commands

Create `.claude/commands/run-tests.md`:

```markdown
---
description: Run tests with coverage
allowed-tools: Bash, Read
---

Run the test suite with coverage reporting.

1. Run `npm test -- --coverage`
2. Check if coverage meets 80% threshold
3. Report any failing tests
4. Suggest fixes for failures

$ARGUMENTS
```

Use with: `/run-tests unit`

### Model Selection

Available models (as of November 2025):
- `sonnet` - Claude Sonnet 4.5 (released Sept 2025, best coding model)
- `opus` - Claude Opus 4.1 (released Aug 2025, complex reasoning, agentic tasks)
- `haiku` - Claude Haiku 4.5 (released Oct 2025, fast, lightweight, cost-effective)

Extended context: Append `[1m]` for 1 million tokens

```json
{
  "model": "sonnet"
}
```

Or via CLI: `claude --model opus`

### Best Practices

1. **Commit `.claude/settings.json`** - Share team standards
2. **Gitignore `settings.local.json`** - Keep personal settings private
3. **Use deny rules** - Protect sensitive files
4. **Create CLAUDE.md** - Essential for good responses
5. **Import shared docs** - Use `@./path/to/file.md` syntax

---

## GitHub Copilot

### Overview

GitHub Copilot uses `.github/` directory for repository-wide instructions.

### Configuration Files

```
project-root/
├── .github/
│   ├── copilot-instructions.md           # Main instructions
│   ├── instructions/
│   │   ├── frontend.instructions.md      # UI-specific rules
│   │   ├── backend.instructions.md       # API-specific rules
│   │   └── testing.instructions.md       # Test conventions
│   └── prompts/
│       ├── write-test.prompt.md          # Test generation template
│       └── code-review.prompt.md         # Review checklist
└── src/
```

### Main Instructions File

**.github/copilot-instructions.md:**

```markdown
# Project Instructions

## Overview
This is an e-commerce API built with Node.js and Express.

## Technology Stack
- **Runtime:** Node.js 20+
- **Framework:** Express 4.x
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Jest, Supertest
- **Language:** TypeScript (strict mode)

## Coding Standards

### General
- Use async/await for asynchronous operations
- Handle all errors explicitly
- Add JSDoc comments for public functions
- Use meaningful variable and function names

### Naming Conventions
- Files: kebab-case (user-service.ts)
- Classes: PascalCase (UserService)
- Functions: camelCase (createUser)
- Constants: UPPER_SNAKE_CASE (MAX_RETRIES)

### TypeScript
- Enable strict mode
- No `any` types (use `unknown` if needed)
- Define interfaces for all objects
- Use type guards for runtime checks

## Testing Requirements
- Write unit tests for all services
- Write integration tests for all endpoints
- Minimum 80% code coverage
- Use AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

## Project Structure
- `/src/controllers` - HTTP request handlers
- `/src/services` - Business logic
- `/src/models` - Database models
- `/src/middleware` - Express middleware
- `/tests/unit` - Unit tests
- `/tests/integration` - Integration tests

## Important Patterns
- Repository pattern for data access
- Dependency injection for testability
- Error classes for different error types
- Request validation with Zod schemas
```

### Path-Specific Instructions

**.github/instructions/testing.instructions.md:**

```markdown
---
applyTo: "**/*.test.ts,**/*.spec.ts,**/tests/**"
---

# Testing Guidelines

## Test Structure
- Group related tests with `describe` blocks
- Use descriptive test names
- One concept per test
- Reset state in `beforeEach`

## Mocking
- Mock all external dependencies
- Use `jest.mock()` for module mocking
- Use `jest.spyOn()` for method mocking
- Reset mocks after each test

## Assertions
- Use specific matchers (toBe, toEqual, toMatchObject)
- Verify error messages, not just error types
- Check side effects (database calls, events)

## Example Pattern

```typescript
describe('ServiceName', () => {
  let service: ServiceName;
  let mockDependency: jest.Mocked<Dependency>;

  beforeEach(() => {
    mockDependency = createMockDependency();
    service = new ServiceName(mockDependency);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('methodName', () => {
    it('should do something when condition', async () => {
      // Arrange
      const input = { ... };
      mockDependency.method.mockResolvedValue(expected);

      // Act
      const result = await service.methodName(input);

      // Assert
      expect(result).toEqual(expected);
      expect(mockDependency.method).toHaveBeenCalledWith(...);
    });
  });
});
```
```

### Prompt Templates

**.github/prompts/write-test.prompt.md:**

```markdown
# Write Tests

Generate comprehensive tests for the selected code.

## Requirements
- Use Jest as the test framework
- Follow AAA pattern (Arrange, Act, Assert)
- Include tests for:
  - Happy path (success case)
  - Error cases (invalid input, failures)
  - Edge cases (boundary values)
- Mock all external dependencies
- Use descriptive test names

## Output Format
Return complete test file with:
- All necessary imports
- Proper describe/it blocks
- Specific assertions
- beforeEach/afterEach setup
```

### Content Exclusion (Enterprise/Business)

Configure in GitHub Settings to exclude sensitive files:

1. Go to Repository/Organization Settings
2. Navigate to Copilot → Content Exclusion
3. Add patterns:
   ```
   .env
   .env.*
   **/secrets/**
   **/config/credentials.*
   ```

Note: Takes ~30 minutes to take effect.

### VS Code Settings

Disable Copilot for specific file types:

```json
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "dotenv": false
  },
  "files.associations": {
    ".env*": "dotenv"
  }
}
```

### Best Practices

1. **Keep instructions concise** - 300-1000 lines ideal
2. **Include examples** - Show preferred patterns
3. **Use path-specific files** - Different rules for different areas
4. **Explain "why"** - Help Copilot understand intent
5. **Iterate and refine** - Update based on results

---

## Gemini

### Overview

Google Gemini uses `.gemini/` directory and `GEMINI.md` files for context.

### Configuration Files

```
project-root/
├── .gemini/
│   └── settings.json          # Project settings
├── GEMINI.md                  # Project context
└── src/
    └── components/
        └── GEMINI.md          # Component-specific context
```

**Global location:** `~/.gemini/`

### Settings File

```json
{
  "model": {
    "name": "gemini-2-5-pro"
  },
  "context": {
    "fileName": ["GEMINI.md"]
  },
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["/path/to/github-mcp-server.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  },
  "telemetry": true
}
```

### Context File (GEMINI.md)

```markdown
# Project: E-commerce API

## Overview
RESTful API for managing users, products, and orders.

## Technology Stack
- Node.js 20 with Express
- PostgreSQL database
- Jest for testing
- TypeScript strict mode

## Code Style
- Use 2-space indentation
- Prefer async/await over promises
- Include JSDoc comments for all functions
- Use meaningful variable names

## Testing Requirements
- Write unit tests for all services
- Minimum 80% code coverage
- Use AAA pattern
- Mock external dependencies

## Project Structure
- `/src/controllers` - Route handlers
- `/src/services` - Business logic
- `/src/models` - Database models
- `/tests` - Test files

@import ./docs/api-reference.md
@import ./docs/coding-standards.md
```

### API Key Setup

**Environment variable:**

```bash
# Linux/macOS
export GEMINI_API_KEY="your-api-key"

# Windows
set GEMINI_API_KEY=your-api-key
```

**Get API key:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Create and copy key

### Model Selection

Available models (as of November 2025):
- `gemini-2-5-flash` - Latest model (2025), best overall performance
- `gemini-2-0-flash` - Production-ready (GA Feb 2025), 1M context
- `gemini-2-0-pro` - Experimental, strongest reasoning, 2M context

```json
{
  "model": {
    "name": "gemini-2-5-pro"
  }
}
```

### CLI Commands

```bash
gemini              # Start interactive mode
/tools              # List available tools
/init               # Generate starter GEMINI.md
/memory show        # View current context
/memory refresh     # Reload context files
/chat save          # Save conversation
/chat resume        # Restore conversation
/clear              # Clear context
```

### Best Practices

1. **Set environment variable** - Don't hardcode API keys
2. **Create GEMINI.md** - Essential for context
3. **Use hierarchical context** - Global → Project → Subdirectory
4. **Import shared docs** - Use `@import ./path/to/file.md`
5. **Keep keys secure** - Use environment variables or secret managers

---

## Universal Setup Template

### Complete Project Setup

Create all configuration files for maximum AI tool support:

```
project-root/
├── .cursor/
│   ├── index.mdc
│   └── rules/
│       └── testing.mdc
├── .cursorignore
├── .claude/
│   └── settings.json
├── CLAUDE.md
├── .github/
│   ├── copilot-instructions.md
│   └── instructions/
│       └── testing.instructions.md
├── .gemini/
│   └── settings.json
├── GEMINI.md
└── .gitignore
```

### Shared Context Template

Since all tools use similar context patterns, create a single source of truth:

**docs/ai-context.md:**

```markdown
# Project Context

## Overview
[Project description]

## Tech Stack
- Runtime: [Node.js 20]
- Framework: [Express]
- Database: [PostgreSQL]
- Testing: [Jest]
- Language: [TypeScript]

## Coding Standards
- [Standard 1]
- [Standard 2]
- [Standard 3]

## Testing Requirements
- Framework: [Jest]
- Coverage target: [80%]
- Pattern: [AAA]
- Mocking: [Mock external dependencies]

## Project Structure
- `/src` - Source code
- `/tests` - Test files
- `/docs` - Documentation

## Important Commands
- `npm test` - Run tests
- `npm run lint` - Run linter
- `npm run build` - Build project
```

Then reference from each tool's config:

**CLAUDE.md:**
```markdown
@./docs/ai-context.md
```

**GEMINI.md:**
```markdown
@import ./docs/ai-context.md
```

**.github/copilot-instructions.md:**
Reference manually or include content directly.

**.cursor/index.mdc:**
```markdown
---
description: Project context
alwaysApply: true
---

[Include content from docs/ai-context.md]
```

### .gitignore Additions

```gitignore
# AI tool personal settings
.claude/settings.local.json
.cursor/settings.local.json

# Sensitive files (also add to AI ignore files)
.env
.env.*
secrets/
*.key
credentials.json
```

### Security Checklist

For all AI tools, ensure these files are protected:

- [ ] `.env` and `.env.*` files
- [ ] `secrets/` directories
- [ ] API keys and tokens
- [ ] Private keys (`*.key`, `*.pem`)
- [ ] Credential files
- [ ] Database connection strings
- [ ] SSH keys (`~/.ssh/`)

---

## Summary

### Key Takeaways

1. **Context is king** - All tools perform better with project context
2. **Use ignore files** - Protect sensitive data (best-effort, not guaranteed)
3. **Version control configs** - Share team standards via git
4. **Keep personal settings separate** - Use `*.local.json` or gitignore
5. **Iterate and improve** - Update configs based on results

### Quick Setup Steps

1. Create project context file (CLAUDE.md, GEMINI.md, etc.)
2. Add coding standards and conventions
3. Include tech stack and structure
4. Configure ignore files for sensitive data
5. Set up permissions/rules for safety
6. Commit shared configs to git
7. Test and refine

### Getting Help

- **Cursor:** [docs.cursor.com](https://docs.cursor.com)
- **Claude Code:** [docs.claude.com](https://docs.claude.com/en/docs/claude-code)
- **GitHub Copilot:** [docs.github.com/copilot](https://docs.github.com/copilot)
- **Gemini:** [ai.google.dev](https://ai.google.dev/gemini-api/docs)

---

*Keep this guide updated as tools evolve and your team's practices mature.*
