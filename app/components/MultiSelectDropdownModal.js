import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import { colorPack } from '../styles/styles';

const { width, height } = Dimensions.get("window");

export default MultiSelectDropdownModal = (props) => {
    
    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={props.toggleModal}
            style={styles.modal}
        >
            <View style={styles.header}>
                <View style={styles.panelHeader}>
                    <Text style={styles.panelText}>{props.headerText}</Text>
                    <Button onPress={props.toggleModal}>Done</Button>
                </View>
            </View>
            <View style={styles.modalView}>
                <MultiSelect
                    items={props.itemOptions}
                    fixedHeight
                    hideDropdown={true}
                    hideSubmitButton={false}
                    onSelectedItemsChange={props.handleSelectedItemsChange}
                    // searchIcon={null}
                    selectedItems={props.selectedItems}
                    selectText={props.selectText}
                    searchInputPlaceholderText={props.inputPlaceholderText}
                    selectedItemTextColor={colorPack.mint}
                    selectedItemIconColor={colorPack.mint}
                    styleMainWrapper={styles.styleMainWrapper}
                    styleInputGroup={styles.styleInputGroup}
                    styleDropdownMenu={styles.styleDropdownMenu}
                    styleTextDropdown={styles.styleTextDropdown}
                    styleTextDropdownSelected={styles.styleTextDropdown}
                    styleListContainer={styles.styleListContainer}
                    submitButtonColor={colorPack.mint}
                    submitButtonText='Hide'
                    tagRemoveIconColor={colorPack.mint}
                    tagBorderColor={colorPack.mint}
                    tagTextColor={colorPack.mint}
                    textInputProps={{ autoFocus: false }}
                    uniqueKey="id"
                />
            </View>
        </Modal>
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
    modal: {
        margin: 0,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 35,
    },
    modalView: {
        flex: 1,
        backgroundColor: colorPack.backgroundColor,
        paddingTop: 10
    },
    styleDropdownMenu: {
        borderRadius: 5,
        height: 50,
        overflow: 'hidden'
    },
    styleListContainer: {
        height: height * .75
    },
    styleMainWrapper: {
        marginHorizontal: 10
    },
    styleInputGroup: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        height: 50
    },
    styleTextDropdown: {
        color: colorPack.grey,
        marginLeft: 10,
        fontWeight: '500',
    },
    panelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10
    },
    panelText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: colorPack.darkgreen
    },
})