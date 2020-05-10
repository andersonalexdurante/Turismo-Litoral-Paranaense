import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/Home'
import Details from './screens/Details'
import Map from './screens/Map'

const AppStack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer >
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Details" component={Details} />
                <AppStack.Screen name="Map" component={Map} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}