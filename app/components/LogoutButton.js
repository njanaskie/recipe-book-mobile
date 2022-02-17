import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Subheading } from 'react-native-paper';
import { firebase } from '../firebase/firebase';
import { colorPack } from '../styles/styles';

export default function LogoutButton({toggleLogoutModal}) {

    const onLogoutPress = () => {
        firebase.auth().signOut().then(() => {
            toggleLogoutModal()
        });
    }
    
    return (
        <View>
            <TouchableOpacity
                style={{ padding: 20 }}
                onPress={onLogoutPress}
            >
                <View style={styles.button}>
                    <Subheading style={styles.text}> Log Out</Subheading>
                </View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: colorPack.darkgreen,
        borderRadius: 5,
        borderWidth: 2,
        paddingLeft: 40,
        paddingRight: 40
    },
    text: {
        color: '#FFFFFF',
        fontWeight: "bold"
    }
})