import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CourtsList from "./screens/CourtsList";
import CourtDetails from "./screens/CourtDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export type RootStackParamList = {
  CourtsList: undefined;
  CourtDetails: { courtId: string };
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CourtsList" component={CourtsList} />
          <Stack.Screen name="CourtDetails" component={CourtDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
