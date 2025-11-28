# Master Course Template

> **How to Use This Template**: Copy this entire structure for each new course. Replace all `[PLACEHOLDERS]` with actual content. Follow the patterns established in QA-Automation-with-AI as the gold standard.

---

## Part 1: Course Directory Structure

```
[course-name]/
├── README.md                           # Course overview (see Section 2)
├── SYLLABUS.md                         # Complete syllabus (see Section 3)
├── [DOMAIN]_GUIDE.md                   # Domain-specific handbook (optional)
│
├── modules/                            # Main learning content
│   ├── 01-[topic-name]/               # Each module follows standard structure
│   │   ├── MODULE-OVERVIEW.md         # Optional: detailed module breakdown
│   │   ├── README.md                  # Main lesson content
│   │   ├── EXERCISE.md                # Hands-on lab
│   │   ├── QUIZ.md                    # Knowledge assessment
│   │   ├── CODE-EXAMPLES.md           # Code samples (if applicable)
│   │   └── ANSWER-KEY.md              # Solutions (instructor only)
│   ├── 02-[topic-name]/
│   │   └── ... (same structure)
│   └── [NN]-final-project/            # Capstone module
│       ├── README.md
│       ├── PROJECT-BRIEF.md
│       ├── GRADING-RUBRIC.md
│       └── SUBMISSION-GUIDE.md
│
├── assessments/                        # Assessment materials
│   ├── README.md                      # Assessment overview & policies
│   └── module-quizzes/                # Quiz question banks
│       └── module-01-quiz.md
│
├── templates/                          # Reusable templates for students
│   ├── README.md                      # Template usage guide
│   ├── CLAUDE.md                      # AI context template
│   └── project-setup/                 # Project scaffolding
│       ├── .claude/settings.json
│       ├── .cursor/rules/[domain].mdc
│       ├── .github/copilot-instructions.md
│       └── .gemini/settings.json
│
├── examples/                           # Code examples by technology
│   ├── README.md
│   └── [technology]-examples/
│       └── [example-file].[ext]
│
├── prompts/                            # AI prompt library
│   └── README.md                      # Organized prompts by category
│
├── resources/                          # Additional learning materials
│   ├── cheatsheet.md                  # Quick reference
│   ├── glossary.md                    # Domain terminology
│   ├── troubleshooting-guide.md       # Common issues
│   └── ai-tools-configuration-guide.md
│
└── presentation-templates/             # Instructor materials
    ├── README.md
    ├── MASTER-SLIDE-DECK-TEMPLATE.md
    ├── MODULE-SLIDE-TEMPLATE.md
    ├── SPEAKER-NOTES-TEMPLATE.md
    └── VISUAL-DIAGRAMS-LIBRARY.md
```

---

## Part 2: README.md Template

