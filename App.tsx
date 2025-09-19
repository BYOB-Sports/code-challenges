import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CourtsProvider } from './src/context/CourtsContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import CourtsListScreen from './src/screens/CourtsListScreen';
import CourtDetailScreen from './src/screens/CourtDetailScreen';
import { RootStackParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CourtsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="CourtsList"
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen 
              name="CourtsList" 
              component={CourtsListScreen}
              options={{ title: 'Tennis Courts' }}
            />
            <Stack.Screen 
              name="CourtDetail" 
              component={CourtDetailScreen}
              options={{ title: 'Court Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CourtsProvider>
    </ErrorBoundary>
  );
};

export default App;
