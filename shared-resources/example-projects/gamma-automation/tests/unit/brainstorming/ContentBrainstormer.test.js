/**
 * Unit tests for ContentBrainstormer
 */

import { describe, test, expect, beforeEach } from '@jest/globals';

describe('ContentBrainstormer', () => {
  let ContentBrainstormer;
  let brainstormer;

  beforeEach(async () => {
    // Import ContentBrainstormer module
    const BrainstormerModule = await import('../../../src/brainstorming/ContentBrainstormer.js');
    ContentBrainstormer = BrainstormerModule.default;
    brainstormer = new ContentBrainstormer();
  });

  describe('initialization', () => {
    test('should create instance', () => {
      expect(brainstormer).toBeDefined();
      expect(brainstormer).toBeInstanceOf(ContentBrainstormer);
    });

    test('should have required methods', () => {
      expect(typeof brainstormer.generateCourseOutline).toBe('function');
      expect(typeof brainstormer.generateLearningObjectives).toBe('function');
      expect(typeof brainstormer.expandTopicContent).toBe('function');
      expect(typeof brainstormer.generateAssessments).toBe('function');
      expect(typeof brainstormer.generateActivities).toBe('function');
    });
  });

  describe('generateCourseOutline', () => {
    test('should generate course outline', async () => {
      const outline = await brainstormer.generateCourseOutline(
        'Introduction to Python',
        'beginner',
        '8 weeks'
      );

      expect(outline).toBeDefined();
      expect(outline).toHaveProperty('title');
      expect(outline).toHaveProperty('level');
      expect(outline).toHaveProperty('duration');
      expect(outline).toHaveProperty('modules');
    });

    test('should include topic in title', async () => {
      const topic = 'Web Development';
      const outline = await brainstormer.generateCourseOutline(topic, 'intermediate', '10 weeks');

      expect(outline.title).toContain(topic);
    });

    test('should set correct level', async () => {
      const levels = ['beginner', 'intermediate', 'advanced'];

      for (const level of levels) {
        const outline = await brainstormer.generateCourseOutline('Test Topic', level, '6 weeks');
        expect(outline.level).toBe(level);
      }
    });

    test('should set correct duration', async () => {
      const duration = '12 weeks';
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', duration);

      expect(outline.duration).toBe(duration);
    });

    test('should generate modules array', async () => {
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', '8 weeks');

      expect(Array.isArray(outline.modules)).toBe(true);
      expect(outline.modules.length).toBeGreaterThan(0);
    });

    test('should have learning outcomes', async () => {
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', '8 weeks');

      expect(outline).toHaveProperty('learningOutcomes');
      expect(Array.isArray(outline.learningOutcomes)).toBe(true);
    });

    test('should have prerequisites', async () => {
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', '8 weeks');

      expect(outline).toHaveProperty('prerequisites');
      expect(Array.isArray(outline.prerequisites)).toBe(true);
    });

    test('should generate appropriate module count for duration', async () => {
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', '8 weeks');

      // Should generate reasonable number of modules
      expect(outline.modules.length).toBeGreaterThan(0);
      expect(outline.modules.length).toBeLessThanOrEqual(12);
    });

    test('each module should have required properties', async () => {
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', '8 weeks');

      outline.modules.forEach(module => {
        expect(module).toHaveProperty('number');
        expect(module).toHaveProperty('title');
        expect(module).toHaveProperty('duration');
        expect(module).toHaveProperty('topics');
      });
    });

    test('modules should be numbered sequentially', async () => {
      const outline = await brainstormer.generateCourseOutline('Test Topic', 'beginner', '8 weeks');

      outline.modules.forEach((module, index) => {
        expect(module.number).toBe(index + 1);
      });
    });
  });

  describe('generateLearningObjectives', () => {
    test('should generate learning objectives', async () => {
      const objectives = await brainstormer.generateLearningObjectives('Variables and Data Types');

      expect(objectives).toBeDefined();
      expect(Array.isArray(objectives)).toBe(true);
      expect(objectives.length).toBeGreaterThan(0);
    });

    test('should accept context parameter', async () => {
      const context = { level: 'beginner', audience: 'students' };
      const objectives = await brainstormer.generateLearningObjectives('Functions', context);

      expect(Array.isArray(objectives)).toBe(true);
    });

    test('objectives should be strings', async () => {
      const objectives = await brainstormer.generateLearningObjectives('Loops');

      objectives.forEach(objective => {
        expect(typeof objective).toBe('string');
        expect(objective.length).toBeGreaterThan(0);
      });
    });

    test('should generate multiple objectives', async () => {
      const objectives = await brainstormer.generateLearningObjectives('Arrays');

      expect(objectives.length).toBeGreaterThan(1);
    });
  });

  describe('expandTopicContent', () => {
    test('should expand topic content', async () => {
      const content = await brainstormer.expandTopicContent('Variables', 'detailed', 'students');

      expect(content).toBeDefined();
      expect(typeof content).toBe('object');
    });

    test('should include introduction', async () => {
      const content = await brainstormer.expandTopicContent('Functions');

      expect(content).toHaveProperty('introduction');
      expect(typeof content.introduction).toBe('string');
    });

    test('should include key concepts', async () => {
      const content = await brainstormer.expandTopicContent('Loops');

      expect(content).toHaveProperty('keyConcepts');
      expect(Array.isArray(content.keyConcepts)).toBe(true);
    });

    test('should include examples', async () => {
      const content = await brainstormer.expandTopicContent('Conditionals');

      expect(content).toHaveProperty('examples');
      expect(Array.isArray(content.examples)).toBe(true);
    });

    test('should include exercises', async () => {
      const content = await brainstormer.expandTopicContent('Lists');

      expect(content).toHaveProperty('exercises');
      expect(Array.isArray(content.exercises)).toBe(true);
    });

    test('should include resources', async () => {
      const content = await brainstormer.expandTopicContent('Dictionaries');

      expect(content).toHaveProperty('resources');
      expect(Array.isArray(content.resources)).toBe(true);
    });

    test('should accept depth parameter', async () => {
      const depths = ['brief', 'detailed', 'comprehensive'];

      for (const depth of depths) {
        const content = await brainstormer.expandTopicContent('Test Topic', depth);
        expect(content).toBeDefined();
      }
    });

    test('should accept audience parameter', async () => {
      const content = await brainstormer.expandTopicContent(
        'Test Topic',
        'detailed',
        'professionals'
      );

      expect(content).toBeDefined();
    });
  });

  describe('generateAssessments', () => {
    test('should generate assessments', async () => {
      const content = { title: 'Test Content' };
      const assessments = await brainstormer.generateAssessments(content);

      expect(assessments).toBeDefined();
      expect(Array.isArray(assessments)).toBe(true);
    });

    test('should generate multiple choice questions', async () => {
      const content = { title: 'Test' };
      const assessments = await brainstormer.generateAssessments(content, ['multiple-choice']);

      const mcQuestions = assessments.filter(a => a.type === 'multiple-choice');
      expect(mcQuestions.length).toBeGreaterThan(0);
    });

    test('should generate short answer questions', async () => {
      const content = { title: 'Test' };
      const assessments = await brainstormer.generateAssessments(content, ['short-answer']);

      const saQuestions = assessments.filter(a => a.type === 'short-answer');
      expect(saQuestions.length).toBeGreaterThan(0);
    });

    test('should generate coding exercises', async () => {
      const content = { title: 'Test' };
      const assessments = await brainstormer.generateAssessments(content, ['coding']);

      const codingEx = assessments.filter(a => a.type === 'coding');
      expect(codingEx.length).toBeGreaterThan(0);
    });

    test('should handle multiple question types', async () => {
      const content = { title: 'Test' };
      const types = ['multiple-choice', 'short-answer', 'coding'];
      const assessments = await brainstormer.generateAssessments(content, types);

      const uniqueTypes = [...new Set(assessments.map(a => a.type))];
      expect(uniqueTypes.length).toBeGreaterThan(1);
    });

    test('multiple choice should have correct structure', async () => {
      const content = { title: 'Test' };
      const assessments = await brainstormer.generateAssessments(content, ['multiple-choice']);

      const mcQuestion = assessments.find(a => a.type === 'multiple-choice');

      expect(mcQuestion).toHaveProperty('question');
      expect(mcQuestion).toHaveProperty('options');
      expect(mcQuestion).toHaveProperty('correct');
      expect(Array.isArray(mcQuestion.options)).toBe(true);
    });
  });

  describe('generateActivities', () => {
    test('should generate activities', async () => {
      const objectives = ['Learn basics', 'Practice skills'];
      const activities = await brainstormer.generateActivities(objectives);

      expect(activities).toBeDefined();
      expect(Array.isArray(activities)).toBe(true);
      expect(activities.length).toBeGreaterThan(0);
    });

    test('should accept format parameter', async () => {
      const objectives = ['Learn basics'];
      const formats = ['mixed', 'individual', 'group'];

      for (const format of formats) {
        const activities = await brainstormer.generateActivities(objectives, format);
        expect(Array.isArray(activities)).toBe(true);
      }
    });

    test('each activity should have type', async () => {
      const objectives = ['Learn basics'];
      const activities = await brainstormer.generateActivities(objectives);

      activities.forEach(activity => {
        expect(activity).toHaveProperty('type');
        expect(typeof activity.type).toBe('string');
      });
    });

    test('each activity should have title', async () => {
      const objectives = ['Learn basics'];
      const activities = await brainstormer.generateActivities(objectives);

      activities.forEach(activity => {
        expect(activity).toHaveProperty('title');
        expect(typeof activity.title).toBe('string');
      });
    });

    test('each activity should have description', async () => {
      const objectives = ['Learn basics'];
      const activities = await brainstormer.generateActivities(objectives);

      activities.forEach(activity => {
        expect(activity).toHaveProperty('description');
        expect(typeof activity.description).toBe('string');
      });
    });

    test('should generate multiple activities', async () => {
      const objectives = ['Objective 1', 'Objective 2'];
      const activities = await brainstormer.generateActivities(objectives);

      expect(activities.length).toBeGreaterThan(1);
    });
  });

  describe('prerequisites determination', () => {
    test('beginner level should have basic prerequisites', async () => {
      const outline = await brainstormer.generateCourseOutline('Test', 'beginner', '8 weeks');

      expect(outline.prerequisites.length).toBeGreaterThan(0);
      expect(outline.prerequisites).toContain('Basic computer literacy');
    });

    test('intermediate level should have more prerequisites', async () => {
      const outline = await brainstormer.generateCourseOutline('Test', 'intermediate', '8 weeks');

      expect(outline.prerequisites.length).toBeGreaterThan(0);
    });

    test('advanced level should have advanced prerequisites', async () => {
      const outline = await brainstormer.generateCourseOutline('Test', 'advanced', '8 weeks');

      expect(outline.prerequisites.length).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    test('should handle empty topic gracefully', async () => {
      await expect(brainstormer.generateCourseOutline('', 'beginner', '8 weeks'))
        .resolves.toBeDefined();
    });

    test('should handle missing parameters with defaults', async () => {
      await expect(brainstormer.generateCourseOutline('Test Topic'))
        .resolves.toBeDefined();
    });

    test('should handle expandTopicContent with minimal params', async () => {
      await expect(brainstormer.expandTopicContent('Topic'))
        .resolves.toBeDefined();
    });

    test('should handle generateActivities with empty objectives', async () => {
      await expect(brainstormer.generateActivities([]))
        .resolves.toBeDefined();
    });
  });
});
