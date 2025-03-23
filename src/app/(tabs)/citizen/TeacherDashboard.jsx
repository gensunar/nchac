import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import EISLogin from '../citizen/EISLogin'

const TeacherDashboard = () => {
    const teacherUser = useSelector((state) => state.teacher)
    console.log(teacherUser)
    if(!teacherUser.isLoggedIn){
        return <EISLogin />
    }

    return (
        <View>
            <Text>This is teacher Dashboard</Text>
        </View>
    )
}

export default TeacherDashboard
