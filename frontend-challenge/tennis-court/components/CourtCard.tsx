import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import type { Court } from "../types/court";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  court: Court;
  onPress: (court: Court) => void;
}

export const CourtCard = ({ court, onPress }: Props) => {
  return (
    <Pressable onPress={() => onPress(court)} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: court.images[0] }} style={styles.image} />
      </View>

      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {court.name}
          </Text>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={12} color="#FF385C" />
            <Text style={styles.rating}>{court.average_rating.toFixed(1)}</Text>
          </View>
        </View>

        {court.location?.address && (
          <Text style={styles.address} numberOfLines={2}>
            {court.location.address}
          </Text>
        )}

        <Text style={styles.reviewCount}>
          {court.reviews.length} review{court.reviews.length !== 1 ? "s" : ""}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 32,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#F7F7F7",
  },
  info: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#222222",
  },
  address: {
    fontSize: 14,
    color: "#717171",
    lineHeight: 18,
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#717171",
    fontWeight: "400",
  },
});
