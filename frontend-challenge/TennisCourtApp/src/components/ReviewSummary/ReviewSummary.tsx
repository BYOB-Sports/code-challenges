import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, RADIUS } from '@/constants';
import { StarRating } from '../StarRating';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  reviewBreakdown: {
    excellent: number; // 5 stars
    good: number; // 4 stars
    average: number; // 3 stars
    poor: number; // 2 stars
    terrible: number; // 1 star
  };
  onRatingFilterPress?: (rating: number) => void;
  compact?: boolean;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  averageRating,
  totalReviews,
  reviewBreakdown,
  onRatingFilterPress,
  compact = false,
}) => {
  const getPercentage = (count: number): number => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  const ratingData = [
    { stars: 5, count: reviewBreakdown.excellent, label: 'Excellent' },
    { stars: 4, count: reviewBreakdown.good, label: 'Good' },
    { stars: 3, count: reviewBreakdown.average, label: 'Average' },
    { stars: 2, count: reviewBreakdown.poor, label: 'Poor' },
    { stars: 1, count: reviewBreakdown.terrible, label: 'Terrible' },
  ];

  const renderRatingBar = (
    stars: number,
    count: number,
    _label: string,
    isInteractive: boolean = false
  ) => {
    const percentage = getPercentage(count);
    const barWidth = Math.max(percentage, 2); // Minimum 2% width for visibility

    const BarComponent = isInteractive ? TouchableOpacity : View;

    return (
      <BarComponent
        key={stars}
        style={styles.ratingRow}
        onPress={isInteractive ? () => onRatingFilterPress?.(stars) : undefined}
        accessibilityRole={isInteractive ? 'button' : 'text'}
        accessibilityLabel={`${stars} star${stars !== 1 ? 's' : ''}: ${count} review${count !== 1 ? 's' : ''}, ${percentage}% of total${isInteractive ? '. Tap to filter by this rating.' : ''}`}
      >
        <View style={styles.ratingRowLeft}>
          <Text style={styles.ratingStars}>{stars}</Text>
          <Text style={styles.ratingStar}>★</Text>
        </View>

        <View style={styles.barContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${barWidth}%`,
                backgroundColor: getBarColor(stars),
              },
            ]}
          />
        </View>

        <View style={styles.ratingRowRight}>
          <Text style={styles.ratingCount}>{count}</Text>
          {!compact && (
            <Text style={styles.ratingPercentage}>({percentage}%)</Text>
          )}
        </View>
      </BarComponent>
    );
  };

  const getBarColor = (stars: number): string => {
    switch (stars) {
      case 5:
        return COLORS.success;
      case 4:
        return COLORS.warning;
      case 3:
        return '#FFA500'; // Orange
      case 2:
        return '#FF6B47'; // Light red
      case 1:
        return COLORS.error;
      default:
        return COLORS.border;
    }
  };

  if (totalReviews === 0) {
    return (
      <View style={[styles.container, compact && styles.compactContainer]}>
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsTitle}>No Reviews Yet</Text>
          <Text style={styles.noReviewsText}>
            Be the first to review this court
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {/* Overall Rating */}
      <View style={styles.overallRating}>
        <View style={styles.ratingLeft}>
          <Text style={styles.averageRating}>
            {averageRating.toFixed(1)}
          </Text>
          <StarRating
            rating={averageRating}
            size={compact ? 16 : 20}
            showNumber={false}
            style={styles.overallStars}
          />
          <Text style={styles.totalReviews}>
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </Text>
        </View>

        {!compact && (
          <View style={styles.ratingRight}>
            <Text style={styles.ratingLabel}>Overall Rating</Text>
          </View>
        )}
      </View>

      {/* Rating Breakdown */}
      {!compact && (
        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>Rating Breakdown</Text>
          <View style={styles.barsContainer}>
            {ratingData.map(({ stars, count, label }) =>
              renderRatingBar(stars, count, label, !!onRatingFilterPress)
            )}
          </View>
        </View>
      )}

      {/* Compact breakdown (just top ratings) */}
      {compact && (
        <View style={styles.compactBreakdown}>
          {ratingData
            .filter(({ count }) => count > 0)
            .slice(0, 3)
            .map(({ stars, count, label }) =>
              renderRatingBar(stars, count, label, false)
            )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...SHADOWS.small,
  },
  compactContainer: {
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  ratingLeft: {
    flex: 1,
  },
  ratingRight: {
    alignItems: 'flex-end',
  },
  averageRating: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  overallStars: {
    marginBottom: SPACING.xs,
  },
  totalReviews: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  ratingLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    textAlign: 'right',
  },
  breakdown: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  breakdownTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  barsContainer: {
    gap: SPACING.sm,
  },
  compactBreakdown: {
    gap: SPACING.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    minHeight: 32,
  },
  ratingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  ratingStars: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginRight: 4,
  },
  ratingStar: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.warning,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginHorizontal: SPACING.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    minWidth: 4,
  },
  ratingRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 60,
    justifyContent: 'flex-end',
  },
  ratingCount: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginRight: SPACING.xs,
  },
  ratingPercentage: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
  },
  noReviewsContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  noReviewsTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  noReviewsText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});

export default ReviewSummary;