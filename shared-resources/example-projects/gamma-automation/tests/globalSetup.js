/**
 * Global setup for Jest
 * Runs once before all tests
 */

export default async function globalSetup() {
  console.log('\n🚀 Starting Gamma Automation Test Suite\n');

  // Setup test environment
  process.env.NODE_ENV = 'test';

  // Create necessary directories
  const fs = await import('fs');
  const path = await import('path');

  const dirs = [
    'logs/test',
    'screenshots/test',
    'exports/test',
    'sessions/test'
  ];

  for (const dir of dirs) {
    const fullPath = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }

  console.log('✅ Test environment initialized\n');
}
