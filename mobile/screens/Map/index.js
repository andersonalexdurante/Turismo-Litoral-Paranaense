import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'

export default function Map({navigation}) {
    const route = useRoute()
    const local = route.params.item

    function goToDetail(item) {
        navigation.navigate('Details', { item })
    }

    return (
        <>
            <MapView
            style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
            showsBuildings={false}
            showsPointsOfInterest={false}
            initialRegion={{
                latitude: local.latitude, 
                longitude: local.longitude, 
                latitudeDelta: 0.6, 
                longitudeDelta: 0.6,}}
            >
                <Marker 
                    coordinate={{latitude: local.latitude, longitude: local.longitude}}
                    title={local.nome}
                />
            </MapView>

            <View style={{flex: 1, position: 'absolute', alignSelf: 'flex-end', padding: 16}}>
                <TouchableOpacity onPress={() => goToDetail(local)} style={{backgroundColor: '#27c227', borderRadius: 50}}>
                    <MaterialIcons name="close" size={30} color='#fff'/>
                </TouchableOpacity>
            </View>
        </>
    )
}