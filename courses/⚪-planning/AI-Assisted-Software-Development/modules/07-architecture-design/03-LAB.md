# Module 7: Lab
## Security & Best Practices - Hands-On Project

---

## Lab Overview

| Attribute | Details |
|-----------|---------|
| **Duration** | 45 minutes |
| **Difficulty** | Advanced |
| **Prerequisites** | Modules 1-6 completed |
| **Tools** | VS Code, GitHub Copilot, Security scanners |

---

## Objective

Configure a secure development environment for AI-assisted coding, implement security scanning in CI/CD, and create team guidelines.

---

## Part 1: Secure Configuration (15 minutes)

### Task 1.1: Configure Copilot Exclusions

Create file exclusion rules to prevent sensitive data from being sent to AI tools.

**Step 1:** Create `.github/copilot-ignore` file:

```gitignore
# Copilot Ignore Configuration
# Files matching these patterns will not be used as context

# Environment and secrets
.env
.env.*
*.env
.secrets
secrets/
credentials/

# Configuration with potential secrets
config/production.*
config/secrets.*
**/appsettings.Production.json

# Security-sensitive directories
**/certs/
**/keys/
**/.ssh/

# Database files
*.sql
**/migrations/*.sql
**/seeds/*.sql

# Logs (may contain sensitive data)
*.log
logs/

# Customer data
**/data/customers/
**/exports/

# Documentation with internal details
**/internal-docs/
ARCHITECTURE.md
SECURITY.md
```

**Step 2:** Configure VS Code settings:

Create `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "yaml": true,
    "json": true
  },
  "github.copilot.advanced": {
    "debug.overrideChatEngine": false,
    "listCount": 3
  },
  "editor.inlineSuggest.showToolbar": "onHover",
  "files.exclude": {
    "**/.env*": true,
    "**/secrets/**": true
  }
}
```

### Deliverable 1.1
- Configured `.github/copilot-ignore`
- Configured VS Code settings
- Screenshot of settings applied

### Task 1.2: Set Up Pre-Commit Hooks

Install and configure pre-commit hooks to catch security issues before code is committed.

**Step 1:** Install pre-commit:

```bash
npm install -D husky lint-staged
npx husky init
```

**Step 2:** Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "Running pre-commit checks..."

# Check for secrets
npx secretlint "**/*"

# Run security linting
npm run lint:security

# Run tests
npm test -- --passWithNoTests

echo "Pre-commit checks passed!"
```

**Step 3:** Create `secretlint.config.js`:

```javascript
module.exports = {
  rules: [
    {
      id: "@secretlint/secretlint-rule-preset-recommend",
      rules: [
        {
          id: "@secretlint/secretlint-rule-aws",
          allowMessageIds: []
        },
        {
          id: "@secretlint/secretlint-rule-gcp",
          allowMessageIds: []
        },
        {
          id: "@secretlint/secretlint-rule-privatekey",
          allowMessageIds: []
        },
        {
          id: "@secretlint/secretlint-rule-basicauth",
          allowMessageIds: []
        }
      ]
    }
  ]
};
```

**Step 4:** Add package.json scripts:

```json
{
  "scripts": {
    "lint:security": "eslint --ext .js,.ts . --config .eslintrc.security.js",
    "secretlint": "secretlint \"**/*\"",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "npm run lint:security"
    ],
    "*": [
      "secretlint"
    ]
  }
}
```

### Deliverable 1.2
- Configured pre-commit hooks
- Working secretlint setup
- Test with intentional secret (then remove)

---

## Part 2: Security Scanning Pipeline (15 minutes)

### Task 2.1: Create Security Scan Workflow

Create a GitHub Actions workflow for security scanning.

**Create `.github/workflows/security-scan.yml`:**

```yaml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  secret-scan:
    name: Secret Detection
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Detect secrets with Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  dependency-scan:
    name: Dependency Vulnerabilities
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=high

      - name: Run Snyk test
        uses: snyk/actions/node@master
        continue-on-error: true
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  sast-scan:
    name: Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/owasp-top-ten
            p/nodejs
            p/typescript

      - name: Run ESLint Security
        run: |
          npm ci
          npm run lint:security

  code-quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  report:
    name: Security Report
    needs: [secret-scan, dependency-scan, sast-scan]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Generate Report
        run: |
          echo "# Security Scan Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "| Check | Status |" >> $GITHUB_STEP_SUMMARY
          echo "|-------|--------|" >> $GITHUB_STEP_SUMMARY
          echo "| Secret Detection | ${{ needs.secret-scan.result }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Dependency Scan | ${{ needs.dependency-scan.result }} |" >> $GITHUB_STEP_SUMMARY
          echo "| SAST | ${{ needs.sast-scan.result }} |" >> $GITHUB_STEP_SUMMARY
