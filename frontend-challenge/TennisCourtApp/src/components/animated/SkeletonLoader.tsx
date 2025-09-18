import React, { useEffect, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { COLORS, RADIUS, ANIMATIONS } from '@/constants';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  shimmerColors?: string[];
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = RADIUS.sm,
  style,
  shimmerColors = [COLORS.border.light, COLORS.backgroundSecondary, COLORS.border.light],
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: ANIMATIONS.timing.slow,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: ANIMATIONS.timing.slow,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: shimmerColors,
  });

  return (
    <View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor,
        }}
      />
    </View>
  );
};

// Predefined skeleton shapes for common use cases
export const SkeletonCard: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[{ padding: 16 }, style]}>
    <SkeletonLoader height={120} borderRadius={RADIUS.md} style={{ marginBottom: 16 }} />
    <SkeletonLoader height={24} width="80%" style={{ marginBottom: 8 }} />
    <SkeletonLoader height={16} width="60%" style={{ marginBottom: 8 }} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
      <SkeletonLoader height={20} width="30%" />
      <SkeletonLoader height={20} width="25%" />
    </View>
  </View>
);

export const SkeletonText: React.FC<{ lines?: number; style?: ViewStyle }> = ({
  lines = 3,
  style
}) => (
  <View style={style}>
    {Array.from({ length: lines }, (_, index) => (
      <SkeletonLoader
        key={index}
        height={16}
        width={index === lines - 1 ? '70%' : '100%'}
        style={{ marginBottom: index === lines - 1 ? 0 : 8 }}
      />
    ))}
  </View>
);

export const SkeletonAvatar: React.FC<{ size?: number; style?: ViewStyle | undefined }> = ({
  size = 40,
  style
}) => (
  <SkeletonLoader
    width={size}
    height={size}
    borderRadius={size / 2}
    style={style}
  />
);

export default SkeletonLoader;