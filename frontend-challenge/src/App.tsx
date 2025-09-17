import React, { useState, useMemo } from 'react';
import { Search, Star, ArrowLeft, MapPin, Clock } from 'lucide-react';
import './App.css';

// TypeScript interfaces
interface Court {
  id: number;
  name: string;
  location: string;
  surface: string;
  indoor: boolean;
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  image: string;
  amenities: string[];
  openHours: string;
  description: string;
  reviews: Review[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

// Mock data for 65+ tennis courts
const generateMockCourts = (): Court[] => {
  const locations = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Jersey City', 'Hoboken', 'Newark', 'Long Island', 'Westchester'];
  const courtNames = ['Tennis Club', 'Sports Center', 'Athletic Club', 'Recreation Center', 'Tennis Academy', 'Country Club', 'Park Courts', 'Community Center'];
  const surfaces = ['Hard Court', 'Clay Court', 'Grass Court', 'Indoor Hard', 'Outdoor Hard'];
  
  // Actual tennis images from the Unsplash tennis collection you provided
  const tennisImages = [
    'https://images.unsplash.com/photo-1632755898125-36cd72575dde?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1580763850690-44fd66eb2863?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1572854252129-a18ce4979ff4?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1582019887147-f7b01b4ba41e?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1546339851-35c3ad161812?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1580153111806-5007b971dfe7?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1530915365347-e35b749a0381?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1519672808815-bdd52bb3bd41?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1559389768-76aa70aa515d?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1543204467-f385a642f1e3?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=400&h=300&fit=crop&crop=center',
  ];
  
  return Array.from({ length: 65 }, (_, i) => ({
    id: i + 1,
    name: `${locations[i % locations.length]} ${courtNames[i % courtNames.length]}`,
    location: `${Math.floor(Math.random() * 999) + 100} ${['Main St', 'Park Ave', 'Tennis Rd', 'Sports Way', 'Court Dr'][i % 5]}, ${locations[i % locations.length]}`,
    surface: surfaces[i % surfaces.length],
    indoor: Math.random() > 0.6,
    pricePerHour: Math.floor(Math.random() * 50) + 25,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 200) + 5,
    image: tennisImages[i % tennisImages.length],
    amenities: ['Parking', 'Restrooms', 'Pro Shop', 'Lessons Available', 'Equipment Rental'].slice(0, Math.floor(Math.random() * 3) + 2),
    openHours: '6:00 AM - 10:00 PM',
    description: `Professional ${surfaces[i % surfaces.length].toLowerCase()} facility with excellent playing conditions and modern amenities.`,
    reviews: [
      {
        id: 1,
        user: 'Sarah M.',
        rating: Math.floor(Math.random() * 2) + 4,
        date: '2024-09-10',
        comment: 'Great court surface and well-maintained facility. Highly recommend!'
      },
      {
        id: 2,
        user: 'Mike R.',
        rating: Math.floor(Math.random() * 2) + 3,
        date: '2024-09-08',
        comment: 'Good location and reasonable prices. Court lighting could be better.'
      }
    ]
  }));
};

const App: React.FC = () => {
  const [courts] = useState<Court[]>(generateMockCourts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Filter courts based on search term
  const filteredCourts = useMemo(() => {
    return courts.filter(court => 
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.surface.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courts, searchTerm]);

  const handleCourtSelect = (court: Court) => {
    setSelectedCourt(court);
    setShowReviewForm(false);
    setNewReview({ rating: 0, comment: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedCourt(null);
    setShowReviewForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitReview = () => {
    if (newReview.comment.trim() && newReview.rating > 0 && selectedCourt) {
      const newReviewObj: Review = {
        id: Date.now(),
        user: 'You',
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment
      };

      const updatedCourt: Court = {
        ...selectedCourt,
        reviews: [newReviewObj, ...selectedCourt.reviews],
        reviewCount: selectedCourt.reviewCount + 1,
        rating: Number(((selectedCourt.rating * selectedCourt.reviewCount + newReview.rating) / (selectedCourt.reviewCount + 1)).toFixed(1))
      };
      
      setSelectedCourt(updatedCourt);
      setNewReview({ rating: 0, comment: '' });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void, size = 'sm') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size === 'lg' ? 24 : size === 'md' ? 20 : 16}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  // Court List View
  if (!selectedCourt) {
    return (
      <div className="app-container">
        {/* Mobile Header */}
        <div className="header">
          <div className="header-content">
            <h1 className="header-title">🎾 Tennis Courts</h1>
            
            {/* Search Bar */}
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search courts..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-header">
          <p className="results-count">
            {filteredCourts.length} court{filteredCourts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Court List */}
        <div className="court-list">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="court-card"
              onClick={() => handleCourtSelect(court)}
            >
              <img 
                src={court.image} 
                alt={court.name}
                className="court-image"
              />
              <div className="court-info">
                <div className="court-header">
                  <h3 className="court-name">
                    {court.name}
                  </h3>
                  <div className="rating-container">
                    {renderStars(Math.round(court.rating))}
                    <span className="review-count">
                      ({court.reviewCount})
                    </span>
                  </div>
                </div>
                
                <div className="court-location">
                  <MapPin size={14} className="location-icon" />
                  <span>{court.location}</span>
                </div>
                
                <div className="court-bottom">
                  <div className="court-tags">
                    <span className="surface-tag">
                      {court.surface}
                    </span>
                    {court.indoor && (
                      <span className="indoor-tag">
                        Indoor
                      </span>
                    )}
                  </div>
                  <span className="court-price">
                    ${court.pricePerHour}/hr
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Court Detail View
  return (
    <div className="app-container">
      {/* Detail Header */}
      <div className="detail-header">
        <button onClick={handleBackToList} className="back-button">
          <ArrowLeft size={20} />
        </button>
        <h1 className="detail-title">
          {selectedCourt.name}
        </h1>
      </div>

      <div className="detail-content">
        {/* Court Image */}
        <img 
          src={selectedCourt.image} 
          alt={selectedCourt.name}
          className="detail-image"
        />

        {/* Court Info Card */}
        <div className="info-card">
          <div className="info-header">
            <div>
              <h2 className="detail-court-name">{selectedCourt.name}</h2>
              <div className="detail-rating">
                {renderStars(Math.round(selectedCourt.rating), false, undefined, 'md')}
                <span className="detail-rating-text">
                  {selectedCourt.rating} ({selectedCourt.reviewCount} reviews)
                </span>
              </div>
            </div>
            <span className="detail-price">
              ${selectedCourt.pricePerHour}/hr
            </span>
          </div>

          <div className="detail-info">
            <div className="detail-info-item">
              <MapPin size={16} />
              <span>{selectedCourt.location}</span>
            </div>
            <div className="detail-info-item">
              <Clock size={16} />
              <span>{selectedCourt.openHours}</span>
            </div>
          </div>

          <div className="detail-tags">
            <span className="surface-tag">
              {selectedCourt.surface}
            </span>
            {selectedCourt.indoor && (
              <span className="indoor-tag">
                Indoor
              </span>
            )}
          </div>

          <p className="description">{selectedCourt.description}</p>
        </div>

        {/* Amenities Card */}
        <div className="info-card">
          <h3 className="section-title">Amenities</h3>
          <div className="amenities-grid">
            {selectedCourt.amenities.map((amenity, index) => (
              <span key={index} className="amenity-tag">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Card */}
        <div className="info-card">
          <div className="reviews-header">
            <h3 className="section-title">Reviews</h3>
            <button
              onClick={() => setShowReviewForm(true)}
              className="write-review-btn"
            >
              Write Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="review-form">
              <h4 className="review-form-title">Leave a Review</h4>
              <div className="rating-selector">
                <span className="rating-label">Rating:</span>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview({...newReview, rating})
                )}
              </div>
              <textarea
                placeholder="Share your experience..."
                className="review-textarea"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                rows={4}
              />
              <div className="review-form-actions">
                <button
                  onClick={handleSubmitReview}
                  className="submit-btn"
                  disabled={!newReview.comment.trim() || newReview.rating === 0}
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Review List */}
          <div className="reviews-list">
            {selectedCourt.reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                {renderStars(review.rating)}
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;