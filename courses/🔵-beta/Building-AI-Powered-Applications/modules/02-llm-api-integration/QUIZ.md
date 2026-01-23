# Module 2 Quiz: LLM API Integration

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
Which parameter makes an OpenAI API response deterministic (reproducible)?

A) `max_tokens=100`
B) `temperature=0`
C) `stream=True`
D) `top_p=1.0`

### Question 2
How do you access the response content in Anthropic's API?

A) `response.content`
B) `response.choices[0].message.content`
C) `response.content[0].text`
D) `response.text`

### Question 3
What HTTP status code indicates rate limiting?

A) 400
B) 401
C) 429
D) 500

### Question 4
What is the PRIMARY benefit of streaming responses?

A) Lower cost per token
B) Reduced perceived latency for users
C) Better quality responses
D) Automatic retry on errors

### Question 5
In exponential backoff, if the base delay is 1 second and you're on attempt 3, what's the delay (without jitter)?

A) 2 seconds
B) 3 seconds
C) 4 seconds
D) 8 seconds

### Question 6
Where should you store LLM API keys in a production application?

A) In the frontend JavaScript code
B) Hardcoded in the backend source code
C) In environment variables or a secrets manager
D) In a public GitHub repository

### Question 7
Which error type should NOT be automatically retried?

A) Rate limit (429)
B) Server error (500)
C) Connection timeout
D) Invalid API key (401)

### Question 8
What's the difference between `temperature` and `top_p` parameters?

A) They are completely unrelated
B) Both control randomness but through different mechanisms
C) Temperature is for OpenAI, top_p is for Anthropic
D) Temperature affects speed, top_p affects cost

### Question 9
How should you handle the system prompt when using Anthropic's API?

A) Include it as the first message with role "system"
B) Pass it as a separate `system` parameter
C) Append it to the user message
D) System prompts aren't supported

### Question 10
What does `finish_reason: "length"` indicate?

A) The response completed successfully
B) The model reached max_tokens limit before finishing
C) An error occurred
D) The user's message was too long

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: OpenAI and Anthropic APIs have identical request/response structures.

### Question 12
True or False: When streaming, you receive the complete response first, then display it token-by-token.

### Question 13
True or False: Adding jitter to retry delays helps prevent the "thundering herd" problem when multiple clients hit rate limits.

### Question 14
True or False: Token limits (TPM) and request limits (RPM) are always reached simultaneously.

### Question 15
True or False: A 500 server error from an LLM API should typically be retried with exponential backoff.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your application makes 100 requests per minute. After adding a new feature, users report intermittent failures with "rate limit exceeded" errors.

**Question**: What's the MOST likely issue and solution?

A) API key is invalid - regenerate the key
B) Requests exceed provider's RPM limit - implement client-side rate limiting
C) Responses are too long - reduce max_tokens
D) Temperature is too high - lower it to 0

### Question 17
**Scenario**: You're building a chatbot and users complain about long wait times before seeing any response.

**Question**: What architectural change would MOST improve perceived responsiveness?

A) Switch to a faster model
B) Implement streaming and show tokens as they arrive
C) Increase the timeout value
D) Cache all responses

### Question 18
**Scenario**: Your LLM client works with OpenAI but fails with Anthropic. The error says the response format is unexpected.

**Question**: What's the MOST likely cause?

A) Wrong API key
B) Different response structure (content array vs message.content)
C) Model name is incorrect
D) Temperature is out of range

### Question 19
**Scenario**: During a traffic spike, your application starts receiving 429 errors. Your retry logic waits exactly 60 seconds for every retry.

**Question**: What improvement would make your retry strategy more effective?

A) Wait longer (120 seconds)
B) Implement exponential backoff with jitter
C) Disable retries entirely
D) Switch to a different API key

### Question 20
**Scenario**: You need to build an application that works even if OpenAI is down.

**Question**: What's the BEST architectural approach?

A) Just hope OpenAI never goes down
B) Build a multi-provider client with automatic fallback to Anthropic
C) Cache every possible response
D) Host your own LLM

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - `temperature=0`
   - *Explanation: Temperature=0 makes output deterministic. Combined with a seed, it enables reproducibility.*

2. **C** - `response.content[0].text`
   - *Explanation: Anthropic returns content as an array of content blocks. Text is in `.text` property.*

3. **C** - 429
   - *Explanation: HTTP 429 Too Many Requests indicates rate limiting.*

4. **B** - Reduced perceived latency for users
   - *Explanation: Streaming shows output immediately, even though total time is similar.*

5. **C** - 4 seconds
   - *Explanation: Exponential backoff = base × 2^attempt = 1 × 2^2 = 4 seconds.*

6. **C** - In environment variables or a secrets manager
   - *Explanation: API keys should never be in code or frontend. Use environment variables or services like AWS Secrets Manager.*

7. **D** - Invalid API key (401)
   - *Explanation: Authentication errors won't resolve with retries. Rate limits, server errors, and timeouts can.*

8. **B** - Both control randomness but through different mechanisms
   - *Explanation: Temperature scales logits; top_p samples from cumulative probability. Both affect output randomness.*

9. **B** - Pass it as a separate `system` parameter
   - *Explanation: Anthropic requires system prompts as a separate parameter, not in the messages array.*

10. **B** - The model reached max_tokens limit before finishing
    - *Explanation: `length` means the response was truncated at the token limit.*

### Section 2: True/False

11. **False** - APIs have significant differences in structure (system prompt handling, response format, parameter names).

12. **False** - Streaming receives and displays tokens as they're generated, not after completion.

13. **True** - Jitter prevents synchronized retry storms when multiple clients are rate-limited simultaneously.

14. **False** - You might hit token limits with fewer requests (long prompts) or request limits with short prompts.

15. **True** - Server errors (5xx) are typically transient and should be retried with backoff.

### Section 3: Scenario-Based

16. **B** - Requests exceed provider's RPM limit - implement client-side rate limiting
    - *Explanation: Intermittent 429 errors with increased traffic indicates rate limit issues.*

17. **B** - Implement streaming and show tokens as they arrive
    - *Explanation: Streaming provides immediate feedback, dramatically improving perceived responsiveness.*

18. **B** - Different response structure (content array vs message.content)
    - *Explanation: Anthropic uses `content[0].text`, OpenAI uses `choices[0].message.content`.*

19. **B** - Implement exponential backoff with jitter
    - *Explanation: Fixed delays can cause synchronized retries. Exponential backoff with jitter distributes load.*

20. **B** - Build a multi-provider client with automatic fallback to Anthropic
    - *Explanation: Multi-provider architecture with failover provides genuine resilience.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Production-ready integration skills |
| 16-17 | B | Good - Minor gaps to address |
| 14-15 | C | Satisfactory - Review error handling |
| Below 14 | F | Review module content and retry |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "OpenAI API Deep Dive" and "Anthropic API" sections
- Questions 4-6 wrong: Review "Streaming Responses" section
- Questions 7-10 wrong: Review "Error Handling and Retries"
- Scenario questions wrong: Complete the hands-on exercises

---

*Quiz 2 of 12 | Building AI-Powered Applications | 20 points total*
