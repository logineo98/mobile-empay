import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import LinearGradient from 'react-native-linear-gradient'
// my importations
import ScreenContainer1 from '../../components/common/drawer/screen_container1'
import { colors } from '../../libs/typography/typography'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Home: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    return (
        <ScreenContainer1 navigation={navigation} >
            <LinearGradient colors={colors.gradient_color}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{ height: 50, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 25, fontWeight: '600', }}>bonjour a tous</Text>
            </LinearGradient>
        </ScreenContainer1>
    )
}

export default Home

const styles = StyleSheet.create({})