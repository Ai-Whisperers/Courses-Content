# Project Context

## Overview
[Brief project description - update with your project details]

This is a [type] application that [main purpose]. It provides [key features].

## Tech Stack
- **Runtime:** Node.js 20+
- **Language:** TypeScript (strict mode)
- **Framework:** Express 4.x
- **Database:** PostgreSQL with Prisma ORM
- **Cache:** Redis
- **Testing:** Jest, Supertest, Playwright
- **Linting:** ESLint, Prettier
- **CI/CD:** GitHub Actions

## Project Structure

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic
├── models/          # Database models and types
├── middleware/      # Express middleware
├── routes/          # Route definitions
├── utils/           # Utility functions
└── config/          # Configuration files

tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/            # End-to-end tests
└── fixtures/       # Test data factories
```

## Coding Standards

### General Principles
- Use async/await for all asynchronous operations
- Handle errors explicitly (never silent catches)
- Add JSDoc comments for all public functions
- Use meaningful variable and function names
- Follow DRY (Don't Repeat Yourself) principle

### Naming Conventions
- Files: kebab-case (`user-service.ts`)
- Classes: PascalCase (`UserService`)
- Functions/Methods: camelCase (`createUser`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- Interfaces: PascalCase with `I` prefix (`IUserData`)
- Types: PascalCase (`UserResponse`)

### TypeScript Rules
- Enable strict mode in tsconfig.json
- No `any` types - use `unknown` if type is truly unknown
- Define interfaces for all objects
- Use type guards for runtime type checking
- Export types alongside implementations
- Use generics for reusable components

### Error Handling
- Create custom error classes extending base Error
- Include error codes for programmatic handling
- Include descriptive messages for debugging
- Log errors with full context (user, request ID, etc.)
- Return appropriate HTTP status codes
- Never expose internal errors to clients

## Testing Requirements

### Framework
- Jest for unit and integration tests
- Supertest for API endpoint tests
- Playwright for E2E browser tests

### Coverage
- Minimum: 80% line coverage
- Target: 90%+ for business logic
- Must cover all branches (if/else)

### Patterns
- Use AAA pattern: Arrange, Act, Assert
- One assertion concept per test
- Descriptive test names: `should_doThing_when_condition`
- Mock all external dependencies
- Reset state in beforeEach

### Test Data
- Use factories for test data
- Never use production data
- Clean up after tests

## Important Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build TypeScript

# Testing
npm test             # Run all tests
npm run test:unit    # Run unit tests only
npm run test:int     # Run integration tests
npm run test:e2e     # Run E2E tests
npm run test:coverage # Run with coverage report

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Run Prettier

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

## Key Files

### Configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest configuration
- `playwright.config.ts` - Playwright configuration
- `.eslintrc.js` - ESLint rules
- `prisma/schema.prisma` - Database schema

### Entry Points
- `src/index.ts` - Application entry
- `src/app.ts` - Express app setup
- `src/routes/index.ts` - Route aggregation

### Important Services
- `src/services/auth.service.ts` - Authentication
- `src/services/user.service.ts` - User management
- `src/middleware/auth.ts` - Auth middleware

## API Conventions

### Request/Response
- Use JSON for all requests/responses
- Include `Content-Type: application/json`
- Validate all input with Zod schemas
- Return consistent response format:
  ```json
  {
    "success": true,
    "data": { ... },
    "meta": { "page": 1, "total": 100 }
  }
  ```

### Error Responses
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [{ "field": "email", "message": "..." }]
  }
}
```

### HTTP Status Codes
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Git Workflow

- Main branch: `main` (protected)
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Commit messages: Conventional Commits format
- PRs require: Tests, Lint pass, Review

## Additional Documentation

@./docs/api-reference.md
@./docs/database-schema.md
@./docs/deployment.md
