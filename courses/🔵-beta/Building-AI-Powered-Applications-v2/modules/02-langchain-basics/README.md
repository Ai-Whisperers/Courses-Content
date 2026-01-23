# Module 2: Building with LangChain

## Learning Objectives

By the end of this module, you will be able to:

1. Understand LangChain architecture and core components
2. Build chains for sequential AI processing
3. Use prompt templates for reusable and dynamic prompts
4. Implement conversation memory for context-aware applications
5. Parse and validate LLM outputs with output parsers
6. Apply LangChain patterns to real-world use cases

---

## Prerequisites

- Module 1 completed (AI Integration Fundamentals)
- OpenAI API key configured
- Python 3.9+ environment ready
- Basic understanding of object-oriented programming

**Estimated Time:** 6-8 hours

---

## 1. What is LangChain?

### Overview

LangChain is a powerful framework for developing applications powered by language models. While you can build AI applications with direct API calls (as we learned in Module 1), LangChain provides higher-level abstractions that make it easier to build complex, production-ready applications.

**Key Insight:** LangChain doesn't replace the OpenAI SDK—it builds on top of it, providing patterns and tools for common AI application needs.

### Why Use LangChain?

**Without LangChain (Direct API):**
```python
# Managing conversation manually
conversation_history = []

def chat(user_message):
    conversation_history.append({"role": "user", "content": user_message})
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation_history
    )
    
    ai_message = response.choices[0].message.content
    conversation_history.append({"role": "assistant", "content": ai_message})
    
    return ai_message
```

**With LangChain:**
```python
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# Automatic conversation management
chat = ChatOpenAI()
memory = ConversationBufferMemory()
conversation = ConversationChain(llm=chat, memory=memory)

response = conversation.predict(input="Hello!")
```

### Core Benefits

1. **Abstraction:** High-level components for common patterns
2. **Composability:** Chain multiple operations together
3. **Memory Management:** Built-in conversation memory
4. **Multi-provider:** Support for OpenAI, Anthropic, Cohere, etc.
5. **Rich Ecosystem:** Tools, agents, vector stores, and more
6. **Production Ready:** Error handling, logging, callbacks

---

## 2. LangChain Architecture

### Core Components

LangChain is built around several key abstractions:

```
┌─────────────────────────────────────────┐
│         LangChain Application           │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────┐  │
│  │  Models  │  │  Prompts │  │Memory│  │
│  └────┬─────┘  └────┬─────┘  └───┬──┘  │
│       │             │            │     │
│  ┌────▼─────────────▼────────────▼──┐  │
│  │          Chains                  │  │
│  └────┬─────────────────────────────┘  │
│       │                                │
│  ┌────▼─────────────────────────────┐  │
│  │       Agents & Tools             │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

#### 2.1 Models (LLMs and Chat Models)

**Language Models (LLMs):** Text in, text out
```python
from langchain.llms import OpenAI

llm = OpenAI(temperature=0.7)
response = llm("What is Python?")
```

**Chat Models:** Messages in, message out
```python
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

chat = ChatOpenAI()
messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="What is Python?")
]
response = chat(messages)
```

**Key Difference:**
- LLMs are for simple text completion
- Chat models are for conversational interfaces (preferred for most use cases)

#### 2.2 Prompts

Prompts define how you communicate with the model.

**Simple Prompt:**
```python
from langchain.prompts import PromptTemplate

template = "Tell me a {adjective} joke about {topic}."
prompt = PromptTemplate(
    input_variables=["adjective", "topic"],
    template=template
)

formatted = prompt.format(adjective="funny", topic="programmers")
# "Tell me a funny joke about programmers."
```

**Chat Prompt:**
```python
from langchain.prompts import ChatPromptTemplate

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful {role}."),
    ("user", "{user_input}")
])

messages = chat_prompt.format_messages(
    role="coding assistant",
    user_input="How do I declare a variable in Python?"
)
```

#### 2.3 Chains

Chains combine models, prompts, and logic into reusable pipelines.

```python
from langchain.chains import LLMChain

