# Claude Code Configuration Guide

> **Last Updated:** December 2025
> **Source:** [Anthropic Engineering Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) | [Using CLAUDE.md Files](https://www.claude.com/blog/using-claude-md-files)

## Overview

Claude Code is Anthropic's official CLI for Claude, providing an agentic coding assistant that can read, write, and execute code autonomously. It uses `CLAUDE.md` files for project-specific configuration and context.

## File Structure

```
your-project/
├── CLAUDE.md                    # Project root instructions (most common)
├── .claude/
│   ├── CLAUDE.md               # Alternative location for root instructions
│   ├── settings.json           # Project-specific settings
│   ├── settings.local.json     # Local overrides (gitignored)
│   ├── commands/               # Custom slash commands
│   │   └── my-command.md
│   └── rules/                  # Additional rules files
└── feature/
    └── CLAUDE.md               # Subdirectory-specific instructions
```

## CLAUDE.md File Hierarchy

Files are loaded in this order (later files can override earlier ones):

1. **`~/.claude/CLAUDE.md`** - Global preferences across all projects
2. **`./CLAUDE.md`** or **`./.claude/CLAUDE.md`** - Project root instructions
3. **`./subdirectory/CLAUDE.md`** - Granular, on-demand context

## Best Practices for CLAUDE.md

### Keep It Concise

```markdown
# Project Name

## Build Commands
- `npm run build` - Build the project
- `npm run test` - Run all tests
- `npm run test:unit -- path/to/test` - Run single test

## Code Style
- Use TypeScript strict mode
- Prefer async/await over promises
- Use destructuring for imports

## Architecture
- `/src/api` - REST endpoints
- `/src/services` - Business logic
- `/src/models` - Data models

## Do Not Touch
- Configuration in `/config/production.json`
- Legacy code in `/src/legacy/` (scheduled for removal)
```

### Content Guidelines

| Section | Purpose | Example |
|---------|---------|---------|
| **Build Commands** | Commands you type repeatedly | `npm run build`, `pytest -v` |
| **Code Style** | Module syntax, conventions | "Use ESM imports", "Type all functions" |
| **Architecture** | Non-obvious relationships | "Services call repositories, never models directly" |
| **Workflow** | Team-specific practices | "Run typecheck before committing" |
| **Do Not Touch** | Protected areas | Config files, legacy code |

### What NOT to Include

- Obvious language features (Claude already knows these)
- Generic best practices (focus on project-specific patterns)
- Lengthy documentation (keep under 100 lines)
- Redundant information from package.json or tsconfig.json

## Custom Slash Commands

Create `.claude/commands/command-name.md` files:

```markdown
---
description: Generate unit tests for a file
---

Generate comprehensive unit tests for the specified file:

1. Analyze the file structure and exports
2. Create tests for all public functions
3. Include edge cases and error scenarios
4. Use AAA pattern (Arrange, Act, Assert)
5. Mock external dependencies

Target file: $ARGUMENTS
```

Usage: `/project:command-name path/to/file.ts`

## Settings Configuration

### .claude/settings.json (Version Controlled)

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Bash(pytest:*)",
      "Read",
      "Write",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Read(.env)",
      "Read(**/credentials*)"
    ]
  },
  "hooks": {
    "preEdit": [
      {
        "pattern": "*.config.js",
        "command": "echo 'Editing config file - proceed with caution'"
      }
    ]
  }
}
```

### .claude/settings.local.json (Git Ignored)

```json
{
  "permissions": {
    "allow": [
      "Bash(docker:*)"
    ]
  },
  "model": "claude-sonnet-4-5-20250929"
}
```

## Quick Tips

### Using the # Key

Press `#` during a session to add instructions that Claude automatically incorporates into the relevant CLAUDE.md file.

### Initialize with /init

```bash
claude
> /init
```

This generates a starter CLAUDE.md based on your project structure. Review and refine it.

### Iterative Refinement

If you repeat the same instructions across sessions, add them to CLAUDE.md:

```markdown
## Testing
- Always run `npm run test:unit -- --coverage` after changes
- Minimum coverage: 80%
```

## MCP Server Configuration

### .claude/mcp.json

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
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

## Example: QA Automation Project

```markdown
# QA Automation Framework

## Tech Stack
- TypeScript 5.x with strict mode
- Playwright for E2E testing
- Jest for unit tests
- Page Object Model pattern

## Commands
- `npm run test:e2e` - Run all E2E tests
- `npm run test:e2e -- --grep "login"` - Run specific tests
- `npm run test:unit` - Run unit tests
- `npx playwright codegen` - Generate test code

## Code Style
- Use `data-testid` attributes for selectors
- One test concept per test file
- AAA pattern: Arrange, Act, Assert
- Custom locators in page objects only

## Project Structure
- `/tests/e2e/` - End-to-end tests
- `/tests/unit/` - Unit tests
- `/src/pages/` - Page Object classes
- `/src/fixtures/` - Test data factories
- `/src/utils/` - Shared utilities

## Testing Patterns
- Page Objects extend BasePage
- Use fixtures for test data
- Mock external APIs in unit tests
- Never use hard-coded waits

## Do Not Modify
- `playwright.config.ts` - Shared CI configuration
- `/src/pages/BasePage.ts` - Core page object class
```

## Security Considerations

1. **Never commit secrets** - Use environment variables
2. **Protect sensitive files** - Add to deny list
3. **Review generated code** - Especially for auth/security features
4. **Use permission boundaries** - Limit destructive operations

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CLAUDE.md not loading | Check file location and permissions |
| Commands not recognized | Verify `.claude/commands/` structure |
| Settings ignored | Check JSON syntax, restart Claude |
| Too much context | Split into subdirectory CLAUDE.md files |

## Resources

- [Official Documentation](https://docs.anthropic.com/claude-code)
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Using CLAUDE.md Files](https://www.claude.com/blog/using-claude-md-files)
- [ClaudeLog Tutorials](https://claudelog.com/)
