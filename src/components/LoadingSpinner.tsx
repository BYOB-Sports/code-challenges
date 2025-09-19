import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, DIMENSIONS } from '../constants';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  text = 'Loading...',
  overlay = false,
}) => {
  const containerStyle = overlay ? [styles.container, styles.overlay] : styles.container;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.lg,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
  text: {
    marginTop: DIMENSIONS.md,
    fontSize: DIMENSIONS.fontMedium,
    color: COLORS.textSecondary,
  },
});
