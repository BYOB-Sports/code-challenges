import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { Court } from '@/types';
import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';
import { LazyImage } from '../LazyImage';

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

  const getSurfaceColor = (surface: Court['surface']) => {
    switch (surface) {
      case 'clay':
        return '#D2691E';
      case 'grass':
        return '#228B22';
      case 'hard':
        return '#4169E1';
      case 'synthetic':
        return '#8A2BE2';
      default:
        return COLORS.primary;
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
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(court.id)}
      activeOpacity={0.7}
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
        <View
          style={[
            styles.surfaceBadge,
            { backgroundColor: getSurfaceColor(court.surface) },
          ]}
        >
          <Text style={styles.surfaceText}>{court.surface.toUpperCase()}</Text>
        </View>
        {court.indoor && (
          <View style={styles.indoorBadge}>
            <Text style={styles.indoorText}>INDOOR</Text>
          </View>
        )}
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
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${court.pricePerHour}</Text>
            <Text style={styles.priceUnit}>/hour</Text>
          </View>

          <View style={styles.courtsInfo}>
            <Text style={styles.courtsCount}>
              {court.numberOfCourts} court
              {court.numberOfCourts !== 1 ? 's' : ''}
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
    </TouchableOpacity>
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
    backgroundColor: `${COLORS.primary}10`,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: SPACING.xs,
    marginRight: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  amenityText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    elevation: 5,
    marginBottom: SPACING.md,
    minHeight: 44,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84, // Minimum touch target size
  },
  content: {
    padding: SPACING.md,
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
    color: COLORS.border,
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
    height: 160,
    position: 'relative',
    width: '100%',
  },
  indoorBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 6,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    position: 'absolute',
    right: SPACING.sm,
    top: SPACING.sm,
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
    fontWeight: TYPOGRAPHY.weights.semibold,
    marginRight: SPACING.sm,
  },
  price: {
    color: COLORS.success,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  priceContainer: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  priceUnit: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.sm,
    marginLeft: 2,
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
    borderRadius: 6,
    left: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    position: 'absolute',
    top: SPACING.sm,
  },
  surfaceText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default memo(CourtCard);
