# Architecture Overview

## System Design

The Gamma Course Automation System follows a modular, layered architecture designed for maintainability, extensibility, and reliability.

## Architecture Layers

```
┌─────────────────────────────────────────────────────┐
│           Public API Layer (index.js)                │
│  GammaCourseCreator - Main orchestrator              │
└─────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Core Layer   │  │ Content Layer│  │ Automation   │
│              │  │              │  │ Layer        │
│ - Browser    │  │ - Brainstorm │  │ - Navigator  │
│ - Session    │  │ - Parser     │  │ - Creator    │
│ - Waiter     │  │ - Builder    │  │ - Automator  │
└──────────────┘  └──────────────┘  └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │     Utilities & Infrastructure  │
        │                                 │
        │ - Config    - Error Handler     │
        │ - Logger    - Rate Limiter      │
        │ - Selectors - Helpers           │
        └────────────────────────────────┘
```

## Core Components

### 1. Core Layer (`src/core/`)

**Purpose**: Browser and session management

**Components:**

- **BrowserManager**:
  - Manages Playwright browser lifecycle
  - Handles context creation with session data
  - Provides health monitoring
  - Captures error screenshots

- **SessionManager**:
  - Handles multiple authentication methods (email, OAuth)
  - Persists sessions to avoid repeated logins
  - Validates session state
  - Auto-refreshes expired sessions

- **ElementWaiter** (to be implemented):
  - Smart waiting strategies for UI elements
  - Handles dynamic content loading
  - Timeout management

- **GammaNavigator** (to be implemented):
  - Gamma-specific navigation logic
  - URL management
  - Page state verification

### 2. Brainstorming Layer (`src/brainstorming/`)

**Purpose**: AI-powered content generation

**Components:**

- **ContentBrainstormer**:
  - Generates course outlines from topics
  - Creates learning objectives (Bloom's taxonomy)
  - Expands topics into detailed content
  - Generates assessments and activities

- **CurriculumPlanner** (to be implemented):
  - Plans complete course structures
  - Sequences learning progression
  - Creates assessment timelines

- **LearningObjectives** (to be implemented):
  - SMART objective generation
  - Alignment with standards

- **TopicExpander** (to be implemented):
  - Deep content expansion
  - Context-aware generation

### 3. Content Layer (`src/content/`)

**Purpose**: Content processing and template management

**Components:**

- **ContentParser** (to be implemented):
  - Parses various input formats (JSON, Markdown, YAML)
  - Validates content structure
  - Normalizes data

- **SlideBuilder** (to be implemented):
  - Builds slide content structures
  - Manages slide layouts
  - Handles media integration

- **TemplateEngine** (to be implemented):
  - Processes educational templates
  - Variable substitution
  - Template validation

- **EducationalContent** (to be implemented):
  - Educational content utilities
  - Quality validation
  - Accessibility checks

### 4. Automation Layer (`src/automation/`)

**Purpose**: Gamma-specific automation

**Components:**

- **PresentationCreator** (to be implemented):
  - Main automation orchestrator
  - Coordinates all automation steps
  - Manages presentation lifecycle

- **SlideAutomator** (to be implemented):
  - Individual slide automation
  - Content insertion
  - Element interaction

- **ThemeManager** (to be implemented):
  - Theme selection and application
  - Style management
  - Brand consistency

- **ExportManager** (to be implemented):
  - Export presentations
  - Share management
  - Format conversion

### 5. Selectors Layer (`src/selectors/`)

**Purpose**: UI selector management

**Components:**

- **ElementSelectors**:
  - Centralized selector definitions
  - Primary + fallback strategies
  - Categorized by page/function

- **SelectorValidator** (to be implemented):
  - Validates selectors still work
  - Reports broken selectors
  - Suggests alternatives

- **SelectorUpdater** (to be implemented):
  - Auto-updates broken selectors
  - Learning from failures
  - Selector health monitoring

### 6. Utilities Layer (`src/utils/`)

**Purpose**: Cross-cutting concerns

**Components:**

- **Config**: Configuration management with dot-notation access
- **Logger**: Winston-based logging with categories
- **ErrorHandler**: Retry logic and error recovery
- **RateLimiter**: Request throttling and concurrency control
- **Helpers** (to be implemented): Common utility functions

## Data Flow

### Course Creation Flow

```
User Request
    │
    ▼
GammaCourseCreator.createCourse()
    │
    ├─► ContentBrainstormer.generateCourseOutline()
    │       └─► Returns course structure
    │
    ├─► For each module:
    │   │
    │   ├─► ContentBrainstormer.expandTopicContent()
    │   │       └─► Returns detailed content
    │   │
    │   ├─► ContentParser.parse()
    │   │       └─► Normalizes content
    │   │
    │   ├─► SlideBuilder.build()
    │   │       └─► Creates slide structures
    │   │
    │   └─► PresentationCreator.create()
    │           │
    │           ├─► GammaNavigator.goToCreate()
    │           ├─► SlideAutomator.addSlides()
    │           ├─► ThemeManager.applyTheme()
    │           └─► ExportManager.export()
    │
    └─► Returns complete course
```

## Design Patterns

### 1. Singleton Pattern
Used for utilities that should have one instance:
- Config
- Logger
- ErrorHandler
- RateLimiter

### 2. Factory Pattern
Used for creating configured instances:
- BrowserManager creates contexts and pages
- ContentBrainstormer creates different content types

### 3. Strategy Pattern
Used for selector fallback strategies:
- Primary selector → Fallback selectors
- Multiple authentication methods

### 4. Observer Pattern (Future)
For event-driven architecture:
- Progress notifications
- Error events
- Completion callbacks

## Error Handling Strategy

```
Try Operation
    │
    ├─ Success ──► Return Result
    │
    └─ Error
        │
        ├─ Is Retryable? ──Yes──► Retry with Backoff
        │                           │
        │                           └─ Max Attempts? ──No──► Loop
        │                                               │
        │                                              Yes
        │                                               │
        └─ Not Retryable                               │
            │                                           │
            └─────────────────────────────────────────┘
                            │
                            ▼
                    Capture Screenshot
                            │
                            ▼
                       Log Error
                            │
                            ▼
                     Throw to Caller
```

## Rate Limiting Strategy

- **Per-Minute Limit**: Prevents too many requests in short time
- **Concurrent Limit**: Prevents overwhelming the system
- **Request Delay**: Adds natural spacing between operations
- **Queue System**: Handles overflow gracefully

## Session Management

```
Initialize
    │
    ├─ Check for Saved Session
    │   │
    │   ├─ Found ──► Load Session
    │   │              │
    │   │              ├─ Valid? ──► Use Session
    │   │              │
    │   │              └─ Invalid ──► Login
    │   │
    │   └─ Not Found ──► Login
    │
    └─ After Login ──► Save Session
```

## Configuration Hierarchy

```
1. Default Config (config/default.js)
2. Environment Variables (.env)
3. Constructor Options
4. Runtime Updates (Config.set())
```

## Logging Levels

- **DEBUG**: Detailed diagnostic information
- **INFO**: General informational messages
- **WARN**: Warning messages for potentially harmful situations
- **ERROR**: Error events that might still allow continued execution

## Future Enhancements

### Phase 1 (Current - Foundation)
- ✅ Core infrastructure
- ✅ Basic brainstorming
- ✅ Configuration system
- ⏳ Basic Gamma navigation

### Phase 2 (Automation)
- ⏳ Full Gamma automation
- ⏳ Slide creation
- ⏳ Theme management
- ⏳ Export functionality

### Phase 3 (Intelligence)
- ⏳ AI integration (OpenAI/Anthropic)
- ⏳ Advanced content generation
- ⏳ Learning analytics
- ⏳ Quality assessment

### Phase 4 (Scale)
- ⏳ Batch processing
- ⏳ Parallel execution
- ⏳ Distributed architecture
- ⏳ API server mode

## Testing Strategy

```
Unit Tests
  └─ Individual class methods
  └─ Utility functions
  └─ Configuration logic

Integration Tests
  └─ Component interactions
  └─ Browser automation flows
  └─ Session management

End-to-End Tests
  └─ Complete workflows
  └─ Real Gamma interactions
  └─ Error scenarios

Visual Regression Tests
  └─ UI element detection
  └─ Screenshot comparison
  └─ Selector validation
```

## Security Considerations

1. **Credentials**: Stored in environment variables, never in code
2. **Sessions**: Encrypted storage, automatic expiration
3. **Rate Limiting**: Prevents abuse and detection
4. **Logging**: Sensitive data redaction
5. **User Agent**: Realistic browser fingerprinting

## Performance Optimization

1. **Session Reuse**: Avoid repeated authentication
2. **Concurrent Operations**: When safe, parallelize
3. **Caching**: Cache generated content
4. **Connection Pooling**: Reuse browser contexts
5. **Lazy Loading**: Load components on demand
