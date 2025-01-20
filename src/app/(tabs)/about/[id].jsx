import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';
import ElectedMembersDetails from '../../../components/AboutPage/electedMembersDetails';
import { electedMembers } from '../../../../constants/maclist';

const MemberId = () => {

    const { memberId } = useLocalSearchParams();

    const [member, setMember] = useState([]);

    useEffect(() => {
        if (memberId) {
            const memberData = electedMembers.find((member) => member.id == memberId);
            setMember(memberData);
        }
    }, [memberId]);


    // render
    return (
        <View>
            <Stack.Screen options={{ headerShown: true, title: `${member.elected_member}` }} />
            <ElectedMembersDetails data={memberId} />
        </View>
    )
}

export default MemberId