# Create a chain
chain = LLMChain(llm=llm, prompt=prompt)

# Run the chain
result = chain.run(adjective="funny", topic="programmers")
```

#### 2.4 Memory

Memory allows chains to remember previous interactions.

```python
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
memory.save_context({"input": "Hi"}, {"output": "Hello! How can I help?"})
memory.save_context({"input": "My name is Alex"}, {"output": "Nice to meet you, Alex!"})

# Retrieve conversation history
print(memory.load_memory_variables({}))
```

---

## 3. Working with Models

### 3.1 Initializing Models

**Basic Initialization:**
```python
from langchain.chat_models import ChatOpenAI

# Using default settings
chat = ChatOpenAI()

# With custom parameters
chat = ChatOpenAI(
    model_name="gpt-4",
    temperature=0.7,
    max_tokens=500,
    model_kwargs={"top_p": 0.9}
)
```

**Using Environment Variables:**
```python
import os
from dotenv import load_dotenv

load_dotenv()

# API key loaded from OPENAI_API_KEY env var automatically
chat = ChatOpenAI()
```

### 3.2 Model Parameters

**Temperature:** Controls randomness (0.0 - 2.0)
- **0.0:** Deterministic, focused, consistent
- **0.7:** Balanced (default for most use cases)
- **1.0+:** Creative, varied, unpredictable

```python
# For factual tasks
chat_factual = ChatOpenAI(temperature=0.0)

# For creative tasks
chat_creative = ChatOpenAI(temperature=1.2)
```

**Max Tokens:** Limits response length
```python
chat = ChatOpenAI(max_tokens=100)  # Short responses
```

**Model Selection:**
```python
# Fast and cost-effective
chat_fast = ChatOpenAI(model_name="gpt-3.5-turbo")

# More capable
chat_smart = ChatOpenAI(model_name="gpt-4")

# Latest turbo model
chat_latest = ChatOpenAI(model_name="gpt-4-turbo-preview")
```

### 3.3 Making Predictions

**Simple Prediction:**
```python
response = chat.predict("What is the capital of France?")
print(response)  # "The capital of France is Paris."
```

**With Messages:**
```python
from langchain.schema import HumanMessage, SystemMessage, AIMessage

messages = [
    SystemMessage(content="You are a concise assistant."),
    HumanMessage(content="Explain Python in one sentence.")
]

response = chat(messages)
print(response.content)
```

**Multi-turn Conversation:**
```python
messages = [
    SystemMessage(content="You are a helpful coding assistant."),
    HumanMessage(content="How do I create a list in Python?"),
    AIMessage(content="You can create a list using square brackets: my_list = [1, 2, 3]"),
    HumanMessage(content="How do I add an item to it?")
]

response = chat(messages)
print(response.content)  # "You can use the append() method..."
```

### 3.4 Streaming Responses

For long responses, stream tokens as they're generated:

```python
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

chat = ChatOpenAI(
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()]
)

response = chat.predict("Write a short story about a robot.")
# Tokens printed as they're generated
```

**Custom Streaming:**
```python
from langchain.callbacks.base import BaseCallbackHandler

class CustomHandler(BaseCallbackHandler):
    def on_llm_new_token(self, token: str, **kwargs):
        print(f"New token: {token}", end="", flush=True)

chat = ChatOpenAI(streaming=True, callbacks=[CustomHandler()])
response = chat.predict("Tell me a joke")
```

---

## 4. Prompt Templates

### 4.1 Why Use Templates?

Templates make prompts:
- **Reusable:** Define once, use many times
- **Dynamic:** Insert variables programmatically
- **Maintainable:** Update logic in one place
- **Type-safe:** Validation of required variables

### 4.2 Basic Templates

**String Templates:**
```python
from langchain.prompts import PromptTemplate

template = """
You are a {role} assistant.

Question: {question}

Provide a {style} answer.
"""

