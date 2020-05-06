import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import api from '../../services/api'

import styles from './styles'

export default function Home ({navigation}) {

    const [destaques, setDestaques] = useState([])
    const [recent, setRecent] = useState('https://lh3.googleusercontent.com/proxy/UB-23TRmi0g2_er20voIF8XJqqVabT8q7-y3HaAuIOqQA-q4ZJWu_10BJHa6-4GsH8GlXUvvtEmJJ4PrKuXd0uErC2E5odFxxUrmkzh8k-M9BQ')

    function goToDetail(item) {
        navigation.navigate('Details', { item })
    }

    async function loadLocals() {
        const res = await api.get('/locais')

        setDestaques(res.data)
        
    }

    useEffect(() => {
        loadLocals()
    }, [])

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

           <ScrollView>
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
                                <TouchableOpacity onPress={() => goToDetail(item)}>
                                    <Image source={{uri: item.imagemCard}} style={{height: 250, width: 150, marginRight: 8, borderRadius: 10}}/>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', bottom: 30}}>
                                    <MaterialIcons name="location-on" size={20} color='#eb673b'/>
                                    <Text style={{color: '#fff', textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius: 1}}>{item.nome}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={{paddingLeft: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Pesquisado Recentemente</Text>
                </View>
                <TouchableOpacity>
                    <Image source={{uri: recent}} style={{width: '92%', height: 250, borderRadius: 10, marginTop: 16, alignSelf: 'center'}} />
                    <View style={{flexDirection: 'row', bottom: 90, paddingLeft: 30}}>
                        <MaterialIcons name="location-on" size={20} color='#eb673b'/>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, textShadowColor: '#000', textShadowOffset:{width: 1, height: 1}, textShadowRadius:1}}>Rio Guaraguaçu</Text>
                    </View>
                    <View style={{bottom: 85, paddingLeft: 25, paddingRight: 25}}>
                        <Text style={{color: '#fff', opacity: 0.8, fontSize: 14, textAlign: 'justify'}}>O rio Guaraguaçu atravessa todo o litoral paranaense. É o principal rio da bacia de Paranaguá.</Text>
                    </View>
                </TouchableOpacity>
                
            </ScrollView>
        </View>

       
    )
}