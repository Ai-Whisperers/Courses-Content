# Exercise 5: Comprehensive Test Planning

## Objective

Create a complete test plan for a feature using AI assistance.

## Duration: 2 hours

---

## Scenario

You're the QA lead for an e-commerce platform. A new "Checkout" feature has been developed and needs testing. The feature includes:

- Cart validation
- Payment processing (credit card, PayPal)
- Shipping calculation
- Order confirmation
- Email notifications

### Feature Code

```javascript
// checkoutService.js
class CheckoutService {
  async processCheckout(userId, cartId, paymentInfo, shippingInfo) {
    // Validate cart
    const cart = await this.cartService.getCart(cartId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
    if (cart.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Check inventory
    for (const item of cart.items) {
      const available = await this.inventoryService.checkStock(item.productId);
      if (available < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productId}`);
      }
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    );
    const shipping = await this.calculateShipping(shippingInfo, cart.items);
    const tax = this.calculateTax(subtotal, shippingInfo.state);
    const total = subtotal + shipping + tax;

    // Process payment
    const paymentResult = await this.paymentService.charge(
      paymentInfo,
      total
    );

    if (!paymentResult.success) {
      throw new Error(`Payment failed: ${paymentResult.error}`);
    }

    // Create order
    const order = await this.orderService.create({
      userId,
      items: cart.items,
      subtotal,
      shipping,
      tax,
      total,
      paymentId: paymentResult.transactionId,
      shippingAddress: shippingInfo,
      status: 'confirmed'
    });

    // Reserve inventory
    for (const item of cart.items) {
      await this.inventoryService.reserve(item.productId, item.quantity);
    }

    // Clear cart
    await this.cartService.clear(cartId);

    // Send confirmation
    await this.emailService.sendOrderConfirmation(userId, order);

    return order;
  }

  async calculateShipping(shippingInfo, items) {
    const weight = items.reduce((sum, item) => sum + item.weight, 0);
    const baseRate = shippingInfo.express ? 15 : 5;
    return baseRate + (weight * 0.5);
  }

  calculateTax(subtotal, state) {
    const taxRates = {
      'CA': 0.0725,
      'NY': 0.08,
      'TX': 0.0625,
      // ... more states
    };
    return subtotal * (taxRates[state] || 0);
  }
}
```

---

## Part 1: Test Strategy (30 min)

### Task

Define the overall test strategy.

### Prompt

```
Create a test strategy for this checkout feature.

[Paste code]

Include:
1. Testing Objectives
   - What are we trying to achieve?
   - What risks are we mitigating?

2. Test Scope
   - In scope (what to test)
   - Out of scope (what not to test)

3. Test Types
   - Unit tests (what to mock)
   - Integration tests (what to test together)
   - E2E tests (critical user journeys)

4. Test Environment
   - Required services
   - Test data needs

5. Success Criteria
   - Coverage targets
   - Performance requirements
   - Acceptance criteria
```

### Deliverable

- Test strategy document

---

## Part 2: Test Case Design (45 min)

### Task

Design detailed test cases using various techniques.

### Prompt

```
Generate test cases for the checkout feature using these techniques:

1. Equivalence Partitioning
   - Valid cart (1 item, multiple items, max items)
   - Invalid cart (empty, wrong user, non-existent)
   - Payment amounts (small, medium, large)

2. Boundary Value Analysis
   - Cart item limits (0, 1, max, max+1)
   - Payment amounts (min, max, over max)
   - Shipping weight (0, threshold, heavy)

3. State Transition
   - Order status flow
   - Payment retry scenarios

4. Error Guessing
   - Network failures
   - Partial failures
   - Concurrent modifications

For each test case include:
- ID
- Description
- Preconditions
- Steps
- Expected Result
- Priority (P0/P1/P2)
```

### Deliverable

- Minimum 30 test cases

---

## Part 3: Coverage Matrix (20 min)

### Task

Create a traceability matrix.

### Prompt

```
Create a test coverage matrix for the checkout feature.

Map test cases to:
1. Requirements/User Stories
2. Code paths
3. Risk areas

Format as a table:
| Test ID | Requirement | Code Path | Risk Area | Priority |
|---------|-------------|-----------|-----------|----------|

Also identify any gaps in coverage.
```

### Deliverable

- Coverage matrix
- Gap analysis

---

## Part 4: Test Data Plan (15 min)

### Task

Plan the test data requirements.

### Prompt

```
Create a test data plan for checkout testing.

Include:
1. Test Users
   - New user
   - Returning customer
   - VIP customer

2. Products
   - Various prices
   - Different weights
   - Limited stock items

3. Payment Methods
   - Valid cards
   - Expired cards
   - Insufficient funds

4. Addresses
   - Different states (tax rates)
   - International
   - Invalid addresses

For each data item specify:
- Description
- Values
- Where used
```

### Deliverable

- Test data specification

---

## Part 5: Risk-Based Prioritization (10 min)

### Task

Prioritize tests based on risk.

### Prompt

```
Analyze the checkout feature and prioritize test cases by risk.

Consider:
1. Business Impact
   - Revenue loss
   - Customer trust
   - Legal compliance

2. Technical Risk
   - Complexity
   - Integration points
   - Historical bugs

3. Usage Frequency
   - How often is this path used?

Create a prioritized test execution order for:
- Smoke test suite (5-10 tests)
- Regression suite (20-30 tests)
- Full suite (all tests)
```

### Deliverable

- Prioritized test suites

---

## Submission

### Files

- `TEST-STRATEGY.md`
- `TEST-CASES.md` (30+ test cases)
- `COVERAGE-MATRIX.md`
- `TEST-DATA.md`
- `PRIORITIZATION.md`

### Grading

| Criterion | Points |
|-----------|--------|
| Test strategy completeness | 20 |
| Test case quality | 30 |
| Coverage analysis | 20 |
| Test data planning | 15 |
| Risk prioritization | 15 |

---

## Tips

- Think about real-world failure scenarios
- Consider the user's perspective
- Don't forget negative test cases
- Prioritize business-critical paths
- Consider performance and security

---

*Good luck!*
