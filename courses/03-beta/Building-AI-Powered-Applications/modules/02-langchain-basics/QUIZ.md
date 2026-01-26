# Module 2 Quiz: Building with LangChain

**Instructions**: Answer all questions. Select the best answer for multiple choice questions. For scenario questions, provide brief explanations.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY advantage of using LangChain over raw OpenAI API calls?

A) LangChain is faster than direct API calls
B) LangChain provides abstractions for chains, memory, and structured workflows
C) LangChain is free while OpenAI API requires payment
D) LangChain works offline without internet

### Question 2
What is the purpose of a PromptTemplate in LangChain?

A) To store conversation history
B) To create reusable prompts with variable placeholders
C) To parse LLM output into structured data
D) To connect multiple LLMs together

### Question 3
Which memory type is BEST for maintaining full conversation context in a long chat?

A) ConversationBufferMemory
B) ConversationBufferWindowMemory
C) ConversationSummaryMemory
D) ConversationTokenBufferMemory

### Question 4
What does an Output Parser do in LangChain?

A) Sends requests to the LLM
B) Converts unstructured LLM output into structured data formats
C) Manages API rate limits
D) Stores conversation history

### Question 5
In a Sequential Chain, how do outputs flow?

A) All chains run simultaneously
B) Output of one chain becomes input to the next chain
C) Chains run in random order
D) Only the first chain's output is used

### Question 6
What is the purpose of a Router Chain?

A) To manage network routing for API calls
B) To dynamically select which chain to execute based on input
C) To split input into multiple parallel streams
D) To handle authentication tokens

### Question 7
Which LangChain component would you use to ensure the LLM returns valid JSON?

A) ConversationMemory
B) PromptTemplate
C) StructuredOutputParser or PydanticOutputParser
D) SequentialChain

### Question 8
What is "few-shot prompting" in the context of PromptTemplates?

A) Using minimal tokens to save costs
B) Including examples in the prompt to guide the model's output format
C) Running the model multiple times and selecting the best output
D) Limiting the model to short responses

### Question 9
When should you use ConversationSummaryMemory instead of ConversationBufferMemory?

A) When you need exact recall of all messages
B) When conversations are long and you need to manage token limits
C) When you only care about the last message
D) When you don't need any memory

### Question 10
What is a Transform Chain used for?

A) Converting between different LLM providers
B) Applying custom Python functions to transform data between chains
C) Translating text between languages
D) Compressing API responses

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: LangChain can only work with OpenAI models.

### Question 12
True or False: PromptTemplates can include conditional logic based on input variables.

### Question 13
True or False: ConversationBufferWindowMemory keeps only the last K conversation turns.

### Question 14
True or False: Output parsers can validate that LLM output matches a Pydantic schema.

### Question 15
True or False: Chains in LangChain must always include an LLM call.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: You're building a customer support chatbot that needs to remember the customer's name and issue throughout a conversation that could last 50+ messages.

**Question**: Which memory type is MOST appropriate?

A) ConversationBufferMemory - to keep all messages
B) ConversationSummaryMemory - to compress long conversations
C) ConversationBufferWindowMemory with k=5
D) No memory - reload context each time

### Question 17
**Scenario**: You need the LLM to return a response in this exact format: `{"sentiment": "positive/negative", "confidence": 0.0-1.0}`

**Question**: What LangChain component should you use?

A) PromptTemplate only with format instructions
B) PydanticOutputParser with a defined schema
C) ConversationMemory
D) SequentialChain

### Question 18
**Scenario**: Your application needs to either summarize text, translate text, or answer questions based on user intent.

**Question**: Which chain type is BEST suited for this?

A) SequentialChain
B) RouterChain
C) TransformChain
D) LLMChain

### Question 19
**Scenario**: You built a chain that first extracts key points from a document, then generates a summary from those key points.

**Question**: What type of chain architecture is this?

A) RouterChain
B) SequentialChain
C) ParallelChain
D) SingleChain

### Question 20
**Scenario**: Your chatbot sometimes returns malformed JSON that crashes your parser.

**Question**: What is the BEST approach to handle this?

A) Trust the LLM to always return valid JSON
B) Use an output parser with retry logic and format instructions
C) Remove JSON parsing entirely
D) Switch to a different LLM provider

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - LangChain provides abstractions for chains, memory, and structured workflows
   - *Explanation: LangChain's value is in composable components like chains, memory, parsers, and agents.*

2. **B** - To create reusable prompts with variable placeholders
   - *Explanation: PromptTemplates allow defining prompts with {variables} that get filled at runtime.*

3. **C** - ConversationSummaryMemory
   - *Explanation: For very long conversations, summarizing older messages manages token limits while preserving context.*

4. **B** - Converts unstructured LLM output into structured data formats
   - *Explanation: Output parsers transform free-form text into JSON, lists, Pydantic objects, etc.*

5. **B** - Output of one chain becomes input to the next chain
   - *Explanation: SequentialChain pipes output from each step as input to the next.*

6. **B** - To dynamically select which chain to execute based on input
   - *Explanation: RouterChain uses an LLM or rules to decide which specialized chain handles each request.*

7. **C** - StructuredOutputParser or PydanticOutputParser
   - *Explanation: These parsers enforce structured output with format instructions and validation.*

8. **B** - Including examples in the prompt to guide the model's output format
   - *Explanation: Few-shot prompting shows the model example inputs and outputs to establish patterns.*

9. **B** - When conversations are long and you need to manage token limits
   - *Explanation: SummaryMemory compresses history into summaries, ideal for long conversations.*

10. **B** - Applying custom Python functions to transform data between chains
    - *Explanation: TransformChain runs arbitrary Python code to process data between chain steps.*

### Section 2: True/False

11. **False** - LangChain supports many providers: OpenAI, Anthropic, Cohere, HuggingFace, local models, etc.

12. **True** - LangChain supports conditional prompts and Jinja2 templating for logic in templates.

13. **True** - BufferWindowMemory with k=5 keeps only the last 5 conversation turns (10 messages: 5 human + 5 AI).

14. **True** - PydanticOutputParser validates output against a Pydantic model schema with type checking.

15. **False** - TransformChains don't require LLM calls; they can perform pure data transformations.

### Section 3: Scenario-Based

16. **B** - ConversationSummaryMemory - to compress long conversations
    - *Explanation: 50+ messages would exceed token limits; summarizing preserves key info efficiently.*

17. **B** - PydanticOutputParser with a defined schema
    - *Explanation: Pydantic enforces the exact structure and types, with validation and format instructions.*

18. **B** - RouterChain
    - *Explanation: RouterChain dynamically selects between summarization, translation, or QA chains based on intent.*

19. **B** - SequentialChain
    - *Explanation: Extract → Summarize is a sequential pipeline where step 1's output feeds step 2.*

20. **B** - Use an output parser with retry logic and format instructions
    - *Explanation: Parsers can include format instructions in prompts and retry on parse failures.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong grasp of LangChain concepts |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "LangChain Architecture" and "Prompt Templates"
- Questions 4-6 wrong: Review "Output Parsers" and "Chains"
- Questions 7-10 wrong: Review "Memory" and "Advanced Patterns"
- Scenario questions wrong: Review the complete module and build the exercise chatbot

**Next Steps:**
- Complete Module 2 Exercise if not done
- Proceed to Module 3: Vector Databases & RAG

---

*Quiz 2 of 6 | Building AI-Powered Applications | 20 points total*
