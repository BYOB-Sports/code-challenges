import React from 'react';
import { View, ViewStyle } from 'react-native';
import { COLORS } from '@/constants';

interface GradientBackgroundProps {
  children?: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
  angle?: number;
}

// Simple gradient implementation using overlapping views with opacity
// For a more sophisticated gradient, consider react-native-linear-gradient
const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors = COLORS.gradients.primary,
  style,
}) => {
  if (colors.length === 1) {
    return (
      <View style={[{ backgroundColor: colors[0] }, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[{ backgroundColor: colors[0] }, style]}>
      {colors.slice(1).map((color, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: color,
            opacity: 0.7 / (index + 1),
          }}
        />
      ))}
      {children}
    </View>
  );
};

export default GradientBackground;