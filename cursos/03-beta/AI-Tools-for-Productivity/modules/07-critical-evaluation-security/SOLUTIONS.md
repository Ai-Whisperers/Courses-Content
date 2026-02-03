# Module 7 Solutions: Critical Evaluation & Security Lab

## Overview

This document provides sample responses for the Critical Evaluation & Security Lab. These examples demonstrate proper verification techniques, judgment frameworks, and data privacy practices.

---

## Part 1: Output Verification Practice

### Task 1.1: Fact-Checking Exercise

**Sample AI Response:**
```
The global electric vehicle market was valued at approximately $384 billion
in 2023 and is projected to grow at a CAGR of 17.8% through 2030.

The top 3 market leaders by global market share are:
1. Tesla (approximately 18-19% global market share)
2. BYD (approximately 15-16% global market share)
3. Volkswagen Group (approximately 8-9% global market share)

Key trends for 2024-2025:
- Rapid expansion of charging infrastructure globally
- Solid-state battery development reaching commercial viability
- Price parity with ICE vehicles expected in major markets
- Increased focus on sustainable battery supply chains
```

**Verification Exercise:**

| Claim from AI | Verification Source | Accurate? | Notes |
|---------------|-------------------|-----------|-------|
| Market size $384B (2023) | Multiple reports vary; Grand View Research says ~$500B; Statista says ~$388B | Partially | Range is $380-500B depending on methodology and definition |
| CAGR 17.8% through 2030 | Various analyst reports cite 15-25% | Partially | Within reasonable range, but specific number may be from one source |
| Tesla #1 at 18-19% | IEA, Counterpoint data | Yes | Approximately correct, though declining |
| BYD #2 at 15-16% | Multiple industry reports | Yes | Verified - actually growing rapidly, may now be #1 by volume |
| VW #3 at 8-9% | Industry data | Yes | Approximately correct |
| Solid-state batteries reaching commercial viability | Industry news | Questionable | Still largely R&D; "reaching viability" is optimistic |

**Verification Summary:**
- **Claims verified as accurate:** Market leaders ranking, general growth trajectory
- **Claims found inaccurate or unverifiable:** Specific market size figure, exact CAGR, solid-state battery claim is overstated
- **Claims requiring more research:** Specific percentages for market share vary by source and time period

**Key Learning:** AI provided directionally correct information but specific numbers varied from actual sources. High-stakes decisions would need primary source verification.

### Task 1.2: Verification Level Assessment

