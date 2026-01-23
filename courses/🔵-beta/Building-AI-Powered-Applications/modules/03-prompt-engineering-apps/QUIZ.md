# Module 3 Quiz: Prompt Engineering for Applications

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY purpose of a system prompt in an AI application?

A) To make responses longer
B) To define consistent behavior and constraints across all interactions
C) To reduce API costs
D) To enable streaming responses

### Question 2
Which approach is BEST for incorporating user-specific data into prompts?

A) Hardcode all variations into the system prompt
B) Use template strings with variable substitution
C) Send the data as separate API calls
D) Store data in the model's memory

### Question 3
What's the recommended way to get reliable JSON output from an LLM?

A) Just ask for JSON and hope it works
B) Use response validation with retry and error feedback
C) Always use temperature=2
D) Send longer prompts

### Question 4
In OpenAI's function calling, what does the model return when it wants to call a function?

A) The function's result directly
B) A structured object with function name and arguments
C) An error message
D) A natural language description of the function call

### Question 5
What's the key difference between OpenAI's and Anthropic's handling of system prompts?

A) Anthropic doesn't support system prompts
B) OpenAI uses a separate parameter; Anthropic puts it in messages
C) OpenAI puts it in messages; Anthropic uses a separate parameter
D) They handle them identically

### Question 6
When parsing JSON from LLM output, which is a common issue to handle?

A) JSON wrapped in markdown code blocks
B) Output being too short
C) Missing user message
D) Temperature being too low

### Question 7
What does "grounding" mean in the context of RAG prompts?

A) Sending the request to the ground floor server
B) Basing responses on provided document context rather than model knowledge
C) Using lower temperature settings
D) Reducing the number of tokens

### Question 8
What should happen when function calling produces an error?

A) The conversation should end immediately
B) Return the error in the tool response so the model can handle it appropriately
C) Ignore it and continue
D) Retry indefinitely

### Question 9
Which is the BEST strategy for reducing prompt token costs?

A) Remove all instructions and let the model guess
B) Use shorter, more precise instructions while maintaining clarity
C) Always use the longest possible prompts
D) Disable system prompts entirely

### Question 10
What is `tool_choice="auto"` in OpenAI function calling?

A) The model must always call a tool
B) The model decides whether to call a tool based on the request
C) Tools are disabled
D) Only the first tool can be called

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: System prompts should include specific examples of desired output format for best results.

### Question 12
True or False: When using function calling, the LLM actually executes the function on your behalf.

### Question 13
True or False: Dynamic prompts with template variables are less reliable than static prompts.

### Question 14
True or False: If JSON parsing fails, sending the error back to the model for correction is a valid retry strategy.

### Question 15
True or False: Output tokens are typically cheaper than input tokens, so longer responses are more cost-effective.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your customer support bot sometimes makes up product information that doesn't exist.

**Question**: What prompt engineering technique would BEST address this?

A) Increase temperature for more creative responses
B) Add RAG with product database context and instruction to only use provided information
C) Make the system prompt shorter
D) Use a different model

### Question 17
**Scenario**: You're building a code review assistant. The output should always be structured with: issues found, severity, and suggested fixes.

**Question**: What's the BEST approach for reliable structured output?

A) Ask nicely for the format
B) Use Pydantic models with JSON mode and validation
C) Hope the model follows the format
D) Parse free text with regex

### Question 18
**Scenario**: Your AI assistant needs to book flights, but should never book without user confirmation.

**Question**: How should you design the function calling system?

A) Give the assistant direct booking access and trust it
B) Define a "propose_booking" function that returns options, separate from "confirm_booking"
C) Disable function calling entirely
D) Include booking in every response

### Question 19
**Scenario**: Your prompt has 500 tokens of instructions, but 80% of requests only need basic instructions.

**Question**: What's the BEST optimization strategy?

A) Always send the full 500 tokens for consistency
B) Use dynamic prompt construction with minimal base + conditional additions
C) Remove all instructions
D) Switch to a cheaper model

### Question 20
**Scenario**: Your multi-tool agent gets stuck in a loop, repeatedly calling the same function.

**Question**: What's the MOST appropriate solution?

A) Remove the function entirely
B) Add max iteration limit and detect repeated calls
C) Increase the context window
D) Use higher temperature

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - To define consistent behavior and constraints across all interactions
   - *Explanation: System prompts establish baseline behavior that persists across all user messages.*

2. **B** - Use template strings with variable substitution
   - *Explanation: Templates allow dynamic injection of user data while maintaining prompt structure.*

3. **B** - Use response validation with retry and error feedback
   - *Explanation: Combining validation, parsing, and retry with feedback creates reliable structured output.*

4. **B** - A structured object with function name and arguments
   - *Explanation: The model returns tool_calls with function name and JSON arguments for your code to execute.*

5. **C** - OpenAI puts it in messages; Anthropic uses a separate parameter
   - *Explanation: OpenAI includes system in the messages array; Anthropic requires a separate `system` parameter.*

6. **A** - JSON wrapped in markdown code blocks
   - *Explanation: LLMs often wrap JSON in ```json blocks even when asked not to.*

7. **B** - Basing responses on provided document context rather than model knowledge
   - *Explanation: Grounding means constraining responses to provided context to reduce hallucination.*

8. **B** - Return the error in the tool response so the model can handle it appropriately
   - *Explanation: The model can decide whether to retry, try alternatives, or inform the user.*

9. **B** - Use shorter, more precise instructions while maintaining clarity
   - *Explanation: Concise prompts reduce tokens without sacrificing instruction quality.*

10. **B** - The model decides whether to call a tool based on the request
    - *Explanation: "auto" lets the model determine if tools are needed for the specific request.*

### Section 2: True/False

11. **True** - Examples in system prompts dramatically improve format compliance.

12. **False** - The LLM returns the function call specification; your code must execute it.

13. **False** - Dynamic prompts can be equally reliable with proper templating and validation.

14. **True** - Sending errors back allows the model to correct its output format.

15. **False** - Output tokens are typically MORE expensive (2-4x) than input tokens.

### Section 3: Scenario-Based

16. **B** - Add RAG with product database context and instruction to only use provided information
    - *Explanation: RAG grounds responses in real data; explicit instructions prevent hallucination.*

17. **B** - Use Pydantic models with JSON mode and validation
    - *Explanation: Schema validation ensures consistent, parseable structured output.*

18. **B** - Define a "propose_booking" function that returns options, separate from "confirm_booking"
    - *Explanation: Separating proposal from confirmation requires explicit user action before booking.*

19. **B** - Use dynamic prompt construction with minimal base + conditional additions
    - *Explanation: Dynamic prompts send only what's needed for each request, reducing average token usage.*

20. **B** - Add max iteration limit and detect repeated calls
    - *Explanation: Loop detection and limits prevent infinite recursion in agentic systems.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Production prompt engineering skills |
| 16-17 | B | Good - Ready for implementation |
| 14-15 | C | Satisfactory - Review structured outputs |
| Below 14 | F | Review module and complete exercises |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "System Prompts for Applications"
- Questions 4-6 wrong: Review "Structured Output Parsing"
- Questions 7-10 wrong: Review "Function Calling / Tool Use"
- Scenario questions wrong: Complete the hands-on exercises

---

*Quiz 3 of 12 | Building AI-Powered Applications | 20 points total*
