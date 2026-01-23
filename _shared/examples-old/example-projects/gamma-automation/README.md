# Gamma Course Automation System

A comprehensive browser automation system for generating educational course resources and presentations on Gamma.app using Playwright.

## Features

- **Intelligent Course Creation**: AI-powered content brainstorming and generation
- **Multiple Content Types**: Lectures, workshops, assessments, handouts, and more
- **Template System**: Pre-built educational templates for various subjects
- **Batch Processing**: Create entire course curricula automatically
- **Smart Error Recovery**: Automatic retry mechanisms with screenshot capture
- **Session Management**: Persistent authentication to avoid repeated logins
- **Educational Quality**: Learning objectives aligned with Bloom's taxonomy

## Installation

```bash
# Clone the repository
cd gamma-automation

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your credentials in .env
```

## Quick Start

```javascript
import GammaCourseCreator from './src/index.js';

const creator = new GammaCourseCreator({
  credentials: {
    email: process.env.GAMMA_EMAIL,
    password: process.env.GAMMA_PASSWORD
  }
});

// Create a complete course from a topic
const course = await creator.createCourse({
  topic: "Introduction to Python Programming",
  level: "beginner",
  duration: "8 weeks",
  audience: "high school students"
});
```

## Project Structure

```
gamma-automation/
├── src/
│   ├── core/              # Browser and session management
│   ├── brainstorming/     # AI-powered content generation
│   ├── content/           # Content parsing and templates
│   ├── automation/        # Gamma automation logic
│   ├── selectors/         # UI selector management
│   └── utils/             # Utilities and helpers
├── examples/              # Usage examples
├── tests/                 # Test suites
├── config/                # Configuration files
└── docs/                  # Documentation
```

## Documentation

See the [docs](./docs) directory for comprehensive documentation including:
- API Reference
- Setup Guide
- Template Creation Guide
- Troubleshooting
- Best Practices

## License

MIT
