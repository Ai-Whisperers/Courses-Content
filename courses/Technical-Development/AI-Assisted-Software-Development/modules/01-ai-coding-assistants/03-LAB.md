# Module 1: Hands-On Lab
## AI Development Environment Setup

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 30-45 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | Laptop, internet connection, GitHub account |
| **Outcome** | Fully configured AI development environment |

---

## Objectives

By the end of this lab, you will have:

- VS Code installed with AI extensions
- GitHub Copilot active and generating suggestions
- Copilot Chat configured
- Claude/ChatGPT accounts ready
- Verification that all tools work correctly

---

## Part 1: VS Code Installation (5 minutes)

### Step 1.1: Download VS Code

1. Go to https://code.visualstudio.com
2. Download for your operating system:
   - Windows: `.exe` installer
   - macOS: `.dmg` file
   - Linux: `.deb` or `.rpm`

3. Run the installer with default options

### Step 1.2: Initial Configuration

Launch VS Code and configure basic settings:

1. Open Settings: `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS)
2. Set these preferences:
   - **Auto Save:** `afterDelay`
   - **Font Size:** Your preference (14-16 recommended)
   - **Tab Size:** 2 (for JavaScript) or 4 (for Python)

### Verification
- [ ] VS Code opens without errors
- [ ] Settings panel accessible

---

## Part 2: GitHub Copilot Setup (10 minutes)

### Step 2.1: Verify GitHub Account

1. Go to https://github.com
2. Sign in or create an account
3. Verify your email address

### Step 2.2: Subscribe to GitHub Copilot

1. Go to https://github.com/settings/copilot
2. Click "Enable GitHub Copilot"
3. Choose subscription:
   - **Individual:** $10/month or $100/year
   - **Business:** $19/user/month
   - **Free trial:** 30 days (if available)
4. Complete payment setup

### Step 2.3: Install Copilot Extension

1. Open VS Code
2. Go to Extensions: `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS)
3. Search for "GitHub Copilot"
4. Click **Install** on "GitHub Copilot" (by GitHub)
5. Click **Install** on "GitHub Copilot Chat" (by GitHub)
6. Reload VS Code when prompted

### Step 2.4: Authenticate

1. After installation, you'll see a prompt to sign in
2. Click "Sign in to GitHub"
3. Browser will open - authorize the VS Code extension
4. Return to VS Code

### Step 2.5: Verify Installation

1. Create a new file: `test.js`
2. Type the following comment:

```javascript
// Function to add two numbers
function add(
```

3. Wait 1-2 seconds
4. You should see a gray suggestion appear

**Expected Result:**
```javascript
function add(a, b) {
  return a + b;
}
```

5. Press `Tab` to accept the suggestion

### Verification
- [ ] Copilot extension installed
- [ ] Copilot Chat extension installed
- [ ] GitHub authentication successful
- [ ] Suggestions appear when typing

---

## Part 3: Copilot Chat Setup (5 minutes)

### Step 3.1: Open Copilot Chat

1. Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Shift+I` (macOS)
2. Or click the Copilot Chat icon in the sidebar

### Step 3.2: Test Copilot Chat

Ask Copilot Chat:

```
Explain what GitHub Copilot is and how it works.
```

**Expected:** A clear explanation of Copilot's functionality.

### Step 3.3: Test Code Generation via Chat

Ask Copilot Chat:

```
Write a JavaScript function that reverses a string
```

**Expected:** A function with explanation.

### Step 3.4: Test Code Explanation

1. Select some code in your editor
2. Open Copilot Chat
3. Type `/explain`

**Expected:** Explanation of the selected code.

### Verification
- [ ] Copilot Chat opens
- [ ] Chat responds to questions
- [ ] Code generation works
- [ ] `/explain` command works

---

## Part 4: Claude Setup (5 minutes)

### Step 4.1: Create Claude Account

1. Go to https://claude.ai
2. Click "Try Claude"
3. Sign up with email or Google account
4. Verify your email

### Step 4.2: Explore the Interface

1. Send a test message:

```
Write a Python function to check if a string is a palindrome
```

2. Observe the response quality

### Step 4.3: (Optional) Upgrade to Pro

For best results during the course:
1. Click "Upgrade to Pro"
2. $20/month for:
   - More messages
   - Priority access
   - Claude 3.5 Sonnet

### Verification
- [ ] Claude account created
- [ ] Can send and receive messages
- [ ] Understand interface layout

---

## Part 5: ChatGPT Setup (5 minutes)

### Step 5.1: Create OpenAI Account

1. Go to https://chat.openai.com
2. Sign up or log in
3. Verify your email

### Step 5.2: Test ChatGPT

Send a test message:

```
Write a JavaScript function that validates a phone number format
```

### Step 5.3: (Optional) Upgrade to Plus

For best results:
1. Click "Upgrade to Plus"
2. $20/month for GPT-4 access

### Verification
- [ ] ChatGPT account created
- [ ] Can send and receive messages
- [ ] Understand interface

---

## Part 6: VS Code Configuration (5 minutes)

### Step 6.1: Configure Settings

Open VS Code settings JSON:
1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Preferences: Open User Settings (JSON)"
3. Add these settings:

```json
{
  // Copilot Settings
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "markdown": true,
    "plaintext": false
  },
  "github.copilot.editor.enableAutoCompletions": true,

  // Editor Optimizations
  "editor.tabCompletion": "on",
  "editor.acceptSuggestionOnEnter": "on",
  "editor.suggestSelection": "first",
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },

  // Formatting
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // Files
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

