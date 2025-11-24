# Module 6: Test Implementation - Integrated Hands-On Lab

**Duration**: 3-4 hours
**Format**: Integrated hands-on lab
**Difficulty**: Intermediate-Advanced

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

This integrated lab combines all test implementation skills into a comprehensive project. You'll implement a complete test suite including unit tests, integration tests, and E2E tests for a real-world e-commerce checkout feature.

### Learning Objectives

By completing this lab, you will:
- Implement unit tests with comprehensive mocking
- Create integration tests with database verification
- Build E2E tests using Page Object Model
- Debug failing tests with AI assistance
- Achieve 90%+ code coverage
- Generate production-ready test suites

### Prerequisites

- Completion of Modules 1-5
- AI tool (Claude Code, GitHub Copilot, or Cursor) configured
- Node.js 18+ installed
- Git installed
- Basic understanding of JavaScript and testing concepts

---

## Lab Scenario

You're working on **ShopHub**, an e-commerce platform. Your task is to implement comprehensive tests for the **shopping cart and checkout** feature before it goes to production. The feature is code-complete, but has zero test coverage.

**Your Mission:**
1. Implement unit tests for cart business logic (80%+ coverage)
2. Create integration tests for cart API endpoints (90%+ coverage)
3. Build E2E tests for the checkout user journey
4. Debug any failures and achieve all tests passing
5. Generate coverage reports and documentation

---

## Part 1: Project Setup (30 minutes)

### Step 1.1: Clone and Setup Project

```bash
# Create project directory
mkdir shophub-testing-lab
cd shophub-testing-lab

# Initialize project
npm init -y

# Install dependencies
npm install express uuid

# Install testing dependencies
npm install --save-dev \
  jest \
  supertest \
  @playwright/test \
  @faker-js/faker

# Initialize Playwright
npx playwright install
```

**Expected Output**: All dependencies installed successfully

---

### Step 1.2: Create Application Code

Create the following directory structure:

```
shophub-testing-lab/
├── src/
│   ├── services/
│   │   └── cartService.js
│   ├── api/
│   │   └── cartRoutes.js
│   └── app.js
├── public/
│   └── checkout.html
├── __tests__/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── package.json
```

**Create `src/services/cartService.js`:**

```javascript
const { v4: uuidv4 } = require('uuid');

class CartService {
  constructor(inventoryService, pricingService, discountService) {
    this.inventoryService = inventoryService;
    this.pricingService = pricingService;
    this.discountService = discountService;
  }

  async addItem(cart, productId, quantity = 1) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }

    // Check inventory
    const available = await this.inventoryService.checkStock(productId, quantity);
    if (!available) {
      throw new Error('Insufficient stock');
    }

    // Check if item already in cart
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    return this.recalculateCart(cart);
  }

  async removeItem(cart, productId) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId !== productId);

    if (cart.items.length === initialLength) {
      throw new Error('Item not found in cart');
    }

    return this.recalculateCart(cart);
  }

  async updateQuantity(cart, productId, quantity) {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    if (quantity === 0) {
      return this.removeItem(cart, productId);
    }

    const item = cart.items.find(item => item.productId === productId);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    // Check inventory for new quantity
    const available = await this.inventoryService.checkStock(productId, quantity);
    if (!available) {
      throw new Error('Insufficient stock for requested quantity');
    }

    item.quantity = quantity;
    return this.recalculateCart(cart);
  }

  async recalculateCart(cart) {
    // Get prices for all items
    const itemsWithPrices = await Promise.all(
      cart.items.map(async item => {
        const price = await this.pricingService.getPrice(item.productId);
        return {
          ...item,
          unitPrice: price,
          subtotal: price * item.quantity
        };
      })
    );

    cart.items = itemsWithPrices;
    cart.subtotal = itemsWithPrices.reduce((sum, item) => sum + item.subtotal, 0);

    // Apply discounts
    const discount = await this.discountService.calculateDiscount(cart);
    cart.discount = discount;
    cart.total = cart.subtotal - discount;

    return cart;
  }

  async checkout(cart, customerId, paymentMethod) {
    if (!customerId) {
      throw new Error('Customer ID is required');
    }

    if (!paymentMethod) {
      throw new Error('Payment method is required');
    }

    if (cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // Validate all items still in stock
    const stockChecks = await Promise.all(
      cart.items.map(item =>
        this.inventoryService.checkStock(item.productId, item.quantity)
      )
    );

    if (stockChecks.some(check => !check)) {
      throw new Error('Some items are no longer in stock');
    }

    // Create order
    const order = {
      id: uuidv4(),
      customerId,
      items: cart.items,
      subtotal: cart.subtotal,
      discount: cart.discount,
      total: cart.total,
      paymentMethod,
      status: 'pending',
      createdAt: new Date()
    };

    return order;
  }

  createCart(customerId) {
    return {
      id: uuidv4(),
      customerId,
      items: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      createdAt: new Date()
    };
  }
}

module.exports = CartService;
```

