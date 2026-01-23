# Module 3: AI for Code Review

## Complete Module Guide

---

## Module Summary

**Module 3** shifts focus from code generation to code analysis. You'll learn to use AI tools (primarily Claude) to review code for bugs, security vulnerabilities, performance issues, and code quality improvements.

| Attribute | Details |
|-----------|---------|
| **Duration** | 3 hours |
| **Level** | Intermediate |
| **Prerequisites** | Modules 1-2 completed |
| **Format** | Demo, Hands-on, Project |

---

## Learning Objectives

By the end of this module, you will be able to:

### Understand
- How AI analyzes code differently than generates code
- Common vulnerability patterns AI can detect
- Code quality metrics and standards
- Integration options with GitHub/GitLab

### Do
- Review code for bugs and logical errors
- Identify security vulnerabilities with AI
- Generate improvement suggestions
- Create automated code review workflows
- Refactor code with AI guidance

### Explain
- AI code review best practices
- When to trust AI findings vs. human judgment
- How to integrate AI review into CI/CD

---

## Module Contents

### 1. Presentation Slides (01-SLIDES.md)
30+ slides covering:
- AI code review fundamentals
- Bug detection strategies
- Security vulnerability scanning
- Code quality analysis
- Refactoring recommendations
- Integration patterns

**Time:** 45-60 minutes

### 2. Exercises (02-EXERCISES.md)
8 exercises including:
- Bug hunting challenges
- Security vulnerability identification
- Code smell detection
- Refactoring practice
- PR review simulation

**Time:** 45-60 minutes

### 3. Hands-On Lab (03-LAB.md)
Review a "legacy" codebase:
- 15+ intentional issues to find
- Security vulnerabilities
- Performance problems
- Code quality issues
- Generate improvement report

**Time:** 60-75 minutes

### 4. Code Examples (04-CODE-EXAMPLES.md)
Reference materials:
- Common bug patterns
- Security vulnerability examples
- Code smell catalog
- Refactoring patterns

### 5. Quiz (05-QUIZ.md)
- 20 questions
- 20-minute time limit
- 70% passing score

---

## Key Topics Covered

### 1. AI Code Review Fundamentals
- Different from generation (analysis vs. creation)
- What AI can and cannot catch
- False positives and negatives

### 2. Bug Detection
- Logic errors
- Off-by-one errors
- Null reference issues
- Race conditions
- Memory leaks

### 3. Security Vulnerability Scanning
- SQL injection
- XSS vulnerabilities
- Authentication issues
- Authorization bypasses
- Sensitive data exposure
- OWASP Top 10

### 4. Code Quality Analysis
- Code smells
- Complexity metrics
- Maintainability issues
- Technical debt

### 5. Refactoring Guidance
- Extract method/class
- Simplify conditionals
- Remove duplication
- Improve naming

---

## Tools Used

| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Claude** | Deep code analysis | Complex reviews, architecture |
| **Copilot Chat** | Quick reviews | Selected code, /explain |
| **ChatGPT** | Alternative analysis | Second opinion |

---

## Completion Checklist

### Before Moving to Module 4:

**Understanding:**
- [ ] I understand how AI code review works
- [ ] I can identify common vulnerability patterns
- [ ] I know when to trust AI findings
- [ ] I understand code quality metrics

**Skills:**
- [ ] I can use Claude for detailed code review
- [ ] I can identify bugs and security issues
- [ ] I can generate improvement suggestions
- [ ] I can create review reports

**Project:**
- [ ] Legacy codebase reviewed
- [ ] All issues documented
- [ ] Improvement recommendations provided

---

## Assessment Breakdown

| Component | Points | Weight |
|-----------|--------|--------|
| Exercises | 40 points | 30% |
| Lab Project | 40 points | 40% |
| Quiz | 40 points | 30% |

**Module Passing:** 70% overall

---

## Key Takeaways

1. **AI Reviews Complement Human Reviews**
   - AI catches different things than humans
   - Combine both for best results
   - Never skip human review

2. **Context Matters for Reviews**
   - Provide full file or function
   - Include related files
   - Explain the purpose

3. **Verify Security Findings**
   - AI can miss context-specific issues
   - False positives are common
   - Always validate findings

4. **Use Structured Review Prompts**
   - Ask for specific issue types
   - Request severity levels
   - Get actionable recommendations

---

## Common Challenges & Solutions

### Challenge 1: Too Many False Positives
**Solution:** Provide more context, ask for severity ratings

### Challenge 2: Missing Context-Specific Issues
**Solution:** Explain business requirements in prompt

### Challenge 3: Overwhelming Output
**Solution:** Ask for prioritized, top 5 issues

### Challenge 4: Integration Complexity
**Solution:** Start with manual reviews, then automate

---

## Additional Resources

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [SonarQube Code Smells](https://docs.sonarqube.org/latest/user-guide/issues/)
- [Clean Code Principles](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

### Tools
- SonarQube for static analysis
- Snyk for security scanning
- CodeClimate for maintainability

---

## Next Steps

After completing Module 3:

1. **Practice Code Reviews**
   - Review your own old code
   - Review open-source projects
   - Share findings with team

2. **Prepare for Module 4**
   - AI for Documentation
   - Shift from analysis to generation
   - Different prompt strategies

---

**Up Next:** Module 4 - AI for Documentation

---

*Module 3 - AI for Code Review*
*AI-Assisted Software Development Course*
*Version 1.0 - November 2025*
