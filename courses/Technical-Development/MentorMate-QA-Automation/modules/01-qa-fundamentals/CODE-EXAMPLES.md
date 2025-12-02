# Module 1: Code Examples
## Introduction to QA & Testing Fundamentals

---

## Overview

This document contains all code examples referenced in Module 1. While Module 1 is primarily conceptual and setup-focused, these examples demonstrate basic concepts you'll use throughout the course.

---

## Example 1: Basic Git Commands

### Initial Repository Setup
```bash
# Create a new directory
mkdir my-qa-project
cd my-qa-project

# Initialize Git repository
git init

# Check status
git status

# Configure user information
git config --global user.name "Your Name"
git config --global user.email "your.email@mentormate.com"

# View configuration
git config --list
```

### Basic Git Workflow
```bash
# Create a file
echo "# My QA Project" > README.md

# Check what changed
git status

# Stage file for commit
git add README.md

# Commit the changes
git commit -m "Initial commit: Add README"

# View commit history
git log

# View concise log
git log --oneline
```

### Branching
```bash
# Create and switch to new branch
git checkout -b feature/add-tests

# Or with newer syntax
git switch -c feature/add-tests

# List branches
git branch

# Make changes and commit
echo "console.log('test');" > test.js
git add test.js
git commit -m "Add first test file"

# Switch back to main
git checkout main

# Merge feature branch
git merge feature/add-tests

# Delete branch after merge
git branch -d feature/add-tests
```

### Working with Remote Repositories
```bash
# Add remote repository
git remote add origin git@github.com:username/repo.git

# View remotes
git remote -v

# Push to remote
git push -u origin main

# Pull latest changes
git pull origin main

# Clone existing repository
git clone git@github.com:username/repo.git
```

---

## Example 2: Package.json Configuration

### Basic package.json
```json
{
  "name": "mentormate-qa-automation",
  "version": "1.0.0",
  "description": "QA Automation project for MentorMate course",
  "main": "index.js",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "report": "playwright show-report"
  },
  "keywords": ["qa", "automation", "testing", "playwright"],
  "author": "Your Name <your.email@mentormate.com>",
  "license": "MIT",
  "devDependencies": {
    "@playwright/test": "^1.56.0"
  }
}
```

### NPM Commands
```bash
# Initialize new project
npm init -y

# Install dependency
npm install playwright

# Install dev dependency
npm install --save-dev @playwright/test

# Install specific version
npm install playwright@1.56.0

# Install globally
npm install -g newman

# Uninstall package
npm uninstall playwright

# Update packages
npm update

# Check outdated packages
npm outdated

# Run script from package.json
npm test
npm run test:headed
```

---

## Example 3: .gitignore File

### Comprehensive .gitignore
```gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Playwright
test-results/
playwright-report/
playwright/.cache/

# Test artifacts
screenshots/
videos/
downloads/
trace.zip
test-results.json

# Environment variables
.env
.env.local
.env.development
.env.test
.env.production

# Operating System files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# IDE - VS Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.vscode/settings.json

# IDE - JetBrains
.idea/
*.iml
*.iws
*.ipr

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Build outputs
dist/
build/
out/
.next/
.nuxt/

# Coverage
coverage/
*.lcov
.nyc_output/

# Temporary files
tmp/
temp/
*.tmp
*.swp
*.swo
*~

# Documentation
docs/.vuepress/dist/
docs/.vitepress/cache/

# Misc
.cache/
.parcel-cache/
.eslintcache
```

---

## Example 4: VS Code Settings

### .vscode/settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.eol": "\n",
  
  "playwright.reuseBrowser": true,
  "playwright.showTrace": true,
  
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": false
  },
  
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/test-results": true,
    "**/playwright-report": true
  },
  
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true,
    "**/test-results": true
  }
}
```

### .vscode/extensions.json
```json
{
  "recommendations": [
    "ms-playwright.playwright",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "ritwickdey.liveserver",
    "rangav.vscode-thunder-client",
    "christian-kohler.path-intellisense",
    "pkief.material-icon-theme"
  ]
}
```

---

## Example 5: Basic Playwright Test Structure

### Simple Test Example
```javascript
// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('basic test example', async ({ page }) => {
  // Navigate to a page
  await page.goto('https://playwright.dev');
  
  // Verify page title
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Test with Comments (AAA Pattern)
```javascript
const { test, expect } = require('@playwright/test');

test('user can search for documentation', async ({ page }) => {
  // ARRANGE - Set up test data and navigate
  const searchTerm = 'locators';
  await page.goto('https://playwright.dev');
  
  // ACT - Perform the action
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search docs').fill(searchTerm);
  
  // ASSERT - Verify the outcome
  await expect(page.getByText('Locators')).toBeVisible();
});
```

### Multiple Tests in One File
```javascript
const { test, expect } = require('@playwright/test');

test.describe('Playwright.dev website', () => {
  
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('navigation menu is visible', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });
  
  test('get started link works', async ({ page }) => {
    await page.goto('https://playwright.dev');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
  });
  
});
```

---

