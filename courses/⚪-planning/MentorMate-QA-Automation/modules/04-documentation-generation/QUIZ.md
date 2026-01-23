# Module 04: Quiz
## AI-Powered Documentation Generation

---

## Quiz Information

**Time Limit:** 15 minutes
**Total Points:** 40
**Passing Score:** 28 points (70%)
**Attempts:** Unlimited
**Open Book:** No (close all materials before starting)

---

## Instructions

1. Read each question carefully
2. Select the best answer for multiple choice
3. Mark True or False clearly
4. Provide complete answers for short answer questions
5. Submit within 15 minutes

---

## Multiple Choice Questions (2 points each)

### Question 1

What should architecture documentation include?

a) Only code comments and inline documentation
b) System overview, components, data flow, diagrams, and dependencies
c) Just API endpoints and request/response schemas
d) Only database schemas and table definitions

**Your Answer:** _____

---

### Question 2

When generating API documentation, what should be included for each endpoint?

a) Just the URL path
b) URL, method, parameters, response codes, and working examples
c) Only request parameters
d) Just the response format without examples

**Your Answer:** _____

---

### Question 3

What is the best approach when AI-generated documentation has errors or inaccuracies?

a) Delete everything and start completely over from scratch
b) Use iterative refinement to fix specific issues identified in review
c) Accept it as-is because AI is always accurate
d) Write all documentation manually without using AI

**Your Answer:** _____

---

### Question 4

Which format is typically best for architecture diagrams in Markdown documentation?

a) Only external image files (PNG, JPG)
b) ASCII art or Mermaid diagrams that render in Markdown
c) PDF attachments
d) PowerPoint slides embedded in the documentation

**Your Answer:** _____

---

### Question 5

What should a setup guide prioritize to be most effective?

a) Advanced configuration options and edge cases only
b) Step-by-step commands that beginners can copy-paste and follow
c) Detailed code architecture explanations
d) Performance tuning and optimization techniques

**Your Answer:** _____

---

## True/False Questions (1 point each)

### Question 6

AI can generate 100% accurate documentation without any human review or verification.

- [ ] True
- [ ] False

**Your Answer:** _____

---

### Question 7

Documentation should include all required environment variables needed to run the project.

- [ ] True
- [ ] False

**Your Answer:** _____

---

### Question 8

API documentation should include error response examples for each endpoint, not just success cases.

- [ ] True
- [ ] False

**Your Answer:** _____

---

### Question 9

A good prompt for documentation generation should include specific output format specifications and structure requirements.

- [ ] True
- [ ] False

**Your Answer:** _____

---

### Question 10

You should generate all types of documentation (architecture, API, setup, tests) in a single AI prompt for efficiency.

- [ ] True
- [ ] False

**Your Answer:** _____

---

## Short Answer Questions (5 points each)

### Question 11

List four different types of documentation you should generate for a complete software project.

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
4. _____________________________________________

---

### Question 12

What are the key sections to include in API reference documentation for a single endpoint? List at least 5 sections.

__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________

---

### Question 13

Write a prompt to generate a setup guide for a Node.js project with a PostgreSQL database. Your prompt should specify at least 4 sections to include.

__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________
__________________________________________________________________________

---

## Practical Question (10 points)

### Question 14

Review this AI-generated API documentation and identify at least 3 specific issues, then write improved documentation.

**AI-Generated Documentation:**

```markdown
## createUser

Creates user.

**Parameters**: data

**Returns**: user object

**Example**:
```
createUser(data)
```
```

**Part A: Identify 3 Issues (6 points - 2 points each)**

1. __________________________________________________________________________
   __________________________________________________________________________

2. __________________________________________________________________________
   __________________________________________________________________________

3. __________________________________________________________________________
   __________________________________________________________________________

**Part B: Write Improved Documentation (4 points)**

```markdown
[Write your improved documentation here]














```

---

## Answer Key

*(For instructor use only)*

---

### Multiple Choice Answers

1. **b** - System overview, components, data flow, diagrams, and dependencies

2. **b** - URL, method, parameters, response codes, and working examples

3. **b** - Use iterative refinement to fix specific issues identified in review

4. **b** - ASCII art or Mermaid diagrams that render in Markdown

5. **b** - Step-by-step commands that beginners can copy-paste and follow

**Multiple Choice Total: 10 points**

