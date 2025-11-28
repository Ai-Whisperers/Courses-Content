# Self-Paced Course Directory Structure

> Copy this structure when creating a new self-paced course

## Complete Directory Tree

```
{{COURSE_SLUG}}/
├── README.md                           # Course overview & quick start
├── SYLLABUS.md                         # Complete syllabus
├── {{ROLE}}_GUIDE.md                   # Role-specific handbook (optional)
│
├── modules/
│   ├── 01-{{MODULE_01_SLUG}}/
│   │   ├── README.md                   # Module content
│   │   ├── EXERCISE.md                 # Hands-on practice
│   │   └── QUIZ.md                     # Knowledge check
│   │
│   ├── 02-{{MODULE_02_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 03-{{MODULE_03_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 04-{{MODULE_04_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 05-{{MODULE_05_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 06-{{MODULE_06_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 07-{{MODULE_07_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 08-{{MODULE_08_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 09-{{MODULE_09_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 10-{{MODULE_10_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 11-{{MODULE_11_SLUG}}/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   └── 12-{{MODULE_12_SLUG}}/
│       ├── README.md
│       ├── EXERCISE.md
│       └── QUIZ.md
│
├── assessments/
│   ├── README.md                       # Assessment overview
│   ├── milestone-projects/
│   │   ├── milestone-1/
│   │   │   ├── BRIEF.md
│   │   │   └── RUBRIC.md
│   │   └── milestone-2/
│   │       ├── BRIEF.md
│   │       └── RUBRIC.md
│   ├── capstone/
│   │   ├── BRIEF.md
│   │   ├── RUBRIC.md
│   │   └── SUBMISSION-GUIDE.md
│   └── quizzes/
│       └── answer-keys/
│           └── (instructor only)
│
├── examples/
│   ├── README.md                       # Examples overview
│   └── {{EXAMPLE_TYPE}}/
│       └── (example files)
│
├── prompts/
│   └── README.md                       # AI prompts library
│
├── resources/
│   ├── README.md                       # Resources overview
│   ├── by-module/                      # Module-specific resources
│   │   ├── module-01/
│   │   ├── module-02/
│   │   └── ...
│   ├── common/                         # Shared resources
│   │   ├── cheatsheet.md
│   │   └── glossary.md
│   ├── instructor/                     # Instructor-only materials
│   │   ├── teaching-guide.md
│   │   └── answer-keys/
│   └── reference/                      # Reference materials
│       ├── troubleshooting-guide.md
│       └── FAQ.md
│
├── presentation-templates/
│   ├── README.md
│   ├── MASTER-SLIDE-DECK-TEMPLATE.md
│   ├── MODULE-SLIDE-TEMPLATE.md
│   └── WORKSHOP-SLIDE-TEMPLATE.md
│
└── templates/
    ├── README.md                       # Project templates overview
    └── project-ai-setup/
        ├── .claude/
        │   └── settings.json
        ├── .cursor/
        │   └── rules/
        ├── .gemini/
        │   └── settings.json
        ├── .github/
        │   └── copilot-instructions.md
        ├── CLAUDE.md
        ├── GEMINI.md
        └── README.md
```

## File Sizes (Expected)

| File Type | Expected Size | Notes |
|-----------|---------------|-------|
| README.md (course) | 3-5 KB | Overview, quick start |
| SYLLABUS.md | 8-15 KB | Complete syllabus |
| Module README.md | 5-10 KB | 1,500-2,500 words |
| EXERCISE.md | 8-12 KB | 4-5 progressive tasks |
| QUIZ.md | 5-8 KB | 10-15 questions |
| Prompts README.md | 15-25 KB | Categorized prompts |

## Creation Commands

```bash
# Create course directory structure
mkdir -p {{COURSE_SLUG}}/{modules,assessments,examples,prompts,resources,presentation-templates,templates}

# Create module directories
for i in $(seq -w 01 12); do
  mkdir -p {{COURSE_SLUG}}/modules/$i-module-$i
done

# Create assessment subdirectories
mkdir -p {{COURSE_SLUG}}/assessments/{milestone-projects/{milestone-1,milestone-2},capstone,quizzes/answer-keys}

# Create resource subdirectories
mkdir -p {{COURSE_SLUG}}/resources/{by-module,common,instructor/answer-keys,reference}

# Create AI integration templates
mkdir -p {{COURSE_SLUG}}/templates/project-ai-setup/{.claude,.cursor/rules,.gemini,.github}
```

## Module Naming Convention

Use this format: `XX-topic-name`

- `XX` = Two-digit number (01-12)
- `topic-name` = Lowercase, hyphenated topic

**Examples:**
- `01-introduction`
- `02-context-engineering`
- `03-private-repos`
- `10-final-project`
