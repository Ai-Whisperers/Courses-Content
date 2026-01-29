# Module 4 Quiz: AI Agents & Tools

**Instructions**: Answer all questions. Select the best answer for multiple choice questions. For scenario questions, provide brief explanations.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the KEY difference between a chatbot and an AI agent?

A) Agents are faster than chatbots
B) Agents can take actions and use tools, not just generate text
C) Chatbots use more advanced models
D) Agents don't require LLMs

### Question 2
What does ReAct stand for in the context of AI agents?

A) Real-time Action
B) Reasoning and Acting
C) Reactive Architecture
D) Response Action

### Question 3
In the ReAct pattern, what is the correct sequence?

A) Action → Thought → Observation
B) Observation → Action → Thought
C) Thought → Action → Observation
D) Action → Observation → Thought

### Question 4
What is a "tool" in the context of AI agents?

A) A debugging utility for developers
B) A function the agent can call to interact with external systems
C) A type of prompt template
D) A model fine-tuning technique

### Question 5
Why is it important to provide clear tool descriptions to an agent?

A) To make the code more readable
B) So the agent knows when and how to use each tool
C) To reduce API costs
D) To encrypt tool inputs

### Question 6
What is the purpose of agent memory in multi-turn interactions?

A) To store tool definitions
B) To maintain context and remember previous actions/observations
C) To cache API responses
D) To log errors

### Question 7
In a multi-agent system, what is a "supervisor" agent?

A) An agent that monitors for errors
B) An agent that coordinates and delegates tasks to other agents
C) The first agent in a sequence
D) An agent with admin privileges

### Question 8
What is a common failure mode when agents run without limits?

A) They become too accurate
B) They can get stuck in infinite loops, burning resources
C) They stop using tools entirely
D) They forget their instructions

### Question 9
What is "human-in-the-loop" for agents?

A) Having humans write the agent code
B) Requiring human approval for certain actions before execution
C) Training agents with human feedback
D) Having humans test the agent manually

### Question 10
Which agent type uses structured inputs with specific parameter schemas?

A) Zero-Shot Agent
B) Conversational Agent
C) Structured Tool Chat Agent
D) Plan-and-Execute Agent

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: An agent must always use a tool to complete a task.

### Question 12
True or False: Tools should validate their inputs before executing actions.

### Question 13
True or False: Agents can call multiple tools in a single turn if needed.

### Question 14
True or False: The observation from a tool is always passed back to the LLM for the next reasoning step.

### Question 15
True or False: Multi-agent systems are always more effective than single agents.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your agent has access to a calculator tool, a web search tool, and a database query tool. The user asks: "What's the population of Tokyo multiplied by 2?"

**Question**: What is the expected agent behavior?

A) Use calculator only with a guessed population
B) Use web search to find Tokyo's population, then use calculator to multiply
C) Query the database directly
D) Respond that it cannot do math

### Question 17
**Scenario**: Your agent gets stuck in a loop, repeatedly calling the same tool with the same inputs.

**Question**: What is the BEST solution to prevent this?

A) Remove the tool entirely
B) Implement a maximum iteration limit and loop detection
C) Use a more powerful model
D) Add more tools

### Question 18
**Scenario**: You're building an agent that can send emails on behalf of users.

**Question**: What safety measure is MOST critical?

A) Rate limiting API calls
B) Human approval before sending any email
C) Logging email content
D) Using a faster email provider

### Question 19
**Scenario**: Your agent sometimes chooses the wrong tool, like using web search when database query would be more accurate.

**Question**: What is the BEST improvement?

A) Remove the web search tool
B) Improve tool descriptions to clarify when each should be used
C) Force the agent to use tools in a specific order
D) Use a smaller model for faster decisions

### Question 20
**Scenario**: You need to build a system where one agent researches information, another writes content, and a third reviews for quality.

**Question**: What architecture is MOST appropriate?

A) Single agent with all capabilities
B) Sequential multi-agent pipeline
C) Parallel agents with no coordination
D) Nested prompt templates

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Agents can take actions and use tools, not just generate text
   - *Explanation: Agents extend LLMs with the ability to interact with external systems through tools.*

2. **B** - Reasoning and Acting
   - *Explanation: ReAct combines chain-of-thought reasoning with action-taking in an interleaved manner.*

3. **C** - Thought → Action → Observation
   - *Explanation: The agent thinks about what to do, takes an action (calls a tool), observes the result, then repeats.*

4. **B** - A function the agent can call to interact with external systems
   - *Explanation: Tools are callable functions that give agents capabilities like search, calculation, or API access.*

5. **B** - So the agent knows when and how to use each tool
   - *Explanation: Clear descriptions help the LLM decide which tool to use for each task.*

6. **B** - To maintain context and remember previous actions/observations
   - *Explanation: Memory lets agents track what they've done and learned across multiple steps.*

7. **B** - An agent that coordinates and delegates tasks to other agents
   - *Explanation: Supervisor agents orchestrate specialized agents, routing tasks appropriately.*

8. **B** - They can get stuck in infinite loops, burning resources
   - *Explanation: Without limits, agents can loop indefinitely, wasting time, money, and API calls.*

9. **B** - Requiring human approval for certain actions before execution
   - *Explanation: Human-in-the-loop adds safety by requiring approval for sensitive operations.*

10. **C** - Structured Tool Chat Agent
    - *Explanation: This agent type uses tools with defined parameter schemas rather than freeform input.*

### Section 2: True/False

11. **False** - Agents can choose to respond directly without tools if they have the knowledge to answer.

12. **True** - Tools should validate inputs to prevent errors, injection attacks, and unexpected behavior.

13. **True** - Agents can use multiple tools in sequence within a single interaction to complete complex tasks.

14. **True** - Tool observations are returned to the LLM so it can reason about results and decide next steps.

15. **False** - Multi-agent systems add complexity; single agents are often sufficient and simpler for many tasks.

### Section 3: Scenario-Based

16. **B** - Use web search to find Tokyo's population, then use calculator to multiply
    - *Explanation: The agent should chain tools: search for data, then compute with it.*

17. **B** - Implement a maximum iteration limit and loop detection
    - *Explanation: Limits prevent runaway loops; detection can break cycles early.*

18. **B** - Human approval before sending any email
    - *Explanation: Email sending has real-world consequences; human oversight is critical for safety.*

19. **B** - Improve tool descriptions to clarify when each should be used
    - *Explanation: Better descriptions help the agent make correct tool selection decisions.*

20. **B** - Sequential multi-agent pipeline
    - *Explanation: Research → Write → Review is a natural sequential workflow suited for chained agents.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong grasp of agent concepts |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "What Are Agents?" and "The ReAct Pattern"
- Questions 4-6 wrong: Review "Creating Custom Tools" and "Agent Memory"
- Questions 7-10 wrong: Review "Multi-Agent Systems" and "Production Patterns"
- Scenario questions wrong: Review the complete module and build the exercise agent

**Next Steps:**
- Complete Module 4 Exercise if not done
- Proceed to Module 5: Production Deployment

---

*Quiz 4 of 6 | Building AI-Powered Applications | 20 points total*
