import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
// my importations
import ScreenContainer2 from './screen_container2'
import { colors, roboto } from '../../../../libs/typography/typography'

type COMPONENT_TYPE = {
    navigation: StackNavigationHelpers
    children: JSX.Element | JSX.Element[]
    title: string
    payment_logo: any
    payment_name: string
}

const ScreenPaymentContainer: FC<COMPONENT_TYPE> = (props) => {
    const { children, navigation, title, payment_logo, payment_name } = props

    return (
        <ScreenContainer2 title={title} scroll payment navigation={navigation}>
            <View style={styles.screen_payment_container}>
                <View style={styles.payment_logo_name_container}>
                    <View style={[styles.payment_logo_container, { backgroundColor: payment_name === 'Canal+' ? colors.black : colors.white, }]}>
                        <Image source={payment_logo} style={[styles.payment_logo, { objectFit: payment_name === 'Canal+' ? 'contain' : 'cover' }]} />
                    </View>
                    <Text style={styles.payment_name}> {payment_name} </Text>
                </View>

                {children}
            </View>
        </ScreenContainer2>
    )
}

const styles = StyleSheet.create({
    screen_payment_container: { paddingHorizontal: 20, },

    payment_logo_name_container: { marginVertical: 35, flexDirection: 'row', alignItems: 'center', },
    payment_logo_container: { height: 85, width: 85, padding: 10, borderRadius: 20, backgroundColor: colors.white, },
    payment_logo: { height: '100%', width: '100%', },
    payment_name: { color: colors.white, fontSize: 18, fontFamily: roboto.black, marginLeft: 5, },
})

export default ScreenPaymentContainer