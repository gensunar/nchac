import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import TextBox from '../../../constants/primaryInput'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import MyButton from '../../navigation/MyButton'
import { Link, useRouter } from 'expo-router'
import { auth, db } from '../../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import Dashboard from '../../app/(tabs)/citizen/dashboard'
import { register } from '../../store/slices/user'
import axios from 'axios'
import { base_url } from '../../../constants/url'
import config from '../../../config'

const RegistrationPage = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handleRegister = async () => {

        if (!email || !name || !mobile || !password || !confirmPassword) {
            Alert.alert("Error", "All Fields are required")
            return
        }

        if (mobile.length !== 10) {
            Alert.alert("Error", "Mobile length should be 10")
            return
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Password do not match")
            console.log("not match")
            return
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
            if (userCredential) {
                const uid = userCredential.user.uid
                console.log(uid)
                const token = await userCredential?.user.getIdToken()
                const response = await axios.post(`${config.baseUrl}/api/user/add-user`,
                    {body:{ name, mobile, email, password, uid }},
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                console.log(response)
                Alert.alert("Success", "Register Successfully")

                router.push("/citizen/login")
            }
        }
        catch (e) {
            console.log(e)
            if (e.code.includes("auth/invalid-email")) {
                Alert.alert("Error", "Invalid Email Address");
            }
            else if (e.code.includes("auth/weak-password")) {
                Alert.alert("Error", "Weak Password, atleast 6 characters");
            }
            else if (e.code.includes("auth/email-already-in-use")) {
                Alert.alert("Error", "Email already in use");
            } else {
                Alert.alert("Registration failed")
            }
        }
    }

    if (user.isLoggedIn) {
        return (
            <Dashboard />
        )
    }

    // render
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.user_header}>User Registration</Text>
            <View style={styles.green_line}></View>
            <View style={styles.header_container}>
                <Text style={styles.header}>Employee Information System</Text>
                <Text style={styles.sub_header}>North Cachar Autonomous Council</Text>
            </View>
            <View style={styles.main_card}>
                <View style={styles.card}>
                    <Text style={styles.signup}>Sign Up</Text>
                    <View style={styles.line}></View>
                    <View>
                        <Text style={styles.text}>Name</Text>
                        <TextBox
                            placeholder="enter your name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Email</Text>
                        <TextBox
                            placeholder="enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View><View>
                        <Text style={styles.text}>Mobile Number</Text>
                        <TextBox
                            placeholder="10 digit mobile number"
                            value={mobile}
                            onChangeText={setMobile}
                            keyBoardType="numeric"
                            maxLength={10}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Password</Text>
                        <TextBox
                            placeholder="password"
                            value={password}
                            onChangeText={setPassword}
                        // secureTextEntry
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Confirm password</Text>
                        <TextBox
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        // secureTextEntry
                        />
                    </View>
                    <MyButton onClick={handleRegister} backgroundColor={"#33ac3f"} buttonTitle={'Sign Up'} />
                </View>
            </View>
            <View style={styles.bottom_container}>
                <Text style={styles.bottom_text}>Already Registered?</Text>
                <Link style={styles.bottom_text_data} href="/citizen/login"><Text >Login Here</Text></Link>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    user_header: {
        backgroundColor: "#990011",
        color: "#fff",
        width: "30%",
        padding: 8,
        borderRadius: 4,
        textAlign: "center",
        fontFamily: "regular",
        fontSize: 12,
        marginTop: 10,
        marginLeft: 10
    },
    main_card: {
        padding: 20,
    },
    green_line: {
        height: 2,
        backgroundColor: 'green',
        width: '100%',
        marginVertical: 10,
    },
    header_container: {
        marginBottom: 20,
        alignItems: "center",
    },
    header: {
        fontFamily: "semi-bold",
        fontSize: 20,
    },
    sub_header: {
        fontFamily: "extra-light"
    },
    card: {
        backgroundColor: "#ececec",
        borderRadius: 10,
        padding: 10,
    },
    text: {
        fontFamily: "semi-bold",
        marginBottom: 7
    },
    bottom_container: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 20,
    },
    bottom_text: {
        fontFamily: "regular",
        fontSize: 16,
    },
    bottom_text_data: {
        fontFamily: "regular",
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline",
        marginLeft: 12,
    },
    line: {
        height: 1,
        backgroundColor: '#ded4d4',
        marginBottom: 20,
    },
    signup: {
        fontFamily: "light",
        fontSize: 18,
        marginTop: 20
    },
})
export default RegistrationPage
