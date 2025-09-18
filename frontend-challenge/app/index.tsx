import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/6gPYtKq/tennis-court-bg.jpg" }} // ✅ tennis court image
      style={styles.background}
      blurRadius={4} // ✅ blur for aesthetic effect
    >
      <LinearGradient
        colors={["rgba(36,105,79,0.7)", "rgba(173,187,128,0.7)"]}
        style={styles.overlay}
      >
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brand}>Tennis Courts</Text>

        {/* Gradient Button */}
        <Pressable onPress={() => router.push("/list")} style={styles.buttonWrapper}>
          <LinearGradient
            colors={["#24694fff", "#adbb80f1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View Courts</Text>
          </LinearGradient>
        </Pressable>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "300",
    letterSpacing: 2,
  },
  brand: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 40,
  },
  buttonWrapper: {
    width: "70%",
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
