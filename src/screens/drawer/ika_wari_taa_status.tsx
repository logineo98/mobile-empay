import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
// my importations
import { RootState } from '../../libs/services/store'
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import { colors, roboto } from '../../libs/typography/typography'
// my icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    route: RouteProp<ParamListBase, 'ika_wari_taa_status'>
}

const IkaWariTaaStatus: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, route } = props

    const { } = useSelector((state: RootState) => state?.user)

    const status = (route.params as any).status

    return (
        <ScreenContainer2 title={`Statut de l'échange`} scroll navigation={navigation}>
            <View style={styles.status_ika_wari_taa_container}>
                <View style={styles.status_icon_container}>
                    {status ? <FontAwesome5 name='check-circle' color={colors.success} size={100} style={styles.status_icon} /> : <Entypo name='circle-with-cross' color={colors.error} size={100} style={styles.status_icon} />}
                </View>

                <Text style={styles.message}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas tempore aut iusto asperiores accusamus, nostrum cumque doloremque expedita sunt saepe!
                </Text>

            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    status_ika_wari_taa_container: { justifyContent: 'center', flex: 1, paddingHorizontal: 20, },

    status_icon_container: { alignItems: 'center', },
    status_icon: {},

    message: { color: colors.white, fontFamily: roboto.regular, textAlign: 'justify', fontSize: 15, marginVertical: 25 },
})

export default IkaWariTaaStatus