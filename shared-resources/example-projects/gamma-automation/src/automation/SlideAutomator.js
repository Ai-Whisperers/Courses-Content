import Logger from '../utils/Logger.js';
import ElementWaiter from '../core/ElementWaiter.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import RateLimiter from '../utils/RateLimiter.js';

/**
 * Individual slide automation
 * Handles creating and editing slides in Gamma
 */
class SlideAutomator {
  constructor(page, navigator) {
    this.page = page;
    this.navigator = navigator;
    this.waiter = new ElementWaiter(page);
    this.logger = Logger.child('SlideAutomator');
  }

  /**
   * Add a new slide
   * @returns {Promise<void>}
   */
  async addSlide() {
    return await RateLimiter.execute(async () => {
      return await ErrorHandler.withRetry(async () => {
        this.logger.info('Adding new slide');

        await this.waiter.waitAndClick('editor', 'addSlideButton');
        await this.waiter.waitForLoadingComplete();

        this.logger.info('Slide added');
      }, { context: 'add-slide' });
    }, 'add-slide');
  }

  /**
   * Delete a slide
   * @param {number} slideIndex - Index of slide to delete
   */
  async deleteSlide(slideIndex) {
    return await RateLimiter.execute(async () => {
      this.logger.info('Deleting slide', { slideIndex });

      // Select slide
      await this.selectSlide(slideIndex);

      // Delete (keyboard shortcut or context menu)
      await this.page.keyboard.press('Delete');
      await this.waiter.waitForLoadingComplete();

      this.logger.info('Slide deleted', { slideIndex });
    }, 'delete-slide');
  }

  /**
   * Select a specific slide
   * @param {number} slideIndex - Index of slide to select
   */
  async selectSlide(slideIndex) {
    return await ErrorHandler.withRetry(async () => {
      this.logger.debug('Selecting slide', { slideIndex });

      const slideThumbs = await this.page.locator('[data-testid="slide-thumb"], .slide-thumbnail').all();

      if (slideIndex >= slideThumbs.length) {
        throw new Error(`Slide index ${slideIndex} out of range`);
      }

      await slideThumbs[slideIndex].click();
      await this.waiter.waitForLoadingComplete();

      this.logger.debug('Slide selected', { slideIndex });
    }, { context: 'select-slide' });
  }

  /**
   * Set slide title
   * @param {string} title - Slide title
   */
  async setTitle(title) {
    return await RateLimiter.execute(async () => {
      return await ErrorHandler.withRetry(async () => {
        this.logger.info('Setting slide title', { title });

        await this.waiter.waitAndFill('editor', 'titleInput', title);

        this.logger.info('Title set');
      }, { context: 'set-title' });
    }, 'set-title');
  }

  /**
   * Set slide content
   * @param {string|Object} content - Slide content
   */
  async setContent(content) {
    return await RateLimiter.execute(async () => {
      return await ErrorHandler.withRetry(async () => {
        this.logger.info('Setting slide content');

        const contentText = typeof content === 'string' ? content : this.formatContent(content);

        await this.waiter.waitAndClick('editor', 'contentInput');
        await this.page.keyboard.press('Control+A'); // Select all
        await this.waiter.waitAndType('editor', 'contentInput', contentText);

        this.logger.info('Content set');
      }, { context: 'set-content' });
    }, 'set-content');
  }

  /**
   * Format content object to string
   * @private
   */
  formatContent(content) {
    if (Array.isArray(content)) {
      return content.join('\n');
    }

    if (content.points || content.objectives) {
      const items = content.points || content.objectives;
      return items.map(item => `• ${item}`).join('\n');
    }

    if (content.text) {
      return content.text;
    }

    return JSON.stringify(content, null, 2);
  }

  /**
   * Create slide from structure
   * @param {Object} slide - Slide structure from SlideBuilder
   */
  async createSlide(slide) {
    try {
      this.logger.info('Creating slide', { id: slide.id, type: slide.type });

      // Add new slide
      await this.addSlide();

      // Set title if present
      if (slide.title) {
        await this.setTitle(slide.title);
      }

      // Set content based on type
      await this.setSlideContent(slide);

      this.logger.info('Slide created', { id: slide.id });
    } catch (error) {
      this.logger.error('Failed to create slide', { slide: slide.id, error });
      throw error;
    }
  }

