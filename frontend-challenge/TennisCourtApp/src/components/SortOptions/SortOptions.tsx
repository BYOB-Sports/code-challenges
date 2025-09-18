import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

export type SortOption =
  | 'rating'
  | 'price-low'
  | 'price-high'
  | 'distance'
  | 'name';

export interface SortOptionsProps {
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  selectedSort,
  onSortChange,
}) => {
  const [showSortModal, setShowSortModal] = useState(false);

  const sortOptions: {
    value: SortOption;
    label: string;
    description: string;
  }[] = [
    {
      value: 'rating',
      label: 'Rating',
      description: 'Highest rated first',
    },
    {
      value: 'price-low',
      label: 'Price: Low to High',
      description: 'Most affordable first',
    },
    {
      value: 'price-high',
      label: 'Price: High to Low',
      description: 'Most expensive first',
    },
    {
      value: 'distance',
      label: 'Distance',
      description: 'Closest to you first',
    },
    {
      value: 'name',
      label: 'Name',
      description: 'Alphabetical order',
    },
  ];

  const getSortLabel = (sort: SortOption) => {
    const option = sortOptions.find(opt => opt.value === sort);
    return option ? option.label : 'Rating';
  };

  const SortModal = () => (
    <Modal
      visible={showSortModal}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => setShowSortModal(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Done</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Sort By</Text>
          <View style={styles.modalButton} />
        </View>

        <View style={styles.modalContent}>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortOption,
                selectedSort === option.value && styles.activeSortOption,
              ]}
              onPress={() => {
                onSortChange(option.value);
                setShowSortModal(false);
              }}
              accessible
              accessibilityRole='button'
              accessibilityState={{ selected: selectedSort === option.value }}
            >
              <View style={styles.sortOptionContent}>
                <Text
                  style={[
                    styles.sortOptionLabel,
                    selectedSort === option.value &&
                      styles.activeSortOptionLabel,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.sortOptionDescription,
                    selectedSort === option.value &&
                      styles.activeSortOptionDescription,
                  ]}
                >
                  {option.description}
                </Text>
              </View>
              {selectedSort === option.value && (
                <View style={styles.checkIcon}>
                  <Text style={styles.checkIconText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setShowSortModal(true)}
        accessible
        accessibilityRole='button'
        accessibilityLabel={`Sort by ${getSortLabel(selectedSort)}`}
        accessibilityHint='Opens sort options menu'
      >
        <Text style={styles.sortButtonText} numberOfLines={1} ellipsizeMode="tail">
          Sort: {getSortLabel(selectedSort)}
        </Text>
        <Text style={styles.sortArrow}>▼</Text>
      </TouchableOpacity>

      <SortModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  sortButton: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  sortButtonText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    flex: 1,
    marginRight: SPACING.sm,
  },
  sortArrow: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.xs,
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
    minWidth: 60,
    padding: SPACING.sm,
  },
  modalButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  sortOption: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
    minHeight: 60,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  activeSortOption: {
    backgroundColor: `${COLORS.primary}10`,
  },
  sortOptionContent: {
    flex: 1,
  },
  sortOptionLabel: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 2,
  },
  activeSortOptionLabel: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  sortOptionDescription: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  activeSortOptionDescription: {
    color: COLORS.primary,
  },
  checkIcon: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    marginLeft: SPACING.sm,
    width: 24,
  },
  checkIconText: {
    color: COLORS.surface,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default SortOptions;
