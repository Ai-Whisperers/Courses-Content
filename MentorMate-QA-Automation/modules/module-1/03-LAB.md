# Module 1: Hands-On Lab
## Environment Setup & First Repository

---

## Lab Overview

**Duration:** 2-3 hours

**Objectives:**
- Install and configure all required tools
- Set up VS Code with essential extensions
- Create your first GitHub repository
- Initialize a basic automation project
- Verify all installations

**Prerequisites:**
- Computer with admin access (Windows, macOS, or Linux)
- Internet connection
- MentorMate email account

---

## Part 1: Install VS Code (15 minutes)

### Step 1.1: Download VS Code

1. Open your browser
2. Go to: https://code.visualstudio.com/
3. Click the big download button (it auto-detects your OS)
4. Wait for download to complete

### Step 1.2: Install VS Code

**Windows:**
```
1. Run the downloaded .exe file
2. Accept the license agreement
3. Choose installation location (default is fine)
4. ✅ Check "Add to PATH" (IMPORTANT!)
5. ✅ Check "Create desktop icon" (optional)
6. ✅ Check "Add 'Open with Code' to context menu" (recommended)
7. Click Install
8. Launch VS Code
```

**macOS:**
```
1. Open the downloaded .dmg file
2. Drag VS Code to Applications folder
3. Open VS Code from Applications
4. If security warning: System Preferences → Security → Open Anyway
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install software-properties-common apt-transport-https wget
wget -q https://packages.microsoft.com/keys/microsoft.asc -O- | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main"
sudo apt update
sudo apt install code
```

### Step 1.3: Verify Installation

1. Open VS Code
2. You should see the Welcome screen
3. Press `Ctrl+` (Windows/Linux) or `Cmd+` (macOS)
4. Terminal should open at the bottom
5. Type: `code --version`
6. You should see version number

**Expected Output:**
```
1.85.0
xxxxxxxx
x64
```

**✅ Checkpoint:** VS Code is installed and opens correctly

---

## Part 2: Install Node.js & npm (15 minutes)

### Step 2.1: Download Node.js

1. Go to: https://nodejs.org/
2. Download the **LTS version** (Long Term Support)
   - Currently: v20.x.x or v18.x.x
   - **NOT the "Current" version**

### Step 2.2: Install Node.js

**Windows:**
```
1. Run the downloaded .msi installer
2. Click Next through the wizard
3. Accept license agreement
4. Use default installation path
5. ✅ Ensure "npm package manager" is checked
6. ✅ Check "Automatically install necessary tools"
7. Click Install
8. Restart your computer (important!)
```

**macOS:**
```
1. Run the downloaded .pkg installer
2. Follow the installation wizard
3. Click Continue → Install
4. Enter your password when prompted
5. Click Close when finished
```

**Linux:**
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify gcc and make are installed
sudo apt-get install -y build-essential
```

### Step 2.3: Verify Installation

1. Open a **NEW** terminal/command prompt
2. Run: `node --version`
3. Run: `npm --version`

**Expected Output:**
```
> node --version
v20.11.0

> npm --version
10.2.4
```

**Troubleshooting:**
- If "command not found": Restart terminal/computer
- If old version: Uninstall old version first
- On Windows: Close VS Code, reopen after restart

**✅ Checkpoint:** Node.js and npm are installed

---

## Part 3: Install Git (15 minutes)

### Step 3.1: Download Git

Go to: https://git-scm.com/downloads

### Step 3.2: Install Git

**Windows:**
```
1. Run the downloaded .exe file
2. Use default installation path
3. Important settings:
   ✅ Use VS Code as default editor (change from Vim!)
   ✅ Git from the command line and 3rd-party software
   ✅ Use bundled OpenSSH
   ✅ Use OpenSSL library
   ✅ Checkout Windows-style, commit Unix-style (default)
   ✅ Use MinTTY
   ✅ Default (fast-forward or merge)
   ✅ Git Credential Manager
   ✅ Enable file system caching
