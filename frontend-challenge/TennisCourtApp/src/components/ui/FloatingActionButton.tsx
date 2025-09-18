import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SHADOWS, SPACING, TYPOGRAPHY, RADIUS, Z_INDEX } from '@/constants';
import { ScaleButton } from '../animated';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  text?: string;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = '+',
  text,
  backgroundColor = COLORS.primary,
  size = 'medium',
  position = 'bottom-right',
  style,
  textStyle,
  disabled = false,
  accessibilityLabel,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: 48,
          height: 48,
          borderRadius: 24,
        };
      case 'large':
        return {
          width: 64,
          height: 64,
          borderRadius: 32,
        };
      default:
        return {
          width: 56,
          height: 56,
          borderRadius: 28,
        };
    }
  };

  const getPositionStyles = () => {
    const basePosition = {
      position: 'absolute' as const,
      bottom: SPACING.xl,
      zIndex: Z_INDEX.fixed,
    };

    switch (position) {
      case 'bottom-left':
        return { ...basePosition, left: SPACING.md };
      case 'bottom-center':
        return { ...basePosition, alignSelf: 'center' as const };
      default:
        return { ...basePosition, right: SPACING.md };
    }
  };

  const isExtended = !!text;

  return (
    <ScaleButton
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        getSizeStyles(),
        getPositionStyles(),
        {
          backgroundColor: disabled ? COLORS.text.disabled : backgroundColor,
          paddingHorizontal: isExtended ? SPACING.lg : 0,
          width: isExtended ? 'auto' : getSizeStyles().width,
          minWidth: getSizeStyles().width,
        },
        SHADOWS.large,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || text || 'Floating action button'}
    >
      {icon && (
        <Text style={[styles.icon, { fontSize: getSizeStyles().width / 3 }]}>
          {icon}
        </Text>
      )}
      {text && (
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      )}
    </ScaleButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
  },
  icon: {
    color: COLORS.text.inverse,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
  },
  text: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginLeft: SPACING.sm,
  },
});

export default FloatingActionButton;