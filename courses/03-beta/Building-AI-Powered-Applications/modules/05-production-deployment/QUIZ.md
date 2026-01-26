# Module 5 Quiz: Production Deployment

**Instructions**: Answer all questions. Select the best answer for multiple choice questions. For scenario questions, provide brief explanations.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY advantage of using FastAPI for AI application backends?

A) It's the only framework that supports Python
B) Native async support, automatic OpenAPI docs, and type validation
C) It's faster than all other frameworks
D) It includes built-in AI models

### Question 2
What is the purpose of Pydantic models in FastAPI?

A) To connect to databases
B) To validate request/response data with type checking
C) To handle authentication
D) To manage rate limits

### Question 3
Which authentication method is BEST for API-to-API communication?

A) Session cookies
B) API keys or JWT tokens
C) Username/password in URL
D) No authentication needed

### Question 4
What is the purpose of rate limiting in a production AI API?

A) To slow down responses intentionally
B) To prevent abuse, manage costs, and ensure fair usage
C) To increase API accuracy
D) To improve model performance

### Question 5
Which caching strategy is MOST appropriate for AI API responses where similar queries should return cached results?

A) Browser caching
B) CDN caching
C) Semantic caching based on query similarity
D) No caching for AI responses

### Question 6
What is the purpose of a health check endpoint?

A) To verify user authentication
B) To allow monitoring systems to verify the service is running
C) To check API rate limits
D) To validate input data

### Question 7
What is structured logging?

A) Logging only error messages
B) Logging in machine-parseable formats like JSON
C) Logging to multiple files
D) Logging with timestamps only

### Question 8
Which deployment approach allows zero-downtime updates?

A) Stop the server, deploy, restart
B) Blue-green or rolling deployments
C) Delete and recreate the server
D) Manual file replacement

### Question 9
What is the PRIMARY purpose of containerization with Docker for AI apps?

A) To make the app run faster
B) To ensure consistent environments across development, testing, and production
C) To reduce code size
D) To eliminate the need for testing

### Question 10
What metric is MOST important to monitor for cost management of AI APIs?

A) Server CPU usage
B) Token usage per request and total API costs
C) Number of HTTP 200 responses
D) Server disk space

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: FastAPI automatically generates interactive API documentation from your code.

### Question 12
True or False: API keys should be logged in full for debugging purposes.

### Question 13
True or False: Redis can be used for both rate limiting and response caching.

### Question 14
True or False: Health check endpoints should include detailed error messages for any failures.

### Question 15
True or False: Horizontal scaling means adding more CPU/RAM to a single server.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your AI API is experiencing high latency (5+ seconds) during peak hours but hardware utilization is low.

**Question**: What is the MOST likely bottleneck?

A) Database queries
B) Waiting for external AI API (OpenAI) responses
C) Server CPU limits
D) Network bandwidth

### Question 17
**Scenario**: A user reports that sometimes their request works and sometimes it returns a 500 error with the same input.

**Question**: What should you implement to help diagnose this?

A) Remove all error handling
B) Structured logging with request IDs for tracing
C) Faster hardware
D) More rate limiting

### Question 18
**Scenario**: Your API receives 1000 requests per minute but you're only allowed 60 OpenAI API calls per minute.

**Question**: What architecture should you implement?

A) Reject 940 requests with errors
B) Request queue with background processing and caching
C) Remove the AI feature entirely
D) Make synchronous calls and let them timeout

### Question 19
**Scenario**: You need to deploy an update that changes the response format, but existing clients depend on the old format.

**Question**: What is the BEST approach?

A) Deploy immediately and notify clients to update
B) Use API versioning (e.g., /v1/ and /v2/ endpoints)
C) Maintain both formats in the same endpoint forever
D) Wait until all clients are ready before deploying

### Question 20
**Scenario**: Your production AI service costs $5,000/month in OpenAI API calls. Management wants to reduce costs.

**Question**: What is the MOST effective cost reduction strategy?

A) Switch to a completely different AI provider
B) Implement aggressive caching for common queries and optimize prompts
C) Reduce service availability to 12 hours/day
D) Remove all logging to save processing time

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Native async support, automatic OpenAPI docs, and type validation
   - *Explanation: FastAPI's async support is ideal for IO-bound AI calls, plus it auto-generates docs and validates data.*

2. **B** - To validate request/response data with type checking
   - *Explanation: Pydantic models define schemas that FastAPI uses to validate and serialize data automatically.*

3. **B** - API keys or JWT tokens
   - *Explanation: API keys or JWTs are standard for service-to-service auth; they're stateless and easily rotated.*

4. **B** - To prevent abuse, manage costs, and ensure fair usage
   - *Explanation: Rate limits protect against abuse, control costs, and ensure resources are shared fairly.*

5. **C** - Semantic caching based on query similarity
   - *Explanation: Semantic caching can return cached results for similar (not just identical) queries, ideal for AI.*

6. **B** - To allow monitoring systems to verify the service is running
   - *Explanation: Health checks let load balancers and monitoring tools verify service availability.*

7. **B** - Logging in machine-parseable formats like JSON
   - *Explanation: Structured logs (JSON) enable automated parsing, searching, and alerting.*

8. **B** - Blue-green or rolling deployments
   - *Explanation: These strategies maintain availability by gradually shifting traffic to new versions.*

9. **B** - To ensure consistent environments across development, testing, and production
   - *Explanation: Docker containers package dependencies, ensuring the same environment everywhere.*

10. **B** - Token usage per request and total API costs
    - *Explanation: AI API costs are typically token-based; monitoring this directly tracks spending.*

### Section 2: True/False

11. **True** - FastAPI auto-generates Swagger UI and ReDoc documentation from type hints and docstrings.

12. **False** - API keys should NEVER be logged in full; use redacted versions (last 4 chars) if needed for identification.

13. **True** - Redis is commonly used for both rate limiting (counters with TTL) and caching (key-value store).

14. **False** - Health checks should return simple status; detailed errors could expose internal information.

15. **False** - Horizontal scaling adds more servers; vertical scaling adds more resources to one server.

### Section 3: Scenario-Based

16. **B** - Waiting for external AI API (OpenAI) responses
    - *Explanation: Low CPU with high latency indicates waiting on external services, not local processing.*

17. **B** - Structured logging with request IDs for tracing
    - *Explanation: Request IDs let you trace intermittent failures through the entire request lifecycle.*

18. **B** - Request queue with background processing and caching
    - *Explanation: Queuing smooths traffic spikes; caching reduces redundant calls; background processing handles overflow.*

19. **B** - Use API versioning (e.g., /v1/ and /v2/ endpoints)
    - *Explanation: Versioning allows gradual migration without breaking existing clients.*

20. **B** - Implement aggressive caching for common queries and optimize prompts
    - *Explanation: Caching reduces calls; prompt optimization reduces tokens per call. Both directly cut costs.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong grasp of production deployment |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "Building APIs with FastAPI" and "Authentication"
- Questions 4-6 wrong: Review "Rate Limiting" and "Caching Strategies"
- Questions 7-10 wrong: Review "Logging & Monitoring" and "Deployment"
- Scenario questions wrong: Review the complete module and deploy the exercise API

**Next Steps:**
- Complete Module 5 Exercise if not done
- Proceed to Module 6: Testing & Quality Assurance

---

*Quiz 5 of 6 | Building AI-Powered Applications | 20 points total*
