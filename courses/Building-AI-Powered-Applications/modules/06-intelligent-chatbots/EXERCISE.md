# Module 6 Exercise: Intelligent Chatbot Lab

## Exercise Overview

**Objective**: Build a production-ready chatbot with memory, intent routing, and human handoff capabilities.

**Duration**: 3 hours

**Prerequisites**: Completed Modules 1-5

---

## Part 1: Basic Chatbot with Memory (40 minutes)

### Task 1.1: Implement Conversation Memory

```python
# memory.py
from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Dict, Optional

@dataclass
class Message:
    role: str
    content: str
    timestamp: datetime = field(default_factory=datetime.now)

@dataclass
class Conversation:
    id: str
    messages: List[Message] = field(default_factory=list)
    user_id: Optional[str] = None
    metadata: Dict = field(default_factory=dict)

class ConversationMemory:
    """Manage conversation memory with window limits."""

    def __init__(self, max_messages: int = 20):
        self.max_messages = max_messages
        self.conversations: Dict[str, Conversation] = {}

    def get_or_create(self, conversation_id: str, user_id: str = None) -> Conversation:
        """Get existing or create new conversation."""
        if conversation_id not in self.conversations:
            self.conversations[conversation_id] = Conversation(
                id=conversation_id,
                user_id=user_id
            )
        return self.conversations[conversation_id]

    def add_message(self, conversation_id: str, role: str, content: str):
        """Add message to conversation."""
        conv = self.get_or_create(conversation_id)
        conv.messages.append(Message(role=role, content=content))

        # TODO: Implement window limiting
        # If messages exceed max_messages, keep only the most recent
        if len(conv.messages) > self.max_messages:
            conv.messages = conv.messages[-self.max_messages:]

    def get_messages(self, conversation_id: str) -> List[Message]:
        """Get all messages for a conversation."""
        conv = self.get_or_create(conversation_id)
        return conv.messages

    def get_context_window(
        self,
        conversation_id: str,
        window_size: int = 10
    ) -> List[Dict]:
        """Get recent messages formatted for LLM."""
        messages = self.get_messages(conversation_id)
        recent = messages[-window_size:] if len(messages) > window_size else messages

        return [
            {"role": m.role, "content": m.content}
            for m in recent
        ]

    def clear(self, conversation_id: str):
        """Clear conversation history."""
        if conversation_id in self.conversations:
            self.conversations[conversation_id].messages = []


# Test memory
memory = ConversationMemory(max_messages=5)

# Simulate conversation
for i in range(7):
    memory.add_message("conv1", "user", f"Message {i}")
    memory.add_message("conv1", "assistant", f"Response {i}")

messages = memory.get_messages("conv1")
print(f"Total messages after 7 exchanges: {len(messages)}")
print(f"Expected: 10 (5 exchanges, limited to max_messages)")

# Check window
context = memory.get_context_window("conv1", window_size=4)
print(f"\nContext window (4 messages):")
for msg in context:
    print(f"  {msg['role']}: {msg['content']}")
```

### Task 1.2: Build Basic Chatbot

```python
# basic_chatbot.py
from openai import OpenAI

class BasicChatbot:
    """Chatbot with conversation memory."""

    def __init__(
        self,
        system_prompt: str,
        model: str = "gpt-4o"
    ):
        self.system_prompt = system_prompt
        self.model = model
        self.client = OpenAI()
        self.memory = ConversationMemory(max_messages=20)

    def chat(self, message: str, conversation_id: str) -> str:
        """Process a message and return response."""

        # Add user message to memory
        self.memory.add_message(conversation_id, "user", message)

        # Get context
        context = self.memory.get_context_window(conversation_id)

        # Build messages
        messages = [
            {"role": "system", "content": self.system_prompt},
            *context
        ]

        # Generate response
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7
        )

        assistant_message = response.choices[0].message.content

        # Save response to memory
        self.memory.add_message(conversation_id, "assistant", assistant_message)

        return assistant_message


# Test the chatbot
system_prompt = """You are a helpful customer support assistant for TechShop, an electronics retailer.
Be friendly, helpful, and concise. If you don't know something, say so."""

chatbot = BasicChatbot(system_prompt)

# Simulate conversation
conv_id = "test_conv_1"

responses = []
test_messages = [
    "Hi there!",
    "I bought a laptop last week and it's not turning on",
    "It's a Dell XPS 15, order number 12345",
    "I've tried holding the power button but nothing happens",
    "What are my options?"
]

for msg in test_messages:
    print(f"\nUser: {msg}")
    response = chatbot.chat(msg, conv_id)
    print(f"Bot: {response}")
    responses.append(response)
```

