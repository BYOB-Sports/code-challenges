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
            <AntDesign name="star" size={11} color="#FF385C" />
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
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#F7F7F7",
  },
  info: {
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222222",
    flex: 1,
    marginRight: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rating: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: "600",
    color: "#222222",
  },
  address: {
    fontSize: 13,
    color: "#717171",
    lineHeight: 17,
    marginBottom: 2,
  },
  reviewCount: {
    fontSize: 13,
    color: "#717171",
    fontWeight: "400",
  },
});
