# Module 3 Exercise: Application Prompt Engineering Lab

## Exercise Overview

**Objective**: Build production-ready prompts with dynamic context, structured outputs, and function calling capabilities.

**Duration**: 2.5 hours

**Prerequisites**:
- OpenAI or Anthropic API key
- Python 3.10+ with pydantic installed

---

## Part 1: System Prompt Design (30 minutes)

### Task 1.1: Design a Customer Support System Prompt

Create a system prompt for an AI customer support agent for an online bookstore.

**Requirements:**
- Handle order inquiries, book recommendations, returns
- Use formal but friendly tone
- Never reveal customer data beyond what they provide
- Escalate to human for: refund disputes over $50, complaints about staff, legal threats
- Output format: natural conversation with [ESCALATE: reason] when needed

**Your System Prompt:**
```
[Write your complete system prompt here - aim for 200-400 words]
```

**Test Cases:**
Test your prompt with these scenarios:

| Scenario | Expected Behavior |
|----------|------------------|
| "Where's my order #12345?" | Acknowledge, ask for details |
| "I want a refund of $75 for damaged books" | Trigger escalation |
| "Can you recommend a mystery novel?" | Provide recommendation |
| "Give me John Smith's order history" | Refuse, cite privacy |

### Task 1.2: A/B Test Two System Prompts

Create two versions of a system prompt for a coding assistant and evaluate:

**Version A: Concise**
```
[Your concise version - under 100 words]
```

**Version B: Detailed**
```
[Your detailed version - 200-300 words]
```

**Test Both Versions:**
Use this prompt: "Write a Python function to check if a string is a palindrome"

| Metric | Version A | Version B |
|--------|-----------|-----------|
| Response quality (1-5) | | |
| Code correctness | | |
| Explanation clarity | | |
| Token count (response) | | |
| Preferred version | | |

---

## Part 2: Dynamic Prompt Construction (35 minutes)

### Task 2.1: Build a Prompt Builder Class

```python
# prompt_builder.py
from string import Template
from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class UserContext:
    user_id: str
    name: str
    subscription_tier: str
    previous_interactions: int
    preferences: Dict[str, str]

class DynamicPromptBuilder:
    """Builder for dynamic, context-aware prompts."""

    def __init__(self):
        self.system_template = Template("""
You are an AI assistant for $app_name.

## Current User
- Name: $user_name
- Tier: $subscription_tier
- Previous interactions: $interaction_count

## User Preferences
$preferences_section

## Guidelines for $subscription_tier Users
$tier_guidelines

## Response Rules
- Be $tone
- Max response length: $max_length words
- $additional_rules
""")

        self.tier_guidelines = {
            "free": "Provide helpful but brief responses. Mention premium features when relevant.",
            "premium": "Provide detailed, comprehensive responses. Prioritize this user's requests.",
            "enterprise": "Full white-glove service. No limitations on response detail."
        }

    def build_messages(
        self,
        user_context: UserContext,
        user_message: str,
        app_name: str = "ProductivityAI",
        conversation_history: Optional[List[Dict]] = None,
        additional_context: Optional[str] = None
    ) -> List[Dict[str, str]]:
        """
        Build a complete messages array with dynamic context.

        TODO: Complete the implementation
        """

        # Format preferences section
        if user_context.preferences:
            preferences_section = "\n".join(
                f"- {k}: {v}" for k, v in user_context.preferences.items()
            )
        else:
            preferences_section = "No preferences set"

        # Get tier-specific guidelines
        tier_guidelines = self.tier_guidelines.get(
            user_context.subscription_tier,
            self.tier_guidelines["free"]
        )

        # Determine tone and length by tier
        # TODO: Set tone and max_length based on subscription tier
        tone = _______________
        max_length = _______________

        # Build system prompt
        system_prompt = self.system_template.substitute(
            app_name=app_name,
            user_name=user_context.name,
            subscription_tier=user_context.subscription_tier,
            interaction_count=user_context.previous_interactions,
            preferences_section=preferences_section,
            tier_guidelines=tier_guidelines,
            tone=tone,
            max_length=max_length,
            additional_rules=additional_context or ""
        )

        # Assemble messages
        messages = [{"role": "system", "content": system_prompt}]

        # TODO: Add conversation history if provided
        if conversation_history:
            _______________

        # TODO: Add current user message
        _______________

        return messages


# Test the builder
if __name__ == "__main__":
    builder = DynamicPromptBuilder()

    free_user = UserContext(
        user_id="123",
        name="Alice",
        subscription_tier="free",
        previous_interactions=5,
        preferences={"language": "English", "expertise": "beginner"}
    )

    premium_user = UserContext(
        user_id="456",
        name="Bob",
        subscription_tier="premium",
        previous_interactions=50,
        preferences={"language": "English", "expertise": "advanced", "code_style": "PEP8"}
    )

    # Test free user
    free_messages = builder.build_messages(
        free_user,
        "How do I create a list in Python?"
    )
    print("=== Free User System Prompt ===")
    print(free_messages[0]["content"])

    # Test premium user
    premium_messages = builder.build_messages(
        premium_user,
        "How do I create a list in Python?",
        conversation_history=[
            {"role": "user", "content": "Hi!"},
            {"role": "assistant", "content": "Hello Bob! How can I help?"}
        ]
    )
    print("\n=== Premium User System Prompt ===")
    print(premium_messages[0]["content"])
    print(f"\nTotal messages: {len(premium_messages)}")
```

