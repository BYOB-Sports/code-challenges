import type {
  ApiResponse,
  CourtsFilter,
  PaginatedResponse,
  Review,
  ReviewFormData,
} from '@/types';
import {
  getAllCourts,
  getCourtById,
  filterCourts,
  searchCourts,
  sortCourts,
  getCourtReviews,
  generateTimeSlots,
  type EnhancedCourt,
  type SortCriteria,
  type SortOrder
} from './dataHelpers';

/**
 * Mock API service that simulates real API calls with our comprehensive mock data
 * This replaces the need for actual API calls during development and testing
 */
class MockApiService {
  private delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Get courts with pagination, filtering, and search
   */
  async getCourts(params?: {
    page?: number;
    limit?: number;
    filters?: CourtsFilter;
    search?: string;
    sortBy?: SortCriteria;
    sortOrder?: SortOrder;
  }): Promise<PaginatedResponse<EnhancedCourt>> {
    await this.delay();

    let courts = getAllCourts();

    // Apply search
    if (params?.search) {
      courts = searchCourts(params.search, courts);
    }

    // Apply filters
    if (params?.filters) {
      courts = filterCourts(params.filters, courts);
    }

    // Apply sorting
    if (params?.sortBy) {
      courts = sortCourts(courts, params.sortBy, params.sortOrder || 'desc');
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourts = courts.slice(startIndex, endIndex);

    return {
      data: paginatedCourts,
      total: courts.length,
      page,
      limit,
      hasMore: endIndex < courts.length
    };
  }

  /**
   * Get single court by ID
   */
  async getCourtById(id: string): Promise<ApiResponse<EnhancedCourt>> {
    await this.delay();

    const court = getCourtById(id);

    if (!court) {
      throw new Error(`Court with ID ${id} not found`);
    }

    // Add availability slots for the next 7 days
    const availability = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0] || '';

      const daySlots = generateTimeSlots(id, dateString);
      availability.push(...daySlots);
    }

    const courtWithAvailability = {
      ...court,
      availability
    };

    return {
      data: courtWithAvailability,
      success: true,
      message: 'Court retrieved successfully'
    };
  }

  /**
   * Get reviews for a specific court
   */
  async getCourtReviews(
    courtId: string,
    params?: {
      page?: number;
      limit?: number;
      sortBy?: 'date' | 'rating' | 'helpful';
    }
  ): Promise<PaginatedResponse<Review>> {
    await this.delay();

    let reviews = getCourtReviews(courtId, params?.sortBy || 'date');

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = reviews.slice(startIndex, endIndex);

    return {
      data: paginatedReviews,
      total: reviews.length,
      page,
      limit,
      hasMore: endIndex < reviews.length
    };
  }

  /**
   * Submit a new review (mock implementation)
   */
  async submitReview(
    courtId: string,
    reviewData: ReviewFormData
  ): Promise<ApiResponse<Review>> {
    await this.delay();

    // Simulate review creation
    const newReview: Review = {
      id: `r${courtId}-${Date.now()}`,
      courtId,
      userId: 'current-user',
      userName: 'Current User', // In real app, this would come from auth
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0] || '',
      helpfulVotes: 0
    };

    return {
      data: newReview,
      success: true,
      message: 'Review submitted successfully'
    };
  }

  /**
   * Update an existing review (mock implementation)
   */
  async updateReview(
    courtId: string,
    reviewId: string,
    reviewData: ReviewFormData
  ): Promise<ApiResponse<Review>> {
    await this.delay();

    // Simulate review update
    const updatedReview: Review = {
      id: reviewId,
      courtId,
      userId: 'current-user',
      userName: 'Current User',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0] || '',
      helpfulVotes: 0 // Reset helpful votes on update
    };

    return {
      data: updatedReview,
      success: true,
      message: 'Review updated successfully'
    };
  }

  /**
   * Delete a review (mock implementation)
   */
  async deleteReview(_courtId: string, _reviewId: string): Promise<ApiResponse<void>> {
    await this.delay();

    return {
      data: undefined as any,
      success: true,
      message: 'Review deleted successfully'
    };
  }

  /**
   * Get popular/featured courts
   */
  async getFeaturedCourts(): Promise<ApiResponse<EnhancedCourt[]>> {
    await this.delay();

    const courts = getAllCourts();
    // Return top-rated courts with many reviews
    const featuredCourts = courts
      .filter(court => court.averageRating >= 4.3 && court.totalReviews > 5)
      .slice(0, 6);

    return {
      data: featuredCourts,
      success: true,
      message: 'Featured courts retrieved successfully'
    };
  }

  /**
   * Get courts by location/city
   */
  async getCourtsByLocation(location: string): Promise<ApiResponse<EnhancedCourt[]>> {
    await this.delay();

    const courts = searchCourts(location);

    return {
      data: courts,
      success: true,
      message: `Courts in ${location} retrieved successfully`
    };
  }

  /**
   * Book a time slot (mock implementation)
   */
  async bookTimeSlot(_courtId: string, _slotId: string): Promise<ApiResponse<{ bookingId: string }>> {
    await this.delay();

    // Simulate booking
    const bookingId = `booking-${Date.now()}`;

    return {
      data: { bookingId },
      success: true,
      message: 'Time slot booked successfully'
    };
  }

  /**
   * Get user's bookings (mock implementation)
   */
  async getUserBookings(): Promise<ApiResponse<any[]>> {
    await this.delay();

    // Return empty array - in real app would return user's actual bookings
    return {
      data: [],
      success: true,
      message: 'Bookings retrieved successfully'
    };
  }

  /**
   * Mark review as helpful (mock implementation)
   */
  async markReviewHelpful(_reviewId: string): Promise<ApiResponse<{ helpfulVotes: number }>> {
    await this.delay();

    // Simulate incrementing helpful votes
    const newHelpfulVotes = Math.floor(Math.random() * 50) + 1;

    return {
      data: { helpfulVotes: newHelpfulVotes },
      success: true,
      message: 'Review marked as helpful'
    };
  }
}

// Create and export singleton instance
export const mockApiService = new MockApiService();

// Export error handling utilities (same as original API service)
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

// Usage instructions
export const MOCK_API_USAGE = {
  description: 'Mock API service with comprehensive tennis court data',
  features: [
    'Pagination support',
    'Advanced filtering and searching',
    'Sorting capabilities',
    'Review management',
    'Booking simulation',
    'Realistic delay simulation',
    'Error handling'
  ],
  examples: {
    getAllCourts: `
      const response = await mockApiService.getCourts({
        page: 1,
        limit: 10,
        search: 'New York',
        sortBy: 'rating',
        sortOrder: 'desc'
      });
    `,
    getCourtDetails: `
      const response = await mockApiService.getCourtById('1');
    `,
    submitReview: `
      const response = await mockApiService.submitReview('1', {
        rating: 5,
        comment: 'Amazing courts!'
      });
    `
  }
};