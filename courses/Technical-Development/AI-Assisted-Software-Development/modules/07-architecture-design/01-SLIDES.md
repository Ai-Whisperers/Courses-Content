# Module 7: Security & Best Practices
## Presentation Slides

---

## Slide 1: Title

# Security & Best Practices

**Module 7 of 8**

*Responsible AI-Assisted Development*

---

## Slide 2: Objectives

# What You'll Learn

1. Identify security risks with AI tools
2. Protect sensitive data in prompts
3. Understand IP implications
4. Implement quality control processes
5. Establish team best practices
6. Measure productivity effectively

---

## Slide 3: Security Landscape

# AI Coding Tool Security Risks

### Where Does Your Code Go?

```
Your Prompt → AI Provider → Model Processing → Response
     ↓              ↓              ↓
  Contains      May log or    Trained on
  your code     store data    public code
```

### Risk Categories
- **Data Exposure** - Code sent to third parties
- **Generated Vulnerabilities** - Insecure code suggestions
- **Supply Chain** - Unknown code origins

---

## Slide 4: What AI Tools See

# Data Flow Awareness

### GitHub Copilot
- Current file content
- Open tabs context
- Repository metadata
- Prompt text

### ChatGPT/Claude
- Everything you paste
- Conversation history
- System prompts
- User preferences

### Enterprise vs Consumer
| Feature | Consumer | Enterprise |
|---------|----------|------------|
| Data retention | Variable | Configurable |
| Training on data | Possible | Opt-out |
| Audit logs | Limited | Available |
| Data region | Global | Selectable |

---

## Slide 5: Data Privacy Risks

# Sensitive Data in Prompts

### NEVER Include

```
❌ API keys: STRIPE_KEY=sk_live_abc123
❌ Passwords: password = "admin123"
❌ PII: email = "john.doe@company.com"
❌ Internal URLs: https://internal.company.com/api
❌ Customer data: customer_ssn = "123-45-6789"
❌ Proprietary algorithms
```

### Real-World Incidents
- Samsung employees leaked source code via ChatGPT
- Companies found proprietary code in AI suggestions
- API keys exposed in public repositories

---

## Slide 6: Safe Prompting

# Protecting Sensitive Information

### Instead of This:
```javascript
const stripe = new Stripe('sk_live_abc123xyz');
const db = mysql.connect('mysql://admin:p@ssw0rd@10.0.0.5/prod');
```

### Write This:
```javascript
const stripe = new Stripe(process.env.STRIPE_KEY);
const db = mysql.connect(process.env.DATABASE_URL);
```

### Abstraction Techniques
- Use placeholder values: `YOUR_API_KEY`
- Generic examples: `user@example.com`
- Remove specific details: `internal-service` instead of actual hostname

---

## Slide 7: Intellectual Property

# Who Owns AI-Generated Code?

### Legal Considerations

| Aspect | Consideration |
|--------|---------------|
| Copyright | AI output may not be copyrightable |
| Licensing | Training data licenses apply |
| Attribution | May need to credit AI |
| Patents | Inventorship questions |

### Company Policy Questions
- Can we use AI-generated code in products?
- What review is required?
- How do we document AI usage?

---

## Slide 8: License Concerns

# Open Source & AI

### The Problem

```
AI Training Data:
├── GPL-licensed code
├── MIT-licensed code
├── Proprietary code
└── Unknown origin code
```

### Risk: License Violation

AI might suggest code that:
- Matches GPL code (copyleft implications)
- Resembles copyrighted code
- Has unclear licensing status

### Mitigation
- Use tools with license filters
- Review generated code for similarities
- Document AI assistance in projects

---

## Slide 9: Generated Code Vulnerabilities

# Security Issues in AI Code

### Common Problems

1. **SQL Injection**
```javascript
// AI might suggest:
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Instead of:
const query = 'SELECT * FROM users WHERE id = $1';
db.query(query, [userId]);
```

2. **Missing Input Validation**
3. **Hardcoded Credentials**
4. **Outdated Patterns**
5. **Missing Error Handling**

---

## Slide 10: Security Scanning

# Automated Security Checks

### Required Scans for AI Code

```yaml
# CI Pipeline
steps:
  - name: Static Analysis
    run: npm run lint:security

  - name: Dependency Check
    run: npm audit

  - name: Secret Detection
    run: gitleaks detect

  - name: SAST Scan
    run: semgrep --config auto
```

### Tools
- **Semgrep** - Custom rules for patterns
- **Snyk** - Dependency vulnerabilities
- **GitLeaks** - Secret detection
- **SonarQube** - Code quality

---

## Slide 11: Code Review Process

# Reviewing AI-Generated Code

### Enhanced Review Checklist

