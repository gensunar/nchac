import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'

const MyButton = ({buttonTitle, onClick}) => {
    // render
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onClick}>
                <Text style={styles.text}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
       backgroundColor: '#6200EE',
        paddingVertical: 17,
        paddingHorizontal: 35,
        borderRadius: 25,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
export default MyButton
