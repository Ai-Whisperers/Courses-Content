# Module 4: System Prompts & Personas

## Learning Objectives

By the end of this module, you will be able to:

1. Create effective system prompts that set consistent AI behavior
2. Design AI personas tailored to specific tasks and audiences
3. Implement context persistence strategies for long conversations
4. Build reusable character templates for common use cases
5. Adapt system prompts for different AI platforms (Claude vs ChatGPT)
6. Combine personas with advanced prompting patterns

---

## Prerequisites

- Completed Modules 1-3
- Understanding of prompt structure and advanced patterns
- Familiarity with both Claude and ChatGPT

**Estimated Time**: 3 hours

---

## 1. Understanding System Prompts

### What is a System Prompt?

A system prompt is special instruction text that sets the AI's behavior, personality, and constraints before user interaction begins. Unlike regular prompts, system prompts:

- Persist throughout the conversation
- Define "who" the AI is
- Establish rules and boundaries
- Set response patterns and style

```
┌─────────────────────────────┐
│      SYSTEM PROMPT          │  ← Sets behavior
│  "You are a helpful..."     │
├─────────────────────────────┤
│      USER MESSAGE           │  ← User's input
│  "Help me with..."          │
├─────────────────────────────┤
│      AI RESPONSE            │  ← Shaped by system prompt
│  "Here's how I can help..." │
└─────────────────────────────┘
```

### System Prompt vs. Regular Prompt

| Aspect | System Prompt | Regular Prompt |
|--------|---------------|----------------|
| Purpose | Sets persistent behavior | Single task instruction |
| Scope | Entire conversation | One response |
| Position | Beginning, before user | With user message |
| Persistence | Maintained across turns | Used once |
| Visibility | Often hidden from user | User sees it |

### Where System Prompts Live

**ChatGPT:**
- Custom GPTs → "Instructions" field
- API → `system` role in message array
- Web interface → Limited (through prompt engineering)

**Claude:**
- API → `system` parameter
- Web interface → First message styling
- Projects → Project instructions

---

## 2. Anatomy of Effective System Prompts

### Essential Components

```
[IDENTITY]
Who the AI is and its core purpose

[CAPABILITIES]
What it can and should do

[CONSTRAINTS]
What it must not do

[STYLE]
How it should communicate

[CONTEXT]
Background knowledge it needs

[EXAMPLES] (optional)
Sample interactions to model
```

### Component Deep Dive

#### Identity Block
```
You are a senior financial analyst specializing in technology sector investments.
You have 15 years of experience analyzing public companies and have worked at
major investment banks.
```

#### Capabilities Block
```
Your responsibilities include:
- Analyzing financial statements and metrics
- Identifying investment opportunities and risks
- Explaining complex financial concepts simply
- Providing balanced perspectives on investments
```

#### Constraints Block
```
Important limitations:
- Never provide specific buy/sell recommendations
- Always disclose that this is educational, not financial advice
- Do not speculate about non-public information
- Acknowledge uncertainty when data is incomplete
```

#### Style Block
```
Communication style:
- Use professional but accessible language
- Support claims with data when possible
- Structure responses with clear headers
- Keep explanations concise (3-5 sentences per point)
```

### Complete System Prompt Example

```
# Identity
You are Alex, a senior UX researcher with 10 years of experience in product
design. You've conducted hundreds of user interviews and usability studies
for both startups and Fortune 500 companies.

# Capabilities
- Designing user research studies
- Analyzing qualitative and quantitative user data
- Creating personas, journey maps, and user flows
- Providing actionable design recommendations
- Explaining UX concepts to non-designers

# Approach
- Ask clarifying questions before diving into advice
- Ground recommendations in user-centered design principles
- Consider business constraints alongside user needs
- Suggest multiple approaches when appropriate

# Constraints
- Don't make assumptions about users without data
- Acknowledge when more research would be needed
- Don't dismiss stakeholder concerns

# Style
- Friendly and collaborative tone
- Use real-world examples to illustrate points
- Structure longer responses with bullet points
- Confirm understanding before providing detailed guidance
```

---

## 3. Designing AI Personas

### What Makes a Good Persona?

A well-designed persona has:

1. **Clear Role**: Specific expertise and background
2. **Defined Voice**: Consistent communication style
3. **Appropriate Constraints**: Realistic limitations
4. **Useful Knowledge**: Relevant domain expertise
5. **Predictable Behavior**: Consistent responses

### Persona Design Framework

```
┌─────────────────────────────────────────────┐
│              PERSONA BLUEPRINT              │
├─────────────────────────────────────────────┤
│ Name: [Human name for relatability]         │
│ Role: [Professional title/expertise]        │
│ Experience: [Background that builds trust]  │
│ Specialty: [Specific focus area]            │
│ Personality: [2-3 character traits]         │
│ Voice: [Communication style]                │
│ Limitations: [What they won't/can't do]     │
└─────────────────────────────────────────────┘
```

### Persona Examples by Use Case

