import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/searchSlice';
import { RootStackParamList } from '../../models/routes'; // Import the types

const Navbar = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, keyof RootStackParamList>>();
  
    useEffect(() => {
      if (['Episodes', 'Locations', 'MemoryGame'].includes(route.name)) {
        dispatch(setSearchQuery(''));
        setInputValue('');
      }
    }, [route.name, dispatch]);
  
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
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>RICK AND MORTY API</Text>
        {route.name !== 'Home' && route.name !== 'MemoryGame' && (
          <TextInput
            style={styles.navbarSearch}
            placeholder="Type here to search..."
            value={inputValue}
            onChangeText={handleSearchChange}
          />
        )}
        {route.name !== 'Home' && (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navbarAction}>
            <Text style={styles.homeLink}>Home</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#333',
      color: '#fff',
      height: 60, // Fixed height
      width: '100%', // Full width
      position: 'absolute', // Fixed position
      top: 0,
      left: 0,
      zIndex: 1000, // Ensure it is above other components
    },
    navbarTitle: {
      flex: 1,
      textAlign: 'center',
      color: '#fff',
      fontSize: 20,
    },
    navbarSearch: {
      flex: 2,
      backgroundColor: '#fff',
      padding: 8,
      borderRadius: 20,
      color: '#333',
      marginHorizontal: 10,
    },
    navbarAction: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeLink: {
      color: '#fff',
      fontSize: 20,
    },
  });
  
  export default Navbar;