import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../libs/typography/typography'
import CustomLinearGradient from '../../common/drawer/gradient/custom_linear_gradient'
import { images } from '../../../libs/constants/constants'

type COMPONENT_TYPE = { style?: StyleProp<ViewStyle> }

const HistoriqueCard: FC<COMPONENT_TYPE> = (props) => {
    const { style } = props

    return (
        <View style={[styles.historique_item_container, style]}>
            <View style={styles.historique_item}>
                <View style={styles.historique_item_icon_type_description_container}>
                    <View style={styles.historique_item_icon_container}>
                        <Image source={images.paypal} tintColor={colors.black} style={styles.historique_item_icon} />
                    </View>
                    <View style={styles.historique_item_type_description_container}>
                        <Text style={styles.historique_item_type}>PayPal</Text>
                        <Text style={styles.historique_item_description}>Paiement client</Text>
                    </View>
                </View>
                <Text style={styles.historique_amount}>-50.000 FCFA</Text>
            </View>
            <View style={styles.historique_item}>
                <View style={styles.historique_item_icon_type_description_container}>
                    <View style={styles.historique_item_icon_container}>
                        <Image source={images.facebook} tintColor={colors.black} style={styles.historique_item_icon} />
                    </View>
                    <View style={styles.historique_item_type_description_container}>
                        <Text style={styles.historique_item_type}>Facebook</Text>
                        <Text style={styles.historique_item_description}>Sponsoring page Facebook</Text>
                    </View>
                </View>
                <Text style={styles.historique_amount}>-15.000 FCFA</Text>
            </View>
            <CustomLinearGradient style={styles.historique_item}>
                <View style={styles.historique_item_icon_type_description_container}>
                    <View style={styles.historique_item_icon_container}>
                        <Image source={images.restaurant} tintColor={colors.black} style={styles.historique_item_icon} />
                    </View>
                    <View style={styles.historique_item_type_description_container}>
                        <Text style={styles.historique_item_type}>Restaurant</Text>
                        <Text style={styles.historique_item_description}>Paiement par carte</Text>
                    </View>
                </View>
                <Text style={styles.historique_amount}>-12.500 FCFA</Text>
            </CustomLinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    historique_item_container: {},
    historique_item: { padding: 15, borderRadius: 30, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.profil_bg_color, },
    historique_item_icon_type_description_container: { flexDirection: 'row', alignItems: 'center', },
    historique_item_icon_container: { height: 45, width: 45, padding: 10, borderRadius: 45, backgroundColor: colors.white, },
    historique_item_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    historique_item_type_description_container: { marginLeft: 10, },
    historique_item_type: { color: colors.black, fontFamily: roboto.black, },
    historique_item_description: { color: colors.black, fontSize: 8, fontFamily: roboto.regular, },
    historique_amount: { color: colors.black, fontFamily: roboto.regular, },
})

export default HistoriqueCard