// src/components/LocationDropdown.js
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

export default function LocationDropdown({
  locations,
  selectedLocation,
  onLocationSelect,
  placeholder = "Select a location",
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (location) => {
    onLocationSelect(location);
    setIsVisible(false);
  };

  const selectedLocationName = selectedLocation
    ? locations.find((loc) => loc.id === selectedLocation.id)?.name ||
      selectedLocation.name
    : null;

  return (
    <View>
      <Pressable
        onPress={() => setIsVisible(true)}
        style={styles.compactDropdownButton}
      >
        <Text style={styles.compactDropdownText}>
          {selectedLocationName || placeholder}
        </Text>
        <Text style={styles.compactArrow}>▼</Text>
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setIsVisible(false)}>
          <View style={styles.dropdown}>
            <FlatList
              data={locations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.name}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  arrow: {
    fontSize: 12,
    color: "#6b7280",
  },
  compactDropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  compactDropdownText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  compactArrow: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    minWidth: 250,
    maxHeight: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
});
