import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native'
import MyButton from "../../navigation/MyButton"
import { Link, useRouter } from 'expo-router'
import { use, useEffect, useState } from 'react'
import PagerView from 'react-native-pager-view';
import { useRef } from 'react';

const Section1 = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const screenWidth = Dimensions.get("window").width
    const router = useRouter()
    const onContinue = () => {
        router.push('/contact')
    }

    const flatListRef = useRef()

    const data = [
        {
            id: "1",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633327/pixelcut-export_3_c8kgsm.jpg",
        },
        {
            id: "2",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633327/pixelcut-export_2_nvvxer.jpg",
        },
        {
            id: "3",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633327/pixelcut-export_6_brxouc.jpg",
        },
        {
            id: "4",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633326/pixelcut-export_kifour.jpg",
        },
        {
            id: "5",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633326/pixelcut-export_kifour.jpg",
        },
        {
            id: "6",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633326/pixelcut-export_1_njr3zh.jpg",
        },
        {
            id: "7",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633326/pixelcut-export_4_vf3wox.jpg",
        },
        {
            id: "8",
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1739633326/hbd23xs97q211_mb8dax.jpg",
        },
    ]


    useEffect(() => {
        let interval = setInterval(() => {
            if (activeIndex === data.length - 1) {
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animated: true,
                })
            } else {
                flatListRef.current.scrollToIndex({
                    index: activeIndex + 1,
                    animated: true,
                })
            }
        }, 2000);
        return () => clearInterval(interval)
    }, [activeIndex])


    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index,
    })

    const renderItem = ({ item, index }) => {
        return (
            <Image source={{ uri: item.image }} style={{ height: 250, width: screenWidth, objectFit: "fill", }} />
        )
    }

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.x
        const index = Math.round(scrollPosition / screenWidth)
        setActiveIndex(index)
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <FlatList
                    data={data}
                    ref={flatListRef}
                    renderItem={renderItem}
                    getItemLayout={getItemLayout}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled={true}
                    onScroll={handleScroll}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        border: 1,
        borderColor: "red",
    },
    card: {
    }
    // image_container: {
    //     position: "relative",
    //     width: '100%',
    //     height: "100%",
    // },
    // image: {
    //     width: "100%",
    //     height: '100%',
    // },
    // button: {
    //     position: "absolute",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     top: '50%',
    //     left: '50%',
    //     transform: [{ translateX: -50 }, { translateY: -50 }]
    // }
})
export default Section1
