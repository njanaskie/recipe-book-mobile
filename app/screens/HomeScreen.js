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
import MyRecipesScreen from '../screens/MyRecipesScreen'
import BottomSheetHeader from '../components/BottomSheetHeader'
import useIngredients from '../hooks/useIngredients';
import BannerAd from '../components/BannerAd'

const { width, height } = Dimensions.get("window");
const snapPoints = [ '95%', '15%'];

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sheetRef = React.useRef(null);
  useIngredients()
  
    renderContent = () => (
      <View style={styles.modal}>
        <MyRecipesScreen />
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
          <BannerAd />
          <Title style={styles.buttonTitle}>Save a recipe!</Title>
          <View style={styles.buttonContainer}>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <TouchableOpacity
                  style={{ padding: 20 }}
                  onPress={toggleFormModal}
              >
                <Feather name="plus-circle" size={150} color={colorPack.mint}/>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </SafeAreaView>
        <Modal
            isVisible={isModalVisible}
            style={{ margin: 0 }}
        >
          <View style={{ flex: 1, backgroundColor: colorPack.backgroundColor, borderRadius: 5 }}>
            <AddRecipe toggleFormModal={toggleFormModal}/>
          </View>
        </Modal>
        <BottomSheet
            enabledBottomInitialAnimation={true}
            // enabledBottomClamp={true}
            ref={sheetRef}
            initialSnap={1}
            snapPoints={snapPoints}
            // borderRadius={10} 
            renderContent={renderContent}
            renderHeader={() => <BottomSheetHeader />}
        />
      </LinearGradient>
    )

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      // justifyContent: 'flex-start',
      alignItems: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonTitle: {
      color: colorPack.darkgreen,
      marginTop: height / 6,
    },
    modal: {
      backgroundColor: colorPack.backgroundColor,
      // alignContent: 'space-around',
      paddingTop: 20,
      height: height
    },
    linearGradient: {
      flex: 1,
      borderRadius: 5
    },
  });