**Create `src/api/cartRoutes.js`:**

```javascript
const express = require('express');
const router = express.Router();

// In-memory cart storage (for demo purposes)
const carts = new Map();

function getCartService() {
  // This would be injected via dependency injection in real app
  const CartService = require('../services/cartService');
  const mockInventory = {
    checkStock: async () => true
  };
  const mockPricing = {
    getPrice: async (productId) => {
      const prices = { 'prod-1': 29.99, 'prod-2': 49.99, 'prod-3': 19.99 };
      return prices[productId] || 10.00;
    }
  };
  const mockDiscount = {
    calculateDiscount: async (cart) => cart.subtotal >= 100 ? 10 : 0
  };
  return new CartService(mockInventory, mockPricing, mockDiscount);
}

// Create cart
router.post('/carts', (req, res) => {
  const { customerId } = req.body;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  const cartService = getCartService();
  const cart = cartService.createCart(customerId);
  carts.set(cart.id, cart);

  res.status(201).json(cart);
});

// Get cart
router.get('/carts/:id', (req, res) => {
  const cart = carts.get(req.params.id);

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  res.json(cart);
});

// Add item to cart
router.post('/carts/:id/items', async (req, res) => {
  const cart = carts.get(req.params.id);

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const { productId, quantity } = req.body;

  try {
    const cartService = getCartService();
    const updatedCart = await cartService.addItem(cart, productId, quantity);
    carts.set(cart.id, updatedCart);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update item quantity
router.put('/carts/:id/items/:productId', async (req, res) => {
  const cart = carts.get(req.params.id);

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const { quantity } = req.body;

  try {
    const cartService = getCartService();
    const updatedCart = await cartService.updateQuantity(
      cart,
      req.params.productId,
      quantity
    );
    carts.set(cart.id, updatedCart);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove item from cart
router.delete('/carts/:id/items/:productId', async (req, res) => {
  const cart = carts.get(req.params.id);

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  try {
    const cartService = getCartService();
    const updatedCart = await cartService.removeItem(cart, req.params.productId);
    carts.set(cart.id, updatedCart);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Checkout
router.post('/carts/:id/checkout', async (req, res) => {
  const cart = carts.get(req.params.id);

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const { paymentMethod } = req.body;

  try {
    const cartService = getCartService();
    const order = await cartService.checkout(cart, cart.customerId, paymentMethod);
    // Clear cart after successful checkout
    carts.delete(req.params.id);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Test helper: Reset carts
router.post('/test/reset', (req, res) => {
  carts.clear();
  res.json({ message: 'Carts cleared' });
});

module.exports = router;
```

**Create `src/app.js`:**

```javascript
const express = require('express');
const cartRoutes = require('./api/cartRoutes');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', cartRoutes);

module.exports = app;
```

