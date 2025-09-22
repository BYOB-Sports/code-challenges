// src/screens/CourtsScreen.js
import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourtCard from "../components/CourtCard";
import LocationDropdown from "../components/LocationDropdown";
import { getLocations, getCourts } from "../api";

export default function CourtsScreen({ navigation, onLogout }) {
  const [auth, setAuth] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [pinLoading, setPinLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [courts, setCourts] = useState([]);
  const [loadingCourts, setLoadingCourts] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("auth").then((s) => s && setAuth(JSON.parse(s)));
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const locationsList = await getLocations();
      setLocations(locationsList);
    } catch (e) {
      Alert.alert("Error", "Could not load locations");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("auth");
          // Trigger auth state check in App component
          if (onLogout) {
            onLogout();
          }
        },
      },
    ]);
  };

  const handleLocationSelect = async (location) => {
    try {
      setPinLoading(true);
      setSelectedLocation(location);
      // Fake loading effect (extra 1s)
      await new Promise((r) => setTimeout(r, 1000));
      setPincode(location.pincode);
      loadCourts(location.pincode, search);
    } catch (e) {
      Alert.alert("Error", "Could not fetch courts for this location");
    } finally {
      setPinLoading(false);
    }
  };

  const loadCourts = useCallback(async (pin, q) => {
    try {
      setLoadingCourts(true);
      const data = await getCourts(pin, q);
      setCourts(data);
    } catch (e) {
      Alert.alert("Error", "Could not load courts");
    } finally {
      setLoadingCourts(false);
    }
  }, []);

  const onSearch = async (text) => {
    setSearch(text);
    if (pincode) loadCourts(pincode, text);
  };

  const header = (
    <View style={{ marginBottom: 16 }}>
      {pincode ? (
        <View style={{ marginBottom: 16 }}>
          <LocationDropdown
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            placeholder="Select a city"
          />
          <TextInput
            placeholder="Search courts..."
            value={search}
            onChangeText={onSearch}
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 20,
              elevation: 8,
              marginTop: 12,
            }}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            Choose your location
          </Text>
          <LocationDropdown
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={handleLocationSelect}
            placeholder="Select a city"
          />
          <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 8 }}>
            {pinLoading
              ? "Loading courts..."
              : "Select a city to view tennis courts"}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f9fafb",
        paddingHorizontal: 16,
        paddingTop: 80, // Increased for dynamic island
      }}
    >
      {/* User Header with Logout */}
      {auth && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: "white",
            padding: 12,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Welcome, {auth.user?.name || auth.user?.username}
            </Text>
            <Text style={{ fontSize: 12, color: "#6b7280" }}>
              Find tennis courts near you
            </Text>
          </View>
          <Pressable
            onPress={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
              Logout
            </Text>
          </Pressable>
        </View>
      )}

      <View
        style={{ flex: 1, justifyContent: pincode ? "flex-start" : "center" }}
      >
        {header}
        {pincode ? (
          loadingCourts ? (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <ActivityIndicator />
              <Text style={{ color: "#6b7280", marginTop: 8 }}>
                Loading courts...
              </Text>
            </View>
          ) : (
            <FlatList
              data={courts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CourtCard
                  court={item}
                  onPress={() =>
                    navigation.navigate("CourtDetail", { id: item.id })
                  }
                />
              )}
              ListEmptyComponent={
                <Text
                  style={{
                    color: "#6b7280",
                    marginTop: 32,
                    textAlign: "center",
                  }}
                >
                  No courts found.
                </Text>
              }
              contentContainerStyle={{ paddingBottom: 24 }}
            />
          )
        ) : (
          pinLoading && (
            <View style={{ marginTop: 40, alignItems: "center" }}>
              <ActivityIndicator />
              <Text style={{ color: "#6b7280", marginTop: 8 }}>
                Fetching your pincode…
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}
