# Module 2: LangChain Basics - Hands-On Exercise

## Overview

**Duration:** 130 minutes  
**Difficulty:** Intermediate  
**Prerequisites:** Module 1 completed, OpenAI API key configured

In this exercise, you'll build a complete **AI-powered personal assistant** using LangChain. You'll implement:
- Prompt templates for reusable interactions
- Chains for multi-step processing
- Conversation memory for context awareness
- Output parsers for structured responses

By the end, you'll have a functional chatbot that remembers context and provides structured outputs.

---

## Learning Objectives

By completing this exercise, you will:

✅ Create and use prompt templates effectively  
✅ Build chains for sequential AI processing  
✅ Implement conversation memory  
✅ Parse structured data from LLM responses  
✅ Combine components into a complete application

---

## Setup

### 1. Environment Preparation

```bash
# Create project directory
mkdir langchain-assistant
cd langchain-assistant

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install langchain openai python-dotenv
```

### 2. Create Project Structure

```
langchain-assistant/
├── .env                  # API keys (DO NOT COMMIT)
├── assistant.py          # Main application
├── requirements.txt      # Dependencies
└── README.md            # Project documentation
```

### 3. Configure Environment

Create `.env` file:
```
OPENAI_API_KEY=your-api-key-here
```

Create `.gitignore`:
```
.env
venv/
__pycache__/
*.pyc
```

---

## Part 1: Build a Simple Chain (30 minutes)

### Goal
Create a basic LangChain chain that generates personalized content using prompt templates.

### Requirements

**1.1 Create a Text Summarizer**

Build a chain that:
- Takes a long text as input
- Takes a target length (short/medium/long)
- Returns a summary of appropriate length

**Expected behavior:**
```python
result = summarizer.run(
    text="[Long article about AI...]",
    length="short"
)
# Returns: "AI is transforming industries through..."
```

**1.2 Create a Language Translator**

Build a chain that:
- Takes source text and target language
- Returns translated text
- Includes a system message defining the assistant's role

**Expected behavior:**
```python
result = translator.run(
    text="Hello, how are you?",
    target_language="Spanish"
)
# Returns: "Hola, ¿cómo estás?"
```

**1.3 Create a Code Explainer**

Build a chain that:
- Takes code snippet and programming language
- Returns beginner-friendly explanation
- Includes what the code does and key concepts

**Expected behavior:**
```python
result = explainer.run(
    code="def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)",
    language="Python"
)
# Returns: "This is a recursive function that calculates..."
```

### Implementation Hints

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Initialize LLM
llm = ChatOpenAI(temperature=0.7)

# Create prompt template
prompt = PromptTemplate(
    input_variables=["variable1", "variable2"],
    template="Your template here with {variable1} and {variable2}"
)

# Create chain
chain = LLMChain(llm=llm, prompt=prompt)

# Run chain
result = chain.run(variable1="value1", variable2="value2")
```

### Testing

Test each chain with at least 2 different inputs to verify functionality.

**Deliverable:** `part1_chains.py` with three working chains

---

## Part 2: Template Integration (30 minutes)

### Goal
Create advanced prompt templates with few-shot examples and dynamic variables.

### Requirements

**2.1 Few-Shot Sentiment Analyzer**

Build a chain that classifies text sentiment using few-shot learning:

**Include these examples:**
- "I love this product!" → Positive
- "This is terrible." → Negative
- "It's okay, nothing special." → Neutral

**Expected behavior:**
```python
result = sentiment_analyzer.run("The service was outstanding!")
# Returns: "Positive"
```

**2.2 Dynamic Email Generator**

Create a template that generates emails with:
- Recipient name
- Email purpose (e.g., "meeting invitation", "follow-up", "thank you")
- Key points (list of strings)
- Tone (formal/casual)

**Expected behavior:**
```python
result = email_generator.run(
    recipient="Dr. Smith",
    purpose="meeting invitation",
    key_points=["Discuss Q3 results", "Review budget", "Plan next quarter"],
    tone="formal"
)
# Returns: Professional email with all points included
```

**2.3 Partial Template with Date**

Create a prompt template that:
- Includes current date automatically
- Takes a user query
- Provides context-aware responses

**Expected behavior:**
```python
result = date_aware_assistant.run(query="What should I do today?")
# Returns: "Today is January 17, 2026. Here are some suggestions..."
```

### Implementation Hints

**Few-Shot Example:**
```python
from langchain.prompts import FewShotPromptTemplate, PromptTemplate

examples = [
    {"input": "example1", "output": "result1"},
    {"input": "example2", "output": "result2"}
]

example_template = PromptTemplate(
    input_variables=["input", "output"],
    template="Input: {input}\nOutput: {output}"
)

few_shot_prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_template,
    prefix="Classify the sentiment:",
    suffix="Input: {text}\nOutput:",
    input_variables=["text"]
)
```

**Partial Variables:**
```python
from datetime import datetime

def get_date():
    return datetime.now().strftime("%Y-%m-%d")

