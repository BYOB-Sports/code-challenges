// screens/CourtListScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import courtsData from '../data/mockData';

export default function CourtListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [courtType, setCourtType] = useState('all');

  const filteredCourts = courtsData.filter((court) => {
    const matchName = court.name.toLowerCase().includes(search.toLowerCase());
    const matchType =
      courtType === 'all' ? true : court.type.toLowerCase() === courtType;
    return matchName && matchType;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CourtDetail', { court: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search courts..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={courtType}
          onValueChange={(itemValue) => setCourtType(itemValue)}
          style={styles.picker}
          dropdownIconColor="#4CAF50"
        >
          <Picker.Item label="All Types" value="all" />
          <Picker.Item label="Hard Court" value="hard" />
          <Picker.Item label="Clay Court" value="clay" />
          <Picker.Item label="Grass Court" value="grass" />
        </Picker>
      </View>

      <FlatList
        data={filteredCourts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },
  search: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 0, 
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 5, 
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  location: {
    fontSize: 14,
    color: '#4a4a4a',
    marginVertical: 2,
  },
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff5722',
  },
});
