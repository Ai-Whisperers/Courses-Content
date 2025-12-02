# Exercise 2: API Integration Tests

## Objective

Use AI to generate comprehensive integration tests for a REST API.

## Duration: 2 hours

---

## Setup

### 1. Create Project

```bash
mkdir api-testing-lab
cd api-testing-lab
npm init -y
npm install express jest supertest --save-dev
```

### 2. Create Simple API

Create `app.js`:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let users = [];
let nextId = 1;

// Create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const user = { id: nextId++, name, email, createdAt: new Date() };
  users.push(user);

  res.status(201).json(user);
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// Update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(204).send();
});

// Reset for testing
app.post('/api/test/reset', (req, res) => {
  users = [];
  nextId = 1;
  res.status(200).json({ message: 'Reset complete' });
});

module.exports = app;
```

### 3. Configure Jest

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```

---

## Part 1: Generate Integration Tests (45 min)

### Task

Use Claude to generate comprehensive integration tests.

### Prompt

```
Generate supertest integration tests for this Express API.

[Paste app.js code]

Requirements:
- Test all 5 endpoints (POST, GET all, GET one, PUT, DELETE)
- For each endpoint test:
  - Success case (2xx)
  - Validation errors (400)
  - Not found errors (404)
  - Conflict errors (409 for POST)
- Reset database before each test
- Verify response structure
- Verify database state changes
- Use descriptive test names
- Group by endpoint with describe blocks

Include these specific scenarios:
1. Create user with valid data
2. Create user with missing name
3. Create user with invalid email
4. Create user with duplicate email
5. Get all users (empty)
6. Get all users (with data)
7. Get user by valid ID
8. Get user by invalid ID
9. Update user name
10. Update user email
11. Update non-existent user
12. Delete user
13. Delete non-existent user
```

### Steps

1. Start Claude in project directory
2. Paste the prompt with the app code
3. Save output to `app.test.js`
4. Run tests: `npm test`
5. Fix any failures

### Deliverable

- `app.test.js` with all tests passing

---

## Part 2: Review and Improve (30 min)

### Task

Review generated tests for quality.

### Quality Checklist

For each test, verify:

- [ ] Tests actual response status code
- [ ] Validates response body structure
- [ ] Checks specific field values
- [ ] Verifies side effects (database changes)
- [ ] Properly isolated (reset before each)
- [ ] Descriptive test name

### Common Issues to Fix

1. **Missing status checks**
   ```javascript
   // BAD
   const response = await request(app).get('/api/users');
   expect(response.body).toBeArray();

   // GOOD
   const response = await request(app).get('/api/users');
   expect(response.status).toBe(200);
   expect(response.body).toBeInstanceOf(Array);
   ```

2. **Incomplete validation**
   ```javascript
   // BAD
   expect(response.body).toBeDefined();

   // GOOD
   expect(response.body).toMatchObject({
     id: expect.any(Number),
     name: 'Test User',
     email: 'test@example.com',
     createdAt: expect.any(String)
   });
   ```

### Improvement Prompt

```
Review these integration tests and improve them:

[Paste tests]

Fix:
1. Add missing status code checks
2. Strengthen response body assertions
3. Verify database state where missing
4. Ensure proper test isolation
5. Add any missing edge cases
```

### Deliverable

- Improved tests with review notes

---

## Part 3: Add Edge Cases (30 min)

### Task

Add tests for additional edge cases.

### Prompt

```
Add these additional test cases to the integration test suite:

1. Create user with very long name (1000 chars)
2. Create user with special characters in name
3. Create user with Unicode in name
4. Get user with non-numeric ID
5. Update user with empty body
6. Create multiple users and verify list order
7. Delete user and verify GET returns 404
8. Concurrent creation with same email

Generate the additional tests following the same patterns.
```

### Deliverable

- Extended test suite with edge cases

---

## Part 4: Coverage Analysis (15 min)

### Task

Analyze and fill coverage gaps.

### Steps

1. Run coverage: `npm test`
2. Open `coverage/lcov-report/index.html`
3. Identify uncovered lines
4. Ask Claude for tests to cover gaps:

```
Coverage shows these uncovered lines in app.js:
[List lines]

Generate tests to cover these specific code paths.
```

### Deliverable

- Coverage report showing 90%+ coverage

---

## Submission

### Files

- `app.js` - API code
- `app.test.js` - Complete test suite
- `coverage/` - Coverage report

### Grading

| Criterion | Points |
|-----------|--------|
| All endpoints tested | 25 |
| Error cases covered | 25 |
| Test quality (assertions) | 25 |
| Coverage >= 90% | 15 |
| Edge cases | 10 |

---

## Bonus Challenge

Add authentication:

1. Add `POST /api/auth/login` endpoint
2. Add JWT token generation
3. Protect PUT and DELETE with auth
4. Test authenticated endpoints
5. Test auth errors (401, 403)

---

*Good luck!*
