import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getProfileData = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/user_profile/',
            params: {
                id: 'nocopyrightsounds',
                playlistLimit: '10',
                artistLimit: '10'
            },
            headers: {
                'x-rapidapi-key': 'ef5dea0fdcmshad8336cc79568ffp1f078ajsn12be6bd18e63',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };
        const response = await axios.request(options)
        // console.log(response.data)
        try {
            setProfileData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error)
            setLoading(false)

        }
    }

    useEffect(() => {
        getProfileData();
    }, [])
    return <ProfileContext.Provider value={{ profileData, loading, error, getProfileData }}>{children}</ProfileContext.Provider>
}
export { ProfileProvider, ProfileContext }