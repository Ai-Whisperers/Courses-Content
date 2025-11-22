# AI Tools Advanced Features Guide

Extended configuration options including skills, plugins, hooks, MCP servers, and custom agents.

---

## Table of Contents

1. [Claude Code Advanced Features](#claude-code-advanced-features)
2. [Cursor Advanced Features](#cursor-advanced-features)
3. [GitHub Copilot Advanced Features](#github-copilot-advanced-features)
4. [Gemini Advanced Features](#gemini-advanced-features)
5. [MCP (Model Context Protocol)](#mcp-model-context-protocol)

---

## Claude Code Advanced Features

### Skills

Skills are modular capabilities that extend Claude's functionality. Unlike slash commands (user-triggered), skills are **model-invoked** - Claude autonomously decides when to use them.

#### Storage Locations

```
~/.claude/skills/          # Personal skills (all projects)
.claude/skills/            # Project skills (shared via git)
```

#### Creating a Skill

1. Create directory:
   ```bash
   mkdir -p .claude/skills/my-skill
   ```

2. Create `SKILL.md`:
   ```markdown
   ---
   name: test-generator
   description: Generate comprehensive unit tests for JavaScript/TypeScript functions. Use when asked to write tests, create test cases, or improve test coverage.
   allowed-tools: Read, Edit, Glob, Grep
   ---

   # Test Generator Skill

   ## Instructions

   When generating tests:
   1. Analyze the function to understand its purpose
   2. Identify all code paths (happy path, errors, edge cases)
   3. Create tests using Jest with AAA pattern
   4. Include mocks for dependencies
   5. Add descriptive test names

   ## Test Structure

   ```javascript
   describe('FunctionName', () => {
     beforeEach(() => {
       // Setup
     });

     it('should do X when Y', () => {
       // Arrange
       // Act
       // Assert
     });
   });
   ```

   ## Examples

   See @./examples/test-template.ts for reference.
   ```

3. Optional: Add supporting files:
   ```
   .claude/skills/test-generator/
   ├── SKILL.md
   ├── examples/
   │   └── test-template.ts
   └── reference.md
   ```

#### Skill Frontmatter

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Lowercase with hyphens, max 64 chars |
| `description` | Yes | What it does and when to use it, max 1024 chars |
| `allowed-tools` | No | Restricts available tools |

#### Testing Skills

Ask questions matching the skill's description. Debug with `claude --debug` to see loading errors.

---

### Plugins

Plugins bundle commands, agents, skills, hooks, and MCP servers into shareable packages.

#### Plugin Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json         # Manifest
├── commands/               # Slash commands
├── agents/                 # Agent definitions
├── skills/                 # Skills
├── hooks/
│   └── hooks.json          # Hook configurations
└── .mcp.json               # MCP servers
```

#### Plugin Manifest (plugin.json)

```json
{
  "name": "my-plugin",
  "description": "Description of the plugin",
  "version": "1.0.0",
  "author": "Your Name"
}
```

#### Installation

```bash
# Add marketplace
/plugin marketplace add your-org/claude-plugins

# Install plugin
/plugin install formatter@your-org

# List installed
/plugin list
```

#### Team Configuration

In `.claude/settings.json`:
```json
{
  "plugins": {
    "marketplaces": ["your-org/claude-plugins"],
    "install": ["formatter@your-org", "tester@your-org"]
  }
}
```

---

### Hooks

Hooks execute custom scripts at specific events in Claude's workflow.

#### Available Hook Types

| Hook | Trigger | Use Case |
|------|---------|----------|
| `PreToolUse` | Before tool execution | Validate/modify parameters |
| `PostToolUse` | After tool completion | Log, validate results |
| `UserPromptSubmit` | User submits prompt | Validate input, inject context |
| `Stop` | Agent finishes | Decide if task is complete |
| `SubagentStop` | Subagent finishes | Control subagent flow |
| `SessionStart` | Session begins | Initialize environment |
| `SessionEnd` | Session ends | Cleanup |
| `PermissionRequest` | Permission dialog | Auto-approve/deny |

#### Configuration Format

In `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/validate-edit.js",
            "timeout": 30000
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/log-command.js"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/inject-context.js"
          }
        ]
      }
    ]
  }
}
```

#### Hook Script Example

`.claude/hooks/validate-edit.js`:

```javascript
#!/usr/bin/env node
const fs = require('fs');

