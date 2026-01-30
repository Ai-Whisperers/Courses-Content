# CLAUDE.md - FPUNA AI Education Repository

## Repository Context

**Purpose**: Multi-disciplinary AI education platform for FPUNA (Facultad Politécnica - Universidad Nacional de Asunción) students across 5 tracks: Software Development, Electronics & Automation, Aeronautical Engineering, Marketing & Business Tourism, and Academic Research.

**Status**: Production-ready educational platform with ~95% completion, modular course architecture, shared resources system.

**Cultural Context**: Paraguayan Spanish, MERCOSUR considerations, adapted to local economic reality.

---

## Architecture Overview

### Repository Structure

```
FPUNA-AI-Education/
├── cursos/                          # Course content (5 specialized tracks)
│   ├── 01-produccion/              # QA Automation with AI (complete course)
│   ├── 02-desarrollo/              # FPUNA Verano 2026 (6 tracks)
│   │   └── FPUNA-2026/
│   │       ├── 00-FUNDAMENTOS/     # Universal fundamentals
│   │       ├── 01-DESARROLLO-SOFTWARE/
│   │       ├── 02-ELECTRONICA-AUTOMATIZACION/
│   │       ├── 03-INGENIERIA-AERONAUTICA/
│   │       ├── 04-MARKETING-NEGOCIOS-TURISMO/
│   │       ├── 05-INVESTIGACION-ACADEMICA/
│   │       └── docentes/           # Instructor resources
│   ├── 03-beta/                    # Beta courses
│   └── talleres/                   # Workshops
│
├── .claude/                         # Claude Code configuration (COMPLEX ECOSYSTEM)
│   ├── agents/                     # Specialized AI agents
│   ├── commands/                   # Slash commands
│   ├── hooks/                      # Automation hooks
│   ├── mcp/                        # 19 MCP server configs
│   ├── rules/                      # 6 YAML rule files (3,400+ lines)
│   ├── skills/                     # 100+ skills + 10 new FPUNA skills
│   ├── CLAUDE.md                   # Personal Claude config
│   └── settings.local.json         # Permissions & environment
│
├── _compartido/                     # SHARED resources (since 2026)
│   ├── 00-KITS-DE-INICIO-IA/       # One-step setup kits
│   ├── 02-estandares-y-calidad/    # Linting and testing standards
│   ├── 03-plantillas-de-contexto/  # Project templates
│   └── 04-utilidades-ia/           # MCPs, Skills, configuration guides
│
├── scripts/                         # Utility scripts
│   └── hooks/                      # CI/CD custom hooks (Python)
│
├── docs/                            # Documentation
├── shared/                          # Additional shared resources
├── .pre-commit-config.yaml         # 24 pre-commit hooks
└── README.md                        # Root documentation
```

### Design Patterns

1. **Modular Course Architecture**: Each track is self-contained but shares common resources from `_compartido/`
2. **Starter Kit Pattern**: Every track has a `starter-kit/` with templates and examples
3. **Shared Resources System**: Centralized common resources to avoid duplication
4. **Multi-Provider Support**: Configurations for Claude, Cursor, Copilot, Gemini, Windsurf
5. **Layered Documentation**: README → CLAUDE.md → specific module docs

---

## Technology Stack

### Core Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Language** | Python 3.11 | Primary scripting/testing language |
| **Testing** | pytest | Unit and integration testing |
| **Linting** | flake8, black, isort | Python code quality |
| **Type Checking** | mypy | Static type analysis |
| **Complexity** | radon | Cyclomatic complexity analysis |
| **Security** | bandit | Security vulnerability scanning |
| **CI/CD** | pre-commit, GitHub Actions | Local and remote quality gates |

### AI/ML Stack

| Tool | Purpose |
|------|---------|
| **LangChain** | LLM orchestration and chains |
| **LangGraph** | State-based AI workflows |
| **FastAPI** | API development |
| **Qdrant** | Vector database for RAG |
| **PostgreSQL** | Relational database |
| **Redis** | Caching and rate limiting |

