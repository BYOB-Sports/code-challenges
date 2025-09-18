import { useContext } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import courts from "../../data/courts";
import { ReviewsContext } from "../../context/ReviewsContext";
import ReviewForm from "../../components/ReviewForm";
import RatingStars from "../../components/RatingStars";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const courtId = Number(id);
  const court = courts.find((c) => c.id === courtId);
  const { reviews } = useContext(ReviewsContext);

  if (!court) return <Text style={{ padding: 20 }}>Court not found</Text>;

  return (
    <>
      <Stack.Screen options={{ title: court.name }} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ✅ Gradient Court Info Card */}
        <LinearGradient
          colors={["#24694fff", "#adbb80f1"]}   // ✅ same gradient as list
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.title}>{court.name}</Text>
          <Text style={styles.location}>📍 {court.location}</Text>
          <RatingStars rating={court.rating} />
        </LinearGradient>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.subtitle}>Reviews</Text>
          {(reviews[courtId] || []).length === 0 ? (
            <Text style={styles.noReviews}>No reviews yet. Be the first!</Text>
          ) : (
            reviews[courtId].map((r, i) => (
              <Text key={i} style={styles.reviewItem}>• {r}</Text>
            ))
          )}
          <ReviewForm courtId={courtId} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9f9f9" },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: "#fff" },
  location: { fontSize: 16, marginBottom: 8, color: "#eee" },
  reviewsSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#333" },
  noReviews: { fontSize: 14, color: "#888", marginBottom: 10 },
  reviewItem: { fontSize: 14,color: "#444", marginBottom: 6 },
});


