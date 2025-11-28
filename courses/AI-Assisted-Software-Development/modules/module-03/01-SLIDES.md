# Module 3: AI for Code Review
## Presentation Slides

---

## Slide 1: Title Slide

# AI for Code Review

**Module 3 of 8**

*AI-Assisted Software Development Course*

---

**Duration:** 3 hours
**Focus:** Code analysis, bug detection, security scanning

---

## Slide 2: Module Objectives

# What You'll Master

1. **Use AI** for comprehensive code reviews
2. **Identify** bugs, vulnerabilities, and code smells
3. **Generate** actionable improvement suggestions
4. **Integrate** AI review into development workflow
5. **Evaluate** when to trust AI findings

---

## Slide 3: Generation vs. Analysis

# Generation vs. Analysis

| Code Generation | Code Analysis |
|-----------------|---------------|
| Create new code | Examine existing code |
| Forward-looking | Backward-looking |
| "Write this..." | "Review this..." |
| Copilot excels | Claude excels |
| Speed focus | Quality focus |

**Key Shift:** Different prompts, different tools

---

## Slide 4: Why AI Code Review?

# Why AI Code Review?

### The Problem
- Code reviews are time-consuming
- Reviewers miss subtle bugs
- Security expertise is scarce
- Consistency varies by reviewer

### AI Benefits
- Consistent analysis every time
- Catches patterns humans miss
- Security expertise built-in
- Scales infinitely
- Available 24/7

---

## Slide 5: What AI Can Catch

# What AI Can Catch

### Highly Effective
- Null reference issues
- Off-by-one errors
- SQL injection vulnerabilities
- XSS vulnerabilities
- Resource leaks
- Code duplication
- Naming issues

### Moderately Effective
- Logic errors
- Race conditions
- Business logic flaws
- Performance issues

### Less Effective
- Context-specific bugs
- Architectural problems
- Integration issues

---

## Slide 6: What AI Misses

# What AI Misses

### Common Blind Spots

1. **Business Context**
   - "This looks wrong but might be intentional"
   - Domain-specific logic

2. **System-Wide Issues**
   - Cross-service dependencies
   - Deployment configurations

3. **Runtime Behavior**
   - Memory usage patterns
   - Performance under load

4. **Human Intent**
   - Temporary workarounds
   - Intentional deviations

**Always pair AI review with human review**

---

## Slide 7: Claude for Code Review

# Claude for Code Review

### Why Claude Excels

1. **Large Context Window** - 200K tokens
2. **Strong Reasoning** - Understands complex logic
3. **Detailed Explanations** - Not just "wrong"
4. **Structured Output** - Can format as needed

### Example Prompt

```
Review this code for:
1. Bugs and logical errors
2. Security vulnerabilities
3. Performance issues
4. Code quality and maintainability

For each issue, provide:
- Location (line number or function)
- Severity (Critical/High/Medium/Low)
- Description
- Suggested fix

[paste code]
```

---

## Slide 8: Structured Review Prompts

# Structured Review Prompts

### Template for Comprehensive Review

```
Act as a senior code reviewer. Analyze this [language] code.

Context: [Brief description of what the code does]

Review for:
1. Logic errors and bugs
2. Security vulnerabilities (OWASP Top 10)
3. Performance issues
4. Code smells and maintainability
5. Error handling completeness

Output format:
- Category
- Line/Function
- Severity (Critical/High/Medium/Low)
- Issue description
- Recommended fix
- Code example if applicable

Prioritize issues by severity.
```

---

## Slide 9: Bug Detection Demo

# Live Demo: Bug Detection

### Sample Code with Bugs

```javascript
function calculateDiscount(price, discountPercent) {
  if (discountPercent > 0) {
    return price - (price * discountPercent);
  }
  return price;
}

function processOrders(orders) {
  for (let i = 0; i <= orders.length; i++) {
    const total = orders[i].price * orders[i].quantity;
    console.log(total);
  }
}
```

### Ask Claude to find bugs...

---

## Slide 10: Security Vulnerability Types

# Security Vulnerability Types

### OWASP Top 10 (2021)

1. **Broken Access Control**
2. **Cryptographic Failures**
3. **Injection** (SQL, NoSQL, Command)
4. **Insecure Design**
5. **Security Misconfiguration**
6. **Vulnerable Components**
7. **Authentication Failures**
8. **Software/Data Integrity Failures**
9. **Security Logging Failures**
10. **Server-Side Request Forgery**

**AI can detect patterns for all of these**

---

## Slide 11: SQL Injection Detection

