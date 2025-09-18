import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, InteractionManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { RootStackParamList } from '@/types';
import { COLORS } from '@/constants';
import { imageCache, runAfterInteractions } from '@/utils';
import CourtsListScreen from '@/screens/CourtsListScreen';
import CourtDetailScreen from '@/screens/CourtDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  useEffect(() => {
    // Suppress performance warnings in development
    if (__DEV__) {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'Setting a timer',
        'componentWillReceiveProps',
        'componentWillMount',
      ]);
    }

    // Initialize performance optimizations
    runAfterInteractions(() => {
      // Clear image cache on app start to prevent memory issues
      if (imageCache) {
        imageCache.clear();
      }

      // Warm up InteractionManager
      InteractionManager.runAfterInteractions(() => {
        // This helps establish the interaction manager early
      });
    });

    // Cleanup function
    return () => {
      if (imageCache) {
        imageCache.clear();
      }
    };
  }, []);

  // Optimize navigation state change handling
  const handleNavigationStateChange = useCallback((_state: any) => {
    // Log navigation for debugging in development
    if (__DEV__) {
      // Navigation state tracking for debugging
    }
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onStateChange={handleNavigationStateChange}
        theme={{
          dark: false,
          colors: {
            primary: COLORS.primary,
            background: COLORS.background,
            card: COLORS.surface,
            text: COLORS.text.primary,
            border: COLORS.border.default,
            notification: COLORS.accent,
          },
          fonts: {
            regular: {
              fontFamily: 'System',
              fontWeight: '400',
            },
            medium: {
              fontFamily: 'System',
              fontWeight: '500',
            },
            bold: {
              fontFamily: 'System',
              fontWeight: '700',
            },
            heavy: {
              fontFamily: 'System',
              fontWeight: '900',
            },
          },
        }}
      >
        <Stack.Navigator
          initialRouteName='CourtsList'
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: COLORS.background,
            headerTitleStyle: {
              fontWeight: '600',
            },
            cardStyle: {
              backgroundColor: COLORS.background,
            },
            gestureEnabled: true,
            animationEnabled: true,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name='CourtsList'
            component={CourtsListScreen}
            options={{
              title: 'Tennis Courts',
              headerShown: false, // Custom header in component
            }}
          />
          <Stack.Screen
            name='CourtDetail'
            component={CourtDetailScreen}
            options={{
              title: 'Court Details',
              headerBackTitle: 'Courts',
            }}
          />
        </Stack.Navigator>
        <StatusBar style='auto' translucent={false} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
