import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Court, Review } from '../types';
import { mockReviews } from '../data/mockData';

type CourtDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtDetail'
>;
type CourtDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourtDetail'>;

interface Props {
  navigation: CourtDetailScreenNavigationProp;
  route: CourtDetailScreenRouteProp;
}

const { width } = Dimensions.get('window');

const CourtDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { court } = route.params;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  const courtReviews = useMemo(() => {
    return mockReviews.filter(review => review.courtId === court.id);
  }, [court.id]);

  const handleStarPress = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (!newReview.title.trim() || !newReview.comment.trim()) {
      Alert.alert('Error', 'Please fill in both title and comment');
      return;
    }

    // In a real app, this would submit to a backend
    Alert.alert('Success', 'Your review has been submitted!', [
      { text: 'OK', onPress: () => setShowReviewModal(false) },
    ]);

    // Reset form
    setNewReview({ rating: 5, title: '', comment: '' });
  };

  const renderStarRating = (rating: number, size: number = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return (
      <Text style={[styles.stars, { fontSize: size }]}>{stars.join('')}</Text>
    );
  };

  const renderReview = (review: Review) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.userAvatar }} style={styles.userAvatar} />
        <View style={styles.reviewUserInfo}>
          <Text style={styles.userName}>{review.userName}</Text>
          <View style={styles.reviewRating}>
            {renderStarRating(review.rating, 14)}
            <Text style={styles.reviewDate}>
              {new Date(review.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        {review.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        )}
      </View>

      <Text style={styles.reviewTitle}>{review.title}</Text>
      <Text style={styles.reviewComment}>{review.comment}</Text>

      <View style={styles.reviewFooter}>
        <TouchableOpacity style={styles.helpfulButton}>
          <Text style={styles.helpfulText}>👍 Helpful ({review.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReviewModal = () => (
    <Modal
      visible={showReviewModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
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
          <Text style={styles.courtNameInModal}>{court.name}</Text>

          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Your Rating</Text>
            <View style={styles.starRatingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  style={styles.starButton}
                >
                  <Text
                    style={[
                      styles.star,
                      { color: star <= newReview.rating ? '#FFD700' : '#DDD' },
                    ]}
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="Review title"
            value={newReview.title}
            onChangeText={text =>
              setNewReview(prev => ({ ...prev, title: text }))
            }
            maxLength={100}
          />

          <TextInput
            style={styles.commentInput}
            placeholder="Share your experience..."
            value={newReview.comment}
            onChangeText={text =>
              setNewReview(prev => ({ ...prev, comment: text }))
            }
            multiline
            numberOfLines={6}
            maxLength={500}
          />

          <Text style={styles.characterCount}>
            {newReview.comment.length}/500 characters
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: court.image }} style={styles.courtImage} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.courtName}>{court.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{court.rating}</Text>
              {renderStarRating(court.rating, 20)}
              <Text style={styles.reviewCount}>({court.reviewCount})</Text>
            </View>
          </View>

          <Text style={styles.location}>
            📍 {court.location}, {court.city}, {court.state}
          </Text>

          <Text style={styles.description}>{court.description}</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Surface</Text>
              <Text style={styles.detailValue}>{court.surface}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>
                {court.indoor ? 'Indoor' : 'Outdoor'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Lights</Text>
              <Text style={styles.detailValue}>
                {court.lights ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>${court.price}/hour</Text>
            </View>
          </View>

          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {court.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Text style={styles.amenityText}>• {amenity}</Text>
                </View>
              ))}
            </View>
          </View>

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
              <View style={styles.noReviews}>
                <Text style={styles.noReviewsText}>No reviews yet</Text>
                <Text style={styles.noReviewsSubtext}>
                  Be the first to review this court!
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {renderReviewModal()}
    </View>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courtName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 16,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  stars: {
    color: '#FFD700',
    marginTop: 2,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  detailItem: {
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amenitiesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  amenitiesGrid: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  amenityItem: {
    paddingVertical: 4,
  },
  amenityText: {
    fontSize: 16,
    color: '#333',
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  writeReviewButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  writeReviewText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  helpfulText: {
    fontSize: 12,
    color: '#666',
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  noReviewsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    padding: 16,
  },
  courtNameInModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
  starButton: {
    padding: 4,
  },
  star: {
    fontSize: 32,
  },
  titleInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  commentInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});

export default CourtDetailScreen;
