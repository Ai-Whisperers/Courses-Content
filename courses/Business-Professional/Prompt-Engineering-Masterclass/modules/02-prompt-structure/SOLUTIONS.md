# Module 2 Solutions: Prompt Structure & Techniques Lab

## Solution Guide for Instructors and Self-Check

This document provides example solutions, expected observations, and teaching notes for Module 2 exercises.

---

## Part 1: Component Identification

### Task 1.1: Identify Components

**Prompt A Analysis:**
```
Write a blog post about artificial intelligence.
```

| Component | Present? | What's There / What's Missing |
|-----------|----------|-------------------------------|
| Role | ❌ NO | Missing - No role specified |
| Context | ❌ NO | Missing - No audience, purpose, or background |
| Task | ✅ PARTIAL | "Write a blog post" is present but vague |
| Format | ❌ NO | Missing - No length, structure, or format specified |
| Constraints | ❌ NO | Missing - No tone, requirements, or limits |

**Prompt B Analysis:**
```
You are a senior software engineer. Review this code and identify bugs.
Focus on security vulnerabilities. Present findings as a numbered list.
```

| Component | Present? | What's There / What's Missing |
|-----------|----------|-------------------------------|
| Role | ✅ YES | "senior software engineer" |
| Context | ❌ NO | Missing - No code type, language, or project context |
| Task | ✅ YES | "Review this code and identify bugs" |
| Format | ✅ YES | "numbered list" specified |
| Constraints | ✅ PARTIAL | "Focus on security vulnerabilities" - focus area specified |

**Prompt C Analysis:**
```
I need help with my presentation for the board meeting next Tuesday.
We're presenting Q3 results to investors who are concerned about our
growth rate. Can you help me structure the key points?
```

| Component | Present? | What's There / What's Missing |
|-----------|----------|-------------------------------|
| Role | ❌ NO | Missing - No AI role specified |
| Context | ✅ YES | Board meeting, Q3 results, investor concerns, growth rate |
| Task | ✅ PARTIAL | "structure the key points" - somewhat vague |
| Format | ❌ NO | Missing - How should points be structured? |
| Constraints | ❌ NO | Missing - Time limits, tone, what to avoid |

### Task 1.2: Component Impact

**Example Progression:**

**Original Output Quality: 2/5**
Generic blog post, uncertain focus, random structure.

**After Adding Role:**
```
You are a technology journalist writing for business executives.
Write a blog post about artificial intelligence.
```
**Quality: 3/5**
More focused vocabulary, executive-relevant angle, but still needs structure.

**After Adding Format:**
```
You are a technology journalist writing for business executives.
Write a 500-word blog post about artificial intelligence in this format:
- Attention-grabbing intro
- 3 main points with examples
- Actionable conclusion
```
**Quality: 4/5**
Clear structure, appropriate length, organized content.

**After Adding All Components:**
```
You are a technology journalist writing for business executives at Fortune 500 companies.

Context: Your readers are decision-makers evaluating AI adoption but have limited technical knowledge.

Task: Write a 500-word blog post explaining how AI is transforming business operations.

Format:
- Attention-grabbing intro (2-3 sentences)
- 3 main business applications with real company examples
- Actionable conclusion with next steps

Constraints:
- Avoid technical jargon
- Focus on ROI and business impact
- Professional but engaging tone
```
**Quality: 5/5**
Targeted, well-structured, appropriate tone, immediately useful.

**Key Learning:**
Each component adds focus and constraint, narrowing the possibility space to produce more relevant, useful outputs.

---

## Part 2: Role Prompting Practice

### Task 2.1: Role Transformation

**Role 1: Medical Professional**
```
You are a cardiologist with 20 years of experience. Explain why regular 
exercise is important, focusing on cardiovascular health and clinical evidence.
Use medical terminology appropriate for a patient consultation.
```

**Expected Output Focus:**
- Heart disease prevention
- Blood pressure regulation
- Cardiovascular function
- Clinical studies and statistics
- Medical terminology (but explained)

**Role 2: Personal Trainer**
```
You are a certified personal trainer working with busy professionals.
Explain why regular exercise is important in a motivating, practical way
that addresses common excuses and barriers.
```

