import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/theme";

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.badgeBg,
    borderColor: colors.borderSoft,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { color: colors.textSoft, fontSize: 12, fontWeight: "600" },
});

export default Badge;