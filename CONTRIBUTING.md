# Contributing to AI Whisperers Courses

Thank you for your interest in contributing to our course content! This document provides guidelines for adding new courses, improving existing content, and maintaining quality standards.

---

## 📋 Table of Contents

1. [Types of Contributions](#types-of-contributions)
2. [Course Structure Requirements](#course-structure-requirements)
3. [Content Guidelines](#content-guidelines)
4. [Submission Process](#submission-process)
5. [Quality Standards](#quality-standards)
6. [Getting Help](#getting-help)

---

## Types of Contributions

### 1. New Courses
Complete new course offerings covering specific topics

### 2. Course Improvements
- Adding missing modules
- Improving existing content
- Updating outdated information
- Adding exercises and labs

### 3. Shared Resources
- Example projects
- Reusable templates
- Tool configurations
- Reference materials

### 4. Documentation
- Fixing typos and errors
- Improving clarity
- Adding examples
- Updating links

---

## Course Structure Requirements

All courses must follow this structure:

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
│   │   ├── 01-SLIDES.md           # Presentation content
│   │   ├── 02-EXERCISES.md        # Practice problems
│   │   ├── 03-LAB.md              # Hands-on lab
│   │   ├── 04-CODE-EXAMPLES.md    # Working code samples
│   │   ├── 05-QUIZ.md             # Assessment
│   │   ├── ANSWER-KEY.md          # Solutions (for instructors)
│   │   └── MODULE-OVERVIEW.md     # Module summary
│   └── [additional modules...]
│
├── exercises/                     # Supplementary exercises
├── templates/                     # Reusable templates
├── resources/                     # Additional materials
└── ai-integration/ (optional)     # AI-specific content
    ├── prompts/
    ├── templates/
    └── resources/
```

---

## Content Guidelines

### Module Content Requirements

Each module **must include**:

1. **Learning Objectives** (3-5 specific, measurable goals)
2. **Slide Content** (20-40 slides)
3. **Code Examples** (5-10 working examples)
4. **Hands-on Lab** (60-120 minute exercise)
5. **Practice Exercises** (5-10 problems)
6. **Quiz** (15-30 questions)
7. **Answer Key** (for instructors only)

### Writing Style

- **Clear:** Use simple, direct language
- **Practical:** Focus on real-world applications
- **Actionable:** Provide specific steps and examples
- **Inclusive:** Consider different learning styles and backgrounds

### Code Standards

- **Working:** All code must be tested and functional
- **Commented:** Explain complex sections
- **Formatted:** Follow language style guides
- **Complete:** Include necessary imports and dependencies

### Citations

- Cite authoritative sources
- Link to official documentation
- Credit original authors
- Maintain SOURCES-AND-REFERENCES.md

---

## Submission Process

### Step 1: Discuss Your Idea

Before starting, open a **Discussion** or **Issue** describing:
- Course topic and target audience
- Learning objectives
- Estimated duration
- Tools and technologies
- Your background/qualifications

### Step 2: Fork and Create Branch

```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR-USERNAME/Courses-Content.git
cd Courses-Content

# Create a feature branch
git checkout -b course/your-course-name
```

### Step 3: Develop Content

Follow the structure outlined above. Use existing courses as templates.

### Step 4: Self-Review Checklist

- [ ] All required files present
- [ ] Content follows style guidelines
- [ ] Code examples tested and working
- [ ] No typos or grammatical errors
- [ ] Links verified and working
- [ ] Sources properly cited
- [ ] SOURCES-AND-REFERENCES.md updated
- [ ] AI-generated content disclosed (if applicable)

### Step 5: Submit Pull Request

Create a PR with:
- **Title:** `[New Course] Course Name` or `[Improvement] Brief description`
- **Description:** 
  - What you're adding/changing
  - Why it's valuable
  - Any special considerations
- **Screenshots:** If applicable
- **Testing:** How you validated the content

---

## Quality Standards

### Content Review

All contributions will be reviewed for:

1. **Accuracy:** Technical correctness
2. **Completeness:** All required components
3. **Quality:** Writing clarity and professionalism
4. **Relevance:** Alignment with course goals
5. **Originality:** Proper attribution of sources

### Testing Requirements

Before submission:

1. **Code Validation:** All examples must run successfully
2. **Link Checking:** All URLs must be active
3. **Lab Testing:** Labs must be completable within stated time
4. **Quiz Verification:** Answers must be correct
5. **Format Check:** Markdown renders properly

---

## Course Templates

### Use Existing Courses as Templates

**For complete course reference:**
- Use `courses/QA-Automation-with-AI/` as the gold standard (12 complete modules)

**For self-paced courses:**
- Follow the structure in `courses/QA-Automation-with-AI/`

**For documentation and guides:**
- See `docs/guides/course-creation/` for step-by-step guide
- Templates available in `docs/templates/`

### Quick Start Template

1. Review the Course Creation Guide:
   ```bash
   # Read the comprehensive guide
   cat docs/guides/course-creation/README.md
   ```

2. Copy the course skeleton from templates:
   ```bash
   cp -r docs/templates/course-skeletons/self-paced/* courses/your-course-name/
   cd courses/your-course-name/
   # Edit README.md with your course details
   ```

3. Use QA-Automation-with-AI as a working reference:
   ```bash
   # Browse the complete flagship course
   ls courses/QA-Automation-with-AI/
   ```

---

## Content Licensing

By contributing, you agree that:

1. **Original Work:** Content is your own or properly attributed
2. **License:** Content is licensed under repository license (MIT)
3. **Free Tools:** Only free/open-source tools are used
4. **No Restrictions:** Content can be freely shared and modified

---

## Getting Help

### Questions?

- **Course Design:** Open a Discussion
- **Technical Issues:** Open an Issue
- **General Inquiries:** contact@ai-whisperers.com

### Resources

- **Style Guide:** See `docs/guides/course-creation/CONTENT.md`
- **Markdown Help:** [GitHub Markdown Guide](https://guides.github.com/features/mastering-markdown/)
- **Course Examples:** Browse `courses/QA-Automation-with-AI/`
- **Quality Standards:** See `QUALITY-CONTROL-CHECKLIST.md`

---

## Recognition

Contributors will be:
- Credited in course documentation
- Listed in repository contributors
- Invited to join instructor network (if qualified)
- Receive AI Whisperers contributor badge

---

## Review Process

### Timeline

1. **Initial Review:** 3-5 business days
2. **Feedback:** Reviewers provide comments
3. **Revisions:** You address feedback
4. **Final Review:** 1-2 business days
5. **Merge:** Accepted contributions merged

### Reviewers Look For

- [ ] Adherence to structure
- [ ] Content quality and accuracy
- [ ] Completeness
- [ ] Testing validation
- [ ] Citation quality
- [ ] Professional writing

---

## Best Practices

### Do's ✅

- Start with a course outline
- Use clear, simple language
- Provide working code examples
- Include step-by-step instructions
- Cite authoritative sources
- Test everything thoroughly
- Seek feedback early
- Be responsive to reviews

### Don'ts ❌

- Don't submit untested content
- Don't plagiarize or use content without attribution
- Don't use proprietary/paid tools
- Don't include company-specific information (unless generic)
- Don't make assumptions about student background
- Don't skip required components

---

## Examples of Good Contributions

### 1. New Module Addition
Added "API Security Testing" module to QA course with complete slides, lab, and exercises.

### 2. Lab Improvement
Enhanced Module 3 lab with troubleshooting tips and additional test cases based on student feedback.

### 3. Shared Resource
Added "REST API Testing Cheat Sheet" to shared-resources with examples in multiple languages.

### 4. Documentation Fix
Fixed broken links and updated outdated tool versions in Getting Started guide.

---

## Code of Conduct

### Be Respectful
- Provide constructive feedback
- Welcome newcomers
- Respect different perspectives
- Focus on content, not contributors

### Be Professional
- Use professional language
- Avoid controversial topics
- Keep discussions focused
- Follow community guidelines

---

## Additional Resources

### Learning Course Design
- [How to Create an Online Course](https://www.udemy.com/course/how-to-create-an-online-course/)
- [Instructional Design Basics](https://www.td.org/education-courses/instructional-design-certificate)

### Markdown Guides
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

### Testing Best Practices
- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://testingjavascript.com/)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 2024 | Initial contributing guidelines |

---

## Questions?

Still have questions? We're here to help!

- **Open a Discussion:** [GitHub Discussions](https://github.com/Ai-Whisperers/Courses-Content/discussions)
- **Email Us:** contributors@ai-whisperers.com
- **Join Slack:** #course-contributors

---

## Honest Expectations and Quality Standards

### Our Commitment to Honesty

**We value honesty over perfection.** After recent quality audits, we've established clear standards to ensure our students receive accurate course information.

#### Completion Percentage Guidelines

When reporting course completion:

| Status | Definition | Requirements |
|--------|------------|--------------|
| **10-30%** | Early Draft | - Outline complete<br>- 1-2 modules drafted<br>- Structure defined |
| **30-50%** | In Development | - Core modules drafted<br>- Some exercises included<br>- Needs significant work |
| **50-70%** | Substantial Progress | - Most modules drafted<br>- Exercises for 50%+ modules<br>- Ready for early testing |
| **70-85%** | Nearly Complete | - All modules drafted<br>- All exercises included<br>- Tested with 1-2 students<br>- Minor polish needed |
| **85-95%** | Production Candidate | - All content complete<br>- Tested with 5+ students<br>- All links verified<br>- Consistent formatting |
| **95-100%** | Production Ready | - Fully tested and validated<br>- Student feedback incorporated<br>- No TODOs or placeholders<br>- Professional quality |

#### RED FLAGS (Things to Avoid)

❌ **Don't inflate completion percentages**
- Claiming "95% complete" when significant work remains
- Counting AI-generated drafts as "complete" without human review
- Marketing materials contradicting internal planning docs

❌ **Don't submit untested content**
- Code examples that don't run
- Exercises without solutions
- Links that lead to 404 errors

❌ **Don't mix languages inconsistently**
- Random switching between Spanish and English
- File names in one language, content in another (without purpose)
- Confusing terminology

❌ **Don't skip citations**
- Using external content without attribution
- Copying from other courses without credit
- Presenting AI-generated content as original work without disclosure

#### GREEN FLAGS (What We Want)

✅ **Honest reporting**
- Accurate completion percentages
- Clear notes on what needs work
- Realistic timelines for production readiness

✅ **Quality over quantity**
- One excellent, tested module > Five untested drafts
- Thoughtful exercises > Copy-pasted filler
- Real examples > Generic Lorem ipsum

✅ **Student-first thinking**
- Clear learning objectives
- Progressive difficulty
- Practical, applicable skills

✅ **Professional standards**
- Consistent formatting
- No placeholder text in production content
- All links verified
- Proper citations

### Quality Checklist (Before Submitting)

Before submitting a PR, verify:

**Minimum (Required)**:
- [ ] No "TODO", "TBD", "FIXME" in production content
- [ ] All links tested and working
- [ ] Consistent language (Spanish OR English, not mixed randomly)
- [ ] Proper citations for external sources
- [ ] Accurate completion percentage in PR description

**Recommended**:
- [ ] Code examples tested (copy-paste and run successfully)
- [ ] Exercises have answer keys or rubrics
- [ ] Content reviewed by at least one other person
- [ ] Tested with 1-2 students or colleagues

**Excellent**:
- [ ] Tested with 5+ diverse students
- [ ] Multiple learning modalities (text, images, exercises)
- [ ] Real-world applications included
- [ ] Accessibility considerations (alt text, clear headings)

### Consequences of Misleading Content

To maintain trust with our students and partners:

- **First offense**: Warning and request to correct
- **Second offense**: PR rejected, contributor reminded of standards
- **Repeated offenses**: Contributor privileges may be suspended

**We're not looking for perfection** - we're looking for **honesty and continuous improvement**.

---

## Reference Documents

For accurate status reporting, always check:

- **[HONEST-STATUS-REPORT.md](./HONEST-STATUS-REPORT.md)** - Authoritative source of course status
- **[QUALITY-CONTROL-CHECKLIST.md](./QUALITY-CONTROL-CHECKLIST.md)** - Detailed quality standards
- **[docs/guides/course-creation/](./docs/guides/course-creation/)** - Course development guide

---

**Thank you for helping us create world-class educational content with integrity! 🎓**

---

*Last Updated: January 2026*

