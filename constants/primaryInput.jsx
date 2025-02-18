import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'


const PrimaryInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, maxLength, editable, onSubmitEditing, returnKeyType, blurOnSubmit, autoFocus, position }) => {
    // render
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, {position}]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
                onSubmitEditing={onSubmitEditing}
                returnKeyType= {returnKeyType}
                autoFocus= {autoFocus}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 7,
    },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: "rgba(201, 199, 199, 0.45)",
        borderRadius: 20,
        paddingHorizontal: 18,
        width: "100%",
        marginBottom: 10,
        backgroundColor: "#fff",
        fontFamily: "extra-light",
        textAlignVertical: "center",
    }
})

export default PrimaryInput
