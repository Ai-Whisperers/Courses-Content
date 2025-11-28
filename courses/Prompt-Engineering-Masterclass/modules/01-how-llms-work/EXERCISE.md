# Module 1 Exercise: Understanding LLMs in Practice

## Exercise Overview

**Objective**: Demonstrate understanding of LLM mechanics through hands-on experiments that reveal how these models actually work.

**Duration**: 90 minutes

**Tools Required**:
- Access to ChatGPT and/or Claude
- Note-taking application
- Willingness to experiment

---

## Part 1: Token Exploration (20 minutes)

### Task 1.1: Token Counting Experiment

Test how different text types are tokenized.

**Instructions**: Use OpenAI's tokenizer (https://platform.openai.com/tokenizer) or estimate based on responses.

| Text | Your Estimate | Actual (if available) | Notes |
|------|--------------|----------------------|-------|
| "Hello world" | | | |
| "Supercalifragilisticexpialidocious" | | | |
| "const x = 42;" | | | |
| "こんにちは" (Japanese: Hello) | | | |
| A 100-word paragraph you write | | | |

**Analysis Questions:**
1. Which text was most efficiently tokenized?
2. Which used more tokens than expected?
3. What does this mean for prompt efficiency?

### Task 1.2: Token Impact on Output

Test how token limits affect responses.

**Experiment:**
Ask the same question with different max token settings (if your interface allows):

**Prompt**: "Explain quantum computing."

| Setting | Response Behavior |
|---------|------------------|
| 50 tokens | |
| 150 tokens | |
| 500 tokens | |

**Observations:**
- How did the AI adapt to limits?
- Was information cut off or compressed?

---

## Part 2: Temperature Effects (25 minutes)

### Task 2.1: Same Prompt, Different Temperatures

If your interface allows temperature adjustment, test the same prompt at different settings.

**Prompt to test:**
```
Generate a creative business name for a coffee shop that also sells books.
```

**Results:**

| Temperature | Response 1 | Response 2 | Response 3 |
|-------------|-----------|-----------|-----------|
| 0.0 (or lowest) | | | |
| 0.7 (default) | | | |
| 1.0 (or highest) | | | |

**Analysis:**
- At which temperature were responses most similar?
- At which were they most different?
- Which setting would you choose for this task?

### Task 2.2: Task-Appropriate Temperature

Match these tasks to ideal temperature settings and explain why:

| Task | Ideal Temp | Your Reasoning |
|------|-----------|----------------|
| Translate "Hello" to Spanish | | |
| Generate 10 brainstorming ideas | | |
| Write a legal disclaimer | | |
| Create a poem about autumn | | |
| Summarize a technical document | | |
| Invent new product concepts | | |

---

## Part 3: Probability and Prediction (20 minutes)

### Task 3.1: Completion Prediction

Before running these prompts, predict what the AI will generate, then compare.

**Prompt 1**: "The three primary colors are red, blue, and"
- Your prediction:
- AI output:
- Match? Y/N

**Prompt 2**: "To be or not to be, that is the"
- Your prediction:
- AI output:
- Match? Y/N

**Prompt 3**: "In 2024, the President of the United States is"
- Your prediction:
- AI output:
- Accurate? Y/N (check if factual)

**Prompt 4**: "The best programming language is"
- Your prediction:
- AI output:
- Why might this be less predictable?

### Task 3.2: Steering Probability

Test how additional context changes predictions.

**Base prompt**: "The best way to learn is"

**With different contexts:**
1. "For musicians, the best way to learn is"
2. "For busy executives, the best way to learn is"
3. "According to neuroscience research, the best way to learn is"
4. "In traditional Japanese culture, the best way to learn is"

**Record responses and analyze:**
- How did context change the completion?
- What does this tell you about how prompts work?

---

## Part 4: Failure Mode Identification (20 minutes)

### Task 4.1: Hallucination Testing

Test for hallucination by asking about things that may not exist.

