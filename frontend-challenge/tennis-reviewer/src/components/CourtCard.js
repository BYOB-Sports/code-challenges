// src/components/CourtCard.js
import { View, Text, Image, Pressable } from "react-native";
import RatingStars from "./RatingStars";

export default function CourtCard({ court, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 8,
        overflow: "hidden",
      }}
    >
      <Image
        source={{
          uri:
            court.images?.[0] ||
            "https://via.placeholder.com/400x176/e5e7eb/6b7280?text=Tennis+Court",
        }}
        style={{ width: "100%", height: 176, backgroundColor: "#e5e7eb" }}
        resizeMode="cover"
        defaultSource={{
          uri: "https://via.placeholder.com/400x176/e5e7eb/6b7280?text=Tennis+Court",
        }}
      />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }} numberOfLines={1}>
          {court.name}
        </Text>
        <Text style={{ color: "#6b7280", marginTop: 4 }} numberOfLines={1}>
          {court.address}
        </Text>
        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RatingStars value={court.avg} />
          <Text style={{ color: "#6b7280" }}>
            {court.courtsAvailable} courts
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
