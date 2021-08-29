import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  } from "react-native";
import { Title } from 'react-native-paper'
import { Feather } from "@expo/vector-icons"
import Modal from 'react-native-modal'
import BottomSheet from 'reanimated-bottom-sheet'
import AddRecipe from '../components/AddRecipe';
import { firebase } from '../firebase/firebase'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { colorPack } from '../styles/styles'
import RecipeList from '../components/RecipeList'
import BottomSheetHeader from '../components/BottomSheetHeader'
import useIngredients from '../hooks/useIngredients';

const { width, height } = Dimensions.get("window");
const snapPoints = [ '95%', '15%'];

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sheetRef = React.useRef(null);
  useIngredients()
  
    renderContent = () => (
      <View style={styles.modal}>
        <RecipeList />
      </View>
    )
  
    renderHeader = () => (
      <BottomSheetHeader />
    );
  
    const toggleFormModal = () => {
      setIsModalVisible(!isModalVisible);
    };
  
    onOpenBottomSheetHandler = (index) => {
      BottomSheet.snapTo(index);
    };

    return (
      <LinearGradient colors={[colorPack.mint, colorPack.backgroundColor, colorPack.mint]} style={styles.linearGradient}>
        <SafeAreaView style={styles.container}>
          <Title style={styles.buttonText}>Save a recipe!</Title>
          <View style={{ position: 'absolute' }}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <TouchableOpacity
                  style={{ padding: 20 }}
                  onPress={toggleFormModal}
              >
                <Feather name="plus-circle" size={150} color={colorPack.mint}/>
              </TouchableOpacity>
            </Animatable.View>
            <Modal
                isVisible={isModalVisible}
                style={{ margin: 0 }}
            >
              <View style={{ flex: 1, backgroundColor: colorPack.backgroundColor, borderRadius: 5 }}>
                <AddRecipe toggleFormModal={toggleFormModal}/>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
          <BottomSheet
              enabledBottomInitialAnimation={true}
              // enabledBottomClamp={true}
              ref={sheetRef}
              initialSnap={1}
              snapPoints={snapPoints}
              // borderRadius={10} 
              renderContent={renderContent}
              renderHeader={renderHeader}
          />
      </LinearGradient>
    )

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      justifyContent: 'center',
      alignItems: 'center',
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
    buttonText: {
      color: colorPack.darkgreen,
      alignSelf: 'center',
      paddingTop: 5,
      height: height / 3
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
      backgroundColor: colorPack.backgroundColor,
      paddingTop: 20,
      height: height - 120
    },
    linearGradient: {
      flex: 1,
      borderRadius: 5
    },
    
  });