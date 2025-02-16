import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { base_url } from '../../../constants/url'
import { auth } from '../../../firebase'
import axios from 'axios'
import TextBox from "../../../constants/InputBox"
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import MyButton from "../../navigation/MyButton"
import ProfileUpdateModal from '../../navigation/Models/profileUpdateModal'
import config from '../../../config'


const UpdateProfile = () => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)

    const [showUpdateForm, setShowUpdateForm] = useState(false)


    const fetchProfileData = async () => {
        try {
            const token = await auth.currentUser.getIdToken()
            const response = await axios.get(`${config.baseUrl}/api/user/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLoading(false)
            setUserData(response.data)
        }
        catch (e) {
            Alert.alert("Error", e.message)
        }
    }


    useEffect(() => {
        fetchProfileData()
    }, [])



    const handleEdit = async () => {
        setShowUpdateForm(true)
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
        <ScrollView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.profile_image}>
                    <View style={styles.image_container}>
                        <Image source={{ uri: userData.image }} width={150} height={150} style={styles.image} fill />
                    </View>
                    <Text style={styles.name}>{userData.name}</Text>
                    <Text style={styles.email}>{userData.email}</Text>
                </View>
                <View style={styles.profile_data}>
                    {/* <View style={styles.box}>
                        <Text style={styles.input_header}>Name</Text>
                        <Text style={styles.input}>{userData.name}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Email</Text>
                        <Text style={styles.input}>{userData.email}</Text>
                    </View> */}
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Designation</Text>
                        <Text style={styles.input}>{userData.designation}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Address</Text>
                        <Text style={styles.input}>{userData.address ? userData.address : "NA"}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Mobile 📞</Text>
                        <Text style={styles.input}>+91 {userData.mobile ? userData.mobile : "NA"}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Date of Birth 📆</Text>
                        <Text style={styles.input}>{userData.dob ? userData.dob : "NA"}</Text>
                    </View>
                    <View style={styles.button}>
                        <MyButton onClick={handleEdit} buttonTitle="Edit" color="#fff" backgroundColor="#9fd4d5" />
                    </View>
                </View>
            </View>
            <ProfileUpdateModal
                visible={showUpdateForm}
                title="Update Profile"
                onClose={() => setShowUpdateForm(false)}
                onUpdate={fetchProfileData}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontFamily: "medium",
        fontSize: 20,
        textAlign: "center",
        letterSpacing: 1,
        marginVertical: 12,
    },
    profile_image: {
        backgroundColor: "rgb(255,255,255)",
        borderRadius: 10,
        paddingVertical: 20,
    },
    profile_data: {
        backgroundColor: "rgb(255,255,255)",
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: 12,
    },
    image_container: {
        display: "flex",
        alignItems: "center",
        marginBottom: 25,
    },
    image: {
        objectFit: "contain",
        borderWidth: 1,
        borderColor: "rgba(89, 90, 91, 0.27)",
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    name: {
        fontFamily: "medium",
        fontSize: 26,
        marginBottom: -7,
        textAlign: "center",
    },
    email: {
        fontFamily: "extra-light",
        textAlign: "center"
    },
    main: {
        borderRadius: 5,
    },
    box: {
        marginHorizontal: 15,
        marginVertical: 3,
    },
    input_header: {
        color: "rgba(89, 90, 91, 0.44)",
        marginBottom: 10,
    },
    input: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(89, 90, 91, 0.52)",
    },
    button: {
        marginTop: 30,
    },
})

export default UpdateProfile

