# Module 1: How LLMs Actually Work

## Learning Objectives

By the end of this module, you will be able to:

1. Explain the basic architecture of large language models
2. Describe how AI generates text through next-token prediction
3. Understand tokens and context window limitations
4. Recognize why certain prompt structures produce better results
5. Configure temperature, top-p, and other parameters appropriately
6. Identify common failure modes and their causes

---

## Prerequisites

- Basic experience using ChatGPT, Claude, or similar tools
- Curiosity about how AI works (no technical background required)

**Estimated Time**: 3 hours

---

## 1. Understanding Large Language Models

### What is an LLM?

A Large Language Model (LLM) is a type of AI trained to understand and generate human-like text. Think of it as an extremely sophisticated pattern-completion system that has read vast amounts of text and learned the statistical relationships between words, phrases, and concepts.

**Key Characteristics:**
- **Large**: Billions of parameters (weights that store learned patterns)
- **Language**: Specialized in processing and generating text
- **Model**: A mathematical representation of language patterns

### How LLMs Are Trained

The training process involves three main stages:

**Stage 1: Pre-training**
- Exposed to massive text datasets (books, websites, articles)
- Learns to predict the next word in sequences
- Develops understanding of grammar, facts, and relationships
- No specific task - just pattern learning

**Stage 2: Fine-tuning**
- Trained on specific tasks (Q&A, summarization, coding)
- Learns to follow instructions
- Adapts general knowledge to useful applications

**Stage 3: Alignment (RLHF)**
- Reinforcement Learning from Human Feedback
- Humans rate outputs for helpfulness and safety
- Model learns to produce preferred responses
- Creates the helpful, conversational AI you interact with

### The Transformer Architecture (Simplified)

Modern LLMs use a "transformer" architecture. Here's what matters for prompt engineering:

```
INPUT TEXT
    ↓
[Tokenization] → Breaks text into pieces (tokens)
    ↓
[Embedding] → Converts tokens to numbers
    ↓
[Attention] → Determines which words relate to which
    ↓
[Processing] → Multiple layers analyze relationships
    ↓
[Prediction] → Calculates probability for each possible next token
    ↓
OUTPUT TEXT (one token at a time)
```

**The Key Insight**: LLMs don't "understand" in the human sense. They calculate statistical probabilities based on patterns in their training data.

---

## 2. How AI "Thinks" and Generates Text

### Next-Token Prediction

At its core, an LLM does one thing: predict the next token.

**Example:**
```
Input: "The quick brown fox"
AI calculates: What token most likely comes next?
  - "jumps" (high probability)
  - "runs" (medium probability)
  - "sleeps" (lower probability)
  - "banana" (very low probability)
```

This process repeats token by token until the response is complete.

### Why This Matters for Prompts

Because LLMs predict "likely" continuations:

1. **Context shapes output**: Your prompt creates the context that influences predictions
2. **Specific is better**: Detailed prompts constrain the possibility space
3. **Format begets format**: If you show a format, the AI continues that format
4. **Patterns are powerful**: Showing examples creates patterns for AI to follow

### The Attention Mechanism

Attention allows the model to focus on relevant parts of the input when generating each word.

**Example:**
```
Prompt: "Translate 'hello' to French"

When generating the translation, attention focuses heavily on:
- "hello" (what to translate)
- "French" (target language)
- "Translate" (the task)
```

**Practical Implication**: Important information should be clearly stated and positioned where the model will "attend" to it.

### Autoregressive Generation

LLMs generate text one token at a time, left to right:

```
Step 1: "The" → predicts "capital"
Step 2: "The capital" → predicts "of"
Step 3: "The capital of" → predicts "France"
Step 4: "The capital of France" → predicts "is"
Step 5: "The capital of France is" → predicts "Paris"
```

**Key Insight**: Once a token is generated, it becomes part of the context for the next token. Early mistakes compound.

---

## 3. Tokens and Context Windows

### What Are Tokens?

Tokens are the units of text that LLMs process. They're not exactly words.

**Tokenization Examples:**
```
"hello" → 1 token
"Hello" → 1 token (capitalization matters)
"hamburger" → 1 token
"unfortunately" → 1 token
"unpredictability" → 3 tokens (un + predict + ability)
"GPT-4" → 3 tokens (GPT + - + 4)
```

**Rough Rule**: 1 token ≈ 4 characters or ¾ of a word in English

