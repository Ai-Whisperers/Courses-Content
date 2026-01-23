# Module 2 Quiz: AI-Powered Ticket Management

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY advantage of AI-powered ticket routing over round-robin assignment?

A) It's faster to configure
B) It matches tickets to agents based on skills, workload, and ticket attributes
C) It eliminates the need for human agents
D) It's cheaper to implement

### Question 2
When building a category taxonomy, what is the recommended structure?

A) Single flat list of all possible categories
B) Two levels: broad category and issue type
C) Hierarchical structure with 3+ levels for specificity
D) Categories should be defined by customers

### Question 3
What should happen when an AI categorization model has LOW confidence (below threshold)?

A) Assign the category with highest score anyway
B) Flag for human review and show top suggestions
C) Delete the ticket
D) Route to a random queue

### Question 4
Which is NOT a typical factor in AI priority prediction?

A) Customer sentiment in the message
B) Customer tier/lifetime value
C) Agent's favorite coffee
D) Keywords indicating urgency

### Question 5
What is "skill-based routing"?

A) Routing tickets to agents randomly
B) Matching tickets to agents who have the expertise needed to resolve them
C) Training agents on new skills
D) Routing all tickets to the most experienced agent

### Question 6
What metric BEST measures routing effectiveness?

A) Number of tickets created
B) First-touch resolution rate (tickets resolved without transfer)
C) Number of agents online
D) Average ticket length

### Question 7
In workload balancing, what does "ticket complexity" affect?

A) The color of the ticket
B) How many "capacity units" a ticket consumes for an agent
C) Which customer submitted it
D) The ticket's unique ID

### Question 8
What is the purpose of confidence thresholds in auto-categorization?

A) To make the system slower
B) To prevent incorrect categorizations when the AI is uncertain
C) To increase API costs
D) To limit the number of categories

### Question 9
Which integration approach provides the MOST flexibility for AI ticket management?

A) Using only native helpdesk features
B) Webhook-based middleware that processes tickets through external AI
C) Manual agent review of all tickets
D) Customer self-categorization

### Question 10
What is a "routing fallback"?

A) What happens when the AI system fails completely
B) An alternative routing destination when the primary rule can't be satisfied
C) Sending tickets to management
D) Deleting unrouteable tickets

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: AI categorization can achieve 100% accuracy with proper training data.

### Question 12
True or False: Priority prediction should consider both content signals (keywords, sentiment) AND customer attributes (tier, history).

### Question 13
True or False: Workload balancing should distribute tickets equally to all agents regardless of their current queue.

### Question 14
True or False: Override rules in priority prediction allow automatic elevation for specific situations like security incidents.

### Question 15
True or False: A ticket can only belong to one category at a time (single-label classification).

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your AI routing system shows:
- Agent A: 5 tickets in queue, billing specialist
- Agent B: 2 tickets in queue, general support
- New ticket: Billing refund request

Both agents can technically handle billing. Using skill-based routing, where should the ticket go?

A) Agent B - they have fewer tickets
B) Agent A - they're the billing specialist
C) Split between them randomly
D) Hold the ticket until Agent A's queue drops

### Question 17
**Scenario:** A ticket arrives with the following content:
> "Our production environment is down. All 500 employees cannot access the system. We need immediate help."

Your priority prediction shows "High" with 0.78 confidence. You have an override rule for the keyword "production down" that sets priority to "Critical."

**Question:** What should the final priority be?

A) High (AI prediction wins)
B) Critical (override rule applies)
C) Medium (default)
D) Cannot determine

### Question 18
**Scenario:** Your auto-categorization system processes a ticket:
> "I want to cancel my subscription but I also have a billing question about my last invoice."

The AI returns:
- Subscription > Cancellation: 0.82 confidence
- Billing > Invoice Questions: 0.76 confidence

**Question:** What is the BEST approach?

A) Apply only the highest confidence category
B) Apply both categories as tags (multi-label)
C) Reject and request clarification from customer
D) Route to the cancellation queue only

### Question 19
**Scenario:** Your workload monitoring shows:
- Team utilization: 95%
- Average wait time: 18 minutes
- Unassigned tickets: 45

**Question:** What action should your system take?

A) Continue normal operations - everything is fine
B) Alert supervisors, enable chatbot deflection, pause non-urgent routing
C) Shut down the AI system
D) Assign all tickets to one agent

### Question 20
**Scenario:** After implementing AI ticket routing, you observe:
- First-touch resolution: 78% (up from 65%)
- Misroute rate: 12% (down from 32%)
- Agent satisfaction: Improved
- One category (API Integration) has 35% misroute rate

**Question:** What should you conclude and do?

