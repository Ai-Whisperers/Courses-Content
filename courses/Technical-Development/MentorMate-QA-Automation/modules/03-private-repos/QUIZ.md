# Module 3 Quiz: Accessing Private Repositories with AI

**Time Limit**: 15 minutes
**Passing Score**: 70% (28/40 points)
**Attempts**: Unlimited

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- Read each question carefully
- Select the best answer for multiple choice questions
- Write clear, concise answers for short answer questions
- For practical questions, write actual commands
- No resources allowed during the quiz (closed book)

---

## Section 1: Multiple Choice (2 points each)

### Question 1
What is the primary purpose of GitHub CLI (`gh`) for AI-assisted QA work?

a) To replace Git entirely
b) To enable AI tools to access private repositories
c) To write tests automatically
d) To deploy applications to production

**Your Answer:** ___

---

### Question 2
Which command is used to authenticate with GitHub CLI?

a) `gh login`
b) `gh auth start`
c) `gh auth login`
d) `gh authenticate`

**Your Answer:** ___

---

### Question 3
What is the recommended protocol for GitHub CLI authentication?

a) SSH
b) HTTPS
c) FTP
d) Telnet

**Your Answer:** ___

---

### Question 4
Which command lists repositories in an organization called "TechCorp"?

a) `gh org repos TechCorp`
b) `gh repo list TechCorp`
c) `gh list repos --org TechCorp`
d) `gh repos TechCorp`

**Your Answer:** ___

---

### Question 5
How do you clone a private repository named "api-service" from organization "MyOrg"?

a) `gh clone MyOrg/api-service`
b) `gh get MyOrg/api-service`
c) `gh repo clone MyOrg/api-service`
d) `gh pull MyOrg/api-service`

**Your Answer:** ___

---

## Section 2: True/False (1 point each)

### Question 6
GitHub CLI can only access public repositories by default.

- [ ] True
- [ ] False

**Your Answer:** ___

---

### Question 7
Organization access must be explicitly granted after authenticating with GitHub CLI.

- [ ] True
- [ ] False

**Your Answer:** ___

---

### Question 8
The command `gh auth status` shows whether you are successfully authenticated.

- [ ] True
- [ ] False

**Your Answer:** ___

---

### Question 9
GitHub CLI stores authentication tokens in plain text files.

- [ ] True
- [ ] False

**Your Answer:** ___

---

### Question 10
You can use `gh repo view` to see repository details without cloning it first.

- [ ] True
- [ ] False

**Your Answer:** ___

---

## Section 3: Short Answer (5 points each)

### Question 11
List three things you can do with GitHub CLI besides cloning repositories.

1. _____________________________________________

2. _____________________________________________

3. _____________________________________________

---

### Question 12
You run `gh repo list MyOrg` and get an error: "Could not resolve to a Repository with the name 'MyOrg'". List two possible causes and their solutions.

**Cause 1:** ___________________________________________

**Solution 1:** ___________________________________________

**Cause 2:** ___________________________________________

**Solution 2:** ___________________________________________

---

### Question 13
When using AI to analyze an unfamiliar codebase, what are the four main areas you should ask about first? (List in order of priority)

1. _____________________________________________

2. _____________________________________________

3. _____________________________________________

4. _____________________________________________

---

## Section 4: Practical (10 points)

### Question 14
You've just joined a new team and need to explore their private repository at `techcorp/customer-api`. Write the complete sequence of commands you would use to:

1. Clone the repository
2. Navigate into the repository
3. View the README file
4. Find all test files
5. Start Claude Code to analyze the codebase

```bash
# Your commands here:
# Command 1:


# Command 2:


# Command 3:


# Command 4:


# Command 5:


```

---

## Answer Key

*(For instructor use only - remove before distributing to students)*

---

### Section 1: Multiple Choice

1. **b** - To enable AI tools to access private repositories
2. **c** - `gh auth login`
3. **b** - HTTPS
4. **b** - `gh repo list TechCorp`
5. **c** - `gh repo clone MyOrg/api-service`

---

### Section 2: True/False

6. **False** - GitHub CLI can access private repositories after authentication and proper permissions
7. **True** - Organization access requires explicit permission grant
8. **True** - `gh auth status` verifies authentication
9. **False** - Tokens are stored in system credential store (Keychain/Credential Manager)
10. **True** - `gh repo view` shows repository details without cloning

---

### Section 3: Short Answer

