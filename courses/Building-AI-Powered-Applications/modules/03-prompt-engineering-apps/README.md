# Module 3: Prompt Engineering for Applications

## Learning Objectives

By the end of this module, you will be able to:

1. Design system prompts that define consistent application behavior
2. Build dynamic prompts that incorporate runtime context
3. Parse and validate structured outputs reliably
4. Implement function calling / tool use for external actions
5. Optimize prompts for cost and quality

---

## Introduction

Prompt engineering for applications is fundamentally different from crafting one-off prompts. You need prompts that work reliably across thousands of inputs, degrade gracefully on edge cases, and produce outputs your code can parse. This module teaches you production prompt patterns.

---

## 1. System Prompts for Applications

### The Role of System Prompts

System prompts define your application's "personality" and behavior rules. They're sent with every request and establish the foundation for all interactions.

**Key Functions:**
- Define the assistant's role and capabilities
- Set behavioral boundaries
- Specify output format requirements
- Establish domain knowledge context

### System Prompt Template

```
You are [ROLE] for [APPLICATION].

## Your Capabilities
- [Capability 1]
- [Capability 2]
- [Capability 3]

## Your Constraints
- [Constraint 1: what you cannot do]
- [Constraint 2: topics to avoid]
- [Constraint 3: behavioral boundaries]

## Response Guidelines
- [Format requirement]
- [Length expectation]
- [Tone specification]

## Knowledge Context
[Domain-specific information the model should know]

## Output Format
[Exact format specification for parseable outputs]
```

### Example: Customer Support Bot

```
You are a customer support agent for TechCorp, an electronics retailer.

## Your Capabilities
- Answer questions about products, orders, and policies
- Help with order status, returns, and exchanges
- Provide basic troubleshooting for products
- Escalate complex issues to human agents

## Your Constraints
- Never make up product information - only use provided context
- Cannot process payments or modify orders directly
- Cannot access or share personal customer data beyond what's in the conversation
- Do not discuss competitors or make price comparisons

## Response Guidelines
- Keep responses concise (under 150 words unless explaining a process)
- Use friendly, professional tone
- When uncertain, acknowledge limitations and offer to escalate
- Always end with a follow-up question or clear next step

## Escalation Triggers
If the customer mentions any of these, recommend human agent:
- Legal issues or threats
- Repeated failed troubleshooting
- Complaints about specific employees
- Requests for exceptions to policy

## Output Format
Respond naturally in conversation. If you need to recommend escalation,
include exactly: [ESCALATE: reason]
```

### System Prompt Best Practices

| Practice | Why | Example |
|----------|-----|---------|
| Be specific | Reduces ambiguity | "under 150 words" not "be concise" |
| Define negatives | Prevents unwanted behavior | "never make up information" |
| Include examples | Shows desired format | Sample response format |
| Specify edge cases | Handles exceptions | Escalation triggers |
| Version control | Track changes | Use Git for prompt versions |

---

## 2. Dynamic Prompt Construction

### Building Prompts at Runtime

Static prompts can't handle personalization, context injection, or variable requirements. Dynamic prompts assemble at runtime.

### Template Pattern

```python
from string import Template
from typing import Optional, List, Dict

class PromptBuilder:
    def __init__(self, system_template: str):
        self.system_template = Template(system_template)

    def build(
        self,
        context: Dict[str, str],
        user_message: str,
        conversation_history: Optional[List[Dict]] = None
    ) -> List[Dict[str, str]]:
        """Build messages array with dynamic context."""

        # Render system prompt with context
        system_prompt = self.system_template.safe_substitute(context)

        messages = [{"role": "system", "content": system_prompt}]

        # Add conversation history if provided
        if conversation_history:
            messages.extend(conversation_history)

        # Add current user message
        messages.append({"role": "user", "content": user_message})

        return messages


# Usage
system_template = """
You are a support agent for $company_name.

Current customer: $customer_name
Account type: $account_tier
Previous interactions: $interaction_count

$additional_context
"""

builder = PromptBuilder(system_template)

messages = builder.build(
    context={
        "company_name": "TechCorp",
        "customer_name": "Jane Doe",
        "account_tier": "Premium",
        "interaction_count": "3",
        "additional_context": "Customer has an open return request #12345"
    },
    user_message="What's the status of my return?"
)
```

### Context Injection Patterns

**Pattern 1: Document Context (for RAG)**
```python
def build_rag_prompt(question: str, documents: List[str]) -> str:
    context = "\n\n---\n\n".join(documents)

    return f"""Answer the question based ONLY on the following context.
If the context doesn't contain the answer, say "I don't have information about that."

## Context
{context}

## Question
{question}

## Answer"""
```

