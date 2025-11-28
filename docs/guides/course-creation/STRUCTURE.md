# Course Structure Guide

> Directory setup and organization for new courses

---

## Standard Directory Structures

### Self-Paced Course (12 modules)

```
course-name/
├── README.md                    # Course overview
├── SYLLABUS.md                  # Complete syllabus
├── modules/
│   ├── 01-topic-name/
│   │   ├── README.md            # Main content
│   │   ├── EXERCISE.md          # Hands-on lab
│   │   └── QUIZ.md              # Knowledge check
│   ├── 02-topic-name/
│   └── ... (12 modules)
├── assessments/
│   └── README.md
├── examples/
│   └── README.md
├── prompts/
│   └── README.md
├── resources/
│   ├── cheatsheet.md
│   └── glossary.md
├── templates/
│   ├── CLAUDE.md
│   └── project-setup/
└── presentation-templates/      # Optional
```

### Instructor-Led Course (8 modules)

```
course-name/
├── README.md
├── SYLLABUS.md
├── INSTRUCTOR-GUIDE.md
├── modules/
│   ├── module-01/
│   │   ├── MODULE-OVERVIEW.md
│   │   ├── 01-SLIDES.md
│   │   ├── 02-EXERCISES.md
│   │   ├── 03-LAB.md
│   │   ├── 04-CODE-EXAMPLES.md
│   │   ├── 05-QUIZ.md
│   │   └── ANSWER-KEY.md
│   └── ... (8 modules)
├── assessments/
├── examples/
├── prompts/
├── resources/
├── templates/
└── presentation-templates/
```

---

## Quick Setup Commands

### Self-Paced Course

```bash
# Create directory structure
COURSE="my-course-name"
mkdir -p courses/$COURSE/{modules,assessments,examples,prompts,resources,templates}

# Create module folders
for i in $(seq -w 01 12); do
  mkdir -p courses/$COURSE/modules/$i-module-$i
  touch courses/$COURSE/modules/$i-module-$i/{README.md,EXERCISE.md,QUIZ.md}
done

# Create root files
touch courses/$COURSE/{README.md,SYLLABUS.md}
```

### Instructor-Led Course

```bash
COURSE="my-course-name"
mkdir -p courses/$COURSE/{modules,assessments,examples,prompts,resources,templates,presentation-templates}

# Create module folders
for i in $(seq -w 01 08); do
  mkdir -p courses/$COURSE/modules/module-$i
  touch courses/$COURSE/modules/module-$i/{MODULE-OVERVIEW.md,01-SLIDES.md,02-EXERCISES.md,03-LAB.md,04-CODE-EXAMPLES.md,05-QUIZ.md,ANSWER-KEY.md}
done

touch courses/$COURSE/{README.md,SYLLABUS.md,INSTRUCTOR-GUIDE.md}
```

---

## Naming Conventions

### Folders

| Type | Convention | Example |
|------|------------|---------|
| Course | kebab-case | `ai-for-marketing-teams` |
| Module (self-paced) | `NN-topic-name` | `01-introduction` |
| Module (instructor) | `module-NN` | `module-01` |

### Files

| File | Convention | Example |
|------|------------|---------|
| Main content | UPPERCASE.md | `README.md` |
| Slides | NN-NAME.md | `01-SLIDES.md` |
| Support files | lowercase.md | `cheatsheet.md` |

---

## Module Types

### Type A: Foundation (3-4 hours)
- Introduction concepts
- Tool setup
- Basic demonstrations
- Simple exercises
- **Position:** Modules 1-3

### Type B: Skill-Building (4-5 hours)
- Deep skill development
- Multiple exercises
- Progressive complexity
- **Position:** Modules 4-7

### Type C: Integration (4 hours)
- Combines multiple skills
- Real-world application
- Complex exercises
- **Position:** Modules 8-9

### Type D: Project (8+ hours)
- Comprehensive application
- Multiple deliverables
- Milestone work
- **Position:** Module 10 (final project)

### Type E: Advanced/Bonus (2-4 hours)
- Optional content
- Specialized topics
- Exercise-focused
- **Position:** Modules 11-12

---

## Required Files

### Course Root

| File | Required | Purpose |
|------|----------|---------|
| README.md | Yes | Course overview |
| SYLLABUS.md | Yes | Complete curriculum |
| INSTRUCTOR-GUIDE.md | Instructor-led only | Teaching guide |

### Each Module

| File | Self-Paced | Instructor-Led |
|------|------------|----------------|
| README.md | Required | Optional |
| MODULE-OVERVIEW.md | Optional | Required |
| EXERCISE.md | Required | - |
| 02-EXERCISES.md | - | Required |
| QUIZ.md | Required | - |
| 05-QUIZ.md | - | Required |
| 01-SLIDES.md | - | Required |
| 03-LAB.md | - | Required |
| 04-CODE-EXAMPLES.md | - | Required |
| ANSWER-KEY.md | Optional | Required |

---

## File Size Guidelines

| File Type | Target Lines | Size |
|-----------|--------------|------|
| Module README | 300-450 | 5-10 KB |
| Exercise | 150-250 | 3-6 KB |
| Quiz | 100-150 | 3-5 KB |
| Slides | 200-300 | 10-15 KB |
| Code Examples | 200-400 | 10-20 KB |

---

## Using Templates

### Copy Course Skeleton

```bash
# Self-paced
cp -r docs/templates/course-skeletons/self-paced/* courses/my-course/

# Instructor-led
cp -r docs/templates/course-skeletons/instructor-led/* courses/my-course/
```

### Copy Module Templates

```bash
# Self-paced module
cp -r docs/templates/modules/self-paced/* courses/my-course/modules/01-intro/

# Instructor-led module
cp -r docs/templates/modules/instructor-led/* courses/my-course/modules/module-01/
```

### Replace Placeholders

All templates use `{{PLACEHOLDER}}` convention:

| Placeholder | Replace With |
|-------------|--------------|
| `{{COURSE_NAME}}` | Full course name |
| `{{COURSE_SLUG}}` | URL-friendly name |
| `{{MODULE_NUMBER}}` | Two-digit number |
| `{{MODULE_NAME}}` | Module title |
| `{{DURATION_HOURS}}` | Hours for module |

---

## Next Step

Once structure is in place, proceed to [CONTENT.md](./CONTENT.md) for content development.
