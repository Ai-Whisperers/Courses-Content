# AI Coding Tool Configuration Templates

Complete, production-ready configuration templates for AI-assisted QA automation development. These templates incorporate best practices from 50+ analyzed repositories and real-world usage patterns.

---

## Supported Tools

| Tool | Status | Primary Use Case |
|------|--------|------------------|
| [Claude Code](#claude-code) | Complete | IDE integration, autonomous coding |
| [Gemini](#gemini) | Complete | Google ecosystem, code review |
| [Cursor](#cursor) | Complete | AI-first IDE experience |
| [GitHub Copilot](#github-copilot) | Complete | Inline suggestions, chat |
| [Windsurf/Codeium](#windsurfcodeium) | Complete | Free tier, multi-IDE support |

---

## Quick Start

### 1. Choose Your Primary Tool

```bash
# Copy desired tool configuration to your project
cp -r ai-tool-configs/claude/.claude your-project/
cp -r ai-tool-configs/cursor/.cursor your-project/
cp ai-tool-configs/gemini/GEMINI.md your-project/
cp ai-tool-configs/copilot/.github/copilot-instructions.md your-project/.github/
```

### 2. Customize for Your Project

Edit the context file for your chosen tool:
- **Claude**: `CLAUDE.md`
- **Gemini**: `GEMINI.md`
- **Cursor**: `.cursor/rules/project.mdc`
- **Copilot**: `.github/copilot-instructions.md`

### 3. Add Common Ignores

```bash
# Copy shared ignore patterns
cp ai-tool-configs/common/.aiignore your-project/
```

---

## Claude Code

The most comprehensive configuration with permissions, hooks, commands, skills, and agents.

### Files

```
claude/
├── CLAUDE.md                    # Project context (auto-loaded)
├── .claude/
│   ├── settings.json            # Permissions, hooks, env vars
│   ├── commands/                # Custom slash commands
│   │   ├── run-tests.md
│   │   ├── debug.md
│   │   ├── review.md
│   │   └── generate-tests.md
│   ├── hooks/                   # Automation scripts
│   │   ├── validate-edit.js     # Block edits to sensitive files
│   │   └── inject-context.js    # Add reminders to prompts
│   ├── skills/                  # Auto-activating capabilities
│   │   ├── test-generator/      # Generate tests automatically
│   │   └── playwright-helper/   # E2E testing patterns
│   └── agents/                  # Custom agents
│       ├── code-reviewer.md     # Code review agent
│       └── test-writer.md       # Test generation agent
└── .mcp.json                    # MCP server configuration
```

### Key Features

- **Granular permissions** - Allow/deny specific commands
- **Pre-edit hooks** - Block edits to sensitive files (.env, credentials)
- **Custom slash commands** - `/run-tests`, `/debug`, `/review`, `/generate-tests`
- **Skills** - Auto-invoked capabilities (test-generator, playwright-helper)
- **Agents** - Specialized workflows (code-reviewer, test-writer)
- **MCP servers** - GitHub, filesystem, memory integration

### Setup

```bash
# Copy Claude configuration
cp -r ai-tool-configs/claude/.claude your-project/
cp ai-tool-configs/claude/CLAUDE.md your-project/
cp ai-tool-configs/claude/.mcp.json your-project/

# Add to .gitignore
echo ".claude/settings.local.json" >> .gitignore
```

---

## Gemini

Optimized for Google AI Studio and Gemini CLI with extensions and sandbox support.

### Files

```
gemini/
├── GEMINI.md                   # Project context
├── .gemini/
│   ├── settings.json           # Model, MCP servers, sandbox
│   ├── sandbox.Dockerfile      # Custom sandbox environment
│   └── extensions/             # Custom extensions
│       └── qa-testing/
│           ├── gemini-extension.json
│           └── GEMINI.md
```

### Key Features

- **@import syntax** - Include additional documentation
- **Extensions** - Custom commands and tools (qa-testing)
- **Sandbox mode** - Isolated execution environment
- **MCP servers** - GitHub, filesystem, puppeteer integration
- **Custom Dockerfile** - Project-specific sandbox setup

### Setup

```bash
# Copy Gemini configuration
cp -r ai-tool-configs/gemini/.gemini your-project/
cp ai-tool-configs/gemini/GEMINI.md your-project/
```

---

## Cursor

AI-first IDE with rules-based configuration, commands, and MCP support.

### Files

```
cursor/
├── .cursor/
│   ├── rules/
│   │   ├── index.mdc              # Global rules
│   │   └── testing.mdc            # Testing patterns
│   ├── commands/                  # Custom slash commands
│   │   ├── generate-tests.md
│   │   ├── review-code.md
│   │   ├── debug-error.md
│   │   └── create-page-object.md
│   └── mcp.json                   # MCP server configuration
└── .cursorignore                  # Files to ignore
```

### Key Features

- **Rules engine** - Declarative .mdc configuration
- **Custom commands** - `/generate-tests`, `/review-code`, `/create-page-object`
- **MCP servers** - GitHub, filesystem, puppeteer, memory
- **Composer integration** - Multi-file editing
- **Model selection** - Claude, GPT-4, custom

### Setup

```bash
# Copy Cursor configuration
cp -r ai-tool-configs/cursor/.cursor your-project/
cp ai-tool-configs/cursor/.cursorignore your-project/
```

---

## GitHub Copilot

Inline suggestions with custom agents, prompts, and path-specific instructions.

### Files

```
copilot/
├── AGENTS.md                      # Repository agent instructions
├── .github/
│   ├── copilot-instructions.md    # Repository instructions
│   ├── agents/                    # Custom agents
│   │   ├── test-writer.yml
│   │   ├── code-reviewer.yml
│   │   └── playwright-helper.yml
│   ├── prompts/                   # Reusable prompts
│   │   ├── generate-tests.prompt.md
│   │   ├── security-review.prompt.md
│   │   └── create-page-object.prompt.md
│   └── instructions/              # Path-specific rules
│       ├── testing.instructions.md
│       └── typescript.instructions.md
```

### Key Features

- **Custom agents** - test-writer, code-reviewer, playwright-helper
- **Prompt templates** - Reusable prompts for common tasks
- **Path-specific instructions** - Different rules for different directories
- **AGENTS.md** - Repository-wide agent behavior

### Setup

```bash
# Copy Copilot configuration
cp -r ai-tool-configs/copilot/.github your-project/
cp ai-tool-configs/copilot/AGENTS.md your-project/
```

---

## Windsurf/Codeium

Free tier AI coding with Cascade flows.

### Files

```
.windsurf/
├── cascade.md                 # Cascade flow configuration
├── rules.md                   # Global rules
└── .codeiumignore            # Files to ignore
```

### Key Features

- **Cascade flows** - Multi-step AI workflows
- **Free tier** - Generous limits
- **Multi-IDE** - VS Code, JetBrains, Vim
- **Fast inference** - Low latency suggestions

### Setup

```bash
# Copy Windsurf configuration
cp -r ai-tool-configs/windsurf/.windsurf your-project/
cp ai-tool-configs/windsurf/.codeiumignore your-project/
```

---

## Common Configuration

Shared patterns across all tools.

### .aiignore

Universal ignore file recognized by most AI tools:

```gitignore
# Dependencies
node_modules/
venv/
.venv/

# Build
dist/
build/
*.pyc

# Secrets
.env
.env.*
**/credentials.json
**/*.pem

# Large files
*.csv
*.xlsx
*.db

# Test data
**/fixtures/
**/snapshots/
```

### Context File Best Practices

1. **Keep it concise** - Under 500 lines
2. **Structure clearly** - Use headers and lists
3. **Include examples** - Show expected patterns
4. **Update regularly** - Keep in sync with project
5. **Reference docs** - Use @import for details

---

## Multi-Tool Setup

Using multiple AI tools together:

### Recommended Combinations

1. **Claude Code + Copilot**
   - Claude: Complex tasks, debugging, refactoring
   - Copilot: Inline suggestions while typing

2. **Cursor + Gemini**
   - Cursor: Primary IDE
   - Gemini: Code review, documentation

3. **All Tools**
   - Use consistent context across all tools
   - Sync CLAUDE.md, GEMINI.md, and rules

### Sync Context Script

```bash
#!/bin/bash
# sync-ai-context.sh

# Source of truth
SOURCE="CLAUDE.md"

# Sync to other tools
cp $SOURCE GEMINI.md
# Extract rules for Cursor
grep -A 100 "## Coding Standards" $SOURCE > .cursor/rules/standards.mdc
```

---

## Customization Guide

### For QA Automation Projects

Add to your context file:

```markdown
## Testing Patterns

### Test Structure
- Use Page Object Model for E2E tests
- One test file per feature
- Fixtures for test data

### Frameworks
- **Unit**: Jest/pytest
- **E2E**: Playwright
- **API**: Supertest/pytest

### Commands
- `npm test` - Run all tests
- `npm run test:e2e` - Run Playwright
- `npx playwright codegen` - Generate tests
```

### For TypeScript Projects

```markdown
## TypeScript Rules

- Strict mode enabled
- No `any` types
- Explicit return types
- Use type guards
- Export types alongside implementations
```

### For Python Projects

```markdown
## Python Rules

- Type hints for all functions
- Google-style docstrings
- Absolute imports only
- pytest for testing
- Black for formatting
```

---

## Best Practices

### 1. Context Engineering

- **Be specific** - Include exact patterns and examples
- **Show don't tell** - Code examples over descriptions
- **Update incrementally** - Small, focused updates
- **Test changes** - Verify AI understands updates

### 2. Permission Management

- **Principle of least privilege** - Allow only what's needed
- **Deny dangerous operations** - Block destructive commands
- **Ask for installations** - Confirm package installs
- **Audit regularly** - Review allowed commands

### 3. Automation

- **Pre-commit hooks** - Validate before commits
- **Post-edit hooks** - Format on save
- **Session hooks** - Context reminders
- **Custom commands** - Common workflows

### 4. Cost Optimization

- **Use appropriate models** - Haiku for simple tasks
- **Compact context** - Remove unused files
- **Batch operations** - Read multiple files at once
- **Cache results** - Store computed values

---

## Troubleshooting

### Context Not Loading

1. Check file location and name
2. Verify syntax (YAML frontmatter, Markdown)
3. Restart AI tool
4. Check ignore files

### Permissions Denied

1. Review `settings.local.json` patterns
2. Check `deny` list for conflicts
3. Add to `allow` list if needed
4. Use exact patterns with wildcards

### Hooks Not Running

1. Verify matcher pattern
2. Check command is executable
3. Increase timeout if needed
4. Check logs for errors

### Wrong Suggestions

1. Update context with corrections
2. Add negative examples ("Don't do this")
3. Provide more specific patterns
4. Use @import for detailed docs

---

## Contributing

To improve these templates:

1. Test in real projects
2. Document what works/doesn't
3. Submit improvements
4. Share custom commands

---

## Resources

- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/)
- [Cursor Docs](https://docs.cursor.com/)
- [Copilot Docs](https://docs.github.com/en/copilot)
- [Gemini API](https://ai.google.dev/docs)
- [Codeium Docs](https://codeium.com/docs)

---

## Version

**Created:** November 2025
**Based on:** Analysis of 50+ repositories
**Compatibility:** Claude Code, Cursor, Copilot, Gemini, Windsurf

---

*These templates are designed for QA Automation with AI course students but applicable to any software project.*
