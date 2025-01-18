import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import MyButton from "../../navigation/MyButton"
import { Link, useRouter } from 'expo-router'
import { use } from 'react'

const Section1 = () => {
    const router = useRouter()
    const onContinue = () => {
        router.push('/contact')
    }
    return (
        <View style={styles.container}>
            <View style={styles.image_container}>
                <Image source={require('../../../assets/images/tumjang.jpg')} style={styles.image}  resizeMode="cover" />
                <View style={styles.button}>
                    <MyButton buttonTitle={"Continue"} onClick={onContinue} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        height:700,
        backgroundColor: "red"
    },
image_container:{
    position: "relative",
    width: '100%',
    height: "100%",
},
    image: {
        width: "100%",
        height: '100%',
    },
    button: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top:'50%',
        left:'50%',
        transform: [{translateX: -50}, {translateY: -50}]
    }
})
export default Section1