**Create `public/checkout.html`:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>ShopHub - Checkout</title>
  <style>
    body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
    .cart-item { padding: 10px; border: 1px solid #ddd; margin: 10px 0; }
    button { padding: 10px; margin: 5px; }
    .total { font-size: 1.5em; font-weight: bold; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>Shopping Cart</h1>

  <div id="cart" data-testid="cart">
    <!-- Cart items will be rendered here -->
  </div>

  <div class="total" data-testid="cart-total">Total: $0.00</div>

  <div>
    <h3>Add Product</h3>
    <select id="product-select" data-testid="product-select">
      <option value="prod-1">Product 1 - $29.99</option>
      <option value="prod-2">Product 2 - $49.99</option>
      <option value="prod-3">Product 3 - $19.99</option>
    </select>
    <input type="number" id="quantity" value="1" min="1" data-testid="quantity-input">
    <button onclick="addToCart()" data-testid="add-to-cart">Add to Cart</button>
  </div>

  <div style="margin-top: 20px;">
    <h3>Checkout</h3>
    <select id="payment-method" data-testid="payment-method">
      <option value="credit-card">Credit Card</option>
      <option value="paypal">PayPal</option>
    </select>
    <button onclick="checkout()" data-testid="checkout-button">Checkout</button>
  </div>

  <div id="message" data-testid="message" style="margin-top: 20px; color: green;"></div>

  <script>
    let cartId = null;
    let customerId = 'customer-123';

    async function initCart() {
      const response = await fetch('/api/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId })
      });
      const cart = await response.json();
      cartId = cart.id;
      renderCart(cart);
    }

    async function addToCart() {
      const productId = document.getElementById('product-select').value;
      const quantity = parseInt(document.getElementById('quantity').value);

      const response = await fetch(`/api/carts/${cartId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      });

      const cart = await response.json();
      renderCart(cart);
    }

    async function updateQuantity(productId, quantity) {
      const response = await fetch(`/api/carts/${cartId}/items/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });

      const cart = await response.json();
      renderCart(cart);
    }

    async function removeItem(productId) {
      const response = await fetch(`/api/carts/${cartId}/items/${productId}`, {
        method: 'DELETE'
      });

      const cart = await response.json();
      renderCart(cart);
    }

    async function checkout() {
      const paymentMethod = document.getElementById('payment-method').value;

      const response = await fetch(`/api/carts/${cartId}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod })
      });

      const order = await response.json();

      if (response.ok) {
        document.getElementById('message').textContent =
          `Order ${order.id} placed successfully! Total: $${order.total.toFixed(2)}`;
        document.getElementById('cart').innerHTML = '<p>Cart is empty</p>';
        document.querySelector('.total').textContent = 'Total: $0.00';
      } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').textContent = order.error;
      }
    }

    function renderCart(cart) {
      const cartDiv = document.getElementById('cart');

      if (cart.items.length === 0) {
        cartDiv.innerHTML = '<p data-testid="empty-cart">Cart is empty</p>';
      } else {
        cartDiv.innerHTML = cart.items.map(item => `
          <div class="cart-item" data-testid="cart-item">
            <span data-testid="product-id">${item.productId}</span> -
            Quantity: <input type="number" value="${item.quantity}" min="1"
                      onchange="updateQuantity('${item.productId}', this.value)"
                      data-testid="item-quantity">
            Price: $${item.unitPrice.toFixed(2)} -
            Subtotal: $${item.subtotal.toFixed(2)}
            <button onclick="removeItem('${item.productId}')" data-testid="remove-item">Remove</button>
          </div>
        `).join('');
      }

      document.querySelector('.total').textContent =
        `Total: $${cart.total.toFixed(2)}${cart.discount > 0 ? ` (Discount: $${cart.discount.toFixed(2)})` : ''}`;
    }

    initCart();
  </script>
</body>
</html>
```

---

### Step 1.3: Configure Testing

**Update `package.json`:**

```json
{
  "scripts": {
    "start": "node server.js",
    "test": "jest",
    "test:unit": "jest __tests__/unit",
    "test:integration": "jest __tests__/integration",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage",
    "test:all": "npm run test && npm run test:e2e"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"],
    "testMatch": ["**/__tests__/**/*.test.js"],
    "collectCoverageFrom": ["src/**/*.js"]
  }
}
```

**Create `server.js` for manual testing:**

```javascript
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ShopHub running on http://localhost:${PORT}`);
});
```

**Verify setup:**

```bash
npm start
# Visit http://localhost:3000/checkout.html
# Test adding items to cart manually
```

---

## Part 2: Unit Tests (60 minutes)

### Step 2.1: Generate Unit Tests for CartService

**Your Task**: Use AI to generate comprehensive unit tests for `CartService`.

**Prompt for AI:**

```
Generate comprehensive Jest unit tests for the CartService class.

File: src/services/cartService.js
[Paste the CartService code]

