# Module 4 Quiz: Chatbots & Self-Service

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the MOST important design principle for customer service chatbots?

A) Using the most advanced AI technology available
B) Being transparent about being a bot and providing easy escalation to humans
C) Handling 100% of customer queries without human involvement
D) Maximizing conversation length to increase engagement

### Question 2
What is "chatbot containment rate"?

A) The number of chatbots a company uses
B) The percentage of conversations resolved by the bot without escalation
C) How well the chatbot is secured from hackers
D) The storage space used by chatbot logs

### Question 3
What should a chatbot do when it fails to understand a user's input twice in a row?

A) Keep asking "Please rephrase" until the user gives up
B) Automatically end the conversation
C) Offer to connect the user with a human agent
D) Ignore the user's input and continue with its script

### Question 4
Which type of support query is BEST suited for chatbot handling?

A) Complex billing disputes requiring manager approval
B) Order status checks with clear lookup process
C) Emotional complaints about service quality
D) Legal requests requiring careful documentation

### Question 5
What information should be passed to a human agent during chatbot escalation?

A) Only the last message from the user
B) Complete context: customer info, conversation summary, collected data, and suggested approach
C) Nothing - the agent should start fresh
D) Only the user's account number

### Question 6
What is "proactive self-service"?

A) Customers finding help themselves without any prompts
B) AI offering help based on user behavior before they explicitly ask
C) Forcing users through chatbot before allowing human contact
D) Sending marketing messages through the chatbot

### Question 7
When designing chatbot personality, what should guide the bot's voice and tone?

A) Whatever sounds most robotic and efficient
B) The company's brand voice and customer expectations
C) The cheapest implementation option
D) What competitors are doing

### Question 8
What is a "conversation flow" in chatbot design?

A) The speed at which the bot responds
B) A mapped sequence of bot-user exchanges leading to resolution or escalation
C) The number of conversations per hour
D) The direction text scrolls on screen

### Question 9
What metric BEST indicates chatbot quality from the customer's perspective?

A) Number of conversations handled
B) Customer satisfaction (CSAT) scores for bot interactions
C) Average conversation length
D) API response time

### Question 10
How should a chatbot handle a request it cannot fulfill (e.g., policy exception)?

A) Pretend to fulfill the request
B) Abruptly end the conversation
C) Acknowledge the limitation, explain why, and offer alternatives or escalation
D) Repeatedly apologize without offering a path forward

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: Chatbots should always pretend to be human to provide a better experience.

### Question 12
True or False: A good escalation handoff includes passing conversation context to the agent so customers don't repeat themselves.

### Question 13
True or False: Chatbot personality and tone should remain exactly the same regardless of whether the customer is happy or frustrated.

### Question 14
True or False: The option to speak with a human agent should always be visible and accessible in chatbot interfaces.

### Question 15
True or False: A 100% containment rate (no escalations) indicates a perfectly designed chatbot.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your chatbot analytics show:
- Conversations: 1,000/week
- Contained (resolved by bot): 550 (55%)
- Escalated to agent: 300 (30%)
- Abandoned: 150 (15%)

**Question:** What does the 15% abandonment rate suggest?

A) The chatbot is performing perfectly
B) Users may be getting frustrated and leaving - investigate why
C) Abandonment is always acceptable
D) The containment rate should be higher

### Question 17
**Scenario:** A user sends this message to your fitness equipment chatbot:

> "I'm SO frustrated. I ordered a treadmill two weeks ago, paid for express shipping, and it's STILL not here. This is unacceptable and I want to know what you're going to do about it!"

**Question:** What should the chatbot's FIRST response prioritize?

A) Immediately ask for the order number
B) Acknowledge their frustration and apologize before asking for details
C) Explain shipping policies
D) Transfer to an agent without any response

### Question 18
**Scenario:** You're designing an escalation trigger. Which of these should trigger IMMEDIATE escalation (not just offer escalation)?

A) User asks a question the bot doesn't understand
B) User mentions "lawyer" and "lawsuit" in their message
C) User asks about product availability
D) User requests a status update

### Question 19
**Scenario:** Your chatbot's product recommendation flow asks these questions in order:
1. What's your fitness goal?
2. What's your budget?
3. How much space do you have?
4. Do you prefer cardio or strength equipment?

A user answers questions 1 and 2, then asks: "Actually, what treadmills do you have under $500?"

**Question:** What should the chatbot do?

A) Ignore the question and continue asking question 3
B) Recognize the user's intent changed, provide treadmill options under $500
C) End the conversation
D) Start the flow over from question 1

### Question 20
**Scenario:** Your chatbot successfully helps a customer check their order status. The customer says "Thanks!" and the bot responds "You're welcome! Is there anything else I can help with today?"

The customer replies: "No that's all"

