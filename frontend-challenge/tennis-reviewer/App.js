import "react-native-gesture-handler";
import "react-native-reanimated";
import "./global.css";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, AppState } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import CourtsScreen from "./src/screens/CourtsScreen";
import CourtDetailScreen from "./src/screens/CourtDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [boot, setBoot] = useState({ loading: true, isAuthed: false });

  const checkAuthState = async () => {
    const saved = await AsyncStorage.getItem("auth");
    setBoot({ loading: false, isAuthed: !!saved });
  };

  useEffect(() => {
    checkAuthState();

    // Listen for app state changes to check auth when app comes to foreground
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        checkAuthState();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, []);

  if (boot.loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#6B7280" }}>Starting…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
        {!boot.isAuthed ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} onLoginSuccess={checkAuthState} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Courts" options={{ headerShown: false }}>
              {(props) => <CourtsScreen {...props} onLogout={checkAuthState} />}
            </Stack.Screen>
            <Stack.Screen
              name="CourtDetail"
              component={CourtDetailScreen}
              options={{ title: "Court Details" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
