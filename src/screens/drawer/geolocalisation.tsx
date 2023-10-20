import { Linking, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import MapView, { Marker } from 'react-native-maps'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import { colors, roboto } from '../../libs/typography/typography'
import NoPermissionCard from '../../components/card/drawer/no_permission_card'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

const Geolocalisation: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const [granted, setGranted] = useState(false)

    useEffect(() => {
        if (screenName === 'geolocalisation') {
            const checkPermission = async () => {
                const geolocalisationPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                setGranted(geolocalisationPermission === 'granted')
            }

            checkPermission()
        }
    }, [screenName])

    return (
        <ScreenContainer2 title='Géolocalisation' scroll navigation={navigation}>
            {/* quand la permission n'est pas donnée a la géolocalisation */}
            {!granted ? <NoPermissionCard permission_type='à la géolocalisation' style={styles.no_permission} /> :
                <View style={styles.geolocalisation_container}>
                    <MapView
                        style={{ width: '100%', height: '100%' }}
                        initialRegion={{
                            latitude: 12.5796166,
                            longitude: -7.9304556,
                            latitudeDelta: 2,
                            longitudeDelta: 2,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 12.5796166, longitude: -7.9304556, }}
                            title={'tz nation'} description={`10000 FCFA`}
                        />
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