**Pattern 2: Structured Data Context**
```python
def build_data_prompt(user_query: str, data: Dict) -> str:
    data_str = json.dumps(data, indent=2)

    return f"""You have access to the following data:

```json
{data_str}
```

Based on this data, answer: {user_query}

Cite specific values from the data in your response."""
```

---

## 3. Structured Output Parsing

### The Parsing Challenge

LLMs output free-form text. Applications need structured data. Bridging this gap reliably is critical.

### Pattern 1: JSON Output

```python
import json
from typing import Optional, TypeVar, Type
from pydantic import BaseModel, ValidationError

T = TypeVar('T', bound=BaseModel)

def get_json_output(
    client,
    messages: list,
    response_model: Type[T],
    max_retries: int = 2
) -> Optional[T]:
    """
    Get structured JSON output from LLM.

    Uses prompt engineering + validation for reliability.
    """

    # Add JSON instruction to messages
    json_instruction = f"""
Respond ONLY with valid JSON matching this schema:
{response_model.model_json_schema()}

No explanations, no markdown code blocks, just the raw JSON object.
"""
    messages = messages + [{"role": "user", "content": json_instruction}]

    for attempt in range(max_retries + 1):
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0  # Deterministic for consistency
        )

        content = response.choices[0].message.content.strip()

        # Clean potential markdown formatting
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
            content = content.strip()

        try:
            data = json.loads(content)
            return response_model(**data)
        except (json.JSONDecodeError, ValidationError) as e:
            if attempt == max_retries:
                raise ValueError(f"Failed to parse response after {max_retries + 1} attempts: {e}")

            # Add error feedback for retry
            messages.append({"role": "assistant", "content": content})
            messages.append({
                "role": "user",
                "content": f"That wasn't valid JSON. Error: {e}. Please try again with valid JSON only."
            })

    return None


# Usage with Pydantic model
class SentimentAnalysis(BaseModel):
    sentiment: str  # "positive", "negative", "neutral"
    confidence: float  # 0.0 to 1.0
    key_phrases: list[str]
    summary: str

result = get_json_output(
    client,
    messages=[{"role": "user", "content": "Analyze: 'This product is amazing!'"}],
    response_model=SentimentAnalysis
)
print(result.sentiment)  # "positive"
```

### Pattern 2: OpenAI Structured Outputs

OpenAI now supports guaranteed JSON schema compliance:

```python
from pydantic import BaseModel

class CalendarEvent(BaseModel):
    title: str
    date: str
    time: str
    duration_minutes: int
    participants: list[str]

response = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[
        {"role": "system", "content": "Extract calendar event details."},
        {"role": "user", "content": "Meeting with John tomorrow at 2pm for 1 hour"}
    ],
    response_format=CalendarEvent
)

event = response.choices[0].message.parsed
print(event.title)  # Extracted title
```

### Pattern 3: Delimiter-Based Parsing

For simpler cases, use delimiters:

```python
def parse_delimited_response(response: str) -> Dict[str, str]:
    """Parse response with <<<key>>> markers."""
    result = {}
    import re

    # Find all <<<key>>>value<<<key>>> patterns
    pattern = r'<<<(\w+)>>>(.*?)<<<\1>>>'
    matches = re.findall(pattern, response, re.DOTALL)

    for key, value in matches:
        result[key] = value.strip()

    return result

# Prompt that produces delimited output
prompt = """
Analyze the following text and provide:
<<<summary>>>Your summary here<<<summary>>>
<<<sentiment>>>positive/negative/neutral<<<sentiment>>>
<<<topics>>>comma,separated,topics<<<topics>>>

Text: {text}
"""
```

---

## 4. Function Calling / Tool Use

### Why Function Calling?

Function calling lets LLMs trigger actions in your system. Instead of generating text descriptions, the model returns structured function calls that your code executes.

### OpenAI Function Calling

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name or coordinates"
                    },
                    "units": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature units"
                    }
                },
                "required": ["location"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_products",
            "description": "Search product catalog",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "category": {"type": "string"},
                    "max_price": {"type": "number"}
                },
                "required": ["query"]
            }
        }
    }
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=tools,
    tool_choice="auto"  # Model decides whether to call
)

# Check if model wants to call a function
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    function_name = tool_call.function.name
    arguments = json.loads(tool_call.function.arguments)

    print(f"Call {function_name} with {arguments}")
    # {"location": "Tokyo", "units": "celsius"}
```

### Complete Function Calling Loop

```python
def run_with_tools(client, messages: list, tools: list, tool_handlers: dict):
    """Run conversation with tool/function calling support."""

    while True:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        message = response.choices[0].message

        # If no tool calls, return the response
        if not message.tool_calls:
            return message.content

        # Process each tool call
        messages.append(message)  # Add assistant's response

        for tool_call in message.tool_calls:
            function_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)

            # Execute the function
            if function_name in tool_handlers:
                result = tool_handlers[function_name](**arguments)
            else:
                result = {"error": f"Unknown function: {function_name}"}

            # Add function result to messages
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": json.dumps(result)
            })