# SQL Injection Detection

### Vulnerable Code

```javascript
app.get('/users', (req, res) => {
  const name = req.query.name;
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});
```

### AI Review Finding

```
CRITICAL - SQL Injection
Line: 3
Issue: User input directly concatenated into SQL query
Attack: /users?name='; DROP TABLE users;--
Fix: Use parameterized queries
```

---

## Slide 12: XSS Detection

# XSS Detection

### Vulnerable Code

```javascript
app.get('/profile', (req, res) => {
  const username = req.query.user;
  res.send(`<h1>Welcome, ${username}!</h1>`);
});
```

### AI Review Finding

```
CRITICAL - Cross-Site Scripting (XSS)
Line: 3
Issue: User input rendered without encoding
Attack: /profile?user=<script>alert('XSS')</script>
Fix: Use template engine with auto-escaping
```

---

## Slide 13: Authentication Issues

# Authentication Issues

### Problematic Code

```javascript
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && user.password === password) {
    res.json({ success: true, userId: user.id });
  } else {
    res.json({ success: false });
  }
});
```

### AI Findings

- Passwords stored/compared in plaintext
- No rate limiting
- Timing attack possible
- No session management

---

## Slide 14: Code Smells

# Code Smells

### What Are Code Smells?
Indicators of deeper problems, not bugs themselves.

### Common Smells AI Detects

| Smell | Description | Impact |
|-------|-------------|--------|
| Long Method | Function > 20-30 lines | Hard to understand |
| Duplicate Code | Copy-pasted logic | Maintenance nightmare |
| God Class | Class does too much | Hard to modify |
| Feature Envy | Uses other class's data | Poor encapsulation |
| Primitive Obsession | Uses primitives vs objects | Scattered logic |
| Long Parameter List | 5+ parameters | Hard to call correctly |

---

## Slide 15: Code Smell Example

# Code Smell Detection

### Code with Smells

```javascript
function processUserData(firstName, lastName, email,
  phone, address1, address2, city, state, zip,
  country, dateOfBirth, ssn, isActive, role) {

  // 50+ lines of validation
  // 30+ lines of transformation
  // 20+ lines of storage
  // 15+ lines of notification
}
```

### AI Findings

1. **Long Parameter List** - Use object parameter
2. **Long Method** - Extract methods
3. **Multiple Responsibilities** - Split into services
4. **Primitive Obsession** - Create User, Address classes

---

## Slide 16: Refactoring Suggestions

# AI Refactoring Suggestions

### Ask for Specific Refactoring

```
Suggest refactoring for this code following:
1. Single Responsibility Principle
2. Don't Repeat Yourself (DRY)
3. Clean Code practices

Provide before/after code examples.
```

### AI Refactoring Patterns
- Extract Method
- Extract Class
- Replace Conditional with Polymorphism
- Introduce Parameter Object
- Remove Dead Code

---

## Slide 17: Using Copilot Chat for Review

# Using Copilot Chat for Review

### Quick Reviews with /explain

1. Select suspicious code
2. Use `/explain`
3. Follow up: "Are there any bugs?"

### Quick Fixes with /fix

1. Select problematic code
2. Use `/fix`
3. Review suggested changes

### Best For
- Quick checks during coding
- Understanding unfamiliar code
- Simple bug fixes

---

## Slide 18: Claude vs. Copilot for Review

# Claude vs. Copilot for Review

| Aspect | Claude | Copilot Chat |
|--------|--------|--------------|
| **Context** | 200K tokens | Limited |
| **Depth** | Very detailed | Concise |
| **Integration** | Copy/paste | IDE native |
| **Best for** | Full PRs | Selected code |
| **Output format** | Highly customizable | Standard |
| **Conversation** | Multi-turn | Multi-turn |

### Recommendation
- Use **Copilot Chat** for quick, inline reviews
- Use **Claude** for comprehensive PR reviews

---

## Slide 19: Review Workflow

# AI Code Review Workflow

```
┌─────────────────────────────────────────────┐
│           Developer Commits Code            │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│  AI Pre-Review (Claude/Automated Tool)      │
│  - Security scan                            │
│  - Bug detection                            │
│  - Code quality check                       │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│        AI Report Generated                  │
│  - Critical issues flagged                  │
│  - Suggestions provided                     │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────┐
│       Human Review + AI Findings            │
│  - Validate AI findings                     │
│  - Add context-specific review              │
│  - Approve or request changes               │
└─────────────────────────────────────────────┘
```

---

## Slide 20: False Positives

# Handling False Positives

### Common False Positive Scenarios

