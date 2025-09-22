// src/screens/LoginScreen.js
import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../api";

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [username, setUsername] = useState("alice");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const data = await login(username.trim(), password);
      await AsyncStorage.setItem("auth", JSON.stringify(data));
      // Trigger auth state check in parent component
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (e) {
      Alert.alert("Login failed", "Try alice/bob/carol with password123");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9fafb",
        paddingHorizontal: 24,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 32 }}>
        Tennis Courts
      </Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
          elevation: 8,
        }}
      >
        <Text style={{ color: "#6b7280", marginBottom: 8 }}>Username</Text>
        <TextInput
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          placeholder="alice"
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        />
        <Text style={{ color: "#6b7280", marginTop: 16, marginBottom: 8 }}>
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="password123"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        />
        <Pressable
          onPress={onSubmit}
          disabled={loading}
          style={{
            marginTop: 24,
            backgroundColor: "black",
            borderRadius: 12,
            paddingVertical: 16,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Text>
        </Pressable>
        <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 12 }}>
          Demo users: alice / bob / carol (password123)
        </Text>
      </View>
    </View>
  );
}