#### Question 11 (5 points)
**Acceptable answers (any three):**
- Create/view pull requests (1.67 pts)
- Create/view issues (1.67 pts)
- View repository details (1.67 pts)
- Create releases (1.67 pts)
- View workflow runs/CI status (1.67 pts)
- Manage gists (1.67 pts)
- Access GitHub API (1.67 pts)
- Fork repositories (1.67 pts)

**Grading:**
- 3 valid answers = 5 points
- 2 valid answers = 3.33 points
- 1 valid answer = 1.67 points

---

#### Question 12 (5 points)
**Expected causes and solutions:**

**Acceptable Cause 1:**
- Organization access not granted (1.25 pts)
- Not a member of the organization (1.25 pts)
- Typo in organization name (1.25 pts)

**Acceptable Solution 1:**
- Visit https://github.com/settings/tokens and grant org access (1.25 pts)
- Run `gh auth refresh -s read:org` (1.25 pts)
- Ask admin to add you to org (1.25 pts)
- Fix the spelling (1.25 pts)

**Acceptable Cause 2:**
- Token lacks required permissions (1.25 pts)
- Authentication expired (1.25 pts)
- Organization name is incorrect (1.25 pts)

**Acceptable Solution 2:**
- Refresh token with org permissions (1.25 pts)
- Re-authenticate with `gh auth login` (1.25 pts)
- Verify correct org name with `gh api user/orgs` (1.25 pts)

**Grading:**
- Valid cause 1 + solution 1 = 2.5 points
- Valid cause 2 + solution 2 = 2.5 points
- Partial credit for reasonable answers

---

#### Question 13 (5 points)
**Expected order:**

1. **Project purpose** / What the application does (1.25 pts)
2. **Architecture overview** / Main components (1.25 pts)
3. **Tech stack** / Languages and frameworks (1.25 pts)
4. **Entry points** / How to run it (1.25 pts)

**Grading:**
- All 4 in reasonable order = 5 points
- 3 correct = 3.75 points
- 2 correct = 2.5 points
- 1 correct = 1.25 points

**Acceptable variations:**
- "Directory structure" instead of "Architecture overview"
- "Dependencies" instead of "Tech stack"
- "Testing setup" as #4 instead of entry points

---

### Section 4: Practical

#### Question 14 (10 points)

**Expected commands:**

```bash
# Command 1: Clone (2 points)
gh repo clone techcorp/customer-api

# Command 2: Navigate (2 points)
cd customer-api

# Command 3: View README (2 points)
cat README.md
# OR
gh repo view techcorp/customer-api
# OR
more README.md
# OR
less README.md

# Command 4: Find test files (2 points)
find . -name "*.test.*" -o -name "*.spec.*"
# OR
find . -type f -name "*test*"
# OR
ls -R | grep test
# OR
grep -r "test" --include="*.js"

# Command 5: Start Claude (2 points)
claude
# OR
claude .
```

**Grading rubric:**
- **Clone command (2 pts):**
  - Correct `gh repo clone techcorp/customer-api` = 2 pts
  - Close variant (e.g., wrong org name but right format) = 1 pt
  - Wrong command = 0 pts

- **Navigate command (2 pts):**
  - Correct `cd customer-api` = 2 pts
  - Wrong directory name but right command = 1 pt
  - Wrong command = 0 pts

- **View README (2 pts):**
  - Any valid command to view file = 2 pts
  - Partially correct = 1 pt
  - Wrong command = 0 pts

- **Find test files (2 pts):**
  - Correct find/grep/ls command = 2 pts
  - Partially correct but would work = 1 pt
  - Wrong approach = 0 pts

- **Start Claude (2 pts):**
  - Correct `claude` command = 2 pts
  - Close variant = 1 pt
  - Wrong command = 0 pts

**Common acceptable variations:**
- Using `git clone` with authentication instead of `gh repo clone` (full credit for command 1)
- Using Windows commands (`dir`, `type`) instead of Linux commands (full credit)
- Using `code .` to open in VS Code before starting Claude (acceptable, but `claude` command still required)

---

## Scoring Summary

| Section | Questions | Points Each | Total Points |
|---------|-----------|-------------|--------------|
| Multiple Choice (1-5) | 5 | 2 | 10 |
| True/False (6-10) | 5 | 1 | 5 |
| Short Answer (11-13) | 3 | 5 | 15 |
| Practical (14) | 1 | 10 | 10 |
| **Total** | **14** | | **40** |

---

## Grade Scale

| Score Range | Grade | Status |
|-------------|-------|--------|
| 36-40 | A | Excellent |
| 32-35 | B | Good |
| 28-31 | C | Passing |
| 24-27 | D | Needs Review |
| 0-23 | F | Not Passing |

