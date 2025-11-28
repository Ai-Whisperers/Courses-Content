# QA Automation with AI - Resources

Supplementary materials organized by their relationship to course modules.

---

## Quick Navigation

| Module | Topic | Resources Available |
|--------|-------|---------------------|
| [01](#module-01-introduction) | Introduction to AI-Assisted Development | Configuration Guide, Cheatsheet |
| [02](#module-02-context-engineering) | Context Engineering | Configuration Guide (primary) |
| [03](#module-03-private-repos) | Accessing Private Repositories | Workflow Example (primary) |
| [04](#module-04-documentation) | Generating Documentation | Prompt Library, Workflow Example |
| [05](#module-05-test-planning) | Creating Test Plans | Prompt Library |
| [06](#module-06-test-implementation) | Implementing Tests | Prompt Library, Workflow Example |
| [07](#module-07-validation) | Test Validation & QA | Prompt Library |
| [08](#module-08-agentic-patterns) | Agentic Patterns | Advanced Features Guide (primary) |
| [09](#module-09-cicd) | CI/CD Integration | Prompt Library |
| [10](#module-10-final-project) | Final Project | All resources |
| [11](#module-11-docker) | Infrastructure with Docker | *No dedicated resources* |
| [12](#module-12-playwright) | Advanced Playwright | *Limited resources* |

---

## Resources by Module

### Module 01: Introduction
**Topic:** Introduction to AI-Assisted Development

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [ai-tools-configuration-guide.md](by-module/module-02-context-engineering/ai-tools-configuration-guide.md) | Setup & Installation | Claude Code overview, Quick Comparison |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | Installation Commands, Essential Commands |
| [glossary.md](common/glossary.md) | Terminology | All AI/Testing terms |

---

### Module 02: Context Engineering
**Topic:** Context Engineering - CLAUDE.md, prompting, project configuration

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [ai-tools-configuration-guide.md](by-module/module-02-context-engineering/ai-tools-configuration-guide.md) | **PRIMARY** | CLAUDE.md templates, Settings files, Permission rules, Context files for all tools |
| [Prompt Library](../prompts/README.md) | Prompting Patterns | Quick Reference patterns |

**Key Topics Covered:**
- CLAUDE.md structure and examples
- Settings.json configuration
- Permission rules (allow/ask/deny)
- Model selection
- Context file organization

---

### Module 03: Private Repos
**Topic:** Accessing Private Repositories with AI

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](by-module/module-03-private-repos/EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md) | **PRIMARY** | Complete 8-phase workflow, GitHub CLI setup, Authentication, Codebase exploration |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | Authentication commands, GitHub CLI |
| [troubleshooting-guide.md](common/troubleshooting-guide.md) | Problem Solving | GitHub CLI Issues, Authentication Problems |

**Key Topics Covered:**
- GitHub CLI installation and authentication
- Organization access configuration
- Clone and explore workflows
- AI-assisted codebase analysis
- Complete session transcript example

---

### Module 04: Documentation
**Topic:** Generating Complete Code Documentation

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [Prompt Library](../prompts/README.md) | **PRIMARY** | Generate Architecture Documentation, Generate API Documentation, Generate Test Documentation |
| [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](by-module/module-03-private-repos/EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md) | Workflow Example | Phase 4: Generate Documentation |

**Key Topics Covered:**
- Architecture documentation prompts
- API reference generation
- Setup guide creation
- Test documentation

---

### Module 05: Test Planning
**Topic:** Creating Test Plans with AI

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [Prompt Library](../prompts/README.md) | **PRIMARY** | Generate Comprehensive Test Plan, Generate Test Coverage Matrix, Identify Test Gaps |
| [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](by-module/module-03-private-repos/EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md) | Workflow Example | Phase 5: Create Test Plan |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | Test Plan Generation prompts |

**Key Topics Covered:**
- Test plan structure and format
- Coverage matrix generation
- Gap identification
- Risk-based prioritization

---

### Module 06: Test Implementation
**Topic:** Implementing Tests with AI

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [Prompt Library](../prompts/README.md) | **PRIMARY** | Generate Unit Tests, Generate Integration Tests, Generate E2E Tests, Generate Test Data Factories |
| [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](by-module/module-03-private-repos/EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md) | Workflow Example | Phase 6: Implement Tests |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | Jest/Playwright assertions, Test patterns |
| [glossary.md](common/glossary.md) | Terminology | AAA Pattern, Mocks, Fixtures, etc. |

**Key Topics Covered:**
- Unit test generation with mocks
- Integration test patterns
- E2E test with Page Object Model
- Test data factories
- Framework-specific examples (Jest, pytest, Playwright)

---

### Module 07: Validation
**Topic:** Test Validation and Quality Assurance

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [Prompt Library](../prompts/README.md) | **PRIMARY** | Review Generated Tests, Debug Failing Test, Fix Flaky Test, Improve Test Coverage |
| [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](by-module/module-03-private-repos/EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md) | Workflow Example | Phase 7: Validate and Refine |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | Test Quality Checklist |
| [troubleshooting-guide.md](common/troubleshooting-guide.md) | Problem Solving | Testing Issues, Flaky Tests |

**Key Topics Covered:**
- Test quality review criteria
- Debugging failing tests
- Fixing flaky tests
- Coverage improvement strategies

---

### Module 08: Agentic Patterns
**Topic:** Applying Agentic Patterns to Testing

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [ai-tools-advanced-features.md](by-module/module-08-agentic-patterns/ai-tools-advanced-features.md) | **PRIMARY** | Skills, Plugins, Hooks, Custom Commands, Custom Agents, MCP Servers |
| [AI-CAPABILITIES-ANALYSIS.md](reference/AI-CAPABILITIES-ANALYSIS.md) | Background | 20 Agentic Design Patterns |

**Key Topics Covered:**
- Claude Code Skills creation
- Hooks for workflow automation
- Custom slash commands
- Custom agents definition
- MCP server configuration
- Checkpoints and rewind
- Context management advanced

---

### Module 09: CI/CD
**Topic:** CI/CD Integration

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [Prompt Library](../prompts/README.md) | **PRIMARY** | Generate GitHub Actions Workflow, Generate Test Report |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | GitHub Actions Test Workflow |
| [troubleshooting-guide.md](common/troubleshooting-guide.md) | Problem Solving | CI/CD Issues, Pipeline Failures |

**Key Topics Covered:**
- GitHub Actions workflow generation
- Test report formatting
- Matrix builds
- Caching strategies
- Quality gates

---

### Module 10: Final Project
**Topic:** Comprehensive Capstone Project

**All resources are relevant:**

| Resource | Use In Project |
|----------|----------------|
| [ai-tools-configuration-guide.md](by-module/module-02-context-engineering/ai-tools-configuration-guide.md) | CLAUDE.md setup |
| [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](by-module/module-03-private-repos/EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md) | Complete workflow template |
| [ai-tools-advanced-features.md](by-module/module-08-agentic-patterns/ai-tools-advanced-features.md) | Advanced techniques |
| [Prompt Library](../prompts/README.md) | All prompts |
| [cheatsheet.md](common/cheatsheet.md) | Quick reference |
| [glossary.md](common/glossary.md) | Terminology |
| [troubleshooting-guide.md](common/troubleshooting-guide.md) | Problem solving |

---

### Module 11: Docker
**Topic:** Infrastructure with Docker

> **Note:** No dedicated resources currently available for this module.

**Suggested resources from other modules:**
- [AI-CAPABILITIES-ANALYSIS.md](reference/AI-CAPABILITIES-ANALYSIS.md) - DevOps & Infrastructure section

---

### Module 12: Playwright
**Topic:** Advanced Playwright

> **Note:** Limited dedicated resources for advanced topics.

| Resource | Relevance | Key Sections |
|----------|-----------|--------------|
| [Prompt Library](../prompts/README.md) | Partial | Generate E2E Tests (Playwright) |
| [cheatsheet.md](common/cheatsheet.md) | Quick Reference | Playwright Assertions |

---

## Resource Categories

### By Module (Primary Resources)
Module-specific supplementary materials:

```
by-module/
├── module-02-context-engineering/
│   └── ai-tools-configuration-guide.md
├── module-03-private-repos/
│   └── EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md
└── module-08-agentic-patterns/
    └── ai-tools-advanced-features.md
```

### Common Resources
Materials useful throughout the course:

| Resource | Description |
|----------|-------------|
| [cheatsheet.md](common/cheatsheet.md) | Commands, assertions, quick fixes |
| [glossary.md](common/glossary.md) | Key terms and definitions |
| [troubleshooting-guide.md](common/troubleshooting-guide.md) | Common issues and solutions |

### Reference Materials
Background documents:

| Resource | Description |
|----------|-------------|
| [AI-CAPABILITIES-ANALYSIS.md](reference/AI-CAPABILITIES-ANALYSIS.md) | AI tools, patterns, and capabilities analysis |

### Instructor Materials
Course development (not student-facing):

| Resource | Description |
|----------|-------------|
| [COURSE-CREATION-FRAMEWORK.md](instructor/COURSE-CREATION-FRAMEWORK.md) | Course development framework |

---

## Also See

- [Prompt Library](../prompts/README.md) - Tested prompts for all QA automation tasks
- [Presentation Templates](../presentation-templates/) - Slide deck templates
- [Assessments](../assessments/) - Quizzes and evaluations
- [Examples](../examples/) - Code examples and templates

---

## Coverage Summary

| Coverage Level | Modules |
|----------------|---------|
| **Excellent** | 02, 03, 08, 10 |
| **Good** | 04, 05, 06, 07, 09 |
| **Partial** | 01, 12 |
| **Gaps** | 11 |

---

*Keep these resources handy as you progress through the course!*
