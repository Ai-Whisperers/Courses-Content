# Module 3 Quiz: Working with Private Repositories

**Time Limit**: 15 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
Which command installs GitHub CLI?

a) npm install github-cli
b) winget install --id GitHub.cli
c) apt install gh
d) Both b and c are correct

---

### Question 2
What is the correct command to authenticate with GitHub CLI?

a) gh login
b) gh auth login
c) gh authenticate
d) gh connect

---

### Question 3
Which command lists repositories in an organization?

a) gh repo list org-name
b) gh repos org-name
c) gh org repos org-name
d) gh list repos --org org-name

---

### Question 4
What does the --limit flag do in `gh repo list`?

a) Limits file size
b) Limits the number of repositories returned
c) Limits API calls
d) Limits clone depth

---

### Question 5
How do you clone a private repository with gh?

a) gh clone org/repo
b) gh repo clone org/repo
c) gh get org/repo
d) gh pull org/repo

---

## True/False (1 point each)

### Question 6
GitHub CLI can only access public repositories.

- [ ] True
- [ ] False

---

### Question 7
You can use `gh auth status` to check your authentication status.

- [ ] True
- [ ] False

---

### Question 8
GitHub CLI stores credentials in plain text.

- [ ] True
- [ ] False

---

### Question 9
You can view repository contents without cloning using GitHub CLI.

- [ ] True
- [ ] False

---

### Question 10
The `gh repo view` command shows repository README by default.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List three things you can do with GitHub CLI besides cloning repositories.

1. _____________
2. _____________
3. _____________

---

### Question 12
Write the command to list the 20 most recently updated repositories in an organization called "my-org".

```bash

```

---

### Question 13
After cloning a private repository, what should you do before asking AI to analyze it?

_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

### Question 14
You need to explore a new project at `your-org/api-service`. Write the sequence of commands to:

1. Clone the repository
2. Navigate into it
3. List all files
4. View the README
5. Check for existing tests

```bash
# Your commands here:




```

---

## Answer Key

*(For instructor use)*

1. d
2. b
3. a
4. b
5. b
6. False
7. True
8. False (uses system credential store)
9. True
10. True

### Question 11 (5 points)
Any three of:
- Create/view issues
- Create/view pull requests
- View repository details
- Create releases
- View workflow runs
- Manage gists
(1.67 points each)

### Question 12 (5 points)
```bash
gh repo list my-org --limit 20 --sort updated
```
- Correct base command (2 points)
- Correct limit (1.5 points)
- Correct sort (1.5 points)

### Question 13 (5 points)
Should mention:
- Create CLAUDE.md with project context (2 points)
- Review the codebase structure (1.5 points)
- Understand tech stack and conventions (1.5 points)

### Question 14 (10 points)
```bash
gh repo clone your-org/api-service
cd api-service
ls -la  # or dir
cat README.md  # or gh repo view
find . -name "*.test.*" -o -name "*.spec.*"  # or similar
```
- Clone (2 points)
- Navigate (2 points)
- List files (2 points)
- View README (2 points)
- Find tests (2 points)

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
