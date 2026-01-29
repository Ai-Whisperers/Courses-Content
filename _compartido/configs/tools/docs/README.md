# AI Coding Tools Documentation

> Comprehensive guides for configuring AI coding assistants using the latest best practices (December 2025)

## Documentation Index

| Guide | Description |
|-------|-------------|
| [01-claude-code.md](01-claude-code.md) | Claude Code configuration with CLAUDE.md files, slash commands, and MCP servers |
| [02-cursor-ide.md](02-cursor-ide.md) | Cursor IDE .mdc rules, commands, and dynamic rule activation |
| [03-github-copilot.md](03-github-copilot.md) | GitHub Copilot with AGENTS.md, custom agents, and .instructions.md files |
| [04-windsurf-codeium.md](04-windsurf-codeium.md) | Windsurf (Codeium) Cascade configuration and global rules |
| [05-google-gemini.md](05-google-gemini.md) | Google Gemini Code Assist with GEMINI.md and agent mode |
| [06-mcp-servers.md](06-mcp-servers.md) | Model Context Protocol servers setup and best practices |
| [07-comparison-quick-reference.md](07-comparison-quick-reference.md) | Side-by-side comparison and quick reference |

## Quick Start

### 1. Choose Your Tool(s)

| Tool | Best For | Free Tier |
|------|----------|-----------|
| **Claude Code** | Complex multi-step tasks, autonomous coding | Limited |
| **Cursor** | IDE power users, fast iteration | Limited |
| **GitHub Copilot** | GitHub workflow integration, teams | Limited |
| **Windsurf** | Budget-conscious developers | Generous |
| **Gemini** | Google Cloud users | Limited |

### 2. Create Base Configuration

All tools support a universal markdown format:

```markdown
# Project Name

## Tech Stack
- TypeScript 5.x
- Playwright for testing

## Commands
- `npm run test` - Run tests
- `npm run build` - Build project

## Code Style
- Use async/await
- No any types

## Do Not
- Commit secrets
- Skip tests
```

### 3. Place in Correct Location

| Tool | Primary Config File |
|------|---------------------|
| Claude Code | `CLAUDE.md` or `.claude/CLAUDE.md` |
| Cursor | `.cursor/rules/*.mdc` |
| Copilot | `AGENTS.md` or `.github/copilot-instructions.md` |
| Windsurf | `.windsurf/rules/*.md` |
| Gemini | `GEMINI.md` or `AGENT.md` |

### 4. Add MCP Servers (Optional)

Most tools support MCP for extended capabilities:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

## Latest Updates (December 2025)

### Key Changes
- **MCP Security**: RFC 8707 Resource Indicators now required
- **AGENTS.md**: Widely adopted as universal format (Copilot, Claude, Gemini)
- **Gemini Agent Mode**: Replaces deprecated Gemini tools
- **Cursor .mdc**: Dynamic rules with frontmatter for better context management
- **Windsurf Rules Directory**: Curated examples from Windsurf team

### Breaking Changes
- Gemini Code Assist tools deprecated (October 2025)
- Legacy `.cursorrules` deprecated in favor of `.cursor/rules/*.mdc`
- Legacy `.windsurfrules` deprecated in favor of `.windsurf/rules/`

## Sources

Documentation compiled from official sources:

- [Anthropic Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Cursor Official Documentation](https://docs.cursor.com/context/rules)
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [GitHub Blog - Writing Great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Windsurf Documentation](https://docs.windsurf.com/)
- [Google Gemini Code Assist](https://developers.google.com/gemini-code-assist)
- [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18)

## Contributing

To update these docs:
1. Check official documentation for latest changes
2. Update relevant guide file
3. Update comparison matrix in `07-comparison-quick-reference.md`
4. Update this README if structure changes
