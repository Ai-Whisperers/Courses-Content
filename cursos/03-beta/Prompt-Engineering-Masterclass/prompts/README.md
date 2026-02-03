# Prompt Engineering Masterclass - Prompt Library

> 50+ Professional Prompts with Patterns and Examples

---

## Prompt Patterns

### Pattern 1: Role-Based Prompting

```
You are a [expert type] with [X years] of experience in [domain].

Your expertise includes:
- [Skill 1]
- [Skill 2]
- [Skill 3]

Using this expertise, [task description].
```

**Example:**
```
You are a senior technical writer with 10 years of experience in software documentation.

Your expertise includes:
- API documentation
- Developer guides
- Release notes

Using this expertise, review this API endpoint description and improve it for clarity.
```

---

### Pattern 2: Few-Shot Learning

```
Here are examples of [task]:

Example 1:
Input: [input 1]
Output: [output 1]

Example 2:
Input: [input 2]
Output: [output 2]

Example 3:
Input: [input 3]
Output: [output 3]

Now, apply the same pattern to:
Input: [new input]
Output:
```

**Example:**
```
Here are examples of converting informal text to formal:

Example 1:
Input: "gonna need that report asap"
Output: "I would appreciate receiving the report at your earliest convenience."

Example 2:
Input: "this is totally wrong lol"
Output: "I have identified some concerns with this approach that warrant discussion."

Now, apply the same pattern to:
Input: "hey can u look at this when u get a sec"
Output:
```

---

### Pattern 3: Chain-of-Thought

```
Let's solve this step by step.

Problem: [problem description]

Step 1: [First, identify/analyze...]
Step 2: [Then, consider...]
Step 3: [Next, evaluate...]
Step 4: [Finally, conclude...]

Reasoning:
[Walk through each step with your thinking]

Final Answer:
[Conclusion]
```

---

### Pattern 4: ReAct (Reasoning + Acting)

```
Question: [question]

Thought: I need to [first step thinking]
Action: [what to do]
Observation: [result of action]

Thought: Now I should [next step thinking]
Action: [next action]
Observation: [result]

Thought: Based on this, I can conclude...
Final Answer: [answer]
```

---

### Pattern 5: Self-Consistency

```
Please solve this problem using three different approaches, then determine which answer is most likely correct.

Problem: [problem]

Approach 1:
[Solution method 1]
Answer: [result 1]

Approach 2:
[Solution method 2]
Answer: [result 2]

Approach 3:
[Solution method 3]
Answer: [result 3]

Most Consistent Answer: [final answer with reasoning]
```

---

## Content Creation Prompts (10)

### 1. Blog Post Outline

```
Create a comprehensive blog post outline on [topic].

Target audience: [who]
Goal: [inform/persuade/entertain]
Length: [word count]

Include:
- Attention-grabbing headline options (3)
- Introduction hook
- 5-7 main sections with subpoints
- Key takeaways
- Call to action
```

### 2. Article Writing

```
Write an article about [topic] that:
- Opens with a compelling hook
- Includes relevant statistics or examples
- Uses subheadings for scanability
- Ends with actionable takeaways

Tone: [professional/conversational/authoritative]
Length: [word count]
Keywords to include: [list]
```

### 3. Social Media Posts

```
Create [number] social media posts about [topic] for [platform].

Brand voice: [description]
Goal: [engagement/awareness/conversion]
Include: [hashtags/emoji/CTA]

Format each post with:
- Hook (first line)
- Body
- CTA
- Hashtags
```

### 4. Email Newsletter

```
Write an email newsletter about [topic].

Subject line options: [provide 3]
Preview text: [40-60 characters]

Sections:
- Opening greeting
- Main story/update
- Secondary content
- CTA button text
- Sign-off

Tone: [friendly/professional/urgent]
```

### 5-10. [Additional content prompts in similar format]

---

## Data Analysis Prompts (8)

### 1. Dataset Summary

```
Analyze this dataset and provide:
1. Overview (rows, columns, data types)
2. Summary statistics for numeric columns
3. Distribution insights
4. Missing data assessment
5. Initial observations

Data: [paste or describe]
```

### 2. Trend Analysis

```
Identify trends in this data:
[paste data]

Provide:
- Overall trend direction
- Rate of change
- Seasonal patterns (if any)
- Anomalies or outliers
- Predictions for next period
```

### 3-8. [Additional data prompts]

---

## Code Generation Prompts (8)

### 1. Function Generation

```
Write a [language] function that [description].

Requirements:
- Input: [parameters with types]
- Output: [return type and description]
- Edge cases to handle: [list]
- Error handling: [requirements]

Include:
- Function documentation
- Type hints/annotations
- Example usage
```

### 2. Code Review

```
Review this code for:
- Bugs or potential issues
- Performance improvements
- Security vulnerabilities
- Best practice violations
- Readability improvements

Code:
[paste code]

Provide specific line numbers and suggestions.
```

### 3-8. [Additional code prompts]

---

## Research Prompts (10)

### 1. Literature Review

```
Summarize the key findings on [topic] from recent research.

Include:
- Main theories/frameworks
- Key studies and findings
- Points of consensus
- Areas of debate
- Research gaps

Present in an academic style suitable for [purpose].
```

### 2. Competitive Analysis

```
Compare [Company/Product A] with [Company/Product B]:

Analysis dimensions:
- Features and capabilities
- Pricing and positioning
- Target market
- Strengths and weaknesses
- Market perception

Present as a comparison matrix with analysis.
```

### 3-10. [Additional research prompts]

---

## Creative Writing Prompts (8)

### 1. Story Opening

```
Write the opening paragraph of a [genre] story featuring:
- Setting: [description]
- Protagonist: [description]
- Opening hook: [type - action/dialogue/description]

Create intrigue while establishing the world.
```

### 2-8. [Additional creative prompts]

---

## Business Operations Prompts (6)

### 1. Process Documentation

```
Document this process in a clear, step-by-step format:

Process: [name]
Purpose: [why it exists]
Owner: [role responsible]

Include:
- Prerequisites
- Detailed steps with substeps
- Decision points (if X, then Y)
- Expected outputs
- Common issues and solutions
```

### 2-6. [Additional business prompts]

---

## Prompt Debugging Guide

### Common Issues and Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| Output too vague | Prompt lacks specificity | Add constraints and examples |
| Wrong format | Format not specified | Explicitly state desired format |
| Hallucinated facts | No grounding | Ask for citations or reasoning |
| Inconsistent results | Ambiguous instructions | Use clearer, more direct language |
| Too long/short | No length guidance | Specify word count or sections |

### Iteration Template

```
Original prompt: [your prompt]
Issue with output: [what was wrong]
Refined prompt: [improved version]
Why this is better: [explanation]
```

---

## Best Practices Checklist

- [ ] Clear role or persona defined
- [ ] Specific task description
- [ ] Output format specified
- [ ] Constraints identified
- [ ] Examples provided (when helpful)
- [ ] Length/scope defined
- [ ] Edge cases considered
