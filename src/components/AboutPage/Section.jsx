import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Touchable, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedItemSlice } from "../../store/slices/selectedItemSlice"

const Section = () => {
    const router = useRouter()
    const selectedItem = useSelector((state) => state.selectedItem)
    const dispatch = useDispatch()
    // const [selectedItem, setSelectedItem] = useState("About NCHAC")

    const data = ["About", "Constituencies", "MAC List", "Secretaries", "Elected Members"]
    const headerItem = (item) => {
        dispatch(setSelectedItemSlice(item))
        if (item === "About") {
            router.push('/about')
        } else if (item === "Constituencies") {
            router.push('/about/constituencies')
        } else if (item === "MAC List") {
            router.push('/about/mac-list')
        } else if (item === "Secretaries") {
            router.push('/about/secretaries')
        } else if (item === "Elected Members") {
            router.push('/about/elected-members')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.items_container}>
                <FlatList showsHorizontalScrollIndicator={false} 
                data={data} 
                horizontal 
                renderItem={({ item }) => {
                    return <View style={styles.item}>
                        <TouchableOpacity style={styles.button} onPress={() => headerItem(item)}>
                            <Text style={styles.text}>{item}</Text>
                        </TouchableOpacity>
                    </View>
                }} />
            </View>
        </View>
    )
}

export default Section


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
    },
    items_container: {
        padding: 15,
    },
    item: {
        gap: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: "red",
        borderRadius: 12,
        padding: 15,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    active_text: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
    },
    active: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
    },
})