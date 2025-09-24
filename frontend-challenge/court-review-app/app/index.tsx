import { PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic, useFonts } from '@expo-google-fonts/playfair-display';
import { Ubuntu_700Bold } from "@expo-google-fonts/ubuntu";
import React from 'react';
import { Button, FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { courts } from '../data/courtsMock';

const tennisGreen = '#586545';
const tennisBrown = '#8B5736';

type Review = {
  reviewer: string;
  stars: string;
  comment: string;
};

type Court = {
  id: number;
  name: string;
  location: string;
  surfaceType: string;
  rating: number;
  reviews: Review[];
};

export default function HomeScreen() {
  let [fontsLoaded] = useFonts({ Ubuntu_700Bold, PlayfairDisplay_700Bold, PlayfairDisplay_700Bold_Italic});


  const [search, setSearch] = React.useState('');
  const [selectedCourt, setSelectedCourt] = React.useState<Court | null>(null);
  const [reviewer, setReviewer] = React.useState('');
  const [stars, setStars] = React.useState('5');
  const [comment, setComment] = React.useState('');
  const [reviews, setReviews] = React.useState<Review[]>([]);

  React.useEffect(() => {
    setReviews(selectedCourt?.reviews || []);
  }, [selectedCourt]);

  const filteredCourts = courts.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddReview = () => {
    if (!reviewer || !comment) return;
    const newReview: Review = { reviewer, stars, comment };
    setReviews([...reviews, newReview]);
    setReviewer('');
    setStars('5');
    setComment('');
  };

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }

  const bg = require('../assets/images/bg.jpg'); 
  if (!selectedCourt) {
    return (
      <ImageBackground source={bg} style={styles.fullBg}>
        <View style={[styles.container, { backgroundColor: tennisGreen, opacity: 0.93 }]}>
          <Text style={styles.logo}>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontWeight: 'bold', color: '#fff' }}>tennis</Text>
            <Text style={{ fontFamily: 'PlayfairDisplay_700Italic', fontStyle: 'italic', color: '#fff' }}>club</Text>
          </Text>
          <TextInput
            style={styles.search}
            placeholder="Search court or location..."
            placeholderTextColor="#bbb"
            value={search}
            onChangeText={setSearch}
          />
          <FlatList
            data={filteredCourts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => setSelectedCourt(item)}
              >
                <Text
  style={[
    styles.courtName,
    { fontFamily: 'Ubuntu_700Bold', color: '#162660' }
  ]}
>
  {item.name}
</Text>

                <Text style={{ color: '#fff' }}>
                  {item.location} | {item.surfaceType} | ⭐ {item.rating}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={bg} style={styles.fullBg}>
      <View style={[styles.container, { backgroundColor: tennisBrown, opacity: 0.97 }]}>
        <TouchableOpacity onPress={() => setSelectedCourt(null)} style={styles.backButton}>
          <Text style={{ fontWeight: 'bold', color: tennisGreen }}>{'< Back to list'}</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Bold', fontWeight: 'bold', color: '#fff' }}>tennis</Text>
          <Text style={{ fontFamily: 'PlayfairDisplay_700Italic', fontStyle: 'italic', color: '#fff' }}>club</Text>
        </Text>
        <Text style={[styles.title, { color: '#fff' }]}>{selectedCourt.name}</Text>
        <Text style={{ color: '#fff' }}>
          {selectedCourt.location} | {selectedCourt.surfaceType} | ⭐ {selectedCourt.rating}
        </Text>
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
          ListEmptyComponent={<Text style={{ color: '#fff' }}>No reviews yet.</Text>}
        />
        <Text style={styles.sectionTitle}>Add a Review</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={reviewer}
          onChangeText={setReviewer}
          placeholderTextColor="#bbb"
        />
        <TextInput
          style={styles.input}
          placeholder="Stars (1-5)"
          value={stars}
          onChangeText={setStars}
          keyboardType="numeric"
          placeholderTextColor="#bbb"
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment}
          onChangeText={setComment}
          multiline
          placeholderTextColor="#bbb"
        />
        <Button title="Submit Review" onPress={handleAddReview} color={tennisGreen} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fullBg: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  logo: { fontSize: 40, textAlign: "center", marginBottom: 10 },
  courtName: { fontSize: 18, fontWeight: 'bold', color: "#fff" },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  search: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 16 },
  card: { backgroundColor: tennisBrown, padding: 16, marginBottom: 12, borderRadius: 12, shadowColor: "#333", shadowOpacity: 0.15, shadowRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 18, marginBottom: 4, color: "#fff" },
  input: { backgroundColor: "#fff", borderRadius: 5, padding: 8, marginBottom: 8, fontSize: 16 },
  reviewBox: { backgroundColor: "#e7fbe7", borderRadius: 6, padding: 8, marginBottom: 6 },
  reviewer: { fontWeight: '600', color: '#222' },
  backButton: { marginBottom: 8, marginTop: 0 },
});
