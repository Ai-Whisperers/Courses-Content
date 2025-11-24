# Module 6: Test Implementation - Exercises

**Total Time**: 6.5 hours
**Format**: Individual work with instructor review

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

This module contains three comprehensive hands-on exercises designed to master test implementation with AI:

1. **Exercise 6.1**: Unit Test Generation (2 hours)
2. **Exercise 6.2**: API Integration Tests (2 hours)
3. **Exercise 6.3**: E2E Testing with Playwright (2.5 hours)

Each exercise includes setup, tasks, prompts, deliverables, and grading rubrics.

---

# Exercise 6.1: Unit Test Generation

**Objective**: Generate comprehensive unit tests using AI with proper mocking and isolation

**Duration**: 2 hours

**Difficulty**: Intermediate

---

## Setup

### 1. Create Project

```bash
mkdir unit-testing-lab
cd unit-testing-lab
npm init -y
npm install jest uuid --save-dev
```

### 2. Configure Jest

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch"
  },
  "jest": {
    "testEnvironment": "node",
    "coverageThreshold": {
      "global": {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    }
  }
}
```

### 3. Create Code Under Test

Create `src/orderProcessor.js`:

```javascript
const { v4: uuidv4 } = require('uuid');

class OrderProcessor {
  constructor(inventoryService, pricingService, notificationService, logger) {
    this.inventoryService = inventoryService;
    this.pricingService = pricingService;
    this.notificationService = notificationService;
    this.logger = logger;
  }

  async createOrder(customerId, items) {
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (!items || items.length === 0) {
      throw new Error('Order must contain at least one item');
    }

    // Validate all items have required fields
    for (const item of items) {
      if (!item.productId || !item.quantity) {
        throw new Error('Each item must have productId and quantity');
      }
      if (item.quantity <= 0) {
        throw new Error('Quantity must be positive');
      }
    }

    // Check inventory for all items
    const inventoryChecks = await Promise.all(
      items.map(item =>
        this.inventoryService.checkAvailability(item.productId, item.quantity)
      )
    );

    const unavailable = items.filter((item, index) => !inventoryChecks[index]);
    if (unavailable.length > 0) {
      const ids = unavailable.map(i => i.productId).join(', ');
      throw new Error(`Insufficient inventory for: ${ids}`);
    }

    // Calculate pricing
    const lineItems = await Promise.all(
      items.map(async item => {
        const price = await this.pricingService.getPrice(item.productId);
        const discount = await this.pricingService.getDiscount(
          customerId,
          item.productId
        );
        const finalPrice = price * (1 - discount);
        return {
          ...item,
          unitPrice: price,
          discount,
          finalPrice,
          total: finalPrice * item.quantity
        };
      })
    );

    // Calculate totals
    const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
    const tax = this.calculateTax(subtotal);
    const total = subtotal + tax;

    // Create order
    const order = {
      id: uuidv4(),
      customerId,
      items: lineItems,
      subtotal,
      tax,
      total,
      status: 'pending',
      createdAt: new Date()
    };

    this.logger.info(`Order created: ${order.id}`, { customerId, total });

    // Reserve inventory
    await Promise.all(
      items.map(item =>
        this.inventoryService.reserve(item.productId, item.quantity)
      )
    );

    // Send notification
    try {
      await this.notificationService.sendOrderConfirmation(customerId, order);
    } catch (error) {
      // Log but don't fail order
      this.logger.warn(`Failed to send confirmation: ${error.message}`);
    }

    return order;
  }

  calculateTax(subtotal) {
    const TAX_RATE = 0.08;
    return Math.round(subtotal * TAX_RATE * 100) / 100;
  }

  async cancelOrder(orderId, reason) {
    if (!orderId) {
      throw new Error('Order ID is required');
    }

    this.logger.info(`Cancelling order: ${orderId}`, { reason });

    // Would typically fetch order and release inventory
    return {
      orderId,
      status: 'cancelled',
      reason,
      cancelledAt: new Date()
    };
  }
}

module.exports = OrderProcessor;
```

---

## Part 1: Basic Unit Tests (30 min)

### Task

Generate unit tests for the happy path and basic validation.

### Prompt for AI

```
Generate Jest unit tests for this OrderProcessor class.

[Paste orderProcessor.js code]

