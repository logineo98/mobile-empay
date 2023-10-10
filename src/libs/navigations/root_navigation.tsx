import { StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useSelector } from 'react-redux'
import { RootState } from '../services/store'
import Navigation from './stacks/drawer_stack'

const RootNavigation = () => {
    const root = createNativeStackNavigator()

    return (
        <NavigationContainer >
            <root.Navigator screenOptions={{ headerShown: false }} initialRouteName='auth'>
                <root.Screen name='main' component={Navigation} />

                {/* <root.Screen name='main' children={({ route }) => <Navigation route={route} />} />
                <root.Screen name='auth' component={AuthStack} /> */}
            </root.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default RootNavigation