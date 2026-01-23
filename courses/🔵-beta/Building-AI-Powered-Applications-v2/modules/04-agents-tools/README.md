# Module 4: AI Agents & Tools

## Learning Objectives

By the end of this module, you will be able to:

1. Understand agent architecture and reasoning patterns
2. Implement the ReAct (Reasoning + Acting) pattern
3. Create custom tools for agents
4. Build multi-tool agent systems
5. Implement agent memory and planning
6. Apply production agent patterns
7. Debug and optimize agent behavior

---

## Prerequisites

- Modules 1-3 completed
- Strong understanding of LangChain
- Experience with RAG systems
- Python 3.9+ environment

**Estimated Time:** 8-10 hours

---

## 1. What Are AI Agents?

### Beyond Simple Chatbots

**Traditional AI System:**
```
User Input → LLM → Response
```
Simple, predictable, limited.

**AI Agent:**
```
User Input → Agent thinks → Uses tools → Thinks again → Uses more tools → Final answer
```
Autonomous, adaptive, powerful.

### Key Difference

**Chatbot:** Responds to what you say  
**Agent:** Takes action to accomplish goals

**Example:**

**Chatbot:**
```
User: "What's the weather in Paris?"
Bot: "I don't have access to weather data"
```

**Agent:**
```
User: "What's the weather in Paris?"
Agent: [Thinks: I need weather data]
      [Uses: Weather API tool]
      [Gets: 22°C, sunny]
      [Responds: "It's currently 22°C and sunny in Paris"]
```

### What Makes an Agent?

**Three Core Capabilities:**

1. **Reasoning:** Can think about what to do next
2. **Tool Use:** Can interact with external systems
3. **Autonomy:** Can decide actions without constant human input

### Agent Loop

```
1. Observe: Understand current situation
2. Think: Decide what action to take
3. Act: Use a tool or give final answer
4. Repeat: Until goal is achieved
```

---

## 2. The ReAct Pattern

### What is ReAct?

**ReAct = Reasoning + Acting**

The agent alternates between:
- **Reasoning:** Thinking about what to do (internal monologue)
- **Acting:** Using tools or providing answers (external actions)

### ReAct Example

```
User: "What's the capital of the country where the Eiffel Tower is located?"

Agent Thought: I need to find out where the Eiffel Tower is located
Action: Use WikipediaSearch("Eiffel Tower")
Observation: The Eiffel Tower is in Paris, France

Agent Thought: Now I know it's in France. The capital of France is Paris.
Action: FinalAnswer("Paris")
```

### Why ReAct Works

**Problem with direct LLM calls:**
- Limited knowledge (training cutoff)
- Can't access real-time data
- No ability to verify information

**ReAct solves this by:**
- ✅ Breaking problems into steps
- ✅ Using tools when needed
- ✅ Verifying before answering
- ✅ Self-correcting when wrong

### ReAct Prompt Structure

```
You run in a loop of Thought, Action, Observation.

At the end of the loop you output a final Answer.

Use Thought to describe your reasoning.
Use Action to run one of the available tools.
Observation will be the result of running that tool.

Tools available:
- Calculator: For math operations
- Search: For looking up information
- Wikipedia: For factual queries

Example:
Question: What is 25 * 18?
Thought: I need to calculate 25 * 18
Action: Calculator(25 * 18)
Observation: 450
Thought: I have the answer
Answer: 450
```

---

## 3. Building Your First Agent

### Basic Agent with LangChain

```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI

# Define a simple tool
def calculator(expression: str) -> str:
    """Calculate mathematical expressions"""
    try:
        result = eval(expression)
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {e}"

# Create tool
calculator_tool = Tool(
    name="Calculator",
    func=calculator,
    description="Useful for mathematical calculations. Input should be a valid Python expression."
)

# Initialize LLM
llm = ChatOpenAI(temperature=0)

# Create agent
tools = [calculator_tool]

agent = create_react_agent(
    llm=llm,
    tools=tools,
    prompt=PromptTemplate.from_template("""
    Answer the following question using available tools.
    
    Question: {input}
    
    {agent_scratchpad}
    """)
)

# Create executor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True
)

# Use agent
result = agent_executor.invoke({"input": "What is 25 * 18 + 100?"})
print(result["output"])
```

### What Happens Internally

