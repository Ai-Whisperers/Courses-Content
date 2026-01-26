# Contributing to AI Whisperers Courses

Thank you for your interest in contributing!

---

## Types of Contributions

1. **New Courses** - Complete course offerings
2. **Course Improvements** - Adding modules, exercises, fixing content
3. **Shared Resources** - Templates, configs, examples
4. **Bug Fixes** - Typos, broken links, outdated info

---

## Course Structure

All courses follow this structure:

```
[Course-Name]/
├── README.md                # Course overview
├── CURRICULUM.md            # Complete syllabus
├── GETTING-STARTED.md       # Setup instructions
├── INSTRUCTOR-GUIDE.md      # Lesson plans
├── FINAL-PROJECT.md         # Capstone project
│
├── modules/
│   └── module-N/
│       ├── 01-SLIDES.md
│       ├── 02-EXERCISES.md
│       ├── 03-LAB.md
│       ├── 04-CODE-EXAMPLES.md
│       └── 05-QUIZ.md
│
├── exercises/               # Supplementary exercises
├── templates/               # Reusable templates
└── resources/               # Additional materials
```

**Reference**: Use `courses/01-production/QA-Automation-with-AI/` as the gold standard.

---

## Submission Process

### 1. Discuss First

Open a Discussion or Issue describing:
- Course topic and target audience
- Learning objectives
- Estimated duration

### 2. Fork and Branch

```bash
git clone https://github.com/YOUR-USERNAME/Courses-Content.git
git checkout -b course/your-course-name
```

### 3. Develop Content

Follow the structure above. Use QA-Automation-with-AI as a template.

### 4. Self-Review

- [ ] All required files present
- [ ] Code examples tested and working
- [ ] No typos or broken links
- [ ] Sources properly cited

### 5. Submit PR

Title: `[New Course] Course Name` or `[Improvement] Brief description`

---

## Quality Standards

### Module Requirements

Each module must include:
- Learning objectives (3-5 specific goals)
- Slide content (20-40 slides)
- Code examples (5-10 working examples)
- Hands-on lab (60-120 minutes)
- Quiz (15-30 questions)

### Code Standards

- **Working**: All code must run successfully
- **Commented**: Explain complex sections
- **Complete**: Include imports and dependencies

### Completion Percentages

Be honest about completion:

| Status | Meaning |
|--------|---------|
| 10-30% | Outline + 1-2 modules drafted |
| 30-50% | Core modules drafted, needs work |
| 50-70% | Most modules done, ready for testing |
| 70-85% | All modules done, tested with 1-2 students |
| 85-95% | Tested with 5+ students, minor polish |
| 95-100% | Production ready, fully validated |

---

## What We Value

### Do ✅

- Start with an outline
- Test everything thoroughly
- Use clear, simple language
- Cite authoritative sources
- Be responsive to feedback

### Don't ❌

- Submit untested content
- Inflate completion percentages
- Use proprietary/paid tools only
- Skip required components
- Mix languages inconsistently

---

## Review Process

1. **Initial Review**: 3-5 business days
2. **Feedback**: Reviewers provide comments
3. **Revisions**: You address feedback
4. **Merge**: Accepted contributions merged

---

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/Ai-Whisperers/Courses-Content/discussions)
- **Issues**: Open an [Issue](https://github.com/Ai-Whisperers/Courses-Content/issues)
- **Email**: contributors@ai-whisperers.com

---

## License

By contributing, you agree that content is licensed under MIT (see [LICENSE](./LICENSE)).

---

*Last Updated: January 2026*
