/**
 * Gamma Course Automation System
 * Main entry point and public API
 */

import BrowserManager from './core/BrowserManager.js';
import SessionManager from './core/SessionManager.js';
import ContentBrainstormer from './brainstorming/ContentBrainstormer.js';
import PresentationCreator from './automation/PresentationCreator.js';
import Logger from './utils/Logger.js';
import Config from './utils/Config.js';
import ErrorHandler from './utils/ErrorHandler.js';
import RateLimiter from './utils/RateLimiter.js';

/**
 * Main Gamma Course Creator class
 * Orchestrates all components for automated course creation
 */
class GammaCourseCreator {
  constructor(options = {}) {
    this.logger = Logger.child('GammaCourseCreator');
    this.credentials = options.credentials || {};
    this.sessionName = options.sessionName || 'default';

    // Merge custom configuration
    if (options.config) {
      Config.merge(options.config);
    }

    // Initialize core components
    this.browserManager = new BrowserManager();
    this.sessionManager = new SessionManager();
    this.contentBrainstormer = new ContentBrainstormer();

    // State
    this.browser = null;
    this.context = null;
    this.page = null;
    this.presentationCreator = null;
    this.isInitialized = false;

    this.logger.info('GammaCourseCreator initialized');
  }

  /**
   * Initialize browser and session
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      this.logger.info('Initializing automation system');

      // Launch browser
      this.browser = await this.browserManager.launch();

      // Try to load existing session
      const sessionData = await this.sessionManager.loadSession(this.sessionName);

      // Create browser context
      const { context, contextId } = await this.browserManager.createContext(sessionData);
      this.context = context;
      this.contextId = contextId;

      // Create page
      this.page = await this.browserManager.createPage(this.context);

      // Validate or create session
      if (sessionData) {
        const isValid = await this.sessionManager.validateSession(this.page);
        if (!isValid) {
          await this._login();
        }
      } else {
        await this._login();
      }

      this.isInitialized = true;
      this.logger.info('Initialization complete');
    } catch (error) {
      this.logger.error('Initialization failed', error);
      await this.cleanup();
      throw error;
    }
  }

  /**
   * Login to Gamma
   * @private
   */
  async _login() {
    try {
      if (!this.credentials.email || !this.credentials.password) {
        throw new Error('Credentials required for login');
      }

      await this.sessionManager.login(
        this.page,
        this.credentials,
        this.credentials.method || 'email'
      );

      // Save session for future use
      await this.sessionManager.saveSession(this.context, this.sessionName);

      // Initialize presentation creator with the page
      this.presentationCreator = new PresentationCreator(this.page);
    } catch (error) {
      this.logger.error('Login failed', error);
      throw error;
    }
  }

  /**
   * Create a complete course from a topic
   * @param {Object} courseSpec - Course specifications
   * @returns {Promise<Object>} Created course data
   */
  async createCourse(courseSpec) {
    await this._ensureInitialized();

    try {
      this.logger.info('Creating course', { topic: courseSpec.topic });

      // Generate course outline using brainstorming
      const outline = await this.contentBrainstormer.generateCourseOutline(
        courseSpec.topic,
        courseSpec.level || 'intermediate',
        courseSpec.duration || '8 weeks'
      );

      // Create presentation in Gamma
      const presentation = await this.presentationCreator.createFromOutline(outline, {
        theme: courseSpec.theme || 'educational',
        export: courseSpec.export || false,
        exportFormat: courseSpec.exportFormat || 'pdf'
      });

      this.logger.info('Course created successfully', {
        modules: outline.modules.length,
        slides: presentation.slideCount
      });

      return {
        success: true,
        outline,
        presentation,
        message: 'Course created successfully in Gamma!'
      };
    } catch (error) {
      this.logger.error('Course creation failed', error);
      throw error;
    }
  }

