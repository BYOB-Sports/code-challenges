// src/components/RatingStars.js
import { View, Pressable, Text } from "react-native";

export default function RatingStars({
  value = 0,
  size = 20,
  editable = false,
  onChange,
}) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {stars.map((i) => {
        const filled = i <= Math.round(value);
        const star = filled ? "★" : "☆";
        const content = (
          <Text
            key={i}
            style={{ fontSize: size, color: filled ? "#eab308" : "#9ca3af" }}
          >
            {star}
          </Text>
        );
        if (!editable) return content;
        return (
          <Pressable
            key={i}
            onPress={() => onChange?.(i)}
            style={{ marginRight: 4 }}
          >
            {content}
          </Pressable>
        );
      })}
      {!editable && (
        <Text style={{ marginLeft: 8, color: "#6b7280" }}>
          {Number(value || 0).toFixed(1)}
        </Text>
      )}
    </View>
  );
}
