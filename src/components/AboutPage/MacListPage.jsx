import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { setSelectedItemSlice } from "../../store/slices/selectedItemSlice"
import { useDispatch } from 'react-redux'

const MacListPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedItemSlice("MAC List"))
    }, [dispatch])

    // render
    return (
        <View>
            <Text>This is MAC LList Page fro </Text>
        </View>
    )
}

export default MacListPage
