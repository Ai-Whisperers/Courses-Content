/**
 * Example: Content Brainstorming Only
 * Demonstrates brainstorming without browser automation
 */

import { ContentBrainstormer } from '../src/index.js';

async function brainstormCourseContent() {
  const brainstormer = new ContentBrainstormer();

  try {
    console.log('=== Course Brainstorming Demo ===\n');

    // 1. Generate course outline
    console.log('1. Generating course outline...\n');
    const outline = await brainstormer.generateCourseOutline(
      'Web Development with React',
      'intermediate',
      '12 weeks'
    );

    console.log(`Course: ${outline.title}`);
    console.log(`Level: ${outline.level}`);
    console.log(`Duration: ${outline.duration}`);
    console.log(`\nModules: ${outline.modules.length}`);

    // 2. Generate learning objectives for first module
    console.log('\n2. Generating learning objectives...\n');
    const objectives = await brainstormer.generateLearningObjectives(
      outline.modules[0].title,
      { level: 'intermediate' }
    );

    console.log('Learning Objectives:');
    objectives.forEach((obj, i) => console.log(`  ${i + 1}. ${obj}`));

    // 3. Expand topic content
    console.log('\n3. Expanding topic content...\n');
    const expandedContent = await brainstormer.expandTopicContent(
      'React Components',
      'detailed',
      'web developers'
    );

    console.log('Expanded Content Structure:');
    console.log(`  - Introduction: ${expandedContent.introduction}`);
    console.log(`  - Key Concepts: ${expandedContent.keyConcepts.length}`);
    console.log(`  - Examples: ${expandedContent.examples.length}`);
    console.log(`  - Exercises: ${expandedContent.exercises.length}`);

    // 4. Generate assessments
    console.log('\n4. Generating assessments...\n');
    const assessments = await brainstormer.generateAssessments(
      expandedContent,
      ['multiple-choice', 'short-answer', 'coding']
    );

    console.log(`Generated ${assessments.length} assessment questions:`);
    const byType = assessments.reduce((acc, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1;
      return acc;
    }, {});
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count} questions`);
    });

    // 5. Generate interactive activities
    console.log('\n5. Generating interactive activities...\n');
    const activities = await brainstormer.generateActivities(
      objectives,
      'mixed'
    );

    console.log(`Generated ${activities.length} activities:`);
    activities.forEach((activity, i) => {
      console.log(`  ${i + 1}. ${activity.title} (${activity.type}) - ${activity.duration}`);
    });

    console.log('\n=== Brainstorming Complete ===');

  } catch (error) {
    console.error('Error during brainstorming:', error.message);
  }
}

// Run the example
brainstormCourseContent();
