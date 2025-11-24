# Module 3: Accessing Private Repositories - Presentation Slides

**Duration**: 3 hours (including exercises)
**Total Slides**: 38

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Slide 1 of 38: Title Slide

# Module 3: Accessing Private Repositories

**Working with Proprietary Code Using AI**

Instructor: [Your Name]
Duration: 3 hours

---

## Slide 2 of 38: Learning Objectives

By the end of this module, you will be able to:

- Install and authenticate GitHub CLI
- Access private repositories securely
- Use AI to analyze unfamiliar codebases
- Generate documentation from private repos
- Follow security best practices

---

## Slide 3 of 38: Module Agenda

1. **GitHub CLI Overview** (15 min)
2. **Installation & Setup** (15 min)
3. **Authentication** (30 min)
4. **Working with Private Repos** (30 min)
5. **AI-Assisted Exploration** (45 min)
6. **Security Best Practices** (20 min)
7. **Troubleshooting** (15 min)

---

## Slide 4 of 38: Section 1 - GitHub CLI Overview

# Part 1: Understanding GitHub CLI

**What it is and why you need it**

---

## Slide 5 of 38: What is GitHub CLI?

**GitHub CLI (`gh`)** is GitHub's official command-line interface

**Key Features:**
- Access repositories from terminal
- Authenticate securely
- Create pull requests
- Manage issues
- View CI/CD status
- Access GitHub API

**Why for AI/QA?**
- Claude Code can access private repos
- Automate workflows
- Integrate with testing pipelines

---

## Slide 6 of 38: Why GitHub CLI for AI Tools?

**Without GitHub CLI:**
```
You → Manual clone with SSH/HTTPS
    → Manual PR creation
    → Limited automation
    → Manual repository exploration
```

**With GitHub CLI:**
```
You → gh auth login (once)
    → gh repo clone (automatic authentication)
    → Claude can access private repos
    → AI-powered exploration
    → Automated PR creation
```

**Result:** Seamless AI integration with private code

---

## Slide 7 of 38: GitHub CLI Capabilities

What you can do with `gh`:

```bash
gh repo list              # List repositories
gh repo clone org/repo    # Clone with auto-auth
gh repo view org/repo     # View repo details
gh pr create              # Create pull requests
gh pr list                # List PRs
gh issue list             # List issues
gh api /repos/org/repo    # Access GitHub API
gh auth status            # Check authentication
```

---

## Slide 8 of 38: Section 2 - Installation & Setup

# Part 2: Installing GitHub CLI

**Getting started on your platform**

---

## Slide 9 of 38: Installation - Windows

**Method 1: WinGet (Recommended)**
```powershell
winget install --id GitHub.cli
```

**Method 2: Chocolatey**
```powershell
choco install gh
```

**Method 3: Manual Download**
- Visit: https://cli.github.com
- Download Windows installer (.msi)
- Run installer

**Verify Installation:**
```powershell
gh --version
# Expected: gh version 2.x.x
```

---

## Slide 10 of 38: Installation - macOS

**Method 1: Homebrew (Recommended)**
```bash
brew install gh
```

**Method 2: MacPorts**
```bash
sudo port install gh
```

**Method 3: Manual Download**
- Visit: https://cli.github.com
- Download macOS installer
- Install via GUI

**Verify Installation:**
```bash
gh --version
# Expected: gh version 2.x.x
```

---

## Slide 11 of 38: Installation - Linux

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install gh
```

**Fedora/RHEL:**
```bash
sudo dnf install gh
```

**Arch Linux:**
```bash
sudo pacman -S github-cli
```

**Manual (any distro):**
```bash
# See: https://github.com/cli/cli/blob/trunk/docs/install_linux.md
```

**Verify Installation:**
```bash
gh --version
```

---

## Slide 12 of 38: Verification Checklist

After installation, verify:

```bash
# 1. Check version
gh --version

# 2. Check help
gh --help

# 3. Check available commands
gh repo --help
gh pr --help
gh auth --help
```

**Expected:** All commands work without errors

---

## Slide 13 of 38: Section 3 - Authentication

# Part 3: Authenticating with GitHub

**Secure access to your repositories**

---

## Slide 14 of 38: Authentication Overview

**Why Authentication?**
- Access private repositories
- Create PRs and issues
- Perform actions on your behalf
- Comply with organization policies

**Authentication Methods:**
1. **HTTPS** (Recommended for most users)
2. **SSH** (If you already use SSH keys)

**Today's Focus:** HTTPS authentication

---

## Slide 15 of 38: The Authentication Process

```
Step 1: Run gh auth login
    ↓
