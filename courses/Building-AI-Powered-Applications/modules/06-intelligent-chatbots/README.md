# Module 6: Building Intelligent Chatbots

## Learning Objectives

By the end of this module, you will be able to:

1. Design chatbot architectures with state management
2. Implement conversation memory systems
3. Build multi-turn dialog handling
4. Create intent detection and routing
5. Implement human handoff mechanisms

---

## Introduction

Chatbots are among the most common AI applications, but building truly intelligent conversational agents requires sophisticated architecture. This module teaches you to build chatbots that remember context, handle complex multi-turn conversations, and know when to escalate to humans.

---

## 1. Chatbot Architecture

### Core Components

```
┌─────────────────────────────────────────────────────────────┐
│                      CHATBOT SYSTEM                         │
│                                                             │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────────┐│
│  │   Input     │──▶│   Intent     │──▶│    Response      ││
│  │   Handler   │   │   Router     │   │    Generator     ││
│  └─────────────┘   └──────────────┘   └──────────────────┘│
│         │                │                    │           │
│         ▼                ▼                    ▼           │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────────┐│
│  │   Memory    │◀─▶│   Context    │◀─▶│    Knowledge     ││
│  │   Store     │   │   Manager    │   │    Base (RAG)    ││
│  └─────────────┘   └──────────────┘   └──────────────────┘│
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  Handoff Manager                        ││
│  │   - Escalation triggers  - Agent routing  - Queue mgmt ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### Basic Chatbot Implementation

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from datetime import datetime
from openai import OpenAI

@dataclass
class Message:
    role: str  # "user", "assistant", "system"
    content: str
    timestamp: datetime = field(default_factory=datetime.now)
    metadata: Dict = field(default_factory=dict)

@dataclass
class Conversation:
    id: str
    messages: List[Message] = field(default_factory=list)
    metadata: Dict = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.now)

class BasicChatbot:
    """Simple chatbot with conversation history."""

    def __init__(
        self,
        system_prompt: str,
        model: str = "gpt-4o"
    ):
        self.system_prompt = system_prompt
        self.model = model
        self.client = OpenAI()
        self.conversations: Dict[str, Conversation] = {}

    def chat(
        self,
        user_message: str,
        conversation_id: str
    ) -> str:
        """Handle a chat message."""

        # Get or create conversation
        if conversation_id not in self.conversations:
            self.conversations[conversation_id] = Conversation(id=conversation_id)

        conversation = self.conversations[conversation_id]

        # Add user message
        conversation.messages.append(Message(
            role="user",
            content=user_message
        ))

        # Build messages for API
        messages = self._build_messages(conversation)

        # Generate response
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7
        )

        assistant_message = response.choices[0].message.content

        # Store assistant response
        conversation.messages.append(Message(
            role="assistant",
            content=assistant_message
        ))

        return assistant_message

    def _build_messages(self, conversation: Conversation) -> List[Dict]:
        """Build messages array for API call."""
        messages = [{"role": "system", "content": self.system_prompt}]

        for msg in conversation.messages:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })

        return messages
```

---

## 2. Conversation Memory

### Memory Types

| Type | Scope | Use Case |
|------|-------|----------|
| **Short-term** | Current conversation | Immediate context |
| **Long-term** | Across sessions | User preferences, history |
| **Working** | Current task | Active problem-solving |
| **Episodic** | Specific interactions | Reference past conversations |

### Memory Manager Implementation

