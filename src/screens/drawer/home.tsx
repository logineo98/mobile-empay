import { Image, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, useWindowDimensions, } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useSelector } from 'react-redux'
import SmsAndroid from 'react-native-get-sms-android'
import { PERMISSIONS, request } from 'react-native-permissions'
// my importations
import ScreenContainer1 from '../../components/common/drawer/container/screen_container1'
import GradientText from '../../components/common/drawer/gradient/gradient_text'
import { images } from '../../libs/constants/constants'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import { colors, roboto } from '../../libs/typography/typography'
import HistoriqueCard from '../../components/card/drawer/historique_card'
import { RootState } from '../../libs/services/store'
// my icons
import Feather from 'react-native-vector-icons/Feather'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, screenName: string }

const Home: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, screenName } = props

    const { height, width } = useWindowDimensions()

    const { host, user_loading } = useSelector((state: RootState) => state?.user)

    const [verso, setVerso] = useState(false)
    const [displayVisaCard, setDisplayVisaCard] = useState(true)
    const [displayAmount, setDisplayAmount] = useState(false)
    const [listSms, setListSms] = useState<any[]>([])
    const targetContact = '75245731'

    console.log('displayVisaCard', displayVisaCard)

    const handleDisplayAmount = () => setDisplayAmount(prev => !prev)

    /***POUR LES SMS****/
    const requestPermissionAndFetchSMS = async () => {
        try {
            const permissionResult = await request(PERMISSIONS.ANDROID.READ_SMS)

            if (permissionResult === 'granted') {
                console.log('Permission accordée')
                fetchSMS()
            } else console.log('Permission refusée')
        } catch (error) {
            console.error('Erreur lors de la demande de permission:', error)
        }
    }

    const fetchSMS = () => {
        SmsAndroid.list(
            JSON.stringify({
                box: 'inbox', // 'inbox' pour les SMS reçus, 'sent' pour les SMS envoyés
                // maxCount: 10, // Nombre maximal de SMS à récupérer
            }),
            (fail: any) => console.error('Erreur lors de la récupération des SMS :', fail),
            (count: any, smsList: any) => {
                // console.log('Liste des SMS récupérés :', smsList)
                setListSms(JSON.parse(smsList))
                // setListSms(JSON.parse(smsList).filter((sms: any) => sms.address.includes(targetContact)))
            },
        )
    }
    useEffect(() => {
        requestPermissionAndFetchSMS()
    }, [])

    const lostCard = false
    useEffect(() => {
        if (screenName === undefined || screenName === 'home') {
            if (lostCard) setDisplayVisaCard(false)
            else setDisplayVisaCard(true)
        }
    }, [screenName])

    // console.log('home ', host)

    return (
        <ScreenContainer1 displayVisaCard={displayVisaCard} setDisplayVisaCard={setDisplayVisaCard} navigation={navigation}>
            <View style={styles.home_container}>
                {/* carte visa */}
                {displayVisaCard &&
                    <View style={styles.visa_img_container_global}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.visa_img_container} onPress={() => setVerso(!verso)}>
                            {!verso ?
                                <ImageBackground source={images.visa_recto} resizeMode={width <= 360 ? 'cover' : 'cover'} style={[styles.visa_img, {}]}>
                                    {/* numero de la carte */}
                                    <View style={styles.number_card_container}>
                                        <Text numberOfLines={1} style={styles.number_card}>0000 1111 2222 3333</Text>
                                    </View>
                                    {/* expiration de la carte */}
                                    <View style={styles.expiration_card_container}>
                                        <View style={styles.expiration_card_text_container}>
                                            <Text numberOfLines={1} style={styles.expiration_card_text}>EXPIRE</Text>
                                            <Text numberOfLines={1} style={styles.expiration_card_text}>A FIN</Text>
                                        </View>
                                        <Text numberOfLines={1} style={styles.expiration_card_value}>10 / 2026</Text>
                                    </View>
                                    {/* nom de l'utilisateur sur la carte */}
                                    <View style={styles.user_name_card_container}>
                                        <Text numberOfLines={1} style={styles.user_name_card}>CHEICK OUMAR DIABATE</Text>
                                    </View>
                                </ImageBackground> :
                                <ImageBackground source={images.visa_verso} resizeMode={width <= 360 ? 'cover' : 'contain'} style={[styles.visa_img, {}]}>
                                    {/* cvc */}
                                    <View style={styles.cvc_card_container}>
                                        <Text numberOfLines={1} style={styles.cvc_card}>123</Text>
                                    </View>
                                </ImageBackground>
                            }
                        </TouchableOpacity>
                    </View>
                }
                {/* mon solde */}
                <View style={styles.solde_name_amount_container}>
                    <GradientText text='Mon solde :' style={styles.solde_name} />
                    <CustomLinearGradient style={[styles.solde_gradient_container, { width: width - 180 }]}>
                        <View style={styles.solde_gradient_amount_eye_container}>
                            <Text style={styles.solde_gradient_amount}>{displayAmount ? `${host?.totalAmount} CFA` : '************'}</Text>
                            <TouchableOpacity activeOpacity={0.5} style={styles.solde_gradient_eye_container} onPress={handleDisplayAmount}>
                                <Feather name={!displayAmount ? 'eye' : 'eye-off'} color={colors.black} size={20} />
                            </TouchableOpacity>
                        </View>
                    </CustomLinearGradient>
                </View>
                {/* menu ika wari taa, facture, recharge */}
                <View style={styles.menu_global_container}>
                    <View style={styles.menu_title_container}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.menu_icon_container, { backgroundColor: colors.ika_wari_taa_bg_color, padding: 15, opacity: 0.4, }]} onPress={() => ToastAndroid.showWithGravity('En cours développement pour le moment.', ToastAndroid.CENTER, ToastAndroid.TOP) /*navigation.navigate('ika_wari_taa')*/}>
                            <Image source={images.clock} tintColor={colors.white} style={styles.menu_clock} />
                            <Image source={images.ika_wari_taa} tintColor={colors.white} style={styles.menu_icon} />
                        </TouchableOpacity>
                        <Text style={styles.menu_title}>Ika Wari Taa</Text>
                    </View>
                    <View style={styles.menu_title_container}>
                        <CustomLinearGradient style={[styles.gradient, { opacity: 0.4, }]}>
                            <TouchableOpacity activeOpacity={0.5} style={[styles.menu_icon_container, { padding: 15, }]} onPress={() => ToastAndroid.showWithGravity('En cours développement pour le moment.', ToastAndroid.CENTER, ToastAndroid.TOP) /*navigation.navigate('payment_stack')*/}>
                                <Image source={images.clock} tintColor={colors.black} style={styles.menu_clock} />
                                <Image source={images.facture} style={styles.menu_icon} />
                            </TouchableOpacity>
                        </CustomLinearGradient>
                        <Text style={styles.menu_title}>Facture</Text>
                    </View>
                    <View style={styles.menu_title_container}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.menu_icon_container, { backgroundColor: colors.recharge_bg_color, }]} onPress={() => navigation.navigate('recharge')}>
                            <Image source={images.recharge} style={[styles.menu_icon, { borderRadius: 15, objectFit: 'contain', }]} />
                        </TouchableOpacity>
                        <Text style={styles.menu_title}>Recharge</Text>
                    </View>
                </View>
                {/* historique */}
                <View style={styles.historique_container}>
                    <View style={styles.historique_tile_see_more_container}>
                        <Text style={styles.historique_title}>Historique</Text>
                        <TouchableOpacity activeOpacity={0.5} style={styles.historique_see_more_container} onPress={() => navigation.navigate('historique')}>
                            <Text style={styles.historique_see_more_text}>Voir plus</Text>
                        </TouchableOpacity>
                    </View>

                    {/* historique card */}
                    <HistoriqueCard style={styles.historique_card} />
                </View>
            </View>
        </ScreenContainer1>
    )
}

