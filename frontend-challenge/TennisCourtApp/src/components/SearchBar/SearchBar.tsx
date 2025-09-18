import React, { memo, useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Text,
} from 'react-native';

import { ACCESSIBILITY, COLORS, PERFORMANCE, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants';
import { debounce, createCleanupManager } from '@/utils';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  editable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  autoFocus = false,
  editable = true,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const cleanupManager = useRef(createCleanupManager());

  // Debounced search to improve performance
  const debouncedSearch = useRef(
    debounce((text: string) => {
      onChangeText(text);
    }, PERFORMANCE.interaction.searchDelay)
  ).current;

  const handleChangeText = useCallback((text: string) => {
    setInternalValue(text);
    debouncedSearch(text);
  }, [debouncedSearch]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleClear = useCallback(() => {
    setInternalValue('');
    onChangeText('');
    inputRef.current?.focus();
  }, [onChangeText]);

  const handleSubmit = useCallback(() => {
    // Immediately trigger search on submit
    onChangeText(internalValue);
    inputRef.current?.blur();
  }, [internalValue, onChangeText]);

  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer,
        isFocused && styles.searchContainerFocused,
      ]}>
        <Text style={styles.searchIcon}>🔍</Text>
        
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          value={internalValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.tertiary}
          autoFocus={autoFocus}
          editable={editable}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="never" // We'll handle this ourselves
          selectTextOnFocus
          // Performance optimizations
          keyboardType="default"
          textContentType="none"
          // Accessibility
          accessible
          accessibilityRole="searchbox"
          accessibilityLabel="Search courts"
          accessibilityHint="Enter keywords to search for tennis courts"
        />

        {internalValue.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            accessibilityHint="Double tap to clear search text"
          >
            <Text style={styles.clearIcon}>✕</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border.light,
    ...SHADOWS.small,
  },
  searchContainerFocused: {
    borderColor: COLORS.border.focus,
    ...SHADOWS.medium,
  },
  searchIcon: {
    fontSize: TYPOGRAPHY.sizes.md,
    marginRight: SPACING.sm,
    color: COLORS.text.secondary,
  },
  textInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    paddingVertical: SPACING.xs,
    // Ensure minimum touch target
    minHeight: ACCESSIBILITY.minTouchTarget - (SPACING.sm * 2),
  },
  clearButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.border.light,
    // Ensure minimum touch target
    minWidth: ACCESSIBILITY.minTouchTarget - SPACING.md,
    minHeight: ACCESSIBILITY.minTouchTarget - SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default memo(SearchBar);
