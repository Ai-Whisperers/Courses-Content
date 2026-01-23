# Module 4: Managing AI Risk & Governance

## Learning Objectives

By the end of this module, you will be able to:

1. Recognize common AI limitations and failure modes
2. Identify bias and fairness concerns in AI systems
3. Evaluate privacy and security risks associated with AI
4. Navigate the regulatory landscape for AI
5. Implement governance frameworks for responsible AI
6. Build responsible AI practices in your organization

---

## Prerequisites

- Completed Modules 1-3
- Understanding of AI capabilities and opportunities
- Awareness of your organization's risk management practices

**Estimated Time**: 3 hours

---

## 1. AI Limitations and Failures

### Common Failure Modes

AI systems fail in predictable ways. Understanding these helps you plan appropriately.

```
┌─────────────────────────────────────────────────────────────┐
│               COMMON AI FAILURE MODES                       │
├─────────────────────────────────────────────────────────────┤
│ HALLUCINATIONS: Generating false but confident statements   │
│ DRIFT: Performance degrading over time                     │
│ BRITTLENESS: Breaking with slight input changes            │
│ BIAS: Unfair treatment of certain groups                   │
│ ADVERSARIAL: Manipulation by bad actors                    │
│ OVERRELIANCE: Humans trusting AI too much                  │
└─────────────────────────────────────────────────────────────┘
```

### Hallucination Examples

AI confidently stating false information:

| Scenario | What AI Said | Reality |
|----------|-------------|---------|
| Legal research | "In Smith v. Jones (2019), the court ruled..." | Case doesn't exist |
| Product info | "This product contains 100% organic ingredients" | Contains synthetic ingredients |
| Statistics | "Studies show 87% of companies use AI daily" | Fabricated statistic |
| Person info | "Dr. Jane Smith won the Nobel Prize in 2022" | Person exists, never won Nobel |

### Model Drift

Performance degradation over time:

| Cause | Example | Impact |
|-------|---------|--------|
| Data drift | Customer behavior changes post-pandemic | Model predictions become inaccurate |
| Concept drift | Spam evolves to avoid detection | Spam filter effectiveness drops |
| Training/serving skew | Production data differs from training | Unexpected errors |

### Brittleness

Small changes causing large failures:

- Image classifier fails when photo is rotated slightly
- Chatbot confuses "affect" and "effect" in meaning
- Financial model fails on unusual market conditions
- Voice recognition fails with accents it wasn't trained on

### Real-World AI Failures

**Amazon Recruiting Tool (2018)**
- Problem: AI learned to favor male candidates
- Cause: Trained on historical hiring data that was male-dominated
- Result: Biased against resumes with "women's" indicators
- Lesson: Historical data encodes historical biases

**Microsoft Tay Chatbot (2016)**
- Problem: Chatbot learned offensive language from users
- Cause: No guardrails against harmful learning
- Result: Shut down within 24 hours
- Lesson: AI can be manipulated by bad actors

**Healthcare AI Bias (Multiple Studies)**
- Problem: AI recommended less care for Black patients
- Cause: Training data used healthcare costs as proxy for health needs
- Result: Black patients (who had less access to care) appeared "healthier"
- Lesson: Proxy measures can embed bias

---

## 2. Bias and Fairness Concerns

### Types of AI Bias

| Bias Type | Description | Example |
|-----------|-------------|---------|
| Historical bias | Past discrimination encoded in data | Loan approvals reflecting redlining |
| Representation bias | Training data doesn't represent population | Face recognition worse for minorities |
| Measurement bias | Imperfect proxy for what we want to measure | Using zip code to predict creditworthiness |
| Aggregation bias | One model for diverse populations | Same hiring criteria for different roles |
| Evaluation bias | Testing on unrepresentative data | Testing on data that doesn't reflect real users |

### Where Bias Enters

```
DATA COLLECTION → DATA PREPARATION → MODEL TRAINING → DEPLOYMENT → USE
     │                  │                  │              │          │
     ▼                  ▼                  ▼              ▼          ▼
Historical         Sampling           Optimization    Context      Human
patterns           choices            objectives      mismatch     interpretation
```

### High-Risk Areas for Bias

| Area | Risk | Why It Matters |
|------|------|----------------|
| Hiring | Discriminatory screening | Employment discrimination |
| Lending | Unfair credit decisions | Financial exclusion |
| Healthcare | Unequal treatment recommendations | Health outcomes |
| Criminal justice | Biased risk assessments | Liberty and fairness |
| Insurance | Discriminatory pricing | Economic inequality |

### Fairness Definitions (Choose Carefully)

There are multiple, sometimes conflicting definitions of fairness:

**Demographic Parity**: Same acceptance rate across groups
- "30% of men and 30% of women should be approved"

**Equalized Odds**: Same true positive and false positive rates
- "Equally accurate predictions for all groups"

**Individual Fairness**: Similar individuals treated similarly
- "People with similar qualifications get similar outcomes"

