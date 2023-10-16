import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import { colors, roboto } from '../../../libs/typography/typography'
import { images } from '../../../libs/constants/constants'
import CustomLinearGradient from './gradient/custom_linear_gradient'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers
    children: JSX.Element | JSX.Element[]
    title: string
    scroll?: boolean
}

const ScreenContainer2: FC<COMPONENT_TYPE> = (props) => {
    const { navigation, children, title, scroll } = props

    const { height, width, } = useWindowDimensions()

    return (
        <View style={styles.screen_container_2}>

            <View style={styles.header_container}>
                <TouchableOpacity activeOpacity={0.5} style={styles.arrow_left_icon_container} onPress={() => navigation.goBack()}>
                    <Image source={images.arrow_left} style={styles.arrow_left_icon} tintColor={colors.white} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.screen_name}> {title} </Text>
                <View />
            </View>

            <View style={[styles.body_container, { height: height - 138 }]}>
                {scroll ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {children}
                    </ScrollView> :
                    children
                }
            </View>

            <View style={styles.bottom_tab_container}>
                <CustomLinearGradient colors_={colors.home_icon_gradient} style={styles.gradient}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.bottom_item_container} onPress={() => navigation.navigate('home')}>
                        <Image source={images.home} style={styles.bottom_item} tintColor={colors.black} />
                    </TouchableOpacity>
                </CustomLinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen_container_2: { flex: 1, backgroundColor: colors.screen_bg_color, padding: 10, position: 'relative', },

    header_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    arrow_left_icon_container: { height: 50, width: 50, },
    arrow_left_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    screen_name: { color: colors.white, fontSize: 20, fontFamily: roboto.black, },

    body_container: { marginTop: 5, },

    bottom_tab_container: { width: '100%', padding: 10, position: 'absolute', left: 10, bottom: 0, alignItems: 'center', },
    bottom_item_container: {},
    bottom_item: { height: '100%', width: '100%', objectFit: 'cover', },

    gradient: { height: 50, width: 50, padding: 10, borderRadius: 50, },
})

export default ScreenContainer2