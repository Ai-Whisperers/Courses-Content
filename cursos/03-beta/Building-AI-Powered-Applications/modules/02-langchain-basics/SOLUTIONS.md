# Module 2: LangChain Basics - Solution Guide

## Overview

This solution guide provides complete, working implementations for all exercises in Module 2. Each solution includes:
- Full working code
- Explanation of approach
- Alternative implementations
- Common mistakes to avoid
- Extension suggestions

**Instructor Note:** These are reference implementations. Student solutions may vary while still being correct.

---

## Part 1: Build a Simple Chain - Solutions

### Solution 1.1: Text Summarizer

**Approach:** Use a prompt template with length parameter to control summary verbosity.

```python
# part1_chains.py

import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Load environment variables
load_dotenv()

# Initialize LLM
llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")

# Solution 1.1: Text Summarizer
def create_summarizer():
    """Create a text summarization chain with length control"""
    
    prompt = PromptTemplate(
        input_variables=["text", "length"],
        template="""
        Summarize the following text. The summary should be {length} length.
        
        Length guidelines:
        - short: 1-2 sentences
        - medium: 3-4 sentences  
        - long: 5-6 sentences
        
        Text to summarize:
        {text}
        
        Summary:
        """
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain

# Test the summarizer
def test_summarizer():
    summarizer = create_summarizer()
    
    test_text = """
    Artificial intelligence (AI) is transforming industries worldwide. 
    From healthcare to finance, AI applications are revolutionizing how 
    businesses operate. Machine learning algorithms can now analyze vast 
    amounts of data in seconds, identifying patterns that humans might miss. 
    Natural language processing enables computers to understand and generate 
    human language with remarkable accuracy. Computer vision allows machines 
    to interpret visual information from the world. As AI continues to advance, 
    ethical considerations around bias, privacy, and job displacement become 
    increasingly important. Organizations must balance innovation with 
    responsibility as they integrate AI into their operations.
    """
    
    print("=== Text Summarizer Test ===\n")
    
    for length in ["short", "medium", "long"]:
        result = summarizer.run(text=test_text, length=length)
        print(f"{length.upper()} Summary:")
        print(result)
        print("-" * 60)

if __name__ == "__main__":
    test_summarizer()
```

**Alternative Implementation (with ChatPromptTemplate):**

```python
from langchain.prompts import ChatPromptTemplate

def create_summarizer_v2():
    """Alternative using chat-style prompts"""
    
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert at creating concise summaries."),
        ("user", "Summarize this text in {length} length (short=1-2 sentences, medium=3-4, long=5-6):\n\n{text}")
    ])
    
    chain = LLMChain(llm=llm, prompt=chat_prompt)
    return chain
```

**Common Mistakes:**
- ❌ Not specifying what "length" means (short/medium/long)
- ❌ Forgetting to handle empty or very short input text
- ❌ Not testing with different text lengths

**Extension Ideas:**
- Add word count limits
- Support bullet point summaries
- Add language parameter for multilingual support

---

### Solution 1.2: Language Translator

**Approach:** Use system message to define translator role, with variables for text and target language.

```python
# Continuing in part1_chains.py

def create_translator():
    """Create a language translation chain"""
    
    prompt = PromptTemplate(
        input_variables=["text", "target_language"],
        template="""
        You are a professional translator with expertise in multiple languages.
        
        Translate the following text to {target_language}.
        Maintain the original tone and meaning.
        
        Text to translate:
        {text}
        
        Translation:
        """
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain

def test_translator():
    translator = create_translator()
    
    test_cases = [
        {
            "text": "Hello, how are you?",
            "target_language": "Spanish"
        },
        {
            "text": "I love programming and building applications.",
            "target_language": "French"
        },
        {
            "text": "The weather is beautiful today.",
            "target_language": "Japanese"
        }
    ]
    
    print("\n=== Language Translator Test ===\n")
    
    for case in test_cases:
        result = translator.run(**case)
        print(f"Original ({case['target_language']}): {case['text']}")
        print(f"Translation: {result}")
        print("-" * 60)
```

**Chat-Style Alternative:**

```python
from langchain.prompts import ChatPromptTemplate

def create_translator_v2():
    """Alternative with chat messages"""
    
    chat_prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a professional translator. Translate text accurately while preserving tone and meaning."),
        ("user", "Translate this to {target_language}: {text}")
    ])
    
    chain = LLMChain(llm=llm, prompt=chat_prompt)
    return chain
```

**Common Mistakes:**
- ❌ Not handling language names (e.g., "spanish" vs "Spanish")
- ❌ No validation for unsupported languages
- ❌ Not preserving formatting (line breaks, punctuation)

