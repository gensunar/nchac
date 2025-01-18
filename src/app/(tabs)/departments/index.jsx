import { Link, Stack } from 'expo-router'
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import DepartmentPage from "../../../components/DepartmentPage/departmentList"

const Home = () => {
    // render
    return (
        <>
            <Stack.Screen options={{ headerShown: true, title: "Departments" }} />
            <ScrollView>
                <DepartmentPage />
            </ScrollView>
        </>
    )
}

export default Home
