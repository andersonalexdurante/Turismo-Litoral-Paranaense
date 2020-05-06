import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../../services/api'

export default function Details ({navigation}) {

    const [sugestoes, setSugestoes] = useState([])

    const route = useRoute()
    const local = route.params.item

    function goToHome() {
        navigation.navigate('Home')
    }

    async function loadLocals() {
        const res = await api.get('/locais')

        setSugestoes(res.data)
        
    }

    useEffect(() => {
        loadLocals()
    }, [])


    return (
        <View style={{flex: 1}}> 
            <ImageBackground
            source={{uri: local.imagemDetail}}
            style={{height: 380}}
            imageStyle={{borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}
            >
                <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={goToHome} style={{backgroundColor: '#27c227', borderRadius: 50, marginLeft: 16, marginTop: 16}}>
                        <MaterialIcons name="keyboard-backspace" size={30}  color='#fff'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius: 50, marginRight: 16, marginTop: 16}}>
                        <MaterialIcons name="favorite-border" size={30}  color='#fff'/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 200, position: 'absolute'}}>
                    <Text style={{color: '#fff', fontSize: 16, paddingHorizontal: 14, marginBottom: 20,textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius:1}}>Descubra {local.nome}</Text>
                    <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', paddingHorizontal: 14,textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius:1}}>Explore a beleza incrível de {local.nome}</Text>
                    <TouchableOpacity style={{backgroundColor: '#27c227', position: 'absolute', borderRadius: 30, top: 110, left: 210, flexDirection: 'row', padding: 10}}>
                        <MaterialIcons name="location-on" size={20} color='#eb673b' />
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Localização</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <ScrollView>
                <View style={{padding: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sobre o lugar</Text>
                    <Text style={{opacity: 0.8, textAlign: 'justify', marginTop: 10, lineHeight: 20}}>{local.descricao}</Text>
                </View>

                <View style={{paddingHorizontal: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sugestões</Text>
                    <FlatList 
                    data={sugestoes}
                    horizontal={true}
                    keyExtractor={(item) => String(item.id) }
                    showsHorizontalScrollIndicator={false}
                    renderItem={( { item } ) => {
                        return (
                            <View style={{paddingTop: 16}}>
                                <TouchableOpacity onPress={() => goToDetail(item)}>
                                    <Image source={{uri: item.imagemCard}} style={{height: 250, width: 150, marginRight: 8, borderRadius: 10}}/>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', bottom: 30}}>
                                    <MaterialIcons name="location-on" size={20} color='#fff'/>
                                    <Text style={{color: '#fff', textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius: 1}}>{item.nome}</Text>
                                </View>
                            </View>
                        )
                    }}
                />  
                </View>

            </ScrollView>
        </View>
    )
}