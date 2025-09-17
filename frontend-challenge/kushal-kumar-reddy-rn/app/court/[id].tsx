import React, { useMemo } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCourts } from "../../lib/store/courts";
import RatingStars from "../../components/RatingStars";
import ReviewItem from "../../components/ReviewItem";
import ReviewForm from "../../components/ReviewForm";

export default function CourtDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const courts = useCourts((s) => s.courts);
  const addReview = useCourts((s) => s.addReview);

  const court = useMemo(() => courts.find((c) => c.id === id), [courts, id]);
  if (!court)
    return (
      <View style={styles.missing}>
        <Text>Court not found.</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>{court.name}</Text>
      <Text style={styles.meta}>
        {court.city} • {court.surface} • {court.indoor ? "Indoor" : "Outdoor"} •{" "}
        {court.lights ? "Lights" : "No lights"}
      </Text>
      <View style={{ marginTop: 10 }}>
        <RatingStars value={Math.round(court.rating)} />
        <Text style={styles.meta}>
          {court.rating.toFixed(1)} ({court.ratingsCount})
        </Text>
      </View>

      <View style={{ height: 12 }} />
      <ReviewForm
        onSubmit={(r, t) => addReview(court.id, { rating: r, text: t })}
      />

      <View style={{ height: 18 }} />
      <Text style={styles.section}>Recent reviews</Text>
      {court.reviews.length === 0 ? (
        <Text style={styles.meta}>No reviews yet.</Text>
      ) : (
        court.reviews.map((r) => (
          <ReviewItem
            key={r.id}
            rating={r.rating}
            text={r.text}
            createdAt={r.createdAt}
          />
        ))
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  wrap: { padding: 12, backgroundColor: "#fafafa" },
  missing: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700" },
  meta: { color: "#555", marginTop: 4 },
  section: { fontSize: 16, fontWeight: "600" },
});