### Task 2.2: RAG Context Injection

Build a function that injects retrieved documents into prompts:

```python
def build_rag_prompt(
    question: str,
    documents: List[Dict[str, str]],  # {"content": str, "source": str, "score": float}
    max_context_tokens: int = 2000
) -> str:
    """
    Build a RAG prompt with document context.

    TODO: Complete the implementation with:
    1. Sort documents by relevance score
    2. Include documents until token limit
    3. Format with source citations
    4. Include instructions for the model
    """

    # Sort documents by score (highest first)
    sorted_docs = _______________

    # Build context section
    context_parts = []
    estimated_tokens = 0

    for i, doc in enumerate(sorted_docs):
        # Estimate tokens (rough: 1 token ≈ 4 chars)
        doc_tokens = len(doc["content"]) // 4

        if estimated_tokens + doc_tokens > max_context_tokens:
            break

        # TODO: Format document with source citation
        formatted_doc = _______________
        context_parts.append(formatted_doc)
        estimated_tokens += doc_tokens

    context_section = "\n\n---\n\n".join(context_parts)

    # Build complete prompt
    prompt = f"""Answer the question based on the following context documents.
If the answer isn't in the context, say "I don't have information about that."
Cite your sources using [Source N] notation.

## Context Documents

{context_section}

## Question

{question}

## Answer (with citations)"""

    return prompt


# Test RAG prompt building
test_docs = [
    {"content": "Python lists are ordered, mutable sequences...", "source": "Python Docs", "score": 0.95},
    {"content": "Lists can contain any type of object...", "source": "Tutorial Site", "score": 0.87},
    {"content": "Use square brackets to create a list...", "source": "Learn Python", "score": 0.92}
]

prompt = build_rag_prompt("How do I create a Python list?", test_docs)
print(prompt)
```

---

## Part 3: Structured Output Parsing (35 minutes)

### Task 3.1: Build a Robust JSON Parser

