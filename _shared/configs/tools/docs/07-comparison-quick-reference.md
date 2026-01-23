# AI Coding Tools: Comparison & Quick Reference

> **Last Updated:** December 2025

## Quick Comparison Matrix

| Feature | Claude Code | Cursor | Copilot | Windsurf | Gemini |
|---------|-------------|--------|---------|----------|--------|
| **Config File** | CLAUDE.md | .mdc files | AGENTS.md | rules/*.md | GEMINI.md |
| **Agent Mode** | Yes | Yes | Yes (CCA) | Yes (Cascade) | Yes |
| **MCP Support** | Full | Full | Limited | Limited | Yes |
| **Free Tier** | Limited | Limited | Limited | Generous | Limited |
| **IDE** | CLI + VS Code | Standalone | VS Code/IDEs | Standalone | VS Code/IDEs |
| **Custom Commands** | Yes | Yes | Yes | No | Limited |
| **Nested Rules** | Yes | Yes | Yes | No | Yes |

## Configuration File Locations

### Claude Code
```
project/
├── CLAUDE.md                    # Main instructions
├── .claude/
│   ├── CLAUDE.md               # Alternative location
│   ├── settings.json           # Settings
│   ├── commands/               # Slash commands
│   └── mcp.json                # MCP servers
└── subdirectory/
    └── CLAUDE.md               # Nested instructions
```

### Cursor
```
project/
├── .cursorrules                 # Legacy (deprecated)
├── .cursorignore                # Ignore patterns
├── .cursor/
│   ├── rules/
│   │   ├── 001-core.mdc        # Core rules
│   │   └── 100-testing.mdc     # Testing rules
│   ├── commands/               # Custom commands
│   └── mcp.json                # MCP servers
└── subdirectory/
    └── .cursor/rules/          # Nested rules
```

### GitHub Copilot
```
project/
├── AGENTS.md                    # Universal agent file
├── .github/
│   ├── copilot-instructions.md # Main instructions
│   ├── instructions/
│   │   └── *.instructions.md   # Path-specific
│   ├── agents/
│   │   └── *.md                # Custom agents
│   └── prompts/
│       └── *.prompt.md         # Reusable prompts
└── subdirectory/
    └── AGENTS.md               # Nested instructions
```

### Windsurf
```
project/
├── .windsurfrules               # Legacy (deprecated)
├── .codeiumignore               # Ignore patterns
├── .windsurf/
│   └── rules/
│       └── *.md                 # Project rules
~/.codeium/
└── windsurf/
    └── memories/
        └── global_rules.md      # Global rules
```

### Google Gemini
```
project/
├── GEMINI.md                    # Main instructions (or AGENT.md)
├── .gemini/
│   ├── settings.json           # Model settings
│   ├── styleguide.md           # Code review style
│   └── extensions/             # Custom extensions
└── subdirectory/
    └── GEMINI.md               # Nested instructions
```

## Universal File Format

All tools support a universal markdown format:

```markdown
# Project Name

## Overview
Brief description of the project.

## Tech Stack
- Language: TypeScript 5.x
- Framework: Playwright
- Testing: Jest

## Commands
- `npm run build` - Build project
- `npm run test` - Run tests

## Code Style
- Use async/await
- No any types
- Explicit return types

## Project Structure
```
src/         # Source code
tests/       # Test files
```

## Do Not
- Modify production configs
- Commit secrets
```

## Configuration Templates by Use Case

### QA Automation (All Tools)

```markdown
# QA Automation Framework

## Tech Stack
- TypeScript 5.x (strict mode)
- Playwright for E2E testing
- Jest for unit tests
- Page Object Model pattern

## Testing Patterns
- AAA: Arrange, Act, Assert
- One concept per test
- data-testid selectors
- Factory functions for test data

## Commands
- `npm run test:e2e` - E2E tests
- `npm run test:unit` - Unit tests
- `npm run test:coverage` - Coverage report

## Coverage
- Minimum 80% line coverage
- All critical paths tested

## Do Not
- Use hard-coded waits
- Skip test coverage
- Use flaky selectors
```

### API Development (All Tools)

```markdown
# API Development

## Tech Stack
- Node.js + Express/Fastify
- TypeScript strict mode
- PostgreSQL database
- OpenAPI documentation

## Patterns
- Controller -> Service -> Repository
- Dependency injection
- Error handling middleware
- Request validation

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run migrate` - Database migrations

## Security
- Validate all inputs
- Parameterized queries
- Rate limiting
- JWT authentication
```

## Ignore File Comparison

### Universal .aiignore (works for most tools)

```gitignore
# Dependencies
node_modules/
.pnpm-store/
vendor/

# Build outputs
dist/
build/
.next/

# IDE files
.idea/
.vscode/
*.swp

# Secrets
.env*
*.pem
*.key
credentials.json

# Large files
*.min.js
*.bundle.js
*.map

# Test outputs
coverage/
playwright-report/
test-results/

# OS files
.DS_Store
Thumbs.db

# Package locks (optional)
package-lock.json
yarn.lock
pnpm-lock.yaml
```

### Tool-Specific Files

| Tool | Ignore File | Notes |
|------|-------------|-------|
| Cursor | `.cursorignore` | Same as gitignore format |
| Windsurf | `.codeiumignore` | Same format, global option |
| Claude | N/A | Use permissions in settings |
| Copilot | N/A | Uses .gitignore |
| Gemini | N/A | Uses .gitignore |

## MCP Server Quick Setup

### Essential Servers (Copy-Paste Ready)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Migration Guide

### From One Tool to Another

1. **Export your rules** - Copy content from existing config files
2. **Map to new format** - Use the comparison above to find equivalent locations
3. **Adjust syntax** - Each tool has slightly different conventions
4. **Test thoroughly** - Start new conversations to verify rules load

### Common Migrations

| From | To | Key Changes |
|------|-----|-------------|
| .cursorrules | .cursor/rules/*.mdc | Add frontmatter, split into files |
| .cursorrules | CLAUDE.md | Remove frontmatter, simplify |
| AGENTS.md | CLAUDE.md | Same content works |
| CLAUDE.md | GEMINI.md | Same content works |

## Best Practices Summary

### Do
- Keep config files under 100-200 lines
- Include working code examples
- Define clear boundaries (Do Not sections)
- Use environment variables for secrets
- Version control your config files
- Update when patterns change

### Don't
- Include obvious language features
- Add generic best practices
- Duplicate documentation from package.json
- Hard-code credentials
- Create overly complex rule hierarchies

## Quick Setup Scripts

### Initialize All Tools

```bash
#!/bin/bash
# Create config directories for all AI tools

mkdir -p .claude/commands
mkdir -p .cursor/rules .cursor/commands
mkdir -p .github/agents .github/instructions .github/prompts
mkdir -p .windsurf/rules
mkdir -p .gemini/extensions

# Create base config files
touch CLAUDE.md
touch AGENTS.md
touch GEMINI.md
touch .cursorignore
touch .codeiumignore
```

### Sync Context Script

```bash
#!/bin/bash
# Sync common rules across all tools

SOURCE="CLAUDE.md"

# Copy to other tools (adjust as needed)
cp "$SOURCE" "AGENTS.md"
cp "$SOURCE" "GEMINI.md"
cp "$SOURCE" ".windsurf/rules/project.md"

echo "Context synced from $SOURCE to all tools"
```

## Tool Selection Guide

| If You Need... | Use |
|----------------|-----|
| Best free tier | Windsurf |
| Most powerful agent | Claude Code |
| Best IDE integration | Cursor |
| GitHub workflow integration | Copilot |
| Google Cloud integration | Gemini |
| Team collaboration | Copilot or Claude Code |
| Complex multi-step tasks | Claude Code |
| Fast inline suggestions | Copilot or Cursor |

## Resources

### Official Documentation
- [Claude Code](https://docs.anthropic.com/claude-code)
- [Cursor](https://docs.cursor.com/)
- [GitHub Copilot](https://docs.github.com/copilot)
- [Windsurf](https://docs.windsurf.com/)
- [Gemini Code Assist](https://developers.google.com/gemini-code-assist)

### Community Resources
- [Awesome Copilot](https://github.com/github/awesome-copilot)
- [Cursor Forum](https://forum.cursor.com/)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)

### This Repository
- [01-claude-code.md](01-claude-code.md) - Claude Code detailed guide
- [02-cursor-ide.md](02-cursor-ide.md) - Cursor IDE detailed guide
- [03-github-copilot.md](03-github-copilot.md) - GitHub Copilot detailed guide
- [04-windsurf-codeium.md](04-windsurf-codeium.md) - Windsurf detailed guide
- [05-google-gemini.md](05-google-gemini.md) - Gemini detailed guide
- [06-mcp-servers.md](06-mcp-servers.md) - MCP Servers guide
