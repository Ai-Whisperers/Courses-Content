/**
 * Integration tests for Content → Automation pipeline
 * Tests the full flow from content generation to presentation creation
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { mockPage, mockBrowser, mockContext } from '../helpers/mockFactories.js';
import {
  assertValidCourseOutline,
  assertValidPresentation,
  assertValidSlide
} from '../helpers/assertions.js';

describe('Content-Automation Integration', () => {
  let contentBrainstormer;
  let contentParser;
  let slideBuilder;
  let presentationCreator;
  let page;

  beforeAll(async () => {
    // Import modules
    const ContentBrainstormerModule = await import('../../src/brainstorming/ContentBrainstormer.js');
    const ContentParserModule = await import('../../src/content/ContentParser.js');
    const SlideBuilderModule = await import('../../src/content/SlideBuilder.js');
    const PresentationCreatorModule = await import('../../src/automation/PresentationCreator.js');

    // Create instances
    contentBrainstormer = new ContentBrainstormerModule.default();
    contentParser = new ContentParserModule.default();
    slideBuilder = new SlideBuilderModule.default();

    // Mock page for presentation creator
    page = mockPage();
    presentationCreator = new PresentationCreatorModule.default(page);
  });

  describe('Course Outline → Presentation Flow', () => {
    test('should flow from brainstorming to presentation structure', async () => {
      // Step 1: Generate course outline
      const outline = await contentBrainstormer.generateCourseOutline(
        'Introduction to JavaScript',
        'beginner',
        '8 weeks'
      );

      assertValidCourseOutline(outline);

      // Step 2: Build slides from outline
      const slides = slideBuilder.buildFromOutline(outline);

      expect(Array.isArray(slides)).toBe(true);
      expect(slides.length).toBeGreaterThan(0);

      slides.forEach(slide => {
        assertValidSlide(slide);
      });

      // Step 3: Create presentation structure
      const presentation = {
        title: outline.title,
        metadata: {
          description: outline.description,
          level: outline.level
        },
        slides
      };

      assertValidPresentation(presentation);
    });

    test('should handle multi-module course', async () => {
      // Generate comprehensive course
      const outline = await contentBrainstormer.generateCourseOutline(
        'Full Stack Web Development',
        'intermediate',
        '16 weeks'
      );

      assertValidCourseOutline(outline);
      expect(outline.modules.length).toBeGreaterThan(5);

      // Build slides for all modules
      const slides = slideBuilder.buildFromOutline(outline);

      // Should have title + slides for each module
      expect(slides.length).toBeGreaterThan(outline.modules.length);

      // Verify slide types
      const slideTypes = new Set(slides.map(s => s.type));
      expect(slideTypes.has('title')).toBe(true);
      expect(slideTypes.has('content')).toBe(true);
    });

    test('should maintain content hierarchy', async () => {
      const outline = await contentBrainstormer.generateCourseOutline(
        'Data Structures',
        'intermediate',
        '12 weeks'
      );

      const slides = slideBuilder.buildFromOutline(outline);

      // Verify structure: should start with title
      expect(slides[0].type).toBe('title');
      expect(slides[0].title).toBe(outline.title);

      // Should have module sections
      const moduleSlides = slides.filter(s =>
        s.title && outline.modules.some(m =>
          s.title.includes(m.title) || m.title.includes(s.title)
        )
      );

      expect(moduleSlides.length).toBeGreaterThan(0);
    });
  });

  describe('Lecture Content → Slides Flow', () => {
    test('should create lecture with objectives', async () => {
      // Generate objectives
      const objectives = await contentBrainstormer.generateLearningObjectives(
        'Functions in Python',
        { level: 'beginner' }
      );

      // Expand content
      const content = await contentBrainstormer.expandTopicContent(
        'Functions in Python',
        'detailed',
        'students'
      );

      content.objectives = objectives;

      // Build slides
      const lectureData = {
        title: 'Functions in Python',
        context: { course: 'Python 101' }
      };

      const slides = slideBuilder.buildFromLecture(lectureData, content);

      expect(slides.length).toBeGreaterThan(2);

      // Should have objectives slide
      const objectivesSlide = slides.find(s =>
        s.type === 'learning-objectives' ||
        (s.title && s.title.toLowerCase().includes('objective'))
      );

      expect(objectivesSlide).toBeDefined();
    });

    test('should include content sections', async () => {
      const content = await contentBrainstormer.expandTopicContent(
        'Object-Oriented Programming',
        'detailed',
        'college students'
      );

      expect(content.sections).toBeDefined();
      expect(content.sections.length).toBeGreaterThan(0);

      const lectureData = {
        title: 'OOP Fundamentals',
        context: {}
      };

      const slides = slideBuilder.buildFromLecture(lectureData, content);

      // Should have slides for each major section
      expect(slides.length).toBeGreaterThanOrEqual(content.sections.length);
    });
  });

  describe('Assessment → Quiz Slides Flow', () => {
    test('should convert assessments to quiz slides', async () => {
      // Generate assessments
      const assessments = await contentBrainstormer.generateAssessments(
        { topic: 'JavaScript Basics' },
        ['multiple-choice']
      );

      expect(assessments.length).toBeGreaterThan(0);

      // Build quiz slides
      const quizSlides = assessments.map((assessment, index) =>
        slideBuilder.buildSlide({
          id: `quiz-${index}`,
          type: 'assessment',
          content: assessment
        })
      );

      expect(quizSlides.length).toBe(assessments.length);

      quizSlides.forEach(slide => {
        assertValidSlide(slide);
        expect(slide.type).toBe('assessment');
      });
    });

    test('should handle mixed question types', async () => {
      const assessments = await contentBrainstormer.generateAssessments(
        { topic: 'Algorithms' },
        ['multiple-choice', 'short-answer', 'coding']
      );

      const types = new Set(assessments.map(a => a.type));
      expect(types.size).toBeGreaterThan(1);

      // All should be convertible to slides
      const slides = assessments.map((assessment, index) =>
        slideBuilder.buildSlide({
          id: `q-${index}`,
          type: 'assessment',
          content: assessment
        })
      );

      expect(slides.length).toBe(assessments.length);
    });
  });

  describe('Content Parsing → Slide Building', () => {
    test('should parse and build from JSON', () => {
      const jsonContent = JSON.stringify({
        title: 'Test Presentation',
        slides: [
          { title: 'Slide 1', content: 'Content 1' },
          { title: 'Slide 2', content: 'Content 2' }
        ]
      });

      const parsed = contentParser.parse(jsonContent, 'json');
      expect(parsed).toBeDefined();

      const presentation = slideBuilder.buildPresentation(parsed);
      assertValidPresentation(presentation);
      expect(presentation.slides.length).toBeGreaterThanOrEqual(2);
    });

    test('should parse and build from Markdown', () => {
      const markdown = `
# Presentation Title

## Slide 1
- Point 1
- Point 2

## Slide 2
Content here
      `;

      const parsed = contentParser.parse(markdown, 'markdown');
      const presentation = slideBuilder.buildPresentation(parsed);

      assertValidPresentation(presentation);
      expect(presentation.title).toBe('Presentation Title');
    });

    test('should auto-detect format and build', () => {
      const json = '{"title": "Test", "slides": []}';
      const markdown = '# Title\n## Slide';

      const fromJson = contentParser.parse(json);
      const fromMarkdown = contentParser.parse(markdown);

      expect(fromJson).toBeDefined();
      expect(fromMarkdown).toBeDefined();

      const jsonPresentation = slideBuilder.buildPresentation(fromJson);
      const markdownPresentation = slideBuilder.buildPresentation(fromMarkdown);

      assertValidPresentation(jsonPresentation);
      assertValidPresentation(markdownPresentation);
    });
  });

  describe('End-to-End Content Pipeline', () => {
    test('should complete full pipeline: brainstorm → parse → build → structure', async () => {
      // 1. Brainstorm
      const outline = await contentBrainstormer.generateCourseOutline(
        'Machine Learning Basics',
        'intermediate',
        '10 weeks'
      );

      assertValidCourseOutline(outline);

      // 2. Expand first module content
      const firstModule = outline.modules[0];
      const expandedContent = await contentBrainstormer.expandTopicContent(
        firstModule.title,
        'detailed',
        'students'
      );

      expect(expandedContent.sections.length).toBeGreaterThan(0);

      // 3. Generate objectives
      const objectives = await contentBrainstormer.generateLearningObjectives(
        firstModule.title,
        { level: outline.level }
      );

      expect(objectives.length).toBeGreaterThan(0);

      // 4. Generate assessments
      const assessments = await contentBrainstormer.generateAssessments(
        { topic: firstModule.title },
        ['multiple-choice']
      );

      expect(assessments.length).toBeGreaterThan(0);

      // 5. Build complete presentation
      const slides = slideBuilder.buildFromOutline(outline);

      expect(slides.length).toBeGreaterThan(outline.modules.length);

      // 6. Create final structure
      const presentation = {
        title: outline.title,
        metadata: {
          description: outline.description,
          level: outline.level,
          duration: outline.duration
        },
        settings: {
          theme: 'educational',
          aspectRatio: '16:9'
        },
        slides
      };

      assertValidPresentation(presentation);

      // Verify complete structure
      expect(presentation.metadata.level).toBe('intermediate');
      expect(presentation.slides[0].type).toBe('title');
      expect(presentation.settings.theme).toBe('educational');
    });

    test('should handle errors gracefully in pipeline', async () => {
      try {
        // Invalid input
        const outline = await contentBrainstormer.generateCourseOutline(
          '',
          'invalid',
          'bad'
        );

        // Should still produce something or throw
        if (outline) {
          expect(outline).toBeDefined();
        }
      } catch (error) {
        // Error is acceptable
        expect(error).toBeDefined();
      }
    });
  });

  describe('Data Consistency', () => {
    test('should maintain data integrity through pipeline', async () => {
      const topic = 'Data Science Fundamentals';
      const level = 'intermediate';

      // Generate outline
      const outline = await contentBrainstormer.generateCourseOutline(
        topic,
        level,
        '12 weeks'
      );

      // Verify outline properties
      expect(outline.title).toContain(topic.split(' ')[0]);
      expect(outline.level).toBe(level);

      // Build slides
      const slides = slideBuilder.buildFromOutline(outline);

      // Verify slides maintain reference to source
      expect(slides[0].title).toContain(outline.title.split(' ')[0]);
    });

    test('should preserve metadata through transformation', async () => {
      const metadata = {
        level: 'advanced',
        audience: 'professionals',
        duration: '16 weeks'
      };

      const outline = await contentBrainstormer.generateCourseOutline(
        'Advanced Topics',
        metadata.level,
        metadata.duration
      );

      const presentation = {
        title: outline.title,
        metadata: {
          ...metadata,
          description: outline.description
        },
        slides: slideBuilder.buildFromOutline(outline)
      };

      expect(presentation.metadata.level).toBe(metadata.level);
      expect(presentation.metadata.duration).toBe(metadata.duration);
    });
  });

  describe('Performance', () => {
    test('should complete pipeline within reasonable time', async () => {
      const startTime = Date.now();

      const outline = await contentBrainstormer.generateCourseOutline(
        'Quick Course',
        'beginner',
        '6 weeks'
      );

      const slides = slideBuilder.buildFromOutline(outline);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete in under 5 seconds
      expect(duration).toBeLessThan(5000);
    }, 10000);

    test('should handle large course efficiently', async () => {
      const startTime = Date.now();

      const outline = await contentBrainstormer.generateCourseOutline(
        'Comprehensive Course',
        'advanced',
        '24 weeks'
      );

      const slides = slideBuilder.buildFromOutline(outline);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Even large courses should complete reasonably fast
      expect(duration).toBeLessThan(10000);
      expect(slides.length).toBeGreaterThan(15);
    }, 15000);
  });
});
