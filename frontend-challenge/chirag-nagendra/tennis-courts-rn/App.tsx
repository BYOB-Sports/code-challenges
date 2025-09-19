import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourtsListScreen from './screens/CourtsListScreen';
import CourtDetailScreen from './screens/CourtDetailScreen';
import { useCourtsStore } from './store/useCourtsStore';
import { generateSeedData } from './data/mock';

export type RootStackParamList = {
  Courts: undefined;
  CourtDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const bootstrap = useCourtsStore(s => s.bootstrap);
  useEffect(() => {
    const { courts, reviews } = generateSeedData(100);
    bootstrap(courts, reviews);
  }, [bootstrap]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Courts">
        <Stack.Screen name="Courts" component={CourtsListScreen} options={{ title: 'Tennis Courts' }} />
        <Stack.Screen name="CourtDetail" component={CourtDetailScreen} options={{ title: 'Court Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
