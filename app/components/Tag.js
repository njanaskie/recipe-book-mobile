import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colorPack } from '../styles/styles';

export default function Tag({ item }) {
    
    return (
        <View
            // key={tag}
            style={[
                styles.selectedItem,
                {
                width: item.length * 6 + 50,
                justifyContent: 'center',
                height: 30,
                borderColor: colorPack.lightgrey,
                borderWidth: 1,
                backgroundColor: 'white',
                paddingRight: 5,
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
                    color: colorPack.darkgrey,
                    fontSize: 15,
                    // fontWeight: 'bold'
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        margin: 3,
        borderRadius: 20,
        borderWidth: 2,
    },
})