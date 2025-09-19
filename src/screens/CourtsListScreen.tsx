import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ListRenderItem,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCourts } from '../context/CourtsContext';
import { useDebounce } from '../hooks/useDebounce';
import { LoadingSpinner } from '../components/LoadingSpinner';
import CourtCard from '../components/CourtCard';
import { Court, RootStackParamList } from '../types';
import { COLORS, DIMENSIONS, CONFIG } from '../constants';

type CourtsListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CourtsList'>;

interface Props {
  navigation: CourtsListScreenNavigationProp;
}

const CourtsListScreen: React.FC<Props> = ({ navigation }) => {
  const { filteredCourts, searchQuery, searchCourts, isLoading, error } = useCourts();
  const debouncedSearchQuery = useDebounce(searchQuery, CONFIG.SEARCH_DEBOUNCE_MS);

  React.useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      searchCourts(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, searchQuery, searchCourts]);

  const handleCourtPress = useCallback((court: Court) => {
    navigation.navigate('CourtDetail', { court });
  }, [navigation]);

  const renderCourtCard: ListRenderItem<Court> = useCallback(({ item }) => (
    <CourtCard court={item} onPress={handleCourtPress} />
  ), [handleCourtPress]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Tennis Courts</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courts or locations..."
            value={searchQuery}
            onChangeText={searchCourts}
            placeholderTextColor={COLORS.textTertiary}
          />
          {searchQuery.length > 0 && (
            <Icon
              name="clear"
              size={20}
              color={COLORS.textSecondary}
              style={styles.clearIcon}
              onPress={() => searchCourts('')}
            />
          )}
        </View>
      </View>

      {isLoading && <LoadingSpinner text="Loading courts..." />}
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={filteredCourts}
        renderItem={renderCourtCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: DIMENSIONS.md,
    paddingVertical: DIMENSIONS.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: DIMENSIONS.fontHeader,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: DIMENSIONS.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: DIMENSIONS.radiusMedium,
    paddingHorizontal: DIMENSIONS.md,
    height: DIMENSIONS.inputHeight,
  },
  searchIcon: {
    marginRight: DIMENSIONS.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: DIMENSIONS.fontLarge,
    color: COLORS.text,
  },
  clearIcon: {
    marginLeft: DIMENSIONS.sm,
  },
  listContainer: {
    paddingVertical: DIMENSIONS.sm,
  },
  errorContainer: {
    padding: DIMENSIONS.md,
    backgroundColor: COLORS.error,
    marginHorizontal: DIMENSIONS.md,
    marginVertical: DIMENSIONS.sm,
    borderRadius: DIMENSIONS.radiusMedium,
  },
  errorText: {
    color: COLORS.white,
    fontSize: DIMENSIONS.fontMedium,
    textAlign: 'center',
  },
});

export default CourtsListScreen;
