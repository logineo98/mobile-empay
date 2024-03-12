import { Image, Keyboard, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useState, } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
import Toast from 'react-native-toast-message'
// my importations
import { colors, roboto } from '../../../../libs/typography/typography'
import { images } from '../../../../libs/constants/constants'
import CustomLinearGradient from '../gradient/custom_linear_gradient'

type COMPONENT_TYPE = {
    navigation: DrawerNavigationHelpers | StackNavigationHelpers
    children: JSX.Element | JSX.Element[]
    title: string

    onRefresh?: any
    payment?: boolean
    refreshing?: any
    reload?: boolean
    scroll?: boolean
}

const ScreenContainer2: FC<COMPONENT_TYPE> = (props) => {
    const { children, navigation, title, onRefresh, payment, refreshing, reload, scroll } = props

    const { height, width, } = useWindowDimensions()

    const [isKeyboardActive, setIsKeyboardActive] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardActive(true)
        })

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardActive(false)
        })

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    return (
        <>
            <View style={{ zIndex: 100 }}><Toast /></View>
            <View style={styles.screen_container_2}>
                <View style={styles.header_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.arrow_left_icon_container} onPress={() => navigation.goBack()}>
                        <Image source={images.arrow_left} style={styles.arrow_left_icon} tintColor={colors.white} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.screen_name}> {title} </Text>
                    <View />
                </View>

                {scroll ?
                    <ScrollView contentContainerStyle={{ flexGrow: 1, }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} >
                        {children}
                    </ScrollView> :
                    reload ?
                        <ScrollView contentContainerStyle={{ flexGrow: 1, }} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                            {children}
                        </ScrollView> :
                        children
                }

                {!isKeyboardActive &&
                    <View style={styles.bottom_tab_container}>
                        <CustomLinearGradient colors_={colors.home_icon_gradient} style={styles.gradient}>
                            <TouchableOpacity activeOpacity={0.5} style={styles.bottom_item_container} onPress={() => payment ? navigation.navigate('facture') : navigation.navigate('home')}>
                                <Image source={images.home} style={styles.bottom_item} tintColor={colors.black} />
                            </TouchableOpacity>
                        </CustomLinearGradient>
                    </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    screen_container_2: { flex: 1, justifyContent: 'space-between', padding: 10, paddingBottom: 0, backgroundColor: colors.screen_bg_color, },

    header_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, },
    arrow_left_icon_container: { height: 50, width: 50, },
    arrow_left_icon: { height: '100%', width: '100%', objectFit: 'cover', },
    screen_name: { color: colors.white, fontSize: 20, fontFamily: roboto.black, },

    bottom_tab_container: { width: '100%', padding: 5, alignItems: 'center', },
    bottom_item_container: {},
    bottom_item: { height: '100%', width: '100%', objectFit: 'cover', },

    gradient: { height: 50, width: 50, padding: 10, borderRadius: 50, },
})

export default ScreenContainer2