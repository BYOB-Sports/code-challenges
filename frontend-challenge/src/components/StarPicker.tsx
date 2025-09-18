import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const StarPicker: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
  <View style={styles.row}>
    {[1, 2, 3, 4, 5].map((i) => (
      <TouchableOpacity key={i} onPress={() => onChange(i)} style={styles.tap}>
        <Text style={styles.star}>{i <= value ? "★" : "☆"}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6, alignItems: "center" },
  tap: { padding: 2 },
  star: { fontSize: 22, color: "#ffd166" },
});

export default StarPicker;