# Module 1 Quiz: AI Integration Fundamentals

**Instructions**: Answer all questions. Select the best answer for multiple choice questions. For scenario questions, provide brief explanations.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY difference between using an AI API directly versus using an SDK?

A) APIs are faster than SDKs
B) SDKs provide language-specific abstractions and convenience methods
C) APIs are free while SDKs require payment
D) SDKs bypass rate limits

### Question 2
Which authentication method is MOST secure for storing OpenAI API keys?

A) Hardcoding in the source code for easy access
B) Environment variables or a secrets manager
C) Storing in a public configuration file
D) Passing as URL query parameters

### Question 3
What is exponential backoff used for?

A) Increasing API request speed over time
B) Gradually increasing wait time between retry attempts
C) Reducing the size of API responses
D) Compressing data before sending

### Question 4
What HTTP status code indicates you've exceeded the API rate limit?

A) 400 Bad Request
B) 401 Unauthorized
C) 429 Too Many Requests
D) 500 Internal Server Error

### Question 5
Which approach is BEST for handling transient API errors?

A) Immediately fail and show error to user
B) Retry with exponential backoff and jitter
C) Ignore the error and continue
D) Switch to a different AI provider

### Question 6
What is the purpose of the `max_tokens` parameter in OpenAI API calls?

A) Limit the input text length
B) Limit the maximum response length
C) Set the API rate limit
D) Control the model temperature

### Question 7
Which is a valid reason to implement request caching for AI APIs?

A) To bypass API authentication
B) To reduce costs and latency for repeated identical requests
C) To increase the model's accuracy
D) To store user credentials

### Question 8
What does the `temperature` parameter control?

A) API response time
B) Randomness/creativity of the output
C) Maximum token count
D) Rate limit threshold

### Question 9
When should you validate user input BEFORE sending to an AI API?

A) Only for paid API tiers
B) Always, to prevent errors and save costs
C) Never, the API handles all validation
D) Only when input exceeds 1000 characters

### Question 10
What is the recommended way to handle API keys in a team environment?

A) Share one key among all developers
B) Each developer uses their own key with proper secrets management
C) Commit keys to version control for easy sharing
D) Email keys to team members as needed

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: You should always catch and handle specific exception types rather than using a generic catch-all.

### Question 12
True or False: Rate limits are the same across all OpenAI API tiers and models.

### Question 13
True or False: Setting temperature to 0 guarantees completely identical outputs for the same input.

### Question 14
True or False: API request logging should include the full API key for debugging purposes.

### Question 15
True or False: Token count includes both input (prompt) and output (completion) tokens.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your application makes 100 API calls per minute but your rate limit is 60 calls per minute.

**Question**: What is the BEST solution?

A) Upgrade to a higher API tier immediately
B) Implement request queuing and rate limiting on your side
C) Ignore the errors since some requests will succeed
D) Switch to a different AI provider

### Question 17
**Scenario**: Your API call fails with a 500 Internal Server Error from OpenAI.

**Question**: What is the MOST appropriate response?

A) Show the user a permanent error message
B) Retry the request with exponential backoff
C) Assume the API is permanently down
D) Send the request to a backup API endpoint immediately

### Question 18
**Scenario**: You need to process 10,000 documents through an AI API. Each call costs $0.002.

**Question**: What cost optimization strategy should you implement FIRST?

A) Process all documents immediately to finish faster
B) Implement caching and deduplication to avoid redundant calls
C) Use the most expensive model for best quality
D) Skip error handling to reduce code complexity

### Question 19
**Scenario**: A user reports that your AI feature sometimes returns truncated responses.

**Question**: What is the MOST likely cause?

A) Network timeout issues
B) The `max_tokens` limit is set too low
C) The API is experiencing outages
D) The user's browser is incompatible

### Question 20
**Scenario**: Your production application needs to use OpenAI API but must comply with data residency requirements.

**Question**: What should you consider FIRST?

A) The color scheme of your UI
B) API data processing locations and compliance certifications
C) The programming language to use
D) Which model has the best performance benchmarks

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - SDKs provide language-specific abstractions and convenience methods
   - *Explanation: SDKs wrap raw API calls with typed objects, error handling, and language idioms.*

2. **B** - Environment variables or a secrets manager
   - *Explanation: Keys should never be in code or public files. Environment variables or dedicated secrets managers are secure options.*

3. **B** - Gradually increasing wait time between retry attempts
   - *Explanation: Exponential backoff prevents overwhelming a recovering service by spacing out retries.*

4. **C** - 429 Too Many Requests
   - *Explanation: HTTP 429 is the standard status code indicating rate limit exceeded.*

5. **B** - Retry with exponential backoff and jitter
   - *Explanation: Transient errors often resolve themselves; retrying with backoff and jitter is the standard pattern.*

6. **B** - Limit the maximum response length
   - *Explanation: max_tokens caps the completion length, helping control costs and response size.*

7. **B** - To reduce costs and latency for repeated identical requests
   - *Explanation: Caching identical requests avoids redundant API calls, saving money and improving speed.*

8. **B** - Randomness/creativity of the output
   - *Explanation: Temperature 0 is deterministic, higher values increase randomness/creativity.*

9. **B** - Always, to prevent errors and save costs
   - *Explanation: Validating input catches issues early, avoiding wasted API calls and better error messages.*

10. **B** - Each developer uses their own key with proper secrets management
    - *Explanation: Individual keys enable tracking and revocation; secrets management keeps them secure.*

### Section 2: True/False

11. **True** - Specific exception handling allows appropriate responses to different error types (rate limit vs auth vs server error).

12. **False** - Rate limits vary by tier (free, pay-as-you-go, enterprise) and by model (GPT-3.5 vs GPT-4).

13. **False** - Temperature 0 is highly deterministic but not guaranteed identical due to floating-point and model updates.

14. **False** - Never log full API keys; at most log a redacted version (last 4 characters) for identification.

15. **True** - Total tokens = prompt tokens + completion tokens, and you're billed for both.

### Section 3: Scenario-Based

16. **B** - Implement request queuing and rate limiting on your side
    - *Explanation: Client-side rate limiting prevents hitting limits and provides better user experience than failing requests.*

17. **B** - Retry the request with exponential backoff
    - *Explanation: 500 errors are often transient server issues that resolve quickly; retry is appropriate.*

18. **B** - Implement caching and deduplication to avoid redundant calls
    - *Explanation: At $0.002 × 10,000 = $20, eliminating duplicates is the first cost optimization step.*

19. **B** - The `max_tokens` limit is set too low
    - *Explanation: Truncated responses typically mean the model hit the token limit before completing.*

20. **B** - API data processing locations and compliance certifications
    - *Explanation: Data residency requirements need verification of where data is processed and stored.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong grasp of AI integration fundamentals |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "API vs SDK vs Framework" and "Rate Limiting"
- Questions 4-6 wrong: Review "OpenAI API Basics" and "Error Handling"
- Questions 7-10 wrong: Review "Best Practices" and "Security"
- Scenario questions wrong: Review the complete module and work through exercises

**Next Steps:**
- Complete Module 1 Exercise if not done
- Proceed to Module 2: Building with LangChain

---

*Quiz 1 of 6 | Building AI-Powered Applications | 20 points total*
