# Module 2: Prompt Structure & Techniques

## Learning Objectives

By the end of this module, you will be able to:

1. Construct prompts using the proven anatomy of effective prompts
2. Apply role/persona prompting to improve output quality
3. Decompose complex tasks into manageable prompt components
4. Balance context, instructions, and examples appropriately
5. Specify output formats precisely for consistent results
6. Control tone and style in AI-generated content

---

## Prerequisites

- Completed Module 1: How LLMs Actually Work
- Understanding of tokens and context windows
- Access to AI tools for practice

**Estimated Time**: 4 hours

---

## 1. Anatomy of a Perfect Prompt

### The Five Essential Components

Every effective prompt contains some combination of these elements:

```
┌─────────────────────────────────────────────────────┐
│  1. ROLE/PERSONA     Who should the AI be?          │
├─────────────────────────────────────────────────────┤
│  2. CONTEXT          What background is needed?      │
├─────────────────────────────────────────────────────┤
│  3. TASK             What should be done?            │
├─────────────────────────────────────────────────────┤
│  4. FORMAT           How should output be structured?│
├─────────────────────────────────────────────────────┤
│  5. CONSTRAINTS      What limits or requirements?    │
└─────────────────────────────────────────────────────┘
```

### Component Breakdown

**1. Role/Persona**
Sets the expertise level and perspective.
```
"You are a senior marketing strategist with 15 years of experience..."
"Act as a technical writer creating documentation..."
"Respond as a patient teacher explaining to a beginner..."
```

**2. Context**
Provides necessary background information.
```
"I'm launching a B2B SaaS product for HR departments..."
"The audience is C-level executives with limited technical knowledge..."
"This is for an internal presentation, not public use..."
```

**3. Task**
Clearly states what needs to be accomplished.
```
"Write a product description..."
"Analyze these sales figures and identify trends..."
"Create a step-by-step guide for..."
```

**4. Format**
Specifies how output should be structured.
```
"Present as a numbered list of 5 items..."
"Format as a table with columns for X, Y, Z..."
"Write in paragraph form, approximately 200 words..."
```

**5. Constraints**
Defines boundaries and requirements.
```
"Keep the tone professional but approachable..."
"Do not include technical jargon..."
"Must be suitable for a 5-minute presentation..."
```

### The CRAFT Framework

An easy-to-remember structure for building prompts:

**C** - Context: Set the scene
**R** - Role: Define the AI's expertise
**A** - Action: Specify the task
**F** - Format: Describe output structure
**T** - Tone: Set the style

**Example Using CRAFT:**
```
Context: I'm preparing for a job interview at a tech startup next week.

Role: You are an experienced tech recruiter who has conducted thousands
of interviews.

Action: Generate 10 likely interview questions for a product manager
position, along with tips for answering each one.

Format: List each question numbered, followed by a "Tip:" section with
2-3 sentences of advice.

Tone: Professional but encouraging, as if coaching a friend.
```

---

## 2. Role/Persona Prompting

### Why Roles Matter

Assigning a role activates relevant patterns from training data:

- **Expert roles** access technical/specialized language
- **Professional roles** match industry conventions
- **Character roles** maintain consistent voice
- **Teacher roles** emphasize clarity and explanation

### Role Prompting Patterns

**Expert Role:**
```
You are a [profession] with [years] of experience in [specialty].
You have deep expertise in [relevant areas].
```

**Situational Role:**
```
You are helping a [type of person] who needs to [goal].
Explain things as you would to [audience type].
```

**Character Role:**
```
Respond as [character name] would, maintaining their [traits].
Your communication style is [description].
```

### Effective vs. Ineffective Roles

| Ineffective | Why | Effective | Why |
|-------------|-----|-----------|-----|
| "Be smart" | Too vague | "You are a data scientist" | Specific expertise |
| "Be helpful" | Default behavior | "You are a patient tutor" | Specific approach |
| "Be an expert" | No domain | "Expert in B2B marketing" | Clear domain |

### Role Stacking

Combine multiple roles for nuanced outputs:

```
You are a senior software architect who also has experience as a
technical writer. You can explain complex systems clearly while
maintaining technical accuracy.
```

