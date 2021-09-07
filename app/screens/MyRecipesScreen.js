import React from 'react'
import { StyleSheet, View } from 'react-native'
import RecipeList from '../components/RecipeList'
import BannerAd from '../components/BannerAd'

export default function MyRecipesScreen() {
    
    return (
        <View style={styles.container}>
            {/* <BannerAd /> */}
            <RecipeList />
            {/* <View style={{ zIndex: 0 }}> */}
            {/* <BannerAd /> */}
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end'
    },
})
