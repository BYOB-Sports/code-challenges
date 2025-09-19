import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import { useCourtsStore } from '../store/useCourtsStore';
import Rating from '../components/Rating';
import { AmenityChip } from '../components/CourtCard';

type Route = RouteProp<RootStackParamList, 'CourtDetail'>;

export default function CourtDetailScreen() {
  const { params } = useRoute<Route>();
  const { selectedCourt, selectCourt, getCourtReviews, addReview } = useCourtsStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  React.useEffect(() => {
    selectCourt(params.id);
  }, [params.id, selectCourt]);

  const court = selectedCourt;
  const reviews = useMemo(() => getCourtReviews(params.id), [params.id, getCourtReviews]);

  if (!court) return <View style={{ flex: 1 }} />;

  const submit = () => {
    if (!comment.trim()) {
      Alert.alert('Add a short comment');
      return;
    }
    addReview(court.id, { courtId: court.id, user: 'Guest', rating, comment: comment.trim() });
    setComment('');
    setRating(5);
    Alert.alert('Review added!');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>{court.name}</Text>
            <Text style={{ color: '#666', marginTop: 2 }}>{court.city}, {court.state} • {court.surface} • {court.courtsCount} courts</Text>

            <View style={{ marginTop: 10 }}>
              <Rating value={court.avgRating || 0} count={court.reviewsCount || 0} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {court.lights && <AmenityChip label="Lights" />}
              {court.indoor && <AmenityChip label="Indoor" />}
            </View>

            <View style={{ marginTop: 16, padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 12 }}>
              <Text style={{ fontWeight: '600', marginBottom: 8 }}>Leave a review</Text>
              <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                {[1,2,3,4,5].map(n => (
                  <TouchableOpacity key={n} onPress={() => setRating(n)} style={{ marginRight: 6 }}>
                    <Text style={{ fontSize: 20, color: n <= rating ? '#f5a623' : '#ccc' }}>★</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                placeholder="Your thoughts about this court"
                value={comment}
                onChangeText={setComment}
                style={{ backgroundColor: '#f8f8f8', borderRadius: 8, padding: 10, minHeight: 80, textAlignVertical: 'top' }}
                multiline
              />
              <TouchableOpacity onPress={submit} style={{ marginTop: 10, backgroundColor: '#335CFF', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Submit</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20 }}>Reviews</Text>
          </View>
        }
        data={reviews}
        keyExtractor={r => r.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' }}>
            <Text style={{ fontWeight: '600' }}>{item.user} · {new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={{ color: '#f5a623', marginVertical: 4 }}>{'★'.repeat(item.rating)}{'☆'.repeat(5-item.rating)}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}
