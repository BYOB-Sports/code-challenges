import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';

const CourtItems = ({ court, onSelect }) => (
  <View style={styles.card}>
  <TouchableOpacity onPress={onSelect}>
    <Image source={{ uri: court.image }}  />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{court.name}</Text>
      <Text style={styles.location}>{court.location}</Text>
      <View style={styles.ratingContainer}>
      <Text style={styles.rating}>Rating: {court.rating} ★</Text>
      </View>
    </View>
  </TouchableOpacity>
  </View>
);


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 16,
    color: '#FFD700', // Gold color for the star
    fontWeight: 'bold',
  },
});
export default CourtItems;
