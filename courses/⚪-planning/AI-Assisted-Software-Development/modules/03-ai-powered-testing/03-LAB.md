# Module 3: Hands-On Lab
## AI-Assisted Code Review Challenge

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 60-75 minutes |
| **Difficulty** | Intermediate |
| **Goal** | Find 15+ issues in a "legacy" codebase |
| **Tools** | Claude (primary), Copilot Chat (secondary) |

---

## The Challenge

You're a new developer joining a team. Your first task is to review an existing e-commerce module that handles orders. The code works but has numerous issues that need to be identified and documented.

**Your mission:** Find at least 15 issues across security, bugs, and code quality.

---

## The Codebase

### File: order-service.js

```javascript
// Order Service - E-commerce Backend
// Created: 2023
// Last modified: Unknown

const fs = require('fs');
const http = require('http');

var orders = [];
var orderCounter = 1;

// Database simulation
function saveToFile() {
  fs.writeFileSync('./orders.json', JSON.stringify(orders));
}

function loadFromFile() {
  try {
    orders = JSON.parse(fs.readFileSync('./orders.json'));
  } catch(e) {
    orders = [];
  }
}

// Order class
function Order(customerId, items, shippingAddress) {
  this.id = orderCounter++;
  this.customerId = customerId;
  this.items = items;
  this.shippingAddress = shippingAddress;
  this.status = 'pending';
  this.total = 0;
  this.createdAt = new Date();

  // Calculate total
  for (var i = 0; i <= items.length; i++) {
    this.total += items[i].price * items[i].quantity;
  }
}

// Create new order
function createOrder(data, callback) {
  var customerId = data.customerId;
  var items = data.items;
  var address = data.shippingAddress;
  var promoCode = data.promoCode;

  // Validate customer
  http.get('http://internal-api/customers/' + customerId, function(res) {
    var body = '';
    res.on('data', function(chunk) { body += chunk; });
    res.on('end', function() {
      var customer = JSON.parse(body);

      // Create order
      var order = new Order(customerId, items, address);

      // Apply promo code
      if (promoCode) {
        eval('order.discount = ' + getPromoDiscount(promoCode));
        order.total = order.total - order.discount;
      }

      orders.push(order);
      saveToFile();

      // Send confirmation email
      sendEmail(customer.email, 'Order Confirmed',
        '<h1>Thanks for your order!</h1><p>Order #' + order.id + '</p>' +
        '<p>Total: $' + order.total + '</p>');

      callback(null, order);
    });
  });
}

// Get order by ID
function getOrder(id) {
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].id == id) {
      return orders[i];
    }
  }
  return null;
}

// Get orders by customer
function getOrdersByCustomer(customerId) {
  var result = [];
  for (var i = 0; i < orders.length; i++) {
    if (orders[i].customerId == customerId) {
      result.push(orders[i]);
    }
  }
  return result;
}

// Update order status
function updateOrderStatus(orderId, newStatus, userId) {
  var order = getOrder(orderId);
  if (order) {
    order.status = newStatus;
    order.updatedBy = userId;
    order.updatedAt = Date.now();
    saveToFile();
    return order;
  }
}

// Process payment
function processPayment(orderId, cardNumber, cvv, expiry) {
  var order = getOrder(orderId);

  // Log for debugging
  console.log('Processing payment for order ' + orderId);
  console.log('Card: ' + cardNumber + ', CVV: ' + cvv);

  // Call payment API
  var paymentData = {
    amount: order.total,
    card: cardNumber,
    cvv: cvv,
    expiry: expiry
  };

  http.request({
    hostname: 'payment-api.com',
    path: '/charge',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, function(res) {
    if (res.statusCode == 200) {
      order.status = 'paid';
      order.paymentInfo = paymentData;
      saveToFile();
    }
  }).write(JSON.stringify(paymentData));

  return { success: true };
}

// Cancel order
function cancelOrder(orderId) {
  var order = getOrder(orderId);
  order.status = 'cancelled';
  saveToFile();
  return order;
}

// Calculate shipping
function calculateShipping(order) {
  var weight = 0;
  for (var item of order.items) {
    weight += item.weight;
  }

  if (weight < 1) return 5;
  if (weight < 5) return 10;
  if (weight < 10) return 15;
  else return 25;
}

// Apply bulk discount
function applyBulkDiscount(order) {
  if (order.items.length > 10) {
    order.total = order.total * 0.9;
  } else if (order.items.length > 5) {
    order.total = order.total * 0.95;
  }
}

// Send email helper
function sendEmail(to, subject, body) {
  // Implementation not shown
  console.log('Sending email to: ' + to);
}

// Get promo discount
function getPromoDiscount(code) {
  var promos = {
    'SAVE10': '10',
    'SAVE20': '20',
    'HALF': 'order.total * 0.5'
  };
  return promos[code] || '0';
}

// Search orders
function searchOrders(query) {
  return orders.filter(function(o) {
    return o.id == query ||
           o.customerId == query ||
           o.shippingAddress.includes(query);
  });
}

// Generate report
function generateReport(startDate, endDate) {
  var report = {
    orders: [],
    totalRevenue: 0,
    orderCount: 0
  };

  for (var order of orders) {
    if (order.createdAt >= startDate && order.createdAt <= endDate) {
      report.orders.push(order);
      report.totalRevenue += order.total;
      report.orderCount++;
    }
  }

  return report;
}

// Export functions
module.exports = {
  createOrder: createOrder,
  getOrder: getOrder,
  getOrdersByCustomer: getOrdersByCustomer,
  updateOrderStatus: updateOrderStatus,
  processPayment: processPayment,
  cancelOrder: cancelOrder,
  calculateShipping: calculateShipping,
  searchOrders: searchOrders,
  generateReport: generateReport
};
```

