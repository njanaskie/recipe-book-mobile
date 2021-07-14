import React, { useState } from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase, googleAuthProvider } from '../firebase/firebase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import { useFirebaseContext } from '../context/firebase-context'



export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const { login } = useFirebaseContext()


    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                if (response && uid) {
                    console.log(response)
                    navigation.navigate('Home', {user: response.user})
                }
            })
            .catch(error => {
                alert(error)
            })
    }

    const onGoogleLoginPress = async () => {
        GoogleSignin.signIn()
        .then((data) => {
          // Create a new Firebase credential with the token
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          // Login with the credential
          return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
          // If you need to do anything with the user, do it here
          // The user will be logged in automatically by the
          // `onAuthStateChanged` listener we set up in App.js earlier
          navigation.navigate('Home', {user})
        })
        .catch((error) => {
        //   const { code, message } = error;
          // For details of error codes, see the docs
          // The message contains the default Firebase string
          // representation of the error
          alert(error)
        });

        // try {
        //     await GoogleSignin.hasPlayServices();
        //     const userInfo = await GoogleSignin.signIn();
        //     navigation.navigate('Placeholder', {user: userInfo})
        //     // this.setState({ userInfo: userInfo, loggedIn: true });
        // } catch (error) {
        //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //       // user cancelled the login flow
        //     } else if (error.code === statusCodes.IN_PROGRESS) {
        //       // operation (f.e. sign in) is in progress already
        //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //       // play services not available or outdated
        //     } else {
        //       // some other error happened
        //     }
        // }
    }
    

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/app-logo.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
                <View style={styles.line} />
                <View style={styles.footerView}>
                    <Text style={styles.subTitle}>Or sign in with</Text>
                </View>              
                <TouchableOpacity
                    style={styles.buttonGoogle}
                    onPress={() => onGoogleLoginPress()}>
                    <Text style={styles.buttonTitle}>Google</Text>
            </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

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
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#3eb489',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    buttonGoogle: {
        backgroundColor: '#db4a39',
        marginLeft: 120,
        marginRight: 120,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    subTitle: {
        fontSize: 12,
        color: '#101010',
        marginTop: 20,
    },
})