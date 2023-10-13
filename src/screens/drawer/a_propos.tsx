import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/screen_container2'
import { images } from '../../libs/constants/constants'
import { colors, roboto } from '../../libs/typography/typography'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const APropos: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width, } = useWindowDimensions()

    return (
        <ScreenContainer2 title='À Propos' scroll navigation={navigation}>
            <View style={styles.a_propos_container}>
                <View style={styles.logo_img_container}>
                    <Image source={images.logo_png} style={styles.logo_img} />
                </View>

                <View style={styles.info_title_description_container}>
                    <CustomLinearGradient style={styles.gradient}>
                        <Text style={styles.info_title}>Information sur l'application</Text>
                    </CustomLinearGradient>
                    <Text style={styles.info_description}>
                        La carte EMPAY est acceptée dans tous les points d'acception des cartes Visa
                        (guichets automatiques, points de vente et Web) dans plus de 200 pays.
                    </Text>
                </View>
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    a_propos_container: { alignItems: 'center', padding: 20, },

    logo_img_container: { height: 200, width: 200, },
    logo_img: { height: '100%', width: '100%', objectFit: 'cover', },

    info_title_description_container: { alignItems: 'center', },
    info_title: { color: colors.black, fontFamily: roboto.regular, },
    info_description: { color: colors.white, fontFamily: roboto.regular, textAlign: 'justify', },

    gradient: { padding: 10, borderRadius: 20, marginVertical: 20, },
})

export default APropos