**Extension Ideas:**
- Add source language detection
- Support multiple target languages at once
- Add formality level (formal/informal translation)

---

### Solution 1.3: Code Explainer

**Approach:** Create a beginner-friendly code explanation with breakdown of concepts.

```python
# Continuing in part1_chains.py

def create_code_explainer():
    """Create a code explanation chain for beginners"""
    
    prompt = PromptTemplate(
        input_variables=["code", "language"],
        template="""
        You are a patient programming instructor explaining code to beginners.
        
        Programming Language: {language}
        
        Code:
        {code}
        
        Please explain this code in a beginner-friendly way. Include:
        1. What the code does (high-level purpose)
        2. Step-by-step breakdown
        3. Key concepts used
        4. Example output or behavior
        
        Explanation:
        """
    )
    
    # Use lower temperature for more consistent, educational explanations
    explainer_llm = ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo")
    chain = LLMChain(llm=explainer_llm, prompt=prompt)
    return chain

def test_code_explainer():
    explainer = create_code_explainer()
    
    test_cases = [
        {
            "code": "def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)",
            "language": "Python"
        },
        {
            "code": "const arr = [1, 2, 3, 4, 5].map(x => x * 2);",
            "language": "JavaScript"
        },
        {
            "code": "public class Person { private String name; public Person(String name) { this.name = name; } }",
            "language": "Java"
        }
    ]
    
    print("\n=== Code Explainer Test ===\n")
    
    for case in test_cases:
        result = explainer.run(**case)
        print(f"Language: {case['language']}")
        print(f"Code: {case['code']}")
        print(f"\nExplanation:\n{result}")
        print("=" * 60)
```

**Advanced Alternative (with Code Analysis):**

```python
def create_code_explainer_advanced():
    """Advanced version that also identifies patterns and best practices"""
    
    prompt = PromptTemplate(
        input_variables=["code", "language"],
        template="""
        Analyze this {language} code for a beginner:
        
        {code}
        
        Provide:
        1. **Purpose**: What does this code do?
        2. **How It Works**: Step-by-step breakdown
        3. **Concepts Used**: List programming concepts
        4. **Best Practices**: Is this good code? Any improvements?
        5. **Example**: What would this output or do?
        
        Make explanations clear and educational.
        """
    )
    
    chain = LLMChain(llm=ChatOpenAI(temperature=0.3), prompt=prompt)
    return chain
```

**Common Mistakes:**
- ❌ Not adjusting temperature (high temp = inconsistent explanations)
- ❌ Assuming too much prior knowledge
- ❌ Not handling syntax errors in input code
- ❌ Missing context about what the code is for

**Extension Ideas:**
- Add complexity rating (beginner/intermediate/advanced)
- Identify potential bugs or issues
- Suggest refactoring improvements
- Generate test cases for the code

---

## Part 2: Template Integration - Solutions

### Solution 2.1: Few-Shot Sentiment Analyzer

**Approach:** Use FewShotPromptTemplate with examples to guide sentiment classification.

```python
# part2_templates.py

import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from langchain.chains import LLMChain
from datetime import datetime

load_dotenv()

llm = ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo")

# Solution 2.1: Few-Shot Sentiment Analyzer
def create_sentiment_analyzer():
    """Create sentiment analyzer using few-shot learning"""
    
    # Define examples
    examples = [
        {"text": "I love this product!", "sentiment": "Positive"},
        {"text": "This is terrible.", "sentiment": "Negative"},
        {"text": "It's okay, nothing special.", "sentiment": "Neutral"},
        {"text": "Absolutely amazing experience!", "sentiment": "Positive"},
        {"text": "Worst purchase ever.", "sentiment": "Negative"},
        {"text": "It works as expected.", "sentiment": "Neutral"}
    ]
    
    # Template for each example
    example_template = PromptTemplate(
        input_variables=["text", "sentiment"],
        template="Text: {text}\nSentiment: {sentiment}"
    )
    
    # Create few-shot prompt
    few_shot_prompt = FewShotPromptTemplate(
        examples=examples,
        example_prompt=example_template,
        prefix="Classify the sentiment of the following text as Positive, Negative, or Neutral.\n\nExamples:",
        suffix="\nText: {input_text}\nSentiment:",
        input_variables=["input_text"]
    )
    
    chain = LLMChain(llm=llm, prompt=few_shot_prompt)
    return chain

def test_sentiment_analyzer():
    analyzer = create_sentiment_analyzer()
    
    test_texts = [
        "The service was outstanding!",
        "I'm disappointed with the quality.",
        "It's fine, meets basic requirements.",
        "Incredible! Exceeded all my expectations!",
        "Not worth the money at all.",
        "Pretty average, nothing to complain about."
    ]
    
    print("=== Sentiment Analyzer Test ===\n")
    
    for text in test_texts:
        result = analyzer.run(input_text=text)
        print(f"Text: {text}")
        print(f"Sentiment: {result.strip()}")
        print("-" * 60)
```