// Read input from stdin
let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const data = JSON.parse(input);

  // Check if editing sensitive file
  if (data.tool_input?.file_path?.includes('.env')) {
    console.error('Cannot edit .env files');
    process.exit(2); // Block the action
  }

  // Allow the action
  process.exit(0);
});
```

#### Exit Codes

- `0` - Success, continue
- `2` - Block action, show error
- Other - Non-blocking error

#### Hook Input Format

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript",
  "cwd": "/project/root",
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "src/file.ts",
    "old_string": "...",
    "new_string": "..."
  }
}
```

---

### Custom Slash Commands

Create reusable commands for common tasks.

#### Location

```
~/.claude/commands/      # Global commands
.claude/commands/        # Project commands
```

#### Command Format

`.claude/commands/run-tests.md`:

```markdown
---
description: Run tests with coverage report
allowed-tools: Bash, Read
model: haiku
---

Run the project tests and analyze results.

1. Execute `npm test -- --coverage`
2. Parse the coverage report
3. Identify files below 80% coverage
4. Suggest tests to improve coverage

Arguments: $ARGUMENTS
```

#### Frontmatter Options

| Field | Description |
|-------|-------------|
| `description` | Shown in command list |
| `allowed-tools` | Restrict available tools |
| `model` | Override default model |
| `argument-hint` | Placeholder for arguments |

#### Using Commands

```
/run-tests unit
/run-tests integration --verbose
```

---

### Custom Agents

Define specialized agents for specific workflows.

#### Location

```
~/.claude/agents/        # Global agents
.claude/agents/          # Project agents
```

#### Agent Format

`.claude/agents/code-reviewer.md`:

```markdown
---
name: code-reviewer
description: Reviews code for quality, security, and best practices
tools: Read, Glob, Grep
model: sonnet
---

# Code Reviewer Agent

You are an expert code reviewer focused on:
- Code quality and readability
- Security vulnerabilities
- Performance issues
- Best practices compliance

## Review Process

1. Understand the context and purpose
2. Check for security issues (OWASP Top 10)
3. Evaluate code structure and organization
4. Verify error handling
5. Check test coverage
6. Provide actionable feedback

## Output Format

Organize findings by severity:
- 🔴 Critical: Security/data issues
- 🟠 Major: Bugs, bad patterns
- 🟡 Minor: Style, naming
- 💡 Suggestions: Improvements
```

---

### Checkpoints and Rewind

Claude Code v2.0 introduced automatic checkpointing for safe experimentation.

#### Accessing Checkpoints

- Press `Esc` twice (Esc + Esc)
- Or use `/rewind` command

#### Restore Options

| Option | Description |
|--------|-------------|
| **Conversation only** | Rewind to a message while keeping code changes |
| **Code only** | Revert file changes while keeping conversation |
| **Both** | Restore both code and conversation |

#### How It Works

- Automatically captures state before each edit
- Tracks files edited through Claude's tools
- Session-level recovery (not a git replacement)

#### Limitations

- Bash commands (`rm`, `mv`, `cp`) not tracked
- Only tracks current session edits
- Manual changes outside Claude Code not captured

#### Best Practices

- Use for quick experimentation and rollback
- Continue using Git for permanent history
- Think: Checkpoints = "local undo", Git = "permanent history"

---

### Context Management

#### @ References

Use `@` to reference files and resources:

```
@filename.ts          # Reference file
@/path/to/file        # Nested file
@folder/              # Entire directory
```

**Benefits:**

- Reduces prompt overhead
- Immediate context access
- Tab completion support

#### Context Window Management

- Use `/clear` between tasks to reset context
- Never exceed 60% context utilization
- Split work: Research → Plan → Implement → Validate
- Summarize and pin key facts

#### Shift+Drag

Hold Shift while dragging files to create references instead of opening them.

---

## Cursor Advanced Features

### Custom Commands

Store reusable prompts in `.cursor/commands/`.

#### Format

`.cursor/commands/generate-tests.md`:

