import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import CourtListScreen from './screens/CourtListScreen';
import CourtDetailScreen from './screens/CourtDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="CourtList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E7D32',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 18,
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
          options={{ 
            title: 'Court Details',
            headerBackTitle: 'Back'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}