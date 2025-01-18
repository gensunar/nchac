import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedItemSlice } from '../../store/slices/selectedItemSlice'
import Section from './Section'
import { macList } from "../../../constants/maclist"

const ConstituenciesPage = () => {
    // const windowHeight = Dimensions.get('window').height;
    // const dynamicHeight = windowHeight - 200;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSelectedItemSlice("Constituencies"))
    }, [dispatch])
    // render
    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>Constituencies</Text>
            </View>
            <View><Section /></View>
            <View style={styles.child_container}>
                <Text>MAC Constituency List & Elected Members</Text>
                <View style={styles.mac_frame}>
                    {macList.map((item, index) => {
                        console.log(item)
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

export default ConstituenciesPage
