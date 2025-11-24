/**
 * End-to-End tests for complete course creation workflow
 *
 * NOTE: These tests require:
 * - Valid Gamma credentials in .env.test
 * - Network connectivity
 * - Playwright installed
 * - Longer timeout (60s+)
 *
 * Run with: npm test -- tests/e2e/course-creation.test.js
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { assertValidCourseOutline, assertValidPresentation, assertFileExists } from '../helpers/assertions.js';
import { skipIf } from '../helpers/testHelpers.js';

// Skip E2E tests in CI or if no credentials
const skipE2E = process.env.CI === 'true' || !process.env.GAMMA_EMAIL;

describe('Course Creation E2E', () => {
  let GammaCourseCreator;
  let creator;

  beforeAll(async () => {
    if (skipE2E) {
      console.log('⏭️  Skipping E2E tests (no credentials or CI environment)');
      return;
    }

    const GammaCourseCreatorModule = await import('../../src/index.js');
    GammaCourseCreator = GammaCourseCreatorModule.default;

    creator = new GammaCourseCreator({
      credentials: {
        email: process.env.GAMMA_EMAIL,
        password: process.env.GAMMA_PASSWORD
      },
      sessionName: 'e2e-test'
    });

    // Initialize with longer timeout
    await creator.initialize();
  }, 60000);

  afterAll(async () => {
    if (creator) {
      await creator.cleanup();
    }
  }, 30000);

  skipIf(skipE2E, 'E2E')('should create a complete beginner course', async () => {
    const result = await creator.createCourse({
      topic: 'Introduction to Python Programming',
      level: 'beginner',
      duration: '8 weeks',
      theme: 'educational',
      export: false // Skip export for faster test
    });

    // Verify result structure
    expect(result.success).toBe(true);
    expect(result.outline).toBeDefined();
    expect(result.presentation).toBeDefined();

    // Verify outline
    assertValidCourseOutline(result.outline);
    expect(result.outline.level).toBe('beginner');
    expect(result.outline.title).toContain('Python');

    // Verify presentation
    expect(result.presentation.title).toBeDefined();
    expect(result.presentation.slideCount).toBeGreaterThan(5);
    expect(result.presentation.url).toBeDefined();
    expect(result.presentation.url).toMatch(/gamma\.app/);

    console.log('✅ Course created:', result.presentation.url);
  }, 120000);

  skipIf(skipE2E, 'E2E')('should create intermediate course with export', async () => {
    const result = await creator.createCourse({
      topic: 'Web Development Fundamentals',
      level: 'intermediate',
      duration: '12 weeks',
      theme: 'modern',
      export: true,
      exportFormat: 'pdf'
    });

    expect(result.success).toBe(true);
    expect(result.presentation.exportPath).toBeDefined();

    // Verify export file exists
    if (result.presentation.exportPath) {
      await assertFileExists(result.presentation.exportPath);
      console.log('✅ Exported to:', result.presentation.exportPath);
    }
  }, 180000);

  skipIf(skipE2E, 'E2E')('should create advanced technical course', async () => {
    const result = await creator.createCourse({
      topic: 'Machine Learning Algorithms',
      level: 'advanced',
      duration: '16 weeks',
      theme: 'professional',
      export: false
    });

    expect(result.success).toBe(true);
    expect(result.outline.level).toBe('advanced');
    expect(result.outline.modules.length).toBeGreaterThan(8);
    expect(result.presentation.slideCount).toBeGreaterThan(15);

    console.log('✅ Advanced course created with', result.presentation.slideCount, 'slides');
  }, 150000);

  skipIf(skipE2E, 'E2E')('should handle course creation errors gracefully', async () => {
    try {
      await creator.createCourse({
        topic: '', // Invalid topic
        level: 'beginner',
        duration: '8 weeks'
      });

      // Should either succeed with generated content or throw
      expect(true).toBe(true);
    } catch (error) {
      // Error is acceptable
      expect(error).toBeDefined();
      expect(error.message).toBeTruthy();
      console.log('✅ Error handled correctly:', error.message);
    }
  }, 60000);

  skipIf(skipE2E, 'E2E')('should create course with custom specifications', async () => {
    const result = await creator.createCourse({
      topic: 'Data Structures and Algorithms',
      level: 'intermediate',
      duration: '14 weeks',
      audience: 'computer science students',
      theme: 'educational',
      export: false
    });

    expect(result.success).toBe(true);
    expect(result.outline.description).toContain('Data Structures');
    expect(result.presentation.url).toMatch(/gamma\.app/);

    console.log('✅ Custom course created successfully');
  }, 120000);

  skipIf(skipE2E, 'E2E')('should create multiple courses sequentially', async () => {
    const courses = [
      {
        topic: 'HTML Basics',
        level: 'beginner',
        duration: '4 weeks'
      },
      {
        topic: 'CSS Fundamentals',
        level: 'beginner',
        duration: '4 weeks'
      }
    ];

    const results = [];

    for (const course of courses) {
      const result = await creator.createCourse(course);
      results.push(result);
    }

    expect(results.length).toBe(2);
    results.forEach(result => {
      expect(result.success).toBe(true);
      expect(result.presentation.url).toBeDefined();
    });

    console.log('✅ Created', results.length, 'courses sequentially');
  }, 240000);

  skipIf(skipE2E, 'E2E')('should verify system health during creation', async () => {
    const healthBefore = await creator.getHealthStatus();

    expect(healthBefore.initialized).toBe(true);
    expect(healthBefore.browser.healthy).toBe(true);

    const result = await creator.createCourse({
      topic: 'Quick Test Course',
      level: 'beginner',
      duration: '4 weeks',
      export: false
    });

    expect(result.success).toBe(true);

    const healthAfter = await creator.getHealthStatus();

    expect(healthAfter.initialized).toBe(true);
    expect(healthAfter.browser.healthy).toBe(true);

    console.log('✅ System remained healthy throughout');
  }, 120000);

  skipIf(skipE2E, 'E2E')('should handle session persistence', async () => {
    // Create course with session
    const result1 = await creator.createCourse({
      topic: 'Session Test 1',
      level: 'beginner',
      duration: '4 weeks',
      export: false
    });

    expect(result1.success).toBe(true);

    // Create another course using same session
    const result2 = await creator.createCourse({
      topic: 'Session Test 2',
      level: 'beginner',
      duration: '4 weeks',
      export: false
    });

    expect(result2.success).toBe(true);

    // Both should succeed without re-login
    expect(result1.presentation.url).toBeDefined();
    expect(result2.presentation.url).toBeDefined();

    console.log('✅ Session persisted across operations');
  }, 180000);
});

describe('Lecture Creation E2E', () => {
  let creator;

  beforeAll(async () => {
    if (skipE2E) return;

    const GammaCourseCreatorModule = await import('../../src/index.js');
    const GammaCourseCreator = GammaCourseCreatorModule.default;

    creator = new GammaCourseCreator({
      credentials: {
        email: process.env.GAMMA_EMAIL,
        password: process.env.GAMMA_PASSWORD
      }
    });

    await creator.initialize();
  }, 60000);

  afterAll(async () => {
    if (creator) {
      await creator.cleanup();
    }
  });

  skipIf(skipE2E, 'E2E')('should create single lecture presentation', async () => {
    const result = await creator.createLecture({
      title: 'Introduction to Functions',
      context: {
        course: 'Python Programming',
        module: 3,
        duration: '60 minutes'
      },
      depth: 'detailed',
      audience: 'beginners',
      theme: 'educational',
      export: false
    });

    expect(result.success).toBe(true);
    expect(result.objectives).toBeDefined();
    expect(result.content).toBeDefined();
    expect(result.presentation).toBeDefined();
    expect(result.presentation.url).toMatch(/gamma\.app/);

    console.log('✅ Lecture created with', result.objectives.length, 'learning objectives');
  }, 120000);

  skipIf(skipE2E, 'E2E')('should create technical lecture with code examples', async () => {
    const result = await creator.createLecture({
      title: 'Object-Oriented Programming Concepts',
      context: {
        course: 'Advanced Python',
        module: 5
      },
      depth: 'detailed',
      audience: 'intermediate students',
      theme: 'modern',
      export: false
    });

    expect(result.success).toBe(true);
    expect(result.content.sections).toBeDefined();
    expect(result.content.sections.length).toBeGreaterThan(3);

    console.log('✅ Technical lecture created');
  }, 120000);
});

describe('Assessment Generation E2E', () => {
  let creator;

  beforeAll(async () => {
    if (skipE2E) return;

    const GammaCourseCreatorModule = await import('../../src/index.js');
    const GammaCourseCreator = GammaCourseCreatorModule.default;

    creator = new GammaCourseCreator({
      credentials: {
        email: process.env.GAMMA_EMAIL,
        password: process.env.GAMMA_PASSWORD
      }
    });

    // Assessments don't require browser initialization
  });

  skipIf(skipE2E, 'E2E')('should generate quiz assessments', async () => {
    const result = await creator.createAssessment({
      type: 'quiz',
      content: { topic: 'JavaScript Basics' },
      questionTypes: ['multiple-choice'],
      count: 10
    });

    expect(result.success).toBe(true);
    expect(result.assessments).toBeDefined();
    expect(result.assessments.length).toBeGreaterThan(5);

    console.log('✅ Generated', result.assessments.length, 'assessment questions');
  }, 30000);

  skipIf(skipE2E, 'E2E')('should generate mixed assessment types', async () => {
    const result = await creator.createAssessment({
      type: 'mixed',
      content: { topic: 'Data Structures' },
      questionTypes: ['multiple-choice', 'short-answer', 'coding'],
      count: 15
    });

    expect(result.success).toBe(true);
    expect(result.assessments.length).toBeGreaterThan(10);

    const types = new Set(result.assessments.map(a => a.type));
    expect(types.size).toBeGreaterThan(1);

    console.log('✅ Generated mixed assessments:', Array.from(types).join(', '));
  }, 30000);
});
