import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import PaginationProps from '../../models/PaginationProps';

const PaginationControls: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.pagination}>
      <Button title="Previous" onPress={handlePreviousPage} disabled={currentPage === 1} />
      <Text style={styles.pageInfo}>{currentPage}/{totalPages}</Text>
      <Button title="Next" onPress={handleNextPage} disabled={currentPage === totalPages} />
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  pageInfo: {
    fontSize: 16,
  },
});

export default PaginationControls;
