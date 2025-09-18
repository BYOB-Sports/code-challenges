import { useState, useEffect } from 'react';
import { mockCourts, TennisCourt } from '../data/mockCourts';

interface UseCourtsResult {
  courts: TennisCourt[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
  searchCourts: (query: string) => void;
  currentPage: number;
  totalPages: number;
}

interface UseCourtsParams {
  pageSize?: number;
  initialSearchQuery?: string;
}

export const useCourts = ({ 
  pageSize = 10, 
  initialSearchQuery = '' 
}: UseCourtsParams = {}): UseCourtsResult => {
  const [courts, setCourts] = useState<TennisCourt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [allCourts] = useState<TennisCourt[]>(mockCourts);
  const [filteredCourts, setFilteredCourts] = useState<TennisCourt[]>([]);

  const totalPages = Math.ceil(filteredCourts.length / pageSize);

  const filterCourts = (courts: TennisCourt[], query: string): TennisCourt[] => {
    if (!query.trim()) return courts;
    
    const lowercaseQuery = query.toLowerCase();
    return courts.filter(court => 
      court.name.toLowerCase().includes(lowercaseQuery) ||
      court.location.toLowerCase().includes(lowercaseQuery) ||
      court.city.toLowerCase().includes(lowercaseQuery) ||
      court.state.toLowerCase().includes(lowercaseQuery) ||
      court.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  const fetchCourts = async (page: number, query: string, append: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filteredResults = filterCourts(allCourts, query);
      setFilteredCourts(filteredResults);
      
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageCourts = filteredResults.slice(0, endIndex);
      
      if (append) {
        setCourts(prev => [...prev, ...pageCourts.slice(prev.length)]);
      } else {
        setCourts(pageCourts);
      }
      
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch courts');
      console.error('Error fetching courts:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && currentPage < totalPages) {
      fetchCourts(currentPage + 1, searchQuery, true);
    }
  };

  const refresh = () => {
    setCurrentPage(1);
    fetchCourts(1, searchQuery, false);
  };

  const searchCourts = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchCourts(1, query, false);
  };

  useEffect(() => {
    fetchCourts(1, searchQuery, false);
  }, []);

  const hasMore = currentPage < totalPages;

  return {
    courts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    searchCourts,
    currentPage,
    totalPages
  };
};
