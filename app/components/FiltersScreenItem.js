import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper'

const FiltersScreenItem = ({ item, filters, formState, toggleCheckbox, handleAddCheckboxItem, handleRemoveCheckboxItem }) => {
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
        flexDirection: 'row',
    },
    itemTitle: {
        color: 'white',
    },
})

export default FiltersScreenItem