  /**
   * Generate a single lecture presentation
   * @param {Object} lectureData - Lecture specifications
   * @returns {Promise<Object>} Created lecture
   */
  async createLecture(lectureData) {
    await this._ensureInitialized();

    try {
      this.logger.info('Creating lecture', { title: lectureData.title });

      // Generate learning objectives
      const objectives = await this.contentBrainstormer.generateLearningObjectives(
        lectureData.title,
        lectureData.context || {}
      );

      // Expand content
      const content = await this.contentBrainstormer.expandTopicContent(
        lectureData.title,
        lectureData.depth || 'detailed',
        lectureData.audience || 'students'
      );

      // Add objectives to content
      content.objectives = objectives;

      // Create presentation in Gamma
      const presentation = await this.presentationCreator.createFromLecture(
        lectureData,
        content,
        {
          theme: lectureData.theme || 'educational',
          export: lectureData.export || false,
          exportFormat: lectureData.exportFormat || 'pdf'
        }
      );

      return {
        success: true,
        objectives,
        content,
        presentation,
        message: 'Lecture created successfully in Gamma!'
      };
    } catch (error) {
      this.logger.error('Lecture creation failed', error);
      throw error;
    }
  }

  /**
   * Create assessment materials
   * @param {Object} assessmentSpec - Assessment specifications
   * @returns {Promise<Object>} Created assessment
   */
  async createAssessment(assessmentSpec) {
    await this._ensureInitialized();

    try {
      this.logger.info('Creating assessment', { type: assessmentSpec.type });

      const assessments = await this.contentBrainstormer.generateAssessments(
        assessmentSpec.content || {},
        assessmentSpec.questionTypes || ['multiple-choice']
      );

      return {
        success: true,
        assessments,
        message: 'Assessment generated. Gamma automation to be implemented.'
      };
    } catch (error) {
      this.logger.error('Assessment creation failed', error);
      throw error;
    }
  }

  /**
   * Create workshop materials
   * @param {Object} workshopSpec - Workshop specifications
   * @returns {Promise<Object>} Created workshop
   */
  async createWorkshop(workshopSpec) {
    await this._ensureInitialized();

    try {
      this.logger.info('Creating workshop', { topic: workshopSpec.topic });

      const activities = await this.contentBrainstormer.generateActivities(
        workshopSpec.learningObjectives || [],
        workshopSpec.format || 'mixed'
      );

      return {
        success: true,
        activities,
        message: 'Workshop content generated. Gamma automation to be implemented.'
      };
    } catch (error) {
      this.logger.error('Workshop creation failed', error);
      throw error;
    }
  }

  /**
   * Brainstorm course outline
   * @param {Object} brainstormSpec - Brainstorming specifications
   * @returns {Promise<Object>} Generated outline
   */
  async brainstormCourse(brainstormSpec) {
    try {
      this.logger.info('Brainstorming course', { topic: brainstormSpec.topic });

      const outline = await this.contentBrainstormer.generateCourseOutline(
        brainstormSpec.topic,
        brainstormSpec.level || 'intermediate',
        brainstormSpec.duration || '8 weeks'
      );

      if (brainstormSpec.expandContent) {
        for (const module of outline.modules) {
          module.expandedContent = await this.contentBrainstormer.expandTopicContent(
            module.title,
            'detailed',
            brainstormSpec.audience || 'students'
          );
        }
      }

      return outline;
    } catch (error) {
      this.logger.error('Brainstorming failed', error);
      throw error;
    }
  }

  /**
   * Ensure system is initialized
   * @private
   */
  async _ensureInitialized() {
    if (!this.isInitialized) {
      await this.initialize();
    }
  }

  /**
   * Get system health status
   * @returns {Promise<Object>} Health status
   */
  async getHealthStatus() {
    const browserHealth = await this.browserManager.healthCheck();
    const rateLimitStatus = RateLimiter.getStatus();

    return {
      browser: browserHealth,
      rateLimit: rateLimitStatus,
      initialized: this.isInitialized,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Clean up resources
   */
  async cleanup() {
    try {
      this.logger.info('Cleaning up resources');

      if (this.page) {
        await this.page.close();
        this.page = null;
      }

      if (this.browserManager) {
        await this.browserManager.cleanup();
      }

      this.isInitialized = false;
      this.logger.info('Cleanup complete');
    } catch (error) {
      this.logger.error('Cleanup failed', error);
    }
  }
}

// Export main class and utilities
export default GammaCourseCreator;

export {
  BrowserManager,
  SessionManager,
  ContentBrainstormer,
  PresentationCreator,
  Logger,
  Config,
  ErrorHandler,
  RateLimiter
};
