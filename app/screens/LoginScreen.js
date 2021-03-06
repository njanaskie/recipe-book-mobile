import React, { useState } from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AntDesign } from "@expo/vector-icons"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebase/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';



export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onFooterLinkPress = () => {
        navigation.navigate('RegistrationScreen')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                //
            })
            .catch(error => {
                alert(error)
            })
    }

    const onGoogleLoginPress = async () => {
        GoogleSignin.signIn()
        .then((data) => {
          const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
          return firebase.auth().signInWithCredential(credential);
        })
        .then((user) => {
            //
        })
        .catch((error) => {
          alert(error)
        });
    }

    const onAppleButtonPress = async () => {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            alert('Apple Sign-In failed - no identify token returned');
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const provider = new firebase.auth.OAuthProvider('apple.com');
        const appleCredential = provider.credential({
            idToken: identityToken,
            rawNonce: nonce
        });

        // Sign the user in with the credential
        try {
            return firebase.auth().signInWithCredential(appleCredential)
        } catch (error) {
            alert(error)
        }
    }
    

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../assets/logo2.png')}
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
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.subTitle}>Or use another provider</Text>
                </View>
                <View style={styles.signInButtons}>
                    <TouchableOpacity
                        style={styles.buttonGoogle}
                        onPress={() => onGoogleLoginPress()}>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <AntDesign name="google" color="white" style={{ paddingRight: 5 }}/>
                            <Text style={styles.buttonTitleGoogle}>Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>
                    <AppleButton
                        buttonStyle={AppleButton.Style.BLACK}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={styles.buttonApple}
                        onPress={() => onAppleButtonPress()}
                    />
                </View>           
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    line: {
        alignSelf: 'center',
        borderBottomColor: '#101010',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 26,
        width: '80%'
    },
    logo: {
        flex: 1,
        height: 100,
        width: 150,
        alignSelf: "center",
        margin: 30,
        marginTop: 100,
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
    buttonTitleGoogle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
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
    buttonApple: {
        width: 200,
        height: 45,
    },
    buttonGoogle: {
        backgroundColor: '#db4a39',
        borderRadius: 5,
        height: 45,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    signInButtons: {
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center",
    },
    subTitle: {
        fontSize: 12,
        color: '#101010',
        marginTop: 20,
    },
})