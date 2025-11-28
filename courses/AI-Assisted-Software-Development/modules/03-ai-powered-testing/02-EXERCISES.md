# Module 3: Exercises
## AI for Code Review

---

## Overview

These exercises develop your AI code review skills through progressively challenging scenarios.

**Total Time:** 45-60 minutes
**Tools:** Claude (primary), Copilot Chat (secondary)

---

## Exercise 1: Bug Hunting - Easy (5 minutes)

### Objective
Find bugs in simple code using AI.

### Instructions

Review this code with Claude and identify all bugs:

```javascript
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i <= numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

function findMax(arr) {
  let max = 0;
  for (const num of arr) {
    if (num > max) {
      max = num;
    }
  }
  return max;
}

function reverseString(str) {
  return str.split().reverse().join();
}
```

### Prompt to Use
```
Find all bugs in this JavaScript code. For each bug:
- Line number
- What's wrong
- How to fix it
```

### Expected Findings
Document the bugs AI finds:
1. Bug 1: _______________
2. Bug 2: _______________
3. Bug 3: _______________

---

## Exercise 2: Bug Hunting - Medium (10 minutes)

### Objective
Find subtle bugs in more complex code.

### Instructions

Review this authentication code:

```javascript
class AuthService {
  constructor() {
    this.users = [];
    this.sessions = {};
  }

  register(email, password) {
    const existingUser = this.users.find(u => u.email == email);
    if (existingUser) {
      return { success: false, error: 'Email exists' };
    }

    const user = {
      id: this.users.length + 1,
      email: email,
      password: password,
      createdAt: Date.now()
    };

    this.users.push(user);
    return { success: true, user: user };
  }

  login(email, password) {
    const user = this.users.find(u =>
      u.email == email && u.password == password
    );

    if (user) {
      const sessionId = Math.random().toString();
      this.sessions[sessionId] = user.id;
      return { success: true, sessionId: sessionId };
    }

    return { success: false, error: 'Invalid credentials' };
  }

  validateSession(sessionId) {
    return this.sessions[sessionId] != undefined;
  }

  logout(sessionId) {
    delete this.sessions[sessionId];
  }
}
```

### Prompt to Use
```
Review this authentication service for:
1. Security vulnerabilities
2. Logic errors
3. Best practice violations

For each issue, provide severity (Critical/High/Medium/Low).
```

### Document Findings
| Issue | Severity | Location | Description |
|-------|----------|----------|-------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

---

## Exercise 3: Security Vulnerability Scan (10 minutes)

### Objective
Identify OWASP Top 10 vulnerabilities.

### Instructions

Scan this Express.js API for security issues:

```javascript
const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'app'
});

app.use(express.json());

// User search endpoint
app.get('/users', (req, res) => {
  const search = req.query.q;
  const query = `SELECT * FROM users WHERE name LIKE '%${search}%'`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    }
    res.json(results);
  });
});

// Profile page
app.get('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  db.query(query, (err, results) => {
    if (results.length > 0) {
      const html = `
        <h1>Welcome, ${results[0].name}!</h1>
        <p>Email: ${results[0].email}</p>
      `;
      res.send(html);
    }
  });
});

// Admin endpoint
app.post('/admin/delete-user', (req, res) => {
  const userId = req.body.userId;
  db.query(`DELETE FROM users WHERE id = ${userId}`);
  res.json({ success: true });
});

// File upload
app.post('/upload', (req, res) => {
  const filename = req.body.filename;
  const content = req.body.content;
  require('fs').writeFileSync(`./uploads/${filename}`, content);
  res.json({ success: true });
});

app.listen(3000);
```

### Prompt to Use
```
Perform a security audit on this Express.js application.
Check for OWASP Top 10 vulnerabilities including:
- Injection attacks
- Broken authentication
- Sensitive data exposure
- XSS
- Security misconfiguration

For each vulnerability:
- Severity: Critical/High/Medium/Low
- Vulnerability type
- Line number
- Attack scenario
- Remediation
```

### Security Report
| # | Vulnerability | Severity | Line | Remediation |
|---|---------------|----------|------|-------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |

---

## Exercise 4: Code Quality Review (10 minutes)

### Objective
Identify code smells and quality issues.

### Instructions

Review this code for quality issues:

```javascript
function proc(d, t, c, s, a, b, x) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].type == t) {
      if (c == true) {
        if (d[i].status == s) {
          if (d[i].amount > a && d[i].amount < b) {
            var item = {};
            item.id = d[i].id;
            item.name = d[i].name;
            item.type = d[i].type;
            item.status = d[i].status;
            item.amount = d[i].amount;
            item.date = d[i].date;
            if (x == true) {
              item.extra = d[i].extra;
            }
            r.push(item);
          }
        }
      } else {
        if (d[i].amount > a && d[i].amount < b) {
          var item = {};
          item.id = d[i].id;
          item.name = d[i].name;
          item.type = d[i].type;
          item.status = d[i].status;
          item.amount = d[i].amount;
          item.date = d[i].date;
          if (x == true) {
            item.extra = d[i].extra;
          }
          r.push(item);
        }
      }
    }
  }
  return r;
}
```

### Prompt to Use
```
Review this code for:
1. Code smells (naming, complexity, duplication)
2. Maintainability issues
3. Clean code violations

Then provide a refactored version that:
- Uses meaningful names
- Reduces complexity
- Removes duplication
- Follows modern JavaScript practices
```

### Document Issues
1. Code Smell: _______________
2. Code Smell: _______________
3. Code Smell: _______________
4. Code Smell: _______________
5. Code Smell: _______________

