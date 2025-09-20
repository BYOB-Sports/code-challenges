import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const AIRBNB_RED = "#FF5A5F";
const DARK_GREY = "#222222";
const LIGHT_GREY = "#E5E7EB";
const SUBDUED_TEXT = "#757575";
const CARD_BG = "#FFF";
const BORDER_RADIUS = 20;

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
      Toast.show({
        type: "success",
        text1: "Thanks for the review!",
        text2: "Your feedback helps us improve.",
        position: "top",
      });
      setComment("");
      setRating(0);
      onClose();
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

  const SCREEN_HEIGHT = Dimensions.get("window").height;

  return (
    <View style={styles.modalBackground}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={10}
      >
        <View style={[styles.modalCard, { maxHeight: SCREEN_HEIGHT * 0.7 }]}>
          <View style={styles.headerBar}>
            <Text style={styles.headerTitle}>Did you have fun?</Text>
            <Pressable onPress={onClose} style={styles.closeIcon}>
              <AntDesign name="close" size={22} color={DARK_GREY} />
            </Pressable>
          </View>

          <ScrollView
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.subHeading}>Let us know how we’re doing</Text>

            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Pressable key={i} onPress={() => setRating(i + 1)} hitSlop={8}>
                  <AntDesign
                    name="star"
                    size={38}
                    color={i < rating ? AIRBNB_RED : "#E0E0E0"}
                    style={{ marginHorizontal: 4 }}
                  />
                </Pressable>
              ))}
            </View>

            {rating > 0 && (
              <Text style={styles.ratingText}>{getRatingText(rating)}</Text>
            )}

            <Text style={styles.optionalLabel}>
              Any other details?{" "}
              <Text style={{ color: SUBDUED_TEXT }}>(Optional)</Text>
            </Text>

            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                placeholder="Anything else you’d like to let us know?"
                placeholderTextColor="#A0A0A0"
                multiline
                maxLength={200}
                value={comment}
                onChangeText={setComment}
                textAlignVertical="top"
                accessibilityLabel="Additional feedback"
              />
              <Text style={styles.charCount}>{comment.length}/200</Text>
            </View>
          </ScrollView>

          <View style={styles.buttonWrapper}>
            <Pressable
              style={[
                styles.submitButton,
                rating === 0 && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={rating === 0}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      {/* <Toast /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34, 34, 34, 0.35)",
    paddingHorizontal: 10,
  },
  keyboardAvoid: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "95%",
    minHeight: 420,
    backgroundColor: CARD_BG,
    borderRadius: BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 5,
    paddingBottom: 20,
    overflow: "hidden",
  },
  headerBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: LIGHT_GREY,
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 22,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: 0.2,
    textAlign: "center",
    color: DARK_GREY,
    paddingRight: 22,
  },
  closeIcon: {
    position: "absolute",
    right: 22,
    top: "35%",
    zIndex: 10,
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  subHeading: {
    fontSize: 16,
    color: "#484848",
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  ratingText: {
    marginVertical: 12,
    fontWeight: "600",
    color: "#6C6A72",
    textAlign: "center",
    fontSize: 15,
  },
  optionalLabel: {
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "500",
    fontSize: 15,
    color: DARK_GREY,
    textAlign: "center",
  },
  textAreaWrapper: {
    width: "100%",
    marginBottom: 12,
  },
  textArea: {
    width: "100%",
    minHeight: 90,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: LIGHT_GREY,
    backgroundColor: "#FAFAFA",
    padding: 14,
    color: "#222",
    fontSize: 15,
    lineHeight: 20,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: SUBDUED_TEXT,
    marginTop: 4,
    paddingRight: 4,
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  submitButton: {
    width: "88%",
    backgroundColor: AIRBNB_RED,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#FF5A5F",
  },
  submitButtonDisabled: {
    backgroundColor: LIGHT_GREY,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