Requirements:
1. Mock all dependencies (inventoryService, pricingService, notificationService, logger)
2. Test createOrder happy path
3. Test all validation errors:
   - Missing customerId
   - Empty items array
   - Invalid item (missing productId)
   - Invalid item (missing quantity)
   - Zero/negative quantity
4. Test calculateTax method

For each test:
- Use descriptive test names
- Setup mocks in beforeEach
- Reset mocks in afterEach
- Use AAA pattern (Arrange-Act-Assert)
- Make specific assertions
```

### Expected Output

Create `src/orderProcessor.test.js` with:
- `describe` block for OrderProcessor
- `beforeEach` setting up mocks
- `afterEach` clearing mocks
- At least 7 test cases
- All tests following AAA pattern

### Deliverable

- `src/orderProcessor.test.js` with basic tests
- All tests passing: `npm test`

---

## Part 2: Advanced Mocking (30 min)

### Task

Add tests for complex scenarios requiring advanced mocking.

### Prompt for AI

```
Add tests for these complex scenarios to the existing test file:

1. Inventory check failures
   - Single item unavailable
   - Multiple items unavailable
   - Inventory service throws error

2. Pricing scenarios
   - Different prices per product
   - Customer-specific discounts
   - No discount available (0% discount)
   - Pricing service error

3. Async behavior verification
   - All inventory checks run in parallel
   - All pricing calls run in parallel
   - All reservations run in parallel

4. Notification handling
   - Successful notification
   - Failed notification (order still succeeds)
   - Notification error is logged

5. Logging verification
   - Info logged on success
   - Warn logged on notification failure

Use these Jest mocking features:
- mockResolvedValue / mockRejectedValue
- mockImplementation for complex logic
- toHaveBeenCalledWith for verification
- toHaveBeenCalledTimes for parallel checks
```

### Expected Output

Extended test file with:
- 10+ additional test cases
- Advanced mock configurations
- Verification of call counts
- Error handling tests

### Deliverable

- Extended `src/orderProcessor.test.js`
- All tests passing
- Mocks properly verified

---

## Part 3: Edge Cases (30 min)

### Task

Add tests for edge cases and boundary conditions.

### Prompt for AI

```
Add edge case tests to the test suite:

1. Boundary Values
   - Single item order
   - Order with 100 items (maximum)
   - Minimum quantity (1)
   - Large quantity (10000)
   - Zero subtotal (100% discount)
   - Very small amounts (rounding test: $0.01)
   - Very large amounts ($999,999.99)

2. Data Type Edge Cases
   - String customer ID
   - Numeric customer ID
   - Product ID as number vs string
   - Fractional quantity (should it work or fail?)
   - null vs undefined values

3. Calculation Accuracy
   - Tax rounding edge case (8.88 * 0.08 = 0.71 not 0.70)
   - Multiple items with decimal prices
   - Large totals (no overflow)

4. Order Properties Validation
   - UUID format validation
   - Date type verification
   - Status value is 'pending'
   - Line item structure is complete
   - No password or sensitive data in order

Include tests that verify exact values, not just types.
```

### Expected Output

- 12+ edge case tests
- Boundary value testing
- Exact value assertions
- Data type validation

### Deliverable

- Complete edge case coverage in test file
- All edge cases passing

---

## Part 4: Test Quality Review (30 min)

### Task

Review and improve test quality.

### Quality Checklist

Review your tests and verify:

- [ ] Each test has one clear purpose
- [ ] Test names describe behavior not implementation
- [ ] Mocks are properly reset between tests
- [ ] Assertions are specific (not just `toBeDefined`)
- [ ] Edge cases are covered
- [ ] Error messages are verified (exact text)
- [ ] Async behavior is properly awaited
- [ ] No test interdependencies
- [ ] Tests run in any order
- [ ] No commented-out code

### Improvement Prompt for AI

```
Review these tests for quality issues:

[Paste your complete test file]

Identify and fix:
1. Weak assertions (make them specific)
2. Missing error message checks
3. Incomplete mock verification
4. Test isolation issues
5. Missing edge cases
6. Unclear test names
7. Redundant test code

Provide the improved version with comments explaining each fix.
```

### Deliverable

- Reviewed and improved test file
- Quality checklist all checked
- Comments explaining improvements

---

## Submission

### Files Required

```
unit-testing-lab/
├── package.json
├── src/
│   ├── orderProcessor.js
│   └── orderProcessor.test.js
└── coverage/
    └── lcov-report/index.html
