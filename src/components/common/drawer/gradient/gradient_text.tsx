import { StyleProp, StyleSheet, Text, TextStyle, } from 'react-native'
import React, { FC } from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import CustomLinearGradient from './custom_linear_gradient'
import { roboto } from '../../../../libs/typography/typography'

type COMPONENT_TYPE = {
    text: string
    style?: StyleProp<TextStyle>
}

const GradientText: FC<COMPONENT_TYPE> = (props) => {
    const { text, style } = props

    return (
        <MaskedView maskElement={<Text style={[{ fontFamily: roboto.black, }, style]}> {text} </Text>}>
            <CustomLinearGradient>
                <Text style={[{ opacity: 0, fontFamily: roboto.black, }, style]}> {text} </Text>
            </CustomLinearGradient>
        </MaskedView>
    )
}

const styles = StyleSheet.create({})

export default GradientText