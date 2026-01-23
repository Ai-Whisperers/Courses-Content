# Module 1: Code Examples
## AI for Developers Overview

---

## Overview

This document provides reference code examples for Module 1, including VS Code configurations, initial AI prompts, and verification scripts.

---

## Example 1: VS Code Settings for AI Development

### settings.json

```json
{
  // ============================================
  // GitHub Copilot Configuration
  // ============================================
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "markdown": true,
    "json": true,
    "plaintext": false
  },
  "github.copilot.editor.enableAutoCompletions": true,

  // ============================================
  // Editor Settings for AI Assistance
  // ============================================
  "editor.tabCompletion": "on",
  "editor.acceptSuggestionOnEnter": "on",
  "editor.suggestSelection": "first",
  "editor.snippetSuggestions": "top",
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },

  // ============================================
  // Code Formatting
  // ============================================
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  },

  // ============================================
  // File Settings
  // ============================================
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // ============================================
  // Terminal Settings
  // ============================================
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.defaultProfile.linux": "bash",

  // ============================================
  // Git Settings
  // ============================================
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true
}
```

---

## Example 2: Copilot-Friendly Comments

### Good Comment Patterns

```javascript
// ============================================
// Pattern 1: Function with clear requirements
// ============================================

// Function to validate a credit card number using Luhn algorithm
// Input: string of digits
// Output: boolean indicating if the number is valid
// Example: validateCreditCard("4532015112830366") returns true
function validateCreditCard(number) {
  // Copilot will generate the Luhn algorithm implementation
}

// ============================================
// Pattern 2: Class with detailed structure
// ============================================

// Class representing a shopping cart
// Properties: items (array), userId (string), createdAt (Date)
// Methods:
//   - addItem(product, quantity): adds item to cart
//   - removeItem(productId): removes item from cart
//   - getTotal(): returns total price
//   - clear(): empties the cart
class ShoppingCart {
  // Copilot will generate the complete class
}

// ============================================
// Pattern 3: Algorithm with examples
// ============================================

// Function to find the longest common subsequence of two strings
// Uses dynamic programming approach
// Example: lcs("ABCD", "AEBD") returns "ABD"
// Time complexity: O(m*n)
function longestCommonSubsequence(str1, str2) {
  // Copilot will generate the DP solution
}

// ============================================
// Pattern 4: API endpoint specification
// ============================================

// Express.js POST endpoint for user registration
// Request body: { email: string, password: string, name: string }
// Response: { success: boolean, userId: string, message: string }
// Validates email format, password strength (min 8 chars, 1 number)
// Returns 400 for validation errors, 201 for success
app.post('/api/register', async (req, res) => {
  // Copilot will generate validation and response logic
});
```

---

## Example 3: First AI-Generated Functions

### Email Validation

```javascript
// Function to validate email address format
// Returns true if valid, false if invalid
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage examples
console.log(validateEmail("user@example.com")); // true
console.log(validateEmail("invalid-email")); // false
console.log(validateEmail("user@domain")); // false
```

### Array Shuffle (Fisher-Yates)

```javascript
// Function to randomly shuffle an array using Fisher-Yates algorithm
// Does not modify original array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Usage example
const original = [1, 2, 3, 4, 5];
const shuffled = shuffleArray(original);
console.log(original); // [1, 2, 3, 4, 5] - unchanged
console.log(shuffled); // [3, 1, 5, 2, 4] - random order
```

### Date Formatting

```javascript
// Function to format date as "Month Day, Year"
// Input: Date object
// Output: Formatted string like "January 15, 2025"
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

// Usage examples
console.log(formatDate(new Date())); // "November 28, 2025"
console.log(formatDate(new Date('2024-01-15'))); // "January 15, 2024"
```

---

## Example 4: Python AI-Generated Functions

### Email Validation (Python)

