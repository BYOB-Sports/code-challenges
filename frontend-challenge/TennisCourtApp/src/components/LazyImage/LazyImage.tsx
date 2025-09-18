import React, { memo, useState } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants';

export interface LazyImageProps {
  source: { uri: string };
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  placeholder?: React.ReactNode;
}

const LazyImage: React.FC<LazyImageProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'cover',
  placeholder,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const renderPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }

    if (error) {
      return (
        <View style={[styles.placeholder, style]}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>📷</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.placeholder, style]}>
        <ActivityIndicator size='small' color={COLORS.primary} />
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && renderPlaceholder()}

      <Image
        source={source}
        style={[style, loading && styles.hidden]}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
        fadeDuration={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 32,
    opacity: 0.3,
  },
  hidden: {
    opacity: 0,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

export default memo(LazyImage);