```
User: "What is 25 * 18 + 100?"

Agent Loop:
1. Thought: I need to calculate this expression
2. Action: Calculator("25 * 18 + 100")
3. Observation: Result: 550
4. Thought: I have the answer
5. Final Answer: 550
```

---

## 4. Creating Custom Tools

### Tool Anatomy

Every tool needs:
1. **Name:** Identifier for the tool
2. **Description:** What it does (agent uses this to decide when to use it)
3. **Function:** The actual implementation
4. **Input Schema:** (optional) Define expected inputs

### Simple Tool

```python
from langchain.tools import Tool

def get_time():
    """Get current time"""
    from datetime import datetime
    return datetime.now().strftime("%H:%M:%S")

time_tool = Tool(
    name="GetTime",
    func=get_time,
    description="Returns the current time. Use this when the user asks for the time."
)
```

### Tool with Parameters

```python
def search_database(query: str) -> str:
    """Search internal database"""
    # Simulate database search
    results = {
        "product prices": "Our products range from $10 to $500",
        "shipping info": "Free shipping on orders over $50",
        "return policy": "30-day money-back guarantee"
    }
    
    for key, value in results.items():
        if query.lower() in key:
            return value
    
    return "No results found"

db_search_tool = Tool(
    name="SearchDatabase",
    func=search_database,
    description="Search internal company database. Input should be a search query string."
)
```

### Structured Tool (Recommended)

```python
from langchain.tools import StructuredTool
from pydantic import BaseModel, Field

class SearchInput(BaseModel):
    query: str = Field(description="The search query")
    max_results: int = Field(default=5, description="Maximum number of results")

def search_web(query: str, max_results: int = 5) -> str:
    """Search the web"""
    # Implement actual search
    return f"Found {max_results} results for '{query}'"

search_tool = StructuredTool.from_function(
    func=search_web,
    name="WebSearch",
    description="Search the web for information",
    args_schema=SearchInput
)
```

### Tool Best Practices

**Good Descriptions:**
```python
# ✅ GOOD: Clear, specific
description="Calculate mathematical expressions. Input: valid Python math expression like '2+2' or '10*5'. Returns the numerical result."

# ❌ BAD: Vague
description="Does math"
```

**Error Handling:**
```python
def safe_tool(input: str) -> str:
    try:
        # Tool logic
        result = do_something(input)
        return f"Success: {result}"
    except Exception as e:
        return f"Error: {str(e)}. Please try a different input."
```

**Clear Outputs:**
```python
# ✅ GOOD: Structured, informative
return "Temperature: 22°C, Condition: Sunny, Humidity: 65%"

# ❌ BAD: Ambiguous
return "22"  # What does this mean?
```

---

## 5. Multi-Tool Agents

### Combining Multiple Tools

```python
from langchain.agents import initialize_agent, AgentType

# Define multiple tools
tools = [
    Tool(
        name="Calculator",
        func=lambda x: eval(x),
        description="For math calculations"
    ),
    Tool(
        name="GetTime",
        func=get_current_time,
        description="Returns current time"
    ),
    Tool(
        name="SearchDatabase",
        func=search_db,
        description="Search company database"
    ),
    Tool(
        name="WebSearch",
        func=search_web,
        description="Search the internet"
    )
]

# Create agent with multiple tools
agent = initialize_agent(
    tools=tools,
    llm=ChatOpenAI(temperature=0),
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Agent can now choose which tool to use
result = agent.run("What's 100 * 25, and what time is it?")
# Agent will use Calculator, then GetTime
```

### Tool Selection

The agent decides which tool to use based on:
1. **Tool descriptions** (most important)
2. **Current context**
3. **Previous observations**

**Example:**
```
Question: "What's the weather in Paris and what's 10 + 5?"

Agent reasoning:
1. "weather in Paris" → matches WebSearch description
2. "10 + 5" → matches Calculator description
3. Uses both tools, combines results
```

---

## 6. Agent Types in LangChain

### Common Agent Types

#### 6.1 Zero-Shot ReAct

**Best for:** General purpose, multiple tools

```python
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)
```

**Characteristics:**
- Decides which tool to use on the fly
- No examples needed
- Works with any number of tools

#### 6.2 Conversational ReAct

