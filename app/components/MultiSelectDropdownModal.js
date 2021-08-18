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
                    hideSubmitButton={true}
                    onSelectedItemsChange={props.handleSelectedItemsChange}
                    // searchIcon={null}
                    selectedItems={props.selectedItems}
                    selectText={props.selectText}
                    searchInputPlaceholderText={props.inputPlaceholderText}
                    selectedItemTextColor={colorPack.mint}
                    selectedItemIconColor={colorPack.mint}
                    styleMainWrapper={styles.multiSelectContainer}
                    styleInputGroup={styles.multiSelectInputGroup}
                    // searchInputStyle={styles.multiSelectSearchInputStyle}
                    // styleSelectorContainer={{ marginBottom: 30}}
                    styleTextDropdown={styles.multiSelectTextDropdown}
                    styleTextDropdownSelected={styles.multiSelectTextDropdown}
                    styleListContainer={{ height: height * .75 }}
                    submitButtonColor={colorPack.mint}
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
        // elevation: 5,
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
        // borderRadius: 5,
        paddingTop: 10
        // // alignItems: 'center',
        // justifyContent: 'center'
    },
    multiSelectContainer: {
        // borderRadius: 5,
        // overflow: 'hidden',
        // backgroundColor: 'black',
        // marginBottom: 30,
        paddingRight: 10,
        paddingLeft: 10,
        // paddingTop: 10,
        justifyContent: 'center',
    },
    multiSelectInputGroup: {
        paddingRight: 10,
        paddingLeft: 10,
        // paddingBottom: 10,
        justifyContent: 'center',
        height: 40,
        // fontStyle: colorPack.mint
        // backgroundColor: 'orange',
    },
    multiSelectDropdownMenu: {
        justifyContent: 'center',
        // alignItems: 'center',
        // marginRight: 16,
        // marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    multiSelectSelector: {
        justifyContent: 'center',
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16,
    },
    multiSelectSearchInputStyle: {
        // fontSize: 14,
        // position: 'relative',
    },
    multiSelectTextDropdown: {
        fontSize: 14,
        // lineHeight: 16,
        // paddingLeft: 8,
        color: colorPack.grey,
        marginLeft: 10,
        fontWeight: '500'
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