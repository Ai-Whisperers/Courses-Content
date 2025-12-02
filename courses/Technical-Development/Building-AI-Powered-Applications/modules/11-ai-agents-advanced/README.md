# Module 11: AI Agents & Advanced Patterns

## Learning Objectives

By the end of this module, you will be able to:

1. Design AI agents that use tools and take autonomous actions
2. Implement function calling with OpenAI and Anthropic
3. Build guardrails to ensure safe agent behavior
4. Create multi-agent systems for complex tasks
5. Handle agent orchestration and state management

---

## Introduction

AI agents represent the next evolution of AI applications. Unlike simple chatbots that respond to queries, agents can reason about goals, use tools, and take actions to accomplish tasks autonomously. This power comes with significant complexity and responsibility.

This module teaches you to build agents that are capable, reliable, and safe. You'll learn patterns that scale from simple tool-using assistants to sophisticated multi-agent systems.

---

## 1. Understanding AI Agents

### What Makes an Agent?

```
Simple Chatbot                    AI Agent
──────────────                    ────────
Query → Response                  Goal → Plan → Actions → Observe → Adapt
One-shot interaction              Multi-step reasoning
No external actions               Tool use and side effects
Limited context                   Memory and state
Deterministic routing             Dynamic decision-making
```

### Agent Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         AI AGENT                                │
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐      │
│  │    Goal     │────▶│   Planner   │────▶│  Executor   │      │
│  │  (Input)    │     │   (LLM)     │     │   (Loop)    │      │
│  └─────────────┘     └─────────────┘     └──────┬──────┘      │
│                                                  │              │
│                            ┌─────────────────────┤              │
│                            ▼                     ▼              │
│                     ┌─────────────┐       ┌─────────────┐      │
│                     │    Tools    │       │   Memory    │      │
│                     │  - Search   │       │  - State    │      │
│                     │  - Database │       │  - History  │      │
│                     │  - APIs     │       │  - Context  │      │
│                     │  - Code     │       └─────────────┘      │
│                     └─────────────┘                            │
│                            │                                   │
│                            ▼                                   │
│                     ┌─────────────┐                            │
│                     │  Guardrails │                            │
│                     │  - Safety   │                            │
│                     │  - Limits   │                            │
│                     │  - Review   │                            │
│                     └─────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### The Agent Loop

```python
def agent_loop(goal: str, max_iterations: int = 10) -> str:
    """Basic agent execution loop."""
    context = initialize_context(goal)

    for i in range(max_iterations):
        # 1. Think: What should I do next?
        thought = llm.think(context)

        # 2. Decide: Choose an action
        action = llm.decide_action(thought, available_tools)

        if action.type == "finish":
            return action.result

        # 3. Act: Execute the action
        observation = execute_action(action)

        # 4. Observe: Update context with result
        context.add_observation(observation)

        # 5. Check guardrails
        if guardrails.should_stop(context):
            return guardrails.safe_response(context)

    return "Max iterations reached without completing goal"
```

---

## 2. Function Calling / Tool Use

### OpenAI Function Calling