---

## Part 2: Intent Detection and Routing (45 minutes)

### Task 2.1: Build Intent Classifier

```python
# intent_classifier.py
from enum import Enum
import json

class Intent(Enum):
    GREETING = "greeting"
    FAREWELL = "farewell"
    ORDER_STATUS = "order_status"
    PRODUCT_QUESTION = "product_question"
    COMPLAINT = "complaint"
    RETURN_REQUEST = "return_request"
    ESCALATE = "escalate"
    GENERAL = "general"

class IntentClassifier:
    """Classify user intents."""

    def __init__(self):
        self.client = OpenAI()

        # Fast keyword matching
        self.keyword_intents = {
            Intent.GREETING: ["hello", "hi", "hey", "good morning", "good evening"],
            Intent.FAREWELL: ["bye", "goodbye", "see you", "thanks bye", "that's all"],
            Intent.ORDER_STATUS: ["order status", "where is my order", "track order", "delivery"],
            Intent.RETURN_REQUEST: ["return", "refund", "exchange", "send back"],
            Intent.ESCALATE: ["manager", "supervisor", "human", "real person", "agent"],
        }

    def classify(self, message: str) -> tuple[Intent, float]:
        """Classify intent with confidence."""

        message_lower = message.lower()

        # Try keyword matching first
        for intent, keywords in self.keyword_intents.items():
            if any(kw in message_lower for kw in keywords):
                return intent, 0.9

        # Use LLM for complex cases
        return self._llm_classify(message)

    def _llm_classify(self, message: str) -> tuple[Intent, float]:
        """Use LLM for classification."""

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": """Classify the customer message into one intent:
- greeting: Hello/Hi messages
- farewell: Goodbye messages
- order_status: Questions about order delivery/tracking
- product_question: Questions about products
- complaint: Expressing dissatisfaction
- return_request: Wanting to return/refund
- escalate: Asking for human agent
- general: Other questions

Return JSON: {"intent": "category", "confidence": 0.0-1.0}"""
                },
                {"role": "user", "content": message}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)
        try:
            intent = Intent(result.get("intent", "general"))
        except ValueError:
            intent = Intent.GENERAL

        return intent, result.get("confidence", 0.7)


# Test classifier
classifier = IntentClassifier()

test_messages = [
    "Hello!",
    "Where is my order #12345?",
    "This product is terrible, I want my money back",
    "Can I speak to a manager?",
    "What's the battery life on the iPhone 15?",
    "Thanks, goodbye!"
]

print("Intent Classification Results:")
print("-" * 50)
for msg in test_messages:
    intent, confidence = classifier.classify(msg)
    print(f"'{msg}'\n  -> {intent.value} ({confidence:.0%})")
```

### Task 2.2: Build Intent Router

```python
# intent_router.py

class IntentRouter:
    """Route messages based on intent."""

    def __init__(self, chatbot: BasicChatbot):
        self.chatbot = chatbot
        self.classifier = IntentClassifier()
        self.handlers: Dict[Intent, callable] = {}
        self._setup_handlers()

    def _setup_handlers(self):
        """Set up intent-specific handlers."""
        self.handlers = {
            Intent.GREETING: self._handle_greeting,
            Intent.FAREWELL: self._handle_farewell,
            Intent.ESCALATE: self._handle_escalate,
            Intent.ORDER_STATUS: self._handle_order_status,
        }

    def process(self, message: str, conversation_id: str) -> Dict:
        """Process message with intent routing."""

        # Classify intent
        intent, confidence = self.classifier.classify(message)

        # Route to handler or default
        if intent in self.handlers and confidence > 0.7:
            response = self.handlers[intent](message, conversation_id)
        else:
            response = self.chatbot.chat(message, conversation_id)

        return {
            "response": response,
            "intent": intent.value,
            "confidence": confidence
        }

    def _handle_greeting(self, message: str, conv_id: str) -> str:
        greetings = [
            "Hello! Welcome to TechShop support. How can I help you today?",
            "Hi there! I'm here to help with any questions about your orders or products.",
            "Good day! What can I assist you with?"
        ]
        import random
        return random.choice(greetings)

    def _handle_farewell(self, message: str, conv_id: str) -> str:
        return "Thank you for contacting TechShop! Have a great day. Feel free to reach out if you need anything else."

    def _handle_escalate(self, message: str, conv_id: str) -> str:
        return """I understand you'd like to speak with a human agent.

I'm connecting you now. Please hold while I transfer you to the next available representative.

Your reference number is: {conv_id}

Expected wait time: 2-3 minutes."""

    def _handle_order_status(self, message: str, conv_id: str) -> str:
        # In reality, would look up order in database
        return """I'd be happy to help you track your order!

To look up your order status, please provide:
1. Your order number (starts with #)
2. Or the email address used for the order

Once I have that information, I can check the current status and estimated delivery date."""


# Test router
router = IntentRouter(chatbot)

test_inputs = [
    ("Hi!", "conv_test"),
    ("Where is my order?", "conv_test"),
    ("I need to talk to someone real", "conv_test"),
    ("What's the return policy?", "conv_test"),
    ("Bye!", "conv_test")
]

print("\nIntent Router Results:")
print("=" * 60)
for msg, conv_id in test_inputs:
    result = router.process(msg, conv_id)
    print(f"\nUser: {msg}")
    print(f"Intent: {result['intent']} ({result['confidence']:.0%})")
    print(f"Response: {result['response'][:100]}...")
```

