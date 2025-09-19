import { useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATIONS } from '../constants';

export const useScaleAnimation = (initialValue = 1) => {
  const scaleValue = useRef(new Animated.Value(initialValue)).current;

  const animateIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      ...ANIMATIONS.spring,
    }).start();
  };

  const animateOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      ...ANIMATIONS.spring,
    }).start();
  };

  return {
    scaleValue,
    animateIn,
    animateOut,
  };
};

export const useFadeAnimation = (initialValue = 0) => {
  const fadeValue = useRef(new Animated.Value(initialValue)).current;

  const fadeIn = (duration = ANIMATIONS.medium.duration) => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration = ANIMATIONS.medium.duration) => {
    Animated.timing(fadeValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    fadeValue,
    fadeIn,
    fadeOut,
  };
};

export const useSlideAnimation = (initialValue = 0) => {
  const slideValue = useRef(new Animated.Value(initialValue)).current;

  const slideIn = (toValue = 0, duration = ANIMATIONS.medium.duration) => {
    Animated.timing(slideValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = (toValue = 100, duration = ANIMATIONS.medium.duration) => {
    Animated.timing(slideValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    slideValue,
    slideIn,
    slideOut,
  };
};
