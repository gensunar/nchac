import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import TeacherLogin from '../../../components/CitizenPage/TeacherLogin'

const teacher = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true }} />
            <View>
                <TeacherLogin />
            </View>
        </>
    )
}

export default teacher
