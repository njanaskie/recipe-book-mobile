import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { Subheading } from 'react-native-paper';
import { firebase } from '../firebase/firebase';
import { useNavigation } from '@react-navigation/native';
import { useFirebaseContext } from '../context/firebase-context'
import { colorPack } from '../styles/styles';

export default function LogoutButton() {
    const navigation = useNavigation(); 
    // const { logout } = useFirebaseContext()

    const onLogoutPress = () => {
        firebase.auth().signOut().then(() => {
            navigation.navigate('Login')
        });
    }
    
    return (
        <View>
            <TouchableOpacity
                style={{ padding: 20 }}
                onPress={() => onLogoutPress()}
            >
                {/* <Feather name="log-out" /> */}
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