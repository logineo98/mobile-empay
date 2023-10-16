import { Image, StyleSheet, Switch, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from './screen_container2'
import { images } from '../../../../libs/constants/constants'
import { colors, roboto } from '../../../../libs/typography/typography'
import GradientText from '../gradient/gradient_text'


type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    children: JSX.Element | JSX.Element[]
    title: string
}

const ScreenContainer3: FC<COMPONENT_TYPE> = (props) => {
    const { children, navigation, title } = props

    const [isSwitchActive, setIsSwitchActive] = useState(false)

    return (
        <ScreenContainer2 title={title} scroll navigation={navigation}>
            <View style={styles.screen_container_3}>
                {/* profil et switch */}
                <View style={styles.profil_switch_container}>
                    <View style={styles.profil_info_container}>
                        <View style={styles.profil_img_container}>
                            <Image source={images.avatar} style={styles.profil_img} />
                        </View>
                        <View style={styles.info_container}>
                            <Text numberOfLines={1} style={styles.info_name}>Tz Nation</Text>
                            <Text numberOfLines={1} style={styles.info_email}>tz@gmail.com</Text>
                        </View>
                    </View>
                    <Switch trackColor={{ false: colors.white, true: colors.white }} thumbColor={isSwitchActive ? colors.success : colors.error} value={isSwitchActive} onValueChange={setIsSwitchActive} />
                </View>

                {/* montant actuel */}
                <View style={styles.actual_amount_title_container}>
                    <GradientText text='Montant disponible' style={styles.actual_amount_title} />
                    <GradientText text='375.000 FCFA' style={styles.actual_amount} />
                </View>

                {children}
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    screen_container_3: { paddingHorizontal: 20, },

    // profil et switch
    profil_switch_container: { padding: 10, borderRadius: 40, marginBottom: 10, backgroundColor: colors.profil_bg_color, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    profil_info_container: { flexDirection: 'row', alignItems: 'center', },
    profil_img_container: { height: 50, width: 50, borderRadius: 50, padding: 3, backgroundColor: colors.profil_bg_color, elevation: 5, },
    profil_img: { height: '100%', width: '100%', objectFit: 'cover', },
    info_container: { marginLeft: 5, },
    info_name: { color: colors.black, fontSize: 15, fontFamily: roboto.black, },
    info_email: { color: colors.black, fontSize: 10, fontFamily: roboto.regular, },

    // montant actuel
    actual_amount_title_container: { alignItems: 'center', },
    actual_amount_title: { fontSize: 15, },
    actual_amount: { fontSize: 25, },

})

export default ScreenContainer3