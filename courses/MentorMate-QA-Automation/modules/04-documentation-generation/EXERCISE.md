# Module 04: Exercises
## AI-Powered Documentation Generation

---

## Overview

**Total Time:** 3 hours
**Exercises:** 4 practical exercises
**Deliverables:** Complete documentation suite with review notes

---

## Learning Objectives

Through these exercises, you will:
- Generate architecture documentation with Mermaid diagrams
- Create comprehensive API reference documentation
- Write beginner-friendly setup guides
- Review and improve AI-generated documentation
- Validate documentation accuracy and completeness

---

## Exercise 1: Generate Architecture Documentation

**Duration:** 60 minutes
**Points:** 25

---

### Objective

Create comprehensive architecture documentation for a codebase, including system overview, component details, Mermaid diagrams, and data models.

---

### Setup

Use the provided sample code or your own project with at least:
- 3+ modules/services
- 5+ functions/methods
- Database or data storage
- External dependencies

**Sample Code:** UserService (provided below)

Create `src/services/userService.js`:

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../database');
const { sendEmail } = require('./emailService');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SALT_ROUNDS = 10;

class UserService {
  /**
   * Register a new user
   */
  async register(userData) {
    const { email, password, name } = userData;

    // Check existing
    const existing = await db.users.findOne({ email });
    if (existing) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await db.users.create({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      verified: false
    });

    // Send verification email
    const token = this.generateVerificationToken(user.id);
    await sendEmail(email, 'verify', { token });

    return { id: user.id, email: user.email, name: user.name };
  }

