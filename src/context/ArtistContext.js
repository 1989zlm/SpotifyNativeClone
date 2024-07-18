import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const ArtistsContext = createContext();

const ArtistsProvider = ({ children }) => {

    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getArtists = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: 'Türkiye de pupüler',
                type: 'artists',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5'
            },
            headers: {
                'x-rapidapi-key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options)
            // console.log(response.data.artists.items)
            const data = response.data.artists.items;
            //console.log(data)
            setArtists(data);
            setLoading(false)
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        getArtists();
    }, [])

    return <ArtistsContext.Provider value={{ artists, loading, error }}>{children}</ArtistsContext.Provider>

}

export { ArtistsContext, ArtistsProvider }