```python
# json_parser.py
import json
import re
from typing import TypeVar, Type, Optional
from pydantic import BaseModel, ValidationError

T = TypeVar('T', bound=BaseModel)

class ParsingError(Exception):
    """Custom exception for parsing failures."""
    def __init__(self, message: str, raw_content: str, attempts: int):
        self.message = message
        self.raw_content = raw_content
        self.attempts = attempts
        super().__init__(message)


def extract_json_from_text(text: str) -> str:
    """
    Extract JSON from text that might contain markdown or other content.

    TODO: Handle these cases:
    1. Pure JSON
    2. JSON in ```json code blocks
    3. JSON in ``` code blocks (no language)
    4. JSON mixed with explanation text
    """

    text = text.strip()

    # Case 1: Already valid JSON
    if text.startswith('{') or text.startswith('['):
        return text

    # Case 2 & 3: Extract from code blocks
    # TODO: Use regex to extract content between ``` markers
    code_block_pattern = _______________
    match = re.search(code_block_pattern, text, re.DOTALL)
    if match:
        return match.group(1).strip()

    # Case 4: Find JSON object in mixed text
    # Look for content between { and }
    # TODO: Find the outermost { } pair
    _______________

    return text


def parse_llm_json(
    content: str,
    model: Type[T],
    fix_common_errors: bool = True
) -> T:
    """
    Parse LLM output as JSON and validate against a Pydantic model.

    Args:
        content: Raw LLM output
        model: Pydantic model class for validation
        fix_common_errors: Attempt to fix common JSON issues

    Returns:
        Validated Pydantic model instance

    Raises:
        ParsingError: If parsing fails after all attempts
    """

    # Extract JSON from potentially mixed content
    json_str = extract_json_from_text(content)

    if fix_common_errors:
        # Fix trailing commas
        json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)

        # Fix single quotes (LLMs sometimes use them)
        # Be careful not to break strings with apostrophes
        # TODO: Implement careful single quote replacement
        _______________

    try:
        data = json.loads(json_str)
        return model(**data)
    except json.JSONDecodeError as e:
        raise ParsingError(f"Invalid JSON: {e}", content, 1)
    except ValidationError as e:
        raise ParsingError(f"Validation failed: {e}", content, 1)


# Test models
class ProductReview(BaseModel):
    product_name: str
    rating: int  # 1-5
    pros: list[str]
    cons: list[str]
    summary: str
    recommend: bool


class ExtractedEntity(BaseModel):
    name: str
    type: str  # "person", "organization", "location"
    confidence: float


class EntityExtraction(BaseModel):
    entities: list[ExtractedEntity]
    text_analyzed: str


# Test the parser with various inputs
test_inputs = [
    # Clean JSON
    '{"product_name": "Widget", "rating": 4, "pros": ["durable"], "cons": ["expensive"], "summary": "Good", "recommend": true}',

    # JSON in code block
    '''```json
{"product_name": "Widget", "rating": 4, "pros": ["durable"], "cons": ["expensive"], "summary": "Good", "recommend": true}
```''',

    # JSON with explanation
    '''Here's the analysis:
{"product_name": "Widget", "rating": 4, "pros": ["durable"], "cons": ["expensive"], "summary": "Good", "recommend": true}
Let me know if you need more details.''',
]

for i, test_input in enumerate(test_inputs):
    try:
        result = parse_llm_json(test_input, ProductReview)
        print(f"Test {i+1}: SUCCESS - {result.product_name}, rating={result.rating}")
    except ParsingError as e:
        print(f"Test {i+1}: FAILED - {e.message}")
```

### Task 3.2: Implement Retry with Feedback

```python
def get_structured_output_with_retry(
    client,
    messages: list,
    model_class: Type[T],
    max_retries: int = 2,
    model: str = "gpt-4o"
) -> T:
    """
    Get structured output with automatic retry on parsing failure.

    On failure, send the error back to the model for correction.

    TODO: Complete the implementation
    """

    # Add format instruction
    schema = model_class.model_json_schema()
    format_instruction = {
        "role": "user",
        "content": f"Respond with valid JSON matching this schema:\n{json.dumps(schema, indent=2)}\n\nJSON only, no other text."
    }

    working_messages = messages + [format_instruction]

    for attempt in range(max_retries + 1):
        response = client.chat.completions.create(
            model=model,
            messages=working_messages,
            temperature=0
        )

        content = response.choices[0].message.content

        try:
            return parse_llm_json(content, model_class)

        except ParsingError as e:
            if attempt == max_retries:
                raise

            # TODO: Add the failed response and error feedback
            # to working_messages for the next attempt
            working_messages.append(_______________) # Assistant's response
            working_messages.append({
                "role": "user",
                "content": f"That wasn't valid. Error: {e.message}\n\nPlease respond with ONLY valid JSON, no explanations."
            })

    raise ParsingError("Max retries exceeded", content, max_retries + 1)
