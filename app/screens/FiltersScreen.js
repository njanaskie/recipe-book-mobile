import React, { useState, useEffect } from 'react'
import { Dimensions, FlatList, SafeAreaView, SectionList, StyleSheet, Text, View } from 'react-native'
import { Caption, Divider } from 'react-native-paper';
import { colorPack } from '../styles/styles'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import { Button } from 'react-native-paper'
import { Feather } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
import Tag from '../components/Tag'
import selectFilterItems from '../selectors/filter-items'
import getObject from '../selectors/get-object'
import FiltersScreenItem from '../components/FiltersScreenItem'
import { useFiltersContext } from '../context/filters-context'
import { useCustomTagsContext } from '../context/custom-tags-context';

const { width, height } = Dimensions.get("window");

const FiltersScreen = ({ toggleFiltersModal }) => {
    const initialFormState = {
        checkboxItems: [],
    }
    const [formState, setFormState] = useState(initialFormState)
    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const { ingredients } = useIngredientsContext()
    const { customTags } = useCustomTagsContext()
    const { filterRecipes } = useRecipesContext()
    const { filters, setFilters, toggleFiltersActive } = useFiltersContext()
    const filterItems = selectFilterItems(recipeCuisines, recipeTypes, customTags)
    const sectionData = [
        {
            title: 'Cuisine',
            data: formState.checkboxItems.filter(cuisine => cuisine.group === 'cuisine')
        },
        {
            title: 'Meal Type',
            data: formState.checkboxItems.filter(item => item.group === 'type')
        },
        {
            title: 'Tags',
            data: formState.checkboxItems.filter(item => item.group === 'customTags')
        }
    ]
    const selectedCheckboxItems = getObject(formState.checkboxItems)
    const selectedFilters = formState.ingredients && formState.ingredients.length > 0 ? {...selectedCheckboxItems, ingredients: formState.ingredients} : selectedCheckboxItems

    useEffect(() => {
        setFormState({
            ...formState,
            ingredients: filters.ingredients || [],
            checkboxItems: filters.checkboxItems.length > 0 ? filters.checkboxItems : filterItems.map(item => ({...item, checked: false }))
        })
    }, [])


    const handleFilterIngredientsChange = (ingredients) => {
        setFormState({ ...formState, ingredients })
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
            <FiltersScreenItem
                item={item}
                filters={filters}
                formState={formState}
                toggleCheckbox={toggleCheckbox}
            />
        )
    }

    const onSubmit = async () => {
        filterRecipes(selectedFilters)
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
            <Caption style={styles.subtitle}>Choose ingredients by what you're craving... or by what is in your pantry!</Caption>
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
                selectedItems={formState.ingredients}
                selectText="Select Ingredients"
                inputPlaceholderText="Search Ingredients..."
            />
            <View>
                <FlatList
                    horizontal
                    data={formState.ingredients}
                    renderItem={renderTag}
                    keyExtractor={item => item}
                    style={styles.tagFlatList}
                />
            </View>
            <Divider style={{ backgroundColor: 'grey'}}/>
            <Caption style={styles.subtitle}>Narrow your options by cuisine, meal, or a custom tag that you have defined.</Caption>
            <SafeAreaView style={styles.sectionContainer}>
                <SectionList
                    sections={sectionData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={renderItem}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.subheading}>{title}</Text>
                    )}
                />
            </SafeAreaView>
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
    sectionContainer: {
        maxHeight: height * .62,
        paddingHorizontal: 10,
    },
    subheading: {
        backgroundColor: colorPack.darkgreen,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        margin: 10,
        paddingBottom: 5,
        color: 'white'
    },
    tagFlatList: {
        margin: 10,
        // height: 35
    },
})

export default FiltersScreen;