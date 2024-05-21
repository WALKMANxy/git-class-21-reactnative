import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/searchSlice';

const CustomHeader = ({ title }: { title: string }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  const handleSearchChange = (text: string) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder={`Search ${title}`}
        value={inputValue}
        onChangeText={handleSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    color: '#333',
    flex: 1,
    marginHorizontal: 10,
  },
});

export default CustomHeader;