```

### Test Requirements

- ✓ Minimum 25 test cases
- ✓ All tests passing
- ✓ 100% line coverage
- ✓ 100% branch coverage
- ✓ No test interdependencies

### Run Commands

```bash
npm test                 # Run all tests
npm run test:coverage    # Run with coverage
npm run test:watch       # Watch mode
```

### Grading Rubric (100 points)

| Criterion | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|-----------|-------------------|--------------|---------------------------|---------------------|
| **Basic Tests** (20 pts) | All validation tests present, perfect assertions | All tests present, minor issues | Missing some tests | Many tests missing |
| **Advanced Mocking** (25 pts) | Complex scenarios fully tested, mocks verified | Good mocking, minor gaps | Some mocking issues | Poor mock setup |
| **Edge Cases** (25 pts) | Comprehensive edge cases, boundary testing | Good edge case coverage | Some edge cases missing | Minimal edge cases |
| **Test Quality** (20 pts) | Excellent assertions, clear names, isolated | Good quality, minor issues | Some quality issues | Poor quality |
| **Coverage** (10 pts) | 100% line and branch | 90-99% coverage | 80-89% coverage | <80% coverage |

**Passing Grade:** 70 points

---

## Bonus Challenge (+10 points)

1. Add tests for `cancelOrder` method
2. Implement snapshot testing for order structure
3. Add performance test (order with 100 items completes <100ms)
4. Use `jest.spyOn` instead of mock injection
5. Create factory functions for test data

---

# Exercise 6.2: API Integration Tests

**Objective**: Use AI to generate comprehensive integration tests for a REST API

**Duration**: 2 hours

**Difficulty**: Intermediate

---

## Setup

### 1. Create Project

```bash
mkdir api-testing-lab
cd api-testing-lab
npm init -y
npm install express jest supertest --save-dev
```

### 2. Configure Jest

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"]
  }
}
```

### 3. Create API Application

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

---

## Part 1: Generate Integration Tests (45 min)

### Task

Use AI to generate comprehensive integration tests for all API endpoints.

### Prompt for AI

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
- Verify response status codes
- Verify database state changes
- Use descriptive test names
- Group by endpoint with describe blocks

Include these specific scenarios:
1. Create user with valid data
2. Create user with missing name
3. Create user with missing email
4. Create user with invalid email format
5. Create user with duplicate email
6. Get all users when empty
7. Get all users with data
8. Get user by valid ID
9. Get user by invalid ID
10. Update user name
11. Update user email
12. Update non-existent user
13. Delete user
14. Delete non-existent user
```

### Steps

1. Start your AI tool in the project directory
2. Paste the prompt with the app code
3. Save output to `app.test.js`
4. Run tests: `npm test`
5. Fix any failures

### Expected Output

`app.test.js` with:
- 5 describe blocks (one per endpoint)
- 14+ test cases
- `beforeEach` for database reset
- Status code checks
- Response body validation

### Deliverable

- `app.test.js` with all tests passing
- Coverage report showing 90%+ coverage

---

## Part 2: Review and Improve (30 min)

### Task

Review generated tests for quality and strengthen them.

### Quality Checklist

For each test, verify:

- [ ] Tests actual response status code
- [ ] Validates response body structure
- [ ] Checks specific field values
- [ ] Verifies side effects (database changes)
- [ ] Properly isolated (reset before each)
- [ ] Descriptive test name
- [ ] No hard-coded IDs (use created data)

### Common Issues to Fix

**Issue 1: Missing Status Checks**
```javascript
// ❌ BAD
const response = await request(app).get('/api/users');
expect(response.body).toBeInstanceOf(Array);

// ✅ GOOD
const response = await request(app).get('/api/users');
expect(response.status).toBe(200);
expect(response.body).toBeInstanceOf(Array);
```

**Issue 2: Incomplete Validation**
```javascript
// ❌ BAD
expect(response.body).toBeDefined();

// ✅ GOOD
expect(response.body).toMatchObject({
  id: expect.any(Number),
  name: 'Test User',
  email: 'test@example.com',
  createdAt: expect.any(String)
});
```

**Issue 3: Not Verifying Database State**
```javascript
// ❌ BAD - Only checks response
await request(app).post('/api/users').send(userData);

