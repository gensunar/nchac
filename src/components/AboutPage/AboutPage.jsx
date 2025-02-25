import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { setSelectedItemSlice } from '../../store/slices/selectedItemSlice'
import { useDispatch } from 'react-redux';
import Section from './Section';
import MyButton from '../../navigation/MyButton';
import {Colors} from "../../../constants/Colors"

const AboutPage = () => {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false)
    const [showMoreHistory, setShowMoreHistory] = useState(false)
    const [show, setShow] = useState(false)



    const handleReadMore = () => {
        setShowMore((prev) => !prev)
    }

    const handleHistory = () => {
        setShowMoreHistory((prev) => !prev)
    }


    const handleAdministrative = () => {
        setShow((prev) => !prev)
    }

    // useEffect(() => {
    //     (setSelectedItemSlice("About NCHAC"))
    // }, [dispatch])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>About NCHAC</Text>
            </View>
            <View><Section /></View>
            <View style={styles.child_container}>
                <Text style={styles.header_text}>About Dima Hasao District</Text>
                <Text style={styles.sub_header_text}>Dima Hasao Map</Text>
                <View style={styles.image_container}>
                    <Image source={require("../../../assets/images/dima_hasao2.jpg")} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.text}>
                        Dima Hasao district is an autonomous district enjoying the Sixth
                        Schedule status granted by the
                        Constitution of India. The Dima Hasao District is administered by
                        North Cachar Hills Autonomous Council (NCHAC). {showMore && "The Autonomous Council is a powerful body and almost all the department of government are under its control except the police and Law & Order is under Assam Government. The district is situated at Southern part of Assam in the North East Region of India. The total area of the district is 4890 Sq.Kms. The major part of district is covered by the hills.The main range is Borail which “Tumjang” is the highest peak at 1866 meter & Hempeupet is the second heighst peak at 1748 meter.The other main range is Khartong range from Dittokcherra to Garampani.The total forest cover of the District is 63777.40 hectare."}
                    </Text>
                    <MyButton buttonTitle={showMore ? "Read Less" : "Read More"} onClick={handleReadMore} backgroundColor={Colors.secondary} color={Colors.white} borderRadius={20} width={150} />
                </View>
                <Text style={styles.stat_header}>Basic Statistic</Text>
                <View style={styles.stat_data}>
                    <View style={styles.row}>
                        <Text>Area : 4888 Sq. Km</Text>
                        <Text>Sub-division : 2</Text>
                        <Text>CD Blocks : 5</Text>
                        <Text>Towns : 4</Text>
                        <Text>Village : 695</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Population : 214102</Text>
                        <Text>Male : 110566</Text>
                        <Text>Female : 102963</Text>
                        <Text>Density (Per Sq. Km) : 44</Text>
                        <Text>Sex Ratio (Per 1000 male) : 932</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.stat_header}>History</Text>
                    <Text style={styles.text}>Dima Hasao was an integral part of the Cachari Kingdom of old and was inhabited by the Dimasa Kacharis as well as by a myriad of other tribal groups like the Zeme Nagas, Hmars, Kukis, Biates, Hrangkhols, Karbis etc. who are extant to this day within the district. When the British arrived, this  {showMoreHistory && "hill district along with adjacent Karbi Anglong were declared as 'partially excluded areas' and, therefore, official legislation did not apply or were applied with modifications as the case may be. On the eve of Independence, various delegations from these two districts made representations before the Bordoloi Committee for a separate autonomous administrative set-up for the safeguard of tribals who were culturally, ethnically and linguistically distinct from the people of the plains."}
                    </Text>
                    <MyButton buttonTitle={!showMoreHistory ? "Read More" : "Read Less"} onClick={handleHistory} backgroundColor={Colors.secondary} color={Colors.white} borderRadius={20} width={150} />
                </View>
                <View>
                    <Text style={styles.stat_header}>Administrative Structure</Text>
                    <Text style={styles.text}>The administrative structure of NC Hills Autonomous Council is similar to that of the state administration in its essence. It comprises of an autonomous council constituted through elections of MACs (Members of Autonomous Councils) every five years which functions like a legislative assembly having legislative and executive powers and convening at the NCHAC Secretariat located in Haflong. From among these MACs, an executive body emerges headed by a CEM (Chief Executive Member), whose role is akin to that of the Chief Minister and has the rank of a state Cabinet Minister, and Executive Members (EMs) whose roles are akin to that of cabinet ministers and have the rank of ministers-of-state.</Text>

                    <Text style={styles.text}>{show && "All the subjects over which the NCHAC has jurisdiction are divided among members of this executive body called Executive Council. The permanent executive, on the other hand, is headed by two Principal Secretaries, one who looks after the inherent subjects and is named Principal Secretary (Normal), and one who looks after the entrusted subjects and is named Principal Secretary (Transferable) who is deputed by the state government and belongs to the ACS or IAS cadre holding a rank of state Joint Secretary and above. Then there are the Secretaries, Joint Secretaries, Deputy Secretaries and Under-Secretaries across both verticals (Normal and Transferable) some of whom are appointed by the NCHAC and some who are deputed by the state from ACS or IAS cadres. All officers of the line departments are placed at the disposal of the Executive Council and executive orders are to be carried out by the permanent executive who are aided by these officers of the line departments."}</Text>

                    <MyButton buttonTitle={!show ? "Read More" : "Read Less"} onClick={handleAdministrative} backgroundColor={Colors.secondary} color={Colors.white} borderRadius={20} width={150} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    text_container: {
        height: 80,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        textAlign: "center",
        fontFamily: 'semi-bold',
        fontSize: 32,
        color: Colors.white,
    },
    header_text: {
        fontFamily: "medium",
        fontSize: 22,
    },
    sub_header_text: {
        fontFamily: 'regular',
        fontSize: 18,
        marginBottom: 20
    },
    child_container: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    image_container: {

    },
    image: {
        height: 400,
        width: "100%",
        objectFit: "fill", 
        borderRadius: 10,
    },
    stat_header: {
        fontSize: 20,
        fontFamily: "semi-bold",
        marginTop: 30,
    },
    text: {
        textAlign: "justify",
        marginTop: 10,
        fontFamily: "regular"
    },
    row: {
        fontFamily: "regular"
    },
    stat_data: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 20,
    },
})
export default AboutPage
