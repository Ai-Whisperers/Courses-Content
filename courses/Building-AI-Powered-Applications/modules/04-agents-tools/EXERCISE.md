# Module 4: AI Agents & Tools - Hands-On Exercise

## Overview

**Duration:** 160 minutes  
**Difficulty:** Advanced  
**Prerequisites:** Modules 1-3 completed, strong LangChain knowledge

In this exercise, you'll build a complete **Autonomous AI Assistant** with multiple tools and reasoning capabilities. You'll implement:
- Custom tools for various capabilities
- ReAct reasoning pattern
- Multi-tool agent systems
- Agent memory and context
- Production-ready autonomous assistant

By the end, you'll have an intelligent agent that can reason, use tools, and accomplish complex tasks autonomously.

---

## Learning Objectives

By completing this exercise, you will:

✅ Create custom tools with proper interfaces  
✅ Implement the ReAct pattern for reasoning  
✅ Build multi-tool agent systems  
✅ Add memory and context awareness  
✅ Create an autonomous assistant application  
✅ Handle edge cases and errors in agent systems

---

## Setup

### 1. Environment Preparation

```bash
# Create project directory
mkdir autonomous-assistant
cd autonomous-assistant

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install langchain openai python-dotenv duckduckgo-search wikipedia
```

### 2. Project Structure

```
autonomous-assistant/
├── .env                    # API keys
├── app.py                  # Main application
├── tools/                  # Custom tools
│   ├── __init__.py
│   ├── calculator.py
│   ├── weather.py
│   └── database.py
├── requirements.txt        # Dependencies
└── README.md              # Documentation
```

### 3. Configure Environment

Create `.env`:
```
OPENAI_API_KEY=your-api-key-here
```

---

## Part 1: Create Basic Agent with Tools (40 minutes)

### Goal
Build a simple agent with 3 custom tools and observe ReAct pattern in action.

### Requirements

**1.1 Create Calculator Tool**

Build a tool that:
- Performs mathematical calculations
- Handles expressions safely (no eval() vulnerabilities)
- Returns clear error messages
- Supports basic operations (+, -, *, /, **, sqrt, etc.)

**Expected behavior:**
```python
calculator = CalculatorTool()
result = calculator.run("25 * 18 + 100")
# Output: "Result: 550"

result = calculator.run("sqrt(144)")
# Output: "Result: 12.0"

result = calculator.run("invalid")
# Output: "Error: Invalid expression"
```

**1.2 Create Time Tool**

Build a tool that:
- Returns current time
- Supports different timezones
- Returns date information
- Formats output clearly

**Expected behavior:**
```python
time_tool = TimeTool()
result = time_tool.run("current time")
# Output: "Current time: 14:32:15"

result = time_tool.run("date")
# Output: "Today's date: January 17, 2026"
```

**1.3 Create Search Tool**

Build a tool that:
- Searches the web for information
- Returns relevant snippets
- Handles no results gracefully
- Cites sources

**Expected behavior:**
```python
search_tool = SearchTool()
result = search_tool.run("Python programming language")
# Output: "Python is a high-level programming language... [Source: python.org]"
```

**1.4 Create Basic Agent**

Combine tools into an agent:
- Use Zero-Shot ReAct agent type
- Enable verbose mode to see reasoning
- Test with various queries

**Test Queries:**
- "What is 150 divided by 5?"
- "What time is it?"
- "Search for information about machine learning"
- "Calculate 100 * 25, then search for that number"

### Implementation Hints

```python
from langchain.tools import Tool
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI

# Create tool
calculator_tool = Tool(
    name="Calculator",
    func=calculate,
    description="Useful for mathematical calculations. Input should be a math expression."
)

# Initialize agent
llm = ChatOpenAI(temperature=0)
agent = initialize_agent(
    tools=[calculator_tool, time_tool, search_tool],
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True  # See agent reasoning
)

# Run agent
result = agent.run("What is 25 * 18?")
```

### Testing

Verify:
1. Each tool works independently
2. Agent selects correct tool for each query
3. Agent reasoning is visible in verbose mode
4. Error handling works properly

**Deliverable:** `part1_basic_agent.py` with 3 tools and working agent

---

## Part 2: Implement ReAct Pattern (35 minutes)

### Goal
Understand and implement the ReAct (Reasoning + Acting) pattern explicitly.

### Requirements

**2.1 Observe ReAct Loop**

Run queries and document the ReAct pattern:
- What thoughts does the agent have?
- What actions does it take?
- What observations does it make?
- How many iterations until answer?

**Test with:**
- Simple query: "What is 10 + 5?"
- Multi-step: "What's 100 * 25, and what time is it now?"
- Complex: "Search for Python, then calculate the year it was created + 30"

