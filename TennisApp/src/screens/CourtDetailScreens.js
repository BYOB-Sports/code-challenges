import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import allCourts from '../data/mockData';
import ReviewForm from '../components/Form'; 

const CourtDetailScreen = ({ route }) => {
  const { courtId } = route.params;
  const [court, setCourt] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const selectedCourt = allCourts.find(c => c.id === courtId);
    if (selectedCourt) {
      setCourt(selectedCourt);
      setReviews(selectedCourt.reviews);
    }
  }, [courtId]);

  const handleAddReview = (newReview) => {
    setReviews(prevReviews => [
      { id: Date.now(), ...newReview },
      ...prevReviews,
    ]);
  };

  if (!court) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      extraScrollHeight={Platform.OS === 'ios' ? 20 : 0} // Fine-tuning for iOS
      enableOnAndroid={true}
    >
      <Image source={{ uri: court.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{court.name}</Text>
        <Text style={styles.location}>{court.location}</Text>
        <Text style={styles.rating}>★ {court.rating}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.length > 0 ? (
          // Render reviews directly using map, removing the conflicting FlatList
          reviews.map(item => (
            <View key={item.id} style={styles.reviewItem}>
              <Text style={styles.reviewUser}>{item.user}</Text>
              <Text style={styles.reviewComment}>"{item.comment}"</Text>
              <Text style={styles.reviewRating}>Rating: {item.rating}/5</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Be the first to review!</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leave a Review</Text>
        <ReviewForm onSubmit={handleAddReview} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 50, 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: 'bold',
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  reviewItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewComment: {
    fontStyle: 'italic',
    color: '#333',
    marginTop: 4,
  },
  reviewRating: {
    marginTop: 8,
    color: '#888',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
  },
});

export default CourtDetailScreen;
