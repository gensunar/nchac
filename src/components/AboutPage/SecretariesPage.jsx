import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import { setSelectedItemSlice } from "../../store/slices/selectedItemSlice"
import { useDispatch } from 'react-redux';
import Section from './Section';
import { secretaries } from "../../../constants/secretaries"

const Secretaries = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedItemSlice("Secretaries"))
    }, [dispatch])

    // render
    return (
        <ScrollView>
            <View style={styles.text_container}>
                <Text style={styles.header}>Present Secretaries</Text>
            </View>
            <View><Section /></View>
            <View style={styles.child_container}>
                <View style={styles.secretaries_frame}>
                    {secretaries.map((item) => {
                        return (
                            <View style={styles.secretaries_card} key={item.id}>
                                <View style={styles.image_container}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.desig}>Designation: {item.designation}</Text>
                                <View style={styles.dept_row}>
                                    <Text style={styles.dept_header}>Subjects: </Text>
                                    <Text style={styles.dept}>{item.departments}</Text>
                                </View>
                                <Text style={styles.contact}>Contact: {item.contact}</Text>
                            </View>
                        )
                    })}
                    {/* <View style={styles.secretaries_card} key={item.id}>
                                <View style={styles.card_text}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text>{item.designation}</Text>
                                    <Text>{item.departments}</Text>
                                    <Text>{item.contact}</Text>
                                </View>
                                <View style={styles.image_container}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </View>
                            </View>   */}
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
    child_container: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    image_container: {
        alignItems: "center",
    },
    image: {
        width: "60%",
        borderRadius: 8,
        height: 220,
        marginBottom: 8,
        objectFit: "fill",
    },
    secretaries_frame: {
        borderRadius: 8,
        marginTop: 20,
    },
    card_text: {
        width: "53%"
    },
    secretaries_card: {
        width: "100%",
        backgroundColor: "#E9ecef",
        marginBottom: 16,
        backgroundColor: "#E9ecef",
        marginBottom: 16,
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 20,
    },
    // secretaries_card: {
    //     flexDirection: "row",
    //     width: '100%',
    //     backgroundColor: "#E9ecef",
    //     marginBottom: 16,
    //     borderRadius: 8,
    //     paddingLeft: 8,
    //     paddingRight: 8,
    //     paddingTop: 8,
    //     paddingBottom: 20,
    //     justifyContent: "space-between"
    // },
    name: {
        fontFamily: "semi-bold",
        fontSize: 20,
    },
    desig: {
        fontFamily: "medium",
        fontSize: 16,
    },
    dept_header: {
        fontFamily: "semi-bold"
    },
    dept_row: {
        marginTop: 10,
        fontSize: 16,
    },
    dept: {
        fontFamily: "extra-light",
        marginTop: 5,
        fontSize: 16,
        textAlign: "justify"
    },
    contact: {
        marginTop: 7,
        fontFamily: "bold",
        fontSize: 16,
    },
})
export default Secretaries
