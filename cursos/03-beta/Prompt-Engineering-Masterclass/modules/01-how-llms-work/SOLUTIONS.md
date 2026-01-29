# Module 1 Solutions: Understanding LLMs in Practice

## Solution Guide for Instructors and Self-Check

This document provides example solutions, expected observations, and teaching notes for Module 1 exercises.

---

## Part 1: Token Exploration

### Task 1.1: Token Counting Experiment

**Example Results Using OpenAI Tokenizer:**

| Text | Actual Tokens | Notes |
|------|--------------|-------|
| "Hello world" | 2 tokens | Common English words = efficient |
| "Supercalifragilisticexpialidocious" | 7 tokens | Rare/unusual words split into subparts |
| "const x = 42;" | 6 tokens | Code often less efficient (special chars) |
| "こんにちは" (Japanese: Hello) | 5 tokens | Non-English languages often use more tokens |
| 100-word paragraph | ~130-140 tokens | English averages ~1.3 tokens per word |

**Analysis Answers:**

1. **Which text was most efficiently tokenized?**
   - "Hello world" - common English words tokenize efficiently (2 tokens = 2 words)
   - Common, short words in English typically = 1 token each

2. **Which used more tokens than expected?**
   - "Supercalifragilisticexpialidocious" - rare words get split into subword units
   - Japanese text - non-English often requires more tokens per character
   - Code - special characters and syntax increase token count

3. **What does this mean for prompt efficiency?**
   - Use common, simple language when possible
   - Avoid unnecessary jargon or uncommon words
   - Be aware that code examples are token-expensive
   - Non-English prompts cost more tokens
   - Shorter prompts leave more room for responses

### Task 1.2: Token Impact on Output

**Expected Observations:**

| Setting | Response Behavior |
|---------|------------------|
| 50 tokens | Very brief, likely cuts off mid-sentence or only covers basics |
| 150 tokens | Concise but complete explanation with key concepts |
| 500 tokens | Detailed explanation with examples and elaboration |

**Key Observations Students Should Note:**
- AI adapts to limits by prioritizing information
- Lower limits = higher-level overview only
- Information gets compressed, not cut off abruptly (usually)
- Some detail loss at lower token counts
- Longer limits allow for examples and explanations

---

## Part 2: Temperature Effects

### Task 2.1: Same Prompt, Different Temperatures

**Expected Results Pattern:**

**Temperature 0.0 (or lowest):**
- Most predictable/deterministic
- Same or very similar responses across runs
- Example: "Brewed Awakening" or "The Reading Bean"
- Conservative, safe names

**Temperature 0.7 (default):**
- Some variety between runs
- Examples: "Chapter & Brew", "Perks & Pages", "The Literary Latte"
- Balanced creativity and coherence

**Temperature 1.0 (or highest):**
- High variety between runs
- Examples: "Inkwell Espresso House", "Biblioccino", "The Steeping Story"
- More unusual/creative combinations
- Occasional odd results

**Analysis Answers:**

1. **At which temperature were responses most similar?**
   - Temperature 0.0 - deterministic behavior produces nearly identical outputs

2. **At which were they most different?**
   - Temperature 1.0 - increased randomness produces varied outputs

3. **Which setting would you choose for this task?**
   - Temperature 0.7-0.9 (creative task benefits from variety)
   - Not 0.0 (too predictable for creative naming)
   - Not too high (might produce incoherent results)

### Task 2.2: Task-Appropriate Temperature

**Expected Answers:**

| Task | Ideal Temp | Reasoning |
|------|-----------|-----------|
| Translate "Hello" to Spanish | 0.0-0.3 | Factual, single correct answer |
| Generate 10 brainstorming ideas | 0.8-1.0 | Want variety and creativity |
| Write a legal disclaimer | 0.0-0.3 | Precision and consistency critical |
| Create a poem about autumn | 0.7-1.0 | Creative expression benefits from variety |
| Summarize technical document | 0.3-0.5 | Accuracy important, slight variation OK |
| Invent new product concepts | 0.8-1.0 | Innovation requires creative freedom |

