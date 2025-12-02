# Cursor IDE Configuration Guide

> **Last Updated:** December 2025
> **Source:** [Cursor Official Docs](https://docs.cursor.com/context/rules) | [Cursor Forum Best Practices](https://forum.cursor.com/t/my-best-practices-for-mdc-rules-and-troubleshooting/50526)

## Overview

Cursor is an AI-powered IDE built on VS Code that uses `.mdc` (Markdown with Context) files for project rules. Rules guide the AI's behavior and can be dynamically activated based on file patterns.

## File Structure

```
your-project/
├── .cursorrules              # Legacy single-file rules (deprecated)
├── .cursorignore             # Files to ignore
├── .cursor/
│   ├── rules/
│   │   ├── 001-core.mdc      # Core workspace rules
│   │   ├── 100-testing.mdc   # Testing-specific rules
│   │   └── 200-patterns.mdc  # Pattern rules
│   ├── commands/
│   │   └── generate-tests.md # Custom commands
│   └── mcp.json              # MCP server configuration
└── src/
    └── .cursor/
        └── rules/
            └── api.mdc       # Nested rules for /src directory
```

## Rule File Format (.mdc)

### MDC Frontmatter

```markdown
---
description: "Testing patterns and conventions"
globs: "**/*.test.ts,**/*.spec.ts"
alwaysApply: false
---

# Testing Rules

All tests should follow the AAA pattern...
```

### Frontmatter Properties

| Property | Type | Description |
|----------|------|-------------|
| `description` | string | Shown in UI, used for filtering and activation |
| `globs` | string | Comma-separated file patterns for auto-attachment |
| `alwaysApply` | boolean | If true, always included (ignores globs) |

### Rule Types

1. **User Rules** - Global settings in Cursor preferences (always applied)
2. **Project Rules** - `.cursor/rules/*.mdc` files (version controlled)
3. **Nested Rules** - Rules in subdirectories (applied when working in that directory)

## File Naming Convention

Use numbered prefixes for organization and precedence:

```
001-099: Core/workspace rules (highest precedence for conflicts)
100-199: Integration rules (tools, frameworks)
200-299: Pattern rules (code style, conventions)
```

Example:
```
.cursor/rules/
├── 001-project-overview.mdc
├── 010-code-style.mdc
├── 100-playwright.mdc
├── 101-jest.mdc
└── 200-page-object-pattern.mdc
```

## Best Practices for Rules

### Keep Rules Focused

```markdown
---
description: "TypeScript strict typing rules"
globs: "**/*.ts,**/*.tsx"
---

# TypeScript Rules

- No `any` types - use `unknown` or proper generics
- Explicit return types on public functions
- Use type guards for runtime checks
- Prefer interfaces over type aliases for objects

## Examples

```typescript
// Good
function processUser(user: User): ProcessedUser {
  return { ...user, processed: true };
}

// Bad
function processUser(user: any): any {
  return { ...user, processed: true };
}
```
```

### Rule Length Guidelines

| Metric | Recommendation |
|--------|---------------|
| Body text | Target 25 lines, max 50 lines |
| Total file | Under 500 lines |
| Examples | Include valid AND invalid examples |

### Use File References

```markdown
---
description: "API endpoint patterns"
globs: "src/api/**/*.ts"
---

# API Rules

Follow patterns established in:
- @src/api/users/index.ts (reference implementation)
- @src/api/shared/middleware.ts (common middleware)
```

## Dynamic Rule Activation

Rules with `alwaysApply: false` activate based on:

1. **File globs** - When working with matching files
2. **Description matching** - AI selects relevant rules based on task

> **Important:** Context-aware rules work best at the start of a new conversation. Mid-conversation rule changes may not be picked up automatically.

## Custom Commands

Create `.cursor/commands/command-name.md`:

```markdown
# Generate Tests

Generate comprehensive tests for the selected code:

1. Identify all testable functions and methods
2. Create unit tests using Jest
3. Follow AAA pattern (Arrange, Act, Assert)
4. Include edge cases and error scenarios
5. Mock external dependencies
6. Target 80% code coverage

Use existing test patterns from @tests/examples/
```

Access via Command Palette: `Cmd/Ctrl + Shift + P` > "Run Cursor Command"

## MCP Configuration

### .cursor/mcp.json

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## .cursorignore

Similar to `.gitignore`, excludes files from AI context:

```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.next/

# Large files
*.min.js
*.bundle.js

# Secrets
.env*
*.pem
credentials.json

# IDE
.idea/
*.swp

# Test outputs
coverage/
playwright-report/
test-results/
```

## Example: QA Automation Rules

### .cursor/rules/001-project.mdc

```markdown
---
description: "QA Automation project overview and conventions"
alwaysApply: true
---

# QA Automation Framework

## Tech Stack
- TypeScript 5.x (strict mode)
- Playwright for E2E testing
- Jest for unit tests
- Page Object Model pattern

## Project Structure
- `/tests/e2e/` - End-to-end test specs
- `/tests/unit/` - Unit test specs
- `/src/pages/` - Page Object classes
- `/src/fixtures/` - Test data factories
- `/src/utils/` - Shared utilities

## Commands
- `npm run test:e2e` - Run E2E tests
- `npm run test:unit` - Run unit tests
- `npm run lint` - Run linter
```

### .cursor/rules/100-testing.mdc

```markdown
---
description: "Testing patterns and conventions"
globs: "**/*.test.ts,**/*.spec.ts,tests/**/*"
---

# Testing Rules

## Test Structure
- One concept per test
- Descriptive names: `should [action] when [condition]`
- AAA pattern: Arrange, Act, Assert

## Valid Example

```typescript
test('should display error when login fails', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Act
  await loginPage.login('invalid@email.com', 'wrongpassword');

  // Assert
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Invalid credentials');
});
```

## Invalid Example

```typescript
// Bad: Multiple concepts, no clear structure
test('login test', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'test@test.com');
  await page.fill('#password', 'password');
  await page.click('button');
  await page.waitForURL('/dashboard');
  await page.goto('/settings');
  await page.fill('#name', 'New Name');
  // ... continues with unrelated actions
});
```

## Selector Priority
1. `data-testid` attributes (preferred)
2. Accessible roles and labels
3. Text content (for user-visible text)
4. CSS selectors (last resort)
```