prompt = PromptTemplate(
    template="Today is {date}. {query}",
    input_variables=["query"],
    partial_variables={"date": get_date}
)
```

### Testing

Test each template with edge cases (empty strings, long inputs, special characters).

**Deliverable:** `part2_templates.py` with three advanced templates

---

## Part 3: Add Conversation Memory (30 minutes)

### Goal
Implement different memory types and understand their trade-offs.

### Requirements

**3.1 Basic Chatbot with Buffer Memory**

Create a conversational chatbot that:
- Remembers entire conversation history
- Maintains context across multiple turns
- Has a defined personality (you choose)

**Expected behavior:**
```python
chatbot = create_chatbot()
chatbot.chat("My name is Alice")
# "Nice to meet you, Alice!"

chatbot.chat("What's my name?")
# "Your name is Alice."

chatbot.chat("What did we talk about?")
# "We talked about your name, Alice."
```

**3.2 Limited Memory Chatbot**

Create a chatbot that:
- Only remembers last 3 exchanges
- Tests memory limits explicitly
- Demonstrates forgetting old context

**Expected behavior:**
```python
limited_bot = create_limited_chatbot(memory_size=3)
# After 4 exchanges, first exchange is forgotten
```

**3.3 Summary Memory System**

Build a conversation system that:
- Summarizes old messages to save tokens
- Maintains recent messages in full
- Provides a method to view current memory state

**Expected behavior:**
```python
summary_bot = create_summary_chatbot()
summary_bot.chat("Tell me about Python")
# ... multiple exchanges ...
summary_bot.show_memory()
# Shows: Summary of old messages + recent full messages
```

### Implementation Hints

**Buffer Memory:**
```python
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

memory = ConversationBufferMemory()
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True  # Shows what's happening
)
```

**Window Memory:**
```python
from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=3)  # Last 3 exchanges
```

**Summary Memory:**
```python
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(llm=llm)
```

### Testing

For each memory type:
1. Have 5+ conversation turns
2. Verify context is maintained/lost as expected
3. Print memory state to verify behavior

**Deliverable:** `part3_memory.py` with three memory implementations

---

## Part 4: Complete Application - Personal AI Assistant (40 minutes)

### Goal
Combine all components into a production-ready personal assistant application.

### Requirements

Build a complete application with:

**4.1 Multiple Capabilities**

Your assistant should support at least 3 operations:
- **Summarize:** Summarize text (short/medium/long)
- **Translate:** Translate text to target language
- **Analyze:** Analyze sentiment and extract key topics
- **Generate:** Create content (emails, posts, etc.)

**4.2 Conversation Memory**

- Remember user preferences across sessions
- Maintain conversation context
- Recall previous requests

**4.3 Structured Output**

For the "analyze" command, return structured data:
```python
{
    "sentiment": "positive",
    "topics": ["AI", "technology", "innovation"],
    "summary": "The text discusses recent AI advances..."
}
```

**4.4 Command Interface**

Create a command-line interface:
```
Welcome to Your AI Assistant!

Commands:
- summarize [length]: Summarize text
- translate [language]: Translate text
- analyze: Analyze text sentiment and topics
- generate [type]: Generate content
- chat: Free conversation
- memory: Show conversation history
- quit: Exit

> 
```

**4.5 Error Handling**

- Validate user inputs
- Handle API errors gracefully
- Provide helpful error messages

**4.6 Configuration**

Load settings from config file or environment:
- Model selection
- Temperature
- Max tokens
- Memory type

### Implementation Structure

```python
# assistant.py

import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain, ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

class PersonalAssistant:
    def __init__(self):
        # Initialize LLM
        # Setup memory
        # Create chains for each capability
        pass
    
    def summarize(self, text: str, length: str = "medium"):
        # Implement summarization
        pass
    
    def translate(self, text: str, target_language: str):
        # Implement translation
        pass
    
    def analyze(self, text: str):
        # Return structured analysis
        pass
    
    def generate(self, content_type: str, **kwargs):
        # Generate content
        pass
    
    def chat(self, message: str):
        # Free conversation
        pass
    
    def show_memory(self):
        # Display conversation history
        pass

def main():
    # Load environment
    load_dotenv()
    
    # Create assistant
    assistant = PersonalAssistant()
    
    # Command loop
    print("Welcome to Your AI Assistant!")
    print("\nCommands: summarize, translate, analyze, generate, chat, memory, quit\n")
    
    while True:
        user_input = input("> ").strip()
        
        if not user_input:
            continue
        
        # Parse and execute commands
        # Handle errors
        # Display results

if __name__ == "__main__":
    main()
```

### Expected Functionality

**Session Example:**
```
Welcome to Your AI Assistant!

Commands: summarize, translate, analyze, generate, chat, memory, quit

> chat
You: Hi, my name is Alex and I'm a software engineer
Assistant: Nice to meet you, Alex! As a software engineer, I'd be happy to help you with...

You: What's my name?
Assistant: Your name is Alex.

You: summarize
Enter text: [Long article about machine learning...]
Enter length (short/medium/long): short
Summary: Machine learning is revolutionizing...

