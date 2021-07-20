import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { colorPack } from '../styles/styles'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import { Button, IconButton, Subheading, Title } from 'react-native-paper'
import SelectMultiple from 'react-native-select-multiple'
import { Feather } from "@expo/vector-icons"

const FiltersScreen = () => {
    const initialFormState = {
        search: '',
        selectedCuisines: [],
        selectedTypes: []
    }
    const [formState, setFormState] = useState(initialFormState)

    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView nestedScrollEnabled={true}> */}
                <View style={styles.searchSection}>
                    <Feather style={styles.searchIcon} name="search" size={20} color="#000"/>
                    <TextInput
                        style={styles.input}
                        placeholder='Ingredient, Author, or Custom Tag'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(search) => setFormState({ ...formState, search })}
                        value={formState.search}
                    />
                </View>
                <Subheading>Cuisines</Subheading>
                <SelectMultiple
                    items={recipeCuisines}
                    style={{height: 256}}
                    selectedItems={formState.selectedCuisines}
                    onSelectionsChange={(selectedCuisines) => setFormState({ ...formState, selectedCuisines })}
                />
                <Subheading>Meal</Subheading>
                <SelectMultiple
                    items={recipeTypes}
                    style={{height: 256}}
                    selectedItems={formState.selectedTypes}
                    onSelectionsChange={(selectedTypes) => setFormState({ ...formState, selectedTypes })}
                />
            {/* </ScrollView> */}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    containter: {
        height: 200,
        width: 150,
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        // paddingLeft: 16,

        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        // backgroundColor: '#fff',
        color: '#424242',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    title: {
        alignSelf: 'center',
        padding: 5
    },
    
    
})

export default FiltersScreen;