// ✅ GOOD - Verifies database
const response = await request(app).post('/api/users').send(userData);
const getResponse = await request(app).get(`/api/users/${response.body.id}`);
expect(getResponse.body.email).toBe(userData.email);
```

### Improvement Prompt for AI

```
Review these integration tests and improve them:

[Paste your test file]

Fix:
1. Add missing status code checks
2. Strengthen response body assertions (use toMatchObject with exact values)
3. Verify database state where missing (use GET to confirm)
4. Ensure proper test isolation (check beforeEach)
5. Add any missing edge cases
6. Make test names more descriptive

Provide improved version with comments explaining changes.
```

### Deliverable

- Improved `app.test.js` with review notes
- All quality checklist items verified

---

## Part 3: Add Edge Cases (30 min)

### Task

Add tests for additional edge cases and scenarios.

### Prompt for AI

```
Add these additional test cases to the integration test suite:

1. Data validation edge cases:
   - Create user with very long name (1000 characters)
   - Create user with special characters in name (!@#$%^&*)
   - Create user with Unicode characters (émoji, 中文)
   - Create user with email at maximum length

2. API edge cases:
   - Get user with non-numeric ID ('abc')
   - Get user with negative ID (-1)
   - Update user with empty body {}
   - Update user with only name (email unchanged)
   - Update user with only email (name unchanged)

3. Batch operations:
   - Create multiple users (5) and verify list order
   - Delete first user, verify list shifts
   - Delete middle user, other users unaffected
   - Get all after deleting all users (empty array)

4. Idempotency:
   - Delete same user twice (second returns 404)
   - Get non-existent user multiple times (always 404)

5. Concurrent operations:
   - Create two users with same email simultaneously (one should fail)

Generate the additional tests following the same patterns.
Ensure each test is independent and properly isolated.
```

### Expected Output

- 12+ additional edge case tests
- All tests passing
- No test interdependencies

### Deliverable

- Extended test suite with edge cases
- All tests passing: `npm test`

---

## Part 4: Coverage Analysis (15 min)

### Task

Analyze coverage and fill any gaps.

### Steps

1. **Run coverage report:**
   ```bash
   npm run test:coverage
   ```

2. **Open coverage report:**
   ```bash
   # Open coverage/lcov-report/index.html in browser
   ```

3. **Identify uncovered lines:**
   - Click on `app.js` in the report
   - Yellow/red lines are not covered
   - Note line numbers

4. **Generate tests for gaps:**

```
Coverage shows these uncovered lines in app.js:
- Line 15: Email validation edge case
- Line 48: Update with invalid email format
- Line 67: Delete endpoint error handling

Generate tests to cover these specific code paths.
For each uncovered line, create a test that executes that code.
```

### Expected Output

- Coverage report showing 90%+ coverage
- Additional tests for uncovered paths

### Deliverable

- Coverage report: `coverage/lcov-report/index.html`
- 90%+ line coverage
- 85%+ branch coverage

---

## Submission

### Files Required

```
api-testing-lab/
├── package.json
├── app.js
├── app.test.js
└── coverage/
    └── lcov-report/
        └── index.html
```

### Test Requirements

- ✓ All 5 endpoints tested
- ✓ Success and error cases covered
- ✓ Minimum 25 test cases
- ✓ All tests passing
- ✓ Coverage >= 90% lines
- ✓ Coverage >= 85% branches

### Grading Rubric (100 points)

| Criterion | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|-----------|-------------------|--------------|---------------------------|---------------------|
| **Endpoint Coverage** (25 pts) | All endpoints, all scenarios | All endpoints, missing some scenarios | Some endpoints missing | Many endpoints missing |
| **Error Cases** (25 pts) | All error types tested | Most error types | Some error types | Few error types |
| **Test Quality** (25 pts) | Strong assertions, DB verification | Good assertions | Weak assertions | Very weak assertions |
| **Coverage** (15 pts) | >= 90% lines | 85-89% lines | 80-84% lines | < 80% lines |
| **Edge Cases** (10 pts) | Comprehensive edge cases | Good edge cases | Some edge cases | Few edge cases |

**Passing Grade:** 70 points

---

## Bonus Challenge (+10 points)

Add authentication to the API and test it:

1. Add `POST /api/auth/login` endpoint
2. Add JWT token generation
3. Protect PUT and DELETE with auth middleware
4. Test authenticated endpoints
5. Test auth errors (401 Unauthorized)
6. Test authorization errors (403 Forbidden)

---

# Exercise 6.3: E2E Testing with Playwright

**Objective**: Generate and implement end-to-end tests using Playwright with AI assistance

**Duration**: 2.5 hours

**Difficulty**: Intermediate-Advanced

---

## Setup

### 1. Create Project

```bash
mkdir e2e-testing-lab
cd e2e-testing-lab
npm init -y
npm install @playwright/test
npx playwright install
```

### 2. Create Application Under Test

Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
    h1 { color: #333; }
    .todo-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .todo-item.completed span {
      text-decoration: line-through;
      color: #888;
    }
    .todo-item input[type="checkbox"] { margin-right: 10px; }
    .todo-item button { margin-left: auto; color: red; }
    #new-todo { width: 70%; padding: 10px; }
    #add-btn { padding: 10px 20px; }
    .filters { margin: 20px 0; }
    .filters button { margin-right: 10px; padding: 5px 10px; }
    .filters button.active { font-weight: bold; background: #007bff; color: white; }
    #clear-completed { float: right; }
    #todo-count { color: #666; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Todo List</h1>

  <div>
    <input type="text" id="new-todo" placeholder="What needs to be done?" data-testid="new-todo">
    <button id="add-btn" data-testid="add-btn">Add</button>
  </div>

  <div class="filters">
    <button class="active" data-filter="all" data-testid="filter-all">All</button>
    <button data-filter="active" data-testid="filter-active">Active</button>
    <button data-filter="completed" data-testid="filter-completed">Completed</button>
    <button id="clear-completed" data-testid="clear-completed">Clear Completed</button>
  </div>

  <div id="todo-list" data-testid="todo-list"></div>

  <div id="todo-count" data-testid="todo-count">0 items left</div>

  <script>
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    let filter = 'all';

    function render() {
      const list = document.getElementById('todo-list');
      const filtered = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      });

      list.innerHTML = filtered.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}" data-testid="todo-item">
          <input type="checkbox" ${todo.completed ? 'checked' : ''}
                 onchange="toggleTodo(${todo.id})" data-testid="todo-checkbox">
          <span data-testid="todo-text">${todo.text}</span>
          <button onclick="deleteTodo(${todo.id})" data-testid="delete-btn">Delete</button>
        </div>
      `).join('');

      const active = todos.filter(t => !t.completed).length;
      document.getElementById('todo-count').textContent =
        `${active} item${active !== 1 ? 's' : ''} left`;

      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo() {
      const input = document.getElementById('new-todo');
      const text = input.value.trim();
      if (!text) return;

      todos.push({
        id: Date.now(),
        text,
        completed: false
      });

      input.value = '';
      render();
    }

    function toggleTodo(id) {
      todos = todos.map(t =>
        t.id === id ? {...t, completed: !t.completed} : t
      );
      render();
    }

    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      render();
    }

    document.getElementById('add-btn').addEventListener('click', addTodo);
    document.getElementById('new-todo').addEventListener('keypress', e => {
      if (e.key === 'Enter') addTodo();
    });

    document.querySelectorAll('.filters button[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        document.querySelectorAll('.filters button[data-filter]').forEach(b =>
          b.classList.remove('active')
        );
        btn.classList.add('active');
        render();
      });
    });

    document.getElementById('clear-completed').addEventListener('click', () => {
      todos = todos.filter(t => !t.completed);
      render();
    });

    render();
  </script>
