import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { useWindowDimensions } from 'react-native'
// my importations
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../libs/services/store'
import CustomLinearGradient from '../gradient/custom_linear_gradient'
import { colors, roboto } from '../../../../libs/typography/typography'
import { _cardLosted } from '../../../../libs/services/user/user.action'
// my icons
import AntDesign from 'react-native-vector-icons/AntDesign'

type COMPONENT_TYPE = {
    visibleAskModal: boolean
    setVisibleAskModal: React.Dispatch<React.SetStateAction<boolean>>
    setDisplayVisaCard: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAskCloseCard: FC<COMPONENT_TYPE> = (props) => {
    const { setDisplayVisaCard, setVisibleAskModal, visibleAskModal } = props

    const { width } = useWindowDimensions()

    const { host, user_loading } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const cardLosted = () => {
        host && dispatch(_cardLosted(host.id as string, { lostCard: true }, setVisibleAskModal, setDisplayVisaCard))
    }

    const maskCard = () => {
        setVisibleAskModal(false)
        setDisplayVisaCard(false)
    }

    return (
        <Modal transparent animationType='slide' visible={visibleAskModal} >
            <View style={[styles.modal_global_container, {}]}>
                <View style={styles.modal_container}>
                    <View style={{ alignItems: 'flex-end', marginBottom: 10, }}>
                        <TouchableOpacity activeOpacity={0.5} style={{}} onPress={() => setVisibleAskModal(false)}>
                            <AntDesign name='closecircle' color={colors.black} size={30} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.modal_title, {}]}>Voulez-vous signaler la perte de votre carte ?</Text>

                    <View style={styles.nb_container}>
                        <Text style={styles.nb_text}>NB: Attention "Signaler la perte de la carte" est une action irréversible jusqu'à l'intervention des administrateurs.</Text>
                    </View>

                    {/* fermer modal */}
                    <View style={styles.footer_modal_container}>
                        <TouchableOpacity activeOpacity={0.5} style={[styles.footer_modal_content, { padding: 10, }]} onPress={maskCard}>
                            <Text style={styles.footer_modal_content_text}>Masquer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.footer_modal_content} onPress={cardLosted}>
                            <CustomLinearGradient style={{ borderRadius: 20, }}>
                                <Text style={[styles.footer_modal_content_text, { padding: 10, }]}>Oui</Text>
                            </CustomLinearGradient>
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
    modal_title: { color: colors.black, fontSize: 25, fontFamily: roboto.black, textAlign: 'center', },

    footer_modal_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    footer_modal_content: { width: '49%', borderRadius: 20, backgroundColor: colors.screen_bg_color, },
    footer_modal_content_text: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },

    nb_container: { marginVertical: 10, },
    nb_text: { color: colors.error, fontSize: 11, fontFamily: roboto.regular, textAlign: 'center', },
})

export default ModalAskCloseCard