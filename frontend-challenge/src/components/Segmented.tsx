import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

function Segmented<T extends string>({ options, value, onChange }: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View style={styles.segment}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <TouchableOpacity
            key={String(opt)}
            onPress={() => onChange(opt)}
            style={[styles.btn, active && styles.btnActive]}
            accessibilityRole="button"
          >
            <Text style={[styles.text, active && styles.textActive]}>{String(opt)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    backgroundColor: "#101a31",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    flexDirection: "row",
    padding: 4,
    gap: 6,
  },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  btnActive: { backgroundColor: colors.pillBg },
  text: { color: colors.textMuted, fontWeight: "600" },
  textActive: { color: colors.text },
});

export default Segmented;