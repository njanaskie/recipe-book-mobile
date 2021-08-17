import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colorPack } from '../styles/styles';

export default function Tag({ item, darkMode }) {
    
    return (
        <View
            // key={tag}
            style={[
                styles.selectedItem,
                {
                justifyContent: 'center',
                // width: item.length * 8 + 40,
                height: 30,
                borderColor: darkMode ? colorPack.darkgreen : colorPack.lightgrey,
                borderWidth: 1,
                backgroundColor: darkMode ? colorPack.darkgreen : 'white',
                },
                // tagContainerStyle || {}
                ]
            }
        >
            <Text
                style={[
                    {
                    flex: 1,
                    // color: '#525966',
                    color: darkMode ? 'white' : colorPack.darkgrey,
                    fontSize: 13,
                    fontWeight: 'bold'
                    },
                    // styleTextTag && styleTextTag,
                    // fontFamily ? { fontFamily } : {}
                ]}
                numberOfLines={1}
            >
                {item}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    selectedItem: {
        flex: -1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 15,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 10,
        borderWidth: 2,
    },
})