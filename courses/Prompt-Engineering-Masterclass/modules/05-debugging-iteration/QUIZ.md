# Module 5 Quiz: Debugging & Iteration

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What does the "D" stand for in the DEBUG process?

A) Delete the prompt and start over
B) Describe the problem clearly
C) Develop new hypotheses
D) Determine the best model to use

### Question 2
What is the MOST common cause of generic AI outputs?

A) AI model limitations
B) Internet connectivity issues
C) Vague or unspecific prompts
D) Using free vs. paid accounts

### Question 3
When conducting A/B testing on prompts, what should you change between versions?

A) Everything at once to see maximum difference
B) Multiple variables to test more efficiently
C) One variable at a time to isolate the effect
D) The AI model being used

### Question 4
What is a "conflicting instruction" in prompt engineering?

A) Using multiple prompts in one session
B) Instructions that contradict each other in the same prompt
C) Asking the AI to do impossible tasks
D) Using prompts from different tutorials

### Question 5
Which is the BEST way to fix assumed context in a prompt?

A) Ask the AI to remember previous conversations
B) Provide all necessary context explicitly within the prompt
C) Reference the conversation history
D) Use a different AI model with better memory

### Question 6
When should you STOP iterating on a prompt?

A) After exactly 5 iterations
B) When the output looks good once
C) When quality threshold is met and further changes show diminishing returns
D) When you run out of ideas for changes

### Question 7
What is the purpose of prompt versioning?

A) To bill clients for different versions
B) To track changes, enable rollback, and document what works
C) To use different prompts for different AI models
D) To meet regulatory requirements

### Question 8
What is the FIRST step when a prompt produces poor output?

A) Rewrite the entire prompt
B) Switch to a different AI model
C) Clearly describe the problem (expected vs. actual output)
D) Add more examples

### Question 9
In A/B testing prompts, what does the "control" version represent?

A) The best possible prompt
B) The current/baseline prompt being compared against
C) The version with all constraints
D) The version the user controls manually

### Question 10
What does "scope problem" mean in prompt debugging?

A) The prompt is too long
B) The task is too broad or too narrow
C) The AI can't see the whole prompt
D) The prompt references out-of-scope topics

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: The first prompt you write will usually be the best version.

### Question 12
True or False: When A/B testing prompts, you should test with only one input to save time.

### Question 13
True or False: Adding more instructions to a prompt always improves output quality.

### Question 14
True or False: Documenting prompt changes helps you understand what improvements actually worked.

### Question 15
True or False: If a prompt works once, it will always produce consistent results.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your prompt asks AI to "write a detailed yet concise report that covers everything but stays brief."

**Question**: What type of problem is this?

A) Assumed context
B) Conflicting instructions
C) Scope problem
D) Format problem

### Question 17
**Scenario**: You're testing two email subject line prompts. Version A scores 3/5 on three test inputs. Version B scores 4/5, 5/5, and 2/5 on the same inputs.

**Question**: What should you conclude?

A) Version B is clearly better
B) Version A is more consistent; need more testing on Version B
C) Both versions are equivalent
D) Neither version is usable

### Question 18
**Scenario**: Your prompt produces excellent output the first time but inconsistent output on subsequent tests.

**Question**: What is the MOST likely cause?

A) The AI model is broken
B) The prompt lacks sufficient constraints or examples to guide consistent behavior
C) You're using the wrong model
D) The prompt is too long

### Question 19
**Scenario**: You've iterated a prompt from v1.0 (2/5 quality) to v1.5 (4/5 quality). The last two iterations (v1.4 and v1.5) both scored 4/5.

**Question**: What should you do?

A) Keep iterating until you reach 5/5
B) Consider stopping - you've likely reached diminishing returns
C) Start over with a completely different approach
D) Test only v1.0 and v1.5 in production

### Question 20
**Scenario**: A prompt produces outputs that are factually correct but formatted as paragraphs when you need bullet points.

**Question**: What is the FASTEST fix?

A) Rewrite the entire prompt
B) Add explicit format specification with an example
C) Use a different AI model
D) Add chain-of-thought reasoning

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Describe the problem clearly
   - *Explanation: The DEBUG process starts with clearly describing what went wrong.*

2. **C** - Vague or unspecific prompts
   - *Explanation: Generic outputs usually result from prompts lacking specificity.*

3. **C** - One variable at a time to isolate the effect
   - *Explanation: Testing one variable isolates what caused any change in results.*

4. **B** - Instructions that contradict each other in the same prompt
   - *Explanation: Conflicting instructions confuse the AI and produce inconsistent outputs.*

5. **B** - Provide all necessary context explicitly within the prompt
   - *Explanation: AI doesn't remember previous conversations; context must be in the prompt.*

6. **C** - When quality threshold is met and further changes show diminishing returns
   - *Explanation: Stop when iterations no longer produce meaningful improvement.*

7. **B** - To track changes, enable rollback, and document what works
   - *Explanation: Versioning maintains history and allows reverting to working versions.*

8. **C** - Clearly describe the problem (expected vs. actual output)
   - *Explanation: Diagnosis requires understanding the gap between expected and actual results.*

9. **B** - The current/baseline prompt being compared against
   - *Explanation: Control is the existing version; variant is the modified version.*

10. **B** - The task is too broad or too narrow
    - *Explanation: Scope problems occur when the task range is inappropriate.*

### Section 2: True/False

11. **False** - Prompts typically require multiple iterations to reach optimal performance.

12. **False** - A/B tests need multiple inputs (5-10+) to produce reliable results.

13. **False** - More instructions can add confusion and conflicts; quality over quantity.

14. **True** - Documentation helps identify which changes actually improved performance.

15. **False** - AI has inherent variability; consistency requires proper prompt design.

### Section 3: Scenario-Based

16. **B** - Conflicting instructions
    - *Explanation: "Detailed yet concise" and "covers everything but stays brief" are contradictions.*

17. **B** - Version A is more consistent; need more testing on Version B
    - *Explanation: B has high variance (2-5), suggesting inconsistency that needs investigation.*

18. **B** - The prompt lacks sufficient constraints or examples to guide consistent behavior
    - *Explanation: Inconsistent outputs suggest the prompt allows too much variation.*

19. **B** - Consider stopping - you've likely reached diminishing returns
    - *Explanation: Two iterations at 4/5 with no improvement indicates diminishing returns.*

20. **B** - Add explicit format specification with an example
    - *Explanation: Format issues are quickly fixed by specifying format requirements.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Debugging mastery |
| 16-17 | B | Good - Solid debugging skills with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "Diagnostic Framework" and "A/B Testing"
- Questions 4-6 wrong: Review "Common Mistakes" and "Iterative Refinement"
- Questions 7-10 wrong: Review "Prompt Versioning" and "Why Prompts Fail"
- Scenario questions wrong: Practice with the module exercises

---

*Quiz 5 of 6 | Prompt Engineering Masterclass | 20 points total*
