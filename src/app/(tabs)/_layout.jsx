import React from 'react'
import { View, Text } from 'react-native'
import { Tabs } from "expo-router"
import {store, persistor} from "../../store/store"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useFonts } from "expo-font"

const RootLayout = () => {

    useFonts({
        'bold': require("../../../assets/fonts/Poppins-Bold.ttf"),
        'black': require('../../../assets/fonts/Poppins-Black.ttf'),
        'regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'semi-bold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
        'medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
        'extra-light': require('../../../assets/fonts/Poppins-ExtraLight.ttf'),
        'light': require('../../../assets/fonts/Poppins-Light.ttf'), 
        'roboto-regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
        'roboto-thin': require('../../../assets/fonts/Roboto-Thin.ttf'),
        'roboto-medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
        'roboto-light': require('../../../assets/fonts/Roboto-Light.ttf'),
        'roboto-extra-light': require('../../../assets/fonts/Roboto-ExtraLight.ttf'),
        'roboto-bold': require('../../../assets/fonts/Roboto-Bold.ttf'),

    })


    // render
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
                <Tabs screenOptions={{
                    tabBarActiveTintColor: '#097969',
                    tabBarInactiveTintColor: '#01889f',
                    tabBarStyle: { backgroundColor: 'white', height: 60},
                    tabBarLabelStyle: { fontSize: 10, fontFamily: "roboto-medium", },
                    tabBarItemStyle: { position: 'relative'}, headerShown: false
                }}>
                    <Tabs.Screen name="home" options={{
                        tabBarLabel: "home", title: "Home",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-outline" size={28} color={color} />,
                    }} />
                    <Tabs.Screen name="about" options={{
                        tabBarLabel: "about", title: "About",
                        tabBarIcon: ({ color }) => <Ionicons name="information-circle-outline" size={28} color={color} />
                    }} />
                    <Tabs.Screen name="departments" options={{
                        tabBarLabel: "department", title: "Department",
                        tabBarIcon: ({ color }) =><MaterialCommunityIcons name="office-building-outline" size={28} color={color} />
                    }} />
                    <Tabs.Screen name="contact" options={{
                        tabBarLabel: "contact", title: "Contact",
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="phone" size={28} color={color} />
                    }} />
                    <Tabs.Screen name="citizen" options={{
                        tabBarLabel: "citizen", title: "Citizen", headerShown: false,
                        tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={28} color={color} />
                    }} />
                </Tabs>
            </PersistGate>
        </Provider>
    )
}


export default RootLayout