| Scenario | Level | Why |
|----------|-------|-----|
| Email to teammate about lunch | **Light** | Low stakes, easily corrected if wrong |
| Proposal to a potential client | **Deep** | External audience, business impact, reputation risk |
| Internal project status update | **Standard** | Internal use, but facts should be accurate |
| Legal contract language | **Deep** (or don't use AI) | Legal consequences, requires expert review regardless |
| Social media post for company | **Standard** | Public-facing but shorter format; still check facts |
| Notes for your own reference | **Light** | Personal use only, no external impact |
| Press release about new product | **Deep** | Public, permanent record, factual claims matter |
| Board presentation materials | **Deep** | High-stakes audience, decisions based on this |

**Verification Level Definitions:**
- **Light:** Quick skim, check obvious issues, no external research
- **Standard:** Read carefully, verify key facts, check for consistency
- **Deep:** Research primary sources, cross-reference multiple sources, expert review if needed

---

## Part 2: Hallucination Detection

### Task 2.1: Catching Hallucinations

**Sample AI Response (Citation Request):**
```
Here are three academic papers on AI productivity gains:

1. "The Productivity Effects of Artificial Intelligence in the Workplace"
   by Erik Brynjolfsson and Tom Mitchell, 2017, Science.

2. "Artificial Intelligence and Worker Productivity: Evidence from
   Enterprise Software" by Nima Seyedi and Michael Luca, 2022,
   Harvard Business School Working Paper.

3. "Measuring the Impact of AI Tools on Knowledge Worker Productivity"
   by Prasanna Tambe, Peter Cappelli, and Valery Yakubovich, 2019,
   Management Science.
```

**Your Verification:**

| Paper | Search Result | Real? |
|-------|--------------|-------|
| Paper 1: Brynjolfsson & Mitchell, Science 2017 | Found: Article exists, but titled "What Can Machine Intelligence Do?" not about productivity per se | **Partially** - Authors real, journal real, but title and focus are wrong |
| Paper 2: Seyedi & Luca, HBS Working Paper 2022 | Cannot find this exact paper; authors exist but paper not found | **Unable to verify** - likely hallucinated |
| Paper 3: Tambe, Cappelli, Yakubovich, Management Science 2019 | Found: These authors have collaborated, but exact paper title not found | **Unable to verify** - may be fabricated from real author names |

**What Did You Learn?**
AI confidently produced citations that looked legitimate (real author names, plausible journals, reasonable years) but the specific papers were either incorrect or fabricated. This is a well-documented AI limitation. **Never cite AI-generated citations without independent verification.**

### Task 2.2: Confidence vs. Accuracy Test

**Sample Prompt:** "What was the exact revenue of Salesforce in their most recent fiscal year?"

**Sample AI Response:**
```
Salesforce reported total revenue of $34.86 billion for fiscal year 2024
(which ended January 31, 2024). This represented a year-over-year growth
of approximately 11% from the previous fiscal year.
```

**Actual Answer:** $34.86 billion for FY2024 (This is publicly available from SEC filings and was correct at the time - AI had access to this data)

**Assessment:**
- Was AI confident in its answer? **Yes** - stated specific number without hedging
- Was AI accurate? **Yes** - for publicly traded company's recent data, AI was correct
- What does this demonstrate? AI can be accurate for well-documented public information, but it's also equally confident when wrong. The confidence level doesn't indicate accuracy.

**Important Note:** For older data, private companies, or less documented facts, AI often gives confident but incorrect answers. The test works best when you actually know the answer.

### Task 2.3: Consistency Test

**Question:** "What percentage of the US workforce worked remotely in 2023?"

**Response 1:**
```
Approximately 27-28% of the US workforce worked remotely at least some of
the time in 2023, according to Bureau of Labor Statistics data. About 12-13%
were fully remote.
```

**Response 2:**
```
In 2023, roughly 30% of US workers had remote or hybrid arrangements.
Fully remote workers comprised about 10-15% of the workforce, while
hybrid workers made up another 15-20%.
```

**Analysis:**
- Were responses consistent? **No** - same topic, different percentages
- What differed? First response: 27-28% any remote, 12-13% full remote. Second: 30% hybrid/remote total, different breakdown
- What does this tell you? AI synthesizes from multiple sources and the framing of the response varies. For statistics, always verify against primary sources rather than relying on AI's synthesis.

---

## Part 3: Professional Judgment Scenarios

### Task 3.1: AI Role Assessment

| Task | Use AI? | AI Role | Human Role | Why |
|------|---------|---------|------------|-----|
| Writing performance review | **Yes, limited** | Draft structure, suggest language | Write actual assessments, final judgment | Reviews require personal knowledge of employee; AI can help organize but not evaluate |
| Recommending employee for promotion | **No** | N/A | 100% human decision | Decision has career impact; requires institutional knowledge, fairness considerations |
| Drafting company policy | **Yes** | Research, draft structure, identify gaps | Final content, legal review, stakeholder input | Policies have legal/compliance implications; AI can accelerate but not decide |
| Creating training materials | **Yes** | Generate content, create exercises | Review accuracy, ensure company context | Good use case - educational content with human verification |
| Deciding budget allocation | **No** | Maybe analysis/scenarios | 100% human decision | Resource allocation involves priorities, politics, judgment |
| Writing termination letter | **Yes, limited** | Template, legal language reference | Tone, specific circumstances, HR/legal review | Sensitive communication; AI for compliance language, human for everything else |
| Analyzing survey results | **Yes** | Statistical analysis, pattern identification | Interpret meaning, determine actions | Good use case - AI analyzes, human interprets |
| Determining project priority | **No** | Maybe generate framework | 100% human decision | Strategic decision requires business context AI doesn't have |

### Task 3.2: Judgment Override Scenario

**AI Suggestion:**
```
Based on standard best practices, I recommend a formal, detailed proposal
with comprehensive documentation of all terms and conditions.
```

**Your Context:** Client prefers brief, direct communication.

**Your Decision:**
- Follow AI recommendation: **No**
- Your approach: Create a 1-page executive summary with key terms, offer to provide detailed documentation if they want it
- Reasoning: AI gives generic best practices; I have specific client knowledge that overrides generic advice. This client has explicitly said they hate lengthy documents.

**Key Principle Demonstrated:**

**Context trumps best practices.** AI provides generalized recommendations based on what typically works. But "typically" doesn't mean "always." When you have specific information about a situation (client preferences, organizational culture, historical context), that knowledge should override generic AI suggestions.

This is a core principle: **AI is a tool, not a decision-maker.** Your judgment, informed by context AI doesn't have, is essential.

---

## Part 4: Data Privacy Assessment

### Task 4.1: Data Classification Exercise

| Data | Classification | Safe for AI? | Why |
|------|---------------|--------------|-----|
| Company's public press release | Public | **Yes** | Already publicly available |
| Customer names and emails | PII | **No** | Personal identifiable information, privacy laws apply |
| Your personal meeting notes | Internal | **Depends** | If contains no PII/confidential info, likely fine; verify tool policy |
| Quarterly financial results (pre-earnings) | Confidential/MNPI | **No** | Material non-public information, securities law implications |
| Employee performance scores | HR/Confidential | **No** | Employee PII, requires protection |
| Public competitor website content | Public | **Yes** | Already publicly available |
| Internal salary bands | Confidential | **No** | Sensitive internal compensation data |
| Customer support ticket content | Customer Data | **No** | Contains customer issues and potentially PII |
| General industry research | Public | **Yes** | Non-company-specific, publicly available |
| Contract terms with a vendor | Confidential | **No** | Business confidential, likely NDA covered |

### Task 4.2: Data Minimization Practice

**Original Data:**
```
We need to analyze why Acme Corporation (our largest client at $2.3M annual
contract) is considering switching to CompetitorX. Our account manager
Sarah Johnson had a call with their CFO Michael Chen on November 15th.
The main concerns were our response time (currently 48 hours average vs
their expectation of 24 hours) and the recent pricing increase of 15%
we implemented in Q3.
```

**Anonymized Version:**
```
We need to analyze why a major client (enterprise tier) is considering
switching to a competitor. Our account manager had a call with their
finance lead last month. The main concerns were our response time
(currently 48 hours average vs their expectation of 24 hours) and a
recent pricing increase we implemented last quarter.
```

**What You Preserved:**
- Business problem (client considering switch)
- Client size context (major/enterprise)
- Key issue details (response time gap, pricing concern)
- Timeline context (recent)

**What You Removed/Changed:**
- Company name (Acme Corporation → "a major client")
- Contract value ($2.3M → "enterprise tier")
- Competitor name (CompetitorX → "a competitor")
- Employee name (Sarah Johnson → "our account manager")
- Client contact name (Michael Chen → "their finance lead")
- Specific date (November 15th → "last month")
- Exact price increase percentage (15% → "a pricing increase")

**Key principle:** Preserve the analytical value while removing identifying details. The AI can still help analyze the situation without knowing who specifically is involved.

### Task 4.3: Policy Compliance Scenario

**Company Policy:**
- AI tools approved: ChatGPT, Claude (free tiers only)
- Prohibited data: Customer PII, financial data, HR records
- Required: Document AI use in project notes

**Scenario:** Project proposal with budget estimates for external client.

**Assessment:**
- Can you use AI for this? **Partially**
- What data can you include:
  - General scope and deliverables
  - Generic timeline frameworks
  - Standard terms and conditions language
  - Publicly available information about the work
- What data must you exclude:
  - Specific client name (until document is finalized)
  - Internal cost structure/margins
  - Actual budget numbers
  - Client contact information
  - Confidential project details specific to this client
- What documentation is needed:
  - Note in project file: "AI used for proposal structure and standard language"
  - Keep record of what was generated vs. human-written
- Your approach:
  1. Use AI to draft generic proposal structure and boilerplate sections
  2. Write budget and client-specific sections manually
  3. Combine and review
  4. Document AI usage in project notes

---

## Part 5: Building Your Review Process

### Task 5.1: Personal Review Workflow

**Step 1: Quick Scan (30 seconds)**
Read AI output quickly for obvious issues - formatting, tone, coherence. Stop if something feels wrong.

**Step 2: Fact Check Key Claims (2-3 minutes)**
Identify any statistics, names, dates, or specific claims. Flag for verification or remove if can't verify.

**Step 3: Tone and Context Alignment (1-2 minutes)**
Does this sound like something I would write? Is the tone appropriate for the audience? Adjust language that feels "AI-ish."

**Step 4: Final Proof (1 minute)**
Read one more time as if seeing it for the first time. Would I be comfortable if this were forwarded to anyone?

**What triggers escalation?**
- Any legal, HR, or financial implications → route to appropriate department
- Any client-facing document with significant claims → additional reviewer
- Anything I'm uncertain about → pause and research or ask colleague

### Task 5.2: Verification Checklist Customization

**My AI Output Checklist:**
- [ ] Read the entire output (didn't just skim)
- [ ] Verified any specific numbers, dates, or statistics cited
- [ ] Removed or verified any citations/references
- [ ] Confirmed no confidential/PII information was included
- [ ] Checked that tone matches audience expectations
- [ ] Reviewed for anything that could be misinterpreted
- [ ] Made it sound like me (personal voice editing)
- [ ] Would I be comfortable if this were forwarded externally?

### Task 5.3: Red Flags List

**5 Red Flags That Trigger Extra Verification:**

1. **Specific statistics or percentages** - AI often generates plausible-sounding but incorrect numbers. Always verify statistics before including in any document.

2. **Named citations or references** - If AI cites a study, paper, or source by name, independently verify it exists and says what AI claims.

3. **Legal, compliance, or HR language** - Any language with legal implications needs human expert review regardless of how confident the AI output seems.

4. **Anything that seems "too convenient"** - If the answer is exactly what you wanted to hear with no caveats, be suspicious. Reality is messier than perfect AI responses.

5. **Claims about recent events or current state** - AI knowledge has cutoff dates. Any claim about "current" status, recent news, or trends needs independent verification.

---

## Bonus: Data Handling Quick Reference

### The "Would I Email This?" Test

Before putting any information into AI, ask: "Would I include this in an email to an external person?"

- **If No:** Don't put it in AI
- **If Yes, but carefully:** Consider anonymization
- **If Yes, freely:** Likely safe for AI

### Classification Quick Guide

| Type | Example | AI Safe? | Action |
|------|---------|----------|--------|
| **Public** | Press releases, website content | Yes | Use freely |
| **Internal** | Meeting notes, general plans | Maybe | Remove names/specifics |
| **Confidential** | Financials, contracts, strategy | No | Do not use |
| **PII** | Names, emails, employee data | No | Do not use |
| **MNPI** | Pre-announcement financials | No | Legal prohibition |

### When in Doubt: ASK

If you're unsure whether data is safe for AI:
1. Check your company's AI policy
2. Ask IT Security or Legal
3. Default to NOT using it
4. Document the decision either way

---

## Reflection Questions - Sample Responses

**1. What surprised you most about AI accuracy (or inaccuracy)?**

The citation exercise was eye-opening. AI confidently produced fake academic papers with real author names and plausible titles. If I hadn't verified, I might have used these in a document. The confidence was identical whether the information was real or fabricated.

**2. How will this change how you use AI outputs going forward?**

I'll be much more skeptical of specific claims, especially numbers and citations. I'll use AI for drafting and structure but will independently verify any factual claims before including them in work products.

**3. What's one verification step you'll always do now?**

I'll never use AI-generated citations without checking that they actually exist. This is non-negotiable. For important documents, I'll also verify any statistics cited.

**4. How confident do you feel classifying data for AI use?**

More confident after this exercise. The "would I email this externally?" test is a helpful mental shortcut. When in doubt, I'll anonymize data or just not use it.

**5. What's the hardest part about maintaining professional judgment with AI?**

Resisting the temptation to accept AI output when it saves time, especially when under deadline pressure. The output looks professional and complete, making it easy to trust. Building in verification steps takes discipline.

---

*Solutions for Module 7 | AI Tools for Productivity*
