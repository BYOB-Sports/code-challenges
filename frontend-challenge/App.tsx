import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourtsList from "./screens/CourtsList";
import CourtDetails from "./screens/CourtDetails";

export type RootStackParamList = {
  CourtsList: undefined;
  CourtDetails: { courtId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CourtsList"
          component={CourtsList}
          options={{ title: "Tennis Courts" }}
        />
        <Stack.Screen
          name="CourtDetails"
          component={CourtDetails}
          options={{ title: "Court Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