---

### True/False Answers

6. **False** - AI-generated documentation always requires human review and verification for accuracy

7. **True** - Environment variables are essential for setup and configuration

8. **True** - Error responses are critical for complete API documentation

9. **True** - Specific format specifications lead to better, more structured output

10. **False** - Use multiple focused prompts, one for each documentation type, for better results

**True/False Total: 5 points**

---

### Short Answer Answers

### Question 11 (5 points - 1.25 points each)

Any four of the following (accept similar valid answers):
- Architecture documentation / System architecture
- API reference documentation / API docs
- Setup guide / Installation guide / Getting started guide
- Test documentation / Testing guide
- User guide / User documentation
- Contributing guide / Contribution guidelines
- Troubleshooting guide
- README file
- Deployment guide
- Security documentation
- Changelog / Version history

**Scoring:**
- 4 valid documentation types: 5 points
- 3 valid types: 3.75 points
- 2 valid types: 2.5 points
- 1 valid type: 1.25 points

---

### Question 12 (5 points - 1 point each)

Should include at least 5 of these key sections:
1. **Method signature / Endpoint** (METHOD and path) - 1 point
2. **Description** (what the endpoint does) - 1 point
3. **Parameters** (with types, required/optional, descriptions) - 1 point
4. **Return value / Response** (success and error responses) - 1 point
5. **Example usage** (curl command or code example) - 1 point

Additional acceptable sections (can substitute):
- Authentication requirements
- Headers
- Request body schema
- Error codes and meanings
- Notes (rate limiting, pagination, etc.)

**Scoring:**
- 5+ sections mentioned: 5 points
- 4 sections: 4 points
- 3 sections: 3 points
- 2 sections: 2 points
- 1 section: 1 point

---

### Question 13 (5 points)

Prompt should include:

**Required elements for full credit:**
1. **Project context** (Node.js, PostgreSQL) - 1 point
2. **Request for SETUP.md file** - 0.5 points
3. **At least 4 specific sections requested:** - 3 points (0.75 each)
   - Prerequisites
   - Installation/Dependencies
   - Database setup
   - Environment configuration
   - Running the application
   - Common tasks
   - Troubleshooting
4. **Request for step-by-step format or copy-paste ready commands** - 0.5 points

**Example acceptable answer:**
```
Create a comprehensive setup guide for a Node.js project with PostgreSQL database.

Generate SETUP.md with:
1. Prerequisites (Node.js version, PostgreSQL version)
2. Installation steps (npm install, etc.)
3. Database setup (creating database, running migrations)
4. Environment configuration (environment variables)
5. Running the application
6. Troubleshooting common issues

Make all commands copy-paste ready.
```

**Scoring:**
- Includes all required elements: 5 points
- Missing 1 element: 4 points
- Missing 2 elements: 3 points
- Missing 3 elements: 2 points
- Minimal prompt with <2 sections: 1 point

---

### Question 14 (10 points total)

**Part A: Issues (6 points - 2 points each)**

At least 3 issues should be identified:

1. **Description too vague** - "Creates user" doesn't explain what the function actually does, what validation occurs, what happens with the data

2. **Parameters not typed or described** - "data" doesn't specify what fields are required, types, or descriptions

3. **Return value not detailed** - "user object" doesn't specify what fields are in the object, their types, or what's excluded (e.g., password)

4. **Example doesn't show actual usage** - Example should show real data being passed, not just the function name

5. **Missing error information** - No mention of what errors/exceptions can be thrown

6. **Missing authentication/authorization info** - Doesn't specify if this is a public function or requires permissions

**Scoring for Part A:**
- 3+ valid, specific issues identified: 6 points
- 2 valid issues: 4 points
- 1 valid issue: 2 points
- No valid issues: 0 points

**Part B: Improved Documentation (4 points)**

Should include:
- Clear description (1 point)
- Detailed parameters table or list (1 point)
- Detailed return value (1 point)
- Realistic example with actual data (1 point)

**Example acceptable improved answer:**

