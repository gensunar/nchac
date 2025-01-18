import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { setSelectedItemSlice } from "../../store/slices/selectedItemSlice"
import { useDispatch } from 'react-redux';

const Secretaries = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedItemSlice("Secretaries"))
    }, [dispatch])

// render
    return (
        <View>
            <Text>This is Secretaries Page</Text>
        </View>
    )
}

export default Secretaries
