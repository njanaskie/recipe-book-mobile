import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import RecipeList from '../components/RecipeList'
import BannerAd from '../components/BannerAd'

const { width, height } = Dimensions.get("window");

export default function MyRecipesScreen() {
    
    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <RecipeList />
            </View>
            <BannerAd />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
    },
    listContainer: {
        height: height < 700 ? 
            height * .71
            :
            height >= 700 && height < 750 ? 
                height * .72
                :
                height * .74,
        alignItems: 'center'
    }
})
