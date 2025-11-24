/**
 * Mock factories for creating test data
 */

import { jest } from '@jest/globals';

export const mockBrowser = () => ({
  newContext: jest.fn().mockResolvedValue(mockContext()),
  close: jest.fn().mockResolvedValue(undefined),
  contexts: jest.fn().mockReturnValue([]),
  isConnected: jest.fn().mockReturnValue(true)
});

export const mockContext = () => ({
  newPage: jest.fn().mockResolvedValue(mockPage()),
  close: jest.fn().mockResolvedValue(undefined),
  storageState: jest.fn().mockResolvedValue({}),
  pages: jest.fn().mockReturnValue([])
});

export const mockPage = () => ({
  goto: jest.fn().mockResolvedValue(undefined),
  url: jest.fn().mockReturnValue('https://gamma.app'),
  title: jest.fn().mockResolvedValue('Gamma'),
  screenshot: jest.fn().mockResolvedValue(Buffer.from('screenshot')),
  close: jest.fn().mockResolvedValue(undefined),
  waitForSelector: jest.fn().mockResolvedValue(mockLocator()),
  waitForLoadState: jest.fn().mockResolvedValue(undefined),
  locator: jest.fn().mockReturnValue(mockLocator()),
  click: jest.fn().mockResolvedValue(undefined),
  fill: jest.fn().mockResolvedValue(undefined),
  type: jest.fn().mockResolvedValue(undefined),
  selectOption: jest.fn().mockResolvedValue(undefined),
  evaluate: jest.fn().mockResolvedValue(undefined),
  goBack: jest.fn().mockResolvedValue(undefined),
  reload: jest.fn().mockResolvedValue(undefined)
});

export const mockLocator = () => ({
  click: jest.fn().mockResolvedValue(undefined),
  fill: jest.fn().mockResolvedValue(undefined),
  type: jest.fn().mockResolvedValue(undefined),
  textContent: jest.fn().mockResolvedValue('text'),
  isVisible: jest.fn().mockResolvedValue(true),
  isEnabled: jest.fn().mockResolvedValue(true),
  first: jest.fn().mockReturnThis(),
  last: jest.fn().mockReturnThis(),
  nth: jest.fn().mockReturnThis(),
  count: jest.fn().mockResolvedValue(1),
  waitFor: jest.fn().mockResolvedValue(undefined)
});

export const mockPlaywright = () => ({
  chromium: {
    launch: jest.fn().mockResolvedValue(mockBrowser())
  },
  firefox: {
    launch: jest.fn().mockResolvedValue(mockBrowser())
  },
  webkit: {
    launch: jest.fn().mockResolvedValue(mockBrowser())
  }
});

export const mockLogger = () => ({
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  child: jest.fn().mockReturnThis()
});

export const mockConfig = () => ({
  get: jest.fn((key) => {
    const config = {
      'gamma.baseUrl': 'https://gamma.app',
      'gamma.timeout': 30000,
      'browser.headless': true,
      'browser.viewport.width': 1920,
      'browser.viewport.height': 1080,
      'automation.retryAttempts': 3,
      'automation.retryDelay': 2000,
      'automation.screenshotOnError': true,
      'logging.level': 'info',
      'automation.screenshotPath': 'screenshots/test'
    };
    return config[key];
  }),
  set: jest.fn(),
  merge: jest.fn()
});

export const mockCourseOutline = () => ({
  title: 'Introduction to Python Programming',
  description: 'A beginner course for learning Python',
  level: 'beginner',
  duration: '8 weeks',
  modules: [
    {
      title: 'Getting Started with Python',
      description: 'Introduction to Python basics',
      topics: ['Variables', 'Data Types', 'Operators'],
      learningObjectives: [
        'Understand Python syntax',
        'Use basic data types',
        'Perform basic operations'
      ]
    },
    {
      title: 'Control Flow',
      description: 'Conditional statements and loops',
      topics: ['If statements', 'For loops', 'While loops'],
      learningObjectives: [
        'Write conditional logic',
        'Use loops effectively',
        'Handle iteration'
      ]
    }
  ]
});

export const mockLectureData = () => ({
  title: 'Variables and Data Types',
  context: {
    course: 'Introduction to Python',
    module: 1,
    duration: '60 minutes'
  },
  learningObjectives: [
    'Understand variables',
    'Use different data types',
    'Perform type conversion'
  ]
});

export const mockSlides = () => ([
  {
    id: 'slide-1',
    type: 'title',
    title: 'Introduction to Python',
    subtitle: 'Getting Started',
    layout: 'center'
  },
  {
    id: 'slide-2',
    type: 'content',
    title: 'Variables',
    content: 'Variables are containers for storing data',
    layout: 'standard'
  },
  {
    id: 'slide-3',
    type: 'code',
    title: 'Code Example',
    content: {
      language: 'python',
      code: 'x = 5\nprint(x)'
    },
    layout: 'full'
  }
]);

export const mockPresentation = () => ({
  title: 'Introduction to Python',
  metadata: {
    description: 'A beginner Python course',
    level: 'beginner',
    duration: '8 weeks'
  },
  settings: {
    theme: 'educational',
    aspectRatio: '16:9',
    fontSize: 'medium'
  },
  slides: mockSlides()
});

export const mockAssessments = () => ([
  {
    type: 'multiple-choice',
    question: 'What is a variable?',
    options: ['A container', 'A function', 'A loop', 'A class'],
    correct: 0,
    explanation: 'A variable is a container for storing data'
  },
  {
    type: 'short-answer',
    question: 'Write a Python variable declaration',
    answer: 'x = 5',
    explanation: 'Variables are declared using assignment'
  }
]);

export const mockActivities = () => ([
  {
    type: 'coding-exercise',
    title: 'Variable Practice',
    description: 'Create variables for different data types',
    difficulty: 'easy'
  },
  {
    type: 'group-discussion',
    title: 'Data Types Discussion',
    description: 'Discuss use cases for different data types',
    duration: '15 minutes'
  }
]);

export const mockSessionData = () => ({
  cookies: [
    {
      name: 'session',
      value: 'abc123',
      domain: '.gamma.app',
      path: '/'
    }
  ],
  origins: [
    {
      origin: 'https://gamma.app',
      localStorage: [
        { name: 'token', value: 'xyz789' }
      ]
    }
  ]
});

export const mockErrorHandler = () => ({
  withRetry: jest.fn(async (fn) => await fn()),
  captureError: jest.fn().mockResolvedValue(undefined),
  sleep: jest.fn().mockResolvedValue(undefined)
});

export const mockRateLimiter = () => ({
  acquire: jest.fn().mockResolvedValue(undefined),
  release: jest.fn(),
  getStatus: jest.fn().mockReturnValue({
    requestsInCurrentMinute: 5,
    activeRequests: 1,
    queueLength: 0
  })
});
