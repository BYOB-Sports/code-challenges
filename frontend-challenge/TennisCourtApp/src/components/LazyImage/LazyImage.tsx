import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS } from '@/constants';
import {
  generatePlaceholderColor,
  imageCache,
  optimizeImageUrl,
  preloadImage,
  runAfterInteractions,
} from '@/utils';

export interface LazyImageProps {
  source: { uri: string };
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  placeholder?: React.ReactNode;
  priority?: 'high' | 'normal' | 'low';
  enableBlurPlaceholder?: boolean;
  preloadNearby?: string[];
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: any) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'cover',
  placeholder,
  priority = 'normal',
  enableBlurPlaceholder = true,
  preloadNearby = [],
  onLoadStart,
  onLoadEnd,
  onError,
}) => {
  const [loading, setLoading] = useState(!imageCache.isLoaded(source.uri));
  const [error, setError] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const loadStartTimeRef = useRef<number | null>(null);

  // Optimize image URL based on style dimensions
  const optimizedUri = optimizeImageUrl(
    source.uri,
    (style as any)?.width,
    (style as any)?.height
  );

  // Generate placeholder color based on URI
  const placeholderColor = enableBlurPlaceholder
    ? generatePlaceholderColor(source.uri)
    : COLORS.surface;

  const handleLoadStart = useCallback(() => {
    loadStartTimeRef.current = Date.now();
    onLoadStart?.();
  }, [onLoadStart]);

  const handleLoad = useCallback(() => {
    const loadTime = loadStartTimeRef.current
      ? Date.now() - loadStartTimeRef.current
      : 0;

    setLoading(false);
    setShowImage(true);
    imageCache.markAsLoaded(source.uri);

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: Math.min(300, Math.max(100, 300 - loadTime)), // Adaptive duration
      useNativeDriver: true,
    }).start();

    onLoadEnd?.();
  }, [fadeAnim, source.uri, onLoadEnd]);

  const handleError = useCallback(
    (errorEvent: any) => {
      setLoading(false);
      setError(true);
      onError?.(errorEvent);
    },
    [onError]
  );

  // Preload nearby images for better performance
  useEffect(() => {
    if (preloadNearby.length > 0 && priority === 'high') {
      runAfterInteractions(() => {
        preloadNearby.forEach(uri => {
          if (!imageCache.isLoaded(uri)) {
            preloadImage(uri).catch(() => {
              // Silently handle preload failures
            });
          }
        });
      });
    }
  }, [preloadNearby, priority]);

  // Preload current image if high priority
  useEffect(() => {
    if (priority === 'high' && !imageCache.isLoaded(source.uri)) {
      preloadImage(source.uri)
        .then(() => {
          if (!showImage) {
            handleLoad();
          }
        })
        .catch(handleError);
    }
  }, [source.uri, priority, showImage, handleLoad, handleError]);

  const renderPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }

    if (error) {
      return (
        <View style={[styles.placeholder, style, { backgroundColor: placeholderColor }]}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>📷</Text>
            <Text style={styles.errorText}>Image unavailable</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.placeholder, style, { backgroundColor: placeholderColor }]}>
        <ActivityIndicator
          size="small"
          color={COLORS.primary}
          style={styles.loadingIndicator}
        />
        {enableBlurPlaceholder && (
          <View style={styles.blurOverlay} />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {(loading || error) && renderPlaceholder()}

      {!error && (
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: showImage ? fadeAnim : 0,
            },
          ]}
        >
          <Image
            source={{ uri: optimizedUri }}
            style={style}
            resizeMode={resizeMode}
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onError={handleError}
            fadeDuration={0} // We handle our own fade animation
            // Performance optimizations
            progressiveRenderingEnabled={true}
            removeClippedSubviews={true}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  loadingIndicator: {
    zIndex: 2,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    fontSize: 32,
    opacity: 0.5,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.text.secondary,
    opacity: 0.7,
    textAlign: 'center',
  },
});

export default memo(LazyImage);