  /**
   * Authenticate user and return JWT
   */
  async login(email, password) {
    const user = await db.users.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    if (!user.verified) {
      throw new Error('Email not verified');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  /**
   * Verify user email
   */
  async verifyEmail(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      await db.users.update(
        { id: decoded.userId },
        { verified: true }
      );
      return true;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    const user = await db.users.findOne({ email });

    if (!user) {
      // Don't reveal if email exists
      return { message: 'If email exists, reset link sent' };
    }

    const token = jwt.sign(
      { userId: user.id, type: 'reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    await sendEmail(email, 'reset', { token });

    return { message: 'If email exists, reset link sent' };
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded.type !== 'reset') {
        throw new Error('Invalid token type');
      }

      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

      await db.users.update(
        { id: decoded.userId },
        { password: hashedPassword }
      );

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  generateVerificationToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
  }
}

module.exports = new UserService();
```

---

### Task

Generate comprehensive architecture documentation.

---

### Prompt to Use

```
Generate an ARCHITECTURE.md document for this codebase.

[Paste the UserService code above]

Additional context:
- This is part of a Node.js REST API
- Uses PostgreSQL database
- Email service is external (SendGrid)
- JWT for authentication

Include:

## 1. System Overview
- Purpose and scope
- High-level description
- Key features

## 2. Architecture Diagram
- Create Mermaid flowchart or graph
- Show Client → API → Services → Database flow
- Include external services (Email)

## 3. Components
List each component:
- User Service
- Email Service
- Database
- Authentication (JWT)

For each:
- Purpose
- Responsibilities
- Technologies used
- Dependencies

## 4. Data Flow
Describe the flow for:
- User Registration
- User Login
- Email Verification
- Password Reset

## 5. Data Models
User entity with:
- Fields and types
- Required vs optional
- Indexes

## 6. Security
- Password hashing (bcrypt)
- JWT token generation
- Token expiration
- Email verification

## 7. External Dependencies
- bcrypt
- jsonwebtoken
- Email service (SendGrid)
- PostgreSQL

Format as professional technical documentation with Mermaid diagrams.
```

---

### Steps

1. **Use AI to generate initial documentation** (15 min)
   - Paste the prompt into Claude or your AI tool
   - Include the UserService code
   - Generate ARCHITECTURE.md

2. **Review the generated documentation** (15 min)
   - Read through completely
   - Check for accuracy
   - Verify Mermaid diagram syntax

3. **Improve the documentation** (20 min)
   - Add missing details
   - Enhance component descriptions
   - Add specific technology versions
   - Improve diagrams if needed

4. **Validate Mermaid diagrams** (10 min)
   - Copy diagrams to https://mermaid.live/
   - Verify they render correctly
   - Fix any syntax errors

---

### Deliverable

**File:** `ARCHITECTURE.md`

**Must Include:**
- System overview (1-2 paragraphs)
- At least 1 Mermaid diagram (architecture or data flow)
- 4+ component descriptions
- Data model for User entity
- Security section
- External dependencies list

---

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Completeness** | 8 | All 7 sections included with substance |
| **Accuracy** | 7 | Information matches code accurately |
| **Mermaid Diagrams** | 5 | Valid syntax, renders correctly, informative |
| **Clarity** | 3 | Clear, professional, understandable |
| **Detail** | 2 | Sufficient detail in each section |
| **Total** | **25** | |

---

### Success Criteria

✅ All 7 sections present and complete
✅ At least 1 working Mermaid diagram
✅ Component descriptions are accurate
✅ Data model includes all User fields
✅ Security measures documented
✅ Professional formatting

---

## Exercise 2: Create API Reference Documentation

**Duration:** 45 minutes
**Points:** 25

---

### Objective

Generate detailed API reference documentation for all public methods in the UserService, including parameters, return values, errors, and examples.

---

### Setup

Use the same UserService code from Exercise 1.

---

### Task

Create comprehensive API reference documentation.

---

### Prompt to Use

```
Generate API reference documentation for the UserService class.

[Paste UserService code]

For each public method, document:

## methodName(parameters)

**Description:** Clear description of what this method does

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| param1 | type | Yes/No | Description |

**Returns:**
- Type: [return type]
- Description: What is returned
- Example: `{ id: '123', email: 'user@example.com' }`

**Throws:**
- Error type: When it occurs
- Example: `Error: 'Email already registered'`

**Example Usage:**
```javascript
const result = await userService.methodName(params);
console.log(result);
```

**Notes:**
- Any special behavior
- Rate limits
- Security considerations

Generate for these methods:
- register(userData)
- login(email, password)
- verifyEmail(token)
- requestPasswordReset(email)
- resetPassword(token, newPassword)

Format as professional API documentation.
```

---

### Steps

1. **Generate initial API documentation** (15 min)
   - Use the prompt with AI
   - Generate documentation for all 5 methods

2. **Add working examples** (15 min)
   - Create realistic example code for each method
   - Show input data
   - Show expected output
   - Include error cases

3. **Review and verify** (10 min)
   - Check parameter types match code
   - Verify return values are accurate
   - Ensure error conditions are complete

4. **Polish documentation** (5 min)
   - Improve descriptions
   - Add notes about security
   - Format consistently

---

### Deliverable

**File:** `API.md` or `API-REFERENCE.md`

**Must Include:**
- Documentation for all 5 public methods
- Parameter tables for each method
- Return value descriptions
- Error/exception documentation
- Working code examples for each method

---

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Completeness** | 8 | All 5 methods documented fully |
| **Accuracy** | 7 | Parameters, returns, errors match code |
| **Examples** | 5 | Working, realistic examples for each method |
| **Clarity** | 3 | Clear descriptions, proper terminology |
| **Format** | 2 | Consistent, professional formatting |
| **Total** | **25** | |

---

### Success Criteria

✅ All 5 methods documented
✅ Parameter tables complete and accurate
✅ Return values clearly described
✅ Error conditions documented
✅ Code examples for each method
✅ Examples show realistic data
✅ Professional formatting

---

### Example Output (for reference)

```markdown
## register(userData)

**Description:** Register a new user account. Creates user record, hashes password, sends verification email.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| userData | Object | Yes | User registration data |
| userData.email | string | Yes | Valid email address |
| userData.password | string | Yes | Password (min 8 characters) |
| userData.name | string | Yes | User's full name |

**Returns:**
- Type: `Promise<Object>`
- Description: Created user object (without password)
- Example:
```javascript
{
  id: '550e8400-e29b-41d4-a716-446655440000',
  email: 'john@example.com',
  name: 'John Doe'
}
```

**Throws:**
- `Error: 'Email already registered'` - When email is already in database
- Validation errors for invalid input

**Example Usage:**
```javascript
const userService = require('./services/userService');

try {
  const newUser = await userService.register({
    email: 'john@example.com',
    password: 'securePass123',
    name: 'John Doe'
  });
  console.log('User registered:', newUser.id);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

**Notes:**
- Password is hashed using bcrypt (10 rounds)
- Verification email is sent automatically
- User account starts as unverified (verified: false)
- JWT verification token expires in 24 hours
```

---

## Exercise 3: Write Setup Guide

**Duration:** 45 minutes
**Points:** 20

---

### Objective

Create a beginner-friendly setup guide that a new developer can follow to get the project running locally.

---

### Task

Generate a comprehensive setup guide.

---

### Prompt to Use

```
Create a comprehensive setup guide for a Node.js project with the UserService.

Project details:
- Node.js application
- PostgreSQL database
- Express.js API
- Dependencies: bcrypt, jsonwebtoken
- Email service (SendGrid)

Generate SETUP.md with:

## Prerequisites
- Required software with specific versions
- Accounts needed (SendGrid)
- Hardware/OS requirements

## Quick Start (Docker - Optional)
- Docker Compose setup if applicable
- Single command to run

## Development Setup
Step-by-step instructions:
1. Clone repository
2. Install dependencies (npm install)
3. Configure environment variables
4. Set up PostgreSQL database
5. Run database migrations
6. Configure email service
7. Start development server
8. Verify it works

For each step, provide exact commands.

## Environment Variables
Create a table:
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|

Include:
- DATABASE_URL
- JWT_SECRET
- SENDGRID_API_KEY
- PORT

## Common Tasks
- Run in development mode
- Run tests
- Run in production mode
- View logs

## Troubleshooting
Common issues:
- Port already in use
- Database connection failed
- Email sending failed
- JWT secret not set

For each, provide solution.

Make it copy-paste friendly. All commands should work as-is.
```

---

### Steps

1. **Generate initial setup guide** (15 min)
   - Use the prompt with AI
   - Generate SETUP.md

2. **Test the setup guide yourself** (20 min)
   - Follow each step
   - Note any missing steps
   - Identify unclear instructions
   - Document issues you encounter

3. **Improve based on testing** (10 min)
   - Add missing steps
   - Clarify confusing parts
   - Add to troubleshooting section
   - Ensure commands are correct

---

### Deliverable

**File:** `SETUP.md`

**Must Include:**
- Prerequisites section with versions
- Step-by-step setup instructions (7+ steps)
- Environment variables table
- Common tasks section
- Troubleshooting section (3+ issues)
- Copy-paste friendly commands

---

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Completeness** | 6 | All required sections present |
| **Usability** | 6 | Can be followed successfully |
| **Commands** | 4 | All commands are correct and copy-paste ready |
| **Troubleshooting** | 2 | Helpful troubleshooting section |
| **Clarity** | 2 | Clear, beginner-friendly instructions |
| **Total** | **20** | |

---

### Success Criteria

✅ All prerequisite software listed with versions
✅ 7+ setup steps with exact commands
✅ Environment variables table complete
✅ Common tasks documented
✅ 3+ troubleshooting scenarios
✅ Commands are copy-paste ready
✅ Successfully tested by you
✅ Beginner can follow it

---

### Bonus Challenge (+5 points)

**Peer Review:**
- Have a classmate follow your setup guide
- Document their experience
- Note any confusion or issues
- Update guide based on feedback

**Deliverable:** `peer-review-notes.md` with feedback and improvements made

---

## Exercise 4: Quality Review and Improvement

**Duration:** 30 minutes
**Points:** 20

---

### Objective

Review all generated documentation for quality issues and improve it to production-ready standard.

---

### Task

Perform comprehensive quality review of all documentation created in Exercises 1-3.

---

### Quality Checklist

Review each document (ARCHITECTURE.md, API.md, SETUP.md) for:

**Accuracy**
- [ ] Information matches actual code
- [ ] No incorrect technical details
- [ ] Version numbers are correct
- [ ] Examples are accurate

**Completeness**
- [ ] All sections are present
- [ ] No placeholder text or TODOs
- [ ] All methods/components documented
- [ ] Nothing important is missing

**Clarity**
- [ ] Descriptions are clear
- [ ] Technical jargon is explained
- [ ] Beginner can understand
- [ ] Logical organization

**Examples**
- [ ] Code examples are present
- [ ] Examples are realistic
- [ ] Examples actually work
- [ ] Examples cover common cases

**Formatting**
- [ ] Markdown is valid
- [ ] Tables format correctly
- [ ] Code blocks have language specified
- [ ] Consistent heading levels

**Diagrams**
- [ ] Mermaid diagrams render
- [ ] Diagrams are accurate
- [ ] Diagrams are readable
- [ ] Proper syntax used

**Links**
- [ ] Internal links work
- [ ] External links work
- [ ] Anchors are correct

**Currency**
- [ ] Reflects current code state
- [ ] No outdated information

---

### Review Prompt (Optional)

```
Review this documentation for quality issues:

[Paste one of your documents]

Check for:
1. Technical accuracy - does it match the code?
2. Missing information - what's not covered?
3. Unclear explanations - what's confusing?
4. Incorrect examples - do they work?
5. Formatting issues - Markdown errors?
6. Mermaid syntax - do diagrams render?
7. Completeness - any placeholder text?
8. Consistency - is terminology consistent?

For each issue found:
- Section/location
- Problem description
- Suggested fix
- Severity (Critical/Important/Minor)

Be thorough and critical.
```

---

### Steps

1. **Review ARCHITECTURE.md** (10 min)
   - Apply quality checklist
   - Note all issues found
   - Categorize by severity

2. **Review API.md** (10 min)
   - Test one code example
   - Verify parameter types
   - Check completeness

3. **Review SETUP.md** (5 min)
   - Check command accuracy
   - Verify troubleshooting section
   - Ensure beginner-friendly

4. **Document improvements** (5 min)
   - Create review notes document
   - List all issues found
   - Document fixes applied

---

### Deliverable

**File:** `review-notes.md`

**Must Include:**
- Issues found in each document
- Severity categorization
- Fixes applied
- Before/after examples for major fixes
- Summary of improvements

---

### Review Notes Template

```markdown
# Documentation Review Notes

## Review Date
[Date]

## Reviewer
[Your name]

## Documents Reviewed
- ARCHITECTURE.md
- API.md
- SETUP.md

---

## ARCHITECTURE.md Review

### Issues Found

#### Critical Issues
1. **[Issue title]**
   - **Location:** [Section name]
   - **Problem:** [Description]
   - **Fix Applied:** [What you did]

#### Important Issues
[Same format]

#### Minor Issues
[Same format]

### Summary
- Total issues found: X
- Critical: X
- Important: X
- Minor: X
- All issues resolved: Yes/No

---

## API.md Review

[Same format as above]

---

## SETUP.md Review

[Same format as above]

---

## Overall Summary

### Quality Before Review
- Accuracy: [1-5 rating]
- Completeness: [1-5 rating]
- Clarity: [1-5 rating]
- Examples: [1-5 rating]

### Quality After Review
- Accuracy: [1-5 rating]
- Completeness: [1-5 rating]
- Clarity: [1-5 rating]
- Examples: [1-5 rating]

### Key Improvements Made
1. [Improvement]
2. [Improvement]
3. [Improvement]

### Production Ready?
Yes/No - [Explanation]
```

---

### Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| **Thoroughness** | 8 | Comprehensive review of all documents |
| **Issue Identification** | 6 | Found real, important issues |
| **Fixes Applied** | 4 | Actually fixed the issues found |
| **Documentation** | 2 | Clear review notes created |
| **Total** | **20** | |

---

### Success Criteria

✅ All 3 documents reviewed
✅ 5+ issues identified across all docs
✅ Issues categorized by severity
✅ Fixes applied to all critical issues
✅ Review notes clearly document process
✅ Before/after examples for major fixes
✅ Overall quality assessment provided

---

## Submission Guidelines

### Files to Submit

1. **ARCHITECTURE.md** - Architecture documentation (Exercise 1)
2. **API.md** - API reference documentation (Exercise 2)
3. **SETUP.md** - Setup and installation guide (Exercise 3)
4. **review-notes.md** - Quality review documentation (Exercise 4)
5. **peer-review-notes.md** - Optional bonus deliverable

### Submission Format

Create a folder named `module04-[yourname]` with all files:

```
module04-yourname/
├── ARCHITECTURE.md
├── API.md
├── SETUP.md
├── review-notes.md
└── peer-review-notes.md (optional)
```

Compress as ZIP and submit via course portal.

---

## Grading Summary

| Exercise | Points | Time |
|----------|--------|------|
| Exercise 1: Architecture Docs | 25 | 60 min |
| Exercise 2: API Reference | 25 | 45 min |
| Exercise 3: Setup Guide | 20 | 45 min |
| Exercise 4: Quality Review | 20 | 30 min |
| **Total** | **90** | **180 min** |
| **Bonus** | +5 | +variable |

**Passing Score:** 63/90 (70%)

---

## Tips for Success

### General Tips
1. **Use specific prompts** - More detail = better output
2. **Test everything** - Run examples, test commands, verify diagrams
3. **Iterate** - First draft won't be perfect
4. **Be critical** - Review with skepticism
5. **Add personal touches** - AI gives you 80%, you add the 20%

### Time Management
- Don't get stuck on perfection in one section
- Move through all exercises, then refine
- Save time for quality review
- Set timers for each exercise

### Common Mistakes to Avoid
❌ Trusting AI output without verification
❌ Skipping the testing step
❌ Not using Mermaid Live Editor for diagrams
❌ Generic descriptions that don't match code
❌ Forgetting to document errors/exceptions
❌ Not making commands copy-paste ready

---

## Additional Resources

### Mermaid Resources
- [Mermaid Live Editor](https://mermaid.live/) - Test diagrams
- [Mermaid Documentation](https://mermaid.js.org/) - Syntax reference
- [Mermaid Cheat Sheet](https://jojozhuang.github.io/tutorial/mermaid-cheat-sheet/)

### Markdown Resources
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Markdown](https://guides.github.com/features/mastering-markdown/)

### Example Documentation
- [Stripe API Docs](https://stripe.com/docs/api) - Excellent API reference
- [Express.js Guide](https://expressjs.com/en/guide/) - Good setup guide
- [NestJS Architecture](https://docs.nestjs.com/first-steps) - Architecture example

---

## Troubleshooting

### Issue: AI generates vague documentation
**Solution:**
- Provide more context in prompt
- Include specific code snippets
- Ask for examples and details
- Use iterative refinement

### Issue: Mermaid diagrams don't render
**Solution:**
- Check syntax in Mermaid Live Editor
- Look for missing semicolons or brackets
- Simplify complex diagrams
- Verify Mermaid code block formatting

### Issue: Examples don't work
**Solution:**
- Actually run the examples
- Check for typos
- Verify imports/dependencies
- Test with real data

### Issue: Running out of time
**Solution:**
- Focus on completeness first, polish later
- Use AI to speed up repetitive sections
- Skip bonus challenges if needed
- Prioritize critical over minor fixes

---

## Self-Assessment

After completing all exercises, ask yourself:

- [ ] Can I generate architecture docs in under 60 minutes?
- [ ] Are my API docs accurate and complete?
- [ ] Would a beginner succeed with my setup guide?
- [ ] Can I identify quality issues in documentation?
- [ ] Do I know how to use Mermaid diagrams?
- [ ] Am I confident reviewing AI-generated docs?

If you answered "No" to any:
- Review that section's materials
- Practice with another project
- Ask for help in office hours

---

**Ready to start? Begin with Exercise 1!** 🚀

---

*Module 04 Exercises*
*Total Time: 3 hours | Total Points: 90 (+ 5 bonus)*
