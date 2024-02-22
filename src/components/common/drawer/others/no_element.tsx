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

const NoElement: FC<COMPONENT_TYPE> = (props) => {
    const { height, message, style, width } = props

    return (
        <View style={[styles.no_element_container, { height: height || '100%', width: width || '100%' }, style]}>
            <Text style={styles.no_element_text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    no_element_container: { padding: 10, alignItems: 'center', justifyContent: 'center', },
    no_element_text: { color: colors.white, fontSize: 12, fontFamily: roboto.regular, textAlign: 'center', },
})

export default NoElement

// borderWidth: 0.6, borderColor: colors.white, borderRadius: 10,