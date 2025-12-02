# AI Tools Configuration Guide

## AI-Assisted Software Development Course

Complete setup instructions for all AI development tools used in this course.

---

## Table of Contents

1. [GitHub Copilot Setup](#github-copilot-setup)
2. [Claude Setup](#claude-setup)
3. [ChatGPT Setup](#chatgpt-setup)
4. [VS Code Configuration](#vs-code-configuration)
5. [Team/Enterprise Setup](#teamenterprise-setup)

---

## GitHub Copilot Setup

### Prerequisites

- GitHub account
- Active Copilot subscription (Individual, Business, or Enterprise)
- VS Code or supported IDE

### Installation Steps

#### 1. Verify Subscription

```bash
# Check at github.com/settings/copilot
# Or for organizations: github.com/organizations/YOUR_ORG/settings/copilot
```

#### 2. Install VS Code Extension

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search "GitHub Copilot"
4. Install both:
   - GitHub Copilot
   - GitHub Copilot Chat

#### 3. Sign In

1. Click the Copilot icon in the status bar
2. Click "Sign in to GitHub"
3. Complete OAuth flow in browser
4. Return to VS Code

#### 4. Verify Installation

```javascript
// Type this comment and wait for suggestion:
// function that calculates fibonacci
```

### Configuration Options

```json
// settings.json
{
    "github.copilot.enable": {
        "*": true,
        "markdown": true,
        "plaintext": false
    },
    "github.copilot.advanced": {
        "length": 500,
        "temperature": 0.3
    }
}
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| No suggestions | Check status bar icon, re-authenticate |
| Slow suggestions | Check network, reduce context |
| Wrong language | Add language identifier comment |

---

## Claude Setup

### Claude.ai (Web Interface)

1. Go to [claude.ai](https://claude.ai)
2. Create account or sign in
3. Choose plan (Free or Pro)
4. Start chatting

### Claude API (For Developers)

#### 1. Get API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account
3. Navigate to API Keys
4. Generate new key
5. Store securely (never commit to git)

#### 2. Install SDK

```bash
# Python
pip install anthropic

# Node.js
npm install @anthropic-ai/sdk
```

#### 3. Basic Usage

```python
# Python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")
message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain this code: ..."}
    ]
)
```

```javascript
// Node.js
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: 'your-api-key' });
const message = await client.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Explain this code: ...' }]
});
```

### Claude in VS Code

1. Install "Claude Dev" or similar extension
2. Configure API key in settings
3. Use via command palette or sidebar

---

## ChatGPT Setup

### ChatGPT Web Interface

1. Go to [chat.openai.com](https://chat.openai.com)
2. Create account or sign in
3. Choose plan (Free, Plus, or Team)
4. Start chatting

### OpenAI API

#### 1. Get API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account
3. Navigate to API Keys
4. Create new secret key
5. Store securely

#### 2. Install SDK

```bash
# Python
pip install openai

# Node.js
npm install openai
```

#### 3. Basic Usage

```python
# Python
from openai import OpenAI

client = OpenAI(api_key="your-api-key")
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Explain this code: ..."}
    ]
)
```

```javascript
// Node.js
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: 'your-api-key' });
const response = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [
        { role: 'system', content: 'You are a helpful coding assistant.' },
        { role: 'user', content: 'Explain this code: ...' }
    ]
});
```

---

## VS Code Configuration

### Recommended Extensions

```json
// extensions.json
{
    "recommendations": [
        "github.copilot",
        "github.copilot-chat",
        "ms-python.python",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "bradlc.vscode-tailwindcss"
    ]
}
```

### Optimal Settings for AI Development

```json
// settings.json
{
    // Editor settings for AI suggestions
    "editor.inlineSuggest.enabled": true,
    "editor.suggestOnTriggerCharacters": true,
    "editor.quickSuggestions": {
        "other": true,
        "comments": true,
        "strings": true
    },

    // Format settings
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",

    // Copilot settings
    "github.copilot.enable": {
        "*": true,
        "yaml": true,
        "markdown": true,
        "plaintext": false
    },

    // File associations for better suggestions
    "files.associations": {
        "*.js": "javascript",
        "*.ts": "typescript",
        "*.jsx": "javascriptreact",
        "*.tsx": "typescriptreact"
    }
}
```

### Keybindings for Productivity

```json
// keybindings.json
[
    {
        "key": "ctrl+shift+c",
        "command": "github.copilot.chat.focus"
    },
    {
        "key": "ctrl+shift+e",
        "command": "github.copilot.chat.explain"
    },
    {
        "key": "ctrl+shift+t",
        "command": "github.copilot.chat.generateTests"
    }
]
```

---

## Team/Enterprise Setup

### GitHub Copilot Business/Enterprise

#### Organization Setup

1. **Enable for Organization**
   ```
   github.com/organizations/YOUR_ORG/settings/copilot
   ```

2. **Configure Policies**
   - Allow/block for repositories
   - Set suggestion matching policy
   - Configure data handling

3. **Manage Seats**
   - Assign to teams or individuals
   - Monitor usage

#### Security Configuration

```yaml
# .github/copilot.yml (repository level)
suggestions:
  enabled: true
  sensitive_files:
    - "*.env"
    - "config/secrets/*"
    - "**/credentials.json"
```

### Enterprise Data Protection

| Concern | Copilot Business | Copilot Enterprise |
|---------|------------------|-------------------|
| Code not used for training | Yes | Yes |
| No code storage | Yes | Yes |
| Audit logs | Limited | Full |
| Custom model fine-tuning | No | Yes |
| Knowledge base integration | No | Yes |

---

## Environment Variables

### Secure Configuration

```bash
# .env (never commit this file!)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GITHUB_TOKEN=ghp_...
```

### Loading in Code

```python
# Python
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
```

```javascript
// Node.js
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
```

### Git Ignore

```gitignore
# .gitignore
.env
.env.local
.env.*.local
*.pem
**/secrets/
config/local.json
```

---

## Verification Checklist

After setup, verify:

- [ ] GitHub Copilot shows suggestions in editor
- [ ] Copilot Chat responds to queries
- [ ] Claude accessible (web or API)
- [ ] ChatGPT accessible (web or API)
- [ ] API keys stored securely (not in code)
- [ ] .env files are gitignored
- [ ] Team policies configured (if applicable)

---

*AI Tools Configuration Guide - AI-Assisted Software Development Course*