### Refactored Code
[Paste the AI-suggested refactored version]

---

## Exercise 5: PR Review Simulation (10 minutes)

### Objective
Simulate a real PR review.

### Instructions

You're reviewing a PR that adds user registration. Review the changes:

```javascript
// NEW FILE: routes/auth.js

const router = require('express').Router();
const db = require('../db');

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  // Create user
  const result = await db.query(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, password, name]
  );

  res.json({
    success: true,
    userId: result.insertId,
    email: email,
    password: password
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const users = await db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );

  if (users.length > 0) {
    res.json({ success: true, user: users[0] });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
```

### Prompt to Use
```
Review this PR as a senior developer. Provide:

1. Summary of changes
2. Security issues (blocking)
3. Bug/logic issues (blocking)
4. Code quality suggestions (non-blocking)
5. Questions for the author

Use this format for each issue:
[SEVERITY] File:Line - Description
```

### Your PR Review
```
## Summary


## Blocking Issues


## Non-Blocking Suggestions


## Questions for Author

```

---

## Exercise 6: Refactoring Guidance (5 minutes)

### Objective
Get AI to suggest specific refactoring.

### Instructions

Ask Claude to refactor this function:

```javascript
function getUserData(userId, options) {
  let userData = {};

  // Get basic info
  const user = db.users.find(u => u.id === userId);
  if (!user) return null;

  userData.id = user.id;
  userData.name = user.name;
  userData.email = user.email;

  // Get orders if requested
  if (options.includeOrders) {
    const orders = db.orders.filter(o => o.userId === userId);
    userData.orders = orders.map(o => ({
      id: o.id,
      total: o.total,
      date: o.date,
      status: o.status
    }));

    // Calculate order stats
    let totalSpent = 0;
    let orderCount = 0;
    for (const order of orders) {
      totalSpent += order.total;
      orderCount++;
    }
    userData.totalSpent = totalSpent;
    userData.orderCount = orderCount;
  }

  // Get reviews if requested
  if (options.includeReviews) {
    const reviews = db.reviews.filter(r => r.userId === userId);
    userData.reviews = reviews;
    userData.reviewCount = reviews.length;
  }

  // Get addresses if requested
  if (options.includeAddresses) {
    const addresses = db.addresses.filter(a => a.userId === userId);
    userData.addresses = addresses;
  }

  return userData;
}
```

### Prompt to Use
```
Refactor this function using:
1. Extract Method pattern
2. Builder or Composer pattern
3. Single Responsibility Principle

Show the refactored code with multiple smaller functions.
```

### Deliverable
Paste the refactored version from AI.

---

## Exercise 7: Using Copilot Chat for Review (5 minutes)

### Objective
Practice quick reviews with Copilot Chat.

### Instructions

Using Copilot Chat in VS Code:

### Task 1: /explain
Copy this code into VS Code, select it, and use `/explain`:

```javascript
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
```

Document the explanation:

### Task 2: /fix
Select this buggy code and use `/fix`:

```javascript
function findIndex(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] = target) {
      return i;
    }
  }
  return -1;
}
```

Document the fix:

### Task 3: Ask a question
Select any code and ask:
"Are there any potential memory leaks in this code?"

Document the response:

---

## Exercise 8: Create a Review Report (10 minutes)

### Objective
Generate a comprehensive review report.

### Instructions

Review this entire module (all code) and create a report:

```javascript
// User Service Module
const crypto = require('crypto');

const users = [];

function createUser(data) {
  const user = {
    id: users.length + 1,
    ...data,
    password: data.password, // TODO: hash this
    created: new Date()
  };
  users.push(user);
  return user;
}

function findUser(id) {
  return users.find(u => u.id == id);
}

function updateUser(id, data) {
  const user = findUser(id);
  if (user) {
    Object.assign(user, data);
    return user;
  }
}

function deleteUser(id) {
  const index = users.findIndex(u => u.id == id);
  if (index > -1) {
    users.splice(index, 1);
    return true;
  }
}

function authenticate(email, password) {
  const user = users.find(u =>
    u.email === email && u.password === password
  );
  if (user) {
    return { token: crypto.randomBytes(16).toString('hex'), user };
  }
  return null;
}

function searchUsers(query) {
  return users.filter(u =>
    u.name.includes(query) || u.email.includes(query)
  );
}

module.exports = {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  authenticate,
  searchUsers
};
```

### Prompt to Use
```
Generate a comprehensive code review report for this module.

Include:
1. Executive Summary
2. Critical Issues (security, bugs)
3. High Priority (major improvements)
4. Medium Priority (code quality)
5. Low Priority (nice to have)
6. Recommendations
7. Risk Assessment

Format as a professional report.
```

### Deliverable
Complete review report document.

---

## Submission Checklist

- [ ] Exercise 1: Bug hunting (easy) completed
- [ ] Exercise 2: Bug hunting (medium) completed
- [ ] Exercise 3: Security scan documented
- [ ] Exercise 4: Code quality review and refactoring
- [ ] Exercise 5: PR review simulation
- [ ] Exercise 6: Refactoring guidance
- [ ] Exercise 7: Copilot Chat practice
- [ ] Exercise 8: Comprehensive review report

---

## Reflection Questions

1. What types of issues did AI catch best?
2. Were there any false positives?
3. How did Claude compare to Copilot Chat?
4. What would you add to the review process?

---

*Module 3 Exercises - AI for Code Review*
*AI-Assisted Software Development Course*