**2.2 Custom ReAct Implementation**

Build your own ReAct loop (educational purposes):

```python
def react_loop(question, tools, llm, max_iterations=5):
    """
    Implement ReAct pattern manually
    
    Args:
        question: User question
        tools: Available tools dict
        llm: Language model
        max_iterations: Maximum reasoning steps
    
    Returns:
        Final answer
    """
    # Your implementation here
    pass
```

**Must handle:**
- Thought generation
- Action selection
- Tool execution
- Observation processing
- Final answer determination

**2.3 Compare Implementations**

Compare your custom ReAct with LangChain's:
- Which is more reliable?
- Which has better error handling?
- What did you learn about how agents work?

### Implementation Hints

```python
# Custom ReAct loop structure
def react_loop(question, tools, llm, max_iterations=5):
    context = f"Question: {question}\n\n"
    
    for i in range(max_iterations):
        # Generate thought
        prompt = f"{context}Thought:"
        thought = llm.predict(prompt)
        context += f"Thought: {thought}\n"
        
        # Check if final answer
        if "Final Answer:" in thought:
            return extract_answer(thought)
        
        # Select action
        # Execute tool
        # Add observation
        # Continue loop
    
    return "Max iterations reached"
```

### Testing

Test with queries that require:
1. Single tool use
2. Multiple tools
3. Multi-step reasoning
4. Error recovery

**Deliverable:** `part2_react_pattern.py` with custom ReAct implementation

---

## Part 3: Build Multi-Tool Agent (40 minutes)

### Goal
Create a sophisticated agent with 5+ specialized tools.

### Requirements

**3.1 Create Additional Tools**

Implement at least 5 tools total (3 from Part 1 + 2 new):

**File Tool:**
- Read file contents
- Write to files
- List files in directory
- Clear, safe error handling

**Database Tool:**
- Query mock database
- Insert/update records
- Return structured results

**Or choose your own:**
- Email tool
- Weather tool (real API)
- Translation tool
- News tool
- Stock price tool

**3.2 Tool Organization**

Organize tools properly:
```python
# tools/__init__.py
from .calculator import CalculatorTool
from .time import TimeTool
from .search import SearchTool
from .file import FileTool
from .database import DatabaseTool

def get_all_tools():
    return [
        CalculatorTool(),
        TimeTool(),
        SearchTool(),
        FileTool(),
        DatabaseTool()
    ]
```

**3.3 Agent with Memory**

Add conversation memory:
- Remember previous queries
- Reference earlier context
- Maintain conversation state

**Expected behavior:**
```python
agent.run("My name is Alice")
# "Nice to meet you, Alice!"

agent.run("What's my name?")
# "Your name is Alice"

agent.run("Calculate 10 + 5")
# "Result: 15"

agent.run("What did I just ask you to calculate?")
# "You asked me to calculate 10 + 5"
```

**3.4 Complex Task Handling**

Test with multi-step tasks:
```python
agent.run("""
Search for the current population of Tokyo,
then calculate what 10% of that number is,
and save the result to a file called 'tokyo_stats.txt'
""")
```

Agent should:
1. Use search tool for population
2. Use calculator for 10%
3. Use file tool to save

### Implementation Hints

```python
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent, AgentType

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

agent = initialize_agent(
    tools=all_tools,
    llm=ChatOpenAI(temperature=0),
    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    verbose=True
)
```

### Testing

Verify:
1. All tools work correctly
2. Agent selects appropriate tools
3. Memory persists across queries
4. Multi-step tasks complete successfully
5. Error handling works

**Deliverable:** `part3_multi_tool_agent.py` with 5+ tools and memory

---

## Part 4: Complete Autonomous Assistant (45 minutes)

### Goal
Build a production-ready autonomous assistant application.

### Requirements

Build a complete application with:

**4.1 Comprehensive Tool Suite**

Minimum 6 tools covering:
- **Calculation:** Math operations
- **Information:** Web search, Wikipedia
- **Time/Date:** Current time, scheduling
- **File Operations:** Read, write, list
- **Data Management:** Database queries
- **Utilities:** Choose 1+ (weather, translation, email, etc.)

**4.2 Interactive Interface**

Create CLI with commands:
```
Autonomous AI Assistant
======================

Commands:
- ask: Ask the assistant anything
- tools: List available tools
- history: Show conversation history
- clear: Clear conversation memory
- verbose: Toggle detailed logging
- quit: Exit

>
```

**4.3 Agent Configuration**

Support configuration:
```python
config = {
    "agent_type": "openai-functions",  # or "react", "conversational"
    "temperature": 0,
    "max_iterations": 10,
    "verbose": True,
    "memory_type": "buffer"  # or "window", "summary"
}
```