```python
# Function to validate email address format
# Returns True if valid, False if invalid
import re

def validate_email(email: str) -> bool:
    """
    Validate an email address using regex.

    Args:
        email: The email address to validate

    Returns:
        True if valid, False otherwise
    """
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return bool(re.match(pattern, email))

# Usage examples
print(validate_email("user@example.com"))  # True
print(validate_email("invalid-email"))      # False
```

### Data Analysis Function (Python)

```python
# Function to analyze a list of numbers
# Returns dict with min, max, sum, average, and median
from typing import List, Dict
from statistics import median

def analyze_numbers(numbers: List[float]) -> Dict[str, float]:
    """
    Analyze a list of numbers and return statistics.

    Args:
        numbers: List of numbers to analyze

    Returns:
        Dictionary with min, max, sum, average, and median
    """
    if not numbers:
        raise ValueError("List cannot be empty")

    return {
        "min": min(numbers),
        "max": max(numbers),
        "sum": sum(numbers),
        "average": sum(numbers) / len(numbers),
        "median": median(numbers)
    }

# Usage example
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
stats = analyze_numbers(data)
print(stats)
# {'min': 1, 'max': 10, 'sum': 55, 'average': 5.5, 'median': 5.5}
```

---

## Example 5: VS Code Extensions Configuration

### extensions.json (Workspace Recommendations)

```json
{
  "recommendations": [
    // AI Tools
    "github.copilot",
    "github.copilot-chat",

    // Code Quality
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-python.python",
    "ms-python.black-formatter",

    // Git
    "eamodio.gitlens",
    "mhutchie.git-graph",

    // Productivity
    "usernamehw.errorlens",
    "christian-kohler.path-intellisense",
    "formulahendry.auto-rename-tag",

    // Themes (optional)
    "PKief.material-icon-theme",
    "zhuangtongfa.material-theme"
  ],
  "unwantedRecommendations": []
}
```

---

## Example 6: Verification Script

### verify-setup.js

```javascript
/**
 * Verification script for AI Development Environment
 * Run with: node verify-setup.js
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log("🔍 Verifying AI Development Environment Setup\n");
console.log("=".repeat(50));

const checks = [];

// Check Node.js version
try {
  const nodeVersion = execSync('node --version').toString().trim();
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 18) {
    checks.push({ name: "Node.js", status: "✅", detail: nodeVersion });
  } else {
    checks.push({ name: "Node.js", status: "⚠️", detail: `${nodeVersion} (18+ recommended)` });
  }
} catch {
  checks.push({ name: "Node.js", status: "❌", detail: "Not installed" });
}

// Check npm
try {
  const npmVersion = execSync('npm --version').toString().trim();
  checks.push({ name: "npm", status: "✅", detail: `v${npmVersion}` });
} catch {
  checks.push({ name: "npm", status: "❌", detail: "Not installed" });
}

// Check Git
try {
  const gitVersion = execSync('git --version').toString().trim();
  checks.push({ name: "Git", status: "✅", detail: gitVersion });
} catch {
  checks.push({ name: "Git", status: "❌", detail: "Not installed" });
}

// Check VS Code
try {
  const codeVersion = execSync('code --version').toString().split('\n')[0];
  checks.push({ name: "VS Code", status: "✅", detail: `v${codeVersion}` });
} catch {
  checks.push({ name: "VS Code", status: "⚠️", detail: "CLI not in PATH" });
}

// Check VS Code extensions
try {
  const extensions = execSync('code --list-extensions').toString();

  const requiredExtensions = [
    { id: 'github.copilot', name: 'GitHub Copilot' },
    { id: 'github.copilot-chat', name: 'Copilot Chat' },
    { id: 'esbenp.prettier-vscode', name: 'Prettier' },
  ];

  requiredExtensions.forEach(ext => {
    if (extensions.includes(ext.id)) {
      checks.push({ name: ext.name, status: "✅", detail: "Installed" });
    } else {
      checks.push({ name: ext.name, status: "❌", detail: "Not installed" });
    }
  });
} catch {
  checks.push({ name: "VS Code Extensions", status: "⚠️", detail: "Unable to check" });
}

// Print results
console.log("\n📋 Results:\n");
checks.forEach(check => {
  console.log(`${check.status} ${check.name}: ${check.detail}`);
});

// Summary
const passed = checks.filter(c => c.status === "✅").length;
const warnings = checks.filter(c => c.status === "⚠️").length;
const failed = checks.filter(c => c.status === "❌").length;

console.log("\n" + "=".repeat(50));
console.log(`\n📊 Summary: ${passed} passed, ${warnings} warnings, ${failed} failed`);

if (failed === 0) {
  console.log("\n🎉 Environment setup complete! Ready for AI-assisted development.");
} else {
  console.log("\n⚠️ Please fix the failed checks before proceeding.");
}
```

