import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
// my importations
import DrawerStack from './stacks/drawer_stack'
import AuthStack from './stacks/auth_stack'
import { RootState } from '../services/store'

const RootNavigation = () => {
    const root = createNativeStackNavigator()
    const { host } = useSelector((state: RootState) => state.user)

    return (
        <NavigationContainer >
            <root.Navigator screenOptions={{ headerShown: false }} initialRouteName={host ? "main" : "auth"}>
                {(host && host !== null && host !== undefined) ?
                    <root.Screen name='main' options={{ animation: 'slide_from_right' }} component={DrawerStack} /> :
                    <root.Screen name='auth' component={AuthStack} />}
            </root.Navigator>
        </NavigationContainer>
    )
}


export default RootNavigation