**Why Tokens Matter:**
- Pricing often based on tokens
- Context limits measured in tokens
- Unusual words use more tokens (less efficient)
- Code and technical content often token-heavy

### Context Windows

The context window is the maximum amount of text an LLM can consider at once.

**Context Windows by Model (Approximate):**
| Model | Context Window |
|-------|---------------|
| GPT-3.5 | 4,096 - 16,384 tokens |
| GPT-4 | 8,192 - 128,000 tokens |
| Claude 3 Sonnet | 200,000 tokens |
| Claude 3 Opus | 200,000 tokens |

**Context Window Includes:**
- System prompt (if applicable)
- Conversation history
- Your current prompt
- The AI's response

### Managing Context Effectively

**Problem**: Long conversations exceed context limits

**Solutions:**
1. **Summarize periodically**: Ask AI to summarize conversation so far
2. **Start fresh**: New conversation for new topics
3. **Be concise**: Don't repeat unnecessary context
4. **Front-load important info**: Key details early in prompt

**Token Counting Prompt:**
```
Approximately how many tokens is this text?
[Your text here]

Provide a rough estimate based on word count × 1.3.
```

---

## 4. Why Certain Prompts Work Better

### The Psychology of Prompting

LLMs respond to patterns. Understanding which patterns work helps you craft better prompts.

**Pattern 1: Specificity Wins**
```
Poor: "Write about dogs"
Better: "Write a 200-word article about the health benefits of owning a dog for seniors, focusing on mental health and daily activity"
```

Why? More constraints = more focused probability distribution = better results

**Pattern 2: Structure Guides Output**
```
Poor: "Give me marketing ideas"
Better: "Provide 5 marketing ideas in this format:
1. [Idea name]
   - Description: [one sentence]
   - Budget: [low/medium/high]
   - Difficulty: [easy/medium/hard]"
```

Why? Showing the format creates a pattern for the model to continue

**Pattern 3: Context Sets Expectations**
```
Poor: "How do I invest?"
Better: "I'm a 30-year-old with $10,000 to invest, moderate risk tolerance, and a 20-year timeline. I already have an emergency fund and retirement account. What investment approach would you suggest?"
```

Why? Context narrows the space of reasonable responses

### The Role of Position

Where information appears in your prompt matters:

**Beginning**: Task/role definition - sets the frame
**Middle**: Context and details - provides information
**End**: Specific question or output instruction - immediate focus

**Lost in the Middle**: Research shows LLMs can struggle with information in the middle of very long prompts. Important details should be at the start or end.

### Cognitive Load in Prompts

Like humans, LLMs perform better with clear, well-organized information.

**High Cognitive Load (Worse):**
```
Can you maybe write something that's kind of like a blog post but also sort of an article about AI and how it relates to business but not too technical because my audience doesn't know much about technology and I want it to be around 500 words give or take and maybe include some examples if you can think of any good ones?
```

**Low Cognitive Load (Better):**
```
Write a 500-word blog post.

Topic: How AI is changing small business operations
Audience: Non-technical small business owners
Tone: Conversational, encouraging
Include: 2-3 real-world examples
```

---

## 5. Temperature, Top-p, and Other Parameters

### Temperature

Temperature controls randomness in output. It affects how the model samples from its predicted probabilities.

| Setting | Behavior | Best For |
|---------|----------|----------|
| 0.0 | Most likely tokens only | Factual, consistent tasks |
| 0.3-0.5 | Mostly predictable | Business writing, analysis |
| 0.7 | Balanced | General use, default |
| 0.9-1.0 | More creative, varied | Brainstorming, creative writing |
| >1.0 | Increasingly random | Experimental only |

**Example:**
```
Prompt: "Complete this sentence: The best way to learn is..."

Temperature 0.0: "...through practice and repetition."
Temperature 0.7: "...by doing, making mistakes, and iterating."
Temperature 1.0: "...by diving headfirst into challenging projects that stretch your abilities."
```

### Top-p (Nucleus Sampling)

Top-p limits consideration to tokens that make up the top p% of probability mass.

| Setting | Behavior |
|---------|----------|
| 1.0 | Consider all possibilities |
| 0.9 | Consider top 90% probability mass |
| 0.5 | Only top 50% - more conservative |

**Interaction with Temperature:**
- Low temperature + high top-p ≈ consistent but with variety
- High temperature + low top-p ≈ creative but not random

