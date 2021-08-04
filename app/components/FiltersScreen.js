import React, { useState } from 'react'
import { FlatList, SafeAreaView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native'
import { colorPack } from '../styles/styles'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import { Button, Checkbox, IconButton, Subheading, Title } from 'react-native-paper'
import SelectMultiple from 'react-native-select-multiple'
import { Feather } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
import Tag from './Tag'
import selectCustomTags from '../selectors/custom-tags'
import selectFilterItems from '../selectors/filter-items'
import FiltersScreenItem from './FiltersScreenItem'
import { useFiltersContext } from '../context/filters-context'

const FiltersScreen = ({ toggleFiltersModal }) => {
    const { filters, setFilterIngredients } = useFiltersContext()
    const initialFormState = {
        search: '',
        selectedCuisines: [],
        selectedTypes: [],
        selectedIngredients: [],
    }
    const [formState, setFormState] = useState(initialFormState)
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const { ingredients } = useIngredientsContext()
    const { recipes } = useRecipesContext()
    const customTags = recipes ? selectCustomTags(recipes) : []
    const filterItems = selectFilterItems(recipeCuisines, recipeTypes, customTags)
    const sectionData = [
        {
            title: 'Cuisine',
            data: filterItems.recipeCuisines.map(item => item)
            // data: recipeCuisines
        },
        {
            title: 'Meal',
            data: filterItems.recipeTypes.map(item => item)
            // data: recipeTypes
        },
        {
            title: 'Custom Tag',
            data: filterItems.customTags.map(item => item)
            // data: customTags
        }
    ]

    console.log('filters', filters)

    const handleFilterIngredientsChange = (selectedIngredients) => {
        setFilterIngredients(selectedIngredients)
    }

    const toggleSearchModal = () => setIsSearchModalVisible(!isSearchModalVisible);

    const renderTag = ({item}) => (
        <Tag item={item} />
    )

    const renderItem = ({ item }) => {
        return (
            <FiltersScreenItem item={item} />
        )
    }
      

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Button color={colorPack.darkgrey} onPress={toggleFiltersModal} style={styles.closeButton}>Close</Button>
                <Button style={styles.applyButton}>Apply</Button>
            </View>
            <TouchableOpacity onPress={toggleSearchModal}>
                <View style={styles.searchSection}>
                    <Feather style={styles.searchIcon} name="search" size={20} color="#000"/>
                    <Text
                        style={styles.placeholderText}
                    >
                        Ingredient, Author, or Custom Tag
                    </Text>
                </View>
            </TouchableOpacity>
            <MultiSelectDropdownModal
                isVisible={isSearchModalVisible}
                headerText="Search Ingredients"
                toggleModal={toggleSearchModal}
                itemOptions={ingredients.map(({ id, name }) => {
                    return {
                        id: name,
                        name
                    }
                })}
                handleSelectedItemsChange={handleFilterIngredientsChange}
                selectedItems={filters.ingredients}
                selectText="Select Ingredients"
                inputPlaceholderText="Search Ingredients..."
            />
            <View>
                <FlatList
                    horizontal
                    data={filters.ingredients}
                    renderItem={renderTag}
                    keyExtractor={item => item}
                    style={styles.tagFlatList}
                />
            </View>
            <View style={styles.selectGroup}>
                <SectionList
                    sections={sectionData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.subheading}>{title}</Text>
                    )}
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
    placeholderText: {
        color: "#aaaaaa",
        flex: 1
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
    tagFlatList: {
        margin: 10
    },
    
    
})

export default FiltersScreen;