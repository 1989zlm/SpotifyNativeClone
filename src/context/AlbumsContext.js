import axios from "axios";
import { createContext, useEffect, useState } from "react";

//1: contextin temellerini oluşturur
const AlbumsContext = createContext();

//2: sarmalayıcı yapı, value propu ile sağlanan değerleri dışarıya aktarır
//* children propu bu bileşen tarafından sarılan tüm alt bileşenleri ifade eder.
const AlbumsProvider = ({ children }) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: 'Türkiye de popüler olanlar',
                type: 'albums',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5'
            },
            headers: {
                'x-rapidapi-key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };
        try {//!api isteği attık
            const response = await axios.request(options)
            //console.log(response.data.albums.items)
            //! apiden gelen datayı parçalayıp obje olarak dışarıya return ediyoruz
            const albumsItems = response.data?.albums?.items?.map(item => ({
                uri: item.data.uri,
                name: item.data.name,
                artist: item.data.artists.items[0].profile.name,
                coverArt: item.data.coverArt.sources[0].url,
                year: item.data.date.year,
            }))
            setAlbums(albumsItems)
            setLoading(false)
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    //!Apiye istek atıyoruz.
    useEffect(() => {
        getData();
    }, [])

    return <AlbumsContext.Provider value={{ albums, loading, error }}>{children}</AlbumsContext.Provider>
}

export { AlbumsContext, AlbumsProvider }