```python
from abc import ABC, abstractmethod
import json
from datetime import datetime, timedelta

class MemoryStore(ABC):
    """Abstract memory store interface."""

    @abstractmethod
    def save(self, conversation_id: str, messages: List[Message]): pass

    @abstractmethod
    def load(self, conversation_id: str) -> List[Message]: pass

    @abstractmethod
    def search(self, conversation_id: str, query: str, limit: int) -> List[Message]: pass


class InMemoryStore(MemoryStore):
    """Simple in-memory storage for development."""

    def __init__(self):
        self.storage: Dict[str, List[Message]] = {}

    def save(self, conversation_id: str, messages: List[Message]):
        self.storage[conversation_id] = messages

    def load(self, conversation_id: str) -> List[Message]:
        return self.storage.get(conversation_id, [])

    def search(self, conversation_id: str, query: str, limit: int) -> List[Message]:
        messages = self.storage.get(conversation_id, [])
        # Simple keyword search
        query_lower = query.lower()
        matches = [m for m in messages if query_lower in m.content.lower()]
        return matches[:limit]


class ConversationMemory:
    """Manages conversation memory with summarization."""

    def __init__(
        self,
        store: MemoryStore,
        max_messages: int = 20,
        summarize_after: int = 15
    ):
        self.store = store
        self.max_messages = max_messages
        self.summarize_after = summarize_after
        self.client = OpenAI()

    def get_context(
        self,
        conversation_id: str,
        include_summary: bool = True
    ) -> List[Message]:
        """Get conversation context for LLM."""

        messages = self.store.load(conversation_id)

        if len(messages) > self.max_messages:
            # Summarize older messages
            if include_summary:
                summary = self._summarize_messages(messages[:-self.max_messages])
                recent = messages[-self.max_messages:]
                return [Message(role="system", content=f"Previous conversation summary: {summary}")] + recent
            else:
                return messages[-self.max_messages:]

        return messages

    def add_message(self, conversation_id: str, message: Message):
        """Add a message to memory."""
        messages = self.store.load(conversation_id)
        messages.append(message)
        self.store.save(conversation_id, messages)

    def _summarize_messages(self, messages: List[Message]) -> str:
        """Summarize a list of messages."""
        content = "\n".join([f"{m.role}: {m.content}" for m in messages])

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Summarize this conversation concisely, preserving key facts and decisions."},
                {"role": "user", "content": content}
            ],
            max_tokens=200
        )

        return response.choices[0].message.content


class LongTermMemory:
    """Store long-term user information."""

    def __init__(self, vector_store):
        self.vector_store = vector_store
        self.client = OpenAI()

    def store_fact(
        self,
        user_id: str,
        fact: str,
        category: str = "general"
    ):
        """Store a fact about the user."""
        embedding = self._get_embedding(fact)

        self.vector_store.upsert([{
            "id": f"{user_id}_{datetime.now().timestamp()}",
            "values": embedding,
            "metadata": {
                "user_id": user_id,
                "fact": fact,
                "category": category,
                "timestamp": datetime.now().isoformat()
            }
        }])

    def recall(self, user_id: str, query: str, limit: int = 5) -> List[str]:
        """Recall relevant facts about the user."""
        embedding = self._get_embedding(query)

        results = self.vector_store.query(
            vector=embedding,
            filter={"user_id": user_id},
            top_k=limit,
            include_metadata=True
        )

        return [r.metadata["fact"] for r in results.matches]

    def _get_embedding(self, text: str) -> List[float]:
        response = self.client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
```

---

## 3. Multi-Turn Dialog

### Context Window Management

```python
import tiktoken

class ContextManager:
    """Manage conversation context within token limits."""

    def __init__(
        self,
        max_tokens: int = 4000,
        model: str = "gpt-4o"
    ):
        self.max_tokens = max_tokens
        self.encoder = tiktoken.encoding_for_model(model)

    def prepare_context(
        self,
        system_prompt: str,
        messages: List[Message],
        reserve_for_response: int = 1000
    ) -> List[Dict]:
        """Prepare context that fits within token limit."""

        available_tokens = self.max_tokens - reserve_for_response
        system_tokens = len(self.encoder.encode(system_prompt))
        available_tokens -= system_tokens

        # Start from most recent messages
        included_messages = []
        total_tokens = 0

        for message in reversed(messages):
            msg_tokens = len(self.encoder.encode(message.content))
            if total_tokens + msg_tokens > available_tokens:
                break
            included_messages.insert(0, message)
            total_tokens += msg_tokens

        # Build final context
        context = [{"role": "system", "content": system_prompt}]
        for msg in included_messages:
            context.append({"role": msg.role, "content": msg.content})

        return context

    def count_tokens(self, text: str) -> int:
        return len(self.encoder.encode(text))
```

