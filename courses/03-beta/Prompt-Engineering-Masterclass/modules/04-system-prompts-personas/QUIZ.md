# Module 4 Quiz: System Prompts & Personas

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY purpose of a system prompt?

A) To save the user from typing instructions each time
B) To set persistent AI behavior throughout a conversation
C) To make the AI respond faster
D) To unlock premium AI features

### Question 2
Which component is essential in a well-designed system prompt?

A) The AI's favorite color
B) Identity, capabilities, constraints, and style
C) Maximum response length settings
D) User authentication details

### Question 3
What is the main advantage of using AI personas?

A) They make the AI more entertaining
B) They produce task-specific, consistent responses
C) They reduce token usage
D) They bypass AI safety filters

### Question 4
How does a system prompt differ from a regular prompt?

A) System prompts cost more tokens
B) System prompts persist across the conversation; regular prompts don't
C) Regular prompts are more effective
D) There is no difference

### Question 5
What should you include in a persona's "constraints" section?

A) What the AI can do
B) What the AI must not do or cannot provide
C) The AI's personality traits
D) Example conversations

### Question 6
What is a common issue in long AI conversations?

A) Responses get longer
B) The AI may lose context or drift from the persona
C) Token costs decrease
D) Response speed increases

### Question 7
Which technique helps maintain context in long conversations?

A) Using shorter messages
B) Periodically summarizing what's been established
C) Switching to a different AI model
D) Avoiding follow-up questions

### Question 8
How do Claude and ChatGPT differ in persona handling?

A) Only ChatGPT supports system prompts
B) Claude generally maintains personas more consistently; ChatGPT may break character
C) ChatGPT doesn't support personas at all
D) They handle personas identically

### Question 9
What is the benefit of creating reusable persona templates?

A) They are required by AI platforms
B) They ensure consistency and save time across similar tasks
C) They reduce the AI's response time
D) They are necessary for API access

### Question 10
When combining a persona with chain-of-thought prompting, what happens?

A) The persona is ignored
B) The AI reasons step-by-step while maintaining the persona's expertise
C) Chain-of-thought only works without personas
D) The response becomes shorter

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: A system prompt should include specific examples of how the AI should respond.

### Question 12
True or False: The same system prompt will produce identical results on Claude and ChatGPT.

### Question 13
True or False: Personas should always be vague to allow maximum flexibility.

### Question 14
True or False: Including constraints in a system prompt generally improves output quality.

### Question 15
True or False: Once set, a persona will never drift or break character regardless of conversation length.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: You need an AI to help with legal document review, but it keeps giving legal advice.

**Question**: Which system prompt addition would BEST address this?

A) "Be more helpful with legal questions"
B) "Constraint: Never provide legal advice. Only analyze document structure and flag areas for attorney review."
C) "You are a lawyer"
D) "Respond in legal language"

### Question 17
**Scenario**: You created a customer service persona, but the AI sometimes responds in an overly casual tone that doesn't match your company brand.

**Question**: What should you add to the system prompt?

A) More technical expertise
B) Specific style guidelines defining the expected professional tone
C) More personality traits
D) Longer example conversations

### Question 18
**Scenario**: During a long conversation, your AI project manager persona forgets that the client changed the deadline from 6 months to 4 months.

**Question**: What's the BEST approach to address this?

A) Start a new conversation
B) Use an explicit reminder: "Remember, the deadline was updated to 4 months. Given that..."
C) Ignore it and continue
D) Change to a different persona

### Question 19
**Scenario**: You want an AI writing coach to encourage creativity but also catch grammar errors.

**Question**: How should you structure the system prompt?

A) Choose only one function - creativity OR grammar
B) Include both capabilities with guidance on when to prioritize each
C) Use two separate AI conversations
D) Personas can't handle multiple functions

### Question 20
**Scenario**: Your ChatGPT custom assistant keeps adding "How else can I help?" at the end of every response, but you want more concise outputs.

**Question**: What should you add to the system prompt?

A) "Be helpful"
B) "Style: End responses directly without prompting for follow-up questions unless needed"
C) "Use fewer tokens"
D) "Respond faster"

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - To set persistent AI behavior throughout a conversation
   - *Explanation: System prompts establish behavior that persists across the entire conversation.*

2. **B** - Identity, capabilities, constraints, and style
   - *Explanation: These are the four essential components of effective system prompts.*

3. **B** - They produce task-specific, consistent responses
   - *Explanation: Personas tailor AI behavior to specific expertise and communication styles.*

4. **B** - System prompts persist across the conversation; regular prompts don't
   - *Explanation: System prompts set ongoing behavior; regular prompts are for single exchanges.*

5. **B** - What the AI must not do or cannot provide
   - *Explanation: Constraints define boundaries and limitations that improve output quality.*

6. **B** - The AI may lose context or drift from the persona
   - *Explanation: Context limits and attention mechanisms can cause context loss in long conversations.*

7. **B** - Periodically summarizing what's been established
   - *Explanation: Summaries reinforce context and help maintain consistency.*

8. **B** - Claude generally maintains personas more consistently; ChatGPT may break character
   - *Explanation: Observed differences in how platforms maintain persona adherence.*

9. **B** - They ensure consistency and save time across similar tasks
   - *Explanation: Templates enable efficient reuse of proven persona designs.*

10. **B** - The AI reasons step-by-step while maintaining the persona's expertise
    - *Explanation: Advanced patterns can be combined with personas for enhanced results.*

### Section 2: True/False

11. **True** - Examples help demonstrate expected behavior and improve consistency.

12. **False** - Different platforms respond differently to the same system prompts due to different training and design.

13. **False** - Personas should be specific; vague personas produce inconsistent results.

14. **True** - Constraints help focus the AI and prevent unwanted behaviors.

15. **False** - Long conversations can cause persona drift; persistence techniques help but don't guarantee consistency.

### Section 3: Scenario-Based

16. **B** - "Constraint: Never provide legal advice. Only analyze document structure and flag areas for attorney review."
    - *Explanation: Clear constraint prevents unwanted behavior while defining appropriate scope.*

17. **B** - Specific style guidelines defining the expected professional tone
    - *Explanation: Style blocks in system prompts control communication tone.*

18. **B** - Use an explicit reminder: "Remember, the deadline was updated to 4 months. Given that..."
    - *Explanation: Explicit reminders are an effective context recovery technique.*

19. **B** - Include both capabilities with guidance on when to prioritize each
    - *Explanation: Well-designed personas can handle multiple functions with proper guidance.*

20. **B** - "Style: End responses directly without prompting for follow-up questions unless needed"
    - *Explanation: Style constraints control specific response patterns.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - System prompt mastery |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "Understanding System Prompts" and "Anatomy of Effective System Prompts"
- Questions 4-6 wrong: Review "Designing AI Personas" and "Context Persistence Strategies"
- Questions 7-10 wrong: Review "Claude vs ChatGPT System Prompts" and "Combining Personas with Advanced Patterns"
- Scenario questions wrong: Practice with the module exercises

---

*Quiz 4 of 6 | Prompt Engineering Masterclass | 20 points total*
