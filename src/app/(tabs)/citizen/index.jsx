import { Link, Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

const index = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Citizen" }} />
            <View>
                <Text>This is Citizen Page</Text>
                <Link href="/citizen/registration">Go to Registration</Link>
                <Link href="/citizen/teacher">Go to Teacher Login System</Link>
                <Link  href="/citizen/dashboard"><Text >Dashboard</Text></Link>

            </View>
        </>
    )
}

export default index
