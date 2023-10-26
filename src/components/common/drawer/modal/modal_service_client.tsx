import { Image, Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'
import { images } from '../../../../libs/constants/constants'
import CustomLinearGradient from '../gradient/custom_linear_gradient'

type COMPONENT_TYPE = {
    visibleServiceClientModal: boolean
    setVisibleServiceClientModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalServiceClient: FC<COMPONENT_TYPE> = (props) => {
    const { visibleServiceClientModal, setVisibleServiceClientModal } = props

    const call = (phoneNumber: string) => {

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phoneNumber}`
        } else if (Platform.OS === 'ios') {
            phoneNumber = `telprompt:${phoneNumber}`
        }

        setVisibleServiceClientModal(false)

        Linking.openURL(phoneNumber)
    }

    return (
        <Modal transparent animationType='slide' visible={visibleServiceClientModal}>
            <View style={styles.modal_global_container}>
                <View style={styles.modal_container}>
                    <Text style={[styles.modal_title, { marginBottom: 15, }]}>Service Client</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.service_client_container} onPress={() => call('50001231')}>
                        <View style={[styles.service_icon_type_container, { backgroundColor: colors.screen_bg_color, }]}>
                            <View style={styles.service_icon_container}>
                                <Image source={images.service_client} tintColor={colors.drawer_icon_color} style={styles.service_icon} />
                            </View>
                            <Text style={[styles.service_type, { color: colors.white, }]}>Emploi et Moi</Text>
                        </View>
                        <Text style={styles.service_number_phone}>50 00 12 31</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.service_client_container} onPress={() => call('20292109')}>
                        <CustomLinearGradient style={styles.service_client_gradient}>
                            <View style={styles.service_icon_type_container}>
                                <View style={styles.service_icon_container}>
                                    <Image source={images.service_client} tintColor={colors.drawer_icon_color} style={styles.service_icon} />
                                </View>
                                <Text style={[styles.service_type, { color: colors.black, }]}>UBA-GIM</Text>
                            </View>
                        </CustomLinearGradient>
                        <Text style={styles.service_number_phone}>20 29 21 09</Text>
                    </TouchableOpacity>

                    {/* fermer service client modal */}
                    <View style={styles.fermer_service_client_modal_container}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.fermer_service_client_modal} onPress={() => setVisibleServiceClientModal(false)}>
                            <Text style={styles.fermer_service_client_modal_text}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    // modal 
    modal_global_container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: colors.black, opacity: 0.8, },
    modal_container: { backgroundColor: colors.white, padding: 20, borderRadius: 20, },
    modal_title: { color: colors.black, fontSize: 20, fontFamily: roboto.black, textAlign: 'center', },

    // modal service client
    service_client_container: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    service_icon_type_container: { borderRadius: 40, flexDirection: 'row', alignItems: 'center', },
    service_icon_container: { height: 40, width: 40, borderRadius: 40, padding: 5, backgroundColor: colors.white, },
    service_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    service_type: { width: 110, marginLeft: 10, paddingRight: 15, fontFamily: roboto.black, textAlign: 'center', },
    service_number_phone: { color: colors.black, fontSize: 20, fontFamily: roboto.black, },
    service_client_gradient: { borderRadius: 40, },

    fermer_service_client_modal_container: { alignItems: 'center', },
    fermer_service_client_modal: { width: 130, padding: 10, borderRadius: 20, backgroundColor: colors.screen_bg_color, },
    fermer_service_client_modal_text: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },
})

export default ModalServiceClient