### Handling Follow-up Questions

```python
class FollowUpHandler:
    """Handle follow-up questions with context."""

    def __init__(self):
        self.client = OpenAI()

    def detect_followup(self, message: str, history: List[Message]) -> bool:
        """Detect if message is a follow-up question."""

        # Pronouns or references often indicate follow-up
        followup_indicators = [
            "it", "that", "this", "they", "them",
            "more", "else", "also", "another",
            "what about", "how about", "and",
        ]

        message_lower = message.lower()
        return any(ind in message_lower for ind in followup_indicators)

    def resolve_references(
        self,
        message: str,
        history: List[Message]
    ) -> str:
        """Resolve pronouns and references in message."""

        if not self.detect_followup(message, history):
            return message

        # Use LLM to resolve references
        recent_context = "\n".join([
            f"{m.role}: {m.content}"
            for m in history[-4:]  # Last 4 messages
        ])

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "Rewrite the user's question to be self-contained, resolving any pronouns or references based on the conversation context. Return only the rewritten question."
                },
                {
                    "role": "user",
                    "content": f"Context:\n{recent_context}\n\nQuestion to rewrite: {message}"
                }
            ],
            max_tokens=100,
            temperature=0
        )

        return response.choices[0].message.content
```

---

## 4. Intent Detection and Routing

### Intent Classifier

```python
from enum import Enum
from typing import Tuple

class Intent(Enum):
    GREETING = "greeting"
    FAREWELL = "farewell"
    QUESTION = "question"
    COMPLAINT = "complaint"
    REQUEST = "request"
    FEEDBACK = "feedback"
    ESCALATE = "escalate"
    OUT_OF_SCOPE = "out_of_scope"
    UNKNOWN = "unknown"

class IntentClassifier:
    """Classify user intent."""

    def __init__(self):
        self.client = OpenAI()

        # Rule-based patterns for fast classification
        self.patterns = {
            Intent.GREETING: ["hello", "hi", "hey", "good morning", "good afternoon"],
            Intent.FAREWELL: ["bye", "goodbye", "see you", "thanks bye"],
            Intent.ESCALATE: ["speak to human", "talk to agent", "real person", "manager"],
        }

    def classify(self, message: str, use_llm: bool = True) -> Tuple[Intent, float]:
        """Classify intent with confidence score."""

        message_lower = message.lower()

        # Try rule-based first (fast)
        for intent, patterns in self.patterns.items():
            if any(p in message_lower for p in patterns):
                return intent, 0.95

        if not use_llm:
            return Intent.UNKNOWN, 0.0

        # Use LLM for complex classification
        return self._llm_classify(message)

    def _llm_classify(self, message: str) -> Tuple[Intent, float]:
        """Classify using LLM."""

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": """Classify the user message into one of these intents:
- greeting: User is saying hello
- farewell: User is saying goodbye
- question: User is asking for information
- complaint: User is expressing dissatisfaction
- request: User wants something done
- feedback: User is providing feedback
- escalate: User wants to talk to a human
- out_of_scope: Message is unrelated to our service

Respond with JSON: {"intent": "category", "confidence": 0.0-1.0}"""
                },
                {"role": "user", "content": message}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)
        intent = Intent(result.get("intent", "unknown"))
        confidence = result.get("confidence", 0.5)

        return intent, confidence


class IntentRouter:
    """Route conversations based on intent."""

    def __init__(self):
        self.classifier = IntentClassifier()
        self.handlers: Dict[Intent, callable] = {}

    def register_handler(self, intent: Intent, handler: callable):
        """Register a handler for an intent."""
        self.handlers[intent] = handler

    def route(self, message: str, context: Dict) -> str:
        """Route message to appropriate handler."""

        intent, confidence = self.classifier.classify(message)

        if intent in self.handlers:
            return self.handlers[intent](message, context)

        # Default handling
        return self._default_handler(message, context)

    def _default_handler(self, message: str, context: Dict) -> str:
        return "I'm not sure how to help with that. Could you rephrase?"
```

---

