/**
 * Example: Full Gamma Automation
 * Demonstrates complete end-to-end automation with Gamma
 */

import GammaCourseCreator from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function fullAutomationExample() {
  const creator = new GammaCourseCreator({
    credentials: {
      email: process.env.GAMMA_EMAIL,
      password: process.env.GAMMA_PASSWORD
    },
    sessionName: 'full-automation-demo'
  });

  try {
    console.log('=== Full Gamma Automation Demo ===\n');

    // Example 1: Create a complete course
    console.log('1. Creating complete course presentation...\n');

    const course = await creator.createCourse({
      topic: 'Introduction to Web Development',
      level: 'beginner',
      duration: '6 weeks',
      audience: 'aspiring developers',
      theme: 'modern',
      export: false  // Set to true to export as PDF
    });

    console.log('Course created successfully!');
    console.log(`Title: ${course.outline.title}`);
    console.log(`Slides: ${course.presentation.slideCount}`);
    console.log(`URL: ${course.presentation.url}\n`);

    // Wait a bit between operations
    await sleep(3000);

    // Example 2: Create a single lecture
    console.log('2. Creating single lecture presentation...\n');

    const lecture = await creator.createLecture({
      title: 'HTML Basics',
      context: {
        course: 'Introduction to Web Development',
        module: 1,
        duration: '60 minutes'
      },
      depth: 'detailed',
      audience: 'beginners',
      theme: 'educational'
    });

    console.log('Lecture created successfully!');
    console.log(`Slides: ${lecture.presentation.slideCount}`);
    console.log(`URL: ${lecture.presentation.url}\n`);

    // Wait a bit
    await sleep(3000);

    // Example 3: Create an assessment
    console.log('3. Creating assessment presentation...\n');

    const assessment = await creator.createAssessment({
      type: 'quiz',
      content: {
        topic: 'HTML Basics',
        concepts: ['tags', 'attributes', 'semantic HTML']
      },
      questionTypes: ['multiple-choice', 'short-answer']
    });

    console.log('Assessment created successfully!');
    console.log(`Questions: ${assessment.assessments.length}\n`);

    // Health status check
    console.log('4. Checking system health...\n');
    const health = await creator.getHealthStatus();
    console.log('System Health:');
    console.log(`  Browser: ${health.browser.healthy ? '✓' : '✗'}`);
    console.log(`  Rate Limit: ${health.rateLimit.requestsInLastMinute}/${health.rateLimit.maxRequestsPerMinute} requests/min`);
    console.log(`  Active Requests: ${health.rateLimit.activeRequests}/${health.rateLimit.maxConcurrentRequests}`);

    console.log('\n=== All Operations Completed Successfully! ===');

  } catch (error) {
    console.error('Error during automation:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    console.log('\nCleaning up...');
    await creator.cleanup();
    console.log('Done!');
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the example
fullAutomationExample();