```python
from openai import OpenAI
import json

client = OpenAI()

# Define available tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_database",
            "description": "Search the product database for items matching a query",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query for products"
                    },
                    "category": {
                        "type": "string",
                        "enum": ["electronics", "clothing", "home", "all"],
                        "description": "Product category to filter by"
                    },
                    "max_results": {
                        "type": "integer",
                        "description": "Maximum number of results",
                        "default": 10
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_order_status",
            "description": "Get the status of a customer order",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {
                        "type": "string",
                        "description": "The order ID to look up"
                    }
                },
                "required": ["order_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_support_ticket",
            "description": "Create a customer support ticket",
            "parameters": {
                "type": "object",
                "properties": {
                    "subject": {"type": "string"},
                    "description": {"type": "string"},
                    "priority": {
                        "type": "string",
                        "enum": ["low", "medium", "high"]
                    }
                },
                "required": ["subject", "description"]
            }
        }
    }
]

# Tool implementations
def search_database(query: str, category: str = "all", max_results: int = 10) -> dict:
    """Actual implementation of database search."""
    # Your database query logic here
    return {"results": [...], "count": 5}

def get_order_status(order_id: str) -> dict:
    """Get order status from database."""
    # Your order lookup logic
    return {"order_id": order_id, "status": "shipped", "eta": "2024-01-15"}

def create_support_ticket(subject: str, description: str, priority: str = "medium") -> dict:
    """Create a support ticket."""
    # Your ticket creation logic
    return {"ticket_id": "TKT-12345", "status": "created"}

TOOL_FUNCTIONS = {
    "search_database": search_database,
    "get_order_status": get_order_status,
    "create_support_ticket": create_support_ticket,
}

def run_agent_with_tools(user_message: str) -> str:
    """Run agent with tool use."""
    messages = [
        {"role": "system", "content": "You are a helpful customer service agent. Use tools when needed."},
        {"role": "user", "content": user_message}
    ]

    while True:
        # Get response from LLM
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        message = response.choices[0].message

        # Check if we're done (no tool calls)
        if not message.tool_calls:
            return message.content

        # Process tool calls
        messages.append(message)  # Add assistant's message with tool calls

        for tool_call in message.tool_calls:
            function_name = tool_call.function.name
            function_args = json.loads(tool_call.function.arguments)

            # Execute the function
            function = TOOL_FUNCTIONS.get(function_name)
            if function:
                result = function(**function_args)
            else:
                result = {"error": f"Unknown function: {function_name}"}

            # Add tool result to messages
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })
```

### Anthropic Tool Use

```python
from anthropic import Anthropic

client = Anthropic()

tools = [
    {
        "name": "search_database",
        "description": "Search the product database",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "category": {"type": "string", "enum": ["electronics", "clothing", "home"]}
            },
            "required": ["query"]
        }
    }
]

def run_claude_agent(user_message: str) -> str:
    """Run agent with Claude's tool use."""
    messages = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )

        # Check stop reason
        if response.stop_reason == "end_turn":
            # Extract text response
            for block in response.content:
                if block.type == "text":
                    return block.text

        # Process tool use
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result)
                })

        # Add assistant response and tool results
        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})
```

---

## 3. Building Safe Agents with Guardrails

### Guardrail Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                        GUARDRAIL LAYERS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Input Guardrails              Action Guardrails               │
│  ─────────────────            ──────────────────               │
│  • Prompt injection            • Tool allowlists               │
│  • Content filtering           • Parameter validation          │
│  • Rate limiting               • Confirmation for risky ops    │
│  • Authentication              • Resource limits               │
│                                                                 │
│  Output Guardrails             System Guardrails               │
│  ──────────────────            ─────────────────               │
│  • Content filtering           • Max iterations                │
│  • PII detection               • Timeout limits                │
│  • Factuality checking         • Cost caps                     │
│  • Format validation           • Audit logging                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Implementing Guardrails

