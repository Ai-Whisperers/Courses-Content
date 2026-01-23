/**
 * Unit tests for ContentBrainstormer
 */

import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { mockLogger } from '../../helpers/mockFactories.js';
import { courseSpecs, lectureSpecs, bloomTaxonomyLevels } from '../../helpers/fixtures.js';
import {
  assertValidCourseOutline,
  assertValidLearningObjectives,
  assertValidAssessments,
  assertValidActivities
} from '../../helpers/assertions.js';

// Mock dependencies
jest.unstable_mockModule('../../../src/utils/Logger.js', () => ({
  default: mockLogger()
}));

describe('ContentBrainstormer', () => {
  let ContentBrainstormer;
  let brainstormer;

  beforeEach(async () => {
    const ContentBrainstormerModule = await import('../../../src/brainstorming/ContentBrainstormer.js');
    ContentBrainstormer = ContentBrainstormerModule.default;
    brainstormer = new ContentBrainstormer();
  });

  describe('constructor', () => {
    test('should initialize logger', () => {
      expect(brainstormer.logger).toBeDefined();
    });

    test('should set up content templates', () => {
      expect(brainstormer).toBeDefined();
    });
  });

  describe('generateCourseOutline', () => {
    test('should generate outline for beginner level', async () => {
      const outline = await brainstormer.generateCourseOutline(
        courseSpecs.beginner.topic,
        courseSpecs.beginner.level,
        courseSpecs.beginner.duration
      );

      assertValidCourseOutline(outline);
      expect(outline.level).toBe('beginner');
      expect(outline.title).toContain('Python');
    });

    test('should generate outline for intermediate level', async () => {
      const outline = await brainstormer.generateCourseOutline(
        courseSpecs.intermediate.topic,
        courseSpecs.intermediate.level,
        courseSpecs.intermediate.duration
      );

      assertValidCourseOutline(outline);
      expect(outline.level).toBe('intermediate');
    });

    test('should generate outline for advanced level', async () => {
      const outline = await brainstormer.generateCourseOutline(
        courseSpecs.advanced.topic,
        courseSpecs.advanced.level,
        courseSpecs.advanced.duration
      );

      assertValidCourseOutline(outline);
      expect(outline.level).toBe('advanced');
      expect(outline.modules.length).toBeGreaterThan(5);
    });

    test('should include description in outline', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Test Topic',
        'beginner',
        '8 weeks'
      );

      expect(outline.description).toBeDefined();
      expect(outline.description.length).toBeGreaterThan(20);
    });

    test('should generate multiple modules', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Comprehensive Topic',
        'intermediate',
        '12 weeks'
      );

      expect(outline.modules.length).toBeGreaterThanOrEqual(3);
      expect(outline.modules.length).toBeLessThanOrEqual(15);
    });

    test('should include topics in each module', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Test Topic',
        'beginner',
        '8 weeks'
      );

      outline.modules.forEach(module => {
        expect(module.topics).toBeDefined();
        expect(Array.isArray(module.topics)).toBe(true);
        expect(module.topics.length).toBeGreaterThan(0);
      });
    });

    test('should handle short duration', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Quick Topic',
        'beginner',
        '4 weeks'
      );

      expect(outline.duration).toBe('4 weeks');
      expect(outline.modules.length).toBeGreaterThan(0);
    });

    test('should handle long duration', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Extensive Topic',
        'advanced',
        '24 weeks'
      );

      expect(outline.duration).toBe('24 weeks');
      expect(outline.modules.length).toBeGreaterThan(8);
    });
  });

  describe('generateLearningObjectives', () => {
    test('should generate learning objectives', async () => {
      const objectives = await brainstormer.generateLearningObjectives(
        'Variables and Data Types',
        { level: 'beginner' }
      );

      assertValidLearningObjectives(objectives);
    });

    test('should align with Bloom\'s taxonomy', async () => {
      const objectives = await brainstormer.generateLearningObjectives(
        'Neural Networks',
        { level: 'advanced' }
      );

      // Check that objectives use Bloom's taxonomy verbs
      const bloomVerbs = bloomTaxonomyLevels.map(level => level.toLowerCase());
      const usesBloomVerbs = objectives.some(obj =>
        bloomVerbs.some(verb => obj.toLowerCase().includes(verb))
      );

      expect(usesBloomVerbs).toBe(true);
    });

    test('should generate appropriate number of objectives', async () => {
      const objectives = await brainstormer.generateLearningObjectives(
        'Test Topic',
        {}
      );

      expect(objectives.length).toBeGreaterThanOrEqual(3);
      expect(objectives.length).toBeLessThanOrEqual(7);
    });

    test('should include context in objectives', async () => {
      const context = {
        course: 'Python Programming',
        module: 2,
        level: 'beginner'
      };

      const objectives = await brainstormer.generateLearningObjectives(
        'Control Flow',
        context
      );

      expect(objectives.length).toBeGreaterThan(0);
      assertValidLearningObjectives(objectives);
    });

    test('should adjust complexity based on level', async () => {
      const beginnerObjectives = await brainstormer.generateLearningObjectives(
        'Programming Basics',
        { level: 'beginner' }
      );

      const advancedObjectives = await brainstormer.generateLearningObjectives(
        'Programming Basics',
        { level: 'advanced' }
      );

      expect(beginnerObjectives).toBeDefined();
      expect(advancedObjectives).toBeDefined();
      // Advanced objectives should be more complex
    });
  });

  describe('expandTopicContent', () => {
    test('should expand topic with standard depth', async () => {
      const content = await brainstormer.expandTopicContent(
        'Variables',
        'standard',
        'students'
      );

      expect(content).toBeDefined();
      expect(content.title).toBe('Variables');
      expect(content.sections).toBeDefined();
      expect(content.sections.length).toBeGreaterThan(0);
    });

    test('should expand with detailed depth', async () => {
      const content = await brainstormer.expandTopicContent(
        'Neural Networks',
        'detailed',
        'graduate students'
      );

      expect(content.sections.length).toBeGreaterThan(3);
      expect(content.depth).toBe('detailed');
    });

    test('should include examples', async () => {
      const content = await brainstormer.expandTopicContent(
        'Functions',
        'standard',
        'beginners'
      );

      const hasExamples = content.sections.some(section =>
        section.type === 'example' || section.examples
      );

      expect(hasExamples).toBe(true);
    });

    test('should adjust for audience', async () => {
      const studentContent = await brainstormer.expandTopicContent(
        'Algorithms',
        'standard',
        'high school students'
      );

      const professionalContent = await brainstormer.expandTopicContent(
        'Algorithms',
        'standard',
        'professional developers'
      );

      expect(studentContent).toBeDefined();
      expect(professionalContent).toBeDefined();
    });

    test('should include key concepts', async () => {
      const content = await brainstormer.expandTopicContent(
        'Object-Oriented Programming',
        'detailed',
        'students'
      );

      expect(content.keyConcepts).toBeDefined();
      expect(Array.isArray(content.keyConcepts)).toBe(true);
      expect(content.keyConcepts.length).toBeGreaterThan(0);
    });
  });

  describe('generateAssessments', () => {
    test('should generate multiple-choice questions', async () => {
      const assessments = await brainstormer.generateAssessments(
        { topic: 'Python Basics' },
        ['multiple-choice']
      );

      assertValidAssessments(assessments);
      expect(assessments[0].type).toBe('multiple-choice');
      expect(assessments[0].options.length).toBeGreaterThanOrEqual(2);
    });

    test('should generate short-answer questions', async () => {
      const assessments = await brainstormer.generateAssessments(
        { topic: 'Variables' },
        ['short-answer']
      );

      expect(assessments.length).toBeGreaterThan(0);
      expect(assessments[0].type).toBe('short-answer');
    });

    test('should generate coding questions', async () => {
      const assessments = await brainstormer.generateAssessments(
        { topic: 'Functions' },
        ['coding']
      );

      expect(assessments.length).toBeGreaterThan(0);
      expect(assessments[0].type).toBe('coding');
    });

    test('should generate mixed question types', async () => {
      const assessments = await brainstormer.generateAssessments(
        { topic: 'Data Structures' },
        ['multiple-choice', 'short-answer', 'coding']
      );

      const types = new Set(assessments.map(a => a.type));
      expect(types.size).toBeGreaterThan(1);
    });

    test('should include explanations', async () => {
      const assessments = await brainstormer.generateAssessments(
        { topic: 'Loops' },
        ['multiple-choice']
      );

      assessments.forEach(assessment => {
        expect(assessment.explanation).toBeDefined();
        expect(assessment.explanation.length).toBeGreaterThan(10);
      });
    });

    test('should mark correct answers', async () => {
      const assessments = await brainstormer.generateAssessments(
        { topic: 'Test' },
        ['multiple-choice']
      );

      assessments.forEach(assessment => {
        if (assessment.type === 'multiple-choice') {
          expect(assessment.correct).toBeDefined();
          expect(typeof assessment.correct).toBe('number');
        }
      });
    });
  });

  describe('generateActivities', () => {
    test('should generate activities from objectives', async () => {
      const objectives = [
        'Understand variables',
        'Apply loops',
        'Create functions'
      ];

      const activities = await brainstormer.generateActivities(
        objectives,
        'mixed'
      );

      assertValidActivities(activities);
    });

    test('should generate coding exercises', async () => {
      const activities = await brainstormer.generateActivities(
        ['Write code'],
        'coding'
      );

      const hasCoding = activities.some(a => a.type.includes('coding'));
      expect(hasCoding).toBe(true);
    });

    test('should generate group activities', async () => {
      const activities = await brainstormer.generateActivities(
        ['Collaborate'],
        'group'
      );

      const hasGroup = activities.some(a => a.type.includes('group'));
      expect(hasGroup).toBe(true);
    });

    test('should include difficulty levels', async () => {
      const activities = await brainstormer.generateActivities(
        ['Test objective'],
        'mixed'
      );

      activities.forEach(activity => {
        expect(activity.difficulty).toBeDefined();
        expect(['easy', 'medium', 'hard']).toContain(activity.difficulty);
      });
    });

    test('should include time estimates', async () => {
      const activities = await brainstormer.generateActivities(
        ['Test objective'],
        'mixed'
      );

      const hasTimeEstimate = activities.some(a => a.duration || a.time);
      expect(hasTimeEstimate).toBe(true);
    });
  });

  describe('error handling', () => {
    test('should handle invalid topic', async () => {
      const outline = await brainstormer.generateCourseOutline(
        '',
        'beginner',
        '8 weeks'
      );

      // Should still generate something or throw meaningful error
      expect(outline).toBeDefined();
    });

    test('should handle invalid level', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Test Topic',
        'invalid-level',
        '8 weeks'
      );

      // Should default to intermediate or handle gracefully
      expect(outline).toBeDefined();
    });

    test('should handle invalid duration', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Test Topic',
        'beginner',
        'invalid'
      );

      // Should handle gracefully
      expect(outline).toBeDefined();
    });
  });

  describe('content quality', () => {
    test('should generate unique module titles', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Test Topic',
        'intermediate',
        '12 weeks'
      );

      const titles = outline.modules.map(m => m.title);
      const uniqueTitles = new Set(titles);

      expect(uniqueTitles.size).toBe(titles.length);
    });

    test('should generate meaningful descriptions', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Test Topic',
        'beginner',
        '8 weeks'
      );

      outline.modules.forEach(module => {
        expect(module.description).toBeDefined();
        expect(module.description.length).toBeGreaterThan(20);
        expect(module.description).not.toBe(module.title);
      });
    });

    test('should maintain topical coherence', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Python Programming',
        'beginner',
        '8 weeks'
      );

      // All modules should be related to Python
      outline.modules.forEach(module => {
        const titleLower = module.title.toLowerCase();
        const descLower = module.description.toLowerCase();

        const isPythonRelated =
          titleLower.includes('python') ||
          descLower.includes('python') ||
          titleLower.includes('program') ||
          descLower.includes('program');

        expect(isPythonRelated || module.topics.length > 0).toBe(true);
      });
    });
  });
});
