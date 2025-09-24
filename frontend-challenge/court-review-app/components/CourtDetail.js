import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CourtDetail({ route }) {
  const { court } = route.params;
  const [reviews, setReviews] = useState(court.reviews || []);
  const [reviewer, setReviewer] = useState('');
  const [stars, setStars] = useState('5');
  const [comment, setComment] = useState('');

  const handleAddReview = () => {
    if (!reviewer || !comment) return;
    setReviews([...reviews, { reviewer, stars, comment }]);
    setReviewer('');
    setStars('5');
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{court.name}</Text>
      <Text>{court.location} | {court.surfaceType} | ⭐ {court.rating}</Text>
      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewBox}>
            <Text style={styles.reviewer}>{item.reviewer}: {item.stars}★</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No reviews yet.</Text>}
      />
      <Text style={styles.sectionTitle}>Add a Review</Text>
      <TextInput style={styles.input} placeholder="Your Name" value={reviewer} onChangeText={setReviewer} />
      <TextInput style={styles.input} placeholder="Stars (1-5)" value={stars} onChangeText={setStars} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Comment" value={comment} onChangeText={setComment} multiline />
      <Button title="Submit Review" onPress={handleAddReview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 18, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 5, padding: 8, marginBottom: 8 },
  reviewBox: { backgroundColor: '#e7fbe7', borderRadius: 6, padding: 8, marginBottom: 5 },
  reviewer: { fontWeight: '600' },
});