```markdown
# [Course Name] [Optional Emoji]

## [TIER BADGE] - [Module Count] Complete Modules

> **Brief description** of what transformation this course provides.
> **Alternative Formats:** Link to related courses if applicable
> **See:** Link to any important notices

---

## Course Overview

[2-3 sentence description of the course transformation journey]

**Duration**: [XX-XX] hours
**Format**: [Self-paced/Instructor-led/Hybrid] with [hands-on projects/labs/etc.]
**Prerequisites**: [List key prerequisites]

---

## Course Structure

```
[course-name]/
├── README.md                    # This file
├── SYLLABUS.md                  # Complete course syllabus
├── modules/                     # Course content by module
│   ├── 01-[first-topic]/
│   ├── 02-[second-topic]/
│   └── ...
├── templates/                   # Reusable templates
├── examples/                    # Code examples
├── prompts/                     # AI prompt library
└── resources/                   # Additional resources
```

---

## Quick Start

### 1. [First Setup Step]

```bash
# Commands for setup
[command 1]
[command 2]
```

### 2. Start with Module 1

Open `modules/01-[topic]/README.md` and follow the instructions.

### 3. Complete Exercises

Each module has a hands-on `EXERCISE.md` file.

### 4. Take Assessments

Test your knowledge with the `QUIZ.md` file in each module folder.

### 5. Build Final Project

Apply everything in Module [N]'s real-world project.

---

## Learning Objectives

By completing this course, you will be able to:

1. [Learning objective 1]
2. [Learning objective 2]
3. [Learning objective 3]
4. [Learning objective 4]
5. [Learning objective 5]
6. [Learning objective 6]
7. [Learning objective 7]
8. [Learning objective 8]

---

## Module Overview

| Module | Topic | Duration | Key Skills |
|--------|-------|----------|------------|
| 1 | [Topic] | [X] hours | [Skills] |
| 2 | [Topic] | [X] hours | [Skills] |
| ... | ... | ... | ... |
| N | Final Project | [X]+ hours | [Skills] |

---

## Prerequisites Check

Before starting, ensure you have:

- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]
- [ ] [Prerequisite 3]
- [ ] [Prerequisite 4]
- [ ] [Prerequisite 5]

---

## Support

- **Questions**: Open an issue in this repository
- **Discussion**: Join our Discord community
- **Feedback**: Submit via course evaluation form

---

## License

[License Type] - See LICENSE file

---

*Created by [Organization] - [Tagline]*
```

---

## Part 3: SYLLABUS.md Template

```markdown
# Course Syllabus: [Full Course Title]

## Course Information

- **Course Title**: [Full Title]
- **Duration**: [XX-XX] hours ([X-X] weeks, [part-time/full-time])
- **Format**: [Self-paced online/Instructor-led/Hybrid] with [hands-on projects]
- **Level**: [Beginner/Intermediate/Advanced]

---

## Course Description

[3-5 sentence description of the course, target transformation, and practical applications. Mention specific tools, technologies, and skills covered.]

---

## Learning Outcomes

Upon successful completion, students will be able to:

1. **[Verb + Skill]** - [Brief description]
2. **[Verb + Skill]** - [Brief description]
3. **[Verb + Skill]** - [Brief description]
4. **[Verb + Skill]** - [Brief description]
5. **[Verb + Skill]** - [Brief description]
6. **[Verb + Skill]** - [Brief description]
7. **[Verb + Skill]** - [Brief description]
8. **[Verb + Skill]** - [Brief description]

---

## Module Schedule

### Week [X-X]: [Phase Name]

**Module [N]: [Module Title] ([X] hours)**
- [Topic 1]
- [Topic 2]
- [Topic 3]
- [Topic 4]

**Module [N+1]: [Module Title] ([X] hours)**
- [Topic 1]
- [Topic 2]
- [Topic 3]
- [Topic 4]

### Week [X-X]: [Phase Name]

[Continue pattern for all modules...]

---

## Assessment Structure

| Component | Weight | Description |
|-----------|--------|-------------|
| Module Exercises | [XX]% | Hands-on labs for each module |
| Quizzes | [XX]% | Knowledge checks after each module |
| [Milestones/Projects] | [XX]% | [Description] |
| Final Project | [XX]% | Comprehensive real-world application |

### Grading Scale

- A: 90-100% - Exceeds expectations
- B: 80-89% - Meets expectations
- C: 70-79% - Satisfactory
- F: Below 70% - Needs improvement

---

## Required Materials

### Software ([Free/Paid])
- [Tool 1] - [Description]
- [Tool 2] - [Description]
- [Tool 3] - [Description]

### Accounts ([Free/Paid])
- [Account 1]
- [Account 2]

---

## Weekly Time Commitment

- **Content Review**: [X-X] hours
- **Hands-on Practice**: [X-X] hours
- **Exercises**: [X-X] hours
- **Total**: [X-X] hours per week

---

## Course Policies

### Completion Requirements
- Complete all module exercises
- Pass all quizzes ([XX]% minimum)
- Submit final project
- Achieve overall score of [XX]%+

### Academic Integrity
- All work must be your own
- AI assistance is [encouraged/allowed/restricted] but must be documented
- Plagiarism results in course failure

### Late Submissions
- Exercises: [X]% penalty per day late
- Final Project: [Policy description]

---

## Support Resources

### Technical Support
- [Support channel 1]
- [Support channel 2]
- [Support channel 3]

### Learning Resources
- [Resource 1]
- [Resource 2]
- [Resource 3]

---

## Instructor Information

**[Instructor/Organization Name]**
- Contact: [Contact method]
- Office Hours: [Schedule]
- Response Time: Within [XX-XX] hours

---

## Course Updates

This syllabus may be updated to reflect:
- [Update reason 1]
- [Update reason 2]
- [Update reason 3]

Last Updated: [Month Year]

---

*[Closing statement about course philosophy and expectations]*
```

