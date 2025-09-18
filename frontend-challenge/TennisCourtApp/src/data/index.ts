// Main data exports for the Tennis Court Review App
// Statistics and utilities
import { getCourtStatistics } from './dataHelpers';

export { fullMockCourts as mockCourts } from './generateFullDataset';
export { allReviews as mockReviews } from './reviews';
export * from './dataHelpers';
export { mockApiService } from './mockApiService';

// Re-export types for convenience
export type { Court, Review, CourtsFilter } from '@/types';

export const APP_DATA_SUMMARY = {
  totalCourts: 65,
  totalReviews: 'Generated dynamically per court',
  dataVersion: '1.0.0',
  lastUpdated: new Date().toISOString(),
  features: [
    'Realistic court data with varied pricing and amenities',
    'Comprehensive review system with sentiment variety',
    'Geographic diversity across multiple cities and countries',
    'Surface type variety (hard, clay, grass, synthetic)',
    'Indoor and outdoor facilities',
    'Budget to premium pricing tiers',
    'Professional coaching and amenities',
    'Time slot availability simulation',
    'Advanced filtering and sorting capabilities',
    'Location-based search functionality',
  ],
};

// Usage examples
export const USAGE_EXAMPLES = {
  getAllCourts: `
    import { getAllCourts } from '@/data';
    const courts = getAllCourts();
  `,

  searchCourts: `
    import { searchCourts } from '@/data';
    const results = searchCourts('New York');
  `,

  filterByPrice: `
    import { getCourtsByPriceRange } from '@/data';
    const affordableCourts = getCourtsByPriceRange(20, 50);
  `,

  getCourtDetails: `
    import { getCourtById } from '@/data';
    const court = getCourtById('1'); // Wimbledon Tennis Club
  `,

  sortCourts: `
    import { getAllCourts, sortCourts } from '@/data';
    const courts = getAllCourts();
    const sortedByRating = sortCourts(courts, 'rating', 'desc');
  `,
};

// Export data statistics
export const getAppDataStats = () => getCourtStatistics();
