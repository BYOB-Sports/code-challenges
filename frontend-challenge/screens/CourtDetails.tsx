import React, { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import courtsData from "../data/tennis_courts.json";
import CustomText from "../components/CustomText";
import { FontAwesome } from "@expo/vector-icons";
import { bannedWords } from "../data/bannedWords";

type Props = NativeStackScreenProps<RootStackParamList, "CourtDetails">;

type Review = {
  name?: string;
  rating: number;
  text?: string;
};

export default function CourtDetails({ route }: Props) {
  const { courtId } = route.params;
  const court = courtsData.find((c) => c.id === courtId);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0); // 0 = no rating yet
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  if (!court) {
    return (
      <View style={styles.container}>
        <CustomText style={styles.label}>Court not found</CustomText>
      </View>
    );
  }

  const containsBannedWords = (input: string) => {
    const lower = input.toLowerCase();
    return bannedWords.some((word) => lower.includes(word));
  };

  const handleAddReview = () => {
    if (!rating || rating < 1 || rating > 5) {
      setError("Rating is required. Please select a star.");
      return;
    }

    if (text && containsBannedWords(text)) {
      setError(
        "Your review contains inappropriate language. Please remove it before submitting."
      );
      return;
    }

    const newReview: Review = {
      name: name.trim() || undefined,
      rating,
      text: text.trim() || undefined,
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setRating(0);
    setText("");
    setError("");
  };

  return (
    <ScrollView style={styles.container}>
      <CustomText style={styles.title}>{court.name}</CustomText>
      <CustomText style={styles.subtitle}>{court.location.address}</CustomText>
      <CustomText style={styles.label}>Surface: {court.details.surface}</CustomText>
      <CustomText style={styles.label}>Indoor: {court.details.indoor ? "Yes" : "No"}</CustomText>
      <CustomText style={styles.label}>Lighting: {court.details.lighting ? "Yes" : "No"}</CustomText>
      <CustomText style={styles.label}>Status: {court.availability.status}</CustomText>
      <CustomText style={styles.label}>Booking Required: {court.availability.booking_required ? "Yes" : "No"}</CustomText>
      <CustomText style={[styles.label, styles.fee]}>Fee: {court.availability.fee}</CustomText>
      <CustomText style={styles.updated}>
        Last Updated: {new Date(court.last_updated).toLocaleString()}
      </CustomText>

      {/* Add Review Form */}
      <View style={{ marginTop: 20 }}>
        <CustomText style={styles.sectionTitle}>Add a Review</CustomText>

        {error ? <CustomText style={styles.error}>{error}</CustomText> : null}

        <TextInput
          style={styles.input}
          placeholder="Your name (optional)"
          value={name}
          onChangeText={setName}
        />

        {/* Star Rating */}
        <View style={styles.starContainer}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              activeOpacity={0.7} // press highlight
            >
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={32}
                color="#FFD700"
                style={{ marginRight: 4 }}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Your review (optional)"
          value={text}
          onChangeText={setText}
          multiline
        />

        <TouchableOpacity style={styles.ctaButton} onPress={handleAddReview}>
          <CustomText style={styles.ctaText}>Submit Review</CustomText>
        </TouchableOpacity>
      </View>

      {/* Reviews List */}
      <View style={{ marginTop: 30 }}>
        <CustomText style={styles.sectionTitle}>Reviews ({reviews.length})</CustomText>
        {reviews.length === 0 && (
          <CustomText style={styles.noReviews}>No reviews yet.</CustomText>
        )}
        {reviews.map((review, idx) => (
          <View key={idx} style={styles.reviewItem}>
            {review.name && <CustomText style={styles.reviewName}>{review.name ?? "Anonymous"}</CustomText>}
            <CustomText style={styles.reviewRating}>Rating: {review.rating}/5</CustomText>
            {review.text && <CustomText style={styles.reviewText}>{review.text}</CustomText>}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 8 },
  label: { fontSize: 14, marginBottom: 2 },
  fee: {  fontWeight: 700, fontSize: 16, marginTop: 10 },
  updated: { fontSize: 12, color: "#555", marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  starContainer: { flexDirection: "row", marginBottom: 10 },
  ctaButton: {
    backgroundColor: "#003619",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  ctaText: { color: "white", fontWeight: "700" },
  error: { color: "red", marginBottom: 8 },
  noReviews: { color: "#555", fontStyle: "italic" },
  reviewItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  reviewName: { fontWeight: "700", fontSize: 14 },
  reviewRating: { fontWeight: "600", fontSize: 14 },
  reviewText: { fontSize: 14 },
});
