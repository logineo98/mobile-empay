import { StyleSheet } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { ParamListBase, RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'
// my importations
import Home from '../../../screens/drawer/home'
import CustomDrawerContent from '../../../components/common/drawer/custom_drawer_content'
import APropos from '../../../screens/drawer/a_propos'
import Geolocalisation from '../../../screens/drawer/geolocalisation'
import Historique from '../../../screens/drawer/historique'
import IkaWariTaaStatus from '../../../screens/drawer/ika_wari_taa_status'
import IkaWariTaa from '../../../screens/drawer/ika_wari_taa'
import Partenaire from '../../../screens/drawer/partenaire'
import Recharge from '../../../screens/drawer/recharge'
import ServiceClient from '../../../screens/drawer/service_client'
import Status from '../../../screens/drawer/status'
import Tarif from '../../../screens/drawer/tarif'
import PaymentStack from './payment_stack'

type COMPONENT_TYPE = {
    route: RouteProp<ParamListBase, 'main'>
}

const DrawerStack: FC<COMPONENT_TYPE> = ({ route }) => {
    const drawer = createDrawerNavigator()

    const [screenName, setScreenName] = useState('')

    useEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)
        setScreenName(routeName as string)
    }, [route])

    return (
        <drawer.Navigator initialRouteName='home' screenOptions={{ headerShown: false, swipeEnabled: false, drawerStyle: styles.drawer_style }}
            drawerContent={({ navigation }) => <CustomDrawerContent navigation={navigation} />}
        >
            <drawer.Screen name='home' children={({ navigation }) => <Home navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='a_propos' component={APropos} />
            <drawer.Screen name='geolocalisation' children={({ navigation }) => <Geolocalisation navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='historique' children={({ navigation }) => <Historique navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='ika_wari_taa_status' component={IkaWariTaaStatus} />
            <drawer.Screen name='ika_wari_taa' children={({ navigation }) => <IkaWariTaa navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='partenaire' children={({ navigation }) => <Partenaire navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='recharge' children={({ navigation }) => <Recharge navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='service_client' component={ServiceClient} />
            <drawer.Screen name='status' children={({ navigation }) => <Status navigation={navigation} screenName={screenName} />} />
            <drawer.Screen name='tarif' children={({ navigation }) => <Tarif navigation={navigation} screenName={screenName} />} />

            {/* payment */}
            <drawer.Screen name='payment_stack' component={PaymentStack} />
        </drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    drawer_style: { opacity: 0.8, borderTopRightRadius: 40, borderBottomRightRadius: 40, },
})

export default DrawerStack
