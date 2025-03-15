import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"
import MyButton from '../../navigation/MyButton'
import { Link, useRouter } from 'expo-router'
import PrimaryInput from '../../../constants/primaryInput';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/user';
import axios from 'axios';
import Dashboard from "../../app/(tabs)/citizen/Dashboard"
import { base_url } from "../../../constants/url"
import config from '../../../config';
import loginImage from "../../../assets/images/login.png"
import Feather from '@expo/vector-icons/Feather';

const LoginPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureText, setSecureText] = useState(true)
    const [loading, setLoading] = useState(false)

    const secondInputRef = useRef(null);


    const loginHandler = async () => {
        if (!email || !password) {
            Alert.alert("Error", "All fields are required")
        }
        try {
            setLoading(true)

            const logCred = await signInWithEmailAndPassword(auth, email, password);
            const token = await logCred?.user.getIdToken()

            const response = await axios.get(`${config.baseUrl}/api/user/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLoading(false)
            dispatch(login({
                user: response.data
            }))
            router.push("/citizen/Dashboard",)
        } catch (e) {
            console.log(e)
            if (e.code.includes("auth/invalid-credential")) {
                setLoading(false)
                Alert.alert("Invalid Credential")
            }

        }
    }
    if (user.isLoggedIn) {
        return (
            <Dashboard />
        )
    }

    const handleNextFocus = (nextInputRef) => {
        if (nextInputRef && nextInputRef.current) {
            nextInputRef.current.focus();
        }
    };

    const handleShowPassword = () => {
        setSecureText(!secureText)
    }


    // render
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header_container}>
                <Text style={styles.header}>Employee Information System</Text>
                <Text style={styles.sub_header}>North Cachar Autonomous Council</Text>
            </View>
            <View style={styles.main_card}>
                <View style={styles.image_container}>
                    <Image source={loginImage} style={styles.image} />
                </View>

                <View style={styles.card}>
                    <View>
                        <Text style={styles.text}>Email</Text>
                        <PrimaryInput
                            placeholder="enter your email"
                            value={email}
                            onChangeText={setEmail}
                            returnKeyType="next"
                            onSubmitEditing={() => handleNextFocus(secondInputRef)}
                            autoFocus={true}
                            keyboardType="email-address"
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Password</Text>
                        <View style={styles.password}>
                            <PrimaryInput
                                inputRef={secondInputRef}
                                placeholder="password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureText}
                                onSubmitEditing={loginHandler}
                                returnKeyType="done"
                                autoFocus={true}
                                position="relative"
                            />
                            <Feather name={secureText ? "eye-off" : "eye"} size={24} color="black" style={styles.icon} onPress={handleShowPassword} />
                        </View>
                    </View>
                    {loading ? (<MyButton backgroundColor={"#33ac3f"} buttonTitle={'Please Wait'} width="100%" color="#fff" borderRadius={60} marginTop={20} />) :
                        (<MyButton backgroundColor={"#33ac3f"} buttonTitle={'Login'} onClick={loginHandler} width="100%" color="#fff" borderRadius={60} marginTop={20} />)}

                </View>
            </View>
            <View style={styles.bottom_container}>
                <Text style={styles.bottom_text}>Don't Have an Account?</Text>
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
        display: "flex",
        flexDirection: "column",
    },
    image_container: {
        height: 300,
        width: "100%",
    },
    image: {
        objectFit: "contain",
        width: "100%",
        height: "100%",
    },
    header_container: {
        marginTop: 40,
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
        borderRadius: 10,
        padding: 10,
        marginTop: -20,
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
        fontFamily: "extra-light",
        color: "rgb(130, 128, 128)",
        letterSpacing: 1,
        fontSize: 16,
    },
    bottom_text_data: {
        fontFamily: "medium",
        letterSpacing: 1,
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline",
        marginLeft: 12,
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: 25,
        color: "rgb(114, 114, 114)",
        fontFamily: "bold"
    },
})

export default LoginPage
