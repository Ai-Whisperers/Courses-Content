# Project Context

## Overview

[Brief project description - update with your project details]

This is a [type] application that [main purpose]. It provides [key features].

## Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript (strict mode)
- **Framework:** Express 4.x
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Jest, Supertest, Playwright

## Coding Standards

### General
- Use async/await for asynchronous operations
- Handle all errors explicitly
- Add JSDoc comments for public functions
- Use meaningful names

### Naming
- Files: kebab-case (`user-service.ts`)
- Classes: PascalCase (`UserService`)
- Functions: camelCase (`createUser`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRIES`)

### TypeScript
- Strict mode enabled
- No `any` types
- Define interfaces for objects
- Use type guards

### Error Handling
- Custom error classes
- Error codes and messages
- Full context logging
- Appropriate HTTP status codes

## Testing

### Requirements
- Framework: Jest
- Coverage: 80% minimum
- Pattern: AAA (Arrange, Act, Assert)
- Mock external dependencies

### Structure
```typescript
describe('Service', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do thing when condition', async () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── models/          # Database models
├── middleware/      # Middleware
└── utils/           # Utilities

tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/            # E2E tests
```

## Commands

- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run build` - Build
- `npm run dev` - Dev server

@import ./docs/api-reference.md
@import ./docs/database-schema.md