---

## Part 3: Human Escalation (35 minutes)

### Task 3.1: Implement Escalation Triggers

```python
# escalation.py
from enum import Enum
from dataclasses import dataclass

class EscalationReason(Enum):
    USER_REQUEST = "user_requested"
    NEGATIVE_SENTIMENT = "negative_sentiment"
    MULTIPLE_FAILURES = "multiple_failures"
    SENSITIVE_TOPIC = "sensitive_topic"

@dataclass
class EscalationTicket:
    conversation_id: str
    reason: EscalationReason
    priority: int
    summary: str
    transcript: List[Dict]

class EscalationManager:
    """Detect and handle escalation needs."""

    def __init__(self):
        self.client = OpenAI()

        # Trigger keywords
        self.escalation_keywords = [
            "manager", "supervisor", "human", "real person",
            "lawyer", "sue", "legal", "attorney"
        ]

        self.sensitive_keywords = [
            "refund over", "fraud", "stolen", "unauthorized",
            "security", "breach", "hacked"
        ]

    def check_escalation(
        self,
        message: str,
        conversation: List[Dict],
        failed_attempts: int = 0
    ) -> tuple[bool, Optional[EscalationReason]]:
        """Check if escalation is needed."""

        message_lower = message.lower()

        # Check explicit request
        if any(kw in message_lower for kw in self.escalation_keywords[:4]):
            return True, EscalationReason.USER_REQUEST

        # Check sensitive topics
        if any(kw in message_lower for kw in self.sensitive_keywords):
            return True, EscalationReason.SENSITIVE_TOPIC

        # Check for legal keywords
        if any(kw in message_lower for kw in self.escalation_keywords[4:]):
            return True, EscalationReason.SENSITIVE_TOPIC

        # Check sentiment
        sentiment = self._check_sentiment(message)
        if sentiment < -0.6:
            return True, EscalationReason.NEGATIVE_SENTIMENT

        # Check failed attempts
        if failed_attempts >= 3:
            return True, EscalationReason.MULTIPLE_FAILURES

        return False, None

    def _check_sentiment(self, message: str) -> float:
        """Quick sentiment check."""
        negative_indicators = [
            "terrible", "awful", "worst", "hate", "angry",
            "furious", "unacceptable", "ridiculous", "pathetic"
        ]
        positive_indicators = [
            "great", "thanks", "helpful", "appreciate", "good"
        ]

        message_lower = message.lower()
        neg_count = sum(1 for w in negative_indicators if w in message_lower)
        pos_count = sum(1 for w in positive_indicators if w in message_lower)

        if neg_count + pos_count == 0:
            return 0.0
        return (pos_count - neg_count) / (neg_count + pos_count)

    def create_ticket(
        self,
        conversation_id: str,
        reason: EscalationReason,
        messages: List[Dict]
    ) -> EscalationTicket:
        """Create escalation ticket."""

        # Generate summary
        summary = self._generate_summary(messages)

        # Determine priority
        priority = self._calculate_priority(reason, messages)

        return EscalationTicket(
            conversation_id=conversation_id,
            reason=reason,
            priority=priority,
            summary=summary,
            transcript=messages
        )

    def _generate_summary(self, messages: List[Dict]) -> str:
        """Generate conversation summary."""
        transcript = "\n".join([
            f"{m['role']}: {m['content']}"
            for m in messages[-10:]  # Last 10 messages
        ])

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "Summarize this customer conversation in 2-3 sentences for a human agent. Focus on: the issue, what was tried, customer sentiment."
                },
                {"role": "user", "content": transcript}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content

    def _calculate_priority(self, reason: EscalationReason, messages: List[Dict]) -> int:
        """Calculate priority 1-5 (1=highest)."""
        base_priority = {
            EscalationReason.SENSITIVE_TOPIC: 1,
            EscalationReason.USER_REQUEST: 2,
            EscalationReason.NEGATIVE_SENTIMENT: 2,
            EscalationReason.MULTIPLE_FAILURES: 3
        }
        return base_priority.get(reason, 3)


# Test escalation
escalation_mgr = EscalationManager()

test_cases = [
    ("I want to speak to a manager right now!", []),
    ("This is absolutely terrible service, I'm so angry!", []),
    ("My credit card was charged twice, this is fraud!", []),
    ("Can you help me with my order?", []),
]

print("\nEscalation Detection Results:")
print("-" * 50)
for msg, history in test_cases:
    should_escalate, reason = escalation_mgr.check_escalation(msg, history)
    print(f"'{msg[:50]}...'")
    print(f"  Escalate: {should_escalate}, Reason: {reason}")
```

