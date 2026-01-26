# Module 3: Advanced Prompting Patterns

## Learning Objectives

By the end of this module, you will be able to:

1. Apply few-shot learning to teach AI new patterns through examples
2. Use chain-of-thought prompting to improve reasoning quality
3. Implement tree-of-thought for complex problem-solving
4. Apply self-consistency techniques for reliable outputs
5. Construct ReAct patterns for multi-step reasoning
6. Use meta-prompting to generate effective prompts

---

## Prerequisites

- Completed Modules 1-2
- Strong understanding of prompt components
- Comfort with iterative prompt refinement

**Estimated Time**: 4 hours

---

## 1. Few-Shot Learning

### What is Few-Shot Learning?

Few-shot learning teaches the AI a pattern by showing examples before asking it to perform the task. The AI generalizes from examples to handle new inputs.

```
ZERO-SHOT:  Just the task, no examples
ONE-SHOT:   Task + 1 example
FEW-SHOT:   Task + 2-5 examples
MANY-SHOT:  Task + 6+ examples (diminishing returns)
```

### Few-Shot Structure

```
[INSTRUCTION]
[Task description]

[EXAMPLES]
Input: [example input 1]
Output: [example output 1]

Input: [example input 2]
Output: [example output 2]

Input: [example input 3]
Output: [example output 3]

[ACTUAL TASK]
Input: [your actual input]
Output:
```

### Few-Shot Example: Sentiment Classification

```
Classify the sentiment of customer reviews as Positive, Negative, or Neutral.

Review: "This product exceeded my expectations! Will buy again."
Sentiment: Positive

Review: "Arrived damaged and customer service was unhelpful."
Sentiment: Negative

Review: "It works as described. Nothing special."
Sentiment: Neutral

Review: "The shipping was slow but the quality is amazing."
Sentiment:
```

### Few-Shot Example: Data Extraction

```
Extract structured data from product descriptions.

Description: "Nike Air Max 90, Men's Running Shoes, Size 10, Color: White/Black, $129.99"
Extracted:
- Brand: Nike
- Product: Air Max 90
- Category: Running Shoes
- Gender: Men's
- Size: 10
- Color: White/Black
- Price: $129.99

Description: "Apple MacBook Pro 14-inch, M3 chip, 16GB RAM, 512GB SSD, Space Gray, $1999"
Extracted:
- Brand: Apple
- Product: MacBook Pro 14-inch
- Category: Laptop
- Processor: M3 chip
- RAM: 16GB
- Storage: 512GB SSD
- Color: Space Gray
- Price: $1999

Description: "Samsung 65-inch QLED 4K Smart TV, Model QN65Q80C, $1,297.99"
Extracted:
```

### Few-Shot Best Practices

| Practice | Why |
|----------|-----|
| Use 3-5 diverse examples | Covers variations without overloading |
| Include edge cases | Teaches handling of unusual inputs |
| Keep format consistent | Model learns pattern better |
| Order examples thoughtfully | Start simple, add complexity |
| Match example difficulty to task | Too easy = overgeneralization |

### When to Use Few-Shot

**Use Few-Shot When:**
- The task has a specific format the AI might not know
- You need consistent output structure
- The task involves domain-specific conventions
- Zero-shot attempts produce inconsistent results

**Skip Few-Shot When:**
- The task is straightforward (zero-shot works)
- Examples would consume too many tokens
- The pattern is already well-known to the model

---

## 2. Chain-of-Thought Prompting

### What is Chain-of-Thought?

Chain-of-thought (CoT) prompting asks the AI to show its reasoning step by step, which improves accuracy on complex tasks.

```
WITHOUT CoT: Question → Answer (may be wrong)
WITH CoT:    Question → Step 1 → Step 2 → Step 3 → Answer (more reliable)
```

### Basic Chain-of-Thought

**Simple Trigger:**
```
[Question]

Let's think through this step by step.
```

**Explicit Steps:**
```
[Question]

Please reason through this problem:
1. First, identify the key information
2. Then, determine what approach to use
3. Apply the approach step by step
4. Verify the result
5. State your final answer
```

### Chain-of-Thought Example

**Without CoT:**
```
Q: If a store has 45 apples and sells 3/5 of them, then receives a
shipment of 30 more, how many apples does the store have?
A: 48 apples (may guess without showing work)
```