**Best for:** Chat applications with memory

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(memory_key="chat_history")

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    verbose=True
)
```

**Characteristics:**
- Remembers previous conversation
- Can reference earlier context
- Good for multi-turn interactions

#### 6.3 Structured Input ReAct

**Best for:** Tools with complex inputs

```python
agent = initialize_agent(
    tools=structured_tools,
    llm=llm,
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)
```

**Characteristics:**
- Handles tools with multiple parameters
- Better input validation
- Recommended for production

#### 6.4 OpenAI Functions

**Best for:** Using OpenAI's function calling API

```python
agent = initialize_agent(
    tools=tools,
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)
```

**Characteristics:**
- Uses native OpenAI function calling
- More reliable tool selection
- Faster execution
- **Recommended for production with OpenAI models**

### Comparison Table

| Agent Type | Memory | Tool Complexity | Speed | Best For |
|------------|--------|-----------------|-------|----------|
| Zero-Shot ReAct | No | Simple | Medium | Quick tasks |
| Conversational | Yes | Simple | Medium | Chatbots |
| Structured | No | Complex | Medium | Multi-param tools |
| OpenAI Functions | Optional | Any | Fast | Production (OpenAI) |

---

## 7. Agent Memory

### Why Memory Matters

**Without Memory:**
```
User: "My name is Alice"
Agent: "Nice to meet you, Alice"

User: "What's my name?"
Agent: "I don't know your name"
```

**With Memory:**
```
User: "My name is Alice"
Agent: "Nice to meet you, Alice"

User: "What's my name?"
Agent: "Your name is Alice"
```

### Adding Memory to Agents

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    verbose=True
)

# Memory persists across calls
agent.run("My favorite color is blue")
agent.run("What's my favorite color?")  # Remembers: blue
```

### Memory Types for Agents

**Buffer Memory:**
```python
# Stores full conversation
memory = ConversationBufferMemory(memory_key="chat_history")
```

**Window Memory:**
```python
# Stores last N exchanges
memory = ConversationBufferWindowMemory(k=5, memory_key="chat_history")
```

**Summary Memory:**
```python
# Summarizes old messages
memory = ConversationSummaryMemory(llm=llm, memory_key="chat_history")
```

### Entity Memory

Track specific entities (people, places, things):

```python
from langchain.memory import ConversationEntityMemory

entity_memory = ConversationEntityMemory(llm=llm)

# Automatically tracks entities mentioned
# "Alice likes pizza" → stores {Alice: {likes: pizza}}
# "Bob works at Google" → stores {Bob: {works_at: Google}}
```

---

## 8. Agent Planning & Reasoning

### Multi-Step Planning

Some tasks require multiple steps:

**Example:**
```
Task: "Book a flight to Paris and find hotels"

Agent Plan:
1. Search for flights to Paris
2. Compare flight prices
3. Select best flight
4. Search for hotels in Paris
5. Compare hotel ratings
6. Provide recommendations
```

### Plan-and-Execute Pattern

```python
from langchain.agents import Plan, PlanAndExecute

planner = Plan(
    llm=llm,
    tools=tools
)

executor = PlanAndExecute(
    planner=planner,
    tools=tools,
    verbose=True
)

# Agent creates plan first, then executes
result = executor.run("Book a trip to Paris")
```

**How it works:**
1. **Plan:** Create step-by-step plan
2. **Execute:** Run each step with tools
3. **Update:** Adjust plan based on results
4. **Iterate:** Until task complete

### Self-Asking Pattern

Agent asks itself questions to break down complex queries:

```
User: "What's the population of the capital of France?"

Agent:
Q: What is the capital of France?
A: [Uses tool] Paris

Q: What is the population of Paris?
A: [Uses tool] 2.16 million

Final: The population is 2.16 million
```

---

## 9. Tool Integration Patterns

### 9.1 API Tools

```python
import requests

def call_weather_api(city: str) -> str:
    """Get weather for a city"""
    # Example API call
    response = requests.get(f"https://api.weather.com/{city}")
    data = response.json()
    return f"Temperature: {data['temp']}°C, Condition: {data['condition']}"

weather_tool = Tool(
    name="GetWeather",
    func=call_weather_api,
    description="Get current weather for a city. Input: city name"
)
```

### 9.2 Database Tools

