import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { electedMembers } from '../../../constants/maclist'

const ElectedMembersDetails = ({ data }) => {
    const [member, setMember] = useState([]);

    useEffect(() => {
        if (data) {
            const filteredData = electedMembers.find((member) => member.id == data);
            setMember(filteredData);
        }
    }, [data]);

    // render
    return (
        <View style={styles.container}>
            <View style={styles.child_container}>
                <Image source={{ uri: member.iconLink }} style={styles.image} />
                {/* <Text style={styles.name}>{member.elected_member}</Text> */}
                <Text style={styles.name}>{member.elected_member}</Text>
                <Text style={styles.constituency}>{member.constituency}</Text>
                <Text style={styles.department}>{member.departments}</Text>
                <Text style={styles.department}>{member.other_subjects ? member.other_subjects : "Nil"}</Text>
                <Text style={styles.contact}>{member.contact}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 20,
        alignItems: "center",
        marginTop: 25,
    },
    child_container: {
        backgroundColor: "#E9ecef",
        borderRadius: 12,
        padding: 20,
        width: "95%",
        height: 500,
    },
    image: {
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },
    name: {
        fontSize: 26,
        fontFamily: "bold",
        marginBottom: 10,
    },
    constituency: {
        fontSize: 22,
        fontFamily: "medium",
    },
    department: {
        fontFamily: 20,
        fontFamily: "light"
    },
    contact: {
        fontFamily: "regular",
        fontSize: 18
    },

})


export default ElectedMembersDetails
