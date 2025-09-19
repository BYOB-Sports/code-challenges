import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tennis Courts' }} />
      <Stack.Screen name="court/[id]" options={{ title: 'Court Detail' }} />
    </Stack>
  );
}