---

## Part 4: Module README.md Template

```markdown
# Module [N]: [Module Title]

**Duration**: [X] hours
**Prerequisites**: [Module N-1 or specific requirements]

---

## Learning Objectives

By the end of this module, you will be able to:

1. [Specific, measurable objective 1]
2. [Specific, measurable objective 2]
3. [Specific, measurable objective 3]
4. [Specific, measurable objective 4]

---

## [Section Number]. [Section Title]

### [Subsection Title]

[Content explaining the concept with:]
- Clear explanations
- Real-world context
- Why this matters

### Key Concepts

| Term | Definition |
|------|------------|
| [Term 1] | [Definition] |
| [Term 2] | [Definition] |

### Diagram/Visual (if applicable)

```
[ASCII diagram or description of visual]
```

---

## [Section Number]. [Section Title]

### [Subsection Title]

[Content with code examples:]

```[language]
// Example code with comments
[code here]
```

### Best Practices

1. **[Practice 1]** - [Explanation]
2. **[Practice 2]** - [Explanation]
3. **[Practice 3]** - [Explanation]

### Common Pitfalls

- **[Pitfall 1]**: [How to avoid]
- **[Pitfall 2]**: [How to avoid]

---

## [Section Number]. Hands-on Exercise

See [EXERCISE.md](./EXERCISE.md) for the complete lab.

**Quick Overview:**
- Part 1: [Task description] (~[X] min)
- Part 2: [Task description] (~[X] min)
- Part 3: [Task description] (~[X] min)

---

## Knowledge Check

Before moving on, make sure you can answer:

1. [Question about key concept 1]?
2. [Question about key concept 2]?
3. [Question about application]?

Take the [Quiz](./QUIZ.md) when ready.

---

## Summary

In this module, you learned:

- **[Key takeaway 1]**
- **[Key takeaway 2]**
- **[Key takeaway 3]**
- **[Key takeaway 4]**

---

## Next Steps

1. Complete the [Exercise](./EXERCISE.md)
2. Take the [Quiz](./QUIZ.md)
3. Move to [Module N+1: Topic](../[next-module]/README.md)

---

## Resources

### Required Reading
- [Resource 1]

### Optional Deep Dives
- [Resource 2]
- [Resource 3]

### Tools Used
- [Tool 1] - [URL]
- [Tool 2] - [URL]
```

---

## Part 5: EXERCISE.md Template

```markdown
# Module [N] Exercise: [Exercise Title]

**Duration**: [X] hours
**Difficulty**: [Beginner/Intermediate/Advanced]

---

## Objective

[1-2 sentences describing what students will accomplish]

---

## Setup

### Prerequisites
- [ ] Completed Module [N] content
- [ ] [Software/tool requirement]
- [ ] [Access requirement]

### Environment Setup

```bash
# Step 1: [Description]
[command]

