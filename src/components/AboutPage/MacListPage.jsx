import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { setSelectedItemSlice } from "../../store/slices/selectedItemSlice"
import { useDispatch } from 'react-redux'
import Section from './Section'
import { macList } from '../../../constants/maclist'
import { Colors } from '../../../constants/Colors'

const MacListPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedItemSlice("MAC List"))
    }, [dispatch])

    // render
    return (
        <ScrollView style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>MAC List</Text>
            </View>
            <View><Section/></View>
            <View style={styles.child_container}>
                <Text style={styles.mac_header}>MAC Constituency List</Text>
                <View style={styles.mac_frame}>
                    {macList.map((item, index) => {
                        return (
                            <View style={styles.mac_card} key={index}>
                                <Image source={{ uri: item.iconLink }} style={{ height: 200, width: 200 }} />
                                <Text style={styles.mac_name_text}>{item.elected_member}</Text>
                                <Text>{item.constituency}</Text>
                            </View>
                        )
                    })}

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    text_container: {
        height: 80,
        backgroundColor: Colors.primary,
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
    mac_header: {
        fontSize: 26,
        textAlign: "center",
        fontFamily: "black"
    },
    child_container: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    mac_frame: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderRadius: 8,
        marginTop: 20,
    },
    mac_card: {
        width: '48%',
        marginBottom: 16,
        backgroundColor: '#E9ecef',
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    mac_name_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#343a40',
        textAlign: 'center',
        fontFamily: "semi-bold"
    },
})

export default MacListPage
