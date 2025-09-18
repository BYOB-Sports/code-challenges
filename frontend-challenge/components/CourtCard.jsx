// components/CourtCard.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CourtCard = ({ court, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: court.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{court.name}</Text>
        <Text style={styles.location}>{court.location}</Text>
        <Text style={[styles.type, 
          court.type === 'Hard' ? { color: '#f39c12' } : 
          court.type === 'Clay' ? { color: '#c0392b' } : 
          { color: '#27ae60' }
        ]}>
          {court.type} Court
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default CourtCard;
