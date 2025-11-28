---
marp: true
theme: default
paginate: true
header: 'AI-Assisted Software Development'
footer: 'Module X - Topic Name'
---

# Master Slide Template
## AI-Assisted Software Development Course

---

<!-- _class: title -->

# Module Title
## Subtitle or Module Number

*Supporting tagline*

![bg right:40% 80%](images/module-icon.png)

---

# Slide Types Reference

This template includes examples of all slide types used in the course.

---

<!-- _class: section -->

# Section Divider
## Use for major topic transitions

---

# Content Slide - Bullet Points

## Topic Title

- Main point one
- Main point two
- Main point three

### Subsection
- Supporting detail
- Another detail

---

# Content Slide - Two Columns

<div class="columns">
<div>

## Left Column

- Point A
- Point B
- Point C

</div>
<div>

## Right Column

- Detail A
- Detail B
- Detail C

</div>
</div>

---

# Code Slide - Small Example

## Feature Name

```typescript
// Brief code example
function example(input: string): string {
  return input.toUpperCase();
}
```

**Key Point:** Explanation of the code

---

# Code Slide - Large Example

```typescript
// Larger code example with context
interface User {
  id: string;
  name: string;
  email: string;
}

class UserService {
  async findById(id: string): Promise<User | null> {
    // Implementation
    return this.repository.findOne(id);
  }
}
```

---

# Comparison Slide

| Aspect | Option A | Option B |
|--------|----------|----------|
| Speed | Fast | Moderate |
| Quality | High | Very High |
| Cost | Low | Medium |

**Recommendation:** Choose based on your specific needs.

---

# Diagram Slide - Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│     API     │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Cache    │
                    └─────────────┘
```

---

# Process Slide - Steps

## How to Do X

1. **Step One**
   - Details about step one

2. **Step Two**
   - Details about step two

3. **Step Three**
   - Details about step three

---

# Quote Slide

> "AI is best as an accelerator, not a replacement. The time saved on boilerplate lets developers focus on what matters."
>
> — Course Theme

---

# Demo Slide

<!-- _class: demo -->

# Live Demo

## Topic: [Demo Name]

### We'll demonstrate:
1. First action
2. Second action
3. Third action

*[Switch to IDE/Terminal]*

---

# Exercise Slide

<!-- _class: exercise -->

## Exercise: [Name]

**Duration:** 15 minutes

**Task:** Description of what participants will do

**Steps:**
1. First step
2. Second step
3. Third step

---

# Best Practices Slide

## Do's and Don'ts

<div class="columns">
<div>

### ✅ DO

- Good practice one
- Good practice two
- Good practice three

</div>
<div>

### ❌ DON'T

- Bad practice one
- Bad practice two
- Bad practice three

</div>
</div>

---

# Key Takeaways Slide

## What We Learned

1. **Takeaway One** - Brief explanation
2. **Takeaway Two** - Brief explanation
3. **Takeaway Three** - Brief explanation

---

# Resources Slide

## Further Learning

- **Documentation:** [Link]
- **Tutorial:** [Link]
- **Practice:** [Link]
- **Community:** [Link]

---

# Q&A Slide

<!-- _class: qa -->

# Questions?

## Key Topics to Review

- Topic A
- Topic B
- Topic C

---

# Next Module Preview

## Up Next: Module X+1

**Topics:**
- Upcoming topic 1
- Upcoming topic 2
- Upcoming topic 3

---

<!-- _class: end -->

# Thank You

## Module X Complete

**Next Steps:**
- Complete exercises
- Review materials
- Prepare for next module

---

<!-- Speaker Notes Format -->

<!--
SPEAKER NOTES:

**Timing:** X minutes for this slide

**Key Points:**
- Point to emphasize
- Important detail

**Demo Notes:**
- What to show
- Fallback if demo fails

**Transition:**
- Lead into next topic with...
-->

---

# Style Definitions

```css
/* Add to your Marp theme CSS */

section.title {
  background: linear-gradient(135deg, #2563EB, #1E40AF);
  color: white;
}

section.section {
  background: #F3F4F6;
  text-align: center;
}

section.demo {
  background: #1F2937;
  color: white;
}

section.exercise {
  background: #ECFDF5;
  border-left: 4px solid #10B981;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
```

---

*End of Master Template*
