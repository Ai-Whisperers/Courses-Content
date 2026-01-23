# API Documentation

## GammaCourseCreator

Main class for automating course creation on Gamma.app.

### Constructor

```javascript
import GammaCourseCreator from './src/index.js';

const creator = new GammaCourseCreator(options);
```

**Options:**
- `credentials` (Object): Login credentials
  - `email` (string): Gamma account email
  - `password` (string): Gamma account password
  - `method` (string): Authentication method ('email', 'google', 'github')
- `sessionName` (string): Name for session persistence (default: 'default')
- `config` (Object): Custom configuration overrides

**Example:**
```javascript
const creator = new GammaCourseCreator({
  credentials: {
    email: 'user@example.com',
    password: 'password123'
  },
  sessionName: 'my-session',
  config: {
    browser: { headless: false }
  }
});
```

### Methods

#### `initialize()`

Initialize browser and authenticate with Gamma.

**Returns:** `Promise<void>`

```javascript
await creator.initialize();
```

#### `createCourse(courseSpec)`

Create a complete course from specifications.

**Parameters:**
- `courseSpec` (Object):
  - `topic` (string): Course topic
  - `level` (string): 'beginner', 'intermediate', or 'advanced'
  - `duration` (string): Course duration (e.g., '8 weeks')
  - `audience` (string): Target audience

**Returns:** `Promise<Object>` - Course data with outline

**Example:**
```javascript
const course = await creator.createCourse({
  topic: 'Python Programming',
  level: 'beginner',
  duration: '8 weeks',
  audience: 'high school students'
});
```

#### `createLecture(lectureData)`

Create a single lecture presentation.

**Parameters:**
- `lectureData` (Object):
  - `title` (string): Lecture title
  - `context` (Object): Additional context (course, module, duration)
  - `depth` (string): 'brief', 'detailed', or 'comprehensive'
  - `audience` (string): Target audience

**Returns:** `Promise<Object>` - Lecture with objectives and content

**Example:**
```javascript
const lecture = await creator.createLecture({
  title: 'Introduction to Variables',
  context: {
    course: 'Python Programming',
    module: 1,
    duration: '60 minutes'
  },
  depth: 'detailed',
  audience: 'beginners'
});
```

#### `createAssessment(assessmentSpec)`

Create assessment materials.

**Parameters:**
- `assessmentSpec` (Object):
  - `type` (string): Assessment type
  - `content` (Object): Content to assess
  - `questionTypes` (string[]): Question types to generate

**Returns:** `Promise<Object>` - Generated assessments

**Example:**
```javascript
const assessment = await creator.createAssessment({
  type: 'quiz',
  content: { topic: 'Python Basics' },
  questionTypes: ['multiple-choice', 'short-answer']
});
```

#### `createWorkshop(workshopSpec)`

Create workshop materials.

**Parameters:**
- `workshopSpec` (Object):
  - `topic` (string): Workshop topic
  - `learningObjectives` (string[]): Learning objectives
  - `format` (string): Activity format

**Returns:** `Promise<Object>` - Workshop with activities

**Example:**
```javascript
const workshop = await creator.createWorkshop({
  topic: 'Web Development',
  learningObjectives: ['Build a webpage', 'Style with CSS'],
  format: 'hands-on'
});
```

#### `brainstormCourse(brainstormSpec)`

Generate course outline without browser automation.

**Parameters:**
- `brainstormSpec` (Object):
  - `topic` (string): Course topic
  - `level` (string): Difficulty level
  - `duration` (string): Course duration
  - `expandContent` (boolean): Whether to expand content details
  - `audience` (string): Target audience

**Returns:** `Promise<Object>` - Course outline

**Example:**
```javascript
const outline = await creator.brainstormCourse({
  topic: 'Machine Learning',
  level: 'intermediate',
  duration: '12 weeks',
  expandContent: true,
  audience: 'data scientists'
});
```