# Define tool handlers
def get_weather(location: str, units: str = "celsius") -> dict:
    # In reality, call a weather API
    return {"temperature": 22, "conditions": "sunny", "location": location}

def search_products(query: str, category: str = None, max_price: float = None) -> dict:
    # In reality, query your database
    return {"products": [{"name": "Widget", "price": 29.99}], "total": 1}

tool_handlers = {
    "get_weather": get_weather,
    "search_products": search_products
}

# Use it
result = run_with_tools(
    client,
    messages=[{"role": "user", "content": "What's the weather in Paris and show me products under $50"}],
    tools=tools,
    tool_handlers=tool_handlers
)
```

### Anthropic Tool Use

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"},
                "units": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
        }
    }
]

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Weather in London?"}]
)

# Check for tool use
for block in response.content:
    if block.type == "tool_use":
        print(f"Call: {block.name}")
        print(f"Args: {block.input}")
```

---

## 5. Token Optimization

### Understanding Token Costs

Every token in your prompt costs money. Optimization reduces costs without sacrificing quality.

### Optimization Strategies

**Strategy 1: Prompt Compression**

```python
# Before: 150 tokens
"""
You are a helpful AI assistant designed to help users with their questions.
Your goal is to provide accurate, helpful, and friendly responses to whatever
questions the users might have. Please make sure to be thorough but concise
in your responses and always maintain a professional demeanor.
"""

# After: 40 tokens
"""
You are a helpful assistant. Be accurate, friendly, thorough but concise.
Maintain professional tone.
"""
```

**Strategy 2: Dynamic System Prompts**

```python
def get_system_prompt(task_type: str) -> str:
    """Return minimal system prompt for task type."""
    prompts = {
        "simple_qa": "Answer concisely.",
        "analysis": "You are an analyst. Provide structured analysis.",
        "creative": "You are a creative writer. Be imaginative.",
        "code": "You are a coding assistant. Provide working code."
    }
    return prompts.get(task_type, prompts["simple_qa"])
```

**Strategy 3: Context Truncation**

```python
def truncate_context(
    context: str,
    max_tokens: int,
    tokenizer
) -> str:
    """Truncate context to fit token budget."""
    tokens = tokenizer.encode(context)

    if len(tokens) <= max_tokens:
        return context

    # Keep the most recent/relevant content
    truncated_tokens = tokens[-max_tokens:]
    return tokenizer.decode(truncated_tokens)
```

### Cost Tracking

```python
from dataclasses import dataclass
from typing import Dict

@dataclass
class TokenUsage:
    input_tokens: int
    output_tokens: int
    model: str

    @property
    def cost(self) -> float:
        """Calculate cost in dollars."""
        rates = {
            "gpt-4o": (0.0025, 0.010),  # per 1K tokens
            "gpt-4-turbo": (0.010, 0.030),
            "claude-3-5-sonnet": (0.003, 0.015)
        }
        input_rate, output_rate = rates.get(self.model, (0.01, 0.03))
        return (self.input_tokens * input_rate + self.output_tokens * output_rate) / 1000

class CostTracker:
    def __init__(self):
        self.usage_history: List[TokenUsage] = []

    def record(self, usage: TokenUsage):
        self.usage_history.append(usage)

    @property
    def total_cost(self) -> float:
        return sum(u.cost for u in self.usage_history)

    def report(self) -> Dict:
        return {
            "total_requests": len(self.usage_history),
            "total_input_tokens": sum(u.input_tokens for u in self.usage_history),
            "total_output_tokens": sum(u.output_tokens for u in self.usage_history),
            "total_cost": f"${self.total_cost:.4f}"
        }
```

---

## Key Takeaways

1. **System prompts are foundational** - Invest time in designing robust system prompts
2. **Dynamic prompts scale** - Build prompts programmatically with templates and context injection
3. **Parse outputs defensively** - Always validate and handle parsing failures
4. **Function calling enables actions** - Let LLMs trigger real functionality in your system
5. **Tokens cost money** - Optimize prompts and track usage religiously

---

## Knowledge Check

Before moving on, ensure you can:

1. Design a system prompt for a specific application
2. Build dynamic prompts with runtime context
3. Parse JSON output reliably with validation
4. Implement function calling for a simple use case
5. Calculate token costs for a conversation

---

## Next Module Preview

In **Module 4: Embeddings & Vector Databases**, you'll learn to convert text to vectors, build semantic search, and set up vector databases for RAG applications.

---

*Module 3 of 12 | Building AI-Powered Applications | Duration: 4 hours*
