# Quick Start Guide

Get up and running with Gamma automation in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Gamma.app account
- Basic command line knowledge

## Installation

```bash
# Navigate to project directory
cd gamma-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Set up environment variables
cp .env.example .env
```

## Configuration

Edit `.env` file:

```env
GAMMA_EMAIL=your-email@example.com
GAMMA_PASSWORD=your-password
HEADLESS=false
LOG_LEVEL=info
```

## Test Without Login

Try brainstorming without Gamma credentials:

```bash
node examples/brainstorming-only.js
```

You should see:
```
=== Course Brainstorming Demo ===

1. Generating course outline...

Course: Web Development with React
Level: intermediate
Duration: 12 weeks

Modules: 12

2. Generating learning objectives...

Learning Objectives:
  1. Understand the fundamental concepts of React Components
  2. Apply React Components principles to real-world scenarios
  ...
```

## Full Automation Test

Once you've added credentials to `.env`:

```bash
node examples/full-automation.js
```

This will:
1. Launch browser
2. Login to Gamma
3. Create a course presentation
4. Create a lecture presentation
5. Generate assessment materials
6. Show system health status

## Basic Usage

### Create a Course

```javascript
import GammaCourseCreator from './src/index.js';

const creator = new GammaCourseCreator({
  credentials: {
    email: 'your-email@example.com',
    password: 'your-password'
  }
});

const course = await creator.createCourse({
  topic: 'Introduction to Python',
  level: 'beginner',
  duration: '8 weeks'
});

console.log(`Created: ${course.presentation.url}`);

await creator.cleanup();
```

### Create a Lecture

```javascript
const lecture = await creator.createLecture({
  title: 'Variables and Data Types',
  context: {
    course: 'Python Programming',
    module: 1
  },
  depth: 'detailed'
});
```

### Brainstorm Only (No Browser)

```javascript
const outline = await creator.brainstormCourse({
  topic: 'Machine Learning',
  level: 'intermediate',
  duration: '12 weeks',
  expandContent: true
});

console.log(JSON.stringify(outline, null, 2));
```

## Watch It Work

Set `HEADLESS=false` in `.env` to see the browser in action!

```env
HEADLESS=false
```

## Troubleshooting

### "Browser launch failed"
```bash
npx playwright install chromium
```

### "Login failed"
1. Check credentials in `.env`
2. Try logging in manually to verify account
3. Check for 2FA requirements
4. Run in non-headless mode to see what's happening

### "Element not found"
The selectors might need updating for current Gamma UI:
1. Open `src/selectors/ElementSelectors.js`
2. Run in non-headless mode
3. Use browser dev tools to find actual selectors
4. Update primary and fallback selectors

### "Session expired"
```bash
rm sessions/default.json
```
Session will be recreated on next run.

## Common Patterns

### With Export

```javascript
const course = await creator.createCourse({
  topic: 'Data Science',
  level: 'intermediate',
  duration: '10 weeks',
  export: true,  // Enable export
  exportFormat: 'pdf'  // or 'pptx'
});

console.log(`Exported to: ${course.presentation.exportPath}`);
```

### Custom Theme

```javascript
const lecture = await creator.createLecture({
  title: 'Advanced Topics',
  theme: 'modern'  // or 'educational', 'minimal'
});
```

### Multiple Operations

```javascript
// Create multiple resources
const course = await creator.createCourse({...});
await sleep(2000);

const lecture1 = await creator.createLecture({...});
await sleep(2000);

const lecture2 = await creator.createLecture({...});
await sleep(2000);

const assessment = await creator.createAssessment({...});

await creator.cleanup();
```

## Project Structure

```
gamma-automation/
├── src/
│   ├── core/           # Browser, session, navigation
│   ├── automation/     # Slide creation, themes, export
│   ├── content/        # Parsing, building
│   ├── brainstorming/  # AI content generation
│   └── utils/          # Config, logging, errors
├── examples/           # Usage examples
├── docs/               # Documentation
└── .env               # Your configuration
```

## Next Steps

1. ✅ **Test brainstorming**: `node examples/brainstorming-only.js`
2. ✅ **Add credentials**: Edit `.env` file
3. ✅ **Run automation**: `node examples/full-automation.js`
4. ✅ **Verify selectors**: Check if they match Gamma's UI
5. ✅ **Create content**: Start building your courses!

## Documentation

- **SETUP.md**: Detailed installation guide
- **API.md**: Complete API reference
- **ARCHITECTURE.md**: System design
- **IMPLEMENTATION_COMPLETE.md**: Feature list

## Support

Check the logs:
```bash
tail -f logs/gamma-automation.log
```

Enable debug logging in `.env`:
```env
LOG_LEVEL=debug
```

## Example Output

```
=== Full Gamma Automation Demo ===

1. Creating complete course presentation...

Course created successfully!
Title: Introduction to Web Development
Slides: 14
URL: https://gamma.app/edit/abc123

2. Creating single lecture presentation...

Lecture created successfully!
Slides: 8
URL: https://gamma.app/edit/def456

3. Creating assessment presentation...

Assessment created successfully!
Questions: 10

4. Checking system health...

System Health:
  Browser: ✓
  Rate Limit: 3/30 requests/min
  Active Requests: 0/5

=== All Operations Completed Successfully! ===

Cleaning up...
Done!
```

## Tips

- Start with `HEADLESS=false` to watch automation
- Use `brainstorming-only.js` to test without login
- Sessions are saved to avoid repeated logins
- Rate limiting is automatic
- Errors capture screenshots for debugging
- Logs are in `logs/gamma-automation.log`

## Ready to Go!

You're all set! Start creating educational content with:

```bash
node examples/basic-course-creation.js
```

Happy automating! 🚀
