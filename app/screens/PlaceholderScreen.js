import React from 'react'
import { Text, View } from 'react-native'
import LogoutButton from '../components/LogoutButton'
import AppWrapper from '../navigation/AppWrapper'

export default function PlaceholderScreen() {
    
    return (
        <AppWrapper>
            <View>
                <Text>Placeholder Screen</Text>
                <LogoutButton />
            </View>
        </AppWrapper>
    )

}
