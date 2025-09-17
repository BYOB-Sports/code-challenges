import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import RatingStars from "./RatingStars";

export default function CourtCard({
  name,
  city,
  surface,
  indoor,
  lights,
  rating,
  onPress,
}: {
  name: string;
  city: string;
  surface: string;
  indoor: boolean;
  lights: boolean;
  rating: number;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.meta}>
          {city} • {surface}
        </Text>
        <Text style={styles.meta}>
          {indoor ? "Indoor" : "Outdoor"} • {lights ? "Lights" : "No lights"}
        </Text>
        <View style={{ marginTop: 8 }}>
          <RatingStars value={Math.round(rating)} />
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    elevation: 1,
  },
  name: { fontSize: 18, fontWeight: "600" },
  meta: { color: "#555", marginTop: 2 },
});
