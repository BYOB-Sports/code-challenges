import React from "react";
import {TextInput, StyleSheet, View} from 'react-native';


const SearchBar =({ onSearch }) => {
    return (
        <View>
         <TextInput
            style={styles.input}
            placeholder="Search for a court..."
            onChangeText={onSearch}
      />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});


export default SearchBar;