// Simple test to verify the generated data
const { fullMockCourts } = require('./src/data/generateFullDataset');

console.log('=== MOCK DATA SYSTEM TEST ===\n');
console.log(`Total courts generated: ${fullMockCourts.length}`);

// Test surface distribution
const surfaceStats = fullMockCourts.reduce((acc, court) => {
  acc[court.surface] = (acc[court.surface] || 0) + 1;
  return acc;
}, {});

console.log('\nSurface distribution:');
Object.entries(surfaceStats).forEach(([surface, count]) => {
  console.log(`  ${surface}: ${count} courts`);
});

// Test price distribution
const priceRanges = {
  budget: fullMockCourts.filter(c => c.pricePerHour < 30).length,
  midRange: fullMockCourts.filter(c => c.pricePerHour >= 30 && c.pricePerHour < 60).length,
  premium: fullMockCourts.filter(c => c.pricePerHour >= 60).length
};

console.log('\nPrice distribution:');
console.log(`  Budget (<$30): ${priceRanges.budget} courts`);
console.log(`  Mid-range ($30-60): ${priceRanges.midRange} courts`);
console.log(`  Premium ($60+): ${priceRanges.premium} courts`);

// Test rating distribution
const avgRating = fullMockCourts.reduce((sum, court) => sum + court.rating, 0) / fullMockCourts.length;
console.log(`\nAverage rating: ${avgRating.toFixed(2)}`);

// Test indoor/outdoor distribution
const indoorCount = fullMockCourts.filter(c => c.indoor).length;
console.log(`Indoor courts: ${indoorCount}`);
console.log(`Outdoor courts: ${fullMockCourts.length - indoorCount}`);

console.log('\n=== SAMPLE COURT DATA ===');
if (fullMockCourts.length > 0) {
  const sampleCourt = fullMockCourts[0];
  console.log(JSON.stringify({
    id: sampleCourt.id,
    name: sampleCourt.name,
    location: sampleCourt.location,
    surface: sampleCourt.surface,
    pricePerHour: sampleCourt.pricePerHour,
    rating: sampleCourt.rating,
    numberOfCourts: sampleCourt.numberOfCourts,
    amenitiesCount: sampleCourt.amenities.length,
    hasCoordinates: !!sampleCourt.coordinates,
    hasPhoneNumber: !!sampleCourt.phoneNumber
  }, null, 2));
}

console.log('\n✅ Mock data system test completed successfully!');