# Project AI Setup Template

This template provides all configuration files needed for multiple AI coding assistants.

## Files Included

```
project-ai-setup/
├── .cursor/
│   ├── index.mdc              # Cursor main rules
│   └── rules/
│       └── testing.mdc        # Cursor testing rules
├── .cursorignore              # Cursor ignore patterns
├── .claude/
│   └── settings.json          # Claude Code settings
├── CLAUDE.md                  # Claude Code context
├── .github/
│   └── copilot-instructions.md # GitHub Copilot instructions
├── .gemini/
│   └── settings.json          # Gemini settings
├── GEMINI.md                  # Gemini context
└── .gitignore                 # Git ignore (includes AI tool files)
```

## Usage

1. Copy all files to your project root
2. Update the context files with your project details:
   - `CLAUDE.md` - For Claude Code
   - `GEMINI.md` - For Gemini
   - `.github/copilot-instructions.md` - For GitHub Copilot
   - `.cursor/index.mdc` - For Cursor
3. Update `.cursorignore` and `.claude/settings.json` with your sensitive files
4. Commit to version control (except `*.local.json` files)

## Customization

### Tech Stack
Update the tech stack section in all context files to match your project:
- Programming language
- Framework
- Database
- Testing tools

### Coding Standards
Update coding standards to match your team's conventions:
- Code style
- Naming conventions
- Error handling
- Documentation requirements

### Testing Requirements
Update testing section with your targets:
- Coverage percentage
- Testing patterns
- Mocking requirements

### Sensitive Files
Update ignore patterns to protect your sensitive data:
- Environment files
- Credentials
- API keys
- Private keys

## Notes

- All AI tools use similar context patterns
- Keep context files in sync for consistency
- Security ignore files are "best-effort" - don't rely solely on them
- Update configs as your project evolves
