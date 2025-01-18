import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { setSelectedItemSlice } from '../../store/slices/selectedItemSlice'
import { useDispatch } from 'react-redux'

const Members = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSelectedItemSlice("Elected Members"))
    }, [dispatch])

// render
    return (
        <View>
            <Text>This Is Members Page</Text>
        </View>
    )
}

export default Members
