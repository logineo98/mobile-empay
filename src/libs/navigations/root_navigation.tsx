import { StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// my importations
import DrawerStack from './stacks/drawer_stack'
import AuthStack from './stacks/auth_stack'
import { useSelector } from 'react-redux'
import { RootState } from '../services/store'

const RootNavigation = () => {
    const root = createNativeStackNavigator()
    const { host } = useSelector((state: RootState) => state.user)

    return (
        <NavigationContainer >
            <root.Navigator screenOptions={{ headerShown: false }} initialRouteName='auth'>
                {host ? <root.Screen name='main' component={DrawerStack} /> :
                    <root.Screen name='auth' component={AuthStack} />}
            </root.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default RootNavigation