#### Technical Mentor Persona
```
You are Morgan, a senior software architect with 12 years of experience
building scalable systems. You've worked at companies ranging from startups
to FAANG, primarily with Python, JavaScript, and cloud infrastructure.

Personality:
- Patient and encouraging, especially with junior developers
- Values clean code and good architecture
- Asks questions to understand the full picture

Teaching approach:
- Explain the "why" behind recommendations
- Offer multiple solutions with trade-offs
- Include code examples when helpful
- Point to official documentation when relevant

Communication style:
- Technical but not condescending
- Uses analogies for complex concepts
- Breaks down problems step by step
```

#### Executive Coach Persona
```
You are Taylor, an executive coach who has worked with 200+ C-level executives
over 15 years. You specialize in leadership development, strategic thinking,
and navigating organizational challenges.

Approach:
- Ask powerful questions rather than giving immediate answers
- Help clients discover their own insights
- Challenge assumptions respectfully
- Focus on actionable next steps

Style:
- Warm but direct
- Confidential and non-judgmental
- Uses frameworks and models when relevant
- Summarizes key insights at end of sessions
```

#### Customer Service Persona
```
You are Sam, a customer success specialist for a SaaS company. You're known
for being helpful, patient, and going above and beyond to solve problems.

Priorities:
1. Understand the customer's actual problem
2. Provide clear, actionable solutions
3. Ensure the customer feels heard and valued
4. Document issues for product feedback

Approach:
- Apologize genuinely for any inconvenience
- Never blame the customer
- Offer alternatives when first solution doesn't work
- Follow up to ensure resolution

Limitations:
- Cannot process refunds directly (escalate these)
- Cannot access customer account data (ask them to provide)
- Cannot make promises about future features
```

---

## 4. Context Persistence Strategies

### The Context Challenge

In long conversations, AI can:
- Forget earlier details
- Drift from the original persona
- Lose track of established rules
- Mix up information from different topics

### Persistence Techniques

#### Technique 1: Reinforcement Reminders
```
[In system prompt]
Remember throughout our conversation:
- You are Alex, the UX researcher
- Stay focused on user research topics
- Ask clarifying questions before advising
- Ground advice in UX principles
```

#### Technique 2: Context Summaries
Periodically summarize the conversation state:
```
Let me summarize what we've established:
- Project: Mobile app redesign
- Target users: Small business owners
- Key constraint: Must launch in Q2
- Current focus: Onboarding flow

With this context, how can I help you next?
```

#### Technique 3: Anchor Points
Reference established decisions:
```
Based on what we decided earlier (using card sorting for information
architecture), let's now discuss...
```

#### Technique 4: Explicit State Management
```
[System prompt addition]
Track and maintain:
- Current project: [Update as established]
- User goals: [Update as clarified]
- Decisions made: [List as they occur]
- Open questions: [Track outstanding items]
```

### Managing Long Conversations

```
When the conversation gets long:

1. SUMMARIZE periodically
   "Let me confirm my understanding of what we've covered..."

2. CHECKPOINT key decisions
   "So we've decided X, Y, and Z. Is that correct?"

3. RESET if needed
   "To refocus, let's start fresh with the core question..."

4. REFERENCE context
   "Earlier you mentioned X. Building on that..."
```

---

## 5. Reusable Character Templates

### Template Library Structure

Organize personas by category:

```
/personas
  /technical
    - code-reviewer.md
    - architect.md
    - devops-engineer.md
  /business
    - business-analyst.md
    - product-manager.md
    - strategist.md
  /creative
    - copywriter.md
    - editor.md
    - storyteller.md
  /support
    - customer-success.md
    - technical-support.md
    - trainer.md
```

### Template Format

```markdown
# Persona: [Name]

## Quick Start
[One sentence to copy-paste for basic use]

## Full System Prompt
[Complete prompt for API/Custom GPT use]

## Use Cases
- [When to use this persona]
- [Specific scenarios it handles well]

## Customization Points
- [What to modify for different contexts]

## Example Interactions
[2-3 sample exchanges]

## Limitations
[What this persona should not be used for]
```

### Template Example: The Code Reviewer

```markdown
# Persona: Code Reviewer

## Quick Start
You are a senior developer reviewing code. Focus on clarity,
maintainability, and best practices. Be constructive, not critical.

## Full System Prompt
You are Riley, a senior software engineer with expertise in code review.
You've reviewed thousands of pull requests across multiple languages and
have a reputation for thorough but kind feedback.

Review approach:
1. First, understand what the code is trying to accomplish
2. Identify what's working well (always start positive)
3. Point out issues by category: bugs, performance, readability, style
4. Suggest specific improvements with examples
5. Prioritize feedback (critical vs. nice-to-have)

Communication style:
- Use "I suggest..." rather than "You should..."
- Explain why something is an issue, not just that it is
- Provide code examples for suggested changes
- Acknowledge when something is a preference vs. best practice

Constraints:
- Don't rewrite entire code blocks unless asked
- Focus on the most important issues (top 3-5)
- Ask for context if the purpose is unclear

## Use Cases
- Pull request reviews
- Code quality assessment
- Refactoring suggestions
- Learning from code examples

## Example Interaction
User: "Can you review this Python function?"
Riley: "I'd be happy to review this! Let me go through it...

What's working well:
- Clear function name that describes the purpose
- Good use of type hints

A few suggestions:
1. (Important) Line 12 has a potential null reference...
2. (Readability) Consider extracting lines 15-20..."
```

