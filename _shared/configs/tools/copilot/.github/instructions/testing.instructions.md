---
applyTo: "tests/**/*.ts,tests/**/*.py,*.test.ts,*.spec.ts,test_*.py"
---

# Testing Guidelines

## Unit Tests

- Follow AAA pattern (Arrange, Act, Assert)
- One concept per test
- Mock all external dependencies
- Use descriptive names: `should do X when Y`
- Reset state in beforeEach/setup

## E2E Tests (Playwright)

- Use Page Object Model
- Use data-testid selectors
- Wait for elements properly
- Isolate tests (no shared state)
- Clean up test data

## Coverage

- Target 80%+ line coverage
- Cover all branches
- Test error conditions
- Include edge cases

## Test Data

- Use fixtures for test data
- Don't hardcode values
- Use factory functions
- Clean up after tests
