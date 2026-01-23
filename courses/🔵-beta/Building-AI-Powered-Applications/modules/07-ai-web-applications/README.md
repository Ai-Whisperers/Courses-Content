# Module 7: AI in Web Applications

## Learning Objectives

By the end of this module, you will be able to:

1. Design frontend architectures for AI-powered features
2. Implement streaming responses with real-time UI updates
3. Build responsive interfaces that handle AI latency gracefully
4. Integrate AI capabilities into React, Next.js, and vanilla JavaScript applications
5. Handle errors and loading states effectively in AI-driven UIs

---

## Introduction

Integrating AI into web applications presents unique challenges that traditional web development doesn't address. You're dealing with requests that take seconds (not milliseconds), responses that arrive in chunks, and outputs that can vary dramatically in length and format.

This module bridges the gap between your backend AI capabilities and the user-facing experience. You'll learn patterns that make AI feel fast, responsive, and reliable—even when it isn't.

---

## 1. Frontend Architecture for AI Features

### The AI Request Lifecycle

AI requests differ fundamentally from typical API calls:

```
Traditional API                    AI API
─────────────────                 ─────────────────
Request  ─────▶ Response          Request  ─────▶ Token ─────▶ Token ─────▶ ... ─────▶ Done
         ~50ms                             ~500ms    ~50ms      ~50ms         ~2-30s
```

### Architecture Patterns

**Pattern 1: Synchronous (Simple)**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   UI Click   │────▶│   API Call   │────▶│   Render     │
└──────────────┘     └──────────────┘     └──────────────┘
                     (Wait 2-30 seconds)
```

Best for: Simple, infrequent AI calls where waiting is acceptable.

**Pattern 2: Streaming (Recommended)**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   UI Click   │────▶│  Stream API  │────▶│ Incremental  │
└──────────────┘     └──────────────┘     │   Render     │
                           │              └──────────────┘
                           │  Token ─────────▶ Update
                           │  Token ─────────▶ Update
                           │  Token ─────────▶ Update
                           └──────────────────▶ Done
```

Best for: Any text generation, chatbots, content creation.

**Pattern 3: Background Processing**
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Submit     │────▶│  Queue Job   │────▶│  Return ID   │
└──────────────┘     └──────────────┘     └──────────────┘
                           │
                           ▼ (Async processing)
┌──────────────┐     ┌──────────────┐
│   Poll/WS    │◀────│   Complete   │
└──────────────┘     └──────────────┘
```

Best for: Long-running tasks, batch processing, complex pipelines.

---

## 2. Implementing Streaming Responses

### Server-Sent Events (SSE) Basics

SSE provides a simple, browser-native way to receive streaming data:

```javascript
// Backend (Node.js/Express)
app.get('/api/generate', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: req.query.prompt }],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
});
```

```javascript
// Frontend
const eventSource = new EventSource('/api/generate?prompt=' + encodeURIComponent(prompt));

eventSource.onmessage = (event) => {
  if (event.data === '[DONE]') {
    eventSource.close();
    return;
  }

  const { content } = JSON.parse(event.data);
  updateUI(content);
};

eventSource.onerror = (error) => {
  console.error('Stream error:', error);
  eventSource.close();
};
```

### Fetch API Streaming

For more control, use the Fetch API with ReadableStream:

```javascript
async function streamCompletion(prompt, onChunk, onComplete, onError) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        onComplete();
        break;
      }

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const { content } = JSON.parse(data);
          onChunk(content);
        } catch (e) {
          // Handle parsing errors
        }
      }
    }
  } catch (error) {
    onError(error);
  }
}
```

---

## 3. React Integration Patterns

### Custom Hook for AI Streaming

```javascript
import { useState, useCallback, useRef } from 'react';

