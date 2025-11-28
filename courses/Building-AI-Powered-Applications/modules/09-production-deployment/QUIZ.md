# Module 9 Quiz: Production Deployment

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
Where should API keys for LLM services be stored in production?

A) In the source code for easy access
B) In environment variables committed to git
C) In a cloud secrets manager (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault)
D) In the application's configuration file

### Question 2
What is the PRIMARY advantage of using containers (Docker) for AI application deployment?

A) Faster API responses
B) Consistent environment across development, staging, and production
C) Lower cloud costs
D) Better AI model quality

### Question 3
Which AWS service is BEST suited for AI applications that need long-running connections for streaming?

A) Lambda
B) ECS/Fargate
C) S3
D) SNS

### Question 4
What should a Kubernetes/ECS readiness probe check for an AI application?

A) Only that the container is running
B) That the application can receive requests AND dependencies (LLM API) are accessible
C) The total number of requests served
D) CPU utilization

### Question 5
What is the recommended approach for rate limiting in production AI applications?

A) Rate limit only at the API gateway
B) Rate limit only in the application code
C) Rate limit at multiple levels (gateway + application) with different limits
D) No rate limiting needed for AI applications

### Question 6
Which CI/CD practice is MOST important for AI application deployments?

A) Deploy directly to production on every commit
B) Use staging environments and require approval for production deployments
C) Skip testing to deploy faster
D) Manual deployments only

### Question 7
What is the purpose of a health check endpoint that returns quickly?

A) To make the API seem faster
B) To allow load balancers to determine if instances are healthy and route traffic
C) To track API usage
D) To reset rate limits

### Question 8
When implementing multi-provider fallback (OpenAI + Anthropic), what should trigger a fallback?

A) Every request should use all providers
B) API errors, timeouts, or rate limits from the primary provider
C) User preference only
D) Random selection

### Question 9
What is the recommended minimum instance count for production AI applications?

A) 0 (scale to zero for cost savings)
B) 1 (always have at least one instance warm)
C) 10 (handle any load)
D) It doesn't matter

### Question 10
How should sensitive data in request/response logs be handled?

A) Log everything for debugging
B) Mask or redact PII and sensitive content before logging
C) Never log anything
D) Store logs only locally

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: API keys should be rotated regularly, and applications should support key rotation without downtime.

### Question 12
True or False: Lambda functions are ideal for AI applications with streaming responses.

### Question 13
True or False: CORS (Cross-Origin Resource Sharing) configuration is unnecessary if the API is only accessed by backend services.

### Question 14
True or False: Auto-scaling based on request queue depth is more appropriate for AI workloads than CPU-based scaling.

### Question 15
True or False: Production deployments should always include a rollback strategy.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your AI application is deployed on AWS Lambda. Users report that the first request after a period of inactivity takes 10+ seconds, but subsequent requests are fast.

**Question:** What is the MOST likely cause and solution?

A) The LLM API is slow; switch providers
B) Cold start latency; configure provisioned concurrency
C) Database connection issues; add connection pooling
D) User's network is slow; nothing you can do

### Question 17
**Scenario:** Your production AI API is experiencing rate limiting from OpenAI (429 errors) during peak hours, causing failures.

**Question:** What is the BEST architectural solution?

A) Increase the OpenAI rate limit (contact sales)
B) Implement request queuing, caching, and multi-provider fallback
C) Reduce the number of users
D) Disable the feature during peak hours

### Question 18
**Scenario:** Your CI/CD pipeline deploys to production automatically on every merge to main. A developer accidentally merges a broken configuration that causes the API to return 500 errors.

**Question:** What process change would BEST prevent this?

A) Disable CI/CD completely
B) Require staging deployment with smoke tests and manual approval before production
C) Deploy less frequently
D) Review code more carefully

### Question 19
**Scenario:** Your AI application stores OpenAI API keys in AWS Secrets Manager. The secrets are retrieved on every request, causing latency and increased costs.

**Question:** What optimization should you implement?

A) Store keys in environment variables instead
B) Cache the secret in memory with a reasonable TTL
C) Remove encryption for faster access
D) Use a different secrets manager

### Question 20
**Scenario:** You're deploying an AI application to GCP Cloud Run. The application uses streaming responses. Users report that responses appear all at once instead of streaming.

**Question:** What is the MOST likely cause?

A) OpenAI doesn't support streaming
B) A proxy, CDN, or Cloud Run configuration is buffering the response
C) The user's browser doesn't support streaming
D) Cloud Run doesn't support streaming

