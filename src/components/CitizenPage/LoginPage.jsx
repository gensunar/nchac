import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"
import MyButton from '../../navigation/MyButton'
import { Link, useRouter } from 'expo-router'
import PrimaryInput from '../../../constants/primaryInput';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/user';
import axios from 'axios';
import Dashboard from '../../app/(tabs)/citizen/dashboard';
import {base_url} from "../../../constants/url"
import config from '../../../config';

const LoginPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required")
        }
        try {
            const logCred = await signInWithEmailAndPassword(auth, email, password);
            const token = await logCred?.user.getIdToken()

            const response = await axios.get(`${config.baseUrl}/api/user/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(login({
                user: response.data
            }))
            router.push("/citizen/dashboard",)
        } catch (e) {
            console.log(e)
            if (e.code.includes("auth/invalid-credential")) {
                Alert.alert("Invalid Credential")
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
            <Text style={styles.user_header}>User Login</Text>
            <View style={styles.green_line}></View>
            <View style={styles.header_container}>
                <Text style={styles.header}>Employee Information System</Text>
                <Text style={styles.sub_header}>North Cachar Autonomous Council</Text>
            </View>
            <View style={styles.main_card}>
                <Text>{user ? user.displayName : "No User"}</Text>
                <View style={styles.card}>
                    <Text style={styles.login}>Login</Text>
                    <View style={styles.line}></View>
                    <View>
                        <Text style={styles.text}>Email</Text>
                        <PrimaryInput
                            placeholder="enter your email"
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
                            secureTextEntry
                        />
                    </View>
                    <MyButton backgroundColor={"#33ac3f"} buttonTitle={'Login'} onClick={loginHandler} />
                </View>
            </View>
            <View style={styles.bottom_container}>
                <Text style={styles.bottom_text}>New User?</Text>
                <Link style={styles.bottom_text_data} href="/citizen/registration"><Text >Register</Text></Link>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
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
    login: {
        fontFamily: "light",
        fontSize: 18,
        marginTop: 20
    },
})

export default LoginPage