---

## Part 4: Complete Chatbot System (40 minutes)

### Task 4.1: Build Production Chatbot

```python
# production_chatbot.py

class ProductionChatbot:
    """Full-featured production chatbot."""

    def __init__(self, system_prompt: str):
        self.system_prompt = system_prompt
        self.client = OpenAI()
        self.memory = ConversationMemory(max_messages=30)
        self.classifier = IntentClassifier()
        self.escalation_mgr = EscalationManager()
        self.failed_attempts: Dict[str, int] = {}

    def chat(
        self,
        message: str,
        conversation_id: str,
        user_info: Dict = None
    ) -> Dict:
        """Process a chat message."""

        # Get conversation history
        history = self.memory.get_context_window(conversation_id)

        # Check escalation triggers
        failed_count = self.failed_attempts.get(conversation_id, 0)
        should_escalate, reason = self.escalation_mgr.check_escalation(
            message, history, failed_count
        )

        if should_escalate:
            return self._handle_escalation(conversation_id, reason, history)

        # Classify intent
        intent, confidence = self.classifier.classify(message)

        # Store user message
        self.memory.add_message(conversation_id, "user", message)

        # Generate response based on intent
        if intent == Intent.GREETING:
            response = self._greeting_response()
        elif intent == Intent.FAREWELL:
            response = self._farewell_response()
        else:
            response = self._generate_response(message, conversation_id)

        # Store assistant response
        self.memory.add_message(conversation_id, "assistant", response)

        return {
            "response": response,
            "intent": intent.value,
            "confidence": confidence,
            "escalated": False
        }

    def _generate_response(self, message: str, conversation_id: str) -> str:
        """Generate response using LLM."""
        context = self.memory.get_context_window(conversation_id)

        messages = [
            {"role": "system", "content": self.system_prompt},
            *context,
            {"role": "user", "content": message}
        ]

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )

        return response.choices[0].message.content

    def _greeting_response(self) -> str:
        return "Hello! Welcome to TechShop support. I'm here to help with orders, products, returns, and more. What can I assist you with today?"

    def _farewell_response(self) -> str:
        return "Thank you for contacting TechShop! If you have any other questions, feel free to reach out. Have a great day!"

    def _handle_escalation(
        self,
        conversation_id: str,
        reason: EscalationReason,
        history: List[Dict]
    ) -> Dict:
        """Handle escalation to human."""
        ticket = self.escalation_mgr.create_ticket(
            conversation_id, reason, history
        )

        response = f"""I understand this is important and you'd like to speak with a human agent.

I'm transferring you now to our support team.

Reference #: {conversation_id}
Priority: {'High' if ticket.priority <= 2 else 'Normal'}

A representative will be with you shortly. Thank you for your patience."""

        return {
            "response": response,
            "intent": "escalate",
            "escalated": True,
            "ticket": {
                "id": conversation_id,
                "reason": reason.value,
                "priority": ticket.priority,
                "summary": ticket.summary
            }
        }


# Test full system
full_system_prompt = """You are a helpful customer support assistant for TechShop, an electronics retailer.

Your capabilities:
- Answer questions about products and orders
- Help with returns and exchanges
- Provide troubleshooting assistance
- Look up order status (ask for order number)

Guidelines:
- Be friendly, professional, and concise
- If you don't know something, say so
- For complex issues, offer to connect to a human
- Never make up order information"""

production_bot = ProductionChatbot(full_system_prompt)

# Simulate full conversation
conv_id = "prod_test_1"

conversation = [
    "Hi there!",
    "I ordered a laptop 3 days ago and haven't received it",
    "Order number is #78901",
    "The tracking says it's stuck in transit for 2 days",
    "This is unacceptable! I paid for express shipping!",
    "I want to speak to someone about this immediately!"
]

print("\nFull Conversation Simulation:")
print("=" * 60)

for msg in conversation:
    print(f"\nUser: {msg}")
    result = production_bot.chat(msg, conv_id)
    print(f"Intent: {result['intent']}")
    print(f"Response: {result['response']}")

    if result.get('escalated'):
        print(f"\n*** ESCALATION TRIGGERED ***")
        print(f"Reason: {result['ticket']['reason']}")
        print(f"Priority: {result['ticket']['priority']}")
        print(f"Summary: {result['ticket']['summary']}")
        break
```

