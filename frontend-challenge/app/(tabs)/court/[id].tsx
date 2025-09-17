import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Clock, 
  Wifi, 
  Car, 
  Coffee,
  ShowerHead,
  Zap,
  Users
} from 'lucide-react-native';
import { mockCourts, type Court, type Review } from '@/data/courts';

const amenityIcons = {
  'Lighting': Zap,
  'Pro Shop': Users,
  'Restrooms': ShowerHead,
  'Parking': Car,
  'Café': Coffee,
  'Equipment Rental': Users,
  'Locker Rooms': ShowerHead,
  'Climate Control': Zap,
  'Wi-Fi': Wifi,
  'Restaurant': Coffee,
  'Fitness Center': Users,
  'Swimming Pool': Users,
  'Concierge': Users,
  'Valet Parking': Car,
  'Business Center': Users,
  'Spa': ShowerHead,
  'Wine Bar': Coffee,
  'Multiple Courts': Users,
  'Tournament Facilities': Users,
  'Stadium Seating': Users,
  'River Views': MapPin,
  'Harbor Views': MapPin,
  'Ocean Views': MapPin,
  'Bridge Views': MapPin,
  'Water Fountains': ShowerHead,
  'Lessons Available': Users,
  'Youth Programs': Users,
  'Community Programs': Users,
  'Family Programs': Users,
  'Senior Leagues': Users,
  'Events Hall': Users,
  'Wedding Venue': Users,
  'Food Trucks': Coffee,
  'Craft Beer': Coffee,
  'Industrial Chic Design': Users,
  'Live Music': Users,
  'Local Art Shows': Users,
  'Artistic Murals': Users,
  'Community Center': Users,
  'Arts Programs': Users,
  'Garden Setting': MapPin,
  'Tea Service': Coffee,
  'Multilingual Staff': Users,
  'Cultural Events': Users,
  'Tai Chi Classes': Users,
  'Music Programs': Users,
  'Community Garden': MapPin,
  'Wedding Photography': Users,
  'Italian Restaurant': Coffee,
  'Cooking Classes': Coffee,
  'Tram Access': Car,
  'Peaceful Setting': MapPin,
  'Hill Views': MapPin,
  'Nature Trails': MapPin,
  'Park Setting': MapPin,
  'Historic Setting': MapPin,
  'Beautiful Gardens': MapPin,
  'Early/Late Hours': Clock,
  'Family Friendly': Users,
  'Multicultural Programs': Users,
  'Youth Development': Users,
  'Community Outreach': Users,
  'Music Events': Users,
  'Senior Discounts': Users,
  'Children\'s Programs': Users,
  'Boutique Pro Shop': Users,
  'Personal Training': Users,
  'Yoga Studio': Users,
  'Holistic Wellness': Users,
  'Social Events': Users,
  'Bocce Courts': Users,
  'Italian Café': Coffee,
  'Old World Charm': MapPin,
  'Tennis Lessons': Users,
  'Pro Coaching': Users,
};

export default function CourtDetailScreen() {
  const { id } = useLocalSearchParams();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const court = mockCourts.find(c => c.id === id);

  if (!court) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Court not found</Text>
      </SafeAreaView>
    );
  }

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      Alert.alert('Error', 'Please enter a review comment');
      return;
    }

    // In a real app, this would submit to a backend
    Alert.alert(
      'Review Submitted',
      'Thank you for your review! It will be visible after moderation.',
      [{ text: 'OK', onPress: () => {
        setShowReviewForm(false);
        setReviewText('');
        setReviewRating(5);
      }}]
    );
  };

  const renderStars = (rating: number, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress?.(star)}
            disabled={!onPress}
          >
            <Star
              size={onPress ? 24 : 16}
              color="#F59E0B"
              fill={star <= rating ? "#F59E0B" : "transparent"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAmenity = (amenity: string) => {
    const IconComponent = amenityIcons[amenity] || Users;
    return (
      <View key={amenity} style={styles.amenityItem}>
        <IconComponent size={16} color="#22C55E" />
        <Text style={styles.amenityText}>{amenity}</Text>
      </View>
    );
  };

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.reviewAuthor}>{review.author}</Text>
          <Text style={styles.reviewDate}>
            {new Date(review.date).toLocaleDateString()}
          </Text>
        </View>
        {renderStars(review.rating)}
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: court.image }} style={styles.headerImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Court Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.courtName}>{court.name}</Text>
          
          <View style={styles.locationRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.location}>{court.location}</Text>
          </View>
          
          <Text style={styles.address}>{court.address}</Text>

          <View style={styles.ratingRow}>
            {renderStars(court.rating)}
            <Text style={styles.rating}>{court.rating}</Text>
            <Text style={styles.reviewCount}>({court.reviewCount} reviews)</Text>
          </View>

          <View style={styles.tagRow}>
            <Text style={styles.surfaceTag}>{court.surface}</Text>
            <Text style={styles.priceTag}>{court.priceRange}</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{court.description}</Text>

          {/* Amenities */}
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {court.amenities.map(renderAmenity)}
          </View>

          {/* Reviews Section */}
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews ({court.reviews.length})</Text>
            <TouchableOpacity
              style={styles.writeReviewButton}
              onPress={() => setShowReviewForm(!showReviewForm)}
            >
              <Text style={styles.writeReviewText}>Write Review</Text>
            </TouchableOpacity>
          </View>

          {/* Review Form */}
          {showReviewForm && (
            <View style={styles.reviewForm}>
              <Text style={styles.formTitle}>Write a Review</Text>
              
              <Text style={styles.formLabel}>Rating</Text>
              {renderStars(reviewRating, setReviewRating)}
              
              <Text style={styles.formLabel}>Your Review</Text>
              <TextInput
                style={styles.reviewInput}
                multiline
                numberOfLines={4}
                placeholder="Share your experience at this tennis court..."
                value={reviewText}
                onChangeText={setReviewText}
                textAlignVertical="top"
              />
              
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowReviewForm(false);
                    setReviewText('');
                    setReviewRating(5);
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

          {/* Reviews List */}
          {court.reviews.length > 0 ? (
            court.reviews.map(renderReview)
          ) : (
            <Text style={styles.noReviews}>No reviews yet. Be the first to review!</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  courtName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 6,
  },
  address: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  surfaceTag: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  priceTag: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 6,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  writeReviewText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  reviewForm: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  reviewInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
    marginBottom: 16,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewComment: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
  },
  noReviews: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});