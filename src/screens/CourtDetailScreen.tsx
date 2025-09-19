import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCourts } from '../context/CourtsContext';
import { useFadeAnimation } from '../hooks/useAnimations';
import { LoadingSpinner } from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';
import { validateReview } from '../utils/validation';
import { Court, NewReview, RootStackParamList } from '../types';
import { COLORS, DIMENSIONS } from '../constants';

type CourtDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourtDetail'>;
type CourtDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourtDetail'>;

interface Props {
  navigation: CourtDetailScreenNavigationProp;
  route: CourtDetailScreenRouteProp;
}

const CourtDetailScreen: React.FC<Props> = memo(({ route, navigation }) => {
  const { court: initialCourt } = route.params;
  const { addReview, isLoading, error } = useCourts();
  const [court, setCourt] = useState<Court>(initialCourt);
  const [newReview, setNewReview] = useState<NewReview>({
    user: '',
    rating: 0,
    text: '',
  });
  const { fadeValue, fadeIn } = useFadeAnimation();

  const handleSubmitReview = useCallback(async () => {
    const validation = validateReview(newReview);
    
    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.errors.join('\n'));
      return;
    }

    try {
      await addReview(court.id, newReview);
      
      // Update local state for immediate UI feedback
      const review = {
        id: Date.now(),
        user: newReview.user.trim(),
        rating: newReview.rating,
        text: newReview.text.trim(),
        createdAt: new Date(),
      };

      const updatedReviews = [...court.reviews, review];
      const newAverageRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;

      setCourt({
        ...court,
        reviews: updatedReviews,
        averageRating: Number(newAverageRating.toFixed(1)),
      });

      setNewReview({ user: '', rating: 0, text: '' });
      
      // Animate the new review
      fadeIn();
      
      Alert.alert('Success', 'Your review has been added!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add review. Please try again.');
    }
  }, [newReview, court, addReview, fadeIn]);

  const renderReview = useCallback((review: Court['reviews'][0]) => (
    <View key={review.id} style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUser}>{review.user}</Text>
        <StarRating rating={review.rating} size={14} />
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Court Details</Text>
      </View>

      {isLoading && <LoadingSpinner overlay text="Adding review..." />}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: court.image }} style={styles.image} />
        
        <View style={styles.infoContainer}>
          <Text style={styles.courtName}>{court.name}</Text>
          <Text style={styles.courtLocation}>{court.location}</Text>
          
          <View style={styles.ratingContainer}>
            <StarRating rating={Math.round(court.averageRating)} size={20} />
            <Text style={styles.ratingText}>
              {court.averageRating.toFixed(1)} ({court.reviews.length} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {court.reviews.map(renderReview)}
        </View>

        <View style={styles.addReviewSection}>
          <Text style={styles.sectionTitle}>Add Your Review</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={newReview.user}
            onChangeText={(text) => setNewReview({ ...newReview, user: text })}
            placeholderTextColor={COLORS.textTertiary}
          />

          <View style={styles.ratingInputContainer}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <StarRating
              rating={newReview.rating}
              onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
              size={24}
              interactive={true}
            />
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your review..."
            value={newReview.text}
            onChangeText={(text) => setNewReview({ ...newReview, text })}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={COLORS.textTertiary}
          />

          <TouchableOpacity 
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} 
            onPress={handleSubmitReview}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Adding Review...' : 'Submit Review'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

CourtDetailScreen.displayName = 'CourtDetailScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: DIMENSIONS.md,
    paddingVertical: DIMENSIONS.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: DIMENSIONS.md,
  },
  headerTitle: {
    fontSize: DIMENSIONS.fontXXLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.lg,
    marginBottom: DIMENSIONS.md,
  },
  courtName: {
    fontSize: DIMENSIONS.fontTitle,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: DIMENSIONS.sm,
  },
  courtLocation: {
    fontSize: DIMENSIONS.fontLarge,
    color: COLORS.textSecondary,
    marginBottom: DIMENSIONS.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: DIMENSIONS.md,
    fontSize: DIMENSIONS.fontLarge,
    color: COLORS.text,
    fontWeight: '600',
  },
  reviewsSection: {
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.lg,
    marginBottom: DIMENSIONS.md,
  },
  sectionTitle: {
    fontSize: DIMENSIONS.fontXXLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: DIMENSIONS.md,
  },
  reviewCard: {
    backgroundColor: COLORS.gray100,
    borderRadius: DIMENSIONS.radiusSmall,
    padding: DIMENSIONS.md,
    marginBottom: DIMENSIONS.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DIMENSIONS.sm,
  },
  reviewUser: {
    fontSize: DIMENSIONS.fontLarge,
    fontWeight: '600',
    color: COLORS.text,
  },
  reviewText: {
    fontSize: DIMENSIONS.fontMedium,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  addReviewSection: {
    backgroundColor: COLORS.surface,
    padding: DIMENSIONS.lg,
    marginBottom: DIMENSIONS.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: DIMENSIONS.radiusSmall,
    padding: DIMENSIONS.md,
    fontSize: DIMENSIONS.fontLarge,
    color: COLORS.text,
    marginBottom: DIMENSIONS.md,
    backgroundColor: COLORS.surface,
  },
  textArea: {
    height: 100,
  },
  ratingInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DIMENSIONS.md,
  },
  ratingLabel: {
    fontSize: DIMENSIONS.fontLarge,
    color: COLORS.text,
    marginRight: DIMENSIONS.md,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: DIMENSIONS.radiusSmall,
    padding: DIMENSIONS.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray300,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontLarge,
    fontWeight: 'bold',
  },
  errorContainer: {
    padding: DIMENSIONS.md,
    backgroundColor: COLORS.error,
    marginHorizontal: DIMENSIONS.md,
    marginVertical: DIMENSIONS.sm,
    borderRadius: DIMENSIONS.radiusMedium,
  },
  errorText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontMedium,
    textAlign: 'center',
  },
});

export default CourtDetailScreen;
