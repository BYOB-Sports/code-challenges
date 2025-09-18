import React from 'react';
import type { TextStyle, ViewStyle } from 'react-native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    disabled && styles.disabled,
    loading && styles.loading,
    style,
  ];

  const buttonTextStyle = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      activeOpacity={disabled || loading ? 1 : 0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? COLORS.background : COLORS.primary}
          size='small'
        />
      ) : (
        <>
          {icon}
          <Text style={buttonTextStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    gap: SPACING.sm,
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: TYPOGRAPHY.weights.semibold,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.7,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: COLORS.primary,
  },
  largeSize: {
    minHeight: 52,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  largeText: {
    fontSize: TYPOGRAPHY.sizes.lg,
  },
  loading: {
    opacity: 0.8,
  },
  mediumSize: {
    minHeight: 44,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  mediumText: {
    fontSize: TYPOGRAPHY.sizes.md,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  outlineText: {
    color: COLORS.primary,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    color: COLORS.background,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  secondaryText: {
    color: COLORS.background,
  },
  smallSize: {
    minHeight: 36,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  smallText: {
    fontSize: TYPOGRAPHY.sizes.sm,
  },
});

export default Button;
