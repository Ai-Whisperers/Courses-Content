# Module 4: Hands-On Lab
## Document an Undocumented Project

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 45-60 minutes |
| **Goal** | Fully document an undocumented codebase |
| **Deliverables** | README, inline docs, API docs, contributing guide |

---

## The Project

You've inherited an undocumented utility library. Your task is to add comprehensive documentation using AI assistance.

### The Codebase

```javascript
// utils.js - Undocumented utility library

const crypto = require('crypto');

function hashPassword(password, salt = null) {
  const useSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, useSalt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt: useSalt };
}

function verifyPassword(password, hash, salt) {
  const result = hashPassword(password, salt);
  return result.hash === hash;
}

function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function truncate(str, length, suffix = '...') {
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
}

function retry(fn, maxAttempts = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const attempt = async (attemptNumber) => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        if (attemptNumber < maxAttempts) {
          setTimeout(() => attempt(attemptNumber + 1), delay);
        } else {
          reject(error);
        }
      }
    };
    attempt(1);
  });
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

function parseQueryString(queryString) {
  const params = {};
  const query = queryString.replace(/^\?/, '');
  query.split('&').forEach(param => {
    const [key, value] = param.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return params;
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  slugify,
  truncate,
  debounce,
  deepClone,
  retry,
  formatBytes,
  parseQueryString
};
```

---

## Part 1: Inline Documentation (15 minutes)

### Task
Add JSDoc comments to all 10 functions.

### Requirements
Each function must have:
- Description
- @param for each parameter
- @returns description
- @example with realistic usage
- @throws (if applicable)

### Process
1. Use Copilot Chat `/doc` on each function
2. Review and enhance the output
3. Ensure examples are accurate

### Deliverable
Complete `utils.js` with all functions documented.

---

## Part 2: README.md (15 minutes)

### Task
Create a comprehensive README for this utility library.

### Prompt Template
```
Create a README.md for a Node.js utility library called "dev-utils" containing these functions: [list from utils.js]

Include:
- Professional title with npm badges
- One-line description
- Features list with emojis
- Installation (npm, yarn)
- Quick start example
- API reference table
- Detailed function documentation
- Use cases
- Contributing section
- License (MIT)

Make it visually appealing with good markdown formatting.
```

### Deliverable
README.md file (100+ lines)

---

## Part 3: API Reference (10 minutes)

### Task
Create a detailed API reference document.

### Prompt
```
Create an API-REFERENCE.md for this utility library with:

For each function:
- Signature
- Description
- Parameters table (name, type, default, description)
- Return value
- Example code
- Edge cases/notes

Functions: hashPassword, verifyPassword, generateToken, slugify, truncate, debounce, deepClone, retry, formatBytes, parseQueryString
```

### Deliverable
API-REFERENCE.md with all functions documented

---

## Part 4: Contributing Guide (10 minutes)

### Task
Create a CONTRIBUTING.md file.

### Prompt
```
Create CONTRIBUTING.md for an open-source Node.js utility library.

Include:
- Welcome message
- Code of conduct reference
- How to report bugs
- How to suggest features
- Development setup
- Pull request process
- Coding standards (ESLint, Prettier)
- Testing requirements
- Documentation requirements
- Commit message format (Conventional Commits)
```

### Deliverable
CONTRIBUTING.md (60+ lines)

---

## Part 5: Review and Polish (5 minutes)

### Task
Review all documentation for quality.

### Checklist
- [ ] All code examples are syntactically correct
- [ ] All functions are documented
- [ ] README has working installation commands
- [ ] Links are valid
- [ ] Consistent formatting throughout
- [ ] No placeholder text remaining

---

## Submission

### Required Files
1. `utils.js` - Fully documented source
2. `README.md` - Complete project README
3. `API-REFERENCE.md` - Detailed API docs
4. `CONTRIBUTING.md` - Contribution guide

### Scoring

| Component | Points |
|-----------|--------|
| Inline documentation quality | 25 |
| README completeness | 25 |
| API reference detail | 25 |
| Contributing guide | 15 |
| Overall polish | 10 |
| **Total** | **100** |

---

*Module 4 Lab - Document an Undocumented Project*
