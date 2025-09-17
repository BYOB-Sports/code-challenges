import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RatingStars from "./RatingStars";
import { formatDate } from "../utils/format";
export default function ReviewItem({
  rating,
  text,
  createdAt,
}: {
  rating: number;
  text: string;
  createdAt: string;
}) {
  return (
    <View style={styles.item}>
      <RatingStars value={rating} />
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.date}>{formatDate(createdAt)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  text: { marginTop: 6, fontSize: 15 },
  date: { marginTop: 6, color: "#666", fontSize: 13 },
});
