import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CourtListScreen from '../screens/CourtListScreens';
import CourtDetailScreen from '../screens/CourtDetailScreens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Courts" component={CourtListScreen} options={{ title: 'Tennis Courts' }} />
      <Stack.Screen name="CourtDetail" component={CourtDetailScreen} options={({ route }) => ({ title: route.params.courtName })} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
