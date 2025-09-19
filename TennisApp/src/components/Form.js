import React, { useState } from 'react';
import { View, StyleSheet,TextInput, Button, TouchableOpacity, Text } from 'react-native';

const ReviewForm = ({ onSubmit }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (user && rating && comment) {
      onSubmit({ user, rating: parseInt(rating, 10), comment });
      // Clear form
      setUser('');
      setRating('');
      setComment('');
    }
  };

 return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Your comments..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF', // A nice blue color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ReviewForm;
