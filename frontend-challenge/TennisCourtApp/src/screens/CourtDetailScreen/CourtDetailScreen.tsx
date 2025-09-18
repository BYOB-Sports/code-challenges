import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import type {
  Court,
  Review,
  ReviewFormData,
  RootStackParamList,
} from '@/types';
import { COLORS, SPACING, SURFACE_LABELS, TYPOGRAPHY } from '@/constants';

type CourtDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtDetail'
>;

type CourtDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourtDetail'>;

interface Props {
  navigation: CourtDetailScreenNavigationProp;
  route: CourtDetailScreenRouteProp;
}

const CourtDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { courtId } = route.params;
  const [court, setCourt] = useState<Court | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 5,
    comment: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Mock data - replace with actual API calls
  const mockCourt: Court = {
    id: courtId,
    name: 'Royal Tennis Club',
    location: 'Downtown',
    surface: 'clay',
    indoor: false,
    pricePerHour: 50,
    rating: 4.5,
    imageUrl: 'https://example.com/court1.jpg',
    description:
      'Premium clay court with professional lighting and excellent drainage system. Perfect for players of all skill levels.',
    amenities: [
      'Parking',
      'Lockers',
      'Showers',
      'Equipment Rental',
      'Coaching',
    ],
    availability: [],
  };

  const mockReviews: Review[] = [
    {
      id: '1',
      courtId,
      userId: 'user1',
      userName: 'John Doe',
      rating: 5,
      comment: 'Excellent court condition and great facilities!',
      date: '2024-01-15',
    },
    {
      id: '2',
      courtId,
      userId: 'user2',
      userName: 'Jane Smith',
      rating: 4,
      comment: 'Good court, but parking can be limited during peak hours.',
      date: '2024-01-10',
    },
  ];

  useEffect(() => {
    loadCourtDetails();
  }, [courtId]);

  const loadCourtDetails = async () => {
    try {
      setLoading(true);
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCourt(mockCourt);
      setReviews(mockReviews);
    } catch (error) {
      Alert.alert('Error', 'Failed to load court details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    try {
      setSubmittingReview(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview: Review = {
        id: Date.now().toString(),
        courtId,
        userId: 'current-user',
        userName: 'Current User',
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString().split('T')[0] ?? '',
      };

      setReviews(prev => [newReview, ...prev]);
      setReviewForm({ rating: 5, comment: '' });
      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const renderStars = (rating: number, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text
        key={index}
        style={[
          styles.star,
          {
            fontSize: size,
            color: index < rating ? COLORS.warning : COLORS.border,
          },
        ]}
      >
        ★
      </Text>
    ));
  };

  const renderRatingSelector = () => (
    <View style={styles.ratingSelector}>
      <Text style={styles.ratingLabel}>Your Rating:</Text>
      <View style={styles.ratingStars}>
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              setReviewForm(prev => ({ ...prev, rating: index + 1 }))
            }
          >
            <Text
              style={[
                styles.star,
                {
                  fontSize: 24,
                  color:
                    index < reviewForm.rating ? COLORS.warning : COLORS.border,
                },
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading court details...</Text>
      </View>
    );
  }

  if (!court) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Court not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Court Info */}
      <View style={styles.header}>
        <Text style={styles.courtName}>{court.name}</Text>
        <Text style={styles.courtLocation}>{court.location}</Text>

        <View style={styles.courtMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Surface</Text>
            <Text style={styles.metaValue}>
              {SURFACE_LABELS[court.surface]}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Type</Text>
            <Text style={styles.metaValue}>
              {court.indoor ? 'Indoor' : 'Outdoor'}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Price</Text>
            <Text style={styles.metaValue}>${court.pricePerHour}/hr</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            {renderStars(Math.floor(court.rating), 18)}
            <Text style={styles.ratingText}>{court.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      {/* Description */}
      {court.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{court.description}</Text>
        </View>
      )}

      {/* Amenities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {court.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Add Review */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Review</Text>
        {renderRatingSelector()}

        <TextInput
          style={styles.commentInput}
          placeholder='Share your experience...'
          value={reviewForm.comment}
          onChangeText={text =>
            setReviewForm(prev => ({ ...prev, comment: text }))
          }
          multiline
          numberOfLines={4}
          textAlignVertical='top'
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            submittingReview && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitReview}
          disabled={submittingReview}
        >
          {submittingReview ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
        {reviews.map(review => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>{review.userName}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <View style={styles.reviewRating}>
              {renderStars(review.rating, 14)}
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  amenityTag: {
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 6,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  amenityText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  commentInput: {
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    marginBottom: SPACING.md,
    minHeight: 100,
    padding: SPACING.md,
  },
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  courtLocation: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    marginBottom: SPACING.md,
  },
  courtMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  courtName: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  description: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    lineHeight: 22,
  },
  errorContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.lg,
  },
  header: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    marginTop: SPACING.md,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    marginBottom: SPACING.xs,
  },
  metaValue: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  rating: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingLabel: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  ratingSelector: {
    marginBottom: SPACING.md,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  ratingText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginLeft: SPACING.sm,
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  reviewComment: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    lineHeight: 20,
  },
  reviewDate: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  reviewHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  reviewerName: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  section: {
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    padding: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.md,
  },
  star: {
    color: COLORS.warning,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default CourtDetailScreen;
