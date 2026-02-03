# Exercise 4: Documentation Generation

## Objective

Use AI to generate comprehensive documentation for a codebase.

## Duration: 2 hours

---

## Setup

Use the provided sample code or your own project with at least:
- 3+ modules/files
- 5+ functions
- 1+ API endpoint

### Sample Code

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

## Part 1: Architecture Documentation (30 min)

### Task

Generate architecture documentation for the codebase.

### Prompt

```
Generate an ARCHITECTURE.md document for this codebase.

[Paste code]

Include:
1. System Overview
   - Purpose and scope
   - High-level architecture diagram (ASCII)

2. Components
   - List each module/service
   - Responsibilities
   - Dependencies

3. Data Flow
   - How data moves through the system
   - Key transformations

4. Security
   - Authentication mechanism
   - Data protection measures

5. External Dependencies
   - Third-party services
   - Required environment variables

Format as professional technical documentation.
```

### Deliverable

- `ARCHITECTURE.md` file

---

## Part 2: API Reference (30 min)

### Task

Generate detailed API documentation.

### Prompt

```
Generate API reference documentation for the UserService.

[Paste code]

For each public method, document:
1. Method signature
2. Description
3. Parameters (name, type, description, required/optional)
4. Return value (type, description)
5. Exceptions thrown
6. Example usage

Format:
## methodName

**Description**: ...

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|

**Returns**: ...

**Throws**: ...

**Example**:
```javascript
// code example
```
```

### Deliverable

- `API.md` file

---

## Part 3: Setup Guide (20 min)

### Task

Generate a setup and installation guide.

### Prompt

```
Generate a SETUP.md guide for developers joining this project.

Include:
1. Prerequisites
   - Required software and versions
   - Accounts needed

2. Installation
   - Step-by-step commands
   - Environment configuration

3. Configuration
   - Environment variables needed
   - Config file setup

4. Verification
   - How to verify setup works
   - Common setup issues and fixes

5. Development Workflow
   - How to run locally
   - How to run tests
   - How to make changes

Make it beginner-friendly with copy-paste commands.
```

### Deliverable

- `SETUP.md` file

---

## Part 4: Review and Improve (40 min)

### Task

Review generated documentation for accuracy and completeness.

### Quality Checklist

For each document:
- [ ] Technically accurate
- [ ] Consistent terminology
- [ ] Clear and concise
- [ ] Proper formatting
- [ ] No placeholder text
- [ ] Examples are correct
- [ ] Covers edge cases

### Improvement Prompt

```
Review this documentation for issues:

[Paste generated doc]

Check for:
1. Technical inaccuracies
2. Missing information
3. Unclear explanations
4. Incorrect examples
5. Inconsistent formatting

Provide specific fixes for each issue found.
```

### Deliverable

- Reviewed and corrected documentation
- List of improvements made

---

## Submission

### Files

- `ARCHITECTURE.md`
- `API.md`
- `SETUP.md`
- `review-notes.md` - Issues found and fixes applied

### Grading

| Criterion | Points |
|-----------|--------|
| Architecture completeness | 25 |
| API reference accuracy | 25 |
| Setup guide usability | 20 |
| Quality review thoroughness | 20 |
| Overall formatting | 10 |

---

## Bonus Challenge

Generate additional documentation:
1. `CONTRIBUTING.md` - Contribution guidelines
2. `CHANGELOG.md` - Version history template
3. `TROUBLESHOOTING.md` - Common issues and solutions

---

*Good luck!*
