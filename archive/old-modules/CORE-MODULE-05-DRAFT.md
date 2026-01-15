# Core Module 5: Code Validation & Quality Assurance
## FPUNA Summer 2026 - Advanced Core Skills

**Duration**: Integrated across Weeks 2-3  
**Tool Focus**: OpenCode + Quality Tools  
**Prerequisites**: Modules 1-4 completed

---

## Module Overview

AI-generated code is powerful, but it requires validation. In this module, you'll learn how to ensure that OpenCode-generated code meets professional quality standards, catches edge cases, and passes rigorous review criteria.

### Learning Objectives

By the end of this module, you will be able to:

1. **Review** AI-generated code systematically
2. **Identify** common code quality issues
3. **Apply** code quality standards and linters
4. **Validate** correctness with multiple techniques
5. **Ensure** security and performance standards
6. **Improve** code through iterative refinement

---

## Why Code Validation Matters

### The Reality of AI-Generated Code

OpenCode is incredibly powerful, but it:
- ✅ Generates code **quickly**
- ✅ Follows **patterns** you specify
- ✅ Writes **syntactically correct** code

But it may:
- ⚠️ Miss **edge cases**
- ⚠️ Use **suboptimal** approaches
- ⚠️ Introduce **security vulnerabilities**
- ⚠️ Create **performance bottlenecks**
- ⚠️ Have **logic errors**

**Your role**: Validate and refine AI-generated code to professional standards.

---

## 5.1 The Code Quality Framework

### The 7 Dimensions of Code Quality

```
1. Correctness  - Does it do what it's supposed to?
2. Completeness - Does it handle all cases?
3. Security     - Is it safe from vulnerabilities?
4. Performance  - Is it efficient enough?
5. Maintainability - Can others understand and modify it?
6. Testability  - Can it be tested easily?
7. Style        - Does it follow conventions?
```

---

### The Validation Workflow

```
Generate Code (OpenCode)
     ↓
Static Analysis (Linters, Type Checkers)
     ↓
Manual Review (Quality Checklist)
     ↓
Testing (Unit, Integration, E2E)
     ↓
Security Scan (Vulnerability Check)
     ↓
Performance Check (if applicable)
     ↓
Refinement (Iterative Improvement)
     ↓
Approval & Merge
```

---

## 5.2 Static Analysis with Linters

### What Are Linters?

Linters automatically check code for:
- Syntax errors
- Style violations
- Common mistakes
- Potential bugs
- Best practice violations

---

### Setting Up Linters

#### For TypeScript/JavaScript Projects

```bash
# Install ESLint
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Create config
npx eslint --init

# Run linter
npx eslint src/
```

**Common Rules to Enable**:
- `no-unused-vars` - Catch unused variables
- `no-console` - Prevent console.log in production
- `eqeqeq` - Enforce strict equality (===)
- `no-eval` - Prevent dangerous eval()
- `prefer-const` - Use const for non-reassigned variables

---

#### For Python Projects

```bash
# Install tools
pip install ruff black mypy

# Run linter (Ruff - fast modern linter)
ruff check .

# Run formatter
black .

# Run type checker
mypy src/
```

**Common Checks**:
- Unused imports
- Undefined variables
- Type mismatches
- Code complexity
- Security issues

---

### OpenCode Prompt for Linter Fixes

```
Fix all linter errors in this code:

Linter output:
```
[paste linter errors]
```

Source code:
```[language]
[paste code]
```

Requirements:
1. Fix all errors and warnings
2. Maintain functionality
3. Explain each fix
4. Don't introduce new issues
5. Follow project conventions from .opencode

Provide the fixed code and explanation of changes.
```

---

## 5.3 Type Safety Validation

### Why Types Matter

Type systems catch errors before runtime:
- Prevents passing wrong data types
- Catches typos in property names
- Ensures function signatures match
- Documents expected data structures

---

### TypeScript Validation

```typescript
// ❌ BAD: No types
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ GOOD: With types
interface Item {
  id: string;
  price: number;
  quantity: number;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

**TypeScript checks**:
```bash
# Run type checker
npx tsc --noEmit

# Should show 0 errors
```

---

### Python Type Hints

```python
# ❌ BAD: No type hints
def calculate_total(items):
    return sum(item.price for item in items)

# ✅ GOOD: With type hints
from typing import List
from dataclasses import dataclass

@dataclass
class Item:
    id: str
    price: float
    quantity: int

def calculate_total(items: List[Item]) -> float:
    return sum(item.price * item.quantity for item in items)
