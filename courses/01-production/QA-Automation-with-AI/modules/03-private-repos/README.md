# Module 3: Accessing Private Repositories with AI

## Duration: 3 hours

## Learning Objectives

By the end of this module, you will be able to:
- Set up GitHub CLI and authenticate with your organization
- Clone and explore private repositories
- Use AI to analyze unfamiliar codebases
- Generate documentation from private repos

---

## 3.1 Setting Up GitHub CLI

### Why GitHub CLI?

GitHub CLI (`gh`) allows Claude Code to:
- Access private repositories
- Create pull requests
- Manage issues
- Interact with GitHub API

### Installation

#### Windows
```powershell
winget install GitHub.cli
```

#### macOS
```bash
brew install gh
```

#### Linux
```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora
sudo dnf install gh
```

### Verify Installation

```bash
gh --version
# Expected: gh version 2.x.x
```

> **Try It Now (1 min)**
> 
> Run `gh --version` in your terminal.
> - See a version number? You're ready for authentication.
> - "Command not found"? Go back and install gh for your OS.

---

## 3.2 Authentication

### Interactive Authentication

```bash
gh auth login
```

Follow the prompts:
1. **Where do you use GitHub?** → GitHub.com
2. **Protocol** → HTTPS
3. **Authenticate** → Login with a web browser
4. **One-time code** → Copy the code shown
5. **Browser** → Open https://github.com/login/device
6. **Enter code** → Paste and authorize

### Verify Authentication

```bash
gh auth status

# Expected output:
# github.com
#   ✓ Logged in to github.com as YourUsername
#   ✓ Git operations for github.com configured to use https
#   ✓ Token: *****
```

> **Try It Now (2 min)**
> 
> Run `gh auth status` right now.
> - See green checkmarks? Perfect - you're authenticated!
> - See "not logged in"? Run `gh auth login` and follow the prompts.
> - Have an organization? Run `gh repo list YourOrgName --limit 3` to test access.

### Organization Access

If your repos are in an organization:

1. Go to https://github.com/settings/tokens
2. Click on your token
3. Under "Organization access", grant access to your org
4. Or re-authenticate with: `gh auth refresh -s read:org`

### Verify Organization Access

```bash
# List repos in your organization
gh repo list YourOrganization --limit 5

# If successful, you'll see the repository list
```

---

## 3.3 Working with Private Repositories

### Listing Repositories

```bash
# List your repositories
gh repo list --limit 20

# List organization repositories
gh repo list YourOrg --limit 50

# Get detailed info as JSON
gh repo list YourOrg --json name,description,isPrivate,primaryLanguage
```

### Cloning Repositories

```bash
# Clone a private repo
gh repo clone YourOrg/repo-name

# Clone to specific directory
gh repo clone YourOrg/repo-name ./my-directory
```

### Viewing Repository Details

```bash
# View repo information
gh repo view YourOrg/repo-name

# View in browser
gh repo view YourOrg/repo-name --web
```

---

## 3.4 AI-Assisted Codebase Exploration

### Starting a Claude Session

```bash
# Navigate to cloned repo
cd repo-name

# Start Claude
claude
```

### Exploration Workflow

#### Step 1: High-Level Overview

```
Analyze this codebase and provide:

1. **Project Purpose**
   - What does this application do?
   - Who are the target users?

2. **Architecture Overview**
   - Is it monolith or microservices?
   - What are the main components?
   - Create a Mermaid diagram

3. **Tech Stack**
   - Languages and frameworks
   - Database and storage
   - External services

4. **Entry Points**
   - Main application file
   - API entry points
   - Key configuration files
```

#### Step 2: Directory Analysis

```
Analyze the directory structure and explain:

1. What each top-level directory contains
2. The purpose of key subdirectories
3. Where different types of code live:
   - Business logic
   - API routes
   - Data models
   - Utilities
   - Tests
   - Configuration
```

#### Step 3: Dependency Analysis

```
Analyze the project dependencies:

1. List all direct dependencies with their purposes
2. Identify the testing frameworks
3. Identify development tools (linting, formatting)
4. Note any security-sensitive dependencies
5. Check for outdated major versions
```

#### Step 4: Code Patterns

