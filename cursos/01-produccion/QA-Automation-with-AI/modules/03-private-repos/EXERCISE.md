# Exercise 3: Private Repository Exploration

## Objective

Practice accessing and analyzing private repositories using AI assistance.

## Duration: 1.5 hours

---

## Prerequisites

- GitHub CLI installed
- Authenticated with `gh auth login`
- Access to organization repositories

---

## Part 1: Repository Discovery (20 min)

### Task

Explore an organization's repositories and identify testing opportunities.

### Steps

1. List all repositories:
   ```bash
   gh repo list YOUR-ORG --limit 50
   ```

2. Use Claude to analyze the list:
   ```
   Here are the repositories in our organization:
   [paste list]

   Analyze and categorize them by:
   1. Primary language
   2. Likely purpose (API, frontend, library, tool)
   3. Testing priority (high/medium/low based on repo name/description)

   Recommend which 3 repos would benefit most from improved test coverage.
   ```

### Deliverable

- Categorized repository list
- Top 3 recommendations with justification

---

## Part 2: Repository Deep Dive (30 min)

### Task

Clone and analyze a selected repository.

### Steps

1. Clone the repository:
   ```bash
   gh repo clone YOUR-ORG/repo-name
   cd repo-name
   ```

2. Explore structure with Claude:
   ```
   Analyze this repository structure and explain:
   1. Overall architecture
   2. Entry points
   3. Key modules/components
   4. Current test coverage (if any)
   5. Testing gaps

   Use: find . -type f -name "*.js" -o -name "*.ts" -o -name "*.py" | head -50
   ```

3. Identify test files:
   ```bash
   find . -type f -name "*.test.*" -o -name "*.spec.*" -o -name "*_test.*"
   ```

### Deliverable

- Repository analysis document
- List of existing tests
- Identified testing gaps

---

## Part 3: CLAUDE.md Creation (25 min)

### Task

Create a project-specific CLAUDE.md for the repository.

### Prompt

```
Based on the repository analysis, create a CLAUDE.md file that includes:

1. Project Overview
   - Purpose and main features
   - Tech stack (from package.json/requirements.txt)

2. Architecture
   - Key directories and their purposes
   - Main entry points
   - Data flow

3. Testing
   - Current framework (if any)
   - Coverage targets
   - Conventions to follow

4. Commands
   - How to install dependencies
   - How to run tests
   - How to build/start

5. Important Patterns
   - Code style preferences
   - Error handling patterns
   - Naming conventions
```

### Deliverable

- Complete CLAUDE.md file for the repository

---

## Part 4: Test Plan Draft (15 min)

### Task

Create a high-level test plan for the repository.

### Prompt

```
Based on the repository analysis and CLAUDE.md, create a test plan outline:

1. Critical paths to test (P0)
2. Important features to test (P1)
3. Nice-to-have tests (P2)
4. Recommended test types for each area
5. Estimated effort (hours)

Focus on maximum value with minimum effort.
```

### Deliverable

- Test plan outline with priorities

---

## Submission

### Files

- `repository-analysis.md` - Categorized repo list and recommendations
- `repo-name/CLAUDE.md` - Project context file
- `test-plan-outline.md` - Prioritized test plan

### Grading

| Criterion | Points |
|-----------|--------|
| Repository analysis quality | 25 |
| CLAUDE.md completeness | 35 |
| Test plan prioritization | 25 |
| Use of AI prompts | 15 |

---

## Tips

- Use `gh api` for additional repository metadata
- Check for existing CI/CD configurations
- Look at recent commits to understand active areas
- Check issues/PRs for known bugs (testing opportunities)

---

*Good luck!*