### Role Persistence

For multi-turn conversations, reinforce the role:
```
[Initial] You are a financial advisor...

[Later, if needed] Continuing in your role as a financial advisor,
please now address...
```

---

## 3. Task Decomposition

### Breaking Down Complex Tasks

Complex outputs come from simple, clear steps:

**Monolithic Prompt (Less Effective):**
```
Write a complete marketing plan for my new product.
```

**Decomposed Prompt (More Effective):**
```
I'm creating a marketing plan for my new product. Let's build it
step by step:

1. First, help me define my target audience.
2. Then, we'll identify key messaging.
3. Next, we'll select marketing channels.
4. Finally, we'll create a timeline.

Let's start with step 1. Here's what I know about potential customers:
[details]
```

### The Chunking Strategy

| Instead of | Try |
|------------|-----|
| "Write a business plan" | "Outline the sections first, then we'll develop each" |
| "Create a full website" | "Start with the homepage structure" |
| "Solve this complex problem" | "What are the sub-problems we need to address?" |

### Sequential Prompting

Chain prompts together for better results:

**Prompt 1:** "List the main sections needed for a project proposal"
**Prompt 2:** "Now expand section 1 with detailed content"
**Prompt 3:** "Now expand section 2..."

### Task Decomposition Template

```
I need to accomplish [OVERALL GOAL].

Let's break this into steps:
1. [First component]
2. [Second component]
3. [Third component]

For now, focus only on step [N]. Here's the relevant information:
[Context for that step]

After you complete this, I'll provide context for the next step.
```

---

## 4. Context vs. Instructions vs. Examples

### The Three Input Types

**Context**: Background information the AI needs to understand the situation
**Instructions**: Directives telling the AI what to do
**Examples**: Demonstrations of desired input-output patterns

### Balancing the Three

```
CONTEXT (the "what")
├── Who is the audience?
├── What is the situation?
├── What does the AI need to know?
└── What constraints exist?

INSTRUCTIONS (the "how")
├── What action should be taken?
├── What process should be followed?
├── What should be included/excluded?
└── What quality standards apply?

EXAMPLES (the "like this")
├── Sample inputs and outputs
├── Format demonstrations
├── Style references
└── Edge case handling
```

### When to Use Each

| Situation | Emphasis | Why |
|-----------|----------|-----|
| AI lacks domain knowledge | Heavy context | Needs background |
| Task is straightforward | Clear instructions | Knows how, needs what |
| Format is critical | Examples | Show don't tell |
| Output style matters | Examples + instructions | Combine approaches |
| Novel task | All three | Maximum clarity |

### Practical Balance Example

```
[CONTEXT]
I run a small bakery specializing in custom cakes. My customers are
primarily parents ordering birthday cakes for children. My price range
is $50-$200 per cake.

[INSTRUCTIONS]
Write a product description for my website that:
- Highlights customization options
- Emphasizes quality ingredients
- Creates urgency to order early
- Includes a call to action

[EXAMPLE]
Here's a description from a competitor I like the style of:
"[Example text]"

Please write something similar in tone but unique to my business.
```

---

## 5. Output Format Specification

### Why Format Matters

Specifying format:
- Ensures usable outputs
- Reduces editing time
- Enables automation
- Creates consistency

### Format Specification Patterns

**List Format:**
```
Provide your response as a numbered list of exactly 5 items.
Each item should be one sentence.
```

**Table Format:**
```
Format as a table with these columns:
| Feature | Benefit | Priority (High/Med/Low) |
```

**Structured Sections:**
```
Organize your response with these headers:
## Summary
## Key Points
## Recommendations
## Next Steps
```

**JSON/Structured Data:**
```
Return your analysis as JSON in this format:
{
  "summary": "string",
  "score": number,
  "recommendations": ["string", "string"]
}
```

### Length Control

**Explicit Length:**
```
Write approximately 200 words.
Keep your response under 3 paragraphs.
Provide a one-sentence summary.
```

**Implicit Length:**
```
Be concise. (shorter)
Explain thoroughly. (longer)
Give me the headline version. (very short)
```

### Format Examples

