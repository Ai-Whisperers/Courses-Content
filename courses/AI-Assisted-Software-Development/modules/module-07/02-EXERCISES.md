# Module 7: Exercises
## Security & Best Practices

---

## Exercise 1: Security Audit (20 minutes)

### Objective
Identify security issues in AI prompts and generated code.

### Scenario
Review the following AI interactions and identify security concerns.

### Part A: Prompt Analysis

Review these prompts and identify what's wrong:

**Prompt 1:**
```
Help me connect to our production database:
mysql -u admin -p'Sup3rS3cr3t!' -h db.company-internal.com myapp_prod
```

**Prompt 2:**
```
Debug this API call that's failing:
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A28nn" \
  https://api.company.com/v1/users
```

**Prompt 3:**
```
I need to process this customer data:
Name: John Smith
SSN: 123-45-6789
Email: john.smith@gmail.com
Address: 123 Main St, Anytown, USA
```

### Deliverable A
For each prompt, document:
- Security issue(s)
- Risk level (High/Medium/Low)
- How to rewrite safely

### Part B: Code Review

Review this AI-generated code for security issues:

```javascript
const express = require('express');
const mysql = require('mysql');
const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'users'
});

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    }
    if (results.length > 0) {
      res.json({ token: btoa(username + ':' + password) });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

// Get user profile
app.get('/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  db.query(query, (err, results) => {
    res.json(results[0]);
  });
});

app.listen(3000);
```

### Deliverable B
Create a security report identifying:
- All vulnerabilities (minimum 8)
- OWASP Top 10 classification
- Severity rating
- Recommended fix

---

## Exercise 2: Policy Creation (25 minutes)

### Objective
Create an AI coding tool usage policy for your organization.

### Scenario
Your company is adopting GitHub Copilot and Claude for development. Create a comprehensive usage policy.

### Policy Template Structure

Complete the following sections:

```markdown
# AI Coding Tool Usage Policy

## 1. Purpose
[Explain why this policy exists]

## 2. Scope
[Who does this apply to? What tools are covered?]

## 3. Approved Tools
[List approved AI coding tools]
- Tool 1: [Name, tier, approved use cases]
- Tool 2: [Name, tier, approved use cases]

## 4. Prohibited Uses
[What is NOT allowed]
- [ ] Prohibited use 1
- [ ] Prohibited use 2
- [ ] ...

## 5. Data Classification
[What data can/cannot be used with AI tools]

| Data Type | Can Use with AI? | Notes |
|-----------|------------------|-------|
| Public code | | |
| Internal code | | |
| Customer data | | |
| Credentials | | |

## 6. Required Practices
[What must be done when using AI tools]

## 7. Review Requirements
[Code review process for AI-generated code]

## 8. Documentation
[How to document AI usage]

## 9. Training Requirements
[Required training before using AI tools]

## 10. Compliance
[How violations are handled]

## 11. Review Cycle
[How often policy is updated]
```

### Deliverable
Complete policy document (minimum 2 pages).

---

## Exercise 3: Code Review Simulation (20 minutes)

### Objective
Practice reviewing AI-generated code effectively.

### Scenario
A junior developer submitted this AI-generated pull request. Perform a thorough review.

### Code to Review

**PR Title:** Add user authentication with JWT

**PR Description:** Used GitHub Copilot to generate authentication system.

```typescript
// src/auth/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = 'my-super-secret-key';

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [];

export async function register(email: string, password: string) {
  const existing = users.find(u => u.email === email);
  if (existing) {
    throw new Error('User exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Math.random().toString(),
    email,
    password: hashedPassword,
    role: 'user'
  };

  users.push(user);
  return user;
}

export async function login(email: string, password: string) {
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('User not found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    SECRET
  );

  return { token, user };
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export async function resetPassword(email: string, newPassword: string) {
  const user = users.find(u => u.email === email);
  if (user) {
    user.password = await bcrypt.hash(newPassword, 10);
  }
}
```

```typescript
// src/auth/auth.controller.ts
import { Router } from 'express';
import * as authService from './auth.service';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.register(email, password);
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json(result);
});

router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  await authService.resetPassword(email, newPassword);
  res.json({ success: true });
});

export default router;
```

### Review Tasks

1. **Security Issues** - List all security concerns
2. **Code Quality** - Identify code quality issues
3. **Missing Features** - What's missing for production?
4. **AI-Specific Concerns** - What suggests AI-generation without understanding?

### Deliverable
Complete code review with:
- Inline comments on problematic lines
- Summary of issues (categorized)
- Required changes before approval
- Questions for the developer

---

## Exercise 4: Productivity Metrics Design (15 minutes)

### Objective
Design a productivity measurement framework for AI-assisted development.

### Task
Create a metrics framework for measuring AI tool effectiveness.

### Requirements

Design metrics for:

1. **Efficiency Metrics**
   - How to measure time savings
   - What baseline to compare against

2. **Quality Metrics**
   - How to measure code quality changes
   - What indicators matter

3. **Developer Experience**
   - How to measure satisfaction
   - What feedback to collect

4. **Business Impact**
   - How to measure ROI
   - What outcomes to track

### Template

```markdown
# AI Productivity Metrics Framework

## 1. Efficiency Metrics

### Metric: [Name]
- **Definition:** [What it measures]
- **Calculation:** [Formula]
- **Baseline:** [How to establish baseline]
- **Target:** [Goal value]
- **Collection Method:** [How to gather data]

## 2. Quality Metrics
[Same format]

## 3. Developer Experience Metrics
[Same format]

## 4. Business Impact Metrics
[Same format]

## 5. Reporting Cadence
[How often to review]

## 6. Dashboard Design
[Key visualizations needed]
```

### Deliverable
Complete metrics framework with at least 8 specific metrics.

---

## Exercise 5: Incident Response (15 minutes)

### Objective
Practice responding to AI-related security incidents.

### Scenario
Your team discovered that a developer accidentally pasted production database credentials into ChatGPT while debugging a connection issue 2 days ago.

### Tasks

1. **Immediate Actions** (first 1 hour)
   - List all immediate steps to take

2. **Investigation** (next 24 hours)
   - What to investigate
   - What logs to review
   - Who to notify

3. **Remediation**
   - Technical fixes required
   - Process improvements

4. **Prevention**
   - Controls to prevent recurrence

### Deliverable
Complete incident response plan with:
- Timeline of actions
- Responsible parties
- Communication plan
- Lessons learned

---

## Submission Checklist

- [ ] Exercise 1: Security audit report
- [ ] Exercise 2: AI usage policy document
- [ ] Exercise 3: Complete code review
- [ ] Exercise 4: Productivity metrics framework
- [ ] Exercise 5: Incident response plan

---

*Module 7 Exercises - Security & Best Practices*
