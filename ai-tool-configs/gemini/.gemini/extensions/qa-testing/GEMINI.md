# QA Testing Extension

## Purpose

Provides QA automation testing utilities and patterns for Playwright E2E testing.

## Testing Patterns

### AAA Pattern
```typescript
it('should do X when Y', () => {
  // Arrange
  const input = setupTestData();

  // Act
  const result = functionUnderTest(input);

  // Assert
  expect(result).toBe(expected);
});
```

### Page Object Model
```typescript
class LoginPage {
  constructor(private page: Page) {}

  private emailInput = this.page.getByTestId('email');
  private passwordInput = this.page.getByTestId('password');
  private submitButton = this.page.getByRole('button', { name: 'Sign in' });

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## Locator Priority

1. data-testid attributes
2. Role-based: getByRole()
3. Text-based: getByText()
4. Label-based: getByLabel()
5. CSS selectors (last resort)

## Commands

- `/generate-test` - Generate tests for code
- `/review-code` - Review for quality/security
- `/create-page-object` - Create POM class