# Step 2: [Description]
[command]
```

---

## Part 1: [Part Title] (~[X] minutes)

### Task

[Clear description of what to do]

### Steps

1. [Step 1 with specific instructions]
2. [Step 2 with specific instructions]
3. [Step 3 with specific instructions]

### Expected Outcome

[What the result should look like]

### Hints (if stuck)

<details>
<summary>Hint 1</summary>
[Hint content]
</details>

<details>
<summary>Hint 2</summary>
[Hint content]
</details>

---

## Part 2: [Part Title] (~[X] minutes)

### Task

[Clear description]

### Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Outcome

[Description]

---

## Part 3: [Part Title] (~[X] minutes)

[Continue pattern...]

---

## Deliverables

Submit the following:

- [ ] [Deliverable 1 - specific file or artifact]
- [ ] [Deliverable 2]
- [ ] [Deliverable 3]
- [ ] [AI Interaction Log (if applicable)]
- [ ] [Brief reflection - X paragraphs]

---

## Reflection Questions

Answer these in your submission:

1. [Question about process]
2. [Question about challenges]
3. [Question about learning]
4. [Question about application]

---

## Grading Rubric

| Criterion | Points | Excellent (100%) | Good (80%) | Satisfactory (60%) | Needs Work (<60%) |
|-----------|--------|------------------|------------|--------------------|--------------------|
| [Criterion 1] | [XX]% | [Description] | [Description] | [Description] | [Description] |
| [Criterion 2] | [XX]% | [Description] | [Description] | [Description] | [Description] |
| [Criterion 3] | [XX]% | [Description] | [Description] | [Description] | [Description] |
| [Criterion 4] | [XX]% | [Description] | [Description] | [Description] | [Description] |
| [Criterion 5] | [XX]% | [Description] | [Description] | [Description] | [Description] |

**Total**: 100%

---

## Example Solution

<details>
<summary>Click to reveal example (try on your own first!)</summary>

```[language]
// Example solution code
[code]
```

**Explanation:**
[Brief explanation of the solution approach]

</details>

---

## Common Issues

| Problem | Solution |
|---------|----------|
| [Issue 1] | [Fix] |
| [Issue 2] | [Fix] |
| [Issue 3] | [Fix] |

---

## Next Steps

After completing this exercise:
1. Submit your deliverables
2. Take the [Module Quiz](./QUIZ.md)
3. Proceed to [Module N+1](../[next-module]/README.md)
```

---

## Part 6: QUIZ.md Template

```markdown
# Module [N] Quiz: [Module Title]

**Time Limit**: [XX] minutes
**Passing Score**: [XX]%
**Total Points**: [XX] points

---

## Instructions

- Read each question carefully
- [Open notes allowed / No external resources]
- [AI tools NOT allowed / AI tools allowed with documentation]
- Select the best answer for each question
- [X] attempts allowed with [X]-hour delay between attempts

---

## Section 1: Multiple Choice (X points each)

### Question 1

[Question text]

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

---

### Question 2

[Question text]

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

---

### Question 3

[Question text]

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

---

[Continue for 5-8 multiple choice questions...]

---

## Section 2: True/False (X point each)

### Question [N]

[Statement to evaluate]

- [ ] True
- [ ] False

---

### Question [N+1]

[Statement to evaluate]

- [ ] True
- [ ] False

---

[Continue for 3-5 true/false questions...]

---

## Section 3: Scenario-Based (X points each)

### Question [N]

**Scenario:**
[Describe a realistic scenario]

**Question:**
[Ask about the best approach, decision, or action]

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

**Explain your reasoning** (optional for partial credit):
[Space for written response]

---

### Question [N+1]

**Scenario:**
[Another realistic scenario]

**Question:**
[Question about the scenario]

[Answer options or open response]

---

## Section 4: Short Answer (X points each) [Optional]

### Question [N]

[Question requiring brief written response]

**Your Answer:**
_______________________________________________

---

## Score Summary

| Section | Points Earned | Points Possible |
|---------|---------------|-----------------|
| Multiple Choice | __ | [X] |
| True/False | __ | [X] |
| Scenario-Based | __ | [X] |
| Short Answer | __ | [X] |
| **Total** | **__** | **[XX]** |

**Percentage**: ___%
**Result**: [ ] Pass [ ] Retake Required

---

## Answer Key (Instructor Only)

<details>
<summary>Click to reveal answers</summary>

### Multiple Choice
1. [Answer] - [Explanation]
2. [Answer] - [Explanation]
...

### True/False
[N]. [Answer] - [Explanation]
...

### Scenario-Based
[N]. [Answer] - [Explanation]
...

### Short Answer
[N]. [Key points to look for]
...

</details>
```

