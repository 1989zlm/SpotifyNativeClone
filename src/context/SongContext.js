// import { createContext, useState } from 'react'

// //1. adım Context oluşturmak için createContext reactttan import edilir ve kullanılır.(bunu yaptıktan sonra app.js gelip navigation ı SongPrivider ile sarmaladık ve buaraya gelip chilrenleri prop olarak yolladık)
// const Songs = createContext();

// //2.adım: Context sağlayıcısıdır ve value propu ile sağlanan değerleri dışarıya aktarır
// //3. children propu bu bileşen tarafından sarılan tüm alt bileşenleri ifade eder.
// const SongsProvider = ({ children }) => {
//     const [songs, setSongs] = useState([]);
//     return <Songs.Provider value={{ songs }}>{children}</Songs.Provider>
// };

// export { SongsProvider, Songs }     