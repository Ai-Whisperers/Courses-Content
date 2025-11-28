# Course Creation Guide

> End-to-end guide for creating professional AI Whisperers courses

## Quick Links

| Phase | Document |
|-------|----------|
| 1. Planning | [PLANNING.md](./PLANNING.md) |
| 2. Structure | [STRUCTURE.md](./STRUCTURE.md) |
| 3. Content | [CONTENT.md](./CONTENT.md) |
| 4. Review | [CHECKLIST.md](./CHECKLIST.md) |

---

## Course Creation Overview

### Standard Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| Planning | 1-2 weeks | Client analysis, scoping, business case |
| Structure | 1 day | Directory setup, syllabus creation |
| Content | 2-6 weeks | Module development (with AI assistance) |
| Review | 1 week | Quality check, testing, polish |

### Course Formats

| Format | Modules | Hours | Use Case |
|--------|---------|-------|----------|
| Self-Paced | 12 | 40-60 | Online, asynchronous |
| Instructor-Led | 8 | 16-24 | Workshops, bootcamps |
| Half-Day | 3-4 | 4 | Executive overviews |
| Full-Day | 5-6 | 8 | Intensive training |

---

## Quick Start

### Create a New Course in 5 Steps

**Step 1: Choose Format**
```bash
# Self-paced (12 modules)
cp -r docs/templates/course-skeletons/self-paced/* courses/my-course/

# OR Instructor-led (8 modules)
cp -r docs/templates/course-skeletons/instructor-led/* courses/my-course/
```

**Step 2: Define Course**
- Edit `README.md` with course overview
- Edit `SYLLABUS.md` with module structure

**Step 3: Create Modules**
```bash
# Copy module templates
for i in $(seq -w 01 12); do
  cp -r docs/templates/modules/self-paced/* courses/my-course/modules/$i-module/
done
```

**Step 4: Develop Content**
- Use AI assistance (see [CONTENT.md](./CONTENT.md))
- Follow quality standards
- Create exercises and quizzes

**Step 5: Review & Polish**
- Run through [CHECKLIST.md](./CHECKLIST.md)
- Test all code examples
- Verify all links

---

## Key Standards

### Module Structure (Self-Paced)

```
XX-module-name/
├── README.md      # Main content
├── EXERCISE.md    # Hands-on lab
└── QUIZ.md        # Knowledge check
```

### Module Structure (Instructor-Led)

```
module-XX/
├── MODULE-OVERVIEW.md
├── 01-SLIDES.md
├── 02-EXERCISES.md
├── 03-LAB.md
├── 04-CODE-EXAMPLES.md
├── 05-QUIZ.md
└── ANSWER-KEY.md
```

### Content Ratios

| Component | Percentage |
|-----------|------------|
| Theory | 20% |
| Demonstration | 30% |
| Practice | 40% |
| Assessment | 10% |

---

## Reference Course

**QA-Automation-with-AI** is the gold standard:
- 12 complete modules
- 850KB of content
- 51+ hours of learning
- All templates and resources

Use it as your reference for quality and structure.

---

## Documents in This Guide

### [PLANNING.md](./PLANNING.md)
Pre-development activities:
- Client/audience analysis
- Course scoping
- Business case
- Learning outcomes

### [STRUCTURE.md](./STRUCTURE.md)
Course organization:
- Directory structure
- File naming conventions
- Module sequencing
- Resource planning

### [CONTENT.md](./CONTENT.md)
Content development:
- Writing guidelines
- AI-assisted creation
- Code examples
- Quality standards

### [CHECKLIST.md](./CHECKLIST.md)
Quality assurance:
- Module completeness
- Content quality
- Technical verification
- Launch readiness

---

## Related Resources

- [Course Templates](../../templates/) - Reusable templates
- [Assessment Guide](../assessment/) - Creating assessments
- [Reference Course](../../../courses/QA-Automation-with-AI/) - Gold standard