prompt = PromptTemplate(
    input_variables=["role", "question", "style"],
    template=template
)

# Format the prompt
formatted = prompt.format(
    role="Python programming",
    question="What are decorators?",
    style="beginner-friendly"
)
```

**f-string Templates:**
```python
prompt = PromptTemplate.from_template(
    "Translate this {language_from} text to {language_to}: {text}"
)

formatted = prompt.format(
    language_from="English",
    language_to="Spanish",
    text="Hello, how are you?"
)
```

### 4.3 Chat Prompt Templates

For conversational applications:

```python
from langchain.prompts import ChatPromptTemplate

chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert {domain} consultant."),
    ("human", "I need help with {problem}."),
    ("ai", "I understand you need help with {problem}. What specifically would you like to know?"),
    ("human", "{follow_up}")
])

messages = chat_prompt.format_messages(
    domain="software architecture",
    problem="microservices design",
    follow_up="What's the best way to handle inter-service communication?"
)
```

**Shorthand:**
```python
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {role}."),
    ("user", "{input}")
])
```

### 4.4 Few-Shot Prompts

Include examples to guide the model:

```python
from langchain.prompts import FewShotPromptTemplate

examples = [
    {"input": "happy", "output": "sad"},
    {"input": "tall", "output": "short"},
    {"input": "hot", "output": "cold"}
]

example_template = """
Input: {input}
Output: {output}
"""

example_prompt = PromptTemplate(
    input_variables=["input", "output"],
    template=example_template
)

few_shot_prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Give the antonym of the word.",
    suffix="Input: {word}\nOutput:",
    input_variables=["word"]
)

formatted = few_shot_prompt.format(word="big")
# Includes all examples + the new word
```

### 4.5 Partial Prompts

Fill in some variables ahead of time:

```python
prompt = PromptTemplate(
    template="Tell me a {adjective} joke about {topic}.",
    input_variables=["adjective", "topic"]
)

# Partially fill the template
partial_prompt = prompt.partial(adjective="funny")

# Only need to provide 'topic' now
formatted = partial_prompt.format(topic="programmers")
```

**Dynamic Defaults:**
```python
from datetime import datetime

def get_current_date():
    return datetime.now().strftime("%Y-%m-%d")

prompt = PromptTemplate(
    template="Today is {date}. {query}",
    input_variables=["query"],
    partial_variables={"date": get_current_date}
)

# Date automatically filled
formatted = prompt.format(query="What's the weather?")
```

---

## 5. Chains: Sequential Processing

### 5.1 Understanding Chains

Chains link multiple components together in a sequence:

```
Input → Prompt → Model → Output Parser → Final Result
```

### 5.2 LLMChain - The Foundation

The most basic chain combines a prompt with a model:

```python
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

llm = ChatOpenAI()
prompt = PromptTemplate(
    input_variables=["topic"],
    template="Write a haiku about {topic}"
)

chain = LLMChain(llm=llm, prompt=prompt)

# Run the chain
result = chain.run(topic="programming")
print(result)
```

**With Multiple Variables:**
```python
prompt = PromptTemplate(
    input_variables=["adjective", "subject"],
    template="Write a {adjective} poem about {subject}"
)

chain = LLMChain(llm=llm, prompt=prompt)
result = chain.run(adjective="melancholic", subject="autumn leaves")
```

### 5.3 Sequential Chains

Chain multiple steps together:

**SimpleSequentialChain:** One input, one output per step
```python
from langchain.chains import SimpleSequentialChain

# First chain: Generate a topic
chain_one = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["interest"],
        template="Suggest a blog post topic about {interest}"
    )
)

# Second chain: Generate an outline
chain_two = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["topic"],
        template="Create an outline for this blog post: {topic}"
    )
)

# Combine chains
overall_chain = SimpleSequentialChain(
    chains=[chain_one, chain_two],
    verbose=True
)

