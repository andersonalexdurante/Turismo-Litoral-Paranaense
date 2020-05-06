import React, { useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles'

export default function Details ({navigation}) {

    const [image, setImage] = useState('https://brazilianexperience.com/wp-content/uploads/2014/01/ilha-do-mel-3.jpg')

    const [gallery, setgallery] = useState([
        { 
            image: 'https://104maisfm.com.br/wp-content/uploads/2020/01/ilha-do-mel.jpg',
            title: 'Ilha do Mel',  
            key: '1' 
        },
        { 
            image: 'https://marsemfim.com.br/wp-content/uploads/2014/05/salto-mil-.jpg',
            title: 'Salto Morato', 
            key: '2' 
        },
        { 
            image: 'https://www.ilhabela.com.br/wp-content/uploads/2013/02/praia-mansa-ilhabela-ilhabelacombr-2.jpg',
            title: 'Praia Mança',  
            key: '3' 
        },
        { 
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/9f/cf/e7/passarela-ilha-dos-valadares.jpg',
            title: 'Centro Histórico',
            key: '4' 
        },
    ]);

    function goToHome() {
        navigation.navigate('Home')
    }

    return (
        <View style={{flex: 1}}> 
            <ImageBackground
            source={{uri: image}}
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
                <View style={{marginTop: 200}}>
                    <Text style={{color: '#fff', fontSize: 16, paddingHorizontal: 14, marginBottom: 20}}>Descubra Ilha do Mel</Text>
                    <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', paddingHorizontal: 14}}>Explore a beleza incrível de Ilha do Mel</Text>
                    <TouchableOpacity style={{backgroundColor: '#27c227', position: 'absolute', borderRadius: 30, top: 110, left: 210, flexDirection: 'row', padding: 10}}>
                        <MaterialIcons name="location-on" size={20} color='#fff' />
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Localização</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <ScrollView>
                <View style={{padding: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sobre o lugar</Text>
                    <Text style={{opacity: 0.8, textAlign: 'justify', marginTop: 10}}>A ilha do Mel é um ponto turístico de muita importância no estado do Paraná. Muitas pessoas consideram que a ilha tem as melhores praias do estado. A ilha, fazendo parte do município de Paranaguá, é administrada pelo Instituto Ambiental do Paraná (IAP) e possui um restrito programa de manejo. Não é permitida a tração animal ou a motor na ilha. Existem muitas áreas onde não é permitida a presença de visitantes. A ilha possui quatro pontos turísticos de destaque: Ao norte a Fortaleza, no centro Nova Brasília e o Farol das Conchas e ao Sul Encantadas.</Text>
                </View>

                <View style={{paddingHorizontal: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Sugestões</Text>
                    <FlatList 
                    data={gallery}
                    horizontal={true}
                    renderItem={ ({ item } ) => {
                        return (
                            <View style={{marginTop: 16}}>
                                <TouchableOpacity>
                                    <Image source={{uri: item.image}} style={{height: 250, width: 150, marginRight: 8, borderRadius: 10}}/>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', bottom: 30}}>
                                    <MaterialIcons name="location-on" size={20} color='#fff'/>
                                    <Text style={{color: '#fff'}}>{item.title}</Text>
                                </View>
                            </View>
                        )}
                    }
                    />                    
                </View>

            </ScrollView>
        </View>
    )
}