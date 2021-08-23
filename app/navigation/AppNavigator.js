import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  LogBox,
  TextInput,
  Platform,
  StatusBar,
  Button
} from "react-native";
import Modal from 'react-native-modal';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Audio } from "expo-av";
import * as Linking from "expo-linking";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import AppWrapper from './AppWrapper'
import RegistrationScreen from '../screens/RegistrationScreen'
import PlaceholderScreen from '../screens/PlaceholderScreen'
import HomeScreen from '../screens/HomeScreen'
import { firebase } from '../firebase/firebase';

import { useFirebaseContext } from '../context/firebase-context'

LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get("window");
const snapPoints = ["10%", "90%"];
const Stack = createStackNavigator();

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sheetRef = React.useRef(null);
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
  const { user, loading } = useFirebaseContext()

  // <Stack.Screen name='LoginScreen' component={
  //   <SafeAreaView style={styles.container}>
  //     <View>
  //       <TouchableOpacity
  //         style={{ padding: 20 }}
  //         onPress={toggleModal}
  //       >
  //         <Feather name="plus-circle" size={150} color='#3eb489'/>
  //       </TouchableOpacity>
  //       <Modal
  //         isVisible={isModalVisible}
  //       >
  //         <AddRecipe />
  //       </Modal>
  //     </View>
  //     <BottomSheet
  //       enabledBottomInitialAnimation={true}
  //       ref={sheetRef}
  //       initialSnap={0}
  //       snapPoints={snapPoints}
  //       // borderRadius={10} 
  //       renderContent={renderContent}
  //       renderHeader={renderHeader}
  //       />
  //   </SafeAreaView>
  // }
  // />

  return (
    // <AppWrapper>
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
    
    // </AppWrapper>
  );
}