</body>
</html>
```

### 3. Create Directory Structure

```bash
mkdir -p pages tests
```

---

## Part 1: Page Object Model (45 min)

### Task

Generate a Page Object Model for the todo application.

### Prompt for AI

```
Create a Playwright Page Object Model for this todo application in TypeScript.

[Paste index.html]

Create pages/TodoPage.ts with:

1. Properties for all selectors (using data-testid)

2. Methods for all user actions:
   - navigate() - Go to the page
   - addTodo(text) - Add a new todo
   - toggleTodo(index) - Toggle completion
   - deleteTodo(index) - Delete a todo
   - filterBy(filter: 'all' | 'active' | 'completed') - Apply filter
   - clearCompleted() - Clear completed todos
   - getTodoCount() - Get "X items left" count
   - getTodoTexts() - Get array of all visible todo texts
   - isTodoCompleted(index) - Check if todo is completed
   - getTodoByText(text) - Get todo element by text

3. Use Playwright best practices:
   - Use this.page.locator() for selectors
   - Leverage auto-waiting
   - Use data-testid attributes
   - Return meaningful values from methods
   - Add helper methods as needed

Include TypeScript types and JSDoc comments.
```

### Expected Output

Create `pages/TodoPage.ts` with:
- Class definition with constructor
- Private selectors as properties
- Public methods for all actions
- TypeScript type annotations
- Clear, descriptive method names

### Deliverable

- `pages/TodoPage.ts` - Complete Page Object implementation

---

## Part 2: Core E2E Tests (45 min)

### Task

Generate comprehensive E2E tests using the Page Object.

### Prompt for AI

```
Generate Playwright E2E tests using the TodoPage Page Object.

