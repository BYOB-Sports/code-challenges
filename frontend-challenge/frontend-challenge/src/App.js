import React, { useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Star, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Phone, 
  Wifi, 
  Car, 
  Camera, 
  Plus,
  Filter,
  X,
  Heart,
  Share2
} from 'lucide-react';
import tennisCourtsMockData from './mockdata';

const TennisCourtApp = () => {
  const [courts] = useState(tennisCourtsMockData);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
  const [sortBy, setSortBy] = useState('rating');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    surface: 'all',
    priceRange: 'all',
    rating: 'all',
    indoor: 'all'
  });

  const filteredAndSortedCourts = useMemo(() => {
    let filtered = courts.filter(court => {
      const searchMatch = 
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.surface.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.address.toLowerCase().includes(searchTerm.toLowerCase());

      const surfaceMatch = filters.surface === 'all' || court.surface === filters.surface;
      const priceMatch = filters.priceRange === 'all' || 
        (filters.priceRange === 'budget' && court.price <= 40) ||
        (filters.priceRange === 'mid' && court.price > 40 && court.price <= 60) ||
        (filters.priceRange === 'premium' && court.price > 60);
      const ratingMatch = filters.rating === 'all' || court.rating >= parseFloat(filters.rating);
      const indoorMatch = filters.indoor === 'all' || 
        (filters.indoor === 'indoor' && court.isIndoor) ||
        (filters.indoor === 'outdoor' && !court.isIndoor);

      return searchMatch && surfaceMatch && priceMatch && ratingMatch && indoorMatch;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'distance':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'newest':
          return b.established - a.established;
        default:
          return 0;
      }
    });
  }, [courts, searchTerm, sortBy, filters]);

  const handleSubmitReview = useCallback(() => {
    if (newReview.comment.trim() && newReview.userName.trim()) {
      const review = {
        id: Date.now(),
        user: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toLocaleDateString(),
        helpful: 0,
        verified: false
      };
      
      selectedCourt.reviews.unshift(review);
      selectedCourt.reviewCount += 1;
      selectedCourt.rating = (
        (selectedCourt.rating * (selectedCourt.reviewCount - 1) + newReview.rating) / 
        selectedCourt.reviewCount
      ).toFixed(1);
      
      setNewReview({ rating: 5, comment: '', userName: '' });
      setShowReviewForm(false);
      alert('Review submitted successfully! Thank you for sharing.');
    }
  }, [newReview, selectedCourt]);

  const renderStars = useCallback((rating, interactive = false, onRate = null, size = 16) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        className={`${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer transition-colors hover:text-yellow-300' : ''}`}
        onClick={interactive ? () => onRate(i + 1) : undefined}
      />
    ));
  }, []);

  const formatAmenities = useCallback((amenities, maxShow = 4) => {
    if (!amenities || amenities.length === 0) return [];
    
    const iconMap = {
      'WiFi': <Wifi size={12} />,
      'Free Parking': <Car size={12} />,
      'Pro Shop': <Camera size={12} />,
      'Private Coaching': <Users size={12} />
    };
    
    return amenities.slice(0, maxShow).map((amenity, index) => (
      <span 
        key={index} 
        className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
      >
        {iconMap[amenity] || null}
        {amenity}
      </span>
    ));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      surface: 'all',
      priceRange: 'all',
      rating: 'all',
      indoor: 'all'
    });
  }, []);

  if (selectedCourt) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-4 p-4">
            <button
              onClick={() => setSelectedCourt(null)}
              className="p-2 -m-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back to court list"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">{selectedCourt.name}</h1>
              <p className="text-sm text-gray-500">{selectedCourt.city}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={selectedCourt.image}
            alt={selectedCourt.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium">{selectedCourt.distance}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(Math.floor(selectedCourt.rating), false, null, 18)}
                    <span className="font-bold text-lg">{selectedCourt.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedCourt.reviewCount} reviews</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">${selectedCourt.price}</div>
                  <p className="text-sm text-gray-600">per hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>

   
        <div className="p-4 bg-white mb-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{selectedCourt.address}</p>
                <p className="text-sm text-gray-600">{selectedCourt.city}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Hours</p>
                <p className="text-sm text-gray-600">{selectedCourt.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users size={20} className="text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Details</p>
                <p className="text-sm text-gray-600">{selectedCourt.surface}</p>
                <p className="text-sm text-gray-600">{selectedCourt.courts} courts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Contact</p>
                <p className="text-sm text-gray-600">{selectedCourt.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 text-gray-900">Amenities & Features</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formatAmenities(selectedCourt.amenities, 10)}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>📅 Est. {selectedCourt.established}</span>
              <span>🏢 {selectedCourt.isIndoor ? 'Indoor' : 'Outdoor'} Facility</span>
              {selectedCourt.hasProShop && <span>🛒 Pro Shop</span>}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Reviews & Ratings</h3>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              Write Review
            </button>
          </div>

          {showReviewForm && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
              <h4 className="font-medium mb-4">Share Your Experience</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={newReview.userName}
                    onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex items-center gap-1">
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview(prev => ({ ...prev, rating })), 32
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell others about your experience at this tennis court..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none h-28 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitReview}
                    disabled={!newReview.comment.trim() || !newReview.userName.trim()}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="bg-white">
          <div className="divide-y">
            {selectedCourt.reviews && selectedCourt.reviews.map((review) => (
              <div key={review.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {review.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{review.user}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating, false, null, 14)}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    👍 {review.helpful}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tennis Courts</h1>
              <p className="text-sm text-gray-600">Find and review local courts</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{filteredAndSortedCourts.length}</p>
              <p className="text-xs text-gray-500">courts</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courts, cities, surfaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Sort and Filter Bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex gap-2 overflow-x-auto flex-1 pb-2">
              {[
                { key: 'rating', label: '⭐ Rating' },
                { key: 'price', label: '💰 Price' },
                { key: 'distance', label: '📍 Distance' },
                { key: 'reviews', label: '💬 Reviews' },
                { key: 'newest', label: '🆕 Newest' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    sortBy === option.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Filter size={20} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Surface</label>
                  <select
                    value={filters.surface}
                    onChange={(e) => setFilters(prev => ({ ...prev, surface: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Surfaces</option>
                    <option value="Hard Court">Hard Court</option>
                    <option value="Clay Court">Clay Court</option>
                    <option value="Grass Court">Grass Court</option>
                    <option value="Indoor Hard">Indoor Hard</option>
                    <option value="Outdoor Hard">Outdoor Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="budget">Budget ($20-40)</option>
                    <option value="mid">Mid Range ($41-60)</option>
                    <option value="premium">Premium ($61+)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Min Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={filters.indoor}
                    onChange={(e) => setFilters(prev => ({ ...prev, indoor: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">Indoor & Outdoor</option>
                    <option value="indoor">Indoor Only</option>
                    <option value="outdoor">Outdoor Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredAndSortedCourts.map((court) => (
            <div
              key={court.id}
              onClick={() => setSelectedCourt(court)}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md active:scale-98 transition-all cursor-pointer aspect-square relative"
            >
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-full object-cover absolute inset-0"
                loading="lazy"
              />
              
    
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
              
           
              <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-medium">
                    {court.surface}
                  </span>
                  {court.isIndoor && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                      Indoor
                    </span>
                  )}
                </div>
                <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                  {court.distance}
                </span>
              </div>
              
            
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-semibold text-sm leading-tight line-clamp-2 mb-1">
                  {court.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2 text-xs opacity-90">
                  <MapPin size={10} />
                  <span className="truncate">{court.city}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {renderStars(Math.floor(court.rating), false, null, 10)}
                    </div>
                    <span className="text-xs font-medium ml-1">{court.rating}</span>
                    <span className="text-xs opacity-75">({court.reviewCount})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">${court.price}</div>
                    <div className="text-xs opacity-75">{court.courts} courts</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAndSortedCourts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🎾</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No courts found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                clearFilters();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Search & Filters
            </button>
          </div>
        )}
      </div>

    
      {searchTerm && (
        <div className="fixed bottom-4 right-4 z-20">
          <button
            onClick={() => setSearchTerm('')}
            className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            aria-label="Clear search"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TennisCourtApp;