4. Click Install
```

**macOS:**
```bash
# Option 1: Homebrew (recommended if you have it)
brew install git

# Option 2: Xcode Command Line Tools
xcode-select --install

# Option 3: Download from git-scm.com and run installer
```

**Linux:**
```bash
sudo apt update
sudo apt install git
```

### Step 3.3: Configure Git

Open terminal and run these commands (use your info):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@mentormate.com"
git config --global init.defaultBranch main
```

### Step 3.4: Verify Installation

```bash
git --version
git config --list
```

**Expected Output:**
```
> git --version
git version 2.43.0

> git config --list
user.name=Your Name
user.email=your.email@mentormate.com
init.defaultbranch=main
...
```

**✅ Checkpoint:** Git is installed and configured

---

## Part 4: Create GitHub Account & SSH Setup (20 minutes)

### Step 4.1: Create GitHub Account

1. Go to: https://github.com/
2. Click "Sign up"
3. Use your MentorMate email: `yourname@mentormate.com`
4. Choose a username (professional, e.g., `yourname-mm`)
5. Create a strong password
6. Verify your email
7. Complete the welcome survey

**✅ Checkpoint:** GitHub account created

### Step 4.2: Generate SSH Key

**Why SSH?** More secure than HTTPS, no password needed each time

**All Platforms:**

```bash
# Generate SSH key (press Enter for all prompts)
ssh-keygen -t ed25519 -C "your.email@mentormate.com"

# Press Enter to save in default location
# Press Enter for no passphrase (or add one for extra security)
```

**Output:**
```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/Users/you/.ssh/id_ed25519): [Press Enter]
Enter passphrase (empty for no passphrase): [Press Enter]
Your public key has been saved in /Users/you/.ssh/id_ed25519.pub
```

### Step 4.3: Add SSH Key to GitHub

1. **Copy your public key:**

**Windows:**
```bash
type %USERPROFILE%\.ssh\id_ed25519.pub
```

**macOS/Linux:**
```bash
cat ~/.ssh/id_ed25519.pub
```

2. **Add to GitHub:**
   - Go to GitHub → Click your profile picture → Settings
   - Click "SSH and GPG keys" (left sidebar)
   - Click "New SSH key"
   - Title: `MentorMate Laptop`
   - Key type: `Authentication Key`
   - Paste your public key
   - Click "Add SSH key"

### Step 4.4: Test SSH Connection

```bash
ssh -T git@github.com
```

**Expected Output:**
```
Hi yourusername! You've successfully authenticated, but GitHub does not provide shell access.
```

**✅ Checkpoint:** SSH authentication working

---

## Part 5: Install Playwright (20 minutes)

### Step 5.1: Create Project Directory

```bash
# Navigate to where you want your projects
# On Windows:
cd C:\Users\YourName\Documents
mkdir MentorMate-QA
cd MentorMate-QA

# On macOS/Linux:
cd ~/Documents
mkdir MentorMate-QA
cd MentorMate-QA
```

### Step 5.2: Initialize Node Project

```bash
npm init -y
```

**What this does:** Creates `package.json` (tracks your project dependencies)

### Step 5.3: Install Playwright

```bash
npm init playwright@latest
```

**Interactive prompts:**
```
? Do you want to use TypeScript or JavaScript? › JavaScript
? Where to put your end-to-end tests? › tests
? Add a GitHub Actions workflow? › true
? Install Playwright browsers? › true
```

**This will:**
- Install Playwright
- Create example tests
- Download browser binaries (Chrome, Firefox, Safari)
- Create configuration file
- Set up GitHub Actions workflow

**Expected Output:**
```
✔ Success! Created a Playwright Test project...

npm run test - Run all tests
npm run test:headed - Run tests in headed mode
```

### Step 5.4: Verify Playwright Installation

```bash
npx playwright --version
```

**Expected Output:**
```
Version 1.40.0
```

### Step 5.5: Run Example Test

```bash
npx playwright test
```

