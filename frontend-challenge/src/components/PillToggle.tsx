import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

type PillOption<K extends string> = { key: K; label: string };
type PillToggleProps<K extends string> = {
  options: ReadonlyArray<PillOption<K>>;
  value: K;
  onChange: (k: K) => void;
};

function PillToggleInner<K extends string>({ options, value, onChange }: PillToggleProps<K>) {
  return (
    <View style={styles.pills}>
      {options.map((o) => {
        const active = o.key === value;
        return (
          <TouchableOpacity
            key={o.key}
            onPress={() => onChange(o.key)}
            style={[styles.pill, active && styles.pillActive]}
            accessibilityRole="button"
          >
            <Text style={[styles.text, active && styles.textActive]}>{o.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const PillToggle = PillToggleInner as <K extends string>(props: PillToggleProps<K>) => JSX.Element;

const styles = StyleSheet.create({
  pills: { flexDirection: "row", gap: 6 },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: "#0f1b33",
  },
  pillActive: { backgroundColor: colors.pillBg },
  text: { color: colors.textMuted, fontWeight: "600" },
  textActive: { color: colors.text },
});

export default PillToggle;
