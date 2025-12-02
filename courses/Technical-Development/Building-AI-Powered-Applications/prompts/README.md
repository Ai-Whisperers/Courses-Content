# Building AI-Powered Applications - Prompt Library

> Prompts for developing AI-integrated applications

---

## API Integration Prompts

### API Client Setup

```
Generate a [language] API client for [LLM provider].

Requirements:
- Support for chat completions endpoint
- Retry logic with exponential backoff
- Rate limiting handling
- Streaming support
- Error handling with custom exceptions
- Async/await support

Include:
- Configuration management
- Type definitions
- Usage examples
- Basic tests
```

### Prompt Template System

```
Design a prompt template system for [application type].

Features needed:
- Variable substitution
- Version control for templates
- Template composition (combining templates)
- Validation of required variables
- Default values support

Provide:
- Data model design
- Core functions
- Storage approach
- Example usage
```

---

## RAG System Prompts

### Document Chunking Strategy

```
Design a document chunking strategy for [document type].

Considerations:
- Average document size: [size]
- Content structure: [structured/unstructured]
- Query types: [expected queries]
- Embedding model: [model name]

Provide:
- Recommended chunk size
- Overlap strategy
- Handling of special elements (tables, code, headers)
- Metadata to preserve
```

### Retrieval Query Generator

```
Create a query expansion system for RAG.

Input query: [user query]
Domain: [application domain]

Generate:
1. Original query reformulated for semantic search
2. 3 alternative phrasings
3. Key terms to boost
4. Filters to apply (if applicable)
```

### Context Window Optimizer

```
I have [X] chunks retrieved with total tokens [Y].
My context window limit is [Z] tokens.
User query: [query]

Help me:
1. Rank chunks by relevance to query
2. Select optimal subset within token limit
3. Determine best ordering for context
4. Identify if any critical context is missing
```

---

## Chatbot Development Prompts

### System Prompt Generator

```
Create a system prompt for a [chatbot type] with these characteristics:

Purpose: [what the bot does]
Personality: [traits]
Knowledge domain: [what it knows]
Constraints: [what it shouldn't do]
Tone: [how it communicates]

Include:
- Role definition
- Behavioral guidelines
- Output format rules
- Fallback behaviors
- Safety guardrails
```

### Conversation Flow Designer

```
Design a conversation flow for [use case]:

User goals:
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

Provide:
- Happy path flow
- Edge case handling
- Clarification prompts
- Handoff triggers
- Example conversations
```

---

## Embedding & Vector Search

### Embedding Generation

```
Generate text for embedding that represents [concept/entity].

Include:
- Primary description
- Key attributes
- Relationships to other concepts
- Common variations/synonyms
- Use case context

Optimize for:
- Semantic similarity to queries like: [example queries]
- Distinction from: [similar but different concepts]
```

### Similarity Threshold Tuning

```
Help me tune similarity thresholds for [application].

Sample queries and expected results:
1. Query: [q1] → Should match: [docs]
2. Query: [q2] → Should match: [docs]
3. Query: [q3] → Should NOT match: [docs]

Current issues:
- [False positives/negatives observed]

Recommend:
- Similarity threshold ranges to test
- Additional filtering criteria
- Query preprocessing steps
```

---

## Cost Optimization

### Token Usage Analysis

```
Analyze this prompt for token efficiency:

[PASTE PROMPT]

Provide:
1. Current estimated token count
2. Redundant or verbose sections
3. Optimization suggestions
4. Rewritten efficient version
5. Estimated savings percentage
```

### Model Selection Guide

```
Help me choose the right model for [use case]:

Requirements:
- Task complexity: [low/medium/high]
- Response quality needed: [1-10]
- Latency requirement: [ms]
- Volume: [requests/day]
- Budget: [$/month]

Consider:
- GPT-4 vs GPT-3.5
- Claude Opus vs Sonnet vs Haiku
- Fine-tuned smaller models
- Local models

Provide recommendation with cost analysis.
```

---

## Evaluation & Testing

### Test Case Generator

```
Generate test cases for [AI feature]:

Feature description: [description]
Input format: [format]
Expected behavior: [behavior]

Generate:
1. 5 happy path cases
2. 5 edge cases
3. 3 adversarial inputs
4. 2 boundary cases

For each test case provide:
- Input
- Expected output
- Why this tests something important
```

### Output Quality Evaluator

```
Evaluate this AI output for quality:

Prompt used: [prompt]
Output received: [output]
Expected output: [ideal output]

Score on:
1. Accuracy (0-10): Does it answer correctly?
2. Completeness (0-10): All aspects covered?
3. Formatting (0-10): Follows requested format?
4. Tone (0-10): Matches desired style?
5. Safety (0-10): No harmful content?

Overall assessment and improvement suggestions.
```

---

## Production Deployment

### Error Handling Strategy

```
Design error handling for [AI feature]:

Potential errors:
- API rate limits
- Timeout errors
- Invalid responses
- Content filtering blocks
- Token limit exceeded

For each error:
- Detection method
- User-facing message
- Logging requirements
- Retry strategy
- Fallback behavior
```

### Monitoring Dashboard

```
Design monitoring for [AI application]:

Metrics to track:
1. Performance metrics
2. Quality metrics
3. Cost metrics
4. Error metrics

For each metric:
- What to measure
- Collection method
- Alert thresholds
- Dashboard visualization
```

---

## Security Prompts

### Input Validation

```
Create input validation rules for [AI feature]:

Expected inputs:
- Type: [type]
- Format: [format]
- Length: [constraints]

Check for:
- Prompt injection attempts
- PII exposure risks
- Malicious content
- Token limit abuse

Provide:
- Validation rules
- Sanitization steps
- Rejection responses
```

### Output Safety Check

```
Review this AI output for safety:

[PASTE OUTPUT]

Check for:
- [ ] Hallucinated facts
- [ ] PII leakage
- [ ] Harmful content
- [ ] Bias concerns
- [ ] Off-topic content
- [ ] Confidential information exposure

Flag any issues with severity and remediation.
```