Requirements:
1. Create __tests__/unit/cartService.test.js
2. Mock all dependencies (inventoryService, pricingService, discountService)
3. Test all methods:
   - createCart
   - addItem (happy path, duplicates, validation errors, stock checks)
   - removeItem (success, not found errors)
   - updateQuantity (increase, decrease, remove at zero, validation)
   - recalculateCart (price calculation, discount application)
   - checkout (success, empty cart, validation errors, stock checks)

4. Use AAA pattern
5. Test edge cases:
   - Empty cart operations
   - Large quantities
   - Negative quantities
   - Missing required fields
   - Stock unavailable scenarios

6. Verify mock calls:
   - Check inventory.checkStock called with correct params
   - Verify pricing.getPrice called for each item
   - Confirm discount.calculateDiscount called

7. Achieve 100% coverage

Use descriptive test names and organize with describe blocks.
```

**Expected Deliverables:**
- `__tests__/unit/cartService.test.js`
- At least 25 test cases
- 100% line and branch coverage
- All tests passing

**Time**: 45 minutes (30 min generation + 15 min refinement)

---

### Step 2.2: Run and Debug Unit Tests

```bash
# Run unit tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage
```

**If tests fail:**

1. Copy the error message
2. Ask AI:
   ```
   This test is failing:

   [Paste test code]

   Error:
   [Paste error message]

   Source code:
   [Paste relevant source code]

   Please explain the issue and provide the fix.
   ```

3. Apply the fix and re-run

**Checkpoint**: All unit tests passing, coverage >= 95%

---

## Part 3: Integration Tests (60 minutes)

### Step 3.1: Generate Integration Tests for Cart API

**Your Task**: Use AI to generate integration tests for the cart API endpoints.

**Prompt for AI:**

```
Generate supertest integration tests for the Cart API.

Files:
- src/api/cartRoutes.js [paste code]
- src/app.js [paste code]

Create: __tests__/integration/cartAPI.test.js

Test these endpoints:

1. POST /api/carts (Create cart)
   - Success with valid customerId
   - 400 with missing customerId
   - Verify cart structure

2. GET /api/carts/:id (Get cart)
   - Success with valid ID
   - 404 with invalid ID

3. POST /api/carts/:id/items (Add item)
   - Success adding new item
   - Success adding duplicate (increases quantity)
   - 400 with invalid productId
   - 400 with invalid quantity
   - 404 with invalid cart ID
   - Verify total recalculation

4. PUT /api/carts/:id/items/:productId (Update quantity)
   - Success updating quantity
   - Success with quantity 0 (removes item)
   - 400 with negative quantity
   - 404 with invalid cart or product
   - Verify total updates

5. DELETE /api/carts/:id/items/:productId (Remove item)
   - Success removing item
   - 404 with non-existent item
   - Verify total updates

6. POST /api/carts/:id/checkout (Checkout)
   - Success with valid cart and payment
   - 400 with empty cart
   - 400 with missing payment method
   - 404 with invalid cart ID
   - Verify cart cleared after checkout

Requirements:
- Reset cart storage before each test (call POST /api/test/reset)
- Verify response status codes
- Verify response body structure
- Check database state (make GET requests to verify)
- Test error messages
- Use descriptive test names
- Group by endpoint with describe blocks

Achieve 90%+ coverage of API routes.
```

**Expected Deliverables:**
- `__tests__/integration/cartAPI.test.js`
- At least 20 test cases
- All status codes tested (200, 201, 400, 404)
- All tests passing

**Time**: 45 minutes (30 min generation + 15 min refinement)

---

### Step 3.2: Run and Debug Integration Tests

```bash
# Run integration tests
npm run test:integration

# Run with coverage
npm run test:integration -- --coverage
```

**Troubleshooting:**
- If tests interfere with each other, ensure `beforeEach` resets state
- Check that all async operations use `await`
- Verify error status codes match expectations

**Checkpoint**: All integration tests passing, API coverage >= 90%

---

## Part 4: E2E Tests (60 minutes)

### Step 4.1: Create Page Object Model

**Your Task**: Generate a Page Object for the checkout page.

**Prompt for AI:**

```
Create a Playwright Page Object Model for the ShopHub checkout page.

File: public/checkout.html [paste code]

Create: __tests__/e2e/pages/CheckoutPage.js