```

---

## Part 4: Function Calling Implementation (40 minutes)

### Task 4.1: Define Tool Schemas

Create tool definitions for a personal assistant that can:
- Check weather
- Create calendar events
- Send emails
- Search the web

```python
# tools.py
from typing import List, Dict, Any

def get_assistant_tools() -> List[Dict[str, Any]]:
    """
    Define tools for a personal assistant.

    TODO: Complete the tool definitions
    """

    return [
        {
            "type": "function",
            "function": {
                "name": "get_weather",
                "description": "Get current weather and forecast for a location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "City name or coordinates (e.g., 'London' or '51.5,-0.1')"
                        },
                        "days": {
                            "type": "integer",
                            "description": "Number of forecast days (1-7)",
                            "default": 1
                        }
                    },
                    "required": ["location"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "create_calendar_event",
                "description": "Create a new calendar event",
                "parameters": {
                    # TODO: Define parameters for:
                    # - title (required)
                    # - start_time (required, ISO format)
                    # - end_time (optional)
                    # - description (optional)
                    # - attendees (optional, array of emails)
                    "type": "object",
                    "properties": {
                        _______________
                    },
                    "required": ["title", "start_time"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "send_email",
                "description": "Send an email to one or more recipients",
                "parameters": {
                    # TODO: Define parameters for:
                    # - to (required, array of emails)
                    # - subject (required)
                    # - body (required)
                    # - cc (optional)
                    # - urgent (optional boolean)
                    "type": "object",
                    "properties": {
                        _______________
                    },
                    "required": ["to", "subject", "body"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "web_search",
                "description": "Search the web for information",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {
                            "type": "string",
                            "description": "Search query"
                        },
                        "num_results": {
                            "type": "integer",
                            "description": "Number of results to return",
                            "default": 5
                        }
                    },
                    "required": ["query"]
                }
            }
        }
    ]
```

### Task 4.2: Build a Tool Execution Engine

```python
# tool_executor.py
import json
from typing import Dict, Any, Callable, Optional
from dataclasses import dataclass

@dataclass
class ToolResult:
    success: bool
    data: Any
    error: Optional[str] = None


class ToolExecutor:
    """
    Executes tool calls from LLM responses.

    TODO: Complete the implementation
    """

    def __init__(self):
        self.tools: Dict[str, Callable] = {}

    def register(self, name: str, handler: Callable):
        """Register a tool handler."""
        self.tools[name] = handler

    def execute(self, tool_name: str, arguments: Dict[str, Any]) -> ToolResult:
        """
        Execute a tool with given arguments.

        Returns ToolResult with success status and data/error.
        """
        if tool_name not in self.tools:
            return ToolResult(
                success=False,
                data=None,
                error=f"Unknown tool: {tool_name}"
            )

        try:
            result = self.tools[tool_name](**arguments)
            return ToolResult(success=True, data=result)
        except Exception as e:
            return ToolResult(success=False, data=None, error=str(e))

    def process_tool_calls(self, tool_calls: list) -> list:
        """
        Process multiple tool calls and return results formatted for the API.

        TODO: Complete the implementation
        """
        results = []

        for tool_call in tool_calls:
            # TODO: Extract tool name and arguments
            name = _______________
            arguments = _______________

            # Execute the tool
            result = self.execute(name, arguments)

            # Format result for API
            results.append({
                "tool_call_id": tool_call.id,
                "role": "tool",
                "content": json.dumps(
                    result.data if result.success else {"error": result.error}
                )
            })

        return results


# Mock tool implementations
def get_weather(location: str, days: int = 1) -> Dict:
    """Mock weather API."""
    return {
        "location": location,
        "current": {"temp": 22, "conditions": "Partly cloudy"},
        "forecast": [{"day": i+1, "high": 24, "low": 18} for i in range(days)]
    }

def create_calendar_event(
    title: str,
    start_time: str,
    end_time: Optional[str] = None,
    description: str = "",
    attendees: Optional[list] = None
) -> Dict:
    """Mock calendar API."""
    return {
        "event_id": "evt_123456",
        "title": title,
        "start": start_time,
        "status": "created"
    }

def send_email(
    to: list,
    subject: str,
    body: str,
    cc: Optional[list] = None,
    urgent: bool = False
) -> Dict:
    """Mock email API."""
    return {
        "message_id": "msg_789",
        "recipients": len(to),
        "status": "sent"
    }

def web_search(query: str, num_results: int = 5) -> Dict:
    """Mock search API."""
    return {
        "query": query,
        "results": [
            {"title": f"Result {i+1}", "url": f"https://example.com/{i}"}
            for i in range(num_results)
        ]
    }


# Set up executor
executor = ToolExecutor()
executor.register("get_weather", get_weather)
executor.register("create_calendar_event", create_calendar_event)
executor.register("send_email", send_email)
executor.register("web_search", web_search)

# Test
result = executor.execute("get_weather", {"location": "Tokyo", "days": 3})
print(f"Weather result: {result}")
```

### Task 4.3: Complete Agentic Loop

```python
# agent.py
from openai import OpenAI

def run_agent(
    client: OpenAI,
    user_message: str,
    tools: list,
    executor: ToolExecutor,
    system_prompt: str = "You are a helpful personal assistant.",
    max_iterations: int = 5
) -> str:
    """
    Run an agent that can use tools to complete tasks.

    TODO: Complete the implementation
    """

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    for iteration in range(max_iterations):
        # Call the model
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto"
        )

        assistant_message = response.choices[0].message

        # If no tool calls, return the response
        if not assistant_message.tool_calls:
            return assistant_message.content

        # TODO: Add assistant message to history
        messages.append(_______________)

        # TODO: Process tool calls and add results to messages
        tool_results = executor.process_tool_calls(assistant_message.tool_calls)
        _______________

        print(f"Iteration {iteration + 1}: Executed {len(tool_results)} tool(s)")

    return "Max iterations reached. Please try a simpler request."


