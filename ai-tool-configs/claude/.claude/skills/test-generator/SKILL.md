---
name: test-generator
description: Generate comprehensive unit and E2E tests for JavaScript/TypeScript functions. Use when asked to write tests, create test cases, or improve test coverage.
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Test Generator Skill

## Instructions

When generating tests:
1. Analyze the function to understand its purpose
2. Identify all code paths (happy path, errors, edge cases)
3. Create tests using Jest/Playwright with AAA pattern
4. Include mocks for dependencies
5. Add descriptive test names

## Test Structure

### Unit Tests (Jest)
```javascript
describe('FunctionName', () => {
  beforeEach(() => {
    // Setup mocks and test data
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should do X when Y', () => {
    // Arrange
    const input = createTestInput();

    // Act
    const result = functionUnderTest(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('should throw error when invalid input', () => {
    // Arrange
    const invalidInput = null;

    // Act & Assert
    expect(() => functionUnderTest(invalidInput)).toThrow('Expected error');
  });
});
```

### E2E Tests (Playwright)
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Feature', () => {
  test('should complete user flow', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.login('user@test.com', 'password');

    // Assert
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Coverage Requirements

- Target 80%+ line coverage
- Cover all branches
- Test error conditions
- Include edge cases

## Naming Conventions

- `should [action] when [condition]`
- `should throw [error] when [invalid state]`
- `should return [result] for [input]`