**Note**: These definitions can conflict. Achieving one may make another impossible.

### Bias Mitigation Strategies

1. **Pre-processing**: Fix bias in training data
2. **In-processing**: Add fairness constraints to training
3. **Post-processing**: Adjust outputs for fairness
4. **Monitoring**: Track disparities in production
5. **Human review**: Override for sensitive decisions

---

## 3. Privacy and Security Risks

### Privacy Risks

| Risk | Description | Example |
|------|-------------|---------|
| Data exposure | Sensitive data in training sets | Customer data used without consent |
| Model inversion | Extracting training data from model | Reconstructing faces from face recognition |
| Inference attacks | Inferring sensitive information | Predicting health conditions from behavior |
| Unauthorized collection | Gathering data without awareness | Silent monitoring |
| Re-identification | Linking "anonymous" data to individuals | Combining datasets to identify people |

### Data Privacy Considerations

**Before Using AI with Data:**
- [ ] Do we have consent to use this data?
- [ ] Is personally identifiable information (PII) protected?
- [ ] Can the data be de-identified appropriately?
- [ ] What data retention policies apply?
- [ ] Who has access to the data?
- [ ] Is cross-border data transfer involved?

### Security Risks

| Risk | Description | Example |
|------|-------------|---------|
| Adversarial attacks | Manipulating AI inputs to cause errors | Fooling image classifiers |
| Model theft | Extracting model through API queries | Copying proprietary algorithm |
| Data poisoning | Injecting bad data during training | Corrupting AI's learning |
| Prompt injection | Manipulating AI through crafted inputs | Getting chatbot to ignore instructions |
| Evasion attacks | Evading AI detection | Fraud designed to bypass AI |

### Security Best Practices

```
┌─────────────────────────────────────────────────────────────┐
│           AI SECURITY BEST PRACTICES                        │
├─────────────────────────────────────────────────────────────┤
│ ✓ Validate and sanitize inputs                              │
│ ✓ Implement rate limiting on AI services                    │
│ ✓ Monitor for unusual patterns                              │
│ ✓ Keep models and systems updated                           │
│ ✓ Encrypt data in transit and at rest                       │
│ ✓ Control access to AI systems                              │
│ ✓ Log AI decisions for audit                                │
│ ✓ Test for adversarial vulnerabilities                      │
└─────────────────────────────────────────────────────────────┘
```

### Generative AI Specific Risks

**Data Leakage:**
- Don't put confidential information into public AI tools
- Company secrets, personal data, proprietary code

**Output Risks:**
- AI-generated content may include copyrighted material
- Generated images may have rights issues
- Misinformation can spread through AI content

**Organizational Policies:**
- What data can be used with AI?
- Who can use which AI tools?
- What verification is required for AI outputs?

---

## 4. Regulatory Landscape

### Current Regulations

**European Union AI Act (2024)**
- Risk-based approach to AI regulation
- Bans certain AI uses (social scoring, real-time biometric surveillance)
- High-risk AI requires conformity assessments
- Transparency requirements for AI systems

**GDPR (EU)**
- Right to explanation for automated decisions
- Data minimization requirements
- Consent and legitimate interest rules
- Cross-border data transfer restrictions

**US State Laws**
- California CCPA/CPRA: Consumer privacy rights
- Illinois BIPA: Biometric data protection
- Various state AI employment laws

**Sector-Specific Regulations**
- Financial services: Fair lending, model risk management
- Healthcare: HIPAA, FDA oversight of medical AI
- Employment: EEOC guidance on AI hiring

### Regulatory Trends

```
2020         2022         2024         2026+
  │            │            │            │
  ▼            ▼            ▼            ▼
GDPR        State        EU AI Act    Global
Enforcement  Laws         Effective    Standards
             Emerge                    Emerge
```

### Compliance Considerations

| Regulation Area | Key Requirements | Business Impact |
|-----------------|------------------|-----------------|
| Explainability | Must explain AI decisions | Document decision logic |
| Consent | User agreement for AI processing | Update consent mechanisms |
| Fairness | Non-discrimination in AI | Bias testing and monitoring |
| Data rights | Access, deletion, portability | Data management processes |
| Audit | Records of AI decisions | Logging and documentation |

---

## 5. Governance Frameworks

### AI Governance Structure

```
┌─────────────────────────────────────────────────────────────┐
│                  AI GOVERNANCE STRUCTURE                    │
├─────────────────────────────────────────────────────────────┤
│                    AI Ethics Board                          │
│            (Strategic oversight, policy)                    │
├─────────────────────────────────────────────────────────────┤
│                    AI Governance Team                       │
│          (Standards, review, compliance)                    │
├─────────────────────────────────────────────────────────────┤
│  Business Units  │  IT/Data  │  Legal/Compliance  │  Risk  │
│  (AI projects)   │  (Tech)   │  (Requirements)    │ (Assess)│
└─────────────────────────────────────────────────────────────┘
```

### Key Governance Components

