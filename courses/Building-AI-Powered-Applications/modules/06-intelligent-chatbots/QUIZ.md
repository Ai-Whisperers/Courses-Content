# Module 6 Quiz: Intelligent Chatbots

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY purpose of a conversation memory system in chatbots?

A) To reduce API costs by caching responses
B) To maintain context across multiple turns for coherent conversations
C) To store user passwords securely
D) To train the underlying LLM model

### Question 2
Which memory strategy is MOST appropriate for a customer support chatbot handling billing inquiries?

A) No memory (stateless)
B) Sliding window memory (last N messages)
C) Summary memory with key entity extraction
D) Full conversation history with unlimited retention

### Question 3
In intent classification, what does "confidence threshold" determine?

A) How fast the classification runs
B) The minimum certainty required before acting on a classified intent
C) The number of intents to return
D) The cost of the classification

### Question 4
When should a chatbot escalate to a human agent?

A) Only when the user explicitly requests it
B) When confidence is low, sentiment is negative, or multiple failures occur
C) After every 5 messages
D) Never - AI should handle everything

### Question 5
What is the recommended approach for handling conversation state in production chatbots?

A) Store everything in browser localStorage
B) Keep state only in memory (RAM)
C) Use persistent storage (Redis, database) with session management
D) Encode state in the URL parameters

### Question 6
Which component is responsible for determining user intent from their message?

A) Memory Manager
B) Intent Classifier
C) Response Generator
D) Escalation Handler

### Question 7
What is "slot filling" in conversational AI?

A) Filling empty conversation turns
B) Extracting and tracking required information pieces from user messages
C) Adding filler words to responses
D) Scheduling time slots for human agents

### Question 8
How should a chatbot handle an out-of-scope query?

A) Ignore the message entirely
B) Make up an answer to seem helpful
C) Acknowledge the limitation and offer alternatives or escalation
D) End the conversation immediately

### Question 9
What is the purpose of a "system prompt" in chatbot design?

A) To display system errors to users
B) To define the chatbot's personality, capabilities, and constraints
C) To prompt the user for system information
D) To update the operating system

### Question 10
Which metric BEST measures chatbot effectiveness at resolving user issues?

A) Response time
B) Number of messages sent
C) Task completion rate / Resolution rate
D) Character count of responses

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: A sliding window memory that keeps the last 10 messages is always better than keeping all messages.

### Question 12
True or False: Intent classification should happen BEFORE generating a response so the chatbot can route appropriately.

### Question 13
True or False: Sentiment analysis can help identify frustrated users who may need escalation to human support.

### Question 14
True or False: Production chatbots should store complete conversation histories indefinitely for all users.

### Question 15
True or False: Multi-turn conversations require tracking context that single-turn interactions do not.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your customer service chatbot has the following memory configuration:
- Max messages: 20
- Summary after: 15 messages
- Entity extraction: enabled

A user has been chatting for 25 messages about a complex order issue involving multiple products and a partial refund.

**Question:** What is the MOST likely problem with this memory configuration?

A) Too many messages are stored
B) The summary may lose critical order details needed for resolution
C) Entity extraction is unnecessary
D) The configuration is optimal

### Question 17
**Scenario:** Your chatbot's intent classifier returns these results:
```
{
  "billing_inquiry": 0.35,
  "technical_support": 0.33,
  "general_question": 0.32
}
```
Your confidence threshold is 0.6.

**Question:** What should the chatbot do?

A) Route to billing_inquiry since it has the highest score
B) Ask a clarifying question to better understand the user's intent
C) Route to all three departments simultaneously
D) Ignore the message

### Question 18
**Scenario:** A user sends this message to your e-commerce chatbot:
"I've been waiting 3 weeks for my order and nobody is helping me. This is ridiculous! I want a refund NOW!"

**Question:** Which signals should trigger escalation consideration? (Select the BEST answer)

A) High negative sentiment only
B) Refund request only
C) High negative sentiment, urgency indicators, and potential churn risk
D) Long wait time only

### Question 19
**Scenario:** You're designing a chatbot for a healthcare appointment system. Users need to provide: name, date of birth, preferred date, preferred time, and reason for visit.

