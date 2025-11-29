# Prompt Engineering Masterclass - Templates

> Reusable templates for building prompts

---

## System Prompt Templates

### Expert Persona

```
You are a [expert type] with [X] years of experience specializing in [domain].

Background:
- [Relevant credential/experience 1]
- [Relevant credential/experience 2]
- [Key expertise area]

Communication style:
- [Professional/friendly/technical]
- [Concise/detailed]
- [Uses examples/stays abstract]

When responding:
- [Specific behavior 1]
- [Specific behavior 2]
- [What to avoid]
```

---

### Task-Specific Assistant

```
You are an AI assistant specialized in [task domain].

Your capabilities:
- [Capability 1]
- [Capability 2]
- [Capability 3]

Output format:
- Always structure responses as [format]
- Include [required elements]
- Avoid [what not to include]

Limitations:
- Do not [restriction 1]
- Always [requirement 1]
- When uncertain, [behavior]
```

---

### Structured Output Enforcer

```
You must respond in the following JSON format only:

{
  "field1": "description of field1",
  "field2": "description of field2",
  "field3": {
    "subfield1": "description",
    "subfield2": "description"
  },
  "field4": ["array", "of", "items"]
}

Rules:
- Do not include any text outside the JSON
- All fields are required
- Use null for unknown values
- [Additional constraints]
```

---

## User Prompt Templates

### Analysis Request

```
Analyze the following [data type]:

[PASTE DATA HERE]

Please provide:
1. Summary: [what kind of summary]
2. Key findings: [number] main insights
3. Patterns: Notable trends or patterns
4. Recommendations: Based on the analysis

Format: [bullet points/table/narrative]
Length: [constraint]
Focus area: [specific aspect to emphasize]
```

---

### Comparison Request

```
Compare [Option A] and [Option B] across these dimensions:

Dimensions to evaluate:
1. [Criterion 1]: [what to assess]
2. [Criterion 2]: [what to assess]
3. [Criterion 3]: [what to assess]
4. [Criterion 4]: [what to assess]

Context: [relevant background]

Output format:
- Comparison table
- Strengths/weaknesses for each
- Recommendation with reasoning
```

---

### Content Generation

```
Create a [content type] about [topic].

Target audience: [who will read this]
Purpose: [inform/persuade/entertain]
Tone: [professional/casual/technical]

Requirements:
- Length: [word count or sections]
- Must include: [required elements]
- Must avoid: [restrictions]
- Style reference: [example or description]

Structure:
1. [Section 1 requirement]
2. [Section 2 requirement]
3. [Section 3 requirement]
```

---

### Code Generation

```
Write [language] code that [functionality description].

Technical requirements:
- Input: [describe inputs and types]
- Output: [describe expected output]
- Error handling: [requirements]
- Performance: [constraints if any]

Code standards:
- Follow [style guide/convention]
- Include [comments/types/tests]
- Use [specific patterns or libraries]

Example usage:
[Show how the code should be called]

Expected result:
[Show expected output]
```

---

### Refinement Request

```
Here is content that needs improvement:

[PASTE ORIGINAL CONTENT]

Issues to address:
1. [Problem 1]
2. [Problem 2]
3. [Problem 3]

Maintain:
- [What to keep]
- [Tone/style to preserve]

Improve:
- [Specific improvement 1]
- [Specific improvement 2]

Output: [Revised version / Track changes / Suggestions only]
```

---

## Chain-of-Thought Templates

### Problem-Solving

```
Problem: [state the problem]

Let's solve this systematically:

Step 1: Understanding
- What is being asked?
- What information do we have?
- What are the constraints?

Step 2: Planning
- What approaches could work?
- Which approach is best and why?
- What could go wrong?

Step 3: Execution
- Apply the chosen approach
- Show work at each step
- Verify intermediate results

Step 4: Verification
- Does the answer make sense?
- Have we addressed all requirements?
- Are there edge cases to consider?

Final Answer: [conclusion]
```

---

### Decision Framework

```
Decision: [what decision needs to be made]

Context: [relevant background]

Options:
1. [Option A]: [brief description]
2. [Option B]: [brief description]
3. [Option C]: [brief description]

Evaluation criteria:
- [Criterion 1]: [weight/importance]
- [Criterion 2]: [weight/importance]
- [Criterion 3]: [weight/importance]

Analysis:
[Evaluate each option against criteria]

Recommendation: [chosen option]
Reasoning: [why this option is best]
Risks: [potential downsides to address]
```

---

## Few-Shot Templates

### Classification

```
Classify the following items into categories.

Examples:
Item: "Python tutorial for beginners"
Category: Programming Education
Reasoning: Content about learning to code

Item: "Best restaurants in Paris"
Category: Travel & Food
Reasoning: Recommendations for travel destinations

Item: "How to negotiate salary"
Category: Career Development
Reasoning: Professional skill building

Now classify:
Item: "[your item]"
Category:
Reasoning:
```

---

### Transformation

```
Transform text from [format A] to [format B].

Examples:

Input: [example input 1]
Output: [example output 1]

Input: [example input 2]
Output: [example output 2]

Input: [example input 3]
Output: [example output 3]

Now transform:
Input: [your input]
Output:
```

---

## Quality Control Template

```
Review this [content type] for quality:

[PASTE CONTENT]

Check for:
- [ ] Accuracy: Facts and claims are correct
- [ ] Completeness: All required elements present
- [ ] Clarity: Easy to understand
- [ ] Consistency: Tone and style uniform
- [ ] Grammar: No errors
- [ ] Formatting: Proper structure

Provide:
1. Overall assessment (1-10)
2. Specific issues found
3. Suggested improvements
4. Revised version (if issues found)
```

---

## Prompt Library Organization

```markdown
## [Prompt Name]

**Category:** [category]
**Version:** [version number]
**Last Updated:** [date]

**Purpose:** [what this prompt does]

**When to Use:**
- [Use case 1]
- [Use case 2]

**Template:**
[The actual prompt template]

**Variables:**
- [variable1]: [description]
- [variable2]: [description]

**Example Usage:**
[Complete example with filled variables]

**Expected Output:**
[Sample of good output]

**Notes:**
- [Important consideration]
- [Limitation]
```
