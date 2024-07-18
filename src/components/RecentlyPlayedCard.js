import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function RecentlyPlayedCard() {
    const navigation = useNavigation()
    return (
        <Pressable
            onPress={() => navigation.navigate('Info')}
            style={{
                margin: 10,
            }}>
            <Image source={{ uri: 'https://picsum.photos/200/300' }}
                style={{
                    width: 130,
                    height: 130,
                    borderRadius: 5,
                }}
            />
            <Text style={{
                color: 'white',
                fontSize: 13,
                fontWeight: '500',
                marginTop: 10,
            }}>name</Text>
        </Pressable>
    )
}