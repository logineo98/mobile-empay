import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
// my importations
import ScreenPaymentContainer from '../../../components/common/drawer/container/screen_payment_container'
import { images } from '../../../libs/constants/constants'
import CustomLinearGradient from '../../../components/common/drawer/gradient/custom_linear_gradient'
import { colors, roboto } from '../../../libs/typography/typography'

type COMPONENT_TYPE = { navigation: StackNavigationHelpers, }

const PaymentEdm: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    return (
        <ScreenPaymentContainer title='Paiement facture' payment_logo={images.edm} payment_name='EDM' navigation={navigation}>
            <View style={styles.payment_container}>
                {/* Numéro du client */}
                <View style={styles.input_title_container}>
                    <Text style={styles.title}>Numéro du client</Text>
                    <TextInput style={styles.input} />
                </View>

                {/* bouton paiement */}
                <View style={styles.payment_btn_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.payment_btn}>
                        <CustomLinearGradient style={styles.payment_btn_gradient}>
                            <Text style={styles.payment_btn_name}>Paiment</Text>
                        </CustomLinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenPaymentContainer>
    )
}

const styles = StyleSheet.create({
    payment_container: {},

    input_title_container: {},
    title: { color: colors.white, fontFamily: roboto.regular, },
    input: { color: colors.white, fontFamily: roboto.regular, borderWidth: 1.5, borderColor: colors.profil_bg_color, borderRadius: 25, paddingHorizontal: 20, marginVertical: 10, },

    payment_btn_container: { alignItems: 'center', marginTop: 50, },
    payment_btn: {},
    payment_btn_gradient: { width: 150, padding: 10, borderRadius: 20, },
    payment_btn_name: { color: colors.black, fontSize: 16, fontFamily: roboto.black, textAlign: 'center', },
})

export default PaymentEdm