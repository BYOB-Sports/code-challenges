import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Court } from '../types';
import { COLORS, DIMENSIONS } from '../constants';
import { useScaleAnimation } from '../hooks/useAnimations';
import StarRating from './StarRating';

interface CourtCardProps {
  court: Court;
  onPress: (court: Court) => void;
}

const CourtCard: React.FC<CourtCardProps> = memo(({ court, onPress }) => {
  const { scaleValue, animateIn, animateOut } = useScaleAnimation();

  const handlePress = () => {
    onPress(court);
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      onPressIn={animateIn}
      onPressOut={animateOut}
      activeOpacity={0.9}
      style={styles.touchable}
    >
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <Image 
          source={{ uri: court.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {court.name}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {court.location}
          </Text>
          <View style={styles.ratingContainer}>
            <StarRating rating={Math.round(court.averageRating)} size={16} />
            <Text style={styles.ratingText}>
              {court.averageRating.toFixed(1)} ({court.reviews.length})
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

CourtCard.displayName = 'CourtCard';

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: DIMENSIONS.md,
    marginVertical: DIMENSIONS.sm,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: DIMENSIONS.radiusMedium,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: DIMENSIONS.cardImageHeight,
  },
  content: {
    padding: DIMENSIONS.md,
  },
  name: {
    fontSize: DIMENSIONS.fontXLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: DIMENSIONS.xs,
  },
  location: {
    fontSize: DIMENSIONS.fontMedium,
    color: COLORS.textSecondary,
    marginBottom: DIMENSIONS.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: DIMENSIONS.sm,
    fontSize: DIMENSIONS.fontMedium,
    color: COLORS.text,
    fontWeight: '600',
  },
});

export default CourtCard;
