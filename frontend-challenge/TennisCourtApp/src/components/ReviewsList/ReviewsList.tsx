import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';

import type { Review, PaginatedResponse } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';
import { ReviewCard } from '../ReviewCard';
import { mockApiService } from '@/data/mockApiService';

interface ReviewsListProps {
  courtId: string;
  initialReviews?: Review[];
  compact?: boolean;
  maxHeight?: number | undefined;
  onReviewsUpdate?: (reviews: Review[]) => void;
  nested?: boolean; // Add prop to indicate if this is nested inside a ScrollView
}

type SortOption = 'date' | 'rating' | 'helpful';

const REVIEWS_PER_PAGE = 5;

const ReviewsList: React.FC<ReviewsListProps> = ({
  courtId,
  initialReviews = [],
  compact = false,
  maxHeight,
  onReviewsUpdate,
  nested = false,
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async (
    pageNum: number = 1,
    sort: SortOption = 'date',
    reset: boolean = false
  ) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const response: PaginatedResponse<Review> = await mockApiService.getCourtReviews(
        courtId,
        {
          page: pageNum,
          limit: REVIEWS_PER_PAGE,
          sortBy: sort,
        }
      );

      if (reset || pageNum === 1) {
        setReviews(response.data);
      } else {
        setReviews(prev => [...prev, ...response.data]);
      }

      setHasMore(response.hasMore);
      setPage(pageNum);

      if (onReviewsUpdate) {
        const allReviews = pageNum === 1 ? response.data : [...reviews, ...response.data];
        onReviewsUpdate(allReviews);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
      setError('Failed to load reviews');
      Alert.alert('Error', 'Failed to load reviews');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, [courtId, reviews, onReviewsUpdate]);

  useEffect(() => {
    if (initialReviews.length === 0) {
      loadReviews(1, sortBy, true);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadReviews(1, sortBy, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadReviews(page + 1, sortBy);
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    if (newSort !== sortBy) {
      setSortBy(newSort);
      loadReviews(1, newSort, true);
    }
  };

  const handleHelpfulPress = async (reviewId: string) => {
    try {
      await mockApiService.markReviewHelpful(reviewId);
      // Update the local state
      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId
            ? { ...review, helpfulVotes: (review.helpfulVotes || 0) + 1 }
            : review
        )
      );
    } catch (error) {
      throw error; // Re-throw to be handled by ReviewCard
    }
  };

  const renderSortOptions = () => {
    if (compact) return null;

    const sortOptions: { key: SortOption; label: string }[] = [
      { key: 'date', label: 'Most Recent' },
      { key: 'rating', label: 'Highest Rated' },
      { key: 'helpful', label: 'Most Helpful' },
    ];

    return (
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <View style={styles.sortButtons}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => handleSortChange(option.key)}
              style={[
                styles.sortButton,
                sortBy === option.key && styles.activeSortButton,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Sort by ${option.label}`}
              accessibilityState={{ selected: sortBy === option.key }}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === option.key && styles.activeSortButtonText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderLoadMoreButton = () => {
    if (!hasMore || loadingMore) return null;

    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={handleLoadMore}
        accessibilityRole="button"
        accessibilityLabel="Load more reviews"
      >
        <Text style={styles.loadMoreButtonText}>Load More Reviews</Text>
      </TouchableOpacity>
    );
  };

  const renderLoadingMore = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="small" color={COLORS.primary} />
        <Text style={styles.loadingMoreText}>Loading more reviews...</Text>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Reviews Yet</Text>
      <Text style={styles.emptyStateText}>
        Be the first to share your experience with this court!
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Review }) => (
    <ReviewCard
      review={item}
      onHelpfulPress={handleHelpfulPress}
      compact={compact}
      showActions={!compact}
    />
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {renderLoadingMore()}
      {renderLoadMoreButton()}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading reviews...</Text>
      </View>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => loadReviews(1, sortBy, true)}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // When nested inside a ScrollView, use a simple mapped array instead of FlatList
  if (nested) {
    return (
      <View style={[styles.container, maxHeight ? { maxHeight } : undefined]}>
        {renderSortOptions()}

        <View style={styles.listContent}>
          {reviews.length === 0 ? (
            renderEmptyState()
          ) : (
            reviews.map((item) => (
              <View key={item.id}>
                {renderItem({ item })}
              </View>
            ))
          )}
          {renderFooter()}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, maxHeight ? { maxHeight } : undefined]}>
      {renderSortOptions()}

      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        contentContainerStyle={
          reviews.length === 0
            ? [styles.listContent, styles.emptyListContent]
            : styles.listContent
        }
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortContainer: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  sortLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  sortButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 36,
    justifyContent: 'center',
  },
  activeSortButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sortButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  activeSortButtonText: {
    color: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  loadingMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  loadingMoreText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  loadingText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    marginTop: SPACING.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.md,
    textAlign: 'center',
    marginBottom: SPACING.md,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyStateTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ReviewsList;