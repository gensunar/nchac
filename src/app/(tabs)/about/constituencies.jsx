import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import ConstituenciesPage from "../../../components/AboutPage/ConstituenciesPage"

const Constituencies = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "About: Constituencies" }} />
            <View>
                <ConstituenciesPage />
            </View>
        </>
    )
}

export default Constituencies