```

**mypy checks**:
```bash
# Run type checker
mypy src/

# Should show no errors
```

---

## 5.4 The Code Review Checklist

### Essential Review Criteria

Use this checklist for every OpenCode-generated file:

#### 1. Correctness ✓
- [ ] Logic is correct for all inputs
- [ ] Edge cases are handled
- [ ] Error conditions are checked
- [ ] Return values are correct types
- [ ] Null/undefined checks present where needed

#### 2. Completeness ✓
- [ ] All required functionality implemented
- [ ] No TODO comments without tickets
- [ ] Error messages are helpful
- [ ] All branches return appropriate values
- [ ] Documentation is complete

#### 3. Security ✓
- [ ] No SQL injection vulnerabilities
- [ ] Input validation present
- [ ] No hardcoded secrets
- [ ] Authentication/authorization checked
- [ ] No eval() or dangerous functions
- [ ] File uploads validated
- [ ] Rate limiting considered

#### 4. Performance ✓
- [ ] No N+1 queries
- [ ] Efficient algorithms used
- [ ] Database queries optimized
- [ ] Caching used where appropriate
- [ ] No blocking operations on main thread
- [ ] Memory leaks prevented

#### 5. Maintainability ✓
- [ ] Code is readable
- [ ] Functions are small (< 50 lines)
- [ ] Names are descriptive
- [ ] Comments explain "why", not "what"
- [ ] Complexity is reasonable
- [ ] DRY principle followed

#### 6. Testability ✓
- [ ] Dependencies are injectable
- [ ] Side effects are isolated
- [ ] Functions are pure where possible
- [ ] Test seams exist
- [ ] Mockable interfaces

#### 7. Style ✓
- [ ] Follows project conventions
- [ ] Consistent formatting
- [ ] Linter passes
- [ ] Type checker passes
- [ ] No warnings

---

### OpenCode Review Prompt

```
Review this code against professional quality standards:

Code:
```[language]
[paste code]
```

Review for:
1. **Correctness**: Logic errors, edge cases
2. **Security**: Vulnerabilities, unsafe operations
3. **Performance**: Inefficient algorithms, N+1 queries
4. **Maintainability**: Complexity, readability
5. **Best Practices**: Project conventions from .opencode

For each issue:
- **Severity**: Critical / High / Medium / Low
- **Line(s)**: Specific location
- **Issue**: What's wrong
- **Impact**: Why it matters
- **Fix**: How to correct it

Provide fixes for Critical and High severity issues.
```

---

## 5.5 Security Validation

### Common Security Issues

#### 1. SQL Injection

```typescript
// ❌ DANGEROUS: SQL injection vulnerability
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ SAFE: Parameterized query
const query = `SELECT * FROM users WHERE email = $1`;
const result = await db.query(query, [email]);

// ✅ SAFER: Using ORM
const user = await prisma.user.findUnique({
  where: { email }
});
```

---

#### 2. XSS (Cross-Site Scripting)

```typescript
// ❌ DANGEROUS: Unescaped user input
<div>{userInput}</div>  // If userInput = "<script>alert('XSS')</script>"

// ✅ SAFE: Escaped by framework
<div>{escapeHtml(userInput)}</div>

// ✅ SAFER: Using React (auto-escapes)
<div>{userInput}</div>  // React escapes by default
```

---

#### 3. Authentication Bypass

```typescript
// ❌ DANGEROUS: Client-side only check
if (localStorage.getItem('isAdmin')) {
  showAdminPanel();
}

// ✅ SAFE: Server-side validation
router.get('/admin', requireAuth, requireAdmin, (req, res) => {
  // Only reachable if user is authenticated AND admin
});
```

---

#### 4. Secrets in Code

```typescript
// ❌ DANGEROUS: Hardcoded secrets
const API_KEY = "sk_live_abc123...";

// ✅ SAFE: Environment variables
const API_KEY = process.env.API_KEY;

// ✅ SAFER: Validate presence
if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable required');
}
```

---

### Security Review Prompt

```
Review this code for security vulnerabilities:

```[language]
[paste code]
```

Check for:
1. **Injection vulnerabilities** (SQL, NoSQL, command injection)
2. **XSS vulnerabilities** (unescaped user input)
3. **Authentication issues** (bypass, weak checks)
4. **Authorization issues** (missing access control)
5. **Secrets exposure** (hardcoded keys, tokens)
6. **Input validation** (missing or weak validation)
7. **File upload issues** (unrestricted uploads, path traversal)
8. **Rate limiting** (missing protection against abuse)

