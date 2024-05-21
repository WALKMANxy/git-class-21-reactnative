import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useCharacters } from "../../hooks/useGenericRMA";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PaginationControls from "../PaginationControls/PaginationControls";
import { setSearchQuery } from "../../redux/searchSlice";

const Characters = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [characters, loading, , error] = useCharacters(searchQuery); // No need for totalPages
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // Assuming 20 items per page for pagination

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearchQueryChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const paginatedCharacters = characters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterItem}>
            <Image source={{ uri: item.image }} style={styles.characterImage} />
            <View style={styles.characterDetails}>
              <Text style={styles.characterName}>{item.name}</Text>
              <Text>Gender: {item.gender}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Last known location: {item.location.name}</Text>
            </View>
          </View>
        )}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(characters.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  characterItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  characterName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

export default Characters;