**With CoT:**
```
Q: If a store has 45 apples and sells 3/5 of them, then receives a
shipment of 30 more, how many apples does the store have?

Let's solve this step by step:

1. Start with 45 apples
2. Sold 3/5 of 45 = (3/5) × 45 = 27 apples sold
3. Remaining after sales: 45 - 27 = 18 apples
4. Received shipment: 18 + 30 = 48 apples
5. Final count: 48 apples

A: The store has 48 apples.
```

### CoT for Analysis Tasks

```
Analyze this business decision:

[Decision description]

Work through your analysis systematically:
1. What are the key factors to consider?
2. What are the potential benefits?
3. What are the potential risks?
4. What assumptions are we making?
5. What's your recommendation and why?
```

### When Chain-of-Thought Helps

| Task Type | CoT Impact |
|-----------|-----------|
| Math problems | High - catches calculation errors |
| Logic puzzles | High - tracks reasoning |
| Multi-step analysis | High - organizes thinking |
| Simple factual Q&A | Low - unnecessary overhead |
| Creative writing | Low - may constrain creativity |

---

## 3. Tree-of-Thought

### Beyond Linear Reasoning

Tree-of-thought (ToT) extends chain-of-thought by exploring multiple reasoning paths before converging on an answer.

```
                    [Problem]
                   /    |    \
              [Path A] [Path B] [Path C]
               /   \      |        \
          [A1] [A2]  [B1]      [C1]
            \    \    /        /
             \    \  /        /
              [Best Solution]
```

### Tree-of-Thought Pattern

```
I need to solve this problem: [problem]

Let me explore multiple approaches:

Approach 1: [First approach]
- Reasoning: [steps]
- Conclusion: [result]
- Confidence: [high/medium/low]

Approach 2: [Alternative approach]
- Reasoning: [steps]
- Conclusion: [result]
- Confidence: [high/medium/low]

Approach 3: [Another angle]
- Reasoning: [steps]
- Conclusion: [result]
- Confidence: [high/medium/low]

Evaluating approaches:
- Approach 1: [pros/cons]
- Approach 2: [pros/cons]
- Approach 3: [pros/cons]

Best solution: [selected approach] because [reasoning]
```

### Tree-of-Thought Example

```
Problem: Should our startup pivot from B2C to B2B?

Explore this decision from multiple angles:

Perspective 1: Financial Analysis
- Current B2C metrics: [analyze]
- B2B opportunity size: [analyze]
- Resource requirements: [analyze]
- Financial conclusion: [verdict]

Perspective 2: Market Position
- B2C competitive landscape: [analyze]
- B2B competitive landscape: [analyze]
- Our differentiation: [analyze]
- Market conclusion: [verdict]

Perspective 3: Operational Feasibility
- Team capabilities: [analyze]
- Required changes: [analyze]
- Timeline: [analyze]
- Operational conclusion: [verdict]

Synthesis:
Weighing all perspectives, the recommendation is [decision] because:
1. [Key reason from financial]
2. [Key reason from market]
3. [Key reason from operations]
```

---

## 4. Self-Consistency

### What is Self-Consistency?

Self-consistency generates multiple reasoning paths and takes the majority answer, reducing errors from any single chain-of-thought.

### Self-Consistency Pattern

```
Generate 3 independent solutions to this problem, then determine
which answer appears most frequently.

Problem: [problem]

Solution Path 1:
[reasoning]
Answer: [answer]

Solution Path 2:
[reasoning]
Answer: [answer]

Solution Path 3:
[reasoning]
Answer: [answer]

Consistency Analysis:
- Path 1 says: [answer]
- Path 2 says: [answer]
- Path 3 says: [answer]

Most consistent answer: [final answer]
Confidence: [based on agreement level]
```

### Self-Consistency for Verification

```
I've calculated that [answer]. Let me verify this three different ways:

Verification 1: [Method A]
Result: [answer]

Verification 2: [Method B]
Result: [answer]

Verification 3: [Method C]
Result: [answer]

All methods agree/disagree: [assessment]
Final verified answer: [answer]
```

---

## 5. ReAct Pattern (Reasoning + Acting)

### What is ReAct?

ReAct alternates between reasoning (thinking) and acting (gathering information or taking steps), mimicking how humans solve problems.

```
Thought: I need to figure out X
Action: Search for Y / Calculate Z / Check W
Observation: Found that...
Thought: Based on this, I should...
Action: Next step...
Observation: Result shows...
Thought: Now I can conclude...
Final Answer: [answer]
```

### ReAct Template

