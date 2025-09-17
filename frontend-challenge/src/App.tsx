import { useState, useMemo, useEffect } from 'react';
import type { TennisCourt, FilterOptions } from './types';
import { tennisCourts } from './data/courts';
import { filterCourts } from './utils/helpers';
import { Navbar } from './components/Navbar';
import { SearchAndFilters } from './components/SearchAndFilters';
import { CourtCard } from './components/CourtCard';
import { CourtDetail } from './components/CourtDetail';

type Page = 'court-list' | 'court-detail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('court-list');
  const [selectedCourt, setSelectedCourt] = useState<TennisCourt | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    rating: '',
    surface: ''
  });

  // Load persisted search/filters from localStorage (mobile-friendly continuity)
  useEffect(() => {
    const saved = localStorage.getItem('tc_filters');
    if (saved) {
      const { search, filters } = JSON.parse(saved);
      if (typeof search === 'string') setSearchTerm(search);
      if (filters) setFilters(filters);
    }
  }, []);

  // Persist search/filters
  useEffect(() => {
    localStorage.setItem('tc_filters', JSON.stringify({ search: searchTerm, filters }));
  }, [searchTerm, filters]);

  const filteredCourts = useMemo(() => {
    return filterCourts(tennisCourts, searchTerm, filters.rating, filters.surface);
  }, [searchTerm, filters]);

  const handleCourtClick = (courtId: number) => {
    const court = tennisCourts.find(c => c.id === courtId);
    if (court) {
      setSelectedCourt(court);
      setCurrentPage('court-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToList = () => {
    setCurrentPage('court-list');
    setSelectedCourt(null);
    setSearchTerm('');
    setFilters({ rating: '', surface: '' });
  };

  const handleReviewSubmit = (review: { name: string; rating: number; text: string }) => {
    if (!selectedCourt) return;

    const newReview = {
      id: Date.now(),
      name: review.name,
      rating: review.rating,
      date: new Date().toISOString().split('T')[0],
      text: review.text
    };

    // Update the court with new review
    const updatedCourt = {
      ...selectedCourt,
      reviews: [newReview, ...selectedCourt.reviews],
      reviewCount: selectedCourt.reviewCount + 1,
      rating: Math.round(
        ((selectedCourt.rating * selectedCourt.reviewCount + review.rating) / 
         (selectedCourt.reviewCount + 1)) * 10
      ) / 10
    };

    setSelectedCourt(updatedCourt);

    // Show success notification
    alert('Review submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        showBackButton={currentPage === 'court-detail'} 
        onBack={handleBackToList}
      />
      
      <main className="container-wide py-4 md:py-8">
        {currentPage === 'court-list' && (
          <div className="court-list-page flex flex-col items-center">
            <SearchAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFilterChange={setFilters}
            />
            
            <div className="results-count text-center mb-6 text-gray-600">
              {filteredCourts.length} court{filteredCourts.length !== 1 ? 's' : ''} found
            </div>
            
            {filteredCourts.length === 0 ? (
              <div className="empty-state text-center py-12">
                <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No courts found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="court-cards grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 w-full">
                {filteredCourts.map((court) => (
                  <CourtCard
                    key={court.id}
                    court={court}
                    onClick={handleCourtClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {currentPage === 'court-detail' && selectedCourt && (
          <CourtDetail
            court={selectedCourt}
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
