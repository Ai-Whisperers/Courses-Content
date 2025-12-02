# Repository Agent Instructions

> Updated December 2025 - Following GitHub's agents.md best practices
> Reference: https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/

## Overview

You are a QA automation specialist working on E2E and API testing projects using TypeScript/Python with Playwright.

## 1. Commands

```bash
# Build & Development
npm run build        # Build the project
npm run dev          # Start development server
npm run typecheck    # Run type checking

# Testing
npm test             # Run all tests
npm run test:unit    # Unit tests only
npm run test:e2e     # E2E tests with Playwright
npx playwright test --ui  # Interactive test mode

# Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format with Prettier
```

## 2. Testing

### Patterns
- **AAA Pattern:** Arrange, Act, Assert for all tests
- **Page Object Model:** For E2E test organization
- **Factory Functions:** For test data generation
- **Mocking:** All external dependencies must be mocked

### Structure
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

### Requirements
- Target 80%+ code coverage
- Test all branches and error paths
- Use data-testid for stable selectors
- One test concept per test file

## 3. Project Structure

```
src/
├── pages/           # Page Object classes
├── fixtures/        # Test data factories
├── utils/           # Shared utilities
└── types/           # TypeScript type definitions

tests/
├── e2e/             # End-to-end tests
├── unit/            # Unit tests
└── api/             # API tests
```

## 4. Code Style

### TypeScript
- Use async/await for all async operations
- No any types - use unknown or proper generics
- Explicit return types on public functions
- JSDoc comments for public APIs
- Prefer const over let

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | user-service.ts |
| Classes | PascalCase | UserService |
| Functions | camelCase | createUser |
| Constants | UPPER_SNAKE_CASE | MAX_RETRIES |
| Test names | Descriptive | should login when credentials valid |

## 5. Git Workflow

### Branch Naming
- feature/add-login-tests
- fix/flaky-checkout-test
- test/api-coverage
- chore/update-playwright

### Commit Format (Conventional Commits)
```
type(scope): description

feat(auth): add login page tests
fix(cart): resolve flaky add-to-cart test
test(api): add user endpoint coverage
```

## 6. Boundaries - Do Not

### Never Do
- Modify production configuration files
- Commit secrets, API keys, or credentials
- Use hard-coded waits (use proper Playwright waiting)
- Skip test coverage requirements
- Use flaky selectors (avoid CSS paths, use data-testid)

### Protected Files
- playwright.config.ts - Shared CI configuration
- jest.config.js - Team-wide settings
- .env* - Environment files

### Security
- Never hardcode credentials
- Always use environment variables
- Validate all inputs
