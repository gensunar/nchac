import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native'
import {electedMembers} from "../../../constants/maclist"


const Section3 = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)


    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>Executive Members</Text>
            </View>
            <View style={styles.items_container}>
                <FlatList showsHorizontalScrollIndicator={false} data={electedMembers} horizontal renderItem={({ item }) => {
                    return <View style={styles.render_container}>
                        <Image source={{ uri: item.iconLink }} style={styles.image} resizeMode="contain" />
                        <View style={styles.text1_container}>
                            <Text style={styles.first_row}>{item.elected_member}</Text>
                            <Text style={styles.second_row}>{item.constituency}</Text>
                        </View>
                    </View>
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 500,

    },
    text_container: {
        height: "20%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationColor: "green",
        fontFamily: "semi-bold",
        fontSize: 32,
        color: "#fff"
    },
    items_container: {
        padding: 15,

    },
    render_container: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    image: {
        height: 250,
        width: 200,
        borderRadius: 10,
    },
    text1_container: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
    },
    first_row: {
        fontFamily: "medium",
        fontSize: 18,
    },
    second_row: {
        fontFamily: "light",
        fontSize: 16,
    }
})

export default Section3
