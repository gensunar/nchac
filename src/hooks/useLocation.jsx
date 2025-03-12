import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Alert, Linking } from 'react-native'
import * as Location from "expo-location"
import { getPreciseDistance } from 'geolib';


const useLocation = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationText, setLocationText] = useState([])
    const [distance, setDistance] = useState(null)
    const [loadingLocation, setLoadingLocation] = useState(true)

    const requestPermission = async () => {
        let permissionGranted = false;

        while (!permissionGranted) {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status === 'granted') {
                    permissionGranted = true;
                    return true; // Permission granted
                } else {
                    // Show an alert and ask again
                    const shouldRetry = await new Promise((resolve) => {
                        Alert.alert(
                            'Location Permission Required',
                            'This app needs access to your location. Please grant location permission to continue.',
                            [
                                { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
                                { text: 'Try Again', onPress: () => Linking.openSettings() },
                            ]
                        );
                    });

                    if (!shouldRetry) {
                        setErrorMsg('Permission to access location was denied');
                        return false;
                    }
                }
            } catch (error) {
                setErrorMsg('Error requesting location permission');
                return false;
            }
        }
    };

    const getCurrentLocation = async () => {
        const permitted = await requestPermission()
        if (!permitted) return

        try {
            await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 5000, // Update every 5 seconds
                distanceInterval: 10,
            }, async (newLocation) => {
                try {
                    const { latitude, longitude } = newLocation.coords
                    setLatitude(latitude)
                    setLongitude(longitude)
                    setLocation(newLocation.coords)


                    const response = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude,
                    })

                    if (response.length > 0) {
                        setLocationText(response)
                        setLoadingLocation(false)
                    }
                    var distanceData = getPreciseDistance(
                        { latitude, longitude },
                        { latitude: 25.191766059505806, longitude: 93.02257052660393 }
                    )
                    setDistance(distanceData)
                }
                catch (e) {
                    setErrorMsg(e.message)
                }
            });
        } catch (e) {
            setErrorMsg(e.data)
            console.log(e)
        }
    }
    useEffect(() => {
        getCurrentLocation()

        const interval = setInterval(() => {
            if (location) {
                requestPermission()
                getCurrentLocation()
            }
        }, 10000)
        return () => clearInterval(interval)
    }, [])


    let text = 'Waiting...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return { latitude, longitude, errorMsg, locationText, location, distance, loadingLocation }
}

export default useLocation