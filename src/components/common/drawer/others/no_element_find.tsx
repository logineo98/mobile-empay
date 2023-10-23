import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'

type COMPONENT_TYPE = {
    message?: string
    size?: number
}

const NoElementFind: FC<COMPONENT_TYPE> = (props) => {
    const { message, size } = props

    const styles = StyleSheet.create({
        message: { color: colors.white, fontSize: size || 16, fontFamily: roboto.black, textAlign: 'center', }
    })

    return <Text style={styles.message}> {message} </Text>
}

export default NoElementFind