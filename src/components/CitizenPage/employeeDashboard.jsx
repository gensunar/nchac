import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import MyButton from '../../navigation/MyButton'
import { auth, db } from '../../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { register, logout } from '../../store/slices/user'
import { doc, getDoc } from 'firebase/firestore'

const employeeDashboard = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [userData, setUserData] = useState(null)
    const [userSnapData, setUserSnapData] = useState("")
    const [loading, setLoading] = useState(user.isLoggedIn)


    const router = useRouter()


    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(logout())
            setUserData(null)
            // router.replace("/citizen/registration")
        }
        catch (e) {
            console.log(e)
        }
    }

    const getUserData = async () => {
        const userDoc = doc(db, "users", userData?.uid)
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
            setUserSnapData(userSnap.data())
            setLoading(false)
        }
    }


    useEffect(() => {
        getUserData()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user)
                dispatch(register({
                    email: userData.email,
                    uid: userData.uid,
                    name: userData.displayName,
                }))
                // console.log(JSON.stringify(user, null, 2))
            }
        });
        return unsubscribe
    }, [dispatch, userData])


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    // render
    if (user.isLoggedIn) {
        return (
            <>
                <Text>This is {userSnapData.displayName} dashboard </Text>
                <Text>{userSnapData.email}</Text>
                <Text>{userSnapData.phoneNumber}</Text>

                <MyButton onClick={handleLogout} buttonTitle={"Sign Out"} backgroundColor="red" />
            </>
        )
    }
    return (
        <View>
            <Text>Please login to access</Text>
        </View>
    )
}

export default employeeDashboard
