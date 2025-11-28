# Module 7 Lab: Building an AI-Powered Web Application

## Lab Overview

**Duration:** 3-4 hours
**Difficulty:** Intermediate
**Prerequisites:** Modules 1-6, React/Next.js experience

In this lab, you'll build a complete AI-powered content generation application with streaming responses, proper error handling, and a polished user experience.

---

## Learning Objectives

By completing this lab, you will:

1. Implement streaming AI responses in a web application
2. Build responsive UI components that handle AI latency
3. Create proper loading and error states
4. Integrate the Vercel AI SDK (or custom streaming)
5. Deploy a production-ready AI feature

---

## Setup

### Prerequisites

```bash
# Create a new Next.js project
npx create-next-app@latest ai-content-app --typescript --tailwind --app
cd ai-content-app

# Install dependencies
npm install openai ai
```

### Environment Configuration

Create `.env.local`:
```
OPENAI_API_KEY=your_api_key_here
```

---

## Part 1: Basic Streaming API Route (30 minutes)

### Task 1.1: Create the API Route

Create `app/api/generate/route.ts`:

```typescript
import { OpenAI } from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompts: Record<string, string> = {
      blog: 'You are an expert blog writer. Write engaging, well-structured blog content.',
      email: 'You are a professional email writer. Write clear, concise business emails.',
      social: 'You are a social media expert. Write engaging posts optimized for engagement.',
      code: 'You are a senior developer. Write clean, well-documented code with explanations.',
    };

    const systemPrompt = systemPrompts[type] || 'You are a helpful writing assistant.';

    // TODO: Implement streaming response
    // Your code here

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

**Your Task:** Complete the API route to:
1. Call OpenAI with streaming enabled
2. Return a proper SSE response
3. Handle the stream-to-response conversion

### Task 1.2: Test Your API

Create a simple test script or use curl:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a short greeting", "type": "blog"}'
```

**Expected Output:** Streaming text response with proper SSE format.

---

## Part 2: Streaming UI Hook (45 minutes)

### Task 2.1: Create the useAIGeneration Hook

Create `hooks/useAIGeneration.ts`:

```typescript
'use client';

import { useState, useCallback, useRef } from 'react';

interface UseAIGenerationOptions {
  onStart?: () => void;
  onComplete?: (content: string) => void;
  onError?: (error: Error) => void;
}

interface UseAIGenerationReturn {
  content: string;
  isLoading: boolean;
  error: Error | null;
  generate: (prompt: string, type: string) => Promise<void>;
  cancel: () => void;
  reset: () => void;
}

export function useAIGeneration(
  options: UseAIGenerationOptions = {}
): UseAIGenerationReturn {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (prompt: string, type: string) => {
    // TODO: Implement the generate function
    // 1. Cancel any existing request
    // 2. Create new AbortController
    // 3. Reset state
    // 4. Make fetch request with streaming
    // 5. Parse SSE responses
    // 6. Update content progressively
    // 7. Handle errors appropriately
    // 8. Call lifecycle callbacks

    // Your code here

  }, [options]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    cancel();
    setContent('');
    setError(null);
  }, [cancel]);

  return { content, isLoading, error, generate, cancel, reset };
}
```

**Your Task:** Complete the `generate` function with:
1. Request cancellation logic
2. Proper state management
3. SSE parsing
4. Error handling
5. Lifecycle callback integration

### Task 2.2: Verify Hook Functionality

Create a simple test component to verify your hook works:

```typescript
// Quick test component
export function HookTest() {
  const { content, isLoading, error, generate } = useAIGeneration({
    onComplete: (c) => console.log('Complete:', c.length, 'chars'),
  });

  return (
    <div>
      <button onClick={() => generate('Say hello', 'blog')}>
        Test Generate
      </button>
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      <p>Error: {error?.message || 'None'}</p>
      <p>Content: {content}</p>
    </div>
  );
}
```

---

## Part 3: Content Generator Component (60 minutes)

### Task 3.1: Build the Main Generator UI