**Policies:**
- AI acceptable use policy
- Data governance policy
- AI procurement standards
- Vendor assessment requirements

**Processes:**
- AI project approval workflow
- Risk assessment methodology
- Testing and validation requirements
- Incident response procedures

**Accountability:**
- Clear ownership of AI systems
- Decision rights and escalation paths
- Regular reviews and audits
- Performance and impact tracking

### AI Risk Assessment Framework

For each AI application, assess:

| Risk Category | Questions to Ask | Risk Level |
|---------------|------------------|------------|
| Fairness | Could this harm certain groups? | H/M/L |
| Privacy | Does this use sensitive data? | H/M/L |
| Accuracy | What's the cost of errors? | H/M/L |
| Transparency | Can decisions be explained? | H/M/L |
| Security | Could this be manipulated? | H/M/L |
| Dependency | What if this fails? | H/M/L |

### Risk Tier Classification

**Tier 1: High Risk**
- Affects significant decisions about people
- Uses sensitive data
- Operates autonomously
- High consequences of failure

**Requirements:** Full review, human oversight, monitoring, documentation

**Tier 2: Medium Risk**
- Assists human decisions
- Uses business data
- Human-in-the-loop
- Moderate consequences

**Requirements:** Standard review, periodic monitoring, documentation

**Tier 3: Low Risk**
- Productivity tools
- Non-sensitive data
- Human always decides
- Low consequences

**Requirements:** Basic review, usage tracking

---

## 6. Building Responsible AI Practices

### Responsible AI Principles

Most organizations adopt principles like:

1. **Fairness**: AI should treat all people equitably
2. **Transparency**: AI decisions should be explainable
3. **Privacy**: AI should protect personal data
4. **Safety**: AI should be reliable and secure
5. **Accountability**: Humans should be responsible for AI
6. **Human-centered**: AI should augment, not replace humans

### Implementation Roadmap

**Phase 1: Foundation (Months 1-3)**
- Establish AI governance committee
- Draft AI principles and policies
- Inventory existing AI uses
- Assess current risks

**Phase 2: Standards (Months 4-6)**
- Create risk assessment framework
- Develop review processes
- Build testing requirements
- Train key stakeholders

**Phase 3: Operationalize (Months 7-12)**
- Implement approval workflows
- Deploy monitoring tools
- Conduct first audits
- Refine based on learning

**Phase 4: Mature (Ongoing)**
- Continuous improvement
- Regular audits
- External assessments
- Evolve with regulations

### Practical Checklist for AI Projects

Before deploying AI, verify:

```
□ Purpose: Is the use case appropriate for AI?
□ Data: Is training data appropriate and unbiased?
□ Testing: Has it been tested for bias and accuracy?
□ Explanation: Can we explain how it makes decisions?
□ Oversight: Is there human oversight for high-stakes decisions?
□ Privacy: Is personal data protected?
□ Security: Has it been secured against attacks?
□ Documentation: Is there adequate documentation?
□ Monitoring: Will we track performance and fairness?
□ Recourse: Can affected people appeal decisions?
```

---

## 7. Incident Response

### When AI Goes Wrong

Have a plan for AI incidents:

**Detection:**
- Monitoring alerts
- User complaints
- Audit findings
- External reports

**Assessment:**
- What went wrong?
- Who was affected?
- What's the severity?
- Is it ongoing?

**Response:**
- Stop harm immediately
- Communicate to stakeholders
- Document the incident
- Investigate root cause

**Remediation:**
- Fix the issue
- Compensate affected parties
- Update processes
- Prevent recurrence

### Communication Template

```
AI INCIDENT COMMUNICATION

What happened:
[Clear description of the issue]

Who was affected:
[Groups or individuals impacted]

What we're doing:
[Immediate actions taken]

What we've learned:
[Root cause and lessons]

What's next:
[Preventive measures]
```

---

## Best Practices Summary

1. **Expect failures**: Plan for AI to make mistakes
2. **Test for bias**: Before and after deployment
3. **Protect privacy**: Treat data with care
4. **Know the rules**: Stay current on regulations
5. **Govern appropriately**: Match oversight to risk
6. **Build responsible practices**: Embed principles in culture
7. **Prepare for incidents**: Have response plans ready

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. What are the main AI failure modes?
2. How can bias enter AI systems?
3. What are the key privacy risks with AI?
4. What regulations apply to AI in your region?
5. What should an AI governance framework include?

---

## Summary

In this module, you learned:

- **AI Failures**: Hallucinations, drift, brittleness, bias
- **Bias and Fairness**: Types, causes, and mitigation
- **Privacy and Security**: Risks and best practices
- **Regulations**: Current landscape and trends
- **Governance**: Frameworks and structures
- **Responsible AI**: Principles and implementation

**Next Module**: Hands-On with AI Tools - practical use of ChatGPT and Claude.

---

*Module 4 of 6 | Introduction to AI for Business Professionals | Duration: 3 hours*
