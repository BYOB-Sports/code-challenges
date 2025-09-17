import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
export default function RatingStars({
  value,
  editable = false,
  onChange,
  size = 18,
}: {
  value: number;
  editable?: boolean;
  onChange?: (n: number) => void;
  size?: number;
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.row}>
      {stars.map((n) => (
        <Pressable
          key={n}
          onPress={() => editable && onChange?.(n)}
          hitSlop={8}
          style={{ opacity: n <= value ? 1 : 0.35 }}
        >
          <Text style={{ fontSize: size }}>★</Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 4, alignItems: "center" },
});