---

## Part 5: Testing and Evaluation (20 minutes)

### Task 5.1: Create Test Suite

```python
# test_chatbot.py

def test_chatbot_system(chatbot: ProductionChatbot):
    """Run test scenarios."""

    test_scenarios = [
        {
            "name": "Happy Path - Order Inquiry",
            "messages": [
                "Hello",
                "I'd like to check my order status",
                "Order #12345",
                "Thanks for the help!"
            ],
            "expected_intents": ["greeting", "order_status", "general", "farewell"],
            "should_escalate": False
        },
        {
            "name": "Escalation - Angry Customer",
            "messages": [
                "Hi",
                "My package arrived damaged and I'm furious!",
                "This is terrible service!"
            ],
            "expected_intents": ["greeting", "complaint", "complaint"],
            "should_escalate": True
        },
        {
            "name": "Escalation - Human Request",
            "messages": [
                "I need to talk to a real person"
            ],
            "expected_intents": ["escalate"],
            "should_escalate": True
        }
    ]

    results = []

    for scenario in test_scenarios:
        print(f"\n{'='*50}")
        print(f"Testing: {scenario['name']}")
        print('='*50)

        conv_id = f"test_{scenario['name']}"
        escalated = False

        for i, msg in enumerate(scenario['messages']):
            result = chatbot.chat(msg, conv_id)
            print(f"  [{result['intent']}] {msg[:30]}... -> {result['response'][:50]}...")

            if result.get('escalated'):
                escalated = True
                break

        # Check results
        passed = escalated == scenario['should_escalate']
        results.append({
            "scenario": scenario['name'],
            "passed": passed,
            "escalated": escalated,
            "expected_escalation": scenario['should_escalate']
        })

        print(f"\n  Result: {'PASS' if passed else 'FAIL'}")

    return results


# Run tests
print("\nRunning Chatbot Tests")
test_results = test_chatbot_system(production_bot)

print("\n" + "="*50)
print("TEST SUMMARY")
print("="*50)
passed = sum(1 for r in test_results if r['passed'])
print(f"Passed: {passed}/{len(test_results)}")
```

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Memory System | 20 | Stores/retrieves messages, respects limits |
| Intent Classification | 20 | Accurate classification with confidence |
| Intent Routing | 15 | Proper handler selection |
| Escalation Detection | 20 | Detects triggers, creates tickets |
| Full System Integration | 20 | End-to-end conversation works |
| Testing | 5 | Test scenarios pass |
| **Total** | **100** | |

---

## Submission Checklist

- [ ] Memory system stores and retrieves messages
- [ ] Intent classifier identifies intents correctly
- [ ] Router directs to appropriate handlers
- [ ] Escalation triggers work (sentiment, keywords, user request)
- [ ] Full chatbot handles multi-turn conversations
- [ ] Test scenarios pass

---

*Exercise 6 of 12 | Building AI-Powered Applications | Duration: 3 hours*
