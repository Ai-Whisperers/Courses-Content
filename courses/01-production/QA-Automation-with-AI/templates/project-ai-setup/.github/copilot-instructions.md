# Project Instructions for GitHub Copilot

## Overview

[Brief project description - update with your project details]

This is a [type] application that [main purpose]. It provides [key features].

## Technology Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript (strict mode)
- **Framework:** Express 4.x
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** Jest, Supertest, Playwright
- **Linting:** ESLint, Prettier

## Coding Standards

### General Principles
- Use async/await for all asynchronous operations
- Handle errors explicitly (never use silent catches)
- Add JSDoc comments for all public functions
- Use meaningful, descriptive variable and function names

### Naming Conventions
- Files: kebab-case (e.g., `user-service.ts`)
- Classes: PascalCase (e.g., `UserService`)
- Functions/Methods: camelCase (e.g., `createUser`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- Interfaces: PascalCase with `I` prefix (e.g., `IUserData`)

### TypeScript Requirements
- Enable strict mode
- No `any` types (use `unknown` if needed)
- Define interfaces for all objects
- Use type guards for runtime checks
- Export types with implementations

### Error Handling
- Create custom error classes
- Include error codes and messages
- Log errors with full context
- Return appropriate HTTP status codes
- Never expose internal errors to clients

## Testing Requirements

### Coverage
- Minimum: 80% line coverage
- All branches must be tested

### Patterns
- Use AAA pattern (Arrange, Act, Assert)
- One concept per test
- Descriptive names: `should_doThing_when_condition`
- Mock all external dependencies
- Reset state in beforeEach

### Example Test Structure

```typescript
describe('UserService', () => {
  let service: UserService;
  let mockDb: jest.Mocked<Database>;

  beforeEach(() => {
    mockDb = createMockDatabase();
    service = new UserService(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@example.com' };
      mockDb.users.create.mockResolvedValue({ id: 1, ...userData });

      // Act
      const result = await service.createUser(userData);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.name).toBe('Test');
      expect(mockDb.users.create).toHaveBeenCalledWith(userData);
    });

    it('should throw error when email is invalid', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'invalid' };

      // Act & Assert
      await expect(service.createUser(userData))
        .rejects.toThrow('Invalid email format');
    });
  });
});
```

## Project Structure

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic
├── models/          # Database models
├── middleware/      # Express middleware
├── routes/          # Route definitions
└── utils/           # Utility functions

tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── e2e/            # End-to-end tests
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message"
  }
}
```

## Important Patterns

### Service Layer
- Services contain business logic
- Inject dependencies through constructor
- Return typed results, throw typed errors
- No direct database access in controllers

### Repository Pattern
- Abstract database operations
- One repository per entity
- Use Prisma for queries
- Handle transactions properly

### Validation
- Use Zod schemas for input validation
- Validate at controller level
- Return 400 for validation errors
- Include field-specific error messages

## Commands

- `npm test` - Run all tests
- `npm run lint` - Run linter
- `npm run build` - Build project
- `npm run dev` - Development server