---

## Example 7: Sample Prompts for Different Tools

### GitHub Copilot Prompts

```javascript
// ============================================
// Prompt 1: Database Query
// ============================================
// Function to find all users who registered in the last 30 days
// Uses PostgreSQL with pg library
// Returns array of user objects with id, email, name, createdAt

// ============================================
// Prompt 2: API Integration
// ============================================
// Function to fetch weather data from OpenWeatherMap API
// Parameters: city name, API key
// Returns: { temperature, humidity, description }
// Handle errors gracefully

// ============================================
// Prompt 3: Data Transformation
// ============================================
// Function to transform flat array of objects into nested tree structure
// Input: [{ id, parentId, name }]
// Output: nested tree with children arrays
// Handle circular references by skipping them
```

### Claude/ChatGPT Prompts

```markdown
# Prompt 1: Code Review

Review this JavaScript function for:
1. Performance issues
2. Security vulnerabilities
3. Best practice violations
4. Edge cases not handled

```javascript
function processUserData(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18) {
      result.push({
        name: users[i].name,
        email: users[i].email.toLowerCase(),
        isActive: users[i].status === 'active'
      });
    }
  }
  return result;
}
```

# Prompt 2: Architecture Design

Design a microservices architecture for an e-commerce platform with:
- User service (authentication, profiles)
- Product service (catalog, inventory)
- Order service (cart, checkout, payments)
- Notification service (email, SMS)

Include:
- Communication patterns (sync/async)
- Database recommendations per service
- API gateway considerations
- Event-driven architecture where appropriate
```

---

## Example 8: Copilot Keyboard Shortcuts Cheat Sheet

```
╔══════════════════════════════════════════════════════════════╗
║          GitHub Copilot Keyboard Shortcuts                   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ACCEPTING SUGGESTIONS                                       ║
║  ─────────────────────                                       ║
║  Tab          Accept entire suggestion                       ║
║  Ctrl+→       Accept next word (Windows/Linux)               ║
║  Cmd+→        Accept next word (macOS)                       ║
║                                                              ║
║  NAVIGATING SUGGESTIONS                                      ║
║  ──────────────────────                                      ║
║  Alt+]        Next suggestion (Windows/Linux)                ║
║  Option+]     Next suggestion (macOS)                        ║
║  Alt+[        Previous suggestion (Windows/Linux)            ║
║  Option+[     Previous suggestion (macOS)                    ║
║                                                              ║
║  DISMISSING                                                  ║
║  ──────────                                                  ║
║  Esc          Dismiss suggestion                             ║
║                                                              ║
║  COPILOT CHAT                                                ║
║  ────────────                                                ║
║  Ctrl+Shift+I   Open Copilot Chat (Windows/Linux)            ║
║  Cmd+Shift+I    Open Copilot Chat (macOS)                    ║
║  Ctrl+I         Inline Chat (Windows/Linux)                  ║
║  Cmd+I          Inline Chat (macOS)                          ║
║                                                              ║
║  CHAT COMMANDS                                               ║
║  ─────────────                                               ║
║  /explain      Explain selected code                         ║
║  /fix          Suggest fix for problems                      ║
║  /tests        Generate unit tests                           ║
║  /doc          Generate documentation                        ║
║  /optimize     Suggest performance improvements              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Example 9: Project Structure for Course

```
ai-assisted-dev-project/
├── src/
│   ├── index.js           # Main entry point
│   ├── utils/
│   │   ├── validation.js  # Validation utilities
│   │   ├── formatting.js  # Data formatting
│   │   └── api.js         # API helpers
│   ├── models/
│   │   └── user.js        # User model
│   └── services/
│       └── auth.js        # Authentication service
├── tests/
│   ├── validation.test.js
│   └── auth.test.js
├── .vscode/
│   ├── settings.json      # Workspace settings
│   └── extensions.json    # Recommended extensions
├── package.json
├── .prettierrc
├── .eslintrc.js
└── README.md
```

---

## Example 10: ROI Calculator Implementation

```javascript
/**
 * AI Development ROI Calculator
 * Calculates potential return on investment for AI coding tools
 */

