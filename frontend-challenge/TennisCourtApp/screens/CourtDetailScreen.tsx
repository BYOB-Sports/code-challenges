import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TennisCourt, Review } from '../data/mockData';

type RootStackParamList = {
  CourtList: undefined;
  CourtDetail: { court: TennisCourt };
};

type CourtDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourtDetail'>;
type CourtDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourtDetail'>;

interface Props {
  route: CourtDetailScreenRouteProp;
  navigation: CourtDetailScreenNavigationProp;
}

const CourtDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { court } = route.params;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: '',
  });

  const renderStarRating = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={size} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={size} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={size} color="#E0E0E0" />
      );
    }

    return stars;
  };

  const renderStarSelector = () => {
    return (
      <View style={styles.starSelector}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setNewReview({ ...newReview, rating: star })}
          >
            <Ionicons
              name={star <= newReview.rating ? "star" : "star-outline"}
              size={32}
              color={star <= newReview.rating ? "#FFD700" : "#E0E0E0"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmitReview = () => {
    if (!newReview.userName.trim() || !newReview.comment.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Your review has been submitted!', [
      { text: 'OK', onPress: () => setShowReviewModal(false) }
    ]);
    
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.reviewUserName}>{review.userName}</Text>
          <View style={styles.reviewRating}>
            {renderStarRating(review.rating, 14)}
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: court.image }} 
          style={styles.courtImage}
          onError={() => console.log('Image failed to load:', court.image)}
        />
        
        <View style={styles.content}>
          <Text style={styles.courtName}>{court.name}</Text>
          <Text style={styles.courtLocation}>
            <Ionicons name="location" size={16} color="#666" />
            {' '}{court.location}, {court.city}, {court.state}
          </Text>

          <View style={styles.ratingSection}>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {renderStarRating(court.rating, 20)}
              </View>
              <Text style={styles.ratingText}>
                {court.rating} ({court.reviewCount} reviews)
              </Text>
            </View>
            <Text style={styles.priceText}>${court.pricePerHour}/hour</Text>
          </View>

          <Text style={styles.description}>{court.description}</Text>

          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Court Details</Text>
            <View style={styles.detailRow}>
              <Ionicons name="tennisball" size={20} color="#2E7D32" />
              <Text style={styles.detailText}>Surface: {court.surface}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name={court.indoor ? "home" : "sunny"} size={20} color="#2E7D32" />
              <Text style={styles.detailText}>
                {court.indoor ? 'Indoor' : 'Outdoor'} Court
              </Text>
            </View>
            {court.lights && (
              <View style={styles.detailRow}>
                <Ionicons name="bulb" size={20} color="#2E7D32" />
                <Text style={styles.detailText}>Lighted Courts</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Ionicons name="time" size={20} color="#2E7D32" />
              <Text style={styles.detailText}>Hours: {court.hours}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="call" size={20} color="#2E7D32" />
              <Text style={styles.detailText}>{court.phone}</Text>
            </View>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {court.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#2E7D32" />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity
                style={styles.addReviewButton}
                onPress={() => setShowReviewModal(true)}
              >
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.addReviewText}>Add Review</Text>
              </TouchableOpacity>
            </View>
            
            {court.reviews.map(renderReview)}
          </View>
        </View>
      </ScrollView>

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
            <Text style={styles.modalLabel}>Your Rating</Text>
            {renderStarSelector()}

            <Text style={styles.modalLabel}>Your Name</Text>
            <TextInput
              style={styles.modalInput}
              value={newReview.userName}
              onChangeText={(text) => setNewReview({ ...newReview, userName: text })}
              placeholder="Enter your name"
            />

            <Text style={styles.modalLabel}>Your Review</Text>
            <TextInput
              style={[styles.modalInput, styles.commentInput]}
              value={newReview.comment}
              onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
              placeholder="Share your experience..."
              multiline
              numberOfLines={4}
            />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  courtImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  courtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  courtLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  amenitiesSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  amenityText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  reviewsSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addReviewText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
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
    color: '#2E7D32',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  starSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default CourtDetailScreen;