```markdown
## AI Code Review Checklist

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Output encoding applied
- [ ] SQL parameterized
- [ ] XSS prevention in place

### Quality
- [ ] Follows project style
- [ ] Error handling complete
- [ ] Logging appropriate
- [ ] Tests included
- [ ] Documentation added

### AI-Specific
- [ ] Understood by developer
- [ ] Not blindly accepted
- [ ] Edge cases verified
- [ ] Performance acceptable
```

---

## Slide 12: Quality Control

# Maintaining Code Quality

### The Problem

AI-generated code can be:
- Syntactically correct but logically wrong
- Working but not optimal
- Secure-looking but vulnerable
- Inconsistent with codebase

### Quality Gates

```
AI Code → Linting → Tests → Security Scan → Review → Merge
                                    ↓
                              Failed checks
                                    ↓
                              Revision required
```

---

## Slide 13: Team Policies

# Establishing Guidelines

### AI Usage Policy Template

```markdown
# AI Coding Tool Policy

## Approved Tools
- GitHub Copilot Business
- Claude (via API)

## Prohibited Uses
- Pasting customer data
- Generating security-critical code without review
- Using for compliance-related code

## Required Practices
- All AI code must pass security scan
- Document significant AI assistance
- Human review mandatory

## Training Requirements
- Complete AI Security module
- Annual policy acknowledgment
```

---

## Slide 14: Configuration Best Practices

# Secure Tool Setup

### GitHub Copilot Settings

```json
// .vscode/settings.json
{
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": false,
    "yaml": true
  },
  "github.copilot.advanced": {
    "authProvider": "github-enterprise"
  }
}
```

### Exclude Sensitive Files

```gitignore
# .copilotignore
.env*
**/secrets/**
**/credentials/**
config/production.*
```

---

## Slide 15: Productivity Measurement

# Measuring AI Impact

### Good Metrics

| Metric | What It Measures |
|--------|------------------|
| Feature velocity | Time to complete features |
| Code quality | Bug rate, code review feedback |
| Developer satisfaction | Survey scores |
| Rework rate | Percentage of code changed after review |

### Bad Metrics

❌ Lines of code generated
❌ AI acceptance rate (without quality)
❌ Speed without correctness

---

## Slide 16: Measuring Effectively

# Productivity Framework

### Before/After Comparison

```
Without AI:
- Feature A: 40 hours
- Bug rate: 3 per feature
- Review cycles: 2.5 avg

With AI:
- Feature A: 28 hours (-30%)
- Bug rate: 2.5 per feature (-17%)
- Review cycles: 2.0 avg (-20%)
```

### Track Over Time
- Baseline before AI adoption
- Monthly metrics review
- Quality trends
- Developer feedback

---

## Slide 17: Common Pitfalls

# What to Avoid

### Anti-Patterns

1. **Blind Acceptance**
   - Copy-paste without understanding
   - No review or testing

2. **Over-Reliance**
   - Forgetting fundamentals
   - Not learning from AI suggestions

3. **Security Theater**
   - Assuming AI code is secure
   - Skipping security reviews

4. **Inconsistent Usage**
   - No team standards
   - Everyone doing their own thing

---

## Slide 18: Compliance Considerations

# Regulatory Requirements

### GDPR
- No personal data in prompts
- Document AI processing
- Data residency requirements

### HIPAA
- No PHI in AI tools
- Use approved enterprise versions
- Audit trail required

### SOC 2
- Document AI tool usage
- Security controls for AI
- Vendor risk assessment

### PCI DSS
- No cardholder data in prompts
- Segmented environments
- Access controls

---

## Slide 19: Live Demo

# Demo: Security Configuration

### We'll Cover
1. Configure Copilot exclusions
2. Set up pre-commit hooks
3. Run security scans
4. Review AI-generated code

---

## Slide 20: Best Practices Summary

# Key Takeaways

### Security
✅ Never include secrets in prompts
✅ Use enterprise-tier tools
✅ Scan all AI-generated code
✅ Review security implications

### Quality
✅ Same standards as human code
✅ Test thoroughly
✅ Document AI assistance
✅ Understand before committing

### Team
✅ Clear usage policies
✅ Regular training
✅ Measure meaningfully
✅ Iterate on practices

---

## Slide 21: Module Summary

# Module 7 Summary

### Covered
✅ Security risks and mitigation
✅ Data privacy considerations
✅ Intellectual property concerns
✅ Quality control processes
✅ Team policies and measurement

### Key Skill
Use AI tools responsibly with security-first mindset.

---

## Slide 22: Next Module

# Up Next: Capstone Project

**Module 8 Preview:**
- Apply all learned skills
- Build complete feature with AI
- Present and review results
- Final assessment

---

*End of Module 7 Slides*
