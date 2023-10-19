import { StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// my importations
import DrawerStack from './stacks/drawer_stack'
import AuthStack from './stacks/auth_stack'

const RootNavigation = () => {
    const root = createNativeStackNavigator()
    const host = false;

    return (
        <NavigationContainer >
            <root.Navigator screenOptions={{ headerShown: false }} initialRouteName='auth'>
                {host ? <root.Screen name='main' component={DrawerStack} /> :
                    <root.Screen name='auth' component={AuthStack} />}

                {/* <root.Screen name='main' children={({ route }) => <Navigation route={route} />} />
                <root.Screen name='auth' component={AuthStack} /> */}
            </root.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})

export default RootNavigation