import React, { memo, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { Court } from '@/types';
import { ACCESSIBILITY, COLORS, PERFORMANCE, RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '@/constants';
import { generateCourtAccessibilityLabel, generateAccessibilityHint, preloadImages } from '@/utils';
import { LazyImage } from '../LazyImage';
import { ScaleButton } from '../animated';
import GradientBackground from '../ui/GradientBackground';

export interface CourtCardProps {
  court: Court;
  onPress: (courtId: string) => void;
  nearbyImages?: string[];
  priority?: 'high' | 'normal' | 'low';
}

const CourtCard: React.FC<CourtCardProps> = ({ 
  court, 
  onPress,
  nearbyImages = [],
  priority = 'normal',
}) => {
  // Memoize star rendering for better performance
  const stars = useMemo(() => {
    const starElements = [];
    const fullStars = Math.floor(court.rating);
    const hasHalfStar = court.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      starElements.push(
        <Text key={`star-${i}`} style={styles.star}>
          ★
        </Text>
      );
    }

    if (hasHalfStar) {
      starElements.push(
        <Text key='half-star' style={styles.star}>
          ☆
        </Text>
      );
    }

    const emptyStars = 5 - Math.ceil(court.rating);
    for (let i = 0; i < emptyStars; i++) {
      starElements.push(
        <Text key={`empty-${i}`} style={styles.emptyStar}>
          ☆
        </Text>
      );
    }

    return starElements;
  }, [court.rating]);

  // Memoize surface gradient colors
  const surfaceGradient = useMemo(() => {
    switch (court.surface) {
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
  }, [court.surface]);

  // Memoize key amenities
  const keyAmenities = useMemo(() => {
    const keyAmenityNames = [
      'Parking',
      'Lighting',
      'Pro Shop',
      'Locker Rooms',
      'Restaurant',
      'Coaching Available',
    ];
    return court.amenities
      .filter(amenity => keyAmenityNames.includes(amenity))
      .slice(0, 3);
  }, [court.amenities]);

  // Memoize amenity icons
  const amenityIcons = useMemo(() => {
    const iconMap: { [key: string]: string } = {
      Parking: '🅿️',
      Lighting: '💡',
      'Pro Shop': '🏪',
      'Locker Rooms': '🚿',
      Restaurant: '🍽️',
      'Coaching Available': '🎾',
    };
    return iconMap;
  }, []);

  // Memoize accessibility label
  const accessibilityLabel = useMemo(() => 
    generateCourtAccessibilityLabel(court), [court]
  );

  const handlePress = useCallback(() => {
    onPress(court.id);
  }, [onPress, court.id]);

  const renderAmenityIcon = useCallback((amenity: string) => {
    return amenityIcons[amenity] || '•';
  }, [amenityIcons]);

  return (
    <ScaleButton
      style={styles.container}
      onPress={handlePress}
      scaleValue={0.98}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={generateAccessibilityHint('view court details')}
      accessibilityRole='button'
    >
      <View style={styles.imageContainer}>
        <LazyImage
          source={{ uri: court.imageUrl }}
          style={styles.image}
          resizeMode='cover'
          priority={priority}
          preloadNearby={nearbyImages}
          enableBlurPlaceholder
        />
        
        <GradientBackground
          colors={surfaceGradient}
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
          <Text 
            style={styles.name} 
            numberOfLines={2}
            accessible
            accessibilityRole='text'
            accessibilityLabel={`Court name: ${court.name}`}
          >
            {court.name}
          </Text>
          <View style={styles.ratingContainer}>
            <View 
              style={styles.starsContainer}
              accessible
              accessibilityRole='text'
              accessibilityLabel={`Rating: ${court.rating} out of 5 stars`}
            >
              {stars}
            </View>
            <Text style={styles.ratingText}>{court.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text 
          style={styles.location} 
          numberOfLines={2}
          accessible
          accessibilityRole='text'
          accessibilityLabel={`Location: ${court.address}`}
        >
          {court.address}
        </Text>

        <View style={styles.details}>
          <GradientBackground
            colors={COLORS.gradients.success}
            style={styles.priceContainer}
          >
            <Text 
              style={styles.price}
              accessible
              accessibilityRole='text'
              accessibilityLabel={`Price: ${court.pricePerHour} dollars per hour`}
            >
              ${court.pricePerHour}
            </Text>
            <Text style={styles.priceUnit}>/hr</Text>
          </GradientBackground>

          <View style={styles.courtsInfo}>
            <Text 
              style={styles.courtsCount}
              accessible
              accessibilityRole='text'
              accessibilityLabel={`${court.numberOfCourts} ${court.numberOfCourts === 1 ? 'court' : 'courts'} available`}
            >
              🎾 {court.numberOfCourts} court{court.numberOfCourts !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {keyAmenities.length > 0 && (
          <View 
            style={styles.amenities}
            accessible
            accessibilityRole='text'
            accessibilityLabel={`Amenities: ${keyAmenities.join(', ')}`}
          >
            {keyAmenities.map((amenity) => (
              <View key={amenity} style={styles.amenityItem}>
                <Text style={styles.amenityIcon}>
                  {renderAmenityIcon(amenity)}
                </Text>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        )}
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
    minHeight: ACCESSIBILITY.minTouchTarget,
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
    minHeight: PERFORMANCE.flatList.getItemLayout.height,
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
