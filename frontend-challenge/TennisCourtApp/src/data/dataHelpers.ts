import type { Court, CourtsFilter, Review } from '@/types';
import { fullMockCourts } from './generateFullDataset';
import { allReviews } from './reviews';

/**
 * Enhanced Court interface with calculated fields
 */
export interface EnhancedCourt extends Court {
  averageRating: number;
  totalReviews: number;
  reviewSummary: {
    excellent: number; // 5 stars
    good: number; // 4 stars
    average: number; // 3 stars
    poor: number; // 2 stars
    terrible: number; // 1 star
  };
}

/**
 * Get court by ID with reviews attached
 */
export const getCourtById = (courtId: string): EnhancedCourt | null => {
  const court = fullMockCourts.find(c => c.id === courtId);
  if (!court) return null;

  const courtReviews = allReviews.filter(r => r.courtId === courtId);

  // Calculate rating distribution
  const reviewSummary = {
    excellent: courtReviews.filter(r => r.rating === 5).length,
    good: courtReviews.filter(r => r.rating === 4).length,
    average: courtReviews.filter(r => r.rating === 3).length,
    poor: courtReviews.filter(r => r.rating === 2).length,
    terrible: courtReviews.filter(r => r.rating === 1).length,
  };

  const totalReviews = courtReviews.length;
  const averageRating =
    totalReviews > 0
      ? courtReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : court.rating;

  return {
    ...court,
    reviews: courtReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
    reviewSummary,
  };
};

/**
 * Get all courts with enhanced data
 */
export const getAllCourts = (): EnhancedCourt[] => {
  return fullMockCourts.map(court => {
    const enhanced = getCourtById(court.id);
    return enhanced!;
  });
};

/**
 * Filter courts based on criteria
 */
