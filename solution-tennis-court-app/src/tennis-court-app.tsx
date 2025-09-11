import React, { useState, useMemo } from 'react';
import { Search, Star, MapPin, ArrowLeft, Heart } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Court {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  surface: string;
  lighting: boolean;
  indoor: boolean;
  hourlyRate: number;
  image: string;
  description: string;
  amenities: string[];
  reviews: Review[];
  distance: string;
  availability: string;
}

// Mock data for 60+ courts with variety
const mockCourts: Court[] = [
  {
    id: '1',
    name: 'Wimbledon Tennis Club',
    location: 'London, UK',
    rating: 4.9,
    reviewCount: 127,
    surface: 'Grass',
    lighting: true,
    indoor: false,
    hourlyRate: 85,
    distance: '2.1 km',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    description: 'Experience tennis on pristine grass courts with championship-quality maintenance.',
    amenities: ['Pro Shop', 'Locker Rooms', 'Restaurant', 'Parking'],
    reviews: [
      { id: '1', author: 'Sarah M.', rating: 5, comment: 'Absolutely incredible grass courts! Playing here feels like being at Wimbledon.', date: '2024-08-15' },
      { id: '2', author: 'James K.', rating: 5, comment: 'Top-notch facilities and well-maintained courts. Worth every penny!', date: '2024-08-10' }
    ]
  },
  {
    id: '2',
    name: 'Central Park Tennis Center',
    location: 'New York, NY',
    rating: 4.7,
    reviewCount: 203,
    surface: 'Hard Court',
    lighting: true,
    indoor: false,
    hourlyRate: 45,
    distance: '0.8 km',
    availability: 'Busy',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop',
    description: 'Premium hard courts in the heart of Manhattan with stunning city views.',
    amenities: ['Equipment Rental', 'Coaching', 'Cafe', 'Restrooms'],
    reviews: [
      { id: '3', author: 'Mike R.', rating: 5, comment: 'Great location and the courts are always in excellent condition.', date: '2024-08-20' },
      { id: '4', author: 'Lisa T.', rating: 4, comment: 'Love playing here! Gets busy on weekends but worth the wait.', date: '2024-08-18' }
    ]
  },
  {
    id: '3',
    name: 'Sunset Clay Courts',
    location: 'Miami Beach, FL',
    rating: 4.5,
    reviewCount: 89,
    surface: 'Clay',
    lighting: true,
    indoor: false,
    hourlyRate: 35,
    distance: '1.5 km',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
    description: 'Authentic European-style clay courts with ocean breeze and sunset views.',
    amenities: ['Showers', 'Ball Machine', 'Snack Bar'],
    reviews: [
      { id: '5', author: 'Carlos P.', rating: 5, comment: 'Perfect clay courts! The sunset games here are magical.', date: '2024-08-12' },
      { id: '6', author: 'Anna L.', rating: 4, comment: 'Great surface for learning clay court tennis. Very well maintained.', date: '2024-08-08' }
    ]
  },
  {
    id: '4',
    name: 'Indoor Tennis Academy',
    location: 'Seattle, WA',
    rating: 4.8,
    reviewCount: 156,
    surface: 'Hard Court',
    lighting: true,
    indoor: true,
    hourlyRate: 55,
    distance: '3.2 km',
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1554068334-909b83e04323?w=400&h=300&fit=crop',
    description: 'State-of-the-art indoor facility with climate control and professional lighting.',
    amenities: ['Pro Shop', 'Fitness Center', 'Physical Therapy', 'Childcare'],
    reviews: [
      { id: '7', author: 'David W.', rating: 5, comment: 'Perfect for year-round play. Amazing facilities and friendly staff.', date: '2024-08-22' }
    ]
  },
  // Adding more courts to reach 60+
  ...Array.from({ length: 56 }, (_, i) => ({
    id: `${i + 5}`,
    name: `${['Elite', 'Premium', 'Championship', 'Royal', 'Grand', 'Supreme', 'Olympic', 'Professional'][i % 8]} Tennis ${['Club', 'Center', 'Courts', 'Academy', 'Complex'][i % 5]}`,
    location: `${['Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Boston', 'Austin'][i % 10]}, ${['CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'MA', 'TX'][i % 10]}`,
    rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 300) + 20,
    surface: ['Hard Court', 'Clay', 'Grass', 'Synthetic'][i % 4],
    lighting: Math.random() > 0.3,
    indoor: Math.random() > 0.7,
    hourlyRate: Math.floor(Math.random() * 60) + 25,
    distance: `${(Math.random() * 10 + 0.5).toFixed(1)} km`,
    availability: ['Available', 'Busy', 'Full'][Math.floor(Math.random() * 3)],
    image: `https://images.unsplash.com/photo-${1544947950 + i}?w=400&h=300&fit=crop`,
    description: `${['Modern', 'Traditional', 'Luxury', 'Community', 'Professional'][i % 5]} tennis facility with excellent court conditions and ${['breathtaking views', 'top-notch amenities', 'professional instruction', 'family-friendly atmosphere', 'competitive environment'][i % 5]}.`,
    amenities: [
      ['Pro Shop', 'Locker Rooms'][Math.floor(Math.random() * 2)],
      ['Coaching', 'Equipment Rental'][Math.floor(Math.random() * 2)],
      ['Parking', 'Restaurant', 'Cafe'][Math.floor(Math.random() * 3)]
    ].filter(Boolean),
    reviews: [
      {
        id: `${i + 10}`,
        author: `${['Alex', 'Jordan', 'Casey', 'Taylor', 'Morgan'][Math.floor(Math.random() * 5)]} ${['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson'][Math.floor(Math.random() * 5)]}.`,
        rating: Math.floor(Math.random() * 2) + 4,
        comment: `${['Great courts', 'Excellent facility', 'Love playing here', 'Fantastic experience', 'Highly recommend'][Math.floor(Math.random() * 5)]}! ${['Well maintained', 'Friendly staff', 'Good value', 'Perfect location', 'Amazing atmosphere'][Math.floor(Math.random() * 5)]}.`,
        date: `2024-08-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
      }
    ]
  }))
];

const TennisCourtApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSurface, setFilterSurface] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const filteredCourts = useMemo(() => {
    return mockCourts.filter(court => {
      const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          court.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSurface = filterSurface === 'all' || court.surface.toLowerCase().includes(filterSurface.toLowerCase());
      return matchesSearch && matchesSurface;
    });
  }, [searchQuery, filterSurface]);

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCourt(null);
    setShowReviewForm(false);
  };

  const toggleFavorite = (courtId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(courtId)) {
      newFavorites.delete(courtId);
    } else {
      newFavorites.add(courtId);
    }
    setFavorites(newFavorites);
  };

  const handleSubmitReview = () => {
    if (selectedCourt && newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        author: 'You',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      // In a real app, this would be sent to a server
      selectedCourt.reviews.unshift(review);
      selectedCourt.reviewCount += 1;
      
      setNewReview({ rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${size} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (currentView === 'detail' && selectedCourt) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={handleBackToList}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-semibold text-lg truncate mx-4">{selectedCourt.name}</h1>
            <button
              onClick={() => toggleFavorite(selectedCourt.id)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart 
                className={`w-6 h-6 ${favorites.has(selectedCourt.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
              />
            </button>
          </div>
        </div>

        <div className="pb-20">
          {/* Hero Image */}
          <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(selectedCourt.availability)}`}>
                  {selectedCourt.availability}
                </span>
                <span className="text-sm opacity-90">{selectedCourt.distance}</span>
              </div>
            </div>
          </div>

          {/* Court Info */}
          <div className="bg-white p-6 -mt-4 rounded-t-3xl relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedCourt.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{selectedCourt.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(selectedCourt.rating)}
                    <span className="font-semibold ml-1">{selectedCourt.rating}</span>
                    <span className="text-sm text-gray-500">({selectedCourt.reviewCount})</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">${selectedCourt.hourlyRate}/hr</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{selectedCourt.description}</p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Surface</div>
                <div className="font-semibold">{selectedCourt.surface}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Type</div>
                <div className="font-semibold">{selectedCourt.indoor ? 'Indoor' : 'Outdoor'}</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCourt.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
                {selectedCourt.lighting && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Lighting
                  </span>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Write Review
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 animate-in slide-in-from-top duration-200">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-8 h-8 ${star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Share your experience..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitReview}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {selectedCourt.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      {renderStars(review.rating, 'w-3 h-3')}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Book Court
          </button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Tennis Courts</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courts or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'hard court', 'clay', 'grass'].map((surface) => (
              <button
                key={surface}
                onClick={() => setFilterSurface(surface)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filterSurface === surface
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {surface === 'all' ? 'All Courts' : surface.charAt(0).toUpperCase() + surface.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 py-2 text-sm text-gray-600">
        {filteredCourts.length} courts found
      </div>

      {/* Court List */}
      <div className="px-4 pb-6 space-y-4">
        {filteredCourts.map((court) => (
          <div
            key={court.id}
            onClick={() => handleCourtSelect(court)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(court.id);
                  }}
                  className="p-2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-all"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.has(court.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(court.availability)}`}>
                  {court.availability}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{court.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{court.location}</span>
                    <span className="text-sm text-gray-400">• {court.distance}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">${court.hourlyRate}/hr</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderStars(court.rating, 'w-3 h-3')}
                    <span className="text-sm font-medium">{court.rating}</span>
                    <span className="text-xs text-gray-500">({court.reviewCount})</span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {court.surface}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  {court.indoor && <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Indoor</span>}
                  {court.lighting && <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">Lit</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No courts found</h3>
          <p className="text-gray-600 max-w-sm">
            Try adjusting your search or filters to find more tennis courts in your area.
          </p>
        </div>
      )}
    </div>
  );
};

export default TennisCourtApp;