import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import { COLORS, SPACING, TYPOGRAPHY } from '@/constants';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  disabled?: boolean;
  icon?: string;
  headerStyle?: any;
  contentStyle?: any;
  animationType?: 'layout' | 'opacity' | 'none';
  onToggle?: (expanded: boolean) => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  initiallyExpanded = false,
  disabled = false,
  icon,
  headerStyle,
  contentStyle,
  animationType = 'layout',
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const animationValue = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current;
  const rotationValue = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current;

  const toggleExpanded = () => {
    if (disabled) return;

    const newExpanded = !expanded;
    setExpanded(newExpanded);

    if (animationType === 'layout') {
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
    } else if (animationType === 'opacity') {
      Animated.timing(animationValue, {
        toValue: newExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Rotate arrow animation
    Animated.timing(rotationValue, {
      toValue: newExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onToggle?.(newExpanded);
  };

  const getArrowRotation = () => {
    return rotationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
  };

  const renderContent = () => {
    if (!expanded && animationType !== 'opacity') {
      return null;
    }

    const content = (
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    );

    if (animationType === 'opacity') {
      return (
        <Animated.View
          style={[
            styles.animatedContent,
            {
              opacity: animationValue,
              transform: [
                {
                  scaleY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents={expanded ? 'auto' : 'none'}
        >
          {content}
        </Animated.View>
      );
    }

    return content;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.header,
          headerStyle,
          expanded && styles.headerExpanded,
          disabled && styles.headerDisabled,
        ]}
        onPress={toggleExpanded}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${title}. ${expanded ? 'Expanded' : 'Collapsed'}. Tap to ${expanded ? 'collapse' : 'expand'}.`}
        accessibilityState={{
          expanded,
          disabled,
        }}
        accessibilityHint={disabled ? undefined : `Tap to ${expanded ? 'collapse' : 'expand'} this section`}
      >
        <View style={styles.headerLeft}>
          {icon && (
            <Text style={styles.icon}>{icon}</Text>
          )}
          <Text
            style={[
              styles.title,
              expanded && styles.titleExpanded,
              disabled && styles.titleDisabled,
            ]}
          >
            {title}
          </Text>
        </View>

        <Animated.View
          style={[
            styles.arrowContainer,
            {
              transform: [{ rotate: getArrowRotation() }],
            },
          ]}
        >
          <Text
            style={[
              styles.arrow,
              disabled && styles.arrowDisabled,
            ]}
          >
            ▼
          </Text>
        </Animated.View>
      </TouchableOpacity>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    minHeight: 56,
  },
  headerExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerDisabled: {
    opacity: 0.6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: TYPOGRAPHY.sizes.lg,
    marginRight: SPACING.sm,
    minWidth: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    flex: 1,
  },
  titleExpanded: {
    color: COLORS.primary,
  },
  titleDisabled: {
    color: COLORS.text.secondary,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: 'bold',
  },
  arrowDisabled: {
    color: COLORS.text.secondary,
    opacity: 0.5,
  },
  content: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  animatedContent: {
    backgroundColor: COLORS.background,
  },
});

export default CollapsibleSection;