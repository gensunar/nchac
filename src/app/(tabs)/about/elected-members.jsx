import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import Section from '../../../components/AboutPage/Section'
import ElectedMembersPage from "../../../components/AboutPage/MembersPage"

const ElectedMembers = () => {
    // render
    return (
        <>
        <Stack.Screen options={{headerShown: true, title: "About: Elected Members"}} />
            <View>
                <Section />
                <ElectedMembersPage />
            </View>
        </>
    )
}

export default ElectedMembers