**Alternative: Dynamic Example Selection**

```python
from langchain.prompts.example_selector import LengthBasedExampleSelector

def create_sentiment_analyzer_dynamic():
    """Use only relevant examples based on input length"""
    
    examples = [
        {"text": "I love this product!", "sentiment": "Positive"},
        {"text": "This is terrible.", "sentiment": "Negative"},
        {"text": "It's okay, nothing special.", "sentiment": "Neutral"}
    ]
    
    example_template = PromptTemplate(
        input_variables=["text", "sentiment"],
        template="Text: {text}\nSentiment: {sentiment}"
    )
    
    example_selector = LengthBasedExampleSelector(
        examples=examples,
        example_prompt=example_template,
        max_length=100
    )
    
    few_shot_prompt = FewShotPromptTemplate(
        example_selector=example_selector,
        example_prompt=example_template,
        prefix="Classify sentiment:",
        suffix="Text: {input_text}\nSentiment:",
        input_variables=["input_text"]
    )
    
    chain = LLMChain(llm=llm, prompt=few_shot_prompt)
    return chain
```

**Common Mistakes:**
- ❌ Too few examples (need 3+ per category)
- ❌ Unbalanced examples (all positive, no negative)
- ❌ Inconsistent output format in examples
- ❌ Examples too similar to each other

---

### Solution 2.2: Dynamic Email Generator

**Approach:** Use multiple input variables with list formatting for key points.

```python
# Continuing in part2_templates.py

def create_email_generator():
    """Generate professional emails with dynamic content"""
    
    prompt = PromptTemplate(
        input_variables=["recipient", "purpose", "key_points", "tone"],
        template="""
        Generate a {tone} email with the following details:
        
        Recipient: {recipient}
        Purpose: {purpose}
        
        Key Points to Include:
        {key_points}
        
        Email Format:
        - Professional subject line
        - Appropriate greeting
        - Clear body addressing all key points
        - Professional closing
        
        Email:
        """
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain

def test_email_generator():
    generator = create_email_generator()
    
    test_cases = [
        {
            "recipient": "Dr. Smith",
            "purpose": "meeting invitation",
            "key_points": "- Discuss Q3 results\n- Review budget allocation\n- Plan next quarter strategy",
            "tone": "formal"
        },
        {
            "recipient": "Team",
            "purpose": "project update",
            "key_points": "- Milestone 1 completed\n- Milestone 2 in progress\n- Need feedback on design",
            "tone": "casual but professional"
        },
        {
            "recipient": "Sarah",
            "purpose": "thank you note",
            "key_points": "- Thanks for helping with presentation\n- Appreciate the quick turnaround\n- Looking forward to collaborating again",
            "tone": "warm and grateful"
        }
    ]
    
    print("\n=== Email Generator Test ===\n")
    
    for case in test_cases:
        result = generator.run(**case)
        print(f"To: {case['recipient']}")
        print(f"Purpose: {case['purpose']}")
        print(f"Tone: {case['tone']}")
        print(f"\n{result}")
        print("=" * 80)
```

**Advanced Alternative (with Email Class):**

```python
from pydantic import BaseModel, Field
from typing import List

class EmailRequest(BaseModel):
    recipient: str = Field(description="Email recipient name")
    purpose: str = Field(description="Purpose of the email")
    key_points: List[str] = Field(description="List of key points")
    tone: str = Field(default="professional", description="Email tone")

def create_email_generator_typed():
    """Type-safe email generator using Pydantic"""
    
    def format_key_points(points: List[str]) -> str:
        return "\n".join(f"- {point}" for point in points)
    
    prompt = PromptTemplate(
        input_variables=["recipient", "purpose", "key_points_formatted", "tone"],
        template="""
        Create a {tone} email:
        
        To: {recipient}
        Purpose: {purpose}
        
        Include these points:
        {key_points_formatted}
        
        Generate a complete professional email with subject line.
        """
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    
    def generate_email(request: EmailRequest) -> str:
        return chain.run(
            recipient=request.recipient,
            purpose=request.purpose,
            key_points_formatted=format_key_points(request.key_points),
            tone=request.tone
        )
    
    return generate_email
```

**Common Mistakes:**
- ❌ Passing list directly instead of formatting it
- ❌ Not specifying email structure expectations
- ❌ Tone parameter too vague
- ❌ Not validating required fields

