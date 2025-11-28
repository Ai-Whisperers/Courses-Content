# Module 7: Quiz
## Security & Best Practices

---

| Questions | 15 | Time | 15 min | Passing | 70% |

---

## Questions

### Q1: What should NEVER be included in AI prompts?
- A) Public code examples
- B) API keys and credentials
- C) Generic function names
- D) Error messages

### Q2: Which is a key difference between consumer and enterprise AI tiers?
- A) Enterprise has more emojis
- B) Enterprise offers data retention controls and audit logs
- C) Consumer is faster
- D) There's no difference

### Q3: What is the main concern with AI-generated code and licensing?
- A) AI code is always free
- B) Training data may include copyleft code
- C) AI code cannot be licensed
- D) Only MIT licenses are affected

### Q4: Which security scan should run on AI-generated code?
- A) Only spell check
- B) Static analysis, dependency scanning, and secret detection
- C) Just unit tests
- D) No scanning needed

### Q5: What's the best practice for AI code review?
- A) Accept all suggestions
- B) Skip review for small changes
- C) Apply same standards as human code
- D) Only review security-critical code

### Q6: How should secrets be handled in code sent to AI?
- A) Encrypt them first
- B) Use placeholders like YOUR_API_KEY
- C) Just hope AI ignores them
- D) Send them as-is

### Q7: Which is NOT a good productivity metric for AI tools?
- A) Feature velocity
- B) Lines of code generated
- C) Code quality scores
- D) Developer satisfaction

### Q8: What should a team AI usage policy include?
- A) Just tool names
- B) Approved tools, prohibited uses, and required practices
- C) Only security rules
- D) Nothing specific

### Q9: Which file pattern should be excluded from AI tool context?
- A) *.ts
- B) .env
- C) README.md
- D) package.json

### Q10: What's the risk of accepting AI code without understanding it?
- A) No risk
- B) Hidden bugs, security vulnerabilities, and maintenance issues
- C) Just slower code
- D) Only formatting issues

### Q11: Which compliance standard restricts AI use with personal data?
- A) CSS3
- B) GDPR
- C) HTML5
- D) JSON

### Q12: What should happen when secrets are accidentally sent to AI?
- A) Nothing
- B) Rotate credentials immediately
- C) Send more secrets
- D) Wait and see

### Q13: Which tool detects hardcoded secrets in code?
- A) Prettier
- B) Gitleaks
- C) TypeScript
- D) React

### Q14: What's the purpose of a .copilotignore file?
- A) Speed up Copilot
- B) Exclude sensitive files from AI context
- C) Add more features
- D) Change themes

### Q15: How should AI assistance be documented?
- A) Never documented
- B) In commit messages and code comments where significant
- C) Only in private notes
- D) AI documentation is illegal

---

## Answers

| Q | A | Reason |
|---|---|--------|
| 1 | B | Credentials can be exposed or logged |
| 2 | B | Enterprise tiers offer data controls |
| 3 | B | Training data licenses may apply |
| 4 | B | Multiple security scans needed |
| 5 | C | Same review standards apply |
| 6 | B | Use placeholder values |
| 7 | B | Lines generated doesn't equal quality |
| 8 | B | Comprehensive policies needed |
| 9 | B | Environment files contain secrets |
| 10 | B | Multiple serious risks |
| 11 | B | GDPR restricts personal data processing |
| 12 | B | Credentials must be rotated |
| 13 | B | Gitleaks detects secrets |
| 14 | B | Excludes files from context |
| 15 | B | Document in commits and comments |

---

*Module 7 Quiz*
