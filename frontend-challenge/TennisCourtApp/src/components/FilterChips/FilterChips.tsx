import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Court, CourtsFilter } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

export interface FilterChipsProps {
  filters: CourtsFilter;
  onFiltersChange: (filters: CourtsFilter) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const surfaceTypes: Court['surface'][] = [
    'hard',
    'clay',
    'grass',
    'synthetic',
  ];
  const ratingOptions = [1, 2, 3, 4, 4.5];
  const priceRanges = [
    { label: 'Under $30', min: 0, max: 29 },
    { label: '$30-$50', min: 30, max: 50 },
    { label: '$51-$75', min: 51, max: 75 },
    { label: '$76-$100', min: 76, max: 100 },
    { label: 'Over $100', min: 101, max: Infinity },
  ];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.surface) count++;
    if (filters.indoor !== undefined) count++;
    if (filters.minRating) count++;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
      count++;
    return count;
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const updateFilter = (key: keyof CourtsFilter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const setPriceRange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      minPrice: min === 0 ? undefined : min,
      maxPrice: max === Infinity ? undefined : max,
    });
  };

  const getSurfaceLabel = (surface: Court['surface']) => {
    const labels: { [key in Court['surface']]: string } = {
      hard: 'Hard Court',
      clay: 'Clay',
      grass: 'Grass',
      synthetic: 'Synthetic',
    };
    return labels[surface];
  };

  const getPriceRangeLabel = () => {
    if (!filters.minPrice && !filters.maxPrice) return null;

    const range = priceRanges.find(
      r =>
        r.min === (filters.minPrice || 0) &&
        r.max === (filters.maxPrice || Infinity)
    );

    if (range) return range.label;

    if (filters.minPrice && filters.maxPrice) {
      return `$${filters.minPrice}-$${filters.maxPrice}`;
    } else if (filters.minPrice) {
      return `$${filters.minPrice}+`;
    } else if (filters.maxPrice) {
      return `Under $${filters.maxPrice}`;
    }

    return null;
  };

  const renderChip = (
    label: string,
    isActive: boolean,
    onPress: () => void,
    showRemove = false
  ) => (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.activeChip]}
      onPress={onPress}
      accessible
      accessibilityRole='button'
      accessibilityState={{ selected: isActive }}
    >
      <Text style={[styles.chipText, isActive && styles.activeChipText]}>
        {label}
      </Text>
      {showRemove && isActive && <Text style={styles.removeText}> ✕</Text>}
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <Modal
      visible={showFiltersModal}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={() => setShowFiltersModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => setShowFiltersModal(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity
            onPress={() => {
              clearAllFilters();
              setShowFiltersModal(false);
            }}
            style={styles.modalButton}
          >
            <Text style={[styles.modalButtonText, styles.clearButtonText]}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {/* Surface Type */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Surface Type</Text>
            <View style={styles.filterOptions}>
              {surfaceTypes.map(surface => (
                <TouchableOpacity
                  key={surface}
                  style={[
                    styles.filterOption,
                    filters.surface === surface && styles.activeFilterOption,
                  ]}
                  onPress={() =>
                    updateFilter(
                      'surface',
                      filters.surface === surface ? undefined : surface
                    )
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.surface === surface &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {getSurfaceLabel(surface)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Indoor/Outdoor */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Court Type</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  filters.indoor === true && styles.activeFilterOption,
                ]}
                onPress={() =>
                  updateFilter(
                    'indoor',
                    filters.indoor === true ? undefined : true
                  )
                }
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filters.indoor === true && styles.activeFilterOptionText,
                  ]}
                >
                  Indoor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  filters.indoor === false && styles.activeFilterOption,
                ]}
                onPress={() =>
                  updateFilter(
                    'indoor',
                    filters.indoor === false ? undefined : false
                  )
                }
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    filters.indoor === false && styles.activeFilterOptionText,
                  ]}
                >
                  Outdoor
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Minimum Rating */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
            <View style={styles.filterOptions}>
              {ratingOptions.map(rating => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.filterOption,
                    filters.minRating === rating && styles.activeFilterOption,
                  ]}
                  onPress={() =>
                    updateFilter(
                      'minRating',
                      filters.minRating === rating ? undefined : rating
                    )
                  }
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      filters.minRating === rating &&
                        styles.activeFilterOptionText,
                    ]}
                  >
                    {rating}+ ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <View style={styles.filterOptions}>
              {priceRanges.map(range => {
                const isActive =
                  (filters.minPrice || 0) === range.min &&
                  (filters.maxPrice || Infinity) === range.max;

                return (
                  <TouchableOpacity
                    key={range.label}
                    style={[
                      styles.filterOption,
                      isActive && styles.activeFilterOption,
                    ]}
                    onPress={() =>
                      isActive
                        ? setPriceRange(0, Infinity)
                        : setPriceRange(range.min, range.max)
                    }
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        isActive && styles.activeFilterOptionText,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFiltersModal(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {/* Filters button */}
        <TouchableOpacity
          style={[
            styles.filtersButton,
            getActiveFiltersCount() > 0 && styles.activeFiltersButton,
          ]}
          onPress={() => setShowFiltersModal(true)}
        >
          <Text
            style={[
              styles.filtersButtonText,
              getActiveFiltersCount() > 0 && styles.activeFiltersButtonText,
            ]}
          >
            Filters
            {getActiveFiltersCount() > 0 && ` (${getActiveFiltersCount()})`}
          </Text>
        </TouchableOpacity>

        {/* Active filter chips */}
        {filters.surface &&
          renderChip(
            getSurfaceLabel(filters.surface),
            true,
            () => updateFilter('surface', undefined),
            true
          )}

        {filters.indoor !== undefined &&
          renderChip(
            filters.indoor ? 'Indoor' : 'Outdoor',
            true,
            () => updateFilter('indoor', undefined),
            true
          )}

        {filters.minRating &&
          renderChip(
            `${filters.minRating}+ ★`,
            true,
            () => updateFilter('minRating', undefined),
            true
          )}

        {getPriceRangeLabel() &&
          renderChip(
            getPriceRangeLabel()!,
            true,
            () => setPriceRange(0, Infinity),
            true
          )}

        {getActiveFiltersCount() > 0 && (
          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={clearAllFilters}
          >
            <Text style={styles.clearAllButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <FilterModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  chipsContainer: {
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  filtersButton: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 36,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  activeFiltersButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filtersButtonText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  activeFiltersButtonText: {
    color: COLORS.surface,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}15`,
    borderColor: COLORS.primary,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 36,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  activeChip: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  activeChipText: {
    color: COLORS.surface,
  },
  removeText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.sizes.xs,
    marginLeft: 4,
  },
  clearAllButton: {
    backgroundColor: `${COLORS.error}15`,
    borderColor: COLORS.error,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 36,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  clearAllButtonText: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  // Modal styles
  modalContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  modalTitle: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  modalButton: {
    padding: SPACING.sm,
  },
  modalButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
  },
  clearButtonText: {
    color: COLORS.error,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  filterSection: {
    marginVertical: SPACING.md,
  },
  filterSectionTitle: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginBottom: SPACING.sm,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  filterOption: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterOptionText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  activeFilterOptionText: {
    color: COLORS.surface,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  modalFooter: {
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    padding: SPACING.md,
  },
  applyButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
  },
  applyButtonText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
});

export default FilterChips;
