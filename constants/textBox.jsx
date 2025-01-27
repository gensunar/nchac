import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'


const textBox = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, maxLength }) => {
    // render
    return (
        <View style={StyleSheet.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 18,
        width: "100%",
        marginBottom: 10,
        backgroundColor: "#fff",
        fontFamily: "extra-light",
        textAlignVertical: "center",
    }
})

export default textBox