For each vulnerability:
- **Type**: Vulnerability category
- **Severity**: Critical / High / Medium / Low
- **Location**: Line numbers
- **Exploit**: How it could be exploited
- **Fix**: Secure implementation

Prioritize Critical and High severity issues.
```

---

## 5.6 Performance Validation

### Common Performance Issues

#### 1. N+1 Query Problem

```typescript
// ❌ BAD: N+1 queries (1 + N queries)
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findAll({ where: { userId: user.id } });
}

// ✅ GOOD: Single query with join
const users = await User.findAll({
  include: [{ model: Post }]
});
```

---

#### 2. Unnecessary Loops

```typescript
// ❌ BAD: O(n²) complexity
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) duplicates.push(arr[i]);
    }
  }
  return duplicates;
}

// ✅ GOOD: O(n) complexity with Set
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of arr) {
    if (seen.has(item)) duplicates.add(item);
    seen.add(item);
  }
  return Array.from(duplicates);
}
```

---

#### 3. Blocking Operations

```typescript
// ❌ BAD: Synchronous blocking
const data = fs.readFileSync('large-file.json');

// ✅ GOOD: Asynchronous non-blocking
const data = await fs.promises.readFile('large-file.json');
```

---

### Performance Review Prompt

```
Review this code for performance issues:

```[language]
[paste code]
```

Check for:
1. **N+1 queries** (database calls in loops)
2. **Inefficient algorithms** (O(n²) or worse when better exists)
3. **Blocking operations** (synchronous I/O)
4. **Memory leaks** (unclosed connections, event listeners)
5. **Missing caching** (repeated expensive operations)
6. **Large data transfers** (fetching more than needed)
7. **Unindexed queries** (slow database operations)

For each issue:
- **Type**: Performance issue category
- **Impact**: Estimated performance impact
- **Location**: Line numbers
- **Current complexity**: Big O notation
- **Improved approach**: More efficient solution
- **Code**: Implementation of fix
```

---

## 5.7 Iterative Refinement Process

### The Refinement Loop

```
1. Generate initial code (OpenCode)
2. Run linters → Fix errors
3. Run type checker → Fix type issues
4. Manual review → Identify issues
5. Security scan → Fix vulnerabilities
6. Performance check → Optimize
7. Test → Verify correctness
8. Refine → Improve based on feedback
9. Repeat until quality standards met
```

---

### Refinement Prompt Template

```
Improve this code based on review feedback:

Original code:
```[language]
[paste code]
```

Review feedback:
1. [Issue 1 with severity and location]
2. [Issue 2 with severity and location]
3. [Issue 3 with severity and location]

Requirements:
- Fix all Critical and High severity issues
- Maintain existing functionality
- Follow .opencode project conventions
- Add comments for complex fixes
- Ensure tests still pass

