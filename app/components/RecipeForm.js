import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Dimensions,
    Platform,
    FlatList,
    StatusBar,
    TextInput,
    Text
    } from "react-native";
import { useFirebaseContext } from '../context/firebase-context'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import { useIngredientsContext } from '../context/ingredients-context'
import { Button as PaperButton, Divider, Title, Subheading, Caption } from 'react-native-paper';
import { colorPack } from '../styles/styles';
import Tag from './Tag';
import {Picker} from '@react-native-picker/picker';
import MultiSelectDropdownModal from './MultiSelectDropdownModal';
import BannerAd from '../components/BannerAd';
import { useCustomTagsContext } from '../context/custom-tags-context';

const { width, height } = Dimensions.get("window");

export default RecipeForm = (props) => {
    const { user } = useFirebaseContext()
    const initialFormState = {
        url: '',
        ingredients: [],
        type: '',
        cuisine: '',
        customTags: [],
        savedBy: '',
        error: '',
        customTagOptions: []
    }
    const [state, setState] = useState(initialFormState)
    const { ingredients } = useIngredientsContext()
    const { customTags } = useCustomTagsContext()
    const uid = user.uid
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isIngredientModalVisible, setIsIngredientTagModalVisible] = useState(false);

    const toggleTagModal = () => {
        setIsTagModalVisible(!isTagModalVisible);
      };
    
    const toggleIngredientModal = () => {
        setIsIngredientTagModalVisible(!isIngredientModalVisible);
    };

    useEffect(() => {
        setState({
            url: props.url || '',
            ingredients: props.ingredients || [],
            type: props.type || '',
            cuisine: props.cuisine || '',
            savedBy: props.savedBy || uid,
            customTags: props.customTags || [],
            customTagOptions: props.customTagOptions || customTags,
            error: '',
        })
    }, [props])

    const onSubmit = (e) => {
        e.preventDefault()

        const recipe = {
            url: state.url,
            ingredients: state.ingredients,
            type: state.type.toLocaleString(),
            cuisine: state.cuisine.toLocaleString(),
            customTags: state.customTags,
            savedBy: state.savedBy
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            props.onSubmit(recipe)
            setState(initialFormState)
            props.toggleFormModal()
        }
    }

    const onSelectCustomTags = (newItem) => {
        if (newItem.every(tag => state.customTagOptions.includes(tag))) {
            setState({ ...state, customTags: newItem })
        }
    }

    const onAddCustomTagOption = (newItem) => {
        const newItems = newItem.map(item => item.name)
        setState({...state,
            customTagOptions: newItems
        })
    }

    const renderItem = ({item}) => (
        <Tag item={item} />
    )
    console.log(state)

    return (
        <SafeAreaView style={styles.container} >
            <View onSubmit={onSubmit}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                    <PaperButton color={colorPack.darkgrey} onPress={props.toggleFormModal}>Close</PaperButton>
                    <Title style={styles.title}>I want to save...</Title>
                    <PaperButton onPress={onSubmit}>Submit</PaperButton>
                </View>
                <View style={{ paddingHorizontal: 20, flexDirection: 'column'}}>
                    <Title>Recipe URL</Title>
                    <Caption>Copy the recipe URL into the text bar</Caption>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Insert URL'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(url) => setState({ ...state, url })}
                    value={state.url}
                />
                {state.error ? <Text style={styles.error}>{state.error}</Text> : null}
                <Divider />
                <View style={{ paddingHorizontal: 20, flexDirection: 'row'}}>
                    <Title style={{ width: '30%', alignSelf: 'center'}}>Meal Type</Title>
                    <Picker 
                        onValueChange={value => setState({ ...state, type: value })}
                        selectedValue={state.type}
                        style={{...styles.picker, flex: 1}}
                        itemStyle={styles.pickerItem}
                    >
                        {recipeTypes.map(recipeType => {
                            return (
                                <Picker.Item key={recipeType} label={recipeType === '' ? '-' : recipeType} value={recipeType} />
                            )
                        })}
                    </Picker>
                </View>
                <Divider />
                <View style={{ paddingHorizontal: 20, flexDirection: 'row'}}>
                    <Title style={{ width: '30%', alignSelf: 'center'}}>Cuisine</Title>
                    <Picker 
                        onValueChange={value => setState({ ...state, cuisine: value })}
                        selectedValue={state.cuisine}
                        style={{...styles.picker, flex: 1}}
                        itemStyle={styles.pickerItem}
                    >
                        {recipeCuisines.map(recipeCuisine => {
                            return (
                                <Picker.Item key={recipeCuisine} label={recipeCuisine === '' ? '-' : recipeCuisine} value={recipeCuisine} />
                            )
                        })}
                    </Picker>
                </View>
                <Divider />
                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 }}>
                        <Title>Ingredients</Title>
                        <PaperButton
                            compact
                            uppercase={false}
                            onPress={toggleIngredientModal}
                        >
                            Add ingredients
                        </PaperButton>
                    </View>
                    <Caption style={styles.subtitle}>Add a few key ingredients or all of them. You can use ingredients to find your recipes in the future.</Caption>
                </View>
                <MultiSelectDropdownModal
                    canAddItems={false}
                    isVisible={isIngredientModalVisible}
                    headerText="Add Ingredients..."
                    toggleModal={toggleIngredientModal}
                    itemOptions={ingredients && ingredients.map(({ id, name }) => {
                        return {
                            id: name,
                            name
                        }
                    })}
                    handleSelectedItemsChange={(selectedItems) => setState({ ...state, ingredients: selectedItems.sort() })}
                    selectedItems={state.ingredients}
                    selectText="Select Ingredients"
                    inputPlaceholderText="Search Ingredients..."
                />
                <View>
                    <FlatList
                        horizontal
                        data={state.ingredients}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        style={styles.tagFlatList}
                    />
                </View>
                <Divider />
                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 }}>
                        <Title>Tags</Title>
                        <PaperButton
                            compact
                            uppercase={false}
                            onPress={toggleTagModal}
                        >
                            Add tags
                        </PaperButton>
                    </View>
                    <Caption style={styles.subtitle}>Add custom tags to categorize recipes any way you want.</Caption>
                </View>
                <MultiSelectDropdownModal
                    canAddItems={true}
                    onAddItem={onAddCustomTagOption}
                    isVisible={isTagModalVisible}
                    headerText="Add Tags..."
                    toggleModal={toggleTagModal}
                    itemOptions={state.customTagOptions && state.customTagOptions.map(elem => {
                        return {
                            id: elem,
                            name: elem
                        }
                    })}
                    handleSelectedItemsChange={onSelectCustomTags}
                    selectedItems={state.customTags}
                    selectText="Select Custom Tags"
                    inputPlaceholderText="Search Custom Tags..."
                />
                <View>
                    <FlatList
                        horizontal
                        data={state.customTags}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        style={styles.tagFlatList}
                    />
                </View>
            </View>
            <BannerAd />
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
        justifyContent: 'space-between'
    },
    clearButton: {
        flex: 3,
        fontSize: 12,
        color: 'darkgrey',
        marginRight: 16,
        marginTop: 10
    },
    error: {
        color: 'red',
        paddingBottom: 5,
        textAlign: 'center',
    },
    title: {
        alignSelf: 'center'
    },
    line: {
        alignSelf: 'center',
        borderBottomColor: '#101010',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 60,
        width: '80%'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 120,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 16,
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
    },
    subtitle: {
        marginLeft: 20,
        marginRight: 20,
        width: 240
    },
    subtitleGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    tagFlatList: {
        marginHorizontal: 20
    },
    picker: {
        height: 100,
    },
    pickerItem: {
        fontSize: 18,
        height: 100,
    }
})