import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CourtList from './components/CourtList';
import CourtDetail from './components/CourtDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Courts" component={CourtList} />
        <Stack.Screen name="CourtDetail" component={CourtDetail} options={{ title: 'Court Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
