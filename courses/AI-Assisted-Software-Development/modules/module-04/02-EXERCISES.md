# Module 4: Exercises
## AI for Documentation

---

## Overview

**Total Time:** 40-50 minutes
**Tools:** Copilot Chat (/doc), Claude

---

## Exercise 1: Inline Comment Generation (10 minutes)

### Objective
Generate comprehensive inline documentation.

### Instructions

Document this undocumented code using Copilot's `/doc` command:

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

### Deliverable
All three functions with complete JSDoc comments including:
- Description
- Parameters with types
- Return value
- Example usage

---

## Exercise 2: README Creation (10 minutes)

### Objective
Generate a professional README file.

### Instructions

Create a README for a fictional project using this prompt with Claude:

```
Create a README.md for a Node.js CLI tool called "quick-deploy" that:
- Deploys projects to various cloud providers (AWS, GCP, Azure)
- Supports multiple frameworks (React, Vue, Node.js)
- Has a simple configuration file
- Offers both interactive and non-interactive modes

Include:
- Eye-catching title with badges
- Clear value proposition
- Installation (npm, yarn, global)
- Quick start (30-second demo)
- Configuration options table
- Command reference
- Examples for each cloud provider
- Troubleshooting section
- Contributing guidelines
- License (MIT)
```

### Deliverable
Complete README.md file (aim for 100-150 lines)

---

## Exercise 3: API Documentation (10 minutes)

### Objective
Generate OpenAPI/Swagger documentation.

### Instructions

Create OpenAPI spec for these routes:

```javascript
// User API routes
router.get('/users', listUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/avatar', uploadAvatar);
router.get('/users/:id/orders', getUserOrders);
```

### Prompt
```
Generate OpenAPI 3.0 specification (YAML) for these user management routes.

Include:
- Summary and description for each endpoint
- Path parameters
- Request body schemas (for POST/PUT)
- Response schemas with examples
- Error responses (400, 401, 403, 404, 500)
- Authentication requirement (Bearer token)

User schema:
- id (uuid)
- email (string, email format)
- name (string)
- role (enum: user, admin)
- createdAt (datetime)
```

### Deliverable
Complete OpenAPI YAML specification

---

## Exercise 4: Architecture Decision Record (10 minutes)

### Objective
Write an ADR using AI assistance.

### Instructions

Create an ADR for the following scenario:

**Context:** Your team needs to decide on a state management solution for a new React application. Options are Redux, Zustand, and React Context.

### Prompt
```
Write an Architecture Decision Record (ADR) for choosing Zustand over Redux and React Context for state management.

Context:
- Medium-sized React application
- 5 developers on team
- Need for simple but scalable state management
- TypeScript codebase
- Performance is important

Include:
- Clear status (Accepted)
- Detailed context
- Alternatives considered with pros/cons table
- Decision rationale
- Consequences (positive and negative)
- Follow-up actions
```

### Deliverable
Complete ADR document (ADR-001-state-management.md)

---

## Exercise 5: Changelog Generation (5 minutes)

### Objective
Generate changelog entries from commit messages.

### Instructions

Given these commit messages, generate a CHANGELOG entry:

```
feat: add user authentication with JWT
feat: implement password reset flow
fix: resolve race condition in session management
fix: correct token expiration validation
docs: update API documentation for auth endpoints
chore: upgrade bcrypt to v5.1.0
perf: optimize token verification
BREAKING: change login response format
```

### Prompt
```
Generate a CHANGELOG.md entry for version 2.0.0 from these commits.

Use Keep a Changelog format with sections:
- Added
- Changed
- Fixed
- Security
- Breaking Changes

Include brief descriptions expanding on commit messages.
```

### Deliverable
CHANGELOG entry for v2.0.0

---

## Exercise 6: Documentation Review (5 minutes)

### Objective
Use AI to review documentation quality.

### Instructions

Take the README you created in Exercise 2 and use this prompt:

```
Review this README for:
1. Completeness - Are all essential sections present?
2. Clarity - Is it easy to understand?
3. Accuracy - Are examples correct?
4. Accessibility - Can a new user follow it?
5. SEO - Will it be discoverable?

Provide:
- Score out of 10
- Specific improvements needed
- Missing sections
- Suggested additions
```

### Deliverable
Documentation review report with improvements

---

## Submission Checklist

- [ ] Exercise 1: Three functions documented
- [ ] Exercise 2: Complete README.md
- [ ] Exercise 3: OpenAPI specification
- [ ] Exercise 4: ADR document
- [ ] Exercise 5: CHANGELOG entry
- [ ] Exercise 6: Documentation review

---

## Reflection Questions

1. How much time did AI save compared to manual documentation?
2. What quality improvements did AI suggest?
3. Where did AI documentation fall short?
4. How will you integrate AI docs into your workflow?

---

*Module 4 Exercises - AI for Documentation*
*AI-Assisted Software Development Course*
