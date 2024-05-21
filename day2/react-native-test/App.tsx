import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import {
  ActionSheetProvider,
  useActionSheet,
} from "@expo/react-native-action-sheet";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './navigation';





const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;



/* export default function App() {
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <ColorBox />
        <StatusBar style="auto" />
      </View>
    </ActionSheetProvider>
  );
}

function ColorBox() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [boxColor, setBoxColor] = useState("red");

  const changeColor = () => {
    const options = ["Red", "Blue", "Green", "Yellow", "Cancel"];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex !== undefined && buttonIndex !== cancelButtonIndex) {
          const selectedColour = options[buttonIndex].toLowerCase();
          setBoxColor(selectedColour);
        }
      }
    );
  };

  return (
    <View style={[styles.redBox, { backgroundColor: boxColor }]}>
      <Button title="Change Colour" onPress={changeColor} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  redBox: {
    width: 100,
    height: 100,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
}); */
