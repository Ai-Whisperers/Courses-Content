# Module 5: Test Planning with AI - Hands-On Lab

**Duration**: 2 hours
**Difficulty**: Intermediate

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Lab Overview

In this lab, you'll create a complete test planning package for a real-world e-commerce checkout feature. You'll apply all concepts learned in this module:

- Comprehensive test plan generation
- Test coverage matrix creation
- Test case design using multiple techniques
- Risk-based prioritization
- Test data specification

**Deliverable**: A production-ready test planning package

---

## Table of Contents

1. [Lab Setup](#lab-setup)
2. [Part 1: Test Strategy](#part-1-test-strategy-30-min)
3. [Part 2: Test Case Design](#part-2-test-case-design-45-min)
4. [Part 3: Coverage Matrix](#part-3-coverage-matrix-20-min)
5. [Part 4: Test Data Plan](#part-4-test-data-plan-15-min)
6. [Part 5: Risk Prioritization](#part-5-risk-prioritization-10-min)
7. [Submission](#submission)
8. [Grading Rubric](#grading-rubric)

---

## Lab Setup

### The Feature: E-Commerce Checkout

You're testing a checkout system for an e-commerce platform. The feature includes:

**Core Functionality:**
- Cart validation
- Payment processing (Credit Card, PayPal)
- Shipping calculation
- Order confirmation
- Email notifications

**Business Rules:**
- Cart must have 1-50 items
- Maximum order value: $10,000
- Minimum order value: $5
- Shipping: Standard ($5 + $0.50/lb) or Express ($15 + $0.50/lb)
- Tax calculation varies by state
- Inventory must be available
- Payment must be processed before inventory reservation

### Feature Code

```javascript
// checkoutService.js
class CheckoutService {
  /**
   * Processes a complete checkout
   * @throws {Error} For validation, inventory, or payment failures
   */
  async processCheckout(userId, cartId, paymentInfo, shippingInfo) {
    // 1. Validate cart
    const cart = await this.cartService.getCart(cartId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }
    if (cart.userId !== userId) {
      throw new Error('Unauthorized');
    }
    if (cart.items.length > 50) {
      throw new Error('Cart exceeds maximum items (50)');
    }

    // 2. Check inventory
    for (const item of cart.items) {
      const available = await this.inventoryService.checkStock(item.productId);
      if (available < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productId}`);
      }
    }

    // 3. Calculate totals
    const subtotal = cart.items.reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    );

    if (subtotal < 5) {
      throw new Error('Order minimum is $5');
    }
    if (subtotal > 10000) {
      throw new Error('Order maximum is $10,000');
    }

    const shipping = await this.calculateShipping(shippingInfo, cart.items);
    const tax = this.calculateTax(subtotal, shippingInfo.state);
    const total = subtotal + shipping + tax;

    // 4. Process payment
    const paymentResult = await this.paymentService.charge(
      paymentInfo,
      total
    );

    if (!paymentResult.success) {
      throw new Error(`Payment failed: ${paymentResult.error}`);
    }

    // 5. Create order
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

    // 6. Reserve inventory
    for (const item of cart.items) {
      await this.inventoryService.reserve(item.productId, item.quantity);
    }

    // 7. Clear cart
    await this.cartService.clear(cartId);

    // 8. Send confirmation
    await this.emailService.sendOrderConfirmation(userId, order);

    return order;
  }

  /**
   * Calculates shipping cost
   */
  async calculateShipping(shippingInfo, items) {
    const weight = items.reduce((sum, item) => sum + (item.weight || 0), 0);
    const baseRate = shippingInfo.express ? 15 : 5;
    return baseRate + (weight * 0.5);
  }

  /**
   * Calculates tax based on state
   */
  calculateTax(subtotal, state) {
    const taxRates = {
      'CA': 0.0725,  // California
      'NY': 0.08,    // New York
      'TX': 0.0625,  // Texas
      'FL': 0.06,    // Florida
      'WA': 0.065,   // Washington
      // ... more states
    };
    return subtotal * (taxRates[state] || 0);
  }
}
```

### Dependencies

```javascript
// External services (to be mocked in tests)
- cartService.getCart(cartId)
- cartService.clear(cartId)
- inventoryService.checkStock(productId)
- inventoryService.reserve(productId, quantity)
- paymentService.charge(paymentInfo, amount)
- orderService.create(orderData)
- emailService.sendOrderConfirmation(userId, order)
```

### Setup Instructions

1. Create a new directory: `checkout-test-plan/`
2. Save the code above as `checkoutService.js` (for reference)
3. Create files for each part of the lab (templates provided below)

---

## Part 1: Test Strategy (30 min)

**Objective**: Define the overall testing approach

### Task

Create a comprehensive test strategy document.

### AI Prompt

```
Create a test strategy for this e-commerce checkout feature.

**Code**:
[Paste the checkoutService.js code]

**Business Rules**:
- Cart: 1-50 items
- Order value: $5-$10,000
- Shipping: Standard ($5 + $0.50/lb) or Express ($15 + $0.50/lb)
- Tax varies by state
- Inventory checked before payment
- Payment processed before inventory reservation

**Tech Stack**:
- Node.js + Express
- PostgreSQL database
- Jest for testing
- Integration with Stripe (payments), SendGrid (email)

**Generate**:

## 1. Testing Objectives
- What are we trying to achieve?
- What risks are we mitigating?
- What quality attributes must we verify?

## 2. Test Scope

### In Scope
- Features and scenarios to test
- Test types to include
- Platforms/environments

### Out of Scope
- What we won't test
- Rationale for exclusions

## 3. Test Levels

### Unit Tests
- What to test
- What to mock
- Coverage target

### Integration Tests
- What to test together
- What to mock
- Key scenarios

### E2E Tests
- Critical user journeys
- Environment requirements
- Success criteria

## 4. Test Types

For each type, specify:
- Functional testing
- Error handling testing
- Security testing
- Performance testing
- Usability testing

## 5. Test Environment

### Required Services
- Databases
- External APIs
- Mock services

### Configuration
- Test data setup
- Environment variables
- Feature flags

## 6. Success Criteria
- Coverage targets (e.g., 80% line coverage)
- Performance requirements (e.g., < 500ms)
- Security requirements
- Acceptance criteria
```

### Deliverable

**File**: `TEST-STRATEGY.md`

**Must Include**:
- Clear testing objectives (3-5 objectives)
- Detailed scope (in/out with rationale)
- Test level strategy for unit/integration/E2E
- Test type coverage (functional, error, security, performance)
- Environment requirements
- Measurable success criteria

**Time Allocation**:
- AI generation: 10 minutes
- Review and refinement: 15 minutes
- Final polish: 5 minutes

---

## Part 2: Test Case Design (45 min)

**Objective**: Design comprehensive test cases using multiple techniques

### Task

Generate test cases using:
1. Equivalence Partitioning
2. Boundary Value Analysis
3. Decision Tables
4. Error Guessing

### Step 1: Equivalence Partitioning (10 min)

**AI Prompt**:
```
Apply equivalence partitioning to the checkout feature.

**Inputs to partition**:
1. Cart items (quantity): 0, 1-50, >50
2. Subtotal: <$5, $5-$10,000, >$10,000
3. Payment method: Credit Card, PayPal
4. Shipping type: Standard, Express
5. Inventory status: Available, Insufficient, Unavailable
6. Cart ownership: Owned by user, Not owned

For each input:
- Identify valid partitions
- Identify invalid partitions
- Select representative test value
- Specify expected result

Format:
| Input | Partition Type | Partition | Test Value | Expected Result |
```

### Step 2: Boundary Value Analysis (10 min)

**AI Prompt**:
```
Apply boundary value analysis to checkout feature.

**Boundaries to test**:
1. Cart items: 0, 1, 50, 51
2. Subtotal: $4.99, $5.00, $10,000.00, $10,000.01
3. Item weight: 0 lb, 0.1 lb, 100 lb
4. Quantity per item: 0, 1, 999

For each boundary:
- Test value below minimum
- Test value at minimum
- Test value at maximum
- Test value above maximum
- Expected result for each

Format:
| Field | Boundary Type | Test Value | Expected Result | Priority |
```

### Step 3: Decision Table (15 min)

**AI Prompt**:
```
Create a decision table for checkout scenarios.

**Conditions**:
1. Cart valid? (Y/N)
2. Inventory available? (Y/N)
3. Payment successful? (Y/N)
4. User authorized? (Y/N)

**Actions**:
- Create order
- Reserve inventory
- Clear cart
- Send email
- Throw error

Generate all 16 combinations (2^4).

For each combination:
- Condition values (Y/N for each)
- Expected actions
- Test case ID
- Priority (P0/P1/P2)

Format:
| TC ID | Cart Valid | Inventory OK | Payment OK | User Auth | Expected Actions | Priority |
```

### Step 4: Error Scenarios (10 min)

**AI Prompt**:
```
Generate error test cases for checkout feature.

**Error categories**:
1. Validation errors (empty cart, unauthorized user, item limits)
2. Inventory errors (out of stock, insufficient quantity)
3. Payment errors (declined card, insufficient funds, timeout)
4. System errors (database failure, network timeout, email failure)
5. Concurrency errors (cart modified during checkout, stock changed)

For each category:
- List 2-3 specific error scenarios
- How to trigger the error
- Expected error message
- Expected system state after error
- Priority

Format:
| TC ID | Error Category | Scenario | How to Trigger | Expected Error | Priority |
```

### Deliverable

**File**: `TEST-CASES.md`

**Must Include**:
- Minimum 30 test cases total
- Equivalence partitioning table (8-10 cases)
- Boundary value analysis table (12-15 cases)
- Decision table (16 cases)
- Error scenarios (10-12 cases)
- Each case has: ID, description, expected result, priority

**Time Allocation**:
- Equivalence partitioning: 10 minutes
- Boundary analysis: 10 minutes
- Decision table: 15 minutes
- Error scenarios: 10 minutes

---

## Part 3: Coverage Matrix (20 min)

**Objective**: Map test cases to requirements and identify gaps

### Task

Create a traceability matrix showing:
- Features mapped to test types
- Test cases mapped to requirements
- Coverage gaps identified

### AI Prompt

```
Create a test coverage matrix for the checkout feature.

**Features**:
1. Cart Validation (empty, ownership, item limits)
2. Inventory Check (availability, quantity)
3. Price Calculation (subtotal, limits)
4. Shipping Calculation (standard/express, weight)
5. Tax Calculation (state-based)
6. Payment Processing (credit card, PayPal)
7. Order Creation (data persistence)
8. Inventory Reservation (stock deduction)
9. Cart Clearing (cleanup)
10. Email Notification (confirmation sending)

**Generate**:

## 1. Feature Coverage Matrix
| Feature | Unit | Integration | E2E | Security | Performance |
|---------|------|-------------|-----|----------|-------------|

Status: ✅ (Covered), ⚠️ (Partial), ❌ (Missing), N/A

## 2. Test Case Mapping
| Test Case ID | Feature(s) | Test Type | Requirement | Code Path |
|--------------|------------|-----------|-------------|-----------|

Map the 30+ test cases from Part 2 to features.

## 3. Gap Analysis

For each missing/partial area:
- Feature + Test Type combination
- Why coverage is needed
- Suggested test scenarios
- Effort estimate
- Priority

## 4. Coverage Summary
- Total features: 10
- Total test cases: [count]
- Coverage by type:
  - Unit: X%
  - Integration: X%
  - E2E: X%
- Gap count: [number]
- High priority gaps: [number]
```

### Deliverable

**File**: `COVERAGE-MATRIX.md`

**Must Include**:
- Complete feature coverage matrix (10 features × 5 test types)
- Test case mapping table (all 30+ cases mapped)
- Gap analysis (identify at least 5 gaps)
- Coverage summary with percentages

**Time Allocation**:
- Matrix creation: 10 minutes
- Gap analysis: 7 minutes
- Documentation: 3 minutes

---

## Part 4: Test Data Plan (15 min)

**Objective**: Define test data requirements

### Task

Specify test data for all scenarios.

### AI Prompt

```
Create a test data plan for checkout testing.

**Data Requirements**:

## 1. Test Users
Define user profiles:
- New user (no order history)
- Returning customer (has order history)
- VIP customer (high order value)
- Unauthorized user (for negative tests)

For each: userId, account status, payment methods

## 2. Product Data
Define product variations:
- Low-price item ($1-$10)
- Medium-price item ($10-$100)
- High-price item ($100-$1,000)
- Heavy item (>10 lb)
- Light item (<1 lb)
- Out-of-stock item

For each: productId, price, weight, stock level

## 3. Cart Scenarios
Define cart configurations:
- Empty cart
- Single item cart
- Multiple items cart (5 items)
- Maximum items cart (50 items)
- Over-limit cart (51 items)
- Low-value cart (<$5)
- High-value cart (>$10,000)

For each: cartId, items, subtotal

## 4. Payment Methods
Define payment test data:
- Valid credit card
- Expired credit card
- Insufficient funds card
- Declined card
- Valid PayPal account
- Invalid PayPal account

For each: payment method, test number/account, expected result

## 5. Shipping Addresses
Define address variations:
- US addresses (various states for tax testing)
  - CA (7.25% tax)
  - NY (8% tax)
  - TX (6.25% tax)
  - FL (6% tax)
  - WA (6.5% tax)
- Standard shipping addresses
- Express shipping addresses
- Invalid addresses (for negative tests)

For each: address, state, tax rate

## 6. Special Cases
- Empty/null values for each field
- Very long strings (XSS attempts)
- Special characters (SQL injection attempts)
- Unicode characters
- Concurrent checkout scenarios

## 7. Data Generation Strategy
How to create and manage test data:
- Factories for users, products, carts
- Fixtures for known scenarios
- Cleanup approach (delete after test)
- Data isolation (separate DB/schema)
```

### Deliverable

**File**: `TEST-DATA.md`

**Must Include**:
- User test data (4+ user profiles)
- Product test data (6+ product variations)
- Cart scenarios (7+ configurations)
- Payment methods (6+ test cases)
- Shipping addresses (5+ variations)
- Special cases section
- Data generation strategy with code examples

**Time Allocation**:
- Data specification: 10 minutes
- Generation strategy: 5 minutes

---

## Part 5: Risk Prioritization (10 min)

**Objective**: Prioritize tests based on risk analysis

### Task

Score features by risk and create prioritized test suites.

### AI Prompt

```
Analyze checkout feature risks and prioritize tests.

**Consider**:

1. Business Impact (1-10)
   - Revenue loss if feature fails
   - Customer trust impact
   - Legal/compliance risk
   - Brand reputation

2. Technical Risk (1-10)
   - Code complexity
   - Number of dependencies
   - Integration points
   - Historical bug rate

3. Usage Frequency (1-10)
   - How often used?
   - Number of users affected
   - Part of critical path?

**Generate**:

## 1. Risk Assessment
| Feature | Business Impact | Technical Risk | Usage Freq | Risk Score | Justification |
|---------|----------------|----------------|------------|------------|---------------|

Risk Score = Business Impact × Technical Risk × Usage Frequency

## 2. Priority Assignment
For each feature area:
- Priority (P0/P1/P2/P3)
- Number of test cases
- Rationale

## 3. Test Suites

### Smoke Suite (P0 only - 5-10 min)
- Features included
- Test cases (list IDs)
- Must pass for deployment

### Regression Suite (P0 + P1 - 30-45 min)
- Features included
- Test cases (list IDs)
- Must pass for PR merge

### Full Suite (All - 2-3 hours)
- All test cases
- Run nightly or before release

## 4. Execution Schedule
| Suite | When | Trigger | Blocking | Time Limit |
|-------|------|---------|----------|------------|
```

### Deliverable

**File**: `PRIORITIZATION.md`

**Must Include**:
- Risk assessment matrix for all 10 features
- Priority assignments with rationale
- Three test suites (smoke, regression, full)
- Execution schedule with triggers

**Time Allocation**:
- Risk assessment: 5 minutes
- Suite creation: 3 minutes
- Documentation: 2 minutes

---

## Submission

### Required Files

```
checkout-test-plan/
├── TEST-STRATEGY.md          (Part 1)
├── TEST-CASES.md             (Part 2)
├── COVERAGE-MATRIX.md        (Part 3)
├── TEST-DATA.md              (Part 4)
├── PRIORITIZATION.md         (Part 5)
└── README.md                 (Summary + reflections)
```

### README.md Template

```markdown
# Checkout Feature - Test Planning Package

## Summary

Brief overview of the test planning effort.

## Statistics

- Total features analyzed: 10
- Total test cases designed: X
- Test coverage: X%
- High-priority tests: X
- Time to complete: X hours

## Key Decisions

Document 3-5 key decisions you made:
1. [Decision] - [Rationale]
2. [Decision] - [Rationale]
...

## Challenges

What challenges did you face?
How did you overcome them?

## AI Usage

How did AI help?
Where did you need to add human judgment?

## Next Steps

What would you do next?
- [ ] Implement unit tests
- [ ] Set up integration tests
- [ ] Configure CI/CD
...
```

### Submission Checklist

- [ ] All 5 main files completed
- [ ] README.md with reflections
- [ ] All sections in each file complete
- [ ] Test cases are specific and actionable
- [ ] Priorities are justified
- [ ] Professional formatting
- [ ] No AI hallucinations (all info is accurate)
- [ ] Ready to hand off to implementation team

---

## Grading Rubric

### Part 1: Test Strategy (20 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Objectives | 4 | Clear, measurable objectives |
| Scope | 4 | Detailed in/out scope with rationale |
| Test Levels | 4 | Comprehensive strategy for unit/integration/E2E |
| Test Types | 4 | Coverage of functional/error/security/performance |
| Success Criteria | 4 | Measurable criteria defined |

### Part 2: Test Cases (30 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Equivalence Partitioning | 8 | Complete partitioning of inputs |
| Boundary Analysis | 8 | Thorough boundary testing |
| Decision Table | 8 | All combinations covered |
| Error Scenarios | 6 | Comprehensive error cases |

### Part 3: Coverage Matrix (20 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Matrix Completeness | 6 | All features and types mapped |
| Test Case Mapping | 6 | All test cases traced |
| Gap Analysis | 5 | Gaps identified and prioritized |
| Coverage Metrics | 3 | Accurate coverage calculation |

### Part 4: Test Data (15 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Data Completeness | 6 | All data types specified |
| Data Variety | 4 | Valid, invalid, boundary, special cases |
| Generation Strategy | 5 | Practical approach with examples |

### Part 5: Prioritization (10 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| Risk Assessment | 4 | Accurate risk scoring with justification |
| Suite Creation | 3 | Balanced suites meeting time constraints |
| Execution Schedule | 3 | Practical schedule defined |

### README & Overall Quality (5 points)

| Criterion | Points | Description |
|-----------|--------|-------------|
| README Quality | 2 | Complete with good reflections |
| Professional Presentation | 2 | Clean formatting, organized |
| Actionability | 1 | Can be handed to implementation team |

**Total**: 100 points

**Passing Score**: 70 points (70%)

---

## Tips for Success

### Use AI Effectively
- Start with comprehensive prompts
- Include all context (code, business rules)
- Review AI output critically
- Add domain-specific knowledge

### Be Systematic
- Follow design techniques methodically
- Don't skip steps
- Document your reasoning
- Cover all scenarios

### Think Like a Tester
- What could go wrong?
- What are edge cases?
- How can this be abused?
- What about performance under load?

### Make It Real
- Use realistic test data
- Consider actual user behavior
- Think about production constraints
- Plan for maintainability

### Quality Over Quantity
- 30 good test cases > 100 vague ones
- Specific expected results
- Clear priorities
- Actionable descriptions

---

## Troubleshooting

### "My test cases are too generic"
**Solution**: Add specific input values and expected outputs. Instead of "test invalid card", write "test expired card (expiry: 01/2020) → expect error 'Card expired'"

### "I can't identify gaps"
**Solution**: Think about what's NOT covered. Missing integration tests? No performance tests? Security not tested? List what you see, then list what you don't.

### "Risk assessment seems arbitrary"
**Solution**: Use the formula: Risk Score = Impact × Likelihood × Complexity. Justify each score. "Payment processing: Impact=10 (revenue loss), Likelihood=7 (external API), Complexity=8 (multi-step) = 560"

### "Test data planning is overwhelming"
**Solution**: Start with happy path data, then add one invalid case, one boundary case, one special case. Build incrementally.

### "AI output has errors"
**Solution**: That's expected! Review everything. Check against the code. Verify business rules. Add your expertise.

---

## Time Management

If you're running short on time, prioritize:

**Must Have** (90 minutes):
- Part 1: Test Strategy (basic version - 20 min)
- Part 2: Test Cases (focus on equivalence + boundary - 30 min)
- Part 3: Coverage Matrix (basic version - 15 min)
- Part 5: Prioritization (quick risk assessment - 10 min)
- README (15 min)

**Nice to Have** (30 minutes):
- Part 2: Complete decision table
- Part 3: Detailed gap analysis
- Part 4: Test Data Plan (can be brief)
- Polish and refinement

---

## Additional Resources

### Example Test Plans
- See `examples/test-plan-example.md` in course repository
- Review real-world test plans on GitHub

### Design Technique References
- ISTQB Foundation syllabus (test design techniques chapter)
- "Software Testing Techniques" by Boris Beizer
- Your own project test suites

### AI Prompting Tips
- Module 2: Context Engineering (review prompt patterns)
- Be specific about format, priorities, and requirements
- Iterate if first output isn't perfect

---

**Ready to create a professional test plan? Start with Part 1!**

[Back to Module Overview](./MODULE-OVERVIEW.md)
