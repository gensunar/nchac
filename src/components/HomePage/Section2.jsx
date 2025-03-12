import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-web'
import { Colors } from '../../../constants/Colors'

const Section2 = () => {
    // render
    return (
        <View style={styles.container}>
            <View style={styles.first_card}>
                <Image source={{ uri: `https://res.cloudinary.com/ds4adb2me/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1738944289/samples/smile.jpg` }} style={styles.image} />
                <Text style={styles.header}>Shri Calendar Pandey</Text>
                <Text style={styles.sub_header}>Hon'ble Chief Executive Member</Text>
            </View>
            <View style={styles.second_card}>
                <Text style={styles.message_header1}>Message From The Member</Text>
                <Text style={styles.message_header}>Dear Visitors,</Text>
                <View>
                    <Text style={styles.message}>Nestled amidst the breathtaking hills and mountains,
                        adorned by winding rivers and captivating scenic beauty, lies our beautiful Dima Hasao—the
                        only hill station of Assam, where the oldest autonomous council, the Dima Hasao
                        Autonomous Council (erstwhile North Cachar Hills Autonomous Council), finds its home.
                    </Text>
                    <Text style={styles.message}>
                        In our pursuit of progress, Dima Hasao Autonomous Council hold hands with tradition.
                        Our community is embracing advanced methods without losing sight of the customs that define us.
                        Whether it's sustainable agriculture, eco-friendly tourism, or community welfare, we honor our
                        roots while embracing modern solutions.
                    </Text>
                </View>
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
        height: 240,
        gap: 8,
        alignItems: "center",
    },
    image: {
        height: 200,
        width: 200,
        objectFit: 'contain',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.secondary,
    },
    header: {
        fontSize: 24,
        fontFamily: "roboto-bold",
        textAlign: "center",
    },
    sub_header: {
        fontFamily: "roboto-extra-light",
        fontSize: 16,
        marginTop: -12,
        textAlign: "center",
    },
    second_card: {
        padding: 20,
        marginTop: 15,
    },
    message_header1: {
        fontFamily: "roboto-bold",
        fontSize: 20,
    },
    message_header: {
        fontFamily: "roboto-medium",
        marginTop: 9,
        fontSize: 16,
    },
    message: {
        textAlign: "justify",
        fontFamily: "regular",
        fontSize: 16,
        marginTop: 5,
        letterSpacing: 1,
    },
    bottom: {
        marginTop: 2,
        fontSize: 16,
        fontStyle: 'italic',
    }
})

export default Section2
