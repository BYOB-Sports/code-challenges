import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { ANIMATIONS } from '@/constants';

interface FadeInViewProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  style?: ViewStyle;
  from?: number;
  to?: number;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  duration = ANIMATIONS.timing.normal,
  delay = 0,
  style,
  from = 0,
  to = 1,
}) => {
  const fadeAnim = useRef(new Animated.Value(from)).current;

  useEffect(() => {
    const animation = Animated.timing(fadeAnim, {
      toValue: to,
      duration,
      delay,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [fadeAnim, duration, delay, to]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;