result = overall_chain.run("artificial intelligence")
```

**SequentialChain:** Multiple inputs/outputs
```python
from langchain.chains import SequentialChain

# Chain 1: Generate title
title_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["topic"],
        template="Create a catchy title for an article about {topic}"
    ),
    output_key="title"
)

# Chain 2: Generate introduction using title
intro_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["title", "topic"],
        template="Write an introduction for an article titled '{title}' about {topic}"
    ),
    output_key="introduction"
)

# Chain 3: Generate conclusion
conclusion_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["title", "introduction"],
        template="Write a conclusion for an article titled '{title}' with this intro: {introduction}"
    ),
    output_key="conclusion"
)

overall_chain = SequentialChain(
    chains=[title_chain, intro_chain, conclusion_chain],
    input_variables=["topic"],
    output_variables=["title", "introduction", "conclusion"],
    verbose=True
)

result = overall_chain({"topic": "machine learning"})
print(result["title"])
print(result["introduction"])
print(result["conclusion"])
```

### 5.4 Transform Chains

Apply custom logic between LLM calls:

```python
from langchain.chains import TransformChain

def transform_text(inputs: dict) -> dict:
    text = inputs["text"]
    # Custom transformation
    transformed = text.upper().strip()
    return {"transformed_text": transformed}

transform_chain = TransformChain(
    input_variables=["text"],
    output_variables=["transformed_text"],
    transform=transform_text
)

llm_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        input_variables=["transformed_text"],
        template="Analyze this text: {transformed_text}"
    )
)

# Combine
overall_chain = SimpleSequentialChain(
    chains=[transform_chain, llm_chain]
)
```

### 5.5 Router Chains

Route inputs to different chains based on conditions:

```python
from langchain.chains.router import MultiPromptChain
from langchain.chains.router.llm_router import LLMRouterChain, RouterOutputParser
from langchain.prompts import PromptTemplate

# Define specialized chains
python_prompt = PromptTemplate(
    template="You are a Python expert. {input}",
    input_variables=["input"]
)

javascript_prompt = PromptTemplate(
    template="You are a JavaScript expert. {input}",
    input_variables=["input"]
)

prompt_infos = [
    {
        "name": "python",
        "description": "Good for questions about Python",
        "prompt_template": python_prompt.template
    },
    {
        "name": "javascript",
        "description": "Good for questions about JavaScript",
        "prompt_template": javascript_prompt.template
    }
]

# The router will automatically choose which chain to use
destination_chains = {}
for p_info in prompt_infos:
    name = p_info["name"]
    prompt = PromptTemplate(
        template=p_info["prompt_template"],
        input_variables=["input"]
    )
    chain = LLMChain(llm=llm, prompt=prompt)
    destination_chains[name] = chain

default_chain = LLMChain(
    llm=llm,
    prompt=PromptTemplate(
        template="Answer this general question: {input}",
        input_variables=["input"]
    )
)
```

---

## 6. Conversation Memory

### 6.1 Why Memory Matters

Without memory, each interaction is isolated:
```python
# No memory - AI doesn't remember
chat.predict("My name is Alice")  # "Nice to meet you, Alice"
chat.predict("What's my name?")   # "I don't know your name"
```

With memory, context persists:
```python
# With memory
conversation.predict(input="My name is Alice")  # "Nice to meet you, Alice"
conversation.predict(input="What's my name?")   # "Your name is Alice"
```

### 6.2 ConversationBufferMemory

Stores entire conversation history:

```python
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=ChatOpenAI(),
    memory=memory,
    verbose=True
)

conversation.predict(input="Hi, I'm learning Python")
conversation.predict(input="What was I learning?")
# AI remembers: "You mentioned you're learning Python"
```

**Manual Memory Management:**
```python
memory = ConversationBufferMemory()

# Save exchanges
memory.save_context(
    {"input": "My favorite color is blue"},
    {"output": "That's great! Blue is a lovely color."}
)

memory.save_context(
    {"input": "What's my favorite color?"},
    {"output": "Your favorite color is blue."}
)