export const filterCourts = (
  filters: CourtsFilter,
  courts: EnhancedCourt[] = getAllCourts()
): EnhancedCourt[] => {
  return courts.filter(court => {
    // Surface filter
    if (filters.surface && court.surface !== filters.surface) {
      return false;
    }

    // Indoor filter
    if (filters.indoor !== undefined && court.indoor !== filters.indoor) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && court.pricePerHour < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && court.pricePerHour > filters.maxPrice) {
      return false;
    }

    // Rating filter
    if (filters.minRating && court.averageRating < filters.minRating) {
      return false;
    }

    // Location filter (partial match)
    if (filters.location) {
      const searchLocation = filters.location.toLowerCase();
      const courtLocation = court.location.toLowerCase();
      const courtAddress = court.address.toLowerCase();

      if (
        !courtLocation.includes(searchLocation) &&
        !courtAddress.includes(searchLocation)
      ) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort courts by various criteria
 */
export type SortCriteria =
  | 'rating'
  | 'price'
  | 'name'
  | 'reviewCount'
  | 'distance';
export type SortOrder = 'asc' | 'desc';

export const sortCourts = (
  courts: EnhancedCourt[],
  criteria: SortCriteria,
  order: SortOrder = 'desc'
): EnhancedCourt[] => {
  const sortedCourts = [...courts];

  sortedCourts.sort((a, b) => {
    let comparison = 0;

    switch (criteria) {
      case 'rating':
        comparison = a.averageRating - b.averageRating;
        break;
      case 'price':
        comparison = a.pricePerHour - b.pricePerHour;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'reviewCount':
        comparison = a.totalReviews - b.totalReviews;
        break;
      case 'distance':
        // For distance, you'd typically need user location
        // For now, we'll sort by ID as a placeholder
        comparison = parseInt(a.id) - parseInt(b.id);
        break;
      default:
        comparison = 0;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sortedCourts;
};

/**
 * Search courts by name or location
 */
export const searchCourts = (
  query: string,
  courts: EnhancedCourt[] = getAllCourts()
): EnhancedCourt[] => {
  if (!query.trim()) return courts;

  const searchTerm = query.toLowerCase().trim();

  return courts.filter(
    court =>
      court.name.toLowerCase().includes(searchTerm) ||
      court.location.toLowerCase().includes(searchTerm) ||
      court.address.toLowerCase().includes(searchTerm) ||
      court.amenities.some(amenity =>
        amenity.toLowerCase().includes(searchTerm)
      )
  );
};

/**
 * Get courts within a price range
 */
export const getCourtsByPriceRange = (
  minPrice: number,
  maxPrice: number
): EnhancedCourt[] => {
  return filterCourts({ minPrice, maxPrice });
};

/**
 * Get courts by rating threshold
 */
export const getCourtsByRating = (minRating: number): EnhancedCourt[] => {
  return filterCourts({ minRating });
};

/**
 * Get courts by surface type
 */
export const getCourtsBySurface = (
  surface: Court['surface']
): EnhancedCourt[] => {
  return filterCourts({ surface });
};

/**
 * Get indoor or outdoor courts
 */
export const getCourtsByIndoorStatus = (indoor: boolean): EnhancedCourt[] => {
  return filterCourts({ indoor });
};

/**
 * Get popular courts (high rating + many reviews)
 */
export const getPopularCourts = (limit: number = 10): EnhancedCourt[] => {
  const courts = getAllCourts();

  // Score based on rating and review count
  const scoredCourts = courts.map(court => ({
    ...court,
    popularityScore:
      court.averageRating * (1 + Math.log(court.totalReviews + 1)),
  }));

  return scoredCourts
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
};

/**
 * Get nearby courts (mock implementation - would use actual geolocation)
 */
export const getNearbyCourtsMock = (
  _userLat: number,
  _userLng: number,
  radiusKm: number = 10
): EnhancedCourt[] => {
  // Mock implementation - in reality you'd calculate actual distances using userLat and userLng
  const courts = getAllCourts();

  // For demo purposes, return courts with a mock distance calculation
  return courts
    .map(court => ({
      ...court,
      distance: Math.random() * radiusKm,
    }))
    .filter(court => (court as any).distance <= radiusKm)
    .sort((a, b) => (a as any).distance - (b as any).distance);
};

/**
 * Get reviews for a specific court
 */
export const getCourtReviews = (
  courtId: string,
  sortBy: 'date' | 'rating' | 'helpful' = 'date'
): Review[] => {
  let reviews = allReviews.filter(r => r.courtId === courtId);

  switch (sortBy) {
    case 'date':
      reviews = reviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      break;
    case 'rating':
      reviews = reviews.sort((a, b) => b.rating - a.rating);
      break;
    case 'helpful':
      reviews = reviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
      break;
  }

  return reviews;
};

/**
 * Get statistics about all courts
 */
export const getCourtStatistics = () => {
  const courts = getAllCourts();

  const surfaces = courts.reduce(
    (acc, court) => {
      acc[court.surface] = (acc[court.surface] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const avgPrice =
    courts.reduce((sum, court) => sum + court.pricePerHour, 0) / courts.length;
  const avgRating =
    courts.reduce((sum, court) => sum + court.averageRating, 0) / courts.length;

  const priceRanges = {
    budget: courts.filter(c => c.pricePerHour < 30).length,
    midRange: courts.filter(c => c.pricePerHour >= 30 && c.pricePerHour < 60)
      .length,
    premium: courts.filter(c => c.pricePerHour >= 60).length,
  };

  return {
    totalCourts: courts.length,
    surfaces,
    averagePrice: Math.round(avgPrice * 100) / 100,
    averageRating: Math.round(avgRating * 10) / 10,
    priceRanges,
    indoorCourts: courts.filter(c => c.indoor).length,
    outdoorCourts: courts.filter(c => !c.indoor).length,
  };
};

/**
 * Generate random time slots for a court (mock availability)
 */
export const generateTimeSlots = (courtId: string, date: string) => {
  const slots = [];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  for (const hour of hours) {
    const available = Math.random() > 0.3; // 70% chance of availability
    const court = getCourtById(courtId);
    const basePrice = court?.pricePerHour || 40;

    // Peak hour pricing (6-8 PM gets 25% markup)
    const price = hour >= 18 && hour <= 20 ? basePrice * 1.25 : basePrice;

    slots.push({
      id: `${courtId}-${date}-${hour}`,
      date,
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
      available,
      price: Math.round(price),
    });
  }

  return slots;
};
