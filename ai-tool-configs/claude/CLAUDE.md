# Project Context

## Overview

[PROJECT_NAME] - A QA Automation project using AI-assisted development.

**Stage:** Development
**Primary Language:** TypeScript/Python
**Testing Focus:** QA Automation with Playwright

---

## Tech Stack

### Core Technologies
- **Runtime:** Node.js 20+ / Python 3.11+
- **Language:** TypeScript (strict mode) / Python with type hints
- **Framework:** Express / FastAPI / Playwright
- **Database:** PostgreSQL / SQLite
- **Testing:** Jest, pytest, Playwright

### Testing Stack
- **Unit Testing:** Jest / pytest
- **E2E Testing:** Playwright
- **API Testing:** Supertest / pytest
- **Coverage:** 80%+ target

---

## Project Structure

```
project/
├── src/                    # Application source
│   ├── services/           # Business logic
│   ├── models/             # Data models
│   └── utils/              # Utilities
├── tests/                  # Test suite
│   ├── unit/               # Unit tests
│   ├── e2e/                # Playwright tests
│   └── fixtures/           # Test data
├── pages/                  # Page Object Model
└── docs/                   # Documentation
```

---

## Coding Standards

### TypeScript
- Strict mode enabled
- No `any` types
- Interfaces for all objects
- Explicit return types
- JSDoc for public functions

### Python
- Type hints required
- Google-style docstrings
- Absolute imports only
- Specific exceptions

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `user-service.ts` |
| Classes | PascalCase | `UserService` |
| Functions | camelCase | `createUser` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Test files | `.test.ts` / `test_*.py` | `user.test.ts` |

---

## Testing Patterns

### AAA Pattern
```typescript
describe('Feature', () => {
  it('should do X when Y', () => {
    // Arrange - setup
    const input = createTestData();

    // Act - execute
    const result = functionUnderTest(input);

    // Assert - verify
    expect(result).toBe(expected);
  });
});
```

### Page Object Model
```typescript
class LoginPage {
  constructor(private page: Page) {}

  private emailInput = this.page.locator('[data-testid="email"]');
  private passwordInput = this.page.locator('[data-testid="password"]');
  private submitBtn = this.page.locator('[data-testid="submit"]');

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }
}
```

---

## Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build project
npm run lint         # Lint code
```

### Testing
```bash
npm test             # All tests
npm run test:unit    # Unit tests
npx playwright test  # E2E tests
npx playwright test --ui  # UI mode
```

---

## Error Handling

### Custom Errors
```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}
```

---

## Git Workflow

- **Branches:** `feature/`, `fix/`, `test/`
- **Commits:** Conventional format
- **PR Requirements:** Tests pass, reviewed

---

## Important Notes

### Security
- No secrets in code
- Validate all input
- Use parameterized queries
- Sanitize output

### Performance
- Use indexes
- Paginate results
- Cache when appropriate

---

## Additional Context

When working on this project:
1. Always run tests before committing
2. Use Page Object Model for E2E tests
3. Follow AAA pattern for unit tests
4. Keep test coverage above 80%
5. Use meaningful test names that describe behavior
