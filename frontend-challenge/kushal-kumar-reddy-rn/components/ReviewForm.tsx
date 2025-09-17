import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import RatingStars from "./RatingStars";

export default function ReviewForm({
  onSubmit,
}: {
  onSubmit: (rating: number, text: string) => void;
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const canSubmit = rating > 0 && text.trim().length > 0;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Your rating</Text>
      <RatingStars value={rating} editable onChange={setRating} size={22} />
      <Text style={[styles.label, { marginTop: 12 }]}>Your review</Text>
      <TextInput
        style={styles.input}
        placeholder="Short feedback"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Pressable
        disabled={!canSubmit}
        onPress={() => onSubmit(rating, text)}
        style={[styles.btn, !canSubmit && { opacity: 0.5 }]}
      >
        <Text style={styles.btnText}>Submit</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { padding: 12, backgroundColor: "#fff", borderRadius: 8 },
  label: { fontWeight: "600" },
  input: {
    marginTop: 8,
    minHeight: 64,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
  },
  btn: {
    marginTop: 12,
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
