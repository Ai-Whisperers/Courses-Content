# GitHub Copilot Instructions

## Project Overview

This is a QA automation project using TypeScript/Python with Playwright for E2E testing.

## Code Style

### TypeScript
- Use async/await for asynchronous code
- No `any` types - use proper interfaces
- Add explicit return types to functions
- Use JSDoc for documentation
- Prefer const over let

### Python
- Use type hints for all functions
- Write Google-style docstrings
- Use absolute imports only
- Never use bare except clauses

### Naming Conventions
- Files: kebab-case (user-service.ts)
- Classes: PascalCase (UserService)
- Functions: camelCase (createUser)
- Constants: UPPER_SNAKE_CASE (MAX_RETRIES)
- Test files: *.test.ts or test_*.py

## Testing

### Test Pattern (AAA)
```typescript
it('should do X when Y', () => {
  // Arrange - setup
  const input = setupTestData();

  // Act - execute
  const result = functionUnderTest(input);

  // Assert - verify
  expect(result).toBe(expected);
});
```

### Page Object Model
```typescript
class LoginPage {
  constructor(private page: Page) {}

  private emailInput = this.page.locator('[data-testid="email"]');
  private passwordInput = this.page.locator('[data-testid="password"]');
  private submitButton = this.page.locator('[data-testid="submit"]');

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

### Test Requirements
- Target 80%+ coverage
- Test all branches
- Mock external dependencies
- Use factories for test data

## Error Handling

### Pattern
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

// Usage
throw new AppError('User not found', 'NOT_FOUND', 404);
```

### Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description"
  }
}
```

## Security Rules

- Never hardcode secrets
- Validate all user input
- Use parameterized queries
- Sanitize output to prevent XSS
- Use bcrypt for passwords

## API Conventions

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

### Request/Response
```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email"
  }
}
```

## Git Conventions

### Commit Format
```
type(scope): description

feat: add user authentication
fix: resolve login validation
test: add E2E for checkout
docs: update API reference
```

### Branch Names
- feature/add-auth
- fix/login-bug
- test/e2e-tests

## Commands

```bash
# Development
npm run dev
npm run build

# Testing
npm test
npx playwright test
npx playwright test --ui

# Quality
npm run lint
npm run format
```

## Preferences

- Prefer functional over class components (React)
- Use early returns for cleaner code
- Keep functions small and focused
- Add comments for complex logic only
- Use meaningful variable names
