import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'



export default function ArtistCard({ artist }) {
    //console.log(artist)
    return (

        <TouchableOpacity>
            <View style={styles.artistContainer}>
                <Image source={{ uri: artist?.data?.visuals?.avatarImage?.sources[0].url }}
                    style={styles.artistImage}
                />
                <Text
                    numberOfLines={1}
                    style={styles.artistName}>{artist?.data?.profile?.name}</Text>
            </View>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    artistContainer: {
        margin: 10,
        width: 100,
    }, artistImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    artistName: {
        color: 'white',
        marginTop: 7,
        textAlign: 'center'
    },


})






//         <View style={{ margin: 10 }}>
//  <Image source={{ uri: 'https://picsum.photos/200/300' }}
//                 style={{ width: 130, height: 130, borderRadius: 5 }}
//             />
//             <Text
//                 style={{
//                     fontSize: 13,
//                     color: 'white',
//                     fontWeight: '500',
//                     marginTop: 10,
//                 }}
//             >name</Text>
//         </View>

