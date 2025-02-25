import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/Colors'
import { Link } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

const CitizenMainPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.main_card}>
                <View style={styles.card}>
                    <AntDesign name="notification" size={32} color={Colors.primary} style={styles.icon} />
                    <Text style={styles.text}>Circulars & Notification</Text>

                </View>
                <View style={styles.card}>
                    <Ionicons name="person-outline" size={32} color={Colors.primary} style={styles.icon} />
                    <Link href="/citizen/Dashboard"><Text style={styles.text}>Employee Information</Text></Link>
                </View>
                <View style={styles.card}>
                    <Ionicons name="book-outline" size={32} color={Colors.primary} style={styles.icon} />
                    <Link href="/citizen/Teacher"><Text style={styles.text}>Education Department</Text></Link>
                </View>
                <View style={styles.card}>
                    <Entypo name="man" size={32} color={Colors.primary} style={styles.icon} />
                    <Text style={styles.text}>List of  PA to EM's</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    main_card: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 7,
        justifyContent: "space-between",
    },
    card: {
        display: "flex",
        width: "49%",
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 25,
        paddingBottom: 25,
        marginBottom: 10,
    },
    text: {
        fontFamily: "regular",
        textAlign: "center",
    },
    icon: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "700"
    }
})

export default CitizenMainPage
