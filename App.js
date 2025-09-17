import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { mockCourts } from './src/data/mockData';

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // Full width minus padding

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [reviews, setReviews] = useState({});

  const filteredCourts = mockCourts.filter(court =>
    court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    court.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating, interactive = false, onPress = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={interactive ? () => onPress(i) : null}
          disabled={!interactive}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={16}
            color={i <= rating ? '#FFD700' : '#E5E5E5'}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const handleSubmitReview = (courtId, newReview) => {
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const review = {
      id: Date.now(),
      name: newReview.name.trim(),
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: new Date().toLocaleDateString(),
    };

    setReviews(prev => ({
      ...prev,
      [courtId]: [...(prev[courtId] || []), review]
    }));
    Alert.alert('Success', 'Review submitted successfully!');
  };

  const getAverageRating = (court) => {
    const allReviews = [...(court.reviews || []), ...(reviews[court.id] || [])];
    if (allReviews.length === 0) return court.rating;
    const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / allReviews.length);
  };

  const getTotalReviewCount = (court) => {
    return (court.reviews?.length || 0) + (reviews[court.id]?.length || 0);
  };

  const renderCourtCard = ({ item }) => {
    const averageRating = getAverageRating(item);
    const totalReviews = getTotalReviewCount(item);

    return (
      <TouchableOpacity
        style={styles.courtCard}
        onPress={() => {
          setSelectedCourt(item);
          setCurrentScreen('detail');
        }}
        activeOpacity={0.95}
      >
        <Image source={{ uri: item.image }} style={styles.courtImage} />
        <View style={styles.cardContent}>
          {/* Court Name - Most Prominent */}
          <Text style={styles.courtName} numberOfLines={2}>
            {item.name}
          </Text>
          
          {/* Location - Second Priority */}
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={styles.location} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
          
          {/* Bottom Row - Price on Left, Reviews + Stars on Right */}
          <View style={styles.cardFooter}>
            <View style={styles.priceChip}>
              <View style={styles.priceChipContent}>
                <Ionicons name="cash-outline" size={16} color="#FFFFFF" style={styles.priceIcon} />
                <Text style={styles.priceChipText} numberOfLines={1} ellipsizeMode="tail">
                  {item.price}
                </Text>
              </View>
            </View>
            
            <View style={styles.reviewsRatingRow}>
              <View style={styles.reviewCountContainer}>
                <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                <Text style={styles.reviewCount}>{totalReviews}</Text>
              </View>
              <View style={styles.starsContainer}>
                {renderStars(averageRating)}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCourtsList = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="tennisball-outline" size={30} color="#FFFFFF" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Tennis Courts</Text>
            <Text style={styles.headerSubtitle}>Find your perfect court</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchInputContainer,
          isSearchFocused && styles.searchInputContainerFocused
        ]}>
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courts by name or location…"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            returnKeyType="search"
            accessibilityLabel="Search courts"
            accessibilityHint="Enter court name or location to filter results"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
              hitSlop={8}
              accessibilityLabel="Clear search"
            >
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <View style={styles.dividerLine} />
        <Text style={styles.resultsText}>
          {filteredCourts.length} court{filteredCourts.length !== 1 ? 's' : ''} found
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <FlatList
        data={filteredCourts}
        renderItem={renderCourtCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );

  const renderCourtDetail = () => {
    if (!selectedCourt) return null;

    const courtReviews = [...(selectedCourt.reviews || []), ...(reviews[selectedCourt.id] || [])];
    const averageRating = getAverageRating(selectedCourt);

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.detailHeader}>
            <Image source={{ uri: selectedCourt.image }} style={styles.detailImage} />
            <View style={styles.imageGradient} />
            
            <View style={styles.detailOverlay}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => setCurrentScreen('list')}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <View style={styles.detailInfo}>
                <Text style={styles.detailTitle}>{selectedCourt.name}</Text>
                <View style={styles.detailRating}>
                  {renderStars(averageRating)}
                  <Text style={styles.detailRatingText}>{averageRating}</Text>
                  <Text style={styles.detailReviewCount}>
                    · ({courtReviews.length} review{courtReviews.length !== 1 ? 's' : ''})
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={20} color="#6B7280" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>{selectedCourt.location}</Text>
                </View>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Ionicons name="cash-outline" size={20} color="#6B7280" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Price</Text>
                  <View style={styles.priceChip}>
                    <Text style={styles.priceChipText}>{selectedCourt.price}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoRow}>
                <Ionicons name="document-text-outline" size={20} color="#6B7280" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Description</Text>
                  <Text style={styles.infoValue}>{selectedCourt.description}</Text>
                </View>
              </View>
            </View>

            <View style={styles.amenitiesSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star-outline" size={24} color="#059669" />
                <Text style={styles.sectionTitle}>Amenities</Text>
              </View>
              <View style={styles.amenitiesContainer}>
                {selectedCourt.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#059669" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.reviewsSection}>
              <View style={styles.sectionHeader}>
                <Ionicons name="chatbubble-outline" size={24} color="#059669" />
                <Text style={styles.sectionTitle}>Reviews</Text>
              </View>
              
              {courtReviews.length === 0 ? (
                <View style={styles.emptyReviewsCard}>
                  <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
                  <Text style={styles.emptyReviewsTitle}>Be the first to share your experience!</Text>
                  <Text style={styles.emptyReviewsSubtitle}>Help others discover this amazing court</Text>
                </View>
              ) : (
                <View style={styles.reviewsList}>
                  {courtReviews.map((review) => (
                    <View key={review.id} style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <View style={styles.reviewerInfo}>
                          <Ionicons name="person-circle-outline" size={24} color="#6B7280" />
                          <Text style={styles.reviewerName}>{review.name}</Text>
                        </View>
                        <View style={styles.reviewRating}>
                          {renderStars(review.rating)}
                          <Text style={styles.reviewDate}>{review.date}</Text>
                        </View>
                      </View>
                      <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <AddReviewForm courtId={selectedCourt.id} onSubmit={handleSubmitReview} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const AddReviewForm = ({ courtId, onSubmit }) => {
    const [newReview, setNewReview] = useState({
      name: '',
      rating: 5,
      comment: '',
    });

    const isFormValid = newReview.name.trim().length > 0 && newReview.comment.trim().length > 0;
    const maxCommentLength = 300;
    const remainingChars = maxCommentLength - newReview.comment.length;

    const handleSubmit = () => {
      if (!isFormValid) return;
      onSubmit(courtId, newReview);
      setNewReview({ name: '', rating: 5, comment: '' });
    };

    return (
      <View style={styles.addReviewSection}>
        <View style={styles.sectionHeader}>
          <Ionicons name="create-outline" size={24} color="#059669" />
          <Text style={styles.sectionTitle}>Add Your Review</Text>
        </View>
        
        <View style={styles.formRow}>
          <View style={[styles.inputContainer, styles.nameInput]}>
            <Ionicons name="person-outline" size={20} color="#9CA3AF" />
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={newReview.name}
              onChangeText={(text) => setNewReview({...newReview, name: text})}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating</Text>
            <View style={styles.ratingStars}>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview({...newReview, rating})
              )}
            </View>
          </View>
        </View>
        
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
            <Text style={styles.commentLabel}>Your review</Text>
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Share your experience with this court..."
            value={newReview.comment}
            onChangeText={(text) => setNewReview({...newReview, comment: text})}
            multiline
            numberOfLines={4}
            maxLength={maxCommentLength}
            placeholderTextColor="#9CA3AF"
          />
          <View style={styles.characterCounter}>
            <Text style={[
              styles.characterCount,
              remainingChars < 50 && { color: '#EF4444' }
            ]}>
              {newReview.comment.length}/{maxCommentLength}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            !isFormValid && styles.submitButtonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          <Ionicons name="paper-plane" size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return currentScreen === 'list' ? renderCourtsList() : renderCourtDetail();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#16a34a',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    // Note: In a real app, you'd use useSafeAreaInsets() for dynamic paddingTop
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    lineHeight: 32,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '500',
    marginTop: 4,
    lineHeight: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    transform: [{ translateY: -12 }],
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: 48,
    minHeight: 44,
  },
  searchInputContainerFocused: {
    borderColor: '#16a34a',
    shadowColor: '#16a34a',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
    fontWeight: '500',
    paddingVertical: 0,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  resultsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginHorizontal: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  listContainer: {
    padding: 20,
  },
  courtCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  courtImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  // Court Name - Most Prominent
  courtName: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 26,
    marginBottom: 12,
  },
  // Location - Second Priority
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 15,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
    flex: 1,
  },
  // Bottom Row - Clean Alignment
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceChip: {
    backgroundColor: '#16a34a',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  priceChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceIcon: {
    marginRight: 6,
  },
  priceChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  reviewsRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reviewCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    padding: 2,
  },
  separator: {
    height: 0,
  },
  scrollView: {
    flex: 1,
  },
  detailHeader: {
    position: 'relative',
  },
  detailImage: {
    width: '100%',
    height: 320,
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  detailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  detailInfo: {
    backgroundColor: 'transparent',
    marginTop: 'auto',
    marginBottom: 24,
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    lineHeight: 40,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailRating: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailReviewCount: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  detailContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    margin: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
    fontWeight: '500',
  },
  priceChip: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  priceChipText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  amenitiesSection: {
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 12,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginLeft: 6,
  },
  reviewsSection: {
    padding: 24,
  },
  emptyReviewsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  emptyReviewsTitle: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyReviewsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  reviewsList: {
    gap: 16,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  reviewComment: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    fontWeight: '500',
  },
  addReviewSection: {
    padding: 24,
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    height: 48,
  },
  nameInput: {
    flex: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    fontWeight: '500',
  },
  ratingContainer: {
    flex: 0.3,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  commentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 20,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  commentInput: {
    fontSize: 16,
    color: '#111827',
    textAlignVertical: 'top',
    minHeight: 100,
    fontWeight: '500',
  },
  characterCounter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default App;