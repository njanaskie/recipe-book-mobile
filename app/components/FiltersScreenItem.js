import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { useFiltersContext } from '../context/filters-context'

const FiltersScreenItem = ({ item, filters }) => {
    const [isChecked, setIsChecked] = useState(
        filters.cuisines.includes(item.item) || 
        filters.types.includes(item.item) ||
        filters.customTags.includes(item.item));
    const { addFilterCheckboxItem, removeFilterCheckboxItem } = useFiltersContext()

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);

        if (isChecked) {
            removeFilterCheckboxItem(item)
        } else {
            addFilterCheckboxItem(item)
        }
    }

    return (
        // <Text></Text>
        <TouchableOpacity onPress={toggleCheckbox}>
            <View style={styles.item}>
                <Checkbox
                    status={isChecked ? 'checked' : 'unchecked' }
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