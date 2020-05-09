import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ImageBackground, TextInput, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../../services/api'

import styles from './styles'

export default function Home ({navigation}) {

    const [destaques, setDestaques] = useState([])
    const [favoritos, setFavoritos] = useState([])
    const [altas, setAltas] = useState([])
    const carouselRef = useRef(null)

    function goToDetail(item) {
        navigation.navigate('Details', { item })
    }

    async function loadDestaques() {
        const res = await api.get('/destaques')
        setDestaques(res.data)
    }

    async function loadFavoritos() {
        const res2 = await api.get('/favoritos')
        setFavoritos(res2.data)
    }

    async function loadAlta() {
        const res3 = await api.get('/trending')
        setAltas(res3.data)
    }

    useEffect(() => {
        loadDestaques()
        loadAlta()
        loadFavoritos()
    }, [favoritos])

    return (
        <View style={{flex: 1}}>
           <ImageBackground
           source={{uri: 'https://www.viajeparana.com/sites/viaje-parana/arquivos_restritos/files/imagem/2019-03/topo_5.jpg'}}
           style={{width: '100%', height: 250}}
           imageStyle={{borderBottomRightRadius: 65}}
           >
                <View style={styles.darkOverlay} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 16}}>
                    <TouchableOpacity>
                        <MaterialIcons name="menu" size={25} color='#fff'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="notifications" size={25} color='#fff'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <Text style={styles.helloUser}>Olá, visitante</Text>
                    <Text style={styles.searchDescription}>O que você gostaria de visitar no litoral paranaense?</Text>
                </View>

                <View>
                    <TextInput textContentType="addressCity" style={styles.searchBox} placeholder="Procure por um ponto turístico" placeholderTextColor="#666" />
                    <MaterialIcons name="search" size={22} color="#30b3ae" style={{position: 'absolute', top: 30, right: 60}}/>
                </View>
           </ImageBackground>

           <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{padding: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Mais visitados</Text>
                </View>
                <FlatList 
                    data={destaques}
                    horizontal={true}
                    keyExtractor={(item) => String(item.id) }
                    showsHorizontalScrollIndicator={false}
                    renderItem={( { item } ) => {
                        return (
                            <View style={{paddingLeft: 16}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => goToDetail(item)}>
                                    <Image source={{uri: item.imagemCard}} style={{height: 300, width: 200, marginRight: 8, borderRadius: 10}}/>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', bottom: 30}}>
                                    <MaterialIcons name="location-on" size={20} color='#eb673b'/>
                                    <Text style={{fontSize: 15, color: '#fff', textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius: 1}}>{item.nome}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={{paddingLeft: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Em alta</Text>
                </View>

               <View style={{marginTop: 16}}>
                <FlatList 
                        data={altas}
                        horizontal={true}
                        keyExtractor={(item) => String(item.id) }
                        showsHorizontalScrollIndicator={false}
                        renderItem={( { item } ) => {
                            return (
                                <View style={{paddingLeft: 16}}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => goToDetail(item)}>
                                        <Image source={{uri: item.imagemCard}} style={{height: 250, width: 300, marginRight: 8, borderRadius: 10}}/>
                                    </TouchableOpacity>
                                    <View style={{flexDirection: 'row', bottom: 30}}>
                                        <MaterialIcons name="location-on" size={20} color='#eb673b'/>
                                        <Text style={{color: '#fff', textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius: 1}}>{item.nome}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
               </View>

                <View style={{marginLeft: 16, marginBottom: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Favoritos</Text>
                </View>
                <FlatList 
                    data={favoritos}
                    horizontal={true}
                    keyExtractor={(item) => String(item.id) }
                    showsHorizontalScrollIndicator={false}
                    renderItem={( { item } ) => {
                        return (
                            <View style={{paddingLeft: 16}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => goToDetail(item)}>
                                    <Image source={{uri: item.imagemCard}} style={{height: 250, width: 150, marginRight: 8, borderRadius: 10}}/>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', bottom: 30}}>
                                    <MaterialIcons name="location-on" size={20} color='#eb673b'/>
                                    <Text style={{fontSize: 15, color: '#fff', textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius: 1}}>{item.nome}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                {favoritos && favoritos.constructor === Array && favoritos.length === 0 ?
                    <View style={{width: '100%', height: 50}}>
                        <Text style={{textAlign: 'center', color: '#666', fontSize: 16}}>Você não tem favoritos ainda.</Text>
                    </View>
                :   null
                }
            </ScrollView>
        </View>

       
    )
}