**4.4 Logging & Monitoring**

Implement:
- Action logging (all tool uses)
- Error tracking
- Performance metrics (time per query)
- Token usage tracking
- Cost estimation

**4.5 Error Handling**

Handle gracefully:
- Tool failures
- Invalid queries
- Max iterations reached
- API errors
- Timeout scenarios

**4.6 Advanced Features (Choose 2+)**

- **Async Tools:** Parallel tool execution
- **Human-in-the-Loop:** Ask user for clarification
- **Output Validation:** Verify answer quality
- **Tool Chaining:** Tools that use other tools
- **Conditional Logic:** If-then tool execution
- **Scheduled Tasks:** Run tasks at intervals

### Implementation Structure

```python
# app.py

import os
from datetime import datetime
from dotenv import load_dotenv
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.callbacks import get_openai_callback

from tools import get_all_tools

class AutonomousAssistant:
    def __init__(self, config):
        self.config = config
        self.tools = get_all_tools()
        self.memory = self._init_memory()
        self.agent = self._init_agent()
        self.history = []
        self.stats = {
            "queries": 0,
            "tool_uses": 0,
            "errors": 0,
            "total_tokens": 0
        }
    
    def _init_memory(self):
        """Initialize conversation memory"""
        pass
    
    def _init_agent(self):
        """Initialize agent with tools"""
        pass
    
    def ask(self, question: str):
        """Process user question"""
        pass
    
    def list_tools(self):
        """Show available tools"""
        pass
    
    def show_history(self):
        """Display conversation history"""
        pass
    
    def get_stats(self):
        """Show usage statistics"""
        pass
    
    def clear_memory(self):
        """Clear conversation memory"""
        pass

def main():
    # Load config
    # Initialize assistant
    # Command loop
    pass

if __name__ == "__main__":
    main()
```

### Expected Functionality

**Session Example:**
```
Autonomous AI Assistant
======================

Loaded 6 tools:
✓ Calculator
✓ WebSearch
✓ TimeTool
✓ FileTool
✓ DatabaseTool
✓ WikipediaSearch

> ask
Question: What's 150 * 25, and save the result to a file called 'result.txt'

Agent Thoughts:
  Thought: I need to calculate 150 * 25
  Action: Calculator("150 * 25")
  Observation: Result: 3750
  
  Thought: Now I need to save this to a file
  Action: WriteFile("result.txt", "3750")
  Observation: Successfully wrote to result.txt
  
  Thought: Task complete
  Final Answer: I calculated 150 * 25 which equals 3750, and saved it to result.txt

Answer: I calculated 150 * 25 which equals 3750, and saved it to result.txt

> tools
Available Tools:
1. Calculator - For mathematical calculations
2. WebSearch - Search the web for information
3. GetTime - Get current time and date
4. ReadFile - Read file contents
5. WriteFile - Write content to file
6. WikipediaSearch - Search Wikipedia for facts

> history
Conversation History:
1. User: What's 150 * 25, and save the result to result.txt
   Assistant: I calculated 150 * 25 which equals 3750, and saved it to result.txt
   Tools used: Calculator, WriteFile

> stats
Usage Statistics:
- Total queries: 1
- Tools used: 2
- Tokens used: 342
- Estimated cost: $0.0017
- Average response time: 3.2s

> quit
Thank you for using Autonomous AI Assistant! Goodbye!
```

### Testing Requirements

Test your assistant with:

1. **Single Tool Queries:**
   - "What is 100 + 50?"
   - "What time is it?"
   - "Search for Python programming"

2. **Multi-Tool Tasks:**
   - "Search for population of Tokyo, then calculate 10% of it"
   - "Get current time and save it to time.txt"

3. **Memory-Dependent:**
   - "My favorite color is blue" → "What's my favorite color?"
   - "Calculate 50 * 2" → "What did I just ask you?"

4. **Error Scenarios:**
   - Invalid calculations
   - File not found
   - Search with no results
   - Malformed queries

5. **Complex Tasks:**
   - "Search for 'machine learning', summarize the results, and save to ml_summary.txt"

### Bonus Features (Optional)

If time permits:
- **Web UI:** Streamlit or Gradio interface
- **Voice Interface:** Speech-to-text input
- **Scheduled Tasks:** Cron-like task scheduling
- **Plugin System:** Load tools dynamically
- **Multi-Agent:** Specialized agents for different domains
- **Export:** Save conversation to PDF/HTML

**Deliverable:** `app.py` - Complete autonomous assistant application

---

## Submission Checklist

Before submitting, ensure you have:

