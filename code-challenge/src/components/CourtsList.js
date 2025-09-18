import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { searchCourts } from '../api/courtApi';

const CourtsList = ({ courts, onCourtSelect, hasSearched, searchQuery: initialSearchQuery, currentView, viewMode: propViewMode, onViewModeChange }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState(propViewMode || 'grid'); // 'grid' or 'card'
  const [isViewModeReady, setIsViewModeReady] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const courtsPerPage = 10;
  
  // Helper function to get star color based on rating
  const getStarColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500'; // Excellent (4.5-5.0)
    if (rating >= 3.5) return 'text-blue-500';  // Good (3.5-4.4)
    if (rating >= 2.5) return 'text-yellow-500'; // Average (2.5-3.4)
    if (rating >= 1.5) return 'text-orange-500'; // Poor (1.5-2.4)
    return 'text-red-500'; // Very Poor (1.0-1.4)
  };

  const performSearch = useCallback(async (query) => {
    setIsSearching(true);
    try {
      const results = await searchCourts(query);
      
      // Add minimum search delay of 1-2 seconds
      const minDelay = 1000 + Math.random() * 1000; // 1-2 seconds
      
      const resultsPromise = Promise.resolve(results);
      const delayPromise = new Promise(resolve => setTimeout(resolve, minDelay));
      
      await Promise.all([resultsPromise, delayPromise]);
      
      setFilteredCourts(results);
      setCurrentPage(1); // Reset to first page when searching
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        // For list view, show all courts when no search query
        if (currentView === 'list') {
          setFilteredCourts(courts);
      } else {
        setFilteredCourts([]);
        }
      }
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch, currentView, courts]);

  // Update search when initialSearchQuery changes
  useEffect(() => {
    if (initialSearchQuery && initialSearchQuery !== searchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery, searchQuery]);

  // For list view and landing page, show all courts initially
  useEffect(() => {
    if ((currentView === 'list' || currentView === 'landing') && !searchQuery.trim()) {
      setFilteredCourts(courts);
    }
  }, [currentView, courts, searchQuery]);

  // Update viewMode when prop changes (for landing page)
  useEffect(() => {
    if (propViewMode) {
      setViewMode(propViewMode);
    }
    setIsViewModeReady(true);
  }, [propViewMode]);

  // Set view mode ready on mount
  useEffect(() => {
    setIsViewModeReady(true);
  }, []);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSortDropdown && !event.target.closest('.sort-dropdown-container')) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSortDropdown]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    const starColor = getStarColor(rating);
    return <span className={starColor}>★</span>;
  };

  const renderGridCourt = (court, index) => (
    <motion.div 
      key={court.id} 
      className="relative rounded-lg overflow-hidden shadow-md bg-white cursor-pointer active:scale-98 transition-all duration-200 hover:shadow-lg"
      onClick={() => onCourtSelect(court)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
    >
      <div className="relative h-32">
        <img 
          src={court.images[0]} 
          alt={court.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <span>⭐</span>
          <span>{court.rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
          <h3 className="font-semibold text-sm mb-1 truncate">{court.name}</h3>
          <p className="text-xs text-gray-200 truncate">{court.location}</p>
        </div>
      </div>
    </motion.div>
  );

  const renderCardCourt = (court, index) => (
              <motion.div 
                key={court.id} 
      className="relative rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer mb-4 active:scale-98 transition-all duration-200 hover:shadow-xl"
                onClick={() => onCourtSelect(court)}
      initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
        duration: 0.6, 
        delay: index * 0.08,
                  ease: "easeOut"
                }}
                whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
              >
                <div className="relative h-48">
                  <img 
                    src={court.images[0]} 
                    alt={court.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <span>⭐</span>
                    <span>{court.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{court.name}</h3>
                    <p className="text-sm text-gray-200 mb-2">{court.location}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {court.facilities.slice(0, 3).map((facility, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                      >
                        {facility}
                      </span>
                    ))}
                    {court.facilities.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        +{court.facilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
  );

  const sortCourts = (courts) => {
    const sorted = [...courts];
    
    switch (sortBy) {
      case 'distance':
        // Mock distance calculation (in a real app, you'd use actual coordinates)
        const distanceSorted = sorted.sort((a, b) => {
          const distanceA = Math.random() * 10; // Mock distance in miles
          const distanceB = Math.random() * 10;
          return distanceA - distanceB;
        });
        return sortOrder === 'asc' ? distanceSorted : distanceSorted.reverse();
      case 'rating':
        const ratingSorted = sorted.sort((a, b) => b.rating - a.rating);
        return sortOrder === 'asc' ? ratingSorted.reverse() : ratingSorted;
      case 'reviews':
        const reviewsSorted = sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        return sortOrder === 'asc' ? reviewsSorted.reverse() : reviewsSorted;
      case 'name':
        const nameSorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        return sortOrder === 'asc' ? nameSorted : nameSorted.reverse();
      default:
        return sorted;
    }
  };

  const sortedCourts = sortCourts(filteredCourts);

  // Calculate pagination - for grid view, show 8 courts per page (2x4)
  const gridCourtsPerPage = 8;
  const actualCourtsPerPage = ((currentView === 'list' || currentView === 'landing') && viewMode === 'grid') ? gridCourtsPerPage : courtsPerPage;
  const totalPages = Math.ceil(sortedCourts.length / actualCourtsPerPage);
  const startIndex = (currentPage - 1) * actualCourtsPerPage;
  const endIndex = startIndex + actualCourtsPerPage;
  const currentCourts = sortedCourts.slice(startIndex, endIndex);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search functionality removed from list view - no search dropdown/bar */}
      
      {/* Unified Search and Controls Component */}
      {currentView === 'list' && (
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-4"
          >
            {/* Title with Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/image.png"
                alt="Tennis Court Finder"
                className="w-8 h-8 rounded-full object-cover shadow-sm"
              />
              <h1 className="text-2xl font-bold text-gray-900">All Courts</h1>
            </div>
           
            
            {/* Search Bar */}
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
                  <Search className="text-gray-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Search courts..."
                    className="flex-1 bg-transparent outline-none text-base placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        performSearch(searchQuery);
                      }
                    }}
                  />
                  {searchQuery.trim() && (
                    <div className={`ml-3 text-lg ${isSearching ? 'animate-spin' : ''}`}>
                      🎾
                    </div>
                  )}
                </div>
              </div>
            </div>
             <p className="text-gray-600 text-sm max-w-md text-center">
              Browse through available courts in your area
            </p>
            {/* View Toggle and Sort */}
            <div className="flex items-center justify-between w-full max-w-md">
              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => {
                    setViewMode('grid');
                    if (onViewModeChange) onViewModeChange('grid');
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => {
                    setViewMode('card');
                    if (onViewModeChange) onViewModeChange('card');
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'card' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cards
                </button>
              </div>

              {/* Sort Button */}
              <div className="relative sort-dropdown-container">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span>Sort</span>
                  <span className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {/* Sort Dropdown */}
                {showSortDropdown && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 mb-2 px-2">Sort by</div>
                      {['rating', 'distance', 'reviews'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-2 py-2 text-sm rounded-md transition-colors ${
                            sortBy === option 
                              ? 'bg-green-50 text-green-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option === 'rating' ? 'Rating' : option === 'distance' ? 'Distance' : 'Review Count'}
                        </button>
                      ))}
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <div className="text-xs font-medium text-gray-500 mb-2 px-2">Order</div>
                      {['desc', 'asc'].map((order) => (
                        <button
                          key={order}
                          onClick={() => {
                            setSortOrder(order);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-2 py-2 text-sm rounded-md transition-colors ${
                            sortOrder === order 
                              ? 'bg-green-50 text-green-700' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {order === 'desc' ? 'Descending' : 'Ascending'}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
      
      {sortedCourts.length > 0 && isViewModeReady && (
        <>
          <div className="px-4 py-4">
            {((currentView === 'list' || currentView === 'landing') && viewMode === 'grid') ? (
              // Grid layout (2x4)
              <div className="grid grid-cols-2 gap-3">
                {currentCourts.map((court, index) => renderGridCourt(court, index))}
              </div>
            ) : (
              // Card layout (original)
              <div>
                {currentCourts.map((court, index) => renderCardCourt(court, index))}
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-4">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-gray-600 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Next →
                  </button>
                </div>
                <div className="text-center text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedCourts.length)} of {sortedCourts.length} courts
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {filteredCourts.length === 0 && searchQuery.trim() && !isSearching && (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">🎾</div>
          <p className="text-gray-600 text-center text-lg font-medium">No courts found</p>
          <p className="text-gray-500 text-center mt-2">Try a different search term or browse all courts</p>
        </motion.div>
      )}
      
      {isSearching && (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="animate-spin text-6xl mb-4">🎾</div>
          <p className="text-gray-600 text-center text-lg font-medium">Finding courts...</p>
          <p className="text-gray-500 text-center mt-2">Please wait while we search</p>
        </motion.div>
      )}
      
      {!hasSearched && !searchQuery.trim() && currentView !== 'list' && (
        <motion.div 
          className="flex flex-col items-center justify-center py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-center text-lg font-medium">Ready to play?</p>
          <p className="text-gray-500 text-center mt-2">Start typing to find tennis courts near you</p>
        </motion.div>
      )}
    </div>
  );
};

export default CourtsList;
