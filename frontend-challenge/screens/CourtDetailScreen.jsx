// screens/CourtDetailScreen.jsx
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CourtDetailScreen({ route }) {
  const { court } = route.params;
  const [reviews, setReviews] = useState(court.reviews);
  const [newReview, setNewReview] = useState('');

  const addReview = () => {
    if (!newReview) return;
    setReviews(prev => [...prev, { id: Date.now().toString(), text: newReview }]);
    setNewReview('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <Image source={{ uri: court.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{court.name}</Text>
              <Text style={styles.location}>{court.location}</Text>
            </View>
            <Text style={styles.reviewTitle}>Please leave a Review:</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text>{item.text}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.form}>
            <TextInput
              placeholder="Write a review..."
              style={styles.input}
              value={newReview}
              onChangeText={setNewReview}
            />
            <Button title="Submit" onPress={addReview} />
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 200 },
  info: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#C8E6C9' }, 
  name: { fontSize: 20, fontWeight: 'bold' },
  location: { fontSize: 16, color: '#555', marginTop: 2 }, 
  reviewTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 16, paddingVertical: 8 }, 
  reviewCard: {
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  form: { marginHorizontal: 16, marginTop: 8 }, 
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
});
