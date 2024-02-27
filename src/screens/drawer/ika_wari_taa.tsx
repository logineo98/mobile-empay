import { StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import QRCode from 'react-native-qrcode-svg'
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
// my importations
import ScreenContainer3 from '../../components/common/drawer/container/screen_container3'
import { colors, roboto } from '../../libs/typography/typography'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import NoPermissionCard from '../../components/card/drawer/no_permission_card'
import { RootState } from '../../libs/services/store'
import { _scanQrCode, getQrCode, resetQrCode } from '../../libs/services/user/user.action'
import Loading from '../../components/common/drawer/others/loading'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, screenName: string }

const IkaWariTaa: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props
    const device = useCameraDevice('back')

    const { host, qr_code, user_loading } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const [amount, setAmount] = useState('')
    const [showQrCode, setShowQrCode] = useState(false)
    const [scanQrCode, setScanQrCode] = useState(false)
    const [granted, setGranted] = useState(false)
    const [err, setErr] = useState<{ montant: string }>()

    const handleShowQrCode = () => {
        if (host?.AmountToExchange && host?.coordinates?.lat && host?.coordinates?.lng) {
            setShowQrCode(true)
            setScanQrCode(false)
            dispatch(getQrCode(host?.id as string))
        } else {
            Toast.show({ type: 'info', text1: 'Informations', text2: 'Veuillez d\'abord activer votre statut et renseigner un montant.' })
        }
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
            Vibration.vibrate()
            codes.map(code => {
                dispatch(_scanQrCode({
                    beneficiareID: host?.id as string,
                    montantBeneficiaire: amount,
                    titulaireID: code?.value?.split('/')[0] as string,
                    titulairePhone: code?.value?.split('/')[1] as string
                }, navigation))
            })
        }
    })

    useEffect(() => {
        if (screenName === 'ika_wari_taa') {
            setAmount('')
            setScanQrCode(false)
            setShowQrCode(false)
            dispatch(resetQrCode());

            (async () => {
                const cameraPermission = await Camera.requestCameraPermission()
                setGranted(cameraPermission === 'granted')
            })()
        }
    }, [screenName])

    if (!device) return <View></View>
    return (
        <ScreenContainer3 title='Ika Wari Taa' hide_switch navigation={navigation}>
            {/* quand la permission n'est pas accordée à la caméra */}
            {!granted ? <NoPermissionCard permission_type='à la caméra' /> :
                user_loading ? <Loading /> :
                    <View style={styles.ika_wari_taa_container}>
                        {/* montant à retirer */}
                        {(!showQrCode && scanQrCode) &&
                            <View style={styles.amount_to_retirer_title_container}>
                                <Text style={styles.amount_to_retirer_title}>Inscrire le montant à retirer</Text>
                                <TextInput onChangeText={setAmount} keyboardType='numeric' placeholder='0' placeholderTextColor={colors.white} value={amount} style={styles.amount_input} />
                                <Text style={[styles.fcfa, { bottom: err?.montant ? 27 : 12, }]}>FCFA</Text>
                                {err?.montant && <Text style={styles.error}> {err?.montant} </Text>}
                            </View>
                        }

                        {/* afficher ou scanner qrcode */}
                        <View style={[styles.afficher_scanner_qrcode_title_container, { marginTop: !scanQrCode ? 30 : 0, }]}>
                            <Text style={styles.afficher_scanner_qrcode_title}>QR Code</Text>
                            <View style={styles.afficher_scanner_qrcode}>

                                {(showQrCode && qr_code !== 'reset') ? <QRCode value={qr_code} size={150} color={colors.white} backgroundColor={colors.black} /> :
                                    showQrCode ? <Text style={styles.choose_afficher_scanner_qrcode_text}>Erreur survenue lors de la génération du QR CODE</Text> :

                                        (scanQrCode && amount?.trim() !== '') ? <Camera device={device} isActive style={StyleSheet.absoluteFill} codeScanner={codeScanner} /> :
                                            scanQrCode && <Text style={styles.choose_afficher_scanner_qrcode_text}>Inscrire le montant à retirer</Text>
                                }

                                {(!scanQrCode && !showQrCode) && <Text style={styles.choose_afficher_scanner_qrcode_text}>Scanner ou afficher QR CODE</Text>}
                            </View>
                            <Text style={styles.qr_message}>Retrait du (Montant saisi) est en cours de traitement.</Text>
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
            }
        </ScreenContainer3>
    )
}

const styles = StyleSheet.create({
    ika_wari_taa_container: {},

    // montant à retirer
    amount_to_retirer_title_container: { marginVertical: 10, position: 'relative', },
    amount_to_retirer_title: { color: colors.white, fontSize: 15, fontFamily: roboto.regular, textAlign: 'center', marginBottom: 10, },
    amount_input: { width: '100%', paddingLeft: 30, paddingRight: 75, borderWidth: 2, borderColor: colors.profil_bg_color, borderRadius: 30, color: colors.white, fontFamily: roboto.regular, },
    fcfa: { position: 'absolute', bottom: 12, right: 15, color: colors.white, fontSize: 20, fontFamily: roboto.regular, },
    error: { color: colors.fond1, fontFamily: roboto.italic, fontSize: 10, textAlign: 'left', },

    // afficher ou scanner qrcode
    afficher_scanner_qrcode_title_container: { alignItems: 'center', marginBottom: 25, },
    afficher_scanner_qrcode_title: { color: colors.white, fontSize: 18, fontFamily: roboto.regular, marginBottom: 10 },
    afficher_scanner_qrcode: { height: 200, width: '100%', overflow: 'hidden', marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.profil_bg_color, borderRadius: 30, },
    choose_afficher_scanner_qrcode_text: { color: colors.white, fontFamily: roboto.regular, textTransform: 'uppercase', textAlign: 'center', },
    qr_message: { color: colors.white, fontFamily: roboto.black, textAlign: 'center', },

    // bouton montrer et scanner qr code
    btn_afficher_scanner_qrcode_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    btn_afficher_scanner_qrcode: {},
    btn_afficher_scanner_qrcode_gradient: { padding: 10, borderRadius: 20, },
    btn_afficher_scanner_qrcode_name: { color: colors.black, fontFamily: roboto.black, },

})

export default IkaWariTaa