## Example 6: Playwright Configuration

### playwright.config.js (Basic)
```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 5000
  },
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Number of workers
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter
  reporter: 'html',
  
  // Shared settings for all projects
  use: {
    // Base URL
    baseURL: 'http://localhost:3000',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Trace on failure
    trace: 'on-first-retry',
  },
  
  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

---

## Example 7: README Template

### Comprehensive README.md
```markdown
# MentorMate QA Automation Project

## 📋 Overview
This project contains automated tests for [application name] developed as part of the MentorMate QA Automation Course.

## 🎯 Purpose
- Automated UI testing with Playwright
- API testing with Postman/Playwright
- CI/CD integration with GitHub Actions
- Learning and demonstrating QA automation skills

## 🛠️ Tech Stack
- **Language:** JavaScript/Node.js
- **UI Automation:** Playwright
- **API Testing:** Postman, Playwright API
- **CI/CD:** GitHub Actions
- **Version Control:** Git/GitHub
- **IDE:** VS Code

## 📦 Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git

## 🚀 Installation

### 1. Clone the repository
```bash
git clone git@github.com:username/project-name.git
cd project-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Run specific test file
```bash
npx playwright test tests/login.spec.js
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
```

### Debug tests
```bash
npm run test:debug
```

## 📊 View Test Reports

### HTML Report
```bash
npx playwright show-report
```

### Generate custom report
```bash
npx playwright test --reporter=html
```

## 📁 Project Structure
```
project-name/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
│       └── playwright.yml
├── tests/
│   ├── ui/                # UI tests
│   ├── api/               # API tests
│   └── e2e/               # End-to-end tests
├── pages/                 # Page Object Model
├── utils/                 # Helper functions
├── test-data/            # Test data files
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## 📝 Test Writing Guidelines

### Naming Convention
- Test files: `*.spec.js`
- Page objects: `*.page.js`
- Utilities: `*.utils.js`

### Test Structure (AAA Pattern)
```javascript
test('descriptive test name', async ({ page }) => {
  // Arrange - Setup
  
  // Act - Perform action
  
  // Assert - Verify result
});
```

## 🔄 CI/CD
Tests automatically run on:
- Every push to main branch
- Every pull request
- Scheduled runs (daily at midnight)

## 🐛 Debugging
- Use `--debug` flag for step-by-step debugging
- Use `--headed` to see browser
- Check test-results/ for failure screenshots
- Check traces in Playwright Trace Viewer

