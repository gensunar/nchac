import { Link, Stack } from 'expo-router'
import { View, Text } from 'react-native'
import AboutPage from "../../../components/AboutPage/AboutPage"
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {  setSelectedItemSlice } from '../../../store/slices/selectedItemSlice'
import { useRoute, useNavigation } from '@react-navigation/native'

const About = () => {
    // render
    return (
        <>
        <Stack.Screen options={{ headerShown: true, title: "About" }} />
            <View>
                <AboutPage />
            </View>
        </>
    )
}

export default About