# Load history
print(memory.load_memory_variables({}))
```

### 6.3 ConversationBufferWindowMemory

Keep only the last N exchanges (prevents context overflow):

```python
from langchain.memory import ConversationBufferWindowMemory

# Remember only last 3 exchanges
memory = ConversationBufferWindowMemory(k=3)

conversation = ConversationChain(
    llm=ChatOpenAI(),
    memory=memory
)

# After 3 exchanges, earliest ones are forgotten
for i in range(5):
    conversation.predict(input=f"Message {i}")

# Only last 3 remembered
```

**Use Case:** Long-running conversations where full history isn't needed.

### 6.4 ConversationSummaryMemory

Summarize old messages to save tokens:

```python
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(llm=ChatOpenAI())
conversation = ConversationChain(
    llm=ChatOpenAI(),
    memory=memory,
    verbose=True
)

# As conversation grows, old messages are summarized
conversation.predict(input="Tell me about yourself")
conversation.predict(input="What can you help me with?")
# Memory now contains summary instead of full history
```

**Trade-off:**
- Saves tokens (cost)
- Loses some detail
- Adds summary generation cost

### 6.5 ConversationSummaryBufferMemory

Hybrid approach - keep recent messages, summarize old ones:

```python
from langchain.memory import ConversationSummaryBufferMemory

memory = ConversationSummaryBufferMemory(
    llm=ChatOpenAI(),
    max_token_limit=500  # When to start summarizing
)

conversation = ConversationChain(
    llm=ChatOpenAI(),
    memory=memory
)

# Recent messages: full text
# Older messages: summarized
```

**Best of Both Worlds:**
- Recent context preserved
- Old context summarized
- Token usage controlled

### 6.6 Custom Memory

Implement your own memory logic:

```python
from langchain.memory import BaseChatMemory
from langchain.schema import BaseMessage

class CustomMemory(BaseChatMemory):
    """Only remember messages containing specific keywords"""
    
    keywords: list = ["important", "remember", "key"]
    
    def save_context(self, inputs, outputs):
        # Only save if contains keywords
        user_msg = inputs.get("input", "")
        if any(kw in user_msg.lower() for kw in self.keywords):
            super().save_context(inputs, outputs)
    
    @property
    def memory_variables(self):
        return ["history"]
    
    def load_memory_variables(self, inputs):
        return {"history": self.chat_memory.messages}
```

---

## 7. Output Parsers

### 7.1 Why Parse Outputs?

LLMs return unstructured text. Parsers extract structured data:

**Without Parser:**
```python
response = chat.predict("List 3 programming languages")
# "1. Python\n2. JavaScript\n3. Java"  (string)
```

**With Parser:**
```python
response = chain_with_parser.run("List 3 programming languages")
# ["Python", "JavaScript", "Java"]  (list)
```

### 7.2 CommaSeparatedListOutputParser

Parse comma-separated values:

```python
from langchain.output_parsers import CommaSeparatedListOutputParser

parser = CommaSeparatedListOutputParser()

# Get format instructions
format_instructions = parser.get_format_instructions()
# "Your response should be a list of comma separated values, eg: `foo, bar, baz`"

prompt = PromptTemplate(
    template="List 5 {subject}.\n{format_instructions}",
    input_variables=["subject"],
    partial_variables={"format_instructions": format_instructions}
)

chain = LLMChain(llm=ChatOpenAI(), prompt=prompt)
response = chain.run(subject="popular cities")

# Parse the response
parsed = parser.parse(response)
print(parsed)  # ['New York', 'London', 'Tokyo', 'Paris', 'Sydney']
print(type(parsed))  # <class 'list'>
```

### 7.3 StructuredOutputParser

Parse into structured dictionaries:

```python
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

# Define expected structure
response_schemas = [
    ResponseSchema(name="name", description="The person's name"),
    ResponseSchema(name="age", description="The person's age"),
    ResponseSchema(name="occupation", description="The person's job")
]

