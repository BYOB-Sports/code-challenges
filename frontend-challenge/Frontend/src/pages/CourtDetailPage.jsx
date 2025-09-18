import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Star, Clock, Wifi, Car, Coffee, Dumbbell, Heart, Plus } from 'lucide-react';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import { getStoredReviews, saveReview, toggleFavorite, getFavorites } from '../utils/localStorage';

const amenityIcons = {
  'Parking': Car,
  'WiFi': Wifi,
  'Cafe': Coffee,
  'Restaurant': Coffee,
  'Gym': Dumbbell,
  'Pro Shop': Coffee,
  'Spa': Coffee,
  'Equipment Rental': Coffee,
  'Coaching': Coffee,
  'Locker Rooms': Coffee,
  'Restrooms': Coffee,
  'Water Fountains': Coffee,
  'Valet Parking': Car,
  'Concierge': Coffee,
  'Personal Training': Dumbbell,
  'Business Center': Coffee,
  'Youth Programs': Coffee,
  'Junior Programs': Coffee,
  'Community Events': Coffee,
  'Events': Coffee,
  'Tournaments': Coffee,
  'Seating Area': Coffee,
  'Picnic Area': Coffee,
  'Beach Access': Coffee,
  'Seating': Coffee
};

const CourtDetailPage = ({ court, onBack }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load stored reviews and combine with initial reviews
    const storedReviews = getStoredReviews();
    const courtStoredReviews = storedReviews[court.id] || [];
    setAllReviews([...court.reviews, ...courtStoredReviews]);
    
    // Check favorite status
    setIsFavorite(getFavorites().includes(court.id));
  }, [court.id, court.reviews]);

  const handleReviewSubmit = (reviewData) => {
    const success = saveReview(court.id, reviewData);
    if (success) {
      // Update the reviews list
      const storedReviews = getStoredReviews();
      const courtStoredReviews = storedReviews[court.id] || [];
      setAllReviews([...court.reviews, ...courtStoredReviews]);
      setShowReviewForm(false);
    }
  };

  const handleFavoriteToggle = () => {
    const newStatus = toggleFavorite(court.id);
    setIsFavorite(newStatus);
  };

  const calculateAverageRating = () => {
    if (allReviews.length === 0) return court.rating;
    const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / allReviews.length).toFixed(1);
  };

  const getBadgeColor = (category) => {
    switch (category) {
      case 'Featured':
        return 'bg-primary text-white';
      case 'Premium':
        return 'bg-blue-500 text-white';
      case 'Luxury':
        return 'bg-purple-500 text-white';
      case 'Budget Friendly':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSurfaceBadgeColor = (surface) => {
    switch (surface) {
      case 'Clay':
        return 'bg-orange-100 text-orange-800';
      case 'Hard':
        return 'bg-gray-100 text-gray-800';
      case 'Indoor':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="shadow-sm sticky top-0 z-10" style={{ backgroundColor: 'rgb(255 145 77)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors"
              aria-label="Go back to court list"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium font-body">Back to Courts</span>
            </button>
            
            <button
              onClick={handleFavoriteToggle}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? 'fill-red-300 text-red-300' : 'text-white'
                }`}
              />
              <span className="font-body">{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 py-8">
        {/* Hero Image and Info */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 animate-fade-in">
          <div className="relative">
            <img
              src={court.image}
              alt={`${court.name} tennis court`}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(court.category)}`}>
                {court.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSurfaceBadgeColor(court.surface)}`}>
                {court.surface}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">{court.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{court.location}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{calculateAverageRating()}</span>
                  <span className="text-gray-500 ml-1">({allReviews.length + court.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-1">{court.price}</div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{court.availability}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed font-body font-light">{court.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Amenities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {court.amenities.map((amenity) => {
                  const IconComponent = amenityIcons[amenity] || Coffee;
                  return (
                    <div key={amenity} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-gray-900">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 font-heading">
                  Reviews ({allReviews.length + court.reviewCount})
                </h2>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Write Review
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-6">
                  <ReviewForm
                    onSubmit={handleReviewSubmit}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}

              <ReviewsList reviews={allReviews} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 animate-slide-up">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Surface Type</span>
                  <p className="text-gray-900">{court.surface}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Court Type</span>
                  <p className="text-gray-900">{court.type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Availability</span>
                  <p className="text-gray-900">{court.availability}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <p className="text-primary font-bold text-xl">{court.price}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full btn-primary text-center">
                  Book Court
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Booking functionality coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourtDetailPage;
