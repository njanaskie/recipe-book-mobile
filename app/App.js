import React from "react";
import {
  LogBox
} from "react-native";
import AppWrapper from './navigation/AppWrapper'
import AppNavigator from './navigation/AppNavigator'


LogBox.ignoreAllLogs();

export default function App() {

  return (
    <AppWrapper>
      <AppNavigator />
    </AppWrapper>
  );
}
