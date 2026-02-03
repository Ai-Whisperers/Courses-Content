# Claude Code User Memory

This is your personal Claude Code configuration. These instructions apply to all projects.

---

## ⛔ CRITICAL: Error Handling Philosophy

**NEVER silently swallow errors.** This is the #1 code quality rule.

```typescript
// ❌ FORBIDDEN - "Throw it in the ocean and hope it floats"
try { await operation(); } catch (error) { /* silently fail */ }
try { await operation(); } catch (error) { return null; }

// ✅ REQUIRED - Acknowledge every error
try { await operation(); } catch (error) {
  console.error('[Context] Operation failed:', error);
  throw error; // OR return { success: false, error: message }
}
```

See `.claude/rules/error-handling.md` for complete guidelines.

---

## Development Environment

- **Platform**: Windows 11
- **Primary Languages**: Python 3.11
- **Key Frameworks**: LangChain, LangGraph, FastAPI, Databricks
- **Databases**: PostgreSQL, Redis, Qdrant (vector DB)
- **Cloud**: AWS, Terraform, Kubernetes
- **IDE**: VS Code with Claude Code integration

## Code Style Preferences

### Python
- Use `black` for formatting (line length 120)
- Use `isort` for import sorting
- Use `flake8` for linting with these ignored rules: F403, F405, F821, E501, E722, W503
- Use `mypy` for type checking
- Max line length: 120 characters
- Use type hints for all function signatures
- Google-style docstrings

### Testing
- Use `pytest` for all tests
- Run tests automatically after modifying test files
- Follow patterns: `test_*.py` or `*_test.py`
- Target meaningful coverage, not 100%

## Databricks Workflows

When working with Databricks:
1. Always validate bundles before deployment: `databricks bundle validate -t local_development`
2. Run unit tests before deploying: `python tests/run_unit_tests.py`
3. Check pipeline complexity with: `python tests/deployment/count_lines_per_directory.py --dir solutions`
4. Deploy to dev first, verify, then promote to prod

## Git Workflow

- Write meaningful commit messages focusing on "why" not "what"
- Run linting before committing
- Include tests for new features
- Never force push to main/master
- Use conventional commits when appropriate

## Project Directories

- Main work directory: `C:\Users\Alejandro\Work\Data-Platform--Keyera`
- LangChain project: `C:\Users\Alejandro\Documents\Ivan\Work\Lang ai`

## Custom Agents Available

Use `@agent-name` to invoke specialized agents:

### Development Agents
- `@code-reviewer` - Thorough code review with checklist
- `@debugger` - Systematic debugging methodology
- `@test-writer` - Generate comprehensive pytest tests
- `@refactorer` - Safe code refactoring with verification
- `@documenter` - Generate documentation (Google-style)

### Cloud & Infrastructure Agents
- `@cloud-architect` - Design cloud architecture (AWS/Azure/GCP)
- `@security-auditor` - Deep security analysis and compliance
- `@devops-engineer` - CI/CD, Terraform, Kubernetes
- `@performance-optimizer` - Performance tuning and cost optimization

## Slash Commands

### Databricks & Deployment
- `/databricks-status` - Check bundle validation and workspace
- `/deploy-dev` - Deploy to dev environment
- `/check-pipelines` - Analyze pipeline complexity

### Code Quality
- `/lint [files]` - Run flake8 linting
- `/format [files]` - Format with black/isort
- `/typecheck [files]` - Run mypy type checking
- `/complexity-check [dir]` - Radon cyclomatic complexity

### Testing
- `/run-tests` - Execute unit tests
- `/coverage [dir]` - Run pytest with coverage report
- `/profile [file]` - Profile Python code performance

### Git & Documentation
- `/git-status` - Comprehensive git overview
- `/pr-review [base]` - Prepare PR review
- `/changelog [since]` - Generate changelog from commits