**Expected Output Focus:**
- Energy levels and productivity
- Practical benefits (better sleep, stress reduction)
- Motivation and mindset
- Overcoming time constraints
- Immediate, tangible benefits

**Role 3: Parent Explaining to a Child**
```
You are a parent explaining to a 7-year-old child why regular exercise 
is important. Use simple language, fun examples, and avoid complex concepts.
```

**Expected Output Focus:**
- Growing strong and healthy
- Having energy to play
- Simple analogies ("like charging your battery")
- Fun examples (playing sports, running with friends)
- Very simple language

**Comparison:**

| Aspect | Medical | Trainer | Parent |
|--------|---------|---------|--------|
| Vocabulary level | Technical/Medical | Practical/Accessible | Very Simple |
| Focus areas | Disease prevention, clinical benefits | Performance, daily life impact | Fun, growth, energy |
| Tone | Authoritative, informative | Motivating, encouraging | Playful, nurturing |
| Most useful for | Health-conscious adults | Fitness beginners | Children, simplicity needed |

**Teaching Note:** Same information, dramatically different framing based on role.

### Task 2.2: Role Stacking

**Single Role Prompt:**
```
You are a product manager. I'm launching a mobile app for fitness tracking.
What should I consider?
```

**Expected Output:** Product-focused advice (features, user stories, roadmap)

**Stacked Role Prompt:**
```
You are a product manager with 10 years of experience who also has a 
background in UX design and mobile app marketing. I'm launching a fitness
tracking app.

Provide advice that considers:
- Product development and features
- User experience and design principles  
- Go-to-market strategy and user acquisition

Give me your perspective covering all three areas.
```

**Expected Output:** Integrated advice across product, UX, and marketing

**Which Produced Better Output:**
Stacked role should produce more comprehensive, multi-dimensional advice that considers trade-offs between areas (e.g., "This feature sounds great from a product perspective, but will complicate onboarding from a UX standpoint").

---

## Part 3: Task Decomposition

### Task 3.1: Break Down a Complex Task

**Complex Task:** "Create a complete social media marketing strategy for a new coffee shop."

**Sub-Tasks Identified:**
1. Define target audience and customer personas
2. Select appropriate social media platforms
3. Develop content themes and pillars
4. Create posting schedule and frequency
5. Design content types (photos, videos, stories, etc.)
6. Establish success metrics and KPIs

**Sequential Prompts Example:**

**Prompt 1 (Target Audience):**
```
You are a social media strategist. Help me define the target audience for
a new coffee shop opening in downtown Seattle.

Context: Neighborhood has young professionals, remote workers, and students.
We offer premium coffee and cozy workspace.

Provide:
- 2-3 detailed customer personas
- Their social media habits
- What content would appeal to each
```

**Prompt 2 (Platform Selection):**
```
Based on the target audience personas below, recommend which social media
platforms to focus on for our new coffee shop:

[paste persona output from Prompt 1]

For each platform, explain:
- Why it's appropriate for this audience
- Primary use case (awareness vs. engagement vs. sales)
- Resource requirements (time, content type)
```

**Prompt 3 (Content Strategy):**
```
Using the target audience and platform recommendations:

Audience: [summary from Prompt 1]
Platforms: [recommendations from Prompt 2]

Create a content strategy including:
- 4-5 content themes/pillars
- Specific content types for each platform
- 3 example posts for each theme
```

### Task 3.2: Monolithic vs. Decomposed Comparison

**Typical Results:**

**Monolithic Approach:**
- Quality: 3/5 (generic, surface-level)
- Completeness: 3/5 (covers everything but shallowly)
- Actionability: 2/5 (high-level, hard to execute)

**Decomposed Approach:**
- Quality: 4-5/5 (detailed, specific, thoughtful)
- Completeness: 4-5/5 (builds systematically)
- Actionability: 5/5 (concrete, implementable steps)

**Why Decomposed Works Better:**
- Each prompt can focus on one aspect deeply
- Outputs from earlier prompts inform later ones
- More opportunity to course-correct
- Results are more detailed and specific

---

## Part 4: Format Specification

### Task 4.1: Format Experiments

