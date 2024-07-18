import { View, Text } from 'react-native'
import React from 'react'

export default function Error(albumsError) {
    return (
        <View>
            <Text>{albumsError.message}</Text>
        </View>
    )
}