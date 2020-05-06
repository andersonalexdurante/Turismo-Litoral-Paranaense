import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    darkOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0, 
        right: 0,
        backgroundColor: '#000',
        width: '100%',
        opacity: 0.2,
        borderBottomRightRadius: 65
    },

    searchContainer: {
        paddingTop: 0,
        paddingLeft: 16
    },

    helloUser: {
        fontSize: 38, 
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset:{width: 3, height: 3},
        textShadowRadius:1,
    },

    searchDescription: {
        marginTop: 5,
        fontSize: 14,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:1,
    },

    searchBox: {
        marginTop: 16,
        backgroundColor: '#fff',
        width: '90%',
        height: 50,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        padding: 16
    }

})