**Practical Default**: Temperature 0.7, Top-p 1.0 (or adjust temperature only)

### Other Parameters

**Max Tokens**: Limits response length
- Set to prevent runaway long responses
- Doesn't guarantee the model will use all tokens

**Stop Sequences**: Strings that terminate generation
- Useful for structured outputs
- Example: Stop at "---" for section-limited responses

**Presence/Frequency Penalties**: Reduce repetition
- Presence penalty: Discourages repeating any mentioned concept
- Frequency penalty: Discourages repeating tokens proportionally

### Parameter Selection Guide

| Task Type | Temperature | Top-p | Notes |
|-----------|-------------|-------|-------|
| Factual Q&A | 0.0-0.3 | 1.0 | Prioritize accuracy |
| Business writing | 0.3-0.5 | 0.9 | Clear and professional |
| General assistance | 0.7 | 1.0 | Balanced default |
| Creative writing | 0.8-1.0 | 1.0 | Encourage variety |
| Brainstorming | 0.9-1.0 | 1.0 | Maximum diversity |
| Code generation | 0.0-0.3 | 1.0 | Correctness matters |

---

## 6. Limitations and Failure Modes

### Common Failure Modes

**1. Hallucination**
- AI generates false but plausible information
- Especially common with specific facts, citations, numbers
- Solution: Always verify critical facts

**2. Repetition**
- AI loops or repeats phrases
- More common at high temperatures or with poor prompts
- Solution: Adjust temperature, rephrase prompt

**3. Refusal/Over-caution**
- Model declines reasonable requests due to safety training
- Solution: Rephrase to clarify legitimate use case

**4. Instruction Following Failure**
- Model ignores part of your instructions
- Common with complex, multi-part prompts
- Solution: Break into steps, be more explicit

**5. Context Confusion**
- In long conversations, model loses track
- May reference wrong information
- Solution: Explicitly remind of relevant context

**6. Sycophancy**
- Model agrees with you even when wrong
- Especially common when you express opinion first
- Solution: Ask for analysis before sharing your view

### Understanding Limitations

**What LLMs Cannot Do:**
- Access real-time information (without tools)
- Remember previous conversations (without explicit context)
- Learn from your corrections (within one conversation, no permanent learning)
- Guarantee factual accuracy
- Understand they don't understand
- Access external files, URLs, or systems directly

**What This Means for Prompting:**
- Provide all necessary context in each prompt
- Don't assume the model "remembers" prior conversations
- Verify important facts independently
- Use specific, structured prompts for complex tasks

---

## Best Practices Summary

1. **Understand the mechanism**: LLMs predict likely text continuations
2. **Specificity matters**: Detailed prompts yield focused results
3. **Structure guides output**: Format your prompt to get formatted output
4. **Position important info**: Start and end positions get most attention
5. **Match parameters to task**: Lower temperature for facts, higher for creativity
6. **Respect limitations**: LLMs hallucinate, don't remember, and aren't factual databases
7. **Iterate based on understanding**: When outputs fail, think about why mechanistically

---

## Knowledge Check

Before moving to exercises, confirm you can answer:

1. How does an LLM generate text (simplified)?
2. What is a token and why does it matter?
3. What happens when context window limits are exceeded?
4. Why do specific prompts work better than vague ones?
5. When would you use temperature 0 vs. temperature 1?
6. What are three common failure modes of LLMs?

---

## Additional Resources

### Technical Deep Dives
- "Attention Is All You Need" (Transformer paper)
- OpenAI's GPT-4 Technical Report
- Anthropic's Model Card documentation

### Practical Guides
- OpenAI Prompt Engineering Guide
- Anthropic's Prompt Design Documentation
- Course supplementary readings

---

## Summary

In this module, you learned:

- **LLM Architecture**: Transformers trained on text prediction
- **Generation Process**: Token-by-token prediction based on probability
- **Tokens & Context**: Understanding the units and limits of LLM processing
- **Why Prompts Work**: Specificity, structure, and positioning
- **Parameters**: Temperature, top-p, and when to adjust them
- **Limitations**: Hallucination, repetition, and other failure modes

**Next Module**: Prompt Structure & Techniques - building perfect prompts from the ground up.

---

*Module 1 of 6 | Prompt Engineering Masterclass | Duration: 3 hours*
