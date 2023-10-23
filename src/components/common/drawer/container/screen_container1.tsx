import { Image, Keyboard, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'
import { images } from '../../../../libs/constants/constants'
// my icons
import CustomLinearGradient from '../gradient/custom_linear_gradient'
import { RootState } from '../../../../libs/services/store'
import ModalServiceClient from '../modal/modal_service_client'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    children: JSX.Element | JSX.Element[]
}

const ScreenContainer1: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, children } = props

    const { height, width } = useWindowDimensions()

    const { host } = useSelector((state: RootState) => state.user)

    const [show, setShow] = useState(false)
    const [isSwitchActive, setIsSwitchActive] = useState(false)
    const [isKeyboardActive, setIsKeyboardActive] = useState(false)
    const [visibleServiceClientModal, setVisibleServiceClientModal] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardActive(true)
        })

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardActive(false)
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    return (
        <View style={styles.screen_container_1}>
            <StatusBar backgroundColor={colors.screen_bg_color} />

            <View style={styles.header_container}>
                <TouchableOpacity activeOpacity={0.5} style={styles.profil_info_container} onPress={() => navigation.openDrawer()}>
                    <View style={styles.profil_img_container}>
                        <Image source={images.avatar} style={styles.profil_img} />
                    </View>
                    <View style={styles.info_container}>
                        <Text numberOfLines={1} style={styles.info_name}> {host?.name} </Text>
                        <Text numberOfLines={1} style={styles.info_email}> {host?.email} </Text>
                    </View>
                </TouchableOpacity>
                <Switch trackColor={{ false: colors.white, true: colors.white }} thumbColor={isSwitchActive ? colors.success : colors.error} value={isSwitchActive} onValueChange={setIsSwitchActive} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                {children}
            </ScrollView>

            {!isKeyboardActive &&
                !show ?
                <View style={[styles.bottom_tab_container, { paddingBottom: 0, }]}>
                    <CustomLinearGradient colors_={colors.home_icon_gradient} style={styles.gradient}>
                        <TouchableOpacity activeOpacity={0.5} style={{}} onPress={() => setShow(true)}>
                            <Image source={images.plus} style={styles.bottom_item} tintColor={colors.black} />
                        </TouchableOpacity>
                    </CustomLinearGradient>
                </View> :
                <View style={styles.bottom_tab_container}>
                    <View style={styles.bottom_tab_active_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.bottom_item_container} onPress={() => navigation.navigate('geolocalisation')}>
                            <Image source={images.geolocalisation} style={styles.bottom_item} tintColor={colors.black} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.bottom_item_container, { backgroundColor: colors.black }]} onPress={() => setShow(false)}>
                            <Image source={images.minus} style={styles.bottom_item} tintColor={colors.profil_bg_color} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.bottom_item_container} onPress={() => setVisibleServiceClientModal(true)}>
                            <Image source={images.service_client} style={styles.bottom_item} tintColor={colors.black} />
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {/* modal service client */}
            <ModalServiceClient visibleServiceClientModal={visibleServiceClientModal} setVisibleServiceClientModal={setVisibleServiceClientModal} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen_container_1: { flex: 1, justifyContent: 'space-between', backgroundColor: colors.screen_bg_color, padding: 10, paddingBottom: 5, },

    header_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, },
    profil_info_container: { width: 215, backgroundColor: colors.profil_bg_color, flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 40, },
    profil_img_container: { height: 36, width: 36, borderRadius: 36, padding: 3, backgroundColor: colors.profil_bg_color, elevation: 5, },
    profil_img: { height: '100%', width: '100%', objectFit: 'contain', borderRadius: 36, },
    info_container: { marginLeft: 5, width: 215 - (36 + 10 + 5), },
    info_name: { color: colors.black, fontSize: 15, fontFamily: roboto.black, },
    info_email: { color: colors.black, fontSize: 10, fontFamily: roboto.regular, },

    bottom_tab_container: { width: '100%', alignItems: 'center', paddingTop: 5, },
    bottom_item_container: { backgroundColor: colors.home_icon_bg_color, height: 50, width: 50, borderRadius: 50, padding: 10, },
    bottom_item: { height: '100%', width: '100%', objectFit: 'cover', },

    bottom_tab_active_container: { width: '75%', padding: 10, borderRadius: 30, backgroundColor: colors.profil_bg_color, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },

    gradient: { height: 50, width: 50, padding: 10, borderRadius: 50, },

})

export default ScreenContainer1