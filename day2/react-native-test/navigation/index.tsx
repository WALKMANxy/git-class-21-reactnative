import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../components/HomePage/HomePage';
import Characters from '../components/Characters/Characters';
import Locations from '../components/Locations/Locations';
import Episodes from '../components/Episodes/Episodes';
import MemoryGame from '../components/MemoryGame/MemoryGame';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import { RootStackParamList } from '../models/routes';
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen
          name="Characters"
          component={Characters}
          options={{
            headerTitle: 'Characters',
            headerRight: () => <CustomHeader title="Characters" />,
          }}
        />
        <Stack.Screen
          name="Locations"
          component={Locations}
          options={{
            headerTitle: 'Locations',
            headerRight: () => <CustomHeader title="Locations" />,
          }}
        />
        <Stack.Screen
          name="Episodes"
          component={Episodes}
          options={{
            headerTitle: 'Episodes',
            headerRight: () => <CustomHeader title="Episodes" />,
          }}
        />
        <Stack.Screen name="MemoryGame" component={MemoryGame} options={{ title: 'Memory Game' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