### Infrastructure

| Platform | Use Case |
|----------|----------|
| **AWS** | Primary cloud provider |
| **Databricks** | Data engineering pipelines |
| **Terraform** | Infrastructure as Code |
| **Kubernetes** | Container orchestration |
| **Docker** | Local development |

---

## Naming Conventions

### Files and Directories

| Type | Convention | Example |
|------|-----------|---------|
| **Python files** | snake_case | `check_protected_files.py` |
| **Directories** | UPPER-KEBAB-CASE | `01-DESARROLLO-SOFTWARE/` |
| **Documentation** | UPPERCASE.md | `README.md`, `CLAUDE.md` |
| **Config files** | dotfiles | `.pre-commit-config.yaml` |
| **Scripts** | snake_case | `install-cicd.sh` |
| **Templates** | descriptive names | `project-ai-setup/` |

### Python Code

| Element | Convention | Example |
|---------|-----------|---------|
| **Functions** | snake_case | `check_file_complexity()` |
| **Classes** | PascalCase | `PerformanceAntiPattern` |
| **Constants** | UPPER_SNAKE_CASE | `THRESHOLDS`, `ANTI_PATTERNS` |
| **Variables** | snake_case | `all_issues`, `exit_code` |
| **Private** | _leading_underscore | `_internal_helper()` |
| **Modules** | snake_case | `complexity_guardian.py` |

### TypeScript/JavaScript (when applicable)

| Element | Convention | Example |
|---------|-----------|---------|
| **Files** | kebab-case | `user-service.ts` |
| **Classes** | PascalCase | `UserService` |
| **Functions** | camelCase | `getUserById` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| **Interfaces** | PascalCase with I prefix | `IUserData` |

---

## Code Style Rules

### Python

1. **Formatting**: Use `black` with line length 120
2. **Imports**: Use `isort` for sorting (stdlib → third-party → local)
3. **Type Hints**: Required for all function signatures
4. **Docstrings**: Google-style docstrings
5. **Comments**: Spanish language for FPUNA context

```python
# ✅ CORRECT
from typing import List, Tuple
from pathlib import Path
import sys


def check_file_complexity(filepath: str) -> dict:
    """
    Analyze complexity metrics for a file.

    Args:
        filepath: Path to the Python file to analyze.

    Returns:
        Dictionary containing complexity metrics.
    """
    pass


# ❌ INCORRECT - Missing type hints, wrong import order
import sys
from typing import List
from pathlib import Path

def check_file(filepath):
    """Check file."""
    pass
```

### Import Organization

```python
# 1. Standard library
import sys
import os
from pathlib import Path
from typing import List, Tuple, Dict

# 2. Third-party
from radon.complexity import cc_visit, cc_rank
from radon.metrics import mi_visit, mi_rank

# 3. Local imports
from my_module import helper
```

---

## Anti-Patterns (CRITICAL - NEVER DO)

### Python Anti-Patterns

```python
# ❌ FORBIDDEN - Empty catch block (throws error into the void)
try:
    risky_operation()
except:
    pass

# ❌ FORBIDDEN - Comment-only catch
try:
    send_notification()
except Exception as e:
    # Don't fail if notification fails
    pass

# ❌ FORBIDDEN - Bare except (catches KeyboardInterrupt!)
try:
    operation()
except:
    handle_error()

# ❌ FORBIDDEN - String concatenation in loop (O(n²))
result = ""
for item in items:
    result += item  # Inefficient!

# ❌ FORBIDDEN - Wildcard imports
from module import *  # Never use

# ❌ FORBIDDEN - Mutable default arguments
def bad_function(items=[]):  # ❌ List is shared!
    items.append(1)
    return items

# ❌ FORBIDDEN - Hardcoded credentials
API_KEY = "sk-1234567890abcdef"  # NEVER!

# ❌ FORBIDDEN - range(len()) pattern
for i in range(len(items)):  # Inefficient
    print(items[i])

# ❌ FORBIDDEN - Using .keys() for membership
if key in my_dict.keys():  # Unnecessary method call
    pass

# ✅ CORRECT PATTERNS

# Error handling - Log and rethrow or return structured result
try:
    await critical_operation()
except Exception as e:
    console.error('[Context] Operation failed:', e)
    raise  # Or return structured error

# String building - Use join()
result = "".join(items)

# Explicit imports
from module import specific_function

# Immutable defaults
def good_function(items=None):
    if items is None:
        items = []
    items.append(1)
    return items

# Direct iteration
for item in items:
    print(item)

# Direct dict membership
if key in my_dict:
    pass
```

