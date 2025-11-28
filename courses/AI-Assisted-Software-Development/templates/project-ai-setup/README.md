# AI-Ready Project Setup

## Template for AI-Assisted Development

This template provides configuration files to optimize your project for AI-assisted development with GitHub Copilot, Claude, and other AI tools.

---

## Quick Setup

```bash
# Copy to your project
cp -r project-ai-setup/* /path/to/your/project/

# Or use as starting point for new project
git clone [template-url] my-project
```

---

## Included Files

| File | Purpose |
|------|---------|
| `.vscode/settings.json` | VS Code configuration for AI tools |
| `.github/copilot-instructions.md` | Project-specific Copilot instructions |
| `CLAUDE.md` | Context document for Claude AI |
| `.gitignore` | Security-focused git exclusions |

---

## Configuration Steps

### 1. Update Project Context

Edit `CLAUDE.md`:

```markdown
# Project: [Your Project Name]

## Overview
[Brief project description]

## Tech Stack
- Language: [JavaScript/TypeScript/Python/etc.]
- Framework: [React/Express/Django/etc.]
- Database: [PostgreSQL/MongoDB/etc.]
```

### 2. Set Copilot Instructions

Edit `.github/copilot-instructions.md`:

```markdown
## Coding Standards
- [Your standards here]

## Patterns to Follow
- [Your patterns here]

## Files to Exclude from Context
- [Sensitive files]
```

### 3. Configure VS Code

Review `.vscode/settings.json` and adjust:
- File types for Copilot suggestions
- Editor preferences
- Extension settings

### 4. Verify .gitignore

Ensure all sensitive files are excluded:
- `.env` files
- Credentials
- Personal configurations

---

## Usage

### With GitHub Copilot

Copilot reads `.github/copilot-instructions.md` to understand project conventions:

```javascript
// Copilot will follow your specified patterns
// Add comments to guide suggestions
function processData(input) {
    // Implementation follows project standards
}
```

### With Claude

Reference `CLAUDE.md` in your prompts:

```
Using the context in CLAUDE.md, help me implement [feature].
```

Or paste the content directly when starting a conversation.

### With ChatGPT

Start conversations with project context:

```
I'm working on [project type] with [tech stack].
Here are our conventions: [paste from CLAUDE.md]
```

---

## Customization

### For API Projects

Add to `CLAUDE.md`:
```markdown
## API Design
- RESTful conventions
- Resource naming: plural nouns
- Version prefix: /api/v1
- Response format: { success, data, error }
```

### For Frontend Projects

Add to `.github/copilot-instructions.md`:
```markdown
## Frontend Patterns
- Component structure: Container/Presenter
- State management: [Redux/Context/Zustand]
- Styling: [CSS Modules/Styled Components/Tailwind]
```

### For Data Science Projects

Add to `CLAUDE.md`:
```markdown
## Data Science Conventions
- Notebook structure: [describe sections]
- Visualization library: [matplotlib/plotly/seaborn]
- ML framework: [scikit-learn/PyTorch/TensorFlow]
```

---

## Security Checklist

Before committing, verify:

- [ ] `.env` files in `.gitignore`
- [ ] API keys not hardcoded
- [ ] Credentials excluded
- [ ] Copilot instructions don't contain secrets
- [ ] CLAUDE.md has no sensitive data

---

## Team Usage

### Onboarding New Team Members

1. Clone repository (includes AI config)
2. Install recommended extensions
3. Review `CLAUDE.md` for project context
4. Check `copilot-instructions.md` for conventions

### Keeping Config Current

- Update AI config files in PRs when patterns change
- Review quarterly for outdated instructions
- Document changes in commit messages

---

*AI-Ready Project Setup Template*
