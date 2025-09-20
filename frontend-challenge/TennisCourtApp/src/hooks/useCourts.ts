import { useCallback, useEffect, useState } from 'react';
import type { Court, CourtsFilter, PaginatedResponse } from '@/types';

// Mock data for development
const MOCK_COURTS: Court[] = [
  {
    id: '1',
    name: 'Royal Tennis Club',
    location: 'Downtown',
    surface: 'clay',
    indoor: false,
    pricePerHour: 50,
    rating: 4.5,
    imageUrl: 'https://example.com/court1.jpg',
    description:
      'Premium clay court with professional lighting and excellent drainage system.',
    amenities: [
      'Parking',
      'Lockers',
      'Showers',
      'Equipment Rental',
      'Coaching',
    ],
    availability: [],
  },
  {
    id: '2',
    name: 'Elite Sports Center',
    location: 'Uptown',
    surface: 'hard',
    indoor: true,
    pricePerHour: 75,
    rating: 4.8,
    imageUrl: 'https://example.com/court2.jpg',
    description: 'State-of-the-art indoor hard court with climate control.',
    amenities: ['AC', 'Parking', 'Pro Shop', 'Cafe', 'Lockers'],
    availability: [],
  },
  {
    id: '3',
    name: 'Grassland Tennis',
    location: 'Suburbs',
    surface: 'grass',
    indoor: false,
    pricePerHour: 60,
    rating: 4.2,
    imageUrl: 'https://example.com/court3.jpg',
    description: 'Traditional grass court perfect for Wimbledon-style play.',
    amenities: ['Parking', 'Clubhouse', 'Restaurant'],
    availability: [],
  },
  {
    id: '4',
    name: 'City Indoor Courts',
    location: 'City Center',
    surface: 'hard',
    indoor: true,
    pricePerHour: 45,
    rating: 4.0,
    imageUrl: 'https://example.com/court4.jpg',
    description: 'Affordable indoor courts with modern facilities.',
    amenities: ['Parking', 'Lockers', 'Vending'],
    availability: [],
  },
  {
    id: '5',
    name: 'Championship Clay Courts',
    location: 'Sports Complex',
    surface: 'clay',
    indoor: false,
    pricePerHour: 65,
    rating: 4.7,
    imageUrl: 'https://example.com/court5.jpg',
    description: 'Professional-grade clay courts used for tournaments.',
    amenities: [
      'Parking',
      'Lockers',
      'Showers',
      'Pro Shop',
      'Coaching',
      'Tournament Hall',
    ],
    availability: [],
  },
];

interface UseCourtsOptions {
  limit?: number;
  initialFilters?: CourtsFilter;
}

interface UseCourtsReturn {
  courts: Court[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  filters: CourtsFilter;
  totalCount: number;

  // Actions
  loadCourts: () => Promise<void>;
  loadMore: () => Promise<void>;
  refreshCourts: () => Promise<void>;
  updateFilters: (newFilters: Partial<CourtsFilter>) => void;
  clearFilters: () => void;
  searchCourts: (searchTerm: string) => void;
}

export const useCourts = (options: UseCourtsOptions = {}): UseCourtsReturn => {
  const { limit = 20, initialFilters = {} } = options;

  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<CourtsFilter>(initialFilters);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate API call with filtering and pagination
  const fetchCourts = useCallback(
    async (
      pageNumber: number,
      currentFilters: CourtsFilter,
      search: string
    ): Promise<PaginatedResponse<Court>> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      let filteredCourts = MOCK_COURTS;

      // Apply search
      if (search.trim()) {
        filteredCourts = filteredCourts.filter(
          court =>
            court.name.toLowerCase().includes(search.toLowerCase()) ||
            court.location.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply filters
      if (currentFilters.surface) {
        filteredCourts = filteredCourts.filter(
          court => court.surface === currentFilters.surface
        );
      }

      if (currentFilters.indoor !== undefined) {
        filteredCourts = filteredCourts.filter(
          court => court.indoor === currentFilters.indoor
        );
      }

      if (currentFilters.minPrice !== undefined) {
        filteredCourts = filteredCourts.filter(
          court => court.pricePerHour >= currentFilters.minPrice!
        );
      }

      if (currentFilters.maxPrice !== undefined) {
        filteredCourts = filteredCourts.filter(
          court => court.pricePerHour <= currentFilters.maxPrice!
        );
      }

      if (currentFilters.minRating !== undefined) {
        filteredCourts = filteredCourts.filter(
          court => court.rating >= currentFilters.minRating!
        );
      }

      if (currentFilters.location) {
        filteredCourts = filteredCourts.filter(court =>
          court.location
            .toLowerCase()
            .includes(currentFilters.location!.toLowerCase())
        );
      }

      // Paginate results
      const startIndex = (pageNumber - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCourts = filteredCourts.slice(startIndex, endIndex);

      return {
        data: paginatedCourts,
        total: filteredCourts.length,
        page: pageNumber,
        limit,
        hasMore: endIndex < filteredCourts.length,
      };
    },
    [limit]
  );

  const loadCourts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCourts(1, filters, searchTerm);
      setCourts(response.data);
      setHasMore(response.hasMore);
      setTotalCount(response.total);
      setPage(1);
    } catch (err) {
      setError('Failed to load courts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fetchCourts, filters, searchTerm]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await fetchCourts(nextPage, filters, searchTerm);

      setCourts(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError('Failed to load more courts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page, fetchCourts, filters, searchTerm]);

  const refreshCourts = useCallback(async () => {
    setPage(1);
    await loadCourts();
  }, [loadCourts]);

  const updateFilters = useCallback((newFilters: Partial<CourtsFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const searchCourts = useCallback((search: string) => {
    setSearchTerm(search);
  }, []);

  // Load initial data and reload when filters or search change
  useEffect(() => {
    loadCourts();
  }, [loadCourts]);

  return {
    courts,
    loading,
    error,
    hasMore,
    filters,
    totalCount,
    loadCourts,
    loadMore,
    refreshCourts,
    updateFilters,
    clearFilters,
    searchCourts,
  };
};
