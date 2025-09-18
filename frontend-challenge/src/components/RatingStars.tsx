import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

const RatingStars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  const rounded = Math.round(rating);
  return (
    <View style={styles.row}> 
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={[styles.star, { fontSize: size }]}>{i <= rounded ? "★" : "☆"}</Text>
      ))}
      <Text style={styles.num}>{Number.isFinite(rating) ? rating.toFixed(1) : "0.0"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 4 },
  star: { color: "#ffd166" },
  num: { color: colors.textSoft, marginLeft: 6, fontSize: 12 },
});

export default RatingStars;