```

### Deliverable 2.1
- Working GitHub Actions workflow
- All scans running successfully
- Screenshot of workflow results

### Task 2.2: Create Custom Semgrep Rules

Create custom rules for AI-generated code patterns.

**Create `.semgrep/ai-code-rules.yml`:**

```yaml
rules:
  - id: hardcoded-jwt-secret
    patterns:
      - pattern-either:
          - pattern: jwt.sign($PAYLOAD, "...")
          - pattern: jwt.verify($TOKEN, "...")
          - pattern: |
              const $SECRET = "..."
              ...
              jwt.sign($PAYLOAD, $SECRET)
    message: "Hardcoded JWT secret detected. Use environment variables."
    severity: ERROR
    languages: [javascript, typescript]
    metadata:
      category: security
      cwe: "CWE-798: Use of Hard-coded Credentials"
      ai-generated: common

  - id: sql-string-concatenation
    patterns:
      - pattern-either:
          - pattern: |
              $QUERY = `SELECT ... ${$VAR} ...`
          - pattern: |
              $QUERY = "SELECT ..." + $VAR + "..."
    message: "SQL query using string concatenation. Use parameterized queries."
    severity: ERROR
    languages: [javascript, typescript]
    metadata:
      category: security
      cwe: "CWE-89: SQL Injection"
      ai-generated: common

  - id: missing-input-validation
    patterns:
      - pattern: |
          app.$METHOD($PATH, ($REQ, $RES) => {
            const { ... } = $REQ.body;
            ...
          })
      - pattern-not: |
          app.$METHOD($PATH, ($REQ, $RES) => {
            ...
            validate(...)
            ...
          })
    message: "Request handler without input validation."
    severity: WARNING
    languages: [javascript, typescript]
    metadata:
      category: security
      ai-generated: common

  - id: error-message-exposure
    patterns:
      - pattern-either:
          - pattern: res.send($ERR.message)
          - pattern: res.json({ error: $ERR.message })
          - pattern: res.status(...).send($ERR.stack)
    message: "Error details exposed to client. Use generic error messages."
    severity: WARNING
    languages: [javascript, typescript]
    metadata:
      category: security
      cwe: "CWE-209: Information Exposure Through Error Message"

  - id: insecure-random-id
    patterns:
      - pattern-either:
          - pattern: Math.random().toString(...)
          - pattern: Date.now().toString()
    message: "Insecure random ID generation. Use crypto.randomUUID() or uuid package."
    severity: WARNING
    languages: [javascript, typescript]
    metadata:
      category: security
      ai-generated: very-common
```

### Deliverable 2.2
- Custom Semgrep rules file
- Test rules against sample code
- Document any findings

---

## Part 3: Team AI Usage Policy (15 minutes)

### Task 3.1: Create Comprehensive Policy

Create a complete AI coding tool policy for your team.

**Create `docs/AI-USAGE-POLICY.md`:**

```markdown
# AI Coding Tool Usage Policy

**Version:** 1.0
**Effective Date:** [Date]
**Last Review:** [Date]
**Owner:** Engineering Leadership

---

## 1. Purpose

This policy establishes guidelines for the responsible use of AI coding
assistants to maximize productivity while protecting sensitive information
and maintaining code quality.

## 2. Scope

This policy applies to all developers, contractors, and third parties who
write code for [Company Name] products and services.

### Covered Tools
- GitHub Copilot (Business tier)
- Claude (via Anthropic API)
- ChatGPT (Enterprise)
- Cursor IDE

## 3. Approved Use Cases

### Allowed
- Code completion and suggestions
- Test generation
- Documentation writing
- Code refactoring
- Learning and exploration
- Debugging assistance

### Requires Approval
- Security-critical code generation
- Database schema design
- API contract generation
- Infrastructure as Code

### Prohibited
- Processing customer data
- Processing credentials or secrets
- Generating compliance-related code without review
- Using non-approved AI tools

## 4. Data Classification

| Classification | AI Tool Usage | Examples |
|---------------|---------------|----------|
| Public | Allowed | Open source, docs |
| Internal | Allowed with caution | Non-sensitive code |
| Confidential | Not allowed | Customer data, secrets |
| Restricted | Never allowed | PII, PHI, credentials |

## 5. Security Requirements

