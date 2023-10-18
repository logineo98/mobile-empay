import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer2 from '../../components/common/drawer/container/screen_container2'
import GradientText from '../../components/common/drawer/gradient/gradient_text'
import { colors, roboto } from '../../libs/typography/typography'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
// my icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import { images } from '../../libs/constants/constants'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Recharge: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const { height, width } = useWindowDimensions()

    const [visible, setVisible] = useState(false)

    const handleVisible = () => {

    }

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
                                <TouchableOpacity activeOpacity={0.5} style={styles.header_close_icon_container} onPress={() => setVisible(false)}>
                                    <AntDesign name='closecircle' color={colors.black} size={35} style={styles.header_close_icon} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, }} keyboardShouldPersistTaps='handled'>
                                <View style={styles.input_container}>
                                    <Text style={styles.input_title}>Téléphone</Text>
                                    <TextInput keyboardType='numeric' maxLength={8} style={styles.input} placeholderTextColor={`rgba(0,0,0,0.5)`} placeholder={'Numéro orange (sans l\'indicatif)'} />
                                    <Text style={styles.input_error}> Numéro de Téléphone incorrect </Text>
                                </View>

                                <View style={styles.input_container}>
                                    <Text style={styles.input_title}>Montant (FCFA)</Text>
                                    <TextInput keyboardType='numeric' style={styles.input} placeholderTextColor={`rgba(0,0,0,0.5)`} placeholder={'Montant de la recharge'} />
                                    <Text style={styles.input_error}> Montant invalide </Text>
                                </View>

                                <View style={styles.btn_container}>
                                    <TouchableOpacity activeOpacity={0.5} style={styles.btn} >
                                        <Text style={styles.btn_name}>Recharger</Text>
                                    </TouchableOpacity>
                                </View>
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
    modal_global_container: { position: 'relative', flex: 1, backgroundColor: colors.screen_bg_color, opacity: 1, },
    modal_container: { width: '100%', borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: colors.white, position: 'absolute', bottom: 0, },

    modal_header_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 30, paddingBottom: 25, borderBottomWidth: 2, borderBottomColor: colors.drawer_icon_color, },
    vitepay_logo_container: { height: 160, width: 160, position: 'absolute', },
    vitepay_logo: { height: '100%', width: '100%', objectFit: 'cover', },
    header_close_icon_container: {},
    header_close_icon: {},

    // input dans le modal
    input_container: { padding: 5, borderWidth: 1.5, borderColor: colors.profil_bg_color, borderRadius: 10, marginBottom: 10, },
    input_title: { color: colors.black, fontFamily: roboto.black, },
    input: { height: 60, color: colors.black, fontFamily: roboto.regular, fontSize: 13, },
    input_error: { color: colors.fond1, fontFamily: roboto.italic, fontSize: 10, },

    // bouton recharger dans le modal
    btn_container: { alignItems: 'center', marginTop: 10, },
    btn: { width: 200, backgroundColor: colors.screen_bg_color, padding: 10, borderRadius: 20, },
    btn_name: { color: colors.white, fontFamily: roboto.black, textAlign: 'center', textTransform: 'uppercase', },
})

export default Recharge