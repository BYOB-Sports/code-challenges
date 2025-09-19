import React, { memo } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, DIMENSIONS } from '../constants';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = memo(({ 
  rating, 
  onRatingChange, 
  size = 20, 
  interactive = false 
}) => {
  const renderStar = (index: number) => {
    const isFilled = index < rating;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => interactive && onRatingChange && onRatingChange(index + 1)}
        disabled={!interactive}
        style={styles.starContainer}
      >
        <Icon
          name={isFilled ? 'star' : 'star-border'}
          size={size}
          color={isFilled ? COLORS.starFilled : COLORS.starEmpty}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map(renderStar)}
    </View>
  );
});

StarRating.displayName = 'StarRating';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginRight: 2,
  },
});

export default StarRating;
