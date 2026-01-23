/**
 * Test fixtures
 * Reusable test data and configurations
 */

export const validCredentials = {
  email: 'test@example.com',
  password: 'testpassword123'
};

export const invalidCredentials = {
  email: 'invalid@example.com',
  password: 'wrongpassword'
};

export const courseSpecs = {
  beginner: {
    topic: 'Introduction to Python',
    level: 'beginner',
    duration: '8 weeks',
    audience: 'high school students'
  },
  intermediate: {
    topic: 'Data Structures and Algorithms',
    level: 'intermediate',
    duration: '12 weeks',
    audience: 'college students'
  },
  advanced: {
    topic: 'Machine Learning Fundamentals',
    level: 'advanced',
    duration: '16 weeks',
    audience: 'graduate students'
  }
};

export const lectureSpecs = {
  basic: {
    title: 'Variables and Data Types',
    context: {
      course: 'Python Basics',
      module: 1,
      duration: '60 minutes'
    },
    depth: 'standard',
    audience: 'beginners'
  },
  detailed: {
    title: 'Neural Networks Architecture',
    context: {
      course: 'Machine Learning',
      module: 5,
      duration: '90 minutes'
    },
    depth: 'detailed',
    audience: 'advanced students'
  }
};

export const assessmentSpecs = {
  quiz: {
    type: 'quiz',
    content: { topic: 'Python Basics' },
    questionTypes: ['multiple-choice'],
    count: 10
  },
  mixed: {
    type: 'mixed',
    content: { topic: 'Data Structures' },
    questionTypes: ['multiple-choice', 'short-answer', 'coding'],
    count: 15
  },
  coding: {
    type: 'coding-assessment',
    content: { topic: 'Algorithms' },
    questionTypes: ['coding'],
    count: 5
  }
};

export const workshopSpecs = {
  handson: {
    topic: 'Web Development with React',
    duration: '4 hours',
    activities: [
      { type: 'coding', description: 'Build a todo app' },
      { type: 'group-work', description: 'Design component architecture' }
    ]
  },
  theory: {
    topic: 'Software Design Patterns',
    duration: '3 hours',
    activities: [
      { type: 'presentation', description: 'Pattern overview' },
      { type: 'discussion', description: 'Use cases analysis' }
    ]
  }
};

export const themeOptions = [
  'educational',
  'modern',
  'minimal',
  'professional',
  'creative'
];

export const exportFormats = [
  'pdf',
  'pptx',
  'html'
];

export const slideTypes = [
  'title',
  'content',
  'learning-objectives',
  'concept-explanation',
  'interactive-example',
  'code',
  'assessment',
  'summary',
  'image',
  'video',
  'quote',
  'two-column'
];

export const browserOptions = {
  headless: true,
  viewport: {
    width: 1920,
    height: 1080
  },
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage'
  ]
};

export const automationOptions = {
  retryAttempts: 3,
  retryDelay: 1000,
  screenshotOnError: true,
  maxConcurrentSessions: 1,
  timeout: 10000
};

export const sampleMarkdown = `
# Presentation Title

## Slide 1: Introduction
- Point 1
- Point 2
- Point 3

## Slide 2: Main Content
This is the main content of slide 2.

### Subsection
More details here.

## Slide 3: Conclusion
Final thoughts and summary.
`;

export const sampleJSON = {
  title: 'Sample Presentation',
  slides: [
    {
      title: 'Introduction',
      content: 'Welcome to the presentation'
    },
    {
      title: 'Main Content',
      content: 'Key points here'
    },
    {
      title: 'Conclusion',
      content: 'Thank you'
    }
  ]
};

export const sampleYAML = `
title: Sample Presentation
slides:
  - title: Introduction
    content: Welcome
  - title: Content
    content: Main points
  - title: Conclusion
    content: Thank you
`;

export const bloomTaxonomyLevels = [
  'Remember',
  'Understand',
  'Apply',
  'Analyze',
  'Evaluate',
  'Create'
];

export const questionTypes = [
  'multiple-choice',
  'true-false',
  'short-answer',
  'essay',
  'coding',
  'matching',
  'fill-in-blank'
];

export const difficultyLevels = [
  'easy',
  'medium',
  'hard',
  'expert'
];

export const testTimeout = 30000;

export const mockSelectors = {
  auth: {
    emailInput: { primary: '[data-testid="email"]', fallback: ['input[type="email"]'] },
    passwordInput: { primary: '[data-testid="password"]', fallback: ['input[type="password"]'] },
    submitButton: { primary: '[data-testid="submit"]', fallback: ['button[type="submit"]'] }
  },
  dashboard: {
    createButton: { primary: '[data-testid="create"]', fallback: ['button:has-text("Create")'] }
  },
  editor: {
    slideContainer: { primary: '[data-testid="slide"]', fallback: ['.slide-container'] },
    titleInput: { primary: '[data-testid="title"]', fallback: ['input[placeholder*="title"]'] }
  }
};

export const errorMessages = {
  authentication: 'Authentication failed',
  timeout: 'Operation timed out',
  notFound: 'Element not found',
  networkError: 'Network error occurred',
  serverError: 'Server error',
  invalidInput: 'Invalid input provided'
};

export const successMessages = {
  courseCreated: 'Course created successfully',
  lectureCreated: 'Lecture created successfully',
  assessmentGenerated: 'Assessment generated successfully',
  workshopCreated: 'Workshop created successfully',
  presentationExported: 'Presentation exported successfully'
};