---

### Solution 2.3: Partial Template with Date

**Approach:** Use partial_variables to automatically inject current date.

```python
# Continuing in part2_templates.py

def get_current_date():
    """Get formatted current date"""
    return datetime.now().strftime("%A, %B %d, %Y")

def create_date_aware_assistant():
    """Create assistant that knows current date"""
    
    prompt = PromptTemplate(
        template="""
        Today is {date}.
        
        User Query: {query}
        
        Provide a helpful response that takes the current date into account when relevant.
        
        Response:
        """,
        input_variables=["query"],
        partial_variables={"date": get_current_date}
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain

def test_date_aware_assistant():
    assistant = create_date_aware_assistant()
    
    test_queries = [
        "What should I do today?",
        "What day of the week is it?",
        "Suggest a meal plan for this week",
        "Give me a motivational quote"
    ]
    
    print("\n=== Date-Aware Assistant Test ===\n")
    print(f"Current Date: {get_current_date()}\n")
    
    for query in test_queries:
        result = assistant.run(query=query)
        print(f"Query: {query}")
        print(f"Response: {result}")
        print("-" * 60)
```

**Alternative: Multiple Dynamic Variables**

```python
def get_current_time():
    return datetime.now().strftime("%I:%M %p")

def get_day_of_week():
    return datetime.now().strftime("%A")

def create_context_aware_assistant():
    """Assistant with multiple context variables"""
    
    prompt = PromptTemplate(
        template="""
        Current Context:
        - Date: {date}
        - Time: {time}
        - Day: {day}
        
        User: {query}
        
        Assistant (considering context):
        """,
        input_variables=["query"],
        partial_variables={
            "date": get_current_date,
            "time": get_current_time,
            "day": get_day_of_week
        }
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain
```

**Common Mistakes:**
- ❌ Using static date string instead of function
- ❌ Not calling function in partial_variables (use `func` not `func()`)
- ❌ Date format not human-readable
- ❌ Forgetting to update date between long-running sessions

---

## Part 3: Conversation Memory - Solutions

### Solution 3.1: Basic Chatbot with Buffer Memory

**Approach:** Use ConversationBufferMemory to store full conversation history.

```python
# part3_memory.py

import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import (
    ConversationBufferMemory,
    ConversationBufferWindowMemory,
    ConversationSummaryMemory
)

load_dotenv()

llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")

# Solution 3.1: Basic Chatbot with Buffer Memory
def create_chatbot(personality="helpful and friendly"):
    """Create a chatbot with full conversation memory"""
    
    memory = ConversationBufferMemory()
    
    # Create conversation with custom system message
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=True  # Shows what's being passed to LLM
    )
    
    # Set personality via first system interaction
    conversation.predict(
        input=f"You are a {personality} assistant. Respond naturally and remember previous context."
    )
    
    return conversation

class Chatbot:
    """Wrapper class for better interface"""
    
    def __init__(self, personality="helpful and friendly"):
        self.memory = ConversationBufferMemory()
        self.conversation = ConversationChain(
            llm=llm,
            memory=self.memory,
            verbose=False
        )
        self.personality = personality
    
    def chat(self, message: str) -> str:
        """Send a message and get response"""
        response = self.conversation.predict(input=message)
        return response
    
    def show_history(self):
        """Display conversation history"""
        history = self.memory.load_memory_variables({})
        print("\n=== Conversation History ===")
        print(history.get('history', 'No history yet'))
        print("=" * 50)
    
    def clear_history(self):
        """Clear conversation memory"""
        self.memory.clear()
        print("Conversation history cleared.")

def test_basic_chatbot():
    print("=== Basic Chatbot Test ===\n")
    
    bot = Chatbot(personality="friendly Python tutor")
    
    # Test conversation flow
    exchanges = [
        "Hi, my name is Alice and I'm learning Python",
        "What's my name?",
        "What am I learning?",
        "Can you help me understand functions?",
        "Thanks! What did we discuss today?"
    ]
    
    for user_msg in exchanges:
        print(f"User: {user_msg}")
        response = bot.chat(user_msg)
        print(f"Bot: {response}\n")
        print("-" * 60)
    
    # Show full history
    bot.show_history()

if __name__ == "__main__":
    test_basic_chatbot()
```

**Alternative: Context-Aware Chatbot**

```python
from langchain.prompts import PromptTemplate

def create_chatbot_with_context():
    """Chatbot that explicitly uses context in prompts"""
    
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    
    prompt = PromptTemplate(
        input_variables=["chat_history", "input"],
        template="""
        You are a helpful assistant. Use previous conversation context to provide relevant responses.
        
        Previous conversation:
        {chat_history}
        
        Current message: {input}
        
        Response:
        """
    )
    
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        prompt=prompt,
        verbose=True
    )
    
    return conversation
```

