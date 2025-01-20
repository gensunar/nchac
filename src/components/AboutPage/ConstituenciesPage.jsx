import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedItemSlice } from '../../store/slices/selectedItemSlice'
import Section from './Section'
import { allMembers } from "../../../constants/maclist"

const ConstituenciesPage = () => {
    // const windowHeight = Dimensions.get('window').height;
    // const dynamicHeight = windowHeight - 200;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedItemSlice("Constituencies"))
    }, [dispatch])
    // render
    return (
        <ScrollView style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>Constituencies</Text>
            </View>
            <View><Section /></View>
            <View style={styles.child_container}>
                <Text style={styles.mac_header}>MAC Constituency List & Elected Members</Text>
                <View style={styles.header_row}>
                    <Text style={styles.header_row_text}>Constituency</Text>
                    <Text style={styles.header_row_text}>Members</Text>
                </View>
                <View style={styles.mac_frame}>
                    {allMembers.map((item, index) => {
                        return (
                            <View style={styles.mac_card} key={index}>
                                <Text style={styles.mac_name_text}>{item.constituency}</Text>
                                <Text style={styles.mac_name_text}>{item.elected_member}</Text>
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
    header_row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#FFD358",
        borderRadius: 10,
    },
    header_row_text: {
        fontFamily: "bold",
        fontSize: 20,
        padding: 20,
    },
    mac_header: {
        fontSize: 26,
        textAlign: "center",
        fontFamily: "black",
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
        width: '100%',
        marginBottom: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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

export default ConstituenciesPage