**Format 1: Numbered List**
```
Provide 7 tips for conducting effective job interviews.
Format as a numbered list where each tip is 1-2 sentences.
```

**Expected Output:**
```
1. Prepare structured questions in advance...
2. Create a comfortable environment...
[etc.]
```

**Format 2: Table**
```
Provide 7 tips for conducting effective job interviews.
Format as a table with these columns:
| Tip | Why It Matters | Common Mistake to Avoid |
```

**Expected Output:**
```
| Tip | Why It Matters | Common Mistake to Avoid |
|-----|----------------|-------------------------|
| Prepare questions | Ensures consistency | Winging it |
[etc.]
```

**Format 3: Structured Sections**
```
Provide tips for conducting effective job interviews.
Organize with these sections:

## Before the Interview
[Tips for preparation]

## During the Interview
[Tips for conducting]

## After the Interview
[Tips for follow-up]
```

**Expected Output:** Clear three-section structure with categorized tips

**Format 4: Q&A Style**
```
Provide tips for conducting effective job interviews.
Format as Q&A:

Q: [Common question interviewers have]
A: [Tip addressing that question]
```

**Expected Output:**
```
Q: How should I prepare?
A: [Preparation tips]

Q: What if the candidate seems nervous?
A: [Comfort tips]
```

**Analysis:**
**Table format most useful** for this content because it adds value dimensions (Why It Matters, Common Mistake) that simple lists can't capture. The structure helps interviewers understand rationale, not just tactics.

### Task 4.2: Precise Format Control

**Example Prompt:**
```
Write a tip about email productivity using EXACTLY this format:

## [Topic in 2-4 words]

**Key Point:** [One sentence summary]

### Why It Matters
[2-3 sentences explaining importance]

### Action Steps
1. [Specific action]
2. [Specific action]
3. [Specific action]

**Bottom Line:** [One sentence takeaway]

Topic: Email productivity
```

**Expected Challenges:**
- AI may vary slightly (headings, bold formatting)
- Sentence counts might not be exact
- May need to iterate and reinforce format

**Adjustments Needed:**
- Be very explicit: "EXACTLY 2-3 sentences" not just "2-3 sentences"
- Show the format with placeholder text
- May need to say "Do not add any additional sections"

---

## Part 5: Tone and Style Control

### Task 5.1: Tone Spectrum

**Content:** Announcement about new 3-day in-office policy

**Tone 1: Formal/Corporate**
```
You are a corporate communications professional. Write a formal announcement
about a new policy requiring employees to work from the office 3 days per week.

Tone: Professional, official, policy-focused
Length: 150-200 words
Include: Effective date, rationale, expectations
```

**Expected Key Phrases:**
- "effective [date]"
- "implemented to"
- "requires all employees"
- "company policy"
- "Please direct questions to"

**Tone 2: Friendly/Conversational**
```
You are a team manager announcing to your department about a new hybrid work
arrangement requiring 3 days in-office.

Tone: Warm, conversational, acknowledge feelings
Length: 150-200 words
Include: The change, why it's happening, you're available to talk
```

**Expected Key Phrases:**
- "wanted to let you know"
- "I know this is a change"
- "let's chat about it"
- "we're all in this together"
- "feel free to reach out"

**Tone 3: Direct/No-Nonsense**
```
Write a straightforward announcement about a new 3-day in-office requirement.

Tone: Clear, direct, factual
Length: 100 words max
Include: What's changing, when, what's expected
```

**Expected Key Phrases:**
- "Starting [date]"
- "You'll need to"
- "This means"
- "Here's what to do"
- Brief, clear sentences

### Task 5.2: Audience Adaptation

**Audience 1: Technical Users**
```
Announce scheduled maintenance this weekend.
Audience: Software engineers and technical users
Include: Specific times, affected services, technical impact
Tone: Technical, precise
```

**Expected Output Elements:**
- Exact downtime window (dates, times, timezone)
- Specific services affected (APIs, databases, etc.)
- Technical impact (latency, availability, SLA)
- Rollback procedures
- Monitoring status page

**Audience 2: Non-Technical Executives**
```
Announce scheduled maintenance this weekend.
Audience: C-level executives with no technical background
Focus: Business impact, not technical details
Tone: Concise, business-focused
```

