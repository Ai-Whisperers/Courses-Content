# Prompt: Generate Module Quiz

## Purpose
Create comprehensive assessments that test understanding and application of module concepts.

---

## Prompt Template

```markdown
# Generate Module Quiz

Create a comprehensive quiz for [MODULE NAME] that assesses student learning.

## Context
- **Module:** [MODULE NAME]
- **Question Count:** 10-15 questions
- **Time Limit:** 10-15 minutes
- **Purpose:** Assess comprehension and application

## Review Module Content
[Provide module README.md or link to it]

## Quiz Requirements

### Question Distribution

**Bloom's Taxonomy Levels:**
- **Recall (30%):** 3-5 questions testing memory of key concepts
- **Comprehension (40%):** 4-6 questions testing understanding
- **Application (30%):** 3-4 questions testing real-world application

**Question Types:**
- Multiple Choice (60-70%)
- True/False (20-30%)
- Short Answer (10-20%)

### Coverage
Ensure questions cover:
- All major sections of the module
- Key learning objectives
- Important frameworks/concepts
- Real-world applications
- Common misconceptions

---

## Question Format Templates

### Multiple Choice Format
```markdown
**[Question Number]. [Question Text]**

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

<details>
<summary>Answer</summary>

**Correct Answer:** [Letter]

**Explanation:** [2-3 sentences explaining why this is correct and why other options are wrong]

**Learning Objective:** [Which LO this assesses]
</details>
```

### True/False Format
```markdown
**[Question Number]. True or False: [Statement]**

<details>
<summary>Answer</summary>

**Correct Answer:** [True/False]

**Explanation:** [Why this is true/false, with context from module]

**Learning Objective:** [Which LO this assesses]
</details>
```

### Short Answer Format
```markdown
**[Question Number]. [Question requiring brief written response]**

<details>
<summary>Sample Answer</summary>

**Key Points to Include:**
- [Point 1]
- [Point 2]
- [Point 3]

**Full Sample Answer:**
[Example of good answer]

**Learning Objective:** [Which LO this assesses]
</details>
```

---

## Quality Criteria for Questions

### Recall Questions (30%)
Test memory of:
- Definitions
- Categories/types
- Key concepts
- Important facts

**Example:**
```markdown
**1. What does AI stand for in the context of this course?**

A) Automated Intelligence
B) Artificial Intelligence
C) Advanced Integration
D) Algorithmic Improvement

<details>
<summary>Answer</summary>

**Correct Answer:** B

**Explanation:** AI stands for Artificial Intelligence, which we defined as software that can perform tasks typically requiring human intelligence. Option A is not standard terminology, C and D describe other concepts but not AI.

**Learning Objective:** Define AI and machine learning in business terms
</details>
```

### Comprehension Questions (40%)
Test understanding of:
- Relationships between concepts
- Differences and similarities
- Implications and consequences
- Interpretation of examples

**Example:**
```markdown
**5. How does Generative AI differ from Predictive AI?**

A) Generative AI creates new content; Predictive AI forecasts outcomes
B) Generative AI is newer; Predictive AI is outdated
C) Generative AI is free; Predictive AI is expensive
D) Generative AI is more accurate; Predictive AI makes mistakes

<details>
<summary>Answer</summary>

**Correct Answer:** A

**Explanation:** Generative AI creates new content (text, images, code) while Predictive AI analyzes historical data to forecast future outcomes. Both are current technologies (B is wrong), pricing varies (C is wrong), and accuracy depends on the use case (D is wrong).

**Learning Objective:** Distinguish between different types of AI
</details>
```

### Application Questions (30%)
Test ability to:
- Apply concepts to scenarios
- Make decisions based on learning
- Solve realistic problems
- Evaluate situations

**Example:**
```markdown
**10. Your company wants to reduce time spent writing customer service responses. Which type of AI would be most appropriate?**

A) Computer Vision
B) Generative AI (NLP)
C) Predictive AI
D) Recommendation Systems

<details>
<summary>Answer</summary>

**Correct Answer:** B

**Explanation:** Generative AI with Natural Language Processing is ideal for creating written responses to customer inquiries. Computer Vision (A) works with images, Predictive AI (C) would forecast issues but not write responses, and Recommendation Systems (D) would suggest products but not generate text responses.

