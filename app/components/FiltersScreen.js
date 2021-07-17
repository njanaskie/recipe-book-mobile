import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { colorPack } from '../styles/styles'
import { Button, Title } from 'react-native-paper';
import LogoutButton from './LogoutButton';

const FiltersScreen = () => (
    <SafeAreaView style={styles.container}>
        <Title>Test</Title>
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

export default FiltersScreen;