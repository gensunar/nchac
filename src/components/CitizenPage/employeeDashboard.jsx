import React, { useEffect, useState, Suspense } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, SafeAreaView, Alert, Linking } from 'react-native'
import MyButton from '../../navigation/MyButton'
import { auth, db } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useNavigation, useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { register, logout } from '../../store/slices/user'
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios'
import config from '../../../config'
import useLocation from '../../hooks/useLocation'
import { getPreciseDistance } from 'geolib'
import { Colors } from "../../../constants/Colors"

const employeeDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState({})
    const [userSnapData, setUserSnapData] = useState({})
    const [fetchUser, setFetchUser] = useState({})
    const [loading, setLoading] = useState(true)

    const { latitude, longitude, errorMsg, locationText, location } = useLocation()

    const router = useRouter()
    const navigation = useNavigation()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(logout())
            setUserData(null)
            router.replace("/citizen/auth/registration")
        }
        catch (e) {
            console.log(e)
        }
    }

    const calculatePreciseDistance = () => {
        var distance = getPreciseDistance(
            { latitude, longitude },
            { latitude: 25.191766059505806, longitude: 93.02257052660393 }
        )
        Alert.alert(`Precise Distance ${distance / 1000}`)
    }

    // const calculatePreciseDistance = () => {
    //     const R = 6371
    //     const lat1 = 25.5105078 * Math.PI / 180
    //     const lon1 = 92.7376857 * Math.PI / 180
    //     const lat2 = 25.191766059505806 * Math.PI / 180
    //     const lon2 = 93.02257052660393 * Math.PI / 180

    //     const dLat = lat2 - lat1
    //     const dLon = lon2 - lon1

    //     const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     console.log(R*c)
    // }

    const fetchProfileData = async () => {
        try {
            const token = await auth.currentUser.getIdToken()
            const response = await axios.get(`${config.baseUrl}/api/user/get-user`, {
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


    if (user?.isLoggedIn && loading) {
        return (
            <View style={styles.loading_container}>
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
                            <View style={styles.location}>
                                {Array.isArray(locationText) && locationText.length > 0 ? (
                                    locationText.map((item, index) => (
                                        <View key={index}>
                                            <Text style={styles.header_text}>Your Current Location: </Text>
                                            <Text style={styles.data_text}>{item.city}, {item.region}, {item.postalCode}</Text>
                                            <Text style={styles.data_text}>{item.formattedAddress}</Text>
                                        </View>
                                    ))
                                ) : (<Text>Loading....</Text>)}
                                <Text style={styles.data_text}>{latitude}, {longitude}</Text>
                            </View>
                        </View>
                        <View style={styles.button}>
                            <>
                                <MyButton onClick={handleAttendance} color="#fff" buttonTitle={"CHECK-IN"} backgroundColor={Colors.primary} borderRadius={30} width={150} />
                                <MyButton onClick={handleLogout} color="#fff" buttonTitle={"CHECK-OUT"} backgroundColor={Colors.secondary} borderRadius={30} width={180} />
                            </>
                        </View>
                    </View>
                    <View style={styles.card_section}>
                        <View style={styles.card}>
                            <View style={styles.data_section}>
                                <AntDesign name="profile" size={50} color={Colors.primary} style={styles.icon} />
                                <Link style={styles.text} href="/citizen/profile"><Text style={styles.text}>Profile</Text></Link>
                            </View>
                            <View style={styles.data_section}>
                                <AntDesign name="calendar" size={50} color={Colors.primary} style={styles.icon} />
                                <Link style={styles.text} href="/citizen/attendance"><Text >Attendance</Text></Link>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
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
    },
    loading_container: {
        display: "flex",
    },
    location: {
        marginTop: 20
    },
    header_text: {
        color: "rgba(22, 22, 22, 0.56)",
        letterSpacing: 1,
        fontFamily: "medium",
        fontSize: 18,
    },
    data_text: {
        color: "rgba(102, 102, 102, 0.66)",
        letterSpacing: 1,
        fontFamily: "light"
    },
})




export default employeeDashboard