### Repository Anti-Patterns

1. **Language Mixing**: Inconsistent Spanish/English in documentation
2. **Missing README**: Every module must have README.md
3. **No Test Coverage**: Less than 75% coverage not allowed
4. **God Modules**: Files over 500 lines must be split
5. **Circular Imports**: Poor module organization
6. **Mixed Naming**: Inconsistent conventions within a file
7. **Sensitive Data in Repo**: Credentials, API keys, .env files
8. **Generated Files Committed**: __pycache__, *.pyc, .log files
9. **No Type Hints**: Python 3.11 requires type annotations
10. **Dead Code**: Unused imports, commented code blocks

---

## Execution Flows

### Build Flow

```bash
# 1. Validate repository structure
python scripts/hooks/check_repo_structure.py

# 2. Check protected files
python scripts/hooks/check_protected_files.py <staged-files>

# 3. Check complexity
python scripts/hooks/complexity_guardian.py <python-files>

# 4. Check performance patterns
python scripts/hooks/performance_guardian.py <python-files>

# 5. Check imports
python scripts/hooks/import_guardian.py <python-files>

# 6. Pre-commit hooks (24 total)
pre-commit run --all-files
```

### Test Flow

```bash
# Unit tests
python -m pytest tests/unit/ -v

# Coverage check
python -m pytest --cov=. --cov-report=html --cov-fail-under=75

# Integration tests
python -m pytest tests/integration/ -v

# Security scan
python -m bandit -r . -f json -o bandit-report.json

# Complexity check
python -m radon cc . -a -nc
```

### Deploy Flow (Conceptual)

```bash
# 1. Full validation
./scripts/validate-all.sh

# 2. Build documentation
./scripts/build-docs.sh

# 3. Package for distribution
./scripts/package.sh

# 4. Deploy to learning platform
./scripts/deploy-courses.sh
```

---

## Critical Constraints

### Quality Gates (NON-NEGOTIABLE)

1. **Test Coverage**: Minimum 75% line coverage
2. **Cyclomatic Complexity**: Max 20 per function (rank C), error if >30 (rank D)
3. **File Size**: Maximum 500 source lines per file
4. **Maintainability Index**: Minimum 70 (rank C)
5. **Security**: No bandit high-severity issues
6. **Linting**: Zero flake8 errors (with configured ignores)
7. **Type Safety**: 100% type hint coverage

### Protected Files (NEVER MODIFY DIRECTLY)

```yaml
blocked:
  - .env
  - .env.*
  - *.pem
  - *.key
  - id_rsa*
  - credentials.json
  - secrets.json
  - .claude/settings.local.json
  - package-lock.json
  - yarn.lock
  - poetry.lock
  - Pipfile.lock
  - LICENSE
  - CODE_OF_CONDUCT.md
  - SECURITY.md

restricted:
  - README.md
  - pyproject.toml
  - requirements.txt
  - setup.py
  - .gitignore
  - .github/workflows/*.yml
```

---

## MCP Servers Ecosystem

19 MCP servers configured for enhanced AI capabilities:

