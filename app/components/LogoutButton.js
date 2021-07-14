import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { firebase } from '../firebase/firebase';
import { useNavigation } from '@react-navigation/native';
import { useFirebaseContext } from '../context/firebase-context'

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
                <Feather name="log-out" />
            </TouchableOpacity>
        </View>
    )

}