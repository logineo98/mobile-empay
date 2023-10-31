import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import GradientText from '../../components/common/drawer/gradient/gradient_text'
import { colors, roboto } from '../../libs/typography/typography'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import { vitepay_data_validation } from '../../libs/services/user/user.request'
import { images } from '../../libs/constants/constants'
import { RootState } from '../../libs/services/store'
import { recharge, verifyRechargeStatus } from '../../libs/services/user/user.action'
import Loading from '../../components/common/drawer/others/loading'
// my icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    screenName: string
}

const Recharge: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const data = { phone: '', montant: '' }

    const { host, recharge_response, user_loading } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const { height, width } = useWindowDimensions()

    const [visible, setVisible] = useState(false)
    const [vitepayData, setVitepayData] = useState(data)
    const [err, setErr] = useState<{ phone: string, montant: string }>()
    const [clickRefaireRecharge, setClickRefaireRecharge] = useState(false)

    const handleSubmit = () => {
        const { error, initialError } = vitepay_data_validation(vitepayData)

        if (error.phone !== initialError.phone || error.montant !== initialError.montant) {
            setErr(error)
        } else {
            setErr(initialError)

            dispatch(recharge({ customerId: host?.id as string, amount: parseInt(vitepayData.montant, 10), phone: vitepayData.phone }))
        }
    }

    const handleClose = async () => {
        setVisible(false)
        setVitepayData(data)
        setErr(data)

        if (recharge_response === 'SUCCESS' || recharge_response === 'CANCELED') {
            setClickRefaireRecharge(!clickRefaireRecharge)
            await AsyncStorage.setItem('recharge_status', '')
        }
    }

    const refaireRecharge = async () => {
        setClickRefaireRecharge(!clickRefaireRecharge)
        setVitepayData(data)
        await AsyncStorage.setItem('recharge_status', '')
    }

    useEffect(() => {
        if (screenName === 'recharge') {
            dispatch(verifyRechargeStatus())
        }
    }, [screenName, clickRefaireRecharge])

    return (
        <ScreenContainer2 title='Recharge' scroll navigation={navigation}>
            <View style={styles.recharge_container}>
                <GradientText text={`Veuillez cliquer sur le bouton 'RECHARGER' afin de recharger votre compte via VITEPAY.`} style={styles.presentation} />

                <View style={styles.btn_recharger_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.btn_recharger} onPress={() => setVisible(true)}>
                        <CustomLinearGradient style={styles.btn_recharger_gradient}>
                            <Text style={styles.btn_recharger_name}>Recharger</Text>
                        </CustomLinearGradient>
                    </TouchableOpacity>
                </View>

                <Modal transparent animationType='slide' visible={visible}>
                    <View style={styles.modal_global_container}>
                        <View style={[styles.modal_container, { height: height < 500 ? '100%' : '60%', }]}>
                            {/* modal header vitepay logo et close icon */}
                            <View style={styles.modal_header_container}>
                                <View style={[styles.vitepay_logo_container, { top: -80, left: width - (width / 2 + 80), }]}>
                                    <Image source={images.vitepay} style={styles.vitepay_logo} />
                                </View>
                                <View />
                                <TouchableOpacity activeOpacity={0.5} style={styles.header_close_icon_container} onPress={handleClose}>
                                    <AntDesign name='closecircle' color={colors.black} size={35} style={styles.header_close_icon} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 10, flexGrow: 1, }} keyboardShouldPersistTaps='handled'>
                                {user_loading ? <Loading text='Traitement en cours...' no_gradient color={colors.black} style_text_container={styles.loading_text} style_container={styles.loading} /> :
                                    recharge_response === 'PENDING' ?
                                        <View style={styles.recharge_status_container}>
                                            <Loading no_gradient color={colors.black} text=' ' style_text_container={styles.loading_text} style_container={styles.loading} />

                                            <Text style={{ marginVertical: 10, color: colors.black, fontSize: 15, fontFamily: roboto.regular, textAlign: 'center', }}>
                                                Une ou votre recharge est en cours de validation. Pour valider et terminer votre transaction, veuillez suivre les instructions envoyées au <Text style={{ fontWeight: 'bold', color: colors.fond1 }}>{vitepayData.phone}</Text>. Vous pouvez également saisir directement <Text style={{ fontWeight: 'bold', color: colors.fond1 }}>#144#3*6#</Text> (code USSD) sur votre téléphone pour afficher le menu de confirmation de paiement.
                                            </Text>

                                            <Text style={{ color: colors.black, fontSize: 15, fontFamily: roboto.regular, textAlign: 'center', }}>Voulez-vous en refaire une autre ?</Text>

                                            <View style={styles.btn_container}>
                                                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={refaireRecharge}>
                                                    <Text style={styles.btn_name}>Oui</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> : (recharge_response === 'CANCELED' || recharge_response === 'SUCCESS') ?
                                            <View style={styles.recharge_status_container}>
                                                <View style={styles.status_icon_container}>
                                                    {recharge_response === 'SUCCESS' ? <FontAwesome5 name='check-circle' color={colors.success} size={100} style={styles.status_icon} /> : <Entypo name='circle-with-cross' color={colors.error} size={100} style={styles.status_icon} />}
                                                </View>
                                                <Text style={styles.status_message}>
                                                    {recharge_response === 'SUCCESS' ? `Votre recharge a été effectuée avec succès. Veuillez en refaire une autre ?` : `Une erreur est survenue lors de l'opération de la recharge. Veuillez en refaire une autre ?`}
                                                </Text>
                                                <View style={styles.btn_container}>
                                                    <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={refaireRecharge}>
                                                        <Text style={styles.btn_name}>Ok</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View> :
                                            <View style={styles.formulaire_container}>
                                                <View style={styles.input_container}>
                                                    <Text style={styles.input_title}>Téléphone</Text>
                                                    <TextInput keyboardType='numeric' maxLength={8} style={styles.input} placeholderTextColor={`rgba(0,0,0,0.5)`} placeholder={'Numéro orange (sans l\'indicatif)'} value={vitepayData.phone} onChangeText={text => setVitepayData({ ...vitepayData, phone: text })} />
                                                    {err?.phone && <Text style={styles.input_error}> {err?.phone} </Text>}
                                                </View>

                                                <View style={styles.input_container}>
                                                    <Text style={styles.input_title}>Montant (FCFA)</Text>
                                                    <TextInput keyboardType='numeric' style={styles.input} placeholderTextColor={`rgba(0,0,0,0.5)`} placeholder={'Montant de la recharge'} value={vitepayData.montant} onChangeText={text => setVitepayData({ ...vitepayData, montant: text })} />
                                                    {err?.montant && <Text style={styles.input_error}> {err?.montant} </Text>}
                                                </View>

                                                <View style={styles.btn_container}>
                                                    <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={handleSubmit}>
                                                        <Text style={styles.btn_name}>Recharger</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    recharge_container: { paddingHorizontal: 20, },

    presentation: { fontSize: 15, fontFamily: roboto.black, textAlign: 'justify', marginVertical: 150, },

    btn_recharger_container: { alignItems: 'center', },
    btn_recharger: {},
    btn_recharger_gradient: { width: 180, padding: 10, borderRadius: 20, },
    btn_recharger_name: { color: colors.black, fontSize: 15, fontFamily: roboto.black, textAlign: 'center', },

    // modal
    modal_global_container: { flex: 1, position: 'relative', backgroundColor: colors.screen_bg_color, opacity: 1, },
    modal_container: { width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: colors.white, position: 'absolute', bottom: 0, },

    modal_header_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 30, paddingBottom: 25, borderBottomWidth: 2, borderBottomColor: colors.drawer_icon_color, },
    vitepay_logo_container: { height: 160, width: 160, position: 'absolute', },
    vitepay_logo: { height: '100%', width: '100%', objectFit: 'cover', },
    header_close_icon_container: {},
    header_close_icon: {},

    // input dans le modal
    formulaire_container: { flex: 1, justifyContent: 'space-between', },
    input_container: { padding: 5, borderWidth: 1.5, borderColor: colors.profil_bg_color, borderRadius: 10, marginBottom: 10, },
    input_title: { color: colors.black, fontFamily: roboto.black, },
    input: { height: 60, color: colors.black, fontFamily: roboto.regular, fontSize: 13, },
    input_error: { color: colors.fond1, fontFamily: roboto.italic, fontSize: 10, },

    // bouton recharger dans le modal
    btn_container: { alignItems: 'center', marginTop: 10, },
    btn: { width: 200, backgroundColor: colors.screen_bg_color, padding: 10, borderRadius: 20, },
    btn_name: { color: colors.white, fontFamily: roboto.black, textAlign: 'center', textTransform: 'uppercase', },

    // recharge status
    recharge_status_container: { flex: 1, justifyContent: 'space-between', },
    loading: {},
    loading_text: { fontSize: 15, textAlign: 'center', },

    status_icon_container: { alignItems: 'center', },
    status_icon: {},
    status_message: { color: colors.black, fontFamily: roboto.regular, textAlign: 'center', fontSize: 15, marginVertical: 25 },


})

export default Recharge