const styles = StyleSheet.create({
    home_container: { paddingHorizontal: 20, },

    visa_img_container_global: { alignItems: 'center', marginBottom: 15, },
    visa_img_container: { height: 190, width: 300, },
    visa_img: { height: '100%', width: '100%', position: 'relative', },

    // info carte recto
    // numero de la carte
    number_card_container: { width: '100%', alignItems: 'center', position: 'absolute', top: '51%', },
    number_card: { color: colors.white, fontSize: 22, fontFamily: roboto.bold, textTransform: 'uppercase', },
    // expiration de la carte
    expiration_card_container: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '68%', },
    expiration_card_text_container: { marginRight: 5, alignItems: 'flex-end', },
    expiration_card_text: { color: colors.white, fontSize: 8, fontFamily: roboto.regular, textTransform: 'uppercase', },
    expiration_card_value: { color: colors.white, fontSize: 12, fontFamily: roboto.regular, textTransform: 'uppercase', },
    // nom de l'utilisateur sur la carte
    user_name_card_container: { width: 200, position: 'absolute', bottom: 13, left: 15, },
    user_name_card: { color: colors.white, fontSize: 14, fontFamily: roboto.bold, textTransform: 'uppercase', },

    // info carte verso
    // cvc
    cvc_card_container: { position: 'absolute', top: '41%', left: 188, },
    cvc_card: { color: colors.blue, fontSize: 12, fontFamily: roboto.boldItalic, textTransform: 'uppercase', },

    solde_name_amount_container: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.drawer_icon_color, borderRadius: 20, marginBottom: 15, },
    solde_name: { width: 120, fontSize: 16, textAlign: 'center', },
    solde_gradient_container: { height: 40, paddingHorizontal: 10, borderRadius: 20, justifyContent: 'center', },
    solde_gradient_amount_eye_container: { height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', },
    solde_gradient_amount: { color: colors.black, fontFamily: roboto.black, alignItems: 'center', },
    solde_gradient_eye_container: { marginLeft: 10, },

    menu_global_container: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', },
    menu_title_container: { alignItems: 'center', },
    menu_title: { color: colors.white, fontSize: 12, fontFamily: roboto.regular, },
    menu_icon_container: { height: 70, width: 70, borderRadius: 15, position: 'relative', },
    menu_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    menu_clock: { position: 'absolute', top: 5, left: 5, height: 15, width: 15, },
    gradient: { borderRadius: 15, },

    historique_container: {},
    historique_tile_see_more_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    historique_title: { color: colors.white, fontFamily: roboto.regular, },
    historique_see_more_container: { backgroundColor: colors.profil_bg_color, borderRadius: 7, },
    historique_see_more_text: { color: colors.black, fontSize: 12, fontFamily: roboto.regular, paddingHorizontal: 5, },

    historique_card: { marginTop: 15, },

})

export default Home