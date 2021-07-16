import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Modal from 'react-native-modal'
import { Title, IconButton } from 'react-native-paper'
import { Feather } from "@expo/vector-icons"
import LogoutButton from './LogoutButton'
import Tag from './Tag'
import { colorPack } from '../styles/styles'
import SettingsScreen from './SettingsScreen'

export const BottomSheetHeader = () => {
    const [isScreenVisible, setIsScreenVisible] = useState(false);

    const toggleSettingsScreen = () => setIsScreenVisible(!isScreenVisible);

    return (
        <View style={styles.header}>
            {/* <View style={styles.panelHeader}> */}
            <View style={styles.panelHandle} />
                <View style={styles.headerItems}>
                    <Title>My Recipes</Title>
                    <View style={styles.headerItemsRight}>
                        <View style={{ width: 85, paddingRight: 5 }} >
                            <Tag item='Filters' />
                        </View>
                        <TouchableOpacity onPress={toggleSettingsScreen}>
                            <Feather name="settings" size={20}/>
                        </TouchableOpacity>
                        {/* <Modal isVisible={isScreenVisible} style={{ margin: 0 }}>
                            <View style={{ flex: 1, backgroundColor: colorPack.backgroundColor, borderRadius: 5 }}>
                                <SettingsScreen />
                            </View>
                        </Modal> */}
                    </View>
                </View>
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: colorPack.backgroundColor,
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
        alignSelf: 'center',
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    headerItems: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginRight: 30,
        marginLeft: 30
    },
    headerItemsRight: {
        flexDirection: 'row',
        alignItems: 'center',
    }
  });

export default BottomSheetHeader;