---

## Part 7: Assessment README.md Template

```markdown
# [Course Name] - Assessment Guide

## Overview

This document provides comprehensive guidance on assessments, grading, and academic policies for [Course Name].

---

## Assessment Components

| Component | Weight | Quantity | Due Date |
|-----------|--------|----------|----------|
| Module Exercises | [XX]% | [N] exercises | End of each module |
| Module Quizzes | [XX]% | [N] quizzes | Before next module |
| Milestone Projects | [XX]% | [N] milestones | Weeks [X], [X], [X] |
| Final Capstone | [XX]% | 1 project | Week [X] |
| **Total** | **100%** | | |

---

## Detailed Assessment Descriptions

### Module Exercises ([XX]%)

**Purpose**: Apply concepts through hands-on practice

**Format**:
- Located in each module's `EXERCISE.md`
- Duration: [X-X] hours per exercise
- Deliverables: [Description]

**Grading Criteria**:
- Functionality/Correctness: [XX]%
- Code Quality: [XX]%
- Completeness: [XX]%
- Documentation: [XX]%
- [Domain-specific criterion]: [XX]%

### Module Quizzes ([XX]%)

**Purpose**: Validate understanding of key concepts

**Format**:
- [X-X] questions per quiz
- Time limit: [XX] minutes
- Question types: Multiple choice, True/False, Scenario-based

**Policies**:
- [X] attempts allowed
- [X]-hour delay between attempts
- [Open/Closed] notes
- AI tools [allowed/not allowed]

### Milestone Projects ([XX]%)

**Purpose**: Progressive checkpoints demonstrating skill development

| Milestone | Week | Focus Area | Weight |
|-----------|------|------------|--------|
| 1 | [X] | [Focus] | [X]% |
| 2 | [X] | [Focus] | [X]% |
| 3 | [X] | [Focus] | [X]% |

### Final Capstone ([XX]%)

**Purpose**: Demonstrate comprehensive mastery

**Requirements**:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]
- [Requirement 4]
- [Presentation/Demo requirement]

---

## Grading Scale

| Grade | Percentage | Description |
|-------|------------|-------------|
| A | 90-100% | Exceeds all expectations |
| B | 80-89% | Meets all expectations |
| C | 70-79% | Meets minimum requirements |
| F | Below 70% | Does not meet requirements |

**Passing Requirements**:
- Overall score: [XX]%+
- Final project: Must submit
- [Additional requirements]

---

## Submission Guidelines

### What to Submit

1. **Code/Artifacts**: [Description]
2. **Documentation**: [Description]
3. **AI Interaction Log**: [If applicable]
4. **Reflection**: [X] paragraph summary

### Where to Submit

- [Submission platform/method]
- [Repository requirements]
- [File naming conventions]

### Submission Checklist

- [ ] All deliverables included
- [ ] Code runs without errors
- [ ] Documentation complete
- [ ] AI interactions documented
- [ ] Reflection included

---

## Late Submission Policy

| Assessment Type | Grace Period | Penalty | Maximum Late |
|-----------------|--------------|---------|--------------|
| Exercises | [X] days | [X]%/day | [X] days |
| Quizzes | [N/A or X days] | [X]%/day | [X] days |
| Milestones | [X] days | [X]%/day | [X] days |
| Final Project | [X] days | [X]%/day | [X] days |

---

## Academic Integrity

### Encouraged
- [Activity 1]
- [Activity 2]
- AI assistance with documentation

### Prohibited
- [Prohibited activity 1]
- [Prohibited activity 2]
- Submitting work without understanding

### Consequences
- First offense: [Consequence]
- Second offense: [Consequence]
- Severe violations: Course failure

---

## Accommodation Requests

Students requiring accommodations should:
1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## Appeals Process

To appeal a grade:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Timeline**: [X] days from grade posting

---

## Questions?

Contact: [Contact method]
Response time: [X-X] hours
```

