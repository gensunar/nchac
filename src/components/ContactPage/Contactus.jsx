import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/Colors'
import TextBox from "../../../constants/InputBox"
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyButton from '../../navigation/MyButton';

const Contactus = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")


    // render
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>Write to us</Text>
                <View style={styles.box}>
                    <Ionicons name="person-sharp" size={24} color="black" />
                    <View style={styles.input}>
                        <TextBox
                            placeholder="Your Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <MaterialCommunityIcons name="email" size={24} color="black" />
                    <View style={styles.input}>
                        <TextBox
                            placeholder="Your Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <FontAwesome5 name="pen" size={24} color="black" />
                    <View style={styles.input}>
                        <TextBox
                            placeholder="Your Message"
                            value={message}
                            onChangeText={setMessage}
                            multiline={true}
                            height={80}
                        />
                    </View>
                </View>

                <MyButton buttonTitle="Send" color={Colors.white} backgroundColor={Colors.primary} borderRadius={30} width="100%" marginTop={40}/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%"

    },
    input: {
        width: "95%"
    },
    text: {
        fontFamily: "medium",
        fontSize: 22,
        textAlign: "center",
        marginBottom: 20,
    },
    card: {
        backgroundColor: Colors.white,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 20,
    },
    box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
})

export default Contactus
