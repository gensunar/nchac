import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import TextBox from '../../../constants/textBox'
import { Picker } from '@react-native-picker/picker'

const TeacherLogin = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [selectedValue, setSelectedValue] = useState('')

    // render
    return (
        <ScrollView style={styles.container}>
            <View style={styles.child_container}>
                <View style={styles.header_container}>
                    <Text style={styles.header}>Employee Information System</Text>
                    <Text style={styles.sub_header}>North Cachar Autonomous Council</Text>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.text}>Username</Text>
                        <TextBox
                            placeholder="username"
                            value={userName}
                            onChange={setUserName}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Password</Text>
                        <TextBox
                            placeholder="password"
                            value={password}
                            onChange={setPassword}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Password</Text>
                        <TextBox
                            placeholder="password"
                            value={password}
                            onChange={setPassword}
                        />
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.text}>Select Role</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Teacher" value="teacher" style={styles.picker_item} />
                                <Picker.Item label="School" value="school" style={styles.picker_item} />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#a9f5d9",
        height: "100%",

    },
    header_container: {
        marginBottom: 20,
        alignItems: "center",
        marginTop: 60,
    },
    header: {
        fontFamily: "semi-bold",
        fontSize: 20,
    },
    sub_header: {
        fontFamily: "extra-light"
    },
    child_container: {
        padding: 20
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
    },
    picker: {
        height: 45,
        padding: 0,
        margin: 0
    },
    text: {
        fontFamily: "semi-bold",
        marginBottom: 7,
        borderRadius: 4,
    },
})

export default TeacherLogin
