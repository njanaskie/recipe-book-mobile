import React from "react";
import {
  LogBox
} from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import RegistrationScreen from '../screens/RegistrationScreen'
import HomeScreen from '../screens/HomeScreen'
import { useFirebaseContext } from '../context/firebase-context'

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
 ]);

const Stack = createStackNavigator();

export default function App() {
  const { user, loading } = useFirebaseContext()

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          { user ? (
              <Stack.Screen name='Home' component={HomeScreen} />
          ) : (
            <React.Fragment>
              <Stack.Screen name='Login' component={LoginScreen}/>
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </React.Fragment>
          )}
        
        </Stack.Navigator>
      </NavigationContainer>
  );
}