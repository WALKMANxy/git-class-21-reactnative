import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useLocation } from "../../hooks/useGenericRMA";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PaginationControls from "../PaginationControls/PaginationControls";
import { setSearchQuery } from "../../redux/searchSlice";

const Locations = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [locations, loading, error] = useLocation(searchQuery);
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

  const paginatedLocations = locations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedLocations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Dimension: {item.dimension}</Text>
          </View>
        )}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(locations.length / itemsPerPage)}
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
  locationItem: {
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
  locationName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
});

export default Locations;
