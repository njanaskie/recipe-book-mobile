import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colorPack } from '../styles/styles'
import { Button, Title } from 'react-native-paper';
import LogoutButton from '../components/LogoutButton';

const SettingsScreen = ({ toggleLogoutModal }) => (
    <SafeAreaView style={styles.container}>
        <Title style={styles.title}>Do you want to log out?</Title>
        <LogoutButton toggleLogoutModal={toggleLogoutModal}/>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    containter: {
        height: 200,
        width: 150,
        marginBottom: 10,
        marginTop: 10,
    },
    title: {
        alignSelf: 'center',
        padding: 5
    }
})

export default SettingsScreen;