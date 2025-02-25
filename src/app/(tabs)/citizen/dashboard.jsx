import React from 'react'
import { View, Text } from 'react-native'
import EmployeeDashboard from "../../../components/CitizenPage/employeeDashboard"
import { useSelector } from 'react-redux'
import Login from './auth/login'

const Dashboard = () => {
    const user = useSelector((state) => state.user)

    if(!user.isLoggedIn){
       return <Login />
    }

    return (
        <View>
            <EmployeeDashboard />
        </View>
    )
}

export default Dashboard
