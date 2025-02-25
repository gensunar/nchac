import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { setSelectedItemSlice } from '../../store/slices/selectedItemSlice'
import { useDispatch } from 'react-redux'
import Section from './Section'
import { electedMembers } from '../../../constants/maclist'
import { Link } from 'expo-router'
import { Colors } from '../../../constants/Colors'

const Members = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSelectedItemSlice("Elected Members"))
    }, [dispatch])

    // render
    return (
        <ScrollView style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>Elected Members</Text>
            </View>
            <View><Section /></View>
            <View style={styles.child_container}>
                <Text style={styles.mac_header}>Elected Members</Text>
                <View style={styles.mac_frame}>
                    {electedMembers.map((item, index) => {
                        return (
                            <Link style={styles.mac_card}
                                href={{
                                    pathname: '/about/[id]',
                                    params: { memberId: item.id },
                                    state: {item}
                                }}  key={index}>
                                <View>
                                    <Image source={{ uri: item.iconLink }} style={{ height: 200, width: 200 }} />
                                    <Text style={styles.mac_name_text}>{item.elected_member}</Text>
                                    <Text style={styles.mac_name_text}>{item.constituency}</Text>
                                </View>
                            </Link>
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
        fontSize: 32,
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

export default Members
