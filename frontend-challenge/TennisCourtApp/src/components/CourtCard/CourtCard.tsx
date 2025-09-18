import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { Court } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY, SHADOWS, RADIUS } from '@/constants';
import { LazyImage } from '../LazyImage';
import { ScaleButton } from '../animated';
import GradientBackground from '../ui/GradientBackground';

export interface CourtCardProps {
  court: Court;
  onPress: (courtId: string) => void;
}

const CourtCard: React.FC<CourtCardProps> = ({ court, onPress }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={`star-${i}`} style={styles.star}>
          ★
        </Text>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Text key='half-star' style={styles.star}>
          ☆
        </Text>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Text key={`empty-${i}`} style={styles.emptyStar}>
          ☆
        </Text>
      );
    }

    return stars;
  };


  const getSurfaceGradient = (surface: Court['surface']) => {
    switch (surface) {
      case 'clay':
        return ['#D2691E', '#CD853F'];
      case 'grass':
        return ['#228B22', '#32CD32'];
      case 'hard':
        return ['#4169E1', '#6495ED'];
      case 'synthetic':
        return ['#8A2BE2', '#9370DB'];
      default:
        return COLORS.gradients.primary;
    }
  };

  const getKeyAmenities = (amenities: string[]) => {
    const keyAmenities = [
      'Parking',
      'Lighting',
      'Pro Shop',
      'Locker Rooms',
      'Restaurant',
      'Coaching Available',
    ];
    return amenities
      .filter(amenity => keyAmenities.includes(amenity))
      .slice(0, 3);
  };

  const renderAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: string } = {
      Parking: '🅿️',
      Lighting: '💡',
      'Pro Shop': '🏪',
      'Locker Rooms': '🚿',
      Restaurant: '🍽️',
      'Coaching Available': '🎾',
    };

    return iconMap[amenity] || '•';
  };

  return (
    <ScaleButton
      style={styles.container}
      onPress={() => onPress(court.id)}
      scaleValue={0.98}
      accessible
      accessibilityLabel={`${court.name}, rating ${court.rating} stars, ${court.pricePerHour} dollars per hour`}
      accessibilityRole='button'
    >
      <View style={styles.imageContainer}>
        <LazyImage
          source={{ uri: court.imageUrl }}
          style={styles.image}
          resizeMode='cover'
        />
        <GradientBackground
          colors={[...getSurfaceGradient(court.surface)]}
          style={styles.surfaceBadge}
        >
          <Text style={styles.surfaceText}>{court.surface.toUpperCase()}</Text>
        </GradientBackground>
        {court.indoor && (
          <View style={styles.indoorBadge}>
            <Text style={styles.indoorText}>🏢 INDOOR</Text>
          </View>
        )}
        <View style={styles.imageOverlay} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {court.name}
          </Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(court.rating)}
            </View>
            <Text style={styles.ratingText}>{court.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.location} numberOfLines={2}>
          {court.address}
        </Text>

        <View style={styles.details}>
          <GradientBackground
            colors={[...COLORS.gradients.success]}
            style={styles.priceContainer}
          >
            <Text style={styles.price}>${court.pricePerHour}</Text>
            <Text style={styles.priceUnit}>/hr</Text>
          </GradientBackground>

          <View style={styles.courtsInfo}>
            <Text style={styles.courtsCount}>
              🎾 {court.numberOfCourts} court{court.numberOfCourts !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <View style={styles.amenities}>
          {getKeyAmenities(court.amenities).map((amenity, _index) => (
            <View key={amenity} style={styles.amenityItem}>
              <Text style={styles.amenityIcon}>
                {renderAmenityIcon(amenity)}
              </Text>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScaleButton>
  );
};

const styles = StyleSheet.create({
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  amenityIcon: {
    fontSize: TYPOGRAPHY.sizes.sm,
    marginRight: 4,
  },
  amenityItem: {
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}15`,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    marginBottom: SPACING.xs,
    marginRight: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  amenityText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.lg,
    minHeight: 44,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  content: {
    padding: SPACING.lg,
  },
  courtsCount: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  courtsInfo: {
    alignItems: 'flex-end',
  },
  details: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  emptyStar: {
    color: COLORS.border.default,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 180,
    position: 'relative',
    width: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  indoorBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
    ...SHADOWS.small,
  },
  indoorText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  location: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  name: {
    color: COLORS.text.primary,
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginRight: SPACING.sm,
    lineHeight: TYPOGRAPHY.sizes.lg * TYPOGRAPHY.lineHeights.tight,
  },
  price: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    ...SHADOWS.small,
  },
  priceUnit: {
    color: COLORS.text.inverse,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginLeft: 4,
    opacity: 0.9,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  ratingText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  star: {
    color: COLORS.warning,
    fontSize: TYPOGRAPHY.sizes.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  surfaceBadge: {
    borderRadius: RADIUS.sm,
    left: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    position: 'absolute',
    top: SPACING.md,
    ...SHADOWS.small,
  },
  surfaceText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default memo(CourtCard);
