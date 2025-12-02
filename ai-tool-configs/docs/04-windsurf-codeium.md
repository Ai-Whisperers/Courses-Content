# Windsurf (Codeium) Configuration Guide

> **Last Updated:** December 2025
> **Source:** [Windsurf Documentation](https://docs.windsurf.com/windsurf/cascade/cascade) | [Windsurf Rules Directory](https://windsurf.com/editor/directory)

## Overview

Windsurf is an AI-native IDE (formerly Codeium) featuring Cascade, an agentic AI assistant. It offers a generous free tier and uses rules files for customization. Configuration includes workspace rules, global rules, and memories.

## File Structure

```
your-project/
├── .windsurfrules              # Legacy workspace rules (deprecated)
├── .codeiumignore              # Files to ignore
├── .windsurf/
│   └── rules/
│       ├── project.md          # Project-level rules
│       ├── testing.md          # Testing rules
│       └── patterns.md         # Code patterns
└── ~/.codeium/
    └── windsurf/
        └── memories/
            └── global_rules.md  # Global rules (all projects)
```

## Configuration Files

### Workspace Rules

Create `.windsurf/rules/*.md` files for project-specific guidance:

```markdown
# Project Rules

## Overview
QA Automation framework using TypeScript and Playwright.

## Tech Stack
- TypeScript 5.x (strict mode)
- Playwright for E2E testing
- Jest for unit tests
- Node.js 20+

## Code Style

### TypeScript
- Use async/await for async operations
- No `any` types - use `unknown` or proper generics
- Explicit return types on public functions
- Prefer const over let

### Naming Conventions
- Files: kebab-case (`user-service.ts`)
- Classes: PascalCase (`UserService`)
- Functions: camelCase (`createUser`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- Test files: `*.test.ts` or `*.spec.ts`

## Testing Patterns

### Structure
- AAA pattern: Arrange, Act, Assert
- One concept per test
- Descriptive names: `should [action] when [condition]`

### Selectors Priority
1. `data-testid` attributes
2. Accessible roles and labels
3. Text content
4. CSS selectors (last resort)

## Commands
- `npm run build` - Build project
- `npm run test` - Run all tests
- `npm run test:e2e` - Run E2E tests
- `npm run lint` - Run linter

## Project Structure
```
src/
  pages/      # Page Objects
  fixtures/   # Test data factories
  utils/      # Shared utilities
tests/
  e2e/        # E2E tests
  unit/       # Unit tests
```

## Do Not
- Use `any` type
- Hard-code test data
- Skip tests for coverage
- Commit secrets or credentials
```

### Global Rules

Located at `~/.codeium/windsurf/memories/global_rules.md`:

**Windows:** `C:\Users\{Username}\.codeium\windsurf\memories\global_rules.md`
**macOS/Linux:** `~/.codeium/windsurf/memories/global_rules.md`

Access via: **Windsurf Settings > Memories and Rules > Edit global rules**

```markdown
# Global Coding Rules

## General Preferences
- Always use TypeScript over JavaScript
- Prefer functional programming patterns
- Write self-documenting code
- Add comments only for complex logic

## Error Handling
- Use custom error classes
- Include error codes and messages
- Log errors with context
- Never swallow errors silently

## Security
- Never commit secrets
- Validate all user input
- Use parameterized queries
- Sanitize output for XSS prevention

## Git Workflow
- Use conventional commits
- Keep commits atomic
- Write meaningful commit messages
- Run tests before committing
```

## .codeiumignore

Exclude files from Cascade's context:

```gitignore
# Dependencies
node_modules/
.pnpm-store/
vendor/

# Build outputs
dist/
build/
.next/
out/

# IDE and OS
.idea/
.vscode/
*.swp
.DS_Store
Thumbs.db

# Secrets and credentials
.env*
*.pem
*.key
credentials.json
secrets/

# Large files
*.min.js
*.bundle.js
*.map

# Test outputs
coverage/
playwright-report/
test-results/
.nyc_output/

# Package locks (optional - large files)
package-lock.json
yarn.lock
pnpm-lock.yaml
```

### Global .codeiumignore

For enterprise users, create `~/.codeium/.codeiumignore` to apply across all projects.

## Cascade Features

### Memories

Cascade can automatically generate memories to retain context:

**Enable:** Settings > Memories and Rules > Auto-Generate Memories

Memories are stored in `.windsurf/memories/` and help Cascade remember:
- Project-specific patterns
- Your coding preferences
- Previous conversation context

### Rules Directory

Windsurf provides a [curated rules directory](https://windsurf.com/editor/directory) with examples for:
- Language-specific rules (TypeScript, Python, Go)
- Framework rules (React, Next.js, Django)
- Testing rules (Playwright, Jest, pytest)
- Project type rules (API, Frontend, Full-stack)

## Example Configurations

### QA Automation Project

#### .windsurf/rules/qa-automation.md

```markdown
# QA Automation Rules

## Framework
- Playwright for E2E testing
- Jest for unit tests
- Page Object Model pattern
- Factory pattern for test data

## Test Structure

### E2E Tests
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

test.describe('Login Feature', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login('user@example.com', 'password123');

    // Assert
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### Page Objects
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## Test Data
- Use factory functions
- Never hard-code credentials
- Reset state between tests
- Use unique data per test run

## Coverage Requirements
- Minimum 80% line coverage
- All critical paths tested
- Error scenarios covered
- Edge cases documented
```

### API Testing Project

#### .windsurf/rules/api-testing.md

```markdown
# API Testing Rules

## Framework
- Playwright API testing or Supertest
- Schema validation with Zod
- Response time assertions

## Test Patterns

### Request/Response
```typescript
import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  test('should create user successfully', async ({ request }) => {
    // Arrange
    const userData = {
      name: 'Test User',
      email: 'test@example.com'
    };

    // Act
    const response = await request.post('/api/users', {
      data: userData
    });

    // Assert
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      id: expect.any(String),
      name: userData.name,
      email: userData.email
    });
  });
});
```

## Validation
- Validate response schemas
- Check status codes explicitly
- Verify response headers
- Assert response times
```

