import Logger from '../utils/Logger.js';

/**
 * Build slide content structures
 * Creates properly formatted slide objects for automation
 */
class SlideBuilder {
  constructor() {
    this.logger = Logger.child('SlideBuilder');
  }

  /**
   * Build complete presentation structure
   * @param {Object} content - Parsed content
   * @returns {Object} Presentation structure
   */
  buildPresentation(content) {
    this.logger.info('Building presentation', { title: content.title });

    return {
      title: content.title,
      metadata: content.metadata || {},
      settings: content.settings || this.getDefaultSettings(),
      slides: content.slides.map((slide, index) => this.buildSlide(slide, index))
    };
  }

  /**
   * Build individual slide
   * @param {Object} slideData - Slide data
   * @param {number} index - Slide index
   * @returns {Object} Built slide
   */
  buildSlide(slideData, index) {
    const slideType = slideData.type || 'content';
    const builder = this.getSlideBuilder(slideType);

    return {
      id: slideData.id || `slide-${index + 1}`,
      index,
      type: slideType,
      layout: slideData.layout || 'default',
      ...builder(slideData)
    };
  }

  /**
   * Get appropriate slide builder function
   * @private
   */
  getSlideBuilder(type) {
    const builders = {
      'title': this.buildTitleSlide.bind(this),
      'content': this.buildContentSlide.bind(this),
      'learning-objectives': this.buildObjectivesSlide.bind(this),
      'concept-explanation': this.buildConceptSlide.bind(this),
      'interactive-example': this.buildExampleSlide.bind(this),
      'assessment': this.buildAssessmentSlide.bind(this),
      'summary': this.buildSummarySlide.bind(this),
      'image': this.buildImageSlide.bind(this),
      'video': this.buildVideoSlide.bind(this),
      'quote': this.buildQuoteSlide.bind(this),
      'two-column': this.buildTwoColumnSlide.bind(this)
    };

    return builders[type] || this.buildContentSlide.bind(this);
  }

  /**
   * Build title slide
   * @private
   */
  buildTitleSlide(data) {
    return {
      title: data.content?.title || data.title,
      subtitle: data.content?.subtitle || '',
      instructor: data.content?.instructor || '',
      course: data.content?.course || '',
      background: data.content?.background || {}
    };
  }

  /**
   * Build content slide
   * @private
   */
  buildContentSlide(data) {
    return {
      title: data.title,
      content: this.formatContent(data.content),
      notes: data.notes || ''
    };
  }

  /**
   * Build learning objectives slide
   * @private
   */
  buildObjectivesSlide(data) {
    return {
      title: data.title || 'Learning Objectives',
      objectives: Array.isArray(data.content?.objectives)
        ? data.content.objectives
        : this.extractBulletPoints(data.content)
    };
  }

  /**
   * Build concept explanation slide
   * @private
   */
  buildConceptSlide(data) {
    return {
      title: data.title,
      explanation: data.content?.explanation || data.content?.text || '',
      diagram: data.content?.diagram || null,
      examples: data.content?.examples || []
    };
  }

  /**
   * Build interactive example slide
   * @private
   */
  buildExampleSlide(data) {
    return {
      title: data.title,
      description: data.content?.description || '',
      code: data.content?.code || '',
      language: data.content?.language || 'javascript',
      output: data.content?.output || ''
    };
  }

  /**
   * Build assessment slide
   * @private
   */
  buildAssessmentSlide(data) {
    return {
      title: data.title || 'Quick Check',
      question: data.content?.question || '',
      options: data.content?.options || [],
      correct: data.content?.correct || 0,
      explanation: data.content?.explanation || ''
    };
  }

  /**
   * Build summary slide
   * @private
   */
  buildSummarySlide(data) {
    return {
      title: data.title || 'Summary',
      keyPoints: Array.isArray(data.content?.keyPoints)
        ? data.content.keyPoints
        : this.extractBulletPoints(data.content),
      nextSteps: data.content?.nextSteps || []
    };
  }

  /**
   * Build image slide
   * @private
   */
  buildImageSlide(data) {
    return {
      title: data.title,
      image: data.content?.src || data.content?.image || '',
      caption: data.content?.caption || '',
      alt: data.content?.alt || data.title
    };
  }

  /**
   * Build video slide
   * @private
   */
  buildVideoSlide(data) {
    return {
      title: data.title,
      videoUrl: data.content?.url || data.content?.videoUrl || '',
      description: data.content?.description || '',
      duration: data.content?.duration || ''
    };
  }

