import { PermissionsAndroid, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import { RootState } from '../../libs/services/store'
import NoPermissionCard from '../../components/card/drawer/no_permission_card'
import { getAllusers } from '../../libs/services/user/user.action'
import Geolocation from '@react-native-community/geolocation'
import Loading from '../../components/common/drawer/others/loading'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

type INITIAL_REGION = {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
}

const Geolocalisation: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props
    let data: INITIAL_REGION = { latitude: 12.5796166, longitude: -7.9304556, latitudeDelta: 8, longitudeDelta: 8 }

    const { user_loading, allUsers } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const [granted, setGranted] = useState(false)
    const [initialRegion, setInitialRegion] = useState(data)

    useEffect(() => {
        if (screenName === 'geolocalisation') {
            (async () => {
                const geolocalisationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                setGranted(geolocalisationPermission === 'granted')

                if (granted) {
                    Geolocation.getCurrentPosition(info => {
                        setInitialRegion({ ...initialRegion, latitude: info.coords.latitude, longitude: info.coords.longitude })
                    })
                }
            })()

            dispatch(getAllusers())
        }
    }, [screenName, granted])

    return (
        <ScreenContainer2 title='Géolocalisation' scroll navigation={navigation}>
            {/* quand la permission n'est pas donnée a la géolocalisation */}
            {!granted ? <NoPermissionCard permission_type='à la géolocalisation' style={styles.no_permission} /> :
                user_loading ? <Loading /> :
                    <View style={styles.geolocalisation_container}>
                        <MapView style={{ width: '100%', height: '100%' }} initialRegion={initialRegion}>
                            {allUsers?.map((user) => (
                                user?.AmountToExchange && user?.coordinates?.la && user?.coordinates?.lo &&
                                <Marker key={user?.id}
                                    coordinate={{ latitude: parseInt(user?.coordinates?.la, 10), longitude: parseInt(user?.coordinates?.lo, 10) }}
                                    title={user?.name} description={`${user?.AmountToExchange} FCFA`}
                                />
                            ))}
                        </MapView>
                    </View>}
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    geolocalisation_container: { flex: 1, },

    // quand la permission n'est pas donnée a la géolocalisation
    no_permission: { paddingHorizontal: 20, },

})

export default Geolocalisation