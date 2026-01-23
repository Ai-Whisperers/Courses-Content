# Project Context for Claude

## Project: [Your Project Name]

This document provides context for Claude AI to assist with development tasks on this project.

---

## Project Overview

**Description:** [What does this project do?]

**Purpose:** [Why does it exist? What problem does it solve?]

**Users:** [Who uses this? Internal team, customers, etc.]

**Status:** [Development, Production, Maintenance]

---

## Tech Stack

### Core Technologies

| Layer | Technology | Version |
|-------|------------|---------|
| Language | [TypeScript/Python/Go/etc.] | [version] |
| Runtime | [Node.js/Python/etc.] | [version] |
| Framework | [Express/Django/etc.] | [version] |
| Database | [PostgreSQL/MongoDB/etc.] | [version] |

### Key Libraries

- **[Library 1]:** [What it's used for]
- **[Library 2]:** [What it's used for]
- **[Library 3]:** [What it's used for]

### Development Tools

- Testing: [Jest/pytest/etc.]
- Linting: [ESLint/Pylint/etc.]
- CI/CD: [GitHub Actions/Jenkins/etc.]

---

## Architecture Overview

### High-Level Architecture

```
[Client] --> [API Gateway] --> [Services] --> [Database]
                                   |
                                   v
                            [External APIs]
```

### Key Components

1. **[Component 1]:** [Description and responsibility]
2. **[Component 2]:** [Description and responsibility]
3. **[Component 3]:** [Description and responsibility]

### Data Flow

[Describe how data flows through the system]

---

## Project Structure

```
project-root/
├── src/
│   ├── controllers/      # API endpoint handlers
│   ├── services/         # Business logic
│   ├── repositories/     # Data access layer
│   ├── models/           # Type definitions
│   ├── middleware/       # Request middleware
│   └── utils/            # Utility functions
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
└── scripts/
```

---

## Coding Conventions

### Style Guide

- **Formatting:** [Prettier/Black/etc.] with default settings
- **Linting:** [ESLint/Pylint] with [config reference]
- **Commit Messages:** Conventional Commits format

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | camelCase | `userName` |
| Functions | camelCase | `getUserById` |
| Classes | PascalCase | `UserService` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Files | kebab-case | `user-service.ts` |

### Code Patterns

**Error Handling:**
```javascript
// Use Result type or try-catch with proper logging
try {
    const result = await operation();
    return { success: true, data: result };
} catch (error) {
    logger.error('Operation failed', { error });
    return { success: false, error: error.message };
}
```

**Dependency Injection:**
```javascript
// Services receive dependencies via constructor
class UserService {
    constructor(
        private userRepository: UserRepository,
        private emailService: EmailService
    ) {}
}
```

---

## Common Tasks

### Running the Project

```bash
# Install dependencies
npm install  # or: pip install -r requirements.txt

# Start development server
npm run dev  # or: python manage.py runserver

# Run tests
npm test     # or: pytest
```

### Database Operations

```bash
# Run migrations
npm run migrate  # or: python manage.py migrate

# Seed data
npm run seed
```

### Deployment

```bash
# Build for production
npm run build

# Deploy
npm run deploy  # or describe deployment process
```

---

## API Overview

### Authentication

[Describe auth mechanism: JWT, Sessions, API Keys, etc.]

### Common Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/users` | List users |
| GET | `/api/v1/users/:id` | Get user by ID |
| POST | `/api/v1/users` | Create user |
| PUT | `/api/v1/users/:id` | Update user |
| DELETE | `/api/v1/users/:id` | Delete user |

### Response Format

```json
// Success
{
    "success": true,
    "data": { ... }
}

// Error
{
    "success": false,
    "error": "Error message",
    "code": "ERROR_CODE"
}
```

---

## Important Files

| File | Purpose |
|------|---------|
| `src/index.ts` | Application entry point |
| `src/config/index.ts` | Configuration loading |
| `src/routes/index.ts` | Route definitions |
| `.env.example` | Environment variable template |

---

## Current Work Context

[Update this section with current focus areas, active features, or known issues]

### Active Features
- [ ] [Feature 1]
- [ ] [Feature 2]

### Known Issues
- [Issue 1]
- [Issue 2]

### Technical Debt
- [Item 1]
- [Item 2]

---

## Security Considerations

### Sensitive Areas
- Authentication logic in `src/auth/`
- Payment processing in `src/payments/`
- User data handling

### Never Commit
- API keys or secrets
- Customer data
- Internal URLs/IPs

---

## Helpful Context for AI Assistance

When asking for help:

1. **Reference this file** for project context
2. **Specify the component** you're working on
3. **Include relevant code** for context
4. **State constraints** (performance, compatibility, etc.)
5. **Describe expected behavior** clearly

---

*Last Updated: [Date]*
*Maintainer: [Name/Team]*