**Expected Output:**
```
Running 6 tests using 3 workers

  ✓ [chromium] › example.spec.js:3:1 › has title (523ms)
  ✓ [firefox] › example.spec.js:3:1 › has title (612ms)
  ✓ [webkit] › example.spec.js:3:1 › has title (498ms)
  ✓ [chromium] › example.spec.js:8:1 › get started link (445ms)
  ✓ [firefox] › example.spec.js:8:1 › get started link (534ms)
  ✓ [webkit] › example.spec.js:8:1 › get started link (489ms)

  6 passed (3.2s)
```

**✅ Checkpoint:** Playwright installed and working!

---

## Part 6: Install Postman (15 minutes)

### Step 6.1: Download Postman

1. Go to: https://www.postman.com/downloads/
2. Click "Download" for your OS
3. Wait for download

### Step 6.2: Install Postman

**Windows:**
```
1. Run the downloaded installer
2. Postman will install automatically
3. It will launch when ready
```

**macOS:**
```
1. Open the downloaded .zip
2. Drag Postman to Applications
3. Open from Applications
```

**Linux:**
```bash
# Extract and move
tar -xzf Postman-linux-x64-*.tar.gz
sudo mv Postman /opt/
sudo ln -s /opt/Postman/Postman /usr/local/bin/postman

# Create desktop shortcut
cat > ~/.local/share/applications/postman.desktop <<EOL
[Desktop Entry]
Name=Postman
Exec=/opt/Postman/Postman
Icon=/opt/Postman/app/resources/app/assets/icon.png
Type=Application
Categories=Development;
EOL
```

### Step 6.3: Create Postman Account

1. Launch Postman
2. Click "Create Account" or "Sign up"
3. Use your MentorMate email
4. Verify your email
5. Skip the tour for now (we'll cover it in Module 7)

### Step 6.4: Test Postman

1. In Postman, click "New" → "HTTP Request"
2. Enter URL: `https://jsonplaceholder.typicode.com/posts/1`
3. Click "Send"
4. You should see JSON response

**✅ Checkpoint:** Postman installed and working

---

## Part 7: Configure VS Code Extensions (20 minutes)

### Step 7.1: Install Essential Extensions

1. Open VS Code
2. Click Extensions icon (left sidebar) or press `Ctrl+Shift+X`
3. Search and install each extension:

**Essential Extensions:**

1. **Playwright Test for VSCode**
   - Search: "Playwright Test for VSCode"
   - Publisher: Microsoft
   - Click Install

2. **ESLint**
   - Search: "ESLint"
   - Publisher: Microsoft
   - Click Install

3. **Prettier - Code formatter**
   - Search: "Prettier"
   - Publisher: Prettier
   - Click Install

4. **GitLens**
   - Search: "GitLens"
   - Publisher: GitKraken
   - Click Install

5. **Live Server**
   - Search: "Live Server"
   - Publisher: Ritwick Dey
   - Click Install

6. **Thunder Client** (REST API client)
   - Search: "Thunder Client"
   - Publisher: Thunder Client
   - Click Install

7. **Path Intellisense**
   - Search: "Path Intellisense"
   - Publisher: Christian Kohler
   - Click Install

8. **Material Icon Theme** (optional but nice)
   - Search: "Material Icon Theme"
   - Publisher: Philipp Kief
   - Click Install

### Step 7.2: Configure Prettier

1. In VS Code: `Ctrl+,` (or `Cmd+,` on Mac) to open Settings
2. Search for "default formatter"
3. Select "Prettier - Code formatter"
4. Search for "format on save"
5. ✅ Check "Format On Save"

### Step 7.3: Configure VS Code Settings

Create a `.vscode` folder in your project with settings:

```bash
cd MentorMate-QA
mkdir .vscode
```

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "playwright.reuseBrowser": true,
  "playwright.showTrace": true
}
```

**✅ Checkpoint:** VS Code configured with extensions

---

## Part 8: Create Your First Repository (30 minutes)

### Step 8.1: Initialize Git Repository

```bash
# Make sure you're in your project directory
cd C:\Users\YourName\Documents\MentorMate-QA  # Windows
cd ~/Documents/MentorMate-QA  # Mac/Linux