Create `components/ContentGenerator.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useAIGeneration } from '@/hooks/useAIGeneration';

const contentTypes = [
  { id: 'blog', label: 'Blog Post', icon: '📝', placeholder: 'Describe your blog topic...' },
  { id: 'email', label: 'Email', icon: '✉️', placeholder: 'Describe the email purpose...' },
  { id: 'social', label: 'Social Post', icon: '📱', placeholder: 'Describe your social media post...' },
  { id: 'code', label: 'Code', icon: '💻', placeholder: 'Describe what code you need...' },
];

export function ContentGenerator() {
  const [selectedType, setSelectedType] = useState('blog');
  const [prompt, setPrompt] = useState('');

  const {
    content,
    isLoading,
    error,
    generate,
    cancel,
    reset,
  } = useAIGeneration({
    onComplete: () => {
      // Optional: Show success notification
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      generate(prompt, selectedType);
    }
  };

  // TODO: Build the complete UI
  // 1. Content type selector (tabs or buttons)
  // 2. Prompt textarea with character count
  // 3. Generate/Cancel buttons
  // 4. Error display with retry option
  // 5. Streaming output display with cursor
  // 6. Copy to clipboard button
  // 7. Reset functionality

  return (
    <div className="content-generator">
      {/* Your UI implementation here */}
    </div>
  );
}
```

**Your Task:** Build a polished UI with:
1. Visual content type selector
2. Character-counted textarea
3. Proper button states (loading, disabled)
4. Error display with retry
5. Streaming output with blinking cursor
6. Copy functionality

### Task 3.2: Add Loading States

Create `components/LoadingStates.tsx`:

```typescript
export function StreamingCursor() {
  // TODO: Blinking cursor component
}

export function SkeletonLoader() {
  // TODO: Skeleton loading animation
}

export function ProgressIndicator({ stage }: { stage: string }) {
  // TODO: Multi-stage progress indicator
}
```

**Your Task:** Implement three loading state components:
1. Animated blinking cursor for streaming
2. Skeleton loader for initial load
3. Progress indicator showing generation stages

---

## Part 4: Error Handling (45 minutes)

### Task 4.1: Create Error Component

Create `components/ErrorDisplay.tsx`:

```typescript
interface ErrorDisplayProps {
  error: Error;
  onRetry: () => void;
  onDismiss: () => void;
}

export function ErrorDisplay({ error, onRetry, onDismiss }: ErrorDisplayProps) {
  // TODO: Implement error display
  // 1. Parse error type (rate limit, network, server, etc.)
  // 2. Show appropriate message
  // 3. Show retry button with countdown for rate limits
  // 4. Show dismiss button
  // 5. Make it accessible (role="alert")

  return (
    <div role="alert" className="error-display">
      {/* Your implementation */}
    </div>
  );
}
```

**Your Task:** Create an error component that:
1. Identifies error types (429, 503, network, etc.)
2. Shows user-friendly messages
3. Has rate-limit countdown
4. Provides retry/dismiss actions

### Task 4.2: Implement Retry with Backoff

Add to your useAIGeneration hook:

```typescript
// Add retry logic to your hook
const generateWithRetry = useCallback(async (
  prompt: string,
  type: string,
  maxRetries = 3
) => {
  // TODO: Implement retry with exponential backoff
  // 1. Track retry count
  // 2. Calculate delay (1s, 2s, 4s)
  // 3. Only retry on retryable errors
  // 4. Update UI between retries

}, [generate]);
```

---

## Part 5: Production Enhancements (45 minutes)

### Task 5.1: Add Analytics Tracking

Create `lib/analytics.ts`:

```typescript
interface GenerationEvent {
  type: string;
  promptLength: number;
  outputLength: number;
  duration: number;
  success: boolean;
  error?: string;
}

export function trackGeneration(event: GenerationEvent) {
  // TODO: Implement analytics tracking
  // 1. Log to console in development
  // 2. Send to analytics service in production
  // 3. Store in local metrics for debugging
}

export function getGenerationMetrics() {
  // TODO: Return aggregated metrics
  // - Total generations
  // - Success rate
  // - Average duration
  // - Error breakdown
}
```

### Task 5.2: Add Keyboard Shortcuts

Enhance your ContentGenerator with keyboard support:

