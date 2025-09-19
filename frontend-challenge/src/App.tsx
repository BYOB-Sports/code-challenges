import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  TextInput, 
  ScrollView, 
  Alert 
} from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
import { mockCourts, mockReviews } from './data/mockData';

/**
 * Tennis Court Reviewer App
 * 
 * A mobile-first React Native app for discovering and reviewing tennis courts.
 * Features include court search, filtering, detailed views, and review system.
 * 
 * Key Features:
 * - Browse 52+ tennis courts with detailed information
 * - Search courts by name, location, or features
 * - Filter courts by tags (Outdoor, Indoor, Hard Court, Clay, etc.)
 * - View detailed court information and reviews
 * - Submit and rate courts with star ratings
 * - Hinge-inspired modern UI design
 */

export default function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  /**
   * Navigation state - tracks which court is currently being viewed
   * null = showing court list, object = showing court detail
   */
  const [selectedCourt, setSelectedCourt] = useState(null);
  
  /**
   * Search and filtering state
   * - searchQuery: text input for searching courts
   * - showFilterModal: controls filter modal visibility
   * - selectedTags: array of selected filter tags
   */
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  
  /**
   * Review system state
   * - reviews: all reviews (initial + user-submitted)
   * - showRatingInput: controls rating input modal visibility
   * - newRating: star rating for new review (0-5)
   * - newComment: text comment for new review
   */
  const [reviews, setReviews] = useState(mockReviews);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');

  // ============================================================================
  // COMPUTED VALUES & DATA PROCESSING
  // ============================================================================
  
  /**
   * Filter courts based on search query and selected tags
   * - Search matches: court name, location, or any tag
   * - Tag filtering: court must have ALL selected tags
   */
  const filteredCourts = mockCourts.filter(court => {
    const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(selectedTag => court.tags.includes(selectedTag));
    
    return matchesSearch && matchesTags;
  });

  /**
   * Get reviews for the currently selected court
   */
  const courtReviews = selectedCourt ? reviews.filter(r => r.courtId === selectedCourt.id) : [];

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  
  /**
   * Handle star rating selection for new reviews
   */
  const handleStarPress = (rating: number) => {
    setNewRating(rating);
  };

  /**
   * Submit a new review for the selected court
   * - Validates that a rating is selected
   * - Creates new review object with current timestamp
   * - Updates reviews state and resets form
   */
  const handleSubmitReview = () => {
    if (newRating === 0) {
      Alert.alert('Please select a rating', 'You must rate the court before submitting your review.');
      return;
    }
    
    const newReview = {
      id: Date.now().toString(),
      courtId: selectedCourt.id,
      userName: 'You',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    
    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setShowRatingInput(false);
    Alert.alert('Review submitted!', 'Thank you for your feedback.');
  };

  /**
   * Toggle tag selection in filter modal
   */
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  /**
   * Clear all selected filters
   */
  const clearFilters = () => {
    setSelectedTags([]);
  };

  /**
   * Apply selected filters and close modal
   */
  const applyFilters = () => {
    setShowFilterModal(false);
  };

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================
  
  /**
   * Render star rating display
   * @param rating - Numeric rating (0-5)
   * @param size - Display size ('small' | 'large')
   */
  const renderStars = (rating: number, size: 'small' | 'large' = 'small') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('★');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    
    return (
      <View style={[styles.ratingContainer, size === 'large' && styles.largeRatingContainer]}>
        <Text style={[styles.star, size === 'large' && styles.largeStar]}>
          {stars.join('')}
        </Text>
        <Text style={[styles.ratingText, size === 'large' && styles.largeRatingText]}>
          {rating} ({courtReviews.length})
        </Text>
      </View>
    );
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================
  
  /**
   * Render individual court card for the main list
   */
  const renderCourtCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.courtCard} 
      onPress={() => setSelectedCourt(item)}
    >
      <Image source={{ uri: item.image }} style={styles.courtImage} />
      <View style={styles.courtInfo}>
        <Text style={styles.courtName}>{item.name}</Text>
        <Text style={styles.courtLocation}>📍 {item.location}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.star}>★★★★☆</Text>
          <Text style={styles.ratingText}>{item.rating} ({item.reviewCount})</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag: string, index: number) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * Render individual review card
   */
  const renderReviewCard = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUserName}>{item.userName}</Text>
        <View style={styles.reviewRating}>
          <Text style={styles.reviewStar}>
            {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewDate}>{item.date}</Text>
      <View style={styles.reviewFooter}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Text style={styles.helpfulText}>👍 Helpful ({item.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============================================================================
  // CONSTANTS
  // ============================================================================
  
  /**
   * Available filter tags for court filtering
   */
  const availableTags = [
    'Outdoor', 'Indoor', 'Hard Court', 'Clay', 'Lighted', 'Public', 'Private',
    'Beginner Friendly', 'Advanced', 'Parking', 'Locker Rooms', 'Lessons Available',
    'Tournament Ready', 'Air Conditioned', 'Family Friendly', 'Professional'
  ];

  // ============================================================================
  // MAIN RENDER LOGIC
  // ============================================================================
  
  /**
   * Render court detail screen when a court is selected
   * Shows court information, reviews, and allows adding new reviews
   */
  if (selectedCourt) {
    return (
      <View style={styles.container}>
        {/* <StatusBar style="dark" /> */}
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedCourt(null)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Court Details</Text>
        </View>
        
        <ScrollView style={styles.detailContainer}>
          {/* Court image */}
          <Image source={{ uri: selectedCourt.image }} style={styles.detailImage} />
          
          {/* Court information */}
          <View style={styles.detailInfo}>
            <Text style={styles.detailName}>{selectedCourt.name}</Text>
            <Text style={styles.detailLocation}>📍 {selectedCourt.location}</Text>
            {renderStars(selectedCourt.rating, 'large')}
            <Text style={styles.detailPrice}>{selectedCourt.price}</Text>
            
            {/* Court tags */}
            <View style={styles.detailTags}>
              {selectedCourt.tags.map((tag: string, index: number) => (
                <View key={index} style={styles.detailTag}>
                  <Text style={styles.detailTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Reviews section */}
          <View style={styles.reviewsSection}>
            <Text style={styles.reviewsTitle}>Reviews ({courtReviews.length})</Text>
            {courtReviews.map((review: any) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUserName}>{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    <Text style={styles.reviewStar}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <View style={styles.reviewFooter}>
                  <TouchableOpacity style={styles.helpfulButton}>
                    <Text style={styles.helpfulText}>👍 Helpful ({review.helpful})</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          
          {/* Add review button */}
          <TouchableOpacity 
            style={styles.addReviewButton} 
            onPress={() => setShowRatingInput(true)}
          >
            <Text style={styles.addReviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
          
          {/* Rating input modal */}
          {showRatingInput && (
            <View style={styles.ratingInputContainer}>
              <Text style={styles.ratingInputTitle}>Rate this court:</Text>
              
              {/* Star rating input */}
              <View style={styles.starInputContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleStarPress(star)}
                    style={styles.starInputButton}
                  >
                    <Text style={[
                      styles.starInput,
                      star <= newRating ? styles.starInputSelected : styles.starInputUnselected
                    ]}>
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Comment input */}
              <TextInput
                style={styles.commentInput}
                placeholder="Write your review..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
                numberOfLines={4}
              />
              
              {/* Action buttons */}
              <View style={styles.ratingInputButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => {
                    setShowRatingInput(false);
                    setNewRating(0);
                    setNewComment('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.submitButton} 
                  onPress={handleSubmitReview}
                >
                  <Text style={styles.submitButtonText}>Submit Review</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
         </ScrollView>
       </View>
     );
   }

  /**
   * Render main court list screen
   * Shows search bar, filter button, and list of tennis courts
   */
  return (
    <View style={styles.container}>
      {/* <StatusBar style="dark" /> */}
      {/* App header with title and subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>Tennis Court Reviewer</Text>
        <Text style={styles.subtitle}>Find and review tennis courts near you</Text>
      </View>
      
      {/* Search input and filter button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search courts, locations, or features..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterButtonText}>⚙️ Filter</Text>
        </TouchableOpacity>
      </View>
      
      {/* Court list */}
      <FlatList
        data={filteredCourts}
        renderItem={renderCourtCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Filter modal */}
      {showFilterModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Tags</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            {/* Tag selection grid */}
            <View style={styles.tagsContainer}>
              {availableTags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tagButton,
                    selectedTags.includes(tag) && styles.tagButtonSelected
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={[
                    styles.tagButtonText,
                    selectedTags.includes(tag) && styles.tagButtonTextSelected
                  ]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Modal footer with action buttons */}
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton} 
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
         </View>
       )}
     </View>
   );
 }

// ============================================================================
// STYLESHEET
// ============================================================================

/**
 * StyleSheet for the Tennis Court Reviewer app
 * Uses Hinge-inspired design with clean, modern aesthetics
 * Includes responsive design for mobile-first experience
 */
const styles = StyleSheet.create({
  // ============================================================================
  // LAYOUT & CONTAINER STYLES
  // ============================================================================
  
  /**
   * Main container - full screen with light background
   */
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  
  header: {
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
    marginTop: 4,
  },
  
  // ============================================================================
  // SEARCH & FILTER STYLES
  // ============================================================================
  
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  searchInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#1a1a1a',
  },
  
  filterButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  
  // ============================================================================
  // COURT CARD STYLES
  // ============================================================================
  
  courtCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  
  courtImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  
  courtInfo: {
    padding: 20,
  },
  
  courtName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  
  courtLocation: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
    marginBottom: 8,
  },
  
  // ============================================================================
  // RATING & PRICING STYLES
  // ============================================================================
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  
  star: {
    fontSize: 16,
    color: '#ffc107',
    marginRight: 4,
  },
  
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  
  // ============================================================================
  // TAG STYLES
  // ============================================================================
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  
  // ============================================================================
  // MODAL STYLES
  // ============================================================================
  
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    marginTop: 100,
    maxHeight: '70%',
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    paddingBottom: 20,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: -0.2,
  },
  
  closeButton: {
    padding: 4,
  },
  
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  
  // ============================================================================
  // FILTER TAG STYLES
  // ============================================================================
  
  tagButton: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexShrink: 0,
    maxWidth: '45%',
  },
  
  tagButtonSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  
  tagButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  
  tagButtonTextSelected: {
    color: '#fff',
  },
  
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  
  clearButton: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  clearButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  
  applyButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  applyButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  
  // ============================================================================
  // DETAIL SCREEN STYLES
  // ============================================================================
  
  detailContainer: {
    flex: 1,
  },
  
  detailImage: {
    width: '100%',
    height: 250,
  },
  
  detailInfo: {
    padding: 20,
  },
  
  detailName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  
  detailLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  
  detailPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  
  detailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  
  detailTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  
  detailTagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  
  // ============================================================================
  // REVIEW STYLES
  // ============================================================================
  
  reviewsSection: {
    padding: 20,
  },
  
  reviewsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  reviewUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  
  reviewRating: {
    flexDirection: 'row',
  },
  
  reviewStar: {
    fontSize: 16,
    color: '#ffc107',
  },
  
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  
  helpfulButton: {
    padding: 4,
  },
  
  helpfulText: {
    fontSize: 12,
    color: '#666',
  },
  
  // ============================================================================
  // REVIEW INPUT STYLES
  // ============================================================================
  
  addReviewButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
  },
  
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  ratingInputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  ratingInputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  
  starInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  starInputButton: {
    padding: 4,
  },
  
  starInput: {
    fontSize: 24,
    color: '#ddd',
  },
  
  starInputSelected: {
    color: '#ffc107',
  },
  
  starInputUnselected: {
    color: '#ddd',
  },
  
  commentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  
  ratingInputButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  cancelButton: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  
  submitButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // ============================================================================
  // NAVIGATION STYLES
  // ============================================================================
  
  backButton: {
    padding: 8,
    marginBottom: 8,
  },
  
  backButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  
  // ============================================================================
  // RESPONSIVE STYLES
  // ============================================================================
  
  largeRatingContainer: {
    marginBottom: 16,
  },
  
  largeStar: {
    fontSize: 20,
  },
  
  largeRatingText: {
    fontSize: 16,
  },
});