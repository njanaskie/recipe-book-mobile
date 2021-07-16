import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  StatusBar,
  Button,
  // Modal
  } from "react-native";
  import { Feather } from "@expo/vector-icons"
  import Modal from 'react-native-modal'
  import BottomSheet from 'reanimated-bottom-sheet'
// import RecipeList from './RecipeList'
// import RecipeListFilters from './RecipeListFilters'
// import { useRecipesContext } from '../context/recipes-context'
// import { useIngredientsContext } from '../context/ingredients-context'
import AddRecipe from './AddRecipe';
import { firebase } from '../firebase/firebase'
import useAllRecipes from '../hooks/useAllRecipes'
import useIngredients from '../hooks/useIngredients'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { colorPack } from '../styles/styles'
import RecipeList from './RecipeList'
import BottomSheetHeader from './BottomSheetHeader'

const { width, height } = Dimensions.get("window");
const snapPoints = [ '95%', '15%'];

export default function HomeScreen() {
    // const recipes = useAllRecipes()
    const ingredients = useIngredients()
    // const { recipes } = useRecipesContext()
    // const { ingredients } = useIngredientsContext()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const sheetRef = React.useRef(null);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  
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
          <View>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
              <TouchableOpacity
                  style={{ padding: 20 }}
                  onPress={toggleFormModal}
              >
                <Feather name="plus-circle" size={150} color={colorPack.mint}/>
                <Text style={styles.buttonText}>Save a recipe!</Text>
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
      paddingTop: 5
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
      // paddingLeft: 15,
      // paddingRight: 15,
      borderRadius: 5
    },
    
  });