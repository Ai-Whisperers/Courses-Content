# Content Development Guide

> Writing high-quality course content with AI assistance

---

## Content Ratios

| Component | Percentage | Purpose |
|-----------|------------|---------|
| Theory | 20% | Conceptual understanding |
| Demonstration | 30% | Show how it's done |
| Practice | 40% | Hands-on application |
| Assessment | 10% | Knowledge validation |

---

## Writing Standards

### Module README Structure

```markdown
# Module [X]: [Title]

**Duration:** [X] hours
**Level:** [Beginner/Intermediate/Advanced]
**Prerequisites:** [List]

---

## Learning Objectives

By the end of this module, you will be able to:

1. [Objective 1 - use Bloom's verbs]
2. [Objective 2]
3. [Objective 3]
4. [Objective 4]

---

## Module Overview

[2-3 paragraphs explaining what this module covers and why it matters]

---

## [Topic 1]

### [Subtopic 1.1]

[Content with examples]

### [Subtopic 1.2]

[Content with code blocks if applicable]

---

## [Topic 2]

[Continue with clear sections]

---

## Best Practices

- [Practice 1]
- [Practice 2]
- [Practice 3]

---

## Common Pitfalls

| Pitfall | Why It Happens | How to Avoid |
|---------|----------------|--------------|
| [Issue 1] | [Cause] | [Solution] |
| [Issue 2] | [Cause] | [Solution] |

---

## Knowledge Check

1. [Question testing key concept 1]
2. [Question testing key concept 2]
3. [Question testing application]

---

## Summary

**Key Takeaways:**
- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]

---

## What's Next

In the next module, we'll cover [preview of next module].

---

## Additional Resources

- [Resource 1](link)
- [Resource 2](link)
```

---

## AI-Assisted Content Creation

### Recommended Workflow

```
1. Prepare Context (10%)
   └── Gather requirements, examples, style guide

2. Generate with AI (70%)
   └── Use Claude/GPT with detailed prompts

3. Review & Refine (15%)
   └── Check accuracy, improve flow

4. Polish (5%)
   └── Final formatting, links
```

### Effective Prompts

**For Module Content:**
```
Create Module [X]: [Title] for the [Course Name] course.

Target Audience: [Description]
Duration: [X] hours
Level: [Level]

Topics to Cover:
1. [Topic 1]
2. [Topic 2]
3. [Topic 3]

Requirements:
- 300-450 lines
- Include 4 learning objectives using Bloom's taxonomy
- Provide real-world examples
- Include a Best Practices section
- Add Common Pitfalls table
- End with 3 knowledge check questions

Style: Professional but approachable. Use second person ("you").
Reference: Match the style of [reference file path]
```

**For Exercises:**
```
Create a hands-on exercise for Module [X]: [Title].

Context: Students have just learned about [topics covered].

Requirements:
- 4-5 progressive tasks
- Estimated time: [X] minutes per task
- Include success criteria for each task
- Add hints for common issues
- Final task should be a challenge (optional)

Format: Use the exercise template structure.
```

**For Quizzes:**
```
Create a 10-question quiz for Module [X]: [Title].

Topics Covered:
1. [Topic 1]
2. [Topic 2]
3. [Topic 3]

Question Mix:
- 5 multiple choice (4 options each)
- 3 scenario-based
- 2 practical application

Include:
- Clear question stems
- Plausible distractors
- Answer key with explanations
- Difficulty: 60% medium, 30% easy, 10% hard
```

---

## Code Examples

### Standards

- All code must be tested and functional
- Include necessary imports
- Add meaningful comments
- Use consistent formatting
- Provide expected output

### Template

```markdown
## Example: [Title]

**Purpose:** [What this demonstrates]

```[language]
// [Description of what this code does]

[Code block]
```

**Expected Output:**
```
[Output]
```

**Key Points:**
- [Point 1]
- [Point 2]
```

---

## Quality Checklist

### Content Quality

- [ ] Accurate technical information
- [ ] Current examples (2024-2025)
- [ ] Clear, jargon-free language
- [ ] Logical flow between sections
- [ ] Appropriate depth for audience

### Formatting

- [ ] Consistent heading hierarchy
- [ ] Proper markdown syntax
- [ ] Code blocks with language tags
- [ ] Tables formatted correctly
- [ ] Links working

### Engagement

- [ ] Engaging opening paragraph
- [ ] Real-world relevance clear
- [ ] Interactive elements included
- [ ] Clear action items
- [ ] Strong summary/takeaways

---

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Too technical | Wrong audience assumption | Simplify, add explanations |
| Too shallow | Rushing content | Add examples, details |
| Wall of text | No structure | Add headings, lists, tables |
| Outdated info | Old sources | Verify current tools/versions |
| No practice | Theory focus | Add exercises, examples |

---

## Next Step

After content is developed, run through [CHECKLIST.md](./CHECKLIST.md) for quality assurance.
