import { marked } from 'marked';
import yaml from 'js-yaml';
import Logger from '../utils/Logger.js';

/**
 * Parse various input formats for course content
 * Supports JSON, Markdown, YAML, and plain text
 */
class ContentParser {
  constructor() {
    this.logger = Logger.child('ContentParser');
  }

  /**
   * Parse content from various formats
   * @param {string|Object} input - Input content
   * @param {string} format - Format type ('auto', 'json', 'markdown', 'yaml', 'text')
   * @returns {Object} Parsed content structure
   */
  parse(input, format = 'auto') {
    try {
      this.logger.info('Parsing content', { format, inputType: typeof input });

      // If already an object, validate and return
      if (typeof input === 'object' && input !== null) {
        return this.validateStructure(input);
      }

      // Auto-detect format
      if (format === 'auto') {
        format = this.detectFormat(input);
      }

      // Parse based on format
      let parsed;
      switch (format) {
        case 'json':
          parsed = this.parseJSON(input);
          break;
        case 'markdown':
          parsed = this.parseMarkdown(input);
          break;
        case 'yaml':
          parsed = this.parseYAML(input);
          break;
        case 'text':
          parsed = this.parseText(input);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      return this.validateStructure(parsed);
    } catch (error) {
      this.logger.error('Parse failed', error);
      throw error;
    }
  }

  /**
   * Detect input format
   * @private
   */
  detectFormat(input) {
    const trimmed = input.trim();

    // Check for JSON
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return 'json';
    }

    // Check for YAML
    if (trimmed.match(/^[\w-]+:\s*[\w\s]/m) || trimmed.startsWith('---')) {
      return 'yaml';
    }

    // Check for Markdown
    if (trimmed.match(/^#+\s/m) || trimmed.includes('##')) {
      return 'markdown';
    }

    // Default to text
    return 'text';
  }

  /**
   * Parse JSON input
   * @private
   */
  parseJSON(input) {
    try {
      return JSON.parse(input);
    } catch (error) {
      throw new Error(`Invalid JSON: ${error.message}`);
    }
  }

  /**
   * Parse Markdown input
   * @private
   */
  parseMarkdown(input) {
    const slides = [];
    const lines = input.split('\n');
    let currentSlide = null;
    let currentContent = [];

    for (const line of lines) {
      // H1 = presentation title
      if (line.startsWith('# ')) {
        continue; // Skip main title, handled separately
      }

      // H2 = new slide
      if (line.startsWith('## ')) {
        // Save previous slide
        if (currentSlide) {
          currentSlide.content = currentContent.join('\n').trim();
          slides.push(currentSlide);
        }

        // Start new slide
        currentSlide = {
          title: line.replace('##', '').trim(),
          type: 'content',
          layout: 'default'
        };
        currentContent = [];
      } else if (currentSlide) {
        currentContent.push(line);
      }
    }

    // Save last slide
    if (currentSlide) {
      currentSlide.content = currentContent.join('\n').trim();
      slides.push(currentSlide);
    }

    return {
      title: this.extractMarkdownTitle(input),
      slides: slides.map((slide, index) => ({
        id: `slide-${index + 1}`,
        ...slide
      }))
    };
  }

  /**
   * Extract title from Markdown
   * @private
   */
  extractMarkdownTitle(input) {
    const match = input.match(/^# (.+)$/m);
    return match ? match[1].trim() : 'Untitled';
  }

  /**
   * Parse YAML input
   * @private
   */
  parseYAML(input) {
    try {
      return yaml.load(input);
    } catch (error) {
      throw new Error(`Invalid YAML: ${error.message}`);
    }
  }

  /**
   * Parse plain text input
   * @private
   */
  parseText(input) {
    // Split by double newlines as slide boundaries
    const sections = input.split(/\n\n+/);

    const slides = sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0] || `Slide ${index + 1}`;
      const content = lines.slice(1).join('\n').trim();

      return {
        id: `slide-${index + 1}`,
        type: 'content',
        layout: 'default',
        title,
        content
      };
    });

