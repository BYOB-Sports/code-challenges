import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import courtsData from "../data/tennis_courts.json";

type Props = NativeStackScreenProps<RootStackParamList, "CourtDetails">;

export default function CourtDetails({ route }: Props) {
  const { courtId } = route.params;
  const court = courtsData.find(c => c.id === courtId);

  if (!court) {
    return <View style={styles.container}><Text>Court not found</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{court.name}</Text>
      <Text style={styles.address}>{court.location.address}</Text>
      <Text>Surface: {court.details.surface}</Text>
      <Text>Indoor: {court.details.indoor ? "Yes" : "No"}</Text>
      <Text>Lighting: {court.details.lighting ? "Yes" : "No"}</Text>
      <Text>Status: {court.availability.status}</Text>
      <Text>Booking Required: {court.availability.booking_required ? "Yes" : "No"}</Text>
      <Text>Fee: {court.availability.fee}</Text>
      <Text style={styles.updated}>Last Updated: {new Date(court.last_updated).toLocaleString()}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9fafb" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  address: { fontSize: 16, color: "#555", marginBottom: 8 },
  updated: { marginTop: 12, color: "#555", fontSize: 12 },
});
