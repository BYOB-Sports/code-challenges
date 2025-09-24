import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { courts } from '../data/courtsMock';

export default function CourtList({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredCourts = courts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tennis Courts</Text>
      <TextInput
        style={styles.search}
        placeholder="Search court or location..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredCourts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CourtDetail', { court: item })}
          >
            <Text style={styles.courtName}>{item.name}</Text>
            <Text>{item.location} | {item.surfaceType} | ⭐ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9', flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#26a65b' },
  search: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 16, marginBottom: 8, borderRadius: 10, elevation: 2 },
  courtName: { fontSize: 18, fontWeight: '500' },
});
