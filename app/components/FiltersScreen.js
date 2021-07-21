import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { colorPack } from '../styles/styles'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import { Button, IconButton, Subheading, Title } from 'react-native-paper'
import SelectMultiple from 'react-native-select-multiple'
import { Feather } from "@expo/vector-icons"

const FiltersScreen = ({ toggleFiltersModal }) => {
    const initialFormState = {
        search: '',
        selectedCuisines: [],
        selectedTypes: []
    }
    const [formState, setFormState] = useState(initialFormState)

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Button color={colorPack.darkgrey} onPress={toggleFiltersModal} style={styles.closeButton}>Close</Button>
                <Button style={styles.applyButton}>Apply</Button>
            </View>
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
            <View style={styles.selectGroup}>
                <Subheading style={styles.subheading}>Cuisines</Subheading>
                <SelectMultiple
                    items={recipeCuisines}
                    style={styles.selectMultiple}
                    rowStyle={styles.selectMultipleRow}
                    labelStyle={styles.selectMultipleLabel}
                    checkboxStyle={styles.selectMultipleCheckbox}
                    selectedItems={formState.selectedCuisines}
                    onSelectionsChange={(selectedCuisines) => setFormState({ ...formState, selectedCuisines })}
                />
            </View>
            <View style={styles.selectGroup}>
                <Subheading style={styles.subheading}>Meal</Subheading>
                <SelectMultiple
                    items={recipeTypes}
                    style={styles.selectMultiple}
                    rowStyle={styles.selectMultipleRow}
                    labelStyle={styles.selectMultipleLabel}
                    checkboxStyle={styles.selectMultipleCheckbox}
                    selectedItems={formState.selectedTypes}
                    onSelectionsChange={(selectedTypes) => setFormState({ ...formState, selectedTypes })}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    applyButton: {

    },
    closeButton: {
    },
    containter: {
        height: 200,
        width: 150,
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        height: 40,
        overflow: 'hidden',
        backgroundColor: 'white',
        // marginBottom: 10,
        marginRight: 10,
        // marginLeft: 20,
        // paddingLeft: 16,
        // textAlign: 'auto',

        flex: 1,
        // paddingTop: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        // paddingLeft: 0,
        // backgroundColor: '#fff',
        color: '#424242',
    },
    searchSection: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 5,
    },
    searchIcon: {
        padding: 10,
    },
    selectGroup: {
        padding: 10,
        marginTop: 10
    },
    selectMultiple: {
        height: 256,
        marginHorizontal: 10
    },
    selectMultipleCheckbox: {
        tintColor: 'white',

    },
    selectMultipleLabel: {
        color: 'white'
    },
    selectMultipleRow: {
        backgroundColor: 'transparent'
    },
    subheading: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    title: {
        alignSelf: 'center',
        padding: 5
    },
    
    
})

export default FiltersScreen;