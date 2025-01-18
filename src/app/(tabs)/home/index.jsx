import { Stack } from 'expo-router'
import React from 'react'
import Section1 from "../../../components/HomePage/Section1"
import Section2 from "../../../components/HomePage/Section2"
import Section3 from "../../../components/HomePage/Section3"
import { View, Text, ScrollView } from 'react-native'

const Home = () => {
    // render
    return (
        <>
            <ScrollView>
                <Stack.Screen options={{ headerShown: true, title: "Home" }} />
                <Section1 />
                <Section2 />
                <Section3 />
            </ScrollView>
            {/* <View>
            <Text>This is home Page of Tab</Text>
        </View> */}
        </>
    )
}

export default Home
