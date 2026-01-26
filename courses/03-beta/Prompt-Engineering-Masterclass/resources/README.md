# Prompt Engineering Masterclass - Resources

> Reference materials for advanced prompt engineering

---

## LLM Fundamentals

### How LLMs Process Text

```
Input Text → Tokenization → Embedding → Transformer Layers → Output Probabilities → Generated Token
                                              ↓
                                    [Attention Mechanism]
                                    [Feed Forward Networks]
                                    [Layer Normalization]
```

### Key Concepts

| Term | Definition |
|------|------------|
| Token | Basic unit of text (roughly 4 characters) |
| Context Window | Maximum input size (varies by model) |
| Temperature | Controls randomness (0=deterministic, 1=creative) |
| Top-p | Nucleus sampling threshold |
| System Prompt | Instructions that define AI behavior |

### Context Windows (2024)

| Model | Context Window |
|-------|----------------|
| Claude 3.5 | 200K tokens |
| GPT-4 Turbo | 128K tokens |
| GPT-4o | 128K tokens |
| Gemini 1.5 Pro | 1M tokens |
| Llama 3 | 8K-128K tokens |

---

## Model Comparison

### Strengths by Model

| Task | Best Model | Why |
|------|------------|-----|
| Long documents | Claude | Largest practical context |
| Code generation | GPT-4 / Claude | Strong reasoning |
| Creative writing | GPT-4 | Diverse outputs |
| Analysis | Claude | Nuanced understanding |
| Multimodal | GPT-4o / Gemini | Image + text |

### Temperature Guidelines

| Task Type | Recommended Temperature |
|-----------|------------------------|
| Factual Q&A | 0 - 0.3 |
| Code generation | 0 - 0.2 |
| Business writing | 0.3 - 0.5 |
| Creative writing | 0.7 - 1.0 |
| Brainstorming | 0.8 - 1.0 |

---

## Prompt Structure Reference

### Anatomy of an Effective Prompt

```
┌─────────────────────────────────────┐
│           SYSTEM PROMPT             │
│  (Role, constraints, output format) │
├─────────────────────────────────────┤
│            CONTEXT                  │
│  (Background info, examples)        │
├─────────────────────────────────────┤
│             TASK                    │
│  (What you want done)               │
├─────────────────────────────────────┤
│           OUTPUT FORMAT             │
│  (Structure, length, style)         │
└─────────────────────────────────────┘
```

### Prompt Components

| Component | Purpose | Example |
|-----------|---------|---------|
| Role | Set expertise level | "You are a senior data scientist" |
| Context | Provide background | "Given this sales data..." |
| Task | Define the action | "Identify trends and anomalies" |
| Format | Specify output | "Present as a bulleted list" |
| Constraints | Set boundaries | "In under 200 words" |
| Examples | Show expected output | "Like this: [example]" |

---

## Advanced Techniques

### Chain-of-Thought Variants

| Technique | Use Case | Prompt Addition |
|-----------|----------|-----------------|
| Zero-shot CoT | Simple reasoning | "Let's think step by step" |
| Manual CoT | Complex problems | Provide explicit steps |
| Self-consistency | Uncertain answers | Generate multiple paths |
| Tree-of-thought | Exploration | Branch and evaluate options |

### Meta-Prompting

```
I want you to help me write better prompts.

Here's my current prompt:
[paste prompt]

Here's the output I got:
[paste output]

Here's what I wanted:
[describe ideal output]

Suggest 3 improved versions of my prompt.
```

---

## Common Pitfalls

### Anti-Patterns to Avoid

| Anti-Pattern | Problem | Better Approach |
|--------------|---------|-----------------|
| "Be creative" | Too vague | Specify type of creativity |
| "Do your best" | No criteria | Define success metrics |
| "Like a human" | Ambiguous | Specify tone, expertise |
| Long paragraphs | Lost instructions | Use bullet points |
| No examples | Unclear expectations | Provide 1-3 examples |

### Quality Indicators

| Good Sign | Bad Sign |
|-----------|----------|
| Specific numbers | "Some" or "many" |
| Named format | "Output your answer" |
| Clear scope | Open-ended task |
| Example provided | No reference point |
| Constraints stated | Unlimited freedom |

---

## Debugging Framework

### When Output is Wrong

```
1. IDENTIFY: What specifically is wrong?
   - Format issue
   - Content error
   - Tone mismatch
   - Missing information

2. DIAGNOSE: Why did this happen?
   - Ambiguous instruction
   - Missing context
   - Conflicting requirements
   - Model limitation

3. FIX: What change will help?
   - Add specificity
   - Provide example
   - Break down task
   - Adjust constraints

4. TEST: Did the fix work?
   - Run revised prompt
   - Compare outputs
   - Document improvement
```

---

## Prompt Versioning Template

```markdown
## Prompt: [Name]

### Version 1.0 (Initial)
[Original prompt]

**Issues:** [What went wrong]

### Version 1.1
[Changes made]

**Result:** [Improvement seen]

### Version 2.0 (Current)
[Final working prompt]

**Notes:** [When to use, edge cases]
```

---

## External Resources

### Official Documentation
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google Prompting Guide](https://ai.google.dev/docs/prompt_best_practices)

### Research Papers
- "Chain-of-Thought Prompting" (Wei et al., 2022)
- "Self-Consistency" (Wang et al., 2022)
- "Tree of Thoughts" (Yao et al., 2023)
- "ReAct" (Yao et al., 2022)

### Community Resources
- Prompt Engineering Guide (GitHub)
- Learn Prompting
- r/PromptEngineering
- AI prompt marketplaces (for inspiration)

---

## Quick Reference Card

### Prompt Starters

| Need | Template |
|------|----------|
| Analysis | "Analyze [X] and identify [Y]" |
| Comparison | "Compare [A] and [B] across [criteria]" |
| Creation | "Create a [type] that [requirements]" |
| Explanation | "Explain [concept] as if I'm [audience]" |
| Transformation | "Convert [input] into [output format]" |
| Evaluation | "Evaluate [X] against [criteria]" |

### Output Modifiers

| Want | Add |
|------|-----|
| Bullet points | "Present as a bulleted list" |
| Table format | "Format as a markdown table" |
| Step-by-step | "Provide step-by-step instructions" |
| Brief | "In 50 words or less" |
| Detailed | "Include specific examples and reasoning" |
| Structured | "Use headers and subheaders" |
