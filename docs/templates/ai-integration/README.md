# AI Integration Templates

> Configuration files for AI-assisted development in course projects

## Overview

These templates help students set up AI coding assistants for course exercises and projects.

## Available Configurations

| File | AI Tool | Purpose |
|------|---------|---------|
| [CLAUDE.md](CLAUDE.md) | Claude Code | Project instructions |
| [settings.json](settings.json) | Claude Code | Settings configuration |
| [copilot-instructions.md](copilot-instructions.md) | GitHub Copilot | Custom instructions |
| [GEMINI.md](GEMINI.md) | Google Gemini | Project context |
| [cursor-rules.mdc](cursor-rules.mdc) | Cursor | Rule definitions |

---

## Setup Instructions

### For Claude Code

1. Create `.claude/` directory in project root
2. Copy `settings.json` to `.claude/settings.json`
3. Copy `CLAUDE.md` to project root
4. Replace all `{{PLACEHOLDER}}` values

```bash
mkdir -p .claude
cp docs/templates/ai-integration/settings.json .claude/
cp docs/templates/ai-integration/CLAUDE.md ./
```

### For GitHub Copilot

1. Create `.github/` directory
2. Copy `copilot-instructions.md`

```bash
mkdir -p .github
cp docs/templates/ai-integration/copilot-instructions.md .github/
```

### For Cursor

1. Create `.cursor/rules/` directory
2. Copy rules file

```bash
mkdir -p .cursor/rules
cp docs/templates/ai-integration/cursor-rules.mdc .cursor/rules/
```

### For Gemini

1. Create `.gemini/` directory
2. Copy configuration files

```bash
mkdir -p .gemini
cp docs/templates/ai-integration/GEMINI.md ./
```

---

## Placeholder Reference

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{COURSE_NAME}}` | Course name | "QA Automation with AI" |
| `{{COURSE_DOMAIN}}` | Subject area | "Software Testing" |
| `{{PRIMARY_LANGUAGE}}` | Main language | "TypeScript" |
| `{{FRAMEWORK}}` | Framework used | "Playwright" |
| `{{TESTING_FRAMEWORK}}` | Test framework | "Jest" |
| `{{TEST_COMMAND}}` | Run tests | "npm test" |

---

## Best Practices

### For Students

1. **Always include CLAUDE.md** - Provides context
2. **Set clear boundaries** - Define what AI should/shouldn't do
3. **Document tech stack** - Help AI understand your tools
4. **Include examples** - Show expected patterns

### For Course Creators

1. **Pre-configure for exercises** - Reduce setup time
2. **Add course-specific rules** - Enforce standards
3. **Include common commands** - Speed up workflows
4. **Test configurations** - Verify they work

---

## Integration with Course Structure

```
course-project/
├── .claude/
│   └── settings.json
├── .cursor/
│   └── rules/
│       └── project.mdc
├── .gemini/
│   └── settings.json
├── .github/
│   └── copilot-instructions.md
├── CLAUDE.md
├── GEMINI.md
└── [project files]
```

---

## Customization

### Adding Custom Commands

In `CLAUDE.md`:
```markdown
## Custom Commands

### /lint
Run ESLint on all files

### /format
Format code with Prettier

### /deploy
Deploy to staging
```

### Adding Security Rules

In `settings.json`:
```json
{
  "permissions": {
    "deny": [
      "Read(**/.env*)",
      "Read(**/*secret*)",
      "Bash(*credential*)"
    ]
  }
}
```

---

## Troubleshooting

### AI Not Following Instructions

1. Check file location (root for CLAUDE.md)
2. Verify file encoding (UTF-8)
3. Ensure no syntax errors
4. Restart AI session

### Permissions Issues

1. Review `allow` and `deny` lists
2. Check path patterns
3. Verify file permissions

---

## Version Compatibility

| Tool | Minimum Version | Notes |
|------|-----------------|-------|
| Claude Code | 1.0+ | Full support |
| GitHub Copilot | Latest | Custom instructions |
| Cursor | 0.40+ | Rule support |
| Gemini | Latest | Context support |
