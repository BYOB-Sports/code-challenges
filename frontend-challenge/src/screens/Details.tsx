import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, Platform,
  KeyboardAvoidingView, TextInput, TouchableOpacity, Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../context/AppContext";
import Badge from "../components/Badge";
import RatingStars from "../components/RatingStars";
import StarPicker from "../components/StarPicker";
import { colors } from "../theme/theme";

export default function DetailScreen({ courtId }: { courtId: string }) {
  const { courts, addReview, recalcRating, setNav } = useApp();
  const court = courts.find((c) => c.id === courtId)!;

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!author.trim()) return setError("Please enter your name.");
    if (!text.trim()) return setError("Please share a short review.");
    setError(null);
    addReview(court.id, { author: author.trim(), text: text.trim(), rating });
    recalcRating(court.id);
    setAuthor(""); setText(""); setRating(5);
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior={Platform.select({ ios: "padding", android: undefined })}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView style={styles.header} edges={["top"]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => setNav({ route: "list" })}
            style={styles.backBtn}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            accessibilityRole="button"
          >
            <Text style={styles.backIcon}>←</Text>
            <Text style={styles.backTxt}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Tennis Courts</Text>
          <View style={{ width: 64 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scroll}
        contentInsetAdjustmentBehavior="never"
      >
        <View style={styles.hero}>
          <Image source={{ uri: court.imageUrl }} style={styles.heroImage} resizeMode="cover" />
          <Text style={styles.title}>{court.name}</Text>
          <Text style={styles.city}>{court.city}</Text>
          <View style={styles.row}>
            <Badge>{court.surface}</Badge>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.meta}>{court.courts} courts</Text>
          </View>
          <View style={styles.row}>
            <RatingStars rating={court.rating} size={18} />
            <Text style={styles.meta}>{court.reviews.length} reviews</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leave a review</Text>
          <View style={styles.ratingPicker}>
            <Text style={styles.label}>Your rating:</Text>
            <StarPicker value={rating} onChange={setRating} />
          </View>

          <Text style={styles.label}>Your name</Text>
          <TextInput
            value={author}
            onChangeText={setAuthor}
            placeholder="e.g., Alex"
            placeholderTextColor="#98a2b3"
            style={styles.input}
          />

          <Text style={styles.label}>Your review</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="How was the court? Surface, crowd, lights, parking…"
            placeholderTextColor="#98a2b3"
            style={[styles.input, styles.multiline]}
            multiline
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity onPress={submit} style={styles.primaryBtn} accessibilityRole="button">
            <Text style={styles.primaryTxt}>Submit Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent reviews</Text>
          {court.reviews.length === 0 ? (
            <Text style={styles.empty}>No reviews yet. Be the first!</Text>
          ) : (
            court.reviews.map((r) => (
              <View key={r.id} style={styles.review}>
                <View style={styles.reviewHead}>
                  <Text style={styles.author}>{r.author}</Text>
                  <RatingStars rating={r.rating} size={14} />
                </View>
                <Text style={styles.text}>{r.text}</Text>
                <Text style={styles.date}>{new Date(r.createdAt).toLocaleDateString()}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: 48 },

  header: {
    backgroundColor: colors.bgRoot,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: colors.text, fontSize: 20, fontWeight: "700" },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.pillBg,
  },
  backIcon: { color: colors.text, fontSize: 16, fontWeight: "700" },
  backTxt: { color: colors.text, fontWeight: "600" },

  hero: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  heroImage: { width: "100%", height: 220, borderRadius: 16, marginBottom: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: "800" },
  city: { color: colors.textMuted, marginTop: 4 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  meta: { color: colors.textMuted },
  dot: { color: "#415b86" },

  section: { paddingHorizontal: 16, paddingTop: 18 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "800", marginBottom: 10 },
  ratingPicker: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  label: { color: "#cbd5e1", marginTop: 10, marginBottom: 6, fontWeight: "600" },

  input: {
    backgroundColor: colors.inputBg,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    fontSize: 16,
  },
  multiline: { minHeight: 96, textAlignVertical: "top" },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 12,
  },
  primaryTxt: { color: colors.text, fontWeight: "800", fontSize: 16 },
  empty: { color: colors.textMuted, fontStyle: "italic" },

  review: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  reviewHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  author: { color: colors.text, fontWeight: "700" },
  text: { color: colors.textSoft, marginTop: 6 },
  date: { color: colors.textFaint, marginTop: 8, fontSize: 12 },
  error: { color: "#fca5a5", marginTop: 6 },
});
