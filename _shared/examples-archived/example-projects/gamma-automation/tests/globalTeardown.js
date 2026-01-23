/**
 * Global teardown for Jest
 * Runs once after all tests
 */

export default async function globalTeardown() {
  console.log('\n🏁 Test Suite Complete\n');

  // Cleanup test artifacts if needed
  // (keeping them for debugging purposes by default)

  console.log('✅ Cleanup complete\n');
}