**Expected Output Elements:**
- "Our platform will be offline for updates"
- Business impact (customer-facing? revenue impact?)
- Brief duration (hours, not specific times)
- "No action needed from you"
- Very simple language

**Audience 3: Customer Support Team (Internal)**
```
Announce scheduled maintenance this weekend.
Audience: Customer support team who will field questions
Include: What to tell customers, anticipated issues, escalation
Tone: Practical, supportive
```

**Expected Output Elements:**
- Customer-facing message template
- Expected customer questions and answers
- Known issues to watch for
- Who to escalate unusual problems to
- Support ticket handling guidance

**What Changed:**
- **Level of detail:** Technical (high) → Executive (low) → Support (medium)
- **Focus:** Technical specs → Business impact → Customer communication
- **Language:** Technical jargon → Business terms → Customer-friendly language

---

## Part 6: Complete Prompt Construction

### Task 6.1: Build a Perfect Prompt

**Example Complete Prompt:**

```
[ROLE]
You are a technical training specialist with 10 years of experience creating
onboarding materials for software tools.

[CONTEXT]
Our company uses Asana for project management. New employees have varying
levels of tech comfort. The guide needs to get them productive quickly without
overwhelming them. Most common use case: tracking individual tasks and
collaborating with their team.

[TASK]
Create a beginner-friendly training guide for new employees learning Asana.
Cover: setting up their profile, understanding projects/tasks, basic task
management, and collaborating with team members.

[FORMAT]
Structure the guide as:
1. Quick Start (3-5 essential steps to get started)
2. Core Concepts (brief explanation of projects, tasks, sections)
3. Daily Workflow (how to use Asana day-to-day)
4. Tips & Shortcuts (5 power-user tips)
5. Getting Help (where to find more resources)

Each section should have clear headers and use numbered steps where appropriate.
Length: 800-1000 words total.

[CONSTRAINTS]
- Assume no prior Asana experience
- Use simple language (avoid jargon)
- Include specific examples ("To create a task, click...")
- Don't cover advanced features yet (custom fields, portfolios, etc.)
- Keep it practical and immediately actionable

[TONE]
Friendly and encouraging. Make new users feel confident, not intimidated.
Write like a helpful colleague showing them the ropes, not a formal manual.
```

**Expected Evaluation:**

| Criterion | Score (1-5) | Notes |
|-----------|-------------|-------|
| Relevance | 5 | Directly addresses new employee needs |
| Completeness | 4-5 | Covers essentials without overwhelming |
| Format compliance | 5 | Follows specified structure |
| Tone match | 4-5 | Friendly, accessible, encouraging |
| Usefulness | 5 | Immediately actionable |

### Task 6.2: Prompt Transformation Challenge

**Original (Bad) Prompt:**
```
write something about customer service
```

**Transformed Prompt:**
```
[ROLE]
You are a customer experience consultant who has worked with Fortune 500
companies to improve customer satisfaction scores.

[CONTEXT]
I'm creating training materials for a customer support team at a B2B SaaS
company. Our support team handles email and chat inquiries from business
customers experiencing technical issues or billing questions. Current CSAT
score is 72% and we want to improve it.

[TASK]
Write a comprehensive guide on best practices for delivering excellent
customer service in a B2B technical support context.

[FORMAT]
Organize as:
## Core Principles (4-5 principles)
## Communication Techniques (specific tactics)
## Handling Difficult Situations (3-4 scenarios with responses)
## Success Metrics (how to measure effectiveness)

Length: 1200-1500 words total
Use bullet points for lists, bold for emphasis

[CONSTRAINTS]
- Focus on B2B/technical support context (not retail)
- Include specific language examples (not just theory)
- Address both email and chat channels
- Must be practical and immediately implementable
- Assume support reps have 6-12 months experience

[TONE]
Professional but approachable. Write as a mentor coaching the team.
Balance empathy for customers with realistic expectations.
```