**Passing Score:** 28 points (70%)

---

## Common Mistakes to Avoid

### Multiple Choice:
- **Q1:** Don't confuse GitHub CLI with Git itself - they serve different purposes
- **Q3:** SSH works but HTTPS is recommended for easier token management
- **Q4:** The format is `gh repo list ORG`, not `gh org repos ORG`

### True/False:
- **Q6:** GitHub CLI CAN access private repos after proper authentication
- **Q9:** Tokens are NOT stored in plain text - they use system credential stores

### Short Answer:
- **Q11:** Be specific - "manage repositories" is too vague, say "create pull requests"
- **Q12:** Solutions must be actionable - "fix it" is not enough, explain how
- **Q13:** Order matters - start with high-level understanding, then drill down

### Practical:
- **Q14:** Use actual commands, not descriptions like "clone the repo"
- **Q14:** Remember to navigate into directory BEFORE starting Claude
- **Q14:** The find command should actually find test files, not just list all files

---

## Quiz Review Tips

If you scored below 70%:

1. **Review these sections:**
   - 01-SLIDES.md: Slides 5-25 (GitHub CLI overview and commands)
   - 04-CODE-EXAMPLES.md: Section 3 (Repository commands)

2. **Practice these commands:**
   - Install and authenticate GitHub CLI
   - List and clone repositories
   - View repository details
   - Find files in repositories

3. **Understand these concepts:**
   - Difference between Git and GitHub CLI
   - Why organization access is needed
   - How authentication tokens work
   - Basic file exploration commands

4. **Retake strategy:**
   - Review answer key explanations
   - Practice commands in a terminal
   - Create study notes for weak areas
   - Retake when confident

---

## Study Guide

### Key Commands to Memorize:

```bash
# Authentication
gh auth login
gh auth status
gh auth refresh -s read:org

# Repository Operations
gh repo list [ORG]
gh repo view ORG/REPO
gh repo clone ORG/REPO

# Information
gh --version
gh --help
gh auth status -t
```

### Key Concepts:

1. **GitHub CLI Purpose:** Enables command-line access to GitHub, especially useful for AI tools to access private repos

2. **Authentication Flow:**
   - Install `gh`
   - Run `gh auth login`
   - Choose GitHub.com, HTTPS, browser authentication
   - Grant organization access if needed

3. **Organization Access:** Separate permission from general authentication, must be explicitly granted

4. **Token Security:** Stored in system credential manager, not plain text

5. **AI Exploration:** Start with high-level overview, then directory structure, then specific features

---

## Post-Quiz Reflection

After completing the quiz, reflect on:

**What I knew well:**
_________________________________________

**What I need to review:**
_________________________________________

**Commands I should practice:**
_________________________________________

**Concepts I found confusing:**
_________________________________________

**My study plan before retake (if needed):**
_________________________________________

---

## Additional Practice

### Practice Exercises:

1. **Install and authenticate GitHub CLI** on your machine
2. **List repositories** from your organization
3. **Clone a repository** you haven't worked with
4. **Explore the repository** using command-line tools
5. **Start Claude and ask** for a high-level overview

### Challenge Questions:

**Challenge 1:** How would you list only private JavaScript repositories from your organization?
```bash
# Your answer:
```

**Challenge 2:** Write a command to clone a repository to a specific directory location:
```bash
# Your answer:
```

**Challenge 3:** How would you check your GitHub CLI token's permissions?
```bash
# Your answer:
```

---

## Instructor Notes

### Grading Guidelines:

**Consistency:**
- Apply rubric consistently across all students
- Accept reasonable variations in commands (OS differences)
- Focus on understanding, not exact syntax memorization

**Partial Credit:**
- Award partial credit for partially correct answers
- Encourage thinking over memorization
- Value practical knowledge over theoretical

**Feedback:**
- Provide specific feedback on wrong answers
- Suggest resources for improvement
- Highlight what was done well

### Common Student Issues:

1. **Confusing Git with GitHub CLI**
   - Clarify: Git = version control, GitHub CLI = GitHub interaction

2. **Forgetting organization access**
   - Most common stumbling block
   - Emphasize in review sessions

3. **Command syntax variations**
   - Accept OS-specific variations (Windows vs. Linux commands)
   - Focus on concepts, not exact syntax

4. **Practical question challenges**
   - Students often skip `cd` command
   - Remind about working directory importance

---

**End of Quiz**

**Good luck!** Review the slides and exercises if you need to prepare more.

**Questions?** Ask in #qa-course-module-3 or during office hours.

---

*Module 03 Quiz - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