---

### Solution 3.2: Limited Memory Chatbot

**Approach:** Use ConversationBufferWindowMemory with k parameter.

```python
# Continuing in part3_memory.py

def create_limited_chatbot(memory_size=3):
    """Create chatbot that only remembers last N exchanges"""
    
    memory = ConversationBufferWindowMemory(k=memory_size)
    
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=True
    )
    
    return conversation, memory

class LimitedMemoryChatbot:
    """Chatbot with windowed memory"""
    
    def __init__(self, memory_size=3):
        self.memory_size = memory_size
        self.memory = ConversationBufferWindowMemory(k=memory_size)
        self.conversation = ConversationChain(
            llm=llm,
            memory=self.memory,
            verbose=False
        )
        self.exchange_count = 0
    
    def chat(self, message: str) -> str:
        self.exchange_count += 1
        response = self.conversation.predict(input=message)
        return response
    
    def show_memory_state(self):
        """Show what's currently in memory"""
        memory_vars = self.memory.load_memory_variables({})
        print(f"\n=== Memory State (Last {self.memory_size} exchanges) ===")
        print(f"Total exchanges: {self.exchange_count}")
        print(f"Stored exchanges: {min(self.exchange_count, self.memory_size)}")
        print(f"\nStored history:\n{memory_vars.get('history', 'Empty')}")
        print("=" * 60)

def test_limited_memory():
    print("\n=== Limited Memory Chatbot Test ===\n")
    
    bot = LimitedMemoryChatbot(memory_size=3)
    
    # Have more than 3 exchanges to test forgetting
    exchanges = [
        "My favorite color is blue",
        "I like pizza",
        "My dog's name is Max",
        "I work as a developer",
        "I live in Seattle",
        "What's my favorite color?",  # Should be forgotten
        "What's my dog's name?",      # Should be remembered
        "Where do I live?"            # Should be remembered
    ]
    
    for i, user_msg in enumerate(exchanges, 1):
        print(f"Exchange {i}:")
        print(f"User: {user_msg}")
        response = bot.chat(user_msg)
        print(f"Bot: {response}\n")
        
        if i % 3 == 0:  # Show memory state every 3 exchanges
            bot.show_memory_state()
        
        print("-" * 60)
    
    # Final memory state
    bot.show_memory_state()
```

**Common Observations:**
- First exchange (blue) should be forgotten by the end
- Bot won't remember favorite color
- Bot will remember dog's name and location
- Memory window slides as conversation continues

---

### Solution 3.3: Summary Memory System

**Approach:** Use ConversationSummaryMemory to summarize old messages.

```python
# Continuing in part3_memory.py

def create_summary_chatbot():
    """Chatbot that summarizes old conversation parts"""
    
    memory = ConversationSummaryMemory(
        llm=llm,
        return_messages=True
    )
    
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=True
    )
    
    return conversation, memory

class SummaryMemoryChatbot:
    """Chatbot with summarization for long conversations"""
    
    def __init__(self):
        self.memory = ConversationSummaryMemory(llm=llm)
        self.conversation = ConversationChain(
            llm=llm,
            memory=self.memory,
            verbose=False
        )
    
    def chat(self, message: str) -> str:
        response = self.conversation.predict(input=message)
        return response
    
    def show_memory(self):
        """Display current memory state (summary + recent)"""
        memory_vars = self.memory.load_memory_variables({})
        print("\n=== Summary Memory State ===")
        print(memory_vars.get('history', 'No history'))
        print("=" * 60)
    
    def get_summary(self):
        """Get just the summary part"""
        return self.memory.buffer

def test_summary_memory():
    print("\n=== Summary Memory Chatbot Test ===\n")
    
    bot = SummaryMemoryChatbot()
    
    # Have a longer conversation to trigger summarization
    exchanges = [
        "I'm planning a trip to Japan next month",
        "I'm interested in visiting temples and trying authentic ramen",
        "I'll be there for 10 days",
        "My budget is around $3000",
        "I'm also interested in technology districts",
        "What cities should I visit?",
        "Tell me about Tokyo",
        "What about Kyoto?",
        "Remind me what I told you about my trip"
    ]
    
    for i, user_msg in enumerate(exchanges, 1):
        print(f"Exchange {i}:")
        print(f"User: {user_msg}")
        response = bot.chat(user_msg)
        print(f"Bot: {response}\n")
        
        if i % 3 == 0:
            bot.show_memory()
        
        print("-" * 60)
    
    # Final memory state
    print("\n=== Final Memory Summary ===")
    bot.show_memory()
```

