// _layout.js - Updated with better navigation setup
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <>
            <StatusBar style="light" backgroundColor="#2563eb" />
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='court/[id]'
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </>
    );
}