## 5. Human Handoff

### Escalation Manager

```python
from enum import Enum
from dataclasses import dataclass

class EscalationReason(Enum):
    USER_REQUEST = "user_requested"
    SENTIMENT = "negative_sentiment"
    COMPLEXITY = "too_complex"
    POLICY = "policy_violation"
    FAILURE = "bot_failure"
    VIP = "vip_customer"

@dataclass
class EscalationRequest:
    conversation_id: str
    reason: EscalationReason
    priority: int  # 1-5, 1 is highest
    summary: str
    customer_info: Dict
    transcript: List[Message]

class EscalationManager:
    """Manage escalation to human agents."""

    def __init__(self):
        self.client = OpenAI()

        # Escalation triggers
        self.triggers = {
            "keywords": ["lawyer", "sue", "legal", "refund", "manager", "supervisor"],
            "max_turns_without_resolution": 5,
            "sentiment_threshold": -0.5
        }

    def should_escalate(
        self,
        message: str,
        conversation: Conversation
    ) -> Tuple[bool, Optional[EscalationReason]]:
        """Determine if conversation should be escalated."""

        message_lower = message.lower()

        # Check for explicit escalation request
        escalation_phrases = ["talk to human", "real person", "agent", "representative"]
        if any(phrase in message_lower for phrase in escalation_phrases):
            return True, EscalationReason.USER_REQUEST

        # Check for trigger keywords
        if any(kw in message_lower for kw in self.triggers["keywords"]):
            return True, EscalationReason.POLICY

        # Check conversation length
        if len(conversation.messages) > self.triggers["max_turns_without_resolution"] * 2:
            return True, EscalationReason.COMPLEXITY

        # Check sentiment
        sentiment = self._analyze_sentiment(message)
        if sentiment < self.triggers["sentiment_threshold"]:
            return True, EscalationReason.SENTIMENT

        return False, None

    def create_escalation(
        self,
        conversation: Conversation,
        reason: EscalationReason,
        customer_info: Dict
    ) -> EscalationRequest:
        """Create an escalation request."""

        # Generate summary
        summary = self._summarize_conversation(conversation)

        # Determine priority
        priority = self._calculate_priority(reason, customer_info)

        return EscalationRequest(
            conversation_id=conversation.id,
            reason=reason,
            priority=priority,
            summary=summary,
            customer_info=customer_info,
            transcript=conversation.messages
        )

    def _analyze_sentiment(self, message: str) -> float:
        """Analyze message sentiment (-1 to 1)."""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Rate the sentiment of this message from -1 (very negative) to 1 (very positive). Return only the number."},
                {"role": "user", "content": message}
            ],
            max_tokens=5,
            temperature=0
        )
        try:
            return float(response.choices[0].message.content.strip())
        except:
            return 0.0

    def _summarize_conversation(self, conversation: Conversation) -> str:
        """Summarize conversation for agent."""
        transcript = "\n".join([f"{m.role}: {m.content}" for m in conversation.messages])

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Summarize this customer conversation for a human agent. Include: main issue, what was tried, customer sentiment."},
                {"role": "user", "content": transcript}
            ],
            max_tokens=200
        )
        return response.choices[0].message.content

    def _calculate_priority(self, reason: EscalationReason, customer_info: Dict) -> int:
        """Calculate escalation priority (1-5)."""
        priority = 3  # Default

        # Adjust based on reason
        if reason == EscalationReason.POLICY:
            priority = 1
        elif reason == EscalationReason.SENTIMENT:
            priority = 2
        elif reason == EscalationReason.USER_REQUEST:
            priority = 2

        # Adjust for VIP customers
        if customer_info.get("tier") == "premium":
            priority = max(1, priority - 1)

        return priority
```

---

## 6. Production Chatbot