| Server | Purpose |
|--------|---------|
| **duckduckgo-search** | Anonymous web search |
| **brave-search** | Privacy-focused search |
| **context7-docs** | Library documentation |
| **postgresql-server** | Database operations |
| **qdrant-server** | Vector database |
| **redis-server** | Caching operations |
| **sqlite-server** | Local database |
| **github-advanced** | GitHub CLI integration |
| **git-server** | Git operations |
| **sequential-thinking** | Step-by-step reasoning |
| **jupyter-server** | Jupyter notebook integration |
| **fetch-server** | Web content fetching |
| **notion-server** | Notion integration |
| **slack-server** | Slack integration |
| **time-server** | Time utilities |
| **memory-server** | Persistent memory |
| **puppeteer-server** | Browser automation |

---

## Skills Ecosystem

10 new FPUNA-specific skills created:

1. **student-onboarding-fpuna** - Student setup guide
2. **student-project-evaluation** - Rubric-based evaluation
3. **course-material-generator** - Content generation
4. **academic-standards-validator** - FPUNA standards validation
5. **project-boilerplate-generator** - Project scaffolding
6. **student-progress-analyzer** - Progress tracking
7. **educational-code-review** - Constructive feedback
8. **testing-patterns-student** - Testing education
9. **technical-documentation-academic** - Documentation standards
10. **dependency-security-management** - Security auditing

---

## CI/CD Hooks (Custom Python)

### check_protected_files.py
- Prevents accidental modification of sensitive files
- Blocks credentials, secrets, generated lock files
- Warns about restricted files

### performance_guardian.py
- Detects performance anti-patterns using AST analysis
- Checks for: string concat in loops, inefficient dict lookups, repeated regex compilation
- Validates against Google/Netflix performance guides

### complexity_guardian.py
- Monitors cyclomatic complexity with radon
- Thresholds: A(5), B(10), C(20), D(30), E(40), F(50+)
- Tracks maintainability index
- Enforces max 500 lines per file

### import_guardian.py
- Detects wildcard imports (forbidden)
- Finds unused imports
- Validates import order (stdlib → third-party → local)

### check_repo_structure.py
- Validates repository organization
- Checks for required files/directories
- Validates .gitignore entries
- Checks Claude configuration

---

## Pre-commit Configuration (24 Hooks)

```yaml
Security:
  - detect-private-key
  - detect-aws-credentials

Quality:
  - trailing-whitespace
  - end-of-file-fixer
  - check-yaml
  - check-json
  - check-toml
  - check-added-large-files (max 5MB)
  - mixed-line-ending
  - check-case-conflict

Python:
  - black (formatting)
  - isort (import sorting)
  - flake8 (linting)
  - mypy (type checking)
  - bandit (security)

Custom:
  - protected-files (custom hook)
  - complexity-guardian (custom hook)
  - performance-guardian (custom hook)
  - import-guardian (custom hook)
  - repo-structure (custom hook)
```

---

## Educational Context

### FPUNA Specifics

- **Institution**: Facultad Politécnica - Universidad Nacional de Asunción
- **Location**: Paraguay
- **Language**: Spanish (Paraguayan context)
- **Academic Standards**: 75% minimum test coverage, conventional commits
- **Cultural Adaptation**: MERCOSUR considerations, local economic context
- **Duration**: 2-week intensive programs

### Track Structure

```
Semana 1: 00-FUNDAMENTOS (Universal)
  - Instalación OpenCode
  - MCP configuration
  - Context engineering
  - Safety & verification

Semana 2: Specialization Tracks
  01-DESARROLLO-SOFTWARE: Microservices, TDD, System Design
  02-ELECTRONICA-AUTOMATIZACION: IoT, Embedded, PCB Design
  03-INGENIERIA-AERONAUTICA: CAD/CAE, Aerodynamics, Optimization
  04-MARKETING-NEGOCIOS-TURISMO: Digital marketing, Analytics
  05-INVESTIGACION-ACADEMICA: Research methods, Paper writing
```

