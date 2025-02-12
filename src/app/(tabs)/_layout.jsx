import React from 'react'
import { View, Text } from 'react-native'
import { Tabs } from "expo-router"
import {store, persistor} from "../../store/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'

import { useFonts } from "expo-font"

const RootLayout = () => {

    useFonts({
        'bold': require("../../../assets/fonts/Poppins-Bold.ttf"),
        'bold-italic': require('../../../assets/fonts/Poppins-BoldItalic.ttf'),
        'black': require('../../../assets/fonts/Poppins-Black.ttf'),
        'black-italic': require('../../../assets/fonts/Poppins-BlackItalic.ttf'),
        'regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'semi-bold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
        'medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'extra-light': require('../../../assets/fonts/Poppins-ExtraLight.ttf'),
        'light': require('../../../assets/fonts/Poppins-Light.ttf')
    })


    // render
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
                <Tabs screenOptions={{
                    tabBarActiveTintColor: 'black',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: 'white' },
                    tabBarLabelStyle: { fontSize: 10, fontWeight: 'normal' },
                    tabBarItemStyle: { position: 'relative' }, headerShown: false
                }}>
                    <Tabs.Screen name="home" options={{
                        tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                    }} />
                    <Tabs.Screen name="about" options={{
                        tabBarLabel: "About", title: "About",
                        tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} />
                    }} />
                    <Tabs.Screen name="departments" options={{
                        tabBarLabel: "Department", title: "Department",
                        tabBarIcon: ({ color }) => <FontAwesome6 name="building-columns" size={24} color={color} />
                    }} />
                    <Tabs.Screen name="contact" options={{
                        tabBarLabel: "Contact", title: "Contact",
                        tabBarIcon: ({ color }) => <FontAwesome name="phone" size={24} color={color} />
                    }} />
                    <Tabs.Screen name="citizen" options={{
                        tabBarLabel: "Citizen", title: "Citizen", headerShown: false,
                        tabBarIcon: ({ color }) => <FontAwesome6 name="people-line" size={24} color={color} />
                    }} />
                </Tabs>
            </PersistGate>
        </Provider>
    )
}


export default RootLayout

