import { View, Text, ScrollView, Pressable, TextInput, ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import SongItem from '../components/SongItem'
import { ModalContent } from 'react-native-modals'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modal';
import axios from 'axios'
import TrackPlayer, { useProgress } from 'react-native-track-player'




export default function LikedSongScreen() {

    const navigation = useNavigation();

    const progress = useProgress(); // müzük çalarken kalan ve geçen sürenin yönetimi için.
    //console.log(progress);

    const [searchText, setSearchText] = useState('Türkiye de Popüler Müzikler')
    //  console.log(searchText)

    const [searchedTracks, setSearchedTraks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null)//şarkıcının ve şarkının isimlerini ve resmini almak için
    const [modalVisible, setModalVisible] = useState(false)
    //console.warn(modalVisible)


    const handleSearch = async () => {
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/search',
            params: {
                term: searchText,
                locale: 'tr-TR',
                offset: '0',
                limit: '5'
            },
            headers: {
                'x-rapidapi-key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
                'x-rapidapi-host': 'shazam.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setSearchedTraks(response.data.tracks.hits);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    const setupPlayer = async () => {
        try {
            // TrackPlayer kütüphanesinin oynatıcıyı kurmasını sağlar. Bu işlem, oynatıcıyı başlatmak için gerekli olan yapılandırmayı sağlar.
            await TrackPlayer.setupPlayer();// müzik çaların bütün temellerini buarada oluşturduk
            TrackPlayer.updateOptions({
                // OYNATICININ SAHİP OLSUĞU ÖZELLİKLERİ BELİRLER.
                capabilities: [
                    TrackPlayer.CAPABİLİTY_PLAY,
                    TrackPlayer.CAPABİLİTY_PAUSE,
                    TrackPlayer.CAPABİLİTY_STOP,
                    TrackPlayer.CAPABİLİTY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABİLİTY_SKIP_TO_PERVIOUS,
                    TrackPlayer.CAPABİLİTY_SEEK_TO,
                ],
                //BİLDİRİM ÇUBUĞUNUN ÖZELLİKLERİ
                // compactCapabilities: [
                //     TrackPlayer.CAPABİLİTY_PLAY,
                //     TrackPlayer.CAPABİLİTY_PAUSE,
                //     TrackPlayer.CAPABİLİTY_SKIP_TO_NEXT,
                //     TrackPlayer.CAPABİLİTY_SKIP_TO_PERVIOUS,

                // ]
            })
        } catch (error) {
            console.log('error setting up player:', error)
        }
    }



    const handlePlay = async track => {
        // console.warn('çalışii')
        //   console.log(track)
        const trackData = {
            id: track.track.key,
            url: track.track.hub.actions.find(action => action.type === 'uri').uri,// ses dosyasının urli
            title: track.track.title,
            artist: track.track.subtitle,
            artwork: track.track.images.coverart,

        }
        //  console.log(trackData)
        try {
            await TrackPlayer.reset();// bu 3 işlmein çalışması için setup player tanıtmalıyız yoksa çalışmaz dökümanda öyle yazıyorz. oynaıtıcının temel yapısını oluşturuyoruz
            await TrackPlayer.add(trackData);
            await TrackPlayer.play();
            setSelectedTrack(track.track)
            setModalVisible(true);
            setIsPlaying(true)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleSearch();//varsayılan müzik listesi ekranda görünsün
        setupPlayer();
    }, [])
    // console.log(selectedTrack)

    const formatTime = seconds => {
        //toplam saniyeyi dakikaya çevir
        const mins = Math.floor(seconds / 60);
        //toplam saniye sayısından geriye kalan saniyeye hesaplar
        const secs = Math.floor(seconds % 60);
        return ` ${mins}: ${secs < 10 ? '0' : ''}${secs}`
    };

    const togglePlayback = async () => {
        if (isPlaying) {
            //müzik oynatılıyorsa durdur
            await TrackPlayer.pause();
        } else {
            // müzik duruyorsa oynat
            await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying)
    };
    // oynatılan müziği 10 saniye geriye alır
    const seekBackward = async () => {
        const position = await TrackPlayer.getPosition();
        //  console.log(position)
        await TrackPlayer.seekTo(position - 10);
    };

    const seekForward = async () => {
        const position = await TrackPlayer.getPosition();
        //  console.log(position)
        await TrackPlayer.seekTo(position + 10);
    };

    return (
        <>
            <LinearGradient colors={['#614385', '#516395']} style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginTop: 50 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={{ marginHorizontal: 10 }}>
                            <Ionicons name='arrow-back' size={24} color='white' />
                        </Pressable>

                        <Pressable style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            marginTop: 9,
                        }}>
                            <Pressable style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                                padding: 9,
                                // flex: 1,
                                height: 38,
                                backgroundColor: '#42275a',
                                borderRadius: 8,
                            }}>
                                <AntDesign name='search1' color='white' size={24} />
                                <TextInput
                                    placeholderTextColor={'white'}
                                    placeholder='Find in Liked songs'
                                    style={{
                                        fontWeight: '500', color: 'white',
                                        width: '85%'
                                    }}
                                    onChangeText={setSearchText} //inputa yazdığımızı görelim
                                    onSubmitEditing={handleSearch}//klavyeden entera basınca çalışsın
                                />
                            </Pressable>

                            {/* <Pressable style={{
                                marginHorizontal: 10,
                                marginVertical: 10,
                                backgroundColor: '#42275a',
                                padding: 10,
                                borderRadius: 8,
                                height: 38,
                            }}>
                                <Text style={{ color: 'white' }}>Sort</Text>
                            </Pressable> */}
                        </Pressable>
                    </View>


                    <View style={{ height: 50 }}>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Liked Songs</Text>
                            <Text style={{ fontSize: 13, color: 'white', marginTop: 5 }}>{searchedTracks.length} songs</Text>
                        </View>
                    </View>

                    {/* <Pressable style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 10,
                    }}>
                        <Pressable style={{
                            width: 30,
                            height: 30,
                            backgroundColor: '#1DB954',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                        }}>
                            <AntDesign name='arrowdown' size={20} color='white' />
                        </Pressable>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                        }}>
                            <MaterialCommunityIcons
                                name='cross-bolnisi' size={24} color='#1DB954'
                            />
                            <Pressable style={{
                                width: 60,
                                height: 60,
                                backgroundColor: '#1DB954',
                                borderRadius: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Entypo name='controller-play' color='white' size={24} />
                            </Pressable>
                        </View>
                    </Pressable> */}

                    {loading ? (
                        <ActivityIndicator size={'large'} color={'gray'} />) : (
                        <FlatList
                            data={searchedTracks}
                            keyExtractor={item => item.track.key}
                            renderItem={({ item }) => (
                                <Pressable onPress={() => handlePlay(item)}>
                                    <View style={styles.trackContainer}>
                                        <Image source={{ uri: item.track.images.coverart }}
                                            style={styles.albumCover}
                                        />
                                        <View style={styles.trackInfo}>
                                            <Text style={styles.trackName}>{item.track.title}</Text>
                                            <Text style={styles.albumName}>{item.track.subtitle}</Text>
                                        </View>
                                        <Entypo name='controller-play' size={24} color='white' />
                                    </View>
                                </Pressable>)}
                        />
                    )}

                </ScrollView>
            </LinearGradient>

            {/* <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                    backgroundColor: '#5072A7',
                    padding: 10,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'absolute',
                    left: 20,
                    bottom: 10,
                    borderRadius: 6,
                    marginBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgaJH2Uz0Q5mICq4WgvN-e9sLPFNHNP5qoAAjJEiwra1opz2dcaRCWOzNNjg&s' }}
                        style={{ width: 40, height: 40, }} />

                    <Text style={{
                        fontSize: 13,
                        width: 220,
                        color: 'white',
                        fontWeight: 'bold'
                    }}>name</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <AntDesign name='heart' size={24} color={'#1DB954'} />
                    <Pressable>
                        <AntDesign name='pausecircle' size={24} color={'white'} />
                    </Pressable>
                </View>

            </Pressable> */}



            <Modal isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                swipeDirection='down'// modalin hangi yöne doğru kaydırılacağını belirler''up yaparsan yukarı doğru kaydırır
                onSwipeComplete={() => setModalVisible(false)}
                style={{ margin: 0 }}
            >
                <View style={{
                    backgroundColor: '#5072A7',
                    width: '100%',
                    height: '100%',
                    paddingTop: 60,
                    paddingHorizontal: 10,
                }}>
                    <View

                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <AntDesign name='down' color='white' size={24} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>song name</Text>
                        <Entypo name='dots-three-vertical' size={24} color='white' />
                    </View>

                    <View style={{ padding: 10, marginTop: 20 }}>
                        <Image source={{ uri: selectedTrack?.images.coverart }} style={{ width: '100%', height: 330, borderRadius: 4 }} />

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 20,
                            }}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{selectedTrack?.title}</Text>
                                <Text style={{ color: '#D3D3D3', marginTop: 4 }}>{selectedTrack?.subtitle}</Text>
                            </View>
                            <AntDesign name='heart' size={24} color='#1DB954' />
                        </View>

                        <View style={{ marginTop: 10, }}>
                            <View style={{
                                width: '100%',
                                marginTop: 10,
                                height: 3,
                                backgroundColor: 'gray',
                                borderRadius: 5,
                            }}>
                                <View style={[styles.progressbar, {
                                    width: `${(progress.position / progress.duration) * 100}%`,
                                },
                                ]} />
                                <View style={{
                                    position: 'absolute',
                                    top: -5,
                                    width: 10,
                                    height: 10,
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                    left: `${(progress.position / progress.duration) * 100}%`,
                                }} />
                            </View>

                            <View style={{
                                marginTop: 12,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 15 }}>{formatTime(progress.position)}</Text>
                                <Text style={{ color: 'white', fontSize: 15 }}>{formatTime(progress.duration)}</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 17,

                            }}>
                                <Pressable onPress={seekBackward}>
                                    <Entypo name='controller-fast-backward' size={30} color={'white'} />
                                </Pressable>
                                <Pressable>
                                    <Ionicons name='play-skip-back' size={30} color={'white'} />
                                </Pressable>
                                <Pressable onPress={togglePlayback}>
                                    {isPlaying ? (<AntDesign name='pausecircle' size={60} color='white' />) : (
                                        <Entypo name='controller-play' size={60} color='white' />
                                    )}
                                </Pressable>
                                <Pressable>
                                    <Ionicons name='play-skip-forward' size={30} color='white' />
                                </Pressable>
                                <Pressable onPress={seekForward}>
                                    <Entypo name='controller-fast-forward' size={30} color={'white'} />
                                </Pressable>

                            </View>

                        </View>

                    </View>

                </View>
            </Modal>

        </>
    )
}

const styles = StyleSheet.create({
    progressbar: {
        height: '100%',
        backgroundColor: 'white',
    },
    albumCover: {
        width: 60,
        height: 60,
    },
    trackContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    trackInfo: {
        flex: 1,
        marginLeft: 10,
    },
    trackName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    albumName: {
        fontSize: 14,
        color: '#75D694'
    }
})