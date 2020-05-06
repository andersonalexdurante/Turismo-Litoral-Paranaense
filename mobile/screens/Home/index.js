import React, { useState } from 'react'
import { View, Text, ImageBackground, TextInput, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import styles from './styles'

export default function Home ({navigation}) {

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

    const [recent, setRecent] = useState('https://www.viajeparana.com/sites/viaje-parana/arquivos_restritos/files/imagem/2019-03/rioguaraguacu.jpg')

    function goToDetail() {
        navigation.navigate('Details')
    }

    return (
        <View style={{flex: 1}}>
           <ImageBackground
           source={{uri: 'https://www.viajeparana.com/sites/viaje-parana/arquivos_restritos/files/imagem/2019-03/topo_5.jpg'}}
           style={{width: '100%', height: 250}}
           imageStyle={{borderBottomRightRadius: 65}}
           >
                <View style={styles.darkOverlay} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 16}}>
                    <MaterialIcons name="menu" size={25} color='#fff'/>
                    <MaterialIcons name="notifications" size={25} color='#fff'/>
                </View>
                <View style={styles.searchContainer}>
                    <Text style={styles.helloUser}>Olá, Andy</Text>
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
                    data={gallery}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={( { item } ) => {
                        return (
                            <View style={{paddingLeft: 16}}>
                                <TouchableOpacity onPress={goToDetail}>
                                    <Image source={{uri: item.image}} style={{height: 250, width: 150, marginRight: 8, borderRadius: 10}}/>
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', bottom: 30}}>
                                    <MaterialIcons name="location-on" size={20} color='#fff'/>
                                    <Text style={{color: '#fff'}}>{item.title}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={{paddingLeft: 16}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Pesquisado Recentemente</Text>
                </View>
                <TouchableOpacity>
                    <Image source={{uri: recent}} style={{width: '100%', height: 250, borderRadius: 10, marginTop: 16, alignSelf: 'center'}} />
                    <View style={{flexDirection: 'row', bottom: 85, paddingLeft: 16}}>
                        <MaterialIcons name="location-on" size={20} color='#fff'/>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Rio Guaraguaçu</Text>
                    </View>
                    <View style={{bottom: 80, paddingLeft: 16, paddingRight: 16}}>
                        <Text style={{color: '#fff', opacity: 0.8, fontSize: 14}}>O rio Guaraguaçu atravessa todo o litoral paranaense. É o principal rio da bacia de Paranaguá.</Text>
                    </View>
                </TouchableOpacity>
                
            </ScrollView>
        </View>

       
    )
}