import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import Section from '../../../components/AboutPage/Section'
import MacListPage from '../../../components/AboutPage/MacListPage'

const MacList = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: 'true', title: "About: Mac List" }} />
            <View>
                <Section />
                <MacListPage />
            </View>
        </>
    )
}

export default MacList