#### `getHealthStatus()`

Get system health status.

**Returns:** `Promise<Object>` - Health status

```javascript
const health = await creator.getHealthStatus();
console.log(health);
// {
//   browser: { healthy: true, browserConnected: true, ... },
//   rateLimit: { requestsInLastMinute: 5, ... },
//   initialized: true,
//   timestamp: '2024-01-15T10:30:00.000Z'
// }
```

#### `cleanup()`

Clean up browser resources.

**Returns:** `Promise<void>`

```javascript
await creator.cleanup();
```

## ContentBrainstormer

AI-powered content generation class.

### Methods

#### `generateCourseOutline(topic, level, duration)`

Generate course outline from topic.

**Parameters:**
- `topic` (string): Course topic
- `level` (string): Difficulty level
- `duration` (string): Course duration

**Returns:** `Promise<Object>` - Course outline

#### `generateLearningObjectives(moduleTitle, context)`

Create learning objectives for a module.

**Parameters:**
- `moduleTitle` (string): Module title
- `context` (Object): Additional context

**Returns:** `Promise<string[]>` - Learning objectives

#### `expandTopicContent(topic, depth, audience)`

Expand topic into detailed content.

**Parameters:**
- `topic` (string): Topic to expand
- `depth` (string): Detail level
- `audience` (string): Target audience

**Returns:** `Promise<Object>` - Expanded content

#### `generateAssessments(content, questionTypes)`

Generate assessment questions.

**Parameters:**
- `content` (Object): Content to assess
- `questionTypes` (string[]): Question types

**Returns:** `Promise<Object[]>` - Assessment questions

#### `generateActivities(learningObjectives, format)`

Create interactive activities.

**Parameters:**
- `learningObjectives` (string[]): Learning objectives
- `format` (string): Activity format

**Returns:** `Promise<Object[]>` - Interactive activities

## Utility Classes

### Config

Configuration management utility.

```javascript
import { Config } from './src/index.js';

const value = Config.get('gamma.baseUrl');
Config.set('gamma.timeout', 60000);
```

### Logger

Logging utility.

```javascript
import { Logger } from './src/index.js';

Logger.info('category', 'Message', { meta: 'data' });
Logger.error('category', 'Error message', error);
```

### ErrorHandler

Error handling with retry logic.

```javascript
import { ErrorHandler } from './src/index.js';

const result = await ErrorHandler.withRetry(async () => {
  // Operation that might fail
}, { retryAttempts: 3, context: 'operation-name' });
```

### RateLimiter

Rate limiting utility.

```javascript
import { RateLimiter } from './src/index.js';

await RateLimiter.execute(async () => {
  // Rate-limited operation
}, 'context');

const status = RateLimiter.getStatus();
```

## Events and Hooks

Currently, the system uses synchronous methods. Future versions may include event emitters for:
- Browser lifecycle events
- Content generation progress
- Error notifications
- Automation milestones

## Error Handling

All async methods can throw errors. Use try-catch blocks:

```javascript
try {
  await creator.createCourse(spec);
} catch (error) {
  console.error('Failed:', error.message);
  // Handle error
}
```

Common error types:
- `Browser launch failed` - Browser startup issues
- `Login failed` - Authentication problems
- `Timeout` - Operations taking too long
- `Selector not found` - UI changes on Gamma

## Best Practices

1. **Always cleanup**:
   ```javascript
   try {
     await creator.initialize();
     // ... operations
   } finally {
     await creator.cleanup();
   }
   ```

2. **Use session management**:
   ```javascript
   // Sessions are automatically saved and reused
   const creator = new GammaCourseCreator({
     sessionName: 'my-project'
   });
   ```

3. **Handle rate limits**:
   ```javascript
   // Operations are automatically rate-limited
   // Check status if needed
   const status = await creator.getHealthStatus();
   ```

4. **Enable logging for debugging**:
   ```env
   LOG_LEVEL=debug
   ```
