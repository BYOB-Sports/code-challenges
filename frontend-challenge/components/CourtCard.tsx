import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  name: string;
  location: string;
  rating: number;
  onPress: () => void;
  size?: number;
}

export default function CourtCard({ name, location, rating, onPress, size = 120 }: Props) {
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 12 }}>
      <LinearGradient
        colors={["#24694fff", "#adbb80f1"]}  // ✅ smooth grey gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, { width: size, height: size }]}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.rating}>{rating} ⭐</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,  
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  name: { fontSize: 15, fontWeight: "600", color: "#fff", marginBottom: 4 },
  location: { fontSize: 12, color: "#2c2929ff", marginBottom: 6 },
  rating: { fontSize: 12, color: "#141414ff" },
});


