import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../libs/typography/typography'
import { TARIF_TYPE } from '../../../libs/services/tarif/tarif.model'
import { images } from '../../../libs/constants/constants'

type COMPONENT_TYPE = {
    data: TARIF_TYPE
    index: number
}

const TarifCard: FC<COMPONENT_TYPE> = (props) => {
    const { data, index } = props
    const { tarif, description } = data

    const { height, width } = useWindowDimensions()

    return (
        <View style={styles.tarif_container}>
            <View style={styles.one_tarif_container}>
                <Image source={images.arrow_right} tintColor={colors.profil_bg_color} style={styles.arrow_right_icon} />
                <View style={[styles.info_container, { width: width - (20 + 40 + 20 + 5) }]}>
                    {/* <Text style={styles.info_pourcentage}> {tarif} </Text> */}
                    <Text style={styles.info_description}> {tarif} {description} </Text>
                </View>
            </View>

            {index === 2 &&
                <View style={styles.mobile_img_container}>
                    <Image source={images.mobile_money} style={styles.mobile_img} />
                </View>
            }

            {index === 3 &&
                <View style={styles.guichet_img_container}>
                    <Image source={images.guichet} style={styles.guichet_img} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tarif_container: {},

    one_tarif_container: { marginBottom: 10, flexDirection: 'row', },

    arrow_right_icon: { height: 20, width: 20, objectFit: 'cover', },

    info_container: { flexDirection: 'row', },
    info_pourcentage: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },
    info_description: { color: colors.white, fontFamily: roboto.regular, textAlign: 'left', },

    mobile_img_container: { height: 70, marginBottom: 10, alignItems: 'center', },
    mobile_img: { height: 70, width: 240, objectFit: 'contain', },

    guichet_img_container: { height: 120, marginBottom: 10, alignItems: 'center', },
    guichet_img: { height: 120, width: 105, objectFit: 'contain', },

})

export default TarifCard
