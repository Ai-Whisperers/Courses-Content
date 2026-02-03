# Module 4 Quiz: AI-Powered Documentation

**Time Limit**: 15 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What should architecture documentation include?

a) Only code comments
b) System overview, components, data flow, and dependencies
c) Just API endpoints
d) Only database schemas

---

### Question 2
When generating API documentation, what should be included for each endpoint?

a) Just the URL
b) URL, method, parameters, response, and examples
c) Only request parameters
d) Just the response format

---

### Question 3
What is the best approach when AI-generated documentation has errors?

a) Delete everything and start over
b) Use iterative refinement to fix specific issues
c) Accept it as-is
d) Write all documentation manually

---

### Question 4
Which format is typically best for architecture diagrams in markdown?

a) Only images
b) ASCII art or Mermaid diagrams
c) PDFs
d) Powerpoint slides

---

### Question 5
What should a setup guide prioritize?

a) Advanced configuration options
b) Step-by-step commands that beginners can follow
c) Code architecture details
d) Performance tuning

---

## True/False (1 point each)

### Question 6
AI can generate 100% accurate documentation without review.

- [ ] True
- [ ] False

---

### Question 7
Documentation should include environment variables needed to run the project.

- [ ] True
- [ ] False

---

### Question 8
API documentation should include error responses for each endpoint.

- [ ] True
- [ ] False

---

### Question 9
A good prompt for documentation should include output format specifications.

- [ ] True
- [ ] False

---

### Question 10
You should generate all documentation in a single AI prompt.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List four types of documentation you should generate for a project.

1. _____________
2. _____________
3. _____________
4. _____________

---

### Question 12
What are the key sections to include in API reference documentation for a single endpoint?

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

### Question 13
Write a prompt to generate a setup guide for a Node.js project with PostgreSQL database.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

### Question 14
Review this AI-generated documentation and identify 3 issues:

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

**Issues found:**

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________

**Write improved documentation:**

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Answer Key

*(For instructor use)*

1. b
2. b
3. b
4. b
5. b
6. False
7. True
8. True
9. True
10. False (use multiple focused prompts)

### Question 11 (5 points)
Any four of:
- Architecture documentation
- API reference
- Setup/installation guide
- Contributing guide
- Test documentation
- Troubleshooting guide
- Changelog
(1.25 points each)

### Question 12 (5 points)
Should include:
- Method signature/endpoint (1 point)
- Description (1 point)
- Parameters with types (1 point)
- Return value (1 point)
- Example usage (1 point)

### Question 13 (5 points)
Should include:
- Framework/tech stack (1 point)
- Database setup (1 point)
- Request for step-by-step format (1 point)
- Environment configuration (1 point)
- Verification steps (1 point)

### Question 14 (10 points)

Issues (6 points, 2 each):
1. Description too vague (not descriptive)
2. Parameters not typed/described
3. Example doesn't show actual usage with data

Improved documentation (4 points):
```markdown
## createUser

Creates a new user account in the system.

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| data.email | string | Yes | User's email address |
| data.name | string | Yes | User's full name |
| data.password | string | Yes | Password (min 8 chars) |

**Returns**: User object with id, email, name, createdAt

**Example**:
```javascript
const user = await createUser({
  email: 'john@example.com',
  name: 'John Doe',
  password: 'securepass123'
});
```
```

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