**Documented Changes:**
- **Added role:** Customer experience consultant with corporate experience
- **Added context:** B2B SaaS, current CSAT, specific channels, goal to improve
- **Specified task:** Comprehensive guide with clear scope (B2B technical support)
- **Defined format:** Four sections with structure, length, formatting rules
- **Set constraints:** B2B focus, specific examples, practical, experience level
- **Established tone:** Professional mentor voice, balanced

**Before Quality: 1/5** (would produce generic, unfocused content)
**After Quality: 5/5** (produces targeted, practical, immediately useful guide)

---

## Grading Notes for Instructors

### Full Credit Criteria:

**Component Identification (15 points):**
- Accurately identified present and missing components
- Explained what's there vs. what's missing
- Demonstrated understanding through component impact exercise
- Showed quality improvements with added components

**Role Prompting (20 points):**
- Created distinct, appropriate roles
- Clear differences in output style and focus
- Effective role stacking with complementary expertise
- Analysis of which role works best for different contexts

**Task Decomposition (20 points):**
- Logical breakdown of complex task
- Sequential prompts that build on each other
- Demonstrated improvement over monolithic approach
- Practical, actionable sub-tasks

**Format Specification (20 points):**
- Successfully created varied formats (list, table, sections, Q&A)
- Achieved precise format control
- Selected appropriate format for content type
- Explained format rationale

**Tone Control (15 points):**
- Clear differentiation between tones
- Appropriate adaptation for different audiences
- Maintained content accuracy while changing tone
- Demonstrated understanding of tone's impact

**Complete Prompt (10 points):**
- Included all five components
- Components work together cohesively
- Produced high-quality output
- Dramatic improvement in transformation exercise

### Common Issues to Watch For:

❌ **Vague components** - "Add context" without being specific
✅ **Specific components** - "Add: audience = small business owners, goal = decide whether to adopt AI"

❌ **No comparison** - Just listing outputs without analysis
✅ **Comparative analysis** - Explaining why one approach worked better

❌ **Missing documentation** - Not explaining changes or reasoning
✅ **Full documentation** - Explicit about what changed and why

---

## Reflection Questions - Sample Strong Answers

**1. Which component had the biggest impact on output quality?**

"Format specification had the biggest impact for me. Once I started explicitly defining the output structure, I got exactly what I needed instead of having to re-prompt multiple times. The AI doesn't have to guess how to organize information."

**2. When would you skip certain components?**

"I'd skip Role for straightforward factual questions where expertise doesn't matter much ('What's the capital of France?'). I'd skip Context for simple, self-contained tasks. But I rarely skip Format anymore - even a simple 'keep it under 100 words' helps."

**3. What's your go-to prompt structure for common tasks?**

"For writing tasks: [Role] + [Context about audience] + [Task] + [Format with length] + [Tone]. For analytical tasks: [Context] + [Task with specific questions] + [Format] + [Constraints about what to focus on]. I almost always include all five, but emphasize different ones based on task type."

**4. How will you use task decomposition in your work?**

"Any time I'm tempted to ask for something complex in one prompt, I'll break it into steps. Especially for things like 'create a marketing plan' or 'write a proposal' - these need sequential building, not one-shot generation. I'll also use it when initial outputs are too generic."

---

## Additional Teaching Notes

### Key Takeaways for Students:

1. **Specificity compounds:** Each component adds constraint, focusing output
2. **Format is underrated:** Most students underuse explicit format specification
3. **Role activates patterns:** Different roles = different knowledge activation
4. **Decomposition beats monoliths:** Break complex tasks into sequential steps
5. **Tone requires explicit setting:** AI won't guess your intended tone accurately

### Extension Activities:

**For advanced students:**
- Create a reusable template for their most common task type
- Test how much each component matters by systematic removal
- Develop a personal "prompt checklist" for quality control
- Compare prompt structures across ChatGPT vs Claude

### Common Misconceptions to Address:

**Misconception:** "Longer prompts are always better"
**Reality:** Relevant detail is better. Irrelevant length adds noise.

**Misconception:** "One perfect prompt will solve everything"
**Reality:** Complex tasks need multiple sequential prompts (decomposition)

**Misconception:** "The AI will figure out what I want"
**Reality:** Explicit is better. Don't make the AI guess.

---

*Solution Guide | Module 2 | Prompt Engineering Masterclass*
