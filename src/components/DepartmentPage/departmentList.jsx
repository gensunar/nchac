import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Image, SafeAreaView } from 'react-native'
import { departments, department } from "../../../constants/departmentData"



const DepartmentList = () => {

    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style={styles.header}>DEPARTMENTS</Text>
            </View>
            <View style={styles.department}>
                <View style={styles.ent_department}>
                    <Text style={styles.header_text}>ENTRUSTED DEPARTMENTS</Text>
                    <Text style={styles.definition}>
                        Entrusted Departments: The departments which are functioning under
                        the State Government which are subsequently handed over to the Authority
                        of Dima Hasao Autonomous Council, Haflong after the Memorandum of
                        Understanding was signed.
                    </Text>
                </View>
                <View style={styles.dept_frame}>
                    {departments.map((item) => {
                        return (
                            <View key={item.id} style={styles.dept_card}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <Text style={styles.dept_name_text}>{item.name}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            <View style={styles.department}>
                <View style={styles.ent_department}>
                    <Text style={styles.header_text}>INHERENT SUBJECTS</Text>
                    <Text style={styles.definition}>
                        On creation of the then United Mikir Hills
                        and North Cachar Hills District, the government of India and Assam give
                        special status of Council to function as local government for protection,
                        safeguarding, and improvement of the local indigenous tribes for which
                        departments are created under the administrative control of Dima Hasao
                        Autonomous Council which are called as Inherent Departments.
                    </Text>
                </View>
                <View style={styles.dept_frame}>
                    {department.map((item) => {
                        return (
                            <View key={item.id} style={styles.dept_card}>
                                <Image source={{ uri: item.download_url }} style={styles.image} />
                                <Text style={styles.dept_name_text}>{item.name}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_container: {
        backgroundColor: "red",
        height: 100,
        justifyContent: "center",
    },
    header: {
        color: "#fff",
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "Bold"
    },
    header_text: {
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "semi-bold",
        marginBottom: 10,
    },
    definition: {
        textAlign: "justify",
        fontFamily: "regular",
        fontSize: 16,
    },
    department: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    ent_department: {
        marginTop: 20,
    },
    dept_frame: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderRadius: 8,
        marginTop: 20,
    },
    dept_card: {
        width: '48%',
        marginBottom: 16,
        backgroundColor: '#E9ecef',
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    dept_name_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#343a40',
        textAlign: 'center',
        fontFamily: "semi-bold"
    },
})


export default DepartmentList