```python
from dataclasses import dataclass
from typing import Optional, List, Set
from enum import Enum

class RiskLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class GuardrailConfig:
    max_iterations: int = 10
    max_tool_calls: int = 20
    timeout_seconds: int = 300
    max_cost_usd: float = 1.0
    require_confirmation_for: Set[str] = None  # Tool names
    blocked_tools: Set[str] = None
    allowed_domains: Set[str] = None  # For web requests

class AgentGuardrails:
    """Comprehensive guardrails for AI agents."""

    def __init__(self, config: GuardrailConfig):
        self.config = config
        self.iteration_count = 0
        self.tool_call_count = 0
        self.total_cost = 0.0
        self.actions_taken: List[dict] = []

    def check_input(self, user_input: str) -> tuple[bool, Optional[str]]:
        """Check user input for safety issues."""
        # Check for prompt injection attempts
        injection_patterns = [
            "ignore previous instructions",
            "disregard your rules",
            "pretend you are",
            "act as if",
        ]

        lower_input = user_input.lower()
        for pattern in injection_patterns:
            if pattern in lower_input:
                return False, "Potential prompt injection detected"

        # Check content policy
        if self._contains_harmful_content(user_input):
            return False, "Content policy violation"

        return True, None

    def check_tool_call(self, tool_name: str, tool_args: dict) -> tuple[bool, Optional[str]]:
        """Validate tool call before execution."""
        # Check if tool is blocked
        if self.config.blocked_tools and tool_name in self.config.blocked_tools:
            return False, f"Tool '{tool_name}' is not allowed"

        # Check tool call count
        if self.tool_call_count >= self.config.max_tool_calls:
            return False, "Maximum tool calls exceeded"

        # Check if confirmation required
        if self.config.require_confirmation_for and tool_name in self.config.require_confirmation_for:
            return self._request_confirmation(tool_name, tool_args)

        # Tool-specific validation
        if tool_name == "web_request":
            return self._validate_web_request(tool_args)

        if tool_name == "execute_code":
            return self._validate_code_execution(tool_args)

        return True, None

    def check_output(self, output: str) -> tuple[bool, Optional[str]]:
        """Validate agent output before returning to user."""
        # Check for PII leakage
        if self._contains_pii(output):
            return False, "Output contains PII - redacting"

        # Check content policy
        if self._contains_harmful_content(output):
            return False, "Output violates content policy"

        return True, None

    def check_iteration(self) -> tuple[bool, Optional[str]]:
        """Check if agent should continue iterating."""
        self.iteration_count += 1

        if self.iteration_count > self.config.max_iterations:
            return False, "Maximum iterations reached"

        if self.total_cost > self.config.max_cost_usd:
            return False, "Cost limit exceeded"

        return True, None

    def record_action(self, action: dict):
        """Record action for audit trail."""
        self.actions_taken.append({
            **action,
            "timestamp": datetime.utcnow().isoformat(),
            "iteration": self.iteration_count
        })

    def _validate_web_request(self, args: dict) -> tuple[bool, Optional[str]]:
        """Validate web request parameters."""
        url = args.get("url", "")

        # Check allowed domains
        if self.config.allowed_domains:
            from urllib.parse import urlparse
            domain = urlparse(url).netloc
            if domain not in self.config.allowed_domains:
                return False, f"Domain '{domain}' not in allowlist"

        # Block internal/private IPs
        if self._is_internal_url(url):
            return False, "Internal URLs are not allowed"

        return True, None

    def _validate_code_execution(self, args: dict) -> tuple[bool, Optional[str]]:
        """Validate code execution (very restrictive)."""
        code = args.get("code", "")

        # Block dangerous operations
        dangerous_patterns = [
            "import os", "import subprocess", "import sys",
            "eval(", "exec(", "__import__",
            "open(", "file(",
        ]

        for pattern in dangerous_patterns:
            if pattern in code:
                return False, f"Dangerous code pattern detected: {pattern}"

        return True, None

    def _contains_pii(self, text: str) -> bool:
        """Check for PII in text."""
        import re
        patterns = [
            r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
            r'\b\d{16}\b',  # Credit card
            r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',  # Email
        ]
        return any(re.search(p, text) for p in patterns)

    def _contains_harmful_content(self, text: str) -> bool:
        """Check for harmful content."""
        # Implement content moderation
        # Could use OpenAI moderation API or custom classifier
        return False

    def _is_internal_url(self, url: str) -> bool:
        """Check if URL points to internal resources."""
        from urllib.parse import urlparse
        import ipaddress

        hostname = urlparse(url).hostname
        if not hostname:
            return True

        # Check for localhost
        if hostname in ['localhost', '127.0.0.1', '0.0.0.0']:
            return True

        # Check for private IP ranges
        try:
            ip = ipaddress.ip_address(hostname)
            return ip.is_private
        except ValueError:
            pass

        return False
```

---

## 4. Multi-Agent Systems

### Agent Coordination Patterns

```
Pattern 1: Sequential Pipeline
──────────────────────────────
User → Agent A → Agent B → Agent C → Response

Use case: Complex tasks with clear stages
Example: Research → Analysis → Report Writing


Pattern 2: Parallel Execution
─────────────────────────────
              ┌─→ Agent A ─┐
User → Router ├─→ Agent B ─┼→ Aggregator → Response
              └─→ Agent C ─┘

Use case: Independent subtasks
Example: Multi-source research


Pattern 3: Hierarchical
───────────────────────
                Manager Agent
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      Worker A   Worker B   Worker C

Use case: Complex projects with delegation
Example: Software development team


Pattern 4: Debate/Critique
──────────────────────────
User → Generator → Critic → Generator → ... → Final

Use case: Improving quality through iteration
Example: Code review, fact-checking
```

### Implementing Multi-Agent System