# Initialize Git
git init
```

### Step 8.2: Create .gitignore

Create a `.gitignore` file:

```bash
# Create .gitignore
code .gitignore
```

Add this content:

```
# Dependencies
node_modules/
package-lock.json

# Playwright
test-results/
playwright-report/
playwright/.cache/

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/

# Logs
logs/
*.log
npm-debug.log*

# Test artifacts
screenshots/
videos/
downloads/
```

### Step 8.3: Create README.md

```bash
code README.md
```

Add this content:

```markdown
# MentorMate QA Automation Course - My Learning Journey

## About
This repository contains my work for the MentorMate QA Automation Course.

## Author
[Your Name] - [Your Email]

## Course Progress
- [x] Module 1: QA Fundamentals & Environment Setup
- [ ] Module 2: JavaScript Fundamentals
- [ ] Module 3: Web Fundamentals
- [ ] Module 4: Getting Started with Playwright
- [ ] Module 5: Advanced Playwright
- [ ] Module 6: Page Object Model
- [ ] Module 7: API Testing with Postman
- [ ] Module 8: API Automation with Playwright
- [ ] Module 9: Git & GitHub Mastery
- [ ] Module 10: CI/CD with GitHub Actions
- [ ] Module 11: Advanced Testing Strategies
- [ ] Module 12: AI-Assisted Testing

## Tools Used
- VS Code
- Node.js & npm
- Playwright
- Postman
- Git & GitHub
- GitHub Actions
- ChatGPT

## Running Tests
```bash
# Run all tests
npm test

# Run in headed mode
npm run test:headed

# Run specific test
npx playwright test example.spec.js
```

## Project Structure
```
MentorMate-QA/
├── tests/              # Test files
├── pages/              # Page objects (added later)
├── utils/              # Helper functions
├── .github/            # GitHub Actions workflows
├── node_modules/       # Dependencies (not committed)
├── package.json        # Project config
├── playwright.config.js # Playwright config
└── README.md          # This file
```

## Notes
[Add your learning notes here]