Include methods for:
1. navigate() - Go to checkout page
2. addProductToCart(productId, quantity) - Select product and add
3. getCartItems() - Get array of cart items
4. getCartTotal() - Get total amount
5. updateItemQuantity(productIndex, quantity) - Change quantity
6. removeItem(productIndex) - Remove item from cart
7. selectPaymentMethod(method) - Choose payment method
8. clickCheckout() - Click checkout button
9. getSuccessMessage() - Get order confirmation message
10. isCartEmpty() - Check if cart is empty

Use data-testid selectors and Playwright best practices.
Include TypeScript types if possible.
```

**Expected Deliverable:**
- `__tests__/e2e/pages/CheckoutPage.js`

**Time**: 15 minutes

---

### Step 4.2: Generate E2E Tests

**Prompt for AI:**

```
Generate Playwright E2E tests for the ShopHub checkout flow.

Use the CheckoutPage Page Object.

Create: __tests__/e2e/checkout.spec.js

Test scenarios:

1. Add items to cart
   - Add single product
   - Add multiple products
   - Verify cart total updates
   - Verify quantity displayed

2. Update cart
   - Increase quantity
   - Decrease quantity
   - Remove item
   - Verify totals update correctly

3. Discount application
   - Add items totaling < $100 (no discount)
   - Add items totaling >= $100 (see discount)
   - Verify discount shown in total

4. Checkout process
   - Checkout with credit card
   - Checkout with PayPal
   - Verify success message includes order ID
   - Verify cart is cleared after checkout

5. Error handling
   - Cannot checkout empty cart
   - Error message displayed appropriately

6. Complete user journey
   - User adds 3 items
   - Updates one quantity
   - Removes one item
   - Applies discount (>$100 total)
   - Completes checkout
   - Verifies success

Requirements:
- Use beforeEach to navigate to page
- Use Page Object methods
- Make specific assertions
- Test on chromium browser
- Include visual verification where appropriate
```

**Expected Deliverables:**
- `__tests__/e2e/checkout.spec.js`
- At least 8 test scenarios
- All tests passing

**Time**: 30 minutes (20 min generation + 10 min refinement)

---

### Step 4.3: Configure and Run E2E Tests

**Create `playwright.config.js`:**

```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './__tests__/e2e',
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

**Run E2E tests:**

```bash
npm run test:e2e
```

**View report:**

```bash
npx playwright show-report
```

**Checkpoint**: All E2E tests passing

---

## Part 5: Coverage and Quality Review (30 minutes)

### Step 5.1: Generate Coverage Reports

```bash
# Run all tests with coverage
npm run test:coverage

# Open coverage report
open coverage/lcov-report/index.html
```

**Review:**
- Unit test coverage: Should be >= 95%
- Integration test coverage: Should be >= 90%
- Identify any uncovered lines

---

### Step 5.2: Quality Review

**Checklist:**

- [ ] All test files follow naming convention
- [ ] Tests use descriptive names
- [ ] AAA pattern followed
- [ ] No commented-out code
- [ ] No test interdependencies
- [ ] Mocks properly configured
- [ ] Error cases covered
- [ ] Edge cases included
- [ ] All assertions are specific (not just toBeDefined)

**If quality issues found:**

```
Review these tests for quality:

[Paste test file]

Check for:
1. Weak assertions
2. Missing edge cases
3. Test interdependencies
4. Unclear test names
5. Poor organization

Provide improved version with explanations.
```

---

### Step 5.3: Create Test Documentation

**Create `TEST_DOCUMENTATION.md`:**