```python
from typing import List, Dict, Any
from dataclasses import dataclass
from abc import ABC, abstractmethod

@dataclass
class AgentMessage:
    sender: str
    recipient: str
    content: str
    metadata: Dict[str, Any] = None

class BaseAgent(ABC):
    """Base class for agents in multi-agent system."""

    def __init__(self, name: str, system_prompt: str):
        self.name = name
        self.system_prompt = system_prompt
        self.message_history: List[AgentMessage] = []

    @abstractmethod
    async def process(self, message: AgentMessage) -> AgentMessage:
        """Process incoming message and produce response."""
        pass

class ResearchAgent(BaseAgent):
    """Agent specialized in research tasks."""

    def __init__(self):
        super().__init__(
            name="researcher",
            system_prompt="You are a research specialist. Gather and summarize information."
        )

    async def process(self, message: AgentMessage) -> AgentMessage:
        # Use tools to search and gather information
        research_result = await self._do_research(message.content)

        return AgentMessage(
            sender=self.name,
            recipient=message.sender,
            content=research_result
        )

class AnalystAgent(BaseAgent):
    """Agent specialized in analysis."""

    def __init__(self):
        super().__init__(
            name="analyst",
            system_prompt="You are an analyst. Analyze data and provide insights."
        )

    async def process(self, message: AgentMessage) -> AgentMessage:
        analysis = await self._analyze(message.content)

        return AgentMessage(
            sender=self.name,
            recipient=message.sender,
            content=analysis
        )

class WriterAgent(BaseAgent):
    """Agent specialized in writing."""

    def __init__(self):
        super().__init__(
            name="writer",
            system_prompt="You are a professional writer. Create clear, engaging content."
        )

    async def process(self, message: AgentMessage) -> AgentMessage:
        written_content = await self._write(message.content)

        return AgentMessage(
            sender=self.name,
            recipient=message.sender,
            content=written_content
        )

class MultiAgentOrchestrator:
    """Orchestrate multiple agents to accomplish tasks."""

    def __init__(self):
        self.agents: Dict[str, BaseAgent] = {}
        self.conversation_history: List[AgentMessage] = []

    def register_agent(self, agent: BaseAgent):
        """Register an agent with the orchestrator."""
        self.agents[agent.name] = agent

    async def run_pipeline(self, task: str, pipeline: List[str]) -> str:
        """Run agents in sequence."""
        current_content = task

        for agent_name in pipeline:
            agent = self.agents.get(agent_name)
            if not agent:
                raise ValueError(f"Agent '{agent_name}' not found")

            message = AgentMessage(
                sender="orchestrator",
                recipient=agent_name,
                content=current_content
            )

            response = await agent.process(message)
            self.conversation_history.append(message)
            self.conversation_history.append(response)

            current_content = response.content

        return current_content

    async def run_parallel(self, task: str, agents: List[str]) -> List[str]:
        """Run agents in parallel and collect results."""
        import asyncio

        async def run_agent(agent_name: str) -> str:
            agent = self.agents[agent_name]
            message = AgentMessage(
                sender="orchestrator",
                recipient=agent_name,
                content=task
            )
            response = await agent.process(message)
            return response.content

        results = await asyncio.gather(*[run_agent(name) for name in agents])
        return list(results)

    async def run_debate(
        self,
        task: str,
        proposer: str,
        critic: str,
        max_rounds: int = 3
    ) -> str:
        """Run debate pattern between two agents."""
        proposer_agent = self.agents[proposer]
        critic_agent = self.agents[critic]

        # Initial proposal
        proposal = await proposer_agent.process(AgentMessage(
            sender="orchestrator",
            recipient=proposer,
            content=task
        ))

        for round in range(max_rounds):
            # Critic reviews
            critique = await critic_agent.process(AgentMessage(
                sender=proposer,
                recipient=critic,
                content=f"Review this proposal:\n{proposal.content}"
            ))

            # Check if critic approves
            if "approved" in critique.content.lower():
                break

            # Proposer revises
            proposal = await proposer_agent.process(AgentMessage(
                sender=critic,
                recipient=proposer,
                content=f"Revise based on feedback:\n{critique.content}"
            ))

        return proposal.content


# Usage example
async def main():
    orchestrator = MultiAgentOrchestrator()

    # Register agents
    orchestrator.register_agent(ResearchAgent())
    orchestrator.register_agent(AnalystAgent())
    orchestrator.register_agent(WriterAgent())

    # Run sequential pipeline
    result = await orchestrator.run_pipeline(
        task="Analyze the impact of AI on software development",
        pipeline=["researcher", "analyst", "writer"]
    )

    print(result)
```

