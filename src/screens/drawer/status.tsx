import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer3 from '../../components/common/drawer/container/screen_container3'
import CustomLinearGradient from '../../components/common/drawer/gradient/custom_linear_gradient'
import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Status: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    const [amount, setAmount] = useState('')

    return (
        <ScreenContainer3 title='Statut/Disponibilité' navigation={navigation}>
            <View style={styles.status_container}>
                {/* montant à retirer */}
                <View style={styles.amount_to_retirer_title_container}>
                    <Text style={styles.amount_to_retirer_title}>Inscrire le montant à retirer</Text>
                    <TextInput onChangeText={setAmount} keyboardType='numeric' style={styles.amount_input} />
                    <Text style={styles.fcfa}>FCFA</Text>
                </View>

                {/* texte d'information */}
                <Text style={styles.text_information}>En activant votre statut vous émettez le souhait d'un retrait d'argent du montant inscrit dans le champ ci-dessus.</Text>

                {/* retour et valider */}
                <View style={styles.back_validate_container}>
                    <TouchableOpacity activeOpacity={0.5} style={[styles.back_validate, { padding: 10, }]}>
                        <Text style={styles.back_validate_name}>Retour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.back_validate}>
                        <CustomLinearGradient style={styles.validate_gradient}>
                            <Text style={[styles.back_validate_name, { color: colors.black, }]}>Valider</Text>
                        </CustomLinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenContainer3>
    )
}

const styles = StyleSheet.create({
    status_container: {},

    // montant à retirer
    amount_to_retirer_title_container: { alignItems: 'center', marginVertical: 60, position: 'relative', },
    amount_to_retirer_title: { color: colors.white, fontFamily: roboto.regular, marginBottom: 10, },
    amount_input: { width: '100%', paddingLeft: 30, paddingRight: 75, borderWidth: 2, borderColor: colors.profil_bg_color, borderRadius: 30, color: colors.white, fontFamily: roboto.regular, },
    fcfa: { position: 'absolute', bottom: 12, right: 15, color: colors.white, fontSize: 20, fontFamily: roboto.regular, },

    // texte d'information
    text_information: { color: colors.white, fontSize: 13, fontFamily: roboto.regular, textAlign: 'center', marginBottom: 20, },

    // retour et valider
    back_validate_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', },
    back_validate: { width: 130, backgroundColor: colors.profil_bg_color, borderRadius: 20, },
    back_validate_name: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },
    validate_gradient: { padding: 10, borderRadius: 20, },
})

export default Status