import { View, Text, ScrollView, Image, Pressable, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import ArtistCard from '../components/ArtistCard';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import { AlbumsContext } from '../context/AlbumsContext';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { ArtistsContext } from '../context/ArtistContext';


export default function HomaScreen() {

    const navigation = useNavigation();
    //!albumscontsxten gelen verileri önce böyle conolda görüntüledik
    // const context = useContext(AlbumsContext)
    // console.log(context)
    //! sonra context yapısını parçaladık propları parçaladık yani
    const { albums, loading: albumsLoading, error: albumsError } = useContext(AlbumsContext)
    // console.log(albums)

    const { artists, loading, error } = useContext(ArtistsContext);


    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }} >
            {albumsLoading ? (
                <Loader />
            ) : albumsError ? (
                <Error error={albumsError} />) :
                (<ScrollView style={{ marginTop: 50 }}
                    contentContainerStyle={{ paddingBottom: 100 }}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8W_PocwI2ceUppF1RGwl9WfgbfE6CNXnqQMjMVHGL5yekPDjiv7a3SZ2zb-U&s'
                            }} style={styles.headerImage} />
                            <Text style={styles.headerText}>
                                message
                            </Text>
                        </View>
                        <MaterialCommunityIcons
                            name='lightning-bolt-outline'
                            color='white'
                            size={24} />
                    </View>

                    {/* tabbuttons */}
                    <View style={styles.tabButtons}>
                        <Pressable style={styles.tabButton}>
                            <Text style={styles.tabButtonText}>Music
                            </Text>
                        </Pressable>
                        <Pressable style={styles.tabButton}>
                            <Text style={styles.tabButtonText}> Podcast & Shows</Text>
                        </Pressable>
                    </View>

                    <View>
                        <Pressable
                            onPress={() => navigation.navigate('Liked')}
                            style={styles.likedSongs}>
                            <LinearGradient colors={['#33006F', '#FFFFFF']}>
                                <Pressable style={{
                                    width: 55,
                                    height: 55,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <AntDesign name='heart' color='white' size={24} />
                                </Pressable>
                            </LinearGradient>
                            <Text style={styles.likedSongsText}>
                                Liked Songs
                            </Text>
                        </Pressable>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            flex: 1,
                            marginHorizontal: 10,
                            marginVertical: 8,
                            backgroundColor: '#202020',
                            borderRadius: 4,
                        }}>
                            <Image source={{ uri: 'https://picsum.photos/100/100' }} style={{
                                width: 55, height: 55,
                            }} />
                            <View >
                                <Text style={{
                                    color: 'white',
                                    fontSize: 13,
                                    fontWeight: 'bold'
                                }}>Hippop</Text>
                            </View>

                        </View>

                        {/* flatlist renderıtem */}
                        <Pressable style={{
                            marginVertical: 8,
                            marginHorizontal: 10,
                            backgroundColor: '#282828',
                            flexDirection: 'row',
                            borderRadius: 4,
                        }}>
                            <Image
                                source={{ uri: 'https://picsum.photos/200/300' }}
                                style={{ width: 55, height: 55 }}
                            />
                            <View style={{ flex: 1, marginHorizontal: 8, justifyContent: 'center' }}>

                                <Text style={{
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}>name     </Text>
                            </View>
                        </Pressable>

                        <Text style={styles.sectionTitle}
                        >Your Top Artists</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {
                                artists?.map((artist, index) => (
                                    <ArtistCard key={index} artist={artist} />
                                ))
                            }
                        </ScrollView>

                        <View style={{ height: 10 }} />

                        <Text style={styles.sectionTitle} >
                            Popular Albums
                        </Text>
                        {/* flatliste cevrilecek */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {albums?.map((album, index) => (
                                <AlbumCard album={album} key={index} />
                            ))}
                        </ScrollView>
                    </View>

                </ScrollView>)
            }



        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    headerImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    tabButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 12,
        marginVertical: 5,
    },
    tabButton: {
        backgroundColor: '#282828',
        padding: 10,
        borderRadius: 30,
    },
    tabButtonText: {
        color: 'white', fontSize: 15
    },
    likedSongs: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: '#202020',
        borderRadius: 4,
    },
    likedSongsText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    },
    sectionTitle: {
        color: 'white',
        marginHorizontal: 10,
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 10,
    }
})