**Hybrid Alternative (Summary + Buffer):**

```python
from langchain.memory import ConversationSummaryBufferMemory

def create_hybrid_memory_chatbot():
    """Best of both: recent messages + old summary"""
    
    memory = ConversationSummaryBufferMemory(
        llm=llm,
        max_token_limit=500  # When to start summarizing
    )
    
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=True
    )
    
    return conversation, memory
```

---

## Part 4: Complete Application - Solution

### Complete Personal AI Assistant

**Full Implementation:**

```python
# assistant.py

import os
import sys
from datetime import datetime
from typing import Dict, List, Optional
from dotenv import load_dotenv

from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain, ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import PromptTemplate, ChatPromptTemplate
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

# Load environment
load_dotenv()

class PersonalAssistant:
    """
    AI Personal Assistant with multiple capabilities:
    - Text summarization
    - Language translation
    - Text analysis (sentiment + topics)
    - Content generation
    - Conversational chat with memory
    """
    
    def __init__(self, model="gpt-3.5-turbo", temperature=0.7, memory_size=5):
        """
        Initialize the assistant
        
        Args:
            model: OpenAI model to use
            temperature: Model temperature (0-2)
            memory_size: Number of conversation exchanges to remember
        """
        # Initialize LLM
        self.llm = ChatOpenAI(
            model_name=model,
            temperature=temperature
        )
        
        # Initialize memory for chat
        self.memory = ConversationBufferWindowMemory(k=memory_size)
        
        # Create conversation chain
        self.conversation = ConversationChain(
            llm=self.llm,
            memory=self.memory,
            verbose=False
        )
        
        # Initialize specialized chains
        self._init_chains()
        
        print(f"✓ Assistant initialized (model: {model}, memory: {memory_size} exchanges)")
    
    def _init_chains(self):
        """Initialize all specialized chains"""
        
        # Summarizer chain
        summarize_prompt = PromptTemplate(
            input_variables=["text", "length"],
            template="""
            Summarize the following text. Length: {length}
            (short=1-2 sentences, medium=3-4 sentences, long=5-6 sentences)
            
            Text:
            {text}
            
            Summary:
            """
        )
        self.summarizer = LLMChain(llm=self.llm, prompt=summarize_prompt)
        
        # Translator chain
        translate_prompt = PromptTemplate(
            input_variables=["text", "language"],
            template="""
            Translate the following text to {language}.
            Maintain the original tone and meaning.
            
            Text: {text}
            
            Translation:
            """
        )
        self.translator = LLMChain(llm=self.llm, prompt=translate_prompt)
        
        # Analyzer chain with structured output
        response_schemas = [
            ResponseSchema(name="sentiment", description="The sentiment: Positive, Negative, or Neutral"),
            ResponseSchema(name="topics", description="List of 3-5 main topics as comma-separated values"),
            ResponseSchema(name="summary", description="One-sentence summary of the text")
        ]
        
        self.analyzer_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        
        analyze_prompt = PromptTemplate(
            template="""
            Analyze the following text:
            
            {text}
            
            {format_instructions}
            """,
            input_variables=["text"],
            partial_variables={"format_instructions": self.analyzer_parser.get_format_instructions()}
        )
        self.analyzer = LLMChain(llm=self.llm, prompt=analyze_prompt)
        
        # Content generator chain
        generate_prompt = PromptTemplate(
            input_variables=["content_type", "topic", "style"],
            template="""
            Generate {content_type} about {topic}.
            Style: {style}
            
            Make it engaging and well-structured.
            
            Content:
            """
        )
        self.generator = LLMChain(llm=self.llm, prompt=generate_prompt)
    
    def summarize(self, text: str, length: str = "medium") -> str:
        """
        Summarize text
        
        Args:
            text: Text to summarize
            length: 'short', 'medium', or 'long'
        
        Returns:
            Summary string
        """
        if not text.strip():
            return "Error: Empty text provided"
        
        if length not in ["short", "medium", "long"]:
            length = "medium"
        
        try:
            result = self.summarizer.run(text=text, length=length)
            return result.strip()
        except Exception as e:
            return f"Error during summarization: {str(e)}"
    
    def translate(self, text: str, target_language: str) -> str:
        """
        Translate text to target language
        
        Args:
            text: Text to translate
            target_language: Target language name
        
        Returns:
            Translated text
        """
        if not text.strip():
            return "Error: Empty text provided"
        
        if not target_language.strip():
            return "Error: Target language not specified"
        
        try:
            result = self.translator.run(text=text, language=target_language)
            return result.strip()
        except Exception as e:
            return f"Error during translation: {str(e)}"
    
    def analyze(self, text: str) -> Dict[str, str]:
        """
        Analyze text for sentiment, topics, and summary
        
        Args:
            text: Text to analyze
        
        Returns:
            Dictionary with 'sentiment', 'topics', 'summary'
        """
        if not text.strip():
            return {"error": "Empty text provided"}
        
        try:
            result = self.analyzer.run(text=text)
            parsed = self.analyzer_parser.parse(result)
            return parsed
        except Exception as e:
            return {"error": f"Analysis failed: {str(e)}"}
    
    def generate(self, content_type: str, topic: str, style: str = "professional") -> str:
        """
        Generate content
        
        Args:
            content_type: Type of content (e.g., 'blog post', 'email', 'tweet')
            topic: Topic to write about
            style: Writing style
        
        Returns:
            Generated content
        """
        if not topic.strip():
            return "Error: Topic not provided"
        
        try:
            result = self.generator.run(
                content_type=content_type,
                topic=topic,
                style=style
            )
            return result.strip()
        except Exception as e:
            return f"Error during generation: {str(e)}"
    
    def chat(self, message: str) -> str:
        """
        Free-form conversation
        
        Args:
            message: User message
        
        Returns:
            Assistant response
        """
        if not message.strip():
            return "Please say something!"
        
        try:
            response = self.conversation.predict(input=message)
            return response
        except Exception as e:
            return f"Error in conversation: {str(e)}"
    
    def show_memory(self):
        """Display conversation history"""
        memory_vars = self.memory.load_memory_variables({})
        history = memory_vars.get('history', 'No conversation history yet')
        
        print("\n" + "=" * 60)
        print("CONVERSATION HISTORY")
        print("=" * 60)
        print(history)
        print("=" * 60 + "\n")
    
    def clear_memory(self):
        """Clear conversation memory"""
        self.memory.clear()
        print("✓ Conversation history cleared")


def print_header():
    """Print application header"""
    print("\n" + "=" * 60)
    print("  PERSONAL AI ASSISTANT")
    print("=" * 60)
    print("\nCommands:")
    print("  summarize  - Summarize text")
    print("  translate  - Translate text")
    print("  analyze    - Analyze sentiment and topics")
    print("  generate   - Generate content")
    print("  chat       - Free conversation")
    print("  memory     - Show conversation history")
    print("  clear      - Clear conversation memory")
    print("  help       - Show this help")
    print("  quit       - Exit application")
    print("\n" + "=" * 60 + "\n")


def get_multiline_input(prompt="Enter text (press Enter twice to finish):\n") -> str:
    """Get multi-line input from user"""
    print(prompt)
    lines = []
    empty_lines = 0
    
    while empty_lines < 2:
        line = input()
        if not line:
            empty_lines += 1
        else:
            empty_lines = 0
            lines.append(line)
    
    return "\n".join(lines).strip()


def main():
    """Main application loop"""
    
    # Check for API key
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY not found in environment")
        print("Please create a .env file with your API key")
        sys.exit(1)
    
    # Initialize assistant
    try:
        assistant = PersonalAssistant()
    except Exception as e:
        print(f"Error initializing assistant: {e}")
        sys.exit(1)
    
    # Print header
    print_header()
    
    # Main command loop
    while True:
        try:
            command = input("> ").strip().lower()
            
            if not command:
                continue
            
            if command in ["quit", "exit", "q"]:
                print("\nThank you for using Personal AI Assistant! Goodbye! 👋\n")
                break
            
            elif command == "help":
                print_header()
            
            elif command == "summarize":
                text = get_multiline_input()
                if text:
                    length = input("Length (short/medium/long) [medium]: ").strip() or "medium"
                    print("\nSummarizing...\n")
                    result = assistant.summarize(text, length)
                    print(f"Summary ({length}):\n{result}\n")
            
            elif command == "translate":
                text = get_multiline_input()
                if text:
                    language = input("Target language: ").strip()
                    if language:
                        print("\nTranslating...\n")
                        result = assistant.translate(text, language)
                        print(f"Translation:\n{result}\n")
                    else:
                        print("Error: Language not specified\n")
            
            elif command == "analyze":
                text = get_multiline_input()
                if text:
                    print("\nAnalyzing...\n")
                    result = assistant.analyze(text)
                    
                    if "error" in result:
                        print(f"Error: {result['error']}\n")
                    else:
                        print("Analysis Results:")
                        print(f"  Sentiment: {result.get('sentiment', 'N/A')}")
                        print(f"  Topics: {result.get('topics', 'N/A')}")
                        print(f"  Summary: {result.get('summary', 'N/A')}")
                        print()
            
            elif command == "generate":
                content_type = input("Content type (blog post/email/tweet/etc): ").strip()
                topic = input("Topic: ").strip()
                style = input("Style [professional]: ").strip() or "professional"
                
                if content_type and topic:
                    print("\nGenerating...\n")
                    result = assistant.generate(content_type, topic, style)
                    print(f"Generated {content_type}:\n{result}\n")
                else:
                    print("Error: Content type and topic required\n")
            
            elif command == "chat":
                print("\nChat Mode (type 'back' to return to commands)\n")
                while True:
                    user_msg = input("You: ").strip()
                    if user_msg.lower() == "back":
                        print()
                        break
                    if user_msg:
                        response = assistant.chat(user_msg)
                        print(f"Assistant: {response}\n")
            
            elif command == "memory":
                assistant.show_memory()
            
            elif command == "clear":
                assistant.clear_memory()
            
            else:
                print(f"Unknown command: '{command}'. Type 'help' for available commands.\n")
        
        except KeyboardInterrupt:
            print("\n\nInterrupted. Type 'quit' to exit.\n")
        except Exception as e:
            print(f"\nError: {e}\n")


if __name__ == "__main__":
    main()
```

