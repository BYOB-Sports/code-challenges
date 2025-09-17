import React, { useMemo } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { debounce } from "../utils/debounce";
export default function SearchBar({
  onChange,
}: {
  onChange: (q: string) => void;
}) {
  const debounced = useMemo(() => debounce(onChange, 250), [onChange]);
  return (
    <View style={styles.wrap}>
      <TextInput
        placeholder="Search by name or city"
        onChangeText={debounced}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { padding: 12, backgroundColor: "#fff" },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
