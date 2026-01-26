# Troubleshooting Guide

Common issues and solutions when using AI for test automation.

---

## AI Tool Issues

### Claude Code Won't Start

**Symptoms:**
- Command not found
- Permission denied
- Won't initialize

**Solutions:**

1. **Verify installation:**
   ```bash
   claude --version
   ```

2. **Reinstall Claude Code:**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

3. **Check Node.js version (requires 18+):**
   ```bash
   node --version
   ```

4. **Fix permissions (Linux/Mac):**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```

---

### Authentication Failures

**Symptoms:**
- "API key invalid"
- "Unauthorized"
- Rate limit errors

**Solutions:**

1. **Re-authenticate:**
   ```bash
   claude auth
   ```

2. **Check API key:**
   ```bash
   echo $ANTHROPIC_API_KEY
   ```

3. **Reset API key:**
   - Visit console.anthropic.com
   - Generate new key
   - Update environment variable

---

### AI Not Understanding Context

**Symptoms:**
- Generic responses
- Doesn't know project structure
- Ignores coding conventions

**Solutions:**

1. **Create/update CLAUDE.md:**
   ```markdown
   # Project Context

   ## Tech Stack
   - Node.js 20
   - Jest for testing

   ## Conventions
   - Use camelCase
   - AAA pattern for tests
   ```

2. **Include relevant code in prompt:**
   ```
   Here's the function to test:
   [paste code]

   Here's our test pattern:
   [paste example test]
   ```

3. **Use more specific prompts:**
   - Bad: "Write tests"
   - Good: "Write Jest unit tests for the createUser function with mocks for database and email services"

---

### AI Output Is Wrong/Incomplete

**Symptoms:**
- Syntax errors
- Missing imports
- Incomplete test cases
- Wrong framework

**Solutions:**

1. **Be explicit about requirements:**
   ```
   Generate Jest tests (not Mocha) with:
   - ES6 imports
   - async/await syntax
   - jest.mock() for dependencies
   ```

2. **Use iterative refinement:**
   ```
   The tests are missing:
   1. Import for userService
   2. beforeEach setup
   3. Test for error case

   Add these to the existing tests.
   ```

3. **Break into smaller prompts:**
   - First: Generate happy path tests
   - Then: Add error cases
   - Then: Add edge cases

---

## Testing Issues

### Tests Won't Run

**Symptoms:**
- "Cannot find module"
- Configuration errors
- Test framework not found

**Solutions:**

1. **Install dependencies:**
   ```bash
   npm install
   # or
   npm install jest --save-dev
   ```

2. **Check Jest configuration in package.json:**
   ```json
   {
     "jest": {
       "testEnvironment": "node"
     }
   }
   ```

3. **Verify test file naming:**
   - Jest: `*.test.js` or `*.spec.js`
   - Pytest: `test_*.py` or `*_test.py`

---

### Tests Fail Unexpectedly

**Symptoms:**
- Tests work locally but fail in CI
- Intermittent failures
- Order-dependent failures

**Solutions:**

1. **Check test isolation:**
   ```javascript
   // BAD - shared state
   let user;
   test('creates user', () => {
     user = createUser();
   });
   test('uses user', () => {
     expect(user).toBeDefined(); // May fail if order changes
   });

   // GOOD - isolated
   beforeEach(() => {
     user = createUser();
   });
   ```

2. **Reset state between tests:**
   ```javascript
   beforeEach(() => {
     jest.clearAllMocks();
     // Reset database
     return db.truncate('users');
   });
   ```

3. **Fix timing issues:**
   ```javascript
   // Use fake timers
   jest.useFakeTimers();

   // Or increase timeout
   test('slow test', async () => {
     // ...
   }, 10000);
   ```

---

### Flaky Tests

**Symptoms:**
- Same test passes and fails randomly
- Works locally, fails in CI
- Timeout errors

**Solutions:**

1. **Add retries:**
   ```javascript
   // jest.config.js
   module.exports = {
     retries: 2
   };
   ```

2. **Wait for conditions:**
   ```javascript
   // BAD
   await page.click('button');
   expect(page.url()).toContain('/success');

   // GOOD
   await page.click('button');
   await page.waitForURL('**/success');
   ```

3. **Remove race conditions:**
   ```javascript
   // BAD
   const result = asyncOperation();
   expect(result).toBeDefined();

   // GOOD
   const result = await asyncOperation();
   expect(result).toBeDefined();
   ```

---

### Coverage Not Increasing

**Symptoms:**
- Tests pass but coverage stays low
- Untested lines remain
- Branch coverage missing

**Solutions:**

1. **Check what's not covered:**
   ```bash
   npm test -- --coverage --coverageReporters=text
   ```

2. **Test branches:**
   ```javascript
   // Code
   if (condition) {
     doA();
   } else {
     doB();
   }

   // Need tests for both branches
   test('does A when condition true', () => { ... });
   test('does B when condition false', () => { ... });
   ```

3. **Test error paths:**
   ```javascript
   test('throws on invalid input', () => {
     expect(() => func(null)).toThrow();
   });
   ```

---

## GitHub CLI Issues

### Authentication Problems

**Symptoms:**
- "Not logged in"
- "Permission denied"
- Can't access org repos

**Solutions:**

1. **Check auth status:**
   ```bash
   gh auth status
   ```

2. **Re-authenticate with correct scopes:**
   ```bash
   gh auth login --scopes "repo,read:org"
   ```

3. **Use SSH instead of HTTPS:**
   ```bash
   gh config set git_protocol ssh
   ```

---

### Can't Access Organization Repos

**Symptoms:**
- "Resource not accessible"
- Org repos not listed
- Clone fails

**Solutions:**

1. **Verify org membership:**
   ```bash
   gh api user/memberships/orgs
   ```

2. **Request access:**
   - Contact org admin
   - Enable SSO if required
   - Accept org invitation

3. **Authorize OAuth app:**
   - GitHub Settings → Applications
   - Authorize GitHub CLI for your org

---

## CI/CD Issues

### Pipeline Fails

**Symptoms:**
- All tests pass locally but fail in CI
- Permission denied errors
- Missing environment variables

**Solutions:**

1. **Check environment:**
   ```yaml
   - name: Debug
     run: |
       node --version
       npm --version
       echo $NODE_ENV
   ```

2. **Set environment variables:**
   ```yaml
   env:
     DATABASE_URL: ${{ secrets.DATABASE_URL }}
     NODE_ENV: test
   ```

3. **Install dependencies completely:**
   ```yaml
   - run: npm ci  # Not npm install
   ```

---

### Coverage Gate Fails

**Symptoms:**
- "Coverage below threshold"
- Pipeline blocked

**Solutions:**

1. **Check actual coverage:**
   ```bash
   npm test -- --coverage
   ```

2. **Add missing tests:**
   ```
   Coverage shows these uncovered lines:
   - src/service.js: 45-50, 72-75

   Generate tests to cover these code paths.
   ```

3. **Temporarily lower threshold (not recommended for long-term):**
   ```yaml
   if [ $COVERAGE -lt 70 ]; then  # Was 80
   ```

---

### Slow Pipelines

**Symptoms:**
- Pipeline takes too long
- Timeout errors
- High costs

**Solutions:**

1. **Add caching:**
   ```yaml
   - uses: actions/cache@v3
     with:
       path: ~/.npm
       key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
   ```

2. **Run tests in parallel:**
   ```yaml
   jobs:
     test-1:
       runs-on: ubuntu-latest
       # ...
     test-2:
       runs-on: ubuntu-latest
       # ...
   ```

3. **Skip unchanged:**
   ```yaml
   - uses: dorny/paths-filter@v2
     id: changes
     with:
       filters: |
         src:
           - 'src/**'
   - if: steps.changes.outputs.src == 'true'
     run: npm test
   ```

---

## Getting Help

### Still Stuck?

1. **Check documentation:**
   - [Jest Docs](https://jestjs.io/docs)
   - [Playwright Docs](https://playwright.dev/docs)
   - [GitHub CLI Docs](https://cli.github.com/manual)

2. **Search issues:**
   - GitHub Issues for the tool
   - Stack Overflow

3. **Ask AI for help:**
   ```
   I'm getting this error when running tests:
   [paste error]

   Here's my test code:
   [paste code]

   What's wrong and how do I fix it?
   ```

4. **Course forum:**
   - Post question with error details
   - Include what you've tried

---

## Quick Reference

| Issue | First Thing to Try |
|-------|-------------------|
| AI won't start | `claude --version` |
| Bad AI output | Add more context to prompt |
| Tests won't run | `npm install` |
| Tests fail randomly | Check test isolation |
| Low coverage | Run `--coverage` to see gaps |
| CI fails | Check environment variables |
| GitHub auth | `gh auth status` |
| Slow pipeline | Add caching |

---

*When in doubt, check the error message carefully and search for it.*
