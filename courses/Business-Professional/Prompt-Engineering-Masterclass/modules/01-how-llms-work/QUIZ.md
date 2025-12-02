# Module 1 Quiz: How LLMs Actually Work

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
How do LLMs generate text?

A) By understanding the meaning and reasoning about it
B) By retrieving information from a database
C) By predicting the most likely next token based on patterns
D) By following programmed rules for grammar

### Question 2
What is a "token" in the context of LLMs?

A) A payment unit for AI services
B) A security credential for API access
C) A unit of text that the model processes (roughly 3/4 of a word)
D) A complete sentence or paragraph

### Question 3
What is the "context window" of an LLM?

A) The user interface for entering prompts
B) The maximum amount of text the model can process at once
C) The chat history saved between sessions
D) The training data the model was built on

### Question 4
What does temperature control in LLM generation?

A) How fast the model responds
B) How much randomness/creativity in outputs
C) The maximum response length
D) The accuracy of factual information

### Question 5
For a factual task like translating text, what temperature setting is BEST?

A) Temperature 0 - 0.3 (low)
B) Temperature 0.5 (medium)
C) Temperature 0.8 - 1.0 (high)
D) Temperature doesn't matter for factual tasks

### Question 6
What is "hallucination" in AI outputs?

A) The model refusing to respond
B) The model generating false but plausible-sounding information
C) The model repeating itself
D) The model taking too long to respond

### Question 7
Why do specific, detailed prompts generally work better than vague ones?

A) They use fewer tokens
B) They're easier for the model to understand emotionally
C) They constrain the probability space to more relevant outputs
D) They bypass the model's safety filters

### Question 8
Where is the BEST place to put critical information in a long prompt?

A) In the middle, surrounded by context
B) At the very beginning or end of the prompt
C) Repeated multiple times throughout
D) Position doesn't matter

### Question 9
What happens when you exceed an LLM's context window?

A) The model automatically summarizes
B) The earliest information may be truncated or ignored
C) The model charges extra for longer contexts
D) An error prevents any response

### Question 10
What is "RLHF" in LLM training?

A) Rapid Learning from Historical Files
B) Reinforcement Learning from Human Feedback
C) Recursive Language and Hierarchy Formation
D) Real-time Language Handling Framework

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: LLMs can access the internet in real-time to get current information.

### Question 12
True or False: The same prompt will always produce identical outputs from an LLM.

### Question 13
True or False: LLMs can learn and remember information from previous conversations permanently.

### Question 14
True or False: Higher temperature settings produce more consistent, predictable outputs.

### Question 15
True or False: The text in your prompt and the AI's response both count toward the context window limit.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: You need an AI to generate exactly 5 creative tagline options for a new product.

**Question**: What temperature setting would be MOST appropriate?

A) 0.0 - for precision
B) 0.3 - for slight variation
C) 0.8-1.0 - for creativity and diversity
D) It doesn't matter for creative tasks

### Question 17
**Scenario**: The AI confidently states: "According to a 2023 study by Harvard researchers, 87% of companies use AI daily."

**Question**: What should you assume about this statement?

A) It's accurate because the AI cited a specific source
B) It may be hallucinated and needs independent verification
C) It must be true because the percentage is specific
D) Harvard studies are always in AI training data

### Question 18
**Scenario**: You ask the AI a simple question but get an extremely long, repetitive response.

**Question**: What is the MOST likely cause?

A) The model is trying to be thorough
B) Your prompt triggered a failure mode (repetition)
C) The model has too much context
D) You're using the wrong model

### Question 19
**Scenario**: You're having a long conversation with an AI, and it starts referring to information from earlier that seems wrong.

**Question**: What is MOST likely happening?

A) The AI is hallucinating previous conversation content
B) The AI is confused by contradictory information
C) Earlier context may be outside the context window or compressed
D) The AI is testing you

### Question 20
**Scenario**: You want to use AI to generate both a formal legal summary AND creative marketing copy in the same session.

**Question**: What's the BEST approach for temperature settings?

A) Use high temperature for everything since it's more flexible
B) Use low temperature for everything to maintain quality
C) Adjust temperature per task (low for legal, high for creative)
D) Temperature doesn't affect formal vs. creative writing

---

## Answer Key

### Section 1: Multiple Choice

1. **C** - By predicting the most likely next token based on patterns
   - *Explanation: LLMs don't truly "understand"; they predict likely continuations based on training patterns.*

2. **C** - A unit of text that the model processes (roughly 3/4 of a word)
   - *Explanation: Tokens are the fundamental units; roughly 1 token per 4 characters or 0.75 words.*

3. **B** - The maximum amount of text the model can process at once
   - *Explanation: Context window limits total prompt + response tokens the model can handle.*

4. **B** - How much randomness/creativity in outputs
   - *Explanation: Temperature controls sampling randomness from probability distributions.*

5. **A** - Temperature 0 - 0.3 (low)
   - *Explanation: Low temperature produces deterministic, consistent outputs best for factual tasks.*

6. **B** - The model generating false but plausible-sounding information
   - *Explanation: Hallucination is when AI confidently states incorrect information.*

7. **C** - They constrain the probability space to more relevant outputs
   - *Explanation: Specificity narrows what the model considers "likely," improving relevance.*

8. **B** - At the very beginning or end of the prompt
   - *Explanation: Attention is strongest at boundaries; middle content can be "lost."*

9. **B** - The earliest information may be truncated or ignored
   - *Explanation: Exceeding context limits typically causes older content to be dropped.*

10. **B** - Reinforcement Learning from Human Feedback
    - *Explanation: RLHF is the process of training models using human preferences.*

### Section 2: True/False

11. **False** - Standard LLMs don't have internet access; only specialized features/tools enable web access.

12. **False** - Most LLMs include randomness; same prompts can produce different outputs (especially at higher temperatures).

13. **False** - LLMs don't retain information between sessions; each conversation starts fresh.

14. **False** - Higher temperature increases randomness; lower temperature is more predictable.

15. **True** - Both input prompt and generated response consume tokens from the context window.

### Section 3: Scenario-Based

16. **C** - 0.8-1.0 - for creativity and diversity
    - *Explanation: Creative generation benefits from higher temperature for varied outputs.*

17. **B** - It may be hallucinated and needs independent verification
    - *Explanation: Specific-sounding citations are often hallucinated; always verify.*

18. **B** - Your prompt triggered a failure mode (repetition)
    - *Explanation: Repetition is a common failure mode; may need prompt adjustment.*

19. **C** - Earlier context may be outside the context window or compressed
    - *Explanation: Long conversations can exceed context limits, causing information loss.*

20. **C** - Adjust temperature per task (low for legal, high for creative)
    - *Explanation: Different tasks benefit from different temperature settings.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong understanding of LLM mechanics |
| 16-17 | B | Good - Solid grasp with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "Understanding Large Language Models" and "Tokens and Context Windows"
- Questions 4-6 wrong: Review "Temperature, Top-p, and Other Parameters" and "Limitations and Failure Modes"
- Questions 7-10 wrong: Review "Why Certain Prompts Work Better" and "How AI Thinks"
- Scenario questions wrong: Practice with the module exercises

---

*Quiz 1 of 6 | Prompt Engineering Masterclass | 20 points total*