# Test the agent
if __name__ == "__main__":
    from dotenv import load_dotenv
    import os

    load_dotenv()
    client = OpenAI()
    tools = get_assistant_tools()

    # Test various requests
    test_requests = [
        "What's the weather in Paris?",
        "Schedule a meeting called 'Team Sync' for tomorrow at 2pm",
        "What's the weather in London and create a reminder to pack an umbrella for tomorrow at 8am"
    ]

    for request in test_requests:
        print(f"\n{'='*50}")
        print(f"Request: {request}")
        print(f"{'='*50}")
        result = run_agent(client, request, tools, executor)
        print(f"Response: {result}")
```

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| System Prompt Design | 20 | Complete, handles edge cases, clear structure |
| Dynamic Prompt Builder | 20 | Context injection works, tier-appropriate responses |
| JSON Parser | 20 | Handles all test cases, robust error handling |
| Tool Definitions | 15 | Complete schemas, correct types |
| Agentic Loop | 25 | Full loop works, handles multi-tool requests |
| **Total** | **100** | |

---

## Submission Checklist

- [ ] System prompts tested with all scenarios
- [ ] Dynamic prompt builder handles all tiers
- [ ] JSON parser extracts from various formats
- [ ] All 4 tools properly defined
- [ ] Agent completes multi-step tasks

---

*Exercise 3 of 12 | Building AI-Powered Applications | Duration: 2.5 hours*
