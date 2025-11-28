# Module 3: Quiz
## AI for Code Review

---

## Quiz Information

| Attribute | Details |
|-----------|---------|
| **Questions** | 20 |
| **Time Limit** | 20 minutes |
| **Passing Score** | 70% (14/20 correct) |
| **Topics** | Security, bugs, code quality, AI review |

---

## Section 1: Security Vulnerabilities (6 questions)

### Question 1
**Which vulnerability is present in this code?**

```javascript
app.get('/user', (req, res) => {
  const id = req.query.id;
  db.query(`SELECT * FROM users WHERE id = ${id}`);
});
```

- A) XSS (Cross-Site Scripting)
- B) SQL Injection
- C) CSRF (Cross-Site Request Forgery)
- D) Path Traversal

---

### Question 2
**What OWASP Top 10 category does this vulnerability belong to?**

```javascript
res.send(`<h1>Welcome, ${req.query.username}!</h1>`);
```

- A) A01 - Broken Access Control
- B) A03 - Injection
- C) A07 - Identification and Authentication Failures
- D) A02 - Cryptographic Failures

---

### Question 3
**What is the security issue with this code?**

```javascript
function login(email, password) {
  const user = db.find(u => u.email === email && u.password === password);
  return user ? { success: true } : { success: false };
}
```

- A) SQL injection
- B) Passwords stored and compared in plaintext
- C) Missing rate limiting
- D) Both B and C

---

### Question 4
**Why is `eval()` dangerous with user input?**

- A) It's slow
- B) It allows arbitrary code execution
- C) It doesn't work in all browsers
- D) It's deprecated

---

### Question 5
**What is the recommended fix for this vulnerability?**

```javascript
console.log('Payment processed for card:', cardNumber, 'CVV:', cvv);
```

- A) Use console.error instead
- B) Remove sensitive data from logs
- C) Encrypt the console output
- D) Use a logging library

---

### Question 6
**Which is the MOST secure way to store user passwords?**

- A) Plain text in database
- B) MD5 hash
- C) SHA-256 hash
- D) bcrypt with salt

---

## Section 2: Bug Detection (5 questions)

### Question 7
**What bug is in this code?**

```javascript
function findMax(arr) {
  let max = 0;
  for (const num of arr) {
    if (num > max) max = num;
  }
  return max;
}
```

- A) Infinite loop
- B) Returns wrong result for negative numbers
- C) Missing return statement
- D) Type error

---

### Question 8
**What's wrong with this comparison?**

```javascript
if (user.id == requestedId) {
  return user;
}
```

- A) Nothing wrong
- B) Should use === for strict equality
- C) Should use > instead
- D) Missing null check

---

### Question 9
**What bug does this code have?**

```javascript
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}
```

- A) Off-by-one error (will access undefined)
- B) Infinite loop
- C) Wrong variable name
- D) Missing semicolon

---

### Question 10
**What happens when this function is called with an empty array?**

```javascript
function getFirst(arr) {
  return arr[0].name;
}
```

- A) Returns undefined
- B) Returns null
- C) Throws TypeError (cannot read property 'name' of undefined)
- D) Returns empty string

---

### Question 11
**What issue does this async code have?**

```javascript
async function getData() {
  const data = fetch('/api/data');
  return data.json();
}
```

- A) Missing await keywords
- B) Wrong URL format
- C) Missing error handling
- D) Both A and C

---

## Section 3: Code Quality (5 questions)

### Question 12
**What code smell is demonstrated here?**

```javascript
function process(a, b, c, d, e, f, g, h, i, j) {
  // ...
}
```

- A) Long method
- B) Long parameter list
- C) God class
- D) Duplicate code

---

### Question 13
**What refactoring pattern would improve this code?**

```javascript
function calculatePrice(product) {
  // 50 lines for validation
  // 30 lines for discount calculation
  // 40 lines for tax calculation
  // 20 lines for formatting
}
```

- A) Inline Method
- B) Extract Method
- C) Move Method
- D) Rename Method

---

### Question 14
**What principle does this code violate?**

```javascript
class UserService {
  createUser() { /* ... */ }
  deleteUser() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
  processPayment() { /* ... */ }
}
```

- A) DRY (Don't Repeat Yourself)
- B) Single Responsibility Principle
- C) Open/Closed Principle
- D) Liskov Substitution Principle

---

### Question 15
**Which is better practice?**

Option A:
```javascript
var x = 5;
var y = 10;
```

Option B:
```javascript
const x = 5;
const y = 10;
```

- A) Option A - more compatible
- B) Option B - immutable values, clearer intent
- C) Both are equally good
- D) Neither - should use let

---

### Question 16
**What's the main issue with this error handling?**

```javascript
try {
  doSomething();
} catch (e) {
  // ignore
}
```

- A) Wrong syntax
- B) Silently swallowing errors hides problems
- C) Should use finally
- D) Should throw again

---

## Section 4: AI Code Review (4 questions)

### Question 17
**Which tool is BEST for reviewing a complete 500-line file?**

- A) GitHub Copilot inline suggestions
- B) Claude with full file context
- C) Copilot Chat with /explain
- D) Any tool works equally well

---

### Question 18
**What should you do when AI identifies a security vulnerability?**

- A) Automatically accept and fix
- B) Ignore it - AI makes mistakes
- C) Verify the finding before fixing
- D) Wait for human review first

---

### Question 19
**What's a common limitation of AI code review?**

- A) Cannot detect any bugs
- B) May miss context-specific business logic issues
- C) Only works with JavaScript
- D) Cannot detect security issues

---

### Question 20
**Which prompt would give BEST results for AI code review?**

**Option A:**
```
Review this code
```

**Option B:**
```
Review this code for bugs, security issues, and code quality.
For each issue, provide severity, location, and fix.
```

- A) Option A - simpler is better
- B) Option B - specific prompts get better results
- C) Both produce same results
- D) Neither - AI can't review code

---

## Answer Key (Instructor Reference)

| Q | Answer | Explanation |
|---|--------|-------------|
| 1 | B | User input directly in SQL query = SQL injection |
| 2 | B | XSS is categorized under A03 - Injection |
| 3 | D | Plaintext passwords AND no rate limiting |
| 4 | B | eval() executes any code passed to it |
| 5 | B | Never log sensitive data like card numbers |
| 6 | D | bcrypt with salt is industry standard |
| 7 | B | Starting max at 0 fails for all-negative arrays |
| 8 | B | == allows type coercion ("5" == 5 is true) |
| 9 | A | <= causes access to arr[arr.length] = undefined |
| 10 | C | arr[0] is undefined, .name throws TypeError |
| 11 | D | Missing await AND missing error handling |
| 12 | B | 10 parameters is a long parameter list smell |
| 13 | B | Extract Method breaks up long functions |
| 14 | B | Class does too many unrelated things |
| 15 | B | const/let are modern, const for immutable |
| 16 | B | Silent catch hides bugs and issues |
| 17 | B | Claude's large context window handles full files |
| 18 | C | Always verify AI findings before fixing |
| 19 | B | AI may miss domain-specific context |
| 20 | B | Specific prompts produce better results |

---

## Scoring Guide

| Score | Grade | Status |
|-------|-------|--------|
| 18-20 | 90-100% | Excellent |
| 14-17 | 70-85% | Pass |
| 10-13 | 50-65% | Needs Review |
| < 10 | < 50% | Retake Required |

---

*Module 3 Quiz - AI for Code Review*
*AI-Assisted Software Development Course*
