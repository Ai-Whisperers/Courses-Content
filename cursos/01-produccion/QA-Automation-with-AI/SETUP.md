# Setup - QA Automation with AI

Get your environment ready for the course.

---

## Prerequisites

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | Any | `git --version` |
| VS Code | Latest | - |

---

## Quick Setup (5 minutes)

### 1. Install Node.js

**Windows:**
```bash
winget install OpenJS.NodeJS.LTS
```

**Mac:**
```bash
brew install node@18
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Playwright

```bash
npm install -g playwright
npx playwright install
```

### 3. Verify Installation

```bash
node --version    # Should show v18.x.x or higher
npx playwright --version
```

---

## AI-Assisted Setup

Copy this prompt into Claude Code to set up automatically:

```
Set up my environment for QA Automation with AI course:

1. Check if Node.js 18+ is installed
2. Install Playwright globally if not present
3. Create a practice folder: qa-automation-practice
4. Initialize a test project with Playwright
5. Create a sample test to verify everything works
6. Run the test and show me the results

If anything fails, tell me how to fix it.
```

---

## Create Practice Project

```bash
# Create project folder
mkdir qa-automation-practice
cd qa-automation-practice

# Initialize project
npm init -y
npm install -D @playwright/test typescript

# Initialize Playwright
npx playwright init

# Run example test
npx playwright test
```

---

## VS Code Extensions (Recommended)

Install these extensions for better experience:

- **Playwright Test for VSCode** - Run tests from editor
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitLens** - Git integration

---

## Troubleshooting

### "playwright: command not found"

```bash
npm install -g playwright
npx playwright install
```

### "Node.js version too old"

Update Node.js to v18+:
```bash
# Windows
winget upgrade OpenJS.NodeJS.LTS

# Mac
brew upgrade node
```

### Tests fail with browser errors

```bash
npx playwright install --with-deps
```

---

## Your First Win (5 minutes)

Before moving on, let's prove everything works with a real test:

### Create Your First Test

1. Create a file called `first-win.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');

test('my first AI-assisted test', async ({ page }) => {
  // Navigate to a real website
  await page.goto('https://example.com');
  
  // Verify the page loaded
  await expect(page).toHaveTitle(/Example Domain/);
  
  // Check for expected content
  const heading = page.locator('h1');
  await expect(heading).toHaveText('Example Domain');
  
  console.log('Your first test passed!');
});
```

2. Run it:

```bash
npx playwright test first-win.spec.js
```

3. **See the green checkmark?** That's your first automated test!

### What Just Happened

You just:
- Automated a browser to open a real website
- Verified the page title and content
- Created a repeatable test that runs in seconds

This is the foundation of everything you'll learn in this course.

**Screenshot it. Share it. You're a QA Automation Engineer now.**

---

## Next Steps

1. **Read** [HOW-TO-LEARN.md](./HOW-TO-LEARN.md) - Learning strategies for this course
2. **Open** `modules/01-introduction/README.md` - Start Module 1
3. **Build** on your first test - Add more assertions!

---

*See also: [Shared Setup Prompts](../../_compartido/04-utilidades-ia/configuracion-inicial/SETUP-PROMPTS.md)*

