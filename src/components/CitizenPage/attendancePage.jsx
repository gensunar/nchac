import React, { useEffect, useState } from 'react'
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native'
import { auth } from '../../../firebase'
import { useSelector } from 'react-redux'
import MyButton from '../../navigation/MyButton'
import axios from 'axios'
import { base_url } from '../../../constants/url'
import config from '../../../config'
import useLocation from "../../hooks/useLocation"
import { getPreciseDistance } from 'geolib'
import { Colors } from '../../../constants/Colors'
import { Picker } from '@react-native-picker/picker'


const AttendancePage = () => {
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState(user.user)
    const [day, setDay] = useState("") 
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(false)
    const [presentDays, setPresentDays] = useState()
    const [presentDaysMonth, setPresentDaysMonth] = useState()
    const [absentDaysMonth, setAbsentDaysMonth] = useState()
    const [attendanceLengthMonth, setAttendanceLengthMonth] = useState()
    const [absentDays, setAbsentDays] = useState()
    const [attendanceLength, setAttendanceLength] = useState()
    const [month, setMonth] = useState(new Date().toLocaleString("en", { month: "long" }))
    const [filterData, setFilterData] = useState([])

    const { latitude, location, longitude, errorMsg, locationText, distance } = useLocation()
    const currentMonth = new Date().getMonth()+1

    const monthName = ["All", "January", 'February', "March", "April", 'May', "June", "July", "August", "September", "October", "November", "December"]

    const markAttendance = async () => {
        try {
            if (!location) {
                Alert.alert("Error", "You need location Permission")
                return
            }
            if (distance > 500) {
                Alert.alert(`${distance}`, "Distance should be less than 500m")
                return
            }
            const token = await auth.currentUser?.getIdToken()
            const res = await axios.post(`${config.baseUrl}/api/user/mark-attendance`, {}, {
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
            const res = await axios.get(`${config.baseUrl}/api/user/get-attendance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setRecords(res.data.attendanceRecords)
            setPresentDays(res.data.presentCount)
            setAbsentDays(res.data.absentCount)
            setAttendanceLength(res.data.attendanceLength)
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



    useEffect(() => {
        if (month === "All") {
            setFilterData(records)
        }
        else {
            filterMonth()
        }
    }, [month, records])


    const filterMonth = () => {
        const filteredRecords = records?.filter((record) => {
            return new Date(record.date).toLocaleString("en", { month: "long" }) === month;
        });
        setFilterData(filteredRecords);
        setPresentDaysMonth(filteredRecords.filter((record) => record.status === "Present").length)
        setAbsentDaysMonth(filteredRecords.filter((record) => record.status === "Absent").length)
        setAttendanceLengthMonth(filteredRecords.length)
    }

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
        <ScrollView style={styles.main_container}>
            <View style={styles.user_info}>
                <Text style={styles.user_name_bold}>{day} <Text style={styles.user_name}> {userData.name}</Text></Text>
                <View style={styles.button}>
                    <MyButton buttonTitle="Mark Attendance" onClick={markAttendance} backgroundColor={Colors.primary} color={Colors.white} width="100%" borderRadius={20} />
                </View>
            </View>
            <View style={{ borderWidth: 2, borderColor: Colors.primary, borderRadius: 10, marginTop: 15 }}>
                <Picker
                    selectedValue={month}
                    onValueChange={(item) => setMonth(item)}
                >
                    {monthName.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} enabled={index <= currentMonth} />
                    ))}
                    {/* {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
                        <Picker.Item key={item} label={new Date(0, item - 1).toLocaleString("en", { month: "long" })} value={item} />
                    ))} */}
                </Picker>
            </View>
            <View style={styles.container}>
                <View style={styles.header_row}>
                    <Text style={styles.header}>Date</Text>
                    <Text style={styles.header}>Time</Text>
                    <Text style={styles.header}>Status</Text>
                </View>
                {filterData.length === 0 && <Text style={{ textAlign: "center", fontFamily: "light", marginTop: 20 }}>No records found</Text>}
                {filterData.map((item, index) => {
                    const formattedTimestamp = new Date((item.timestamp._seconds + item.timestamp._nanoseconds * 10 ** -9) * 1000).toLocaleTimeString("en-GB")
                    const date = new Date(item.date).toLocaleDateString("en-GB").replace(/\//g, '-')
                    return (
                        <View style={styles.data} key={index}>
                            <View style={styles.card}>
                                <View style={styles.day}>
                                    <Text style={styles.date_cell}>{date}</Text>
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
                    <View style={styles.status_column}>
                        <View style={styles.status_header}>
                            <Text style={[styles.status_data, { color: Colors.primary }]}>Present:</Text>
                            {month === "All" ? (<Text style={{ color: Colors.primary }}> {presentDays}</Text>) : (<Text style={{ color: Colors.primary }}>{presentDaysMonth}</Text>)}
                        </View>
                        <View style={styles.status_header}>
                            <Text style={[styles.status_data, { color: "red" }]}>Absent:</Text>
                            {month === "All" ? (<Text style={{ color: "red", }}> {absentDays}</Text>) : (<Text style={{ color: "red", }}>{absentDaysMonth}</Text>)}
                        </View>
                    </View>
                    <View style={styles.status_header}>
                        <Text style={[styles.status_data, { color: Colors.primary }]}>Total:</Text>
                        {month === "All" ? (<Text style={{ color: Colors.primary }}> {attendanceLength}</Text>) : (<Text style={{ color: Colors.primary }}>{attendanceLengthMonth}</Text>)}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AttendancePage


const styles = StyleSheet.create({
    main_container: {
        padding: 20,
        flex: 1,
        paddingBottom: 50,
    },
    user_info: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },
    user_name_bold: {
        fontFamily: "medium",
        fontSize: 18,
        color: Colors.primary
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
        marginTop: 15,
    },
    container: {
        paddingTop: 30,
        paddingBottom: 60,
    },
    header_row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontFamily: "medium",
        backgroundColor: Colors.white,
        paddingVertical: 20,
        textAlignVertical: "center",
        borderRadius: 10,
        marginBottom: 10,
    },
    data: {
        backgroundColor: Colors.white,
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
        color: Colors.primary
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