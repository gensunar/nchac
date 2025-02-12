import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import MyButton from '../../navigation/MyButton'
import { auth, db } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { register, logout } from '../../store/slices/user'
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'
import { base_url } from '../../../constants/url'


const employeeDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState({})
    const [userSnapData, setUserSnapData] = useState({})
    const [fetchUser, setFetchUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [refreshProfile, setRefreshProfile] = useState(false);


    const router = useRouter()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(logout())
            setUserData(null)
            router.replace("/citizen/registration")
        }
        catch (e) {
            console.log(e)
        }
    }


    const fetchProfileData = async () => {
        try {
            const token = await auth.currentUser.getIdToken()
            const response = await axios.get(`${base_url}/api/user/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLoading(false)
            setFetchUser(response.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    const handleAttendance = async () => {
        router.push("/citizen/attendance")
    }

    useEffect(() => {
        if (user) {
            setUserData(user)
        }
    }, [userData])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCred) => {
            if (userCred) {
                setUserSnapData(userCred)
            }
        });
        return unsubscribe
    }, [dispatch, userData])


    useEffect(() => {
        fetchProfileData()
    }, [])



    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }



    if (user?.isLoggedIn && !user.isLoading) {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.main}>
                        <View style={styles.top}>
                            <View style={styles.image_container}>
                                <Image source={{ uri: fetchUser.image }} style={styles.image} />
                            </View>
                            <View style={styles.details}>
                                <Text style={styles.name}>{userData.user?.name}</Text>
                                <Text style={styles.position}>{fetchUser.designation ? fetchUser.designation : "NA"}</Text>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <>
                                <MyButton onClick={handleAttendance} color="#fff" buttonTitle={"CHECK-IN"} backgroundColor="#ABE098" />
                                <MyButton onClick={handleLogout} color="#fff" buttonTitle={"CHECK-OUT"} backgroundColor="#FF4646" />
                            </>
                        </View>
                    </View>
                    <View style={styles.card_section}>
                        <View style={styles.card}>
                            <View style={styles.data_section}>
                                <AntDesign name="profile" size={50} color="#FFBF00" style={styles.icon} />
                                <Link style={styles.text} href="/citizen/profile"><Text style={styles.text}>Profile</Text></Link>
                            </View>
                            <View style={styles.data_section}>
                                <AntDesign name="calendar" size={50} color="#FFBF00" style={styles.icon} />
                                <Link style={styles.text} href="/citizen/attendance"><Text >Attendance</Text></Link>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
    return (
        <View style={styles.container}>
            <Text>Please login to access</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    main: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    top: {
        display: "flex",
        alignItems: "center",

    },
    image_container: {
        height: 120,
        width: 120,
    },
    image: {
        borderTopLeftRadius: 120,
        borderTopRightRadius: 120,
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 120,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderWidth: 1,
        borderColor: "rgba(89, 90, 91, 0.27)",
    },
    details: {
       marginTop: 18,
    },
    name: {
        fontSize: 26,
        fontFamily: "medium",
        marginBottom: -8,
        letterSpacing: 1,
    },
    position: {
        fontFamily: "extra-light",
        fontSize: 14,
        textAlign: "center",
        letterSpacing: 1,
    },
    button: {
        display: "flex",
        flexDirection: "row",
        marginTop: 25,
        justifyContent: "space-between",
    },
    card_section: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    card: {
        flexDirection: "row",
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        justifyContent: "space-between",
    },
    data_section: {
        width: '48%',
        marginBottom: 16,
        backgroundColor: 'rgba(216, 215, 215, 0.26)',
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 20,
        alignItems: 'center',
    },
    icon: {
        marginTop: 20,
    },
    text: {
        marginTop: 20,
        fontFamily: "medium",
        fontSize: 18,
        letterSpacing: 1,
    }
})




export default employeeDashboard
