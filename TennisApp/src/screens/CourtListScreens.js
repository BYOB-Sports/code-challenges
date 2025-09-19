import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CourtItems from '../components/CourtItems';
import SearchBar from '../components/SearchBar';
import allCourts from '../data/mockData';


const CourtListScreens = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourts, setFilteredCourts] = useState(allCourts);

  useEffect(() => {
    const results = allCourts.filter(court =>
      court.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourts(results);
  }, [searchQuery]);

  const handleSelectCourt = (court) => {
    navigation.navigate('CourtDetail', { courtId: court.id, courtName: court.name });
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchQuery} />
      <FlatList
        data={filteredCourts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourtItems court={item} onSelect={() => handleSelectCourt(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
});

export default CourtListScreens;
