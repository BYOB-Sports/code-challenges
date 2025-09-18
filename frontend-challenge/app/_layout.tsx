import { Stack } from "expo-router";
import { ReviewsProvider } from "../context/ReviewsContext";

export default function RootLayout() {
  return (
    <ReviewsProvider>
      <Stack
        screenOptions={{
          headerShown: true,           // ✅ show headers
          headerTitleAlign: "center",  // ✅ center the title
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        }}
      />
    </ReviewsProvider>
  );
}