parser = StructuredOutputParser.from_response_schemas(response_schemas)

prompt = PromptTemplate(
    template="Generate a fictional character.\n{format_instructions}",
    input_variables=[],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

chain = LLMChain(llm=ChatOpenAI(), prompt=prompt)
response = chain.run({})

parsed = parser.parse(response)
print(parsed)
# {'name': 'John Doe', 'age': '35', 'occupation': 'Software Engineer'}
print(parsed["name"])  # "John Doe"
```

### 7.4 Pydantic Output Parser

Use Pydantic models for type validation:

```python
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field, validator

class Person(BaseModel):
    name: str = Field(description="The person's full name")
    age: int = Field(description="The person's age in years")
    email: str = Field(description="The person's email address")
    
    @validator("age")
    def age_must_be_positive(cls, v):
        if v < 0:
            raise ValueError("Age must be positive")
        return v

parser = PydanticOutputParser(pydantic_object=Person)

prompt = PromptTemplate(
    template="Generate a fictional person.\n{format_instructions}",
    input_variables=[],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

chain = LLMChain(llm=ChatOpenAI(), prompt=prompt)
response = chain.run({})

# Parse and validate
person = parser.parse(response)
print(person.name)  # Type-safe access
print(person.age)   # Validated integer
print(person.email)
```

### 7.5 JSON Output Parser

Parse JSON responses:

```python
from langchain.output_parsers import SimpleJsonOutputParser

parser = SimpleJsonOutputParser()

prompt = PromptTemplate(
    template="""
    Return a JSON object with book information:
    - title: "The Great Gatsby"
    - author: "F. Scott Fitzgerald"
    - year: 1925
    
    {format_instructions}
    """,
    input_variables=[],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

chain = LLMChain(llm=ChatOpenAI(), prompt=prompt)
response = chain.run({})

parsed = parser.parse(response)
print(parsed["title"])  # "The Great Gatsby"
print(type(parsed))     # <class 'dict'>
```

### 7.6 Custom Output Parser

Create domain-specific parsers:

```python
from langchain.schema import BaseOutputParser

class EmailExtractorParser(BaseOutputParser):
    """Extract email addresses from text"""
    
    def parse(self, text: str):
        import re
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        return emails
    
    def get_format_instructions(self):
        return "Include email addresses in your response."

parser = EmailExtractorParser()

prompt = PromptTemplate(
    template="Generate 3 fictional employee profiles.\n{format_instructions}",
    input_variables=[],
    partial_variables={"format_instructions": parser.get_format_instructions()}
)

chain = LLMChain(llm=ChatOpenAI(), prompt=prompt)
response = chain.run({})

emails = parser.parse(response)
print(emails)  # ['john@example.com', 'jane@company.com', ...]
```

---

## 8. Practical Patterns

### 8.1 Chatbot with Memory

```python
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferWindowMemory

def create_chatbot():
    llm = ChatOpenAI(temperature=0.7)
    memory = ConversationBufferWindowMemory(k=5)
    
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=False
    )
    
    return conversation

# Usage
chatbot = create_chatbot()

while True:
    user_input = input("You: ")
    if user_input.lower() in ['quit', 'exit']:
        break
    
    response = chatbot.predict(input=user_input)
    print(f"Bot: {response}")
```

### 8.2 Template-Based Content Generator

```python
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI

class ContentGenerator:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0.8)
        
    def generate_blog_post(self, topic, tone, length):
        prompt = PromptTemplate(
            input_variables=["topic", "tone", "length"],
            template="""
            Write a {length} blog post about {topic}.
            Use a {tone} tone.
            Include an introduction, main points, and conclusion.
            """
        )
        
        chain = LLMChain(llm=self.llm, prompt=prompt)
        return chain.run(topic=topic, tone=tone, length=length)
    
    def generate_social_media_post(self, topic, platform):
        prompt = PromptTemplate(
            input_variables=["topic", "platform"],
            template="""
            Create a {platform} post about {topic}.
            Make it engaging and platform-appropriate.
            Include relevant hashtags.
            """
        )
        
        chain = LLMChain(llm=self.llm, prompt=prompt)
        return chain.run(topic=topic, platform=platform)

# Usage
generator = ContentGenerator()
blog = generator.generate_blog_post(
    topic="AI in healthcare",
    tone="professional",
    length="medium"
)
tweet = generator.generate_social_media_post(
    topic="new product launch",
    platform="Twitter"
)
```

### 8.3 Multi-Step Analysis Pipeline

```python
from langchain.chains import SequentialChain, LLMChain
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI

class TextAnalysisPipeline:
    def __init__(self):
        llm = ChatOpenAI()
        
        # Step 1: Sentiment analysis
        sentiment_chain = LLMChain(
            llm=llm,
            prompt=PromptTemplate(
                input_variables=["text"],
                template="Analyze the sentiment of this text (positive/negative/neutral): {text}"
            ),
            output_key="sentiment"
        )
        
        # Step 2: Key topics extraction
        topics_chain = LLMChain(
            llm=llm,
            prompt=PromptTemplate(
                input_variables=["text"],
                template="Extract 3-5 key topics from this text: {text}"
            ),
            output_key="topics"
        )
        
        # Step 3: Summary
        summary_chain = LLMChain(
            llm=llm,
            prompt=PromptTemplate(
                input_variables=["text", "sentiment", "topics"],
                template="""
                Summarize this text in 2-3 sentences:
                Text: {text}
                Sentiment: {sentiment}
                Topics: {topics}
                """
            ),
            output_key="summary"
        )
        
        self.pipeline = SequentialChain(
            chains=[sentiment_chain, topics_chain, summary_chain],
            input_variables=["text"],
            output_variables=["sentiment", "topics", "summary"],
            verbose=True
        )
    
    def analyze(self, text):
        return self.pipeline({"text": text})

# Usage
pipeline = TextAnalysisPipeline()
result = pipeline.analyze("""
    Our new product launch exceeded expectations!
    Sales were up 150% in the first week, and customer
    feedback has been overwhelmingly positive.
""")

print(f"Sentiment: {result['sentiment']}")
print(f"Topics: {result['topics']}")
print(f"Summary: {result['summary']}")
```

---

## Summary

In this module, you learned:

- **LangChain Architecture:** Models, prompts, chains, memory, parsers
- **Working with Models:** Configuration, parameters, predictions, streaming
- **Prompt Templates:** Reusable, dynamic prompts for various use cases
- **Chains:** Sequential processing, transformation, routing
- **Conversation Memory:** Buffer, window, summary, and custom implementations
- **Output Parsers:** Structured data extraction from LLM responses
- **Practical Patterns:** Chatbots, content generators, analysis pipelines

**Key Takeaways:**
1. LangChain provides high-level abstractions for common AI patterns
2. Prompt templates make prompts reusable and maintainable
3. Chains enable complex multi-step workflows
4. Memory is essential for conversational applications
5. Output parsers bridge unstructured LLM outputs to structured code
6. Combine components to build sophisticated applications

**Next Module:** Vector Databases & RAG - Building AI systems that understand your documents

---

## Additional Resources

**Official Documentation:**
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [LangChain API Reference](https://api.python.langchain.com/)
- [LangChain GitHub](https://github.com/langchain-ai/langchain)

**Component Guides:**
- [Models Guide](https://python.langchain.com/docs/modules/model_io/)
- [Prompts Guide](https://python.langchain.com/docs/modules/model_io/prompts/)
- [Memory Guide](https://python.langchain.com/docs/modules/memory/)
- [Chains Guide](https://python.langchain.com/docs/modules/chains/)

**Examples:**
- [LangChain Cookbook](https://github.com/langchain-ai/langchain/tree/master/cookbook)

---

*Module 2 of 6 | Building AI-Powered Applications | Duration: 6-8 hours*
