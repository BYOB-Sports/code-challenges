import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CourtListScreen from './screens/CourtListScreen';
import CourtDetailScreen from './screens/CourtDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CourtList"
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="CourtList"
          component={CourtListScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>BYOB Ace Club</Text>
                <Text style={styles.headerSubtitle}>Find & Review Tennis Courts</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="CourtDetail"
          component={CourtDetailScreen}
          options={({ route }) => ({
            title: route.params.court.name, // dynamic court name
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#e0f7fa',
    marginTop: 2,
  },
});