**Requirements File:**

```text
# requirements.txt
langchain==0.1.0
openai==1.0.0
python-dotenv==1.0.0
```

**Environment Template:**

```bash
# .env.example
OPENAI_API_KEY=your-api-key-here
```

**README.md:**

```markdown
# Personal AI Assistant

A command-line AI assistant built with LangChain offering multiple capabilities.

## Features

- **Summarize**: Text summarization (short/medium/long)
- **Translate**: Language translation
- **Analyze**: Sentiment analysis + topic extraction
- **Generate**: Content generation (blogs, emails, etc.)
- **Chat**: Conversational AI with memory

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=sk-your-key-here
```

3. Run:
```bash
python assistant.py
```

## Usage

Type commands at the prompt:
- `summarize` - Summarize text
- `translate` - Translate text
- `analyze` - Analyze text
- `generate` - Generate content
- `chat` - Free conversation
- `memory` - View history
- `quit` - Exit

## Architecture

- **Models**: OpenAI GPT-3.5-turbo
- **Framework**: LangChain
- **Memory**: Windowed buffer (last 5 exchanges)
- **Output Parsing**: Structured parsers for analysis

## Testing

Test each command with various inputs to verify functionality.
```

---

## Common Student Mistakes & Solutions

### Mistake 1: Not handling empty inputs
**Problem:**
```python
result = chain.run(text=user_input)  # Crashes if empty
```

**Solution:**
```python
if not user_input.strip():
    return "Error: Empty input"
