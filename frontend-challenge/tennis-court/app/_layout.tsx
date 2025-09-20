import { Stack } from "expo-router";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";

const AIRBNB_RED = "#FF5A5F";
const DARK_GREY = "#222";

const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: AIRBNB_RED,
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderLeftWidth: 6,
        paddingVertical: 8,
      }}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "700",
        color: AIRBNB_RED,
      }}
      text2Style={{
        fontSize: 13,
        color: DARK_GREY,
      }}
    />
  ),
};

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
    </>
  );
}
