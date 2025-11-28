# Module 2: Exercises
## GitHub Copilot Mastery

---

## Overview

These exercises progressively build your Copilot skills from basic generation to complex multi-file projects.

**Total Time:** 45-60 minutes
**Deliverables:** Multiple code files, API endpoints

---

## Exercise 1: Basic Code Generation (5 minutes)

### Objective
Practice writing effective comments for simple functions.

### Instructions

Create a file `utilities.js` and generate these functions using comments:

### Function 1: String Utilities
```javascript
// Function to capitalize the first letter of each word in a string
// Input: "hello world" Output: "Hello World"
// Handle edge cases: empty string, single word, multiple spaces
```

### Function 2: Number Utilities
```javascript
// Function to check if a number is prime
// Returns true if prime, false otherwise
// Handle edge cases: negative numbers, 0, 1, 2
```

### Function 3: Array Utilities
```javascript
// Function to remove duplicates from an array while preserving order
// Works with any data type (numbers, strings, objects by reference)
// Returns new array, does not modify original
```

### Evaluation
- [ ] All three functions generated correctly
- [ ] Edge cases handled appropriately
- [ ] Code is clean and readable

---

## Exercise 2: Class Generation (10 minutes)

### Objective
Generate a complete class with multiple methods.

### Instructions

Create a file `ShoppingCart.js` and use this comment block:

```javascript
/**
 * ShoppingCart class for e-commerce applications
 *
 * Properties:
 * - items: array of { productId, name, price, quantity }
 * - userId: string
 * - createdAt: Date
 *
 * Methods:
 * - addItem(product, quantity): Add item or increase quantity if exists
 * - removeItem(productId): Remove item from cart
 * - updateQuantity(productId, quantity): Update item quantity
 * - getSubtotal(): Calculate sum of all items
 * - getItemCount(): Get total number of items
 * - clear(): Empty the cart
 * - toJSON(): Convert cart to plain object
 *
 * @example
 * const cart = new ShoppingCart('user123');
 * cart.addItem({ id: 'prod1', name: 'Laptop', price: 999 }, 1);
 * cart.getSubtotal(); // 999
 */
class ShoppingCart {
  // Let Copilot generate...
}
```

### Tasks
1. Let Copilot generate the entire class
2. Test each method manually
3. Add a `applyDiscount(percentage)` method using comments

### Deliverable
Complete `ShoppingCart.js` with all methods working.

---

## Exercise 3: Async/Await Generation (10 minutes)

### Objective
Generate async functions with proper error handling.

### Instructions

Create a file `api-client.js`:

### Function 1: Fetch Wrapper
```javascript
// Async function to fetch data from an API
// Parameters: url (string), options (RequestInit)
// Features:
// - Timeout after 10 seconds
// - Retry 3 times on failure with exponential backoff
// - Parse JSON response automatically
// - Throw custom APIError on failure with status code
async function fetchWithRetry(url, options = {}) {
  // Let Copilot generate...
}
```

### Function 2: Parallel Fetching
```javascript
// Async function to fetch multiple URLs in parallel
// Parameters: urls (string[])
// Returns: array of results in same order as input
// If any request fails, include error object instead of result
// Use Promise.allSettled internally
async function fetchAll(urls) {
  // Let Copilot generate...
}
```

### Function 3: Rate-Limited Fetching
```javascript
// Async function to fetch URLs with rate limiting
// Parameters: urls (string[]), maxConcurrent (number), delayMs (number)
// Process only maxConcurrent requests at a time
// Wait delayMs between batches
// Return all results
async function fetchWithRateLimit(urls, maxConcurrent = 5, delayMs = 1000) {
  // Let Copilot generate...
}
```

### Deliverable
Complete `api-client.js` with all three functions and basic tests.

---

## Exercise 4: Express Route Generation (10 minutes)

### Objective
Generate RESTful API endpoints using Copilot.

### Instructions

Create a file `routes/products.js`:

### Setup
```javascript
const express = require('express');
const router = express.Router();

// Product data store (in-memory for exercise)
let products = [
  { id: '1', name: 'Laptop', price: 999, category: 'electronics', stock: 50 },
  { id: '2', name: 'Mouse', price: 29, category: 'electronics', stock: 200 },
  { id: '3', name: 'Desk', price: 199, category: 'furniture', stock: 30 }
];

// Utility: Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
```

### Generate These Endpoints

```javascript
// GET /products
// Query params: category, minPrice, maxPrice, inStock
// Returns filtered array of products
// Sort by name alphabetically

// GET /products/:id
// Returns single product or 404

// POST /products
// Body: { name, price, category, stock }
// Validate all fields required
// Return created product with generated id

// PUT /products/:id
// Update product by id
// Return updated product or 404

// DELETE /products/:id
// Delete product by id
// Return { success: true } or 404

// GET /products/stats
// Return { totalProducts, totalValue, categoryCounts, lowStockCount }
```

### Deliverable
Complete `routes/products.js` with all endpoints.

---

## Exercise 5: Copilot Chat Practice (10 minutes)

### Objective
Master Copilot Chat slash commands.

### Instructions

Using the code from previous exercises:

### Task 1: /explain
Select the `fetchWithRetry` function and use `/explain`:
- Note the explanation quality
- Ask follow-up questions

### Task 2: /fix
Add this buggy code and use `/fix`:

```javascript
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}
```

### Task 3: /tests
Select the `ShoppingCart` class and use `/tests`:
- Review generated tests
- Note coverage of edge cases

### Task 4: /optimize
Select any function and use `/optimize`:
- Compare original vs. suggested
- Evaluate if optimization is beneficial

### Deliverable
Document what each command produced and your evaluation.

---

## Exercise 6: Multi-File Generation (10 minutes)

