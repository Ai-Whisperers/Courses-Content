# Windsurf/Codeium Project Rules

## Project Type
QA Automation with TypeScript/Python and Playwright

## Code Style

### TypeScript
- Async/await for async operations
- No `any` types
- Interfaces for objects
- Explicit return types
- JSDoc comments

### Python
- Type hints required
- Google docstrings
- Absolute imports
- Specific exceptions

### Naming
- Files: kebab-case
- Classes: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

## Testing

### Pattern
```typescript
it('should X when Y', () => {
  // Arrange
  const input = setup();
  // Act
  const result = test(input);
  // Assert
  expect(result).toBe(expected);
});
```

### Page Objects
```typescript
class LoginPage {
  constructor(private page: Page) {}

  private email = this.page.locator('[data-testid="email"]');
  private password = this.page.locator('[data-testid="password"]');

  async login(email: string, pass: string) {
    await this.email.fill(email);
    await this.password.fill(pass);
  }
}
```

### Requirements
- 80%+ coverage
- Test all branches
- Mock externals
- Use factories

## Error Handling

```typescript
class AppError extends Error {
  constructor(msg: string, public code: string, public status = 500) {
    super(msg);
  }
}
```

## Security

- No hardcoded secrets
- Validate input
- Parameterized queries
- Sanitize output

## Commands

```bash
npm test
npx playwright test
npm run lint
```

## Git

- Conventional commits
- Test before commit
- Focused PRs