```markdown
# ShopHub Test Suite Documentation

## Overview
Complete test coverage for shopping cart and checkout functionality.

## Coverage Summary
- Unit Tests: [X]% coverage
- Integration Tests: [X]% coverage
- E2E Tests: [X] scenarios

## Test Structure

### Unit Tests (__tests__/unit/)
- cartService.test.js - [X] tests
  - Tests CartService business logic
  - Mocks: inventory, pricing, discount services
  - Coverage: [X]%

### Integration Tests (__tests__/integration/)
- cartAPI.test.js - [X] tests
  - Tests all cart API endpoints
  - Coverage: [X]%

### E2E Tests (__tests__/e2e/)
- checkout.spec.js - [X] scenarios
  - Tests complete checkout flow
  - Browser: Chromium

## Running Tests

```bash
npm run test:unit           # Unit tests only
npm run test:integration    # Integration tests only
npm run test:e2e            # E2E tests only
npm run test:all            # All tests
npm run test:coverage       # With coverage report
```

## Key Test Scenarios Covered

### Unit Tests
- Cart creation and initialization
- Adding items (new and duplicates)
- Removing items
- Updating quantities
- Price calculations
- Discount application
- Checkout validation
- Stock checking
- Error handling

### Integration Tests
- Cart CRUD operations
- Item management via API
- Total calculations via API
- Checkout process via API
- Error responses (400, 404)

### E2E Tests
- Complete user checkout journey
- Cart manipulation via UI
- Discount visibility
- Payment method selection
- Success confirmation

## Known Limitations
[List any known gaps or limitations]

## Future Enhancements
- Add performance tests
- Add accessibility tests
- Add visual regression tests
- Test concurrent checkout scenarios
```

---

## Part 6: Submission and Review (15 minutes)

### Final Checklist

- [ ] All unit tests passing (25+ tests)
- [ ] All integration tests passing (20+ tests)
- [ ] All E2E tests passing (8+ scenarios)
- [ ] Coverage >= 90% overall
- [ ] No failing tests
- [ ] Test documentation complete
- [ ] Code committed to git

### Submission Files

```
shophub-testing-lab/
├── src/
│   ├── services/cartService.js
│   ├── api/cartRoutes.js
│   └── app.js
├── public/
│   └── checkout.html
├── __tests__/
│   ├── unit/
│   │   └── cartService.test.js
│   ├── integration/
│   │   └── cartAPI.test.js
│   └── e2e/
│       ├── pages/
│       │   └── CheckoutPage.js
│       └── checkout.spec.js
├── coverage/
│   └── lcov-report/index.html
├── playwright-report/
├── TEST_DOCUMENTATION.md
├── package.json
└── playwright.config.js
```

### Grading Rubric (100 points)

| Criterion | Points | Requirements |
|-----------|--------|--------------|
| **Unit Tests** | 30 | 25+ tests, 95%+ coverage, all passing |
| **Integration Tests** | 30 | 20+ tests, 90%+ coverage, all passing |
| **E2E Tests** | 20 | 8+ scenarios, all passing |
| **Code Quality** | 10 | Clean, organized, follows best practices |
| **Documentation** | 10 | Complete TEST_DOCUMENTATION.md |

**Passing Grade:** 70 points

---

## Troubleshooting Guide

### Common Issues

**Issue 1: Tests timing out**
- Ensure all async functions use `await`
- Check for unresolved Promises
- Increase Jest timeout: `jest.setTimeout(10000)`

**Issue 2: Mock not working**
- Verify mock setup in `beforeEach`
- Use `mockClear()` in `afterEach`
- Check mock is called with correct parameters

**Issue 3: E2E tests flaky**
- Use Playwright auto-waiting
- Avoid `setTimeout` or arbitrary waits
- Check for proper element selectors

**Issue 4: Coverage not 100%**
- Run coverage report
- Check uncovered lines
- Generate tests specifically for those lines

**Issue 5: Port already in use**
- Stop other processes on port 3000
- Change port in server.js and playwright.config.js

---

## Bonus Challenges (+20 points)

1. **Add Performance Tests** (+5 points)
   - Measure checkout time for cart with 50 items
   - Ensure < 100ms for price calculation

2. **Add Concurrent User Tests** (+5 points)
   - Test two users checking out simultaneously
   - Verify no race conditions

3. **Add Visual Regression Tests** (+5 points)
   - Screenshot empty cart
   - Screenshot cart with items
   - Screenshot after discount applied

4. **Add Test Data Factories** (+5 points)
   - Create factory for cart data
   - Create factory for order data
   - Use in tests for cleaner code

---

## Learning Reflection

After completing the lab, answer these questions:

1. **What was the most challenging part of implementing tests?**

2. **How did AI help speed up your test implementation?**

3. **What would you do differently next time?**

4. **How confident are you that these tests would catch bugs?**

---

**Congratulations on completing the lab!** 🎉

You've now implemented a comprehensive test suite with unit, integration, and E2E tests. This is production-ready test coverage!

[Continue to Code Examples →](./04-CODE-EXAMPLES.md)
