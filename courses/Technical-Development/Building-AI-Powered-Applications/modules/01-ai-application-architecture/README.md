# Module 1: AI Application Architecture

## Learning Objectives

By the end of this module, you will be able to:

1. Identify common AI application patterns and when to use each
2. Evaluate LLM capabilities and limitations for specific use cases
3. Choose the right model and provider for your application
4. Plan costs and estimate token usage accurately
5. Design architectures that meet security and compliance requirements

---

## Introduction

Building AI-powered applications requires a fundamentally different architectural mindset than traditional software development. You're working with probabilistic systems that have unique characteristics: variable response times, token-based costs, potential for inconsistent outputs, and capabilities that evolve rapidly.

This module establishes the architectural foundations you'll use throughout the course. Understanding these patterns and tradeoffs early will save you countless hours of refactoring later.

---

## 1. AI Application Patterns

### Pattern 1: Direct LLM Integration

The simplest pattern - your application calls an LLM API directly for each request.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│   LLM API   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Use Cases:**
- Content generation (marketing copy, summaries)
- Simple Q&A interfaces
- Code assistance tools
- Translation services

**Pros:**
- Simple to implement
- Low operational complexity
- Easy to understand and debug

**Cons:**
- High latency (2-30 seconds per request)
- Variable costs
- No memory between requests
- Limited by context window

**When to Use:**
- Stateless, one-off requests
- Low to medium volume applications
- When simplicity is more important than optimization

### Pattern 2: Retrieval-Augmented Generation (RAG)

Combine LLM capabilities with your own knowledge base.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│  Vector DB  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                           │                    │
                           │   + Context        │
                           ▼                    │
                    ┌─────────────┐             │
                    │   LLM API   │◀────────────┘
                    └─────────────┘
```

**Use Cases:**
- Customer support with company knowledge
- Documentation assistants
- Enterprise search
- Research assistants

**Pros:**
- Grounded in your data
- Reduces hallucinations
- Keeps knowledge current
- Scales with data volume

**Cons:**
- More complex architecture
- Requires embedding pipeline
- Retrieval quality affects output
- Additional infrastructure costs

### Pattern 3: Conversational AI (Chatbots)

Maintain context across multiple turns of conversation.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Server    │────▶│  Memory DB  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                           │                    │
                           │   + History        │
                           ▼                    │
                    ┌─────────────┐             │
                    │   LLM API   │◀────────────┘
                    └─────────────┘
```

**Use Cases:**
- Customer service chatbots
- Virtual assistants
- Coaching and tutoring
- Interactive applications

**Key Components:**
- Conversation state management
- Memory systems (short-term and long-term)
- Intent detection and routing
- Handoff to human agents

### Pattern 4: AI Agents

Autonomous systems that can take actions and use tools.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Agent     │────▶│   LLM API   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                           │                    │
                           │◀──────────────────┘
                           │   Tool Selection
                           ▼
                    ┌─────────────┐
                    │   Tools     │
                    │ - Search    │
                    │ - Database  │
                    │ - APIs      │
                    │ - Code Exec │
                    └─────────────┘
```

**Use Cases:**
- Complex task automation
- Research and analysis
- Code generation and execution
- Multi-step workflows

**Considerations:**
- Safety and guardrails are critical
- Need robust error handling
- Can be expensive (many LLM calls)
- Harder to predict behavior

---

## 2. LLM Capabilities and Limitations

### What LLMs Do Well

| Capability | Description | Example Use Case |
|------------|-------------|------------------|
| Text Generation | Create coherent, contextual text | Marketing copy, reports |
| Summarization | Condense long content | Meeting notes, articles |
| Translation | Convert between languages | Localization |
| Code Generation | Write and explain code | Developer tools |
| Reasoning | Multi-step logical thinking | Analysis, planning |
| Extraction | Pull structured data from text | Form processing |
| Classification | Categorize content | Ticket routing |
| Conversation | Natural dialog | Chatbots |

### What LLMs Do Poorly

| Limitation | Description | Mitigation |
|------------|-------------|------------|
| **Hallucination** | Generating false information confidently | RAG, fact-checking, citations |
| **Math** | Unreliable calculations | Use code/calculators |
| **Real-time Data** | No access to current information | RAG, function calling |
| **Consistency** | Same prompt may yield different results | Temperature=0, seed values |
| **Long Context** | Quality degrades with length | Chunking, summarization |
| **Private Data** | No knowledge of your data | RAG, fine-tuning |

### The Grounding Problem

LLMs have no inherent concept of truth - they generate statistically likely text. This means:

1. **Never trust LLM output without verification** for factual claims
2. **Ground responses in your data** using RAG
3. **Add validation layers** for critical applications
4. **Design for human review** where accuracy is essential

---

## 3. Choosing the Right Model

### Model Comparison Matrix (2025)

| Model | Best For | Context | Speed | Cost | Notes |
|-------|----------|---------|-------|------|-------|
| **GPT-4o** | General purpose, vision | 128K | Fast | Medium | Best all-around |
| **GPT-4 Turbo** | Complex reasoning | 128K | Medium | High | Highest quality |
| **Claude 3.5 Sonnet** | Long documents, coding | 200K | Fast | Medium | Great for analysis |
| **Claude 3 Opus** | Complex tasks | 200K | Slow | Highest | Maximum capability |
| **Claude 3.5 Haiku** | Speed, simple tasks | 200K | Fastest | Low | Best cost/speed |
| **GPT-3.5 Turbo** | Simple tasks | 16K | Very Fast | Very Low | Legacy, still useful |

### Decision Framework

```
START
  │
  ▼
