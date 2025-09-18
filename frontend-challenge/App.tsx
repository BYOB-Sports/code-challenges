import React from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, useApp } from "./src/context/AppContext";
import ListScreen from "./src/screens/List";
import DetailScreen from "./src/screens/Details";
import { colors } from "./src/theme/theme";

function Router() {
  const { nav } = useApp();
  return nav.route === "list" ? <ListScreen /> : <DetailScreen courtId={nav.courtId} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: colors.bgRoot }}>
          <StatusBar barStyle="light-content" />
          <Router />
        </View>
      </AppProvider>
    </SafeAreaProvider>
  );
}