  /**
   * Set slide content based on type
   * @private
   */
  async setSlideContent(slide) {
    switch (slide.type) {
      case 'title':
        await this.setTitleSlideContent(slide);
        break;

      case 'content':
        await this.setContentSlideContent(slide);
        break;

      case 'learning-objectives':
        await this.setObjectivesSlideContent(slide);
        break;

      case 'concept-explanation':
        await this.setConceptSlideContent(slide);
        break;

      case 'interactive-example':
        await this.setExampleSlideContent(slide);
        break;

      case 'assessment':
        await this.setAssessmentSlideContent(slide);
        break;

      default:
        // Default to content slide
        if (slide.content) {
          await this.setContent(slide.content);
        }
    }
  }

  /**
   * Set title slide content
   * @private
   */
  async setTitleSlideContent(slide) {
    const content = [];

    if (slide.title) content.push(slide.title);
    if (slide.subtitle) content.push(slide.subtitle);
    if (slide.instructor) content.push(`By: ${slide.instructor}`);
    if (slide.course) content.push(slide.course);

    await this.setContent(content.join('\n\n'));
  }

  /**
   * Set content slide content
   * @private
   */
  async setContentSlideContent(slide) {
    if (slide.content) {
      await this.setContent(slide.content);
    }
  }

  /**
   * Set learning objectives slide content
   * @private
   */
  async setObjectivesSlideContent(slide) {
    if (slide.objectives && Array.isArray(slide.objectives)) {
      const content = slide.objectives.map(obj => `• ${obj}`).join('\n');
      await this.setContent(content);
    }
  }

  /**
   * Set concept explanation slide content
   * @private
   */
  async setConceptSlideContent(slide) {
    const content = [];

    if (slide.explanation) content.push(slide.explanation);
    if (slide.examples && Array.isArray(slide.examples)) {
      content.push('\nExamples:');
      slide.examples.forEach(ex => content.push(`• ${ex}`));
    }

    await this.setContent(content.join('\n'));
  }

  /**
   * Set interactive example slide content
   * @private
   */
  async setExampleSlideContent(slide) {
    const content = [];

    if (slide.description) content.push(slide.description);
    if (slide.code) {
      content.push('\n```' + (slide.language || ''));
      content.push(slide.code);
      content.push('```');
    }
    if (slide.output) {
      content.push('\nOutput:');
      content.push(slide.output);
    }

    await this.setContent(content.join('\n'));
  }

  /**
   * Set assessment slide content
   * @private
   */
  async setAssessmentSlideContent(slide) {
    const content = [];

    if (slide.question) content.push(slide.question);
    if (slide.options && Array.isArray(slide.options)) {
      content.push('\nOptions:');
      slide.options.forEach((opt, index) => {
        const marker = index === slide.correct ? '✓' : '○';
        content.push(`${marker} ${opt}`);
      });
    }

    await this.setContent(content.join('\n'));
  }

  /**
   * Duplicate a slide
   * @param {number} slideIndex - Index of slide to duplicate
   */
  async duplicateSlide(slideIndex) {
    return await RateLimiter.execute(async () => {
      this.logger.info('Duplicating slide', { slideIndex });

      await this.selectSlide(slideIndex);

      // Use keyboard shortcut or context menu
      await this.page.keyboard.press('Control+D');
      await this.waiter.waitForLoadingComplete();

      this.logger.info('Slide duplicated');
    }, 'duplicate-slide');
  }

  /**
   * Move slide to new position
   * @param {number} fromIndex - Current index
   * @param {number} toIndex - Target index
   */
  async moveSlide(fromIndex, toIndex) {
    this.logger.info('Moving slide', { from: fromIndex, to: toIndex });

    // This would require drag-and-drop or other UI interaction
    // Implementation depends on Gamma's specific UI
    this.logger.warn('Move slide not yet implemented');
  }

  /**
   * Get slide count
   * @returns {Promise<number>}
   */
  async getSlideCount() {
    const slideThumbs = await this.page.locator('[data-testid="slide-thumb"], .slide-thumbnail').all();
    return slideThumbs.length;
  }

  /**
   * Navigate to specific slide in editor
   * @param {number} slideIndex - Index of slide
   */
  async goToSlide(slideIndex) {
    await this.selectSlide(slideIndex);
  }

  /**
   * Get current slide index
   * @returns {Promise<number>}
   */
  async getCurrentSlideIndex() {
    // Implementation depends on Gamma's UI for indicating active slide
    this.logger.warn('Get current slide index not yet implemented');
    return 0;
  }
}

export default SlideAutomator;
