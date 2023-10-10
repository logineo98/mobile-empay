import { StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import Home from '../../../screens/home/home'


type COMPONENT_TYPE = {
    route: RouteProp<ParamListBase, 'main'>
}

const Drawer: FC<COMPONENT_TYPE> = ({ route }) => {
    const drawer = createDrawerNavigator()

    return (
        <drawer.Navigator initialRouteName='home'>
            <drawer.Screen name='home' component={Home} />
        </drawer.Navigator>
    )
}

const styles = StyleSheet.create({})

export default Drawer