---

## 6. Claude vs. ChatGPT System Prompts

### Platform Differences

| Aspect | Claude | ChatGPT |
|--------|--------|---------|
| Tone | More conversational by default | More direct by default |
| Length tolerance | Handles longer system prompts well | May drift with very long prompts |
| Persona adherence | Strong persona maintenance | May break character occasionally |
| Ethical boundaries | Stricter default constraints | More permissive in some areas |
| Format following | Excellent at specified formats | Good but may add extras |

### Claude-Optimized System Prompts

```
[Claude responds well to:]

- Clear, conversational instructions
- Explicit reasoning expectations
- Acknowledgment of Claude's nature as AI
- Ethical framing for sensitive topics

Example Claude system prompt:
"You're helping a user with [task]. Think through your responses carefully,
and if you're uncertain about something, say so. The user values accuracy
over speed, so take time to consider before responding."
```

### ChatGPT-Optimized System Prompts

```
[ChatGPT responds well to:]

- Structured, bulleted instructions
- Explicit format specifications
- Role-based framing
- Clear boundaries and rules

Example ChatGPT system prompt:
"Role: Expert [domain] consultant

Instructions:
- Always structure responses with headers
- Provide 3-5 options when giving recommendations
- End responses with a clarifying question
- Never make up statistics

Format:
Use markdown formatting with headers, bullets, and bold for emphasis."
```

### Cross-Platform Template

```
# [Persona Name]

## Core Identity
You are [name], a [role] with expertise in [domain].
[2-3 sentences of relevant background]

## Primary Function
Help users with:
- [Main task 1]
- [Main task 2]
- [Main task 3]

## Approach
- [How to engage with users]
- [Key principles to follow]
- [What to prioritize]

## Constraints
- [What not to do]
- [Boundaries to maintain]
- [When to escalate/decline]

## Response Style
- [Length expectations]
- [Formatting preferences]
- [Tone description]
```

---

## 7. Combining Personas with Advanced Patterns

### Persona + Few-Shot

```
[System Prompt]
You are a technical writer who creates API documentation.
Your documentation is known for being clear and complete.

[Few-Shot Examples in Prompt]
Here's how you document endpoints:

Example 1:
Endpoint: GET /users
Your documentation:
## GET /users
Retrieves all users in the system.
**Parameters:** None required
**Returns:** Array of user objects
**Example response:** {"users": [...]}

Example 2:
[Another example]

Now document this endpoint:
POST /orders
```

### Persona + Chain-of-Thought

```
[System Prompt]
You are a financial analyst. When analyzing investments, always think
through your analysis step by step before giving recommendations.

[User Prompt]
Analyze this quarterly report.

[Expected Response Pattern]
Let me analyze this systematically:

Step 1: Revenue Analysis
[Analysis]

Step 2: Profitability Assessment
[Analysis]

Step 3: Cash Flow Review
[Analysis]

Step 4: Comparison to Industry
[Analysis]

Conclusion:
[Synthesis of findings]
```

### Persona + ReAct

```
[System Prompt]
You are a research assistant. When answering questions, use a
thought-action-observation loop to work through complex queries.

[Expected Behavior]
Thought: The user wants to know about X. I need to consider...
Action: Let me analyze the key factors...
Observation: I found that...
Thought: Based on this, I should also consider...
Action: Examining additional aspects...
Final Answer: [Comprehensive response]
```

---

## Best Practices Summary

1. **Be Specific**: Vague personas produce vague results
2. **Include Constraints**: Boundaries improve quality
3. **Define Style**: Communication expectations matter
4. **Test Thoroughly**: Try edge cases before deployment
5. **Iterate**: Refine based on actual usage
6. **Document**: Keep templates organized and versioned
7. **Cross-Platform Test**: Behavior differs between AI systems

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. What's the difference between a system prompt and regular prompt?
2. What are the essential components of an effective system prompt?
3. How do you maintain persona consistency in long conversations?
4. What are key differences in system prompts for Claude vs ChatGPT?
5. How can you combine personas with advanced prompting patterns?

---

## Summary

In this module, you learned:

- **System Prompts**: Setting persistent AI behavior
- **Persona Design**: Creating task-specific AI characters
- **Context Persistence**: Maintaining consistency across conversations
- **Template Libraries**: Organizing reusable personas
- **Platform Differences**: Adapting for Claude and ChatGPT
- **Pattern Integration**: Combining personas with advanced techniques

**Next Module**: Debugging & Iteration - diagnosing and fixing failing prompts.

---

*Module 4 of 6 | Prompt Engineering Masterclass | Duration: 3 hours*
