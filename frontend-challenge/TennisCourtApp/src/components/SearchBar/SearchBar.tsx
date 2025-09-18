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

import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, RADIUS, ANIMATIONS } from '@/constants';

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
      duration: ANIMATIONS.timing.normal,
      useNativeDriver: false,
    }).start();
  }, [focusAnimValue]);

  const handleBlur = useCallback(() => {
    Animated.timing(focusAnimValue, {
      toValue: 0,
      duration: ANIMATIONS.timing.normal,
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
    outputRange: [COLORS.border.default, COLORS.border.focus],
  });

  const shadowOpacity = focusAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.25],
  });

  const shadowRadius = focusAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 8],
  });

  const backgroundColor = focusAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.surface, COLORS.background],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderColor,
          backgroundColor,
          shadowOpacity: Platform.OS === 'ios' ? shadowOpacity : undefined,
          shadowRadius: Platform.OS === 'ios' ? shadowRadius : undefined,
          elevation: Platform.OS === 'android' ? focusAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 8],
          }) : undefined,
        },
      ]}
    >
      <Animated.View style={[
        styles.searchIcon,
        {
          transform: [{
            scale: focusAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            })
          }]
        }
      ]}>
        <Text style={[
          styles.searchIconText,
          {
            color: focusAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [COLORS.text.tertiary, COLORS.primary],
            })
          }
        ]}>🔍</Text>
      </Animated.View>

      <TextInput
        ref={inputRef}
        style={styles.input}
        value={localValue}
        onChangeText={setLocalValue}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.tertiary}
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
    backgroundColor: `${COLORS.text.tertiary}20`,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    marginLeft: SPACING.md,
    minHeight: 28,
    minWidth: 28,
    padding: SPACING.xs,
  },
  clearButtonText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  container: {
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    marginHorizontal: SPACING.lg,
    minHeight: 52,
    paddingHorizontal: SPACING.lg,
    paddingVertical: Platform.OS === 'ios' ? SPACING.md : SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    paddingVertical: 0, // Remove default padding for consistent height
    minHeight: 20,
  },
  searchIcon: {
    marginRight: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconText: {
    fontSize: TYPOGRAPHY.sizes.lg,
  },
});

export default SearchBar;
