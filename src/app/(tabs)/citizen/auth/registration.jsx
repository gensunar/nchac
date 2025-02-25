import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import RegistrationPage from '../../../../components/Auth/RegistrationPage'

const registration = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Registration" }} />
            <View>
               <RegistrationPage />
            </View>
        </>
    )
}

export default registration