---

## Part 8: Prompts Library README.md Template

```markdown
# [Course Name] - AI Prompt Library

A curated collection of prompts for [domain] tasks.

---

## How to Use This Library

1. **Choose** the appropriate category for your task
2. **Copy** the prompt template
3. **Customize** the bracketed placeholders
4. **Iterate** based on responses

### Prompt Structure Best Practice

```
Role: "Act as a [specific role]..."
Context: "We are working on [situation]..."
Task: "[Specific action to take]..."
Constraints: "Use [tools/frameworks], follow [standards]..."
Output Format: "Output as [format]..."
```

---

## Category 1: [Category Name]

### Prompt 1.1: [Prompt Title]

**Use Case**: [When to use this prompt]

```
[Prompt template with [PLACEHOLDERS] for customization]
```

**Example Usage**:
```
[Filled-in example]
```

---

### Prompt 1.2: [Prompt Title]

**Use Case**: [When to use]

```
[Prompt template]
```

---

## Category 2: [Category Name]

### Prompt 2.1: [Prompt Title]

**Use Case**: [When to use]

```
[Prompt template]
```

---

[Continue for all categories...]

---

## Category N: [Debugging/Troubleshooting]

### Prompt N.1: [Debugging Prompt]

**Use Case**: [When to use]

```
[Prompt template]
```

---

## Quick Reference Patterns

### Pattern 1: [Pattern Name]

```
[Short prompt pattern]
```

### Pattern 2: [Pattern Name]

```
[Short prompt pattern]
```

---

## Prompt Chaining Examples

### Chain 1: [Workflow Name]

1. **Step 1**: [Description]
   ```
   [Prompt 1]
   ```

2. **Step 2**: [Description]
   ```
   [Prompt 2 using output from 1]
   ```

3. **Step 3**: [Description]
   ```
   [Prompt 3 using outputs from 1 & 2]
   ```

---

## Tips for Effective Prompting

1. **Be Specific**: [Tip detail]
2. **Provide Context**: [Tip detail]
3. **Iterate**: [Tip detail]
4. **Verify Outputs**: [Tip detail]
5. **Document**: [Tip detail]
```

---

## Part 9: Quality Checklist

Use this checklist before marking a course as complete:

### Content Quality
- [ ] All modules have README, EXERCISE, and QUIZ files
- [ ] Learning objectives are measurable (using Bloom's taxonomy verbs)
- [ ] Code examples are tested and functional
- [ ] No placeholder text remaining
- [ ] Consistent formatting throughout

### Technical Accuracy
- [ ] All commands verified on target platforms
- [ ] Tool versions are current
- [ ] Links are valid
- [ ] Code examples follow best practices

### Assessment Alignment
- [ ] Quizzes cover module content
- [ ] Exercises reinforce learning objectives
- [ ] Grading rubrics are clear and fair
- [ ] Final project integrates all skills

### User Experience
- [ ] Clear navigation between modules
- [ ] Progressive difficulty curve
- [ ] Adequate scaffolding for complex tasks
- [ ] Support resources available

### Accessibility
- [ ] Alt text for images (if any)
- [ ] Code blocks properly formatted
- [ ] Tables are accessible
- [ ] Color is not the only indicator

---

## Version Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Author] | Initial creation |
| 1.1 | [Date] | [Author] | [Changes] |

---

*Template Version: 1.0*
*Last Updated: November 2025*
*Based on: QA-Automation-with-AI course structure*
