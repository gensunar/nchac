import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text, Image } from 'react-native'
import { Colors } from '../../../constants/Colors'

const Section5 = () => {
    const screenWidth = Dimensions.get("window").width - 25
    const [activeIndex, setActiveIndex] = useState(0)
    const flatListRef = useRef()



    const data = [
        {
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1740673931/Haflong_lake_ae4ryw.jpg",
            title: "Haflong Lake"
        },
        {
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1740673931/Haflong_nqawbh.jpg",
            title: "Muolhoi"
        },
        {
            image: "https://res.cloudinary.com/ds4adb2me/image/upload/v1740673931/Haflong_town_tcgtgu.jpg",
            title: "Haflong Town"
        },
    ]

    const handleScroll = (e) => {
        const scrollPosition = e.nativeEvent.contentOffset.x
        const index = Math.round(scrollPosition / screenWidth)
        setActiveIndex(index)
    }

    const getItemLayout = (data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index: index,
    })

    // render
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Glimpse of Haflong</Text>
            <View >
                {/* {data.map((item, index) => (
                    <View key={item.index}>
                        <Image source={{uri: item.image}} height={200} width={200} />
                        <Text>{item.title}</Text>
                    </View>
                ))} */}
                <FlatList
                    data={data}
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onScroll={handleScroll}
                    getItemLayout={getItemLayout}
                    renderItem={({ item }) =>
                        <View style={styles.card}>
                            <View style={styles.image_container}>
                                <Image source={{ uri: item.image }} alt='fill' style={styles.image} width={screenWidth} />
                            </View>
                            <TouchableOpacity style={styles.title_header}>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 50,
        height: 550,
    },
    card: {
        position: "Absolute"
    },
    image_container: {
        height: 400,
    },
    image: {
        height: "100%",
        borderRadius: 20,
        marginRight: 5,
    },
    header: {
        fontFamily: "medium",
        fontSize: 26,
        textAlign: "center",
        marginBottom: 20,
    },
    title_header: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: Colors.primary,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    title: {
        fontFamily: "medium",
        fontSize: 20,
        color: Colors.white
    },
})


export default Section5