```python
class ProductionChatbot:
    """Production-ready chatbot with all features."""

    def __init__(
        self,
        system_prompt: str,
        knowledge_base=None,  # RAG system
        model: str = "gpt-4o"
    ):
        self.system_prompt = system_prompt
        self.model = model
        self.client = OpenAI()

        # Components
        self.memory = ConversationMemory(InMemoryStore())
        self.context_manager = ContextManager()
        self.intent_router = IntentRouter()
        self.escalation_manager = EscalationManager()
        self.knowledge_base = knowledge_base
        self.followup_handler = FollowUpHandler()

        # Register intent handlers
        self._setup_handlers()

    def _setup_handlers(self):
        """Set up intent handlers."""
        self.intent_router.register_handler(Intent.GREETING, self._handle_greeting)
        self.intent_router.register_handler(Intent.FAREWELL, self._handle_farewell)
        self.intent_router.register_handler(Intent.ESCALATE, self._handle_escalate)

    def chat(
        self,
        message: str,
        conversation_id: str,
        user_info: Dict = None
    ) -> Dict:
        """Process a chat message."""

        # Load conversation
        messages = self.memory.get_context(conversation_id)
        conversation = Conversation(id=conversation_id, messages=messages)

        # Check for escalation
        should_escalate, reason = self.escalation_manager.should_escalate(
            message, conversation
        )
        if should_escalate:
            return self._handle_escalation(conversation, reason, user_info or {})

        # Classify intent
        intent, confidence = self.intent_router.classifier.classify(message)

        # Handle specific intents
        if intent in [Intent.GREETING, Intent.FAREWELL, Intent.ESCALATE]:
            response = self.intent_router.route(message, {"conversation": conversation})
        else:
            response = self._generate_response(message, conversation)

        # Store messages
        self.memory.add_message(conversation_id, Message(role="user", content=message))
        self.memory.add_message(conversation_id, Message(role="assistant", content=response))

        return {
            "response": response,
            "intent": intent.value,
            "escalated": False
        }

    def _generate_response(self, message: str, conversation: Conversation) -> str:
        """Generate response using LLM with optional RAG."""

        # Resolve follow-up references
        resolved_message = self.followup_handler.resolve_references(
            message, conversation.messages
        )

        # Get RAG context if available
        rag_context = ""
        if self.knowledge_base:
            docs = self.knowledge_base.search(resolved_message, top_k=3)
            if docs:
                rag_context = "\n\nRelevant information:\n" + "\n".join([d['content'] for d in docs])

        # Build prompt
        system = self.system_prompt + rag_context

        # Prepare context
        context = self.context_manager.prepare_context(
            system,
            conversation.messages
        )

        # Add current message
        context.append({"role": "user", "content": message})

        # Generate
        response = self.client.chat.completions.create(
            model=self.model,
            messages=context,
            temperature=0.7
        )

        return response.choices[0].message.content

    def _handle_greeting(self, message: str, context: Dict) -> str:
        return "Hello! How can I help you today?"

    def _handle_farewell(self, message: str, context: Dict) -> str:
        return "Goodbye! Feel free to reach out if you need anything else."

    def _handle_escalate(self, message: str, context: Dict) -> str:
        return "I understand you'd like to speak with a human agent. Let me connect you with someone who can help. Please hold."

    def _handle_escalation(
        self,
        conversation: Conversation,
        reason: EscalationReason,
        user_info: Dict
    ) -> Dict:
        """Handle escalation to human agent."""

        escalation = self.escalation_manager.create_escalation(
            conversation, reason, user_info
        )

        return {
            "response": f"I'm connecting you with a human agent. Your reference number is {conversation.id}. A representative will be with you shortly.",
            "escalated": True,
            "escalation_reason": reason.value,
            "priority": escalation.priority
        }
```

---

## Key Takeaways

1. **Memory is essential** - Chatbots need both short-term and long-term memory
2. **Context management matters** - Stay within token limits while preserving important context
3. **Intent routing** - Route conversations based on detected intent for better handling
4. **Know when to escalate** - Build clear triggers for human handoff
5. **Handle follow-ups** - Resolve references to maintain conversation coherence

---

## Next Module Preview

In **Module 7: AI in Web Applications**, you'll learn to integrate AI into frontend and backend web applications with streaming UI.

---

*Module 6 of 12 | Building AI-Powered Applications | Duration: 5 hours*