---

## Key Dependencies

```yaml
Core:
  python: 3.11+
  
Quality:
  black: 23.x
  isort: 5.x
  flake8: 6.x
  mypy: 1.x
  
Analysis:
  radon: 6.x
  bandit: 1.x
  
AI/ML:
  langchain: 0.1.x
  langgraph: 0.0.x
  fastapi: 0.100.x
  
Infrastructure:
  docker: Latest
  terraform: 1.6.x
  
Testing:
  pytest: 7.x
  pytest-cov: 4.x
```

---

## Configuration Files

### .pre-commit-config.yaml
Central configuration for all 24 pre-commit hooks including custom Python scripts.

### .claude/settings.local.json
Claude Code permissions and environment variables.

### pyproject.toml (if exists)
Python project configuration for black, isort, pytest.

### .gitignore
Must include:
```
__pycache__/
*.pyc
.env
venv/
*.log
.DS_Store
```

---

## Decision Log

### Why This Architecture?

1. **Modular Design**: Allows independent development of tracks while sharing common resources
2. **Multi-Provider Support**: Students can use their preferred AI tool (Claude, Cursor, Copilot, etc.)
3. **Shared Resources**: Centralized `_compartido/` reduces duplication and maintenance
4. **Strict Quality Gates**: Pre-commit hooks ensure educational content meets professional standards
5. **Cultural Context**: Paraguayan Spanish, local economic considerations built into content

### Why Python for Hooks?

- Native integration with quality tools (radon, bandit, black)
- Strong AST manipulation capabilities for custom checks
- Excellent type hint support for maintainability
- Industry standard for DevOps tooling

### Why 75% Coverage Minimum?

- Balances thoroughness with practical educational timelines
- Industry standard for production code
- Ensures critical paths are tested without being overly burdensome

---

## Common Operations

### Adding a New Course Track

```bash
# 1. Create directory structure
mkdir -p cursos/02-desarrollo/FPUNA-2026/06-NEW-TRACK/{starter-kit,modules,resources}

# 2. Copy template CLAUDE.md
cp cursos/02-desarrollo/FPUNA-2026/01-DESARROLLO-SOFTWARE/starter-kit/CLAUDE.md \
   cursos/02-desarrollo/FPUNA-2026/06-NEW-TRACK/starter-kit/

# 3. Customize for track specifics
# 4. Create README.md with track description
# 5. Run validation
python scripts/hooks/check_repo_structure.py
```

### Adding a New MCP Server

```bash
# 1. Create config in .claude/mcp/
# 2. Follow existing JSON structure
# 3. Add to documentation
# 4. Test connectivity
```

### Adding a New Skill

```bash
# 1. Create in .claude/skills/fpuna-education/
# 2. Follow template structure
# 3. Update skills README
# 4. Test with Claude
```

---

## Troubleshooting

### Pre-commit Hooks Failing

```bash
# Run specific hook with verbose output
pre-commit run complexity-guardian --verbose

# Skip hooks (emergency only - requires team approval)
git commit --no-verify

# Fix auto-fixable issues
pre-commit run --all-files
```

### Import Issues

```bash
# Check import order
python -m isort --check-only .

# Fix import order
python -m isort .
```

### Type Checking Issues

```bash
# Run mypy with detailed output
python -m mypy --show-error-codes .

# Check specific file
python -m mypy scripts/hooks/complexity_guardian.py
```

---

## Contact & Support

- **Technical Support**: soporte-ia@fpuna.edu.py
- **Slack**: fpuna-verano-2026.slack.com
- **Instructor Resources**: `cursos/02-desarrollo/FPUNA-2026/docentes/`

---

## Last Updated

*Generated: January 30, 2026*
*Version: 1.0.0*
*Maintainer: FPUNA AI Education Team*

---

*This CLAUDE.md is a living document. Update it as the repository evolves.*
