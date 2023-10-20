import { Linking, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
// my importations
import CustomLinearGradient from '../../common/drawer/gradient/custom_linear_gradient'
import { colors, roboto } from '../../../libs/typography/typography'

type COMPONENT_TYPE = {
    permission_type: string
    style?: StyleProp<ViewStyle>
}

const NoPermissionCard: FC<COMPONENT_TYPE> = (props) => {
    const { permission_type, style } = props

    return (
        <View style={[styles.permission_denied_container, style]}>
            <Text style={styles.permission_denied_title}>Veuillez activer votre autorisation d'accès {permission_type} en cliquant sur le bouton ci-dessous. Après l'avoir activé, fermer l'application dans le gestionnaire de tâche (effacé de la liste des applications récemment ouvertes) puis l'ouvrir à nouveau.</Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.permission_denied} onPress={() => Linking.openSettings()}>
                <CustomLinearGradient style={styles.permission_denied_gradient}>
                    <Text style={styles.permission_denied_btn}>Cliquer pour autoriser</Text>
                </CustomLinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    permission_denied_container: { marginVertical: 100, },
    permission_denied_title: { color: colors.white, fontSize: 16, fontFamily: roboto.regular, textAlign: 'justify', marginBottom: 50, },
    permission_denied: { alignItems: 'center', },
    permission_denied_gradient: { padding: 10, width: 200, borderRadius: 20, },
    permission_denied_btn: { color: colors.black, fontFamily: roboto.black, textAlign: 'center', },
})

export default NoPermissionCard