import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MultiSelect from 'react-native-multiple-select';

export default function MultiSelectForm({ state }) {
    const [tagState, setTagState] = useState([])

    const onAddCustomTag = (newItem) => {
        // console.log(newItem, 'vs', state.customTagOptions)
        if (newItem.every(tag => state.customTagOptions.includes(tag))) {
            // console.log('1')
            setTagState({ ...state, customTags: newItem })
        } else {
            // console.log('2')
            setTagState((prevState) => ({
                ...state,
                customTagOptions: [...prevState.customTagOptions, newItem[newItem.length - 1]]
            }))
        }
    }
    
    return (
        <View>
            <MultiSelect
                items={state.customTagOptions.map(option => {
                    return {
                        id: option,
                        name: option
                    }
                })}
                uniqueKey="id"
                onSelectedItemsChange={onAddCustomTag}
                selectedItems={state.customTags}
                canAddItems={true}
                // onAddItem={(selectedItems) => setState({ ...state, customTags: selectedItems })}
                // onAddItem={(newItem) => setState({ ...state, customTagOptions: newItem })}
                selectText="Select Custom Tags"
                searchInputPlaceholderText="Search Custom Tags..."
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                tagContainerStyle={{ height: 30 }}
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                // displayKey="name"
                styleMainWrapper={styles.multiSelectContainer}
                styleInputGroup={styles.multiSelectInputGroup}
                searchInputStyle={styles.multiSelectSearchInputStyle}
                styleDropdownMenu={styles.multiSelectDropdownMenu}
                styleSelectorContainer={styles.multiSelectSelector}
                styleTextDropdown={styles.multiSelectTextDropdown}
                hideSubmitButton={true}
                hideDropdown={true}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        // marginBottom: 30,
        marginRight: 20,
        marginLeft: 20,
        paddingLeft: 16
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    multiSelectContainer: {
        // height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        // marginBottom: 30,
        marginRight: 20,
        marginLeft: 20,
    },
    multiSelectInputGroup: {
        marginRight: 20
    },
    multiSelectDropdownMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 16,
        // marginLeft: 16,
        marginTop: 10,
        marginBottom: 10
    },
    multiSelectSelector: {
        justifyContent: 'center',
        marginRight: 16,
        marginLeft: 16,
        marginTop: 16
    },
    multiSelectSearchInputStyle: {
        justifyContent: 'center',
        padding: 20,
        paddingRight: 10
    },
    multiSelectTextDropdown: {
        paddingLeft: 16,
    },
    subtitle: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    subtitleGroup: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    }
})