```markdown
Generate comprehensive tests for the selected code.

Requirements:
- Use Jest framework
- Follow AAA pattern
- Include happy path and error cases
- Mock external dependencies
- Minimum 80% coverage target
```

#### Usage

Type `/` in chat, select command from dropdown.

---

### MCP Integration

Configure MCP servers for external tool access.

#### Project Configuration

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

#### Global Configuration

`~/.cursor/mcp.json` - Available in all projects.

#### Popular MCP Servers

- **filesystem** - File operations
- **github** - GitHub API access
- **postgres** - Database queries
- **slack** - Slack integration
- **google-drive** - Google Drive access
- **puppeteer** - Browser automation

---

### Memories (Beta)

Store persistent context that loads automatically.

Enable in settings, then use `@folders` to include directories or add project-specific memories that persist across sessions.

---

### BugBot and Auto-Fix

Cursor includes automatic error detection and fixing capabilities.

#### Features

- **Agent Linter Auto-Fix**: Agent reads linter errors and automatically fixes issues
- **Error Detection Loop**: Detects errors and applies corrections without manual debugging
- **BugBot**: AI code review tool for pull requests

#### How It Works

- Cursor sees linter errors/warnings as context
- Automatically suggests fixes alongside code completions
- Corrects common mistakes (missing parentheses, quotes, etc.)

#### Configuration

Enable/disable in Cursor Settings. Some users prefer to disable aggressive auto-fixing for more control.

---

### Parallel Agents (Cursor 2.0)

Run multiple AI agents simultaneously on different tasks.

#### Features

- Run up to 8 agents in parallel
- Each agent operates in isolated codebase copy
- Uses git worktrees or remote machines
- Native OS notifications when complete

#### Background/Cloud Agents

- Start from Cursor, Slack, Linear, or web/mobile
- Work on separate branches
- Can open PRs for review
- 99.9% reliability for cloud agents

#### Plan Mode

- Create plan with one model
- Execute with another
- Run in foreground or background

---

### Composer Model

Cursor's purpose-built coding model (released October 2025).

#### Key Features

- 4x faster than similar models
- Most turns complete in under 30 seconds
- Optimized for agentic coding
- Frontier coding benchmark results

---

### Browser (v2.0)

In-editor browser with AI integration.

#### Features

- Element selection tools
- DOM forwarding for context
- Client-side debugging
- Screenshot capture

---

### Sandboxed Terminals (macOS)

Secure terminal execution environment.

#### Features

- Isolated execution on macOS
- Read/write workspace access only
- No internet access by default
- Admin controls for git/network access

---

### Voice Mode

Speech-to-text agent control.

```
Enable in Cursor Settings > Features > Voice Mode
```

- Custom submit keywords
- Hands-free coding
- Real-time transcription

---

### Team Commands (Enterprise)

Centrally managed commands and rules.

- Distribute commands via web dashboard
- Apply global team rules
- Hooks cloud distribution
- Audit logging for admin events

---

### Deeplinks (Beta)

Shareable prompt URLs.

```
cursor://prompt/generate-tests?file=src/utils.ts
```

**Use Cases:**

- Documentation with runnable examples
- Team workflows
- Onboarding prompts

---

### Instant Grep (Beta, v2.1)

Rapid codebase search.

- Fast grep across entire codebase
- Supports regex patterns
- Word boundary matching
- Searchable results with `⌘+F`

---

### Improved Plan Mode (v2.1)

Enhanced planning interface.

- Interactive UI for clarifying questions
- Searchable plans with `⌘+F`
- Better visualization of steps

---

## GitHub Copilot Advanced Features

### AGENTS.md Files

Define custom agent behaviors for the Copilot coding agent.

#### Location

```
AGENTS.md                 # Repository root
src/AGENTS.md             # Nested (applies to subdirectory)
~/.copilot/agents/        # Personal agents (CLI)
```

#### Format

```markdown
# Project Agent Instructions

## Code Style
- Use TypeScript strict mode
- Prefer functional patterns
- Always handle errors explicitly

## Testing
- Use Jest for unit tests
- Follow AAA pattern
- Minimum 80% coverage

## Architecture
- Use repository pattern for data access
- Dependency injection for testability
- Service layer for business logic

## Preferences
- Prefer this logger: winston
- Use table-driven tests for handlers
- Include JSDoc for public APIs
```