---

## 5. Agent State Management

### Persistent Agent State

```python
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional
from datetime import datetime
import json

@dataclass
class AgentState:
    """Persistent state for an agent."""
    agent_id: str
    user_id: str
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)

    # Conversation state
    messages: List[Dict] = field(default_factory=list)

    # Task state
    current_goal: Optional[str] = None
    completed_steps: List[str] = field(default_factory=list)
    pending_steps: List[str] = field(default_factory=list)

    # Tool state
    tool_results: Dict[str, Any] = field(default_factory=dict)

    # Memory
    facts: Dict[str, str] = field(default_factory=dict)  # Key facts to remember
    preferences: Dict[str, Any] = field(default_factory=dict)  # User preferences

    def add_message(self, role: str, content: str):
        self.messages.append({
            "role": role,
            "content": content,
            "timestamp": datetime.utcnow().isoformat()
        })
        self.updated_at = datetime.utcnow()

    def remember_fact(self, key: str, value: str):
        self.facts[key] = value
        self.updated_at = datetime.utcnow()

    def to_context(self) -> str:
        """Convert state to context string for LLM."""
        context_parts = []

        if self.current_goal:
            context_parts.append(f"Current goal: {self.current_goal}")

        if self.completed_steps:
            context_parts.append(f"Completed steps: {', '.join(self.completed_steps)}")

        if self.facts:
            facts_str = "\n".join(f"- {k}: {v}" for k, v in self.facts.items())
            context_parts.append(f"Known facts:\n{facts_str}")

        return "\n\n".join(context_parts)

class AgentStateStore:
    """Store and retrieve agent state."""

    def __init__(self, redis_client=None):
        self.redis = redis_client
        self._local_cache: Dict[str, AgentState] = {}

    async def get_state(self, agent_id: str, user_id: str) -> AgentState:
        """Retrieve or create agent state."""
        key = f"agent:{agent_id}:user:{user_id}"

        # Try Redis first
        if self.redis:
            data = await self.redis.get(key)
            if data:
                return self._deserialize(data)

        # Try local cache
        if key in self._local_cache:
            return self._local_cache[key]

        # Create new state
        state = AgentState(agent_id=agent_id, user_id=user_id)
        await self.save_state(state)
        return state

    async def save_state(self, state: AgentState):
        """Save agent state."""
        key = f"agent:{state.agent_id}:user:{state.user_id}"

        # Save to Redis
        if self.redis:
            await self.redis.set(key, self._serialize(state), ex=86400)  # 24h TTL

        # Save to local cache
        self._local_cache[key] = state

    def _serialize(self, state: AgentState) -> str:
        return json.dumps({
            "agent_id": state.agent_id,
            "user_id": state.user_id,
            "messages": state.messages,
            "current_goal": state.current_goal,
            "completed_steps": state.completed_steps,
            "pending_steps": state.pending_steps,
            "tool_results": state.tool_results,
            "facts": state.facts,
            "preferences": state.preferences,
        })

    def _deserialize(self, data: str) -> AgentState:
        d = json.loads(data)
        return AgentState(**d)
```

---

## Key Takeaways

1. **Agents are powerful but complex** - Use the simplest approach that solves the problem
2. **Guardrails are essential** - Safety must be built in, not bolted on
3. **Tool definitions matter** - Good descriptions help the LLM use tools correctly
4. **State enables continuity** - Persistent state enables multi-session agents
5. **Multi-agent = multi-complexity** - Add agents only when truly needed

---

## Knowledge Check

Before proceeding, verify you can:

1. Implement function calling with OpenAI or Anthropic
2. Design guardrails for different risk levels
3. Choose appropriate multi-agent patterns for tasks
4. Manage agent state across sessions
5. Handle agent errors and edge cases

---

## Next Module Preview

In **Module 12: Final Project**, you'll bring everything together to build a complete production AI application with all the patterns you've learned.

---

*Module 11 of 12 | Building AI-Powered Applications | Duration: 4 hours*
