import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../../../libs/typography/typography'

type COMPONENT_TYPE = {
    children: JSX.Element | JSX.Element[]
    style: Object
}

const CustomLinearGradient: FC<COMPONENT_TYPE> = (props) => {
    const { children, style } = props

    return (
        <LinearGradient colors={colors.gradient_color} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={[styles.gradient, style]}>
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradient: {}
})

export default CustomLinearGradient