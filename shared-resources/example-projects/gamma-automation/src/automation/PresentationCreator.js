import Logger from '../utils/Logger.js';
import GammaNavigator from '../core/GammaNavigator.js';
import SlideAutomator from './SlideAutomator.js';
import ThemeManager from './ThemeManager.js';
import ExportManager from './ExportManager.js';
import ContentParser from '../content/ContentParser.js';
import SlideBuilder from '../content/SlideBuilder.js';
import ErrorHandler from '../utils/ErrorHandler.js';

/**
 * Main automation orchestrator
 * Coordinates all components to create complete presentations
 */
class PresentationCreator {
  constructor(page) {
    this.page = page;
    this.logger = Logger.child('PresentationCreator');

    // Initialize components
    this.navigator = new GammaNavigator(page);
    this.slideAutomator = new SlideAutomator(page, this.navigator);
    this.themeManager = new ThemeManager(page, this.navigator);
    this.exportManager = new ExportManager(page, this.navigator);
    this.contentParser = new ContentParser();
    this.slideBuilder = new SlideBuilder();
  }

  /**
   * Create complete presentation from content
   * @param {Object|string} content - Content to create (object or string)
   * @param {Object} options - Creation options
   * @returns {Promise<Object>} Created presentation info
   */
  async createPresentation(content, options = {}) {
    try {
      this.logger.info('Creating presentation', {
        contentType: typeof content,
        options
      });

      // Navigate to create page
      await this.navigator.goToCreate(options.method || 'ai');

      // Parse and build content structure
      const parsedContent = this.contentParser.parse(content, options.format);
      const presentation = this.slideBuilder.buildPresentation(parsedContent);

      // Input initial content if using AI generation
      if (options.method === 'ai' || options.method === 'text') {
        await this.inputInitialContent(presentation);
      }

      // Wait for presentation to be created/loaded
      await this.navigator.waitForReady();
      await ErrorHandler.sleep(2000); // Give Gamma time to process

      // Check if we're in editor
      const isEditor = await this.navigator.isInEditor();
      if (!isEditor) {
        throw new Error('Failed to enter editor after creation');
      }

      // Create slides
      await this.createSlides(presentation.slides, options);

      // Apply theme if specified
      if (options.theme) {
        await this.themeManager.applyTheme(options.theme);
      }

      // Apply settings
      if (presentation.settings) {
        await this.applySettings(presentation.settings);
      }

      // Export if requested
      let exportPath = null;
      if (options.export) {
        exportPath = await this.exportManager.export(
          options.exportFormat || 'pdf',
          options.exportOptions || {}
        );
      }

      const result = {
        success: true,
        title: presentation.title,
        slideCount: presentation.slides.length,
        url: this.navigator.getCurrentURL(),
        exportPath
      };

      this.logger.info('Presentation created successfully', result);
      return result;
    } catch (error) {
      this.logger.error('Presentation creation failed', error);

      // Capture screenshot on error
      await ErrorHandler.captureError(this.page, 'presentation-creation');

      throw error;
    }
  }

  /**
   * Input initial content for AI generation
   * @private
   */
  async inputInitialContent(presentation) {
    try {
      this.logger.info('Inputting initial content for AI');

      // Try to find topic/content input
      const topicInput = await this.page.locator(
        'textarea[placeholder*="topic" i], textarea[placeholder*="describe" i], [data-field="topic"]'
      ).first();

      if (await topicInput.isVisible({ timeout: 5000 })) {
        const initialContent = this.buildInitialPrompt(presentation);
        await topicInput.fill(initialContent);

        // Click generate button
        const generateButton = await this.page.locator(
          'button:has-text("Generate"), button:has-text("Create"), [data-action="generate"]'
        ).first();

        await generateButton.click();

        this.logger.info('Initiated AI generation');
      }
    } catch (error) {
      this.logger.warn('Could not input initial content', { error: error.message });
      // Continue anyway, might be in editor already
    }
  }

  /**
   * Build initial prompt for AI
   * @private
   */
  buildInitialPrompt(presentation) {
    const parts = [];

    parts.push(`Title: ${presentation.title}`);

    if (presentation.metadata?.description) {
      parts.push(`\nDescription: ${presentation.metadata.description}`);
    }

    if (presentation.slides.length > 0) {
      parts.push('\nSlides:');
      presentation.slides.forEach(slide => {
        parts.push(`- ${slide.title || slide.type}`);
      });
    }

    return parts.join('\n');
  }