Provide:
1. Improved code
2. Explanation of changes
3. Remaining issues (if any) with justification
```

---

## 5.8 Practical Exercises

### Exercise 5.1: Code Quality Review

**Objective**: Review AI-generated code using the full checklist

**Time**: 60 minutes

**Steps**:

1. **Generate code** with OpenCode:
   ```
   Create a user registration API endpoint with:
   - Email/password authentication
   - Input validation
   - Password hashing
   - Email verification
   - Error handling
   ```

2. **Run static analysis**:
   ```bash
   npm run lint
   npm run type-check
   ```

3. **Manual review**:
   - Use the 7-dimension checklist
   - Document all issues found

4. **Fix issues**:
   - Use OpenCode to fix identified problems
   - Verify fixes work

5. **Re-review**:
   - Ensure all issues resolved

**Deliverable**:
- Review report (issues found)
- Fixed code
- Verification that quality standards met

**Success Criteria**:
- ✅ All linter checks pass
- ✅ All type checks pass
- ✅ 0 Critical/High security issues
- ✅ Code follows project conventions
- ✅ All edge cases handled

---

### Exercise 5.2: Security Audit

**Objective**: Find and fix security vulnerabilities

**Time**: 45 minutes

**Scenario**: You're given code with security issues. Find and fix them.

**Sample Vulnerable Code**:
```typescript
// User authentication endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Query user
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const user = await db.query(query);
  
  // Check password
  if (user && user.password === password) {
    res.json({ 
      success: true,
      token: user.id,
      isAdmin: user.role === 'admin'
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

**Steps**:

1. **Identify vulnerabilities** (at least 5)
2. **Use security review prompt** with OpenCode
3. **Implement fixes**
4. **Verify** security improvements
5. **Document** changes made

**Deliverable**:
- List of vulnerabilities found
- Secure version of code
- Explanation of fixes

**Success Criteria**:
- ✅ All SQL injection risks removed
- ✅ Passwords properly hashed
- ✅ Secure token generation
- ✅ No sensitive data in responses
- ✅ Input validation added

---

### Exercise 5.3: Performance Optimization

**Objective**: Identify and fix performance bottlenecks

**Time**: 45 minutes

**Scenario**: Code works but is slow. Optimize it.

**Sample Slow Code**:
```typescript
// Get all users with their posts
async function getUsersWithPosts() {
  const users = await User.findAll();
  
  for (const user of users) {
    const posts = await Post.findAll({ 
      where: { authorId: user.id } 
    });
    user.posts = posts;
    
    for (const post of posts) {
      const comments = await Comment.findAll({ 
        where: { postId: post.id } 
      });
      post.comments = comments;
    }
  }
  
  return users;
}
```

**Steps**:

1. **Analyze complexity** (Big O)
2. **Identify N+1 queries**
3. **Use performance prompt** with OpenCode
4. **Implement optimizations**
5. **Measure improvement**

**Deliverable**:
- Performance analysis
- Optimized code
- Benchmark comparison

**Success Criteria**:
- ✅ Reduced from O(n²) to O(n) or better
- ✅ Eliminated N+1 queries
- ✅ Functionality preserved
- ✅ Measurable speed improvement

---

## Knowledge Check Quiz

1. **What are the 7 dimensions of code quality?**
   - a) Speed, Size, Safety, Style, Structure, Security, Simplicity
   - b) Correctness, Completeness, Security, Performance, Maintainability, Testability, Style
   - c) Fast, Good, Cheap, Secure, Tested, Documented, Working
   - d) Bugs, Tests, Docs, Speed, Safety, Format, Types

2. **What tool checks TypeScript for type errors?**
   - a) ESLint
   - b) Prettier
   - c) tsc (TypeScript compiler)
   - d) Jest

3. **Which is an example of SQL injection?**
   - a) `SELECT * FROM users WHERE id = $1` with params
   - b) `SELECT * FROM users WHERE id = ${userId}`
   - c) Using Prisma ORM
   - d) Prepared statements

4. **What causes N+1 query problems?**
   - a) Running queries in loops
   - b) Using too many indexes
   - c) Not using async/await
   - d) Having too many tables

5. **What should you do after OpenCode generates code?**
   - a) Commit immediately
   - b) Validate with linters, review, test
   - c) Deploy to production
   - d) Delete and start over

**Answer Key**: [1-b, 2-c, 3-b, 4-a, 5-b]

---

## Module 5 Summary

You now know how to:

### Key Concepts
- ✅ The 7 dimensions of code quality
- ✅ Validation workflow for AI-generated code
- ✅ Common security vulnerabilities
- ✅ Performance optimization techniques

### Skills Developed
- ✅ Use linters and type checkers
- ✅ Apply comprehensive code review checklist
- ✅ Identify security vulnerabilities
- ✅ Optimize performance bottlenecks
- ✅ Refine code iteratively

### Practical Applications
- ✅ Can validate any OpenCode output
- ✅ Can ensure professional quality standards
- ✅ Can catch security issues before they ship
- ✅ Can optimize for performance
- ✅ Ready for code review process

---

## Next Steps

**Next Module**: Core Module 6 - Agentic Design Patterns

You'll learn how to:
- Use advanced OpenCode patterns
- Chain multiple AI operations
- Build self-improving workflows
- Create AI-assisted development pipelines

---

## Additional Resources

### Static Analysis Tools
- [ESLint](https://eslint.org/) - JavaScript/TypeScript linter
- [Ruff](https://github.com/astral-sh/ruff) - Fast Python linter
- [mypy](https://mypy.readthedocs.io/) - Python type checker

### Security Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Top security risks
- [Snyk](https://snyk.io/) - Vulnerability scanning
- [npm audit](https://docs.npmjs.com/cli/v9/commands/npm-audit) - Dependency vulnerabilities

### Performance Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Web performance
- [node --inspect](https://nodejs.org/en/docs/guides/debugging-getting-started/) - Node.js profiling

---

**Module Status**: ✅ Core Module 5 Complete

**Next Module**: [Module 6: Agentic Design Patterns](./CORE-MODULE-06-DRAFT.md)
