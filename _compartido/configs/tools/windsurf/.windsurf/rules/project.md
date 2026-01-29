# Windsurf/Codeium Project Rules

> Updated December 2025 - Following latest Windsurf best practices

## Project Type

QA Automation with TypeScript/Python and Playwright

## Code Style

### TypeScript
- Async/await for async operations
- No `any` types - use `unknown` or proper generics
- Interfaces for all object types
- Explicit return types on public functions
- JSDoc comments for public APIs

### Python
- Type hints required on all functions
- Google-style docstrings
- Absolute imports only
- Specific exception handling (no bare except)

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `user-service.ts` |
| Classes | PascalCase | `UserService` |
| Functions | camelCase | `createUser` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Test files | `*.test.ts` / `test_*.py` | `login.test.ts` |

## Testing

### AAA Pattern
```typescript
test('should login successfully with valid credentials', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Act
  await loginPage.login('user@example.com', 'password123');

  // Assert
  await expect(page).toHaveURL('/dashboard');
});
```

### Page Object Model
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

### Test Requirements
- Minimum 80% line coverage
- Test all critical paths
- Mock all external dependencies
- Use factory functions for test data
- One concept per test

### Selector Priority
1. `data-testid` attributes (preferred)
2. Accessible roles and labels
3. Text content
4. CSS selectors (last resort)

## Error Handling

```typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Usage
throw new AppError('User not found', 'USER_NOT_FOUND', 404);
```

## Security Rules

- Never hardcode secrets or credentials
- Validate all user input
- Use parameterized database queries
- Sanitize output to prevent XSS
- Use environment variables for configuration

## Commands

```bash
# Development
npm run dev
npm run build

# Testing
npm test              # All tests
npm run test:unit     # Unit tests only
npx playwright test   # E2E tests
npx playwright test --ui  # Interactive mode

# Quality
npm run lint
npm run typecheck
```

## Git Workflow

- **Branch naming:** `feature/`, `fix/`, `test/`, `chore/`
- **Commits:** Conventional commit format
- **PR Requirements:** Tests pass, code reviewed
- **Pre-commit:** Run lint and tests

## Do Not

- Use `any` type in TypeScript
- Skip test coverage requirements
- Commit secrets or credentials
- Use hard-coded waits in E2E tests
- Modify shared configuration files without team review
- Use flaky selectors in tests
