import { useState, useMemo } from 'react';
import { courts, categories } from '../data/courts';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import SortDropdown from '../components/SortDropdown';
import CourtCard from '../components/CourtCard';
import Pagination from '../components/Pagination';

const COURTS_PER_PAGE = 12;

const CourtListPage = ({ onCourtSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Courts');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort courts
  const filteredAndSortedCourts = useMemo(() => {
    let filtered = courts.filter((court) => {
      const matchesSearch = court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           court.amenities.some(amenity => 
                             amenity.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesCategory = activeCategory === 'All Courts' || 
                             court.category === activeCategory ||
                             (activeCategory === 'Indoor' && court.type === 'Indoor') ||
                             (activeCategory === 'Outdoor' && court.type === 'Outdoor');
      
      return matchesSearch && matchesCategory;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, activeCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourts.length / COURTS_PER_PAGE);
  const paginatedCourts = filteredAndSortedCourts.slice(
    (currentPage - 1) * COURTS_PER_PAGE,
    currentPage * COURTS_PER_PAGE
  );

  // Reset to first page when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section 
         className="relative bg-[#ff914d] text-white flex flex-col-reverse items-center py-12">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center w-1/2 h-1/2">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              placeholder="Search courts, locations, or amenities..."
            />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-[28%] h-[28%] flex justify-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/byob-logo-orange.png" 
                alt="BYOB Logo" 
                className="w-full h-full object-contain min-w-[300px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <FilterTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
            <div className="flex items-center justify-between lg:justify-end gap-4">
              <span className="text-sm text-gray-600">
                {filteredAndSortedCourts.length} courts found
              </span>
              <SortDropdown
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 py-8">
        {paginatedCourts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCourts.map((court) => (
                <CourtCard
                  key={court.id}
                  court={court}
                  onClick={onCourtSelect}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courts found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more courts.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All Courts');
                setCurrentPage(1);
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourtListPage;