**Learning Objective:** Identify appropriate AI types for specific business processes
</details>
```

---

## Question Quality Checklist

For each question, verify:

### Clarity
- ✅ Question is unambiguous
- ✅ All options are clearly different
- ✅ No trick questions
- ✅ Professional language

### Accuracy
- ✅ Correct answer is definitively correct
- ✅ Wrong answers are plausibly wrong
- ✅ Aligns with module content
- ✅ No outdated information

### Fairness
- ✅ Can be answered from module content
- ✅ Appropriate difficulty level
- ✅ No unnecessarily complex language
- ✅ Tests learning, not test-taking skills

### Effectiveness
- ✅ Assesses stated learning objective
- ✅ Distinguishes understanding from guessing
- ✅ Explanation adds value
- ✅ Realistic business context

---

## Common Question Mistakes to Avoid

### ❌ Avoid "All of the Above"
**Bad:**
```
D) All of the above
```
**Why:** Makes question too easy or too confusing

### ❌ Avoid Negatives in Questions
**Bad:**
```
Which of the following is NOT a type of AI?
```
**Better:**
```
Which of the following describes Generative AI?
```

### ❌ Avoid Absolute Words
**Bad:**
```
AI always requires large amounts of data
```
**Better:**
```
AI typically performs better with larger datasets
```

### ❌ Avoid Overlapping Options
**Bad:**
```
A) 50-75%
B) 60-80%
C) 70-90%
```
**Better:**
```
A) Less than 50%
B) 50-75%
C) More than 75%
```

### ❌ Avoid Trivial Questions
**Bad:**
```
What page was the ROI formula on?
```
**Better:**
```
How would you calculate AI implementation ROI?
```

---

## Special Question Types

### Scenario-Based Questions
```markdown
**8. ABC Corporation implemented an AI chatbot for customer service. After 6 months, customer satisfaction dropped from 85% to 78%. What is the most likely issue?**

A) The AI technology isn't advanced enough yet
B) Customers prefer human interaction for all queries
C) The chatbot wasn't properly trained or optimized
D) AI can't handle customer service effectively

<details>
<summary>Answer</summary>

**Correct Answer:** C

**Explanation:** The most common reason for poor chatbot performance is inadequate training, optimization, or escalation paths to humans. Option A is unlikely as modern AI is quite capable. Option B is too absolute - many customers accept AI for simple queries. Option D contradicts many successful implementations. Proper training and continuous improvement typically resolve these issues.

**Learning Objective:** Understand limitations and requirements for successful AI implementation
</details>
```

### Case Analysis Questions
```markdown
**12. A retail company wants to use AI to predict which customers will churn. They have 500 customer records from the past month. Is this sufficient data?**

A) Yes, 500 records is plenty for AI
B) No, they need at least 100,000 records
C) It depends on how many variables they're tracking
D) They should wait to collect 1 year of data

<details>
<summary>Answer</summary>

**Correct Answer:** C

**Explanation:** Data sufficiency depends on the complexity of the model and number of features. For simple churn prediction with few variables, 500 records might be a start, but more is better. Options A and B provide absolute numbers without context. Option D delays unnecessarily - they could start analyzing while collecting more data. The quality and relevance of data matter as much as quantity.

**Learning Objective:** Understand data requirements for AI projects
</details>
```

---

## Quiz Structure

Organize quiz as:

```markdown
# Module [X]: [Module Name] - Quiz

**Duration:** 10-15 minutes
**Questions:** [Number]
**Passing Score:** [X]%

---

## Instructions

1. Answer all questions based on module content
2. Some questions may have multiple parts
3. For short answer questions, 2-3 sentences is sufficient
4. You may refer to module materials
5. Focus on understanding, not memorization

---

## Questions

### Part 1: Recall (Remembering Key Concepts)

[3-5 recall questions]

### Part 2: Comprehension (Understanding)

[4-6 comprehension questions]

### Part 3: Application (Using Knowledge)

[3-4 application questions]

---

## Answer Key

[All answers with explanations]
[Learning objectives mapped]
[Scoring guide]

---

## Grading Rubric

**Scoring:**
- Each question worth [points]
- Total possible: [X] points
- Passing: [X]% ([Y] points)

**Performance Levels:**
- Excellent (90-100%): Strong grasp of concepts
- Good (80-89%): Solid understanding
- Satisfactory (70-79%): Basic comprehension
- Needs Review (<70%): Review module content
```

---

## Specific Requirements for [MODULE NAME]

**Key Concepts to Test:**
[List major concepts from module]

**Critical Understanding:**
[What students absolutely must know]

**Common Confusions:**
[Misconceptions to address]

**Real-World Application:**
[Scenarios relevant to this module]

---

## Generate Quiz Now

Please create a comprehensive quiz for [MODULE NAME] with:

**Question Mix:**
- 3-5 recall questions (definitions, concepts)
- 4-6 comprehension questions (understanding)
- 3-4 application questions (scenarios)

**Total:** 10-15 questions

**Requirements:**
- All questions in specified format
- Complete with answers and explanations
- Mapped to learning objectives
- Progressive difficulty
- Business-relevant scenarios
- Clear and unambiguous

Generate the complete quiz in your next response.
```

---

## Usage Instructions

1. **Specify module name**
2. **Provide module content** (or link)
3. **Note any specific concepts to emphasize**
4. **Paste into Claude**
5. **Review questions for quality**

---

## Follow-Up Prompts

### To adjust difficulty:
```markdown
These questions are too [easy/hard]. Please revise to:
- [Increase/Decrease] complexity
- Focus more on [specific concept]
- Add more [recall/application] questions
- Make scenarios more [realistic/accessible]
```

### To improve questions:
```markdown
Question [X] is ambiguous. Please revise to:
- Make options more clearly distinct
- Remove overlapping choices
- Clarify the scenario
- Make correct answer more definitively correct
```

### To add more coverage:
```markdown
The quiz doesn't cover [concept] from the module.
Please add 2-3 questions testing:
- [Specific aspect 1]
- [Specific aspect 2]
```

---

**Last Updated:** November 25, 2025
**Version:** 1.0
