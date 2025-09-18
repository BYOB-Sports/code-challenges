import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { COLORS, SPACING } from '@/constants';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = SPACING.md,
  margin = 0,
  elevation = 2,
}) => {
  const cardStyle = [
    styles.card,
    {
      padding,
      margin,
      elevation,
      shadowOffset: {
        width: 0,
        height: elevation,
      },
      shadowOpacity: elevation * 0.05,
      shadowRadius: elevation * 2,
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    shadowColor: '#000',
  },
});

export default Card;