---

### Custom Agents

Define specialized agents in `.github/agents/`.

#### Structure

```
.github/
└── agents/
    ├── test-writer.yml
    ├── code-reviewer.yml
    └── doc-generator.yml
```

#### Agent Configuration

`.github/agents/test-writer.yml`:

```yaml
name: test-writer
description: Generates comprehensive unit and integration tests
model: gpt-4o
tools:
  - read_file
  - write_file
  - search_code
  - run_terminal_command
prompt: |
  You are an expert test engineer. When asked to write tests:

  1. Analyze the code to understand its purpose
  2. Identify all testable scenarios
  3. Generate tests using Jest
  4. Include mocks for dependencies
  5. Follow AAA pattern
  6. Target 80%+ coverage

  Always use descriptive test names and include edge cases.
```

#### Agent Properties

| Property | Description |
|----------|-------------|
| `name` | Agent identifier |
| `description` | What the agent does |
| `model` | AI model to use |
| `tools` | Available tools |
| `prompt` | System instructions |
| `mcp_servers` | MCP server access (org-level) |

---

### Path-Specific Instructions

Apply different rules to different parts of the codebase.

`.github/instructions/api.instructions.md`:

```yaml
---
applyTo: "src/api/**/*.ts,src/routes/**/*.ts"
excludeAgent: "code-review"
---

# API Development Guidelines

- Use Express router patterns
- Validate all input with Zod
- Return consistent response format
- Include OpenAPI documentation
- Handle errors with middleware
```

---

### Prompt Files

Create reusable prompts for common tasks.

`.github/prompts/security-review.prompt.md`:

```markdown
# Security Review

Review the selected code for security vulnerabilities.

## Check For:
- SQL injection
- XSS vulnerabilities
- CSRF issues
- Insecure dependencies
- Hardcoded secrets
- Authentication bypasses
- Authorization issues

## Output:
- Severity rating (Critical/High/Medium/Low)
- Affected code location
- Vulnerability description
- Remediation steps
```

---

### Copilot Spaces

Replacement for Knowledge Bases (retiring November 2025).

#### What Are Spaces?

- Centralized project context for smarter responses
- Combine code, docs, specs, and custom instructions
- Share across GitHub organization
- Available to all Copilot users (not just org owners)

#### Contents

- Code and Markdown
- JSON and images
- File uploads
- Issues and pull requests
- Custom Copilot instructions

#### Use Cases

- Task-specific context
- Team knowledge sharing
- Project onboarding
- Focused development workflows

---

## Gemini Advanced Features

### Extensions

Gemini CLI extensions customize and connect to external tools.

#### Installation

Extensions are stored in:
- `<workspace>/.gemini/extensions/` - Project-specific
- `~/.gemini/extensions/` - Global

#### Extension Structure

```
my-extension/
├── gemini-extension.json    # Configuration
├── GEMINI.md                # Context (optional)
└── scripts/                 # Custom scripts
```

#### gemini-extension.json

```json
{
  "name": "my-extension",
  "description": "What this extension does",
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "server-package"]
    }
  },
  "excludedTools": ["dangerous-tool"],
  "commands": {
    "my-command": {
      "description": "Custom command",
      "prompt": "Do something specific"
    }
  }
}
```

#### Available Extensions

From Google and partners:
- Dynatrace
- Elastic
- Figma
- Harness
- Postman
- Shopify
- Snyk
- Stripe

Install with:
```bash
gemini extensions install <GitHub-URL-or-local-path>
```

---

### Sandbox Mode

Isolate potentially dangerous operations from your system.

#### Benefits

- **Security**: Prevent accidental system damage
- **Isolation**: Limit file system access to project
- **Consistency**: Reproducible environments
- **Safety**: Reduce risk with untrusted code

#### Enabling Sandbox

**Command-line:**
```bash
gemini --sandbox
gemini -s
```

**Settings file (~/.gemini/settings.json):**
```json
{
  "tools": {
    "sandbox": true
  }
}
```

**With YOLO mode:**
Sandbox is enabled by default with `--yolo` or `--approval-mode=yolo`.

#### Requirements