```python
import sqlite3

def query_database(sql: str) -> str:
    """Execute SQL query"""
    conn = sqlite3.connect('company.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        return str(results)
    except Exception as e:
        return f"Error: {e}"
    finally:
        conn.close()

db_tool = Tool(
    name="QueryDatabase",
    func=query_database,
    description="Execute SQL queries on company database"
)
```

### 9.3 File System Tools

```python
import os

def read_file(filepath: str) -> str:
    """Read file contents"""
    try:
        with open(filepath, 'r') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {e}"

def write_file(filepath: str, content: str) -> str:
    """Write content to file"""
    try:
        with open(filepath, 'w') as f:
            f.write(content)
        return f"Successfully wrote to {filepath}"
    except Exception as e:
        return f"Error writing file: {e}"

file_tools = [
    Tool(name="ReadFile", func=read_file, description="Read file contents"),
    Tool(name="WriteFile", func=write_file, description="Write to file")
]
```

### 9.4 Web Search Tools

```python
from langchain.tools import DuckDuckGoSearchRun

search = DuckDuckGoSearchRun()

search_tool = Tool(
    name="WebSearch",
    func=search.run,
    description="Search the web for current information"
)
```

### 9.5 Python REPL Tool

```python
from langchain.tools import PythonREPLTool

python_repl = PythonREPLTool()

# Agent can execute Python code
# Useful for data analysis, calculations, etc.
```

---

## 10. Production Agent Patterns

### 10.1 Error Handling

```python
class SafeAgent:
    def __init__(self, tools, llm):
        self.agent = initialize_agent(
            tools=tools,
            llm=llm,
            agent=AgentType.OPENAI_FUNCTIONS,
            max_iterations=10,  # Prevent infinite loops
            early_stopping_method="generate"  # Stop if stuck
        )
    
    def run(self, query: str, timeout: int = 60) -> dict:
        try:
            result = self.agent.run(query)
            return {"success": True, "result": result}
        except Exception as e:
            return {"success": False, "error": str(e)}
```

### 10.2 Logging & Monitoring

```python
from langchain.callbacks import FileCallbackHandler

# Log all agent actions
handler = FileCallbackHandler("agent_log.txt")

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    callbacks=[handler],
    verbose=True
)

# All thoughts and actions logged to file
```

### 10.3 Cost Control

```python
from langchain.callbacks import get_openai_callback

with get_openai_callback() as cb:
    result = agent.run("Complex query")
    print(f"Tokens used: {cb.total_tokens}")
    print(f"Cost: ${cb.total_cost}")
```

### 10.4 Human-in-the-Loop

```python
from langchain.tools import HumanInputRun

human_tool = HumanInputRun()

tools = [
    calculator_tool,
    search_tool,
    human_tool  # Agent can ask human for help
]

# When uncertain, agent will prompt human for input
```

### 10.5 Output Validation

```python
from pydantic import BaseModel, Field

class AgentOutput(BaseModel):
    answer: str = Field(description="The final answer")
    sources: list = Field(description="Sources used")
    confidence: float = Field(description="Confidence score 0-1")

def validate_output(agent_result: str) -> AgentOutput:
    # Parse and validate agent output
    # Ensure it meets quality standards
    pass
```

---

## 11. Multi-Agent Systems

### Why Multiple Agents?

Different agents for different tasks:
- **Researcher Agent:** Gathers information
- **Analyst Agent:** Analyzes data
- **Writer Agent:** Creates content
- **QA Agent:** Checks quality

### Sequential Agents

```python
# Agent 1: Research
researcher = create_agent(tools=[search_tool, wikipedia_tool])
research = researcher.run("Research AI trends")

# Agent 2: Analyze (uses Agent 1's output)
analyst = create_agent(tools=[calculator_tool, data_tool])
analysis = analyst.run(f"Analyze this research: {research}")

# Agent 3: Write (uses Agent 2's output)
writer = create_agent(tools=[])
report = writer.run(f"Write a report on: {analysis}")
```

### Parallel Agents

```python
import asyncio

async def run_agents_parallel(query):
    # Run multiple agents simultaneously
    tasks = [
        researcher_agent.arun(query),
        fact_checker_agent.arun(query),
        sentiment_agent.arun(query)
    ]
    
    results = await asyncio.gather(*tasks)
    return combine_results(results)
```

### Supervisor Pattern

