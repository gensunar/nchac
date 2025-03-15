import React from 'react'
import { View, Text } from 'react-native'
import EISSignin from '../../../components/CitizenPage/TeacherLogin'
import { Stack } from 'expo-router'

const EISLogin = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true }} />
            <View>
                <EISSignin />
            </View>
        </>
    )
}

export default EISLogin