---

## Part 1: Initial Scan (15 minutes)

### Task
Use Claude to perform an initial comprehensive scan.

### Prompt
```
Perform a comprehensive code review of this Node.js order service module.

Analyze for:
1. Security vulnerabilities (OWASP Top 10)
2. Logic bugs and errors
3. Code quality issues
4. Performance concerns
5. Best practice violations

For each issue found, provide:
- Category (Security/Bug/Quality/Performance)
- Severity (Critical/High/Medium/Low)
- Line number or function name
- Description of the issue
- Recommended fix
- Code example if applicable

Order findings by severity (Critical first).
```

### Document Initial Findings

Fill in as you review:

| # | Category | Severity | Location | Issue |
|---|----------|----------|----------|-------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |

---

## Part 2: Security Deep Dive (15 minutes)

### Task
Focus specifically on security vulnerabilities.

### Prompt
```
Analyze this code specifically for security vulnerabilities.

Check for:
- Injection attacks (SQL, Command, Code)
- Sensitive data exposure
- Broken authentication/authorization
- Security misconfigurations
- Logging of sensitive data
- Insecure communications
- Input validation issues

For each vulnerability:
- Severity: Critical/High/Medium/Low
- OWASP category
- Attack scenario (how could this be exploited?)
- Proof of concept (example attack)
- Remediation steps
- Secure code example
```

### Security Findings

| Vulnerability | OWASP Category | Attack Scenario | Fix |
|---------------|----------------|-----------------|-----|
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

---

## Part 3: Bug Analysis (10 minutes)

### Task
Identify all bugs and logic errors.

### Prompt
```
Find all bugs and logic errors in this code.

Look for:
- Off-by-one errors
- Null/undefined handling
- Race conditions
- Type coercion issues
- Missing error handling
- Incorrect calculations
- Edge case failures

For each bug:
- Function name
- Description
- Input that triggers the bug
- Expected vs actual behavior
- Fix
```

### Bug Report

| Bug | Function | Trigger | Expected | Actual | Fix |
|-----|----------|---------|----------|--------|-----|
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

---

## Part 4: Code Quality Review (10 minutes)

### Task
Identify code smells and quality issues.

### Prompt
```
Review this code for quality issues:

1. Code smells (long methods, duplicate code, etc.)
2. Naming conventions
3. Modern JavaScript usage
4. Error handling patterns
5. Async/await vs callbacks
6. Code organization

Suggest refactoring for the worst issues.
```

### Quality Issues

| Code Smell | Location | Impact | Suggested Fix |
|------------|----------|--------|---------------|
| | | | |
| | | | |
| | | | |
| | | | |
| | | | |

---

## Part 5: Generate Fix Recommendations (15 minutes)

### Task
Create actionable fix recommendations.

### High Priority Fixes (Security/Bugs)

Ask Claude:
```
For the critical and high severity issues found, provide:
1. Step-by-step fix instructions
2. Corrected code snippets
3. Testing recommendations
```

Document the top 5 fixes:

#### Fix 1: [Issue Name]
**Problem:**

**Solution:**

**Code:**
```javascript
// Fixed code here
```

#### Fix 2: [Issue Name]
**Problem:**

**Solution:**

**Code:**
```javascript
// Fixed code here
```

(Continue for top 5)

---

## Part 6: Create Review Report (10 minutes)

### Task
Compile a professional code review report.

### Prompt
```
Create a professional code review report with:

## Executive Summary
- Overall code quality score (1-10)
- Key risks
- Recommended priority actions

## Critical Issues
[List with details]

## High Priority Issues
[List with details]

## Medium Priority Issues
[List with details]

## Low Priority Issues
[List with details]

## Recommendations
- Immediate actions (< 1 week)
- Short-term improvements (< 1 month)
- Long-term refactoring (< 3 months)

## Risk Assessment
- Security risk level
- Reliability risk level
- Maintenance risk level
```

### Your Review Report

[Paste the generated report and any modifications]

---

## Expected Findings Reference

The code contains approximately these issues:

### Critical (4-5)
- eval() usage with user input
- Sensitive data logging (card numbers)
- Payment info stored in plaintext
- Missing authentication/authorization
- Server-Side Request Forgery potential

### High (4-5)
- Off-by-one error in Order constructor
- Missing error handling
- Type coercion with == instead of ===
- Synchronous file operations
- XSS in email content

### Medium (5-6)
- var instead of const/let
- Callback hell pattern
- No input validation
- Global mutable state
- Missing null checks

### Low (3-4)
- Old function syntax
- Inconsistent code style
- Missing JSDoc
- Magic numbers

---

## Scoring Rubric

| Criteria | Points |
|----------|--------|
| Found 15+ issues | 20 |
| Correct severity classification | 10 |
| Security issues identified | 20 |
| Bug identification | 15 |
| Code quality issues | 10 |
| Fix recommendations quality | 15 |
| Report professionalism | 10 |
| **Total** | **100** |

**Passing Score:** 70 points

---

## Submission Checklist

- [ ] Initial scan completed (10+ issues)
- [ ] Security deep dive (5+ vulnerabilities)
- [ ] Bug analysis (5+ bugs)
- [ ] Code quality review (5+ smells)
- [ ] Fix recommendations (5+ fixes)
- [ ] Professional report generated

---

## Reflection Questions

1. Which issues surprised you?
2. What did AI catch that you might have missed?
3. Were there any false positives?
4. How would you prioritize fixes?
5. What additional tools would help?

---

*Module 3 Lab - AI Code Review Challenge*
*AI-Assisted Software Development Course*
