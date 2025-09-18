import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 16,
  interactive = false,
  onRatingChange,
}) => {
  const handleStarPress = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= fullStars;
      const isHalf = i === fullStars + 1 && hasHalfStar;

      const StarComponent = interactive ? TouchableOpacity : View;

      stars.push(
        <StarComponent
          key={i}
          onPress={interactive ? () => handleStarPress(i) : undefined}
          style={interactive ? styles.interactiveStar : undefined}
        >
          <Text
            style={[
              styles.star,
              {
                fontSize: size,
                color: isFilled ? '#FFD700' : isHalf ? '#FFD700' : '#DDD',
              },
            ]}
          >
            {isFilled ? '★' : isHalf ? '☆' : '☆'}
          </Text>
        </StarComponent>,
      );
    }

    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  interactiveStar: {
    padding: 4,
  },
});

export default StarRating;