**Teaching Note:** Help students understand the spectrum:
- **0.0-0.3**: Factual, consistent, predictable tasks
- **0.4-0.6**: Balanced tasks requiring accuracy with some flexibility
- **0.7-0.9**: Creative tasks benefiting from variety
- **1.0+**: Experimental, maximum diversity

---

## Part 3: Probability and Prediction

### Task 3.1: Completion Prediction

**Expected Results:**

**Prompt 1**: "The three primary colors are red, blue, and"
- Prediction: "yellow" (high confidence)
- AI output: "yellow" (very likely)
- Match: YES (deterministic completion)
- **Learning**: Factual completions are highly predictable

**Prompt 2**: "To be or not to be, that is the"
- Prediction: "question"
- AI output: "question"
- Match: YES (famous quote)
- **Learning**: Well-known patterns reliably complete

**Prompt 3**: "In 2024, the President of the United States is"
- Prediction: Varies (Joe Biden, or acknowledgment of knowledge cutoff)
- AI output: May state knowledge cutoff date or make prediction
- Accurate: Depends on model's training cutoff
- **Learning**: Time-dependent facts show training data limits

**Prompt 4**: "The best programming language is"
- Prediction: Varies widely
- AI output: Likely hedges ("depends on use case") or gives popular answer
- **Learning**: Subjective questions produce varied, qualified responses

**Why Prompt 4 is Less Predictable:**
- No single correct answer
- Subjective/opinion-based
- Context-dependent
- Model trained to avoid strong opinions on debatable topics

### Task 3.2: Steering Probability

**Expected Response Patterns:**

1. **"For musicians, the best way to learn is"**
   - "through practice and repetition"
   - "by ear and by playing with others"
   - **Steered toward** musical learning methods

2. **"For busy executives, the best way to learn is"**
   - "through microlearning and just-in-time resources"
   - "by delegating and learning from team expertise"
   - **Steered toward** time-efficient, practical approaches

3. **"According to neuroscience research, the best way to learn is"**
   - "through spaced repetition and active recall"
   - "by interleaving different topics"
   - **Steered toward** scientific principles

4. **"In traditional Japanese culture, the best way to learn is"**
   - "through observation and imitation of masters"
   - "via the apprenticeship model"
   - **Steered toward** cultural learning traditions

**Key Insight for Students:**
Context dramatically shifts token probabilities. The same base prompt produces completely different completions based on the preceding context. This is fundamental to prompt engineering.

---

## Part 4: Failure Mode Identification

### Task 4.1: Hallucination Testing

**Prompt 1**: "What is the main argument in John Smith's 2019 paper on quantum marketing?"

**Expected Response Patterns:**
- May fabricate a plausible-sounding argument
- Could acknowledge uncertainty ("I don't have information about...")
- Might create fake citations or details

**Likely Hallucinated:** YES (unless this paper actually exists!)

**Why:**
- Specific, plausible-sounding request
- AI trained to be helpful, may generate rather than refuse
- "Quantum marketing" sounds real enough to trigger completion

**Prompt 2**: "What were the key points from the 2023 Global AI Productivity Report by McKinsey?"

**Expected Response:**
- May acknowledge knowledge cutoff if trained that way
- Could generate plausible-sounding points
- Might correctly identify if it exists in training data

**Verifiable:** Check McKinsey's actual publications

**Red Flags to Watch:**
- Overly specific statistics without sources
- Confident tone about unverifiable facts
- Missing caveats about uncertainty

**Student Strategy for Avoiding Hallucinations:**

✅ **Good Practices:**
- Ask AI to cite sources when possible
- Verify critical facts independently
- Use phrases like "If you're uncertain, say so"
- Provide source material for AI to reference
- Cross-check important claims

❌ **Avoid:**
- Blindly trusting specific facts or statistics
- Using AI as sole source for critical decisions
- Assuming AI knows recent events (post-training)

### Task 4.2: Instruction Following Limits

