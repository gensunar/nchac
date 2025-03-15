import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import TeacherRegistration from '../../../components/CitizenPage/TeacherRegistration'

const Teacher = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true }} />
            <View>
                <TeacherRegistration />
            </View>
        </>
    )
}

export default Teacher
