import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-web'

const Section2 = () => {
    // render
    return (
        <View style={styles.container}>
            <View style={styles.first_card}>
                <Image source={require("../../../assets/images/i.jpg")} style={styles.image} />
                <Text style={styles.header}>Shri Exch Ftradg</Text>
                <Text style={styles.sub_header}>Hon'ble Chjie Member of Council</Text>
            </View>
            <View style={styles.second_card}>
                <Text style={styles.message_header1}>Message From The Member</Text>
                <Text style={styles.message_header}>Dear Visitors,</Text>
                <Text style={styles.message}>Nestled amidst the breathtaking hills and mountains, 
                adorned by winding rivers and captivating scenic beauty, lies our beautiful Dima Hasao—the 
                only hill station of Assam, where the oldest autonomous council, the Dima Hasao 
                Autonomous Council (erstwhile North Cachar Hills Autonomous Council), finds its home.</Text>

                <Text style={styles.message}>In our pursuit of progress, Dima Hasao Autonomous Council hold hands with tradition. 
                    Our community is embracing advanced methods without losing sight of the customs that define us. 
                    Whether it's sustainable agriculture, eco-friendly tourism, or community welfare, we honor our 
                    roots while embracing modern solutions.</Text>
                <Text style={styles.bottom}>Warm Regards</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 40,
    },
    first_card: {
        padding: 30,
        height: 450,
        gap: 8,
    },
    image: {
        height: 400,
        width: 400,
        objectFit: 'contain'
    },
    header: {
        fontWeight: "500",
        fontSize: 24,
        fontFamily: ""
    }, 
    sub_header: {
        fontWeight: "medium",
        fontSize: 20,
    },
    second_card: {
        padding: 30,

    },
    message_header1: {
        fontWeight: "600",
        fontSize: 22,
    },
    message_header: {
        fontWeight: "medium",
        marginTop: 9,
        fontSize: 16,
    },
    message: {
        textAlign: "justify",
        fontSize: 16,
        marginTop: 5,
    },
    bottom: {
        marginTop: 2,
        fontSize: 16,
        fontStyle: 'italic',
    }
})

export default Section2
