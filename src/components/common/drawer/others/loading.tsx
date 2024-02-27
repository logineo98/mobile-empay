import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'
import GradientText from '../gradient/gradient_text'

type COMPONENT_TYPE = {
    text?: string
    color?: string
    no_gradient?: boolean
    style?: StyleProp<ViewStyle>
    style_text_container?: StyleProp<TextStyle>
}

const Loading: FC<COMPONENT_TYPE> = (props) => {
    const { color, no_gradient, style, style_text_container, text } = props

    const { width } = useWindowDimensions()

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size='large' color={color || colors.white} />
            {!no_gradient ? <GradientText text={text || 'Chargement en cours...'} style={[styles.text, style_text_container]} /> : <Text style={[styles.text, style_text_container,]}> {text || 'Chargement en cours...'} </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    text: { color: colors.white, fontSize: 10, fontFamily: roboto.regular, },
})

export default Loading