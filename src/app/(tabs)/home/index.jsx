import { Stack } from 'expo-router'
import React, { Component } from 'react'
import Section1 from "../../../components/HomePage/Section1"
import Section2 from "../../../components/HomePage/Section2"
import Section3 from "../../../components/HomePage/Section3"
import { View, Text, ScrollView, FlatList } from 'react-native'
import Section4 from '../../../components/HomePage/Section4'
import Section5 from '../../../components/HomePage/Section5'

const Home = () => {

    const data = [
        Section1, Section2, Section3, Section4, Section5
    ]
    // render
    return (
        <>

            <Stack.Screen options={{ headerShown: true, title: "Home" }} />
            <FlatList data= {data} keyExtractor={(item, index) => index.toString()} 
            renderItem={({item: Component}) => <Component />}
            />
        </>
    )
}

export default Home
