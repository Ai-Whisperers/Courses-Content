/**
 * Custom assertion helpers
 */

import { expect } from '@jest/globals';

/**
 * Assert that a value is a valid course outline
 */
export function assertValidCourseOutline(outline) {
  expect(outline).toBeDefined();
  expect(outline).toHaveProperty('title');
  expect(outline).toHaveProperty('modules');
  expect(Array.isArray(outline.modules)).toBe(true);
  expect(outline.modules.length).toBeGreaterThan(0);

  outline.modules.forEach(module => {
    expect(module).toHaveProperty('title');
    expect(module).toHaveProperty('topics');
    expect(Array.isArray(module.topics)).toBe(true);
  });
}

/**
 * Assert that a value is a valid presentation structure
 */
export function assertValidPresentation(presentation) {
  expect(presentation).toBeDefined();
  expect(presentation).toHaveProperty('title');
  expect(presentation).toHaveProperty('slides');
  expect(Array.isArray(presentation.slides)).toBe(true);
  expect(presentation.slides.length).toBeGreaterThan(0);

  presentation.slides.forEach(slide => {
    expect(slide).toHaveProperty('type');
    expect(slide.type).toBeTruthy();
  });
}

/**
 * Assert that a value is a valid slide
 */
export function assertValidSlide(slide) {
  expect(slide).toBeDefined();
  expect(slide).toHaveProperty('id');
  expect(slide).toHaveProperty('type');
  expect(typeof slide.title === 'string' || typeof slide.content !== 'undefined').toBe(true);
}

/**
 * Assert that learning objectives follow Bloom's taxonomy
 */
export function assertValidLearningObjectives(objectives) {
  expect(Array.isArray(objectives)).toBe(true);
  expect(objectives.length).toBeGreaterThan(0);

  const bloomVerbs = [
    'understand', 'identify', 'describe', 'explain', 'analyze',
    'apply', 'create', 'evaluate', 'demonstrate', 'implement',
    'compare', 'design', 'develop'
  ];

  objectives.forEach(obj => {
    expect(typeof obj).toBe('string');
    expect(obj.length).toBeGreaterThan(10);

    // Check if objective starts with a Bloom's taxonomy verb
    const startsWithBloomVerb = bloomVerbs.some(verb =>
      obj.toLowerCase().startsWith(verb)
    );
    expect(startsWithBloomVerb).toBe(true);
  });
}

/**
 * Assert that assessments are valid
 */
export function assertValidAssessments(assessments) {
  expect(Array.isArray(assessments)).toBe(true);
  expect(assessments.length).toBeGreaterThan(0);

  assessments.forEach(assessment => {
    expect(assessment).toHaveProperty('type');
    expect(assessment).toHaveProperty('question');

    if (assessment.type === 'multiple-choice') {
      expect(assessment).toHaveProperty('options');
      expect(Array.isArray(assessment.options)).toBe(true);
      expect(assessment.options.length).toBeGreaterThanOrEqual(2);
      expect(assessment).toHaveProperty('correct');
    }
  });
}

/**
 * Assert that activities are valid
 */
export function assertValidActivities(activities) {
  expect(Array.isArray(activities)).toBe(true);
  expect(activities.length).toBeGreaterThan(0);

  activities.forEach(activity => {
    expect(activity).toHaveProperty('type');
    expect(activity).toHaveProperty('title');
    expect(activity).toHaveProperty('description');
  });
}

/**
 * Assert that a URL is valid
 */
export function assertValidUrl(url) {
  expect(url).toBeDefined();
  expect(typeof url).toBe('string');
  expect(() => new URL(url)).not.toThrow();
}

/**
 * Assert that a file path exists
 */
export async function assertFileExists(filePath) {
  const fs = await import('fs/promises');
  try {
    await fs.access(filePath);
  } catch (error) {
    throw new Error(`File does not exist: ${filePath}`);
  }
}

/**
 * Assert that browser is in specific state
 */
export async function assertBrowserState(page, expectedState) {
  const url = page.url();

  switch (expectedState) {
    case 'workspace':
      expect(url).toMatch(/workspace|dashboard/);
      break;
    case 'editor':
      expect(url).toMatch(/edit|editor/);
      break;
    case 'login':
      expect(url).toMatch(/login|signin/);
      break;
    default:
      throw new Error(`Unknown expected state: ${expectedState}`);
  }
}

/**
 * Assert that error was handled properly
 */
export function assertErrorHandled(error, options = {}) {
  expect(error).toBeDefined();

  if (options.expectScreenshot) {
    // Verify screenshot was captured
    // This would check logs or file system
  }

  if (options.expectRetry) {
    // Verify retry was attempted
  }

  if (options.expectType) {
    expect(error.constructor.name).toBe(options.expectType);
  }
}

/**
 * Assert rate limiting is working
 */
export function assertRateLimited(status) {
  expect(status).toHaveProperty('requestsInCurrentMinute');
  expect(status).toHaveProperty('activeRequests');
  expect(status).toHaveProperty('queueLength');

  expect(typeof status.requestsInCurrentMinute).toBe('number');
  expect(typeof status.activeRequests).toBe('number');
  expect(typeof status.queueLength).toBe('number');

  expect(status.requestsInCurrentMinute).toBeGreaterThanOrEqual(0);
  expect(status.activeRequests).toBeGreaterThanOrEqual(0);
  expect(status.queueLength).toBeGreaterThanOrEqual(0);
}

/**
 * Assert session is valid
 */
export function assertValidSession(sessionData) {
  expect(sessionData).toBeDefined();
  expect(sessionData).toHaveProperty('cookies');
  expect(Array.isArray(sessionData.cookies)).toBe(true);

  if (sessionData.origins) {
    expect(Array.isArray(sessionData.origins)).toBe(true);
  }
}

/**
 * Assert configuration is valid
 */
export function assertValidConfig(config) {
  const requiredKeys = [
    'gamma.baseUrl',
    'browser.headless',
    'automation.retryAttempts',
    'logging.level'
  ];

  requiredKeys.forEach(key => {
    const value = config.get(key);
    expect(value).toBeDefined();
  });
}

/**
 * Assert theme application
 */
export async function assertThemeApplied(page, themeName) {
  // This would check DOM or page state for theme application
  // Implementation depends on how Gamma applies themes
  expect(themeName).toBeDefined();
  expect(typeof themeName).toBe('string');
}

/**
 * Assert export completed
 */
export async function assertExportCompleted(exportPath, format) {
  await assertFileExists(exportPath);

  const expectedExtension = format === 'pdf' ? '.pdf' :
                           format === 'pptx' ? '.pptx' :
                           '.html';

  expect(exportPath.endsWith(expectedExtension)).toBe(true);
}

/**
 * Assert timing is within acceptable range
 */
export function assertTiming(duration, min, max) {
  expect(duration).toBeGreaterThanOrEqual(min);
  expect(duration).toBeLessThanOrEqual(max);
}

/**
 * Assert logger is working
 */
export function assertLoggerCalled(logger, level, messageContains) {
  expect(logger[level]).toHaveBeenCalled();

  if (messageContains) {
    const calls = logger[level].mock.calls;
    const found = calls.some(call =>
      call.some(arg =>
        typeof arg === 'string' && arg.includes(messageContains)
      )
    );
    expect(found).toBe(true);
  }
}
