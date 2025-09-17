import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { FilterOptions } from '../types';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange
}) => {
  // Local state for immediate input updates
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Update local state when parent searchTerm changes (e.g., from clear button)
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Use useRef to store the timeout ID for proper cleanup
  const timeoutRef = useRef<number | undefined>();

  // Handle input change with immediate local update and debounced parent update
  const handleInputChange = useCallback((value: string) => {
    setLocalSearchTerm(value); // Immediate update for responsive typing
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for debounced parent update
    timeoutRef.current = window.setTimeout(() => {
      onSearchChange(value);
    }, 150); // Reduced from 250ms to 150ms for better responsiveness
  }, [onSearchChange]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const handleRatingFilterChange = (rating: string) => {
    onFilterChange({ ...filters, rating });
  };

  const handleSurfaceFilterChange = (surface: string) => {
    onFilterChange({ ...filters, surface });
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="search-filters mb-6 w-full max-w-4xl">
      {/* Search Section */}
      <div className="search-section mb-4 flex justify-center">
        <div className="relative w-full">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search tennis courts..."
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl text-base bg-pure-white focus:border-bright-blue focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 tap-target"
          />
          {localSearchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section mb-4">
        <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
          <select
            value={filters.rating}
            onChange={(e) => handleRatingFilterChange(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-pure-white text-sm cursor-pointer focus:border-bright-blue focus:outline-none transition-colors"
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
          
          <select
            value={filters.surface}
            onChange={(e) => handleSurfaceFilterChange(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-pure-white text-sm cursor-pointer focus:border-forest-green focus:outline-none transition-colors"
          >
            <option value="">All Surfaces</option>
            <option value="Hard">Hard Court</option>
            <option value="Clay">Clay Court</option>
            <option value="Grass">Grass Court</option>
          </select>
        </div>
      </div>
    </div>
  );
};