```
Identify the coding patterns used:

1. **Architecture patterns**
   - MVC, Clean Architecture, etc.
   - Dependency injection
   - Error handling approach

2. **Testing patterns**
   - Test file organization
   - Mocking approach
   - Test data management

3. **Naming conventions**
   - Files and directories
   - Functions and variables
   - Classes and interfaces
```

---

## 3.5 Common Exploration Prompts

### For Quick Understanding

```
I'm new to this codebase. In 5 minutes, help me understand:
1. What it does (one sentence)
2. Main entry point
3. Three most important files to read
4. How to run it locally
```

### For Testing Focus

```
I need to write tests for this project. Tell me:
1. What testing frameworks are used
2. Where tests are located
3. How to run tests
4. Current test coverage (if available)
5. What's not being tested
```

### For Finding Specific Code

```
I need to find code related to [feature].
1. Which files contain this functionality?
2. What are the key functions/methods?
3. What are the dependencies?
4. Are there existing tests?
```

### For Understanding Data Flow

```
Trace the data flow for [action/feature]:
1. Where does the data enter the system?
2. What transformations occur?
3. Where is it stored?
4. How is it retrieved?
5. Create a sequence diagram
```

---

## 3.6 Hands-On Exercises

### Exercise 3.1: Setup and Access

**Objective**: Set up GitHub CLI and access organization repos

**Steps**:
1. Install GitHub CLI
2. Authenticate with `gh auth login`
3. Verify with `gh auth status`
4. List your organization's repos
5. Clone a private repository

**Deliverable**: Screenshot of successful repo list

**Time**: 30 minutes

---

### Exercise 3.2: Codebase Analysis

**Objective**: Use AI to understand an unfamiliar codebase

**Steps**:
1. Clone a private repository you haven't worked with
2. Start a Claude session
3. Ask Claude to explain:
   - What the project does
   - The architecture
   - Key components
   - How to run it

4. Document the findings

**Deliverable**: Summary document of the codebase

**Time**: 45 minutes

---

### Exercise 3.3: Testing Analysis

**Objective**: Analyze the testing setup of a private repo

**Steps**:
1. Ask Claude to analyze the testing setup
2. Identify:
   - Test frameworks used
   - Test file locations
   - How to run tests
   - Coverage gaps

3. Create a list of recommended tests to add

**Deliverable**: Testing analysis document with recommendations

**Time**: 45 minutes

---

## 3.7 Best Practices

### Security

- Never share authentication tokens
- Don't commit `.env` files with secrets
- Be careful with what you copy to public channels
- Review AI-generated code for security issues

### Efficiency

- Create CLAUDE.md after initial exploration
- Document your findings for future reference
- Build a list of useful prompts for your org
- Share knowledge with team members

### Organization

- Keep cloned repos organized in a workspace directory
- Use consistent naming conventions
- Clean up old clones periodically

---

## 3.8 Troubleshooting

### "Permission denied" Error

```bash
# Re-authenticate
gh auth logout
gh auth login

# Check token scopes
gh auth status -t
```

### "Organization not accessible"

```bash
# Grant org access
gh auth refresh -s read:org
```

### Clone Fails

```bash
# Check if repo exists
gh repo view OrgName/repo-name

# Check your permissions
gh api /repos/OrgName/repo-name
```

### Claude Can't Access Files

- Make sure you're in the repository directory
- Verify files exist with `ls` or `dir`
- Try reading specific file: `/read path/to/file`

---

## Knowledge Check

1. What command authenticates GitHub CLI?
2. How do you list repositories in an organization?
3. Why is organization access sometimes needed separately?
4. What should you ask Claude first when exploring a new codebase?
5. What security precautions should you take with private repos?

---

## Summary

In this module, you learned:

- How to install and authenticate GitHub CLI
- How to access private repositories
- How to use AI to explore unfamiliar codebases
- Effective prompts for codebase analysis
- Best practices for security and organization

---

## Next Steps

Proceed to **Module 4: Documentation Generation** to learn how to generate comprehensive documentation with AI.

---

## Module Progress

Track your completion:

- [ ] Read through all lesson content
- [ ] Completed hands-on exercises
- [ ] Passed module quiz (70%+)
- [ ] Can explain key concepts without notes

---

## Resources

- [GitHub CLI Documentation](https://cli.github.com/manual)
- [GitHub CLI Authentication](https://cli.github.com/manual/gh_auth_login)
- [Prompt Library - Exploration](../prompts/README.md#exploration)
