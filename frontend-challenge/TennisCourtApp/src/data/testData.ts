// Test file to validate the mock data system
import { mockCourts, getAllCourts, searchCourts, filterCourts } from './index';

// Test basic data access
console.log('=== MOCK DATA SYSTEM TEST ===\n');

console.log(`Total courts generated: ${mockCourts.length}`);

// Test enhanced data access
const enhancedCourts = getAllCourts();
console.log(`Enhanced courts: ${enhancedCourts.length}`);

// Test search functionality
const nycCourts = searchCourts('New York');
console.log(`Courts found for "New York": ${nycCourts.length}`);

// Test filtering
const clayCourts = filterCourts({ surface: 'clay' });
console.log(`Clay courts: ${clayCourts.length}`);

const premiumCourts = filterCourts({ minPrice: 60 });
console.log(`Premium courts ($60+): ${premiumCourts.length}`);

// Test surface distribution
const surfaceStats = mockCourts.reduce((acc, court) => {
  acc[court.surface] = (acc[court.surface] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log('\nSurface distribution:');
Object.entries(surfaceStats).forEach(([surface, count]) => {
  console.log(`  ${surface}: ${count} courts`);
});

// Test price distribution
const priceRanges = {
  budget: mockCourts.filter(c => c.pricePerHour < 30).length,
  midRange: mockCourts.filter(c => c.pricePerHour >= 30 && c.pricePerHour < 60).length,
  premium: mockCourts.filter(c => c.pricePerHour >= 60).length
};

console.log('\nPrice distribution:');
console.log(`  Budget (<$30): ${priceRanges.budget} courts`);
console.log(`  Mid-range ($30-60): ${priceRanges.midRange} courts`);
console.log(`  Premium ($60+): ${priceRanges.premium} courts`);

// Test rating distribution
const avgRating = mockCourts.reduce((sum, court) => sum + court.rating, 0) / mockCourts.length;
console.log(`\nAverage rating: ${avgRating.toFixed(2)}`);

// Test indoor/outdoor distribution
const indoorCount = mockCourts.filter(c => c.indoor).length;
console.log(`Indoor courts: ${indoorCount}`);
console.log(`Outdoor courts: ${mockCourts.length - indoorCount}`);

console.log('\n=== SAMPLE COURT DATA ===');
if (mockCourts.length > 0) {
  const sampleCourt = mockCourts[0];
  console.log(JSON.stringify({
    id: sampleCourt.id,
    name: sampleCourt.name,
    location: sampleCourt.location,
    surface: sampleCourt.surface,
    pricePerHour: sampleCourt.pricePerHour,
    rating: sampleCourt.rating,
    numberOfCourts: sampleCourt.numberOfCourts,
    amenitiesCount: sampleCourt.amenities.length
  }, null, 2));
}

console.log('\n✅ Mock data system test completed successfully!');