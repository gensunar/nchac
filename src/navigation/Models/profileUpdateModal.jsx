import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView, Modal } from 'react-native'
import { base_url } from '../../../constants/url'
import { auth } from '../../../firebase'
import axios from 'axios'
import TextBox from "../../../constants/InputBox"
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import MyButton from '../MyButton'
import { Colors } from '../../../constants/Colors'


const ProfileUpdateModal = ({ visible, onClose, title, onUpdate  }) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [getImage, setGetImage] = useState(null); //getimagefrom device
    const [imageUrl, setImageUrl] = useState("")
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState("")
    const [dob, setDob] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [designation, setDesignation] = useState("")
    const [isUploading, setIsUploading] = useState(false)

    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log("result", result)
            setGetImage(result.assets[0].uri);
        }
    };


    // const uploadImage = async () => {
    //     try {
    //         if (!getImage) {
    //             Alert.alert("Error", "No image selected")
    //         }
    //         setIsUploading(true)
    //         const formData = new FormData();
    //         formData.append('image', { uri: getImage, type: 'image/jpeg', name: "Name.jpg" })
    //         const token = await auth.currentUser.getIdToken()
    //         const response = await axios.post(`${base_url}/api/user/upload-image`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         })
    //         setImageUrl(response.data.imageUrl)
    //         Alert.alert("Success", response.data.message)
    //         setIsUploading(false)
    //         if (response) {
    //             setGetImage("")
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }


    const fetchProfileData = async () => {
        try {
            const token = await auth.currentUser.getIdToken()
            const response = await axios.get(`${base_url}/api/user/get-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data) {
                setUserData(response.data || "")
                setAddress(userData.address || "")
                setMobile(userData.mobile)
                setDob(userData.dob)
                setName(userData.name)
                setEmail(userData.email)
                setDesignation(userData.designation)
            }
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchProfileData()
        requestPermission()
    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setOpen(false)
        setDate(currentDate);
        setDob(currentDate.toLocaleDateString("en-GB"))
    };
    const handleUpdate = async () => {
        const formattedDate = date.toLocaleDateString("en-GB").split("T")[0]
        try {
            setLoading(true)
            const formData = new FormData();
            if (getImage) {
                formData.append('image', { uri: getImage, type: 'image/jpeg', name: "Name.jpg" })

            }
            formData.append("mobile", mobile || "")
            formData.append("address", address || "")
            formData.append("dob", formattedDate || "")
            formData.append("designation", designation || "")

            const token = await auth.currentUser.getIdToken()
            const response = await axios.put(`${base_url}/api/user/update-profile`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })

            Alert.alert("success", response.data.message)
            setLoading(false)
            if (response) {
                setGetImage("")
                setAddress("")
                setMobile("")
            }
            onUpdate()
            onClose()
        } catch (e) {
            Alert.alert("error", e)
        }
    }

    // render
    return (
        <Modal visible={visible} onRequestClose={onClose} animationType="fade" transparent={true}>
            <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
                <View style={styles.main}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Name</Text>
                        <TextBox
                            placeholder={userData.name}
                            value={userData.name}
                            editable={false}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Email</Text>
                        <TextBox
                            placeholder={userData.email}
                            value={email}
                            editable={false}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Designation</Text>
                        <TextBox
                            placeholder={userData.designation}
                            value={userData.designation}
                            editable={true}
                            style={styles.input}
                            onChangeText={setDesignation}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Address</Text>
                        <TextBox
                            placeholder={userData.address}
                            value={address}
                            style={styles.input}
                            onChangeText={setAddress}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Mobile</Text>
                        <TextBox
                            placeholder={userData.mobile}
                            value={mobile}
                            style={styles.input}
                            keyboardType="number-pad"
                            onChangeText={setMobile}
                            editable={true}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.input_header}>Date of Birth 📆</Text>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <TextBox
                                placeholder={userData.dob}
                                value={dob}
                                editable={false}
                                style={styles.input}
                                onChangeText={setDob}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.button}>
                            <MyButton buttonTitle="Choose File" onClick={pickImage} backgroundColor={Colors.secondary} color="#fefefe" borderRadius={10} />
                            {getImage && (
                                <View style={styles.image_block}>
                                    <Text style={{ fontFamily: "medium" }}>Selected Image:</Text>
                                    <Image source={{ uri: getImage }} style={{ width: 100, height: 100, marginTop: 5, borderRadius: 5 }} />
                                </View>
                            )}
                        </View>
                    </View>
                    {loading ? (<MyButton buttonTitle="Updating" color="#fff" backgroundColor={Colors.primary} borderRadius="30" />) : (<MyButton onClick={handleUpdate} buttonTitle="Update" borderRadius={30} width={"100%"} color={Colors.white} backgroundColor={Colors.primary} style={styles.update} />)}

                </View>
                {open && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                        maximumDate={new Date()}
                        minimumDate={new Date(1950, 0, 1)}
                        timeZoneName='Asia/Calcutta'
                    />
                )}
            </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.27)",
        padding: 15,
    },
    main: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 7,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "medium",
        marginBottom: 10,
        marginTop: 10,
    },
    header: {
        fontFamily: "semi-bold",
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 1,
        marginVertical: 12,
    },
    box: {
        marginHorizontal: 15,
    },
    input_header: {
        color: "rgba(89, 90, 91, 0.44)",
        marginHorizontal: 15,
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    update: {
    },
    image_block: {
        borderColor: "red",
        marginTop: 7,
    }
})


export default ProfileUpdateModal



