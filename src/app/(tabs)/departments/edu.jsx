import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const Edu = () => {
// render
    return (
        <>
        <Stack.Screen options={{headerShown: true, title:""}} />
        <View>
            <Text>This is Education Depatrtmen</Text>
        </View>
        </>
    )
}

export default Edu