### Before Using AI Tools
- [ ] Remove all secrets and credentials
- [ ] Anonymize any personal data
- [ ] Use placeholder values
- [ ] Check for proprietary algorithms

### After Receiving AI Suggestions
- [ ] Review for security vulnerabilities
- [ ] Check for hardcoded values
- [ ] Verify input validation
- [ ] Ensure proper error handling

## 6. Code Review Requirements

All AI-generated code MUST:

1. Pass automated security scans
2. Include appropriate tests
3. Be reviewed by a human developer
4. Follow project coding standards
5. Have associated documentation

### Enhanced Review for AI Code
- [ ] Developer understands all generated code
- [ ] No copy-paste without verification
- [ ] Edge cases are tested
- [ ] Security implications considered

## 7. Documentation Requirements

When using significant AI assistance:

1. Note in commit message: `AI-assisted: [tool used]`
2. Document complex logic explanation
3. Record any manual modifications made

## 8. Training Requirements

Before using AI coding tools, developers must:

1. Complete AI Security Awareness training
2. Read and acknowledge this policy
3. Pass the AI Usage Assessment
4. Attend quarterly refresher sessions

## 9. Monitoring and Compliance

### What We Monitor
- AI tool usage patterns
- Security scan results
- Code review feedback
- Incident reports

### Compliance Violations

| Severity | Example | Action |
|----------|---------|--------|
| Low | Missing documentation | Warning |
| Medium | Skipped security scan | Training |
| High | Secrets in prompts | Review + Training |
| Critical | Data breach | Immediate escalation |

## 10. Incident Reporting

Report any AI-related security concerns to:
- Security Team: security@company.com
- Slack: #security-incidents

## 11. Policy Review

This policy is reviewed:
- Quarterly by Engineering Leadership
- After any security incident
- When new AI tools are introduced

## 12. Acknowledgment

By using AI coding tools, you acknowledge that you have read, understood,
and agree to comply with this policy.

---

**Approved by:**
- CTO: _________________ Date: _______
- CISO: ________________ Date: _______
- Engineering Lead: _____ Date: _______
```

### Deliverable 3.1
Complete policy document customized for your organization.

### Task 3.2: Create Quick Reference Card

Create a one-page quick reference for developers.

**Create `docs/AI-QUICK-REFERENCE.md`:**

```markdown
# AI Coding Tool Quick Reference

## ✅ DO

- Use approved tools only (Copilot Business, Claude)
- Review all generated code before committing
- Use placeholder values for sensitive data
- Run security scans on AI code
- Document AI assistance in commits

## ❌ DON'T

- Paste credentials, API keys, or secrets
- Include customer data in prompts
- Accept code you don't understand
- Skip code review for AI code
- Use personal AI tool accounts

## 🔒 Before Prompting

```
Is there sensitive data? → Remove it
Are there credentials? → Use placeholders
Is this proprietary? → Abstract it
Is this customer data? → Don't use AI
```

## 📋 Code Review Checklist

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Error handling appropriate
- [ ] Tests included
- [ ] Security scan passed

## 🚨 Report Issues

- Slack: #security-incidents
- Email: security@company.com

## 📚 Resources

- Full Policy: /docs/AI-USAGE-POLICY.md
- Training: [Link to training]
- FAQ: [Link to FAQ]
```

### Deliverable 3.2
- Quick reference card
- Printable format (optional)

---

## Lab Deliverables

Submit the following:

- [ ] **Part 1**: Copilot ignore configuration
- [ ] **Part 1**: VS Code settings
- [ ] **Part 1**: Pre-commit hooks setup
- [ ] **Part 2**: GitHub Actions security workflow
- [ ] **Part 2**: Custom Semgrep rules
- [ ] **Part 3**: Complete AI usage policy
- [ ] **Part 3**: Quick reference card

---

## Evaluation Criteria

| Criteria | Points |
|----------|--------|
| Configuration completeness | 20 |
| Security scanning coverage | 25 |
| Policy comprehensiveness | 25 |
| Practical applicability | 15 |
| Documentation quality | 15 |
| **Total** | **100** |

---

## Extension Challenges

### Challenge 1: Metrics Dashboard
Create a simple dashboard to track AI tool usage and code quality metrics.

### Challenge 2: Training Module
Design a 15-minute training module for developers on AI tool security.

### Challenge 3: Automated Policy Enforcement
Create a GitHub Action that checks for policy compliance on PRs.

---

*Module 7 Lab - Security & Best Practices*
*AI-Assisted Software Development Course*
