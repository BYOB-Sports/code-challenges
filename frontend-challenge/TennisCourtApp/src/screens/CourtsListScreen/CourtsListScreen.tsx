import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import type { Court, CourtsFilter, RootStackParamList } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';
import { filterCourts, getAllCourts, searchCourts, sortCourts } from '@/data';
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

const CourtsListScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CourtsFilter>({});
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourts();
  }, []);

  const loadCourts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call with slight delay
      await new Promise(resolve => setTimeout(resolve, 800));
      // Data is already loaded from mockCourts import
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
      navigation.navigate('CourtDetail', { courtId });
    },
    [navigation]
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFiltersChange = useCallback((newFilters: CourtsFilter) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortOption(newSort);
  }, []);

  // Memoized filtered and sorted courts
  const processedCourts = useMemo(() => {
    let result = getAllCourts();

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
  }, [searchQuery, filters, sortOption]);

  const renderCourtItem: ListRenderItem<Court> = useCallback(
    ({ item }) => <CourtCard court={item} onPress={handleCourtPress} />,
    [handleCourtPress]
  );

  const keyExtractor = useCallback((item: Court) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 300, // Updated height for enhanced court card
      offset: 300 * index,
      index,
    }),
    []
  );

  const renderEmptyState = () => {
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
  };

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Something went wrong</Text>
      <Text style={styles.errorSubtitle}>{error}</Text>
    </View>
  );

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
        removeClippedSubviews
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={6}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundSecondary,
    flex: 1,
  },
  headerBackground: {
    paddingBottom: SPACING.md,
  },
  searchAndFilters: {
    backgroundColor: COLORS.background,
    paddingBottom: SPACING.sm,
  },
  skeletonContainer: {
    padding: SPACING.md,
  },
  skeletonCard: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxxl,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  emptyIcon: {
    fontSize: 48,
    color: COLORS.text.inverse,
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
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  errorIcon: {
    fontSize: 36,
    color: COLORS.text.inverse,
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
  subtitle: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  title: {
    color: COLORS.text.inverse,
    fontSize: SCREEN.isSmall ? TYPOGRAPHY.sizes.responsive.title : TYPOGRAPHY.sizes.hero,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default CourtsListScreen;