---

## Answer Key

### Section 1: Multiple Choice

1. **C** - In a cloud secrets manager
   - *Secrets managers provide encryption, access control, rotation, and audit logging.*

2. **B** - Consistent environment across development, staging, and production
   - *Containers ensure the same environment runs everywhere, eliminating "works on my machine" issues.*

3. **B** - ECS/Fargate
   - *Lambda has timeout limits (15 min max) and connection constraints; ECS supports long-running processes.*

4. **B** - That the application can receive requests AND dependencies are accessible
   - *Readiness probes should verify the application is truly ready to handle traffic.*

5. **C** - Rate limit at multiple levels with different limits
   - *Defense in depth: gateway catches bulk attacks, application handles fine-grained limits.*

6. **B** - Use staging environments and require approval for production deployments
   - *Staging catches issues before they reach users; approvals add human oversight.*

7. **B** - To allow load balancers to determine if instances are healthy
   - *Load balancers use health checks to route traffic only to healthy instances.*

8. **B** - API errors, timeouts, or rate limits from the primary provider
   - *Fallback when primary fails, not proactively or randomly.*

9. **B** - 1 (always have at least one instance warm)
   - *Minimum 1 eliminates cold start latency for initial requests after idle periods.*

10. **B** - Mask or redact PII and sensitive content before logging
    - *Log enough for debugging but protect user privacy and compliance.*

### Section 2: True/False

11. **True** - Regular key rotation is a security best practice; applications should handle rotation gracefully.

12. **False** - Lambda has limitations for streaming; containers (ECS, Cloud Run) are better for long-lived connections.

13. **False** - Even backend-only APIs may be accessed from browsers during development; CORS should be configured appropriately.

14. **True** - AI requests are I/O bound (waiting for LLM), not CPU bound; queue depth better reflects actual load.

15. **True** - Rollback capability is essential for recovering from failed deployments quickly.

### Section 3: Scenario-Based

16. **B** - Cold start latency; configure provisioned concurrency
    - *Lambda cold starts are common; provisioned concurrency keeps instances warm.*

17. **B** - Implement request queuing, caching, and multi-provider fallback
    - *Multiple strategies together handle rate limits gracefully without losing requests.*

18. **B** - Require staging deployment with smoke tests and manual approval
    - *Staging catches issues; approval gates prevent accidental production problems.*

19. **B** - Cache the secret in memory with a reasonable TTL
    - *Caching reduces latency and API calls while still supporting rotation (via TTL).*

20. **B** - A proxy, CDN, or Cloud Run configuration is buffering the response
    - *Streaming works end-to-end only if no component buffers; check Cloud Run response streaming setting.*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready for production AI deployments |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Review security and scaling concepts |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these topics:

**Secrets Management (Questions 1, 11, 19):**
- Cloud secrets managers vs environment variables
- Key rotation strategies
- Caching secrets appropriately

**Container & Serverless (Questions 2, 3, 12, 16):**
- When to use Lambda vs containers
- Cold start mitigation
- Streaming support considerations

**Reliability & Scaling (Questions 8, 9, 14, 17):**
- Multi-provider fallback patterns
- Minimum instance configuration
- Appropriate scaling metrics for AI

**CI/CD & Operations (Questions 6, 15, 18):**
- Staging environments importance
- Approval gates
- Rollback strategies

**Security & Monitoring (Questions 4, 5, 7, 10, 13):**
- Health check design
- Multi-level rate limiting
- Log sanitization

---

## Production Deployment Checklist

Use this checklist for your deployments:

```
PRE-DEPLOYMENT
[ ] Secrets in secrets manager (not in code)
[ ] Rate limiting configured
[ ] Health check endpoints implemented
[ ] CORS configured appropriately
[ ] Logging configured (without PII)

DEPLOYMENT CONFIGURATION
[ ] Container properly sized (memory, CPU)
[ ] Auto-scaling configured
[ ] Minimum instances > 0 for production
[ ] Timeouts set appropriately (AI is slow!)
[ ] Secrets accessible to application

CI/CD
[ ] Tests run before deployment
[ ] Staging deployment before production
[ ] Approval required for production
[ ] Rollback strategy documented

POST-DEPLOYMENT
[ ] Health checks passing
[ ] Metrics/monitoring active
[ ] Alerts configured
[ ] Load testing performed
```

---

*Quiz 9 of 12 | Building AI-Powered Applications | Duration: 25 minutes*
