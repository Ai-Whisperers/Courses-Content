# Base Claude Code Configuration

**This is the base configuration used across all AI Whisperers courses.**

Course-specific CLAUDE.md files should reference this base and only add course-specific customizations.

---

## 🎯 Course Content Development Rules

### Quality Standards

1. **No AI-Generated Placeholders**
   - All code examples must be executable and tested
   - No `TODO`, `PLACEHOLDER`, or `[ADD CONTENT HERE]` markers in production content
   - Examples should reflect real-world scenarios

2. **Citations Required**
   - Source all technical claims from authoritative sources
   - Link to official documentation
   - Credit third-party examples

3. **Student-Tested**
   - Content should be validated with real students when possible
   - Collect feedback and iterate
   - Track common confusion points

### Module Structure

Each module must include:
- Learning objectives (3-5 specific, measurable goals)
- Slide content (20-40 slides)
- Code examples (5-10 working examples)
- Hands-on lab (60-120 minute exercise)
- Practice exercises (5-10 problems)
- Quiz (15-30 questions)
- Answer key (for instructors only)

### Writing Style

- **Clear**: Use simple, direct language
- **Practical**: Focus on real-world applications
- **Actionable**: Provide specific steps and examples
- **Inclusive**: Consider different learning styles and backgrounds

---

## 🔧 Technical Standards

### Code Quality

**For All Languages:**
- Follow language-specific style guides
- Include error handling (never empty catch blocks)
- Add meaningful comments
- Use descriptive variable names
- Keep functions focused (single responsibility)

**For JavaScript/TypeScript:**
- Use ESLint with recommended rules
- Prefer `const` over `let`, avoid `var`
- Use async/await over raw promises
- Type all function signatures (TypeScript)

**For Python:**
- Follow PEP 8 style guide
- Use type hints for function signatures
- Write docstrings (Google style)
- Use `black` for formatting

### File Organization

```
[Course-Name]/
├── README.md                      # Course overview
├── CURRICULUM.md                  # Complete syllabus
├── GETTING-STARTED.md             # Setup instructions
├── INSTRUCTOR-GUIDE.md            # Lesson plans
├── FINAL-PROJECT.md               # Capstone project
├── SOURCES-AND-REFERENCES.md      # Bibliography
│
├── modules/
│   ├── module-1/
│   │   ├── 01-SLIDES.md
│   │   ├── 02-EXERCISES.md
│   │   ├── 03-LAB.md
│   │   ├── 04-CODE-EXAMPLES.md
│   │   ├── 05-QUIZ.md
│   │   ├── ANSWER-KEY.md
│   │   └── MODULE-OVERVIEW.md
│   └── [additional modules...]
│
├── exercises/                     # Supplementary exercises
├── templates/                     # Reusable templates
└── resources/                     # Additional materials
```

---

## 📝 Documentation Guidelines

### README Files

Every course must have a comprehensive README with:
- Course title and description
- Target audience
- Prerequisites
- Learning outcomes
- Duration estimate
- Module breakdown
- Setup instructions
- Support information

### Inline Documentation

- Comment complex logic
- Explain "why" not just "what"
- Add examples for non-obvious code
- Link to related documentation

---

## 🚀 AI Integration Best Practices

### Prompt Engineering

When teaching AI integration:
- Show iterative prompt refinement
- Explain context window management
- Demonstrate error recovery
- Teach output validation

### Tool Usage

- Prefer Claude Code for complex tasks
- Use GitHub Copilot for code completion
- ChatGPT for research and ideation
- Always verify AI-generated code

---

## 🔒 Security & Privacy

### Data Protection

- Never commit credentials, API keys, or secrets
- Use environment variables for sensitive config
- Sanitize student examples before sharing
- Respect data privacy regulations

### Secure Coding

- Validate all user inputs
- Use parameterized queries
- Avoid eval() with user data
- Keep dependencies updated

---

## 📊 Assessment Guidelines

### Quiz Design

- Mix question types (multiple choice, true/false, short answer)
- Test understanding, not memorization
- Include code reading/debugging questions
- Provide clear, unambiguous questions

### Grading Rubrics

- Define clear success criteria
- Use point-based scoring
- Include partial credit where appropriate
- Be consistent across all students

---

## 🤝 Contribution Workflow

1. **Create feature branch** from main
2. **Develop content** following these guidelines
3. **Self-review** using quality checklist
4. **Test** with sample audience if possible
5. **Submit PR** with clear description
6. **Address feedback** from reviewers
7. **Merge** when approved

---

## 📚 Resources

### Style Guides
- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Microsoft TypeScript Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)

### Testing
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Jest Testing Guide](https://jestjs.io/docs/getting-started)
- [Pytest Documentation](https://docs.pytest.org/)

### AI Tools
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)
- [GitHub Copilot Best Practices](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

---

**Version:** 1.0  
**Last Updated:** January 23, 2026  
**Maintained By:** AI Whisperers Team
