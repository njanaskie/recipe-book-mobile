import React, { useState } from 'react'
import { Dimensions, StyleSheet, Image, Text, View, FlatList, Linking, ScrollView } from 'react-native'
import { colorPack } from '../styles/styles';
import Tag from '../components/Tag'
import { Title, Subheading, Button, Menu, Paragraph, Provider, Card, IconButton } from 'react-native-paper';
import { Feather } from "@expo/vector-icons";
import EditRecipe from '../components/EditRecipe';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { removeRecipeService } from '../services/recipeServices';
import { useRecipesContext } from '../context/recipes-context';

const { width, height } = Dimensions.get("window");

export default function RecipeDetailsScreen ({ recipe, urlData, closeModal }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const topLevelTags = ([recipe.type, recipe.cuisine].concat(recipe.customTags)).filter(tag => tag);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
    const { recipeDispatch } = useRecipesContext()

    const openMenu = () => setIsMenuVisible(true);
  
    const closeMenu = () => setIsMenuVisible(false);

    const openRemoveModal = () => setIsRemoveModalVisible(true);
  
    const closeRemoveModal = () => setIsRemoveModalVisible(false);

    const handleRemoveRecipe = () => {
        closeRemoveModal()
        removeRecipeService({ id: recipe.id })
        recipeDispatch({ type: 'REMOVE_RECIPE', id: recipe.id })
    }

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
      };

    const renderItem = ({item}) => (
        <Tag item={item}/>
    )

    const numColumns = Math.ceil(recipe.ingredients.length / 2)

    return (
        <View style={styles.container}>
            {urlData.image ? <Image source={{ uri: urlData.image }} style={styles.image}/> : <Image source={require('../assets/placeholder-img.png')} style={styles.image} />}
            <LinearGradient colors={['white', colorPack.backgroundColor]} style={styles.linearGradient}/>
            <Title style={styles.title} numberOfLines={2}>{urlData.title ? urlData.title : recipe.url}</Title>
            <View >
                    <FlatList
                        horizontal
                        data={topLevelTags}
                        renderItem={({item}) => (
                            <Text style={{ color: colorPack.darkgrey, }}>{item}</Text>
                        )}
                        keyExtractor={item => item}
                        contentContainerStyle={styles.topLevelTags}
                        ItemSeparatorComponent={() => <Text> • </Text>}
                        ListEmptyComponent={<Text style={styles.emptyMessage}>No Tags</Text>}
                    />
            </View>
            <Subheading style={styles.subTitle}>Ingredients</Subheading>
            <View style={styles.ingredientsContainer}>
                <ScrollView
                    horizontal
                >
                    <FlatList
                        numColumns={numColumns}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        data={recipe.ingredients}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        style={styles.ingredients}
                        ListFooterComponent={<View style={{width:15}}></View>}
                        ListEmptyComponent={<Text style={styles.emptyMessage}>No Ingredients</Text>}
                    />   
                </ScrollView>
            </View>
            <Button icon='open-in-new' mode='outlined' color='white' style={styles.link} onPress={() => Linking.openURL(recipe.url)}>Go To Recipe</Button>
            {/* <View> */}
                <View style={styles.topLeftButton}>
                    <IconButton icon="close" size={24} color={colorPack.darkgrey} onPress={closeModal}/>
                </View>
                <Provider>
                    <View style={styles.topRightButton}>
                    {/* <IconButton icon="menu" size={24} color={colorPack.darkgrey} onPress={openMenu}/> */}
                    <Menu
                        visible={isMenuVisible}
                        onDismiss={closeMenu}
                        anchor={
                            <Button onPress={openMenu}>
                                    <Feather name="menu" size={24} color={colorPack.darkgrey} />
                            </Button>
                        }
                    >
                        <Menu.Item onPress={toggleModal} title='Edit Recipe'/>
                        <Menu.Item onPress={openRemoveModal} title='Remove Recipe' titleStyle={{ color: 'red' }}/>
                    </Menu>
                    </View>
                </Provider>
                <Modal
                    isVisible={isRemoveModalVisible}
                >
                    <View>
                        <Card>
                            <Card.Title title='Confirm Removal' />
                            <Card.Content>
                                <Paragraph>Are you sure you want to remove this recipe?</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={closeRemoveModal}>Cancel</Button>
                                <Button onPress={handleRemoveRecipe}>Remove</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                </Modal>
                <Modal
                    isVisible={isModalVisible}
                    style={{ margin: 0 }}
                >
                <View style={{ flex: 1, backgroundColor: colorPack.backgroundColor, borderRadius: 5 }}>
                    <EditRecipe recipe={recipe} toggleEditModal={toggleModal}/>
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
                </Modal>
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorPack.backgroundColor,
        flex: 1,
        height: height,
    },
    image: {
        height: height * .45,
        width: width,
        alignSelf: 'center',
    },
    imageContainer: {
        shadowColor: 'white',
        shadowOffset: {width: 0, height: 8},
        shadowRadius: 10,
        shadowOpacity: 8,
    },
    linearGradient: {
        width,
        height: 30,
    },
    topLevelTags: {
        bottom: 10,
        paddingBottom: 0,
        padding: 10,
        marginRight: 10
    },
    ingredients: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },
    ingredientsContainer: {
        marginBottom: 30
    },
    title: {
        paddingTop: 10,
        color: colorPack.darkgrey,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    subTitle: {
        color: colorPack.darkgrey,
        paddingLeft: 10,
        paddingTop: 10
    },
    topLeftButton: {
        position: 'absolute',
        bottom: height * .88,
        left: 15,
        backgroundColor: 'white',
        borderRadius: 40 / 2,
        height: 40, 
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topRightButton: {
        position: 'absolute',
        bottom: height * .88,
        right: 15,
        backgroundColor: 'white',
        borderRadius: 40 / 2,
        height: 40, 
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        // position: 'absolute',
        // bottom: '10%',
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: colorPack.mint,
        borderColor: colorPack.mint
    },
    emptyMessage: {
        color: colorPack.darkgrey,
        fontSize: 12,
        fontWeight: '200'
    }
})