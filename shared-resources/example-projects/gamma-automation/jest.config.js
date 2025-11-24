export default {
  // Use Node's native ES modules
  testEnvironment: 'node',

  // Transform ES modules - empty for native support
  transform: {},

  // Module file extensions
  moduleFileExtensions: ['js', 'json'],

  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],

  // Coverage configuration
  collectCoverage: false, // Enable manually with --coverage flag
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/examples/',
    '/docs/'
  ],

  // Coverage thresholds (fixed typo: was coverageThresholds, should be coverageThreshold)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    },
    './src/core/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/utils/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    './src/automation/': {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    },
    './src/content/': {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Coverage reporters
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json'
  ],

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Test timeout
  testTimeout: 30000,

  // Verbose output
  verbose: true,

  // Detect open handles
  detectOpenHandles: true,

  // Force exit after tests
  forceExit: true,

  // Clear mocks between tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  // Module name mapper for absolute imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@automation/(.*)$': '<rootDir>/src/automation/$1',
    '^@content/(.*)$': '<rootDir>/src/content/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@brainstorming/(.*)$': '<rootDir>/src/brainstorming/$1',
    '^@selectors/(.*)$': '<rootDir>/src/selectors/$1'
  },

  // Global setup/teardown
  globalSetup: '<rootDir>/tests/globalSetup.js',
  globalTeardown: '<rootDir>/tests/globalTeardown.js'
};
