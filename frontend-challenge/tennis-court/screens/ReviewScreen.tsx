import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface ReviewScreenProps {
  courtName: string;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export default function ReviewScreen({
  courtName,
  onClose,
  onSubmit,
}: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rate Your Experience</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={20} color="#222" />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={styles.modalSubTitle}>
            How was your experience at {courtName}?
          </Text>

          {/* Star Rating */}
          <View style={styles.starsRow}>
            {Array.from({ length: 5 }, (_, i) => (
              <Pressable key={i} onPress={() => setRating(i + 1)}>
                <AntDesign
                  name="star"
                  size={32}
                  color={i < rating ? "#FF385C" : "#D1D5DB"}
                  style={{ marginHorizontal: 4 }}
                />
              </Pressable>
            ))}
          </View>

          {rating > 0 && (
            <Text style={styles.ratingText}>{getRatingText(rating)}</Text>
          )}

          {/* Comment */}
          <TextInput
            style={styles.textArea}
            placeholder="Any additional feedback? (Optional)"
            multiline
            maxLength={200}
            value={comment}
            onChangeText={setComment}
          />
          <Text style={styles.charCount}>{comment.length}/200</Text>

          <Pressable
            style={[
              styles.submitButton,
              rating === 0 && { backgroundColor: "#D1D5DB" },
            ]}
            onPress={handleSubmit}
            disabled={rating === 0}
          >
            <Text style={styles.submitText}>Submit Review</Text>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#222" },
  closeButton: { padding: 4 },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 12,
    textAlign: "center",
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  ratingText: { textAlign: "center", fontWeight: "500", marginBottom: 12 },
  textArea: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
    minHeight: 100,
    marginBottom: 4,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#717171",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#FF385C",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: { color: "#FFF", fontWeight: "600", fontSize: 16 },
});
