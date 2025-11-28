# GitHub Copilot Instructions

## Project: [Your Project Name]

These instructions help GitHub Copilot understand our project conventions and generate more accurate suggestions.

---

## Project Overview

[Brief description of what this project does]

**Type:** [Web App / API / CLI Tool / Library / etc.]
**Language:** [Primary language]
**Framework:** [Primary framework]

---

## Coding Standards

### General

- Use meaningful, descriptive variable and function names
- Keep functions small and focused (single responsibility)
- Write self-documenting code with clear intent
- Add comments only when the "why" isn't obvious
- Follow DRY (Don't Repeat Yourself) principle

### Naming Conventions

- **Variables:** camelCase
- **Functions:** camelCase, verb-first (e.g., `getUserById`)
- **Classes:** PascalCase
- **Constants:** UPPER_SNAKE_CASE
- **Files:** kebab-case (e.g., `user-service.ts`)

### Code Structure

- Maximum function length: 30 lines
- Maximum file length: 300 lines
- Maximum line length: 100 characters
- Use early returns to reduce nesting

---

## Patterns to Follow

### Error Handling

```javascript
// Always use try-catch for async operations
async function fetchData(id) {
    try {
        const result = await service.get(id);
        return { success: true, data: result };
    } catch (error) {
        logger.error('fetchData failed', { id, error });
        return { success: false, error: error.message };
    }
}
```

### API Responses

```javascript
// Success response
{ success: true, data: { ... } }

// Error response
{ success: false, error: "Error message" }
```

### Input Validation

- Validate all user input at API boundaries
- Use schema validation (Zod, Joi, or similar)
- Return clear validation error messages

---

## Architecture

### File Organization

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic
├── repositories/    # Data access
├── models/          # Data models/types
├── utils/           # Helper functions
├── middleware/      # Express middleware
└── config/          # Configuration
```

### Dependency Injection

- Pass dependencies through constructor/function parameters
- Avoid global state
- Makes testing easier

---

## Testing Requirements

- Write tests for all public functions
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test edge cases and error conditions
- Minimum coverage: 80%

---

## Security Requirements

### Never Generate

- Hardcoded credentials or API keys
- SQL queries with string concatenation
- Code that disables security features
- Unvalidated user input in commands

### Always Include

- Input validation for user data
- Parameterized database queries
- Proper error handling (no stack traces to users)
- Authentication checks where needed

---

## Files to Exclude from Context

When providing suggestions, exclude or be cautious with:

- `.env` files
- `**/config/secrets.*`
- `**/*credentials*`
- `**/keys/`
- Any file containing API keys or passwords

---

## Framework-Specific Guidelines

### [Framework Name] (customize for your stack)

- [Specific pattern 1]
- [Specific pattern 2]
- [Specific pattern 3]

---

## Common Tasks

### Creating a New API Endpoint

1. Add route in routes file
2. Create controller function
3. Implement service logic
4. Add input validation
5. Write tests

### Adding a New Feature

1. Create feature branch
2. Implement with tests
3. Update documentation
4. Create pull request

---

*Last Updated: [Date]*
