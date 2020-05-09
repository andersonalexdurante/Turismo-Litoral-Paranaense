import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, FlatList, Image, Animated } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'

import api from '../../services/api'

export default function Details ({navigation}) {
    
    const route = useRoute()
    const local = route.params.item

    const [favorito, setFavorito] = useState(local.favorito)
    const [sugestoes, setSugestoes] = useState([])
    const [progresso, setProgresso] = useState(new Animated.Value(0))
    const [animacao, setAnimacao] = useState(false)

    function goToHome() {
        navigation.navigate('Home')
    }

    function goToDetail(item) {
        navigation.navigate('Details', { item })
    }

    async function loadLocals() {
        const res = await api.get('/locais')

        setSugestoes(res.data)
        
    }

    async function changeFavorite() {
        try {
            await api.put(`favoritos/${local.id}`, {
                local_id: local.id
            }
            ).then(res => {
                setFavorito(res.data)
                if(favorito === 0) {
                    setAnimacao(true)
                    heart()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    function heart() {
        Animated.timing(progresso, {
            toValue: 1,
            delay:1000,
        }).start(() => setAnimacao(false))
        
    }

    useEffect(() => {
        loadLocals()
    }, [])

    const interpolation = progresso.interpolate({ inputRange: [0, 1], outputRange: [0, 0] });

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
                    <TouchableOpacity onPress={changeFavorite} style={{borderRadius: 50, marginRight: 16, marginTop: 16}}>
                        <MaterialIcons name="favorite" size={30}  color={favorito == 1 ? 'red' : '#fff'}/>
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

            {
                animacao ? 
                    <View style={{flex: 1, height: 300, width: 300, position:"absolute", top: 200, left: 30}}>
                        <LottieView
                        source={require('../../assets/heart.json')}    
                        progress={interpolation}
                        resizeMode="cover"
                        autoPlay
                        loop={false}
                        duration={1000}
                        speed={0.2}
                        />
                    </View> 
                : null 
            }

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
                                    <Image source={{uri: item.imagemCard}} style={{height: 250, width: 150, marginRight: 16, borderRadius: 10}}/>
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

            </ScrollView>
        </View>
    )
}