### Step 6.2: Install Additional Extensions

Install these recommended extensions:

1. **Prettier - Code formatter**
   - Search: "Prettier"
   - Install by Prettier

2. **ESLint** (for JavaScript)
   - Search: "ESLint"
   - Install by Microsoft

3. **GitLens**
   - Search: "GitLens"
   - Install by GitKraken

4. **Error Lens**
   - Search: "Error Lens"
   - Install by Alexander

### Verification
- [ ] Settings applied successfully
- [ ] All extensions installed
- [ ] No error messages

---

## Part 7: Complete Verification Test (5 minutes)

### Test 1: Copilot Inline Suggestions

Create file `verification.js`:

```javascript
// Function to calculate the area of a circle given the radius
function calculateCircleArea(
```

**Pass Criteria:** Copilot suggests the complete function.

### Test 2: Copilot Multi-line Generation

Type this comment:

```javascript
// Class representing a user with name, email, and age
// Include constructor, getter methods, and a method to check if user is adult
class User
```

**Pass Criteria:** Copilot suggests complete class definition.

### Test 3: Copilot Chat

Open Copilot Chat and ask:

```
What are the SOLID principles in software development? Give a brief example for each.
```

**Pass Criteria:** Detailed response with examples.

### Test 4: Slash Commands

1. Select the `User` class you generated
2. Open Copilot Chat
3. Type `/explain`

**Pass Criteria:** Explanation of the class appears.

### Test 5: Code Fix

Add this buggy code:

```javascript
function divide(a, b) {
  return a / b;
}
```

Select it and in Copilot Chat type:

```
What's wrong with this function? How would you fix it?
```

**Pass Criteria:** Identifies division by zero risk.

---

## Part 8: Troubleshooting

### Issue: Copilot Not Suggesting

**Solutions:**
1. Check subscription status at github.com/settings/copilot
2. Reload VS Code window (`Ctrl+Shift+P` → "Reload Window")
3. Sign out and sign in again
4. Check file type is supported

### Issue: Copilot Suggestions Slow

**Solutions:**
1. Check internet connection
2. Try a different network
3. Wait a few minutes (server load)

### Issue: Authentication Failed

**Solutions:**
1. Clear VS Code credentials
2. Sign out of GitHub in browser
3. Reinstall Copilot extension
4. Try incognito browser window

### Issue: Chat Not Responding

**Solutions:**
1. Check if Chat extension is installed
2. Reload VS Code
3. Check GitHub status page

---

## Lab Completion Checklist

### Required Completions

- [ ] VS Code installed and configured
- [ ] GitHub Copilot extension installed
- [ ] Copilot subscription active
- [ ] Authentication successful
- [ ] Inline suggestions working
- [ ] Copilot Chat responding
- [ ] Claude account created
- [ ] ChatGPT account created
- [ ] All verification tests passed

### Optional Completions

- [ ] Claude Pro subscription
- [ ] ChatGPT Plus subscription
- [ ] Additional extensions installed
- [ ] Custom keybindings configured

---

## Keyboard Shortcuts Reference

### Copilot Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Accept suggestion | `Tab` | `Tab` |
| Dismiss suggestion | `Esc` | `Esc` |
| Next suggestion | `Alt+]` | `Option+]` |
| Previous suggestion | `Alt+[` | `Option+[` |
| Open Copilot Chat | `Ctrl+Shift+I` | `Cmd+Shift+I` |
| Inline Chat | `Ctrl+I` | `Cmd+I` |

### VS Code Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Settings | `Ctrl+,` | `Cmd+,` |
| Extensions | `Ctrl+Shift+X` | `Cmd+Shift+X` |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` |

---

## What's Next

After completing this lab:

1. **Practice** - Generate 5-10 functions with Copilot
2. **Explore** - Try different prompting styles
3. **Compare** - Use Claude and ChatGPT for same task
4. **Prepare** - Get ready for Module 2: GitHub Copilot Mastery

---

## Support Resources

### During Lab
- Ask instructor for help
- Check troubleshooting section
- Pair with another participant

### After Lab
- Course discussion forum
- Email: support@ai-whisperers.com
- GitHub Copilot docs: docs.github.com/copilot

---

*Module 1 Lab - Environment Setup*
*AI-Assisted Software Development Course*
