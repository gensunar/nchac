import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'


const InputBox = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, maxLength, editable }) => {
    // render
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: "#28282B",
        borderRadius: 20,
        paddingHorizontal: 18,
        width: "100%",
        marginBottom: 7,
        backgroundColor: "#fff",
        fontFamily: "extra-light",
        textAlignVertical: "center",
    }
})

export default InputBox
