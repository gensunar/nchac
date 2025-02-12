import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'

const MyButton = ({ buttonTitle, onClick, backgroundColor, color, width }) => {
    // render
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {backgroundColor, width},]} onPress={onClick}>
                <Text style={[styles.text, {color}]}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        padding: 10,
        borderRadius: 12,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        width: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontFamily: "semi-bold",
        fontSize: 16,
    }
})
export default MyButton
