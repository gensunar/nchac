import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '../../../constants/Colors';

const Section4 = () => {
    const data = [
        {
            id: 1,
            icon: <FontAwesome5 name="crown" size={32} color={Colors.secondary} />,
            title: "History",
            description: "Dima Hasao was an integral part of the Cachari Kingdom of old and was inhabited by the Dimasa Kacharis as well as other tribal groups."
        },
        {
            id: 2,
            icon: <FontAwesome6 name="hands-holding" size={32} color={Colors.secondary} />,
            title: "Culture",
            description: "The district is populated by various tribes and races who maintain their own dialect, culture, customs and way of living."
        },
        {
            id: 3,
            icon: <Ionicons name="people" size={32} color={Colors.secondary} />,
            title: "Community",
            description: "There are 13 tribal groups inhabiting the district along with a significant number of non-tribal groups like Bengali, Nepali and Assamese."
        },
        {
            id: 4,
            icon: <MaterialIcons name="festival" size={32} color={Colors.secondary} />,
            title: "Festivals",
            description: "Busu Dima Festival, Falcon Festival, Grand Holy Bath Festival, Jatinga Festival, and more."
        }
    ]
    // render
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={data} renderItem={({ item }) => (
                        <View style={styles.data}>
                            <View style={styles.icon}>
                                {item.icon}
                            </View>
                            <View style={styles.text}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
       paddingHorizontal: 20,
    },
    card: {
    },
    data: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
    },
    text: {
        width: "87%"
    },
    title: {
        fontFamily: "medium",
        fontSize: 20,
    },
    description: {
        marginVertical: 7,
        textAlign: "justify",
        fontFamily: "extra-light",
    },
    icon: {
      marginRight: 20
    }
})

export default Section4
