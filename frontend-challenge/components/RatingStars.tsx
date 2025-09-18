import { View, Text } from "react-native";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Text key={i}>{i < rating ? "⭐" : "☆"}</Text>
      ))}
    </View>
  );
}