```python
class SupervisorAgent:
    def __init__(self):
        self.researcher = create_agent(research_tools)
        self.analyst = create_agent(analysis_tools)
        self.writer = create_agent(writing_tools)
    
    def run(self, task):
        # Supervisor decides which agent to use
        if "research" in task.lower():
            return self.researcher.run(task)
        elif "analyze" in task.lower():
            return self.analyst.run(task)
        elif "write" in task.lower():
            return self.writer.run(task)
        else:
            return "Task unclear"
```

---

## 12. Debugging Agents

### Common Issues

**Issue 1: Agent loops infinitely**
```python
# Solution: Set max iterations
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    max_iterations=5,  # Stop after 5 iterations
    early_stopping_method="generate"
)
```

**Issue 2: Wrong tool selected**
```python
# Solution: Improve tool descriptions
# ❌ BAD
description="Search tool"

# ✅ GOOD
description="Search the web for current information about news, weather, or general knowledge. Input should be a search query string."
```

**Issue 3: Tool returns unclear results**
```python
# Solution: Format tool outputs clearly
def search_tool(query: str) -> str:
    results = search(query)
    
    # ✅ Structured output
    return f"""
    Search results for '{query}':
    1. {results[0]['title']}: {results[0]['snippet']}
    2. {results[1]['title']}: {results[1]['snippet']}
    """
```

### Debug Mode

```python
# Enable verbose logging
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True,  # See all agent thoughts
    return_intermediate_steps=True  # Get step-by-step log
)

result = agent({"input": "Complex query"})

# Inspect what happened
for step in result["intermediate_steps"]:
    action, observation = step
    print(f"Action: {action}")
    print(f"Observation: {observation}")
```

---

## 13. Advanced Topics

### 13.1 Custom Agent Creation

Build your own agent from scratch:

```python
from langchain.agents import BaseSingleActionAgent

class CustomAgent(BaseSingleActionAgent):
    def plan(self, intermediate_steps, **kwargs):
        # Your custom planning logic
        pass
    
    def aplan(self, intermediate_steps, **kwargs):
        # Async version
        pass
```

### 13.2 Tool Chaining

Create tools that use other tools:

```python
def meta_search(query: str) -> str:
    """Searches multiple sources and combines results"""
    web_results = web_search_tool.run(query)
    db_results = database_tool.run(query)
    
    return f"Web: {web_results}\nDatabase: {db_results}"
```

### 13.3 Conditional Tool Use

```python
def smart_search(query: str, use_cache: bool = True) -> str:
    if use_cache:
        cached = check_cache(query)
        if cached:
            return cached
    
    result = expensive_search(query)
    save_to_cache(query, result)
    return result
```

---

## Summary

In this module, you learned:

- **Agent Architecture:** Reasoning, tool use, autonomy
- **ReAct Pattern:** Thinking and acting in loops
- **Custom Tools:** Creating tools with proper descriptions
- **Multi-Tool Agents:** Combining multiple capabilities
- **Agent Types:** Zero-shot, conversational, structured, OpenAI functions
- **Memory:** Giving agents context awareness
- **Planning:** Multi-step task decomposition
- **Tool Integration:** APIs, databases, file systems
- **Production Patterns:** Error handling, logging, validation
- **Multi-Agent Systems:** Specialized agents working together
- **Debugging:** Common issues and solutions

**Key Takeaways:**
1. Agents are autonomous systems that use tools to accomplish goals
2. ReAct pattern enables step-by-step reasoning
3. Tool descriptions are critical for agent decision-making
4. Memory enables contextual conversations
5. Production agents need error handling and monitoring
6. Multi-agent systems enable complex workflows

**Next Module:** Production Deployment - Taking your AI applications to production

---

## Additional Resources

**Official Documentation:**
- [LangChain Agents](https://python.langchain.com/docs/modules/agents/)
- [Agent Types](https://python.langchain.com/docs/modules/agents/agent_types/)
- [Tools](https://python.langchain.com/docs/modules/agents/tools/)

**Papers:**
- [ReAct: Synergizing Reasoning and Acting](https://arxiv.org/abs/2210.03629)
- [Toolformer](https://arxiv.org/abs/2302.04761)

**Examples:**
- [LangChain Agent Cookbook](https://github.com/langchain-ai/langchain/tree/master/cookbook)

---

*Module 4 of 6 | Building AI-Powered Applications | Duration: 8-10 hours*
