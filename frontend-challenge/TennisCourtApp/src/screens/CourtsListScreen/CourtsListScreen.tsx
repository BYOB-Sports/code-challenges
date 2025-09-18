import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ListRenderItem, ViewabilityConfig } from 'react-native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import type { Court, CourtsFilter, RootStackParamList } from '@/types';
import { COLORS, PERFORMANCE, SPACING, TYPOGRAPHY } from '@/constants';
import { filterCourts, getAllCourts, searchCourts, sortCourts } from '@/data';
import {
  createCleanupManager,
  debounce,
  memoize,
  preloadImages,
  runAfterInteractions,
  throttle,
} from '@/utils';
import {
  CourtCard,
  FilterChips,
  SearchBar,
  type SortOption,
  SortOptions,
} from '@/components';

type CourtsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CourtsList'
>;

type CourtsListScreenRouteProp = RouteProp<RootStackParamList, 'CourtsList'>;

interface Props {
  navigation: CourtsListScreenNavigationProp;
  route: CourtsListScreenRouteProp;
}

// Memoized court processing function
const processCourtsMemoized = memoize((
  allCourts: Court[],
  searchQuery: string,
  filters: CourtsFilter,
  sortOption: SortOption
) => {
  let result = allCourts;

  // Apply search
  if (searchQuery.trim()) {
    result = searchCourts(searchQuery, result);
  }

  // Apply filters
  result = filterCourts(filters, result);

  // Apply sorting with distance mock
  const sortMap: {
    [key in SortOption]: { criteria: any; order: 'asc' | 'desc' } | 'custom';
  } = {
    rating: { criteria: 'rating', order: 'desc' },
    'price-low': { criteria: 'price', order: 'asc' },
    'price-high': { criteria: 'price', order: 'desc' },
    name: { criteria: 'name', order: 'asc' },
    distance: 'custom',
  };

  const sortConfig = sortMap[sortOption];
  if (sortConfig === 'custom') {
    // Mock distance sorting - in real app, would use user location
    result = [...result].sort(() => Math.random() - 0.5);
  } else {
    result = sortCourts(result, sortConfig.criteria, sortConfig.order);
  }

  return result;
});

const CourtsListScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourtsFilter>({});
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  const cleanupManager = useRef(createCleanupManager());
  const flatListRef = useRef<FlatList>(null);
  const allCourts = useRef<Court[]>([]);

  useEffect(() => {
    loadCourts();
    return () => cleanupManager.current.cleanup();
  }, []);

  const loadCourts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load courts data
      allCourts.current = getAllCourts();
      
      // Preload high priority images for visible items
      runAfterInteractions(() => {
        if (allCourts.current.length > 0) {
          const highPriorityImages = allCourts.current
            .slice(0, PERFORMANCE.flatList.initialNumToRender)
            .map(court => court.imageUrl);
          
          preloadImages(highPriorityImages, PERFORMANCE.image.preloadBatchSize)
            .catch(() => {
              // Silently handle preload failures
            });
        }
      });
      
      // Simulate API call with slight delay
      await new Promise(resolve => setTimeout(resolve, 800));
    } catch (err) {
      setError('Failed to load courts. Please try again.');
      Alert.alert('Error', 'Failed to load courts');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      setError(null);
      // Simulate refresh delay
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (err) {
      setError('Failed to refresh courts. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleCourtPress = useCallback(
    (courtId: string) => {
      runAfterInteractions(() => {
        navigation.navigate('CourtDetail', { courtId });
      });
    },
    [navigation]
  );

  // Optimized search handler with debouncing
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setSearchQuery(query);
    }, PERFORMANCE.interaction.searchDelay),
    []
  );

  const handleSearchChange = useCallback((query: string) => {
    debouncedSearch(query);
  }, [debouncedSearch]);

  const handleFiltersChange = useCallback((newFilters: CourtsFilter) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortOption(newSort);
  }, []);

  // Memoized processed courts
  const processedCourts = useMemo(() => {
    return processCourtsMemoized(getAllCourts(), searchQuery, filters, sortOption);
  }, [searchQuery, filters, sortOption]);

  // Get nearby image URLs for preloading
  const getNearbyImages = useCallback((index: number): string[] => {
    const start = Math.max(0, index - 2);
    const end = Math.min(processedCourts.length, index + 3);
    return processedCourts
      .slice(start, end)
      .map(court => court.imageUrl)
      .filter((_, i) => i !== index - start); // Exclude current image
  }, [processedCourts]);

  // Optimized render function with image preloading
  const renderCourtItem: ListRenderItem<Court> = useCallback(
    ({ item, index }) => {
      const isVisible = visibleItems.has(item.id);
      const nearbyImages = isVisible ? getNearbyImages(index) : [];
      const priority = index < PERFORMANCE.flatList.initialNumToRender ? 'high' : 'normal';

      return (
        <CourtCard
          court={item}
          onPress={handleCourtPress}
          nearbyImages={nearbyImages}
          priority={priority}
        />
      );
    },
    [handleCourtPress, visibleItems, getNearbyImages]
  );

  const keyExtractor = useCallback((item: Court) => item.id, []);

  // Optimized getItemLayout for better scrolling performance
  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: PERFORMANCE.flatList.getItemLayout.height,
      offset: PERFORMANCE.flatList.getItemLayout.height * index,
      index,
    }),
    []
  );

  // Handle viewable items change for image preloading - use ref to avoid recreating
  const visibleItemsRef = useRef(visibleItems);
  visibleItemsRef.current = visibleItems;

  // Create stable viewability configuration and callback pairs using useRef
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 20,
        minimumViewTime: 100,
      },
      onViewableItemsChanged: throttle(({ viewableItems }: any) => {
        const newVisibleItems = new Set(
          viewableItems.map((item: any) => item.item.id)
        );
        setVisibleItems(newVisibleItems);

        // Preload images for newly visible items
        runAfterInteractions(() => {
          const newlyVisibleImages = viewableItems
            .filter((item: any) => !visibleItemsRef.current.has(item.item.id))
            .map((item: any) => item.item.imageUrl);

          if (newlyVisibleImages.length > 0) {
            preloadImages(newlyVisibleImages, PERFORMANCE.image.preloadBatchSize)
              .catch(() => {
                // Silently handle preload failures
              });
          }
        });
      }, PERFORMANCE.interaction.throttleDelay),
    },
  ]).current;

  const renderEmptyState = useCallback(() => {
    if (loading) return null;

    const hasActiveFilters =
      searchQuery.trim() || Object.keys(filters).length > 0;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎾</Text>
        <Text style={styles.emptyTitle}>
          {hasActiveFilters ? 'No courts found' : 'No courts available'}
        </Text>
        <Text style={styles.emptySubtitle}>
          {hasActiveFilters
            ? 'Try adjusting your search or filters'
            : 'Check back later for new courts'}
        </Text>
      </View>
    );
  }, [loading, searchQuery, filters]);

  const renderError = useCallback(() => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorSubtitle}>{error}</Text>
    </View>
  ), [error]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading tennis courts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>{renderError()}</SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tennis Courts</Text>
        <Text style={styles.subtitle}>
          {processedCourts.length} court
          {processedCourts.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholder='Search courts, locations, amenities...'
      />

      <FilterChips filters={filters} onFiltersChange={handleFiltersChange} />

      <SortOptions selectedSort={sortOption} onSortChange={handleSortChange} />

      <FlatList
        ref={flatListRef}
        data={processedCourts}
        renderItem={renderCourtItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        contentContainerStyle={[
          styles.listContent,
          processedCourts.length === 0 && styles.emptyListContent,
        ]}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        // Performance optimizations
        removeClippedSubviews={PERFORMANCE.flatList.removeClippedSubviews}
        maxToRenderPerBatch={PERFORMANCE.flatList.maxToRenderPerBatch}
        windowSize={PERFORMANCE.flatList.windowSize}
        initialNumToRender={PERFORMANCE.flatList.initialNumToRender}
        updateCellsBatchingPeriod={PERFORMANCE.flatList.updateCellsBatchingPeriod}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        // Additional optimizations
        scrollEventThrottle={16}
        disableVirtualization={false}
        legacyImplementation={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundSecondary,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxxl,
  },
  emptyIcon: {
    fontSize: 48,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptySubtitle: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    lineHeight: 22,
    textAlign: 'center',
  },
  emptyTitle: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  errorIcon: {
    fontSize: 36,
    color: COLORS.error,
    marginBottom: SPACING.lg,
  },
  errorSubtitle: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    lineHeight: 22,
    textAlign: 'center',
  },
  errorTitle: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    marginTop: SPACING.md,
  },
  subtitle: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    opacity: 0.9,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.hero,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
});

export default CourtsListScreen;
