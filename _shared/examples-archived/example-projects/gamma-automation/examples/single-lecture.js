/**
 * Example: Single Lecture Creation
 * Demonstrates creating a single lecture presentation
 */

import GammaCourseCreator from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function createSingleLecture() {
  const creator = new GammaCourseCreator({
    credentials: {
      email: process.env.GAMMA_EMAIL,
      password: process.env.GAMMA_PASSWORD
    }
  });

  try {
    console.log('Creating lecture presentation...\n');

    const lecture = await creator.createLecture({
      title: 'Introduction to Neural Networks',
      context: {
        course: 'Machine Learning Fundamentals',
        module: 5,
        duration: '90 minutes'
      },
      depth: 'detailed',
      audience: 'computer science students'
    });

    console.log('Lecture created successfully!\n');
    console.log('Learning Objectives:');
    lecture.objectives.forEach((obj, i) => {
      console.log(`  ${i + 1}. ${obj}`);
    });

    console.log('\nContent Structure:');
    console.log(`  - Introduction: ${lecture.content.introduction}`);
    console.log(`  - Key Concepts: ${lecture.content.keyConcepts.length} items`);
    console.log(`  - Examples: ${lecture.content.examples.length} items`);
    console.log(`  - Exercises: ${lecture.content.exercises.length} items`);
    console.log(`  - Resources: ${lecture.content.resources.length} items`);

    console.log('\n' + lecture.message);

  } catch (error) {
    console.error('Error creating lecture:', error.message);
  } finally {
    await creator.cleanup();
  }
}

// Run the example
createSingleLecture();
