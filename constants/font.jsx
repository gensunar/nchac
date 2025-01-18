import { useFonts } from "expo-font"


export const fonts = {
    bold: require('../assets/fonts/Poppins-Bold.ttf'),
    bolditalic: require('../assets/fonts/Poppins-BoldItalic.ttf'),
    black: require('../assets/fonts/Poppins-Black.ttf'),
    blackitalic: require('../assets/fonts/Poppins-BlackItalic.ttf'),
    bold: require('../assets/fonts/Poppins-Bold.ttf'),
    semibold: require('../assets/fonts/Poppins-SemiBold.ttf')
}

// export default function Font() {
//     const [loaded, error] = useFonts({
//         'bold' : require('../assets/fonts/Poppins-Bold.ttf'),
//         'bold-italic' : require('../assets/fonts/Poppins-BoldItalic.ttf'),
//         'black' : require('../assets/fonts/Poppins-Black.ttf'),
//         'black-italic' : require('../assets/fonts/Poppins-BlackItalic.ttf'),
//         'bold' : require('../assets/fonts/Poppins-Bold.ttf'),
//         'semi-bold' : require('../assets/fonts/Poppins-SemiBold.ttf')
//     })

//     if(!loaded || error){
//         return (null)
//     }
// }