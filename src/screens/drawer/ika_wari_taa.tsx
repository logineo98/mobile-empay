import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer3 from '../../components/common/drawer/container/screen_container3'
import { colors, roboto } from '../../libs/typography/typography'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import QRCode from 'react-native-qrcode-svg'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const IkaWariTaa: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const [amount, setAmount] = useState('')
    const [showQrCode, setShowQrCode] = useState(false)
    const [scanQrCode, setScanQrCode] = useState(false)

    const handleShowQrCode = () => {
        setShowQrCode(true)
    }

    return (
        <ScreenContainer3 title='Ika Wari Taa' navigation={navigation}>
            <View style={styles.ika_wari_taa_container}>
                {/* montant à retirer */}
                <View style={styles.amount_to_retirer_title_container}>
                    <Text style={styles.amount_to_retirer_title}>Inscrire le montant à retirer</Text>
                    <TextInput onChangeText={setAmount} keyboardType='numeric' style={styles.amount_input} />
                    <Text style={styles.fcfa}>FCFA</Text>
                </View>

                {/* afficher ou scanner qrcode */}
                <View style={styles.afficher_scanner_qrcode_title_container}>
                    <Text style={styles.afficher_scanner_qrcode_title}>QR Code</Text>
                    <View style={styles.afficher_scanner_qrcode}>
                        {showQrCode && <QRCode value={'tz nation'} size={150} />}

                        {(!scanQrCode && !showQrCode) && <Text style={styles.choose_afficher_scanner_qrcode_text}>Scanner ou afficher QR CODE</Text>}
                    </View>
                    <Text style={styles.treatment_message}>Retrait du (Montant saisi) est en cours de traitement.</Text>
                </View>

                {/* bouton montrer et scanner qr code */}
                <View style={styles.btn_afficher_scanner_qrcode_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn_afficher_scanner_qrcode} onPress={handleShowQrCode}>
                        <CustomLinearGradient style={styles.btn_afficher_scanner_qrcode_gradient}>
                            <Text style={styles.btn_afficher_scanner_qrcode_name}>Montrer le QR code</Text>
                        </CustomLinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn_afficher_scanner_qrcode} onPress={() => { setShowQrCode(false); setScanQrCode(true); }}>
                        <CustomLinearGradient style={styles.btn_afficher_scanner_qrcode_gradient}>
                            <Text style={styles.btn_afficher_scanner_qrcode_name}>Scanner le QR code</Text>
                        </CustomLinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenContainer3>
    )
}

const styles = StyleSheet.create({
    ika_wari_taa_container: { paddingBottom: 20, },

    // montant à retirer
    amount_to_retirer_title_container: { alignItems: 'center', marginVertical: 10, position: 'relative', },
    amount_to_retirer_title: { color: colors.white, fontSize: 15, fontFamily: roboto.regular, marginBottom: 10, },
    amount_input: { width: '100%', paddingLeft: 30, paddingRight: 75, borderWidth: 2, borderColor: colors.profil_bg_color, borderRadius: 30, color: colors.white, fontFamily: roboto.regular, },
    fcfa: { position: 'absolute', bottom: 12, right: 15, color: colors.white, fontSize: 20, fontFamily: roboto.regular, },

    // afficher ou scanner qrcode
    afficher_scanner_qrcode_title_container: { alignItems: 'center', marginBottom: 25, },
    afficher_scanner_qrcode_title: { color: colors.white, fontSize: 18, fontFamily: roboto.regular, marginBottom: 10 },
    afficher_scanner_qrcode: { height: 200, width: '100%', marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.profil_bg_color, borderRadius: 30, },
    choose_afficher_scanner_qrcode_text: { color: colors.white, fontFamily: roboto.regular, textTransform: 'uppercase', },
    treatment_message: { color: colors.white, fontFamily: roboto.black, textAlign: 'center', },

    // bouton montrer et scanner qr code
    btn_afficher_scanner_qrcode_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    btn_afficher_scanner_qrcode: {},
    btn_afficher_scanner_qrcode_gradient: { padding: 10, borderRadius: 20, },
    btn_afficher_scanner_qrcode_name: { color: colors.black, fontFamily: roboto.black, },

})

export default IkaWariTaa