import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
export default function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>No courts found.</Text>
      <Pressable style={styles.btn} onPress={onClear}>
        <Text style={styles.btnText}>Clear search</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { padding: 24, alignItems: "center" },
  text: { fontSize: 16, marginBottom: 12, color: "#333" },
  btn: {
    backgroundColor: "#222",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
