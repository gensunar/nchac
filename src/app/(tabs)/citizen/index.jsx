import { Link, Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import CitizenMainPage from '../../../components/CitizenPage/CitizenMainPage'

const Home = () => {
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Citizen" }} />
            <View>
                <CitizenMainPage />
            </View>
        </>
    )
}

export default Home