A) The system is perfect - no changes needed
B) Roll back the entire AI implementation
C) Overall success, but investigate and improve the API Integration routing rules specifically
D) Disable routing for all categories

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - It matches tickets to agents based on skills, workload, and ticket attributes
   - *AI routing optimizes assignment across multiple factors simultaneously.*

2. **C** - Hierarchical structure with 3+ levels for specificity
   - *Three levels (broad → specific → issue type) provides balance of organization and precision.*

3. **B** - Flag for human review and show top suggestions
   - *Low confidence means human oversight is needed to ensure quality.*

4. **C** - Agent's favorite coffee
   - *Priority prediction uses relevant signals; personal preferences are not factors.*

5. **B** - Matching tickets to agents who have the expertise needed to resolve them
   - *Skill-based routing ensures the right agent handles each ticket.*

6. **B** - First-touch resolution rate
   - *High first-touch resolution indicates tickets reached the right agents.*

7. **B** - How many "capacity units" a ticket consumes for an agent
   - *Complex tickets take more time/effort, reducing available capacity.*

8. **B** - To prevent incorrect categorizations when the AI is uncertain
   - *Thresholds ensure low-confidence predictions get human review.*

9. **B** - Webhook-based middleware that processes tickets through external AI
   - *Middleware provides flexibility to use any AI and customize processing.*

10. **B** - An alternative routing destination when the primary rule can't be satisfied
    - *Fallbacks ensure tickets are assigned even when optimal routing isn't available.*

### Section 2: True/False

11. **False** - AI categorization can achieve high accuracy (90%+) but never 100%. Edge cases and ambiguous tickets will always exist.

12. **True** - Effective priority prediction combines content analysis with customer context for accurate predictions.

13. **False** - Workload balancing should consider current queue size, complexity, and capacity—not just equal distribution.

14. **True** - Override rules automatically set priority for predefined situations that should bypass normal prediction.

15. **False** - Multi-label classification allows tickets to have multiple relevant categories (e.g., billing AND cancellation).

### Section 3: Scenario-Based

16. **B** - Agent A - they're the billing specialist
    - *Skill-based routing prioritizes expertise match over queue size. Agent A will resolve faster and better.*

17. **B** - Critical (override rule applies)
    - *Override rules take precedence over AI predictions for specific high-impact situations.*

18. **B** - Apply both categories as tags (multi-label)
    - *Tickets often span multiple categories; multi-label tagging captures this accurately.*

19. **B** - Alert supervisors, enable chatbot deflection, pause non-urgent routing
    - *95% utilization and 18-minute wait indicate overload requiring intervention.*

20. **C** - Overall success, but investigate and improve the API Integration routing rules specifically
    - *Overall metrics improved significantly; target specific problem areas for further optimization.*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready to implement AI ticket management |
| 16-17 | B | Good - Strong understanding with minor gaps |
| 14-15 | C | Satisfactory - Review routing and prioritization concepts |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these areas:

**Ticket Routing (Questions 1, 5, 10, 16):**
- Skills-based routing principles
- Routing factor weights
- Fallback strategies

**Auto-Categorization (Questions 2, 3, 8, 11, 15, 18):**
- Taxonomy design
- Confidence thresholds
- Multi-label classification

**Priority Prediction (Questions 4, 14, 17):**
- Prediction features and signals
- Override rules
- Confidence handling

**Workload Balancing (Questions 7, 13, 19):**
- Capacity calculations
- Complexity scoring
- Overload handling

**System Optimization (Questions 6, 9, 12, 20):**
- Key performance metrics
- Continuous improvement
- Integration approaches

---

## Ticket Management Checklist

Before implementing AI ticket management:

```
CATEGORIZATION
[ ] Taxonomy defined (3+ levels)
[ ] Categories have clear descriptions
[ ] Keywords and examples documented
[ ] Confidence thresholds set
[ ] Low-confidence handling defined

ROUTING
[ ] Skills inventory created
[ ] Agent profiles configured
[ ] Routing rules prioritized
[ ] Fallback routes defined
[ ] VIP/escalation rules set

PRIORITY
[ ] Priority levels defined
[ ] SLAs assigned per level
[ ] Prediction features configured
[ ] Override rules documented
[ ] Escalation triggers set

WORKLOAD
[ ] Capacity per agent defined
[ ] Complexity scoring system
[ ] Rebalancing triggers set
[ ] Overflow handling configured
[ ] Monitoring dashboards ready

INTEGRATION
[ ] Webhook endpoints configured
[ ] Custom fields mapped
[ ] API authentication set
[ ] Error handling defined
[ ] Logging enabled
```

---

*Quiz 2 of 9 | AI for Customer Service Teams | Duration: 20 minutes*
