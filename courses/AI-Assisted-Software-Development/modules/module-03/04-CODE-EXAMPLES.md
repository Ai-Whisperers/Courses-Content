# Module 3: Code Examples
## AI for Code Review

---

## Overview

Reference examples of common issues, review prompts, and fixed code patterns.

---

## Example 1: Common Bug Patterns

### Off-by-One Errors

```javascript
// BUG: Off-by-one error
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {  // BUG: <= should be <
    sum += arr[i];  // Will access undefined
  }
  return sum;
}

// FIXED
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// BETTER: Use reduce
function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}
```

### Null Reference Errors

```javascript
// BUG: Missing null check
function getUserName(user) {
  return user.profile.name;  // Crashes if user or profile is null
}

// FIXED: Safe navigation
function getUserName(user) {
  return user?.profile?.name ?? 'Unknown';
}

// ALTERNATIVE: Explicit check
function getUserName(user) {
  if (!user || !user.profile) {
    return 'Unknown';
  }
  return user.profile.name;
}
```

### Type Coercion Issues

```javascript
// BUG: Loose equality
function findUser(users, id) {
  return users.find(u => u.id == id);  // "5" == 5 is true
}

// FIXED: Strict equality
function findUser(users, id) {
  return users.find(u => u.id === id);
}

// BUG: String concatenation
function calculateTotal(price, tax) {
  return price + tax;  // If price is "100", result is "1000.08"
}

// FIXED: Explicit conversion
function calculateTotal(price, tax) {
  return Number(price) + Number(tax);
}
```

---

## Example 2: Security Vulnerability Patterns

### SQL Injection

```javascript
// VULNERABLE
app.get('/users', (req, res) => {
  const name = req.query.name;
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  //                                        ^^^^ DANGEROUS
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// Attack: /users?name=' OR '1'='1

// FIXED: Parameterized query
app.get('/users', (req, res) => {
  const name = req.query.name;
  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [name], (err, results) => {
    res.json(results);
  });
});
```

### XSS (Cross-Site Scripting)

```javascript
// VULNERABLE
app.get('/profile', (req, res) => {
  const username = req.query.user;
  res.send(`<h1>Welcome, ${username}!</h1>`);
  //                      ^^^^^^^^^ User input directly in HTML
});

// Attack: /profile?user=<script>alert('XSS')</script>

// FIXED: Use template engine with escaping
const escapeHtml = require('escape-html');

app.get('/profile', (req, res) => {
  const username = escapeHtml(req.query.user);
  res.send(`<h1>Welcome, ${username}!</h1>`);
});

// BETTER: Use templating engine
app.set('view engine', 'ejs');
app.get('/profile', (req, res) => {
  res.render('profile', { username: req.query.user });
  // EJS auto-escapes: <%= username %>
});
```

### Code Injection

```javascript
// VULNERABLE
function calculateDiscount(formula) {
  return eval(formula);  // NEVER use eval with user input
}

// Attack: calculateDiscount('process.exit()')

// FIXED: Use safe alternatives
function calculateDiscount(discountType, amount) {
  const discounts = {
    'percent10': amount * 0.10,
    'percent20': amount * 0.20,
    'flat5': 5,
    'flat10': 10
  };
  return discounts[discountType] || 0;
}
```

### Authentication Issues

```javascript
// VULNERABLE
function login(email, password) {
  const user = db.findUser({ email, password });  // Plaintext password
  if (user) {
    return { success: true, token: Math.random().toString() };
    //                      ^^^^^ Weak token generation
  }
  return { success: false };
}

// FIXED
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

async function login(email, password) {
  const user = await db.findUser({ email });

  if (!user) {
    // Don't reveal if email exists
    return { success: false, message: 'Invalid credentials' };
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return { success: false, message: 'Invalid credentials' };
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { success: true, token };
}
```

---

## Example 3: Code Smell Catalog

### Long Method