    return {
      title: slides[0]?.title || 'Presentation',
      slides
    };
  }

  /**
   * Validate content structure
   * @private
   */
  validateStructure(content) {
    // Ensure required fields
    if (!content.title && !content.metadata?.title) {
      content.title = 'Untitled Presentation';
    }

    if (!content.slides) {
      content.slides = [];
    }

    // Ensure each slide has required fields
    content.slides = content.slides.map((slide, index) => ({
      id: slide.id || `slide-${index + 1}`,
      type: slide.type || 'content',
      layout: slide.layout || 'default',
      title: slide.title || '',
      content: slide.content || {},
      ...slide
    }));

    return content;
  }

  /**
   * Parse lecture data format
   * @param {Object} lectureData - Lecture specifications
   * @returns {Object} Parsed lecture structure
   */
  parseLectureData(lectureData) {
    this.logger.info('Parsing lecture data', { title: lectureData.title });

    const slides = [];

    // Title slide
    slides.push({
      id: 'title',
      type: 'title',
      layout: 'center',
      content: {
        title: lectureData.metadata?.title || lectureData.title,
        subtitle: lectureData.metadata?.subtitle || '',
        instructor: lectureData.metadata?.instructor || '',
        course: lectureData.metadata?.courseTitle || ''
      }
    });

    // Learning objectives slide
    if (lectureData.metadata?.learningObjectives) {
      slides.push({
        id: 'objectives',
        type: 'learning-objectives',
        layout: 'list',
        content: {
          title: 'Learning Objectives',
          objectives: lectureData.metadata.learningObjectives
        }
      });
    }

    // Content slides
    if (lectureData.slides) {
      slides.push(...lectureData.slides);
    }

    return {
      title: lectureData.metadata?.title || lectureData.title,
      metadata: lectureData.metadata || {},
      settings: lectureData.settings || {},
      slides
    };
  }

  /**
   * Convert parsed content to Gamma-compatible format
   * @param {Object} content - Parsed content
   * @returns {Object} Gamma-compatible format
   */
  toGammaFormat(content) {
    return {
      title: content.title || content.metadata?.title,
      slides: content.slides.map(slide => ({
        type: this.mapSlideType(slide.type),
        content: this.formatSlideContent(slide)
      }))
    };
  }

  /**
   * Map slide types to Gamma types
   * @private
   */
  mapSlideType(type) {
    const typeMap = {
      'title': 'title',
      'content': 'text',
      'learning-objectives': 'bullet',
      'concept-explanation': 'split',
      'interactive-example': 'code',
      'assessment': 'quiz',
      'image': 'image',
      'video': 'video',
      'quote': 'quote'
    };

    return typeMap[type] || 'text';
  }

  /**
   * Format slide content for Gamma
   * @private
   */
  formatSlideContent(slide) {
    if (typeof slide.content === 'string') {
      return {
        title: slide.title,
        text: slide.content
      };
    }

    return {
      title: slide.title,
      ...slide.content
    };
  }

  /**
   * Extract slides from course outline
   * @param {Object} outline - Course outline from ContentBrainstormer
   * @returns {Array} Array of slide structures
   */
  extractSlidesFromOutline(outline) {
    const slides = [];

    // Title slide
    slides.push({
      id: 'title',
      type: 'title',
      layout: 'center',
      content: {
        title: outline.title,
        subtitle: outline.description,
        level: outline.level,
        duration: outline.duration
      }
    });

    // Overview slide
    slides.push({
      id: 'overview',
      type: 'content',
      layout: 'two-column',
      title: 'Course Overview',
      content: {
        learningOutcomes: outline.learningOutcomes,
        prerequisites: outline.prerequisites,
        duration: outline.duration
      }
    });

    // Module slides
    outline.modules.forEach((module, index) => {
      slides.push({
        id: `module-${index + 1}`,
        type: 'content',
        layout: 'default',
        title: module.title,
        content: {
          topics: module.topics,
          duration: module.duration
        }
      });
    });

    return slides;
  }
}

export default ContentParser;