```markdown
## createUser(userData)

**Description:** Creates a new user account in the system. Validates input data, hashes the password using bcrypt, stores the user in the database, and returns the created user object without sensitive data.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| userData.email | string | Yes | User's email address (must be valid email format) |
| userData.name | string | Yes | User's full name (2-100 characters) |
| userData.password | string | Yes | Password (minimum 8 characters) |
| userData.role | string | No | User role (default: 'customer') |

**Returns:**
- **Type:** Promise<Object>
- **Description:** Created user object with id, email, name, role, and createdAt
- **Example:**
```javascript
{
  id: '550e8400-e29b-41d4-a716-446655440000',
  email: 'john@example.com',
  name: 'John Doe',
  role: 'customer',
  createdAt: '2025-11-24T10:30:00Z'
}
```

**Throws:**
- `ValidationError` - When required fields are missing or invalid
- `DuplicateEmailError` - When email already exists in database

**Example Usage:**
```javascript
const user = await createUser({
  email: 'john@example.com',
  name: 'John Doe',
  password: 'SecurePass123!'
});
console.log('User created:', user.id);
```

**Notes:**
- Password is automatically hashed and never returned
- Email uniqueness is enforced
- User is created with 'verified: false' status
```

**Scoring for Part B:**
- Excellent documentation with all elements: 4 points
- Good documentation missing 1 element: 3 points
- Adequate documentation missing 2 elements: 2 points
- Minimal improvement: 1 point
- No improvement or worse: 0 points

---

## Scoring Summary

| Section | Points |
|---------|--------|
| Multiple Choice (5 questions × 2 points) | 10 |
| True/False (5 questions × 1 point) | 5 |
| Short Answer Q11 | 5 |
| Short Answer Q12 | 5 |
| Short Answer Q13 | 5 |
| Practical Q14 Part A | 6 |
| Practical Q14 Part B | 4 |
| **Total** | **40** |

**Passing Score:** 28 points (70%)

---

## Grade Ranges

| Score | Grade | Performance |
|-------|-------|-------------|
| 36-40 | A | Excellent - Mastery of documentation generation |
| 32-35 | B | Good - Strong understanding with minor gaps |
| 28-31 | C | Satisfactory - Passing, meets basic requirements |
| 24-27 | D | Below expectations - Needs review |
| 0-23 | F | Failing - Significant gaps in understanding |

---

## Common Mistakes and Feedback

### Question 1
**Common Mistake:** Choosing "c" (just API endpoints)
**Feedback:** Architecture documentation is broader than just API docs; it covers system overview, components, data flow, and more.

### Question 3
**Common Mistake:** Choosing "a" (delete and start over)
**Feedback:** Iterative refinement is more efficient than starting from scratch. Identify specific issues and ask AI to fix them.

### Question 5
**Common Mistake:** Choosing "a" (advanced configuration)
**Feedback:** Setup guides should prioritize getting beginners running quickly. Advanced topics come later.

### Question 10
**Common Mistake:** Answering "True"
**Feedback:** Multiple focused prompts produce better results than one massive prompt. Each doc type needs specific context.

### Question 13
**Common Mistake:** Vague prompts like "Create a setup guide"
**Feedback:** Specific prompts with clear structure requirements produce better documentation. List exact sections needed.

### Question 14
**Common Mistake:** Not being specific about issues
**Feedback:** Vague feedback like "needs more detail" isn't helpful. Identify exactly what's missing: "No parameter types", "No error handling", etc.

---

## Study Tips for Retake

If you didn't pass, focus on:

1. **Review Module Slides:** Especially sections on:
   - Documentation types and their purposes
   - Prompt engineering for documentation
   - Quality review checklist

2. **Study Code Examples:** Look at:
   - Complete documentation examples
   - Before/after prompt comparisons
   - Mermaid diagram examples

3. **Practice:**
   - Generate docs for a small project
   - Review and identify issues in your output
   - Improve based on quality checklist

4. **Key Concepts to Master:**
   - What goes in each documentation type
   - How to structure effective prompts
   - Quality review criteria
   - Why AI output needs verification

---

## Next Steps

### If You Passed (70%+)
✅ Congratulations! You're ready to move on.
- Apply these skills to real projects
- Build your documentation prompt library
- Help classmates with documentation

### If You Need to Retake
📚 Don't worry, you'll get there!
- Review materials listed above
- Take practice quiz (if available)
- Ask questions in office hours
- Retake when ready (unlimited attempts)

---

**Module 04 Complete!** 🎉

Ready for **Module 05: Creating Test Plans with AI**

---

*Module 04 Quiz - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
