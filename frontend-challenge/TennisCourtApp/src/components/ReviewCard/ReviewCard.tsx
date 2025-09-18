import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { format, parseISO } from 'date-fns';

import type { Review } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';
import { StarRating } from '../StarRating';

interface ReviewCardProps {
  review: Review;
  onHelpfulPress?: (reviewId: string) => void;
  onReportPress?: (reviewId: string) => void;
  showActions?: boolean;
  compact?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onHelpfulPress,
  onReportPress,
  showActions = true,
  compact = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulVotes || 0);
  const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const handleHelpfulPress = async () => {
    if (hasMarkedHelpful) return;

    try {
      setHasMarkedHelpful(true);
      setHelpfulCount(prev => prev + 1);

      if (onHelpfulPress) {
        await onHelpfulPress(review.id);
      }
    } catch (error) {
      // Revert on error
      setHasMarkedHelpful(false);
      setHelpfulCount(prev => prev - 1);
      Alert.alert('Error', 'Unable to mark review as helpful');
    }
  };

  const handleReportPress = () => {
    Alert.alert(
      'Report Review',
      'Why are you reporting this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Inappropriate Content', onPress: () => reportReview('inappropriate') },
        { text: 'Spam', onPress: () => reportReview('spam') },
        { text: 'Fake Review', onPress: () => reportReview('fake') },
      ]
    );
  };

  const reportReview = (_reason: string) => {
    if (onReportPress) {
      onReportPress(review.id);
    }
    Alert.alert('Thank you', 'Your report has been submitted.');
  };

  const shouldTruncate = !compact && review.comment.length > 150;
  const displayComment = shouldTruncate && !isExpanded
    ? review.comment.slice(0, 150) + '...'
    : review.comment;

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {review.userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{review.userName}</Text>
            <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
          </View>
        </View>

        {!compact && (
          <StarRating
            rating={review.rating}
            size={16}
            showNumber={false}
          />
        )}
      </View>

      {/* Rating for compact view */}
      {compact && (
        <View style={styles.compactRating}>
          <StarRating
            rating={review.rating}
            size={14}
            showNumber={false}
          />
        </View>
      )}

      {/* Comment */}
      <Text
        style={[styles.comment, compact && styles.compactComment]}
        accessibilityLabel={`Review comment: ${review.comment}`}
      >
        {displayComment}
      </Text>

      {/* Expand/Collapse button */}
      {shouldTruncate && (
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.expandButton}
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? 'Show less' : 'Show more'}
        >
          <Text style={styles.expandButtonText}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Actions */}
      {showActions && !compact && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={handleHelpfulPress}
            disabled={hasMarkedHelpful}
            style={[
              styles.actionButton,
              hasMarkedHelpful && styles.actionButtonDisabled,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Mark as helpful. Currently ${helpfulCount} people found this helpful`}
            accessibilityState={{ disabled: hasMarkedHelpful }}
          >
            <Text style={[
              styles.actionButtonText,
              hasMarkedHelpful && styles.actionButtonTextDisabled,
            ]}>
              👍 Helpful {helpfulCount > 0 && `(${helpfulCount})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReportPress}
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel="Report this review"
          >
            <Text style={styles.actionButtonText}>⚠️ Report</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Helpful count for compact view */}
      {compact && helpfulCount > 0 && (
        <Text style={styles.compactHelpfulCount}>
          {helpfulCount} found helpful
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  compactContainer: {
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    color: COLORS.background,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  compactRating: {
    marginBottom: SPACING.xs,
  },
  comment: {
    fontSize: TYPOGRAPHY.sizes.md,
    lineHeight: 22,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  compactComment: {
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  expandButton: {
    alignSelf: 'flex-start',
    paddingVertical: SPACING.xs,
    paddingHorizontal: 0,
  },
  expandButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    minHeight: 32,
    minWidth: 44,
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  actionButtonTextDisabled: {
    color: COLORS.text.secondary,
  },
  compactHelpfulCount: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginTop: SPACING.xs,
  },
});

export default ReviewCard;