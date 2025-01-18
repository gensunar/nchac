import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { setSelectedItemSlice } from '../../store/slices/selectedItemSlice'
import { useDispatch } from 'react-redux';
import Section from './Section';

const AboutPage = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     (setSelectedItemSlice("About NCHAC"))
    // }, [dispatch])

    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>About NCHAC</Text>
            </View>
            <View><Section /></View>
            <View style={styles.child_container}>
                <Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    text_container: {
        height: 100,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        textAlign: "center",
        textDecorationColor: "green",
        fontWeight: "bold",
        fontSize: 32,
        color: "#fff"
    },
    child_container: {
        backgroundColor: "yellow",

    }
})
export default AboutPage
