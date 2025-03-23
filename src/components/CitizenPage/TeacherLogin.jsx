import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import PrimaryInput from '../../../constants/primaryInput'
import { Picker } from '@react-native-picker/picker'
import MyButton from '../../navigation/MyButton'
import axios from 'axios'
import config from '../../../config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { teacherAuth } from '../../../firebase'
import { Link, router, useFocusEffect, useRouter } from 'expo-router'
import { Colors } from "../../../constants/Colors"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { teacherLogin, teacherLogout } from '../../store/slices/teacherSlice'


const TeacherLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [selectedValue, setSelectedValue] = useState('teacher')
    const [captcha, setCaptcha] = useState("")
    const [captchaValue, setCaptchaValue] = useState("")
    const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false)

    const teacherUser = useSelector((state) => state.teacher)
    console.log("Teacher Slice", teacherUser)

    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        try {
            if (!email || !password || !selectedValue || !captchaValue) {
                Alert.alert("Error", "All fields are required")
                return
            }
            const captchaResponse = await axios.post(`${config.baseUrl}/captcha/verify-captcha`, { userCaptcha: captchaValue })

            const userCred = await signInWithEmailAndPassword(teacherAuth, email, password)

            if (userCred) {
                const uid = userCred.user.uid
                const token = await userCred.user.getIdToken()
                const response = await axios.post(`${config.baseUrl}/eis/teacher/teacher-role`,
                    { role: selectedValue },
                    { headers: { 'Authorization': `Bearer ${token}` } },
                )
                Alert.alert("Success", response.data.message)
                console.log("From Response",response.data.userRef)
                dispatch(teacherLogin({
                    teacher: response.data.userRef
                }))

                if (response.data.userRole == 'teacher') {
                    router.push('/citizen/TeacherDashboard')
                } else if (response.data.userRole == 'school') {
                    router.push('/citizen/SchoolDashboard')
                } else {
                    Alert.alert('Something went wrong')
                    auth().signOut()
                }
            }

        } catch (e) {
            console.log(e)
            const errorMessage = e.response?.data?.message || e.message;
            Alert.alert('Error', errorMessage);
            generateCaptcha()
        }
    }


    const generateCaptcha = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/captcha/generate-captcha`)
            setCaptcha(response.data.captcha)
            setCaptchaValue('')
            setIsCaptchaLoaded(true)
        } catch (e) {
            console.log(e)
            const errorMessage = e.response?.data?.message || e.message
            Alert.alert('Error', errorMessage)
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (!isCaptchaLoaded) {
                generateCaptcha()
            }
        }, [])
    )


    useEffect(() => {
        generateCaptcha()
    }, [])

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
                    <View style={styles.captcha}>
                        <Text style={{ fontSize: 20, fontFamily: "light" }}>captcha:   </Text>
                        <Text style={{ fontFamily: "semi-bold", alignItems: "center" }}>{captcha}        </Text>
                        <TouchableOpacity onPress={generateCaptcha}>
                            <MaterialCommunityIcons name="reload" size={24} color="#808080" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <PrimaryInput
                            placeholder="captcha"
                            value={captchaValue}
                            onChangeText={setCaptchaValue}
                        />
                    </View>
                </View>
                <MyButton onClick={handleSubmit} buttonTitle={"Sign In"} backgroundColor="#FFBF00" width="100%" borderRadius={40} />
            </View>
            <Link href='/citizen/EISSignup'>Registration</Link>
            <Link href='/citizen/SchoolDashboard'>School Dashboard</Link>
            <Link href='/citizen/TeacherDashboard'>Teacher Dashboard</Link>
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
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 40,
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
    captcha: {
        marginTop: 20,
        backgroundColor: '#e6e6e6',
        paddingVertical: 20,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    }
})

export default TeacherLogin
