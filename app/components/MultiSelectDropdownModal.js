import React from 'react'
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
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
                    <Button title='Done' onPress={props.toggleModal}/>
                </View>
            </View>
            <View style={styles.modalView}>
                <MultiSelect
                    items={props.itemOptions}
                    uniqueKey="id"
                    onSelectedItemsChange={props.handleSelectedItemsChange}
                    selectedItems={props.selectedItems}
                    canAddItems={true}
                    selectText={props.selectText}
                    searchInputPlaceholderText={props.inputPlaceholderText}
                    tagRemoveIconColor="#3eb489"
                    tagBorderColor="#3eb489"
                    tagTextColor="#3eb489"
                    selectedItemTextColor="#3eb489"
                    selectedItemIconColor="#3eb489"
                    styleMainWrapper={styles.multiSelectContainer}
                    styleInputGroup={styles.multiSelectInputGroup}
                    searchInputStyle={styles.multiSelectSearchInputStyle}
                    styleTextDropdown={styles.multiSelectTextDropdown}
                    styleListContainer={{ height: height - 200 }}
                    hideDropdown={true}
                    textInputProps={{ autoFocus: false }}
                    fixedHeight
                    submitButtonColor="#3eb489"
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
        // alignItems: 'center',
    },
    multiSelectInputGroup: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        justifyContent: 'center',
        height: 40,
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
        // fontSize: 16,
        // lineHeight: 16,
    },
    multiSelectTextDropdown: {
        // fontSize: 16,
        // lineHeight: 16,
        // paddingLeft: 8,
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
    },
})