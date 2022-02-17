import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Modal from 'react-native-modal'
import { Title } from 'react-native-paper'
import { Feather } from "@expo/vector-icons"
import Tag from './Tag'
import { colorPack } from '../styles/styles'
import SettingsScreen from '../screens/SettingsScreen'
import FiltersScreen from '../screens/FiltersScreen'
import { useFiltersContext } from '../context/filters-context'
import { useRecipesContext } from '../context/recipes-context'

export const BottomSheetHeader = () => {
    const [isLogoutVisible, setIsLogoutVisible] = useState(false);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const { filters, clearFilters } = useFiltersContext();
    const { handleRefresh } = useRecipesContext();

    const toggleLogoutModal = () => setIsLogoutVisible(!isLogoutVisible);
    const toggleFiltersModal = () => setIsFiltersVisible(!isFiltersVisible);
    const onClearFilters = () => {
        clearFilters()
        handleRefresh()
    }

    return (
        <View style={styles.header}>
            <View style={styles.panelHandle} />
                <View style={styles.headerItems}>
                    <Title style={styles.title}>My Recipes</Title>
                    <View style={styles.headerItemsRight}>
                        {filters.filtersActive && 
                            <TouchableOpacity onPress={onClearFilters}>
                                <Feather name="x-circle" size={22} />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={toggleFiltersModal}>
                            <View style={{ width: 85, paddingRight: 6, marginHorizontal: 5 }} >
                                <Tag item='Filters' darkMode={true}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleLogoutModal}>
                            <Feather name="log-out" size={28}/>
                        </TouchableOpacity>
                        <Modal
                            animationIn='fadeIn'
                            animationOut='fadeOut'
                            isVisible={isFiltersVisible}
                            onBackdropPress={toggleFiltersModal}
                            style={{ margin: 0 }}
                        >
                            <View style={{ flex: 1, backgroundColor: colorPack.darkgreen, borderRadius: 5 }}>
                                <FiltersScreen toggleFiltersModal={toggleFiltersModal}/>
                            </View>
                        </Modal>
                        <Modal
                            animationIn='fadeIn'
                            animationOut='fadeOut'
                            isVisible={isLogoutVisible}
                            onBackdropPress={toggleLogoutModal}
                        >
                            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5 }}>
                                <SettingsScreen toggleLogoutModal={toggleLogoutModal}/>
                            </View>
                        </Modal>
                    </View>
                </View>
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
    },
    title: {
        fontWeight: 'bold',
        color: colorPack.darkgreen
    }
  });

export default BottomSheetHeader;