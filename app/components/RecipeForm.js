import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Button,
    Dimensions,
    Platform,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Text,
    TextInput
    } from "react-native";
import { useFirebaseContext } from '../context/firebase-context'
import recipeTypes from '../fixtures/recipeTypes'
import recipeCuisines from '../fixtures/recipeCuisines'
import selectCustomTags from '../selectors/custom-tags'
import { useIngredientsContext } from '../context/ingredients-context'
import { useRecipesContext } from '../context/recipes-context'
// import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MultiSelect from 'react-native-multiple-select';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from "@expo/vector-icons";
import { Button as PaperButton, Divider, Title, Subheading, Caption } from 'react-native-paper';
import MultiSelectForm from './MultiSelectForm';
import { colorPack } from '../styles/styles';
import Clipboard, { useClipboard } from '@react-native-clipboard/clipboard';
import Tag from './Tag';
import {Picker} from '@react-native-picker/picker';
import MultiSelectDropdownModal from './MultiSelectDropdownModal';

const { width, height } = Dimensions.get("window");

export default RecipeForm = (props) => {
    const { isGuest, user } = useFirebaseContext()
    const { recipes } = useRecipesContext()
    const formResults = props.results ? props.results : recipes
    const initialFormState = {
        url: '',
        ingredients: [],
        type: '',
        cuisine: '',
        // createdAt: '',
        customTags: [],
        savedBy: '',
        error: '',
        customTagOptions: []
    }
    const [state, setState] = useState(initialFormState)
    const { ingredients } = useIngredientsContext()
    const allCustomTags = formResults ? selectCustomTags(formResults) : []
    const uid = user.uid
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);
    const [isIngredientModalVisible, setIsIngredientTagModalVisible] = useState(false);
    // const [copiedText, setCopiedText] = useState('');
    // const [data, setString] = useClipboard();

    // useEffect(() => {
    //     setString('hello world');
    //   }, []);

    // const copyToClipboard = () => {
    //   Clipboard.setString('hello world');
    // };
  
    // const fetchCopiedText = async () => {
    //   const text = await Clipboard.getString();
    //   setCopiedText(text);
    // };

    // console.log('copied', copiedText)
    // console.log(ingredients)
    // console.log(state)
    
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
            // createdAt: moment(props.createdAt) || moment(),
            savedBy: props.savedBy || uid,
            customTags: props.customTags || [],
            customTagOptions: props.customTagOptions || allCustomTags,
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
            // createdAt: state.createdAt.valueOf(),
            customTags: state.customTags,
            savedBy: state.savedBy
        }

        if (!state.url) {
            setState({ ...state, error: 'Please provide recipe URL' })
        } else {
            props.onSubmit(recipe)
            setState(initialFormState)
        }
    }

    const onAddCustomTag = (newItem) => {
        // console.log(newItem, 'vs', state.customTagOptions)
        if (newItem.every(tag => state.customTagOptions.includes(tag))) {
            // console.log('1')
            setState({ ...state, customTags: newItem })
        } else {
            // console.log('2')
            setState((prevState) => ({
                ...state,
                customTagOptions: [...prevState.customTagOptions, newItem[newItem.length - 1]]
            }))
        }
    }

    // clearSelectedTypes = () => {
    //     _multiSelectType._removeAllItems();
    // };

    // clearSelectedCuisines = () => {
    //     _multiSelectCuisine._removeAllItems();
    //  };

    const renderItem = ({item}) => (
        <Tag item={item} />
    )

    return (
        <SafeAreaView style={styles.container} onSubmit={onSubmit}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
                <PaperButton color={colorPack.darkgrey} onPress={props.toggleFormModal}>Close</PaperButton>
                <Title style={styles.title}>I want to save...</Title>
                <PaperButton onPress={onSubmit}>Submit</PaperButton>
            </View>
            {/* <Text>{data}</Text>
            <View >
                <TouchableOpacity onPress={copyToClipboard}>
                    <Text>Click here to copy to Clipboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fetchCopiedText}>
                    <Text>View copied text</Text>
                </TouchableOpacity>

                <Text>{copiedText}</Text>
            </View> */}
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
                // underlineColorAndroid="transparent"
                // autoCapitalize="none"
            />
            <Divider />
            <View style={{ paddingHorizontal: 20, flexDirection: 'row'}}>
                <Title style={{ width: '30%', alignSelf: 'center'}}>Type</Title>
                {/* <TouchableOpacity onPress={clearSelectedTypes}>
                    <Text style={styles.clearButton} >Clear selection</Text>
                </TouchableOpacity> */}
                <Picker 
                    onValueChange={value => setState({ ...state, type: value })}
                    selectedValue={state.type}
                    style={{...styles.picker, flex: 1}}
                    itemStyle={styles.pickerItem}
                >
                    {recipeTypes.map(recipeType => {
                        return (
                            <Picker.Item key={recipeType} label={recipeType} value={recipeType} />
                        )
                    })}
                </Picker>
            </View>
            <Divider />
            <View style={{ paddingHorizontal: 20, flexDirection: 'row'}}>
                <Title style={{ width: '30%', alignSelf: 'center'}}>Cuisine</Title>
                {/* <TouchableOpacity onPress={clearSelectedCuisines}>
                    <Text style={styles.clearButton} >Clear selection</Text>
                </TouchableOpacity> */}
                <Picker 
                    onValueChange={value => setState({ ...state, cuisine: value })}
                    selectedValue={state.cuisine}
                    style={{...styles.picker, flex: 1}}
                    itemStyle={styles.pickerItem}
                >
                    {recipeCuisines.map(recipeCuisine => {
                        return (
                            <Picker.Item key={recipeCuisine} label={recipeCuisine} value={recipeCuisine} />
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
                        // style={{ right: 40, alignSelf: 'center' }}
                        // contentStyle={{ height: 100, width: 300 }}
                    >
                        Add ingredients
                    </PaperButton>
                </View>
                <Caption style={styles.subtitle}>Add a few key ingredients or all of them. You can use ingredients to find your recipes in the future.</Caption>
            </View>
            <MultiSelectDropdownModal
                isVisible={isIngredientModalVisible}
                headerText="Add Ingredients..."
                toggleModal={toggleIngredientModal}
                itemOptions={ingredients && ingredients.map(({ id, name }) => {
                    return {
                        id: name,
                        name
                    }
                })}
                handleSelectedItemsChange={(selectedItems) => setState({ ...state, ingredients: selectedItems })}
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
                    <Title>Custom Tags</Title>
                    <PaperButton
                        compact
                        uppercase={false}
                        onPress={toggleTagModal}
                        // style={{ right: 40, alignSelf: 'center' }}
                        // contentStyle={{ height: 100, width: 300 }}
                    >
                        Add tags
                    </PaperButton>
                </View>
                <Caption style={styles.subtitle}>Add your own tags to categorize recipes any way you want.</Caption>
            </View>
            <MultiSelectDropdownModal
                isVisible={isTagModalVisible}
                headerText="Add Tags..."
                toggleModal={toggleTagModal}
                itemOptions={state.customTagOptions.map(elem => {
                    return {
                        id: elem,
                        name: elem
                    }
                })}
                handleSelectedItemsChange={onAddCustomTag}
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
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
        // backgroundColor: 'black'
    },
    clearButton: {
        flex: 3,
        fontSize: 12,
        color: 'darkgrey',
        marginRight: 16,
        marginTop: 10
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
        // marginTop: 10
        width: 240
    },
    subtitleGroup: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    tagFlatList: {
        marginHorizontal: 20
    },
    picker: {
        // flex: 1,
        // paddingRight: 10,
        // paddingLeft: 10,
        height: 100,
    },
    pickerItem: {
        fontSize: 18,
        height: 100,
        // width: 200
    }
})