```javascript
// SMELL: Method doing too much
function processOrder(order) {
  // 200 lines of code handling:
  // - Validation
  // - Inventory check
  // - Payment processing
  // - Shipping calculation
  // - Email notification
  // - Logging
  // - Analytics
}

// FIXED: Extract methods
function processOrder(order) {
  validateOrder(order);
  checkInventory(order);
  const payment = processPayment(order);
  const shipping = calculateShipping(order);
  sendConfirmation(order, payment, shipping);
  logOrder(order);
  trackAnalytics(order);
}
```

### Duplicate Code

```javascript
// SMELL: Duplicate validation
function createUser(data) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!data.name || data.name.length < 2) {
    throw new Error('Invalid name');
  }
  // ...
}

function updateUser(data) {
  if (!data.email || !data.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!data.name || data.name.length < 2) {
    throw new Error('Invalid name');
  }
  // ...
}

// FIXED: Extract validation
const validators = {
  email: (value) => value && value.includes('@'),
  name: (value) => value && value.length >= 2
};

function validate(data, fields) {
  for (const field of fields) {
    if (!validators[field](data[field])) {
      throw new Error(`Invalid ${field}`);
    }
  }
}

function createUser(data) {
  validate(data, ['email', 'name']);
  // ...
}

function updateUser(data) {
  validate(data, ['email', 'name']);
  // ...
}
```

### Long Parameter List

```javascript
// SMELL: Too many parameters
function createOrder(
  customerId,
  productId,
  quantity,
  price,
  discountCode,
  shippingMethod,
  shippingAddress,
  billingAddress,
  paymentMethod,
  cardNumber,
  notes
) {
  // ...
}

// FIXED: Use object parameter
function createOrder(options) {
  const {
    customerId,
    productId,
    quantity,
    price,
    discountCode,
    shipping: { method, address },
    billing: { address: billingAddress, payment },
    notes
  } = options;
  // ...
}

// Usage
createOrder({
  customerId: '123',
  productId: '456',
  quantity: 2,
  price: 99.99,
  shipping: {
    method: 'express',
    address: { ... }
  },
  billing: {
    address: { ... },
    payment: { ... }
  }
});
```

---

## Example 4: Review Prompt Templates

### Comprehensive Review Prompt

```
You are a senior software engineer performing a code review.

Review the following [LANGUAGE] code from [PROJECT TYPE]:

```code
[PASTE CODE HERE]
```

Analyze for:

1. **Security** (Critical)
   - Injection vulnerabilities
   - Authentication/Authorization issues
   - Data exposure
   - OWASP Top 10

2. **Correctness** (High)
   - Logic errors
   - Edge cases
   - Error handling
   - Race conditions

3. **Performance** (Medium)
   - Algorithm complexity
   - Memory usage
   - Database queries
   - Caching opportunities

4. **Maintainability** (Low)
   - Code smells
   - Naming conventions
   - Documentation
   - Test coverage

For each finding, provide:
- **Category**: Security/Correctness/Performance/Maintainability
- **Severity**: Critical/High/Medium/Low
- **Location**: Line number or function name
- **Issue**: Clear description
- **Impact**: What could go wrong
- **Fix**: Specific recommendation
- **Example**: Code snippet if applicable

Prioritize findings by severity.
```

### Security-Focused Review Prompt

```
Perform a security audit of this code.

Check for OWASP Top 10 vulnerabilities:
1. A01 - Broken Access Control
2. A02 - Cryptographic Failures
3. A03 - Injection
4. A04 - Insecure Design
5. A05 - Security Misconfiguration
6. A06 - Vulnerable Components
7. A07 - Identification/Auth Failures
8. A08 - Software/Data Integrity Failures
9. A09 - Security Logging Failures
10. A10 - Server-Side Request Forgery

For each vulnerability found:
- OWASP category
- Severity: Critical/High/Medium/Low
- Attack vector (how it could be exploited)
- Proof of concept (example attack input)
- Remediation (step-by-step fix)
- Secure code example
```

### PR Review Prompt