  /**
   * Create all slides
   * @private
   */
  async createSlides(slides, options = {}) {
    this.logger.info('Creating slides', { count: slides.length });

    // Skip first slide if it already exists (Gamma might create one)
    const existingCount = await this.slideAutomator.getSlideCount();
    const startIndex = existingCount > 0 && options.skipFirst !== false ? 1 : 0;

    for (let i = startIndex; i < slides.length; i++) {
      const slide = slides[i];

      try {
        this.logger.info(`Creating slide ${i + 1}/${slides.length}`, {
          id: slide.id,
          title: slide.title
        });

        await this.slideAutomator.createSlide(slide);

        // Small delay between slides
        await ErrorHandler.sleep(1000);
      } catch (error) {
        this.logger.error(`Failed to create slide ${i}`, {
          slide: slide.id,
          error: error.message
        });

        if (options.continueOnError !== false) {
          this.logger.warn('Continuing despite error');
          continue;
        } else {
          throw error;
        }
      }
    }

    this.logger.info('All slides created');
  }

  /**
   * Apply presentation settings
   * @private
   */
  async applySettings(settings) {
    try {
      this.logger.info('Applying settings', settings);

      if (settings.theme) {
        await this.themeManager.applyTheme(settings.theme);
      }

      if (settings.fontSize) {
        await this.themeManager.setFontSize(settings.fontSize);
      }

      // Add more settings as needed

      this.logger.info('Settings applied');
    } catch (error) {
      this.logger.warn('Failed to apply some settings', { error: error.message });
      // Don't throw, settings are not critical
    }
  }

  /**
   * Create presentation from course outline
   * @param {Object} outline - Course outline from ContentBrainstormer
   * @param {Object} options - Creation options
   * @returns {Promise<Object>}
   */
  async createFromOutline(outline, options = {}) {
    this.logger.info('Creating from outline', { title: outline.title });

    const slides = this.slideBuilder.buildFromOutline(outline);

    const presentation = {
      title: outline.title,
      metadata: {
        description: outline.description,
        level: outline.level,
        duration: outline.duration
      },
      slides
    };

    return await this.createPresentation(presentation, {
      ...options,
      theme: options.theme || 'educational'
    });
  }

  /**
   * Create presentation from lecture data
   * @param {Object} lectureData - Lecture specifications
   * @param {Object} expandedContent - Expanded content
   * @param {Object} options - Creation options
   * @returns {Promise<Object>}
   */
  async createFromLecture(lectureData, expandedContent, options = {}) {
    this.logger.info('Creating from lecture', { title: lectureData.title });

    const slides = this.slideBuilder.buildFromLecture(lectureData, expandedContent);

    const presentation = {
      title: lectureData.title,
      metadata: lectureData.context || {},
      slides
    };

    return await this.createPresentation(presentation, {
      ...options,
      theme: options.theme || 'educational'
    });
  }

  /**
   * Update existing presentation
   * @param {string} presentationId - Presentation ID
   * @param {Object} updates - Updates to apply
   */
  async updatePresentation(presentationId, updates) {
    this.logger.info('Updating presentation', { presentationId });

    // Navigate to editor
    await this.navigator.goToEditor(presentationId);

    // Apply updates
    if (updates.slides) {
      // Add/update slides
      for (const slide of updates.slides) {
        await this.slideAutomator.createSlide(slide);
      }
    }

    if (updates.theme) {
      await this.themeManager.applyTheme(updates.theme);
    }

    this.logger.info('Presentation updated');
  }

  /**
   * Get presentation URL
   * @returns {string}
   */
  getPresentationURL() {
    return this.navigator.getCurrentURL();
  }

  /**
   * Save presentation (auto-save check)
   */
  async save() {
    try {
      // Gamma likely auto-saves, but trigger save if button exists
      const saveButton = await this.page.locator(
        'button:has-text("Save"), [data-action="save"]'
      ).first();

      if (await saveButton.isVisible({ timeout: 1000 })) {
        await saveButton.click();
        this.logger.info('Save triggered');
      } else {
        this.logger.debug('No save button found, assuming auto-save');
      }
    } catch (error) {
      this.logger.debug('Save check skipped', { error: error.message });
    }
  }
}

export default PresentationCreator;