Test file: tests/todo.spec.ts

Test scenarios organized by describe blocks:

1. Adding Todos:
   - Add single todo and verify it appears
   - Add multiple todos (3) and verify all appear
   - Add todo using Enter key (not button)
   - Cannot add empty todo (button click does nothing)
   - Count updates correctly after adding

2. Completing Todos:
   - Toggle todo to completed (has strikethrough)
   - Toggle completed todo back to active
   - Count decreases when marking complete
   - Count increases when marking active

3. Deleting Todos:
   - Delete single todo
   - Delete all todos
   - Deleted todo is removed from list
   - Count updates after deletion

4. Filtering:
   - Show all todos (default)
   - Show only active todos
   - Show only completed todos
   - Filter persists after adding new todo
   - Active filter button is highlighted

5. Clear Completed:
   - Removes only completed todos
   - Active todos remain
   - Count updates correctly
   - Works with filters applied

6. Persistence:
   - Todos persist after page reload
   - Completed state persists after reload
   - Filter resets to "All" after reload

Requirements:
- Use beforeEach for navigation and cleanup
- Use describe blocks for grouping
- Make specific assertions (exact text, count)
- Test both success cases and edge cases
- Verify visual changes (strikethrough, etc.)
```

### Expected Output

Create `tests/todo.spec.ts` with:
- 6 describe blocks
- 18+ test cases
- beforeEach setup
- TodoPage usage
- Strong assertions

### Deliverable

- `tests/todo.spec.ts` - Complete test suite
- All tests passing: `npx playwright test`

---

## Part 3: Visual and Accessibility Tests (30 min)

### Task

Add visual regression and accessibility tests.

### Prompt for AI

```
Add visual and accessibility tests to the todo application.

Create tests/visual.spec.ts:

1. Visual Regression Tests:
   - Empty state screenshot (no todos)
   - List with items screenshot (3 todos)
   - Completed items screenshot (2 active, 2 completed)
   - Filtered view screenshot (active only)
   - Use toHaveScreenshot() for comparisons

2. Responsive Tests:
   - Mobile viewport (iPhone 12)
   - Tablet viewport (iPad)
   - Desktop viewport (1920x1080)
   - Verify layout doesn't break

Create tests/accessibility.spec.ts:

1. Keyboard Navigation:
   - Tab to input field
   - Type and press Enter to add
   - Tab through todos
   - Delete with keyboard

2. Screen Reader Support:
   - Check for appropriate labels
   - Verify semantic HTML
   - Test focus management

3. Visual Accessibility:
   - Check text contrast
   - Verify focus indicators visible
   - Test with increased font size

Use Playwright's built-in capabilities and best practices.
```

### Expected Output

- `tests/visual.spec.ts` with screenshot tests
- `tests/accessibility.spec.ts` with a11y tests
- Screenshots generated in `tests/screenshots/`

### Deliverable

- Visual test file with screenshot comparisons
- Accessibility test file
- All tests passing

---

## Part 4: Advanced Scenarios (30 min)

### Task

Test complex user journeys and edge cases.

### Prompt for AI

```
Generate tests for advanced scenarios.

Create tests/advanced.spec.ts:

1. Complex User Journey:
   - User adds 5 tasks
   - Completes 3 tasks
   - Filters to see only active
   - Deletes one active task
   - Clears completed tasks
   - Verifies final state (1 active task remaining)
   - Use step-by-step verification