**Question:** What is the BEST approach for collecting this information?

A) Ask all questions in a single message
B) Use slot filling to collect each piece naturally through conversation
C) Require users to fill out a form instead
D) Assume default values for missing information

### Question 20
**Scenario:** Your production chatbot is experiencing these issues:
- 40% of conversations end without resolution
- Average conversation length is 15 messages
- User satisfaction score is 2.5/5
- Escalation rate is 5%

**Question:** What does this data suggest?

A) The chatbot is performing excellently
B) The chatbot may be failing to resolve issues but not escalating appropriately
C) The escalation rate is too high
D) Conversation length is optimal

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - To maintain context across multiple turns for coherent conversations
   - *Memory enables the chatbot to reference earlier parts of the conversation.*

2. **C** - Summary memory with key entity extraction
   - *Billing inquiries need specific details (amounts, dates, account numbers) preserved even in long conversations.*

3. **B** - The minimum certainty required before acting on a classified intent
   - *Threshold prevents acting on low-confidence classifications that may be wrong.*

4. **B** - When confidence is low, sentiment is negative, or multiple failures occur
   - *Multiple signals should trigger escalation consideration, not just explicit requests.*

5. **C** - Use persistent storage (Redis, database) with session management
   - *Production systems need durability across server restarts and horizontal scaling.*

6. **B** - Intent Classifier
   - *The intent classifier analyzes user messages to determine what they want to accomplish.*

7. **B** - Extracting and tracking required information pieces from user messages
   - *Slot filling collects necessary data points naturally through conversation.*

8. **C** - Acknowledge the limitation and offer alternatives or escalation
   - *Graceful handling maintains user trust and provides paths forward.*

9. **B** - To define the chatbot's personality, capabilities, and constraints
   - *System prompts establish the foundation for all chatbot responses.*

10. **C** - Task completion rate / Resolution rate
    - *This directly measures whether the chatbot achieved its purpose of helping users.*

### Section 2: True/False

11. **False** - Sliding window can lose important context from earlier in the conversation. The best strategy depends on use case.

12. **True** - Intent classification enables routing to appropriate handlers and response strategies.

13. **True** - Sentiment analysis is a valuable signal for identifying users who need human support.

14. **False** - Privacy regulations, storage costs, and data minimization principles often require retention limits.

15. **True** - Multi-turn conversations require tracking what was discussed, decisions made, and information gathered.

### Section 3: Scenario-Based

16. **B** - The summary may lose critical order details needed for resolution
    - *Complex issues with specific details (product names, prices, refund amounts) may be lost when summarized.*

17. **B** - Ask a clarifying question to better understand the user's intent
    - *No intent meets the 0.6 threshold, indicating ambiguity that should be resolved.*

18. **C** - High negative sentiment, urgency indicators, and potential churn risk
    - *Multiple escalation signals are present: frustration, urgency ("NOW"), and churn risk.*

19. **B** - Use slot filling to collect each piece naturally through conversation
    - *Slot filling provides a conversational experience while ensuring all required data is collected.*

20. **B** - The chatbot may be failing to resolve issues but not escalating appropriately
    - *Low resolution rate (60%) combined with low escalation rate (5%) suggests issues aren't being properly handed off.*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready for production chatbot development |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Review memory and escalation concepts |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these key topics:

**Memory Systems (Questions 1-2, 11, 16):**
- Different memory strategies and their tradeoffs
- When to use summary vs. full history
- Entity extraction importance

**Intent Classification (Questions 3, 6, 12, 17):**
- Confidence thresholds and their purpose
- Handling ambiguous classifications
- Classification pipeline placement

**Escalation (Questions 4, 13, 18, 20):**
- Multiple escalation triggers
- Sentiment as an escalation signal
- Balancing automation with human handoff

**Production Considerations (Questions 5, 8, 9, 10, 14, 15, 19):**
- State management in distributed systems
- Graceful failure handling
- Conversation design patterns
- Success metrics

---

*Quiz 6 of 12 | Building AI-Powered Applications | Duration: 25 minutes*