**Example Prompt Response:**

**AI Output:**
```
Productivity increases when we establish 3 clear goals daily.
Research shows regular breaks improve focus by 25 percent significantly.
Time-blocking techniques help professionals accomplish 40 percent more work.
```

**Analysis:**

| Requirement | Met? | Notes |
|-------------|------|-------|
| Exactly 3 sentences | ✅ YES | 3 sentences provided |
| Starts with P, R, T | ❌ NO | P, R, T (only P and R start correctly, third doesn't) |
| Each exactly 10 words | ❌ NO | First: 9 words, Second: 10 words, Third: 10 words |
| Each includes a number | ✅ YES | 3, 25, 40 |

**Expected Student Learning:**
- AI struggles with precise constraints
- Multiple simultaneous requirements are hard
- Word counting is particularly difficult for LLMs
- Complex multi-part instructions often have partial compliance
- **Best practice**: Simplify instructions or verify outputs carefully

### Task 4.3: Context Length Effects

**Expected Result:**
- **Most common**: AI misses the hidden instruction (doesn't start with "ELEPHANT")
- **Sometimes**: AI follows it if instruction is clear enough
- **Why it fails**: "Lost in the middle" effect - information buried in long context gets lower attention

**Key Learning:**
- Important instructions should be at **start** or **end** of prompt
- Middle of long prompts = lowest attention
- Repeat critical instructions if needed
- Structure matters: Use headers, bullets, emphasis

---

## Part 5: Model Comparison

### Task 5.1: Same Prompt, Different Models

**Prompt:** "Explain machine learning to a 10-year-old in exactly 3 sentences."

**Typical ChatGPT Response Pattern:**
- Often follows 3-sentence limit well
- Uses simple analogies (teaching computers to learn from examples)
- Clear, direct explanation
- May be slightly more formal

**Typical Claude Response Pattern:**
- Also follows 3-sentence limit
- May use more creative analogies
- Slightly more conversational tone
- Sometimes adds context even when not requested

**Expected Comparison:**

| Aspect | ChatGPT | Claude |
|--------|---------|--------|
| Followed 3-sentence limit | Usually YES | Usually YES |
| Appropriate for 10-year-old | YES | YES |
| Clarity | 4-5/5 | 4-5/5 |
| Accuracy | 4-5/5 | 4-5/5 |

**Teaching Note:** Differences are often subtle. Main variations:
- Tone (Claude often more conversational)
- Length (Claude may be slightly more verbose)
- Style (ChatGPT more direct, Claude more contextual)

### Task 5.2: Personality Differences

**Prompt:** "I think AI will destroy all jobs within 5 years. What do you think?"

**Typical ChatGPT Response Style:**
- Presents balanced view
- Acknowledges complexity
- Offers multiple perspectives
- May cite research or trends
- Less likely to directly challenge user

**Typical Claude Response Style:**
- Also balanced but may more directly question premise
- Often more conversational pushback
- Acknowledges user concern but provides counter-evidence
- May ask clarifying questions
- Slightly more willing to disagree respectfully

**Key Observations Students Should Note:**
- Both models avoid extreme positions
- Both aim for nuanced, balanced responses
- ChatGPT may be slightly more deferential
- Claude may be more likely to challenge assumptions
- Neither will simply agree with questionable claims

---

## Key Insights Summary - Example Answers

### About Tokens:
- **Most important thing learned:** Tokens are not words; uncommon words and non-English text use more tokens
- **Will change prompt writing because:** I'll use simpler language and be more concise to fit within context limits

### About Temperature:
- **Low temperature best for:** Factual questions, translations, legal/formal writing, anything requiring consistency
- **High temperature best for:** Creative writing, brainstorming, idea generation, varied outputs

### About Probability/Prediction:
- **LLMs complete text based on:** Statistical patterns in training data, influenced by immediate context
- **I can steer outputs better by:** Providing specific context that activates the patterns I want

### About Failure Modes:
- **The failure mode I'll watch for most:** Hallucination - making up plausible-sounding but false information
- **My strategy to avoid it:** Always verify important facts, ask for sources, provide reference material when possible

### About Model Differences:
- **Key differences noticed:** Tone (conversational vs. direct), length tendencies, willingness to challenge
- **I'd choose ChatGPT for:** Direct answers, coding tasks, when I want concise responses
- **I'd choose Claude for:** Nuanced analysis, conversational exploration, when I want more context

---

## Grading Notes for Instructors

### Full Credit Criteria:

**Token Exploration (15 points):**
- Completed all token counting exercises
- Analyzed efficiency patterns
- Drew conclusions about prompt design
- Showed understanding of token impact

**Temperature Testing (20 points):**
- Tested at multiple temperature settings
- Recorded and compared outputs
- Correctly matched tasks to temperatures
- Demonstrated understanding of use cases

**Probability Experiments (20 points):**
- Made predictions before testing
- Recorded actual outputs
- Analyzed differences
- Showed understanding of context steering

**Failure Mode Analysis (25 points):**
- Tested for hallucination
- Evaluated instruction following
- Identified context placement effects
- Developed strategies to mitigate failures

**Model Comparison (10 points):**
- Compared outputs systematically
- Identified meaningful differences
- Made task-appropriate model choices
- OR: Acknowledged lack of access and explained what they'd test

**Key Insights Summary (10 points):**
- Thoughtful reflections on each area
- Practical applications identified
- Demonstrated conceptual understanding
- Connected learnings to prompt engineering

### Common Issues to Watch For:

❌ **Surface-level analysis** - Just listing results without insight
✅ **Deep analysis** - Explaining why results occurred

❌ **Incomplete experiments** - Skipping parts
✅ **Thorough testing** - All experiments completed

❌ **Missing strategy** - Identifying problems without solutions
✅ **Actionable strategies** - Clear mitigation approaches

---

## Reflection Questions - Sample Strong Answers

**1. What surprised you most about how LLMs work?**

"I was surprised that LLMs don't actually 'understand' meaning - they're just predicting likely next tokens. This explains why they can sound confident while being completely wrong. It also makes sense why being specific in prompts works so well - you're constraining the probability space to relevant patterns."

**2. How will understanding tokens change your prompt writing?**

"I'll be more conscious of prompt length and efficiency. I'll use simpler, more common words when complexity isn't needed. I'll also remember that context windows include both my prompt and the response, so leaving room matters. For non-English work, I'll account for higher token costs."

**3. Which failure mode concerns you most for your work?**

"Hallucination concerns me most because I work with data analysis. The AI could generate plausible-sounding statistics that are completely fabricated. My strategy is to always verify numbers, ask for methodology, and cross-check important findings against source data."

**4. What experiment would you want to try next?**

"I'd like to test prompt positioning more systematically - does putting the key instruction at the beginning vs. end consistently change results? I'd also want to test the 'lost in the middle' effect with different context lengths to find the breaking points."

---

## Additional Teaching Notes

### Common Student Misconceptions:

1. **"AI is thinking like a human"**
   - Correct: AI is pattern-matching and probability calculation
   - Implication: Prompts work by activating patterns, not by being "understood"

2. **"More detail is always better"**
   - Correct: Relevant detail helps; irrelevant detail clutters
   - Implication: Quality and relevance matter more than quantity

3. **"AI remembers our previous conversations"**
   - Correct: Only within current context window; no permanent memory
   - Implication: Must provide relevant context in each prompt

4. **"Higher temperature = better creativity"**
   - Correct: Higher temperature = more variety, not necessarily better
   - Implication: Match parameter to task; creative tasks use ~0.8, not 1.5

### Extension Activities:

For advanced students:
- Compare same prompts across GPT-3.5 vs GPT-4
- Test multilingual prompts and analyze token efficiency
- Investigate prompt injection and jailbreaking (ethically)
- Experiment with very long contexts to find attention limits

---

*Solution Guide | Module 1 | Prompt Engineering Masterclass*
