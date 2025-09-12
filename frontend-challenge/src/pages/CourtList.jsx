import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter, ChevronDown } from 'lucide-react';
import { mockCourts } from '../data/mockData';

const CourtList = () => {
  const [filters, setFilters] = useState({
    query: '',
    surface: '',
    maxPrice: 100,
    minRating: 0
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourts = useMemo(() => {
    return mockCourts.filter(court => {
      const searchTerms = filters.query.toLowerCase();
      const matchesQuery = 
        court.name.toLowerCase().includes(searchTerms) ||
        court.location.toLowerCase().includes(searchTerms) ||
        court.amenities.some(amenity => amenity.toLowerCase().includes(searchTerms));
      
      const matchesSurface = !filters.surface || court.surface === filters.surface;
      const matchesPrice = court.price <= filters.maxPrice;
      const matchesRating = court.rating >= filters.minRating;
      
      return matchesQuery && matchesSurface && matchesPrice && matchesRating;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 tennis-gradient rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-600">
                Tennis Courts NYC
              </h1>
              <p className="text-gray-600 font-medium text-sm">Find and review the best courts</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-4">
        <div className="glass-effect rounded-xl p-6 shadow-lg">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courts, locations, or amenities..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base placeholder-gray-500"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 glass-effect rounded-xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Surface Type</label>
                <select
                  className="w-full p-3 bg-white border border-green-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                  value={filters.surface}
                  onChange={(e) => setFilters(prev => ({ ...prev, surface: e.target.value }))}
                >
                  <option value="">All Surfaces</option>
                  <option value="Hard">🔵 Hard Court</option>
                  <option value="Clay">🟠 Clay Court</option>
                  <option value="Grass">🟢 Grass Court</option>
                  <option value="Synthetic">🟣 Synthetic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Min Rating: {filters.minRating}⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Max Price: ${filters.maxPrice}/hour
              </label>
              <input
                type="range"
                min="15"
                max="100"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-700">
            <span className="text-green-600">{filteredCourts.length}</span> courts found
          </p>
          <div className="text-sm text-gray-500">
            Showing best matches
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-6">
        {filteredCourts.map((court) => (
          <CourtCard key={court.id} court={court} />
        ))}
        
        {filteredCourts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courts found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CourtCard = ({ court }) => {
  const getSurfaceColor = (surface) => {
    switch (surface) {
      case 'Hard': return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'Clay': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'Grass': return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'Synthetic': return 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getSurfaceIcon = (surface) => {
    switch (surface) {
      case 'Hard': return '🔵';
      case 'Clay': return '🟠';
      case 'Grass': return '🟢';
      case 'Synthetic': return '🟣';
      default: return '⚪';
    }
  };

  return (
    <Link to={`/court/${court.id}`} className="block group">
      <div className="card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group-hover:scale-[1.02]">
        <div className="relative overflow-hidden">
          <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-teal-100">
            <img
              src={court.image}
              alt={court.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute top-4 right-4 tennis-gradient px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-bold text-white">${court.price}/hr</span>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getSurfaceColor(court.surface)}`}>
              {getSurfaceIcon(court.surface)} {court.surface}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-3 text-xl group-hover:text-green-600 transition-colors">
            {court.name}
          </h3>
          
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-green-500" />
            <span className="truncate font-medium">{court.location}</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-bold text-yellow-700">{court.rating}</span>
              <span className="ml-1 text-sm text-yellow-600">({court.reviewCount})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {court.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200"
              >
                {amenity}
              </span>
            ))}
            {court.amenities.length > 3 && (
              <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                +{court.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourtList;