## Resources
- [Playwright Docs](https://playwright.dev)
- [Course Materials](https://github.com/mentormate/qa-course)
```

### Step 8.4: Create Project Structure

```bash
# Create directories
mkdir utils
mkdir pages

# Create a simple utility file
code utils/helpers.js
```

Add to `utils/helpers.js`:

```javascript
/**
 * Helper functions for test automation
 */

/**
 * Wait for specified milliseconds
 * @param {number} ms - milliseconds to wait
 */
export async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random email
 * @returns {string} random email address
 */
export function generateRandomEmail() {
  const timestamp = Date.now();
  return `test.user${timestamp}@mentormate.com`;
}

/**
 * Get current timestamp
 * @returns {string} formatted timestamp
 */
export function getTimestamp() {
  return new Date().toISOString();
}

console.log('Helper functions loaded successfully!');
```

### Step 8.5: Initial Commit

```bash
# Check status
git status

# Add all files
git add .

# Create first commit
git commit -m "Initial setup: Playwright, project structure, and configuration"

# Verify
git log
```

### Step 8.6: Create GitHub Repository

1. Go to: https://github.com
2. Click the "+" icon (top right) → "New repository"
3. Fill in:
   - **Repository name:** `mentormate-qa-course`
   - **Description:** "My journey through the MentorMate QA Automation Course"
   - **Public** (recommended for course)
   - **Do NOT initialize** with README (we have one)
4. Click "Create repository"

### Step 8.7: Push to GitHub

Copy the commands from GitHub (or use these):

```bash
# Add remote
git remote add origin git@github.com:yourusername/mentormate-qa-course.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 8.8: Verify on GitHub

1. Refresh your GitHub repository page
2. You should see all your files
3. README.md should be rendered nicely

**✅ Checkpoint:** Code is on GitHub!

---

## Part 9: Test Your Complete Setup (15 minutes)

### Step 9.1: Environment Verification Script

Create `verify-setup.js`:

```javascript
// verify-setup.js - Check all tools are installed

const { execSync } = require('child_process');

console.log('🔍 Verifying MentorMate QA Environment Setup...\n');

const checks = [
  { name: 'Node.js', command: 'node --version' },
  { name: 'npm', command: 'npm --version' },
  { name: 'Git', command: 'git --version' },
  { name: 'Playwright', command: 'npx playwright --version' },
];

let allPassed = true;

checks.forEach(check => {
  try {
    const result = execSync(check.command, { encoding: 'utf-8' });
    console.log(`✅ ${check.name}: ${result.trim()}`);
  } catch (error) {
    console.log(`❌ ${check.name}: NOT INSTALLED`);
    allPassed = false;
  }
});

console.log('\n📁 Checking project structure...');

const fs = require('fs');
const requiredFiles = [
  'package.json',
  'playwright.config.js',
  'README.md',
  '.gitignore',
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allPassed = false;
  }
});

console.log('\n🌐 Checking GitHub connection...');
try {
  execSync('git remote -v', { encoding: 'utf-8' });
  console.log('✅ GitHub remote configured');
} catch (error) {
  console.log('❌ GitHub remote not configured');
  allPassed = false;
}

if (allPassed) {
  console.log('\n✨ SUCCESS! Your environment is fully configured!');
  console.log('👉 You\'re ready to start Module 2!\n');
} else {
  console.log('\n⚠️  Some items need attention. Review the checklist above.\n');
}
```

Run it:

```bash
node verify-setup.js
```

**Expected Output:**
```
🔍 Verifying MentorMate QA Environment Setup...

✅ Node.js: v20.11.0
✅ npm: 10.2.4
✅ Git: git version 2.43.0
✅ Playwright: Version 1.40.0

📁 Checking project structure...
✅ package.json exists
✅ playwright.config.js exists
✅ README.md exists
✅ .gitignore exists

🌐 Checking GitHub connection...
✅ GitHub remote configured

✨ SUCCESS! Your environment is fully configured!
👉 You're ready to start Module 2!
```

### Step 9.2: Run Playwright Tests Again

```bash
npx playwright test --headed
```

You should see browsers opening and tests running!

### Step 9.3: View Test Report

```bash
npx playwright show-report
```

A browser should open showing the test report.

**✅ Checkpoint:** Everything works!

---

## Part 10: Document Your Setup (15 minutes)

### Step 10.1: Create Setup Log

Create `module-1/my-setup-log.md`:

```bash
mkdir module-1
code module-1/my-setup-log.md
```

Fill in:

```markdown
# My Environment Setup Log

## Date Completed
[Today's date]

## System Information
- **OS:** [Windows 10/11, macOS, Ubuntu, etc.]
- **RAM:** [8GB, 16GB, etc.]
- **Processor:** [Intel i5, M1 Mac, etc.]

## Installed Versions
- **Node.js:** [version]
- **npm:** [version]
- **Git:** [version]
- **VS Code:** [version]
- **Playwright:** [version]
- **Postman:** [version]

## VS Code Extensions Installed
- [x] Playwright Test for VSCode
- [x] ESLint
- [x] Prettier
- [x] GitLens
- [x] Live Server
- [x] Thunder Client
- [x] Path Intellisense
- [x] Material Icon Theme

## GitHub Repository
- **URL:** [your repo URL]
- **First commit:** [yes/no]
- **Pushed to GitHub:** [yes/no]

## Tests Run Successfully
- [x] Example Playwright tests passed
- [x] All 6 tests (3 browsers × 2 tests)
- [x] Verification script passed

## Challenges Faced
[Document any issues you encountered]

## How I Solved Them
[What you did to fix issues]

## Time Taken
[How long did this lab take?]

## Screenshots
[Optional: Add screenshots of successful test runs]

## Notes
[Any additional notes or learnings]

## Next Steps
- [ ] Complete Module 1 exercises
- [ ] Take Module 1 quiz
- [ ] Start Module 2
```

### Step 10.2: Take Screenshots

Take screenshots of:
1. Successful Playwright test run
2. VS Code with your project open
3. GitHub repository page
4. Test report

Save them in `module-1/screenshots/`

### Step 10.3: Commit Everything

```bash
# Add new files
git add .

# Commit
git commit -m "Complete Module 1 lab: environment setup and verification"

# Push to GitHub
git push origin main
```

**✅ Checkpoint:** Lab documented and committed!

---

## Lab Deliverables Checklist

Before marking this lab complete, ensure you have:

### Installation & Configuration
- [ ] VS Code installed and working
- [ ] Node.js and npm installed (LTS version)
- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] SSH key generated and added to GitHub
- [ ] Playwright installed and tests pass
- [ ] Postman installed and working
- [ ] All VS Code extensions installed

### Project Setup
- [ ] Project directory created
- [ ] Git repository initialized
- [ ] `.gitignore` file created
- [ ] README.md created and complete
- [ ] Project structure created (tests, pages, utils)
- [ ] Helper functions file created
- [ ] Verification script runs successfully

### GitHub
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Repository is accessible
- [ ] All files visible on GitHub
- [ ] README renders correctly

### Documentation
- [ ] Setup log completed
- [ ] Screenshots taken
- [ ] Challenges documented
- [ ] All committed and pushed

### Verification
- [ ] `node --version` works
- [ ] `npm --version` works
- [ ] `git --version` works
- [ ] `npx playwright --version` works
- [ ] `npx playwright test` passes all tests
- [ ] `node verify-setup.js` shows all green
- [ ] Can open project in VS Code
- [ ] Terminal works in VS Code

---

## Troubleshooting Guide

### Issue: "command not found"

**Solution:**
```bash
# Close and reopen terminal
# Or restart computer
# Or add to PATH manually
```

### Issue: Playwright tests fail

**Solution:**
```bash
# Reinstall browsers
npx playwright install

# Install system dependencies (Linux)
npx playwright install-deps
```

### Issue: Git push fails

**Solution:**
```bash
# Check SSH key
ssh -T git@github.com

# Or use HTTPS instead
git remote set-url origin https://github.com/username/repo.git
```

### Issue: Port already in use

**Solution:**
```bash
# Kill the process using the port (Example: 3000)
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### Issue: Permission denied

**Solution:**
```bash
# Windows: Run as Administrator
# Mac/Linux: Use sudo for installations
sudo npm install -g [package]
```

### Need More Help?

1. Check the error message carefully
2. Google the exact error
3. Ask ChatGPT: "I'm getting this error: [paste error]"
4. Check course discussion board
5. Ask your mentor
6. Check tool documentation

---

## Success Criteria

**You've successfully completed this lab when:**

✅ All tools are installed and verified
✅ You can run Playwright tests successfully
✅ Your code is on GitHub
✅ Verification script passes
✅ You understand what each tool does
✅ You've documented your setup

**Time investment:** 2-3 hours

**Return on investment:** Unlimited! This setup will serve you throughout your career.

---

## What's Next?

**After completing this lab:**

1. ✅ Mark Module 1 Lab as complete
2. 📝 Work through Module 1 Exercises
3. 📊 Take Module 1 Quiz
4. 🎯 Get feedback from mentor
5. 🚀 Start Module 2: JavaScript Fundamentals

**Congratulations on completing your first lab!** 🎉

---

## Additional Resources

### Video Tutorials (External)
- VS Code setup walkthrough
- Git and GitHub for beginners
- Playwright quick start

### Documentation Links
- [VS Code Docs](https://code.visualstudio.com/docs)
- [Node.js Docs](https://nodejs.org/docs)
- [Git Docs](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com)
- [Playwright Docs](https://playwright.dev)

### MentorMate Resources
- Internal Slack channels
- QA community meetings
- Mentor office hours
- Course discussion board

---

**Well done! Your automation journey has officially begun!** 🚀

*Next: Module 1 - Code Examples*