### Security & Maintenance
- `/security-scan [dir]` - Run bandit security scan
- `/deps` - Check outdated/vulnerable dependencies
- `/clean` - Remove cache and build artifacts
- `/todo-scan [dir]` - Find TODO/FIXME comments
- `/api-docs` - Generate FastAPI documentation

## Skills (Complex Workflows)

Skills are auto-discovered templates for common patterns:

### Application Development
- `fastapi-endpoint` - Create endpoint with tests
- `langchain-agent` - Build LangChain/LangGraph agent
- `pytest-suite` - Create comprehensive test suite

### Data Engineering
- `databricks-pipeline` - Create DLT pipeline (bronze/silver/gold)
- `airflow-dag` - Create Airflow DAGs for orchestration
- `postgres-migration` - Database migrations with Alembic

### Cloud & Infrastructure
- `aws-lambda` - Serverless Lambda with API Gateway
- `terraform-module` - Infrastructure as Code modules
- `kubernetes-deployment` - K8s deployments, services, ingress
- `github-actions` - CI/CD pipelines
- `docker-setup` - Dockerize Python projects

### Databases & Caching
- `redis-cache` - Caching patterns and rate limiting
- `qdrant-vector` - Vector search and RAG integration

## Output Styles

Change response style with `/output-style`:
- `concise` - Brief, code-first responses
- `detailed` - Thorough with alternatives
- `teaching` - Educational with explanations
- `senior-dev` - Peer-level technical discussion
- `review` - Code review style feedback

## MCP Servers

Configured MCP servers:
- `filesystem` - File operations in work directories
- `memory` - Persistent memory across sessions
- `sequential-thinking` - Step-by-step reasoning

## Hooks (Automated Actions)

Active hooks:
- **SessionStart**: Shows project name and git branch
- **PreToolUse**: Blocks edits to sensitive files (.env, credentials)
- **PostToolUse**: Logs modified files
- **UserPromptSubmit**: Adds project context
- **Stop**: Quality gate - verifies completeness before stopping
- **Notification**: Handles idle prompts

## Rules (Path-Scoped)

Context-aware rules automatically applied based on file patterns:

### Error Handling (CRITICAL - All Code)
- `**/*.ts, **/*.tsx, **/*.js, **/*.jsx, **/*.py` - **Error handling rules**
  - ⛔ NEVER use empty catch blocks
  - ⛔ NEVER use comment-only catch blocks
  - ✅ ALWAYS log errors with context
  - ✅ ALWAYS use structured error results OR rethrow
  - See `.claude/rules/error-handling.md` for complete guidelines

### Development
- `**/*.py` - Python style guide
- `**/api/**` - FastAPI conventions
- `**/langchain/**` - LangChain best practices

### Data & Databases
- `**/databricks.yml` - Databricks workflow rules
- `**/*.sql, **/migrations/**` - PostgreSQL best practices
- `**/redis/**, **/*cache*.py` - Redis caching patterns
- `**/qdrant/**, **/vector/**` - Qdrant vector DB rules

### Cloud & Infrastructure
- `**/*.tf` - Terraform IaC conventions
- `**/*.yaml (k8s)` - Kubernetes best practices
- `**/template.yaml` - AWS SAM/CloudFormation rules
- `**/.github/workflows/**` - CI/CD standards
- `**/docker-compose.yml` - Docker Compose patterns

### Security
- All files - Security reminders (no secrets, validate inputs)

## Security Reminders

- NEVER commit credentials, API keys, or secrets
- Environment variables for sensitive config
- Protected files: .env, .pem, .key, credentials
- Run `pip-audit` regularly for vulnerabilities
- PreToolUse hook blocks edits to sensitive files
- Follow OWASP Top 10 guidelines

## Personal Preferences

- Prefer concise explanations over verbose ones
- Show code examples when explaining concepts
- Use thinking mode for complex problems
- Break down large tasks into smaller steps
- Use Todo list for multi-step tasks