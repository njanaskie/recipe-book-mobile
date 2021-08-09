import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useFiltersContext } from '../context/filters-context'

const FiltersScreenItem = ({ item, filters, formState, toggleCheckbox, handleAddCheckboxItem, handleRemoveCheckboxItem }) => {
    // const [isChecked, setIsChecked] = useState(false
        // filters ?
            // filters.selectedCuisines.includes(item.item) || 
            // filters.selectedTypes.includes(item.item) ||
            // filters.selectedCustomTags.includes(item.item)
        // :
        //     formState.selectedCuisines.includes(item.item) || 
        //     formState.selectedTypes.includes(item.item) ||
        //     formState.selectedCustomTags.includes(item.item)
        // );

    // const toggleCheckbox = () => {
    //     setIsChecked(!isChecked);

    //     if (isChecked) {
    //         handleRemoveCheckboxItem(item)
    //     } else {
    //         handleAddCheckboxItem(item)
    //     }
    // }

    return (
        <TouchableOpacity onPress={() => toggleCheckbox(item)}>
            <View style={styles.item}>
                <Checkbox
                    status={item.checked ? 'checked' : 'unchecked' }
                    uncheckedColor='white'
                    style={{ tintColor: 'white' }}
                    color='white'
                />
                <Text style={styles.itemTitle}>{item.item}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemTitle: {
        color: 'white',
    },
})

export default FiltersScreenItem