# Module 7 Quiz: AI in Web Applications

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY advantage of streaming AI responses in web applications?

A) Reduces API costs
B) Improves perceived performance by showing content progressively
C) Makes the AI model faster
D) Reduces server load

### Question 2
Which HTTP header is REQUIRED for Server-Sent Events (SSE)?

A) `Content-Type: application/json`
B) `Content-Type: text/event-stream`
C) `Content-Type: text/html`
D) `Content-Type: application/octet-stream`

### Question 3
What is the correct format for an SSE data message?

A) `{ "data": "content" }`
B) `data: content`
C) `data: content\n\n`
D) `content: data`

### Question 4
When using the Fetch API for streaming, which object do you use to read the stream?

A) `response.json()`
B) `response.text()`
C) `response.body.getReader()`
D) `response.stream()`

### Question 5
What should happen when a user submits a new AI request while one is still in progress?

A) Queue the new request
B) Ignore the new request
C) Cancel the existing request and start the new one
D) Run both requests simultaneously

### Question 6
Which React pattern is BEST for managing streaming state in components?

A) Global state only (Redux/Context)
B) Local state with useState only
C) Custom hook with useRef for abort controller and useState for content
D) Class components with lifecycle methods

### Question 7
What is the purpose of `AbortController` in AI streaming requests?

A) To speed up the request
B) To allow cancellation of in-flight requests
C) To handle errors automatically
D) To retry failed requests

### Question 8
Which approach provides the BEST user experience while waiting for AI responses?

A) Show a blank screen until complete
B) Show a simple "Loading..." text
C) Show a skeleton loader, then stream content with a cursor indicator
D) Show an alert when complete

### Question 9
What is "optimistic UI" in the context of AI chat applications?

A) Always showing positive messages
B) Immediately showing the user's message before the AI responds
C) Caching all responses
D) Showing the AI response before it's generated

### Question 10
Which is the correct way to handle SSE connection errors?

A) Ignore them
B) Retry immediately without limit
C) Show an error message with retry option and exponential backoff
D) Refresh the entire page

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: The EventSource API automatically reconnects when the connection is lost.

### Question 12
True or False: You should always use `response.json()` to parse streaming responses.

### Question 13
True or False: The Vercel AI SDK's `useChat` hook handles streaming, state management, and error handling automatically.

### Question 14
True or False: ARIA live regions help screen readers announce streaming content updates.

### Question 15
True or False: Rate limit errors (HTTP 429) should be retried immediately without waiting.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your AI chat application shows this behavior:
- User sends a message
- Loading spinner appears
- 15 seconds of nothing
- Suddenly, the entire AI response appears at once

**Question:** What is MOST likely the problem?

A) The AI model is too slow
B) Streaming is not properly implemented; response is being buffered
C) The network connection is slow
D) The response is too long

### Question 17
**Scenario:** Your streaming implementation works fine on localhost, but in production:
- First few characters appear
- Connection closes unexpectedly
- Error: "Connection timed out"

**Question:** What is the MOST likely cause?

A) The AI API is down
B) A proxy, load balancer, or CDN is buffering/timing out the SSE connection
C) The user's browser is outdated
D) SSL certificate issues

### Question 18
**Scenario:** Users report that when they type a new message during AI generation:
- The old response keeps streaming
- The new response starts
- Both responses get mixed together in the output

**Question:** What is missing from your implementation?

A) Rate limiting
B) Proper request cancellation before starting new requests
C) Message queuing
D) User authentication

### Question 19
**Scenario:** Your AI feature has these metrics:
- Average response time: 8 seconds
- User abandonment rate: 60%
- Error rate: 5%

**Question:** What should be your TOP priority improvement?

A) Reduce error rate to 0%
B) Implement streaming to show progress and reduce perceived latency
C) Add more AI features
D) Optimize server performance

### Question 20
**Scenario:** A user reports: "I clicked Generate, saw the response streaming, then my browser tab crashed. When I came back, I had to start over."

**Question:** What feature would BEST address this issue?

A) Faster generation
B) Auto-save/persistence of generation progress to localStorage or database
C) Shorter responses
D) More memory in the user's computer

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Improves perceived performance by showing content progressively
   - *Streaming shows users that something is happening, making waits feel shorter.*

2. **B** - `Content-Type: text/event-stream`
   - *This header tells the browser to expect an SSE stream.*

3. **C** - `data: content\n\n`
   - *SSE requires "data: " prefix and double newline to mark message end.*

4. **C** - `response.body.getReader()`
   - *The ReadableStream reader allows processing chunks as they arrive.*

5. **C** - Cancel the existing request and start the new one
   - *Users expect their latest action to take precedence; cancel old requests.*

6. **C** - Custom hook with useRef for abort controller and useState for content
   - *This pattern provides reusability, proper cleanup, and cancellation support.*

7. **B** - To allow cancellation of in-flight requests
   - *AbortController.abort() cancels fetch requests when passed via signal.*

8. **C** - Show a skeleton loader, then stream content with a cursor indicator
   - *This combination provides clear feedback throughout the waiting period.*

9. **B** - Immediately showing the user's message before the AI responds
   - *Optimistic UI shows immediate feedback while async operations complete.*

10. **C** - Show an error message with retry option and exponential backoff
    - *Users need clear feedback and a way to recover; backoff prevents overwhelming servers.*

### Section 2: True/False

11. **True** - EventSource has built-in reconnection with configurable retry intervals.

12. **False** - Streaming responses must be read incrementally via `getReader()`, not parsed as complete JSON.

13. **True** - The Vercel AI SDK provides a complete solution for chat/completion streaming.

14. **True** - `aria-live="polite"` announces changes to assistive technologies.

15. **False** - Rate limit errors should wait (often indicated in Retry-After header) before retrying.

### Section 3: Scenario-Based

16. **B** - Streaming is not properly implemented; response is being buffered
    - *True streaming shows content progressively; buffering defeats the purpose.*

17. **B** - A proxy, load balancer, or CDN is buffering/timing out the SSE connection
    - *Infrastructure often doesn't expect long-lived connections; configure appropriately.*

18. **B** - Proper request cancellation before starting new requests
    - *Without abort(), old requests continue and their responses arrive mixed with new ones.*

19. **B** - Implement streaming to show progress and reduce perceived latency
    - *60% abandonment suggests users aren't willing to wait; streaming helps most.*

20. **B** - Auto-save/persistence of generation progress to localStorage or database
    - *Persistence allows recovery from crashes, tab closes, or navigation away.*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready to build production AI web features |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Review streaming and error handling |
| 12-13 | D | Needs Improvement - Revisit core concepts |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these key areas:

**Streaming Fundamentals (Questions 1-4, 11-12, 16):**
- SSE format and headers
- ReadableStream API
- Difference between buffered and streamed responses

**State Management (Questions 5-7, 18):**
- AbortController usage
- Request cancellation
- Custom hooks for streaming

**UX Best Practices (Questions 8-9, 14, 19-20):**
- Loading indicators
- Optimistic UI
- Accessibility
- Progress persistence

**Error Handling (Questions 10, 15, 17):**
- Retry strategies
- Rate limit handling
- Infrastructure considerations

---

*Quiz 7 of 12 | Building AI-Powered Applications | Duration: 25 minutes*