```
Review this pull request as if you were a senior developer.

## Context
[Describe what the PR is supposed to do]

## Changes
```code
[Paste diff or changed files]
```

Provide:

## Summary
Brief overview of changes

## Security Review
- Any security implications?
- New attack surfaces?
- Data handling concerns?

## Code Quality
- Design patterns used correctly?
- Error handling adequate?
- Test coverage?

## Blocking Issues
Issues that MUST be fixed before merge

## Suggestions
Non-blocking improvements

## Questions
Clarifications needed from author

## Verdict
APPROVE / REQUEST_CHANGES / NEEDS_DISCUSSION
```

---

## Example 5: Fixed Code Patterns

### Secure Authentication

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// Rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts, please try again later'
});

// Secure password hashing
async function hashPassword(password) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Secure password verification
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Secure login
app.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const user = await User.findByEmail(email);

    // Constant-time comparison (prevent timing attacks)
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      // Generic message (don't reveal if email exists)
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate secure token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Secure Database Queries

```javascript
// BEFORE: Vulnerable to injection
async function searchUsers(query) {
  const sql = `SELECT * FROM users WHERE name LIKE '%${query}%'`;
  return db.query(sql);
}

// AFTER: Parameterized query
async function searchUsers(query) {
  const sql = 'SELECT * FROM users WHERE name LIKE ?';
  const sanitizedQuery = `%${query.replace(/[%_]/g, '\\$&')}%`;
  return db.query(sql, [sanitizedQuery]);
}

// BETTER: Use ORM
async function searchUsers(query) {
  return User.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`
      }
    },
    attributes: ['id', 'name', 'email'], // Only select needed fields
    limit: 100 // Prevent unbounded queries
  });
}
```

### Error Handling Pattern

```javascript
// BEFORE: Poor error handling
function processData(data) {
  const parsed = JSON.parse(data);
  return parsed.value * 2;
}

// AFTER: Comprehensive error handling
function processData(data) {
  // Input validation
  if (data === null || data === undefined) {
    throw new ValidationError('Data cannot be null');
  }

  // Safe parsing
  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (error) {
    throw new ValidationError('Invalid JSON format');
  }

  // Property validation
  if (typeof parsed.value !== 'number') {
    throw new ValidationError('Value must be a number');
  }

  if (!Number.isFinite(parsed.value)) {
    throw new ValidationError('Value must be finite');
  }

  return parsed.value * 2;
}

// Custom error class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}
```

---

## Example 6: Review Report Template

```markdown
# Code Review Report

## Project: [Project Name]
## Date: [Date]
## Reviewer: [Name / AI-Assisted]
## Files Reviewed: [Count]

---

## Executive Summary

**Overall Quality Score:** 6/10

**Key Findings:**
- 2 Critical security vulnerabilities
- 3 High-priority bugs
- 8 Medium code quality issues
- 5 Low-priority suggestions

**Risk Level:** HIGH - Security issues require immediate attention

---

## Critical Issues (BLOCKING)

### C1: SQL Injection in User Search
- **Location:** `routes/users.js:45`
- **Impact:** Complete database compromise possible
- **Fix:** Use parameterized queries

### C2: Hardcoded API Keys
- **Location:** `config/api.js:12`
- **Impact:** Credential exposure
- **Fix:** Use environment variables

---

## High Priority Issues

### H1: Missing Input Validation
- **Location:** Multiple endpoints
- **Impact:** Invalid data processing
- **Fix:** Implement validation middleware

---

## Recommendations

### Immediate (< 1 week)
1. Fix SQL injection vulnerabilities
2. Remove hardcoded credentials
3. Add input validation

### Short-term (< 1 month)
1. Implement rate limiting
2. Add comprehensive logging
3. Increase test coverage

### Long-term (< 3 months)
1. Refactor legacy code
2. Implement caching layer
3. Add monitoring

---

## Conclusion

This codebase requires immediate attention for security issues.
After critical fixes, focus on improving code quality and test coverage.
```

---

*Module 3 Code Examples - AI for Code Review*
*AI-Assisted Software Development Course*
