import React, { useEffect, useState } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper';
import Modal from 'react-native-modal';
import { getPreviewData } from '@flyerhq/react-native-link-preview'
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen'
import { colorPack } from '../styles/styles';

const RecipeListItem = ({ recipe }) => {
    const [urlData, setUrlData] = useState({ title: '', image: null })
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const goodTiktokTitle = recipe.url.includes('tiktok.com') && Boolean(recipe.urlTitle) && !recipe.urlTitle.includes('TikTok')
    const goodTiktokImage = recipe.url.includes('tiktok.com') && Boolean(recipe.urlImage)

    const toggleDetailsModal = () => {
        setIsDetailsModalVisible(!isDetailsModalVisible);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalVisible(false);
    };

    useEffect(() => {
        if (!recipe.urlTitle || !recipe.urlImage || goodTiktokTitle || goodTiktokImage) {
            getPreviewData(recipe.url).then(data => setUrlData({ title: data.title, image: data.image ? data.image.url : null }))  
        } else {
            setUrlData({ title: recipe.urlTitle, image: recipe.urlImage })
        }
    }, [])

    return (
        <Card style={styles.containter} onPress={toggleDetailsModal}>
            <Modal
                isVisible={isDetailsModalVisible}
                onBackdropPress={toggleDetailsModal}
                animationIn='fadeIn'
                animationOut='fadeOut'
                style={{ margin: 0 }}
            >
                <View style={{ flex: 1 }}>
                    <RecipeDetailsScreen
                        recipe={recipe}
                        urlData={urlData}
                        closeModal={closeDetailsModal}
                    />
                </View>
            </Modal>
            {urlData.image ?
                <Card.Cover source={{ uri: urlData.image }} style={styles.image}/>
                : <Image source={require('../assets/placeholder-img.png')} style={styles.image} />}
            <Card.Title title={urlData.title ? urlData.title : recipe.url} titleStyle={styles.title} titleNumberOfLines={3}/>
        </Card>
    )
}

const styles = StyleSheet.create({
    containter: {
        height: 200,
        width: 150,
        marginBottom: 10,
        marginTop: 10,
    },
    preview: {
        flexGrow: 1
    },
    image: {
        height: '60%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        overflow: 'hidden',
        fontSize: 12,
        lineHeight: 20,
        marginRight: 10,
        marginTop: 5,
    },
    header: {
        backgroundColor: colorPack.backgroundColor,
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    panelText: {
        marginLeft: 10,
        fontSize: 18
    }
})

export default RecipeListItem