Is task complex/nuanced?
  │
  ├── YES ──▶ Claude 3.5 Sonnet or GPT-4o
  │
  └── NO
        │
        ▼
      Is cost critical?
        │
        ├── YES ──▶ GPT-3.5 Turbo or Haiku
        │
        └── NO
              │
              ▼
            Is speed critical?
              │
              ├── YES ──▶ Claude 3.5 Haiku
              │
              └── NO ──▶ GPT-4o (default choice)
```

### Model Selection Best Practices

1. **Start with a capable model** - Optimize later
2. **Benchmark your specific use case** - Generic benchmarks may not apply
3. **Consider the full stack** - Model + prompts + retrieval
4. **Plan for model updates** - APIs and capabilities change
5. **Test multiple providers** - Competition keeps improving

---

## 4. Cost Planning and Estimation

### Understanding Token Pricing

Tokens are the fundamental unit of LLM pricing. Roughly:
- 1 token ≈ 4 characters in English
- 1 token ≈ 0.75 words
- 100 tokens ≈ 75 words

**Sample Pricing (per 1M tokens, as of late 2025):**

| Model | Input | Output |
|-------|-------|--------|
| GPT-4o | $2.50 | $10.00 |
| GPT-4 Turbo | $10.00 | $30.00 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| Claude 3.5 Haiku | $0.25 | $1.25 |
| GPT-3.5 Turbo | $0.50 | $1.50 |

### Cost Estimation Formula

```
Monthly Cost = (Requests × Avg Tokens × Price per Token) × 30

Example:
- 10,000 requests/day
- 2,000 tokens average (input + output)
- GPT-4o pricing
- Cost = 10,000 × 2,000 × ($2.50 + $10.00)/1M × 30
- Cost = 10,000 × 2,000 × $0.0000125 × 30 = $7,500/month
```

### Cost Optimization Strategies

| Strategy | Potential Savings | Implementation Effort |
|----------|-------------------|----------------------|
| Semantic caching | 60-80% | Medium |
| Model tiering | 50-70% | Low |
| Prompt optimization | 20-40% | Low |
| Token compression | 10-30% | Medium |
| Batching | 10-20% | Low |

---

## 5. Security and Compliance Architecture

### Security Layers

```
┌─────────────────────────────────────────────┐
│           Application Security              │
│  - Input validation                         │
│  - Output filtering                         │
│  - Rate limiting                            │
│  - Authentication/Authorization             │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│            Prompt Security                  │
│  - Injection prevention                     │
│  - Jailbreak detection                      │
│  - Content filtering                        │
│  - PII detection/masking                    │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│             Data Security                   │
│  - Encryption at rest                       │
│  - Encryption in transit                    │
│  - Data residency                           │
│  - Retention policies                       │
└─────────────────────────────────────────────┘
```

### Compliance Considerations

| Regulation | Key Requirements | AI Impact |
|------------|------------------|-----------|
| **GDPR** | Data minimization, right to explanation | Logging, data handling |
| **HIPAA** | PHI protection | BAA with providers |
| **SOC 2** | Security controls | Audit trails |
| **PCI DSS** | Cardholder data | Never send PCI data to LLMs |

### Architecture for Compliance

1. **API Key Management**
   - Never expose keys in frontend code
   - Use server-side proxy
   - Rotate keys regularly

2. **Data Flow Control**
   - Log all inputs/outputs (redacted)
   - Implement retention policies
   - Enable audit trails

3. **Content Moderation**
   - Filter inputs for prohibited content
   - Validate outputs before display
   - Implement human review for sensitive uses

---

## 6. Reference Architecture

### Production AI Application Stack

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐                │
│  │   Web    │   │  Mobile  │   │   API    │                │
│  └──────────┘   └──────────┘   └──────────┘                │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│  - Authentication    - Rate Limiting    - Request Routing   │
└──────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                          │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  Request  │  │  Prompt   │  │  Response │               │
│  │ Processor │─▶│  Builder  │─▶│ Handler   │               │
│  └───────────┘  └───────────┘  └───────────┘               │
└──────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│   VECTOR DB      │ │   CACHE      │ │   LLM GATEWAY    │
│  - Embeddings    │ │  - Semantic  │ │  - Load balance  │
│  - Similarity    │ │  - Results   │ │  - Fallback      │
│    search        │ │  - Sessions  │ │  - Rate limit    │
└──────────────────┘ └──────────────┘ └──────────────────┘
                                              │
                            ┌─────────────────┼─────────────────┐
                            ▼                 ▼                 ▼
                      ┌──────────┐      ┌──────────┐      ┌──────────┐
                      │  OpenAI  │      │ Anthropic│      │  Backup  │
                      └──────────┘      └──────────┘      └──────────┘
```

---

## Key Takeaways

1. **Choose the right pattern** - Direct, RAG, Conversational, or Agent based on your use case
2. **Understand limitations** - LLMs hallucinate; always ground in data and verify
3. **Select models strategically** - Start capable, optimize later
4. **Plan for costs** - Token pricing adds up; build optimization into your architecture
5. **Security is non-negotiable** - Design for compliance from day one

---

## Knowledge Check

Before moving on, ensure you can answer:

1. What are the four main AI application patterns?
2. When would you use RAG vs. direct LLM integration?
3. What's the main limitation of LLMs regarding factual accuracy?
4. How do you estimate monthly LLM costs?
5. What security considerations are unique to AI applications?

---

## Next Module Preview

In **Module 2: LLM API Integration**, you'll get hands-on with OpenAI and Anthropic APIs. You'll learn to handle authentication, streaming responses, error handling, and build your first API integration layer.

---

*Module 1 of 12 | Building AI-Powered Applications | Duration: 4 hours*
