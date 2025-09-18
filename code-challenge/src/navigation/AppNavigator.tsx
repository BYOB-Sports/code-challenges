import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CourtListScreen from '../screens/CourtListScreen';
import CourtDetailScreen from '../screens/CourtDetailScreen';
import { Court } from '../types';

export type RootStackParamList = {
  CourtList: undefined;
  CourtDetail: { court: Court };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CourtList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2E7D32',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="CourtList"
          component={CourtListScreen}
          options={{
            title: 'Tennis Courts',
            headerStyle: {
              backgroundColor: '#2E7D32',
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        />
        <Stack.Screen
          name="CourtDetail"
          component={CourtDetailScreen}
          options={({ route }) => ({
            title: route.params.court.name,
            headerStyle: {
              backgroundColor: '#2E7D32',
              elevation: 0,
              shadowOpacity: 0,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
