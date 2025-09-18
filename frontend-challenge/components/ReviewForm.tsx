
import { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { ReviewsContext } from "../context/ReviewsContext";

export default function ReviewForm({ courtId }: { courtId: number }) {
  const [text, setText] = useState("");
  const { addReview } = useContext(ReviewsContext);

  const handleSubmit = () => {
    if (text.trim()) {
      addReview(courtId, text);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Leave a review..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

