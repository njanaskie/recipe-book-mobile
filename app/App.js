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
import LoginScreen from './components/LoginScreen'
import AppWrapper from './components/AppWrapper'
import RegistrationScreen from './components/RegistrationScreen'
import PlaceholderScreen from './components/PlaceholderScreen'
import HomeScreen from './components/HomeScreen'
import { firebase } from './firebase/firebase';
import AppNavigator from './components/AppNavigator'

import { useFirebaseContext } from './context/firebase-context'

LogBox.ignoreAllLogs();

// const { width, height } = Dimensions.get("window");
// const snapPoints = ["10%", "90%"];
// const Stack = createStackNavigator();

export default function App() {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const sheetRef = React.useRef(null);
  // // const [user, setUser] = useState(null)
  // // const [loading, setLoading] = useState(true)
  // const { user, loading } = useFirebaseContext()


//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//         setUser(user)
//         setLoading(false)
//         // setIsAdmin()
//         // setIsGuest()
//     })

//     return () => unsubscribe()
// }, [])

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
    <AppWrapper>
      <AppNavigator />
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  boxWrapper: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  text2: {
    fontSize: 21,
    fontWeight: "bold",
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  modal: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // height: height
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  
});