1. **Intentional Behavior**
   - "This looks like a bug but it's by design"

2. **Framework Magic**
   - AI doesn't know framework conventions

3. **External Validation**
   - Validation happens elsewhere

### Reducing False Positives

- Provide context about architecture
- Mention frameworks and libraries
- Explain intentional choices
- Ask "Is this actually a problem if..."

---

## Slide 21: Severity Classification

# Severity Classification

### Severity Levels

| Level | Definition | Action |
|-------|------------|--------|
| **Critical** | Security breach, data loss | Block merge |
| **High** | Bugs affecting users | Fix before merge |
| **Medium** | Code quality issues | Fix soon |
| **Low** | Style, minor improvements | Optional |

### Ask AI to Classify

```
Classify each issue as Critical, High, Medium, or Low
based on:
- Security impact
- User impact
- Code maintainability
- Likelihood of occurrence
```

---

## Slide 22: Review Checklist

# AI Code Review Checklist

### For Every Review

```
□ Security
  □ Input validation
  □ SQL injection
  □ XSS prevention
  □ Authentication/Authorization
  □ Sensitive data handling

□ Logic
  □ Edge cases handled
  □ Error handling complete
  □ Null checks present
  □ Boundary conditions

□ Quality
  □ Code complexity reasonable
  □ Naming is clear
  □ No duplication
  □ Single responsibility

□ Performance
  □ No obvious bottlenecks
  □ Efficient algorithms
  □ Resource cleanup
```

---

## Slide 23: PR Review Template

# PR Review Template

### Structured PR Review Prompt

```
Review this pull request for a [type of application].

Changes include:
[Brief description]

Files changed:
[List or paste files]

Review for:
1. Breaking changes
2. Security implications
3. Performance impact
4. Test coverage gaps
5. Documentation needs

Provide:
- Summary of changes
- Risk assessment
- Required changes (blocking)
- Suggested improvements (non-blocking)
- Questions for the author
```

---

## Slide 24: Integration Options

# Integration with GitHub/GitLab

### Manual Integration
1. Copy PR diff
2. Paste into Claude
3. Copy findings to PR comments

### Automated Options
- GitHub Actions with AI API
- Custom bots
- Third-party tools (CodeRabbit, etc.)

### Example GitHub Action

```yaml
name: AI Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: AI Review
        run: |
          # Send diff to AI API
          # Post comments on PR
```

---

## Slide 25: Live Demo

# Live Demo: Full Code Review

### We'll Review:
- A 200-line module with intentional issues
- Using Claude for comprehensive review
- Using Copilot Chat for specific parts

### Watch For:
- Prompt construction
- Interpreting results
- Handling false positives
- Prioritizing fixes

---

## Slide 26: Best Practices

# Code Review Best Practices

### Do's
✅ Provide full context
✅ Ask for specific categories
✅ Request severity levels
✅ Verify critical findings
✅ Iterate on prompts
✅ Combine with human review

### Don'ts
❌ Trust blindly
❌ Skip human review
❌ Ignore false positives without checking
❌ Review huge files without splitting
❌ Forget to explain intent

---

## Slide 27: Measuring Review Quality

# Measuring Review Quality

### Metrics to Track

| Metric | Description | Target |
|--------|-------------|--------|
| Issues Found | AI-detected issues | Track trend |
| False Positive Rate | Invalid findings | < 20% |
| Bugs Caught | Bugs found in review | Compare to production |
| Review Time | Time saved | 50%+ reduction |
| Coverage | % of code reviewed | 100% |

---

## Slide 28: Module Summary

# Module 3 Summary

### What We Covered
✅ AI code review fundamentals
✅ Bug and vulnerability detection
✅ Code quality analysis
✅ Refactoring suggestions
✅ Integration workflows
✅ Best practices

### Key Skills Gained
- Comprehensive AI-assisted code review
- Security vulnerability identification
- Structured review prompts
- False positive handling

---

## Slide 29: Q&A

# Questions?

### Common Questions

**Q: Can AI replace human code reviewers?**
A: No - AI augments humans, catching different issues.

**Q: How do I handle sensitive code?**
A: Use enterprise plans, anonymize data, or review locally.

**Q: What about performance-critical code?**
A: AI can suggest, but benchmark yourself.

---

## Slide 30: Next Module Preview

# Up Next: AI for Documentation

**Module 4 Preview:**
- Generating inline comments
- Creating README files
- API documentation
- Architecture docs
- Keeping docs in sync

**Shift:** Back to generation mode

---

*End of Module 3 Slides*