> analyze
Enter text: I absolutely love this new framework! It's intuitive and powerful.
Analysis:
  Sentiment: Positive
  Topics: ["framework", "user experience", "technology"]
  Summary: User expresses enthusiasm about a new framework's ease of use and capabilities.

> memory
Conversation History:
1. User: Hi, my name is Alex and I'm a software engineer
   AI: Nice to meet you, Alex!...
2. User: What's my name?
   AI: Your name is Alex.
[... more history ...]

> quit
Thank you for using AI Assistant! Goodbye!
```

### Testing Requirements

Test your application with:

1. **All Commands:** Test each command works correctly
2. **Memory Persistence:** Verify context is maintained
3. **Error Cases:** Test with invalid inputs
4. **Long Sessions:** Run 10+ interactions
5. **Edge Cases:** Empty inputs, very long text, special characters

### Bonus Features (Optional)

If time permits, add:
- Save/load conversation history to file
- Multiple conversation threads
- User preferences (saved to JSON)
- Cost tracking (token usage)
- Response streaming for long outputs

**Deliverable:** `assistant.py` - Complete, working application

---

## Submission Checklist

Before submitting, ensure you have:

- ✅ **Part 1:** `part1_chains.py` with 3 working chains
- ✅ **Part 2:** `part2_templates.py` with 3 advanced templates
- ✅ **Part 3:** `part3_memory.py` with 3 memory types
- ✅ **Part 4:** `assistant.py` - complete application
- ✅ **Documentation:** README.md explaining your application
- ✅ **Configuration:** `.env.example` file (without real API key)
- ✅ **Dependencies:** `requirements.txt` file
- ✅ **Tests:** Evidence that all features work

### Code Quality Requirements

Your code should:
- Include docstrings for all functions
- Use type hints where appropriate
- Handle errors gracefully
- Follow PEP 8 style guidelines
- Have meaningful variable names
- Include comments for complex logic

---

## Common Issues & Solutions

### Issue: "No module named 'langchain'"
**Solution:** Make sure virtual environment is activated and langchain is installed

### Issue: "AuthenticationError"
**Solution:** Check your `.env` file has correct API key format

### Issue: "Rate limit exceeded"
**Solution:** Add delays between requests or reduce number of test calls

### Issue: Memory not working
**Solution:** Verify you're using `ConversationChain` (not just `LLMChain`)

### Issue: Output parser fails
**Solution:** Check your prompt includes format instructions from parser

---

## Evaluation Criteria

Your submission will be evaluated on:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Functionality** | 40% | All components work as specified |
| **Code Quality** | 25% | Clean, well-documented, maintainable code |
| **Error Handling** | 15% | Graceful handling of errors and edge cases |
| **User Experience** | 10% | Clear interface and helpful messages |
| **Documentation** | 10% | README explains setup and usage |

**Passing Grade:** 70% overall

---

## Time Management Tips

- **Part 1 (30 min):** Start simple, get basics working first
- **Part 2 (30 min):** Focus on one template at a time
- **Part 3 (30 min):** Test memory thoroughly before moving on
- **Part 4 (40 min):** Build incrementally, test as you go

**If running short on time:**
- Part 4 is most important (complete application)
- Get core functionality working before adding polish
- Document what you attempted even if incomplete

---

## Learning Resources

**LangChain Documentation:**
- [Chains Guide](https://python.langchain.com/docs/modules/chains/)
- [Memory Guide](https://python.langchain.com/docs/modules/memory/)
- [Prompt Templates](https://python.langchain.com/docs/modules/model_io/prompts/)

**Debugging Tips:**
- Use `verbose=True` in chains to see what's happening
- Print intermediate results
- Test each component independently before combining

---

## Example README Template

```markdown
# Personal AI Assistant

## Description
A command-line AI assistant built with LangChain that can summarize, translate, analyze text, and maintain conversation context.

## Features
- Text summarization (short/medium/long)
- Language translation
- Sentiment analysis with structured output
- Conversation memory
- Multiple commands via CLI

## Setup
1. Clone repository
2. Install dependencies: `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and add your OpenAI API key
4. Run: `python assistant.py`

## Usage
[Your commands and examples here]

## Architecture
[Briefly explain your design choices]

## Testing
[How you tested the application]

## Known Issues
[Any limitations or bugs]
```

---

## Next Steps

After completing this exercise:

1. **Review Solution:** Compare your implementation with the provided solutions
2. **Experiment:** Try different models, temperatures, prompts
3. **Extend:** Add new capabilities to your assistant
4. **Prepare:** Get ready for Module 3 (Vector Databases & RAG)

---

## Need Help?

- **Discussion Forum:** Post questions with code snippets
- **Office Hours:** Schedule 1-on-1 help sessions
- **Documentation:** Refer to LangChain official docs
- **Solution Guide:** Available after submission deadline

---

**Good luck! Build something awesome! 🚀**

---

*Module 2 Exercise | Building AI-Powered Applications | Estimated Time: 130 minutes*
