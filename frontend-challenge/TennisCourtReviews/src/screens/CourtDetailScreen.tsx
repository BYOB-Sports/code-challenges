import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { CourtDetailScreenProps, TennisCourt, Review } from '../types';
import { mockCourts, mockReviews } from '../data/mockData';

const { width } = Dimensions.get('window');

const CourtDetailScreen: React.FC<CourtDetailScreenProps> = ({ route }) => {
  const { courtId } = route.params;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });
  const [localReviews, setLocalReviews] = useState<Review[]>(mockReviews);

  const court = useMemo(() => 
    mockCourts.find(c => c.id === courtId), [courtId]
  );

  const courtReviews = useMemo(() => 
    localReviews.filter(review => review.courtId === courtId), [localReviews, courtId]
  );

  if (!court) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Court not found</Text>
      </SafeAreaView>
    );
  }

  const renderStars = (rating: number, interactive = false, onPress?: (rating: number) => void) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => interactive && onPress?.(i)}
          disabled={!interactive}
        >
          <Text style={[
            styles.star,
            interactive && styles.interactiveStar,
            i <= rating && styles.filledStar
          ]}>
            ★
          </Text>
        </TouchableOpacity>
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const handleBookNow = () => {
    Alert.alert(
      'Booking',
      `Would you like to book ${court.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Book Now', onPress: () => Alert.alert('Success', 'Booking confirmed!') }
      ]
    );
  };

  const handleSubmitReview = () => {
    if (!newReview.userName.trim() || !newReview.comment.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      courtId: court.id,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    setLocalReviews(prev => [review, ...prev]);
    setNewReview({ rating: 5, comment: '', userName: '' });
    setShowReviewModal(false);
    Alert.alert('Success', 'Review submitted successfully!');
  };

  const renderReviewModal = () => (
    <Modal
      visible={showReviewModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setShowReviewModal(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Write a Review</Text>
          <TouchableOpacity onPress={handleSubmitReview}>
            <Text style={styles.submitButton}>Submit</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.modalContent}>
          <Text style={styles.courtNameModal}>{court.name}</Text>
          
          <Text style={styles.sectionTitle}>Your Rating</Text>
          {renderStars(newReview.rating, true, (rating) => 
            setNewReview(prev => ({ ...prev, rating }))
          )}
          
          <Text style={styles.sectionTitle}>Your Name</Text>
          <TextInput
            style={styles.input}
            value={newReview.userName}
            onChangeText={(text) => setNewReview(prev => ({ ...prev, userName: text }))}
            placeholder="Enter your name"
            placeholderTextColor="#666"
          />
          
          <Text style={styles.sectionTitle}>Your Review</Text>
          <TextInput
            style={[styles.input, styles.commentInput]}
            value={newReview.comment}
            onChangeText={(text) => setNewReview(prev => ({ ...prev, comment: text }))}
            placeholder="Share your experience at this tennis court..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{review.userName}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      {renderStars(review.rating)}
      <Text style={styles.reviewComment}>{review.comment}</Text>
      <TouchableOpacity style={styles.helpfulButton}>
        <Text style={styles.helpfulText}>👍 Helpful ({review.helpful})</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: court.images[0] }} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={styles.courtName}>{court.name}</Text>
          <Text style={styles.location}>{court.location}</Text>
          <Text style={styles.address}>{court.address}</Text>
          
          <View style={styles.ratingSection}>
            {renderStars(court.rating)}
            <Text style={styles.ratingText}>
              {court.rating.toFixed(1)} ({court.reviewCount} reviews)
            </Text>
          </View>
          
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price per hour</Text>
            <Text style={styles.price}>${court.pricePerHour}</Text>
          </View>
          
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
          
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Surface:</Text>
              <Text style={styles.detailValue}>{court.surface}</Text>
            </View>
            {court.phoneNumber && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{court.phoneNumber}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {court.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.hoursSection}>
            <Text style={styles.sectionTitle}>Opening Hours</Text>
            {Object.entries(court.openingHours).map(([day, hours]) => (
              <View key={day} style={styles.hoursRow}>
                <Text style={styles.dayText}>{day}</Text>
                <Text style={styles.hoursText}>{hours}</Text>
              </View>
            ))}
          </View>
          
          <Text style={styles.description}>{court.description}</Text>
          
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>
                Reviews ({courtReviews.length})
              </Text>
              <TouchableOpacity
                style={styles.writeReviewButton}
                onPress={() => setShowReviewModal(true)}
              >
                <Text style={styles.writeReviewText}>Write Review</Text>
              </TouchableOpacity>
            </View>
            
            {courtReviews.length > 0 ? (
              courtReviews.map(renderReview)
            ) : (
              <Text style={styles.noReviewsText}>
                No reviews yet. Be the first to review!
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      
      {renderReviewModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 16,
  },
  courtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 18,
    color: '#ddd',
    marginRight: 2,
  },
  filledStar: {
    color: '#FFD700',
  },
  interactiveStar: {
    fontSize: 24,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D4F',
  },
  bookButton: {
    backgroundColor: '#2E7D4F',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  amenitiesSection: {
    marginBottom: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#666',
  },
  hoursSection: {
    marginBottom: 24,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  reviewsSection: {
    marginBottom: 40,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    backgroundColor: '#2E7D4F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  writeReviewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 14,
    color: '#666',
  },
  reviewComment: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 12,
  },
  helpfulButton: {
    alignSelf: 'flex-start',
  },
  helpfulText: {
    fontSize: 14,
    color: '#666',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    fontSize: 16,
    color: '#2E7D4F',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  courtNameModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  commentInput: {
    height: 120,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CourtDetailScreen;
