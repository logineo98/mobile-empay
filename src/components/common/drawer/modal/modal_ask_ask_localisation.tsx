import { ActivityIndicator, Modal, PermissionsAndroid, StyleSheet, Text, ToastAndroid, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import SecondaryLoading from '../../secondary_loading'
import { RootState } from '../../../../libs/services/store'
import { colors, roboto } from '../../../../libs/typography/typography'
import { _activedUnactivatedLocation, _cardLosted } from '../../../../libs/services/user/user.action'
import Geolocation from '@react-native-community/geolocation'
import CustomLinearGradient from '../gradient/custom_linear_gradient'

type COMPONENT_TYPE = {
    visibleAskModal: boolean
    setVisibleAskModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAskCloseLocalisation: FC<COMPONENT_TYPE> = (props) => {
    const { setVisibleAskModal, visibleAskModal } = props

    const { width } = useWindowDimensions()

    const { host, user_loading } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const handleGetLocation = async () => {
        Geolocation.getCurrentPosition(info => {
            if (host?.coordinates?.lat && host?.coordinates?.lng) {
                dispatch(_activedUnactivatedLocation(host.id as string, { coordinates: { lat: '', lng: '' } }, setVisibleAskModal))
            } else {
                dispatch(_activedUnactivatedLocation(host?.id as string, { coordinates: { lat: info.coords.latitude.toString(), lng: info.coords.longitude.toString() } }, setVisibleAskModal))
            }
        })
    }

    return (
        <Modal transparent animationType='slide' visible={visibleAskModal}>
            <View style={[styles.modal_global_container, {}]}>
                <View style={[styles.modal_container, {}]}>
                    <View style={styles.text_container}>
                        <Text style={[styles.modal_text, {}]}>Voulez-vous</Text>
                        <Text style={[styles.modal_text, { color: colors.fond1, fontFamily: roboto.italic, }]}>{(host?.coordinates?.lat && host?.coordinates?.lng) ? 'Désactiver' : 'Activer'}</Text>
                        <Text style={[styles.modal_text, { marginBottom: 15, }]}>votre localisation ?</Text>
                    </View>

                    {/* footer modal */}
                    <View style={styles.footer_modal_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.footer_modal_content} onPress={() => setVisibleAskModal(false)}>
                            <Text style={styles.footer_modal_content_text}>Fermer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.footer_modal_content} onPress={handleGetLocation}>
                            <Text style={styles.footer_modal_content_text}>Oui</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {user_loading &&
                    <View style={{ backgroundColor: colors.black, position: 'absolute', height: '100%', width: width, justifyContent: 'center', }}>
                        <ActivityIndicator size='large' color={colors.white} />
                    </View>
                }
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    // modal 
    modal_global_container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: colors.black, opacity: 0.8, },
    modal_container: { backgroundColor: colors.white, padding: 20, borderRadius: 20, },

    text_container: {},
    modal_text: { color: colors.black, fontSize: 25, fontFamily: roboto.black, textAlign: 'center', },

    // modal ask container

    footer_modal_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    footer_modal_content: { width: '49%', padding: 10, borderRadius: 20, backgroundColor: colors.screen_bg_color, },
    footer_modal_content_text: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },
})

export default ModalAskCloseLocalisation