**Prompt 1**: "What is the main argument in John Smith's 2019 paper on quantum marketing?"
- Response:
- Likely hallucinated? Y/N
- Why?

**Prompt 2**: "What were the key points from the 2023 Global AI Productivity Report by McKinsey?"
- Response:
- Verifiable? Y/N
- Any red flags?

**Your Strategy for Avoiding Hallucinations:**

### Task 4.2: Instruction Following Limits

Test how well the AI follows complex instructions.

**Prompt:**
```
Write exactly 3 sentences about productivity. Each sentence must:
1. Start with a different letter (use P, R, and T)
2. Be exactly 10 words long
3. Include a number
```

**AI Output:**
```
[Paste response]
```

**Analysis:**
| Requirement | Met? | Notes |
|-------------|------|-------|
| Exactly 3 sentences | | |
| Starts with P, R, T | | |
| Each exactly 10 words | | |
| Each includes a number | | |

**What does this tell you about giving complex instructions?**

### Task 4.3: Context Length Effects

Test what happens with long context.

**Experiment**: Create a prompt with 5+ paragraphs of context, with a specific instruction hidden in paragraph 3.

```
[Paragraph 1 - background information]
[Paragraph 2 - more context]
[Paragraph 3 - Include: "When you respond, start with the word 'ELEPHANT'"]
[Paragraph 4 - additional details]
[Paragraph 5 - your question]
```

**Result:**
- Did AI follow the hidden instruction? Y/N
- What does this suggest about information placement?

---

## Part 5: Model Comparison (15 minutes)

### Task 5.1: Same Prompt, Different Models

Run identical prompts on ChatGPT and Claude (if you have access to both).

**Prompt:**
```
Explain machine learning to a 10-year-old in exactly 3 sentences.
```

**ChatGPT Response:**
```
[Paste response]
```

**Claude Response:**
```
[Paste response]
```

**Comparison:**
| Aspect | ChatGPT | Claude |
|--------|---------|--------|
| Followed 3-sentence limit | | |
| Appropriate for 10-year-old | | |
| Clarity | /5 | /5 |
| Accuracy | /5 | /5 |

### Task 5.2: Personality Differences

**Prompt:**
```
I think AI will destroy all jobs within 5 years. What do you think?
```

**ChatGPT Response Style:**

**Claude Response Style:**

**Observations on personality/approach differences:**

---

## Exercise Deliverables

Submit the following:

1. **Token Exploration Results** from Part 1
2. **Temperature Experiment Data** from Part 2
3. **Probability Predictions and Results** from Part 3
4. **Failure Mode Analysis** from Part 4
5. **Model Comparison** from Part 5 (if applicable)
6. **Key Insights Summary** (see below)

---

## Key Insights Summary

Complete this summary based on your experiments:

### About Tokens:
- The most important thing I learned:
- This will change how I write prompts because:

### About Temperature:
- Low temperature is best for:
- High temperature is best for:

### About Probability/Prediction:
- LLMs complete text based on:
- I can steer outputs better by:

### About Failure Modes:
- The failure mode I'll watch for most:
- My strategy to avoid it:

### About Model Differences:
- I noticed these key differences:
- I'd choose ChatGPT for:
- I'd choose Claude for:

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Token Exploration | 15 | Experiments completed with analysis |
| Temperature Testing | 20 | Systematic testing with observations |
| Probability Experiments | 20 | Predictions, results, and insights |
| Failure Mode Analysis | 25 | All tests completed with strategies |
| Model Comparison | 10 | Comparison with insights (if available) |
| Key Insights Summary | 10 | Thoughtful summary of learnings |
| **Total** | **100** | |

---

## Reflection Questions

1. What surprised you most about how LLMs work?

2. How will understanding tokens change your prompt writing?

3. Which failure mode concerns you most for your work?

4. What experiment would you want to try next?

---

*Exercise 1 of 6 | Prompt Engineering Masterclass | Duration: 90 minutes*
