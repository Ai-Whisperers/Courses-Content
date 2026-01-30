# COMPARTIDO - Source of Truth for Track Standards

**Analysis Date**: 2026-01-29
**Path**: `/cursos/02-desarrollo/FPUNA-2026/COMPARTIDO/`

---

## Structure Overview

```
COMPARTIDO/
├── hooks-reglas/           # Automation and code standards
├── instalacion-opencode/   # Installation guides (Windows/Mac/Linux)
├── sistema-skills/         # Reusable task templates
├── configuracion-mcp/      # Third-party integrations
└── plantillas-proyecto/    # Project structure templates
```

---

## 1. Hooks & Rules System (hooks-reglas/)

### Hooks - Automated Triggers
| Event | Purpose | Example |
|-------|---------|---------|
| pre-generate | Verify environment | Check git branch |
| post-generate | Format/lint code | Run prettier, ESLint |
| pre-commit | Quality gates | Run tests |
| post-commit | Notifications | Push, notify team |

### Rules - Code Standards
- **Code Style**: camelCase, line limits, ES6+
- **Documentation**: JSDoc in Spanish, comments for complex logic
- **Testing**: 80% coverage minimum, Jest/Pytest
- **Security**: No hardcoded secrets, input validation
- **FPUNA**: Student headers in all files

### Config Location
- Windows: `%USERPROFILE%\.opencode\hooks-rules.yaml`
- macOS/Linux: `~/.opencode/hooks-rules.yaml`

---

## 2. OpenCode Installation (instalacion-opencode/)

### Requirements
- Node.js 18+, npm 9+
- 4GB RAM minimum (8GB recommended)
- Internet connection (5 Mbps minimum)

### Platform Guides
- `windows.md` - PowerShell-based installation
- `mac.md` - Homebrew-based installation
- `linux.md` - apt/curl-based installation
- `troubleshooting.md` - Common issues

### API Key Setup
- Obtain from: https://console.anthropic.com/
- Set as environment variable: `ANTHROPIC_API_KEY`

---

## 3. Skills System (sistema-skills/)

### Definition
Skills = Predefined templates/workflows that automate common tasks

### Categories
| Category | Examples |
|----------|----------|
| Development | init-nodejs-project, create-rest-api |
| Testing | generate-unit-tests, add-test-coverage |
| Documentation | generate-readme, generate-api-docs |
| CI/CD | setup-github-actions, setup-docker |

### Usage
```bash
claude skills list
claude skill use create-rest-api --resource=products
claude skill install ./custom-skill.yaml
```

### By Discipline
- **Software**: create-rest-api, setup-database
- **Electronics**: init-arduino-project, setup-mqtt-client
- **Research**: init-research-project, create-latex-paper
- **Marketing**: setup-analytics, create-landing-page

---

## 4. MCP Configuration (configuracion-mcp/)

### Definition
MCP (Model Context Protocol) = Plugins extending OpenCode capabilities

### Essential MCPs
| MCP | Purpose |
|-----|---------|
| server-filesystem | Local file operations |
| server-git | Version control |
| server-github | GitHub API integration |

### By Discipline
- **Electronics**: server-serial, server-mqtt, server-gpio
- **Research**: server-python, server-jupyter, server-zotero
- **Marketing**: server-google-analytics, server-twitter

### Config Location
- Windows: `%USERPROFILE%\.opencode\mcp-config.json`
- macOS/Linux: `~/.opencode/mcp-config.json`

---

## 5. Project Templates (plantillas-proyecto/)

### Available Templates
| Template | Use Case | Complexity |
|----------|----------|------------|
| basic-project | Class assignments, learning | Minimal |
| full-project | Thesis, portfolio | Professional |

### Standard Structure
```
project/
├── README.md
├── src/
├── tests/
├── docs/
├── config/
└── scripts/
```

---

## Universal Standards (All Tracks)

### 1. Documentation Language
- ALL documentation in Spanish
- Comments in Spanish
- Variable names in Spanish when appropriate

### 2. Required Files
- README.md at root (always)
- .gitignore configured
- LICENSE file

### 3. Code Quality
- 80% test coverage minimum
- No hardcoded secrets
- Input validation on boundaries

### 4. File Headers (FPUNA)
```javascript
/*
 * File: filename.js
 * Project: [Project Name]
 * Student: [Student Name]
 * Carnet: [Student ID]
 * Course: FPUNA Summer 2026
 */
```

### 5. Git Practices
- Meaningful commit messages
- Regular commits (not one massive commit)
- Clean history

---

## Compliance Checklist for Tracks

- [ ] References COMPARTIDO installation guides
- [ ] Uses standard project template
- [ ] Follows Spanish documentation standard
- [ ] Includes CLAUDE.md template
- [ ] Has rubric aligned with COMPARTIDO standards
- [ ] Mentions hooks/rules configuration
- [ ] Links to MCP setup guides

---

*Generated from deep analysis of COMPARTIDO directory*