Step 2: Choose GitHub.com or Enterprise
    ↓
Step 3: Select protocol (HTTPS/SSH)
    ↓
Step 4: Choose authentication method
    ↓
Step 5: Complete browser authentication
    ↓
Step 6: Grant organization access (if needed)
    ↓
Step 7: Verify with gh auth status
```

---

## Slide 16 of 38: Starting Authentication

**Command:**
```bash
gh auth login
```

**Interactive Prompts:**

**1. Where do you use GitHub?**
- `GitHub.com` (most common)
- `GitHub Enterprise Server`

**2. What is your preferred protocol for Git operations?**
- `HTTPS` ← Choose this
- `SSH`

**3. How would you like to authenticate?**
- `Login with a web browser` ← Easiest
- `Paste an authentication token`

---

## Slide 17 of 38: Browser Authentication Flow

**After choosing "Login with a web browser":**

1. **One-time code displayed**
   ```
   ! First copy your one-time code: ABCD-1234
   Press Enter to open github.com in your browser...
   ```

2. **Copy the code**
   - Select and copy: `ABCD-1234`

3. **Press Enter**
   - Browser opens to: https://github.com/login/device

4. **Paste code and authorize**
   - Paste your code
   - Click "Authorize GitHub CLI"

5. **Success message**
   - "Congratulations, you're all set!"

---

## Slide 18 of 38: Verifying Authentication

**Command:**
```bash
gh auth status
```

**Expected Output:**
```
github.com
  ✓ Logged in to github.com as YourUsername (oauth_token)
  ✓ Git operations for github.com configured to use https protocol
  ✓ Token: gho_************************************
  ✓ Token scopes: admin:public_key, gist, read:org, repo, workflow
```

**Check:**
- ✓ Logged in status
- ✓ Your username appears
- ✓ Token is active

---

## Slide 19 of 38: Organization Access

**Common Issue:** Can't see organization repositories

**Why?**
- Personal tokens need explicit org access
- Organizations can restrict token access
- Privacy/security requirement

**Solution:**
1. Go to: https://github.com/settings/tokens
2. Find your GitHub CLI token
3. Click "Configure SSO" or "Grant access" next to your organization
4. Authorize access

**Or refresh token:**
```bash
gh auth refresh -s read:org
```

---

## Slide 20 of 38: Testing Organization Access

**List your personal repos:**
```bash
gh repo list --limit 5
```

**List organization repos:**
```bash
gh repo list YOUR-ORG-NAME --limit 5
```

**Expected:** Repository list appears

**If "not found" error:**
- Organization access not granted
- You're not a member of the org
- Repository name misspelled

---

## Slide 21 of 38: Section 4 - Working with Private Repositories

# Part 4: Accessing Private Code

**Cloning and exploring private repositories**

---

## Slide 22 of 38: Listing Repositories

**List your repositories:**
```bash
gh repo list --limit 20
```

**List organization repositories:**
```bash
gh repo list YOUR-ORG --limit 50
```

**With additional info:**
```bash
gh repo list YOUR-ORG --json name,description,isPrivate,primaryLanguage
```

**Filter by language:**
```bash
gh repo list YOUR-ORG --language JavaScript
```

**Sort options:**
```bash
gh repo list YOUR-ORG --limit 10 --sort updated
```

---

## Slide 23 of 38: Viewing Repository Details

**View README in terminal:**
```bash
gh repo view YOUR-ORG/repo-name
```

**Open in browser:**
```bash
gh repo view YOUR-ORG/repo-name --web
```

**Get JSON metadata:**
```bash
gh repo view YOUR-ORG/repo-name --json name,description,languages,defaultBranch
```

**Use for exploration:**
- Check tech stack before cloning
- Read description
- See primary language
- Verify it's the right repo

---

## Slide 24 of 38: Cloning Repositories

**Basic clone:**
```bash
gh repo clone YOUR-ORG/repo-name
```

**Clone to specific directory:**
```bash
gh repo clone YOUR-ORG/repo-name ./my-projects/repo-name
```

**Clone with specific depth:**
```bash
gh repo clone YOUR-ORG/repo-name -- --depth=1
```

**Benefits of `gh repo clone`:**
- Automatic authentication
- No need for SSH keys
- Works with private repos
- Uses your authenticated session

---

## Slide 25 of 38: Repository Exploration Commands

**After cloning, explore:**

```bash
# Navigate into repo
cd repo-name

# List directory structure
ls -la          # Linux/Mac
dir             # Windows

# View README
cat README.md

# Find test files
find . -name "*.test.*" -o -name "*.spec.*"