  /**
   * Build quote slide
   * @private
   */
  buildQuoteSlide(data) {
    return {
      quote: data.content?.quote || data.content?.text || '',
      author: data.content?.author || '',
      context: data.content?.context || ''
    };
  }

  /**
   * Build two-column slide
   * @private
   */
  buildTwoColumnSlide(data) {
    return {
      title: data.title,
      left: {
        type: data.content?.left?.type || 'text',
        content: data.content?.left?.content || ''
      },
      right: {
        type: data.content?.right?.type || 'text',
        content: data.content?.right?.content || ''
      }
    };
  }

  /**
   * Format content (handle strings, objects, arrays)
   * @private
   */
  formatContent(content) {
    if (typeof content === 'string') {
      return content;
    }

    if (Array.isArray(content)) {
      return content;
    }

    if (typeof content === 'object') {
      return content;
    }

    return String(content);
  }

  /**
   * Extract bullet points from text or object
   * @private
   */
  extractBulletPoints(content) {
    if (Array.isArray(content)) {
      return content;
    }

    if (typeof content === 'string') {
      // Split by newlines and filter bullet points
      return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-') || line.startsWith('*') || line.startsWith('•'))
        .map(line => line.replace(/^[-*•]\s*/, ''));
    }

    if (content?.objectives) {
      return content.objectives;
    }

    if (content?.points) {
      return content.points;
    }

    return [];
  }

  /**
   * Get default presentation settings
   * @private
   */
  getDefaultSettings() {
    return {
      aspectRatio: '16:9',
      fontSize: 'medium',
      colorScheme: 'auto',
      animations: true,
      transitions: 'fade',
      theme: 'educational'
    };
  }

  /**
   * Build slides from course outline
   * @param {Object} outline - Course outline
   * @returns {Array} Array of slides
   */
  buildFromOutline(outline) {
    const slides = [];

    // Title slide
    slides.push(this.buildSlide({
      type: 'title',
      title: outline.title,
      content: {
        title: outline.title,
        subtitle: outline.description,
        level: outline.level,
        duration: outline.duration
      }
    }, 0));

    // Learning outcomes
    slides.push(this.buildSlide({
      type: 'learning-objectives',
      title: 'What You Will Learn',
      content: {
        objectives: outline.learningOutcomes
      }
    }, 1));

    // Prerequisites
    if (outline.prerequisites && outline.prerequisites.length > 0) {
      slides.push(this.buildSlide({
        type: 'content',
        title: 'Prerequisites',
        content: {
          points: outline.prerequisites
        }
      }, 2));
    }

    // Module slides
    outline.modules.forEach((module, index) => {
      slides.push(this.buildSlide({
        type: 'content',
        title: module.title,
        content: {
          topics: module.topics,
          duration: module.duration
        }
      }, slides.length));
    });

    return slides;
  }

  /**
   * Build slides from lecture data
   * @param {Object} lectureData - Lecture data
   * @param {Object} expandedContent - Expanded content
   * @returns {Array} Array of slides
   */
  buildFromLecture(lectureData, expandedContent) {
    const slides = [];

    // Title slide
    slides.push(this.buildSlide({
      type: 'title',
      title: lectureData.title,
      content: {
        title: lectureData.title,
        subtitle: lectureData.context?.course || ''
      }
    }, 0));

    // Learning objectives
    if (expandedContent.objectives) {
      slides.push(this.buildSlide({
        type: 'learning-objectives',
        title: 'Learning Objectives',
        content: {
          objectives: expandedContent.objectives
        }
      }, 1));
    }

    // Introduction
    slides.push(this.buildSlide({
      type: 'content',
      title: 'Introduction',
      content: expandedContent.introduction || ''
    }, 2));

    // Key concepts
    if (expandedContent.keyConcepts) {
      slides.push(this.buildSlide({
        type: 'content',
        title: 'Key Concepts',
        content: {
          points: expandedContent.keyConcepts
        }
      }, 3));
    }

    // Examples
    if (expandedContent.examples && expandedContent.examples.length > 0) {
      expandedContent.examples.forEach((example, index) => {
        slides.push(this.buildSlide({
          type: 'interactive-example',
          title: example.title || `Example ${index + 1}`,
          content: example
        }, slides.length));
      });
    }

    return slides;
  }

  /**
   * Validate slide structure
   * @param {Object} slide - Slide to validate
   * @returns {boolean}
   */
  validateSlide(slide) {
    const required = ['id', 'type'];

    for (const field of required) {
      if (!slide[field]) {
        this.logger.warn('Invalid slide structure', { missing: field, slide });
        return false;
      }
    }

    return true;
  }
}

export default SlideBuilder;
