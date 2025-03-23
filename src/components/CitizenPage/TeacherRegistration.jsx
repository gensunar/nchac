import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import PrimaryInput from '../../../constants/primaryInput'
import { Picker } from '@react-native-picker/picker'
import MyButton from '../../navigation/MyButton'
import axios from 'axios'
import config from '../../../config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { teacherAuth } from '../../../firebase'
import { Link } from 'expo-router'

const TeacherRegistration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [selectedValue, setSelectedValue] = useState('teacher')


    const handleSubmit = async () => {
        try {
            if (!email || !password || !confirmPassword || !selectedValue) {
                Alert.alert("Error", "All fields are required")
                return
            }
            if (password !== confirmPassword) {
                Alert.alert("Error", "Password do not match")
                return
            }
            const userCred = await createUserWithEmailAndPassword(teacherAuth, email, password)
            if (userCred){
                const uid = userCred.user.uid
                const token = await userCred.user.getIdToken()
                const response = await axios.post(`${config.baseUrl}/eis/teacher/add-teacher`, 
                    {email, password, role: selectedValue, uid},
                    {headers: {'Authorization': `Bearer ${token}`}},
                )
                Alert.alert("Success", response.data.message)
                console.log("respone",response)
            }
        } catch (e) {
            console.log(e)
        }
    }

    // render
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.child_container}>
                <View style={styles.header_container}>
                    <Text style={styles.header}>Employee Information System</Text>
                    <Text style={styles.sub_header}>North Cachar Autonomous Council</Text>
                </View>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.text}>Username</Text>
                        <PrimaryInput
                            placeholder="email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Password</Text>
                        <PrimaryInput
                            placeholder="password"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Confirm Password</Text>
                        <PrimaryInput
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.text}>Select Role</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                mode='dropdown'
                                style={styles.picker}
                            >
                                <Picker.Item label="Teacher" value="teacher" style={styles.picker_item} />
                                <Picker.Item label="School" value="school" style={styles.picker_item} />
                            </Picker>
                        </View>
                    </View>
                </View>
                <MyButton onClick={handleSubmit} buttonTitle={"Submit"} backgroundColor="#FFBF00" width="100%" borderRadius={40} />
            </View>
            <Link href='/citizen/EISLogin'>Login</Link>
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
        marginBottom: 20,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        height: 50,
        justifyContent: "center",
        marginVertical: 7,
        borderRadius: 12,
    },
    picker: {

    },
    text: {
        fontFamily: "semi-bold",
        marginBottom: 7,
        borderRadius: 4,
    },
})

export default TeacherRegistration
