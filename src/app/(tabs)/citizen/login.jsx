import React from 'react'
import { View, Text } from 'react-native'
import LoginPage from "../../../components/CitizenPage/LoginPage"
import { Stack } from 'expo-router'

const login = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Login" }} />
            <View>
                <LoginPage />
            </View>
        </>
    )
}

export default login