class ROICalculator {
  constructor(config) {
    this.teamSize = config.teamSize || 10;
    this.avgSalary = config.avgSalary || 100000;
    this.codingHoursPerWeek = config.codingHoursPerWeek || 30;
    this.toolCostPerMonth = config.toolCostPerMonth || 19;
    this.productivityGain = config.productivityGain || 0.40; // 40%
  }

  calculateAnnualCodingHours() {
    return this.teamSize * this.codingHoursPerWeek * 52;
  }

  calculateHourlyRate() {
    const workingHoursPerYear = 2080;
    return this.avgSalary / workingHoursPerYear;
  }

  calculateTimeSaved() {
    return this.calculateAnnualCodingHours() * this.productivityGain;
  }

  calculateValueSaved() {
    return this.calculateTimeSaved() * this.calculateHourlyRate();
  }

  calculateToolCost() {
    return this.teamSize * this.toolCostPerMonth * 12;
  }

  calculateNetROI() {
    return this.calculateValueSaved() - this.calculateToolCost();
  }

  calculateROIPercentage() {
    return (this.calculateNetROI() / this.calculateToolCost()) * 100;
  }

  generateReport() {
    return {
      inputs: {
        teamSize: this.teamSize,
        avgSalary: this.avgSalary,
        codingHoursPerWeek: this.codingHoursPerWeek,
        toolCostPerMonth: this.toolCostPerMonth,
        productivityGain: `${this.productivityGain * 100}%`
      },
      calculations: {
        annualCodingHours: this.calculateAnnualCodingHours(),
        hourlyRate: `$${this.calculateHourlyRate().toFixed(2)}`,
        timeSavedHours: this.calculateTimeSaved(),
        valueSaved: `$${this.calculateValueSaved().toLocaleString()}`,
        toolCost: `$${this.calculateToolCost().toLocaleString()}`,
        netROI: `$${this.calculateNetROI().toLocaleString()}`,
        roiPercentage: `${this.calculateROIPercentage().toFixed(0)}%`
      }
    };
  }
}

// Usage example
const calculator = new ROICalculator({
  teamSize: 10,
  avgSalary: 120000,
  codingHoursPerWeek: 25,
  toolCostPerMonth: 19,
  productivityGain: 0.45
});

console.log(JSON.stringify(calculator.generateReport(), null, 2));

/*
Expected output:
{
  "inputs": {
    "teamSize": 10,
    "avgSalary": 120000,
    "codingHoursPerWeek": 25,
    "toolCostPerMonth": 19,
    "productivityGain": "45%"
  },
  "calculations": {
    "annualCodingHours": 13000,
    "hourlyRate": "$57.69",
    "timeSavedHours": 5850,
    "valueSaved": "$337,500",
    "toolCost": "$2,280",
    "netROI": "$335,220",
    "roiPercentage": "14703%"
  }
}
*/
```

---

*Module 1 Code Examples - AI for Developers Overview*
*AI-Assisted Software Development Course*
