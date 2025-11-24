import dotenv from 'dotenv';

dotenv.config();

export default {
  gamma: {
    baseUrl: process.env.GAMMA_BASE_URL || 'https://gamma.app',
    timeout: parseInt(process.env.GAMMA_TIMEOUT) || 30000,
    maxRetries: parseInt(process.env.RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(process.env.RETRY_DELAY) || 2000
  },

  browser: {
    headless: process.env.HEADLESS === 'true' || process.env.NODE_ENV === 'production',
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH) || 1920,
      height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    slowMo: process.env.NODE_ENV === 'development' ? 50 : 0,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  },

  automation: {
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(process.env.RETRY_DELAY) || 2000,
    screenshotOnError: process.env.SCREENSHOT_ON_ERROR === 'true' || true,
    screenshotPath: 'screenshots',
    maxConcurrentSessions: parseInt(process.env.MAX_CONCURRENT_SESSIONS) || 3,
    navigationTimeout: 30000,
    actionTimeout: 10000
  },

  session: {
    sessionPath: 'sessions',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    validateOnLoad: true
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/gamma-automation.log',
    console: true,
    maxFiles: 5,
    maxSize: '10m'
  },

  rateLimiting: {
    maxRequestsPerMinute: 30,
    maxConcurrentRequests: 5,
    requestDelay: 1000
  },

  content: {
    defaultTheme: 'educational',
    defaultAspectRatio: '16:9',
    defaultFontSize: 'medium',
    maxSlidesPerPresentation: 100,
    autoSaveInterval: 60000 // 1 minute
  },

  ai: {
    // Placeholder for AI configuration
    // Can be extended with OpenAI, Anthropic, or other AI service configs
    provider: process.env.AI_PROVIDER || 'mock',
    temperature: 0.7,
    maxTokens: 2000
  }
};
