import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native'
import { colorPack } from '../styles/styles'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import { Button } from 'react-native-paper'
import { Feather } from "@expo/vector-icons"
import { State, TouchableOpacity } from 'react-native-gesture-handler'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
import Tag from '../components/Tag'
import selectCustomTags from '../selectors/custom-tags'
import selectFilterItems from '../selectors/filter-items'
import FiltersScreenItem from '../components/FiltersScreenItem'
import { useFiltersContext } from '../context/filters-context'

const { width, height } = Dimensions.get("window");

const FiltersScreen = ({ toggleFiltersModal }) => {
    const initialFormState = {
        selectedCuisines: [],
        selectedTypes: [],
        selectedIngredients: [],
        selectedCustomTags: [],
        checkboxItems: [],
    }
    const [formState, setFormState] = useState(initialFormState)
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const { ingredients } = useIngredientsContext()
    const { recipes } = useRecipesContext()
    const { filters, setFilters, toggleFiltersActive } = useFiltersContext()
    const customTags = recipes ? selectCustomTags(recipes) : []
    const filterItems = selectFilterItems(recipeCuisines, recipeTypes, customTags)
    const sectionData = [
        {
            title: 'Cuisine',
            data: formState.checkboxItems.filter(cuisine => cuisine.group === 'cuisine')
        },
        {
            title: 'Meal',
            data: formState.checkboxItems.filter(item => item.group === 'type')
        },
        {
            title: 'Custom Tag',
            data: formState.checkboxItems.filter(item => item.group === 'customTags')
        }
    ]

    useEffect(() => {
        setFormState({
            ...formState,
            selectedIngredients: filters.selectedIngredients || [],
            checkboxItems: filters.checkboxItems.length > 0 ? filters.checkboxItems : filterItems.map(item => ({...item, checked: false }))
        })
    }, [])


    const handleFilterIngredientsChange = (selectedIngredients) => {
        setFormState({ ...formState, selectedIngredients })
    }

    const handleAddCheckboxItem = (item) => {
        setFormState({ ...formState, checkboxItems: [...formState.checkboxItems, item ] })
    }

    const handleRemoveCheckboxItem = (item) => {
        setFormState({ ...formState, checkboxItems: formState.checkboxItems.filter(checkboxItem => checkboxItem !== item) })
    }

    const toggleCheckbox = (item) => {
        setFormState({ ...formState,
            checkboxItems: formState.checkboxItems.map(checkboxItem => {
                if (checkboxItem.item === item.item){
                    return {
                        ...checkboxItem,
                        checked: !checkboxItem.checked
                    }
                }
                return checkboxItem
            })
        })
    }

    const toggleSearchModal = () => setIsSearchModalVisible(!isSearchModalVisible);

    const renderTag = ({item}) => (
        <Tag item={item} />
    )

    const renderItem = ({ item }) => {
        return (
            <FiltersScreenItem item={item} filters={filters} formState={formState} toggleCheckbox={toggleCheckbox} handleAddCheckboxItem={handleAddCheckboxItem} handleRemoveCheckboxItem={handleRemoveCheckboxItem} />
        )
    }

    const onSubmit = () => {
        setFilters(formState)
        toggleFiltersActive(true)
        toggleFiltersModal()
    }
      

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Button color={colorPack.grey} onPress={toggleFiltersModal} style={styles.closeButton}>Close</Button>
                <Button style={styles.applyButton} onPress={onSubmit}>Apply</Button>
            </View>
            <TouchableOpacity onPress={toggleSearchModal}>
                <View style={styles.searchSection}>
                    <Feather style={styles.searchIcon} name="search" size={20} color="#000"/>
                    <Text
                        style={styles.placeholderText}
                    >
                        Select Ingredient
                    </Text>
                </View>
            </TouchableOpacity>
            <MultiSelectDropdownModal
                canAddItems={false}
                isVisible={isSearchModalVisible}
                headerText="Search Ingredients"
                toggleModal={toggleSearchModal}
                itemOptions={ingredients && ingredients.map(({ id, name }) => {
                    return {
                        id: name,
                        name
                    }
                })}
                handleSelectedItemsChange={handleFilterIngredientsChange}
                selectedItems={formState.selectedIngredients}
                selectText="Select Ingredients"
                inputPlaceholderText="Search Ingredients..."
            />
            <View>
                <FlatList
                    horizontal
                    data={formState.selectedIngredients}
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
        marginRight: 10,
        flex: 1,
        color: '#424242',
    },
    placeholderText: {
        color: "#aaaaaa",
        flex: 1
    },
    searchSection: {
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
        height: height - 200,
        marginTop: 10,
        padding: 10,
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