# Count files by type
find . -name "*.js" | wc -l

# View commit history
git log --oneline --graph --all -10
```

---

## Slide 26 of 38: Section 5 - AI-Assisted Exploration

# Part 5: Using AI to Understand Code

**Rapid codebase comprehension**

---

## Slide 27 of 38: Why AI for Codebase Exploration?

**Traditional Approach:**
- Read README (if exists)
- Browse files manually
- Google unfamiliar patterns
- Ask team members
- **Time: Hours to Days**

**AI-Assisted Approach:**
- Start Claude in repo directory
- Ask strategic questions
- Get architecture overview
- Identify key patterns
- **Time: 15-30 Minutes**

**Result:** 10-20x faster understanding

---

## Slide 28 of 38: Starting AI Exploration

**Step 1: Navigate to repository**
```bash
cd repo-name
```

**Step 2: Start Claude Code**
```bash
claude
```

**Step 3: Start with high-level question**
```
Analyze this codebase and provide:

1. Project purpose (1-2 sentences)
2. Tech stack (languages, frameworks, databases)
3. Main entry points
4. Architecture pattern (MVC, microservices, etc.)
5. Key directories and their purposes
```

---

## Slide 29 of 38: High-Level Overview Prompt

**Effective First Prompt:**

```
I'm new to this codebase. Please analyze it and explain:

1. **Project Purpose**
   - What does this application do?
   - Who are the target users?

2. **Architecture Overview**
   - Is it monolith or microservices?
   - What are the main components?
   - Create a simple diagram if possible

3. **Tech Stack**
   - Languages and versions
   - Frameworks and libraries
   - Database and storage
   - External services

4. **Entry Points**
   - Main application file
   - API entry points
   - Configuration files

Keep it high-level. I'll ask follow-up questions for details.
```

---

## Slide 30 of 38: Directory Structure Analysis

**Follow-up Prompt:**

```
Analyze the directory structure and explain:

1. What each top-level directory contains
2. The purpose of key subdirectories
3. Where different types of code live:
   - Business logic
   - API routes/controllers
   - Data models
   - Utilities/helpers
   - Tests
   - Configuration
   - Documentation

4. Any unusual or interesting organization patterns
```

**Why This Matters:**
- Helps navigate codebase
- Identifies where to add tests
- Reveals project conventions

---

## Slide 31 of 38: Dependency Analysis Prompt

```
Analyze the project dependencies and tell me:

1. **Direct Dependencies**
   - List main dependencies with their purposes
   - Identify any deprecated packages
   - Note security-sensitive dependencies

2. **Testing Framework**
   - What testing libraries are used?
   - Current test runner configuration
   - Assertion library

3. **Development Tools**
   - Linting (ESLint, Pylint, etc.)
   - Formatting (Prettier, Black, etc.)
   - Build tools
   - CI/CD tools

4. **Version Status**
   - Are major dependencies up to date?
   - Any outdated critical packages?
   - Compatibility concerns?
```

---

## Slide 32 of 38: Code Patterns Identification

```
Identify the coding patterns and conventions used:

1. **Architecture Patterns**
   - MVC, Clean Architecture, Layered, etc.
   - Dependency injection approach
   - Error handling strategy
   - Logging patterns

2. **Testing Patterns**
   - Test file organization
   - Mocking/stubbing approach
   - Test data management
   - Current coverage strategy

3. **Naming Conventions**
   - File naming (camelCase, kebab-case, etc.)
   - Function/method naming
   - Class/interface naming
   - Variable naming

4. **Code Style**
   - Indentation (spaces/tabs)
   - Line length
   - Comment style
   - Import organization
```

---

## Slide 33 of 38: Testing Gap Analysis

**Critical for QA Engineers:**

```
I need to improve test coverage for this project. Analyze and tell me:

1. **Current Testing**
   - What's already tested?
   - Test coverage percentage (if available)
   - Test types (unit, integration, e2e)

2. **Testing Gaps**
   - Critical paths without tests
   - Edge cases not covered
   - Error handling not tested
   - Integration points missing tests

3. **Testing Priorities**
   - P0: Must test immediately (critical paths)
   - P1: Should test soon (important features)
   - P2: Nice to have (minor features)

4. **Recommended Approach**
   - Where to start?
   - What framework to use?
   - Estimated effort
```

---

## Slide 34 of 38: Finding Specific Features

**When looking for specific functionality:**

```
I need to find code related to [user authentication].

