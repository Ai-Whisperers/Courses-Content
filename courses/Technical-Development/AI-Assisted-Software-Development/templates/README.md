# Project Templates

## AI-Assisted Software Development Course

Ready-to-use templates for AI-assisted development projects.

---

## Contents

```
templates/
├── README.md                    # This file
└── project-ai-setup/            # AI tool configuration template
    ├── .vscode/
    │   └── settings.json        # VS Code settings for AI tools
    ├── .github/
    │   └── copilot-instructions.md  # Project-specific Copilot instructions
    ├── .gitignore               # Security-conscious gitignore
    ├── CLAUDE.md                # Claude project instructions
    └── README.md                # Template usage guide
```

---

## Quick Start

### Using the Template

1. **Copy template to your project:**
   ```bash
   cp -r templates/project-ai-setup/* ./your-project/
   ```

2. **Customize configuration files:**
   - Edit `.github/copilot-instructions.md` with project specifics
   - Update `CLAUDE.md` with your project context
   - Modify `.vscode/settings.json` as needed

3. **Verify .gitignore:**
   - Ensure sensitive files excluded
   - Add project-specific exclusions

---

## Template Descriptions

### VS Code Settings (`.vscode/settings.json`)

Optimized settings for AI-assisted development:
- Copilot enablement per file type
- Editor suggestions configuration
- Format on save settings
- AI tool integrations

### Copilot Instructions (`.github/copilot-instructions.md`)

Project-specific instructions for GitHub Copilot:
- Coding conventions
- Architecture patterns to follow
- Files and patterns to avoid
- Security requirements

### Claude Project File (`CLAUDE.md`)

Context document for Claude AI:
- Project overview
- Tech stack details
- Coding standards
- Common patterns

### Security Gitignore (`.gitignore`)

Comprehensive gitignore including:
- Environment files
- Secret/credential files
- IDE configurations
- Build artifacts
- AI-generated files to exclude

---

## Customization Guide

### For Different Languages

**JavaScript/TypeScript:**
```json
// .vscode/settings.json
{
    "github.copilot.enable": {
        "javascript": true,
        "typescript": true,
        "typescriptreact": true
    }
}
```

**Python:**
```json
{
    "github.copilot.enable": {
        "python": true
    },
    "python.analysis.typeCheckingMode": "basic"
}
```

**Go:**
```json
{
    "github.copilot.enable": {
        "go": true
    }
}
```

### For Different Frameworks

**React:**
```markdown
<!-- .github/copilot-instructions.md -->
## Framework: React

- Use functional components with hooks
- Follow component composition patterns
- Use TypeScript for prop types
- CSS-in-JS with styled-components
```

**Express:**
```markdown
<!-- .github/copilot-instructions.md -->
## Framework: Express

- Use async/await for route handlers
- Implement middleware for common logic
- Follow RESTful conventions
- Use controller-service-repository pattern
```

---

## Best Practices

### Keep Instructions Current

- Update `copilot-instructions.md` as patterns evolve
- Review and refine `CLAUDE.md` quarterly
- Remove outdated instructions

### Security First

- Never commit `.env` files
- Keep `.gitignore` comprehensive
- Review AI suggestions for security issues
- Exclude sensitive files from AI context

### Team Consistency

- Share templates across team
- Document customizations
- Use version control for templates
- Review template changes in PRs

---

*Project Templates - AI-Assisted Software Development Course*
