import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  debounceMs?: number;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search courts, locations, amenities...',
  debounceMs = 300,
  autoFocus = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>();
  const focusAnimValue = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onChangeText(localValue);
    }, debounceMs);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localValue, onChangeText, debounceMs]);

  // Sync with external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFocus = useCallback(() => {
    Animated.timing(focusAnimValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusAnimValue]);

  const handleBlur = useCallback(() => {
    Animated.timing(focusAnimValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focusAnimValue]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChangeText('');
    inputRef.current?.focus();
  }, [onChangeText]);

  const borderColor = focusAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.primary],
  });

  const shadowOpacity = focusAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.2],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor,
          shadowOpacity: Platform.OS === 'ios' ? shadowOpacity : 0.1,
        },
      ]}
    >
      <View style={styles.searchIcon}>
        <Text style={styles.searchIconText}>🔍</Text>
      </View>

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={localValue}
        onChangeText={setLocalValue}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='search'
        clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : 'never'}
        accessible
        accessibilityLabel='Search tennis courts'
        accessibilityHint='Type to search for courts by name, location, or amenities'
      />

      {Platform.OS === 'android' && localValue.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClear}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessible
          accessibilityLabel='Clear search'
          accessibilityRole='button'
        >
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    alignItems: 'center',
    backgroundColor: `${COLORS.text.disabled}20`,
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: SPACING.sm,
    minHeight: 24,
    minWidth: 24,
    padding: SPACING.xs,
  },
  clearButtonText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 5,
    flexDirection: 'row',
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.md,
    minHeight: 44,
    paddingHorizontal: SPACING.md,
    paddingVertical: Platform.OS === 'ios' ? SPACING.md : SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84, // Minimum touch target size
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    paddingVertical: 0, // Remove default padding for consistent height
    minHeight: 20,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchIconText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
  },
});

export default SearchBar;
