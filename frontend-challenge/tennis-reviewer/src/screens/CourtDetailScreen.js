// src/screens/CourtDetailScreen.js
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RatingStars from "../components/RatingStars";
import { getCourt, getReviews, postReview } from "../api";

export default function CourtDetailScreen({ route }) {
  const { id } = route.params;
  const [court, setCourt] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [auth, setAuth] = useState(null);

  // modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("auth").then((s) => s && setAuth(JSON.parse(s)));
  }, []);

  const refresh = async () => {
    const [c, r] = await Promise.all([getCourt(id), getReviews(id)]);
    setCourt(c);
    setReviews(r);
  };

  useEffect(() => {
    refresh();
  }, [id]);

  const submitReview = async () => {
    try {
      if (!auth?.token) return Alert.alert("Login required");
      if (!rating || !text.trim())
        return Alert.alert("Please add rating and review");
      await postReview(id, { rating, text }, auth.token);
      setModalVisible(false);
      setText("");
      setRating(5);
      await refresh();
    } catch (e) {
      Alert.alert("Error", "Could not submit review");
    }
  };

  if (!court) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#6b7280" }}>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ height: 224 }}
      >
        {court.images?.map((src, i) => (
          <Image
            key={i}
            source={{ uri: src }}
            style={{ width: 400, height: 224 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{court.name}</Text>
        <Text style={{ color: "#6b7280", marginTop: 4 }}>{court.address}</Text>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RatingStars value={court.avg} />
          <Text style={{ color: "#6b7280" }}>
            {court.courtsAvailable} courts • {court.workingHours}
          </Text>
        </View>

        <Text style={{ marginTop: 16, color: "#374151", lineHeight: 24 }}>
          {court.description}
        </Text>

        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Reviews ({reviews.length})
          </Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: "black",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Submit a Review
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 12 }}>
          {reviews.map((r) => (
            <View
              key={r.id}
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: r.user?.avatar }}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      marginRight: 8,
                    }}
                  />
                  <Text style={{ fontWeight: "500" }}>
                    {r.user?.name || "User"}
                  </Text>
                </View>
                <RatingStars value={r.rating} />
              </View>
              {r.text ? (
                <Text style={{ marginTop: 8, color: "#374151" }}>{r.text}</Text>
              ) : null}
              <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 8 }}>
                {new Date(r.createdAt).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Review Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 8 }}>
              Your Review
            </Text>
            <RatingStars
              value={rating}
              editable
              onChange={setRating}
              size={28}
            />
            <TextInput
              placeholder="Write something..."
              value={text}
              onChangeText={setText}
              multiline
              style={{
                marginTop: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 16,
                padding: 16,
                height: 112,
              }}
            />
            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 12,
                  paddingVertical: 12,
                  marginRight: 8,
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "600" }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={submitReview}
                style={{
                  flex: 1,
                  backgroundColor: "black",
                  borderRadius: 12,
                  paddingVertical: 12,
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
