import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 250;

interface ImageCarouselProps {
  images: string[];
  courtName?: string;
  height?: number;
  showIndicators?: boolean;
  enableFullscreen?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  courtName,
  height = CAROUSEL_HEIGHT,
  showIndicators = true,
  enableFullscreen = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>(
    images.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );

  const scrollViewRef = useRef<ScrollView>(null);
  const fullscreenScrollRef = useRef<ScrollView>(null);

  if (!images || images.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No images available</Text>
        </View>
      </View>
    );
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  const handleImagePress = (index: number) => {
    if (enableFullscreen) {
      setFullscreenIndex(index);
      setFullscreenVisible(true);
    }
  };

  const handleImageLoad = (index: number) => {
    setImageLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index: number) => {
    setImageLoadingStates(prev => ({ ...prev, [index]: false }));
  };

  const scrollToImage = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const scrollToFullscreenImage = (index: number) => {
    fullscreenScrollRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const handleFullscreenScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setFullscreenIndex(index);
  };

  const renderCarouselImage = (imageUri: string, index: number) => (
    <TouchableOpacity
      key={index}
      activeOpacity={enableFullscreen ? 0.9 : 1}
      onPress={() => handleImagePress(index)}
      style={[styles.imageContainer, { width: screenWidth }]}
      accessibilityRole={enableFullscreen ? 'imagebutton' : 'image'}
      accessibilityLabel={`Court image ${index + 1} of ${images.length}${
        courtName ? ` for ${courtName}` : ''
      }${enableFullscreen ? '. Double tap to view fullscreen' : ''}`}
    >
      {imageLoadingStates[index] && (
        <View style={styles.imageLoader}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      <Image
        source={{ uri: imageUri }}
        style={[styles.image, { height }]}
        resizeMode="cover"
        onLoad={() => handleImageLoad(index)}
        onError={() => handleImageError(index)}
      />
    </TouchableOpacity>
  );

  const renderFullscreenImage = (imageUri: string, index: number) => (
    <View
      key={index}
      style={[styles.fullscreenImageContainer, { width: screenWidth }]}
    >
      <Image
        source={{ uri: imageUri }}
        style={styles.fullscreenImage}
        resizeMode="contain"
      />
    </View>
  );

  const renderIndicators = () => {
    if (!showIndicators || images.length <= 1) return null;

    return (
      <View style={styles.indicatorsContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
            ]}
            onPress={() => scrollToImage(index)}
            accessibilityRole="button"
            accessibilityLabel={`Go to image ${index + 1}`}
            accessibilityState={{ selected: index === currentIndex }}
          />
        ))}
      </View>
    );
  };

  const renderImageCounter = () => (
    <View style={styles.counterContainer}>
      <Text style={styles.counterText}>
        {fullscreenIndex + 1} / {images.length}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { height }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {images.map((imageUri, index) => renderCarouselImage(imageUri, index))}
      </ScrollView>

      {renderIndicators()}

      <Modal
        visible={fullscreenVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFullscreenVisible(false)}
        statusBarTranslucent
      >
        <View style={styles.fullscreenModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFullscreenVisible(false)}
            accessibilityRole="button"
            accessibilityLabel="Close fullscreen view"
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {renderImageCounter()}

          <ScrollView
            ref={fullscreenScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleFullscreenScroll}
            scrollEventThrottle={16}
            bounces={false}
            contentOffset={{ x: fullscreenIndex * screenWidth, y: 0 }}
          >
            {images.map((imageUri, index) => renderFullscreenImage(imageUri, index))}
          </ScrollView>

          {/* Fullscreen indicators */}
          <View style={styles.fullscreenIndicatorsContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.fullscreenIndicator,
                  index === fullscreenIndex
                    ? styles.activeFullscreenIndicator
                    : styles.inactiveFullscreenIndicator,
                ]}
                onPress={() => scrollToFullscreenImage(index)}
                accessibilityRole="button"
                accessibilityLabel={`Go to image ${index + 1}`}
                accessibilityState={{ selected: index === fullscreenIndex }}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  placeholderText: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.sizes.md,
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: SPACING.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
  },
  inactiveIndicator: {
    backgroundColor: COLORS.background,
    opacity: 0.7,
  },
  // Fullscreen styles
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: SPACING.md,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterContainer: {
    position: 'absolute',
    top: 50,
    left: SPACING.md,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  counterText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  fullscreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: screenWidth,
    height: screenHeight,
  },
  fullscreenIndicatorsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  fullscreenIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFullscreenIndicator: {
    backgroundColor: 'white',
  },
  inactiveFullscreenIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default ImageCarousel;