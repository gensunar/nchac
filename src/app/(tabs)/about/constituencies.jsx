import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import Section from '../../../components/AboutPage/Section'
import ConstituenciesPage from "../../../components/AboutPage/ConstituenciesPage"

const Constituencies = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "About: Constituencies" }} />
            <View>
                <ConstituenciesPage />
                {/* <Section /> */}
            </View>
        </>
    )
}

export default Constituencies
