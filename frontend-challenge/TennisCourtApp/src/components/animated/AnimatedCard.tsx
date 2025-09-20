import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { ANIMATIONS } from '@/constants';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  animationType?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  duration?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  style,
  animationType = 'fadeIn',
  duration = ANIMATIONS.timing.normal,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];

    // Always fade in
    animations.push(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      })
    );

    // Add movement animation based on type
    if (animationType !== 'fadeIn') {
      animations.push(
        Animated.timing(translateAnim, {
          toValue: 0,
          duration,
          delay,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();

    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [fadeAnim, translateAnim, delay, duration, animationType]);

  const getTransform = () => {
    switch (animationType) {
      case 'slideUp':
        return [{ translateY: translateAnim }];
      case 'slideDown':
        return [{ translateY: Animated.multiply(translateAnim, -1) }];
      case 'slideLeft':
        return [{ translateX: Animated.multiply(translateAnim, -1) }];
      case 'slideRight':
        return [{ translateX: translateAnim }];
      default:
        return [];
    }
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: getTransform(),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedCard;