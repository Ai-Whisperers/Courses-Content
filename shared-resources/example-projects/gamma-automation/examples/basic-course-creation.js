/**
 * Example: Basic Course Creation
 * Demonstrates how to create a complete course from a topic
 */

import GammaCourseCreator from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function createBasicCourse() {
  const creator = new GammaCourseCreator({
    credentials: {
      email: process.env.GAMMA_EMAIL,
      password: process.env.GAMMA_PASSWORD
    }
  });

  try {
    console.log('Starting course creation...\n');

    // Create a complete course
    const course = await creator.createCourse({
      topic: 'Introduction to Python Programming',
      level: 'beginner',
      duration: '8 weeks',
      audience: 'high school students'
    });

    console.log('Course created successfully!');
    console.log(`\nCourse Title: ${course.outline.title}`);
    console.log(`Level: ${course.outline.level}`);
    console.log(`Duration: ${course.outline.duration}`);
    console.log(`\nModules (${course.outline.modules.length}):`);

    course.outline.modules.forEach((module, index) => {
      console.log(`  ${index + 1}. ${module.title} - ${module.duration}`);
    });

    console.log(`\nLearning Outcomes:`);
    course.outline.learningOutcomes.forEach((outcome, index) => {
      console.log(`  ${index + 1}. ${outcome}`);
    });

    console.log(`\nPrerequisites:`);
    course.outline.prerequisites.forEach((prereq, index) => {
      console.log(`  ${index + 1}. ${prereq}`);
    });

  } catch (error) {
    console.error('Error creating course:', error.message);
  } finally {
    await creator.cleanup();
  }
}

// Run the example
createBasicCourse();