1. Which files contain this functionality?
2. What are the key functions/methods?
3. What are the dependencies?
4. Are there existing tests?
5. What would be the best approach to test this?
```

**Replace [user authentication] with:**
- Payment processing
- Email notifications
- Data validation
- API endpoints
- Database queries
- etc.

---

## Slide 35 of 38: Data Flow Analysis

**Understanding how data moves:**

```
Trace the data flow for [user registration]:

1. Where does the data enter the system?
   (API endpoint, form submission, etc.)

2. What validations are performed?

3. What transformations occur?

4. Where is it stored?
   (Database, cache, file system)

5. What happens after storage?
   (Notifications, webhooks, etc.)

6. Create a sequence diagram showing the flow
```

**Useful for:**
- Understanding system behavior
- Identifying test points
- Finding integration boundaries

---

## Slide 36 of 38: Section 6 - Security Best Practices

# Part 6: Staying Secure

**Protecting credentials and private code**

---

## Slide 37 of 38: Security Best Practices

**DO:**
- ✅ Use HTTPS authentication (more secure than SSH for tokens)
- ✅ Store tokens in system credential store (automatic)
- ✅ Review token permissions regularly
- ✅ Revoke unused tokens immediately
- ✅ Use fine-grained permissions when possible
- ✅ Keep GitHub CLI updated
- ✅ Follow organization security policies
- ✅ Use AI tools only on approved projects

**DON'T:**
- ❌ Share authentication tokens with anyone
- ❌ Commit tokens to repositories
- ❌ Store tokens in plain text files
- ❌ Use tokens with excessive permissions
- ❌ Share private code externally
- ❌ Copy sensitive code to public channels
- ❌ Use AI on highly classified code without approval

---

## Slide 38 of 38: Security Checklist

**Before using AI with private code:**

- [ ] Verify AI tool is approved by your organization
- [ ] Check if code contains sensitive information:
  - [ ] Credentials or API keys
  - [ ] Personal data (PII)
  - [ ] Proprietary algorithms
  - [ ] Customer data
- [ ] Understand data handling:
  - [ ] Where does data go?
  - [ ] How long is it stored?
  - [ ] Who has access?
- [ ] Follow compliance requirements:
  - [ ] HIPAA (healthcare)
  - [ ] PCI DSS (payment data)
  - [ ] SOC2 (security standards)
  - [ ] GDPR (EU data)
- [ ] Document AI usage for audits

**When in doubt, ask your security team!**

---

## Slide 39 of 38: Token Management

**View your tokens:**
```bash
gh auth status -t
```

**Refresh token with new scopes:**
```bash
gh auth refresh -s read:org,repo
```

**Logout (revoke token):**
```bash
gh auth logout
```

**Where tokens are stored:**
- **macOS:** Keychain
- **Windows:** Credential Manager
- **Linux:** `~/.config/gh/hosts.yml` (use `pass` or `gnome-keyring`)

**Best Practice:** Revoke tokens when changing jobs or roles

---

## Slide 40 of 38: Section 7 - Troubleshooting

# Part 7: Common Issues

**Fixing authentication and access problems**

---

## Slide 41 of 38: Issue 1 - "Permission Denied"

**Error:**
```
HTTP 403: Forbidden
Permission denied
```

**Causes:**
- Token expired
- Token lacks required permissions
- Not authenticated

**Solutions:**
```bash
# Re-authenticate
gh auth logout
gh auth login

# Check token scopes
gh auth status -t

# Refresh with more permissions
gh auth refresh -s repo,read:org
```

---

## Slide 42 of 38: Issue 2 - "Organization Not Accessible"

**Error:**
```
Could not resolve to a Repository with the name 'org-name/repo'
```

**Causes:**
- Organization access not granted
- Not a member of organization
- Typo in org/repo name

**Solutions:**
```bash
# Grant org access via web
# Visit: https://github.com/settings/tokens
# Find token → Grant organization access

# Or refresh with org scope
gh auth refresh -s read:org

# Verify org membership
gh api user/orgs
```

---

## Slide 43 of 38: Issue 3 - Clone Fails

**Error:**
```
repository not found
```

**Debugging Steps:**
```bash
# 1. Check if repo exists
gh repo view ORG/repo-name

# 2. Check your permissions
gh api /repos/ORG/repo-name

# 3. List org repos to verify name
gh repo list ORG --limit 100 | grep repo-name

# 4. Check authentication
gh auth status
```

**Common Causes:**
- Misspelled repository name
- Repository is in different org
- Don't have read access

---

## Slide 44 of 38: Issue 4 - Claude Can't Access Files

**Problem:** Claude says "cannot access files" or "file not found"

**Solutions:**
```bash
# 1. Verify you're in the right directory
pwd                    # Linux/Mac
cd                     # Windows

