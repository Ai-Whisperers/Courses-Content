# Project Agent Instructions

## Code Style

- Use TypeScript strict mode / Python type hints
- No `any` types
- Handle errors explicitly
- Add documentation for public APIs

## Testing

- Use Jest/pytest for unit tests
- Use Playwright for E2E tests
- Follow AAA pattern (Arrange, Act, Assert)
- Target 80%+ coverage

## Playwright E2E

- Use Page Object Model
- Prefer data-testid selectors
- Wait for elements properly
- Isolate tests

## Preferences

- Use descriptive test names: `should do X when Y`
- Use factory functions for test data
- Include both happy path and error cases
- Mock external dependencies

## Architecture

- Keep tests organized by feature
- One test file per feature/component
- Use fixtures for shared test data
- Clean up after tests
