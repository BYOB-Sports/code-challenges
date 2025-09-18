import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { format, parseISO, isWithinInterval, subDays } from 'date-fns';

import type { Review } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, RADIUS } from '@/constants';
import { StarRating } from '../StarRating';
import { ReviewCard } from '../ReviewCard';

interface ReviewStatsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onViewAllPress?: () => void;
  showRecentHighlights?: boolean;
  maxHighlights?: number;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  onViewAllPress,
  showRecentHighlights = true,
  maxHighlights = 2,
}) => {
  const getRecentReviews = () => {
    const thirtyDaysAgo = subDays(new Date(), 30);
    return reviews.filter(review => {
      try {
        const reviewDate = parseISO(review.date);
        return isWithinInterval(reviewDate, {
          start: thirtyDaysAgo,
          end: new Date(),
        });
      } catch {
        return false;
      }
    });
  };

  const getMostHelpfulReviews = () => {
    return [...reviews]
      .filter(review => (review.helpfulVotes || 0) > 0)
      .sort((a, b) => (b.helpfulVotes || 0) - (a.helpfulVotes || 0))
      .slice(0, maxHighlights);
  };

  const getHighestRatedReviews = () => {
    return [...reviews]
      .filter(review => review.rating >= 4)
      .sort((a, b) => {
        // Sort by rating first, then by helpful votes
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return (b.helpfulVotes || 0) - (a.helpfulVotes || 0);
      })
      .slice(0, maxHighlights);
  };

  const recentReviews = getRecentReviews();
  const mostHelpfulReviews = getMostHelpfulReviews();
  const highestRatedReviews = getHighestRatedReviews();

  const stats = [
    {
      label: 'Average Rating',
      value: averageRating.toFixed(1),
      suffix: '★',
      color: COLORS.warning,
    },
    {
      label: 'Total Reviews',
      value: totalReviews.toString(),
      suffix: '',
      color: COLORS.primary,
    },
    {
      label: 'Recent Reviews',
      value: recentReviews.length.toString(),
      suffix: '(30 days)',
      color: COLORS.success,
    },
    {
      label: 'Helpful Reviews',
      value: mostHelpfulReviews.length.toString(),
      suffix: '',
      color: COLORS.secondary,
    },
  ];

  const renderStatItem = (stat: typeof stats[0], index: number) => (
    <View key={index} style={styles.statItem}>
      <Text style={[styles.statValue, { color: stat.color }]}>
        {stat.value}
      </Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
      {stat.suffix && (
        <Text style={styles.statSuffix}>{stat.suffix}</Text>
      )}
    </View>
  );

  const renderReviewHighlight = (
    title: string,
    reviews: Review[],
    _emptyMessage: string
  ) => {
    if (!showRecentHighlights || reviews.length === 0) {
      return null;
    }

    return (
      <View style={styles.highlightSection}>
        <Text style={styles.highlightTitle}>{title}</Text>
        {reviews.slice(0, maxHighlights).map(review => (
          <ReviewCard
            key={review.id}
            review={review}
            compact={true}
            showActions={false}
          />
        ))}
      </View>
    );
  };

  if (totalReviews === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No Reviews Yet</Text>
          <Text style={styles.emptyText}>
            This court hasn't received any reviews yet. Be the first to share your experience!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => renderStatItem(stat, index))}
      </View>

      {/* Overall Rating Display */}
      <View style={styles.overallSection}>
        <View style={styles.overallRating}>
          <Text style={styles.overallValue}>{averageRating.toFixed(1)}</Text>
          <StarRating
            rating={averageRating}
            size={20}
            showNumber={false}
            style={styles.overallStars}
          />
        </View>
        <View style={styles.overallInfo}>
          <Text style={styles.overallLabel}>Overall Rating</Text>
          <Text style={styles.overallSubtext}>
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Review Highlights */}
      {showRecentHighlights && (
        <View style={styles.highlightsContainer}>
          {renderReviewHighlight(
            'Most Helpful Reviews',
            mostHelpfulReviews,
            'No helpful reviews yet'
          )}

          {renderReviewHighlight(
            'Recent Reviews',
            recentReviews.slice(0, maxHighlights),
            'No recent reviews'
          )}

          {renderReviewHighlight(
            'Top Rated Reviews',
            highestRatedReviews,
            'No highly rated reviews'
          )}
        </View>
      )}

      {/* View All Button */}
      {onViewAllPress && totalReviews > maxHighlights && (
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={onViewAllPress}
          accessibilityRole="button"
          accessibilityLabel={`View all ${totalReviews} reviews`}
        >
          <Text style={styles.viewAllText}>
            View All {totalReviews} Reviews
          </Text>
          <Text style={styles.viewAllArrow}>→</Text>
        </TouchableOpacity>
      )}

      {/* Quick Stats */}
      {recentReviews.length > 0 && (
        <View style={styles.quickStats}>
          <Text style={styles.quickStatsTitle}>Recent Activity</Text>
          <Text style={styles.quickStatsText}>
            {recentReviews.length} review{recentReviews.length !== 1 ? 's' : ''} in the last 30 days
          </Text>
          {recentReviews.length > 0 && recentReviews[0] && (
            <Text style={styles.quickStatsText}>
              Latest review: {format(parseISO(recentReviews[0].date), 'MMM d, yyyy')}
            </Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  statSuffix: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  overallSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  overallRating: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  overallValue: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  overallStars: {
    marginBottom: SPACING.xs,
  },
  overallInfo: {
    flex: 1,
  },
  overallLabel: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  overallSubtext: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  highlightsContainer: {
    marginTop: SPACING.sm,
  },
  highlightSection: {
    marginBottom: SPACING.md,
  },
  highlightTitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    minHeight: 48,
  },
  viewAllText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.background,
    marginRight: SPACING.sm,
  },
  viewAllArrow: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.background,
  },
  quickStats: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.background,
    borderRadius: 8,
  },
  quickStatsTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  quickStatsText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.text.secondary,
    lineHeight: 16,
    marginBottom: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ReviewStats;