### Objective
Generate consistent code across multiple files.

### Instructions

Create a simple MVC structure:

### File 1: models/Task.js
```javascript
// Task model class
// Properties: id, title, description, status, priority, dueDate, createdAt, updatedAt
// Status enum: 'pending', 'in_progress', 'completed', 'cancelled'
// Priority enum: 'low', 'medium', 'high'
// Include validation method
// Include static method to create from plain object
```

### File 2: services/TaskService.js
```javascript
// TaskService class
// Handles business logic for tasks
// Methods: create, findAll, findById, update, delete, findByStatus, findOverdue
// Use the Task model from models/Task.js
```

### File 3: controllers/TaskController.js
```javascript
// TaskController class
// HTTP request handlers for task routes
// Methods map to TaskService methods
// Handle errors and return appropriate responses
// Use TaskService from services/TaskService.js
```

### Key Insight
Keep all three files open while working. Copilot uses context from open tabs.

### Deliverable
Three files with consistent patterns and proper imports.

---

## Exercise 7: Documentation Generation (5 minutes)

### Objective
Generate comprehensive documentation with Copilot.

### Instructions

Take any function from previous exercises and generate:

### JSDoc Documentation
```javascript
// Use /doc command on a function to generate JSDoc
// Or write:

/**
 * [Let Copilot generate full documentation]
 */
```

### README Section
```markdown
# Task API

## Endpoints

[Use Copilot to generate endpoint documentation]

### Create Task

[Generate request/response examples]
```

### Deliverable
One fully documented function and README section.

---

## Exercise 8: Test Generation (10 minutes)

### Objective
Generate comprehensive test suites.

### Instructions

For the `ShoppingCart` class, generate tests:

### Method 1: Using /tests Command
1. Select the entire ShoppingCart class
2. Open Copilot Chat
3. Use `/tests`
4. Review and refine output

### Method 2: Comment-Driven Tests
```javascript
// Test suite for ShoppingCart class
// Test cases:
// - Constructor creates empty cart with userId
// - addItem adds new item correctly
// - addItem increases quantity for existing item
// - removeItem removes item from cart
// - removeItem does nothing for non-existent item
// - getSubtotal calculates correct total
// - getSubtotal returns 0 for empty cart
// - clear removes all items
// - applyDiscount reduces subtotal correctly
// - applyDiscount throws for invalid percentage

describe('ShoppingCart', () => {
  // Let Copilot generate all tests
});
```

### Deliverable
Complete test file with 10+ test cases.

---

## Exercise 9: Refactoring with Copilot (5 minutes)

### Objective
Use Copilot to improve existing code.

### Instructions

Take this poorly written function and refactor:

```javascript
function processOrder(o) {
  var t = 0;
  for (var i = 0; i < o.items.length; i++) {
    t = t + o.items[i].price * o.items[i].qty;
  }
  if (o.coupon) {
    if (o.coupon.type == 'percent') {
      t = t - (t * o.coupon.value / 100);
    } else {
      t = t - o.coupon.value;
    }
  }
  if (t < 0) t = 0;
  var tax = t * 0.08;
  t = t + tax;
  if (o.shipping == 'express') {
    t = t + 15;
  } else if (o.shipping == 'standard') {
    t = t + 5;
  }
  return { subtotal: t - tax - (o.shipping == 'express' ? 15 : 5), tax: tax, shipping: o.shipping == 'express' ? 15 : 5, total: t };
}
```

### Tasks
1. Select the function
2. Use `/simplify` or `/optimize`
3. Also try asking Chat: "Refactor this function for readability"
4. Compare outputs

### Deliverable
Refactored version with clear variable names and structure.

---

## Exercise 10: Challenge - Build a Feature (15 minutes)

### Objective
Build a complete feature using maximum AI assistance.

### The Challenge

Build a **User Authentication System** with:

1. **User model** with password hashing
2. **Auth service** with register and login
3. **JWT token generation and validation**
4. **Auth middleware** for protected routes
5. **Auth routes** (POST /register, POST /login, GET /me)

### Rules
- Use Copilot for 80%+ of code
- Track time spent
- Note where you had to intervene

### Starter Comment
```javascript
// User Authentication System
//
// Features:
// - Password hashing with bcrypt
// - JWT tokens for session management
// - Protected route middleware
//
// Flow:
// 1. User registers with email/password
// 2. Password is hashed before storage
// 3. Login returns JWT token
// 4. Token used for authenticated requests
// 5. Middleware validates token and attaches user
```

### Deliverable
Complete auth system with all components.

### Evaluation
| Criteria | Points |
|----------|--------|
| User model complete | 10 |
| Auth service working | 15 |
| JWT generation/validation | 15 |
| Middleware functional | 10 |
| Routes implemented | 10 |
| Code quality | 10 |
| AI usage (80%+) | 10 |

---

## Submission Checklist

Before moving to Module 3:

- [ ] Exercise 1: utilities.js with 3 functions
- [ ] Exercise 2: ShoppingCart.js class
- [ ] Exercise 3: api-client.js async functions
- [ ] Exercise 4: products routes
- [ ] Exercise 5: Chat command documentation
- [ ] Exercise 6: MVC structure files
- [ ] Exercise 7: Documentation samples
- [ ] Exercise 8: Test suite
- [ ] Exercise 9: Refactored function
- [ ] Exercise 10: Auth system (challenge)

---

## Reflection Questions

After completing these exercises:

1. Which exercise was most challenging for Copilot?
2. What comment patterns worked best?
3. How did your prompting style evolve?
4. When did you need to intervene most?
5. What's your acceptance rate approximately?

---

*Module 2 Exercises - GitHub Copilot Mastery*
*AI-Assisted Software Development Course*