function useAIStream() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const generate = useCallback(async (prompt) => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setContent('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        // Parse SSE format
        const matches = chunk.match(/data: ({.*?})/g);
        if (matches) {
          for (const match of matches) {
            try {
              const { content: newContent } = JSON.parse(match.slice(6));
              setContent(prev => prev + newContent);
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return { content, isLoading, error, generate, cancel };
}
```

### Usage in Components

```jsx
function AIWriter() {
  const [prompt, setPrompt] = useState('');
  const { content, isLoading, error, generate, cancel } = useAIStream();

  const handleSubmit = (e) => {
    e.preventDefault();
    generate(prompt);
  };

  return (
    <div className="ai-writer">
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          disabled={isLoading}
        />
        <div className="actions">
          <button type="submit" disabled={isLoading || !prompt}>
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
          {isLoading && (
            <button type="button" onClick={cancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="error">
          Error: {error.message}
          <button onClick={() => generate(prompt)}>Retry</button>
        </div>
      )}

      {content && (
        <div className="output">
          <StreamingText content={content} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
```

### Streaming Text Component with Cursor

```jsx
function StreamingText({ content, isLoading }) {
  return (
    <div className="streaming-text">
      {content}
      {isLoading && <span className="cursor">▊</span>}
    </div>
  );
}

// CSS
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

---

## 4. Next.js Integration

### API Route with Streaming

```typescript
// app/api/generate/route.ts
import { OpenAI } from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  const { prompt, systemPrompt } = await req.json();

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
      { role: 'user', content: prompt },
    ],
    stream: true,
  });

  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
          );
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### Using Vercel AI SDK

The Vercel AI SDK simplifies streaming significantly:

```typescript
// app/api/chat/route.ts
import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

```tsx
// components/Chat.tsx
'use client';

import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.role}`}>
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}
```

---

## 5. Handling AI Latency

### Optimistic UI Patterns

Show immediate feedback while waiting for AI:

```jsx
function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(null);

  const sendMessage = async (content) => {
    // Add user message immediately
    const userMessage = { role: 'user', content, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);

    // Add pending assistant message
    const pendingId = Date.now() + 1;
    setPending({ id: pendingId, role: 'assistant', content: '' });

    try {
      await streamCompletion(
        content,
        // On chunk
        (chunk) => {
          setPending(prev => ({
            ...prev,
            content: prev.content + chunk,
          }));
        },
        // On complete
        () => {
          setPending(current => {
            setMessages(prev => [...prev, current]);
            return null;
          });
        },
        // On error
        (error) => {
          setPending(null);
          // Handle error
        }
      );
    } catch (error) {
      setPending(null);
    }
  };

  return (
    <div>
      {messages.map(m => <Message key={m.id} {...m} />)}
      {pending && <Message {...pending} isStreaming />}
    </div>
  );
}
```

### Skeleton Loading States

```jsx
function AIResponseSkeleton() {
  return (
    <div className="ai-response skeleton">
      <div className="skeleton-line" style={{ width: '90%' }} />
      <div className="skeleton-line" style={{ width: '75%' }} />
      <div className="skeleton-line" style={{ width: '85%' }} />
      <div className="skeleton-line" style={{ width: '40%' }} />
    </div>
  );
}

// CSS
.skeleton-line {
  height: 1em;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-bottom: 0.5em;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Progress Indicators

```jsx
function GenerationProgress({ stage, progress }) {
  const stages = [
    { key: 'processing', label: 'Processing request...' },
    { key: 'generating', label: 'Generating response...' },
    { key: 'formatting', label: 'Formatting output...' },
  ];

  return (
    <div className="progress-container">
      {stages.map((s, index) => (
        <div
          key={s.key}
          className={`stage ${
            stages.findIndex(st => st.key === stage) >= index ? 'active' : ''
          }`}
        >
          <span className="dot" />
          <span className="label">{s.label}</span>
        </div>
      ))}
      {progress > 0 && (
        <div className="progress-bar">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
```

---

## 6. Error Handling in AI UIs

### Comprehensive Error States

```jsx
function AIErrorBoundary({ error, onRetry, onCancel }) {
  const getErrorMessage = (error) => {
    if (error.status === 429) {
      return {
        title: 'Rate Limited',
        message: 'Too many requests. Please wait a moment.',
        retryable: true,
        retryDelay: 30000,
      };
    }
    if (error.status === 503) {
      return {
        title: 'Service Unavailable',
        message: 'The AI service is temporarily unavailable.',
        retryable: true,
        retryDelay: 5000,
      };
    }
    if (error.name === 'AbortError') {
      return {
        title: 'Request Cancelled',
        message: 'The request was cancelled.',
        retryable: true,
      };
    }
    return {
      title: 'Something Went Wrong',
      message: error.message || 'An unexpected error occurred.',
      retryable: true,
    };
  };

  const errorInfo = getErrorMessage(error);

  return (
    <div className="error-container" role="alert">
      <div className="error-icon">⚠️</div>
      <h3>{errorInfo.title}</h3>
      <p>{errorInfo.message}</p>
      <div className="error-actions">
        {errorInfo.retryable && (
          <button
            onClick={onRetry}
            className="retry-button"
          >
            Try Again
          </button>
        )}
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
}
```

### Automatic Retry Logic

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      // Don't retry client errors (except rate limits)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        throw new Error(`HTTP ${response.status}`);
      }

      lastError = new Error(`HTTP ${response.status}`);
      lastError.status = response.status;

    } catch (error) {
      lastError = error;
    }

    // Exponential backoff
    if (attempt < maxRetries - 1) {
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
```

---

## 7. Best Practices

### Performance Optimization

1. **Debounce User Input**
```javascript
const debouncedGenerate = useMemo(
  () => debounce((prompt) => generate(prompt), 500),
  [generate]
);
```

2. **Cancel Abandoned Requests**
```javascript
useEffect(() => {
  return () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };
}, []);
```

3. **Virtualize Long Outputs**
```jsx
import { VariableSizeList as List } from 'react-window';

function VirtualizedChat({ messages }) {
  // Efficiently render long conversation histories
  return (
    <List
      height={600}
      itemCount={messages.length}
      itemSize={(index) => getMessageHeight(messages[index])}
    >
      {({ index, style }) => (
        <div style={style}>
          <Message {...messages[index]} />
        </div>
      )}
    </List>
  );
}
```

### Accessibility

```jsx
function AccessibleAIOutput({ content, isLoading }) {
  return (
    <div
      role="region"
      aria-label="AI response"
      aria-live="polite"
      aria-busy={isLoading}
    >
      {isLoading && (
        <span className="sr-only">Generating response...</span>
      )}
      <div className="content">{content}</div>
    </div>
  );
}
```

---

## Key Takeaways

1. **Stream by default** - Streaming dramatically improves perceived performance
2. **Handle latency gracefully** - Use skeletons, progress indicators, and optimistic updates
3. **Plan for errors** - AI services fail; build resilient UIs with retry logic
4. **Cancel abandoned requests** - Don't waste resources on requests users have moved on from
5. **Test the waiting experience** - The loading state is a major part of your UX

---

## Knowledge Check

Before proceeding, verify you understand:

1. What is the difference between SSE and Fetch streaming?
2. How do you cancel an in-flight streaming request?
3. Why is debouncing important for AI features?
4. What makes AI error handling different from typical API error handling?
5. How does the Vercel AI SDK simplify streaming implementation?

---

## Next Module Preview

In **Module 8: Cost Optimization**, you'll learn techniques to reduce AI costs by 80-90%. We'll cover semantic caching, model tiering, prompt optimization, and monitoring strategies that protect your budget.

---

*Module 7 of 12 | Building AI-Powered Applications | Duration: 4 hours*
