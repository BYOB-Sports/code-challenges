import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './src/types';
import CourtListScreen from './src/screens/CourtListScreen';
import CourtDetailScreen from './src/screens/CourtDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="CourtList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E7D4F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="CourtList" 
          component={CourtListScreen}
          options={{ title: 'Tennis Courts' }}
        />
        <Stack.Screen 
          name="CourtDetail" 
          component={CourtDetailScreen}
          options={{ title: 'Court Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
