# Module 4: AI Agents & Tools - Solution Guide

## Overview

This solution guide provides complete, working implementations for all exercises in Module 4. Each solution includes:
- Full working code
- Explanation of approach
- Alternative implementations
- Common mistakes to avoid
- Extension suggestions

**Instructor Note:** These are reference implementations. Student solutions may vary while still being correct.

---

## Part 1: Create Basic Agent with Tools - Solutions

### Solution 1.1: Calculator Tool

**Approach:** Safe mathematical evaluation using ast.literal_eval and operator module.

```python
# part1_basic_agent.py

import os
import operator
import math
from dotenv import load_dotenv
from langchain.tools import Tool
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI

load_dotenv()

class CalculatorTool:
    """Safe calculator for mathematical expressions"""
    
    def __init__(self):
        self.operators = {
            '+': operator.add,
            '-': operator.sub,
            '*': operator.mul,
            '/': operator.truediv,
            '**': operator.pow,
            '%': operator.mod
        }
    
    def calculate(self, expression: str) -> str:
        """
        Safely evaluate mathematical expressions
        
        Args:
            expression: Math expression as string
        
        Returns:
            Result or error message
        """
        try:
            # Remove whitespace
            expression = expression.strip()
            
            # Handle special functions
            if 'sqrt(' in expression:
                import re
                match = re.search(r'sqrt\((\d+\.?\d*)\)', expression)
                if match:
                    num = float(match.group(1))
                    result = math.sqrt(num)
                    return f"Result: {result}"
            
            # Safe evaluation
            result = eval(expression, {"__builtins__": {}}, {
                "sqrt": math.sqrt,
                "pow": pow,
                "abs": abs,
                "round": round
            })
            
            return f"Result: {result}"
        
        except ZeroDivisionError:
            return "Error: Division by zero"
        except Exception as e:
            return f"Error: Invalid expression - {str(e)}"
    
    def to_tool(self) -> Tool:
        """Convert to LangChain Tool"""
        return Tool(
            name="Calculator",
            func=self.calculate,
            description="""
            Useful for mathematical calculations.
            Input should be a valid mathematical expression like '2+2', '10*5', 'sqrt(144)'.
            Supports: +, -, *, /, **, sqrt()
            Returns the numerical result.
            """
        )

# Test calculator
def test_calculator():
    calc = CalculatorTool()
    
    tests = [
        "25 * 18 + 100",
        "sqrt(144)",
        "100 / 4",
        "2 ** 8",
        "invalid expression",
        "10 / 0"
    ]
    
    print("=== Calculator Tool Tests ===\n")
    for expr in tests:
        result = calc.calculate(expr)
        print(f"Expression: {expr}")
        print(f"Result: {result}\n")

if __name__ == "__main__":
    test_calculator()
```

**Alternative: Using numexpr (more features):**

```python
import numexpr as ne

def calculate_advanced(expression: str) -> str:
    """Advanced calculator with numexpr"""
    try:
        result = ne.evaluate(expression)
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {e}"
```

---

### Solution 1.2: Time Tool

**Approach:** Use datetime module with timezone support.

```python
# Continuing in part1_basic_agent.py

from datetime import datetime
import pytz

class TimeTool:
    """Get current time and date information"""
    
    def __init__(self):
        self.default_timezone = 'UTC'
    
    def get_time_info(self, query: str = "current time") -> str:
        """
        Get time/date information
        
        Args:
            query: What time info to get
        
        Returns:
            Formatted time/date string
        """
        try:
            now = datetime.now()
            query_lower = query.lower()
            
            if "date" in query_lower:
                return f"Today's date: {now.strftime('%B %d, %Y')}"
            
            elif "time" in query_lower:
                return f"Current time: {now.strftime('%H:%M:%S')}"
            
            elif "datetime" in query_lower or "full" in query_lower:
                return f"Current date and time: {now.strftime('%B %d, %Y at %H:%M:%S')}"
            
            elif "day" in query_lower:
                return f"Today is {now.strftime('%A')}"
            
            elif "year" in query_lower:
                return f"Current year: {now.year}"
            
            else:
                # Default: return both
                return f"Current time: {now.strftime('%H:%M:%S')} | Date: {now.strftime('%B %d, %Y')}"
        
        except Exception as e:
            return f"Error: {e}"
    
    def to_tool(self) -> Tool:
        """Convert to LangChain Tool"""
        return Tool(
            name="GetTime",
            func=self.get_time_info,
            description="""
            Get current time and date information.
            Input can be: 'current time', 'date', 'datetime', 'day', 'year'
            Returns formatted time/date information.
            """
        )

def test_time_tool():
    time_tool = TimeTool()
    
    tests = [
        "current time",
        "date",
        "datetime",
        "day",
        "year"
    ]
    
    print("\n=== Time Tool Tests ===\n")
    for query in tests:
        result = time_tool.get_time_info(query)
        print(f"Query: {query}")
        print(f"Result: {result}\n")
```

