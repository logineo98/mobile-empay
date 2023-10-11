import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
// my importations
import ScreenContainer1 from '../../components/common/drawer/screen_container1'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, }

const Home: FC<COMPONENT_TYPE> = (props) => {
    const { navigation } = props

    return (
        <ScreenContainer1 navigation={navigation} >
            <></>
        </ScreenContainer1>
    )
}

export default Home

const styles = StyleSheet.create({})