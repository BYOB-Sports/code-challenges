import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { searchCourts } from '../api/courtApi';

const SearchDropdown = ({ searchQuery, courts, onCourtSelect, onSearch, onNavigateToList, sortBy, onSortChange }) => {
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Helper function to get star color based on rating
  const getStarColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500'; // Excellent (4.5-5.0)
    if (rating >= 3.5) return 'text-blue-500';  // Good (3.5-4.4)
    if (rating >= 2.5) return 'text-yellow-500'; // Average (2.5-3.4)
    if (rating >= 1.5) return 'text-orange-500'; // Poor (1.5-2.4)
    return 'text-red-500'; // Very Poor (1.0-1.4)
  };

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setFilteredCourts([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchCourts(searchQuery);
        
        // Add minimum search delay of 1-2 seconds
        const minDelay = 1000 + Math.random() * 1000; // 1-2 seconds
        
        const resultsPromise = Promise.resolve(results);
        const delayPromise = new Promise(resolve => setTimeout(resolve, minDelay));
        
        await Promise.all([resultsPromise, delayPromise]);
        
        setFilteredCourts(results);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const sortCourts = (courts) => {
    const sorted = [...courts];
    
    switch (sortBy) {
      case 'distance':
        // Mock distance calculation (in a real app, you'd use actual coordinates)
        return sorted.sort((a, b) => {
          const distanceA = Math.random() * 10; // Mock distance in miles
          const distanceB = Math.random() * 10;
          return distanceA - distanceB;
        });
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'reviews':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };

  const renderStars = (rating) => {
    const starColor = getStarColor(rating);
    return <span className={starColor}>★</span>;
  };

  const sortedCourts = sortCourts(filteredCourts);

  return (
    <motion.div 
      className="search-dropdown absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{ 
        maxHeight: 'calc(100vh - 200px)', // Ensure it never goes off screen
        overflowY: 'auto',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <div className="relative">
              <select 
                value={sortBy} 
                onChange={(e) => {
                  e.stopPropagation();
                  onSortChange(e.target.value);
                }}
                className="text-sm border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none min-w-[120px] bg-white appearance-none pr-8"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
                <option value="reviews">Reviews</option>
                <option value="name">Name</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 text-xs">▼</span>
              </div>
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors min-w-[100px] shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToList();
            }}
          >
            All
          </button>
        </div>
      </div>
      
      <div className="py-2 max-h-64 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center gap-2 px-4 py-3 text-gray-500">
            <div className="animate-spin text-lg">🎾</div>
            <span>Searching...</span>
          </div>
        ) : sortedCourts.length > 0 ? (
          sortedCourts.map((court, index) => (
            <motion.div 
              key={court.id} 
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onCourtSelect(court);
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ backgroundColor: "#f9fafb" }}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={court.images[0]} 
                  alt={court.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{court.name}</h4>
                <p className="text-sm text-gray-500 truncate">{court.location}</p>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(court.rating)}
                  <span className="text-sm text-gray-600">
                    {court.rating} ({court.reviewCount})
                  </span>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                <span>⭐</span>
                <span>{court.rating}</span>
              </div>
            </motion.div>
          ))
        ) : searchQuery.trim() ? (
          <div className="px-4 py-3 text-center text-gray-500">No courts found</div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default SearchDropdown;