- ✅ **Part 1:** `part1_basic_agent.py` - 3 tools + agent
- ✅ **Part 2:** `part2_react_pattern.py` - Custom ReAct implementation
- ✅ **Part 3:** `part3_multi_tool_agent.py` - 5+ tools with memory
- ✅ **Part 4:** `app.py` - Complete autonomous assistant
- ✅ **Tools:** Organized tools/ directory with all custom tools
- ✅ **Documentation:** README.md with setup and usage
- ✅ **Configuration:** .env.example file
- ✅ **Dependencies:** requirements.txt
- ✅ **Tests:** Evidence all features work

### Code Quality Requirements

Your code should:
- Include comprehensive docstrings
- Use type hints
- Handle all errors gracefully
- Follow PEP 8 style
- Have meaningful variable names
- Include comments for complex logic
- Be modular and reusable

---

## Common Issues & Solutions

### Issue: "Agent loops infinitely"
**Solution:** Set `max_iterations` parameter and `early_stopping_method`

### Issue: "Wrong tool selected"
**Solution:** Improve tool descriptions - be very specific about when to use each tool

### Issue: "Tool execution fails"
**Solution:** Add comprehensive error handling in tool functions

### Issue: "Agent doesn't remember context"
**Solution:** Verify memory is initialized and agent type supports memory

### Issue: "Slow performance"
**Solution:** Use OpenAI Functions agent type, reduce temperature to 0

---

## Evaluation Criteria

Your submission will be evaluated on:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Functionality** | 35% | All components work correctly |
| **Agent Reasoning** | 20% | Agent makes logical decisions |
| **Tool Quality** | 20% | Tools are well-designed and reliable |
| **Code Quality** | 15% | Clean, documented, maintainable |
| **Error Handling** | 10% | Graceful failures, edge cases handled |

**Passing Grade:** 70% overall

---

## Time Management Tips

- **Part 1 (40 min):** Start simple, get basic agent working first
- **Part 2 (35 min):** Focus on understanding, not perfection
- **Part 3 (40 min):** Reuse Part 1 tools, add 2 new ones
- **Part 4 (45 min):** Core functionality first, polish later

**If running short on time:**
- Part 4 is most important (complete application)
- Get 6 tools working before adding advanced features
- Document what you attempted even if incomplete

---

## Learning Resources

**LangChain Docs:**
- [Agents](https://python.langchain.com/docs/modules/agents/)
- [Tools](https://python.langchain.com/docs/modules/agents/tools/)
- [Agent Types](https://python.langchain.com/docs/modules/agents/agent_types/)

**ReAct Paper:**
- [ReAct: Synergizing Reasoning and Acting](https://arxiv.org/abs/2210.03629)

**Debugging Tips:**
- Always use `verbose=True` during development
- Print intermediate steps
- Test each tool independently
- Start with simple queries

---

## Extension Ideas

After completing the exercise:

1. **Tool Marketplace:** Create library of reusable tools
2. **Agent Orchestration:** Multiple specialized agents
3. **Learning Agent:** Agent that improves over time
4. **Guardrails:** Safety checks on agent actions
5. **Cost Optimization:** Cache results, optimize prompts

---

## Example Tool Template

```python
# tools/example_tool.py

from langchain.tools import Tool
from typing import Optional

class ExampleTool:
    """
    Description of what this tool does
    """
    
    def __init__(self):
        self.name = "ToolName"
        self.description = """
        Clear description of when to use this tool.
        Input format: describe expected input
        Output format: describe what it returns
        """
    
    def _run(self, input_text: str) -> str:
        """
        Execute the tool
        
        Args:
            input_text: The input string
        
        Returns:
            Result string
        """
        try:
            # Tool logic here
            result = self.process(input_text)
            return f"Success: {result}"
        
        except Exception as e:
            return f"Error: {str(e)}"
    
    def process(self, input_text: str) -> str:
        """Core tool logic"""
        # Implement here
        pass
    
    def to_langchain_tool(self) -> Tool:
        """Convert to LangChain Tool"""
        return Tool(
            name=self.name,
            func=self._run,
            description=self.description
        )
```

---

## Next Steps

After completing this exercise:

1. **Review Solution:** Compare your implementation
2. **Experiment:** Try different agent types
3. **Extend:** Add more sophisticated tools
4. **Prepare:** Get ready for Module 5 (Production Deployment)

---

## Need Help?

- **Forum:** Post questions with code snippets
- **Office Hours:** Schedule 1-on-1 help
- **Docs:** Refer to LangChain documentation
- **Solutions:** Available after submission deadline

---

**Good luck building your autonomous assistant! 🤖**

---

*Module 4 Exercise | Building AI-Powered Applications | Estimated Time: 160 minutes*
