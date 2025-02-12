import React, { useEffect, useState } from 'react'
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import { auth } from '../../../firebase'
import { useSelector } from 'react-redux'
import MyButton from '../../navigation/MyButton'
import axios from 'axios'
import { base_url } from '../../../constants/url'

const AttendancePage = () => {
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState(user.user)
    const [day, setDay] = useState("")
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(false)
    const [presentDays, setPresentDays] = useState()
    const [absentDays, setAbsentDays] = useState()


    const markAttendance = async () => {
        try {
            const token = await auth.currentUser?.getIdToken()
            const res = await axios.post(`${base_url}/api/user/mark-attendance`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            Alert.alert("Success", res.data.message)

        } catch (e) {
            const errorMessage = e.response?.data?.message || e.message;
            Alert.alert('Error', errorMessage);
        }
        showAttendance()

    }
    const showAttendance = async () => {
        try {
            setLoading(true)
            const token = await auth.currentUser?.getIdToken()
            console.log(token)
            const res = await axios.get(`${base_url}/api/user/get-attendance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setRecords(res.data.attendanceRecords)
            setPresentDays(res.data.presentCount)
            setAbsentDays(res.data.absentCount)
            setLoading(false)
        }
        catch (e) {
            const errorMessage = e.response?.data?.message || e.message
            Alert.alert('Error', errorMessage)
        }
    }
    useEffect(() => {
        showAttendance()
        timeOfDay()
    }, [])

    const timeOfDay = () => {
        const hours = new Date().getHours()
        if (hours >= 12 && hours < 17) {
            return setDay("Good Afternoon,")
        } else if (hours >= 17) {
            return setDay("Good Evening,")
        } else {
            return setDay("Good Morning,")
        }
    }


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    // render
    return (
        <View style={styles.main_container}>
            <View style={styles.user_info}>
                <Text style={styles.user_name_bold}>{day} <Text style={styles.user_name}> {userData.name}</Text></Text>
                <View style={styles.button}>
                    <MyButton buttonTitle="Mark" onClick={markAttendance} backgroundColor="#FFDB58" color="#fff" />
                    <MyButton buttonTitle="Show" onClick={showAttendance} backgroundColor="#93C572" color="#fff" />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.header_row}>
                    <Text style={styles.header}>Date</Text>
                    <Text style={styles.header}>Time</Text>
                    <Text style={styles.header}>Status</Text>
                </View>

                {records.map((item, index) => {
                    const formattedTimestamp = new Date((item.timestamp._seconds + item.timestamp._nanoseconds * 10 ** -9) * 1000).toLocaleTimeString("en-GB")
                    return (
                        <View style={styles.data} key={index}>
                            <View style={styles.card}>
                                <View style={styles.day}>
                                    <Text style={styles.date_cell}>{new Date(item.date).toLocaleDateString("en-GB").replace(/\//g, '-')}</Text>
                                    <Text style={styles.day_cell}>
                                        {new Date(item.date).toLocaleDateString("en-US", { weekday: "long" })}
                                    </Text>
                                </View>
                                <Text style={styles.cell}>{formattedTimestamp}</Text>
                                {item.status == "Absent" ? (<Text style={styles.absent_cell}>{item.status}</Text>) : (<Text style={styles.present_cell}>{item.status}</Text>)}
                            </View>
                        </View>
                    )
                })}
                <View style={styles.bottom}>
                    <View style={styles.status_header}>
                        <Text style={[styles.status_data, { color: "#93C572" }]}>Present:</Text>
                        <Text style={{ color: "#93c572" }}> {presentDays}</Text>
                    </View>
                    <View style={styles.status_header}>
                        <Text style={[styles.status_data, { color: "red" }]}>Absent:</Text>
                        <Text style={{ color: "red", }}> {absentDays}</Text>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default AttendancePage


const styles = StyleSheet.create({
    main_container: {
        padding: 20,
        flex: 1,
    },
    user_info: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },
    user_name_bold: {
        fontFamily: "medium",
        fontSize: 18,
        color: "#93C572"
    },
    user_name: {
        fontFamily: "light",
        color: "#001"
    },
    user_email_bold: {
        fontFamily: "semi-bold",
        fontSize: 18,
    },
    user_email: {
        fontFamily: "light"
    },
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    container: {
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    header_row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 8,
        marginBottom: 8,
        fontFamily: "medium",
    },
    data: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        shadowColor: "rgba(101, 99, 99, 0.71)",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },

    day: {
        display: "flex",
    },
    date_cell: {
        fontFamily: "light",
        letterSpacing: 1,
    },
    day_cell: {
        fontFamily: "extra-light",
        letterSpacing: 1,
        textAlign: "center",
    },
    absent_cell: {
        textAlign: "center",
        flex: 1,
        fontFamily: "semi-bold",
        color: "red"
    },
    present_cell: {
        textAlign: "center",
        flex: 1,
        fontFamily: "semi-bold",
        color: "#93C572"
    },
    cell: {
        textAlign: "center",
        flex: 1,
        fontFamily: "light",
        letterSpacing: 1,
    },
    header: {
        fontFamily: "medium"
    },
    bottom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
    },
    status_header: {
        display: "flex",
        flexDirection: "row",
        textAlignVertical: "center,"
    },
    status_data: {
        letterSpacing: 1,
        fontFamily: "semi-bold"
    }
})