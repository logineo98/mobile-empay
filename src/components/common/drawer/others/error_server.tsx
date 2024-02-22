import { DimensionValue, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'

type COMPONENT_TYPE = {
    height?: DimensionValue
    message?: string
    style?: ViewStyle
    width?: DimensionValue
}

const ErrorServer: FC<COMPONENT_TYPE> = (props) => {
    const { height, message, style, width } = props

    return (
        <View style={[styles.error_server_container, { height: height || '100%', width: width || '100%' }, style]}>
            <Text style={styles.error_server_text}>{message || `Une erreur est survenue lors de la récupération des données.\nVeuillez actualiser l'écran en le tirant vers le bas.`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    error_server_container: { padding: 10, alignItems: 'center', justifyContent: 'center', },
    error_server_text: { color: colors.white, fontSize: 12, fontFamily: roboto.regular, textAlign: 'center', },
})

export default ErrorServer

// borderWidth: 0.6, borderColor: colors.white, borderRadius: 10,