---

### Solution 1.3: Search Tool

**Approach:** Use DuckDuckGo search (no API key needed).

```python
# Continuing in part1_basic_agent.py

from duckduckgo_search import DDGS

class SearchTool:
    """Search the web for information"""
    
    def __init__(self):
        self.max_results = 3
    
    def search(self, query: str) -> str:
        """
        Search the web
        
        Args:
            query: Search query
        
        Returns:
            Formatted search results
        """
        try:
            if not query or not query.strip():
                return "Error: Empty search query"
            
            # Perform search
            with DDGS() as ddgs:
                results = list(ddgs.text(query, max_results=self.max_results))
            
            if not results:
                return f"No results found for: {query}"
            
            # Format results
            formatted = f"Search results for '{query}':\n\n"
            
            for i, result in enumerate(results, 1):
                title = result.get('title', 'No title')
                snippet = result.get('body', 'No description')
                link = result.get('href', '')
                
                formatted += f"{i}. {title}\n"
                formatted += f"   {snippet[:150]}...\n"
                formatted += f"   Source: {link}\n\n"
            
            return formatted.strip()
        
        except Exception as e:
            return f"Error performing search: {e}"
    
    def to_tool(self) -> Tool:
        """Convert to LangChain Tool"""
        return Tool(
            name="WebSearch",
            func=self.search,
            description="""
            Search the web for current information.
            Input should be a search query string.
            Returns relevant web search results with sources.
            Use this when you need current information not in your training data.
            """
        )

def test_search_tool():
    search = SearchTool()
    
    print("\n=== Search Tool Tests ===\n")
    
    result = search.search("Python programming language")
    print(f"Query: Python programming language")
    print(f"Result:\n{result}\n")
```

---

### Solution 1.4: Create Basic Agent

**Approach:** Combine all tools with Zero-Shot ReAct agent.

```python
# Continuing in part1_basic_agent.py

def create_basic_agent():
    """Create agent with calculator, time, and search tools"""
    
    # Initialize tools
    calculator = CalculatorTool()
    time_tool = TimeTool()
    search_tool = SearchTool()
    
    tools = [
        calculator.to_tool(),
        time_tool.to_tool(),
        search_tool.to_tool()
    ]
    
    # Initialize LLM
    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    
    # Create agent
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True,  # Show reasoning
        max_iterations=5,
        early_stopping_method="generate"
    )
    
    return agent

def test_basic_agent():
    """Test agent with various queries"""
    
    print("\n" + "="*60)
    print("BASIC AGENT TESTS")
    print("="*60)
    
    agent = create_basic_agent()
    
    test_queries = [
        "What is 150 divided by 5?",
        "What time is it?",
        "Search for information about machine learning",
        "Calculate 100 * 25",
        "What day is today?"
    ]
    
    for query in test_queries:
        print(f"\n{'='*60}")
        print(f"Query: {query}")
        print(f"{'='*60}\n")
        
        try:
            result = agent.run(query)
            print(f"\nFinal Answer: {result}\n")
        except Exception as e:
            print(f"Error: {e}\n")

if __name__ == "__main__":
    # test_calculator()
    # test_time_tool()
    # test_search_tool()
    test_basic_agent()
```

