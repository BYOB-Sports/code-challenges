import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import './App.css';
import CourtsList from './components/CourtsList';
import CourtDetail from './components/CourtDetail';
import SearchDropdown from './components/SearchDropdown';
import MatchRating from './components/MatchRating';
import PlayersList from './components/PlayersList';
import { fetchCourts } from './api/courtApi';
import { fetchPlayers } from './api/playerApi';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [courts, setCourts] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'card'

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        setLoading(true);
        const [loadedCourts, loadedPlayers] = await Promise.all([
          fetchCourts(),
          fetchPlayers()
        ]);
        setCourts(loadedCourts);
        setPlayers(loadedPlayers);
      } catch (error) {
        // Error handling
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
    setCurrentView('detail');
    setShowDropdown(false);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCourt(null);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedCourt(null);
    setHasSearched(false);
    setSearchQuery('');
    setShowDropdown(false);
    setIsAnimating(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setHasSearched(true);
    setShowDropdown(false);
    setIsAnimating(true);
    setViewMode('grid'); // Ensure grid mode is set when searching
    
    // Start animation, then show results on same page
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Animation duration
  };

  const handleNavigateToList = () => {
    setCurrentView('list');
    setHasSearched(false);
    setSearchQuery('');
    setShowDropdown(false);
    setIsAnimating(false);
    setViewMode('grid');
  };

  const handleNavigateToRating = () => {
    setCurrentView('rating');
    setHasSearched(false);
    setSearchQuery('');
    setShowDropdown(false);
    setIsAnimating(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.length > 0);
    
    // Scroll to logo position when user starts typing
    if (value.length > 0 && !hasSearched) {
      const logoElement = document.querySelector('.logo-container');
      if (logoElement) {
        const logoRect = logoElement.getBoundingClientRect();
        const scrollAmount = logoRect.top - 20; // Position logo 20px from top
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleInputClick = () => {
    if (searchQuery.length > 0) {
      setShowDropdown(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && 
          !event.target.closest('.floating-search') && 
          !event.target.closest('.search-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="App font-montserrat">
      <main>
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading courts...</p>
          </div>
        ) : currentView === 'landing' ? (
          <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50">
            <motion.div 
              className={`flex flex-col items-center p-6 text-center ${hasSearched ? 'pt-20' : 'justify-center min-h-screen'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <motion.img
                src="/image.png"
                alt="Tennis Court Finder"
                className={`logo-container rounded-full object-cover shadow-lg ${hasSearched ? 'w-20 mb-20' : 'w-20 h-20 mb-4'}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* Hero text */}
              <motion.div
                className={hasSearched ? 'mb-4' : 'mb-8'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className={`font-bold mb-3 text-gray-900 ${hasSearched ? 'text-lg' : 'text-3xl'}`}>
                  Rate & Review Tennis Courts
                </h1>
                {!hasSearched && (
                  <div className="space-y-2">
                    <p className="text-gray-600 text-base max-w-md leading-relaxed">
                      Discover, rate, and review the best tennis courts in your area.
                    </p>
                    <p className="text-gray-500 text-sm max-w-sm">
                      Share your experiences and help others find great courts.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Search bar */}
              <motion.div
                className={`w-full ${hasSearched ? 'max-w-sm' : 'max-w-md'}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <div className={`flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-4 ${hasSearched ? 'py-3' : 'py-4'} focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all`}>
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input
                      type="text"
                      placeholder="Search courts to rate..."
                      className={`flex-1 bg-transparent outline-none ${hasSearched ? 'text-sm' : 'text-base'} placeholder-gray-400`}
                      value={searchQuery}
                      onChange={handleInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(searchQuery);
                        }
                      }}
                      onClick={handleInputClick}
                      onFocus={() => setShowDropdown(true)}
                    />
                  </div>
                  
                  {showDropdown && searchQuery.length > 0 && (
                    <SearchDropdown
                      searchQuery={searchQuery}
                      courts={courts}
                      onCourtSelect={handleCourtSelect}
                      onSearch={handleSearch}
                      onNavigateToList={handleNavigateToList}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  )}
                </div>

                {/* Browse all courts button */}
                {!hasSearched && (
                  <motion.button
                    onClick={handleNavigateToList}
                    className="mt-6 w-full text-sm text-green-600 font-medium hover:text-green-700 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span>Browse all courts to rate</span>
                    <span>⭐</span>
                  </motion.button>
                )}

                {/* View Toggle for landing page */}
                {hasSearched && (
                  <motion.div
                    className="mt-4 flex justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'grid' 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setViewMode('card')}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          viewMode === 'card' 
                            ? 'bg-white text-gray-900 shadow-sm' 
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Cards
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>


            {/* Show search results on the same page */}
            {hasSearched && !isAnimating && (
              <motion.div 
                className="pt-20 px-4 pb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <CourtsList
                  courts={courts}
                  onCourtSelect={handleCourtSelect}
                  hasSearched={hasSearched}
                  searchQuery={searchQuery}
                  currentView="landing"
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </motion.div>
            )}
          </div>
        ) : currentView === 'rating' ? (
          <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
            <div className="container mx-auto px-4 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Player Rating System</h1>
                <p className="text-gray-600">Rate players and view their performance</p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <MatchRating players={players} setPlayers={setPlayers} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <PlayersList players={players} />
                </motion.div>
              </div>
              
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <button
                  onClick={handleBackToLanding}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </button>
              </motion.div>
            </div>
          </div>
        ) : (
          <>
            {/* Always render the CourtsList component */}
            <CourtsList 
              courts={courts} 
              onCourtSelect={handleCourtSelect}
              hasSearched={hasSearched}
              currentView="list"
            />

            {/* Only render CourtDetail when a court is selected */}
            <AnimatePresence>
              {selectedCourt && (
                <CourtDetail 
                  court={selectedCourt} 
                  onBack={handleBackToList}
                  courts={courts}
                  onCourtSelect={handleCourtSelect}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
