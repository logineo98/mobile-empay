import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'
import GradientText from '../gradient/gradient_text'

type COMPONENT_TYPE = {
    text?: string
    color?: string
}

const Loading: FC<COMPONENT_TYPE> = (props) => {
    const { text, color } = props

    const { width } = useWindowDimensions()

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={color || colors.white} />
            <GradientText text={text || 'Chargement en cours...'} style={styles.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },
    text: { color: colors.white, fontSize: 10, fontFamily: roboto.regular, },
})

export default Loading