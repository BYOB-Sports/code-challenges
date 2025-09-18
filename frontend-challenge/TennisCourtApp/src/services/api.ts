import type {
  ApiResponse,
  Court,
  CourtsFilter,
  PaginatedResponse,
  Review,
  ReviewFormData,
} from '@/types';

// Configuration
const API_BASE_URL = 'https://api.tenniscourts.com'; // Replace with actual API URL
const API_TIMEOUT = 10000; // 10 seconds

interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

class ApiService {
  private config: ApiConfig;

  constructor() {
    this.config = {
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        data,
        success: true,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }

      throw new Error('An unknown error occurred');
    }
  }

  // Courts API
  async getCourts(params?: {
    page?: number;
    limit?: number;
    filters?: CourtsFilter;
    search?: string;
  }): Promise<PaginatedResponse<Court>> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    // Add filter parameters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/courts${queryString ? `?${queryString}` : ''}`;

    const response = await this.request<PaginatedResponse<Court>>(endpoint);
    return response.data;
  }

  async getCourtById(id: string): Promise<Court> {
    const response = await this.request<Court>(`/api/courts/${id}`);
    return response.data;
  }

  // Reviews API
  async getCourtReviews(
    courtId: string,
    params?: {
      page?: number;
      limit?: number;
    }
  ): Promise<PaginatedResponse<Review>> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/api/courts/${courtId}/reviews${queryString ? `?${queryString}` : ''}`;

    const response = await this.request<PaginatedResponse<Review>>(endpoint);
    return response.data;
  }

  async submitReview(
    courtId: string,
    reviewData: ReviewFormData
  ): Promise<Review> {
    const response = await this.request<Review>(
      `/api/courts/${courtId}/reviews`,
      {
        method: 'POST',
        body: JSON.stringify(reviewData),
      }
    );
    return response.data;
  }

  async updateReview(
    courtId: string,
    reviewId: string,
    reviewData: ReviewFormData
  ): Promise<Review> {
    const response = await this.request<Review>(
      `/api/courts/${courtId}/reviews/${reviewId}`,
      {
        method: 'PUT',
        body: JSON.stringify(reviewData),
      }
    );
    return response.data;
  }

  async deleteReview(courtId: string, reviewId: string): Promise<void> {
    await this.request<void>(`/api/courts/${courtId}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  }

  // Utility methods
  setAuthToken(token: string): void {
    this.config.headers['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.config.headers['Authorization'];
  }

  updateBaseURL(newBaseURL: string): void {
    this.config.baseURL = newBaseURL;
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export error handling utilities
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