- Docker or Podman for container-based sandboxing
- macOS uses Seatbelt isolation

#### Custom Sandbox

Create `.gemini/sandbox.Dockerfile` for project-specific sandboxing:

```dockerfile
FROM node:20
WORKDIR /app
# Custom setup
```

---

### Tools and Built-ins

#### Built-in Tools

- Google Search grounding
- File operations
- Shell commands
- Web fetching

#### MCP Server Integration

Configure in `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

Use with @ syntax:
```
@github List my open pull requests
@slack Send summary to #dev channel
```

---

### Session Management

#### Save and Resume

```bash
/chat save          # Save conversation to disk
/chat resume        # Restore previous conversation
/clear              # Reset context and terminal
```

#### Use Cases

- Branch conversations like version control
- Experiment with different prompts
- Resume complex tasks later

---

### YOLO Mode

Auto-approve all tool operations (use with caution).

```bash
gemini --yolo
gemini --approval-mode=yolo
```

Automatically enables sandbox mode for safety.

---

### Authentication Methods

Gemini CLI supports multiple authentication options:

#### OAuth Login (Default)
```bash
gemini  # First run prompts OAuth
```
- Free tier: 60 requests/min, 1,000 requests/day
- Uses Gemini 2.5 Pro with 1M token context
- Set `GOOGLE_CLOUD_PROJECT` for paid Code Assist licenses

#### API Key
```bash
export GEMINI_API_KEY="your-key"
gemini
```
- Free tier: 100 requests/day
- Get key from aistudio.google.com

#### Vertex AI (Enterprise)
```bash
export GOOGLE_API_KEY="your-key"
export GOOGLE_GENAI_USE_VERTEXAI=true
gemini
```
- Advanced security features
- Enterprise compliance controls

---

### Memory Tool

Persist information across sessions.

The `save_memory` tool allows Gemini to store and recall information:

```bash
# Gemini automatically uses this when asked
"Remember that our API endpoint is /v2/users"

# Later sessions can access this
"What's our API endpoint?"
```

---

### Todo Tool

Gemini includes a built-in task management tool (`write_todos`) for tracking complex requests and subtasks during sessions.

---

### GitHub Action Integration

Use Gemini CLI in GitHub Actions for automation:

```yaml
- name: AI Code Review
  uses: google-gemini/gemini-cli-action@v1
  with:
    prompt: "Review this PR for bugs and security issues"
```

**Use Cases:**
- Automated code review in PRs
- Issue triage and labeling
- On-demand assistance via `@gemini-cli` mentions
- Custom workflow automation

---

### Command-Line Flags

| Flag | Description |
|------|-------------|
| `-m, --model` | Specify model (e.g., `gemini-2.5-flash`) |
| `-p` | Non-interactive prompt mode |
| `-s, --sandbox` | Enable sandbox mode |
| `--yolo` | Auto-approve all operations |
| `--include-directories` | Include multiple codebase directories |
| `--output-format json` | Structured JSON output |
| `--output-format stream-json` | Real-time newline-delimited JSON |

---

### Release Channels

| Channel | When Updated | Use Case |
|---------|--------------|----------|
| `@latest` | Tuesdays UTC 2000 | Stable weekly releases |
| `@preview` | Tuesdays UTC 2359 | Preview features |
| `@nightly` | Daily UTC 0000 | Bleeding edge |

Install specific channel:
```bash
npm install -g @google/gemini-cli@preview
```

---

## MCP (Model Context Protocol)

MCP is an open standard for connecting AI tools to external data and services.

### Overview

MCP servers provide:
- Database access
- API integrations
- File system operations
- Browser automation
- Cloud service connections

### Configuration by Tool

#### Claude Code

```bash
# Add server
claude mcp add github --transport stdio -- npx -y @modelcontextprotocol/server-github

# List servers
claude mcp list

# Check status
/mcp
```

Or in `.mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

#### Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "env": {}
    }
  }
}
```

#### GitHub Copilot

Configure in repository settings or organization settings for custom agents.

### Popular MCP Servers

| Server | Purpose | Package |
|--------|---------|---------|
| **filesystem** | File operations | `@modelcontextprotocol/server-filesystem` |
| **github** | GitHub API | `@modelcontextprotocol/server-github` |
| **postgres** | PostgreSQL queries | `@modelcontextprotocol/server-postgres` |
| **sqlite** | SQLite database | `@modelcontextprotocol/server-sqlite` |
| **puppeteer** | Browser automation | `@modelcontextprotocol/server-puppeteer` |
| **slack** | Slack integration | `@modelcontextprotocol/server-slack` |
| **google-drive** | Google Drive | `@modelcontextprotocol/server-gdrive` |
| **memory** | Persistent memory | `@modelcontextprotocol/server-memory` |

### Creating Custom MCP Servers

Use the MCP SDK: https://modelcontextprotocol.io/quickstart/server

Basic structure:

```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'my-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  },
});

// Define tools
server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'my_tool',
      description: 'Does something useful',
      inputSchema: {
        type: 'object',
        properties: {
          input: { type: 'string' }
        }
      }
    }
  ]
}));

// Handle tool calls
server.setRequestHandler('tools/call', async (request) => {
  // Implementation
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Complete Project Setup

### All Advanced Features

```
project-root/
├── .cursor/
│   ├── index.mdc
│   ├── rules/
│   │   └── testing.mdc
│   ├── commands/
│   │   └── generate-tests.md
│   └── mcp.json
├── .cursorignore
├── .claude/
│   ├── settings.json
│   ├── commands/
│   │   └── run-tests.md
│   ├── skills/
│   │   └── test-generator/
│   │       └── SKILL.md
│   ├── agents/
│   │   └── code-reviewer.md
│   └── hooks/
│       └── validate-edit.js
├── .mcp.json                    # Claude Code MCP
├── CLAUDE.md
├── GEMINI.md
├── AGENTS.md                    # GitHub Copilot agent
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   │   └── testing.instructions.md
│   ├── prompts/
│   │   └── write-test.prompt.md
│   └── agents/
│       └── test-writer.yml
└── .gitignore
```

---

## Summary

### Feature Comparison

| Feature | Claude Code | Cursor | GitHub Copilot | Gemini |
|---------|------------|--------|----------------|--------|
| **Context Files** | CLAUDE.md | .mdc rules | copilot-instructions.md | GEMINI.md |
| **Skills/Agents** | .claude/skills/ | N/A | .github/agents/ | .gemini/extensions/ |
| **Custom Commands** | .claude/commands/ | .cursor/commands/ | .github/prompts/ | Extension commands |
| **Hooks** | Yes | Yes (Beta) | N/A | N/A |
| **Plugins** | Yes | N/A | Extensions | Extensions |
| **MCP Support** | Yes | Yes | Yes (agents) | Yes |
| **Permissions** | Yes (granular) | Sandboxed Terminals | Content Exclusion | N/A |
| **Checkpoints/Undo** | /rewind | N/A | N/A | /chat save |
| **Parallel Agents** | Subagents | 8 agents | N/A | N/A |
| **Sandbox Mode** | Yes | Yes (macOS) | N/A | Yes |
| **Auto-Fix** | N/A | BugBot | N/A | N/A |
| **Spaces/Knowledge** | N/A | Memories | Copilot Spaces | N/A |
| **Voice Control** | N/A | Yes | N/A | N/A |
| **Browser Integration** | N/A | Yes | N/A | Web Fetch |
| **GitHub Actions** | N/A | N/A | Yes | Yes |
| **Memory/Persistence** | N/A | Memories | N/A | save_memory tool |
| **Team/Enterprise** | Plugins | Team Commands | Org Settings | Vertex AI |

### Best Practices

1. **Start simple** - Begin with context files, add advanced features as needed
2. **Version control** - Commit shared configs, gitignore personal settings
3. **Security first** - Use permissions, ignore files, and sandbox mode
4. **Document skills** - Clear descriptions help AI discover and use them
5. **Test thoroughly** - Verify hooks and skills work as expected
6. **Share with team** - Use plugins/marketplaces for organization-wide tools
7. **Use checkpoints** - Enable safe experimentation with easy rollback
8. **Leverage MCP** - Connect to databases, APIs, and external tools

---

*This guide covers advanced AI tool configurations. For basic setup, see [ai-tools-configuration-guide.md](ai-tools-configuration-guide.md).*
