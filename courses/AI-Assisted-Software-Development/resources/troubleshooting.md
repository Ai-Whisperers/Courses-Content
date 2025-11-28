# Troubleshooting Guide

## AI-Assisted Software Development Course

Solutions to common issues with AI development tools.

---

## GitHub Copilot Issues

### No Suggestions Appearing

**Symptoms:** Copilot icon shows but no suggestions appear.

**Solutions:**

1. **Check Authentication**
   - Click Copilot icon in status bar
   - Verify signed in to GitHub
   - Re-authenticate if needed

2. **Check Subscription**
   ```
   Visit: github.com/settings/copilot
   Verify subscription is active
   ```

3. **Check File Type**
   - Ensure file has correct extension
   - Copilot may be disabled for certain file types
   - Check settings:
   ```json
   "github.copilot.enable": {
       "*": true,
       "plaintext": false
   }
   ```

4. **Restart VS Code**
   - Close all VS Code windows
   - Reopen project

5. **Check Network**
   - Copilot requires internet connection
   - Check firewall/proxy settings
   - Try: `curl https://copilot-proxy.githubusercontent.com`

### Poor Quality Suggestions

**Symptoms:** Suggestions are irrelevant or incorrect.

**Solutions:**

1. **Add More Context**
   ```javascript
   // Add comments describing what you need
   // Include function signature and types
   // Provide example input/output
   ```

2. **Use Descriptive Names**
   ```javascript
   // Instead of: function process(d)
   // Use: function processUserPayment(paymentData)
   ```

3. **Include Type Information**
   ```typescript
   // TypeScript types help Copilot understand
   interface User {
       id: string;
       name: string;
       email: string;
   }
   ```

4. **Open Related Files**
   - Copilot uses open tabs for context
   - Open files with similar patterns

### Copilot Chat Not Working

**Solutions:**

1. **Check Extension**
   - Ensure "GitHub Copilot Chat" extension installed
   - Update to latest version

2. **Verify Access**
   - Copilot Chat requires separate enablement
   - Check organization settings if applicable

3. **Clear Chat**
   - Use `/clear` command
   - Start fresh conversation

---

## VS Code Issues

### Extension Conflicts

**Symptoms:** Multiple extensions providing completions.

**Solutions:**

1. **Disable Conflicting Extensions**
   - Other completion extensions (Tabnine, Kite)
   - Temporarily disable, test Copilot

2. **Configure Priority**
   ```json
   "editor.suggest.localityBonus": true,
   "editor.inlineSuggest.enabled": true
   ```

### Performance Issues

**Symptoms:** VS Code slow when using AI tools.

**Solutions:**

1. **Limit Open Files**
   - Close unnecessary tabs
   - Large context = slower suggestions

2. **Disable Unused Features**
   ```json
   "github.copilot.enable": {
       "markdown": false,
       "plaintext": false
   }
   ```

3. **Increase Memory**
   ```json
   // In argv.json
   "disable-hardware-acceleration": true,
   "max-memory": 8192
   ```

---

## API Issues

### Rate Limiting

**Symptoms:** "Rate limit exceeded" errors.

**Solutions:**

1. **OpenAI**
   ```
   Error: Rate limit reached
   Solution: Wait 60 seconds, implement exponential backoff
   ```

2. **Anthropic (Claude)**
   ```
   Error: 429 Too Many Requests
   Solution: Reduce request frequency, check usage limits
   ```

3. **Implement Backoff**
   ```javascript
   async function withRetry(fn, maxRetries = 3) {
       for (let i = 0; i < maxRetries; i++) {
           try {
               return await fn();
           } catch (error) {
               if (error.status === 429 && i < maxRetries - 1) {
                   await sleep(Math.pow(2, i) * 1000);
                   continue;
               }
               throw error;
           }
       }
   }
   ```

### Authentication Errors

**Symptoms:** 401 or 403 errors.

**Solutions:**

1. **Verify API Key**
   - Check key is valid and not expired
   - Ensure correct environment variable name

2. **Check Permissions**
   - API key may lack required scopes
   - Generate new key with correct permissions

3. **Environment Variables**
   ```bash
   # Check if set correctly
   echo $OPENAI_API_KEY
   echo $ANTHROPIC_API_KEY

   # Ensure .env file loaded
   source .env
   ```

### Connection Errors

**Symptoms:** Network or timeout errors.

**Solutions:**

1. **Check Network**
   ```bash
   curl https://api.openai.com/v1/models
   curl https://api.anthropic.com/v1/messages
   ```

2. **Proxy Configuration**
   ```bash
   export HTTP_PROXY=http://proxy:port
   export HTTPS_PROXY=http://proxy:port
   ```

3. **Increase Timeout**
   ```javascript
   const client = new OpenAI({
       timeout: 60000, // 60 seconds
   });
   ```

---

## Code Generation Issues

### Incorrect Code Generated

**Symptoms:** AI generates code that doesn't work.

**Solutions:**

1. **Provide More Context**
   - Include imports/dependencies
   - Show related code
   - Specify framework/library versions

2. **Be More Specific**
   ```
   // Instead of: "add validation"
   // Use: "add email validation using regex, return boolean"
   ```

3. **Verify and Test**
   - Always review generated code
   - Write tests for AI-generated functions
   - Check edge cases

### Security Vulnerabilities in Generated Code

**Symptoms:** AI generates insecure code.

**Solutions:**

1. **Request Secure Implementation**
   ```
   "Generate a SECURE function that...
   Include input validation and sanitization"
   ```

2. **Security Review Checklist**
   - [ ] Input validation present
   - [ ] SQL parameterized queries
   - [ ] XSS prevention
   - [ ] Authentication checks
   - [ ] Error handling (no info leakage)

3. **Use Security Scanners**
   ```bash
   # Run security linter
   npm audit
   bandit -r ./src  # Python
   semgrep --config=auto
   ```

---

## Course Lab Issues

### Lab Setup Failures

**Solutions:**

1. **Node.js Version**
   ```bash
   # Check version
   node --version  # Should be 18+

   # Install correct version
   nvm install 18
   nvm use 18
   ```

2. **Dependencies**
   ```bash
   # Clear and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Git Configuration**
   ```bash
   git config --global user.email "you@example.com"
   git config --global user.name "Your Name"
   ```

### Test Failures

**Solutions:**

1. **Check Test Environment**
   ```bash
   # Run single test
   npm test -- --testNamePattern="specific test"

   # Debug mode
   npm test -- --verbose
   ```

2. **Clear Cache**
   ```bash
   jest --clearCache
   npm test
   ```

---

## Emergency Contacts

### During Course

- Instructor assistance
- TA support
- Peer help

### Technical Support

- GitHub Copilot: github.com/community
- VS Code: github.com/microsoft/vscode
- OpenAI: help.openai.com
- Anthropic: support.anthropic.com

### Course Support

- Email: support@ai-whisperers.com
- Response time: 24 hours

---

## Quick Fixes Checklist

- [ ] Restart VS Code
- [ ] Re-authenticate to GitHub
- [ ] Check internet connection
- [ ] Update extensions
- [ ] Clear caches
- [ ] Check API key validity
- [ ] Review error messages
- [ ] Search documentation
- [ ] Ask for help

---

*Troubleshooting Guide - AI-Assisted Software Development Course*