```
Answer this question using a systematic thought-action-observation loop:

Question: [question]

Thought 1: What do I need to find out first?
Action 1: [what you would do/look up]
Observation 1: [what you found/know]

Thought 2: Based on that, what's next?
Action 2: [next step]
Observation 2: [result]

Thought 3: [continue as needed]
Action 3: [continue as needed]
Observation 3: [continue as needed]

Final Thought: I can now answer the question because...
Final Answer: [answer]
```

### ReAct Example

```
Question: What's the population density of the most populous city
in the country with the largest GDP in Europe?

Thought 1: I need to identify the country with the largest GDP in Europe.
Action 1: Recall/look up European GDP rankings
Observation 1: Germany has the largest GDP in Europe.

Thought 2: Now I need to find Germany's most populous city.
Action 2: Identify Germany's most populous city
Observation 2: Berlin is Germany's most populous city.

Thought 3: Now I need Berlin's population and area to calculate density.
Action 3: Get Berlin's population and area
Observation 3: Berlin has ~3.6 million people and area of ~891 km².

Thought 4: I can now calculate the population density.
Action 4: Calculate 3,600,000 / 891
Observation 4: ~4,040 people per km²

Final Answer: Berlin's population density is approximately 4,040 people
per square kilometer.
```

### When to Use ReAct

- Multi-step research questions
- Problems requiring information gathering
- Tasks needing verification between steps
- Complex decisions with dependencies

---

## 6. Meta-Prompting

### What is Meta-Prompting?

Meta-prompting uses AI to generate or improve prompts themselves.

### Prompt Generation

```
I want to accomplish this task: [describe task]

Generate an optimized prompt that would produce excellent results
for this task. Include:
- Appropriate role
- Necessary context
- Clear instructions
- Output format specification
- Relevant constraints
```

### Prompt Improvement

```
Here's a prompt I'm using:

[Your current prompt]

The outputs aren't quite right because: [describe issues]

Suggest an improved version of this prompt that would produce better results.
Explain what you changed and why.
```

### Prompt Analysis

```
Analyze this prompt and identify weaknesses:

[Prompt to analyze]

Provide:
1. What's effective about this prompt
2. What's missing or unclear
3. Potential failure modes
4. Specific improvement suggestions
```

### Meta-Prompting for Variants

```
I need prompts for these related tasks:
1. [Task variation 1]
2. [Task variation 2]
3. [Task variation 3]

Using this base structure:
[Your template]

Generate optimized prompts for each variation, adapting the template
appropriately.
```

---

## Combining Patterns

### Pattern Combinations

| Combination | Use When |
|-------------|----------|
| Few-shot + CoT | Teaching reasoning patterns |
| CoT + Self-consistency | High-stakes calculations |
| ToT + ReAct | Complex research tasks |
| Meta-prompting + Few-shot | Building prompt libraries |

### Combined Example: Few-Shot CoT

```
Solve math word problems by showing your reasoning.

Problem: A train travels 120 miles in 2 hours. How far will it travel in 5 hours at the same speed?
Reasoning:
- Speed = Distance / Time = 120 / 2 = 60 mph
- Distance at 5 hours = Speed × Time = 60 × 5 = 300 miles
Answer: 300 miles

Problem: A recipe needs 2 cups of flour for 24 cookies. How many cups for 60 cookies?
Reasoning:
- Cups per cookie = 2 / 24 = 1/12 cup per cookie
- Cups for 60 cookies = (1/12) × 60 = 5 cups
Answer: 5 cups

Problem: [Your problem]
Reasoning:
```

---

## Best Practices Summary

1. **Few-shot**: 3-5 diverse examples, consistent format
2. **Chain-of-thought**: "Let's think step by step" for reasoning tasks
3. **Tree-of-thought**: Multiple angles for complex decisions
4. **Self-consistency**: Multiple paths for verification
5. **ReAct**: Thought-action loops for research tasks
6. **Meta-prompting**: AI-assisted prompt optimization

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. When is few-shot learning most valuable?
2. How does chain-of-thought improve accuracy?
3. What's the difference between CoT and Tree-of-Thought?
4. When should you use the ReAct pattern?
5. How can meta-prompting improve your prompts?

---

## Summary

In this module, you learned:

- **Few-shot learning**: Teaching through examples
- **Chain-of-thought**: Step-by-step reasoning
- **Tree-of-thought**: Multi-path exploration
- **Self-consistency**: Verification through multiple attempts
- **ReAct**: Reasoning and acting iteratively
- **Meta-prompting**: Using AI to improve prompts

**Next Module**: System Prompts & Personas - creating persistent AI configurations.

---

*Module 3 of 6 | Prompt Engineering Masterclass | Duration: 4 hours*
