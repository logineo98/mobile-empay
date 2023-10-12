import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useState } from 'react'
// my importations
import { PARTNER_TYPE } from '../../../libs/services/partner/partner.model'
import { colors, roboto } from '../../../libs/typography/typography'
import { isPair } from '../../../libs/constants/utils'
// my icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomLinearGradient from '../../common/drawer/gradient/CustomLinearGradient'

type COMPONENT_TYPE = {
    data: PARTNER_TYPE
    index: number
}

const PartenaireCard: FC<COMPONENT_TYPE> = (props) => {
    const { data, index } = props
    const { id, name, description, logo } = data

    const { height, width } = useWindowDimensions()

    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.one_partenaire_global_container}>
            {isPair(index + 1) ?
                <CustomLinearGradient style={styles.gradient}>
                    <TouchableOpacity activeOpacity={0.5} style={[styles.one_partenaire_container, {}]} onPress={() => setVisible(true)}>
                        <View style={styles.logo_img_container}>
                            <Image source={logo as any} style={styles.logo_img} />
                        </View>

                        <View style={[styles.info_title_description_container, { width: width - 180 }]}>
                            <Text style={[styles.info_title, { color: colors.white, }]} numberOfLines={1}> {name} </Text>
                            <Text style={[styles.info_description, { color: colors.white, }]} numberOfLines={3}> {description} </Text>
                        </View>
                    </TouchableOpacity>
                </CustomLinearGradient> :

                <TouchableOpacity activeOpacity={0.5} style={[styles.one_partenaire_container, { backgroundColor: colors.profil_bg_color, borderRadius: 20, marginBottom: 10, }]} onPress={() => setVisible(true)}>
                    <View style={styles.logo_img_container}>
                        <Image source={logo as any} style={styles.logo_img} />
                    </View>

                    <View style={[styles.info_title_description_container, { width: width - 180 }]}>
                        <Text style={[styles.info_title, { color: colors.black, }]} numberOfLines={1}> {name} </Text>
                        <Text style={[styles.info_description, { color: colors.black, }]} numberOfLines={3}> {description} </Text>
                    </View>
                </TouchableOpacity>
            }

            <Modal visible={visible} transparent animationType='slide'>
                <View style={styles.modal_global_container}>
                    <View style={[styles.modal_container, { height: height < 600 ? '80%' : '50%', }]}>
                        <View style={styles.modal_header_container}>
                            <Text style={styles.header_title}>Information detaillée</Text>
                            <TouchableOpacity activeOpacity={0.5} style={styles.header_close_icon_container} onPress={() => setVisible(false)}>
                                <AntDesign name='closecircle' color={colors.black} size={35} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modal_content_container}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.content_title}> {name} </Text>
                                <Text style={[styles.content_description, { textAlign: width < 400 ? 'left' : 'justify', }]}> {description} </Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    one_partenaire_global_container: {},

    one_partenaire_container: { flexDirection: 'row', alignItems: 'center', padding: 15, },

    logo_img_container: { height: 80, width: 80, padding: 10, backgroundColor: colors.white, borderRadius: 15, },
    logo_img: { height: '100%', width: '100%', objectFit: 'cover', },

    info_title_description_container: { marginLeft: 10, },
    info_title: { fontSize: 17, fontFamily: roboto.black, textTransform: 'uppercase', },
    info_description: { fontSize: 13, fontFamily: roboto.regular, },

    modal_global_container: { flex: 1, backgroundColor: colors.black, opacity: 0.85, position: 'relative', },
    modal_container: { width: '100%', position: 'absolute', bottom: 0, backgroundColor: colors.white, borderTopLeftRadius: 40, borderTopRightRadius: 40, },

    modal_header_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 2, borderBottomColor: colors.drawer_icon_color, },
    header_title: { color: colors.black, fontSize: 18, fontFamily: roboto.black, },
    header_close_icon_container: {},
    header_close_icon: {},

    modal_content_container: { paddingHorizontal: 20, paddingVertical: 10, },
    content_title: { color: colors.black, fontSize: 18, fontFamily: roboto.black, textTransform: 'uppercase', marginBottom: 5, },
    content_description: { color: colors.black, fontFamily: roboto.regular, },

    gradient: { marginBottom: 10, borderRadius: 20, },

})

export default PartenaireCard