2. Edge Cases:
   - Very long todo text (500 characters)
   - Special characters in todo (!@#$%^&*)
   - HTML injection attempt (<script>alert('xss')</script>)
   - XSS attempt in todo text
   - Adding 50 todos (performance)
   - Rapid add/delete (10 operations quickly)

3. Error Recovery:
   - Clear localStorage and reload (empty state)
   - Corrupt localStorage data (handles gracefully)
   - Multiple browser tabs (localStorage sync)

4. Performance:
   - Page load time < 2s
   - Add todo operation < 100ms
   - Filter change < 50ms
   - Deleting 50 todos < 1s

Include:
- test.step() for complex journeys
- Performance timing measurements
- Detailed assertions at each step
- Error handling verification
```

### Expected Output

- `tests/advanced.spec.ts` with complex scenarios
- Performance measurements
- Security testing (XSS, injection)

### Deliverable

- Advanced test file
- All tests passing
- Performance benchmarks documented

---

## Part 5: Playwright Configuration (20 min)

### Task

Configure Playwright for optimal test execution.

### Prompt for AI

```
Create an optimal playwright.config.ts for this project.

Include:
1. Multiple browsers (Chromium, Firefox, WebKit)
2. Mobile device emulation (iPhone 12, iPad)
3. Screenshot on failure
4. Video on first retry
5. Trace on failure
6. Parallel execution (4 workers)
7. Retries for flaky tests (2 retries)
8. CI-specific configuration (detect CI environment)
9. Multiple reporters (HTML, JSON, GitHub Actions)
10. Base URL configuration (use file:// protocol for index.html)
11. Timeout settings (30s test timeout)
12. Global setup/teardown

Include detailed comments explaining each setting.
Use TypeScript.
```

### Expected Output

`playwright.config.ts` with:
- Browser projects (chromium, firefox, webkit)
- Mobile device projects
- Retry configuration
- Reporter configuration
- Timeout settings
- CI detection

### Deliverable

- `playwright.config.ts` - Complete configuration
- Tests run on all browsers
- HTML report generated

---

## Submission

### Files Required

```
e2e-testing-lab/
├── package.json
├── playwright.config.ts
├── index.html
├── pages/
│   └── TodoPage.ts
├── tests/
│   ├── todo.spec.ts
│   ├── visual.spec.ts
│   ├── accessibility.spec.ts
│   └── advanced.spec.ts
└── playwright-report/
    └── index.html
```

### Test Requirements

- ✓ All test files created
- ✓ All tests passing on Chromium
- ✓ Tests pass on Firefox and WebKit
- ✓ Page Object Model used correctly
- ✓ Screenshots generated
- ✓ HTML report generated

### Run Commands

```bash
npx playwright test                    # Run all tests
npx playwright test --ui               # UI mode (debugging)
npx playwright test --project=chromium # Single browser
npx playwright show-report             # View report
npx playwright codegen                 # Record actions
```

### Grading Rubric (100 points)

| Criterion | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|-----------|-------------------|--------------|---------------------------|---------------------|
| **Page Object** (25 pts) | Complete, well-structured, reusable | Good structure, minor issues | Some structural issues | Poor structure |
| **Core Tests** (25 pts) | All scenarios covered, strong assertions | Most scenarios, good assertions | Some scenarios missing | Many scenarios missing |
| **Visual/A11y** (20 pts) | Comprehensive visual and a11y tests | Good coverage | Limited coverage | Minimal coverage |
| **Advanced Scenarios** (20 pts) | Complex journeys, edge cases, performance | Good scenarios | Some scenarios | Few scenarios |
| **Configuration** (10 pts) | Optimal config, all browsers | Good config, some browsers | Basic config | Poor config |

**Passing Grade:** 70 points

---

## Bonus Challenge (+10 points)

1. Add API mocking using Playwright's `route` API
2. Implement custom fixtures for test data
3. Create a test data factory for todos
4. Add GitHub Actions workflow for E2E tests
5. Implement parallel test execution across shards

---

## Tips for All Exercises

**Debugging:**
- Use `npx playwright test --ui` for visual debugging
- Use `npx playwright codegen` to record actions
- Check `playwright-report/index.html` for detailed results
- Use `test.only()` to run single test

**Best Practices:**
- Keep selectors in Page Objects
- Use data-testid for stability
- Avoid hard-coded waits
- Write descriptive test names
- Group related tests with describe blocks

**AI Prompting:**
- Provide complete context (show the code)
- Be specific about requirements
- Request TypeScript types
- Ask for comments/explanations
- Iterate if output isn't perfect

---

**Ready to implement production-ready tests? Let's go!** 🚀

[Continue to Lab →](./03-LAB.md)
