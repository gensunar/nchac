import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const index = () => {
    // render
    return (
        <>
        <Stack.Screen options={{headerShown: true, title: "Contact Us"}} />
            <View>
                <Text>This is Contact Page</Text>
            </View>
        </>
    )
}

export default index
