import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import { colors, roboto } from '../../../libs/typography/typography'
import { images } from '../../../libs/constants/constants'
// my icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const CustomDrawerContent: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width } = useWindowDimensions()

    return (
        <View style={styles.drawer_container}>
            <TouchableOpacity activeOpacity={0.5} style={styles.profil_info_container} onPress={() => navigation.closeDrawer()}>
                <View style={styles.profil_img_container}>
                    <Image source={images.passport} style={styles.profil_img} />
                </View>
                <View style={styles.info_container}>
                    <Text numberOfLines={1} style={styles.info_name}>Tz Nation</Text>
                    <Text numberOfLines={1} style={styles.info_email}>tz@gmail.com</Text>
                </View>
            </TouchableOpacity>

            <View style={[styles.item_global_container, { height: height - (135 + 70), marginTop: 10, }]}>
                <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0.5} style={[styles.item_container, { marginTop: 20, }]} onPress={() => navigation.navigate('status')}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Statut/Disponibilité</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => navigation.navigate('tarif')}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Tarif</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => navigation.navigate('partenaire')}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Partenaire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container} onPress={() => navigation.navigate('a_propos')}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>A propos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Service client</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Parrainage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.item_container}>
                        <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                        <Text style={styles.item_name}>Mise à jour disponible</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />
                </ScrollView>
            </View>

            <View style={[styles.logout_apli_version_container, { position: 'absolute', left: 20, bottom: 20, }]}>
                <TouchableOpacity activeOpacity={0.5} style={[styles.item_container, { marginBottom: 5, }]}>
                    <Image source={images.logout} style={styles.item_icon} tintColor={colors.drawer_icon_color} />
                    <Text style={styles.item_name}>Déconnexion</Text>
                </TouchableOpacity>
                <Text style={styles.apli_version}>app.v1.0.1</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawer_container: { flex: 1, padding: 20, backgroundColor: colors.black, opacity: 1, position: 'relative', borderTopRightRadius: 40, borderBottomRightRadius: 40, },

    profil_info_container: { backgroundColor: colors.profil_bg_color, flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 40, },
    profil_img_container: { height: 50, width: 50, borderRadius: 50, padding: 3, backgroundColor: colors.profil_bg_color, elevation: 5, },
    profil_img: { height: '100%', width: '100%', objectFit: 'contain', borderRadius: 50, },
    info_container: { marginLeft: 5, },
    info_name: { color: colors.black, fontSize: 15, fontFamily: roboto.black, },
    info_email: { color: colors.black, fontSize: 10, fontFamily: roboto.regular, },

    item_global_container: {},

    item_container: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, },
    item_icon_container: {},
    item_icon: { height: 30, width: 30, objectFit: 'cover', },
    item_name: { color: colors.white, fontSize: 18, fontFamily: roboto.black, marginLeft: 5, },

    divider: { height: 2, backgroundColor: colors.drawer_icon_color, borderRadius: 10, },

    logout_apli_version_container: { width: '100%', },
    apli_version: { color: colors.profil_bg_color, fontFamily: roboto.regular, textAlign: 'center', },
})

export default CustomDrawerContent