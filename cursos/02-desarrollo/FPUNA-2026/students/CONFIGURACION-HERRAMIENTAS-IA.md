# FPUNA 2026 - AI Tools Setup Guide
## OpenCode + Oh My OpenCode (OMO) Configuration

**Program**: AI-Augmented Development - Summer 2026  
**Purpose**: Complete setup guide for AI development environment  
**Time**: 2-3 hours (Week 1, Day 1-2)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [OpenCode Installation](#opencode-installation)
3. [Oh My OpenCode (OMO) Setup](#oh-my-opencode-omo-setup)
4. [Configuration](#configuration)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)
7. [Track-Specific Setup](#track-specific-setup)

---

## Prerequisites

### System Requirements

**Operating System**:
- ✅ Windows 10/11 (64-bit)
- ✅ macOS 11+ (Big Sur or newer)
- ✅ Linux (Ubuntu 20.04+, Fedora 35+)

**Hardware Minimum**:
- **RAM**: 8 GB (16 GB recommended)
- **Storage**: 10 GB free space
- **Processor**: Intel i5 / AMD Ryzen 5 or better
- **Internet**: Stable connection (for AI API calls)

---

### Required Software

Install BEFORE OpenCode:

#### 1. Node.js (Required)

**Version**: 18.x or newer

**Windows**:
```bash
# Download installer from nodejs.org
# Run installer, use default settings
# Restart terminal after install
```

**macOS**:
```bash
# Using Homebrew
brew install node@18

# Verify
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

**Linux (Ubuntu/Debian)**:
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

#### 2. Git (Required)

**Windows**:
```bash
# Download from git-scm.com
# Install with default settings
# Select "Git from command line and also from 3rd-party software"
```

**macOS**:
```bash
# Using Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

**Linux**:
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo dnf install git      # Fedora
```

**Verify**:
```bash
git --version
```

---

#### 3. VS Code (Recommended)

**All Platforms**:
- Download from [code.visualstudio.com](https://code.visualstudio.com/)
- Install with default settings
- Launch VS Code to verify

**Extensions to Install** (do this later):
- OpenCode extension
- GitLens
- Prettier
- ESLint/TSLint

---

## OpenCode Installation

### Step 1: Download OpenCode

**Option A: Official Website** (Recommended)
```
Visit: https://opencode.dev
Download for your OS
```

**Option B: NPM** (Alternative)
```bash
npm install -g @opencode/cli
```

---

### Step 2: Install OpenCode

**Windows**:
1. Run `OpenCode-Setup.exe`
2. Follow installer wizard
3. Select "Add to PATH"
4. Complete installation
5. Restart terminal

**macOS**:
```bash
# If downloaded .dmg
# Drag OpenCode to Applications

# If using Homebrew
brew install --cask opencode
```

**Linux**:
```bash
# Download .deb or .rpm
sudo dpkg -i opencode_*.deb  # Ubuntu/Debian
sudo rpm -i opencode_*.rpm   # Fedora

# Or use snap
sudo snap install opencode
```

---

### Step 3: Verify OpenCode Installation

```bash
# Check version
opencode --version

# Should show: OpenCode v1.x.x
```

**If command not found**:
- Restart terminal
- Check PATH environment variable
- Reinstall with "Add to PATH" selected

---

### Step 4: OpenCode First Run

```bash
# Initialize OpenCode
opencode init

# Login (or create account)
opencode login

# Test
opencode test
```

**Expected Output**:
```
✓ OpenCode initialized successfully
✓ Logged in as: your-email@fpuna.edu.py
✓ Connection test passed
```

---

## Oh My OpenCode (OMO) Setup

### What is OMO?

**Oh My OpenCode** is an enhancement layer that adds:
- **MCPs** (Model Context Providers) - Connect to external tools
- **Skills** - Pre-built capabilities
- **Hooks** - Automation triggers
- **Rules** - Project-specific guidelines

---

### Step 1: Install OMO

```bash
# Install OMO globally
npm install -g oh-my-opencode

# Verify installation
omo --version

# Should show: Oh My OpenCode v2.x.x
```

---

### Step 2: Initialize OMO

```bash
# In your working directory
mkdir fpuna-2026
cd fpuna-2026

# Initialize OMO
omo init

# Follow prompts:
# - Project name: fpuna-2026
# - Type: Educational
# - Framework: Multi-track
```

**This creates**:
```
fpuna-2026/
├── .omo/
│   ├── config.json
│   ├── mcps/
│   ├── skills/
│   ├── hooks/
│   └── rules/
└── .omoignore
```

---

### Step 3: Install Core MCPs

**MCPs = Model Context Providers** (connect to tools)

```bash
# Filesystem MCP (access files)
omo mcp install filesystem

# Git MCP (version control)
omo mcp install git

# Web MCP (fetch web content)
omo mcp install web

# Verify
omo mcp list
```

**Expected Output**:
```
Installed MCPs:
✓ filesystem v1.2.0
✓ git v1.1.0
✓ web v1.0.5
```

---

### Step 4: Install Universal Skills

**Skills = Pre-built capabilities**

```bash
# Code generation skill
omo skill install code-gen

# Debugging skill
omo skill install debug

# Documentation skill
omo skill install docs

# Verify
omo skill list
```

---

## Configuration

### OpenCode Configuration

**Edit**: `~/.opencode/config.json`

```json
{
  "ai": {
    "provider": "claude",
    "model": "claude-3-5-sonnet",
    "temperature": 0.7,
    "maxTokens": 4000
  },
  "editor": {
    "default": "vscode",
    "autoSave": true,
    "formatOnSave": true
  },
  "git": {
    "autoCommit": false,
    "commitStyle": "conventional"
  }
}
```

---

### OMO Configuration

**Edit**: `fpuna-2026/.omo/config.json`

```json
{
  "project": {
    "name": "fpuna-2026",
    "type": "educational",
    "framework": "multi-track"
  },
  "mcps": {
    "enabled": ["filesystem", "git", "web"],
    "autoUpdate": true
  },
  "skills": {
    "enabled": ["code-gen", "debug", "docs"],
    "custom": []
  },
  "hooks": {
    "enabled": true,
    "preCommit": true,
    "postGenerate": true
  },
  "rules": {
    "enabled": true,
    "strictMode": false
  }
}
```

---

## Verification

### Complete Verification Checklist

Run these commands to verify everything works:

```bash
# 1. Check Node.js
node --version
npm --version

# 2. Check Git
git --version

# 3. Check OpenCode
opencode --version
opencode test

# 4. Check OMO
omo --version
omo status

# 5. Check MCPs
omo mcp list

# 6. Check Skills
omo skill list

# 7. Test end-to-end
omo generate "Create a simple Hello World function in TypeScript"
```

**All checks should pass** ✅

---

### Test Project

Create a test to verify everything works:

```bash
# Create test directory
mkdir test-opencode
cd test-opencode

# Initialize
omo init --quick

# Generate test code
omo generate "Create a TypeScript function that adds two numbers"

# Verify file was created
ls *.ts
```

**Expected**: `add.ts` file created with working code

---

## Troubleshooting

### Common Issues

#### Issue 1: "opencode: command not found"

**Solution**:
```bash
# Windows
# Add to PATH: C:\Program Files\OpenCode\bin
# Restart terminal

# macOS/Linux
echo 'export PATH="$PATH:/usr/local/bin/opencode"' >> ~/.bashrc
source ~/.bashrc
```

---

#### Issue 2: "omo: command not found"

**Solution**:
```bash
# Check global npm path
npm config get prefix

# Should be in PATH
# If not, add it:
export PATH="$PATH:$(npm config get prefix)/bin"

# Reinstall OMO
npm install -g oh-my-opencode
```

---

#### Issue 3: "Permission denied" (macOS/Linux)

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use NVM (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

---

#### Issue 4: OpenCode "Connection failed"

**Causes**:
- No internet connection
- Firewall blocking
- API key invalid

**Solution**:
```bash
# Test internet
ping google.com

# Check firewall
# Allow OpenCode through Windows Firewall or macOS Firewall

# Re-login
opencode logout
opencode login
```

---

#### Issue 5: OMO MCPs not working

**Solution**:
```bash
# Reinstall MCPs
omo mcp uninstall --all
omo mcp install filesystem git web

# Verify
omo mcp test filesystem
```

---

### Getting Help

**If stuck**:
1. Check [OpenCode Docs](https://docs.opencode.dev)
2. Check [OMO Documentation](https://docs.omo.dev)
3. Ask in Slack: `#tech-support`
4. Email: `soporte-ia@fpuna.edu.py`

**Include in help request**:
- Operating system
- Error message (full text)
- Commands you ran
- Screenshots

---

## Track-Specific Setup

### Track 07: QA Automation

**Additional MCPs**:
```bash
omo mcp install playwright
omo mcp install test-runner
```

**Additional Skills**:
```bash
omo skill install qa/test-generation
omo skill install qa/page-object
omo skill install qa/api-testing
```

**Verify**:
```bash
# Check Playwright
npx playwright --version

# Should show: Version 1.x.x
```

---

### Track 08: Web Development

**Additional MCPs**:
```bash
omo mcp install nextjs
omo mcp install prisma
omo mcp install vercel
```

**Additional Skills**:
```bash
omo skill install web/component-gen
omo skill install web/api-routes
omo skill install web/database-schema
```

**Verify**:
```bash
# Check Next.js
npx next --version

# Check Prisma
npx prisma --version
```

---

### Other Tracks (When Available)

**Track 01 (Software Dev)**:
- Docker MCP
- Kubernetes MCP
- Cloud provider MCPs

**Track 02 (Electronics)**:
- KiCad MCP
- Arduino MCP
- PlatformIO MCP

*Details provided when tracks are created*

---

## VS Code Integration

### Install OpenCode Extension

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "OpenCode"
4. Click Install
5. Reload VS Code

---

### VS Code Settings

**Settings** (`Ctrl + ,`):

```json
{
  "opencode.enabled": true,
  "opencode.inlineCompletions": true,
  "opencode.autoSave": true,
  "opencode.language": "es",
  
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  
  "git.autofetch": true,
  "git.confirmSync": false
}
```

---

### Keyboard Shortcuts

**OpenCode in VS Code**:
- `Ctrl + Shift + Space` - Open OpenCode prompt
- `Ctrl + Shift + G` - Generate code
- `Ctrl + Shift + E` - Explain code
- `Ctrl + Shift + R` - Refactor code
- `Ctrl + Shift + T` - Generate tests

**Customize**: File → Preferences → Keyboard Shortcuts

---

## Best Practices

### Do's ✅

- **Keep tools updated**: `omo update`, `npm update -g`
- **Use version control**: Commit often with meaningful messages
- **Validate AI outputs**: Don't blindly trust generated code
- **Save your work**: Auto-save + manual commits
- **Use skills**: Don't reinvent the wheel

### Don'ts ❌

- **Don't commit secrets**: Use `.env` files, add to `.gitignore`
- **Don't skip setup**: Proper configuration prevents issues
- **Don't ignore errors**: Fix them early
- **Don't work without backups**: Git is your friend
- **Don't use outdated tools**: Update regularly

---

## Maintenance

### Weekly Maintenance

```bash
# Update OpenCode
opencode update

# Update OMO
npm update -g oh-my-opencode

# Update MCPs
omo mcp update --all

# Update Skills
omo skill update --all
```

---

### Monthly Maintenance

```bash
# Update Node.js (check latest LTS)
nvm install --lts
nvm use --lts

# Update npm
npm install -g npm@latest

# Clean npm cache
npm cache clean --force

# Verify everything
opencode test
omo status
```

---

## Security Best Practices

### Protect Your API Keys

**Never commit**:
- API keys
- Authentication tokens
- Database passwords
- `.env` files

**Always use**:
```bash
# .gitignore
.env
.env.local
secrets/
*.key
*.pem
```

---

### Secure Configuration

```bash
# Set restrictive permissions
chmod 600 ~/.opencode/config.json
chmod 600 ~/.omo/config.json

# Don't share configurations
# (May contain sensitive data)
```

---

## FAQs

### Q: Do I need to pay for OpenCode?

**A**: FPUNA students get free access during the program. After program, free tier available with limits.

### Q: Can I use this on multiple computers?

**A**: Yes, login on each device with same account. Settings sync automatically.

### Q: What if my internet goes down?

**A**: Some offline features available, but AI generation requires internet.

### Q: Can I use different AI models?

**A**: Yes, configure in `config.json`. Options: Claude, GPT-4, etc.

### Q: Is my code sent to AI servers?

**A**: Yes, for generation. Don't include sensitive data in prompts. Review OpenCode privacy policy.

---

## Next Steps

After setup is complete:

1. ✅ **Verify everything works** (run all tests)
2. ✅ **Complete Week 1 Day 3** (Prompt Engineering)
3. ✅ **Practice generating code** (build confidence)
4. ✅ **Join Slack** (get help if needed)
5. ✅ **Prepare for Week 2** (choose your track)

---

## Additional Resources

**Documentation**:
- [OpenCode Official Docs](https://docs.opencode.dev)
- [OMO Documentation](https://docs.omo.dev)
- [VS Code Docs](https://code.visualstudio.com/docs)

**Video Tutorials**:
- [Guía Completa de Videos](../../../../_shared/setup/VIDEO-TUTORIALS.md) - Tutoriales para todas las herramientas
- [Claude Code Setup](../../../../_shared/setup/VIDEO-TUTORIALS.md#claude-code) - Instalación paso a paso
- [VS Code Configuration](../../../../_shared/setup/VIDEO-TUTORIALS.md#vs-code) - Editor recomendado
- [Git & GitHub Basics](../../../../_shared/setup/VIDEO-TUTORIALS.md#git--github) - Control de versiones

**Community**:
- Slack: `#tech-support`, `#opencode-help`
- Discord: OpenCode Community
- GitHub: OpenCode Issues

---

**Last Updated**: January 15, 2026  
**Version**: 1.0  
**Next Review**: After Summer 2026 Cohort 1

---

*FPUNA Summer 2026 - AI Tools Setup*  
*Empowering Development with AI*
