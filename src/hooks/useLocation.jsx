import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Location from "expo-location"
import * as TaskManager from 'expo-task-manager';

const useLocation = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationText, setLocationText] = useState([])


    const requestPermission = async () => {
        const foreground = await Location.requestForegroundPermissionsAsync();
        if (foreground.status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    }

    const getCurrentLocation = async () => {
        await Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 10,
        }, (newLocation) => {
            setLocation(newLocation.coords);
        });
        const { latitude, longitude } = location
        setLatitude(latitude)
        setLongitude(longitude)
        console.log(location)
        let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        })
        setLocationText(response)
    }
console.log(locationText)

    useEffect(() => {
        requestPermission()
        getCurrentLocation()
    }, [])

    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return { latitude, longitude, errorMsg, locationText }
}

export default useLocation