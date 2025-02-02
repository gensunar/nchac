import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import MyButton from '../../navigation/MyButton'
import { auth, db } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { register, logout } from '../../store/slices/user'
import AntDesign from '@expo/vector-icons/AntDesign';
const employeeDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState({})
    const [userSnapData, setUserSnapData] = useState({})
    const [loading, setLoading] = useState(user?.isLoading)

    // console.log("UserData", userData)

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

    const handleAttendance = async () => {
        
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

    if (user?.isLoggedIn && user?.loading) {
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
                                <Image source={require('../../../assets/images/Panimur.jpg')} style={styles.image} />
                            </View>
                            <View style={styles.details}>
                                <Text style={styles.name}>{userData.user?.name}</Text>
                                <Text style={styles.position}>Asst. teacher</Text>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <MyButton onClick={handleAttendance} buttonTitle={"CHECK-IN"} backgroundColor="#ABE098" />
                            <MyButton onClick={handleLogout} buttonTitle={"CHECK-OUT"} backgroundColor="#FF4646" />
                        </View>
                    </View>
                    <View style={styles.card_section}>
                        <View style={styles.card}>
                            <View style={styles.data_section}>
                                <AntDesign name="profile" size={70} color="black" style={styles.icon} />
                                <Text style={styles.text}>Profile</Text>
                            </View>
                            <View style={styles.data_section}>
                                <AntDesign name="calendar" size={70} color="black" style={styles.icon} />
                                <Text style={styles.text}>Attendance</Text>
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
        flexDirection: 'row',
        alignItems: "center",

    },
    image_container: {
        height: 100,
        width: 100,
    },
    image: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: "100%",
        height: "100%",
    },
    details: {
        marginLeft: 25,
    },
    name: {
        fontSize: 26,
        fontFamily: "medium",
        marginBottom: -8,
    },
    position: {
        fontFamily: "extra-light",
        fontSize: 14,
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
        backgroundColor: '#E9ecef',
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 20,
        alignItems: 'center',
    },
    icon: {
        marginTop: 30,
        color: "red"
    },
    text: {
        marginTop: 30,
        fontFamily: "semi-bold",
        fontSize: 22,
    }
})




export default employeeDashboard
