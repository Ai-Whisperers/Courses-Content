# Module 3 Quiz: Advanced Prompting Patterns

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is "few-shot learning" in prompt engineering?

A) Training the AI on a few examples permanently
B) Providing examples in the prompt to teach a pattern
C) Using short prompts with few words
D) Running multiple prompts quickly

### Question 2
How many examples are typically recommended for few-shot prompts?

A) 1 example only
B) 3-5 diverse examples
C) 10-20 examples for best results
D) As many as possible

### Question 3
What is the PRIMARY benefit of chain-of-thought prompting?

A) Faster response times
B) Shorter outputs
C) Improved accuracy on reasoning tasks through step-by-step processing
D) Better creative writing

### Question 4
Which phrase most effectively triggers chain-of-thought reasoning?

A) "Answer quickly"
B) "Let's think through this step by step"
C) "Give me the short version"
D) "Just the facts"

### Question 5
How does tree-of-thought differ from chain-of-thought?

A) Tree-of-thought is faster
B) Tree-of-thought explores multiple reasoning paths before converging
C) Chain-of-thought uses more examples
D) They are the same technique

### Question 6
What is the purpose of self-consistency in prompting?

A) To make the AI agree with you
B) To generate multiple independent solutions and find consensus
C) To repeat the same prompt for the same answer
D) To ensure the AI is consistent with its training

### Question 7
What does "ReAct" stand for in prompting patterns?

A) Read and Act
B) Reasoning and Acting
C) Response and Action
D) Repeat and Correct

### Question 8
In a ReAct prompt, what follows a "Thought"?

A) Another thought
B) An action
C) The final answer
D) An example

### Question 9
What is meta-prompting?

A) Using prompts about philosophy
B) Using AI to generate or improve prompts
C) Prompting multiple AI models at once
D) Using very long prompts

### Question 10
When is few-shot learning MOST valuable?

A) For simple yes/no questions
B) When the task has a specific format the AI might not know
C) When you want faster responses
D) For all creative writing tasks

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: Chain-of-thought prompting is equally effective for all task types.

### Question 12
True or False: In few-shot learning, the format of examples should be consistent.

### Question 13
True or False: Self-consistency requires running the prompt multiple times in separate conversations.

### Question 14
True or False: ReAct is best suited for tasks that require gathering information or multi-step reasoning.

### Question 15
True or False: Meta-prompting can help you create better prompts by having AI analyze your existing prompts.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: You need the AI to extract specific data fields from unstructured text in a consistent format.

**Question**: Which pattern is MOST appropriate?

A) Chain-of-thought - to reason through extraction
B) Few-shot learning - to show the extraction pattern
C) ReAct - to think and act
D) Self-consistency - to verify extraction

### Question 17
**Scenario**: You're asking the AI to solve a complex math word problem.

**Question**: Which approach would MOST improve accuracy?

A) Asking for just the answer quickly
B) Using chain-of-thought with "Let's solve step by step"
C) Providing 10 examples of other problems
D) Using tree-of-thought for multiple creative solutions

### Question 18
**Scenario**: You need the AI to make a strategic recommendation where multiple valid approaches exist.

**Question**: Which pattern is BEST suited?

A) Few-shot with one right answer
B) Chain-of-thought with a single path
C) Tree-of-thought exploring multiple perspectives
D) ReAct with action steps

### Question 19
**Scenario**: You got an answer of "42" from a calculation prompt but want to verify it's correct.

**Question**: Which approach would help verify the answer?

A) Ask the same question again
B) Use self-consistency with different solution approaches
C) Add more few-shot examples
D) Use meta-prompting to improve the prompt

### Question 20
**Scenario**: Your few-shot prompt for sentiment analysis works for positive and negative reviews but fails on neutral ones.

**Question**: What should you do?

A) Add more positive and negative examples
B) Add examples specifically showing neutral sentiment classification
C) Switch to chain-of-thought instead
D) Remove the few-shot examples entirely

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Providing examples in the prompt to teach a pattern
   - *Explanation: Few-shot learning shows examples in the prompt for pattern learning.*

2. **B** - 3-5 diverse examples
   - *Explanation: 3-5 examples balance pattern teaching with token efficiency.*

3. **C** - Improved accuracy on reasoning tasks through step-by-step processing
   - *Explanation: CoT improves accuracy by making reasoning explicit.*

4. **B** - "Let's think through this step by step"
   - *Explanation: This phrase effectively triggers explicit reasoning.*

5. **B** - Tree-of-thought explores multiple reasoning paths before converging
   - *Explanation: ToT branches into multiple paths; CoT follows one path.*

6. **B** - To generate multiple independent solutions and find consensus
   - *Explanation: Self-consistency uses multiple paths to verify answers.*

7. **B** - Reasoning and Acting
   - *Explanation: ReAct alternates between reasoning (thought) and acting.*

8. **B** - An action
   - *Explanation: ReAct follows Thought → Action → Observation pattern.*

9. **B** - Using AI to generate or improve prompts
   - *Explanation: Meta-prompting uses AI to work on prompts themselves.*

10. **B** - When the task has a specific format the AI might not know
    - *Explanation: Few-shot excels at teaching specific patterns and formats.*

### Section 2: True/False

11. **False** - CoT significantly helps reasoning tasks but adds unnecessary overhead for simple tasks.

12. **True** - Consistent formatting in examples helps the AI learn the pattern more effectively.

13. **False** - Self-consistency can be done in a single prompt by requesting multiple solution paths.

14. **True** - ReAct's thought-action-observation loop suits information gathering and multi-step tasks.

15. **True** - Meta-prompting uses AI to analyze and improve prompt effectiveness.

### Section 3: Scenario-Based

16. **B** - Few-shot learning - to show the extraction pattern
    - *Explanation: Consistent data extraction benefits most from pattern demonstration.*

17. **B** - Using chain-of-thought with "Let's solve step by step"
    - *Explanation: CoT improves math accuracy by making calculation steps explicit.*

18. **C** - Tree-of-thought exploring multiple perspectives
    - *Explanation: Strategic decisions benefit from exploring multiple valid approaches.*

19. **B** - Use self-consistency with different solution approaches
    - *Explanation: Multiple independent paths help verify correctness.*

20. **B** - Add examples specifically showing neutral sentiment classification
    - *Explanation: Few-shot needs examples covering all categories, including edge cases.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Advanced pattern mastery |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "Few-Shot Learning" and "Chain-of-Thought Prompting"
- Questions 4-6 wrong: Review "Tree-of-Thought" and "Self-Consistency"
- Questions 7-10 wrong: Review "ReAct Pattern" and "Meta-Prompting"
- Scenario questions wrong: Practice with the module exercises

---

*Quiz 3 of 6 | Prompt Engineering Masterclass | 20 points total*