# 2. List files to confirm they exist
ls -la                 # Linux/Mac
dir                    # Windows

# 3. Start Claude from repo root
cd /path/to/repo
claude

# 4. Check file permissions
ls -l filename         # Linux/Mac
icacls filename        # Windows
```

**In Claude:**
```
# Read specific file
/read path/to/file.js

# List files
/bash ls -la
```

---

## Slide 45 of 38: Issue 5 - Slow Operations

**Problem:** `gh` commands are very slow

**Possible Causes:**
- Network issues
- Large repositories
- API rate limiting

**Solutions:**
```bash
# Use --limit for list commands
gh repo list ORG --limit 10  # Instead of default 30

# Clone with shallow depth
gh repo clone ORG/repo -- --depth=1

# Check API rate limit
gh api rate_limit

# Use caching for metadata
gh repo list --json name > repos.json
```

---

## Slide 46 of 38: Getting Help

**GitHub CLI Help:**
```bash
gh --help              # General help
gh auth --help         # Authentication help
gh repo --help         # Repository commands help
gh repo clone --help   # Specific command help
```

**Online Resources:**
- GitHub CLI Manual: https://cli.github.com/manual
- GitHub CLI Discussions: https://github.com/cli/cli/discussions
- GitHub Support: https://support.github.com

**Debugging Commands:**
```bash
gh auth status -t      # Check authentication
gh api user            # Test API access
gh api rate_limit      # Check rate limits
```

---

## Slide 47 of 38: Key Takeaways

**Essential Knowledge:**
1. ✅ GitHub CLI enables AI access to private repos
2. ✅ HTTPS authentication is recommended
3. ✅ Organization access must be explicitly granted
4. ✅ AI can rapidly analyze unfamiliar codebases
5. ✅ Security practices are critical for private code

**Commands to Remember:**
```bash
gh auth login          # Authenticate
gh auth status         # Verify
gh repo list ORG       # List repos
gh repo clone ORG/repo # Clone
gh repo view ORG/repo  # View details
```

---

## Slide 48 of 38: Workflow Summary

**Complete Workflow:**

```
1. Install GitHub CLI
   ↓
2. Authenticate (gh auth login)
   ↓
3. Grant org access
   ↓
4. List repos (gh repo list)
   ↓
5. Clone repo (gh repo clone)
   ↓
6. Navigate into repo (cd repo-name)
   ↓
7. Start Claude (claude)
   ↓
8. Ask strategic questions
   ↓
9. Create CLAUDE.md
   ↓
10. Start writing tests!
```

---

## Slide 49 of 38: Practice Exercises

**Now it's your turn!**

Complete the exercises in **02-EXERCISES.md**:

1. **Exercise 1:** Setup & Authentication (30 min)
2. **Exercise 2:** Codebase Analysis (45 min)
3. **Exercise 3:** Testing Analysis (45 min)
4. **Exercise 4:** CLAUDE.md Creation (30 min)

**Then:** Complete the hands-on lab (03-LAB.md)

---

## Slide 50 of 38: Questions?

**Common Questions:**

Q: Can I use GitHub CLI with GitHub Enterprise?
A: Yes! Choose "GitHub Enterprise Server" during `gh auth login`

Q: Is my token secure?
A: Yes, stored in system credential store (Keychain/Credential Manager)

Q: Can I use Claude with other Git hosting (GitLab, Bitbucket)?
A: Not via `gh`, but you can clone manually and use Claude in the directory

Q: Does this work with very large repos?
A: Yes, but use `--depth=1` for faster cloning

---

## Slide 51 of 38: Next Steps

**After this module:**

1. Complete all exercises
2. Take the quiz (05-QUIZ.md)
3. Apply to your real projects
4. Move to Module 04: Documentation Generation

**Resources:**
- 04-CODE-EXAMPLES.md (reference examples)
- GitHub CLI Manual
- Claude Code Documentation

---

## Slide 52 of 38: Module Summary

**What You Learned:**
- ✅ GitHub CLI installation across platforms
- ✅ Authentication with GitHub.com
- ✅ Accessing private repositories
- ✅ Using AI for codebase exploration
- ✅ Security best practices
- ✅ Troubleshooting common issues

**What You Can Do Now:**
- Access any private repository securely
- Analyze unfamiliar codebases in minutes
- Generate comprehensive documentation
- Identify testing opportunities rapidly

**You're ready for real-world QA work with AI!**

---

*End of Slides*

**Continue to:** [02-EXERCISES.md](./02-EXERCISES.md)