```typescript
// Add to ContentGenerator
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // TODO: Implement shortcuts
    // Cmd/Ctrl + Enter: Generate
    // Escape: Cancel
    // Cmd/Ctrl + K: Clear
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [/* dependencies */]);
```

### Task 5.3: Add Copy with Formatting

```typescript
async function copyToClipboard(content: string, format: 'plain' | 'markdown' | 'html') {
  // TODO: Implement smart copy
  // 1. Format content based on type
  // 2. Use Clipboard API
  // 3. Show success/failure feedback
  // 4. Fall back to document.execCommand if needed
}
```

---

## Part 6: Putting It All Together (30 minutes)

### Task 6.1: Create the Main Page

Update `app/page.tsx`:

```typescript
import { ContentGenerator } from '@/components/ContentGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Content Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate high-quality content instantly with AI
          </p>
        </header>

        <ContentGenerator />

        <footer className="mt-12 text-center text-sm text-gray-500">
          Powered by OpenAI GPT-4
        </footer>
      </div>
    </main>
  );
}
```

### Task 6.2: Style with Tailwind

Create styles for your components. Here's a starting point:

```css
/* Add to globals.css */

.streaming-text {
  @apply font-mono whitespace-pre-wrap;
}

.cursor {
  @apply inline-block w-2 h-5 bg-blue-500 ml-0.5;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.skeleton-line {
  @apply h-4 bg-gray-200 rounded;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## Submission Requirements

### Deliverables

1. **Complete source code** with:
   - Streaming API route
   - useAIGeneration hook
   - ContentGenerator component
   - Error handling components
   - Loading state components

2. **Screenshots** showing:
   - Initial state
   - Loading/streaming state
   - Completed generation
   - Error state

3. **Brief writeup** (200-300 words) covering:
   - Challenges faced
   - Design decisions made
   - Potential improvements

### Grading Rubric

| Criteria | Points |
|----------|--------|
| Streaming API implementation | 15 |
| useAIGeneration hook functionality | 20 |
| UI component completeness | 20 |
| Error handling robustness | 15 |
| Loading states and UX | 15 |
| Code quality and organization | 10 |
| Documentation/writeup | 5 |
| **Total** | **100** |

### Grading Scale

- **A (90-100):** Exceeds requirements with polished implementation
- **B (80-89):** Meets all requirements with good quality
- **C (70-79):** Meets core requirements, some gaps
- **D (60-69):** Partial implementation, significant gaps
- **F (<60):** Does not meet minimum requirements

---

## Bonus Challenges (Optional)

### Bonus 1: Multiple Models (+10 points)
Add a model selector allowing users to choose between GPT-4o and GPT-3.5 Turbo.

### Bonus 2: Generation History (+10 points)
Store and display previous generations with the ability to restore them.

### Bonus 3: Export Options (+5 points)
Add export to PDF, Word, or Markdown file.

### Bonus 4: Dark Mode (+5 points)
Implement a theme toggle with proper dark mode styles.

---

## Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI Streaming Guide](https://platform.openai.com/docs/guides/streaming)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## Solution Hints

<details>
<summary>Hint 1: SSE Response Structure</summary>

```typescript
// Each chunk should be formatted as:
`data: ${JSON.stringify({ content: chunk })}\n\n`

// End with:
`data: [DONE]\n\n`
```
</details>

<details>
<summary>Hint 2: Parsing SSE in Frontend</summary>

```typescript
const lines = chunk.split('\n');
for (const line of lines) {
  if (line.startsWith('data: ')) {
    const data = line.slice(6);
    if (data !== '[DONE]') {
      const { content } = JSON.parse(data);
      // Use content
    }
  }
}
```
</details>

<details>
<summary>Hint 3: Proper Abort Handling</summary>

```typescript
// In generate function:
if (abortControllerRef.current) {
  abortControllerRef.current.abort();
}
abortControllerRef.current = new AbortController();

// In fetch:
signal: abortControllerRef.current.signal

// In catch:
if (error.name === 'AbortError') {
  // User cancelled, don't treat as error
  return;
}
```
</details>

---

*Lab 7 of 12 | Building AI-Powered Applications | Duration: 3-4 hours*
