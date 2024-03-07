import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'
import { useDispatch, useSelector } from 'react-redux'
import { _cardLosted } from '../../../../libs/services/user/user.action'
import { RootState } from '../../../../libs/services/store'
import SecondaryLoading from '../../secondary_loading'

type COMPONENT_TYPE = {
    visibleAskModal: boolean
    setVisibleAskModal: React.Dispatch<React.SetStateAction<boolean>>
    setDisplayVisaCard: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalAskCloseCard: FC<COMPONENT_TYPE> = (props) => {
    const { setDisplayVisaCard, setVisibleAskModal, visibleAskModal } = props

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
        <>
            <Modal transparent animationType='slide' visible={visibleAskModal} >
                <View style={styles.modal_global_container}>
                    <View style={styles.modal_container}>
                        <Text style={[styles.modal_title, { marginBottom: 15, }]}>Voulez-vous :</Text>
                        <TouchableOpacity activeOpacity={0.5} style={styles.ask_container} onPress={cardLosted}>
                            <Text style={styles.ask}>Signaler la perte de la carte ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={styles.ask_container} onPress={maskCard}>
                            <Text style={styles.ask}>Juste masquer la carte ?</Text>
                        </TouchableOpacity>

                        <View style={styles.nb_container}>
                            <Text style={styles.nb_text}>NB: Attention "Signaler la perte de la carte" est une action irréversible jusqu'à l'intervention des administrateurs.</Text>
                        </View>

                        {/* fermer modal */}
                        <View style={styles.footer_modal_container}>
                            <TouchableOpacity activeOpacity={0.5} style={styles.footer_modal_content} onPress={() => setVisibleAskModal(false)}>
                                <Text style={styles.footer_modal_content_text}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {user_loading && <SecondaryLoading />}
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    // modal 
    modal_global_container: { flex: 1, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: colors.black, opacity: 0.8, },
    modal_container: { backgroundColor: colors.white, padding: 20, borderRadius: 20, },
    modal_title: { color: colors.black, fontSize: 25, fontFamily: roboto.black, textAlign: 'center', },

    // modal ask container
    ask_container: { marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    ask: { width: '100%', color: colors.black, fontSize: 20, fontFamily: roboto.black, textAlign: 'center', },

    footer_modal_container: { alignItems: 'center', },
    footer_modal_content: { width: 130, padding: 10, borderRadius: 20, backgroundColor: colors.screen_bg_color, },
    footer_modal_content_text: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },

    nb_container: { marginBottom: 5, },
    nb_text: { color: colors.error, fontSize: 11, fontFamily: roboto.regular, textAlign: 'center', },
})

export default ModalAskCloseCard