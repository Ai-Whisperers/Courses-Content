# Gamma Course Automation - Setup Guide

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Package manager (comes with Node.js)
- **Gamma Account**: Active account at gamma.app

## Installation

### 1. Clone or Download the Project

```bash
cd gamma-automation
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Playwright (browser automation)
- Winston (logging)
- dotenv (environment variables)
- And other utilities

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Gamma Credentials
GAMMA_EMAIL=your-email@example.com
GAMMA_PASSWORD=your-password

# Optional: Configure other settings
GAMMA_BASE_URL=https://gamma.app
HEADLESS=false
LOG_LEVEL=info
```

### 4. Install Playwright Browsers

Playwright requires browser binaries. Install them with:

```bash
npx playwright install chromium
```

## Directory Structure

```
gamma-automation/
├── src/
│   ├── core/              # Browser and session management
│   │   ├── BrowserManager.js
│   │   └── SessionManager.js
│   ├── brainstorming/     # AI content generation
│   │   └── ContentBrainstormer.js
│   ├── selectors/         # UI selectors with fallbacks
│   │   └── ElementSelectors.js
│   ├── utils/             # Utilities
│   │   ├── Config.js
│   │   ├── Logger.js
│   │   ├── ErrorHandler.js
│   │   └── RateLimiter.js
│   └── index.js           # Main entry point
├── examples/              # Usage examples
├── config/                # Configuration files
├── logs/                  # Application logs
└── sessions/              # Saved browser sessions
```

## Configuration Options

### Browser Settings

```env
HEADLESS=false              # Set to true for headless mode
VIEWPORT_WIDTH=1920         # Browser viewport width
VIEWPORT_HEIGHT=1080        # Browser viewport height
```

### Automation Settings

```env
RETRY_ATTEMPTS=3            # Number of retry attempts on failure
RETRY_DELAY=2000            # Delay between retries (ms)
SCREENSHOT_ON_ERROR=true    # Capture screenshots on errors
MAX_CONCURRENT_SESSIONS=3   # Max parallel browser sessions
```

### Logging

```env
LOG_LEVEL=info              # Log level: debug, info, warn, error
LOG_FILE=logs/gamma-automation.log
```

## Verifying Installation

Run the brainstorming example (doesn't require Gamma login):

```bash
node examples/brainstorming-only.js
```

You should see output showing generated course content.

## Running Examples

### 1. Brainstorming Only (No Browser)

```bash
node examples/brainstorming-only.js
```

### 2. Create Single Lecture

```bash
node examples/single-lecture.js
```

### 3. Create Complete Course

```bash
node examples/basic-course-creation.js
```

## Troubleshooting

### Issue: "Browser launch failed"

**Solution**: Ensure Playwright browsers are installed:
```bash
npx playwright install chromium
```

### Issue: "Login failed"

**Solution**:
1. Verify credentials in `.env` file
2. Check if Gamma selectors have changed (see docs/SELECTORS.md)
3. Try running in non-headless mode to see what's happening

### Issue: "Session expired"

**Solution**: Delete the session file and re-authenticate:
```bash
rm sessions/default.json
```

### Issue: "Rate limit reached"

**Solution**: Adjust rate limiting in `.env`:
```env
MAX_REQUESTS_PER_MINUTE=20
REQUEST_DELAY=2000
```

## Development Mode

For development, you can:

1. **Run in visible browser mode**:
   ```env
   HEADLESS=false
   ```

2. **Enable debug logging**:
   ```env
   LOG_LEVEL=debug
   ```

3. **Slow down automation** (easier to watch):
   ```javascript
   const creator = new GammaCourseCreator({
     config: {
       browser: { slowMo: 100 }
     }
   });
   ```

## Next Steps

- Read the [API Documentation](./API.md)
- Check [Usage Examples](../examples/)
- Learn about [Template Creation](./TEMPLATES.md)
- See [Troubleshooting Guide](./TROUBLESHOOTING.md)

## Support

For issues and questions:
- Check the documentation in the `docs/` folder
- Review example scripts in `examples/`
- Check application logs in `logs/`

## Security Notes

- Never commit your `.env` file
- Store credentials securely
- Use session management to avoid repeated logins
- Be respectful of Gamma's rate limits