result = chain.run(text=user_input)
```

### Mistake 2: Forgetting environment variables
**Problem:** Hardcoded API keys

**Solution:** Always use `python-dotenv` and `.env` files

### Mistake 3: Not using try-except for API calls
**Problem:** Application crashes on API errors

**Solution:**
```python
try:
    result = chain.run(...)
except Exception as e:
    return f"Error: {str(e)}"
```

### Mistake 4: Incorrect memory usage
**Problem:** Using LLMChain instead of ConversationChain

**Solution:** Use `ConversationChain` for conversations

### Mistake 5: Not testing edge cases
**Problem:** Works for normal inputs, fails for unusual ones

**Solution:** Test with:
- Empty strings
- Very long text
- Special characters
- Multiple languages

---

## Extension Ideas for Students

1. **Save/Load Conversations**: Persist memory to JSON file
2. **Multiple Languages**: Auto-detect source language
3. **Voice Interface**: Add speech-to-text/text-to-speech
4. **Web Interface**: Build Flask/FastAPI frontend
5. **Cost Tracking**: Track token usage and costs
6. **Response Streaming**: Stream long responses
7. **Custom Commands**: Allow users to define commands
8. **Multi-Agent**: Different agents for different tasks

---

## Evaluation Rubric

| Criterion | Excellent (90-100%) | Good (70-89%) | Needs Work (<70%) |
|-----------|-------------------|---------------|-------------------|
| **Functionality** | All features work perfectly | Most features work, minor bugs | Many features broken |
| **Code Quality** | Clean, documented, PEP 8 | Mostly clean, some issues | Poor structure |
| **Error Handling** | Comprehensive try-except | Basic error handling | No error handling |
| **User Experience** | Clear, helpful interface | Functional but unclear | Confusing interface |
| **Documentation** | Complete README + comments | Basic documentation | Missing or unclear |

---

*Module 2 Solution Guide | Building AI-Powered Applications*