**Question:** What should happen next?

A) Ask another question to keep the conversation going
B) Close the conversation gracefully with a friendly sign-off
C) Transfer to a human agent
D) Ask the customer to rate the conversation and then end abruptly

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Being transparent about being a bot and providing easy escalation to humans
   - *Transparency and escape routes are fundamental to chatbot trust.*

2. **B** - The percentage of conversations resolved by the bot without escalation
   - *Containment measures how effectively the bot handles issues independently.*

3. **C** - Offer to connect the user with a human agent
   - *After 2 failures, gracefully offer human help rather than creating a loop.*

4. **B** - Order status checks with clear lookup process
   - *Simple, well-defined tasks with clear data are ideal for bots.*

5. **B** - Complete context: customer info, conversation summary, collected data, and suggested approach
   - *Complete context prevents customers from repeating themselves.*

6. **B** - AI offering help based on user behavior before they explicitly ask
   - *Proactive help anticipates needs based on behavior patterns.*

7. **B** - The company's brand voice and customer expectations
   - *Bot personality should align with brand identity.*

8. **B** - A mapped sequence of bot-user exchanges leading to resolution or escalation
   - *Flows define the structured path through a conversation.*

9. **B** - Customer satisfaction (CSAT) scores for bot interactions
   - *CSAT directly measures customer perception of quality.*

10. **C** - Acknowledge the limitation, explain why, and offer alternatives or escalation
    - *Honest acknowledgment with options maintains trust.*

### Section 2: True/False

11. **False** - Chatbots should be transparent about being AI. Pretending to be human erodes trust when discovered.

12. **True** - Context handoff is essential for seamless escalation and prevents customer frustration.

13. **False** - Bot tone should adapt to context—more empathetic with frustrated customers, more celebratory with good news.

14. **True** - Easy access to humans is a core design principle to prevent "chatbot jail."

15. **False** - 100% containment might mean the bot is handling things it shouldn't, or escalation is too difficult.

### Section 3: Scenario-Based

16. **B** - Users may be getting frustrated and leaving - investigate why
    - *15% abandonment suggests friction points that need investigation.*

17. **B** - Acknowledge their frustration and apologize before asking for details
    - *Emotional acknowledgment before task questions builds trust with frustrated users.*

18. **B** - User mentions "lawyer" and "lawsuit" in their message
    - *Legal language requires immediate human handling, not just an offer to escalate.*

19. **B** - Recognize the user's intent changed, provide treadmill options under $500
    - *Good bots adapt to user intent changes rather than rigidly following scripts.*

20. **B** - Close the conversation gracefully with a friendly sign-off
    - *Natural closing after task completion provides good experience.*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready to design production chatbots |
| 16-17 | B | Good - Strong understanding with minor gaps |
| 14-15 | C | Satisfactory - Review escalation and flow design |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these areas:

**Design Principles (Questions 1, 7, 11, 14):**
- Transparency requirements
- Brand voice alignment
- Human accessibility

**Conversation Flow (Questions 8, 19, 20):**
- Flow structure and design
- Handling intent changes
- Conversation closure

**Escalation (Questions 3, 5, 12, 18):**
- When to escalate
- What context to pass
- Immediate vs. offered escalation

**Metrics & Optimization (Questions 2, 9, 15, 16):**
- Key performance metrics
- Interpreting containment rates
- Identifying issues

**User Experience (Questions 4, 6, 10, 13, 17):**
- Appropriate use cases
- Proactive assistance
- Handling limitations
- Tone adaptation

---

## Chatbot Design Checklist

Before launching your chatbot:

```
DESIGN FOUNDATIONS
[ ] Bot identity and personality defined
[ ] Brand voice guidelines documented
[ ] Design principles established
[ ] Use cases clearly scoped

CONVERSATION FLOWS
[ ] Top intents mapped to flows
[ ] Each flow has clear path to resolution
[ ] Edge cases handled gracefully
[ ] Context maintained throughout conversation

ESCALATION
[ ] Automatic triggers configured
[ ] Human option always visible
[ ] Context packaging for handoff
[ ] Agent view designed
[ ] Anti-jail measures in place

SELF-SERVICE INTEGRATION
[ ] Chatbot connected to knowledge base
[ ] Proactive triggers configured
[ ] Multi-channel consistency

TESTING
[ ] Happy path conversations tested
[ ] Edge cases tested
[ ] Frustrated user scenarios tested
[ ] Escalation flow tested

MEASUREMENT
[ ] Containment rate tracking
[ ] CSAT collection enabled
[ ] Abandonment monitoring
[ ] Intent recognition accuracy tracking
[ ] Continuous improvement process
```

---

*Quiz 4 of 9 | AI for Customer Service Teams | Duration: 20 minutes*
