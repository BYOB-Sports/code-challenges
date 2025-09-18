import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import type { RootStackParamList } from '@/types';
import { COLORS } from '@/constants';
import CourtsListScreen from '@/screens/CourtsListScreen';
import CourtDetailScreen from '@/screens/CourtDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
        <StatusBar style='auto' />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