**Common Mistakes:**
- ❌ Using eval() without safety checks (security risk)
- ❌ Vague tool descriptions (agent won't know when to use them)
- ❌ Not handling errors in tools
- ❌ Forgetting to set verbose=True (can't see agent reasoning)

---

## Part 2: Implement ReAct Pattern - Solutions

### Solution 2.1 & 2.2: Custom ReAct Implementation

**Approach:** Build ReAct loop from scratch for educational understanding.

```python
# part2_react_pattern.py

import os
import re
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

load_dotenv()

class CustomReActAgent:
    """
    Custom implementation of ReAct pattern
    Educational purpose - shows how agents work internally
    """
    
    def __init__(self, tools, llm):
        self.tools = {tool.name: tool.func for tool in tools}
        self.tool_descriptions = {tool.name: tool.description for tool in tools}
        self.llm = llm
    
    def run(self, question: str, max_iterations: int = 5) -> str:
        """
        Execute ReAct loop
        
        Args:
            question: User question
            max_iterations: Maximum reasoning steps
        
        Returns:
            Final answer
        """
        print(f"\n{'='*60}")
        print(f"CUSTOM REACT AGENT")
        print(f"{'='*60}")
        print(f"Question: {question}\n")
        
        # Build context
        context = self._build_initial_context(question)
        
        for iteration in range(max_iterations):
            print(f"\n--- Iteration {iteration + 1} ---")
            
            # Generate thought and action
            response = self._generate_thought_action(context)
            print(f"Agent Response:\n{response}\n")
            
            # Check if final answer
            if "Final Answer:" in response:
                answer = self._extract_final_answer(response)
                print(f"\n{'='*60}")
                print(f"FINAL ANSWER: {answer}")
                print(f"{'='*60}\n")
                return answer
            
            # Extract action and input
            action, action_input = self._extract_action(response)
            
            if not action:
                context += response + "\n"
                continue
            
            # Execute tool
            observation = self._execute_tool(action, action_input)
            print(f"Observation: {observation}\n")
            
            # Update context
            context += response + f"\nObservation: {observation}\n"
        
        return "Max iterations reached. Unable to find answer."
    
    def _build_initial_context(self, question: str) -> str:
        """Build initial prompt context"""
        tools_desc = "\n".join([
            f"- {name}: {desc}" 
            for name, desc in self.tool_descriptions.items()
        ])
        
        prompt = f"""Answer the following question using available tools.

You run in a loop of Thought, Action, Observation.
Use Thought to describe your reasoning.
Use Action to run a tool: Action: ToolName(input)
Observation will be the tool result.
When you know the answer, use: Final Answer: your answer here

Available Tools:
{tools_desc}

Question: {question}

Begin!

"""
        return prompt
    
    def _generate_thought_action(self, context: str) -> str:
        """Generate thought and action"""
        response = self.llm.predict(context)
        return response
    
    def _extract_action(self, response: str):
        """Extract action and input from response"""
        # Look for Action: ToolName(input)
        pattern = r'Action:\s*(\w+)\((.*?)\)'
        match = re.search(pattern, response)
        
        if match:
            tool_name = match.group(1)
            tool_input = match.group(2).strip().strip('"').strip("'")
            return tool_name, tool_input
        
        return None, None
    
    def _execute_tool(self, tool_name: str, tool_input: str) -> str:
        """Execute tool and return observation"""
        if tool_name not in self.tools:
            return f"Error: Tool '{tool_name}' not found"
        
        try:
            result = self.tools[tool_name](tool_input)
            return result
        except Exception as e:
            return f"Error executing {tool_name}: {e}"
    
    def _extract_final_answer(self, response: str) -> str:
        """Extract final answer from response"""
        match = re.search(r'Final Answer:\s*(.+)', response, re.IGNORECASE)
        if match:
            return match.group(1).strip()
        return response

def compare_react_implementations():
    """Compare custom ReAct with LangChain's"""
    
    # Create tools
    from part1_basic_agent import CalculatorTool, TimeTool, SearchTool
    
    calc = CalculatorTool()
    time = TimeTool()
    search = SearchTool()
    
    tools = [calc.to_tool(), time.to_tool(), search.to_tool()]
    
    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    
    # Test query
    test_query = "What is 100 * 25?"
    
    print("\n" + "="*60)
    print("COMPARING REACT IMPLEMENTATIONS")
    print("="*60)
    
    # 1. Custom ReAct
    print("\n### CUSTOM REACT ###")
    custom_agent = CustomReActAgent(tools, llm)
    custom_result = custom_agent.run(test_query)
    
    # 2. LangChain ReAct
    print("\n\n### LANGCHAIN REACT ###")
    from langchain.agents import initialize_agent, AgentType
    
    langchain_agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=True
    )
    langchain_result = langchain_agent.run(test_query)
    
    # Comparison
    print("\n" + "="*60)
    print("COMPARISON")
    print("="*60)
    print(f"\nCustom ReAct Result: {custom_result}")
    print(f"LangChain Result: {langchain_result}")
    
    print("\n### Observations ###")
    print("- LangChain has better error handling")
    print("- LangChain prompt engineering is more robust")
    print("- Custom implementation helps understand internals")
    print("- Production apps should use LangChain")

if __name__ == "__main__":
    compare_react_implementations()
```

**Key Learnings:**
1. ReAct is a loop of Thought → Action → Observation
2. Prompt engineering is critical for agent reliability
3. Tool selection depends heavily on descriptions
4. Production agents need robust error handling
5. LangChain abstracts away complexity but understanding internals helps debugging

---

## Part 3: Build Multi-Tool Agent - Solutions

### Solution 3.1: Additional Tools

```python
# part3_multi_tool_agent.py

import os
from pathlib import Path
from dotenv import load_dotenv
from langchain.tools import Tool
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

load_dotenv()

# Import previous tools
from part1_basic_agent import CalculatorTool, TimeTool, SearchTool

class FileTool:
    """File operations tool"""
    
    def __init__(self, base_dir="./agent_files"):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(exist_ok=True)
    
    def execute(self, command: str) -> str:
        """
        Execute file operations
        
        Format: operation|filename|content
        Operations: read, write, list
        """
        try:
            parts = command.split('|')
            operation = parts[0].strip().lower()
            
            if operation == 'read':
                filename = parts[1].strip()
                return self._read_file(filename)
            
            elif operation == 'write':
                filename = parts[1].strip()
                content = parts[2] if len(parts) > 2 else ""
                return self._write_file(filename, content)
            
            elif operation == 'list':
                return self._list_files()
            
            else:
                return f"Unknown operation: {operation}. Use: read, write, or list"
        
        except Exception as e:
            return f"Error: {e}"
    
    def _read_file(self, filename: str) -> str:
        """Read file contents"""
        filepath = self.base_dir / filename
        
        if not filepath.exists():
            return f"Error: File '{filename}' not found"
        
        try:
            with open(filepath, 'r') as f:
                content = f.read()
            return f"Contents of {filename}:\n{content}"
        except Exception as e:
            return f"Error reading file: {e}"
    
    def _write_file(self, filename: str, content: str) -> str:
        """Write to file"""
        filepath = self.base_dir / filename
        
        try:
            with open(filepath, 'w') as f:
                f.write(content)
            return f"Successfully wrote to {filename}"
        except Exception as e:
            return f"Error writing file: {e}"
    
    def _list_files(self) -> str:
        """List all files"""
        files = list(self.base_dir.glob('*'))
        
        if not files:
            return "No files found"
        
        file_list = "\n".join([f"- {f.name}" for f in files if f.is_file()])
        return f"Files:\n{file_list}"
    
    def to_tool(self) -> Tool:
        """Convert to LangChain Tool"""
        return Tool(
            name="FileOperations",
            func=self.execute,
            description="""
            Perform file operations: read, write, list.
            Input format: operation|filename|content
            Examples:
            - read|file.txt
            - write|file.txt|content here
            - list
            """
        )

class DatabaseTool:
    """Mock database tool"""
    
    def __init__(self):
        # Mock database
        self.db = {
            "users": [
                {"id": 1, "name": "Alice", "email": "alice@example.com"},
                {"id": 2, "name": "Bob", "email": "bob@example.com"}
            ],
            "products": [
                {"id": 1, "name": "Laptop", "price": 999},
                {"id": 2, "name": "Mouse", "price": 25}
            ]
        }
    
    def query(self, query_str: str) -> str:
        """
        Query mock database
        
        Format: table|search_term
        """
        try:
            parts = query_str.split('|')
            table = parts[0].strip().lower()
            search = parts[1].strip().lower() if len(parts) > 1 else ""
            
            if table not in self.db:
                return f"Error: Table '{table}' not found. Available: {list(self.db.keys())}"
            
            results = self.db[table]
            
            # Filter if search term provided
            if search:
                results = [
                    r for r in results 
                    if search in str(r).lower()
                ]
            
            if not results:
                return f"No results found in {table}"
            
            return f"Results from {table}:\n" + "\n".join([str(r) for r in results])
        
        except Exception as e:
            return f"Error: {e}"
    
    def to_tool(self) -> Tool:
        """Convert to LangChain Tool"""
        return Tool(
            name="DatabaseQuery",
            func=self.query,
            description="""
            Query the database.
            Input format: table|search_term
            Tables: users, products
            Example: users|alice
            """
        )

def create_multi_tool_agent():
    """Create agent with 5+ tools and memory"""
    
    # Initialize all tools
    calculator = CalculatorTool()
    time_tool = TimeTool()
    search_tool = SearchTool()
    file_tool = FileTool()
    db_tool = DatabaseTool()
    
    tools = [
        calculator.to_tool(),
        time_tool.to_tool(),
        search_tool.to_tool(),
        file_tool.to_tool(),
        db_tool.to_tool()
    ]
    
    # Initialize memory
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    
    # Initialize LLM
    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    
    # Create agent with memory
    agent = initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
        memory=memory,
        verbose=True,
        max_iterations=10
    )
    
    return agent

def test_multi_tool_agent():
    """Test agent with complex tasks"""
    
    print("\n" + "="*60)
    print("MULTI-TOOL AGENT TESTS")
    print("="*60)
    
    agent = create_multi_tool_agent()
    
    # Test 1: Memory
    print("\n### Test 1: Memory ###")
    agent.run("My name is Alice and I like Python")
    response = agent.run("What's my name and what do I like?")
    print(f"Response: {response}")
    
    # Test 2: Calculation + File
    print("\n\n### Test 2: Calculate and Save ###")
    response = agent.run("Calculate 150 * 25, then save the result to result.txt using write|result.txt|[result]")
    print(f"Response: {response}")
    
    # Test 3: Database Query
    print("\n\n### Test 3: Database Query ###")
    response = agent.run("Search the users table for alice")
    print(f"Response: {response}")
    
    # Test 4: Complex Multi-Step
    print("\n\n### Test 4: Complex Task ###")
    response = agent.run("""
    1. Get current time
    2. Calculate 100 * 5
    3. Save both results to a file called info.txt
    """)
    print(f"Response: {response}")

if __name__ == "__main__":
    test_multi_tool_agent()
```

**Common Mistakes:**
- ❌ Tools that return unclear output format
- ❌ Not using memory-compatible agent type
- ❌ Forgetting to initialize memory properly
- ❌ Tool input format not documented in description

---

## Part 4: Complete Autonomous Assistant - Solution

**Complete Production Application:**

```python
# app.py

import os
import sys
import time
from datetime import datetime
from typing import Dict, List
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.callbacks import get_openai_callback

# Import all custom tools
from part1_basic_agent import CalculatorTool, TimeTool, SearchTool
from part3_multi_tool_agent import FileTool, DatabaseTool

load_dotenv()

class AutonomousAssistant:
    """
    Complete Autonomous AI Assistant
    
    Features:
    - Multiple specialized tools
    - Conversation memory
    - Logging and monitoring
    - Error handling
    - Performance metrics
    """
    
    def __init__(self, config: Dict):
        self.config = config
        self.tools = self._init_tools()
        self.memory = self._init_memory()
        self.agent = self._init_agent()
        self.history = []
        self.stats = {
            "queries": 0,
            "tool_uses": 0,
            "errors": 0,
            "total_tokens": 0,
            "total_cost": 0.0
        }
        self.verbose = config.get("verbose", False)
    
    def _init_tools(self) -> List:
        """Initialize all tools"""
        calculator = CalculatorTool()
        time_tool = TimeTool()
        search_tool = SearchTool()
        file_tool = FileTool()
        db_tool = DatabaseTool()
        
        tools = [
            calculator.to_tool(),
            time_tool.to_tool(),
            search_tool.to_tool(),
            file_tool.to_tool(),
            db_tool.to_tool()
        ]
        
        return tools
    
    def _init_memory(self):
        """Initialize conversation memory"""
        memory_type = self.config.get("memory_type", "buffer")
        
        if memory_type == "buffer":
            return ConversationBufferMemory(
                memory_key="chat_history",
                return_messages=True
            )
        else:
            return ConversationBufferMemory(
                memory_key="chat_history",
                return_messages=True
            )
    
    def _init_agent(self):
        """Initialize agent"""
        llm = ChatOpenAI(
            temperature=self.config.get("temperature", 0),
            model_name=self.config.get("model", "gpt-3.5-turbo")
        )
        
        agent = initialize_agent(
            tools=self.tools,
            llm=llm,
            agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
            memory=self.memory,
            verbose=self.verbose,
            max_iterations=self.config.get("max_iterations", 10),
            early_stopping_method="generate"
        )
        
        return agent
    
    def ask(self, question: str) -> Dict:
        """
        Process user question
        
        Args:
            question: User question
        
        Returns:
            Response dictionary
        """
        if not question or not question.strip():
            return {"success": False, "error": "Empty question"}
        
        start_time = time.time()
        
        try:
            # Track token usage
            with get_openai_callback() as cb:
                result = self.agent.run(question)
                
                # Update stats
                self.stats["queries"] += 1
                self.stats["total_tokens"] += cb.total_tokens
                self.stats["total_cost"] += cb.total_cost
            
            elapsed_time = time.time() - start_time
            
            # Store in history
            self.history.append({
                "question": question,
                "answer": result,
                "timestamp": datetime.now().isoformat(),
                "elapsed_time": elapsed_time,
                "tokens": cb.total_tokens
            })
            
            return {
                "success": True,
                "answer": result,
                "elapsed_time": elapsed_time,
                "tokens": cb.total_tokens
            }
        
        except Exception as e:
            self.stats["errors"] += 1
            return {
                "success": False,
                "error": str(e)
            }
    
    def list_tools(self):
        """Display available tools"""
        print("\nAvailable Tools:")
        print("-" * 60)
        for i, tool in enumerate(self.tools, 1):
            print(f"{i}. {tool.name}")
            print(f"   {tool.description.strip()[:100]}...")
            print()
    
    def show_history(self, n: int = 5):
        """Show recent conversation history"""
        if not self.history:
            print("\nNo conversation history yet\n")
            return
        
        recent = self.history[-n:]
        
        print(f"\nConversation History (last {len(recent)}):")
        print("=" * 60)
        
        for i, entry in enumerate(recent, 1):
            print(f"\n{i}. Q: {entry['question']}")
            print(f"   A: {entry['answer'][:100]}...")
            print(f"   Time: {entry['elapsed_time']:.2f}s | Tokens: {entry['tokens']}")
    
    def get_stats(self) -> Dict:
        """Get usage statistics"""
        return self.stats
    
    def clear_memory(self):
        """Clear conversation memory"""
        self.memory.clear()
        print("✓ Conversation memory cleared")
    
    def toggle_verbose(self):
        """Toggle verbose mode"""
        self.verbose = not self.verbose
        self.agent.verbose = self.verbose
        status = "enabled" if self.verbose else "disabled"
        print(f"✓ Verbose mode {status}")


def print_header():
    """Print application header"""
    print("\n" + "=" * 60)
    print("  AUTONOMOUS AI ASSISTANT")
    print("=" * 60)
    print("\nCommands:")
    print("  ask      - Ask the assistant anything")
    print("  tools    - List available tools")
    print("  history  - Show conversation history")
    print("  stats    - Show usage statistics")
    print("  clear    - Clear conversation memory")
    print("  verbose  - Toggle detailed logging")
    print("  help     - Show this help")
    print("  quit     - Exit")
    print("\n" + "=" * 60 + "\n")


def main():
    """Main application loop"""
    
    # Check API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Error: OPENAI_API_KEY not found")
        print("   Please create a .env file with your API key")
        sys.exit(1)
    
    # Configuration
    config = {
        "model": "gpt-3.5-turbo",
        "temperature": 0,
        "max_iterations": 10,
        "verbose": False,
        "memory_type": "buffer"
    }
    
    # Initialize assistant
    print("Initializing Autonomous AI Assistant...")
    try:
        assistant = AutonomousAssistant(config)
        print("✓ Assistant ready\n")
    except Exception as e:
        print(f"❌ Error initializing assistant: {e}")
        sys.exit(1)
    
    # Show loaded tools
    print(f"Loaded {len(assistant.tools)} tools:")
    for tool in assistant.tools:
        print(f"✓ {tool.name}")
    
    # Print header
    print_header()
    
    # Main command loop
    while True:
        try:
            command = input("> ").strip().lower()
            
            if not command:
                continue
            
            if command in ["quit", "exit", "q"]:
                print("\nThank you for using Autonomous AI Assistant! Goodbye! 👋\n")
                break
            
            elif command == "help":
                print_header()
            
            elif command == "ask":
                question = input("\nQuestion: ").strip()
                if question:
                    print("\nThinking...")
                    result = assistant.ask(question)
                    
                    if result["success"]:
                        print(f"\nAnswer:\n{result['answer']}")
                        print(f"\n⏱️  {result['elapsed_time']:.2f}s | 🎫 {result['tokens']} tokens\n")
                    else:
                        print(f"\n❌ Error: {result['error']}\n")
            
            elif command == "tools":
                assistant.list_tools()
            
            elif command == "history":
                assistant.show_history()
                print()
            
            elif command == "stats":
                stats = assistant.get_stats()
                print("\nUsage Statistics:")
                print("-" * 40)
                print(f"Total queries: {stats['queries']}")
                print(f"Total tokens: {stats['total_tokens']}")
                print(f"Estimated cost: ${stats['total_cost']:.4f}")
                print(f"Errors: {stats['errors']}")
                print()
            
            elif command == "clear":
                assistant.clear_memory()
                print()
            
            elif command == "verbose":
                assistant.toggle_verbose()
                print()
            
            else:
                print(f"Unknown command: '{command}'. Type 'help' for available commands.\n")
        
        except KeyboardInterrupt:
            print("\n\nInterrupted. Type 'quit' to exit.\n")
        except Exception as e:
            print(f"\n❌ Error: {e}\n")


if __name__ == "__main__":
    main()
```

**Requirements File:**

```text
# requirements.txt
langchain==0.1.0
openai==1.0.0
python-dotenv==1.0.0
duckduckgo-search==4.1.0
wikipedia==1.4.0
```

**README.md:**

```markdown
# Autonomous AI Assistant

Complete AI agent system with multiple tools and reasoning capabilities.

## Features

- 🤖 Autonomous reasoning with ReAct pattern
- 🛠️ 5+ specialized tools
- 💭 Conversation memory
- 📊 Usage statistics and monitoring
- ⚡ Production-ready error handling

## Setup

1. **Install:**
```bash
pip install -r requirements.txt
```

2. **Configure:**
Create `.env`:
```
OPENAI_API_KEY=your-key-here
```

3. **Run:**
```bash
python app.py
```

## Tools

- **Calculator:** Mathematical operations
- **WebSearch:** Current web information
- **GetTime:** Time and date info
- **FileOperations:** Read/write files
- **DatabaseQuery:** Query mock database

## Usage

Type commands at prompt:
- `ask` - Ask any question
- `tools` - List available tools
- `history` - View conversation history
- `stats` - Usage statistics
- `quit` - Exit

## Architecture

- **Agent Type:** Conversational ReAct
- **Model:** GPT-3.5-turbo
- **Memory:** Buffer (full history)
- **Max Iterations:** 10

## Example

```
> ask
Question: Calculate 150 * 25, then save to result.txt

Answer: I calculated 150 * 25 which equals 3750 and saved it to result.txt

⏱️  3.2s | 🎫 342 tokens
```
```

---

## Common Student Mistakes & Solutions

### Mistake 1: Poor tool descriptions
**Problem:** Agent selects wrong tool

**Solution:**
```python
# ❌ BAD
description="Math tool"

# ✅ GOOD
description="For mathematical calculations. Input: valid math expression like '2+2'. Returns numerical result."
```

### Mistake 2: Tools without error handling
**Problem:** Agent crashes on bad input

**Solution:** Always wrap tool logic in try-except

### Mistake 3: Not using appropriate agent type
**Problem:** Memory doesn't work

**Solution:** Use `CONVERSATIONAL_REACT_DESCRIPTION` for memory

### Mistake 4: Infinite loops
**Problem:** Agent never stops

**Solution:** Set `max_iterations` and `early_stopping_method`

---

## Extension Ideas

1. **Advanced Tools:** Weather API, email, calendar
2. **Multi-Agent:** Specialized agents for different domains
3. **Persistent Memory:** Save conversations to database
4. **Web UI:** Streamlit or Gradio frontend
5. **Voice Interface:** Speech-to-text/text-to-speech

---

*Module 4 Solution Guide | Building AI-Powered Applications*
