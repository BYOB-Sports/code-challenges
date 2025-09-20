import React, { useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { ANIMATIONS } from '@/constants';

interface ScaleButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  scaleValue?: number;
  duration?: number;
  style?: ViewStyle;
}

const ScaleButton: React.FC<ScaleButtonProps> = ({
  children,
  scaleValue = 0.95,
  duration = ANIMATIONS.timing.fast,
  style,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (event: any) => {
    Animated.timing(scaleAnim, {
      toValue: scaleValue,
      duration: duration,
      useNativeDriver: true,
    }).start();

    if (onPressIn) {
      onPressIn(event);
    }
  };

  const handlePressOut = (event: any) => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();

    if (onPressOut) {
      onPressOut(event);
    }
  };

  return (
    <TouchableOpacity
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScaleButton;