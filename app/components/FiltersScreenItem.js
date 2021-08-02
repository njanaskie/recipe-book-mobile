import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Checkbox } from 'react-native-paper'

const FiltersScreenItem = ({ item }) => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
        !item.checked
    }

    console.log(item)

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