### .cursor/rules/200-page-objects.mdc

```markdown
---
description: "Page Object Model implementation"
globs: "src/pages/**/*.ts"
---

# Page Object Rules

## Structure

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators as readonly properties
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.getByRole('alert');
  }

  // Actions as methods
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }
}
```

## Guidelines
- Extend BasePage for common functionality
- Use getByTestId for stable selectors
- Return void for actions, values for getters
- No assertions in page objects
```

## Creating New Rules

1. Open Command Palette: `Cmd/Ctrl + Shift + P`
2. Search: "New Cursor Rule"
3. Enter rule name and configure frontmatter

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Rules not activating | Check globs pattern, try `alwaysApply: true` for testing |
| Too many rules loaded | Split into more specific glob patterns |
| Conflicts between rules | Use numbered prefixes for precedence |
| Mid-conversation rules | Start new conversation for rule changes |
| `.cursorrules` bloated | Migrate to `.cursor/rules/*.mdc` files |

## Migration from .cursorrules

If using legacy `.cursorrules`:

1. Create `.cursor/rules/` directory
2. Split content into focused `.mdc` files
3. Add appropriate frontmatter to each
4. Delete `.cursorrules` file

Benefits:
- Reduced token usage (only relevant rules loaded)
- Better organization
- Dynamic activation based on context

## Resources

- [Cursor Official Documentation](https://docs.cursor.com/context/rules)
- [Cursor Forum - Best Practices](https://forum.cursor.com/t/my-best-practices-for-mdc-rules-and-troubleshooting/50526)
- [Cursor Rules Framework](https://www.clinamenic.com/resources/specs/Cursor-Rules-Framework)
- [Awesome Cursor Rules](https://apidog.com/blog/awesome-cursor-rules/)
