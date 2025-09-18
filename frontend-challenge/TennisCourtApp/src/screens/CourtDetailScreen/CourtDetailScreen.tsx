import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Linking,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import type {
  Review,
  ReviewFormData,
  RootStackParamList,
} from '@/types';
import type { EnhancedCourt } from '@/data/dataHelpers';
import { COLORS, SPACING, SURFACE_LABELS, TYPOGRAPHY } from '@/constants';
import {
  ImageCarousel,
  StarRating,
  ReviewsList,
  ReviewSummary,
  ReviewStats,
  CollapsibleSection,
} from '@/components';
import { mockApiService } from '@/data/mockApiService';

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
  const [court, setCourt] = useState<EnhancedCourt | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 5,
    comment: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    loadCourtDetails();
  }, [courtId]);

  // Update navigation title when court data is loaded
  useEffect(() => {
    if (court) {
      navigation.setOptions({
        title: court.name,
        headerBackTitle: 'Courts',
      });
    }
  }, [court, navigation]);

  const loadCourtDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await mockApiService.getCourtById(courtId);
      setCourt(response.data);
      setReviews(response.data.reviews || []);
    } catch (err) {
      console.error('Error loading court details:', err);
      setError('Failed to load court details');
      Alert.alert(
        'Error',
        'Failed to load court details. Please try again.',
        [
          { text: 'Retry', onPress: loadCourtDetails },
          { text: 'Go Back', onPress: () => navigation.goBack() },
        ]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [courtId, navigation]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCourtDetails();
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    try {
      setSubmittingReview(true);

      const response = await mockApiService.submitReview(courtId, reviewForm);

      // Add the new review to the local state
      setReviews(prev => [response.data, ...prev]);

      // Update court rating if needed
      if (court) {
        const updatedReviews = [response.data, ...reviews];
        const newAverage = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        setCourt(prev => prev ? { ...prev, averageRating: Math.round(newAverage * 10) / 10, totalReviews: updatedReviews.length } : null);
      }

      setReviewForm({ rating: 5, comment: '' });
      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handlePhonePress = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        }
      })
      .catch(err => {
        console.error('Error opening phone dialer:', err);
        Alert.alert('Error', 'Unable to open phone dialer');
      });
  };

  const handleLocationPress = () => {
    if (court?.coordinates) {
      const { latitude, longitude } = court.coordinates;
      const url = `https://maps.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url).catch(err => {
        console.error('Error opening maps:', err);
        Alert.alert('Error', 'Unable to open maps');
      });
    }
  };

  const formatOpeningHours = (openingHours: any) => {
    if (!openingHours) return [];

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return days.map((day, index) => {
      const hours = openingHours[day];
      if (!hours) return null;

      return {
        day: dayNames[index],
        hours: hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`,
        closed: hours.closed || false,
      };
    }).filter((item): item is NonNullable<typeof item> => Boolean(item));
  };

  const renderRatingSelector = () => (
    <View style={styles.ratingSelector}>
      <Text style={styles.ratingLabel}>Your Rating:</Text>
      <StarRating
        rating={reviewForm.rating}
        interactive
        size={24}
        onRatingChange={(rating) => setReviewForm(prev => ({ ...prev, rating }))}
      />
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

  if (error && !court) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadCourtDetails}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!court) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Court not found</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openingHours = formatOpeningHours(court.openingHours || {});

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
    >
      {/* Hero Image Carousel */}
      <ImageCarousel
        images={court.images || [court.imageUrl].filter(Boolean)}
        courtName={court.name}
        height={250}
      />

      {/* Court Header Info */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.courtName}>{court.name}</Text>
          <View style={styles.ratingContainer}>
            <StarRating
              rating={court.averageRating}
              size={18}
              showNumber
            />
            <Text style={styles.reviewCount}>({court.totalReviews} reviews)</Text>
          </View>
        </View>

        {/* Address and Location */}
        <TouchableOpacity
          style={styles.addressContainer}
          onPress={handleLocationPress}
          accessibilityRole="button"
          accessibilityLabel={`Address: ${court.address}. Tap to open in maps.`}
        >
          <Text style={styles.locationPin}>📍</Text>
          <Text style={styles.address}>{court.address}</Text>
        </TouchableOpacity>

        {/* Quick Info Pills */}
        <View style={styles.quickInfo}>
          <View style={styles.infoPill}>
            <Text style={styles.pillText}>{SURFACE_LABELS[court.surface]}</Text>
          </View>
          <View style={styles.infoPill}>
            <Text style={styles.pillText}>{court.indoor ? '🏢 Indoor' : '🌤️ Outdoor'}</Text>
          </View>
          <View style={[styles.infoPill, styles.pricePill]}>
            <Text style={styles.priceText}>${court.pricePerHour}/hr</Text>
          </View>
        </View>

        {/* Courts Count & Contact */}
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>{court.numberOfCourts} Court{court.numberOfCourts !== 1 ? 's' : ''}</Text>
          </View>
          {court.phoneNumber && (
            <TouchableOpacity
              style={styles.phoneButton}
              onPress={() => handlePhonePress(court.phoneNumber)}
              accessibilityRole="button"
              accessibilityLabel={`Call ${court.phoneNumber}`}
            >
              <Text style={styles.phoneIcon}>📞</Text>
              <Text style={styles.phoneText}>{court.phoneNumber}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Review Statistics */}
      <ReviewStats
        reviews={reviews}
        averageRating={court.averageRating}
        totalReviews={court.totalReviews}
        onViewAllPress={() => setShowAllReviews(true)}
        maxHighlights={2}
      />

      {/* Review Summary with Breakdown */}
      <ReviewSummary
        averageRating={court.averageRating}
        totalReviews={court.totalReviews}
        reviewBreakdown={court.reviewSummary}
      />

      {/* Description */}
      {court.description && (
        <CollapsibleSection
          title="Description"
          icon="📝"
          initiallyExpanded={true}
        >
          <Text style={styles.description}>{court.description}</Text>
        </CollapsibleSection>
      )}

      {/* Opening Hours */}
      {openingHours.length > 0 && (
        <CollapsibleSection
          title="Opening Hours"
          icon="⏰"
          initiallyExpanded={false}
        >
          <View style={styles.hoursContainer}>
            {openingHours.map((item, index) => (
              <View key={index} style={styles.hourRow}>
                <Text style={styles.dayText}>{item.day}</Text>
                <Text style={[styles.timeText, item.closed && styles.closedText]}>
                  {item.hours}
                </Text>
              </View>
            ))}
          </View>
        </CollapsibleSection>
      )}

      {/* Amenities */}
      <CollapsibleSection
        title="Amenities"
        icon="🏆"
        initiallyExpanded={true}
      >
        <View style={styles.amenitiesGrid}>
          {court.amenities.map((amenity, index) => (
            <View key={index} style={styles.amenityItem}>
              <Text style={styles.amenityIcon}>✓</Text>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </CollapsibleSection>

      {/* Add Review */}
      <CollapsibleSection
        title="Write a Review"
        icon="⭐"
        initiallyExpanded={false}
      >
        {renderRatingSelector()}

        <TextInput
          style={styles.commentInput}
          placeholder='Share your experience at this court...'
          value={reviewForm.comment}
          onChangeText={text =>
            setReviewForm(prev => ({ ...prev, comment: text }))
          }
          multiline
          numberOfLines={4}
          textAlignVertical='top'
          accessibilityLabel="Review comment input"
          accessibilityHint="Enter your review comment here"
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            submittingReview && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitReview}
          disabled={submittingReview}
          accessibilityRole="button"
          accessibilityLabel="Submit review"
          accessibilityState={{ disabled: submittingReview }}
        >
          {submittingReview ? (
            <ActivityIndicator color={COLORS.background} />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </CollapsibleSection>

      {/* Reviews List */}
      <CollapsibleSection
        title={`Reviews (${court.totalReviews})`}
        icon="💬"
        initiallyExpanded={true}
      >
        <ReviewsList
          courtId={courtId}
          initialReviews={reviews.slice(0, 3)}
          maxHeight={showAllReviews ? undefined : 400}
          onReviewsUpdate={setReviews}
        />
      </CollapsibleSection>

      {/* Bottom Padding */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
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
  errorContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.lg,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  header: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  titleSection: {
    marginBottom: SPACING.md,
  },
  courtName: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    lineHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  reviewCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginLeft: SPACING.sm,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    minHeight: 44,
  },
  locationPin: {
    fontSize: 16,
    marginRight: SPACING.sm,
  },
  address: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    flex: 1,
  },
  quickInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  infoPill: {
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${COLORS.primary}30`,
  },
  pricePill: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  pillText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  priceText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.background,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    minHeight: 36,
    minWidth: 44,
  },
  phoneIcon: {
    fontSize: 14,
    marginRight: SPACING.xs,
  },
  phoneText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.background,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
  hoursContainer: {
    gap: SPACING.sm,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  dayText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    minWidth: 40,
  },
  timeText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
  },
  closedText: {
    color: COLORS.error,
    fontStyle: 'italic',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    minWidth: '45%',
    marginBottom: SPACING.xs,
  },
  amenityIcon: {
    fontSize: 16,
    color: COLORS.success,
    marginRight: SPACING.sm,
    fontWeight: 'bold',
  },
  amenityText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  ratingSelector: {
    marginBottom: SPACING.lg,
  },
  ratingLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.background,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
});

export default CourtDetailScreen;