## Migration from .windsurfrules

If using the legacy `.windsurfrules` file:

1. Create `.windsurf/rules/` directory
2. Move content to `.windsurf/rules/project.md`
3. Split into focused files if needed
4. Delete `.windsurfrules`

## Known Issues & Workarounds

### Rules Not Loading (2025)

Some users report rules not activating automatically. Workarounds:

1. **Explicitly load rules** - Mention the rules file in chat
2. **Use Cascade Memories** - Store rules as memories
3. **Restart Windsurf** - After creating/modifying rules
4. **Check file location** - Ensure `.windsurf/rules/` path is correct

### Best Practices for Reliability

1. Keep rules concise (under 200 lines per file)
2. Use clear, specific language
3. Include examples with both valid and invalid patterns
4. Test rules in a new conversation
5. Use global rules for preferences that should always apply

## Comparison with Other Tools

| Feature | Windsurf | Cursor | Claude Code |
|---------|----------|--------|-------------|
| Rules Location | `.windsurf/rules/` | `.cursor/rules/` | `CLAUDE.md` |
| Global Rules | `~/.codeium/windsurf/memories/` | User Settings | `~/.claude/CLAUDE.md` |
| Ignore File | `.codeiumignore` | `.cursorignore` | N/A |
| Free Tier | Generous | Limited | Limited |
| MCP Support | Limited | Yes | Yes |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Rules not loading | Restart Windsurf, check file paths |
| Global rules ignored | Verify `~/.codeium/windsurf/memories/global_rules.md` exists |
| Cascade not seeing files | Check `.codeiumignore`, file may be excluded |
| Slow performance | Reduce context by adding to `.codeiumignore` |
| Memories not working | Enable Auto-Generate Memories in settings |

## Resources

- [Windsurf Documentation](https://docs.windsurf.com/)
- [Windsurf Cascade Guide](https://docs.windsurf.com/windsurf/cascade/cascade)
- [Windsurf Rules Directory](https://windsurf.com/editor/directory)
- [Windsurf Changelog](https://windsurf.com/changelog)
- [Codeium GitHub Issues](https://github.com/Exafunction/codeium/issues)
