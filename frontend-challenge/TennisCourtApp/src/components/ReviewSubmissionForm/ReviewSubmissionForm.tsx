import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Vibration,
  Platform,
  Alert,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';
import { StarRating } from '@/components';
import type { ReviewFormData } from '@/types';

interface ReviewSubmissionFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  courtName?: string | undefined;
  autoFocus?: boolean;
  initialData?: Partial<ReviewFormData>;
  onDraftChange?: (data: ReviewFormData) => void;
}

interface ValidationErrors {
  rating?: string;
  comment?: string;
}

const MIN_COMMENT_LENGTH = 10;
const MAX_COMMENT_LENGTH = 500;

const ReviewSubmissionForm: React.FC<ReviewSubmissionFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
  courtName,
  autoFocus = true,
  initialData,
  onDraftChange,
}) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: initialData?.rating || 5,
    comment: initialData?.comment || '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const commentInputRef = useRef<TextInput>(null);

  // Auto-focus on text input when component mounts
  useEffect(() => {
    if (autoFocus && commentInputRef.current) {
      const timer = setTimeout(() => {
        commentInputRef.current?.focus();
      }, 300); // Small delay to ensure modal animation completes
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoFocus]);

  // Notify parent of draft changes
  useEffect(() => {
    onDraftChange?.(formData);
  }, [formData, onDraftChange]);

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please select a rating between 1 and 5 stars';
    }

    const trimmedComment = formData.comment.trim();
    if (trimmedComment.length < MIN_COMMENT_LENGTH) {
      newErrors.comment = `Comment must be at least ${MIN_COMMENT_LENGTH} characters`;
    } else if (trimmedComment.length > MAX_COMMENT_LENGTH) {
      newErrors.comment = `Comment must not exceed ${MAX_COMMENT_LENGTH} characters`;
    }

    return newErrors;
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.rating;
      return newErrors;
    });

    // Haptic feedback on rating change
    if (Platform.OS === 'ios') {
      Vibration.vibrate(10);
    } else {
      Vibration.vibrate(50);
    }
  };

  const handleCommentChange = (comment: string) => {
    setFormData(prev => ({ ...prev, comment }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.comment;
      return newErrors;
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const trimmedData = {
        ...formData,
        comment: formData.comment.trim(),
      };
      await onSubmit(trimmedData);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    if (formData.comment.trim() || formData.rating !== 5) {
      Alert.alert(
        'Discard Review?',
        'You have unsaved changes. Are you sure you want to discard this review?',
        [
          { text: 'Keep Writing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: onCancel },
        ]
      );
    } else {
      onCancel();
    }
  };

  const getCharacterCountColor = (): string => {
    const length = formData.comment.length;
    if (length < MIN_COMMENT_LENGTH) return COLORS.error;
    if (length > MAX_COMMENT_LENGTH * 0.9) return COLORS.warning;
    return COLORS.text.secondary;
  };

  const getCharacterCountText = (): string => {
    const length = formData.comment.length;
    if (length < MIN_COMMENT_LENGTH) {
      return `${MIN_COMMENT_LENGTH - length} more characters needed`;
    }
    return `${length}/${MAX_COMMENT_LENGTH}`;
  };

  const isFormValid = () => {
    const trimmedComment = formData.comment.trim();
    return (
      formData.rating >= 1 &&
      formData.rating <= 5 &&
      trimmedComment.length >= MIN_COMMENT_LENGTH &&
      trimmedComment.length <= MAX_COMMENT_LENGTH
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Write a Review</Text>
        {courtName && (
          <Text style={styles.subtitle}>for {courtName}</Text>
        )}
      </View>

      {/* Rating Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Rating</Text>
        <View style={styles.ratingContainer}>
          <StarRating
            rating={formData.rating}
            interactive
            size={32}
            onRatingChange={handleRatingChange}
            style={styles.starRating}
          />
          <Text style={styles.ratingText}>
            {formData.rating} star{formData.rating !== 1 ? 's' : ''}
          </Text>
        </View>
        {errors.rating && (
          <Text style={styles.errorText}>{errors.rating}</Text>
        )}
      </View>

      {/* Comment Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Experience</Text>
        <TextInput
          ref={commentInputRef}
          style={[
            styles.commentInput,
            errors.comment && styles.commentInputError,
          ]}
          placeholder="Share your experience at this court... What did you like? Any tips for other players?"
          placeholderTextColor={COLORS.text.secondary}
          value={formData.comment}
          onChangeText={handleCommentChange}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={MAX_COMMENT_LENGTH}
          accessibilityLabel="Review comment input"
          accessibilityHint="Enter your detailed review here"
        />
        <View style={styles.commentFooter}>
          <Text
            style={[
              styles.characterCount,
              { color: getCharacterCountColor() },
            ]}
          >
            {getCharacterCountText()}
          </Text>
        </View>
        {errors.comment && (
          <Text style={styles.errorText}>{errors.comment}</Text>
        )}
      </View>

      {/* Confirmation Message */}
      {showConfirmation && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationText}>
            Ready to submit your review?
          </Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={loading || isSubmitting}
          accessibilityRole="button"
          accessibilityLabel="Cancel review"
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isFormValid() || loading || isSubmitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid() || loading || isSubmitting}
          accessibilityRole="button"
          accessibilityLabel={showConfirmation ? "Confirm submission" : "Submit review"}
          accessibilityState={{ disabled: !isFormValid() || loading || isSubmitting }}
        >
          {(loading || isSubmitting) ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={COLORS.background} size="small" />
              <Text style={styles.submitButtonText}>Submitting...</Text>
            </View>
          ) : (
            <Text style={styles.submitButtonText}>
              {showConfirmation ? 'Confirm' : 'Submit Review'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  ratingContainer: {
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  starRating: {
    marginBottom: SPACING.sm,
  },
  ratingText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    backgroundColor: COLORS.surface,
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
  },
  commentInputError: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.sm,
  },
  characterCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginTop: SPACING.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  confirmationContainer: {
    backgroundColor: `${COLORS.primary}15`,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  confirmationText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  submitButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
});

export default ReviewSubmissionForm;