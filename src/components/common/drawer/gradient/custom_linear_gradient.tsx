import { StyleProp, StyleSheet, ViewStyle, } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
// my importations
import { colors } from '../../../../libs/typography/typography'

type COMPONENT_TYPE = {
    children: JSX.Element | JSX.Element[]
    colors_?: string[]
    style?: StyleProp<ViewStyle>
}

const CustomLinearGradient: FC<COMPONENT_TYPE> = (props) => {
    const { children, colors_, style } = props

    return (
        <LinearGradient colors={colors_ ? colors_ : colors.gradient_color} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={[styles.gradient, style]}>
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {}
})

export default CustomLinearGradient