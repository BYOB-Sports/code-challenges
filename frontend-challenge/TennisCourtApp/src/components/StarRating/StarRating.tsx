import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showNumber?: boolean;
  style?: any;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 16,
  interactive = false,
  onRatingChange,
  showNumber = false,
  style,
}) => {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starRating = index + 1;
    const isFilled = starRating <= Math.floor(rating);
    const isHalfFilled = starRating === Math.ceil(rating) && rating % 1 !== 0;

    if (interactive && onRatingChange) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => onRatingChange(starRating)}
          style={styles.interactiveStar}
          accessibilityRole="button"
          accessibilityLabel={`Rate ${starRating} star${starRating !== 1 ? 's' : ''}`}
          accessibilityHint="Double tap to rate"
        >
          <Text
            style={[
              styles.star,
              {
                fontSize: size,
                color: isFilled ? COLORS.warning : COLORS.border,
              },
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View key={index} style={styles.staticStar}>
        {isHalfFilled ? (
          <View style={styles.halfStarContainer}>
            <View style={[styles.halfStarMask, { width: size * 0.5 }]}>
              <Text
                style={[
                  styles.star,
                  {
                    fontSize: size,
                    color: COLORS.warning,
                  },
                ]}
              >
                ★
              </Text>
            </View>
            <Text
              style={[
                styles.star,
                styles.halfStarBackground,
                {
                  fontSize: size,
                  color: COLORS.border,
                  position: 'absolute',
                },
              ]}
            >
              ★
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.star,
              {
                fontSize: size,
                color: isFilled ? COLORS.warning : COLORS.border,
              },
            ]}
          >
            ★
          </Text>
        )}
      </View>
    );
  });

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole={interactive ? 'radiogroup' : 'text'}
      accessibilityLabel={`Rating: ${rating.toFixed(1)} out of ${maxStars} stars`}
    >
      <View style={styles.starsContainer}>
        {stars}
      </View>
      {showNumber && (
        <Text style={[styles.ratingNumber, { fontSize: size * 0.8 }]}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontWeight: 'bold',
  },
  interactiveStar: {
    padding: SPACING.xs / 2,
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  staticStar: {
    marginRight: 1,
  },
  halfStarContainer: {
    position: 'relative',
  },
  halfStarMask: {
    overflow: 'hidden',
    zIndex: 1,
  },
  halfStarBackground: {
    zIndex: 0,
  },
  ratingNumber: {
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginLeft: SPACING.sm,
  },
});

export default StarRating;