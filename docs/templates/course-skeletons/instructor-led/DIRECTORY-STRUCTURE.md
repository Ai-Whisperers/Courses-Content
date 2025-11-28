# Instructor-Led Course Directory Structure

> Copy this structure when creating a new instructor-led course

## Complete Directory Tree

```
{{COURSE_SLUG}}/
├── README.md                           # Course overview & quick start
├── SYLLABUS.md                         # Complete syllabus
├── GETTING-STARTED.md                  # Pre-course setup guide
├── INSTRUCTOR-GUIDE.md                 # Instructor handbook
│
├── modules/
│   ├── module-01/
│   │   ├── MODULE-OVERVIEW.md          # Learning objectives & summary
│   │   ├── 01-SLIDES.md                # Presentation content
│   │   ├── 02-EXERCISES.md             # Guided practice activities
│   │   ├── 03-LAB.md                   # Extended hands-on project
│   │   ├── 04-CODE-EXAMPLES.md         # Reference implementations
│   │   ├── 05-QUIZ.md                  # Knowledge check
│   │   └── ANSWER-KEY.md               # Instructor answers
│   │
│   ├── module-02/
│   │   ├── MODULE-OVERVIEW.md
│   │   ├── 01-SLIDES.md
│   │   ├── 02-EXERCISES.md
│   │   ├── 03-LAB.md
│   │   ├── 04-CODE-EXAMPLES.md
│   │   ├── 05-QUIZ.md
│   │   └── ANSWER-KEY.md
│   │
│   ├── module-03/
│   │   └── (same structure)
│   │
│   ├── module-04/
│   │   └── (same structure)
│   │
│   ├── module-05/
│   │   └── (same structure)
│   │
│   ├── module-06/
│   │   └── (same structure)
│   │
│   ├── module-07/
│   │   └── (same structure)
│   │
│   └── module-08/
│       ├── MODULE-OVERVIEW.md
│       ├── 01-SLIDES.md
│       ├── 02-EXERCISES.md
│       ├── 03-LAB.md                   # Capstone project work
│       ├── 04-CODE-EXAMPLES.md
│       └── ANSWER-KEY.md
│
├── assessments/
│   ├── README.md                       # Assessment overview
│   ├── capstone/
│   │   ├── BRIEF.md                    # Project requirements
│   │   ├── RUBRIC.md                   # Grading criteria
│   │   ├── SUBMISSION-GUIDE.md         # How to submit
│   │   └── EXAMPLE-PROJECTS.md         # Sample submissions
│   └── quizzes/
│       └── answer-keys/
│           ├── module-01-answers.md
│           ├── module-02-answers.md
│           └── ...
│
├── examples/
│   ├── README.md                       # Examples overview
│   ├── starter-code/                   # Initial code for labs
│   │   ├── module-01/
│   │   ├── module-02/
│   │   └── ...
│   └── completed-code/                 # Reference solutions
│       ├── module-01/
│       ├── module-02/
│       └── ...
│
├── prompts/
│   └── README.md                       # AI prompts library
│
├── resources/
│   ├── README.md                       # Resources overview
│   ├── common/
│   │   ├── cheatsheet.md
│   │   ├── glossary.md
│   │   └── quick-reference.md
│   ├── instructor/
│   │   ├── INSTRUCTOR-GUIDE.md
│   │   ├── TEACHING-TIPS.md
│   │   ├── FACILITATION-GUIDE.md
│   │   ├── answer-keys/
│   │   └── session-plans/
│   │       ├── session-01.md
│   │       ├── session-02.md
│   │       └── ...
│   └── reference/
│       ├── troubleshooting-guide.md
│       └── FAQ.md
│
├── presentation-templates/
│   ├── README.md
│   ├── INDEX.md                        # All templates listed
│   ├── MASTER-SLIDE-DECK-TEMPLATE.md   # Course kickoff
│   ├── MODULE-SLIDE-TEMPLATE.md        # Standard module
│   ├── WORKSHOP-SLIDE-TEMPLATE.md      # Interactive sessions
│   ├── SPEAKER-NOTES-TEMPLATE.md       # Presenter notes
│   ├── VISUAL-DIAGRAMS-LIBRARY.md      # Reusable diagrams
│   └── QUICK-START.md                  # How to use templates
│
└── templates/
    ├── README.md                       # Project templates overview
    └── project-ai-setup/
        ├── .claude/
        │   └── settings.json
        ├── .cursor/
        │   ├── index.mdc
        │   └── rules/
        ├── .gemini/
        │   └── settings.json
        ├── .github/
        │   └── copilot-instructions.md
        ├── .cursorignore
        ├── .gitignore
        ├── CLAUDE.md
        ├── GEMINI.md
        └── README.md
```

## File Sizes (Expected)

| File Type | Expected Size | Notes |
|-----------|---------------|-------|
| README.md (course) | 4-6 KB | Overview, quick start |
| SYLLABUS.md | 10-18 KB | Complete syllabus |
| MODULE-OVERVIEW.md | 2-3 KB | Learning objectives |
| 01-SLIDES.md | 12-15 KB | 17 slides + notes |
| 02-EXERCISES.md | 8-12 KB | 3-4 exercises |
| 03-LAB.md | 10-15 KB | Extended project |
| 04-CODE-EXAMPLES.md | 15-25 KB | 3-5 examples |
| 05-QUIZ.md | 5-8 KB | 10-15 questions |
| ANSWER-KEY.md | 6-10 KB | Solutions |

## Creation Commands

```bash
# Create course directory structure
mkdir -p {{COURSE_SLUG}}/{modules,assessments,examples,prompts,resources,presentation-templates,templates}

# Create module directories (8 modules for instructor-led)
for i in $(seq -w 01 08); do
  mkdir -p {{COURSE_SLUG}}/modules/module-$i
done

# Create assessment subdirectories
mkdir -p {{COURSE_SLUG}}/assessments/{capstone,quizzes/answer-keys}

# Create example subdirectories
mkdir -p {{COURSE_SLUG}}/examples/{starter-code,completed-code}
for i in $(seq -w 01 08); do
  mkdir -p {{COURSE_SLUG}}/examples/starter-code/module-$i
  mkdir -p {{COURSE_SLUG}}/examples/completed-code/module-$i
done

# Create resource subdirectories
mkdir -p {{COURSE_SLUG}}/resources/{common,instructor/{answer-keys,session-plans},reference}

# Create AI integration templates
mkdir -p {{COURSE_SLUG}}/templates/project-ai-setup/{.claude,.cursor/rules,.gemini,.github}
```

## Module Naming Convention

Use this format: `module-XX`

- `module-` prefix for instructor-led courses
- `XX` = Two-digit number (01-08)

**Examples:**
- `module-01`
- `module-02`
- `module-08`

## Files Per Module

Each module contains **7 files**:

| File | Purpose | Duration |
|------|---------|----------|
| MODULE-OVERVIEW.md | Learning objectives | Reference |
| 01-SLIDES.md | Presentation | 30 min |
| 02-EXERCISES.md | Guided practice | 40 min |
| 03-LAB.md | Independent project | 30 min |
| 04-CODE-EXAMPLES.md | Reference code | Reference |
| 05-QUIZ.md | Knowledge check | 10-20 min |
| ANSWER-KEY.md | Instructor solutions | Reference |

**Total per session:** ~2 hours active time
