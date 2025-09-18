import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function ReviewForm({ onSubmit }) {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (review.trim()) {
      onSubmit(review);
      setReview('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={review}
        onChangeText={setReview}
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, width: '100%', paddingHorizontal: 10 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