**Email Format:**
```
Format as a professional email with:
- Subject line
- Greeting
- 2-3 paragraph body
- Call to action
- Professional sign-off
```

**Report Format:**
```
Structure as a brief report:
1. Executive Summary (2-3 sentences)
2. Findings (3-5 bullet points)
3. Recommendations (numbered list)
4. Next Steps (action items with owners)
```

---

## 6. Tone and Style Control

### Tone Dimensions

| Dimension | Range |
|-----------|-------|
| Formality | Casual ← → Formal |
| Complexity | Simple ← → Technical |
| Emotion | Neutral ← → Enthusiastic |
| Directness | Diplomatic ← → Blunt |
| Personality | Serious ← → Playful |

### Specifying Tone

**Direct Specification:**
```
Tone: Professional but friendly
Write in a conversational style
Keep it formal and precise
```

**Audience-Based:**
```
Write for a technical audience familiar with APIs.
Explain as if to a complete beginner.
Address C-level executives who value brevity.
```

**Reference-Based:**
```
Write in the style of [publication/author].
Match the tone of the example below.
```

### Tone Examples

**Formal Professional:**
```
Write in a formal, professional tone suitable for a board presentation.
Avoid contractions and colloquialisms.
```

**Conversational:**
```
Write as if explaining to a friend over coffee.
Use contractions and a warm, approachable tone.
```

**Technical:**
```
Write for a technical audience.
Use precise terminology and assume familiarity with [domain].
Include relevant technical details.
```

**Persuasive:**
```
Write compelling copy that motivates action.
Use persuasive language while remaining truthful.
Create urgency without being pushy.
```

### Style Consistency

For longer outputs, reinforce style:
```
Throughout this document:
- Use active voice
- Keep sentences under 20 words
- Use bullet points for lists of 3+ items
- Address the reader directly as "you"
```

---

## Putting It All Together

### Complete Prompt Template

```
[ROLE]
You are a [specific role] with expertise in [domains].

[CONTEXT]
Background: [situation description]
Audience: [who will read/use this]
Purpose: [why this is needed]

[TASK]
Please [specific action verb] a [deliverable type] that [key requirement].

[FORMAT]
Structure your response as:
- [Format element 1]
- [Format element 2]
- [Format element 3]

[CONSTRAINTS]
Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

[TONE]
Style: [tone description]

[OPTIONAL: EXAMPLES]
Here's an example of what I'm looking for:
[Example]
```

### Before/After Examples

**Before (Weak):**
```
Write something about productivity.
```

**After (Strong):**
```
You are a productivity consultant who specializes in helping
knowledge workers manage their time effectively.

I'm creating content for busy professionals who struggle with
email overload. They have about 2 minutes to read this.

Write a tip sheet with 5 actionable strategies for managing
email more efficiently.

Format as:
- Numbered list
- Each tip: Bold headline + 1-2 sentence explanation
- Total length: 200-250 words

Tone: Direct and practical, no fluff. Assume the reader is
smart but time-pressed.
```

---

## Best Practices Summary

1. **Include all components**: Role, context, task, format, constraints
2. **Be specific**: Vague prompts get vague results
3. **Show format**: Demonstrate the structure you want
4. **Control length**: Specify word counts or section limits
5. **Set tone explicitly**: Don't assume the AI knows your audience
6. **Decompose complexity**: Break big tasks into smaller prompts
7. **Provide examples**: When format or style is critical

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. What are the five essential components of a prompt?
2. How does role assignment improve outputs?
3. When should you use examples vs. instructions?
4. What are three ways to specify output format?
5. How do you control tone across formal-casual dimensions?

---

## Summary

In this module, you learned:

- **Prompt anatomy**: The five components (role, context, task, format, constraints)
- **Role prompting**: How personas activate relevant expertise
- **Task decomposition**: Breaking complex tasks into manageable pieces
- **Input balance**: When to use context, instructions, and examples
- **Format specification**: Ensuring structured, usable outputs
- **Tone control**: Matching style to audience and purpose

**Next Module**: Advanced Prompting Patterns - few-shot learning, chain-of-thought, and more.

---

*Module 2 of 6 | Prompt Engineering Masterclass | Duration: 4 hours*
