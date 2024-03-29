import { Image, StyleSheet, Switch, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useSelector } from 'react-redux'
// my importations
import ScreenContainer2 from './screen_container2'
import { images } from '../../../../libs/constants/constants'
import { colors, roboto } from '../../../../libs/typography/typography'
import GradientText from '../gradient/gradient_text'
import { RootState } from '../../../../libs/services/store'
import { _end_point } from '../../../../libs/services/endpoints'

type COMPONENT_TYPE = {
    children: JSX.Element | JSX.Element[]
    navigation: DrawerNavigationHelpers
    title: string

    handleSwitchBtn?: (value: boolean) => void
    hide_switch?: boolean
    isSwitchActive?: boolean
    onRefresh?: any
    refreshing?: any
    reload?: boolean
    scroll?: boolean
}

const ScreenContainer3: FC<COMPONENT_TYPE> = (props) => {
    const { children, navigation, title, handleSwitchBtn, hide_switch, isSwitchActive, onRefresh, refreshing, reload, scroll } = props

    const { height, width } = useWindowDimensions()

    const { host } = useSelector((state: RootState) => state.user)

    return (
        <ScreenContainer2 title={title} reload={reload} scroll={scroll} refreshing={refreshing} onRefresh={onRefresh} navigation={navigation}>
            <View style={styles.screen_container_3}>
                {/* profil et switch */}
                <View style={styles.profil_switch_container}>
                    <View style={styles.profil_info_container}>
                        <View style={styles.profil_img_container}>
                            {host?.photo ?
                                <Image source={{ uri: `${_end_point.api_img}/${host.photo}` }} style={[styles.profil_img, { transform: [{ rotate: '90deg' }] }]} /> :
                                <Image source={images.avatar} style={styles.profil_img} />
                            }
                        </View>
                        <View style={[styles.info_container, { width: width - (20 + 40 + 50 + 5 + 70) }]}>
                            <Text numberOfLines={1} style={styles.info_name}>{host?.name}</Text>
                            <Text numberOfLines={1} style={styles.info_email}>{host?.email}</Text>
                        </View>
                    </View>
                    {!hide_switch && <Switch trackColor={{ false: colors.white, true: colors.white }} thumbColor={isSwitchActive ? colors.success : colors.error} value={isSwitchActive} onValueChange={(value) => handleSwitchBtn && handleSwitchBtn(value)} />}
                </View>

                {/* montant actuel */}
                <View style={styles.actual_amount_title_container}>
                    <GradientText text='Montant disponible' style={styles.actual_amount_title} />
                    {/* <GradientText text={`${host?.totalAmount} FCFA`} style={styles.actual_amount} /> */}
                    <Text style={styles.actual_amount}>{`${host?.cardAmount} FCFA`}</Text>
                </View>

                {children}
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    screen_container_3: { flex: 1, paddingHorizontal: 20, },

    // profil et switch
    profil_switch_container: { padding: 10, borderRadius: 40, marginBottom: 10, backgroundColor: colors.profil_bg_color, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    profil_info_container: { flexDirection: 'row', alignItems: 'center', },
    profil_img_container: { height: 50, width: 50, borderRadius: 50, padding: 3, backgroundColor: colors.profil_bg_color, elevation: 5, },
    profil_img: { height: '100%', width: '100%', objectFit: 'cover', borderRadius: 50, },
    info_container: { marginLeft: 5, },
    info_name: { color: colors.black, fontSize: 15, fontFamily: roboto.black, },
    info_email: { color: colors.black, fontSize: 10, fontFamily: roboto.regular, },

    // montant actuel
    actual_amount_title_container: { alignItems: 'center', },
    actual_amount_title: { fontSize: 15, },
    actual_amount: { color: colors.drawer_icon_color, fontSize: 25, fontFamily: roboto.black, textAlign: 'center', },

})

export default ScreenContainer3