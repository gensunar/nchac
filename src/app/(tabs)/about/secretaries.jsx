import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import Section from '../../../components/AboutPage/Section'
import SecretariesPage from '../../../components/AboutPage/SecretariesPage'

const Secretaries = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "About: Secretaries" }} />
            <View>
                <SecretariesPage />
            </View>
        </>
    )
}

export default Secretaries
