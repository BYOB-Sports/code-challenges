import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CourtDetail = ({ court, onBack, onBackToAllCourts, courts, onCourtSelect, hasSearched }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Helper function to get star color based on rating
  const getStarColor = (rating) => {
    if (rating >= 4.5) return 'text-green-500'; // Excellent (4.5-5.0)
    if (rating >= 3.5) return 'text-blue-500';  // Good (3.5-4.4)
    if (rating >= 2.5) return 'text-yellow-500'; // Average (2.5-3.4)
    if (rating >= 1.5) return 'text-orange-500'; // Poor (1.5-2.4)
    return 'text-red-500'; // Very Poor (1.0-1.4)
  };
  
  // Find current court index in the courts array
  const currentIndex = courts.findIndex(c => c.id === court.id);
  
  // Navigation functions
  const handlePrevious = () => {
    if (currentIndex > 0) {
      onCourtSelect(courts[currentIndex - 1]);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < courts.length - 1) {
      onCourtSelect(courts[currentIndex + 1]);
    }
  };

  if (!court) {
    return <div>Loading...</div>;
  }



  // Component for Court Info Card
  const CourtInfoCard = () => (
    <div className="px-4 py-4">
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{court.name}</h1>
            <p className="text-gray-500 text-sm">{court.location}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Component for Tab Navigation
  const TabNavigation = () => {
    const [activeTab, setActiveTab] = useState('about');
    
    return (
      <div className="px-4">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'review', label: 'REVIEW' },
            { id: 'about', label: 'ABOUT' },
            { id: 'map', label: 'MAP' },
            { id: 'reviews', label: 'REVIEWS' }
          ].map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.label}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="py-4">
          {activeTab === 'review' && <ReviewContent />}
          {activeTab === 'about' && <AboutContent />}
          {activeTab === 'map' && <MapContent />}
          {activeTab === 'reviews' && <ReviewsContent />}
        </div>
      </div>
    );
  };

  // Component for Review Content
  const ReviewContent = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    
    // Preset tags with emojis
    const availableTags = [
      { id: 'lighting', label: 'Good Lighting', emoji: '💡', type: 'good' },
      { id: 'surface', label: 'Great Surface', emoji: '🏟️', type: 'good' },
      { id: 'clean', label: 'Clean & Tidy', emoji: '🧹', type: 'good' },
      { id: 'staff', label: 'Friendly Staff', emoji: '👥', type: 'good' },
      { id: 'parking', label: 'Easy Parking', emoji: '🅿️', type: 'good' },
      { id: 'noisy', label: 'Too Noisy', emoji: '🔊', type: 'bad' },
      { id: 'crowded', label: 'Always Crowded', emoji: '👥', type: 'bad' }
    ];

    const handleSubmitReview = async (e) => {
      e.preventDefault();
      
      if (rating === 0) {
        setMessage('Please select a rating');
        return;
      }
      
      setIsSubmitting(true);
      setMessage('Submitting review...');
      
      try {
        // Import the submitReview function from courtApi
        const { submitReview } = await import('../api/courtApi');
        const author = authorName || 'Anonymous User';
        
        // Create review data with tags
        const reviewData = {
          rating,
          reviewText,
          author,
          tags: selectedTags,
          date: new Date().toISOString()
        };
        
        await submitReview(court.id, rating, reviewText, author, selectedTags);
        setMessage('Review submitted successfully!');
        setRating(0);
        setReviewText('');
        setAuthorName('');
        setSelectedTags([]);
        
        // Switch to reviews tab to see the new review
        setTimeout(() => {
          const tabButtons = document.querySelectorAll('[data-tab]');
          const reviewsTab = Array.from(tabButtons).find(btn => btn.textContent === 'REVIEWS');
          if (reviewsTab) reviewsTab.click();
        }, 1000);
        
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderStars = () => {
      return Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hoveredRating || rating);
        const currentRating = hoveredRating || rating;
        const starColor = isFilled ? getStarColor(currentRating) : 'text-gray-300';
        
        return (
          <motion.button
            key={i}
            type="button"
            className={`text-4xl transition-colors duration-200 ${starColor} hover:${getStarColor(starValue)}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSubmitting}
          >
            ★
          </motion.button>
        );
      });
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Rate This Court</h3>
          <p className="text-gray-600 text-sm mb-6">Share your experience to help other players</p>
        </div>
        
        <form onSubmit={handleSubmitReview} className="space-y-6">
      <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Rating: {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
            </label>
            <div className="flex justify-center space-x-2 mb-2">
              {renderStars()}
            </div>
            <p className="text-xs text-gray-500">
              Click on a star to rate (1-5 stars)
            </p>
          </div>
          
          <div>
            <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (Optional):
            </label>
            <input
              id="author-name"
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your name or leave blank for anonymous"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What did you like/dislike? (Select up to 3):
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {availableTags.map((tag) => (
                <motion.button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    if (selectedTags.includes(tag.id)) {
                      setSelectedTags(prev => prev.filter(id => id !== tag.id));
                    } else if (selectedTags.length < 3) {
                      setSelectedTags(prev => [...prev, tag.id]);
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTags.includes(tag.id)
                      ? tag.type === 'good' 
                        ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                        : 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  } ${selectedTags.length >= 3 && !selectedTags.includes(tag.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: selectedTags.length >= 3 && !selectedTags.includes(tag.id) ? 1 : 1.02 }}
                  whileTap={{ scale: selectedTags.length >= 3 && !selectedTags.includes(tag.id) ? 1 : 0.98 }}
                  disabled={isSubmitting || (selectedTags.length >= 3 && !selectedTags.includes(tag.id))}
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.label}</span>
                </motion.button>
              ))}
        </div>
            <p className="text-xs text-gray-500 mb-4">
              {selectedTags.length}/3 tags selected
            </p>
      </div>
      
          <div>
            <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
              Write a Review:
            </label>
            <textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this court..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isSubmitting}
            />
          </div>
      
      <motion.button
            type="submit" 
            disabled={isSubmitting || rating === 0}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            whileHover={{ scale: isSubmitting || rating === 0 ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting || rating === 0 ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </motion.button>
          
          {message && (
            <motion.p 
              className={`text-center font-medium ${
                message.includes('Error') ? 'text-red-600' : 'text-green-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.p>
          )}
        </form>
    </div>
  );
  };

  // Component for About Content
  const AboutContent = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">About {court.name}</h3>
              <p className="text-gray-600 leading-relaxed">
                {court.description} Located in a convenient area with easy access and parking.
              </p>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
        <div className="grid grid-cols-2 gap-2">
          {court.facilities.map((facility, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-green-500">✓</span>
              <span>{facility}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Component for Map Content
  const MapContent = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-medium text-gray-900">{court.name}</p>
              <p className="text-sm text-gray-600">{court.address}</p>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Map View</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">📞</span>
          <span className="text-gray-600">{court.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">🕒</span>
          <span className="text-gray-600">{court.hours}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg">💰</span>
          <span className="text-green-600 font-medium">{court.price}</span>
        </div>
      </div>
    </div>
  );

  // Component for Reviews Content
  const ReviewsContent = () => {
    const [currentReviewPage, setCurrentReviewPage] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [selectedTagFilter, setSelectedTagFilter] = useState('all');
    const reviewsPerPage = 5;
    
    // Available tags for filtering
    const availableTags = [
      { id: 'lighting', label: 'Good Lighting', emoji: '💡', type: 'good' },
      { id: 'surface', label: 'Great Surface', emoji: '🏟️', type: 'good' },
      { id: 'clean', label: 'Clean & Tidy', emoji: '🧹', type: 'good' },
      { id: 'staff', label: 'Friendly Staff', emoji: '👥', type: 'good' },
      { id: 'parking', label: 'Easy Parking', emoji: '🅿️', type: 'good' },
      { id: 'noisy', label: 'Too Noisy', emoji: '🔊', type: 'bad' },
      { id: 'crowded', label: 'Always Crowded', emoji: '👥', type: 'bad' }
    ];
    
    // Load reviews from localStorage
    React.useEffect(() => {
      const loadReviews = () => {
        try {
          const courtsData = localStorage.getItem('courts');
          if (courtsData) {
            const courts = JSON.parse(courtsData);
            const currentCourt = courts.find(c => c.id === court.id);
            if (currentCourt && currentCourt.reviews) {
              // Combine stored reviews with sample reviews for demo
              const sampleReviews = [
                { id: 'sample-1', author: "Sarah M.", rating: 5, date: "2 days ago", text: "Great lighting for evening games. Court surface is well-maintained.", tags: ['lighting', 'surface'] },
                { id: 'sample-2', author: "Mike R.", rating: 4, date: "1 week ago", text: "Solid court surface and easy parking. Can get noisy during peak hours.", tags: ['surface', 'parking', 'noisy'] },
                { id: 'sample-3', author: "Emma L.", rating: 5, date: "2 weeks ago", text: "Excellent court with friendly staff. Perfect lighting and clean facilities.", tags: ['staff', 'lighting', 'clean'] },
                { id: 'sample-4', author: "David K.", rating: 4, date: "3 weeks ago", text: "Good location and helpful staff. Gets crowded on weekends.", tags: ['staff', 'crowded'] },
                { id: 'sample-5', author: "Lisa P.", rating: 5, date: "1 month ago", text: "Perfect for weekly games. Clean court with great lighting and easy parking.", tags: ['clean', 'lighting', 'parking'] },
                { id: 'sample-6', author: "Tom W.", rating: 3, date: "1 month ago", text: "Okay court but could be cleaner. Lighting is decent though.", tags: ['clean'] },
                { id: 'sample-7', author: "Anna S.", rating: 4, date: "2 months ago", text: "Fair price and well-maintained court. Booking is simple.", tags: ['surface'] },
                { id: 'sample-8', author: "Chris B.", rating: 5, date: "2 months ago", text: "One of the better courts around here. Would recommend.", tags: ['staff', 'surface'] }
              ];
              
              // Convert stored reviews to display format
              const storedReviews = currentCourt.reviews.map(review => ({
                id: review.id,
                author: review.author,
                rating: review.rating,
                date: formatDate(review.date),
                text: review.text,
                tags: review.tags || []
              }));
              
              // Combine and sort by date (newest first)
              const allReviews = [...storedReviews, ...sampleReviews];
              allReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
              setReviews(allReviews);
              setFilteredReviews(allReviews);
            } else {
              // Fallback to sample reviews
              setReviews([
                { id: 'sample-1', author: "Sarah M.", rating: 5, date: "2 days ago", text: "Great lighting for evening games. Court surface is well-maintained.", tags: ['lighting', 'surface'] },
                { id: 'sample-2', author: "Mike R.", rating: 4, date: "1 week ago", text: "Solid court surface and easy parking. Can get noisy during peak hours.", tags: ['surface', 'parking', 'noisy'] },
                { id: 'sample-3', author: "Emma L.", rating: 5, date: "2 weeks ago", text: "Excellent court with friendly staff. Perfect lighting and clean facilities.", tags: ['staff', 'lighting', 'clean'] },
                { id: 'sample-4', author: "David K.", rating: 4, date: "3 weeks ago", text: "Good location and helpful staff. Gets crowded on weekends.", tags: ['staff', 'crowded'] },
                { id: 'sample-5', author: "Lisa P.", rating: 5, date: "1 month ago", text: "Perfect for weekly games. Clean court with great lighting and easy parking.", tags: ['clean', 'lighting', 'parking'] },
                { id: 'sample-6', author: "Tom W.", rating: 3, date: "1 month ago", text: "Okay court but could be cleaner. Lighting is decent though.", tags: ['clean'] },
                { id: 'sample-7', author: "Anna S.", rating: 4, date: "2 months ago", text: "Fair price and well-maintained court. Booking is simple.", tags: ['surface'] },
                { id: 'sample-8', author: "Chris B.", rating: 5, date: "2 months ago", text: "One of the better courts around here. Would recommend.", tags: ['staff', 'surface'] }
              ]);
            }
          }
        } catch (error) {
          console.error('Error loading reviews:', error);
        }
      };
      
      loadReviews();
      
      // Listen for storage changes to update reviews in real-time
      const handleStorageChange = () => {
        loadReviews();
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, [court.id]);
    
    // Filter reviews based on selected tag
    React.useEffect(() => {
      if (selectedTagFilter === 'all') {
        setFilteredReviews(reviews);
      } else {
        const filtered = reviews.filter(review => 
          review.tags && review.tags.includes(selectedTagFilter)
        );
        setFilteredReviews(filtered);
      }
      setCurrentReviewPage(1); // Reset to first page when filtering
    }, [selectedTagFilter, reviews]);
    
    // Helper function to format dates
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 14) return "1 week ago";
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      if (diffDays < 60) return "1 month ago";
      return `${Math.ceil(diffDays / 30)} months ago`;
    };
    
    const totalReviewPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    const startIndex = (currentReviewPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const currentReviews = filteredReviews.slice(startIndex, endIndex);
    
    const renderStars = (rating) => {
      return (
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium text-gray-700">{rating}</span>
        </div>
      );
    };
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Reviews</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">4.4</span>
            <div className="flex">{renderStars(4)}</div>
            <span className="text-gray-500 text-sm">({filteredReviews.length} reviews)</span>
          </div>
        </div>
        
        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedTagFilter('all')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedTagFilter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Reviews
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTagFilter(tag.id)}
              className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center gap-1 ${
                selectedTagFilter === tag.id
                  ? tag.type === 'good'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{tag.emoji}</span>
              <span>{tag.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {currentReviews.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  {renderStars(review.rating)}
                </div>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm mb-3">{review.text || review.comment}</p>
              {review.tags && review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {review.tags.map((tagId) => {
                    const tag = availableTags.find(t => t.id === tagId);
                    return tag ? (
                      <span
                        key={tagId}
                        className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                          tag.type === 'good'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <span>{tag.emoji}</span>
                        <span>{tag.label}</span>
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Review Pagination */}
        {totalReviewPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setCurrentReviewPage(currentReviewPage - 1)}
              disabled={currentReviewPage === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentReviewPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            
            <span className="text-gray-500 text-sm px-2">
              {currentReviewPage} of {totalReviewPages}
            </span>
            
            <button
              onClick={() => setCurrentReviewPage(currentReviewPage + 1)}
              disabled={currentReviewPage === totalReviewPages}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentReviewPage === totalReviewPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  // Component for Rating Content
  const RatingContent = () => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    const ratingCategories = [
      { id: 'surface', label: 'Court Surface', icon: '🏟️' },
      { id: 'lighting', label: 'Lighting', icon: '💡' },
      { id: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
      { id: 'parking', label: 'Parking', icon: '🅿️' },
      { id: 'staff', label: 'Staff', icon: '👥' },
      { id: 'value', label: 'Value', icon: '💰' }
    ];

    const handleSubmitRating = async (e) => {
      e.preventDefault();
      
      if (rating === 0) {
        setMessage('Please select a rating');
        return;
      }
      
      setIsSubmitting(true);
      setMessage('Submitting rating...');
      
      try {
        // Import the submitReview function from courtApi
        const { submitReview } = await import('../api/courtApi');
        const author = authorName || 'Anonymous User';
        
        // Create enhanced review data
        const reviewData = {
          rating,
          reviewText,
          author,
          categories: selectedCategories,
          date: new Date().toISOString()
        };
        
        await submitReview(court.id, rating, reviewText, author);
        setMessage('Review submitted successfully! Thank you for your feedback.');
        setRating(0);
        setReviewText('');
        setAuthorName('');
        setSelectedCategories([]);
        
        // Refresh the court data to show updated rating
        // You might want to trigger a refresh of the court data here
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    };

    const renderStars = () => {
      return Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hoveredRating || rating);
        
        return (
          <motion.button
            key={i}
            type="button"
            className={`text-3xl transition-colors duration-200 ${
              isFilled ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isSubmitting}
          >
            ★
          </motion.button>
        );
      });
    };

    return (
      <div className="px-4">
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Rate This Court</h3>
          
          <form onSubmit={handleSubmitRating} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Overall Rating: {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
              </label>
              <div className="flex justify-center space-x-2 mb-2">
                {renderStars()}
              </div>
              <p className="text-xs text-gray-500 text-center">
                Click on a star to rate (1-5 stars)
              </p>
            </div>
            
            <div>
              <label htmlFor="author-name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name (Optional):
              </label>
              <input
                id="author-name"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name or leave blank for anonymous"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What did you like? (Select all that apply):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {ratingCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategories(prev => 
                        prev.includes(category.id) 
                          ? prev.filter(id => id !== category.id)
                          : [...prev, category.id]
                      );
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                Write a Review:
              </label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your detailed experience with this court. What did you like? What could be improved?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            
            <motion.button 
              type="submit" 
              disabled={isSubmitting || rating === 0}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              whileHover={{ scale: isSubmitting || rating === 0 ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || rating === 0 ? 1 : 0.98 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Rating'}
            </motion.button>
            
            {message && (
              <motion.p 
                className={`text-center font-medium ${
                  message.includes('Error') ? 'text-red-600' : 'text-green-600'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {message}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    );
  };

  // Component for Image Carousel
  const ImageCarousel = () => (
    <div className="px-4 py-4">
      <div className="relative rounded-xl overflow-hidden">
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (court.images.length > 1) {
              setCurrentImageIndex(currentImageIndex === court.images.length - 1 ? 0 : currentImageIndex + 1);
            }
          }}
          className="cursor-pointer"
        >
          <img
            src={court.images[currentImageIndex]}
            alt={`${court.name} ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover"
          />
        </motion.div>
      
        {/* Distance Tag */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          1.2 mi away
        </div>
        
        {/* Dots Indicator */}
        {court.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {court.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );


  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onBack}
    >
      {/* Background Overlay with 10% darken filter */}
      <motion.div
        className="absolute inset-0 bg-black/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      {/* Court Detail Panel */}
      <motion.div
        className="relative bg-white rounded-t-3xl w-full max-h-[90vh] overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.2 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 100 || info.velocity.y > 500) {
            onBack();
          }
        }}
      >
        {/* Drag Handle with safe area spacing for iPhone 12 */}
        <div className="flex justify-center pt-6 pb-3 cursor-pointer" onClick={onBack}>
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Navigation Header */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={hasSearched ? onBackToAllCourts : onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">←</span>
              <span className="text-sm font-medium">
                {hasSearched ? 'All Courts' : 'Back'}
              </span>
            </motion.button>
            
            <div className="flex items-center gap-2">
              <img
                src="/image.png"
                alt="Tennis Court Finder"
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">Court Details</span>
            </div>
            
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-100px)] pb-16">
          <ImageCarousel />
          <CourtInfoCard />
          <TabNavigation />
        </div>

        {/* Bottom Navigation with safe area spacing for iPhone 12 */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 pb-safe flex items-center justify-between sticky bottom-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentIndex === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </motion.button>
          
          <span className="text-gray-500 text-sm">
            {currentIndex + 1} of {courts.length}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentIndex === courts.length - 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentIndex === courts.length - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourtDetail;