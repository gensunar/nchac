import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'
import ContactUs from '../../../components/ContactPage/Contactus'

const index = () => {
    // render
    return (
        <>
        <Stack.Screen options={{headerShown: true, title: "Contact Us"}} />
            <View>
               <ContactUs />
            </View>
        </>
    )
}

export default index
