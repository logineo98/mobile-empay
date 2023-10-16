import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, } from 'react-native'
import React, { FC, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer1 from '../../components/common/drawer/screen_container1'
import GradientText from '../../components/common/drawer/gradient/gradient_text'
import { images } from '../../libs/constants/constants'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Home: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width } = useWindowDimensions()

    const [verso, setVerso] = useState(false)

    return (
        <ScreenContainer1 navigation={navigation} >
            <View style={styles.home_container}>
                {/* carte visa */}
                <View style={styles.visa_img_global_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.visa_img_container} onPress={() => setVerso(!verso)}>
                        {!verso ? <Image source={images.visa_recto} style={[styles.visa_img, { objectFit: width < 400 ? 'cover' : 'contain', }]} /> : <Image source={images.visa_verso} style={[styles.visa_img, { objectFit: width < 400 ? 'cover' : 'contain', }]} />}
                    </TouchableOpacity>
                </View>
                {/* mon solde */}
                <View style={styles.solde_name_amount_container}>
                    <GradientText text='Mon solde :' style={styles.solde_name} />
                    <CustomLinearGradient style={[styles.solde_gradient_amount_container, { width: width - 180 }]}>
                        <Text style={styles.solde_gradient_amount}>567.000 FCFA</Text>
                    </CustomLinearGradient>
                </View>
                {/* menu ika wari taa, facture, recharge */}
                <View style={styles.menu_global_container}>
                    <View style={styles.menu_title_container}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.menu_icon_container, { backgroundColor: colors.ika_wari_taa_bg_color, padding: 15, }]} onPress={() => navigation.navigate('ika_wari_taa')}>
                            <Image source={images.ika_wari_taa} tintColor={colors.white} style={styles.menu_icon} />
                        </TouchableOpacity>
                        <Text style={styles.menu_title}>Ika Wari Taa</Text>
                    </View>
                    <View style={styles.menu_title_container}>
                        <CustomLinearGradient style={styles.gradient}>
                            <TouchableOpacity activeOpacity={0.5} style={[styles.menu_icon_container, { padding: 15, }]} onPress={() => navigation.navigate('facture')}>
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

                    <View style={styles.historique_item_container}>
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
                </View>
            </View>
        </ScreenContainer1>
    )
}

const styles = StyleSheet.create({
    home_container: { paddingHorizontal: 20, paddingBottom: 10, },

    visa_img_global_container: { alignItems: 'center', marginBottom: 15, },
    visa_img_container: { height: 190, width: '100%', },
    visa_img: { height: '100%', width: '100%', },

    solde_name_amount_container: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.drawer_icon_color, borderRadius: 20, marginBottom: 15, },
    solde_name: { width: 120, fontSize: 16, textAlign: 'center', },
    solde_gradient_amount_container: { height: 40, paddingHorizontal: 10, borderRadius: 20, alignItems: 'flex-end', justifyContent: 'center', },
    solde_gradient_amount: { color: colors.black, fontFamily: roboto.black, },

    menu_global_container: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', },
    menu_title_container: { alignItems: 'center', },
    menu_title: { color: colors.white, fontSize: 12, fontFamily: roboto.regular, },
    menu_icon_container: { height: 70, width: 70, borderRadius: 15, },
    menu_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    gradient: { borderRadius: 15, },

    historique_container: {},
    historique_tile_see_more_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    historique_title: { color: colors.white, fontFamily: roboto.regular, },
    historique_see_more_container: { backgroundColor: colors.profil_bg_color, borderRadius: 7, },
    historique_see_more_text: { color: colors.black, fontSize: 12, fontFamily: roboto.regular, paddingHorizontal: 5, },
    historique_item_container: { marginTop: 5, },
    historique_item: { padding: 15, borderRadius: 30, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.profil_bg_color, },
    historique_item_icon_type_description_container: { flexDirection: 'row', alignItems: 'center', },
    historique_item_icon_container: { height: 45, width: 45, padding: 10, borderRadius: 45, backgroundColor: colors.white, },
    historique_item_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    historique_item_type_description_container: { marginLeft: 10, },
    historique_item_type: { color: colors.black, fontFamily: roboto.black, },
    historique_item_description: { color: colors.black, fontSize: 8, fontFamily: roboto.regular, },
    historique_amount: { color: colors.black, fontFamily: roboto.regular, },
})

export default Home