## 📚 Documentation
- [Playwright Docs](https://playwright.dev)
- [Project Wiki](link-to-wiki)
- [Test Strategy](link-to-test-strategy)

## 👥 Team
- **QA Engineer:** [Your Name]
- **Mentor:** [Mentor Name]
- **Team:** MentorMate QA

## 📄 License
MIT

## 🤝 Contributing
1. Create feature branch
2. Write tests
3. Ensure tests pass
4. Create pull request
5. Get review approval
6. Merge to main

## 📞 Support
- Slack: #qa-automation
- Email: qa-team@mentormate.com
- Issues: GitHub Issues

## 🎯 Course Progress
- [x] Module 1: QA Fundamentals
- [ ] Module 2: JavaScript
- [ ] Module 3: Web Fundamentals
- [ ] Module 4: Playwright Basics
- [ ] Module 5: Advanced Playwright
- [ ] Module 6: Page Object Model
- [ ] Module 7: API Testing
- [ ] Module 8: API Automation
- [ ] Module 9: Git & GitHub
- [ ] Module 10: CI/CD
- [ ] Module 11: Advanced Strategies
- [ ] Module 12: AI-Assisted Testing
```

---

## Example 8: Environment Verification Script

### verify-setup.js
```javascript
// verify-setup.js - Complete setup verification
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 MentorMate QA Environment Verification');
console.log('==========================================\n');

let totalChecks = 0;
let passedChecks = 0;

function runCheck(name, command, validator = null) {
  totalChecks++;
  try {
    const result = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    const isValid = validator ? validator(result) : true;
    
    if (isValid) {
      console.log(`✅ ${name}: ${result.trim().split('\n')[0]}`);
      passedChecks++;
      return true;
    } else {
      console.log(`❌ ${name}: Invalid version or output`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: NOT INSTALLED or ERROR`);
    return false;
  }
}

function checkFile(name, filePath) {
  totalChecks++;
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${name} exists`);
    passedChecks++;
    return true;
  } else {
    console.log(`❌ ${name} missing`);
    return false;
  }
}

// Check command-line tools
console.log('📦 Checking installed tools...');
runCheck('Node.js', 'node --version', (v) => parseFloat(v.replace('v', '')) >= 18);
runCheck('npm', 'npm --version');
runCheck('Git', 'git --version');
runCheck('Playwright', 'npx playwright --version');

// Check project files
console.log('\n📁 Checking project structure...');
const projectFiles = [
  ['package.json', 'package.json'],
  ['playwright.config.js', 'playwright.config.js'],
  ['README.md', 'README.md'],
  ['.gitignore', '.gitignore'],
  ['tests directory', 'tests'],
];

projectFiles.forEach(([name, filePath]) => {
  checkFile(name, filePath);
});

// Check Git configuration
console.log('\n⚙️  Checking Git configuration...');
totalChecks++;
try {
  const userName = execSync('git config user.name', { encoding: 'utf-8' }).trim();
  const userEmail = execSync('git config user.email', { encoding: 'utf-8' }).trim();
  
  if (userName && userEmail) {
    console.log(`✅ Git configured: ${userName} <${userEmail}>`);
    passedChecks++;
  } else {
    console.log('❌ Git not fully configured');
  }
} catch (error) {
  console.log('❌ Git configuration error');
}

// Check GitHub remote
console.log('\n🌐 Checking GitHub connection...');
totalChecks++;
try {
  const remote = execSync('git remote -v', { encoding: 'utf-8' });
  if (remote.includes('origin')) {
    console.log('✅ GitHub remote configured');
    passedChecks++;
  } else {
    console.log('⚠️  No GitHub remote found');
  }
} catch (error) {
  console.log('⚠️  Not a Git repository or no remotes configured');
}

// Check VS Code extensions (if VS Code is installed)
console.log('\n🔌 Checking VS Code (if installed)...');
totalChecks++;
try {
  const extensions = execSync('code --list-extensions', { encoding: 'utf-8' });
  if (extensions.includes('ms-playwright.playwright')) {
    console.log('✅ VS Code with Playwright extension');
    passedChecks++;
  } else {
    console.log('⚠️  Playwright extension not found in VS Code');
  }
} catch (error) {
  console.log('ℹ️  VS Code not accessible via command line (might still be installed)');
  // Don't fail this check
  passedChecks++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`📊 Results: ${passedChecks}/${totalChecks} checks passed`);
console.log('='.repeat(50));

const percentage = (passedChecks / totalChecks) * 100;

if (percentage === 100) {
  console.log('\n✨ PERFECT! Your environment is fully configured!');
  console.log('🎯 You\'re ready to start building test automation!');
  console.log('👉 Next: Complete Module 1 exercises and quiz\n');
} else if (percentage >= 80) {
  console.log('\n✅ GOOD! Most items are configured.');
  console.log('⚠️  Review items marked with ❌ above');
  console.log('💡 You can proceed, but fix issues for best experience\n');
} else {
  console.log('\n⚠️  ATTENTION NEEDED: Several items need configuration.');
  console.log('📖 Review the lab instructions and fix issues marked with ❌');
  console.log('🆘 Ask for help if you\'re stuck\n');
}

// Exit with appropriate code
process.exit(percentage >= 80 ? 0 : 1);
```

### Run the script
```bash
node verify-setup.js
```

---

## Example 9: Helpful Utility Functions

### utils/test-helpers.js
```javascript
/**
 * Test helper utilities for MentorMate QA Course
 */

/**
 * Generate random string
 * @param {number} length - Length of string
 * @returns {string}
 */
function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generate random email
 * @param {string} domain - Email domain
 * @returns {string}
 */
function generateRandomEmail(domain = 'mentormate.com') {
  const timestamp = Date.now();
  const random = generateRandomString(5);
  return `test.${random}.${timestamp}@${domain}`;
}

/**
 * Wait for specified time
 * @param {number} ms - Milliseconds to wait
 */
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get formatted timestamp
 * @returns {string}
 */
function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Log test info
 * @param {string} message - Message to log
 */
function logTest(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${message}`);
}

/**
 * Generate test data for user
 * @returns {object}
 */
function generateUserData() {
  const firstName = ['John', 'Jane', 'Bob', 'Alice', 'Charlie'][Math.floor(Math.random() * 5)];
  const lastName = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'][Math.floor(Math.random() * 5)];
  
  return {
    firstName,
    lastName,
    email: generateRandomEmail(),
    password: `Test${generateRandomString(8)}!`,
    username: `${firstName.toLowerCase()}${Date.now()}`,
    phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
  };
}

// Export functions
module.exports = {
  generateRandomString,
  generateRandomEmail,
  wait,
  getTimestamp,
  logTest,
  generateUserData,
};

// Example usage
if (require.main === module) {
  console.log('Test Helpers Demo:');
  console.log('Random String:', generateRandomString(15));
  console.log('Random Email:', generateRandomEmail());
  console.log('Timestamp:', getTimestamp());
  console.log('User Data:', generateUserData());
}
```

---

## Example 10: GitHub Actions Workflow (Preview)

### .github/workflows/playwright.yml
```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run tests daily at midnight
    - cron: '0 0 * * *'

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 20
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npx playwright test
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload test screenshots
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: test-results
        path: test-results/
        retention-days: 7
```

---

## Summary

These code examples provide:
- ✅ Git workflow patterns
- ✅ Project configuration templates
- ✅ Basic Playwright test structure
- ✅ Utility functions
- ✅ Verification scripts
- ✅ GitHub Actions preview

**Remember:** You don't need to memorize all this! Refer back to these examples as needed throughout the course.

---

**Next: Module 1 - Quiz**

