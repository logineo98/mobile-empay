import { Alert, Image, Modal, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import { colors, roboto } from '../../../libs/typography/typography'
import { images } from '../../../libs/constants/constants'
import CustomLinearGradient from './gradient/custom_linear_gradient'
import { RootState } from '../../../libs/services/store'
import { logout } from '../../../libs/services/user/user.action'
import ModalServiceClient from './modal/modal_service_client'
import SecondaryLoading from '../secondary_loading'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const CustomDrawerContent: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width } = useWindowDimensions()

    const { host, user_loading } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<any>()

    const [visibleLogoutModal, setVisibleLogoutModal] = useState(false)
    const [visibleServiceClientModal, setVisibleServiceClientModal] = useState(false)
    const [click, setClick] = useState(false);

    const onShare = async () => {
        try { await Share.share({ message: 'Veuillez, télécharger l\'application EM-PAY', }) }
        catch (error: any) {
            Alert.alert('Message d\'erreur', error?.message, [{ text: 'OK' }])
        }
    }

    return (
        <View style={styles.drawer_container}>
            {/* profil container */}
            <TouchableOpacity activeOpacity={0.5} style={styles.profil_info_container} onPress={() => navigation.closeDrawer()}>
                <View style={styles.profil_img_container}>
                    <Image source={images.avatar} style={styles.profil_img} />
                </View>
                <View style={styles.info_container}>
                    <Text numberOfLines={1} style={styles.info_name}> {host?.name} </Text>
                    <Text numberOfLines={1} style={styles.info_email}> {host?.email} </Text>
                </View>
            </TouchableOpacity>

            {/* menus */}
            <View style={[styles.item_global_container, { height: height - (135 + 70), marginTop: 10, }]}>
                <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0.5} style={[styles.item_container, { marginTop: 20, }]} onPress={() => navigation.navigate('status')}>
                        <Image source={images.status} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Statut/Disponibilité</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => navigation.navigate('tarif')}>
                        <Image source={images.tarif} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Tarif</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => navigation.navigate('partenaire')}>
                        <Image source={images.partenaire} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Partenaire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => navigation.navigate('a_propos')}>
                        <Image source={images.about} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>A propos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => setVisibleServiceClientModal(true)}>
                        <Image source={images.service_client} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Service client</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={onShare}>
                        <Image source={images.parrainage} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Parrainage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container}>
                        <Image source={images.update} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Mise à jour disponible</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />
                </ScrollView>
            </View>

            {/* deconnexion */}
            <View style={[styles.logout_apli_version_container, { position: 'absolute', left: 20, bottom: 20, }]}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.item_container, { marginBottom: 5, }]} onPress={() => setVisibleLogoutModal(true)}>
                    <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                    <Text style={styles.item_name}>Déconnexion</Text>
                </TouchableOpacity>
                <Text style={styles.apli_version}>app.v1.0.1</Text>
            </View>

            {/* modal deconnexion */}
            <Modal transparent animationType='slide' visible={visibleLogoutModal}>
                <View style={styles.modal_global_container}>
                    <View style={styles.modal_container}>
                        <Text style={styles.modal_title}>Déconnexion</Text>
                        <Text style={styles.deconnexion_content}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo facere tenetur alias! A, optio. Enim dignissimos molestias in accusamus vel.</Text>
                        <View style={styles.back_validate_container}>
                            <TouchableOpacity activeOpacity={0.5} style={[styles.back_validate, { padding: 10, }]} onPress={() => setVisibleLogoutModal(false)}>
                                <Text style={styles.back_validate_name}>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} style={styles.back_validate} onPress={() => { dispatch(logout()); setClick(true) }}>
                                <CustomLinearGradient style={styles.validate_gradient}>
                                    <Text style={[styles.back_validate_name, { color: colors.black, }]}>Se déconnecter</Text>
                                </CustomLinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {click && user_loading && <SecondaryLoading text={'Déconnexion en cours...'} />}

            {/* modal service client */}
            <ModalServiceClient visibleServiceClientModal={visibleServiceClientModal} setVisibleServiceClientModal={setVisibleServiceClientModal} />
        </View>
    )
}

const styles = StyleSheet.create({
    drawer_container: { flex: 1, padding: 20, backgroundColor: colors.black, opacity: 1, position: 'relative', borderTopRightRadius: 40, borderBottomRightRadius: 40, },

    // profil container
    profil_info_container: { backgroundColor: colors.profil_bg_color, flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 40, },
    profil_img_container: { height: 50, width: 50, borderRadius: 50, padding: 3, backgroundColor: colors.profil_bg_color, elevation: 5, },
    profil_img: { height: '100%', width: '100%', objectFit: 'cover', },
    info_container: { width: 150, marginLeft: 5, },
    info_name: { color: colors.black, fontSize: 15, fontFamily: roboto.black, },
    info_email: { color: colors.black, fontSize: 10, fontFamily: roboto.regular, },

    // menus
    item_global_container: {},

    item_container: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
    item_icon_container: {},
    item_icon: { height: 30, width: 30, objectFit: 'cover', },
    item_name: { color: colors.white, fontSize: 18, fontFamily: roboto.black, marginLeft: 5, },

    divider: { height: 2, backgroundColor: colors.drawer_icon_color, borderRadius: 10, marginBottom: 20, },

    // deconnexion
    logout_apli_version_container: { width: '100%', },
    apli_version: { color: colors.profil_bg_color, fontFamily: roboto.regular, textAlign: 'center', },

    // modal 
    modal_global_container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: colors.black, opacity: 0.8, },
    modal_container: { backgroundColor: colors.white, padding: 20, borderRadius: 20, },
    modal_title: { color: colors.black, fontSize: 20, fontFamily: roboto.black, textAlign: 'center', },

    // modal deconnexion
    deconnexion_content: { color: colors.black, fontFamily: roboto.regular, textAlign: 'center', marginVertical: 20, },

    back_validate_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', },
    back_validate: { width: 130, backgroundColor: colors.screen_bg_color, borderRadius: 20, },
    back_validate_name: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },
    validate_gradient: { padding: 10, borderRadius: 20, },

})

export default CustomDrawerContent