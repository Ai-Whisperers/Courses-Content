# Project: [Project Name]

## Overview

[Brief description of what this project does - 2-3 sentences]

## Tech Stack

- **Language**: [e.g., TypeScript, Python]
- **Framework**: [e.g., React, Express, FastAPI]
- **Database**: [e.g., PostgreSQL, MongoDB]
- **Testing**: [e.g., Jest, pytest, Playwright]
- **CI/CD**: [e.g., GitHub Actions, GitLab CI]

## Architecture

[Brief description of architecture - monolith, microservices, etc.]

### Key Directories

- `src/` - Main source code
  - `services/` - Business logic
  - `api/` - API endpoints/routes
  - `models/` - Data models
  - `utils/` - Utility functions
- `tests/` - Test files
  - `unit/` - Unit tests
  - `integration/` - Integration tests
  - `e2e/` - End-to-end tests
- `config/` - Configuration files
- `docs/` - Documentation

## Code Conventions

### Naming
- Files: [kebab-case / camelCase / snake_case]
- Functions: [camelCase / snake_case]
- Classes: [PascalCase]
- Constants: [SCREAMING_SNAKE_CASE]

### Style
- [Use Prettier/Black for formatting]
- [Use ESLint/Ruff for linting]
- [Max line length: 100/120 characters]

### Patterns
- [Prefer functional components / classes]
- [Use dependency injection]
- [Follow SOLID principles]

## Testing Requirements

### Frameworks
- Unit: [Jest / pytest]
- Integration: [supertest / pytest]
- E2E: [Playwright / Cypress]

### Conventions
- Test file naming: `[name].test.[ext]` / `test_[name].py`
- Test function naming: `test_[feature]_[scenario]_[expected]`
- Use AAA pattern (Arrange, Act, Assert)

### Coverage Targets
- Lines: [80%]
- Branches: [75%]
- Functions: [80%]

### What to Test
- All public API endpoints
- All business logic functions
- All error handling paths
- All edge cases

### What to Mock
- External APIs
- Database in unit tests (real DB for integration)
- Time-dependent functions
- Random functions

## Important Files

- `[file1]` - [description]
- `[file2]` - [description]
- `[file3]` - [description]
- `[file4]` - [description]

## Environment Variables

- `DATABASE_URL` - Database connection string
- `API_KEY` - External API key
- `NODE_ENV` / `ENVIRONMENT` - Environment (development/test/production)

## Current Focus

[Describe what you're currently working on]

### Goals
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

### Constraints
- [Any specific constraints or requirements]
- [Things to avoid]
- [Performance requirements]

## Special Instructions

[Any specific instructions for AI assistance]

- [Instruction 1]
- [Instruction 2]
- [Instruction 3]

---

*Last updated: [Date]*
